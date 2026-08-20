---
title: Godot 中的动态加载与资源管理: load、preload 与后台加载
description: 在 Godot 中选择 preload() 与 load()，用 ResourceLoader 做异步后台加载，搭带进度条的加载画面，以及用 WeakRef 做软缓存管理内存。
created: 2026-08-18T18:20:00
---

> "切场景那一瞬间游戏会冻住。" "进大关卡时我想要一个加载画面。" 项目变大之后，**资源怎么加载**几乎总会变成问题。在 Godot 里，只是改一下**何时、用哪种方式**读资源，手感就会差很多。

思路很简单，分三档: 马上要用的小东西提前加载，按条件才需要的东西用到再加载，特别大的东西放到后台、配一个加载画面。本文覆盖 `preload()` 与 `load()` 的取舍、`ResourceLoader` 的**异步加载**、带进度条的**加载画面**，以及用 `WeakRef` 做**内存管理**。

## 在 preload() 和 load() 之间选择

Godot 有两个基础加载函数。差别在**何时加载**以及**路径能不能是变量**，按用途选。

### preload(): 提前加载

子弹、音效这类体积小、到处都用的资源，适合 `preload()`。资源在**脚本解析时**就已经读好，运行时调用那一刻零等待。

```gdscript
const BULLET_SCENE := preload("res://scenes/bullet.tscn")   # Path must be a constant literal
# 路径必须是常量字面量
const HIT_SOUND := preload("res://audio/hit.wav")

func shoot() -> void:
    add_child(BULLET_SCENE.instantiate())   # Usable immediately with no delay
    # 立刻可用，没有延迟
```

- **路径必须是字面量字符串**(不能用变量)
- 脚本解析时全部加载完毕
- 适合体积小、使用频繁的资源

### load(): 用到再加载

玩家选中的武器、随难度变化的敌人——**按条件变化**的资源用 `load()`。最大优点是可以从变量**拼出路径**。

```gdscript
func load_weapon(weapon_name: String) -> Node:
    var path := "res://weapons/%s.tscn" % weapon_name   # Build the path dynamically
    # 动态拼路径
    return load(path).instantiate()
```

- 路径可以动态拼
- 只有第一次从磁盘读(之后走缓存，瞬间返回)
- 适合大资源或按条件才需要的资源

> 大量 `preload()` 会让场景的**初次加载变慢**。大贴图和 3D 模型影响尤其明显，这类资产改成 `load()` 或下文的后台加载。**看的是总大小，不是个数。**

## 用 ResourceLoader 做异步加载

对大场景调用 `load()` 会**堵住主线程**直到加载结束，游戏冻结。RPG 进出地牢、开放世界分块加载这类重资源，用 `ResourceLoader` 的**异步 API**: 后台加载，游戏和动画继续跑。

异步加载三步: **请求、监视、取出**。

```gdscript
# 1. Request the load on a separate thread
# 在另一条线程上发起加载
ResourceLoader.load_threaded_request("res://levels/stage_2.tscn")

func _process(_delta: float) -> void:
    var progress := []   # Empty array that receives progress
    # 空数组，用来接收进度(见下文)
    var status := ResourceLoader.load_threaded_get_status(
        "res://levels/stage_2.tscn", progress)

    match status:
        ResourceLoader.THREAD_LOAD_IN_PROGRESS:
            print("Loading: %d%%" % int(progress[0] * 100))   # progress[0] holds 0.0 to 1.0
            # progress[0] 是 0.0 到 1.0
        ResourceLoader.THREAD_LOAD_LOADED:
            # 3. Complete, so retrieve the resource
            # 完成，取出资源
            var scene := ResourceLoader.load_threaded_get("res://levels/stage_2.tscn")
            _on_load_complete(scene)
        ResourceLoader.THREAD_LOAD_FAILED:
            printerr("Loading failed")
        ResourceLoader.THREAD_LOAD_INVALID_RESOURCE:
            printerr("Invalid path, or no request was made")
            # 路径无效，或根本没发起过请求
```

三个 API 和四种状态各自做什么:

| 方法 / 状态 | 作用 |
| --- | --- |
| `load_threaded_request(path)` | 启动异步加载 |
| `load_threaded_get_status(path, progress)` | 取出进度(0.0 到 1.0) |
| `load_threaded_get(path)` | 完成后取出资源 |
| `THREAD_LOAD_IN_PROGRESS` / `LOADED` / `FAILED` / `INVALID_RESOURCE` | 四种状态 |

> 把 `progress` 做成**空数组**传入，是 Godot "按引用返回值"的惯例。GDScript 函数不能直接返回多个值，所以传一个空数组，引擎把进度写进 `progress[0]`。第三个参数 `use_sub_threads = true` 会把贴图、网格这类子资源**并行加载**，更快。

## 实践: 构建带进度条的加载画面

会异步加载之后，把它展示给玩家。RPG 进出地牢、关卡制动作游戏换关、开放世界切区域: 几乎每个类型都有"用进度条拖住玩家、后台加载重场景"的时刻。

加载画面用 `CanvasLayer` 搭，在 `_process` 里监视进度并更新条子。完成后用 `change_scene_to_packed()` 切场景。

