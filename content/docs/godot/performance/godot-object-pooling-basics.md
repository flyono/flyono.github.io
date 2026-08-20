---
title: "对象池完全指南: 通过复用消除 Godot 中的卡顿"
description: 用对象池消除 Godot 中 instantiate / queue_free 造成的瞬时卡顿。说明复用循环、_ready() 不会再次调用的陷阱、如何彻底停掉处理和碰撞，以及子弹池的实现与是否该引入对象池的判断。
created: 2026-08-18T18:18:00
---

> "弹幕一开，那一瞬间就掉帧。" "敌人爆一堆金币时画面会顿一下。" "明明已经 hide 了，后台还在撞人和跑逻辑。" 这类突然的卡顿(spike)往往不是渲染太重，而是短时间内大量创建(`instantiate()`)和销毁(`queue_free()`)把 CPU 打满了。

对象池(object pooling)从根上解决这个问题: **不要扔掉对象，洗干净再拿出来用**。本文从卡顿成因讲起，然后是复用时最容易踩的坑、一份可落地的子弹池实现，以及"测完再决定要不要上"的判断标准。

## 对象池如何工作: 复用而不是丢弃

单次 `instantiate()` 的成本很小，但每秒重复几百次就会变成可见的帧时间尖峰。对象池把最贵的创建和销毁挪到可接受的时刻(比如开局)，游戏进行中只做轻量的复位。

循环只有四步。

1. **预创建**: 在负载可接受的时刻(开局、进关)预先实例化固定数量的对象，放进池(待命列表)并隐藏
2. **取出**: 需要时(开火)不要 `instantiate()`，从池里拿出一个未使用的，初始化位置后显示
3. **使用**: 对象完成它的工作(子弹飞行、命中敌人)
4. **归还**: 用完后不要 `queue_free()`，隐藏并放回池中

游戏中的成本因此降到"重置位置和状态"。创建/销毁带来的尖峰消失，帧时间变平。

| | 每次创建/销毁 | 对象池 |
| --- | --- | --- |
| 开火时做的事 | `instantiate()` + 进树 | 从列表取出 + 复位状态 |
| 消失时做的事 | `queue_free()` | 隐藏 + 停处理 + 放回列表 |
| 帧时间 | 爆发时出现尖峰 | 低且平坦 |

## 常见陷阱和最佳实践

对象池看起来简单，真正要命的是**复用时的初始化**。`_ready()` 只在第一次进树时调用一次，从池里再拿出来时不会再走一遍。

| 常见错误 | 最佳实践 |
| --- | --- |
| 在 `_ready()` 里做每次生成都该做的初始化 | `_ready()` **只调用一次**。复用时的初始化放进专门的 `spawn(position, direction)` / `reset()` |
| 归还时只 `hide()` | `hide()` 不会停 `_process` 也不会停碰撞。用 `process_mode = PROCESS_MODE_DISABLED` 停掉处理，并禁用 `CollisionShape` |
| 在物理回调里 `remove_child()` | 物理步进中改树不稳定。用 `call_deferred()` 推迟到安全时刻 |
| 无视池耗尽 | 激烈场面把池抽干会直接断。准备"当场新建一个"的 fallback，并 `printerr` 让你看见容量不够 |
| 忘记重置状态 | 不只复位位置和速度，还要复位 `modulate`、`scale` 和自定义变量。漏一项就会出现莫名其妙的 bug |

特别要防**看不见但仍在跑**的对象。隐藏的子弹如果还在后台移动并检测碰撞，负载降不下来，还会出现隐形判定框。停处理和停碰撞必须一起做。

> 关于 `process_mode` 如何停掉子树，见《通过进程模式控制暂停功能》。物理回调里不要直接改树，与《在 Godot 中稳定 FPS》里"用 `call_deferred` 删除节点"是同一条纪律。

## 实践: 构建不会掉帧的子弹池

弹幕、命中火花、敌人掉落的金币: 凡是**高频生成又很快消失**的东西，都可以套这套子弹池。由两块组成: 作为 Autoload 的 `PoolManager`(管理所有池)，以及被池化的 `PooledBullet`。

