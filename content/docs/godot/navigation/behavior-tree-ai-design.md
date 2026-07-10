---
title: 在 GDScript 中实现用于 AI 设计的行为树
description: 如何在 Godot 中使用行为树 (BT) 实现灵活的 AI 设计。从节点类型解释到实际的敌方 AI 示例，学习如何构建可重用的 AI 结构。
create: 2026-07-06T11:52:10
---

## 概述

在设计复杂的敌方 AI 或 NPC 行为时，仅靠 if语句链或状态机可能难以管理。行为树（BT）以层级结构组织任务优先级和条件逻辑，从而实现可重用和可扩展的 AI 设计。

> 提示: Godot 没有内置行为树系统。 本文演示了如何从零开始使用 GDScript 实现。对于生产环境，建议使用 [beehave](https://github.com/bitbrain/beehave) 插件，它提供了可视化编辑器、调试叠加层和丰富的节点类型。

本文解释了如何在 GDScript 中实现基本行为树并将其应用于敌方 AI。

## 行为树的基本结构

我们先来了解构成行为树的四种节点类型。仅凭这四个基本单元，你就可以分层表达复杂的行为，例如“发现敌人时，靠近并攻击；否则进行巡逻”。

| 节点类型 | 角色 | 返回值 |
| --- | --- | --- |
| Sequence(序列) | 按顺序执行子操作；如果全部成功，则返回 `SUCCESS` | 如果任何一个孩子失败，则视为失败 |
| Selector(选择器) | 按顺序尝试子项；如果任何子项成功，则返回 `SUCCESS` | 如果所有子项都失败，则为失败 |
| Decorator(装饰器) | 修改子运算的结果（反转、重复等） | 修改后的结果 |
| Leaf(叶子) | 执行实际逻辑（移动、攻击等）的终端节点 | `SUCCESS`/`FAILURE`/`RUNNING` |

每个节点都通过 `tick()` 方法进行评估，并返回 `SUCCESS`、 `FAILURE`或 `RUNNING`之一。

## 实现基础节点类

现在您已经了解了节点类型，让我们开始编写代码。首先，定义一个所有节点都继承的基类。我们将使用 `class_name` 将其注册为全局类型，以便其他节点类可以继承它。

```gdscript
# bt_node.gd
class_name BTNode
extends Node

enum Status { SUCCESS, FAILURE, RUNNING }

# Override in subclasses
# 子类重写该方法
func tick(actor: Node, blackboard: Dictionary) -> Status:
    return Status.FAILURE
```

要点:

- `actor`: 运行此树的实体（例如敌方角色）
- `blackboard`: 节点间共享的数据字典
- `tick()`: 每帧调用的评估方法

## 实现序列节点

基类就绪后，我们继续来看控制节点。序列节点会按顺序执行子节点，直到所有子节点都成功为止。这对应于“与”逻辑，表示“按顺序完成所有操作”。

```gdscript

# bt_sequence.gd
class_name BTSequence
extends BTNode

func tick(actor: Node, blackboard: Dictionary) -> Status:
    for child in get_children():
        var status = child.tick(actor, blackboard)

        if status == Status.FAILURE:
            return Status.FAILURE  # Abort if any child fails 任意子进程失败则终止执行
        elif status == Status.RUNNING:
            return Status.RUNNING  # Wait while running 运行中请稍候

    return Status.SUCCESS  # All children succeeded 所有子节点成功
```

使用场景: 一系列操作，例如 `找到敌人 -> 靠近 -> 攻击`

## 实现选择器节点

按顺序尝试子节点，一旦有一个成功就立即返回（优先级控制）。这对应于“或”逻辑，表示“从多个选项中选择第一个成功的操作”。

```gdscript
# bt_selector.gd
class_name BTSelector
extends BTNode

func tick(actor: Node, blackboard: Dictionary) -> Status:
    for child in get_children():
        var status = child.tick(actor, blackboard)

        if status == Status.SUCCESS:
            return Status.SUCCESS  # Stop on first success 首次成功后停止
        elif status == Status.RUNNING:
            return Status.RUNNING  # Wait while running 运行中请稍候

    return Status.FAILURE  # All children failed 所有子节点失败
```

使用场景: 优先级动作选择，例如“攻击、逃跑或巡逻”。例如，在动作角色扮演游戏中，您可以使用选择器表达“如果生命值低则使用治疗物品 - 如果没有物品则逃跑 - 战斗作为最后的手段”。

## 实现叶节点

序列节点和选择器节点负责决定如何行动，而叶节点则负责实际执行什么操作。它们实现具体的游戏逻辑——移动、攻击、等待——并位于决策树的末端。

这是一个向目标移动的叶节点示例。

```gdscript
# bt_move_to_target.gd
class_name BTMoveToTarget
extends BTNode

@export var move_speed: float = 100.0
@export var arrival_distance: float = 10.0

func tick(actor: Node, blackboard: Dictionary) -> Status:
    var target = blackboard.get("target")
    if not target:
        return Status.FAILURE  # No target found 目标没有找到

    var distance = actor.global_position.distance_to(target.global_position)

    if distance <= arrival_distance:
        return Status.SUCCESS  # Arrived

    # Movement logic
    var direction = (target.global_position - actor.global_position).normalized()
    actor.velocity = direction * move_speed
    actor.move_and_slide()

    return Status.RUNNING  # Still moving
```

## 实际示例：敌方人工智能

至此，所有基础模块都已就绪。让我们将它们组合起来，构建一个真正的敌人 AI。我们将实现一个经典的动作游戏敌人，它会在发现玩家时进入战斗，否则会巡逻。

```gdscript
# enemy.gd
extends CharacterBody2D

@onready var bt_root = $BehaviorTree

var blackboard = {}

func _ready():
    # Initialize the Blackboard
    # 初始化黑板系统
    blackboard["target"] = null
    blackboard["patrol_points"] = [Vector2(100, 100), Vector2(300, 100)]
    blackboard["current_patrol_index"] = 0

func _process(delta):
    # Simple player detection
    # 简易玩家检测
    var player = get_tree().get_first_node_in_group("player")
    if player and global_position.distance_to(player.global_position) < 200:
        blackboard["target"] = player
    else:
        blackboard["target"] = null

    # Run the tree
    bt_root.tick(self, blackboard)
```

场景树结构:

```
Enemy (CharacterBody2D)
+-- BehaviorTree (BTSelector)
   +-- CombatSequence (BTSequence)
   |  +-- HasTarget (BTCondition)
   |  +-- MoveToTarget (BTMoveToTarget)
   |  +-- Attack (BTAttack)
   +-- Patrol (BTPatrol)
```

**Behavior**: 当附近有玩家时会进行战斗；否则会巡逻。

## 黑板模式

您可能已经注意到示例中的 blackboard字典——这是行为树设计中的一个基本模式。黑板字典允许每个节点读取和写入必要的数据，而无需直接依赖其他节点。

以下是如何通过 Blackboard 存储和访问与 AI 相关的信息。

```gdscript
# Usage example
blackboard["target"] = player
blackboard["health"] = 100
blackboard["is_alerted"] = true

# Reading from a node
if blackboard.get("is_alerted"):
    # Alert behavior
```

好处:

- 节点间松散耦合
- 集中式数据管理
- 易于调试

## 局限性和扩展

目前为止，该实现涵盖了基本 BT 框架的要点。在将其集成到实际游戏中之前，请注意以下重要事项。

- 运行状态恢复: 此实现不会记住 RUNNING 状态返回的位置，因此每一帧都会从根节点重新评估整个树。对于大型树，您需要进行优化，以保存 RUNNING 节点的索引并管理恢复位置。
- 装饰器节点: 添加反相器（结果反转）、重复器、定时器约束和其他装饰器可以增强表达能力。
- 插件用途: `beehave` 提供可视化编辑器、调试叠加层和丰富的节点类型，因此推荐用于大型项目。

## 总结

- 行为树通过分层任务控制来设计人工智能
- Godot 没有内置行为树系统 ——你需要从头开始实现一个，或者使用像 Beehave 这样的插件。
- 序列按顺序执行所有子项（AND 逻辑）
- 选择器找到第一个成功的子节点（逻辑 OR）。
- 叶节点实现实际行为（移动、攻击等）。
- `Blackboard` 简化了节点间的数据共享
- 保持叶节点小且用途单一可以提高可重用性。
- 运行状态恢复是一个重要的优化点——存储最后一个运行节点的索引可以避免每一帧都从根节点重新评估整个树。

## 扩展

[beehave - Godot 行为树插件（GitHub）](https://github.com/bitbrain/beehave)