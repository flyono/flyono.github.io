---
title: "在 Godot 中稳定 FPS: 帧率管理与优化"
description: 如何消除 Godot 游戏中的卡顿。说明物理更新与渲染帧的区别，V-Sync 和 max_fps 的不同，物理插值如何彻底消除抖动，以及以测量为先的优化方法。
created: 2026-08-18T17:49:04
---

> "我开启了 `V-Sync` 但画面仍然不流畅。" "只有在生成大量敌人时才会出现卡顿。" "我始终不确定该使用 `_process` 还是`_physics_process`" 一旦你理解了在 Godot 中渲染和物理是运行在分离的循环上的，帧率问题就会显著改善

本文从卡顿(jitter)的根本原因开始，然后介绍了通过 `V-Sync` 和 `max_fps` 控制帧率，能够彻底消除卡顿的物理插值，以及"优化前先测量"的心态。

## 为什么会出现卡顿: 物理更新与渲染帧

理解Godot性能的关键在于区分两个相互独立的运行周期: 物理节拍与渲染帧。二者以不同速度运行是产生抖动的直接原因。

| | 物理更新 | 渲染帧 |
| --- | --- | --- |
| 角色 | 物理和碰撞 ( `_physics_process`) | 绘制和输入 (`_process`) |
| 评分 | 固定(默认 60Hz) | 可变(取决于性能和垂直同步) |
| delta | 固定值(1 / 物理速率) | 变量值(自上一帧以来的时间) |

假设物理引擎以 `60Hz` 运行，而你的显示器以 `144Hz` 运行。物理引擎每 `1/60` 秒更新一次位置，而屏幕尝试每 `1/144` 秒绘制一次，因此物体在多个绘制帧中保持相同位置，然后在下一个物理更新时突然跳跃。这种阶梯状运动就是抖动的现象。这就是为什么 "输入和绘制在 _process，物理移动在 `_physics_process` "是基本规则。

## 帧率控制: V-Sync 和 max_fps

首先，让我们在渲染端控制帧率。有两个工具: `V-Sync`(垂直同步) 和 `Engine.max_fps`

### 选择 V-Sync 模式

V-Sync 将绘图与显示器的刷新率同步，防止在屏幕绘制过程中切换时出现撕裂。在 `Display` > `Window` > `Vsync` > `Vsync Mode`下进行配置。

| 模式 | 概述 | 适合 |
| --- | --- | --- |
| Disabled(禁用) | 无同步。无帧率限制 | 最小化输入延迟(输入延迟会出现撕裂现象) |
| Enabled(启用) | 始终同步 | 完全防止撕裂(FPS 降低时延迟增加) |
| Adaptive(自适应) | 仅在高 FPS 时同步 | 避免撕裂同时防止 FPS 下降时出现延迟 |
| Mailbox(邮箱) | 保持并显示最新帧 | 限制撕裂和延迟(使用更多 VRAM) |

> 警告: 如果您的 Godot 设置似乎没有效果，NVIDIA/AMD 驱动程序设置可能正在覆盖它。将驱动程序设置为“由应用程序控制”。

### 使用 `Engine.max_fps` 进行锁定

当你想要锁定到特定的帧率(复古风格、节省移动设备电量等)，使用 `Engine.max_fps`

```gdscript
## Lock the max FPS to 60 (effective when V-Sync is Disabled)
## 锁定最大帧率到 60 (当垂直同步被禁用时)
func _ready() -> void:
    Engine.max_fps = 60
```

设置一次，它将适用于整个游戏。只需记住，当垂直同步（V-Sync）启用时， `max_fps` 会被忽略。

## 通过物理插值消除抖动

即使帧率得到控制，物理与渲染之间的不匹配仍然存在。物理插值正是用来填补这一空隙的。它在绘制时平滑地插值固定物理更新之间的位置，消除了阶梯状运动。这是解决抖动最有效的单一方法。

### 在项目设置中启用(推荐)

自 Godot 4.3 版本起，2D 和 3D 中都内置支持物理插值。在大多数情况下，仅此设置即可解决问题。

1. 打开 **Project > Project Settings**。
2. 在 **Physics > Common** 选项卡中，将 **Physics Interpolation** 设置为 **Enabled**。

受物理影响的节点，如 `CharacterBody2D/3D` 和 `RigidBody2D/3D`，现在会自动插值并平滑移动。

> 警告: 当物理插值启用时，节点位置会在其插值视觉位置处绘制。在物理计时器之间直接触摸 `global_position` 会与插值冲突，因此请在 `_physics_process`内部进行移动。

## 实践: 构建无卡顿的摄像机跟随

物理插值会自动应用于物理节点，但当您让非物理节点(如摄像机或 UI)跟随物理节点时，需要手动插值。在动作游戏中跟随英雄、在赛车游戏中车内摄像机、在俯视视角 ARPG 中的视点：所有这些都需要一个能够平滑跟踪玩家的摄像机。

