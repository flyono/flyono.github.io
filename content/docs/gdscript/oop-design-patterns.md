---
title: GDScript 中的面向对象编程设计模式（组合、装饰器、工厂模式）
description: 如何在 Godot 中实现三种常用的设计模式：组合模式、装饰器模式和工厂模式。提供 GDScript 的实用示例，帮助您构建灵活、可重用且可扩展的设计，而无需依赖深度继承。
created: 2026-05-28T13:41:00
---
## 概述

在 Godot 中构建游戏时，如果所有功能都通过继承实现，会导致层级过深，使得代码重用和扩展变得困难。设计模式则提供了灵活且易于维护的架构。

本文介绍了三种在 Godot 中特别有用的设计模式。

## 三种模式概述

| 模式    | 简介          | 何时使用                   |
| ----- | ----------- | ---------------------- |
| 组合模式  | 将功能组合成模块化部件 | 在多个角色之间重复使用移动力、攻击力和生命值 |
| 装饰器模式 | 在现有对象上叠加功能  | 通过装备和增益效果动态调整属性        |
| 工厂模式  | 集中式创建逻辑     | 生成具有特定类型配置的敌人/物品       |
### 组合——"Has-a" 设计

围绕“角色**具有**移动能力”这一关系进行设计。将移动、攻击、生命值和其他属性构建为独立的节点或资源，然后根据需要组合它们。这种模式与 Godot 的场景树尤其契合。

### 装饰器——"Wrap and Extend"

在原物体上添加附加功能。例如，一把剑可以增加 5 点攻击力，一个增益效果可以增加 3 点攻击力——你可以叠加任意多层。要卸下附加功能，只需解开一层即可恢复到之前的状态。

### 工厂——"集中式生产"

将诸如“地精拥有50点生命值和100速度，兽人拥有100点生命值和80速度”之类的创建规则合并到一个类别中。创建逻辑保持在一处，添加新的敌人类型只需添加一个配置条目即可。

## 组合模式

让我们详细了解每种模式，首先是组合模式——这是最适合 Godot 的模式。

Godot 的场景树围绕着“将小部分组合成更大的事物”这一理念构建。“组合”模式与这一理念完美契合，使其成为最直接易用的模式。

### 问题

在实现玩家和敌人的移动时，继承会产生如下所示的层次结构：

```
Character (base class)
+-- Player
+-- Enemy
```

然而，通过继承来表达“不同的移动速度”或“不同的输入方法”等差异会导致类爆炸。

### 解决方案：基于组件的设计

通过将移动逻辑提取到一个独立的组件中，您可以创建一个可供玩家和敌人重复使用的设计。

关键在于将“数据（速度如何？）”与“逻辑（如何移动？）”分开。在下面的代码中，MovementStats 将数据作为 Resource 保存，而 MovementComponent 则作为 Node 处理数据处理。


```gdscript
# movement_stats.gd
class_name MovementStats
extends Resource

@export var max_speed: float = 200.0
@export var acceleration: float = 800.0
@export var friction: float = 600.0
```

```gdscript
# movement_input.gd
class_name MovementInput
extends Node

func get_input_direction() -> Vector2:
    # 在子类中重写
    return Vector2.ZERO
```

```gdscript
# player_input.gd
class_name PlayerInput
extends MovementInput

func get_input_direction() -> Vector2:
    return Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
```

```gdscript
# movement_component.gd
class_name MovementComponent
extends Node

@export var stats: MovementStats
# 从场景树获取
@onready var input: MovementInput = $"../PlayerInput"  

func update_movement(actor: CharacterBody2D, delta: float):
    var direction = input.get_input_direction()

    if direction != Vector2.ZERO:
        actor.velocity = actor.velocity.move_toward(
            direction * stats.max_speed,
            stats.acceleration * delta
        )
    else:
        actor.velocity = actor.velocity.move_toward(
            Vector2.ZERO,
            stats.friction * delta
        )

    actor.move_and_slide()
```

```gdscript
# player.gd
extends CharacterBody2D

@onready var movement = $MovementComponent

func _physics_process(delta):
    movement.update_movement(self, delta)
```

