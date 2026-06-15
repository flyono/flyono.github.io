---
title: _process 和 _physics_process 的正确用法
description: 解释了_process 和_physics_process 之间的区别。可变/固定时间步长的基本原理以及正确使用的最佳实践。
created: 2026-05-25T13:57:00
---
## 引言：为什么区分这两者很重要？

使用 Godot 引擎进行开发时，大家首先都会遇到两个函数： `_process`和 `_physics_process`。但是，你是否遇到过诸如“角色移动速度取决于电脑性能”、“移动画面卡顿”或“有时会穿墙”之类的问题？

这些问题大多是由于对 `_process`和 `_physics_process`的作用理解有误，以及在不恰当的位置编写处理代码造成的。本文将详细解释这两个函数之间的区别——它们是 Godot 游戏循环的核心。

## `_process`与 `_physics_process`：基本区别

这两个函数最重要的区别在于**它们的调用时机和调用频率** 。这与游戏开发中的“可变时间步长”和“固定时间步长”的概念直接相关。

| 特征                       | `_process(delta)`           | `_physics_process(delta)` |
| :----------------------- | :-------------------------- | :------------------------ |
| **Call timing**          | 每帧（每次渲染）                    | 按固定时间间隔（根据物理计算）           |
| **Timestep**             | **可变**时间步长                  | **固定**时间步长                |
| **Call frequency  通话频率** | 取决于电脑性能和负载（例如，60FPS，144FPS） | 取决于项目设置（默认值：每秒 60 次）      |
| `delta`参数                | 自上一帧以来经过的时间（ **不固定** ）      | 物理步骤之间的时间间隔（ **固定值** ）    |
| **主要用途**                 | 用户界面更新、输入处理、视觉效果、非物理动画      |   物理计算、碰撞检测、时间关键逻辑        |

- **`_process`**：每次屏幕更新时都会调用，因此适合用于视觉处理。但是，执行间隔不稳定，所以不能用于物理等需要精确计算的任务。
- **`_physics_process`**：无论帧速率如何，都会以恒定的时间间隔调用，从而保证基于物理的运动的可重复性（无论何时或由谁运行，结果都相同）。

## 常见错误和最佳实践

即使理解了理论，实践中也常常会犯错。让我们通过对比的方式来探讨一些具体的错误以及解决这些错误的最佳方法。

| 常见错误                                                                      | 最佳实践                                                          |
| :------------------------------------------------------------------------ | :------------------------------------------------------------ |
| 在 `_process`中运行物理（ `move_and_slide`）<br>→行为会根据帧速率变得不稳定。                   | 始终在 `_physics_process`中运行物理运算<br>→确保可重复、稳定的物理行为。              |
| **在 `_process`中不使用 `delta`添加值。**  <br>→游戏速度会根据电脑性能而变化。                    | 在 `_process`中，始终将基于时间的处理的 `delta`乘以 。   <br>→实现与帧速率无关的恒定速度。   |
| 在 `_physics_process`中获取输入（ `Input.is_action_pressed`）<br>→可能会错过输入，导致响应迟缓。 | 从 `_process`或 `_input`中获取输入，并将结果保存到成员变量中。 <br>→每帧检测输入，实现流畅控制。 |
| 在 `_physics_process`中运行视觉更新（UI、效果）<br>→与渲染不同步，导致画面抖动。                     | 在 `_process`中运行视觉处理<br>→与渲染帧同步，实现流畅的视觉效果。                     |

## 实用代码示例：角色移动

让我们来看看基于最佳实践的角色移动代码。关键在于正确地分离输入、物理和动画。

```gdscript
extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

# 物理引擎计算的重力
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")
var input_direction = Vector2.ZERO

# 1. 输入处理：每一帧运行，并将输入数据存入变量
# 也可以使用_input()事件，但_process对于连续输入来说更加直观
func _process(delta):
    # 获取水平输入
    input_direction.x = Input.get_axis("move_left", "move_right")

    # 跳跃输入（单击检测）
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # 视觉处理（例如：动画更新）
    update_animation()

# 2. 物理运算：以固定时间步长运行
func _physics_process(delta):
    # 应用重力
    if not is_on_floor():
        velocity.y += gravity * delta

    # 根据输入方向确定水平速度
    velocity.x = input_direction.x * SPEED

    # 执行物理运算
    move_and_slide()

func update_animation():
    # Write visual code here like animation tree updates
    pass
```

在这段代码中， `_process`负责流畅的输入检测和动画更新，而 `_physics_process`则专注于稳定的物理计算（重力、运动）。这使得游戏在任何环境下都能实现一致且舒适的操控体验。

## 性能和进阶

### 利用物理插值实现平滑运动

当执行频率不同时——例如物理运算每秒 60 次，而渲染每秒 144 次——就会出现“抖动”现象，导致物体运动显得不流畅。 **物理插值**可以解决这个问题。

启用后，引擎会自动在物理步骤之间插值位置，并在渲染帧中平滑地显示它们。

- Enable: 打开 项目设置 -> 物理 -> 通用 -> 物理插值

此设置至关重要，尤其是在摄像机跟随角色的游戏中。

### `_input` 和 `_process` 中的 Input

输入处理可以在 `_process()`中使用 `Input.get_axis()`，或者使用 `_input(event)`回调。

- **`_input(event)`**： **在事件发生时**调用，例如鼠标点击或按键。适用于一次性操作（例如，打开物品栏、开火）。
- **`_process()`**：适用于检查**连续状态** 。使用 `is_action_pressed()`来确认“按键是否被按下”的移动处理方式在这里更加直观。

两者都有效，但根据其作用使用它们可以使代码意图更清晰。

## 总结

正确区分 `_process`和 `_physics_process`是 Godot 开发中最重要的一步。要养成习惯，经常问自己：“这个处理过程需要物理上的可重复性，还是需要视觉上的流畅性？”

既然你已经掌握了本文中的基础知识，接下来我们将探讨以下主题：

- **信号：** 一种强大的系统，用于保持节点协调的松散耦合。
- **`AnimationTree`：** 混合多个动画并管理复杂的角色状态。
- **自定义资源：** 创建可重用的数据集，例如武器数据和角色统计数据。

这些概念将使你的 Godot 项目更具可扩展性和可管理性。