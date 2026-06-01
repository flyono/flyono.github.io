---
title: 理解 Godot 引擎中的 await 和协程：异步处理基础
description: 学习如何在 Godot 4 的 GDScript 中使用 await 关键字和协程，内容涵盖从基本信号等待到实用 UI 控制和性能考量。
created: 2026-05-22T09:19:00
---
在游戏开发中，“等待”和“暂停”过程频繁出现。例如，等待动画播放完毕、等待网络响应或在一段时间后恢复处理。 **异步处理**和**协程**是高效处理这些过程的关键概念，它们可以避免主循环（帧处理）的中断。

在 Godot 引擎的 GDScript 中，引入了 `await`关键字，以简洁而强大地处理异步操作。本文涵盖了从 `await`基本用法到底层协程机制、性能考量以及从 Godot 3 中使用的 `yield`迁移的所有内容。

## 为什么异步处理和 `await`很重要

游戏必须始终流畅运行。如果某个进程（例如加载大型文件或进行复杂计算）长时间占用主线程，游戏就会卡顿，严重影响用户体验。这被称为**阻塞** 。

使用 `await`进行异步处理是避免阻塞的有力武器。`await`在等待事件发生时**暂停**函数执行，并将控制权交还给 Godot 引擎，直到等待完成。在此期间，引擎可以继续执行其他进程（渲染、输入处理、物理计算等），从而避免游戏卡顿。当等待的事件（例如信号发射）发生时，引擎会自动从暂停处**继续**执行函数。

具有这种“暂停和恢复”机制的函数称为**协程** 。在 GDScript 中，一旦在函数内部使用 `await`，该函数就会自动变成协程。

## `await`的基本用法

`await`用于等待**信号**或其他**协程**完成。

### 1. 等待信号

最常见的用途是等待节点发出的信号。

```gdscript
# 示例：攻击动作结束后造成伤害
func _on_attack_button_pressed():
    $AnimationPlayer.play("attack")
    # Wait for AnimationPlayer's `animation_finished` signal
    await $AnimationPlayer.animation_finished

    # Animation finished, now execute damage calculation
    print("Attack animation finished! Damage check!")
```

### 2. 等待一段时间（计时器）

要暂停处理指定时间，请结合 `SceneTree`提供的计时器创建功能。

```gdscript
# 示例：3秒后生成敌人
func spawn_enemies_after_delay():
    print("Game started! Enemies will appear in 3 seconds.")
    # Create a SceneTreeTimer and wait for its `timeout` signal
    await get_tree().create_timer(3.0).timeout

    print("Time's up! Spawning enemies.")
    # Enemy instantiation logic here
```

### 3. 等待其他协程完成

`await`还可以等待其他本身就是协程的函数。

```gdscript
# Function that loads resources asynchronously and waits for completion
func load_level_async() -> void:
    print("Starting level data load...")
    await get_tree().create_timer(2.0).timeout # Dummy load time
    print("Level data load complete.")

# Game start sequence
func start_game():
    # First fade in the UI (coroutine)
    await fade_in_ui()

    # Then load level data asynchronously (coroutine)
    await load_level_async()

    # All preparations complete, enable player control
    print("Game Start!")

func fade_in_ui():
    var tween = create_tween()
    tween.tween_property($UI/CanvasLayer, "modulate:a", 1.0, 1.0)
    await tween.finished
```

包含 `await`函数会被自动视为**协程** 。协程是一种可以暂停执行并在稍后恢复执行的函数。

**协程特性** ：


| 特征                     | 描述                           |
| ---------------------- | ---------------------------- |
| **Cooperative**        | 处理切换是由程序员使用 `await`关键字显式进行的。 |
| **Pause and Resume**   | 在 `await`点暂停，并在等待的目标完成后自动恢复。 |
| **Stack Preservation** | 即使暂停，执行上下文（堆栈），包括局部变量，也会被保留。 |

## 常见错误和最佳实践

| 常见错误                           | 最佳实践                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **在 `_process`中每帧都使用 `await`** | 在 `_process`中 `await`会暂停处理一帧或多帧，导致意外延迟。对于由特定事件触发的一次性序列处理，请使用 `await`，并改用状态变量（状态机）来处理逐帧检查。                                |
| **`await`节点删除后**               | 如果在等待期间使用 `queue_free()`删除了正在等待的节点，则处理将不会恢复并导致错误。请在等待之前使用 `is_instance_valid(node)` 检查节点是否存在，或者等待节点的 ` `tree_exiting`信号。 |
| **混淆了与 `await`信号连接。**          | `await`用于**一次性**等待。要让按钮每次按下时都执行某些操作，请将 `button_down`信号 `connect`到相应的函数。                                                  |
| **忽略返回值**                      | 有些信号会传递参数。await `await`信号参数，因此请使用 `var result = await object.signal_name`。                                               |

## 性能考量和替代模式

### `await`开销

使用 `await`创建和管理协程的开销很小。但当成百上千个对象同时运行协程时，调度开销会累积起来，并可能影响性能。

### 替代方案： `Thread`类

对于真正繁重的处理任务（例如复杂的 AI 计算、大规模数据处理、文件 I/O）， `await`可能会导致主线程出现轻微卡顿。对于这类 CPU 密集型任务，最好使用 **`Thread`类**在后台线程中运行。


|            | `await`           | `Thread`              |
| ---------- | ----------------- | --------------------- |
| 目的         | 主线程上的协作式多任务处理（等待） | 后台并行处理（繁重计算）          |
| **Thread** | 仅限主线程             | 与主线程分离                |
| **执行**     | 只需使用 `await`关键字即可 | 创建 `Thread`对象并调用函数    |
| **警告**     | 处理过程本身在主线程上运行     | 访问主线程数据需要谨慎（可能需要互斥锁）。 |

### 替代方案： 直接信号连接

对于持续响应事件，使用 `connect`直接连接信号是标准方法，而不是 `await`。

```gdscript
# Connecting signals (recommended event handling)
func _ready():
    $MyButton.button_down.connect(_on_my_button_pressed)

func _on_my_button_pressed():
    print("Button was pressed!")
```

## 总结

Godot 引擎中的 `await`关键字是 GDScript 中处理异步处理和协程的强大工具。

| Concept  概念       | Keyword  关键词 | Role  角色                     |
| :---------------- | :----------- | :--------------------------- |
| **异步处理**          | `await`  等待  | 允许等待和恢复，而不会阻塞主线程。            |
| **Coroutine  协程** | 包含 `await`函数 | 一个可以暂停并在稍后恢复执行的功能。支持简洁复杂的序列。 |
