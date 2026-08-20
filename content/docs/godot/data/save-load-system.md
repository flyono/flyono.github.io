---
title: 实现保存/加载系统——在 JSON、ConfigFile 和自定义资源之间选择
description: 指南介绍了在 Godot 中持久保存游戏数据三种主要方式（配置文件、JSON 格式以及自定义资源）。从基础的用户路径管理，到具体的实现方式，以及何时使用每种方法，再到如何防止数据被篡改等问题，都有详细的说明。此外，还包含了如何实际进行关卡保存的示例。
created: 2026-08-07T14:28:00
---

>“我的整个游戏进度都丢失了。” “我尝试保存游戏存档，但存档状态变得混乱不堪。” 保存游戏并不是一件容易的事情，但当这种问题发生时，玩家会感到非常沮丧。此外，Godot 提供了多种保存方式，但很难决定使用哪种方式。

这篇文章介绍了在 Godot 中存储数据的三种标准方法：使用 `ConfigFile`、`JSON` 格式，以及使用`自定义资源`。文章还阐述了何时使用每种方法、如何编写这些文件，以及如何处理数据被篡改的问题。最后，文章提供了一个检查点功能，你可以随时暂停阅读。

## 简短回答：何时使用哪种方法

在讨论具体细节之前，先简单介绍一下大致的框架。基本的原则是：**当不确定时，使用自定义资源**。

| 特征 | 配置文件 | JSON | 自定义资源（推荐选择） |
| --- | --- | --- | --- |
| 主要用途 | 设置文件（音量、按键绑定等） | 外部 API 互调，通用数据处理 | 通常来讲是游戏存档数据 |
| Godot 特有的类型 | 已支持（Vector2 及其相关组件可以正常使用） | 不支持（需要手动转换） | 已支持（原样保存） |
| 代码的数量 | Small | Large (进行转换会很繁琐) | Smallest |
| 速度 | 快速 | 有些缓慢（文本解析过程） | 快速（尤其是二进制形式） |
| 防篡改功能 | 低（文本） | 低（文本） | 可配置（二进制格式、加密方式） |

大致来说: 用于保存设置信息的配置文件，用于与其它工具共享数据的 JSON 文件，以及用于记录游戏过程的自定义资源文件。记住这个映射关系，下面的实现就顺理成章了。

## 基本规则：`user://` 和 `FileAccess`

这三种方法都基于两件事：存储的位置，以及读写文件的方式。首先解决这两个问题，剩下的问题就会迎刃而解。

### 始终将文件保存为 `user://` 格式

Godot 有两种路径类型，分别表示为 `res://` 和 `user://`。

- `res://`: 你的项目文件存储的位置。在导出后，这些文件会变成只读模式，因此无法对它们进行写入操作。
- `user://`: 这是操作系统提供的一个可写入的专用文件夹的别名。数据保存在这里。

在每种操作系统上, `user://`都会自动对应到不同的实际位置。在代码中，我们只需要编写 `user://`, 而无需考虑不同操作系统之间的差异。

尝试保存到 `res://` 文件是一个常见的错误，这会导致在编辑器中可以成功保存，但导出的游戏文件却无法保存。**记住：保存文件的目标地址永远应该是 `user://`**

### 使用 `FileAccess` 进行文件的读取和写入操作

`FileAccess`实际上用于打开文件并读取或写入其内容。在处理 JSON 数据时，可以直接使用它（`ConfigFile` 和自定义资源会内部处理文件读写操作，因此在这些场景中无需干预）。

```gdscript
# Writing: opening with WRITE creates the file if missing, or truncates it if present
var file := FileAccess.open("user://memo.txt", FileAccess.WRITE)
if file:                       # open() returns null on failure, so always check open()函数失败时会返回null，因此务必进行检查
    file.store_string("Hello Save")
    file.close()               # forgetting close() can leave the write uncommitted 忘记调用close()会导致写入操作未提交

# Reading: open with READ
if FileAccess.file_exists("user://memo.txt"):   # check existence first
    var read := FileAccess.open("user://memo.txt", FileAccess.READ)
    print(read.get_as_text())
    read.close()
```

有三件事非常重要: `open()` 在失败时会返回 null，因此一定要经常检查它；永远不要忘记 `close()`; 在读取文件之前，要确保文件确实存在 `file_exists()`。仅仅养成这三个习惯，就能很大程度上避免与保存相关的崩溃情况了

## 配置文件：设置的标准

