---
title: Godot 音频管理基础：掌握 AudioStreamPlayer 和音频总线
description: 学习如何使用 AudioStreamPlayer 和 Audio Bus。背景音乐/音效管理和音量控制的最佳实践。
create: 2026-07-06T11:05:56
---

## 概述

在游戏开发中，声音是影响玩家体验的关键要素。在 Godot 引擎中处理背景音乐和音效时，您可能会遇到诸如“声音突然中断”或“音量调节繁琐”之类的问题。

本文解释了 Godot 音频管理核心 AudioStreamPlayer和 Audio Bus 的基本原理，以及使用单例的实用管理方法。

## Godot 音频系统的三个关键要素

| 物品 | 角色 | 类比 |
| --- | --- | --- |
| AudioStream | 音频数据本身 | CD 或 MP3 文件 |
| AudioStreamPlayer| 播放声音的节点 | CD 唱机 |
| Audio Bus(音频总线) | 音频信号的汇集和控制通路 | 混音台 |


### `AudioStreamPlayer` 类型

| 节点名称 | 主要用途 | 特征 |
| --- | --- | --- |
| AudioStreamPlayer | 背景音乐、用户界面音效等 | 没有位置信息，总是从中心方听到声音 |
| AudioStreamPlayer2D | 2D 游戏音效 | 音量和摇摄变化取决于与摄像机的距离和方向 |
| AudioStreamPlayer3D | 3D 游戏音效	| 支持三维空间中的距离衰减和多普勒效应 |

### `Audio Bus`(音频总线)

音频总线是播放声音的“通道”，其功能类似于混音台。

- 主总线 ：所有声音最终都经过的输出总线。
- 自定义总线 ：按类别创建，例如背景音乐、音效、语音

主要职责: 

1. 批量音量控制: 调整每个总线的整体背景音乐或音效音量
2. 效果应用: 均匀应用混响或压缩器

## 常见错误和最佳实践

| 常见错误 | 最佳实践 |
| --- | --- |
| **重复使用单个节点进行音效播放** 声音中断 | **根据音效播放动态创建节点** 信号 finished后，使用 queue_free()函数销毁队列。或者，可以使用 max_polyphony属性允许在同一节点上进行重叠播放 |
| **在不分离总线的情况下调整各个节点的音量** 代码变得混乱 | **按声音类型拆分音频总线** 使用“BGM”、“SFX”、“Voice”总线进行管理 |
| **硬编码总线索引** | **按`bus name`名称获取索引** `AudioServer.get_bus_index("BGM")` |

### 正确播放音效 (SFX) 的方法

```gdscript
# Best practice: Dynamically create nodes and destroy after playback
# 最佳实践：动态创建节点并在播放完成后销毁
func play_sfx(sfx_stream: AudioStream):
    var player = AudioStreamPlayer.new()
    player.stream = sfx_stream
    player.bus = "SFX"
    add_child(player)
    player.play()
    player.finished.connect(func(): player.queue_free())

# Usage
var attack_sfx = preload("res://assets/sfx/attack.ogg")
play_sfx(attack_sfx)

```

> 对于 2D/3D 游戏： 如果您需要位置音频，请使用 `AudioStreamPlayer2D` 或 `AudioStreamPlayer3D` 并设置 `global_position`。

## 实践：使用单例进行音频管理

创建一个管理所有游戏音频的 `AudioManager` 单例，可以轻松地从任何场景控制声音。

项目设置:

1. 转到 `Project` → `Project Settings` → `AutoLoad` 选项卡
2. 添加 `AudioManager.gd`