```gdscript
# loading_screen.gd (registered as an Autoload)
# 注册为 Autoload
extends CanvasLayer

@onready var progress_bar: ProgressBar = $ProgressBar
@onready var label: Label = $Label

var _target_path := ""

func load_scene(scene_path: String) -> void:
    _target_path = scene_path
    show()
    var err := ResourceLoader.load_threaded_request(scene_path)   # Start loading
    # 开始加载
    if err != OK:
        printerr("Failed to start loading: %s" % scene_path)
        return
    set_process(true)

func _process(_delta: float) -> void:
    if _target_path.is_empty():
        return
    var progress := []
    match ResourceLoader.load_threaded_get_status(_target_path, progress):
        ResourceLoader.THREAD_LOAD_IN_PROGRESS:
            progress_bar.value = progress[0] * 100      # Match the bar to the progress
            # 条子跟着进度走
            label.text = "Loading... %d%%" % int(progress[0] * 100)
        ResourceLoader.THREAD_LOAD_LOADED:
            var scene := ResourceLoader.load_threaded_get(_target_path)
            get_tree().change_scene_to_packed(scene)    # Switch to the finished scene
            # 切到已加载完的场景
            _target_path = ""
            set_process(false)
            hide()
        ResourceLoader.THREAD_LOAD_FAILED:
            label.text = "Loading failed"
            set_process(false)
```

调用只需一行。

```gdscript
LoadingScreen.load_scene("res://levels/stage_2.tscn")
```

有两个要点。

- **把加载画面注册成 Autoload**: `change_scene_to_packed()` 会换掉整棵当前场景树。加载画面如果挂在那棵树上，**会一起被清掉**，所以用 Autoload 常驻，才能活过切场景。
- **进度来自 `progress[0]`**: `load_threaded_get_status()` 写进空数组的 0.0–1.0 直接喂给 `ProgressBar.value`，玩家就知道还要等多久。

关于 Autoload 常驻，见《利用自动加载 (Autoload) 管理跨场景数据》。

## 内存管理与 WeakRef 缓存

怎么**释放**资源和怎么加载同样重要。大项目里从不丢掉不用的东西，内存会先耗尽。

首先，Godot 按路径**缓存** `load()` 过的资源。同一路径再 `load()` 一次，返回的是内存里的缓存(同一个实例)，不再读盘。

Godot 资源是**引用计数**的。引擎数有多少个变量还指着这份资源，**计数归零的瞬间就释放**(这和 Java / C# 的追踪式 GC 不同)。普通变量会把引用一直握住，资源永远不会被释放；`WeakRef` **不增加引用计数**。

这样就能做**软缓存**: "想留着，但没人再用时也可以丢掉。"

```gdscript
var _cache: Dictionary = {}

func get_resource(path: String) -> Resource:
    if _cache.has(path):
        var res: Resource = _cache[path].get_ref()   # Pull it from the weak reference
        # 从弱引用取出
        if res:
            return res                                # Reuse it if it's still alive
            # 还活着就复用
    var loaded := load(path)
    _cache[path] = weakref(loaded)                    # Record it without incrementing the reference count
    # 记下它，但不增加引用计数
    return loaded
```

`get_ref()` 返回 `null` 说明资源已经被释放了，再用 `load()` 重新读。频繁访问的资源更适合握在普通变量里；WeakRef 适合"也许还会用，但更想拿内存换空间"的资源。

设计原则汇总:

| 原则 | 做法 |
| --- | --- |
| 按关卡管理 | 切关时丢掉本关专属资源的引用 |
| `preload` 保持最小 | 只 preload 每个场景都用的小资产。关卡专属的用 `load()` |
| 用 WeakRef 做软缓存 | 可能复用、但不必常驻的资源 |
| 大资源异步加载 | 贴图图集、3D 模型走 `load_threaded_request()` |

## 小贴士

- **同一路径不要重复请求**: 对同一路径调两次 `load_threaded_request()` 会报错。可能被多处调用时，先用 `load_threaded_get_status()` 看状态。
- **用类型提示更安全**: 第二个参数传入类型名，例如 `load_threaded_request(path, "PackedScene")`，加载时会做类型检查。
- **这和读存档不是一回事**: 这里管的是资产(场景、图片)的加载。玩法状态的保存/恢复属于存档系统；那边也可以用 `ResourceLoader` 的异步 API。详见《实现保存/加载系统》。你要加载的数据怎么做成资源，见《创建和使用自定义资源》。
- **加载完的场景别忘了创建成本**: 切进大场景后如果还要瞬间 `instantiate()` 大量节点，尖峰会从加载挪到生成。那是对象池的事，见《对象池完全指南》。

## 总结

- **`preload()`** 在解析时加载。适合体积小、使用频繁的东西(路径必须是常量)
- **`load()`** 在运行时加载。用于动态路径和按条件加载(磁盘 I/O 只发生第一次)
- 大场景走 **`load_threaded_request()`** 的三步异步加载，主线程不会卡住
- 加载画面做成 **Autoload**，用 `load_threaded_get_status()` 的进度更新条子，完成后 `change_scene_to_packed()`
- 资源靠**引用计数**管理。**`WeakRef`** 可以做不加引用的软缓存

先把一次沉重的切关换成 `load_threaded_request()` 加进度条，感受冻结消失。"让人等，但绝不锁死"是手感好的底线。
