---
title: 通过进程模式控制暂停功能
description: 学习 Godot 引擎的暂停功能和节点进程模式。内容涵盖从基本用法到创建非暂停式用户界面、过场动画和对话应用程序，以及性能方面的注意事项。
created: 2026-05-21T17:01:00
---

## 概述

在游戏开发中，暂停功能对于让玩家休息或更改设置至关重要。Godot 提供了 `get_tree().paused = true`，这是一种简单的暂停整个游戏的方法。但是，您可能会遇到诸如 **暂停后无法控制 UI** 或 **部分角色仍在移动** 之类的问题。

造成这种情况的原因通常是对 `Process Mode`缺乏理解。本文将解释 Godot 暂停功能的基础知识、掌握 `Process Mode`概念以及高级实现技巧。

![[Pasted image 20260521170308.png]]

## Godot 中暂停功能的基本原理

要停止 Godot 中的大部分游戏循环，你需要操作场景树的 `paused`属性。

```gdscript
# 获取场景树并切换暂停状态
func toggle_pause():
    get_tree().paused = !get_tree().paused

    if get_tree().paused:
        print("Game paused.")
    else:
        print("Game resumed.")
```

当你执行 `get_tree().paused = true`，Godot 会停止以下操作：

- `_process(delta)`和 `_physics_process(delta)`调用
- 物理计算（碰撞、引力等）
- `InputEvent`处理（部分例外情况除外）

然而，仅靠这并不能停止"所有节点"。 `Process Mode`才是控制哪些节点受到暂停影响的单独因素。

## `Process Mode`：五种暂停控制模式

`Process Mode`是一个设置，它决定了每个节点如何响应场景树的暂停状态（ `get_tree().paused`）。你可以在检视面板的 `Node > Process`类别中进行设置。

| Mode | 行为 | 主要用途 |
| -------------- | --------------------------------------------------- | ------------------------------- |
| **Inherit** | 继承父节点的设置。 **这是默认值。** | 场景中的大多数节点。当不需要特殊控制时。 |
| **Pausable** | 当 `get_tree().paused = true`时停止处理 | 玩家、敌人、动态背景——核心游戏元素 |
| **WhenPaused** | **仅当** `get_tree().paused = true`时才执行进程 | 暂停菜单、设置屏幕、对话框——您希望在暂停期间交互的用户界面 |
| **Always** | 无论 `get_tree().paused`状态如何，都会继续处理 | 单例（自动加载）、背景音乐管理、在线通信等 |
| **Disabled** | 从不执行任何处理（ `_process`、 `_physics_process`、 `_input`） | 要暂时禁用的对象，调试节点 |

>**重要提示** ：由于 `Inherit`是默认设置，因此更改根节点的 `Process Mode`会影响其所有子节点。

## 实际应用案例和代码示例

### 用例 1：实现一个强大的暂停菜单

你需要在保持菜单界面可交互的情况下停止游戏。

**步骤 1：创建暂停管理单例（ `PauseManager.gd`）**

```gdscript
# PauseManager.gd
extends Node

const PAUSE_MENU_SCENE = preload("res://ui/pause_menu.tscn")

var is_paused: bool = false
var pause_menu_instance: Control = null

func _unhandled_input(event: InputEvent) -> void:
    if event.is_action_pressed("pause"):
        is_paused = !is_paused
        get_tree().paused = is_paused

        if is_paused and pause_menu_instance == null:
            pause_menu_instance = PAUSE_MENU_SCENE.instantiate()
            get_tree().root.add_child(pause_menu_instance)
        elif not is_paused and pause_menu_instance != null:
            pause_menu_instance.queue_free()
            pause_menu_instance = null
```

_在"项目设置 > 全局"中将此脚本注册为单例。_

**步骤 2：配置暂停菜单场景（ `pause_menu.tscn`）**

1. 创建一个以 `Control`节点为根节点的场景。
2. 在根节点的检查器中，将 `Node > Process > Mode`更改为 **`WhenPaused`**。
3. 向该场景添加"继续游戏"和"返回标题"等 `Button`节点。

### 实现过场动画

在过场动画期间，您希望禁用玩家控制，同时继续播放特定的角色和摄像机动画。

```gdscript
# CutsceneTrigger.gd (Attach to Area3D, etc.)

@export var animated_characters: Array[Node]
@export var animated_camera: Camera3D

func _on_body_entered(body: Node) -> void:
    if body.is_in_group("player"):
        start_cutscene()

func start_cutscene() -> void:
    get_tree().paused = true

    # 暂时更改过场动画中需播放动画节点的处理模式
    for character in animated_characters:
        character.process_mode = Node.PROCESS_MODE_ALWAYS
    if animated_camera:
        animated_camera.process_mode = Node.PROCESS_MODE_ALWAYS

    $AnimationPlayer.play("cutscene_animation")

func _on_animation_player_animation_finished(anim_name: StringName) -> void:
    if anim_name == "cutscene_animation":
        end_cutscene()

func end_cutscene() -> void:
    get_tree().paused = false

    # 恢复进程模式（重要！）
    for character in animated_characters:
        character.process_mode = Node.PROCESS_MODE_PAUSABLE
    if animated_camera:
        animated_camera.process_mode = Node.PROCESS_MODE_PAUSABLE
```

## 常见错误和最佳实践

| 常见错误 | 最佳实践 |
| ---------------------------- | ------------- |
| **到处调用 `get_tree().paused`** | 将暂停状态管理集中在一个单例（自动加载）中，避免其他脚本直接操作 |
| **暂停期间用户界面冻结** | 确认在暂停期间要交互的 UI 根节点的 `Process Mode`设置为 `WhenPaused` |
| **过度使用 `Always`模式** | 将 `Always`"模式限制在真正必要的节点（例如背景音乐、单例节点等）。过度使用会降低暂停期间的性能 |
| **`AnimationPlayer`不会停止** | 如果 `AnimationPlayer`无法与游戏暂停同步，请检查其 `Process Mode`设置。将其更改为 `Pausable`可使其随游戏暂停而停止。 |

## 性能与替代方案

### 性能考量

- **`Always`是最后的选择** ： `Always`模式可能会在暂停期间降低性能。
- **智能 `Disabled`**：对于暂时不需要的节点，将 `Process Mode`设置为 `Disabled`可以降低 CPU 负载。

### 替代方案：不使用 `get_tree().paused`进行暂停管理

由于 `get_tree().paused`会影响整个场景，为了进行更局部的控制，您可以让单例维护自己的暂停状态标志。

```gdscript
# Player.gd
extends CharacterBody3D

func _process(delta: float) -> void:
    if GameStateManager.is_gameplay_paused:
        return
    # ...normal processing...
```

由于 Godot 的标准 `get_tree().paused`和 `Process Mode`可以处理大多数情况，因此只有在有特定高级需求时才考虑这种替代方案。

## 总结

`get_tree().paused`和 `Process Mode`是 Godot 的强大功能。理解并正确使用这两个功能，可以优雅地实现各种重要的游戏场景：暂停菜单、过场动画、对话显示等等。

- **暂停基础知识** ： `get_tree().paused = true`会停止游戏的大部分内容。
- **控制关键** ： `Process Mode`允许对每个节点进行细粒度的行为设置。
- **最佳实践** ：将暂停管理集中在一个单例中，并将 UI `Process Mode`设置为 `WhenPaused`。
- **性能** ：避免过度使用 `Always`开启"模式，并明智地使用 `Disabled`模式。

## TODO 相关说明
