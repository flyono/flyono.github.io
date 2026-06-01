---
title: 利用自动加载 (Autoload) 管理跨场景数据
description: 一份关于 Godot 引擎自动加载（单例）功能的全面指南，从基本用法到常见错误、最佳实践以及与其他模式的比较。
created: 2026-05-22T08:59:00
---
## 概述

随着游戏开发的进行，你会遇到诸如“我想把玩家的生命值和装备带到下一关”、“我想保留收集到的物品信息”或“我想集中管理游戏全局设置”之类的需求。然而，当使用 `change_scene_to_file() 切换场景时，默认情况下所有旧场景的信息都会被丢弃。

跨场景持久化数据最标准、最强大的解决方案是**自动加载**功能。它是 Godot 引擎级实现的“单例模式”（Singleton pattern），这种模式在软件设计中广为人知，并且使用起来非常方便。

本文涵盖基本设置、实用代码示例、常见错误和最佳实践，以及与替代数据共享方法的比较。

## 什么是 自动加载(单例)

自动加载指的是 Godot 在游戏启动时自动实例化并驻留在场景树根目录的节点或脚本。一旦注册为自动加载，它们就会一直保存在内存中直到游戏结束，从而允许任何场景中的任何脚本像访问全局变量一样直接访问它们。

这种“单个实例可从任何地方访问”的设计模式通常被称为**单例**模式。

### 主要用途

自动加载功能非常适合需要 **在游戏范围内共享和管理** 的元素：

- **全局状态管理** ：玩家得分、金钱、生命值、物品栏——与游戏进程相关的信息。
- **实用功能** ：声音管理器、场景过渡淡入淡出效果、HTTP 请求管理——您可以从任何地方调用的常用功能。
- **系统管理** ：游戏全局管理器、事件系统（信号总线）——核心应用程序功能。

## 自动加载 基本设置

自动加载配置只需在项目设置中完成几个步骤。

### 1. 创建全局脚本

首先，创建一个包含您想要管理的数据或功能的脚本。以下是一个用于管理玩家数据和游戏设置的示例脚本 `PlayerData.gd`：

```gdscript
# PlayerData.gd
extends Node

# 基础玩家信息
var player_name: String = "Hero"
var health: int = 100
var max_health: int = 100

# 游戏进度
var score: int = 0
var high_score: int = 0

# 记录已开启宝箱的 Dictionary
# Key: "SceneName_ChestID", Value: bool (true if opened)
var opened_chests: Dictionary = {}

func add_score(amount: int) -> void:
    score += amount
    if score > high_score:
        high_score = score

func take_damage(amount: int) -> void:
    health -= amount
    if health < 0:
        health = 0

func is_chest_opened(chest_id: String) -> bool:
    return opened_chests.has(chest_id)

func mark_chest_as_opened(chest_id: String) -> void:
    opened_chests[chest_id] = true
```

### 2. 在项目设置中注册

1. 从菜单栏中选择 **“项目”→“项目设置”** 。
2. 选择顶部的 **“全局”** 选项卡。
3. 单击 **“路径”** 字段旁边的文件夹图标，然后选择您创建的 `PlayerData.gd`文件。
4. **“节点名称”** 会自动变为 `PlayerData`（与脚本名称相同）。这将作为全局访问的名称。
5. 按 **“添加”** 按钮进行注册。

设置完成。运行游戏时，Godot 会自动实例化 `PlayerData.gd`并使其作为 `PlayerData`可访问。

## 从脚本访问

在自动加载函数中注册的节点会以全局变量的形式存在，使用它们注册的“节点名称”。您可以直接从任何脚本访问它们，而无需事先调用 `get_node()`或 `@onready`。


### 实用代码示例

#### 击败敌人时加分

```gdscript
# Enemy.gd
func die():
    # 直接调用玩家数据的函数
    PlayerData.add_score(100)
    print("Current score: ", PlayerData.score)
    queue_free()
```


#### 打开宝箱

```gdscript
# TreasureChest.gd
@export var chest_id: String = "level1_gold_chest"

func _ready():
    # 检查是否已打开并更新外观
    if PlayerData.is_chest_opened(chest_id):
        $Sprite2D.frame = 1 # Show opened sprite
        is_open = true

func open():
    if is_open: return

    # 在 PlayerData 中标记为已开启
    PlayerData.mark_chest_as_opened(chest_id)

    # Process contents...
    print("Opened treasure chest!")
```

#### 在用户界面上显示高分

```gdscript
# GameOverScreen.gd
func _ready():
    # 直接引用 PlayerData 的 变量
    $HighScoreLabel.text = "High Score: %d" % PlayerData.high_score