`ConfigFile`以 `[section]` 标题和 `key = value` 键值对的形式存储数据，类似于 `Windows INI` 文件。它非常适合设置用户可更改的选项: 音量、全屏切换、按键绑定。它直接处理 Godot 特定类型，并可在不直接接触 `FileAccess` 的情况下进行读写。

```gdscript
# settings_manager.gd
extends Node

const SAVE_PATH := "user://settings.cfg"

# Default settings (the fallback when the file is missing or corrupted)
var default_settings := {
    "video": { "fullscreen": false, "vsync": true },
    "audio": { "master_volume": 0.8 },
}

func save_settings(settings: Dictionary) -> void:
    var config := ConfigFile.new()
    for section in settings:
        for key in settings[section]:
            config.set_value(section, key, settings[section][key])

    var err := config.save(SAVE_PATH)          # always check the return value 务必检查返回值
    if err != OK:
        printerr("Failed to save settings: %s" % error_string(err))

func load_settings() -> Dictionary:
    var config := ConfigFile.new()
    # No file yet? Return the defaults (first launch, for example)
    if config.load(SAVE_PATH) != OK:
        return default_settings.duplicate(true)

    var result := default_settings.duplicate(true)
    for section in default_settings:
        for key in default_settings[section]:
            # Passing a default as the third argument makes missing keys safe
            result[section][key] = config.get_value(section, key, default_settings[section][key])
    return result
```

关键细节在于 `get_value()`将默认值作为其第三个参数。稍后添加新设置，任何在旧存档中缺失的键都会被自动填充。这一习惯防止了"更新添加了设置，现在旧存档无法加载"的意外情况

## JSON：Web 互操作与外部工具

JSON 易于阅读且与引擎无关。在与 Web API 通信或与非 Godot 工具（如电子表格或您自己的编辑器）交换数据时，它表现尤为出色。

它有一个弱点：不能直接处理 Godot 特有的类型，比如 `Vector2` 或 `Color`。在保存时，你必须将它们转换为普通的数组或字典，在加载时再转换回来，这意味着你需要自己编写这个转换过程。

```gdscript
# save_load_json.gd
extends Node

const SAVE_PATH := "user://save_game.json"

# Godot types -> plain shapes JSON can hold
func _to_json(value):
    if value is Vector2:
        return { "_type": "Vector2", "x": value.x, "y": value.y }
    return value

# JSON shapes -> back to Godot types
func _from_json(value):
    # JSON objects come back as Dictionary
    if value is Dictionary and value.get("_type") == "Vector2":
        return Vector2(value["x"], value["y"])
    return value

func save_game(state: Dictionary) -> void:
    var file := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
    if not file:
        printerr("Failed to write the JSON file")
        return
    var data := state.duplicate(true)
    data["player_position"] = _to_json(state["player_position"])   # convert first 优先转换
    file.store_string(JSON.stringify(data, "\t"))                  # the 2nd arg is indentation (for readability) 第二个参数是缩进（用于提升可读性）
    file.close()

func load_game() -> Dictionary:
    if not FileAccess.file_exists(SAVE_PATH):
        return {}
    var text := FileAccess.get_file_as_string(SAVE_PATH)   # open, read, and close in one line
    var parsed = JSON.parse_string(text)                   # returns null on failure
    if parsed is Dictionary:
        parsed["player_position"] = _from_json(parsed["player_position"])
        return parsed
    printerr("Failed to parse the JSON file")
    return {}
```

另一个陷阱是数字类型。解析 JSON 可以将所有数字（包括整数）恢复为 float。像 "HP 应该是 100但它返回为 100.0并且我的 ==检查失败" 这样不匹配的情况，如果在加载后明确使用 int()进行转换就会消失。

所以 JSON 非常适合将普通数据导入和导出 Godot，但要用它来保存一次游戏过程则需要大量工作。这时就需要自定义资源了。

## 自定义资源：用于存档数据的推荐方法

一个扩展自 Resource（自定义资源）的自定义类**最符合 Godot 的理念**，并且是保存数据的最佳选择。带有 `@export` 标记的变量会由引擎**自动序列化和反序列化**，因此你完全无需编写转换代码, `Vector2` 和 `Color` 会原样存储。

### 1. 为您的存档数据定义一个资源

创建一个单一的"容器"来列出你想要保存的所有内容，使用 `@export`。这是你的保存数据的蓝图

