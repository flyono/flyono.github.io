---
title: 角色身体 2D 运动模式：可在俯视和横版卷轴模式之间切换
description: 了解 CharacterBody2D 的地面模式和浮动模式之间的区别。探索俯视视角游戏和横版卷轴游戏的最佳使用方法，包括代码示例、常见错误和最佳实践。
created: 2026-06-02T14:57:00
---
## 概述

在 Godot 中进行游戏开发时， `CharacterBody2D`通常是移动玩家角色的首选。然而，仅仅调用 `move_and_slide()`函数可能会导致一些奇怪的行为，例如“跳跃感觉不对劲”、“角色会粘在墙上”、“为什么我的俯视视角角色会因为重力而下落？”等等。这些问题大多源于 `CharacterBody2D`**运动模式**设置。

本文阐述了 `CharacterBody2D`的两种主要运动模式： `Grounded`和 `Floating`之间的区别。我们将介绍每种模式最适合的游戏类型以及最佳实现实践，并提供具体的代码示例。

## 什么是运动模式？

运动模式是决定 `CharacterBody2D`在物理空间中行为的最重要属性——具体来说，它决定了 CharacterBody2D 如何解释 `地面`、`墙壁`和`重力`。该属性在检视面板中通过 `CharacterBody2D`属性进行配置，定义了角色物理行为的基础。

| Mode         | 主要特征                                                              | 最佳游戏类型                    |
| :----------- | :---------------------------------------------------------------- | :------------------------ |
| **Grounded** | **地面接触模式** 受重力影响，可清晰区分地面/墙壁/天花板。提供诸如 `is_on_floor()`等实用的地面检测 API。 | **横版卷轴平台游戏** ，基于物理的动作游戏   |
| **Floating** | **漂浮模式** 无视重力，没有地面概念。将来自任何方向的碰撞都视为“墙壁”碰撞。                         | **俯视角**角色扮演游戏、射击游戏、太空飞船游戏 |

## (Grounded)地面模式：适用于平台游戏

顾名思义，`Grounded` 模式适用于“脚踏实地”的角色。在马里奥或类银河战士恶魔城等重力对游戏玩法至关重要的游戏类型中，这几乎总是必要的选择。

### 主要特点和优势

- **自动重力应用** ：项目设置中定义的重力会影响角色。只需将重力添加到 `velocity.y`即可实现自然下落效果。
- **可靠的地面检测** ： `is_on_floor()`函数能够准确判断角色是否站在被定义为“地面”的表面上。这可以轻松防止角色在空中无限跳跃。
- **便捷的 API 集** ：诸如 `is_on_wall()`（墙壁接触）、 `is_on_ceiling()`（天花板接触）和 `get_floor_angle()`（地板倾斜角度）之类的函数加速了平台游戏的开发。
- **平滑斜坡处理** ： `move_and_slide()`会自动调整角色的速度，使其平滑地滑过斜坡。

### 实用代码示例

以下是一个更实用的 `Grounded`模式代码，包含了基本移动、跳跃和蹬墙跳：

```gdscript
@export var speed = 300.0
@export var jump_velocity = -400.0
@export var wall_jump_velocity = Vector2(400.0, -300.0)

# 从项目设置中获取重力参数
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    # 应用重力
    if not is_on_floor():
        velocity.y += gravity * delta

    # 跳跃处理
    if Input.is_action_just_pressed("jump"):
        if is_on_floor():
            velocity.y = jump_velocity
        elif is_on_wall():
            # 角色面朝反方向的蹬墙跳
            var wall_normal = get_wall_normal()
            velocity.x = wall_normal.x * wall_jump_velocity.x
            velocity.y = wall_jump_velocity.y

    # 水平移动
    var direction = Input.get_axis("move_left", "move_right")
    velocity.x = direction * speed

    move_and_slide()
```

## (Floating)浮动模式：适用于俯视游戏

`Floating`模式使角色摆脱重力束缚。它非常适合像《塞尔达传说》这样的俯视角角色扮演游戏，或者像《吸血鬼幸存者》这样的全方位射击游戏，在这些游戏中，角色可以在地图上自由移动。