```gdscript
# AudioManager.gd
extends Node

const BGM_BUS_NAME = "BGM"
const SFX_BUS_NAME = "SFX"

@onready var bgm_bus_index = AudioServer.get_bus_index(BGM_BUS_NAME)
@onready var sfx_bus_index = AudioServer.get_bus_index(SFX_BUS_NAME)

var bgm_player: AudioStreamPlayer

func _ready():
    if bgm_bus_index == -1:
        push_error("Audio Bus '%s' not found." % BGM_BUS_NAME)
    if sfx_bus_index == -1:
        push_error("Audio Bus '%s' not found." % SFX_BUS_NAME)

# Play BGM (with fade-in)
# 播放 BGM (淡入)
func play_bgm(stream: AudioStream, fade_in_duration: float = 0.5):
    if not bgm_player:
        bgm_player = AudioStreamPlayer.new()
        bgm_player.bus = BGM_BUS_NAME
        add_child(bgm_player)

    bgm_player.stream = stream
    bgm_player.volume_db = -80.0
    bgm_player.play()

    var tween = create_tween()
    tween.tween_property(bgm_player, "volume_db", 0.0, fade_in_duration)

# Play sound effect
# 播放音效
func play_sfx(stream: AudioStream, position: Vector2 = Vector2.ZERO):
    var player: Node
    if position == Vector2.ZERO:
        player = AudioStreamPlayer.new()
    else:
        player = AudioStreamPlayer2D.new()
        player.global_position = position

    player.stream = stream
    player.bus = SFX_BUS_NAME
    add_child(player)
    player.play()
    player.finished.connect(func(): player.queue_free())

# Set BGM volume (0.0 - 1.0)
# 设置 BGM 音量
func set_bgm_volume(linear_volume: float):
    if bgm_bus_index == -1:
        return
    AudioServer.set_bus_volume_db(bgm_bus_index, linear_to_db(clampf(linear_volume, 0.0, 1.0)))

# Set SFX volume (0.0 - 1.0)
# 设置 SFX 音量
func set_sfx_volume(linear_volume: float):
    if sfx_bus_index == -1:
        return
    AudioServer.set_bus_volume_db(sfx_bus_index, linear_to_db(clampf(linear_volume, 0.0, 1.0)))
```

使用示例:

```gdscript
# player.gd
const JUMP_SOUND = preload("res://assets/sfx/jump.ogg")

func _process(delta):
    if Input.is_action_just_pressed("jump"):
        AudioManager.play_sfx(JUMP_SOUND, global_position)
```

## 性能和替代方案

当多个音效同时播放时，可以执行以下操作：

| 方法 | 优点 | 缺点 | 最适合 |
| --- | --- | --- | --- |
| 动态实例化 | 简单实现 | 创建多个节点时的成本 | 大多数游戏 |
| 对象池 | 性能稳定 | 复杂实施 | 每秒有数十到数百个音效的游戏 |

首先采用**动态实例化**，只有当性能分析表明实例化是瓶颈时才考虑使用**对象池**。

## 将效果应用于音频总线

给总线添加效果会将这些效果统一应用于通过该总线的所有声音。

1. 打开编辑器底部的 `音频` 选项卡。
2. 选择要添加特效的总线（例如， SFX）。
3. 从“添加效果”中选择 `AudioEffectReverb`
4. 调整 `Room Size`、 `Wet`等。

这样可以轻松营造出类似洞穴或教堂的混响效果。

## 总结

| 概念 | 角色 | 最佳实践 |
| --- | --- | --- |
| AudioStreamPlayer | 播放声音的节点 | 动态创建音效，静态放置于场景中作为背景音乐 |
| Audio Bus | 混音台 | 背景音乐/音效/语音使用独立的总线 |
| Singleton | 集中管理 | 通过 AudioManager 控制一切 |

后续步骤: 

1. 保存音频总线布局 ：另存为 `audio_bus_layout.tres`
2. 背景音乐循环设置 ：在 `.ogg` 文件导入设置中启用 `循环` 选项
3. 深入探究 `AudioStreamPlayer2D/3D`: 空间声音衰减和声像定位
4. 高级效果链: `均衡器` → `压缩器` → `限制器`