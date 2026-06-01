---
title: 创建自定义节点和编辑器扩展（class_name，@icon，@export）
description: 使用 class_name 定义自定义节点类型，使用 @icon 和 @export 提高编辑器可用性，并使用自定义资源和 EditorInspectorPlugin 扩展检查器。
created: 2026-03-04T15:41:00
---

## 概述

随着 Godot 项目的增长，你会发现自己经常需要创建相同的节点组合，或者想要整理检查器属性。通过将 `class_name`用于自定义节点类型定义，并与 `@export`用于属性导出，你可以创建易于在编辑器中操作的可重用组件。

本文涵盖了自定义节点、 `@export`组织技术、自定义资源创建和检查器扩展的基础知识。

## 使用 class_name 定义自定义节点类型

让我们从自定义节点的基础： 在脚本中 `class_name`会将该类注册为 Godot 编辑器中的全局类型。这提高了代码的重用性和类型安全性，因为该类可以在`Add Node`对话框中搜索，也可以在类型注解中引用。

例如，在动作游戏中，你可以将通用的`HP management`逻辑提取到一个 HealthComponent 组件中，该组件可供敌人、玩家和可破坏物体共享。
以下是基本实现：

```gdscript
# health_component.gd
class_name HealthComponent
extends Node

signal died
signal health_changed(new_health: int)

@export var max_health: int = 100
var current_health: int

func _ready():
    current_health = max_health

func take_damage(amount: int):
    current_health = max(current_health - amount, 0)
    health_changed.emit(current_health)
    if current_health <= 0:
        died.emit()

func heal(amount: int):
    current_health = min(current_health + amount, max_health)
    health_changed.emit(current_health)
```

**注册后您可以进行以下操作** ：

- 在`Add Note`对话框中搜索并添加 `HealthComponent`
- 使用类型注解，例如 `var health: HealthComponent`
- 使用 `is`运算符检查类型： `if node is HealthComponent:`

>**Tips**：`class_name`注册在全局命名空间中，因此项目中重复的名称会导致错误。对于大型项目或插件开发，请考虑使用前缀来避免冲突。

## 使用 @icon 设置自定义图标

现在您已经定义了自定义节点类型，接下来让我们优化它的外观。使用 `@icon`可以自定义节点的编辑器图标。随着场景树中自定义节点的增多，默认图标会让它们难以区分。而使用专属图标则可以使每个节点的功能一目了然。

```gdscript
# icon use
@icon("res://icons/health_heart.svg")
class_name HealthComponent
extends Node
```

- 场景树和添加节点对话框中均有体现。
- 建议使用 SVG 格式（缩放时不会出现画质下降）。
- 编辑器中图标显示尺寸为 16x16 像素。

```gdscript
@icon("res://icons/hitbox.svg")
class_name HitboxComponent
extends Area2D

@export var damage: int = 10
```

## 使用 @export 公开属性

自定义节点外观解决后，让我们通过检查器实现可配置属性。带有`@export`的变量会出现在检查器中，并在编辑器中可编辑。无论是敌人移动速度还是最大生命值，你都可以在不动脚本的情况下调整关键游戏参数，让与设计师的协作更加顺畅。
>`@export` 注解: 允许导出常见Godot内置类型

```gdscript
class_name EnemyConfig
extends CharacterBody2D

# Basic types
@export var speed: float = 100.0
@export var enemy_name: String = "Goblin"
@export var is_boss: bool = false

# With range
@export_range(0, 100, 1) var health: int = 50
@export_range(0.0, 10.0, 0.1) var attack_interval: float = 2.0

# Resource references
@export var sprite_texture: Texture2D
@export var death_effect: PackedScene

# Enum
@export_enum("Patrol", "Chase", "Guard") var ai_type: String = "Patrol"

# Color
@export var tint_color: Color = Color.WHITE

# File path
@export_file("*.tscn") var next_scene: String
```

