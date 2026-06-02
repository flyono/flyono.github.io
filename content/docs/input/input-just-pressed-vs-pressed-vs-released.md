---
title: 理解输入检测方法：just_pressed、pressed 和 release
description: 了解 Godot 引擎的输入方法 is_action_just_pressed、is_action_pressed 和 is_action_just_released 之间的区别。包含跳跃、移动、蓄力攻击和变高跳跃的实用代码示例。
created: 2026-06-01T11:44:00
---
## 概述

要打造一款能够精准响应玩家操作的游戏，就需要对操作“状态”有深刻的理解。按键是持续按住，还是刚刚按下？掌握这种区别能够显著提升角色操控的手感。

“按下跳跃键”——这个看似简单的操作，如果实现不当，会严重影响游戏体验。例如，按住跳跃键可能会导致角色无限弹跳，或者短按移动键可能会导致角色无限滑行。许多此类问题都源于未能正确区分不同的输入“状态”。

本文解释了 Godot 的主要输入检测方法之间的区别： `is_action_just_pressed`、 `is_action_pressed`和 `is_action_just_released`。

## 三种主要输入方法

Godot 的输入处理主要使用 `Input`单例（一个全局可访问的对象）。我们来看一下三种最常用的轮询方法。这些方法用于每帧都会调用的函数中，例如 `_process`和 `_physics_process`，以检查当前的输入状态。

该参数是一个字符串，指定在 `项目 > 项目设置 > 输入映射`”中定义的操作名称（例如， `"jump"`、 `"move_right"`）。

| 方法                          | 检测时机        | 返回     | 主要用途               |
| :-------------------------- | :---------- | :----- | :----------------- |
| `is_action_pressed()`       | 长按该操作时      | `true` | 持续动态画面、快速射击、界面高速滚动 |
| `is_action_just_pressed()`  | 按下该操作时仅取第一帧 | `true` | 跳跃、确认、打开菜单、单发射击    |
| `is_action_just_released()` | 仅动作松开时的第一帧  | `true` | 蓄力攻击释放、跳跃高度调节、拖拽结束 |

## 实用代码示例

现在你已经理解了理论，让我们来看具体的代码。我们将以一个 2D 横版游戏角色为例，演示如何使用每个方法。

### 1. 基本移动和跳跃（ `pressed`& `just_pressed`）

这是最基本的组合。左右移动使用连续输入，跳跃使用瞬时输入。

```gdscript
extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    # 启用重力效果
    if not is_on_floor():
        velocity.y += gravity * delta

    # 跳转：按下“瞬时”按钮时执行一次
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # 水平移动：按下期间施加作用力
    var direction = Input.get_axis("move_left", "move_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)

    move_and_slide()
```

`Input.get_axis()`内部执行与 `is_action_pressed()`相同的检查，当按键被按下时返回 -1 到 1 之间的值。这实现了平滑移动。

### 2. 蓄力攻击（ `pressed`并 `released`）

按住按钮积蓄能量， `pressed`按钮 `released`能量，即可实现蓄力攻击。

```gdscript
extends Sprite2D

var is_charging = false
var charge_time = 0.0
const MAX_CHARGE_TIME = 2.0

func _process(delta):
    # 蓄力：握持期间累积时长
    if Input.is_action_pressed("charge_attack"):
        is_charging = true
        charge_time += delta
        # 根据电量改变外观（例如变换颜色）
        modulate = Color.WHITE.lerp(Color.RED, charge_time / MAX_CHARGE_TIME)
        print("Charging... %.2fs" % charge_time)

    # 松开触发攻击：松开按键的瞬间执行
    if Input.is_action_just_released("charge_attack"):
        if is_charging:
            var power = clamp(charge_time, 0.5, MAX_CHARGE_TIME)
            print("Attack released with power: %.2f!" % power)
            # 在此处调用子弹发射逻辑
            # 发射子弹(威力)

            # Reset
            is_charging = false
            charge_time = 0.0
            modulate = Color.WHITE
```

### 3. 可变高度跳跃（ `just_pressed`并 `released`）