>**提示** ：虽然可以使用 `@export`设置节点引用，但在 Godot 中，使用 `@onready`从场景树中获取资源更为惯用。资源引用（例如 `MovementStats`）应该使用 `@export`。

**好处** ：

- 运动逻辑易于重用
- 可通过 `MovementStats`资源进行调整
- 交换 `input`以实现人工智能运动

## 装饰器模式

组合模式的重点在于“将各个部分组装在一起”，而装饰器模式的重点在于“在已有的事物之上添加多层包装”。例如，装备一把剑获得+5攻击力，然后施放一个增益法术再获得+3攻击力——装饰器模式允许你在不创建额外类的情况下实现这种叠加效果。

### 问题

你想将装备和增益效果应用到玩家属性上。使用继承会导致类数量激增，例如“基础玩家”、“装备剑的玩家”、“剑盾玩家”等等。

### 解决方案：装饰器

装饰器模式通过对原始对象进行封装来添加功能。我们首先创建一个基类接口，然后在该接口之上堆叠装饰器层。

```gdscript
# player_stats.gd
# as interface
class_name PlayerStats
extends RefCounted

func get_attack() -> int:
    return 0

func get_defense() -> int:
    return 0
```

```gdscript
# base_player_stats.gd
class_name BasePlayerStats
extends PlayerStats

var base_attack: int = 10
var base_defense: int = 5

func get_attack() -> int:
    return base_attack

func get_defense() -> int:
    return base_defense
```

```gdscript
# stats_decorator.gd
# 装饰器基类
class_name StatsDecorator
extends PlayerStats

var wrapped_stats: PlayerStats

func _init(stats: PlayerStats):
    wrapped_stats = stats

func get_attack() -> int:
    return wrapped_stats.get_attack()

func get_defense() -> int:
    return wrapped_stats.get_defense()
```

```gdscript
# attack_boost_decorator.gd
class_name AttackBoostDecorator
extends StatsDecorator

var bonus_attack: int

func _init(stats: PlayerStats, bonus: int):
    super(stats)
    bonus_attack = bonus

func get_attack() -> int:
    return wrapped_stats.get_attack() + bonus_attack
```

```gdscript
# Usage example
var stats = BasePlayerStats.new()
print(stats.get_attack())  # 10

# 装备一把剑（攻击力+5）
stats = AttackBoostDecorator.new(stats, 5)
print(stats.get_attack())  # 15

# 施加增益效果（攻击力+3）
stats = AttackBoostDecorator.new(stats, 3)
print(stats.get_attack())  # 18
```

### 去除装饰器（卸下装备）

添加层数只是故事的一半——移除层数同样重要。当玩家卸下装备或增益效果持续时间结束时，你需要移除相应的装饰层。这可以通过使用 `wrapped_stats`解包一层来实现。

```gdscript
# 卸下装扮：移除最后一次使用的装饰道具
func unwrap(current_stats: PlayerStats) -> PlayerStats:
    if current_stats is StatsDecorator:
        return current_stats.wrapped_stats
    return current_stats  # 如果不是装饰器，则原样返回

# Usage example
stats = unwrap(stats)
print(stats.get_attack())  # 15（增益效果已移除，武器保留）
```

**好处** ：

- 在运行时添加或移除功能。
- 灵活的设备和缓冲组合
- 扩展而不修改基类

## 工厂模式

最后要介绍的是工厂模式。你是否曾经在代码库的多个地方编写过敌人生成逻辑，然后在添加新的敌人类型时不得不更新所有这些逻辑？工厂模式通过将所有生成逻辑集中到一个地方来解决这个问题。

## 问题

当不同类型的敌人需要不同的设置时，创建代码最终会散落在各处。

```gdscript
# Anti-pattern
if enemy_type == "goblin":
    var enemy = load("res://enemies/goblin.tscn").instantiate()
    enemy.health = 50
    enemy.speed = 100
elif enemy_type == "orc":
    var enemy = load("res://enemies/orc.tscn").instantiate()
    enemy.health = 100
    enemy.speed = 80
```