>`Array` 和 `Dictionary`

你还可以导出数组类型的属性，比如巡逻路线点或投放物品列表。

```gdscript
# Typed arrays
@export var patrol_points: Array[Vector2] = []
@export var drop_items: Array[PackedScene] = []

# Flag enum
@export_flags("Fire", "Water", "Earth", "Wind") var elements: int = 0
```

如果你想导出`位掩码标记-flags`。可以使用逐位运算检查单个标志。
>`@export_flags int`

```gdscript
# How to check flags
const FIRE = 1
const WATER = 2
const EARTH = 4
const WIND = 8

func has_element(flag: int) -> bool:
    return elements & flag != 0

# Usage
if has_element(FIRE):
    print("Has fire element")
```

## 用 `@export_group` | `@export_subgroup` 组织导出属性

既然你已经了解了导出类型，接下来我们来谈谈组织。当你有10~20个导出属性时，检查器会变得冗长并且难以检阅。组织则可以帮助你保持整洁和易于导航。

以下示例将玩家角色的移动、战斗和视觉属性组织成清晰的组别：

```gdscript
class_name PlayerCharacter
extends CharacterBody2D

@export_group("Movement")
@export var move_speed: float = 200.0
@export var jump_force: float = 400.0
@export var gravity_scale: float = 1.0

@export_group("Combat")
@export var attack_power: int = 10
@export var defense: int = 5

@export_subgroup("Weapon")
@export var weapon_range: float = 50.0
@export var weapon_cooldown: float = 0.5

@export_subgroup("Special")
@export var special_attack_cost: int = 20
@export var special_damage_multiplier: float = 2.5

@export_group("Visual")
@export var trail_color: Color = Color.CYAN
@export var particle_effect: PackedScene
```

你可以自己尝试以上代码发现检查器有何不同。大概表现会如下：

- `@export_group`创建可折叠的节头
- `@export_subgroup`作为小组内的子部分出现
- 保持属性有序，减少配置错误

## 创建自定义资源

到目前为止，我们一直在节点上暴露属性，但有时你想把数据本身和脚本分开。例如，RPG 中的武器数据会将名称、攻击力、射程、图标等信息捆绑在一起。通过将它定义为 **资源**，你可以将其保存为文件(`.tscn`)，在多个节点间共享，并通过编辑器中的拖放方式分配。

```gdscript
# weapon_data.gd
class_name WeaponData
extends Resource

@export var weapon_name: String = ""
@export var damage: int = 10
@export var attack_speed: float = 1.0
@export var range: float = 50.0
@export var icon: Texture2D
@export_multiline var description: String = ""
```

**如何创建资源文件：**

1. 在文件系统中右键`新建` -> `资源`
2. 搜索并选择 `WeaponData`
3. 在检查器中设置数值，并保存未`file.tres`

>Example:

```gdscript
# Usage example: weapon_holder.gd
class_name WeaponHolder
extends Node

@export var equipped_weapon: WeaponData

func get_damage() -> int:
    if equipped_weapon:
        return equipped_weapon.damage
    return 0
```

**这样做的好处**：

- 将数据和逻辑分离
- 能够编辑器中拖放赋值
- 多个节点共享资源

**共享资源注意事项**：当多个节点引用同一个文件时，更改其中一个节点的属性会影响所有节点。如果你需要每个节点的值，可以用来创建副本，或者在检查器里的资源部分启用`local to scene`。

```gdscript
func _ready():
    # 复制共享资源，以便独立对其进行修改
    equipped_weapon = equipped_weapon.duplicate()
    equipped_weapon.damage = 20  # 仅对此节点生效
```

## 使用 EditorInspectorPlugin 扩展属性编辑器

当选中特定自定义节点时，你可以为检查器添加自定义 UI。你有没有想在检查器里直接看到伤害计算预览，比如在选择武器持有者时？这个功能让这成为可能。

以下代码在选择武器持有者时，在检查器顶部添加装备信息和伤害预览按钮：

