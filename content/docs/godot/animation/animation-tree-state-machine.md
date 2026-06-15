---
title: 使用 AnimationTree 和 状态机 进行复杂动画管理
description: 通过实际代码示例，了解如何使用 Godot Engine 的 AnimationTree 和状态机有效管理复杂的角色动画。
created: 2026-06-11T17:19:00
---
## 简介：为什么需要动画树和状态机

在游戏开发中，角色动画是丰富玩家体验的一个极其重要的元素。然而，当角色具有 "空闲"、"行走"、"奔跑"、"跳跃 "和 "攻击 "等多种状态时，在代码中管理这些动画之间的转换就变得异常复杂和繁琐。

结果就是臭名昭著的 `if-elif-else`嵌套结构出现在 `_physics_process`内部。

请看 Godot Engine 的强大功能： `AnimationTree`节点及其核心组件--状态机（ `AnimationNodeStateMachine`）。利用这些功能，你可以将动画播放和转换逻辑分离到可视化图形中，从而大大减轻代码负担。

## 理解关键概念

### 1. AnimationTree 节点

`AnimationTree`是一个节点，用于检索存储在 `AnimationPlayer`节点中的动画数据，并控制混合和状态机行为。 `AnimationPlayer`是动画 "数据库"，而 `AnimationTree`则是执行和控制动画的 "引擎"。

### 2.AnimationNodeStateMachine （状态机）

状态机是一种图结构，由多个动画节点（状态）和连接这些节点的转换组成。

- **State**：状态图形上代表特定动画的节点。
- **Transition**: 在状态之间移动的箭头。这些转换可以设置特定的条件。

### 3.动画节点状态机器回放

用于通过 GDScript 控制状态机的对象。代码通过 `travel()`方法强制转换、检查当前状态等所有操作都通过该对象执行。

## 练习：使用空闲、行走、奔跑和跳跃功能创建角色

### 1.准备节点和动画

首先，准备一个如下的节点结构，并在 `AnimationPlayer`中创建四个动画： `idle`、 `walk`、 `run`和 `jump`。

```
- CharacterBody2D
  - Sprite2D
  - CollisionShape2D
  - AnimationPlayer
  - AnimationTree
```

### 2.设置 `AnimationTree`

1. 选择 `AnimationTree`节点，并将 `AnimationPlayer`节点分配给检查器中的 `Anim Player`属性。
2. 将 `Tree Root`属性设置为 `New AnimationNodeStateMachine`。
3. 在屏幕下方显示的 `AnimationTree`面板中，在图形编辑器上添加 4 个 `Animation`节点，并将其重命名为 `idle`、 `walk`、 `run`和 `jump`。
4. 用箭头连接节点，创建过渡。

### 3.GDScript 控制

```gdscript
extends CharacterBody2D

const WALK_SPEED = 100.0
const RUN_SPEED = 250.0
const JUMP_VELOCITY = -400.0

@onready var animation_tree: AnimationTree = $AnimationTree
@onready var animation_state: AnimationNodeStateMachinePlayback = animation_tree.get("parameters/playback")

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _ready():
    animation_tree.active = true

func _physics_process(delta):
    # 重力
    if not is_on_floor():
        velocity.y += gravity * delta

    # 跳跃
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # 水平移动
    var direction = Input.get_axis("ui_left", "ui_right")
    var target_speed = 0.0
    if direction:
        if Input.is_action_pressed("ui_sprint"):
            target_speed = RUN_SPEED
        else:
            target_speed = WALK_SPEED

    velocity.x = move_toward(velocity.x, direction * target_speed, 20.0)

    move_and_slide()

    update_animation_parameters()

func update_animation_parameters():
    var on_floor = is_on_floor()
    var current_speed = abs(velocity.x)
    var target_state = ""

    if on_floor:
        if current_speed > 180:
            target_state = "run"
        elif current_speed > 10:
            target_state = "walk"
        else:
            target_state = "idle"
    else:
        target_state = "jump"

    # 仅当当前状态发生变化时调用travel()函数
    if animation_state.get_current_node() != target_state:
        animation_state.travel(target_state)
```

## 常见错误和最佳做法

| 常见错误                | 最佳实践                                                            |
| :------------------ | :-------------------------------------------------------------- |
| **过度使用 `travel()`** | 用 `set()`更新参数，并将过渡留给 `AnimationTree`的条件。只有在特殊情况下才使用 `travel()`。 |
| **巨型单一状态机**         | 对相关状态进行分组，并利用嵌套状态机（子状态机）。                                       |
| **使用魔法数字**          | 定义为常量或 `export`变量，如 `const RUN_SPEED = 250.0`，以提高可重用性和可维护性。     |
| **转换时的 X 淡入时间为 0**  | 设置 0.1-0.3 秒的短交叉淡入淡出时间，可平滑地插播动画，使动作自然。                          |

## 性能和替代方案

### 性能考虑因素

- 节点数和转换复杂度：状态机中的节点和转换越多，每帧的评估成本就越高。
- 混合计算：在 `BlendSpace2D`或 `BlendTree`中进行复杂的混合计算会消耗 CPU 资源。
- 参数更新频率：通过 `set()`更新参数是轻量级的，但每帧连续更新许多参数会增加少量开销。

### 另类模式：用代码管理一切

也可以不使用 `AnimationTree`而在 GDScript 中管理一切。

```gdscript
func _physics_process(delta):
    if not is_on_floor():
        $AnimationPlayer.play("jump")
    else:
        if abs(velocity.x) > 180:
            $AnimationPlayer.play("run")
        elif abs(velocity.x) > 10:
            $AnimationPlayer.play("walk")
        else:
            $AnimationPlayer.play("idle")
```

对于只有 3-4 种状态的非常简单的字符，这种方法可能更方便。但是，随着状态的增加， `if`语句会不断嵌套，很容易陷入 "意大利面条代码"。

**如果角色有 5 个或更多状态，或者需要平滑的动画过渡，建议引入 `AnimationTree`。**

## 下一步工作

- `BlendSpace2D`/ `BlendSpace1D`：基于一维/二维矢量（如速度）平滑混合多个动画。适用于 8 向运动动画。
- `AnimationNodeBlendTree`: 可以制作更复杂、更自由的动画。
- `AnimationNodeOneShot`：非常适用于播放一次并返回原始状态的动画，如攻击或物品使用。

## 总结

Godot Engine 的 `AnimationTree`和 `AnimationNodeStateMachine`是必不可少的工具，可大大简化复杂的角色动画管理，提高游戏开发的效率和质量。

| 特点                | 角色         | 益处                         |
| :---------------- | :--------- | :------------------------- |
| **AnimationTree** | 动画执行引擎     | 将逻辑与 `AnimationPlayer`分隔开来 |
| **状态机**           | 过渡规则的可视化定义 | 直观地管理复杂的过渡                 |
| **过渡条件**          | 触发过渡的条件    | 减轻代码负担，提高灵活性               |

通过理解这些概念并将其与实用的 GDScript 控制方法相结合，您的游戏角色将获得更加生动自然的动作。