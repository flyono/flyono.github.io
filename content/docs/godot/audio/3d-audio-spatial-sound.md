---
title: Godot 中的 3D 音频和空间音效（AudioStreamPlayer3D 完整指南）
description: 使用 AudioStreamPlayer3D 和 AudioListener3D 实现 3D 空间音频。内容涵盖衰减模型、多普勒效应和基于区域的混响。
created: 2026-06-25T10:12:00
---

## 概述

在 3D 游戏中，空间音频是提升玩家沉浸感的关键要素。脚步声从背后靠近，远处爆炸声渐渐融入背景——这些基于距离和方向的声音变化在 Godot 中使用 `AudioStreamPlayer3D` 可以轻松实现。

本文涵盖了您需要了解的所有内容：从 `AudioStreamPlayer3D` 的基本设置和衰减模型选择到 `AudioListener3D` 的使用、多普勒效应的实现以及基于区域的混响区域。

## AudioStreamPlayer3D 基础知识

实现 3D 空间音频的第一步是了解 `AudioStreamPlayer3D` 节点。我们先来看看这个节点的功能。

`AudioStreamPlayer3D` 是一个音频播放节点，具有 3D 空间中的位置信息。音量和声像会根据与听者的距离和方向（通常是 Camera3D）自动改变。

### 主要特性

我们先来了解一下核心属性。这些设置控制着声音传播的距离以及声音随距离衰减的程度。

| 属性 | 描述 | 默认 |
| --- | --- | --- |
| `max_distance` | 声音可听见的最大距离 | 0（无限制） |
| `unit_size` | 体积减半时的距离 |	10.0 |
| `attenuation_model` | 体积如何随距离减小 | `InverseDistance` |
| `max_polyphony` | 最大同时播放次数 | 1 |
| `panning_strength` | 立体声平移强度 | 1.0 |
| `emission_angle_enabled` | 启用定向音效 | false |
| `emission_angle_degrees` | 声发射角度范围 | 45.0 |

### 基本设置

以下是为敌方角色添加脚步声的示例，展示了典型的设置工作流程。

```gdscript
# Scene tree example
# 场景树示例
# Enemy (CharacterBody3D)
#   └── FootstepSound (AudioStreamPlayer3D)

# Configure enemy footsteps
# 配置敌人脚步声
@onready var footstep = $FootstepSound

func _ready():
    footstep.stream = preload("res://audio/sfx/footstep.ogg")
    footstep.max_distance = 30.0   # Audible up to 30m away 最远30米内可听见声响
    footstep.unit_size = 5.0       # Volume halves at 5m 5米处流量减半
    footstep.bus = "SFX"

func play_footstep():
    if not footstep.playing:
        footstep.play()
```

###  定向声

想想监控摄像头警报或公共广播扬声器——有时你希望声音只朝特定方向传播。设置 `emission_angle_enabled = true` 并配置 `emission_angle_degrees` 以指定角度范围。使用 emission_angle_filter_attenuation_db` 来指定声音在该范围之外的衰减程度。

## 选择衰减模型

现在您已经了解了 AudioStreamPlayer3D 的基础知识，接下来我们来选择一个衰减模型，它定义了声音随距离变化的“感觉”。您可以选择音量随距离衰减的方式。最佳模型取决于您更注重真实的物理效果还是游戏体验。

| Model | 衰减行为 | 最佳实践 |
| --- | --- | --- | 
| `Inverse Distance(反距离)` | 与距离呈反比 | | 大型户外场地 |
| `Inverse Square Distance(平方反距离)` | 与距离的平方呈反比(符合实际情况) | 总体写实类游戏 |
| `Logarithmic(对数)` | 对数衰减(更接近人耳听觉) | 室内近距离互动 |
| `Disabled(已禁用)` | 无基于距离的衰减 | 环境音效，背景音频 |

### 配置

以下代码设置衰减模型和距离参数。请查看注释以获取不同场景比例的指导，并根据您的游戏进行调整。

```
# 设置衰减模型
footstep.attenuation_model = AudioStreamPlayer3D.ATTENUATION_INVERSE_SQUARE_DISTANCE

# 单元尺寸与最大距离使用规范
# 小房间: unit_size=2.0, max_distance=10.0
# 中等室内款: unit_size=5.0, max_distance=25.0
# 户外场地: unit_size=10.0, max_distance=50.0
```

> 提示: `unit_size` 是音量减半的距离。值越大，声音传播得越远；值越小，声音只能在近处听到。

## 使用 AudioListener3D

配置好音源后，下一个问题是: "玩家听到的声音来自哪里？" 在第三人称游戏中，由于镜头会保持一定距离旋转，以镜头位置为中心的声音可能会感觉不自然。

默认情况下， `current = trueCamera3D` 会充当监听器。如果需要将摄像机与监听器分开，请使用 `AudioListener3D`

### 何时使用 `Camera3D` 与 `AudioListener3D`

| 场景 | 监听者 | 用例 |
| --- | --- | --- |
| 标准游戏 | Camera3D（默认） | 摄像头位置 = 监听位置即可 |
| TPS（第三人称） | AudioListener3D	| 即使镜头拉远，也要保持音频靠近播放器 |
| 过场动画 | AudioListener3D | 在镜头移动时保持玩家位置音频与头部追踪同步 |
| VR | AudioListener3D | 与头部追踪同步 |

### 实现示例

只需将 `AudioListener3D` 作为玩家节点的子节点放置并激活它。这样，无论摄像机位于何处，音频都将基于玩家的位置。

```gdscript
# Add AudioListener3D as a child of Player (CharacterBody3D)
# 将3D音频监听器节点作为玩家（三维角色实体）的子节点添加
@onready var listener = $AudioListener3D