### 池的核心: PoolManager

把 `PoolManager` 注册为 Autoload，任意脚本都能调用。它负责取出(`get_object`)、归还(`return_object`)以及启用/停用。

```gdscript
# pool_manager.gd (registered as an Autoload)
# 注册为 Autoload
extends Node

@export var scene_templates: Dictionary = {}     # Key: scene path, Value: PackedScene
@export var initial_pool_sizes: Dictionary = {}  # Key: scene path, Value: initial count

var pools: Dictionary = {}

func _ready() -> void:
    for scene_path in scene_templates:
        var scene: PackedScene = scene_templates[scene_path]
        var size: int = initial_pool_sizes.get(scene_path, 10)
        pools[scene_path] = []
        for i in size:
            var obj := scene.instantiate()
            if obj.has_method("set_pool_manager"):
                obj.set_pool_manager(self)
            add_child(obj)
            _deactivate(obj)          # Put it on standby right after creation
            # 创建后立刻进入待命
            pools[scene_path].append(obj)

func get_object(scene_path: String) -> Node:
    # If the pool is empty, create one on the spot (fallback plus warning)
    # 池空了就当场新建一个(fallback + 警告)
    if not pools.has(scene_path) or pools[scene_path].is_empty():
        printerr("Pool '%s' is empty. Creating a new one (the size may be too small)" % scene_path)
        var new_obj := (scene_templates[scene_path] as PackedScene).instantiate()
        if new_obj.has_method("set_pool_manager"):
            new_obj.set_pool_manager(self)
        add_child(new_obj)
        return new_obj
    var obj: Node = pools[scene_path].pop_back()
    _activate(obj)                    # Enable it once taken out
    # 取出后启用
    return obj

func return_object(obj: Node, scene_path: String) -> void:
    if obj in pools.get(scene_path, []):   # Prevent double returns
        # 防止重复归还
        return
    _deactivate(obj)                  # Stop it before returning it
    # 归还前先停掉
    pools[scene_path].append(obj)

func _activate(obj: Node) -> void:
    obj.show()
    obj.process_mode = Node.PROCESS_MODE_INHERIT   # Resume processing
    # 恢复处理
    _set_collisions_disabled(obj, false)

func _deactivate(obj: Node) -> void:
    obj.hide()
    obj.process_mode = Node.PROCESS_MODE_DISABLED  # Stop all processing
    # 停掉全部处理
    _set_collisions_disabled(obj, true)
    if obj.has_method("reset"):
        obj.reset()                   # Return state to its initial values
        # 把状态恢复到初值

# Enable/disable all descendant CollisionShapes at once
# 递归开关所有子孙 CollisionShape
func _set_collisions_disabled(node: Node, disabled: bool) -> void:
    for child in node.get_children():
        if child is CollisionShape2D or child is CollisionShape3D:
            child.set_deferred("disabled", disabled)   # Deferred for safety during physics
            # 物理步进中改碰撞要用 deferred
        _set_collisions_disabled(child, disabled)
```

### 被池化的一侧: PooledBullet

子弹侧的关键是用 **`spawn()`(初始化)** 和 **`reset()`(状态还原)** 代替 `_ready()` 里的每次生成逻辑，以及**把自己还回池里**。用 `VisibleOnScreenNotifier2D` 的信号，飞出屏幕时自动归还。