### 解决方案：工厂类

让我们把创建逻辑整合到一个专门的类中。场景路径和初始配置值都用字典管理，所以添加新的敌人类型就像添加一个字典条目一样简单。

```gdscript
# enemy_factory.gd
class_name EnemyFactory
extends Node

enum EnemyType { GOBLIN, ORC, DRAGON }

const ENEMY_SCENES = {
    EnemyType.GOBLIN: preload("res://enemies/goblin.tscn"),
    EnemyType.ORC: preload("res://enemies/orc.tscn"),
    EnemyType.DRAGON: preload("res://enemies/dragon.tscn"),
}

const ENEMY_CONFIGS = {
    EnemyType.GOBLIN: { "health": 50, "speed": 100 },
    EnemyType.ORC: { "health": 100, "speed": 80 },
    EnemyType.DRAGON: { "health": 300, "speed": 50 },
}

func create_enemy(type: EnemyType, position: Vector2) -> Node2D:
    var scene = ENEMY_SCENES.get(type)
    if not scene:
        push_error("Unknown enemy type: %s" % type)
        return null

    var enemy = scene.instantiate()
    var config = ENEMY_CONFIGS[type]

    enemy.global_position = position
    enemy.health = config["health"]
    enemy.speed = config["speed"]

    return enemy
```

```gdscript
# Usage example
@onready var factory = $EnemyFactory

func spawn_enemies():
    var goblin = factory.create_enemy(EnemyFactory.EnemyType.GOBLIN, Vector2(100, 100))
    add_child(goblin)

    var orc = factory.create_enemy(EnemyFactory.EnemyType.ORC, Vector2(200, 100))
    add_child(orc)
```

**好处**：

- 集中式创建逻辑
- 很容易添加新的敌人类型
- 更容易编写测试

>**提示** ：使用 `const`+ `preload()`会在启动时将所有场景加载到内存中。如果您注册了很多场景，请考虑使用 `load()`进行延迟加载，或使用 `ResourceLoader.load_threaded_request()`进行异步加载。

## 如何正确的使用模式

现在我们已经介绍了这三种模式，你可能会想知道在实践中应该选择哪一种。请使用下表作为决策指南。

| **模式**    | 用例       | 好处             |
| --------- | -------- | -------------- |
| **组合模式**  | 结合模块化功能  | 灵活的功能组合，可重复使用性 |
| **装饰器模式** | 在运行时添加功能 | 动态的增添，多层装饰     |
| **工厂模式**  | 复杂对象创建   | 集中式创建逻辑，可扩展性   |

**组合使用**

- 使用工厂创建敌人 -> 使用组合组装行为 -> 使用装饰器施加增益

### 其他与 Godot 配合良好的模式

Godot 的设计将多种设计模式作为内置功能融入其中。

| **模式**        | Godot 实现         | 典型用例        |
| ------------- | ---------------- | ----------- |
| **观察者**       | 内置 `signal`系统    | 事件通知、用户界面更新 |
| **状态**        | match`+ 枚举/状态机   | 角色状态管理      |
| **Singleton** | `Autoload`  自动加载 | 全游戏数据管理     |
Godot 的信号系统本身就是观察者模式，它通过 `signal`声明和 `connect()`提供松耦合的事件通知。有关状态模式的实现，请参阅[状态机文章](https://uhiyama-lab.com/en/notes/godot/state-machine-ai-player/) 。

## 总结

- **组合**通过组合组件而非继承来构建功能。
- **装饰器**动态地为现有对象添加功能
- **工厂**集中了对象创建逻辑
- 每种模式单独使用或组合使用效果都很好。
- Godot 的节点和资源使得这些模式的实现变得非常简单。
- 避免过度设计；必要时进行重构。
- 其他有用的模式：观察者（信号）、状态、单例（自动加载）

## 延伸阅读

- [Godot 文档 - 在 Godot 中应用面向对象原则](https://docs.godotengine.org/en/stable/tutorials/best_practices/what_are_godot_classes.html)
- [Godot 文档 - 场景组织](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html)