```gdscript
# save_game.gd
class_name SaveGame
extends Resource

@export var player_name: String = "Hero"
@export var health: int = 100
@export var position: Vector2 = Vector2.ZERO      # Godot-specific types save as-is Godot专属类型按原样保存
@export var inventory: Dictionary = {}
@export var cleared_levels: Array[String] = []
@export var save_version: int = 1                 # for versioning, discussed below 用于下文讨论的版本控制
```

### 2. 使用 `ResourceSaver` 和 `ResourceLoader` 保存和恢复

保存是 `ResourceSaver.save()`，恢复是 `ResourceLoader.load()`。就这样。不需要像 JSON 那样的转换代码。

```gdscript
# save_manager.gd (handy when registered as an Autoload)
extends Node

const SAVE_PATH := "user://savegame.res"    # binary format (see below)

var current_save: SaveGame

func save_game() -> void:
    if current_save == null:
        current_save = SaveGame.new()
    var err := ResourceSaver.save(current_save, SAVE_PATH)   # argument order is (resource, path) 参数顺序为（资源，路径）
    if err != OK:
        printerr("Save failed: %s" % error_string(err))

func load_game() -> bool:
    if not ResourceLoader.exists(SAVE_PATH):
        current_save = SaveGame.new()      # no file, so start with fresh data 没有文件，因此从全新数据开始
        return false
    # CACHE_MODE_IGNORE guarantees a re-read from disk instead of the cache
    # CACHE_MODE_IGNORE 保证从磁盘重新读取，而非使用缓存
    var res := ResourceLoader.load(SAVE_PATH, "", ResourceLoader.CACHE_MODE_IGNORE)
    if res is SaveGame:                     # receiving it as a type keeps things safe 将其作为一种类型接收可保障操作安全
        current_save = res
        return true
    printerr("Failed to load the save file")
    current_save = SaveGame.new()
    return false
```

> 注意: `ResourceSaver.save()` 的参数顺序是 `(resource, path)` 。Godot 3 将它们颠倒了顺序 (path, resource)，所以在参考旧文章时请相应地翻译。

这种方法的令人满意之处在于, `load_game()`可以将其作为 `res is SaveGame` 的类型接收。你永远不会像处理 JSON 那样担心“哪个字典键持有哪个类型”，而是可以通过 current_save.health进行访问，并支持自动补全。

### 在 `.tres` 和 `.res` 之间选择

你传递给 `ResourceSaver.save()`的扩展名决定了格式。

- `.tres`: 人类可以阅读内容。差异可见，因此它与 Git 配合良好，适合调试。开发期间很方便。
- `.res`: 二进制格式; 内容无法读取，但速度快且体积小。与 `.tres`相比，篡改需要更多努力。发布构建的标准格式。

使用 `.tres`进行开发以便检查内容，并在发布时切换到 `.res`，这是一个简单的流程

> 安全提示：自定义资源很方便，但 `.tres`和 `.res`可以嵌入脚本引用，这意味着从不可信的来源（例如有人分发修改后的存档）加载存档可能会执行嵌入的代码。对于游戏内部本地存档来说这不是问题，但如果你的游戏允许玩家共享或上传存档，请使用 JSON 来处理这些数据，或在加载前验证内容。

## 实践：构建一个可在任何地方停止的检查点存档

在 RPG 中保存进度点，在 `roguelike` 中“退出”时暂停保存，在开放世界中自动保存: 虽然类型不同，但任务完全相同。将分散的游戏状态汇集到一个保存数据块中，将其写入，然后在启动时读取它并再次分发。让我们使用上面提到的自定义资源来构建这个流程。

在之前的 `SaveManager` 中添加两个函数: `write_state()` 用于收集状态, `read_state()` 用于分发状态。保存操作本质上就是这一对收集和分发的操作。

```gdscript
# save_manager.gd (Autoload)
extends Node

const SAVE_PATH := "user://savegame.res"
var current_save: SaveGame

# Gather the in-game state into a single SaveGame
# 将游戏内状态汇总至单个存档文件
func write_state(player: Node2D, inventory: Dictionary) -> void:
    current_save = SaveGame.new()
    current_save.health = player.health
    # Godot-specific types go in as-is
    # 特定于Godot的类型直接原样传入
    current_save.position = player.global_position
    # hold a copy to avoid sharing a reference
    # 保存副本，避免共享引用
    current_save.inventory = inventory.duplicate(true)
    ResourceSaver.save(current_save, SAVE_PATH)
    print("Checkpoint recorded")

# Hand the loaded SaveGame back out to each node
func read_state(player: Node2D) -> void:
    # reuse the load_game() from above
    # 复用上面的 load_game()
    if not load_game():
        # no save, so do nothing (stay in the initial state)
        # 无保存，则不做任何事情（保持初始状态）
        return
    player.health = current_save.health
    player.global_position = current_save.position
    player.refresh_inventory(current_save.inventory)

func load_game() -> bool:
    if not ResourceLoader.exists(SAVE_PATH):
        current_save = SaveGame.new()
        return false
    var res := ResourceLoader.load(SAVE_PATH, "", ResourceLoader.CACHE_MODE_IGNORE)
    if res is SaveGame:
        current_save = res
        return true
    current_save = SaveGame.new()
    return false
```