```gdscript
# pooled_bullet.gd
extends CharacterBody2D

const SPEED := 800.0
var direction := Vector2.RIGHT
var _pool_manager: Node

@onready var notifier: VisibleOnScreenNotifier2D = $VisibleOnScreenNotifier2D

func _ready() -> void:
    # Return myself to the pool when I leave the screen
    # (_ready() runs once, so connecting here is fine)
    # 飞出屏幕时归还。_ready() 只跑一次，信号连接放这里没问题
    notifier.screen_exited.connect(return_to_pool)

func set_pool_manager(manager: Node) -> void:
    _pool_manager = manager

# Initialization in place of _ready(). Called every time we're taken out
# 代替 _ready() 的初始化。每次从池里取出都要调用
func spawn(start_position: Vector2, travel_direction: Vector2) -> void:
    global_position = start_position
    direction = travel_direction.normalized()
    rotation = direction.angle()

# Return state to its initial values when returned (watch for missed resets)
# 归还时把状态恢复到初值(漏复位会产生怪 bug)
func reset() -> void:
    velocity = Vector2.ZERO

func _physics_process(_delta: float) -> void:
    velocity = direction * SPEED
    move_and_slide()

func return_to_pool() -> void:
    if _pool_manager:
        # Avoid returning during physics; defer for safety
        # 不要在物理步进中归还，推迟到安全时刻
        _pool_manager.call_deferred("return_object", self, scene_file_path)
    else:
        queue_free()
```

开火侧只把 `instantiate()` 换成 `get_object()` + `spawn()`。

```gdscript
# Firing (PoolManager is the Autoload name)
# 开火(PoolManager 是 Autoload 名)
var bullet := PoolManager.get_object("res://bullet.tscn")
bullet.spawn($Muzzle.global_position, Vector2.RIGHT)
```

有两个要点。

- **在 `spawn()` 里初始化，在 `reset()` 里清理**: 复用时不会再调 `_ready()`，所以每次取出都要在 `spawn()` 里设位置和方向，归还时在 `reset()` 里清速度之类的状态。这两步是复用能活下去的生命线。
- **用 `call_deferred()` 安全归还**: 子弹在物理步进中途打中敌人。当场调 `return_object()` 会让改树变得不稳定，所以 `call_deferred()` 把它排到物理步进结束之后。

关于把 `PoolManager` 做成常驻单例，见《利用自动加载 (Autoload) 管理跨场景数据》。

## 该不该引入? 测量与替代方案

对象池很强，但**不是万金油**。Godot 4 的节点创建已经快了不少，如果只是每隔几帧才生成一个，建池的工程成本可能高于省下来的时间。

始终先用分析器确认**实例化真的是瓶颈**，再按问题的性质选工具。

| 症状 | 工具 |
| --- | --- |
| 生命周期短、高频生成/消失的节点(子弹、特效、金币) | **对象池** |
| 只要画面、逻辑很简单、数量到几千上万 | **`MultiMesh` / `RenderingServer`**。不走节点会快一个数量级，但碰撞得自己做 |
| 寻路、大规模计算这类 CPU 重活 | **`Thread`**。解决的是另一种负载，不是创建尖峰 |

对症下药: 同类节点高频生灭用池，纯视觉海量绘制用 MultiMesh，重计算用线程。测量方法和帧率侧的配套手段见《在 Godot 中稳定 FPS: 帧率管理与优化》。

## 小贴士

- **按峰值定池大小**: fallback 的 `printerr` 经常响，说明初始容量太小。对着最激烈场面的峰值数量来调。
- **特效也可以入池**: 一次性的 `GPUParticles2D` 同样能池化，靠切换 `emitting` 复用。
- **和裁剪搭配**: 屏幕外停处理(例如 `VisibleOnScreenEnabler2D`)和对象池很合拍，能再削一截负载。
- **`_process` 与 `_physics_process` 要分清**: 待命对象必须真正停掉处理，否则池只是把创建成本换成了隐形后台成本。详见《_process 和 _physics_process 的正确用法》。

## 总结

- 对象池通过复用消除 `instantiate()` / `queue_free()` 爆发造成的尖峰，稳定 FPS
- 目标是子弹、特效这类**生命周期短、生成频率高**的对象
- `_ready()` 在复用时不会再调用，必须用 `spawn()` / `reset()` **手动初始化**
- 不要只 `hide()`，用 `PROCESS_MODE_DISABLED` 加上禁用碰撞**彻底停掉处理**。归还用 `call_deferred()`
- **测完再上**。海量纯绘制用 `MultiMesh`，重计算用 `Thread`

先池化一种子弹，确认怎么射帧时间都是平的。尖峰消失之后，对象池就会变成你随手能用的工具之一。
