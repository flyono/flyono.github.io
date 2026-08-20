---
title: 创建和使用自定义资源——在 Godot 中实现数据驱动设计
description: 如何在 Godot 中使用自定义资源（扩展自 Resource 类的对象）来构建数据驱动的设计。介绍了如何将逻辑与数据分离，如何在 Inspector 界面中进行编辑，以及如何将文件保存为.tres 格式。还讲解了如何通过继承方式创建子类，如何在运行时通过重复赋值来确保数据的安全性，同时比较了 JSON、CSV 和 SQLite 这三种数据交换格式。
created: 2026-08-07T13:44:22
---

当敌人的属性直接写入脚本中时，每一种新的敌人类型都意味着需要复制粘贴代码，而每次调整平衡时又都需要修改代码。更糟糕的是，设计师和规划者无法在不修改代码的情况下改变任何一个数值。

**自定义资源**解决了这个问题。你可以扩展 Godot 的 Resource系统，创建属于自己的数据类型，将**游戏逻辑(代码)**与**数据(值)**分离开来。这相当于 Godot 中的 Unity 的 `ScriptableObject` 机制，也是数据驱动设计的基石。

## 数据驱动设计意味着什么

数据驱动设计的核心思想是将**"处理"过程与"数据"分离**。你将可替换的数据输入到通用代码中，从而生成多种不同的结果。

例如，你可以编写一个脚本来让敌人具有不同的行为。只要向代码中输入"slime data", "goblin data" 或 "dragon data"，同样的代码就能每次生成不同的敌人。通过避免**硬编码**数据，你就可以实现这样的效果：

- 添加一个敌人意味着需要添加一个数据文件，而不是代码。
- 平衡调音实际上是在编辑器中进行数值调整，而无需直接修改代码。
- 规划师和设计师无需掌握编程技能，就可以编辑数据。

这样就能让开发过程更加顺畅了。而自定义资源正是承载这些"数据"的关键所在。

## 定义和使用自定义资源

对于自定义资源，您可以在扩展 `Resource` 的脚本中定义其类型，修改 `Inspector` 中的数值，然后将这些数据保存为 `.tres` 文件。

首先，继承`Resource`资源, 并使用 `@export` 列出其属性。添加 `class_name` 后，它就可以被用作全局类型了。

```gdscript
# character_data.gd
class_name CharacterData
extends Resource

@export var character_name: String = "New Character"
@export var max_health: int = 100
@export var attack_power: float = 15.0

enum Job { WARRIOR, MAGE, ROGUE }
@export var job: Job = Job.WARRIOR         # enums become dropdowns in the Inspector

# You can also attach logic tied to the data as methods
func get_description() -> String:
    return "%s / HP:%d / ATK:%.1f / %s" % [
        character_name, max_health, attack_power, Job.find_key(job)]

```

一旦保存了资源，就在 FileSystem 的 dock 界面右键点击，选择"创建 -> 资源"，选择 `CharacterData` 作为资源名称，然后将其保存为 `player_data.tres` 这样的名称。之后，任何节点都可以直接将该资源类型用于自己的节点中。

```gdscript
extends CharacterBody2D

@export var data: CharacterData      # drag the .tres onto it in the Inspector 在检查器中将.tres文件拖拽到其上

func _ready() -> void:
    if data:
        print(data.get_description())  # behavior driven by the data 数据驱动的行为
```

因为你可以使用 `@export var data: CharacterData` 来明确声明类型，所以 `Inspector` 只接受 `CharacterData` 和 `.tres` 这样的文件格式，这样就能确保类型的准确性了。

## 实践操作：通过继承机制构建物品数据库

在物品或敌人数据库中，自定义资源表现得最为出色。角色扮演游戏中的装备、`roguelike` 风格的可消耗物品、卡牌游戏中的卡片…… "继承"这个概念清晰地体现了"共享的基础架构加上每种类型的独特差异"。

从 `ItemData` 开始，这是每个项目的共同基础。

```gdscript
# item_data.gd
class_name ItemData
extends Resource

@export var item_id: int = 0
@export var item_name: String = "Unknown Item"
@export_multiline var description: String = ""
@export var icon: Texture2D
@export var stackable: bool = true
```

武器和药剂需要各自独立的属性数据。只需继承来自 `ItemData` 的数据，并添加那些缺失的要素即可。