```gdscript
# addons/my_tools/custom_inspector.gd
@tool
class_name WeaponDataInspector
extends EditorInspectorPlugin

func _can_handle(object: Object) -> bool:
    return object is WeaponHolder

func _parse_begin(object: Object):
    var holder = object as WeaponHolder
    if holder.equipped_weapon:
        var info = Label.new()
        info.text = "Equipped: %s (ATK: %d)" % [
            holder.equipped_weapon.weapon_name,
            holder.equipped_weapon.damage
        ]
        add_custom_control(info)

        var preview_button = Button.new()
        preview_button.text = "Preview Damage Calculation"
        preview_button.pressed.connect(func():
            print("Estimated damage: %d" % holder.get_damage())
        )
        add_custom_control(preview_button)
```

```gdscript
# addons/my_tools/plugin.gd
@tool
extends EditorPlugin

var inspector_plugin: WeaponDataInspector

func _enter_tree():
    inspector_plugin = WeaponDataInspector.new()
    add_inspector_plugin(inspector_plugin)

func _exit_tree():
    if inspector_plugin:
        remove_inspector_plugin(inspector_plugin)
```

**激活插件**：EditorInspectorPlugin 需要文件`plugin.cfg`，并且必须在项目设置中启用。

```text
; addons/my_tools/plugin.cfg
[plugin]
name="My Tools"
description="Custom inspector for WeaponHolder"
author="Your Name"
version="1.0"
script="plugin.gd"
```

1. 放置，然后添加文件 `plugin.cfg` `plugin.gd`  `custom_inspector` `addons/my_tools/`
2. 在 `项目设置`中启用插件。`项目设置` -> `插件`

## 自定义节点 VS 组合

有没有想过是创建自定义节点，还是直接合并现有节点（组合）？每种方法都有其优势，选择取决于项目规模和可重复使用性。

| ---------- | 自定义节点 | 组合（子节点设置） |
| ---------- | --------------- | ----------- |
| **可重复使用性** | 易于在整个项目中重复使用 | 通常局限于特定场景 |
| **可发现性** | 出现在添加节点对话框中 | 需要搜索场景文件 |
| **类型安全** | 可通过运算符与类型注解进行校验 | 需要验证脚本的存在 |
| **复杂性** | 最适合单一用途的功能 | 最适合组合多个节点 |
| **配置** | 通过检查器直接设置 | 每个子节点的个性化设置 |

**选择指南：**

```gdscript
# 自定义节点：复用单一功能模块
@icon("res://icons/health.svg")
class_name HealthComponent
extends Node
# -> 在敌人、玩家、可破坏物体等对象之间共用

# 组成结构：组合多个节点
# player.tscn
# ├── CharacterBody2D
# │   ├── HealthComponent
# │   ├── MovementComponent
# │   ├── Sprite2D
# │   └── CollisionShape2D
# -> 保存为场景并按需实例化
```

## 总结

- **class_name** 定义了自定义节点类型，使其可在添加节点对话框和类型注释中使用
- **@icon** 会自定义编辑器图标，以便更好地视觉识别
- **@export** 在检查器中暴露属性，进行无代码的调整
- **@export_group / @export_subgroup** 组织大量属性
- **自定义资源将**数据与逻辑分离，以提高可复用性
- **EditorInspectorPlugin** 在选择特定节点时会显示自定义界面
- 使用**自定义节点**实现可重复使用的单一用途功能；在复杂的多节点设置中使用**组合**

## 资料

- [GDScript 导出属性 — Godot Engine (4.x) 简体中文文档](https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/gdscript/gdscript_exports.html)
- [资源 — Godot Engine (4.x) 简体中文文档](https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/resources.html)
- [EditorInspectorPlugin — Godot Engine (4.x) 简体中文文档](https://docs.godotengine.org/zh-cn/4.x/classes/class_editorinspectorplugin.html)