```

## 常见错误和最佳实践

自动加载虽然方便，但误用会使项目结构复杂化，并显著降低可维护性。


| 常见错误              | 最佳实践                        | 解释                                                                          |
| ----------------- | --------------------------- | --------------------------------------------------------------------------- |
| **将所有内容都设置为自动加载** | **仅注册真正的全局项目**              | 保持全局状态简洁；特定于某些场景或功能的数据应在它们内部进行管理。                                           |
| **直接从自动加载操作其他节点** | **使用信号进行松耦合**               | 不要让 Autoload 直接更改 UI 节点 `text`，而是在 Autoload 中定义信号，让 UI 连接到这些信号来更新自身。        |
| **创造一个巨型万能类**     | **按职责拆分自动加载**               | 按角色分离脚本： `GameState`、 `SoundManager`、 <br>`SceneTransition`、 `SaveSystem`等。 |
| **允许从任何位置更改状态**   | **使用 setter/getter 控制访问权限** | 使用属性（Godot 4.x），将值更改限制在函数调用中，以便于调试。                                         |

### 最佳实践示例：使用信号进行 UI 更新

让我们使用信号来改进之前的 `PlayerData.gd`文件：

```gdscript
# PlayerData.gd (improved version)
extends Node

# Signal emitted when score is updated
signal score_updated(new_score)

# Backing field (internal variable holding the actual value)
var _score: int = 0

# Property for external access
var score: int:
    get:
        return _score
    set(value):
        _score = value
        score_updated.emit(_score)  # Godot 4.x recommended signal emission

var high_score: int = 0

func add_score(amount: int) -> void:
    self.score += amount  # Use self.score to trigger the setter
    if _score > high_score:
        high_score = _score

# ... other functions remain the same ...
```

>**注意** ：在 setter 方法中直接给同一个属性名赋值可能会导致无限递归。因此，为了安全起见，请使用一个**后备字段** （保存实际值的内部变量），例如 `_score`，并在 setter 方法中给该后备字段赋值。

UI 脚本连接到此信号：

```gdscript
# ScoreLabel.gd
extends Label

func _ready():
    # 连接玩家数据的信号
    PlayerData.score_updated.connect(self._on_score_updated)
    # 显示初始分数
    _on_score_updated(PlayerData.score)

func _on_score_updated(new_score: int):
    text = "Score: %d" % new_score
```

采用这种设计， `PlayerData`无需了解 `ScoreLabel`的存在。即使 UI 结构发生变化， `PlayerData`的代码也无需修改。这就是**松耦合**的优势所在。

## 与其他模式的比较

自动加载虽然方便，但并非总是最佳选择。了解它与其他设计模式的比较，有助于您根据具体情况做出合适的选择。


| Pattern                  | 用例           | 优势                          | 缺点                       |
| ------------------------ | ------------ | --------------------------- | ------------------------ |
| **Autoload (Singleton)** | 全局状态管理、实用功能  | 访问非常方便。由 Godot 引擎官方支持。      | 依赖关系很容易变得复杂（紧耦合），污染全局空间。 |
| **场景转换期间的参数传递**          | 将临时信息传递给下一场景 | 简单易用，不会创建不必要的全局状态。          | 难以在多个场景中维护数据。            |
| **自定义资源（Resource）**      | 管理持久化数据集     | 文件保存/加载简便。可通过检查器编辑。高度可重复使用。 | 运行时动态状态管理需要额外的步骤。        |

#### 何时使用自动加载？

- **应该在整个应用程序中保持独特的功能** ：声音管理器、保存/加载系统等。
- **经常从多个不相关的场景中访问的数据** ：玩家得分、金钱等。

#### 何时考虑替代方案？

- **仅将信息传递到下一场景** ：考虑在场景转换期间传递参数。
- **将数据作为蓝图进行管理，例如物品数据或角色属性** ：自定义资源非常强大。
- **编写单元测试时** ：Autoload 的全局状态使得测试变得困难。采用依赖注入 (DI) 原则——通过构造函数或 `@export`变量传递依赖对象，而不是直接引用 Autoload——可以更轻松地替换模拟对象（测试替代对象）。

## 进阶相关

掌握了自动加载之后，不妨挑战更精细的架构：

- **自定义资源** ：学习数据驱动的物品数据库、技能树、角色属性设计可以提高项目的可扩展性。
- **信号总线** ：使用 Autoload 构建一个全局事件系统（信号总线），供游戏全域使用。
- **数据保存和加载** ：学习如何使用 `FileAccess`将 `PlayerData`中汇总的信息保存到文件中，并在恢复游戏时加载它。

## 总结

自动加载是 Godot 中全局数据管理的基础，也是跨场景持久化信息的强大工具。虽然设置简单，但其强大的功能也是一把双刃剑——未经计划的使用可能会模糊项目的清晰度。

关键在于**辨别哪些内容真正需要全局化，根据职责合理地分离类，并使用信号与其他系统保持松耦合** 。参考本文介绍的最佳实践和替代模式对比，为您的项目设计最佳架构。

## TODO 相关说明

