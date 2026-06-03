---
title: 理解 move_and_slide 与 move_toward：实现击退效果
description: 了解 Godot 引擎中 CharacterBody 的 move_and_slide 函数与功能强大的 move_toward 函数之间的区别。包含击退、敌人追踪和 UI 动画的实用代码示例。
created: 2026-06-03T13:41:00
---
## 概述

在 Godot 中移动角色时，你会遇到两个名称相似的函数： `move_and_slide()`和 `move_toward()`。两者都用于移动对象，但它们的底层机制和最佳使用场景完全不同。

理解这两者之间的区别对于实现流畅的基于物理的运动和游戏逻辑至关重要，这些运动和逻辑能够完全按照预期运行（例如击退）。

## `move_and_slide()`：物理世界的公民

`move_and_slide()`是一种复杂的移动方法，仅适用于由物理引擎控制的节点，例如 `CharacterBody2D`和 `CharacterBody3D`。只需调用此方法，Godot 的物理引擎就会在后台执行复杂的计算，从而实现非常自然的移动。

**主要特点：**

- **基于物理的碰撞处理** ：与 Godot 的物理引擎紧密配合，自动检测并响应与其他物理实体和瓦片地图的碰撞。防止物体重叠。
- **墙壁和斜坡上的平滑移动** ：当物体撞到墙壁时，它不会停止，而是沿着墙壁“滑动”。这显著提升了操控性，尤其是在狭窄通道中。结合 `up_direction`属性，可以实现上下斜坡的平滑移动。
- **移动平台支持** ： `move_and_slide()`会自动检测移动平台并调整 `velocity`，使角色站在平台上时能够随平台一起移动。
- **与 `velocity`属性集成** ：此函数以节点的 `velocity`属性作为输入，并执行移动操作。重要的是， **它返回的是碰撞后的速度值** 。

**基本用法：**

标准做法是在 `_physics_process(delta)`中使用 `move_and_slide()`，该函数在每个物理帧中都会被调用。

```gdscript
extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

# 从项目设置中获取重力参数（默认值：980）
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    # 施加重力加速度
    if not is_on_floor():
        velocity.y += gravity * delta

    # 跳跃处理
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # 获取左/右输入方向
    var direction = Input.get_axis("ui_left", "ui_right")
    velocity.x = direction * SPEED

    # 交由物理引擎处理移动与碰撞
    move_and_slide()
```

## `move_toward()`：简单的数学插值

`move_toward()`是 Godot 内置的一个通用数学函数。它与物理引擎无关 **——它将一个值（数字、向量等）按指定量线性地向目标方向改变。**

**主要特点：**

- **完全忽略物理** ：此函数不检测碰撞，仅进行数值计算。如果使用此函数直接修改物体的位置，物体可能会穿过墙壁。
- **恒定变化率** ：无论当前位置或与目标的距离如何，它始终以指定的恒定步长（ `delta`参数）改变值。这使得实现匀速移动或变化变得容易。
- **多功能性强** ：除了 `Vector2`和 `Vector3`位置之外，还可用于各种数据类型—— `float`（HP、经验值）、 `Color`（淡入/淡出）、 `Transform2D`等。

**主要用途：**

1. **移动非物理对象** ：UI 元素、背景对象、摄像机——不需要碰撞的对象。
2. **数值平滑** ：平滑快速变化的数值。例如，稍微延迟摄像机跟随以获得更平滑的画面。
3. **状态变化效果** ：生命值条平滑减少，角色颜色逐渐变化。
4. **物理计算辅助** ：当直接操作 `velocity`等物理属性时，用于平滑地将数值调整至目标值（例如， `Vector2.ZERO`）。从击退状态恢复就是一个典型的例子。

```gdscript
# 示例1：将界面元素移动至目标位置
func _process(delta):
    var target_position = get_viewport_rect().size / 2
    # 以每秒200像素向中心移动
    position = position.move_toward(target_position, 200 * delta)

# 示例2：敌方角色跟随玩家
func _physics_process(delta):
    # player_node是指向玩家的引用
    if player_node:
        var direction = global_position.direction_to(player_node.global_position)
        velocity = direction * ENEMY_SPEED
        move_and_slide()
```

## 实际示例：带状态管理的击退机制

`move_and_slide`和 `move_toward`协同工作的最佳示例是“击退”操作。在这里，我们引入了简单的状态机概念，以实现更健壮的实现。

