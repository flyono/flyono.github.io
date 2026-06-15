---
title: 引擎中选择合适的 2D 物理体
description: 通过代码示例，了解 Godot 引擎的主要 2D 物理体——CharacterBody2D、RigidBody2D 和 StaticBody2D 的特性、特征、性能和实际应用案例。
created: 2026-06-03T14:07:00
---
在 Godot 引擎中开发 2D 游戏时，选择合适的节点来赋予物体“物理行为”至关重要。三个主要的物理体节点 `CharacterBody2D`、 `RigidBody2D`和 `StaticBody2D`各自拥有不同的设计理念和用途。正确使用它们会直接影响游戏性能、操控便捷性和 bug 的预防。


本文通过具体的代码示例，解释了这三个物理体节点的基本定义、特性和适用场景。

## 三大物理体：基本概念

| 节点名称                | 控制机构      | 物理引擎的影响            | 与其他物体的互动      | 主要用途        |
| :------------------ | :-------- | :----------------- | :------------ | :---------- |
| **StaticBody2D**    | 无（已修复）    | Not affected  未受影响 | 变成一堵阻挡碰撞的“墙”。 | 地面、墙壁、固定障碍物 |
| **RigidBody2D**     | **物理引擎**  | 影响（完全模拟）           | 因碰撞而移动并移动其他物体 | 球、盒子、物理谜题元素 |
| **CharacterBody2D** | **开发者代码** | 部分受影响（碰撞检测）        | 阻挡碰撞，但通常不会被移动 | 玩家、敌人、移动平台  |

## 1. StaticBody2D：不可移动的参考点

`StaticBody2D`是物理世界中的“不可移动物体”。它不会因重力或外力而移动。它的作用是为其他物体提供碰撞的“墙壁”和“地板”。

- **主要属性**：`constant_linear_velocity`、 `constant_angular_velocity`
- 要点：通常情况下不应该移动它，但如果需要移动，请考虑使用 `AnimatableBody2D`。这是一个特殊的静态物体，可以与动画同步移动。

## 2. RigidBody2D：物理定律的体现

`RigidBody2D`是物理引擎的核心。一旦放置在游戏世界中，它就会根据重力、摩擦力和碰撞等物理定律自主运动。开发者通过施加力和脉冲来间接控制它，而不是直接操纵 `position`。


### 实用代码示例：使用 RigidBody2D 投掷物体


```gdscript
extends RigidBody2D

@export var throw_force: float = 500.0

func throw(direction: Vector2):
    # 重置现有动作
    linear_velocity = Vector2.ZERO
    angular_velocity = 0.0

    # 沿指定方向施加冲量
    apply_central_impulse(direction.normalized() * throw_force)
```

`RigidBody2D`的计算量非常大。在数百个 `RigidBody2D`相互碰撞的场景中，性能会显著下降。启用 **sleep（ `can_sleep`）** 设置，在物体静止时跳过物理计算，这一点至关重要。

## 3. CharacterBody2D：通过代码进行精确控制

`CharacterBody2D`是最专业也是最重要的节点，专为开发者完全控制角色移动而设计。它利用物理引擎的碰撞检测功能，而移动本身则通过 `move_and_slide()`方法以代码形式实现。

### 实用代码示例：更实用的玩家控制

在 Godot 4 中， `velocity`成为了一个内置属性。以下是更实用的代码，它考虑了跳转输入缓冲（Coyote Time）和跳转缓冲。

```gdscript
extends CharacterBody2D

@export var speed: float = 300.0
@export var jump_velocity: float = -450.0
@export var gravity: float = 980.0

# 土狼时间和跳跃缓冲的计时器
# 土狼计时器：等待时长 = 0.1，单次触发 = 启用
# 跳转缓冲计时器：等待时长 = 0.15，单次触发 = 开启
@onready var coyote_timer: Timer = $CoyoteTimer
@onready var jump_buffer_timer: Timer = $JumpBufferTimer

var was_on_floor: bool = false

func _physics_process(delta: float) -> void:
    # 1. 应用重力
    if not is_on_floor():
        velocity.y += gravity * delta

    # 2. 跳跃缓存
    if Input.is_action_just_pressed("jump"):
        jump_buffer_timer.start()

    # 3. 执行跳跃
    # 处于地面或土狼时间阶段时可触发跳跃，且跳跃指令会被缓存
    if (is_on_floor() or not coyote_timer.is_stopped()) and not jump_buffer_timer.is_stopped():
        velocity.y = jump_velocity
        jump_buffer_timer.stop()

    # 4. 水平移动
    var direction: float = Input.get_axis("move_left", "move_right")
    velocity.x = direction * speed

    # 5. 运动与碰撞检测
    var was_on_floor_before = is_on_floor()
    move_and_slide()

    # 6. 离开平台瞬间立刻启动郊狼计时器
    if not is_on_floor() and was_on_floor_before:
        coyote_timer.start()
```


## 常见错误和最佳实践

| 常见错误                               | 为什么这是一个问题                                       | 最佳实践                                             |
| :--------------------------------- | :---------------------------------------------- | :----------------------------------------------- |
| 使用 `RigidBody2D`来创建玩家角色            | 物理模拟中的惯性和反弹会阻止响应输入驱动的运动。                        | 玩家和敌人**始终使用 `CharacterBody2D`**。                 |
| 直接修改 `CharacterBody2D`的 `position` | e_and_slide()`进行碰撞检测不起作用，导致穿墙。                  | **始终更新 `velocity`并调用 `move_and_slide()`**。       |
| 在 `_process(delta)`中执行物理计算         | `_physics_process(delta)`以固定的帧速率调用，以确保物理计算的稳定性。 | 将**所有与物理相关的处理写入 `_physics_process(delta)`**。     |
| 使用过于复杂的 `CollisionShape2D`         | 多边形顶点越多，碰撞检测的计算成本就越高。                           | 尽可能使用简单形状（ `RectangleShape2D`、 `CircleShape2D`）。 |
|                                    |                                                 |                                                  |

## 选择合适节点的技巧

如果对节点选择不确定，请回答以下问题：

1. **物体会移动吗？**
	1. **否** ：选择 `StaticBody2D`。（例如，墙壁、地面）
2. **你是否希望物体的运动完全受物理定律（重力、碰撞、力）支配？**
	1. **是的** ：选择 `RigidBody2D`。（例如，球体、立方体）
3. **您希望通过玩家输入还是 AI 逻辑来精确控制物体的移动？**
	1. **是的** ：选择 `CharacterBody2D`。（例如，玩家、敌人）

## 总结

Godot 引擎的 2D 物理实体具有明确定义的角色：

- **StaticBody2D** ：不可移动的环境元素。
- **RigidBody2D**：完全受物理定律支配的物体。
- **CharacterBody2D** ：通过代码精确控制的角色。

通过了解这些差异并根据游戏对象的性质选择合适的节点，您可以开发出运行更流畅、更符合预期的游戏。