---
description: 学习如何组织复杂的角色行为，从使用枚举和匹配语句的简单状态机到使用状态类的高级设计模式。
created: 2026-05-29T11:16:00
title: 使用状态机管理 AI 和玩家状态
---
## 概述

随着游戏开发的进行，角色逻辑变得越来越复杂。“玩家有待机、行走、跳跃、攻击和受伤状态。“敌人有巡逻、追逐、攻击和等待状态。”如果仅仅使用 `if`语句和 `bool`变量（ `is_jumping`、 `is_attacking`等）来管理这些状态，代码很快就会变得混乱不堪，成为滋生 bug 的温床。

解决此问题的经典而又极其强大的设计模式是**状态机** 。

## 什么是状态机？组织行为的蓝图

状态机是一种模型，它通过明确定义对象可以处于的“ **状态** ”以及从一个状态到另一个状态的“ **转换** ”条件来组织复杂的行为。

- **State(状态)**：对象当前所处的行为类型。例如：“空闲”、“移动”、“跳跃”。每种状态都明确指示在该状态下要执行的处理操作。
- **状态转换** ：从一种状态转换到另一种状态的“触发条件”或“规则”。例如：“按下跳跃键时，从‘待机’状态转换到‘跳跃’状态”、“生命值降至 0 时，从任何状态转换到‘死亡’状态”。

使用这种模型，像“受到伤害时不能攻击”这样的规则可以明确地设计为“受到 `Damage`时不能转换到 `Attack`状态”。

## 基础：使用 `enum`和 `match`简单状态机

在 Godot 中实现状态机的最简单方法是使用 `enum`定义状态，并使用 `match`语句进行分支处理。

### 1. 定义状态

首先，用 `enum`定义角色可以拥有的所有可能状态。

```gdscript
# Enemy.gd
extends CharacterBody2D

# Define states with enum. Convention is uppercase
enum State { IDLE, WANDER, CHASE, ATTACK }

# Variable holding current state
var current_state: State = State.IDLE

@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var timer: Timer = $Timer
var player: Node2D = null

const SPEED = 50.0
```

### 2. 管理状态转换

标准做法是创建一个专门的 `change_state`函数来集中管理状态转换逻辑。

```gdscript
# The single gateway for changing state
func change_state(new_state: State):
    if current_state == new_state:
        return

    current_state = new_state

    match current_state:
        State.IDLE:
            animated_sprite.play("idle")
            timer.start(2.0)
        State.WANDER:
            animated_sprite.play("walk")
        State.CHASE:
            animated_sprite.play("walk")
        State.ATTACK:
            animated_sprite.play("attack")
```

### 3. 处理每个状态

在 `_physics_process`中，使用 `match`根据当前状态调度每一帧的处理。

```gdscript
func _physics_process(delta):
    match current_state:
        State.IDLE:
            _idle_state(delta)
        State.WANDER:
            _wander_state(delta)
        State.CHASE:
            _chase_state(delta)
        State.ATTACK:
            _attack_state(delta)

func _idle_state(delta):
    velocity = Vector2.ZERO
    if can_see_player():
        change_state(State.CHASE)

func _wander_state(delta):
    # Wandering processing
    if can_see_player():
        change_state(State.CHASE)

func _chase_state(delta):
    if player:
        var direction = global_position.direction_to(player.global_position)
        velocity = direction * SPEED
        move_and_slide()

    if can_attack_player():
        change_state(State.ATTACK)
    elif not can_see_player():
        change_state(State.IDLE)

func _attack_state(delta):
    velocity = Vector2.ZERO
    if not animated_sprite.is_playing():
        change_state(State.CHASE)

func _on_timer_timeout():
    if current_state == State.IDLE:
        change_state(State.WANDER)
```

有了这种结构， `_physics_process`就变成了一个交通控制器，每个状态的具体行为和转换条件都在各自的函数中得到了清晰的组织。

## 常见错误和最佳实践

| **常见错误**                | 最佳实践                                                                |     |
| :---------------------- | :------------------------------------------------------------------ | --- |
| **过度使用 `if-elif-else`** | **积极使用 `match`语句。** `match`可以明确代码意图，并使完整性检查更加容易。                    |     |
| **巨型状态函数**              | **将功能细化拆分。** 例如，在 `_chase_state`中，将运动处理、检测处理和状态转换决策分别拆分成独立的辅助函数。    |     |
| **分散的转换逻辑**             | **将状态转换处理集中在 `change_state`函数中。** 为了保持一致性，当状态发生变化时，在该函数中执行初始化和清理操作。 |     |
| **直接修改状态变量**            | **始终通过 `change_state`函数更改状态。** 这可以防止意外的状态转换，并使调试更加容易。               |     |
| **不使用定时器或信号**           | **使用 `Timer`节点和信号实现基于时间或基于事件的过渡（例如动画完成）。**                          |     |

## 高级：状态类实现

`enum/match`方法虽然简单，但随着状态数量的增加，单个文件会变得很长。因此，可以采用**将每个状态实现为一个单独的类（文件）** 的方法。

### 1. 创建状态基类

```gdscript
# State.gd
class_name State
extends RefCounted  # 继承RefCounted类以实现自动内存管理

var character: Node

func enter():
    pass

func exit():
    pass

func process(delta):
    pass

func physics_process(delta):
    pass
```

>**注意** ：继承 `RefCounted`后，当引用消失时，内存会自动释放。如果没有继承该类，则必须手动释放内存。

### 2. 实现具体状态类

```gdscript
# ChaseState.gd
extends State
class_name ChaseState

func enter():
    character.animated_sprite.play("walk")

func physics_process(delta):
    if not character.can_see_player():
        character.change_state(character.states["IDLE"])
        return

    if character.can_attack_player():
        character.change_state(character.states["ATTACK"])
        return

    if character.player:
        var direction = character.global_position.direction_to(character.player.global_position)
        character.velocity = direction * character.SPEED
        character.move_and_slide()
```

### 3. 修改主脚本

```gdscript
# Enemy.gd
extends CharacterBody2D

var states: Dictionary
var current_state: State

func _ready():
    states = {
        "IDLE": IdleState.new(),
        "CHASE": ChaseState.new(),
        "ATTACK": AttackState.new()
    }
    for state_name in states:
        states[state_name].character = self

    change_state(states["IDLE"])

func change_state(new_state: State):
    if current_state:
        current_state.exit()

    current_state = new_state
    current_state.enter()

func _physics_process(delta):
    if current_state:
        current_state.physics_process(delta)
```

## 性能和替代方案

- **性能** ： `enum/match`和状态类方法对性能几乎没有影响。 `match`语句通常比 `if-elif`链运行速度更快，而且在现代 PC 和游戏主机上，类方法调用开销可以忽略不计。
- **替代模式（行为树）** ：对于更复杂的决策逻辑，有时会使用一种称为**行为树的**不同设计模式。行为树的优势在于能够以树状结构定义“为实现目标应优先执行哪些操作”。

## 总结

状态机是组织复杂字符逻辑并保持代码简洁的重要技术。当遇到嵌套 if 语句的问题时，正是引入状态机的绝佳时机。

- **基础知识** ：使用 `enum`和 `match`轻松实现。
- **高级** ：将逻辑拆分成带有状态类的文件，以最大限度地提高可维护性。
- **规则** ：使用 `change_state`函数集中处理状态转换。