```gdscript
# weapon_data.gd
class_name WeaponData
extends ItemData                 # inherits every property of ItemData 继承 ItemData 的所有属性

@export var attack_bonus: float = 5.0   # weapon-only extra property 武器额外属性
@export var weapon_type: String = "Sword"
```

现在， WeaponData仍然保留像 item_name这样的共享字段，同时还会获取与武器相关的字段。在加载数据时，可以通过类型来区分这些字段。

```gdscript
func load_item(path: String) -> ItemData:
    var res := ResourceLoader.load(path)
    if res is WeaponData:
        print("Weapon: ATK +%.1f" % res.attack_bonus)
    return res if res is ItemData else null
```

对于继承这一概念本身，《面向对象设计模式》是一本非常有用的参考书。将共享成员放在基类中，而具体实现则放在派生类中。这样，无论添加多少种对象类型，你的类结构都能保持清晰易管理。

## 使用 `duplicate()` 函数来安全地进行运行时修改

需要注意一点：资源是共享的。如果将相同的 `.tres` 分配给十个敌人，那么所有十个敌人都会查看同一个数据实例。如果你更改了一个敌人的生命值，那么所有敌人的生命值都会随之改变。

当你需要在运行时获取每个实例独立的值时，请使用 `duplicate()` 创建副本，再对副本进行修改。

```gdscript
func _ready() -> void:
    # Hold a private copy rather than the shared original
    data = data.duplicate()
    # From here on, any change to data leaves other instances and the .tres untouched
    data.max_health += 20
```

对于需要针对每个实例进行单独调整的设定，比如"让每个敌人的生命值都有所不同"或者"减少玩家选择的药物的消耗"，一定要先 `duplicate()` 处理这些细节。相反，那些需要跨所有实例共享的设定（如主数据），则应该保持共享状态，并且只能进行只读操作。

## 在两种选项中做出选择

自定义资源并不是存储游戏数据的唯一方式。选择哪种方式取决于规模和需求。

| 方法 | 优势 | 优势 |
| --- | --- | --- |
| 自定义资源 | 编辑器集成、类型安全、代码复用 | 结构化数据：字符、项、技能 |
| JSON | 易于人类理解，与引擎无关 | 配置文件、外部工具接口交互 |
| CSV | 可以在电子表格中编辑 | 大量简单的记录(如对话列表等) |
| SQLite | 针对大型数据集的快速查询 | 超过几万条记录的项目或用户数据 |

对于需要存储在 Godot 内部的结构化数据，自定义资源是首选方案。在与外部工具交换数据时可以使用 `JSON` 格式；在翻译和批量对话处理中可以使用 `CSV` 格式；当需要处理数千条记录时，则可以使用 `SQLite` 数据库。

## 额外提示：一些值得了解的信息，以备后续参考之用

- 88`.tres`与 `.res`**: `.tres`是文本格式，与 Git 协作得很不错，非常适合开发使用。 .res是二进制格式，加载速度更快，体积也更轻，适合用于发布版本。在 .tres中进行开发，然后将结果输出到 .res中，这是标准的开发流程。
- **批量异步加载资源**: 在启动时会加载所有资源，这会带来较大的负担。因此，建议使用 `ResourceLoader.load_threaded_request()`
- **通过信号来通知变更情况**: 通过信号来通知变更情况：如果您希望告知其他系统某个资源中的值已经发生变化，那么请在该资源中定义一个信号。
- **用于保存数据**: 它们也用于保存数据：你可以将游戏状态打包到一个自定义资源中并进行保存。关于这一点，我们可以在“实现保存/加载系统”这一章节中进行详细讨论。

## 总结

- 自定义资源是您自己定义的数据类型，它们可以扩展 `Resource的` 功能，将逻辑与数据分离开来。
- 使用 `class_name + @export`来定义类型，在检查器中编辑值，然后保存到 `.tres` 中。
- 利用继承机制，可以将共享字段保留在基类型中，而将具体信息放在派生类型中，这样就能实现系统的可扩展性。
- `duplicate()`在修改之前，你可以创建每个实例都不同的版本，而不会破坏共享数据。
- 根据规模和需求，选择 `JSON`、`CSV` 或 `SQLite` 格式进行存储。

首先，将角色的基本属性调整到 `CharacterData` 这个范围内，然后调整编辑器中的数值。一旦你感受到了无需编写代码就能修改游戏设计的乐趣，那么你就已经迈出了数据驱动设计的第一步了
