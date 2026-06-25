---
title: Godot Engine Camera2D 实用技巧：掌握平滑跟随、屏幕抖动和动态缩放
description: 掌握 Godot 引擎 Camera2D 的实用技巧。涵盖平滑跟随、屏幕抖动、动态缩放和性能优化，并提供具体的代码示例。
created: 2026-06-23T14:53:00
---

## 用于增强沉浸感的实用 `Camera2D` 技术

Godot 引擎中的 Camera2D 节点就像 2D 游戏的“眼睛”，负责跟随玩家移动或显示特定场景。然而，除了简单地跟随玩家之外，增加摄像机运动的精细度可以显著提升游戏的沉浸感和反馈效果 。

尤其是在动作和平台游戏中，镜头移动直接影响玩家的操作体验。本文将介绍三种提升游戏品质的实用 `Camera2D` 技术: **平滑跟随**, **屏幕抖动**和**动态缩放**, 并提供完整的 `GDScript` 代码示例。

## 1. 平滑跟随，实现轻柔的玩家追踪

基本的 Camera2D 跟随可以通过在脚本中设置 `global_position` 来实现，但直接指定目标坐标会导致摄像机运动僵硬，因为摄像机无法跟上玩家的移动，从而产生卡顿。尤其当基于物理的移动 (`_physics_process`) 和摄像机渲染(`_process`)的时序不一致时，更容易出现这种被称为抖动的卡顿现象。

### `position_smoothing_enabled`: 简易介绍

Camera2D 节点自带一个标准的 `position_smoothing_enabled` 属性。只需将其设置为 `true` 并调整 `position_smoothing_speed`即可轻松实现平滑跟随效果。

- 优点 ：非常容易实现。只需在检查器中点击几下即可配置。
- 缺点 ：跟随速度固定。不适用于动态速度变化或复杂的控制。

### 高级跟踪与线性插值

为了更精细地控制跟随速度，或者当标准平滑处理无法产生令人满意的结果时，可以使用 GDScript 的 `lerp`(线性插值)函数。

```gdscript
# Script attached to Camera2D
extends Camera2D

@export var target: Node2D
# Follow smoothness. Smaller values = smoother (slower)
# 遵循平滑度参数。数值越小，画面越平滑（运行速度越慢）
@export_range(0.0, 1.0) var follow_smoothing: float = 0.05

func _physics_process(delta: float) -> void:
    if not is_instance_valid(target):
        return

    # Smoothly interpolate camera position toward target
    # 平滑插值相机位置至目标位置
    global_position = global_position.lerp(target.global_position, 1.0 - pow(follow_smoothing, delta))
```

这段代码的关键在于使用 `1.0 - pow(follow_smoothing, delta)`作为线性插值权重。这样即使帧率 (delta) 波动，也能保持相机跟随速度几乎恒定。

## 2. 冲击反馈画面抖动效果

屏幕震动是一种重要的反馈技术，可以直观地传达游戏中的**冲击效果** ——例如玩家受到伤害、释放强力攻击或发生爆炸时。

### 基于创伤的屏幕抖动

基于`trauma`数值的实现方案是制作屏幕抖动效果最高效的方法之一。

1. **trauma 管理**: 每次发生冲击时，添加一个介于 0.0 和 1.0 之间的`trauma`值。
2. **抖动量计算** ：根据创伤值计算屏幕抖动量。`trauma`值越高，抖动量越大。
3. **衰减** ：`trauma`值会随着时间推移逐渐衰减。