```gdscript
extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0
const KNOCKBACK_FRICTION = 500.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

enum State { MOVE, KNOCKBACK }
var current_state = State.MOVE

var knockback_vector = Vector2.ZERO

func _physics_process(delta):
    match current_state:
        State.MOVE:
            move_state(delta)
        State.KNOCKBACK:
            knockback_state(delta)

# 正常运动状态
func move_state(delta):
    if not is_on_floor():
        velocity.y += gravity * delta

    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    var direction = Input.get_axis("ui_left", "ui_right")
    velocity.x = direction * SPEED

    move_and_slide()

# 击退状态
func knockback_state(delta):
    # 用击退向量覆写移动速度
    velocity = knockback_vector
    move_and_slide() # 由物理引擎处理碰撞

    # 使用move_toward逐步将击退力降至0（减速）
    knockback_vector = knockback_vector.move_toward(Vector2.ZERO, KNOCKBACK_FRICTION * delta)

    # 击退作用力趋近于0时恢复至常态
    if knockback_vector.is_equal_approx(Vector2.ZERO):
        current_state = State.MOVE

# 从外部来源调用该函数（例如敌方攻击判定区域）
func apply_knockback(direction: Vector2, power: float):
    current_state = State.KNOCKBACK
    knockback_vector = direction.normalized() * power
```

在这个实现中， `current_state`清晰地划分了角色行为。在 `State.MOVE`下，接受玩家输入；在 `State.KNOCKBACK`下，忽略输入并强制移动。关键在于在 `knockback_state`中使用 `move_toward`来平滑衰减 `knockback_vector`。这实现了从击退状态自然恢复。

## 常见错误和最佳实践

以下是在使用这些函数时常见的陷阱以及避免这些陷阱的最佳实践的总结。

| 功能                 | 常见错误                                                            | 最佳实践                                                                                            |
| :----------------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `move_and_slide()` | 在 `_process`内部调用它（未与物理过程同步）                                     | **务必在 `_physics_process`内部调用它。** 物理计算以固定帧速率运行，因此同步至关重要。                                         |
|                    | 尝试直接改变 `position`而不是设置 `velocity`                               | 对于 `CharacterBody`来说，原则是**始终通过 `velocity`属性来控制移动** ，而不是直接操作 `position`。                         |
| `move_toward()`    | 直接将其用于 `CharacterBody`移动，会导致穿墙现象                                | 请勿用于需要物理碰撞的对象。 **可将其用作辅助工具来更改 `velocity`值** ，或仅限于非物理对象，例如用户界面。                                  |
|                    | 忘记乘以 `delta`（帧率相关的运动）                                           | **将变化量乘以 `delta`，** 例如 `move_toward(target, speed * delta)`，以保持恒定速度，而不管帧速率如何。                   |
|                    | Not understanding the difference from `lerp`  <br>不理解 `lerp`的区别 | `move_toward`以恒定速度移动； `lerp`会随着距离减小移动幅度（缓动）。`move_toward` **`move_toward`硬性停止， `lerp`用于平滑停止** 。 |


## 性能和替代方案

- **`move_and_slide()`函数的性能开销** ：该函数内部会执行多次射线投射和碰撞检测，因此并非轻量级操作。在场景中放置过多的 `CharacterBody`节点会影响性能。对于不需要移动的远距离敌人，禁用 `_physics_process`本身（ `set_physics_process(false)`）等优化方法可以有效降低性能。
- **`move_toward()`与 `Tween`**：对于 UI 动画和简单的物体移动， `Tween`节点也是一个非常强大的选择 `move_toward`在代码中控制线性移动，而 `Tween`允许从检查器异步设置各种缓动效果。Tween 适用于复杂的特效和序列，而 `Tween``move_toward`适用于简单的插值和物理属性控制。

## 总结

`move_and_slide()`和 `move_toward()`是完全不同的工具，各有其自身的设计理念。

- **`move_and_slide()`**: `CharacterBody`的**高级移动方法** ，遵循物理世界法则，考虑碰撞和重力
- **`move_toward()`**：一个忽略物理定律**的数学插值工具** ，它将数值向目标方向移动。它默默无闻，却能处理从 `velocity`控制到 UI 动画的一切事务。

通过深入理解这两个特性并将它们适当地结合起来（例如在击退处理中），你的游戏角色将更加逼真地移动，并完全按照预期进行操作。