### 主要特点和优势

- **无重力模式** ：在此模式下，重力不会自动生效。如果 `velocity`为 `Vector2.ZERO`，则角色保持静止。
- **无地面概念** ： `is_on_floor()`始终返回 `false`。所有碰撞都被视为相同，无论方向如何。
- **简单的运动逻辑** ：无需考虑重力或地面状态，运动逻辑就变得非常简单。

### 实用代码示例

以下是实现八方向移动并面向鼠标光标 `Floating`模式代码：

```gdscript
@export var speed = 400.0

func _physics_process(delta):
    # 从输入数据获取标准化运动向量
    var direction = Input.get_vector("move_left", "move_right", "move_up", "move_down")
    velocity = direction * speed

    move_and_slide()

    # 面向鼠标光标
    look_at(get_global_mouse_position())
```

### 高级：利用惯性实现平滑运动

对于太空飞船游戏或角色在冰上滑行——实现**惯性（松开输入后继续滑行）** ——速度应逐渐衰减，而不是立即降至零：

```gdscript
@export var speed = 400.0
@export var friction = 0.05  # 摩擦系数 (数值越接近 0 = 越顺滑 / 越滑)

func _physics_process(delta):
    var direction = Input.get_vector("move_left", "move_right", "move_up", "move_down")

    if direction != Vector2.ZERO:
        # 检测到输入时提速
        velocity = velocity.lerp(direction * speed, 0.1)
    else:
        # 无输入时逐步减速（惯性模式）
        velocity = velocity.lerp(Vector2.ZERO, friction)

    move_and_slide()
```

调整 `friction`值可以表现从光滑的冰面到防滑地面的各种纹理。

### 与其他模式的比较

对于简单的俯视移动，使用 `Area2D`而非 `CharacterBody2D`是另一种选择。Area2D 不进行物理碰撞检测，因此非常轻量级。它可能适用于不需要反弹的物体 `Area2D`例如敌人的子弹。然而，对于需要墙壁碰撞响应的玩家和敌人， `CharacterBody2D`的 `Floating`模式才是更稳健、更优的选择。

## 常见错误和最佳实践

以下是使用动态模式时常见的陷阱以及避免这些陷阱的最佳实践：

| 常见错误                       | 最佳实践                                                                                                                                                      |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **忘记在地面模式下手动添加重力**         | 在 `_physics_process`中，当 `is_on_floor()`为 `false`时，始终将重力添加到 `velocity.y`。                                                                                  |
| **使用俯视游戏的地面模式**            | 对于不需要重力的游戏，请选择 `Floating`模式。这样可以简化代码并防止意外坠落。                                                                                                              |
| **误解何时检查 `is_on_floor()`** | `is_on_floor()`值会随着 `move_and_slide()`的执行而更新。这意味着它显示的是**上一帧 `move_and_slide()`的地面接触状态** 。常见的做法是在检测跳跃输入时， **先**检查 `is_on_floor()`然后再调用 `move_and_slide()`。 |
| ** 过度关注性能问题**              | `move_and_slide()`函数已经过优化。除非你同时移动数百个角色，否则性能很少会成为问题。首先，编写能够正确运行的代码。                                                                                        |

## 总结

`CharacterBody2D`的运动模式不仅仅是一个配置选项，而是一个设计决策，它定义了游戏的物理基础。

- 对于重力和地板起着重要作用的**横版卷轴**和**平台**游戏 → **Grounded模式**
- 对于需要自由移动**的俯视角角色扮演游戏**和**射击游戏** → **浮动Floating模式**

从一开始就做出正确的选择可以避免许多角色控制问题，并简化开发流程。

## 后续步骤

通过本文，您已掌握了 `CharacterBody2D`基础知识。为了加深理解，请探索以下主题：

- **`CharacterBody3D`**：3D 空间中的角色控制。基本概念与 2D 相同。
- **`up_direction`属性** ：如何改变重力方向并实现像在墙上行走这样的特殊移动。
- **`move_and_collide`**：比 `move_and_slide()`更底层的移动函数。当需要更精细地控制碰撞信息时使用。