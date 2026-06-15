---
title: 基于信号的节点通信
description: 从基础知识到实际应用和最佳实践，学习 Godot 的信号功能，实现松耦合组件设计，同时避免直接引用。
created: 2026-05-29T11:02:00
---
## 概述

随着 Godot 开发的深入，节点之间需要相互通信。例如，“当玩家触摸金币时，金币消失，UI 分数增加”。初学者往往会直接从玩家脚本中引用金币或 UI 节点（使用 `get_node()`或 `$`）。

```gdscript
# 反面示例：玩家模块直接依赖界面管理器与音效管理器
func _on_area_entered(area):
    if area.is_in_group("enemy_attack"):
		get_node("/root/Game/UI/HealthBar").update_health(health)
        get_node("/root/Game/SoundManager").play_sfx("player_hurt")
```

这种**紧耦合**设计对场景结构的变化极其脆弱，会阻碍节点重用，并使调试变得困难。 **信号**是 Godot 解决此问题并保持节点“松耦合”的基本机制。

## 什么是信号？广播“发生了一件事！”

信号是一种机制，它允许一个节点向其他节点**广播** “发生了特定事件”。信号发送者（ **发射器** ）不需要知道谁在监听。它只是简单地发出“玩家受到伤害了！”这样的信号。

同时，对该广播感兴趣的节点（ **接收器** ） **会订阅（连接）** 特定信号。当信号发出时，其指定的回调方法（ **回调函数** ）会自动被调用。

这种广播器-接收器关系使得发送器和接收器无需直接了解彼此即可进行协作。这就是优秀软件设计的基本原则，称为“ **关注点分离** ”。

## 如何使用信号

连接信号主要有两种方式：**通过编辑器** 和 **通过代码**。

### 编辑器连接（最简单）

最直观、最直接的方法。我们来看一个 `Button`按下时执行处理的示例。

1. **选择信号发射节点** ：在场景树中选择 `Button`节点。
2. **打开 `Node` 选项卡** ：打开检查器旁边的  `节点` 选项卡，然后选择`信号`选项卡。您将看到 `Button`内置信号的列表，例如 `pressed()`信号。
3. **连接信号** ：双击 `pressed()`信号（或选中它并单击“连接”）。
4. **选择接收器和方法** ：此时将打开“连接信号”对话框。选择要接收信号的节点，并确定要调用的方法名称。单击“连接”完成操作。

这会自动在接收器节点的脚本中生成一个具有指定名称的方法。

```gdscript
# 由接收端脚本自动生成
func _on_button_pressed():
    print("Button was pressed!")
    # 在此处编写你想要执行的处理操作
```

### 代码（GDScript）连接

很多情况下都需要代码连接，例如动态生成节点时。请使用 `connect()`方法。

```gdscript
# Player.gd
func _ready():
    var hud = get_node("/root/Game/UI/HUD")
    health_changed.connect(hud._on_player_health_changed)
```

在 Godot 4 中，使用 `Callable`可以让编辑器在方法不存在时检测到错误，从而提高安全性。

## 实践：使用自定义信号连接组件

信号真正价值的关键在于定义自定义信号，而不仅仅是使用内置信号。让我们重构一下玩家受到伤害的场景。

>**Player.gd（发射器侧）**

使用 `signal`关键字声明自定义信号，并在健康状况发生变化时使用 `emit()`发出信号。

```gdscript
extends CharacterBody2D

# 健康状态变更通知信号
signal health_changed(current_health, max_health)
# 死亡通知信号
signal died

@export var max_health: int = 100
var current_health: int

func _ready():
    current_health = max_health

func take_damage(amount: int):
    current_health = max(0, current_health - amount)
    health_changed.emit(current_health, max_health)

    if current_health <= 0:
        died.emit()
        queue_free()
```

>**HUD.gd（接收端）**

订阅玩家的 `health_changed`信号并更新 UI 显示。

```gdscript
extends CanvasLayer

@onready var health_bar: TextureProgressBar = $HealthBar

func _on_player_health_changed(current_health, max_health):
    health_bar.max_value = max_health
    health_bar.value = current_health
```

>**GameManager.gd（另一个接收器）**

订阅玩家 `died`信号并处理游戏结束事件。

```gdscript
extends Node

func _on_player_died():
    print("Player died. Transitioning to game over screen.")
    get_tree().change_scene_to_file("res://game_over_screen.tscn")
```

这样， `Player`只需广播其状态变化，而 UI 和游戏管理器则监听并履行各自的职责。

## 常见错误和最佳实践


| **常见错误**        | **最佳实践**                                                                                |
| --------------- | --------------------------------------------------------------------------------------- |
| **用信号连接一切**     | **注意区分关注点。** 对于关系密切的情况，例如父母直接控制子女，直接调用方法通常更自然。                                          |
| **忘记断开信号**      | 当使用 `queue_free()`删除发射器时，断开连接是自动的。但是，如果先删除接收器，或者动态断开连接（参见下面的代码示例），则需要手动 `disconnect()`。 |
| **将节点引用作为参数传递** | 仅传递 ID、数字或字符串等数据。如果接收方需要节点引用​​，则应通过 ID 搜索，以保持松耦合。                                       |
| **信号名称拼写错误**    | 使用 Godot 4 的 `Callable`或 `await`语法可以在编译时检测错误，防止拼写错误。                                    |
| **用于全局事件**      | 对于游戏范围内的事件（例如，游戏暂停），使用单例（自动加载）信号“事件总线”模式更容易管理。                                          |

### 信号断开（断开）示例

```gdscript
# 动态连接/断开信号的示例
var callback: Callable

func _ready():
    callback = _on_player_health_changed
    player.health_changed.connect(callback)

func _exit_tree():
    # 在节点从场景树中移除前执行断开连接操作
    if player and player.health_changed.is_connected(callback):
        player.health_changed.disconnect(callback)

func _on_player_health_changed(current_health, max_health):
    # Processing...
    pass
```

## 性能与替代方案

- **性能** ：信号调用相比直接函数调用略有开销。这​​是因为它内部会遍历一个 `Callable`列表，但这种差异在大多数游戏中很少会成为瓶颈。设计清晰度和可维护性提升带来的好处远远超过了这点微小的开销。
- **另一种模式（事件总线）** ：将信号集中到一个单例对象（通过自动加载实现）中，使其成为全局“事件总线”，也十分强大。这使得场景树中任何位置都可以发送和接收事件，从而实现完全独立系统之间的通信。

## 总结

在 Godot 中，信号是节点间通信最简洁、最推荐的方式。

- **发送者** ：只是大喊“发生了一件事”，不在乎谁在听。
- **接收器** ：注册接收它们想要听到的信号，并在被调用时执行其工作。

通过设计组件时考虑到这种松耦合原则，您可以提高场景的可重用性，减少错误，并构建能够适应变化的项目。当您发现自己编写的代码直接使用 `get_node()`引用父节点或兄弟节点时，请养成停下来思考“这是否可以使用信号来实现？”的习惯。这是成为 Godot 高手的第一步。