关键在于 `Engine.get_physics_interpolation_fraction()`。它返回当前渲染帧在物理更新之间的位置，范围从 0.0 到 1.0。用它来计算目标在绘制时的真实位置。

```gdscript
# smooth_camera_2d.gd (attach to a Camera2D)
extends Camera2D

@export var target: Node2D
# Smaller means a lazier follow
# 规模越小，后续跟进就越不平滑
@export var smoothing: float = 0.1     

var _previous_target_position: Vector2

func _ready() -> void:
    if target:
        global_position = target.global_position
        _previous_target_position = target.global_position

func _process(_delta: float) -> void:
    if not target:
        return
    # Stage 1: interpolate between physics ticks to find the target's true current position
    # 第一步:  插值 physics ticks 以找到目标的当前真实位置
    var fraction := Engine.get_physics_interpolation_fraction()
    var interpolated := _previous_target_position.lerp(target.global_position, fraction)
    # Stage 2: ease the camera itself toward that position
    # 第2步:  将相机自身 ease 到该位置
    global_position = global_position.lerp(interpolated, smoothing)

func _physics_process(_delta: float) -> void:
    if target:
        # Record the position at this physics tick for next frame's interpolation
        # 记录此物理帧的位置，用于下一帧的插值
        _previous_target_position = target.global_position
```

有两个要点。

- 两个 `lerp`(线性插值)创造了平滑效果: 第一阶段在物理更新之间插值以找到目标的真实当前位置，第二阶段使摄像机向其移动。只有第一阶段会保留物理更新带来的卡顿感; 只有第二阶段会保留目标突然的运动。
- 在 `_process` 绘制，在 `_physics_process` 录制: 插值数学每帧运行(`_process`)，而录制前一个位置在物理 tick 上运行( _physics_process)。分离这些角色是关键。

对于摄像机设置，一般来说，(《实用 Camera2D 技术》)[camera2d-techniques] 也值得一看。

## 优化前先测量

当屏幕上有很多物体导致 FPS 下降时，人们很容易直接跳到“子弹太多了，是时候使用对象池了”的结论。但优化的铁律是“不要猜测，要测量”。

Godot 的调试器中自带监控器(显示 FPS 和内存随时间变化)和性能分析器(按函数计时)。先用它们找出真正慢的部分，然后选择与原因匹配的解决方案。如果瓶颈在于节点创建和销毁，就看看对象池。如果是渲染成本问题，就重新审视你的着色器和绘制次数。如果是加载时间问题，就研究动态加载和资源管理。这些测量结果会告诉你该采取什么措施。

对象池技术尤其应该只在测量显示像子弹和特效这样生命周期短且频繁生成的对象是瓶颈时才引入。将其应用于像 Boss 或 UI 这样低频出现的事物只会使代码复杂化而没有任何好处(完整的实现请参阅《对象池完全指南》)。

## 常见错误和最佳实践

| 常见错误 | 最佳实践 |
| --- | --- |
| 将移动和所有逻辑放在 `_process` | 物理移动在 `_physics_process`，绘制和输入在 `_process`。理解每个 `delta` 的含义 |
| 凭直觉引入对象池 | 使用分析器定位瓶颈，然后进行优化 |
| 直接在 _physics_process内调用 `queue_free()` | 在物理步骤完成后使用 `call_deferred("queue_free")` 安全删除 |
| 将 `physics tick rate` 提高以消除抖动 | 将帧率固定在 60Hz，并将抖动留给物理插值 |

在物理步骤中删除对象是一个特别常见的错误来源。在碰撞处理过程中移除节点可能会引发错误，因此通过 `call_deferred()` 排队 `queue_free()`是更安全的方法。

## 小贴士

- **始终乘以 delta**: `_process` 在不同帧率下被调用的次数不同。如果不将移动乘以 `delta`，不同 FPS 的电脑上速度会变化。与物理插值分开来看，将其视为一个基本点。
- **在移动设备上平衡功耗**: 高帧率会消耗电池。在移动设备上通常将 `Engine.max_fps` 保持适度(30 到 60)。
- **分析感觉卡顿的场景**: 你不需要持续分析。在重现卡顿场景时进行测量，能最快找到原因。

## 总结

- 抖动（jitter）是固定物理更新和可变渲染帧之间的不匹配
- V-Sync 用于防止撕裂， Engine.max_fps锁定帧率。当 V-Sync 开启时， max_fps将被忽略
- 解决抖动的最佳方法是物理插值（将物理插值设置为开启）
- 对于相机等非物理节点，使用 get_physics_interpolation_fraction()进行手动插值
- 仅在使用测量工具确认后进行优化。仅在测量显示短暂高频对象是瓶颈时使用对象池

首先在项目设置中开启物理插值，感受运动变得平滑。这一改变解决了大多数卡顿问题。