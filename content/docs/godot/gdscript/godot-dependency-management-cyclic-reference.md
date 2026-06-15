---
title: Godot 中的依赖管理：避免循环引用的设计模式
description: 防止循环引用导致内存泄漏的设计模式。学习如何使用 Wea​​kRef、信号和自动加载机制。
created: 2026-05-25T11:15:00
---
## 概述

在使用 Godot 引擎开发游戏时，管理脚本和场景之间的**依赖关系**是一个不可避免的问题。特别是，如果你在设计时没有理解**引用计数**机制，就会面临“ **循环引用** ”导致的内存泄漏。

本文解释了循环引用问题，并介绍了利用**弱引用** 、 **信号**和**自动加载的**设计模式。

## Godot 的内存管理和循环引用

### 引用计数系统

Godot 对象主要分为两类：


| 类型              | 示例                                   | 内存管理                        |
| --------------- | ------------------------------------ | --------------------------- |
| `Node` 派生类      | CharacterBody2D,  CharacterBody2D 等。 | 从场景树中移除时释放（ `queue_free()`） |
| `RefCounted`派生类 | Resource, Array, Dictionary          | 当引用次数达到 0 时自动释放             |

循环引用导致的内存泄漏主要发生在 **RefCounted 派生类**中。

### 循环引用如何导致内存泄漏

```
Object A  --->  Object B
    ^               |
    |_______________|
```

当 A 和 B 相互引用时，即使外部引用消失，它们的引用计数仍然保持在 1 或更高。因此，它们永远不会从内存中释放。

## 常见错误和最佳实践

| 常见错误                     | 最佳实践                                  |
| ------------------------ | ------------------------------------- |
| **父级引用子级，子级也直接引用父级**     | 子进程应通过 `get_parent()`或信号通知父进程         |
| **物品资源引用玩家，玩家也引用物品**     | 资源仅保存数据，Player 在使用时作为参数传递。            |
| **SFX、UI 等直接修改自动加载内部结构** | 单例模式提供了一些修改方法，其他人就直接称之为单例模式。          |
| **临时效果的相互参照**            | 使用 Wea​​kRef 作为其中一方的弱引用，或者通过信号通知效果完成。 |

## 方案一：弱引用（WeakRef）

打破循环引用的最直接方法是使用弱引用，这样不会增加引用计数。

### 实际案例：装备与角色

```gdscript
# Equipment.gd (RefCounted)
class_name Equipment
extends RefCounted

var owner_ref: WeakRef # Weak reference

func get_owner() -> Character:
    if owner_ref:
        var ref = owner_ref.get_ref()
        if ref:
            return ref
    return null
```

```gdscript
# Character.gd (Node)
class_name Character
extends CharacterBody3D

var equipped_item: Equipment # Strong reference

func equip(item: Equipment):
    if equipped_item:
        unequip()
    equipped_item = item
    equipped_item.owner_ref = weakref(self)

func unequip():
    if equipped_item:
        equipped_item.owner_ref = null
        equipped_item = null
```

当 `Character`被释放时， `Equipment`的 `owner_ref`会自动失效（ `null`）。

## 方案二：与信号松耦合

信号是管理依赖关系最符合 Godot 风格的方式。

### 实际示例：玩家生命值和用户界面

```gdscript
# Player.gd (Signal emitter)
extends CharacterBody3D

signal hp_changed(current_hp: int, max_hp: int)

var max_hp: int = 100
var hp: int = max_hp:
    set(value):
        hp = clamp(value, 0, max_hp)
        hp_changed.emit(hp, max_hp)

func take_damage(amount: int):
    self.hp -= amount
```

```gdscript
# HUD.gd (Signal receiver)
extends Control

@onready var hp_bar: ProgressBar = $HPBar

func _ready():
    var player = get_tree().get_first_node_in_group("players")
    if player:
        player.hp_changed.connect(_on_player_hp_changed)

func _on_player_hp_changed(current_hp: int, max_hp: int):
    hp_bar.max_value = max_hp
    hp_bar.value = current_hp
```

**`Player`并不知道 `HUD`存在** ——这就是松耦合的妙处。依赖关系始终是单向的：“HUD → 玩家”。

## 方案三：自动加载（单例）

游戏中所有共享的功能应该做成单例模式，并启用自动加载。

### Event Bus Pattern  事件总线模式

```gdscript
# EventBus.gd (Autoload)
extends Node

signal enemy_defeated(position: Vector3, score_value: int)
signal item_collected(item_id: String)
```

```gdscript
# Enemy.gd (Signal emitter)
func die():
    EventBus.enemy_defeated.emit(self.global_position, 100)
    queue_free()
```

```gdscript
# ScoreManager.gd (Signal receiver)
func _ready():
    EventBus.enemy_defeated.connect(_on_enemy_defeated)

func _on_enemy_defeated(position: Vector3, score_value: int):
    Global.score += score_value
```

`Enemy`并不知道 `ScoreManager`存在。它只是在“公告板”上发布信息。

## 总结

| Pattern            | 主要用途        | 好处        | 注意事项             |
| :----------------- | :---------- | :-------- | :--------------- |
| **WeakRef**        | 需要相互推荐时     | 直接打破循环    | 必须检查是否为 `null`   |
| **Signals  信号**    | 对象之间的松散耦合   | 依赖关系是单向的。 | 当连接过多时，很难追踪。     |
| **Autoload  自动加载** | 全球状态管理，事件巴士 | 可从任何地方访问  | <br>避免将其变成“万能”物品 |

后续步骤：

1. **观察者模式** ：信号背后的经典设计模式
2. **使用 ResourceLoader** ：仅在需要时加载资源以优化内存

## 相关说明