```gdscript
# Script attached to Camera2D
extends Camera2D

var trauma: float = 0.0
# Trauma decay rate per second
# 每秒 Trauma 衰减速率
@export var trauma_decay: float = 0.8
# Maximum shake offset
# 最大抖动偏移量
@export var max_offset: float = 10.0 # Maximum shake offset

func add_trauma(amount: float):
    # Add trauma value, clamping to not exceed 1.0
    trauma = min(trauma + amount, 1.0)

func _process(delta):
    if trauma > 0:
        # Decay trauma over time
        # trauma 随时间慢慢消解
        trauma -= trauma_decay * delta
        trauma = max(trauma, 0.0)

        # Calculate shake amount (squaring trauma creates sharper decay appearance)
        # 计算抖动数值（将 trauma 值平方可获得更锐利的衰减视觉效果）
        var shake_amount = trauma * trauma

        # Apply random offset
        # 应用随机偏移
        var x_offset = randf_range(-1.0, 1.0) * max_offset * shake_amount
        var y_offset = randf_range(-1.0, 1.0) * max_offset * shake_amount

        offset = Vector2(x_offset, y_offset)
    else:
        # Reset offset when trauma is gone
        # trauma 消除后重置偏移量
        offset = Vector2.ZERO
```

将此脚本附加到 `Camera2D`，并在发生爆炸等事件时调用 `add_trauma(0.5)` 以实现逼真的屏幕抖动。

## 3. 场景方向的动态缩放

`Camera2D` 的缩放功能不仅能有效调整屏幕大小，还能增强游戏方向感和策略性。例如，在 Boss 战开始时放大画面，或者缩小画面展现广阔的区域。

### 使用 Tween 节点实现平滑缩放

瞬间改变缩放比例可能会让玩家感到不适。使用 `Tween` 可以使缩放比例随时间平滑过渡。

```gdscript
# Script attached to Camera2D
extends Camera2D

# Function to execute zoom animation
# 执行缩放动画的函数
func animate_zoom(target_zoom: float, duration: float = 0.5) -> void:
    # Create new Tween
    # 创建新的Tween
    var tween = create_tween().set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)

    # zoom property is Vector2, so animate both axes with same value
    # 缩放属性为二维向量，因此需使用相同数值对两个坐标轴执行动画
    tween.tween_property(self, "zoom", Vector2(target_zoom, target_zoom), duration)

# Usage example
func _unhandled_input(event: InputEvent) -> void:
    if event.is_action_pressed("zoom_in"):
        animate_zoom(1.5) # Zoom in to 1.5x
    if event.is_action_pressed("zoom_out"):
        animate_zoom(1.0) # Return to default zoom
```

## 常见错误和最佳实践

| 类别 | 常见错误 | 最佳实践 |
| --- | --- | --- |
| 跟踪 | 在 `_process` 中跟踪物理对象会导致抖动 | 在 `_physics_process` 中执行物理对象操作。在 Godot 4 中，将 `Camera2D` 的 `Process Callback` 设置为 `Physics` 是最简单的方法 |
| 坐标系 | 混淆了 position和 global_position，导致相机移动到非预期位置 | 始终基于全局坐标(global_position)进行计算，以实现与父子关系无关的稳定行为 |
| 插值 | 直接将 `delta` 与 `lerp` 的 `weight` 参数相乘，从而产生与帧速率相关的运动 |
| 表现 | 持续渲染屏幕外物体，导致性能下降 | 使用 Camera2D的 limit属性限制相机移动范围 |

## 性能和替代方案

- **性能**: 本文介绍的技术对大多数 PC 游戏来说不会造成问题。但是，在移动游戏或包含大量对象的游戏中，逐帧 lerp和 pow运算可能会略微增加性能负担。
- **替代方案(屏幕抖动)**: 除了抖动 `offset` 之外，您还可以使用着色器来扭曲整个屏幕。这可以以更低的成本实现旋转和色差等复杂效果。

## 总结: 结合实际技巧

本文介绍的三种 Camera2D 技术各自独立运作，但将它们结合起来可以提供更丰富的游戏体验

| 技术 | 目的 | 主要实施 | 用例 |
| --- | --- | --- | --- |
| 平滑跟随 | 提升玩家追踪流畅度 | `lerp` 函数, `_physics_process` | 持续运动, 奔跑 |
| 屏幕摇晃 | 影响和事件反馈 | trauma 值, 随机 `offset` | 爆炸、受伤、强力攻击 |
| 动态缩放 | 场景方向、策略变化 | `Tween` 节点, `zoom`属性 | Boss 战开始，区域转换 |

掌握这些技巧，让你的 Godot 游戏栩栩如生。