func _ready():
    listener.make_current()  # 启用此监听器 
```

## 多普勒效应

现在我们来深入了解一种更高级的音频技术。启用多普勒效应可以改变移动声源的音调——这非常适合赛车游戏中车辆呼啸而过，或者任何有快速移动物体的场景。这能立即提升游戏的真实感，玩家会立刻感受到。

### 设置步骤

```gdscript
# 1. Enable Doppler tracking on AudioStreamPlayer3D
# 1. 在3D音频播放器上启用多普勒追踪功能
$AudioStreamPlayer3D.doppler_tracking = AudioStreamPlayer3D.DOPPLER_TRACKING_PHYSICS_STEP

# 追踪模式选项
# DOPPLER_TRACKING_DISABLED    ... 已禁用（默认设置）
# DOPPLER_TRACKING_IDLE_STEP   ... 与_process()同步
# DOPPLER_TRACKING_PHYSICS_STEP ... 与_physics_process()同步（推荐使用）
```

在项目设置的 `音频 和 常规` 下启用**多普勒跟踪** ，并调整默认多普勒因子以控制效果强度（默认值：1.0）。

> 提示: 使用 `PHYSICS_STEP` 可与物理引擎同步，即使对于快速移动的物体也能提供稳定的多普勒效应。

## 混响区

设置好声源和监听器后，我们更进一步，添加空间声学效果。想象一下，在角色扮演游戏中走进一个洞穴，立刻就能听到深沉的回声 ——`Area3D` 通过仅在玩家进入特定区域时才应用混响，让这一切成为可能。

### 设置

使用 `Area3D` 上的 `CollisionShape3D` 设置混响范围，并在 `Reverb Bus` 属性中指定专用总线。以下代码通过脚本配置洞穴混响区域。

```gdscript
func setup_reverb_zone():
    var area = $ReverbZone as Area3D
    area.audio_bus_override = true
    area.audio_bus_name = &"CaveReverb"
    area.reverb_bus_enabled = true
    area.reverb_bus_name = &"CaveReverb"
    area.reverb_bus_amount = 0.6
    area.reverb_bus_uniformity = 0.8
```

在 `CaveReverb` 总线上添加一个 AudioEffectReverb 效果器（ room_size: 0.85， damping: 0.3， wet: 0.4）。当玩家进入 Area3D 区域时，该区域内的音频输出会自动路由到此总线。

## 动态控制与性能

至此，您的核心 3D 音频设置已完成。最后，我们来看看一些滤波技术，这些技术可以使音频听起来更自然，以及您在实际项目中需要用到的性能策略。

### 基于距离的滤波器控制

远处的声音在穿过空气和障碍物时会损失高频成分，听起来会变得沉闷。使用`低通滤波器`可以模拟这种效果，使距离感更加逼真。将以下脚本附加到 `AudioStreamPlayer3D` 上。

```gdscript
extends AudioStreamPlayer3D

@export var listener_node: Node3D
@export var far_distance: float = 30.0

func _process(_delta):
    if not listener_node:
        return
    var distance = global_position.distance_to(listener_node.global_position)
    var ratio = clampf(distance / far_distance, 0.0, 1.0)

    # Muffle distant sounds
    # 隔绝远处的声响
    attenuation_filter_cutoff_hz = lerpf(20500.0, 2000.0, ratio)
    attenuation_filter_db = lerpf(0.0, -10.0, ratio)
```

### 性能优化

在拥有众多音源的开放世界场景中，CPU 负载很快就会成为问题。请使用以下优化技巧：

| 技巧 | 描述 |
| --- | --- |
| 设置 `max_distance` | 避免使用 0（无限制）；限制在所需范围内 |
| 限制 `max_polyphony` | 同时播放数量保持在 1-4 台之间 |
| 管理活动节点数 | 同时音频节点数量应控制在 20-30 个或更少 |
| LOD 式管理 | 停止远处的音频源, `playing = false` |

该脚本会根据声音源与听者的距离自动停止声音源，从而减少对屏幕外音频的浪费处理。

```gdscript
# 自动关闭远距离音频源以降低中央处理器负载
func _process(_delta):
    var camera = get_viewport().get_camera_3d()
    if not camera:
        return
    var distance = global_position.distance_to(camera.global_position)
    if distance > max_distance * 1.2 and playing:
        stop()
    elif distance <= max_distance and not playing:
        play()
```

## 总结

- **AudioStreamPlayer3D** 会根据与听众的距离和方向自动调节音量和声像定位。
- 根据场景的比例选择合适的**衰减模型** ，并适当设置 `unit_size` 和 `max_distance`
- `AudioListener3D` 可以将摄像机和听者的位置分开，这对于第三人称射击游戏和过场动画非常有用。
- 当 `PHYSICS_STEP` 跟踪与物理引擎同步时， 多普勒效应最为稳定。
- `Area3D` **混响区域**允许您为每个空间区域创建不同的音频环境
- 为了提升性能， 设置 `max_distance` 和 `limiting simultaneous playback`至关重要。