“可变跳跃”是指按住按钮时间越长，跳跃高度越高，这是许多平台游戏（例如马里奥系列）中常用的一种技巧。这极大地扩展了玩家的控制范围。

```gdscript
# (Add to CharacterBody2D code)

const SHORT_JUMP_MULTIPLIER = 0.5

func _physics_process(delta):
    # ... (gravity and movement code remains the same)

    # 开始跳转
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # When jump button is released, cut the ascent
    if Input.is_action_just_released("jump") and velocity.y < 0:
        velocity.y *= SHORT_JUMP_MULTIPLIER

    # ... (move_and_slide())
```

这段代码会在角色仍在上升过程中（ `velocity.y < 0`）松开跳跃键时，限制角色的上升速度。这样就实现了“短按=低跳，长按=高跳”。

## 常见错误和最佳实践

输入处理存在多个易出错环节。请参考下表编写更健壮、更符合预期行为的代码。

| 类别         | 常见错误                                                          | 最佳实践                                                                      |
| :--------- | :------------------------------------------------------------ | :------------------------------------------------------------------------ |
| **跳跃处理**   | 使用 `is_action_pressed()`。按住按钮会导致意外的重复跳跃。                      | 使用 `is_action_just_pressed()`。跳转逻辑仅在按下按钮的瞬间执行一次。                          |
| **用户界面操作** | 对确认按钮使用 `is_action_pressed()`。该动作每帧都会触发，导致菜单快速跳转。             | 使用 `is_action_just_pressed()`。UI 操作通常应视为一次性操作。                            |
| **处理循环**   | 在 `_process()`中处理与物理相关的输入。由于帧率波动，物理行为可能会变得不稳定。                | 在 `_physics_process()`中处理与物理相关的输入（移动、跳跃等），以确保行为稳定。                        |
| **行动定义**   | 在脚本中硬编码按键代码（ `Input.is_key_pressed(KEY_SPACE)`），会导致按键重映射变得繁琐。 |   在 `InputMap`中定义动作，并通过名称引用它们，例如 `is_action_pressed("jump")`。这使得按键配置更加容易。 |

## 性能与替代方案：轮询与事件驱动

目前介绍的 `is_action_*`方法使用“轮询”——主动检查每一帧“是否有任何输入？”

Godot 还提供了一种“事件驱动”方法作为另一种主要的输入处理方式。这种方法涉及重写诸如 `_input()`或 `_unhandled_input()`之类的虚函数，以便在发生输入时接收来自 Godot 的通知。

```gdscript
# 事件驱动方案示例
func _unhandled_input(event: InputEvent):
    if event.is_action_pressed("jump"):
        # 按下按键时会触发一个事件，进而调用该函数
        # 注：若已开启按键重复功能，长按按键时该函数可能会被反复调用
        print("Jump action event!")

    if event.is_action_released("ui_cancel"):
        get_tree().quit()
```

 **你应该使用哪一个？**

- **轮询（ `is_action_*`）**
	- **优点** ：可以在 `_process`或 `_physics_process`函数的任何所需时间检查输入状态。当“保持状态”很重要时（例如角色移动），这种方式非常直观。
	- **缺点** ：每帧都会进行检查处理。不过，在现代电脑上，这很少会成为瓶颈。
- **事件驱动（ `_input`， `_unhandled_input`）** ：
	- **优点** ：代码仅在有输入时执行，效率很高。非常适合处理一次性事件，例如获取鼠标点击位置、执行 UI 操作或显示暂停菜单。
	- **缺点** ：管理“被持有”状态需要自己维护标志变量，这可能会使代码稍微复杂一些。

有效的方法是使用轮询进行实时角色控制，并使用事件驱动处理进行 UI 操作和一次性操作。

## 总结

输入检测是决定游戏手感的关键要素。通过正确运用 Godot 提供的三种方法，您可以实现更直观、更灵敏的操控。

- **移动**和其他连续动作： `is_action_pressed()`
- **跳跃** 、 **确认**和其他一次性操作： `is_action_just_pressed()`
- **释放电荷**和其他特殊操作： `is_action_just_released()`

掌握这些基本技巧并将它们运用到你的游戏中！

## 相关文档

>[[autoload-global-data-management]]

>