调用端非常简单。当玩家触碰存档点或按下"退出"时立即调用 `write_state()` ，游戏启动时调用 `read_state()`。

```gdscript
# When the player steps on a save point (from an Area2D signal, for example)
# 当玩家踩上存档点（例如通过Area2D信号触发）
func _on_save_point_entered() -> void:
    SaveManager.write_state($Player, inventory_data)

# At game start (in the main scene's _ready, for example)
func _ready() -> void:
    SaveManager.read_state($Player)
```

有两个要点需要记住。

- **将状态处理保持为"收集打包，读取分发"**: 不要将保存逻辑分散到整个游戏中。 SaveManager拥有收集和分发功能，因此当你添加需要保存的内容时，只需编辑 `SaveGame` 和 `write_state` / `read_state`。
- **将 SaveManager 设为 Autoload**: 保存功能需要在不同场景间调用，因此将其作为全局常驻是标准做法。任何场景都可以写入 `SaveManager.write_state(...)`

需要多个存档槽位？根据槽位编号切换 SAVE_PATH (`user://slot_1.res`等后续编号).
需要自动保存？从 `Timer` 定期调用 `write_state()`。同样的基础架构自然能扩展支持这两种功能.

## 常见错误和最佳实践

| 常见错误 | 最佳实践 |
| --- | --- |
| 尝试保存到 `res://` | 始终使用 `user://` 导出后 `res://` 是不可写的 |
| 不检查返回值或空值 | 每次检查 `save()` / `load()`的返回值和 `open()`的空值 |
| 直接将 Godot 特定类型传递给 JSON | 为 JSON 编写转换辅助工具，或使用自定义资源 |
| 保存/加载时屏幕冻结 | 使用 `Thread` 将大量数据移至后台或异步加载 |
| 忽略保存兼容性 | 包含 `save_version` 并为旧版本添加迁移逻辑 |

在发布更新版本的游戏中，保存版本信息尤其有利。给 `SaveGame` 一个 `save_version`, 并在加载时增加一个步骤将旧版本转换为当前格式，你就可以持续更新而不破坏现有存档。即使你目前还没有使用它，保留这个字段也是对你未来自己的馈赠。

## 小贴士：以后需要知道的事情

一旦基础功能正常工作，接下来就是这些需要关注的事项。你目前不需要它们，知道名称就足够了。

- `加密可以防止随意篡改`: `FileAccess.open_encrypted_with_pass()`加密你的存档。密码随构建文件一起发布，所以有决心的玩家可以提取它。将其视为“阻止随意编辑”，并在**服务器上验证**任何需要在网络上保持有效的值。
- `Web（HTML5）构建的存档位置`: `user://`映射到浏览器的 IndexedDB。清除浏览器缓存也会删除存档，因此对于任何重要数据，请考虑使用服务器端存储。
- `异步操作避免卡顿`: 随着存档数据的增长，使用 `Thread` 或 `ResourceLoader.load_threaded_request()` 切换到后台读写，以在加载时保持 UI 的响应性。await 和协程的基础知识是一个很好的起点。

## 总结

- 保存目的地始终为 `user://`。导出后 `res://`为只读。
- 基本映射: ConfigFile 用于设置，JSON 用于外部互操作，自定义资源用于一般保存数据
- 自定义资源通过 `@export` 加上 `ResourceSaver/ ResourceLoader` 进行保存和恢复，无需转换且完全类型安全
- 使用 `.tres` 开发，使用 `.res` 发布。如果游戏加载不受信任的存档，请注意安全。
- 持续保存至“收集打包，读取分发”，并将 `SaveManager` 设为 `Autoload` 以便于管理

首先创建一个 `SaveGame` 资源，仅保存和恢复生命值和位置。一旦“关闭它、重新打开它，并从你离开的地方继续”这一功能开始起作用，你的游戏就会开始感觉像一个完成的产品
