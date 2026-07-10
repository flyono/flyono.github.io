---
title: 使用 Godot 的 AudioBus 效果器（混响、压缩器、均衡器）进行声音设计
description: 对 AudioBus 应用混响、压缩、均衡、合唱和其他效果，为您的游戏打造沉浸式音频环境。
created: 2026-06-30T09:15:00
---

## 概述

给音频总线添加效果会将这些效果同时应用于流经该总线的所有声音。通过组合不同的效果，您可以创建所需的任何音频环境——洞穴混响、水下闷音、广播风格的处理等等。

本文涵盖了 `AudioBus` 布局设计、配置混响、压缩器和均衡器等关键效果以及通过 GDScript 进行动态控制。

## 音频总线布局设计

在应用效果之前，我们先来整理一下总线。如果跳过这一步，就会出现一些问题，比如你只想在背景音乐中使用混响，结果混响却渗入了用户界面声音。

Godot 的音频系统允许您按用途组织多个总线，从而实现批量效果应用和后续的音量调整。

### 推荐的总线结构

```
Master (Master output)
├── BGM     ... Music 音乐
├── SFX     ... Sound effects 音效
├── Voice   ... Voice / dialogue 语音/对话
└── Ambient ... Environmental sounds 环境音
```

### 创建 总线(Bus)

1. 打开编辑器底部的 "Audio \ 音频" 选项卡
2. 点击 `Add Bus \ 添加总线`
3. 设置总线名称 (例如 `SFX`)
4. 设置发送到 `Master`（默认）
5. 保存为 audio_bus_layout.tres

### `AudioServer` API 基础知识

总线布局设置完成后，您可能还希望通过代码对其进行控制——例如，在选项菜单中添加音量滑块。`AudioServer` API 允许您以编程方式访问音量、静音等功能。

```gdscript
# Get the bus index
# 获取 总线 索引
var sfx_idx = AudioServer.get_bus_index("SFX")

# Set volume (in decibels)
# 设置 音量 (以分贝为单位)
AudioServer.set_bus_volume_db(sfx_idx, -6.0)

# Toggle mute
# 切换静音
AudioServer.set_bus_mute(sfx_idx, true)

# Solo playback (for debugging)
# 单独播放（用于调试）
AudioServer.set_bus_solo(sfx_idx, true)
```

### 将音频源分配给总线

如果声音实际上没有通过总线布局进行路由，那么总线布局就毫无用处。请在 `AudioStreamPlayer` (包括 2D/3D 版本) 上设置 `bus` 属性，以将其输出定向到相应的总线。

```gdscript
# Assign buses from script
# 通过脚本分配总线
$AudioStreamPlayer.bus = "SFX"
$BGMPlayer.bus = "BGM"
$FootstepPlayer.bus = "SFX"
```

您也可以在检查器中设置`Bus`属性。如果未指定，音频默认使用 `Master` 总线。

## 关键效果和设置

总线布局完成后，就可以开始添加效果了。Godot 提供了多种效果器来打造音频环境。这里我们将介绍混响、压缩器和均衡器——这三种效果器你最常用。

### 音频效果混响

从洞穴的回声到大教堂的宏伟共鸣，混响是传达空间大小和特性的首选效果。

| 属性 | 描述 | 推荐范围 |
| --- | --- | --- |
| `room_size` | 房间大小 | 0.2(小房间) - 0.9(大教堂) |
| `damping` | 高频衰减 | 0.3 - 0.8 |
| `wet` | 效果混合比 | 0.1 - 0.5 |
| `dey` | 干信号混合比 | 0.5 - 1.0 |
| `spread` | 立体宽度 | 0.5 - 1.0 |

### 音频效果压缩器

你有没有注意到，爆炸声震耳欲聋，而脚步声却几乎听不见？压缩器可以平衡这些音量差异。它可用于标准化音效音量或提升主输出总线上的整体响度。

| 属性 | 描述 | 推荐范围 |
| --- | --- | --- |
| `threshold` | 压缩开始时的体积 | -20 - -10 (分贝) |
| `ratio` | 压缩比 | 2:1 - 4:1 |
| `attack_us` | 压缩开始前的时间 | 5000 - 20000 us |
| `release_ms` | 压缩释放前的时间 | 100 - 300 ms |
| `gain` | 输出增益 | 0 - 6 分贝 |

### 音频效果均衡器

均衡器可按频段调节音量，让您拥有广泛的创作控制权——增强低音以增强冲击力，削减高音以模拟水下音频等等。可选6段、10段或21段版本。

```gdscript
# EQ10 band layout
# balloons
# 0: 31Hz, 1: 62Hz, 2: 125Hz, 3: 250Hz, 4: 500Hz
# 5: 1kHz, 6: 2kHz, 7: 4kHz, 8: 8kHz, 9: 16kHz

# Boost the bass
# 增强低音
var eq = AudioEffectEQ10.new()
eq.set_band_gain_db(0, 6.0)   # 31Hz +6dB
eq.set_band_gain_db(1, 4.0)   # 62Hz +4dB
eq.set_band_gain_db(2, 2.0)   # 125Hz +2dB
```

###  其他影响

| 影响 | 用例 | 主要特性 |
| --- | --- | --- |
| AudioEffectDelay(音频效果延迟) | 回声/混响尾音 | `tap1_delay_ms`, `tap1_level_db`, `feedback_level_db` |
| AudioEffectChorus(音频效果合唱) | 增加声音的厚度 | `voice_count`, `voice_rate_hz`, `voice_depth_ms` |
| AudioEffectLimiter(音频效果限制器) | 防止剪断	| `ceiling_db`, `threshold_db` |
| AudioEffectDistortion(音频效果失真) | 失真/无线电效果	| `mode`, `drive`, `pre_gain` |

## 推荐的效果链

既然您已经了解了各个效果器，那么下一个问题是：它们的顺序应该是什么？总线内的效果器是从上到下处理的 ，错误的顺序可能会产生意想不到的结果。以下是一些针对常见用例的成熟配置。

### 推荐的主总线设置

```
Master Bus
├── 1. AudioEffectEQ10      ... Overall frequency balance 整体频率均衡
├── 2. AudioEffectCompressor ... Volume normalization 音量标准化
└── 3. AudioEffectLimiter    ... Clipping prevention (ceiling: -0.5dB) 防削波（上限：-0.5分贝）
```

### 推荐的环境总线设置

```
Ambient Bus
├── 1. AudioEffectReverb     ... Add spatial reverberation
└── 2. AudioEffectChorus     ... Add natural width
```

> 提示: 添加过多特效会增加 CPU 负载。请尽量减少必要的特效数量。

## 使用 GDScript 进行动态控制

静态编辑器配置只是开始。你还可以在游戏过程中即时更改效果——例如，进入洞穴时添加混响，潜水时降低高频。让我们看看如何通过脚本实现这些功能。

### 动态添加效果

在这个例子中，当玩家进入洞穴区域时，我们会向 SFX 总线添加混响；当玩家离开洞穴区域时，我们会移除混响。

```gdscript
# Add reverb to the SFX bus
# 给音效总线添加混响效果
func enter_cave():
    var sfx_idx = AudioServer.get_bus_index("SFX")
    var reverb = AudioEffectReverb.new()
    reverb.room_size = 0.8
    reverb.wet = 0.3
    reverb.damping = 0.5
    AudioServer.add_bus_effect(sfx_idx, reverb)

# Remove the reverb (search by type for safe removal)
# 消除混响（按类型检索以安全清除）
func exit_cave():
    var sfx_idx = AudioServer.get_bus_index("SFX")
    remove_effect_by_type(sfx_idx, AudioEffectReverb)

# Find and remove an effect by type from a bus
# 根据总线类型查找并移除效果
func remove_effect_by_type(bus_idx: int, effect_type) -> void:
    for i in range(AudioServer.get_bus_effect_count(bus_idx) - 1, -1, -1):
        if AudioServer.get_bus_effect(bus_idx, i) is effect_type:
            AudioServer.remove_bus_effect(bus_idx, i)
            return
```

通过索引移除效果（例如， `remove_bus_effect(idx, count - 1)`）并不安全——如果之后添加了其他效果，你可能会移除错误的效果。像上面那样按类型搜索要安全得多。

### 实时效果参数变化

除了添加和移除特效之外，你还可以平滑地调整特效参数的动画效果。结合 Tween 动画，你可以创建自然的音频过渡，例如随着玩家深入洞穴，混响逐渐增强。

```gdscript
# Smoothly transition the reverb wet value with a Tween
# 使用 Tween 动画平滑切换混响湿声值
func transition_reverb(target_wet: float, duration: float = 1.0):
    var sfx_idx = AudioServer.get_bus_index("SFX")
    var reverb = find_effect_by_type(sfx_idx, AudioEffectReverb)
    if reverb:
        var tween = create_tween()
        tween.tween_property(reverb, "wet", target_wet, duration)

# Find an effect by type on a bus
# 根据类型在总线上查找效果
func find_effect_by_type(bus_idx: int, effect_type) -> AudioEffect:
    for i in range(AudioServer.get_bus_effect_count(bus_idx)):
        var effect = AudioServer.get_bus_effect(bus_idx, i)
        if effect is effect_type:
            return effect
    return null
```

### 总线音量逐渐减弱

对整段音频总线做渐弱处理是另一项你会频繁用到的技巧——可用于场景切换时背景音乐淡出，或是暂停界面上静音音效。

```gdscript
# Fade bus volume in/out
# 总线音量淡入/淡出
func fade_bus(bus_name: String, target_db: float, duration: float = 0.5):
    var idx = AudioServer.get_bus_index(bus_name)
    if idx == -1:
        return
    var current_db = AudioServer.get_bus_volume_db(idx)
    var tween = create_tween()
    tween.tween_method(
        func(db): AudioServer.set_bus_volume_db(idx, db),
        current_db, target_db, duration
    )
```

## 按用例设置效果

最后，这里提供了一个按场景分类的常用特效配置参考表。当您想知道“哪些特效适合这个场景？”时，可以以此为起点，并在此基础上进行微调。

| 场景 | 使用的效果	| 配置提示 |
| --- | --- | --- |
| 洞穴/地下 | Reverb 混响 | `room_size: 0.8`, `wet: 0.3`, `damping: 0.4` |
| 水下 | EQ + Reverb  均衡器 + 混响 | 削减高频（4kHz 以上，衰减 12dB），增加混响 |
| 户外/场地 | Reverb (light)  混响（轻） | `room_size: 0.3`, `wet: 0.1` |
| 无线电/通讯器 | Distortion + EQ  失真 + 均衡 | `mode: OVERDRIVE`, 仅保留中频 |
| 首领战 | Compressor  压缩机 | 提升主总线上的响度 |
| 菜单屏幕 | EQ + Limiter  均衡器 + 限幅器 | 降低背景音乐音量，突出用户界面音效 |

## 总结

- 向音频总线添加效果会将这些效果同时应用于通过该总线的所有声音。
- 混响用于营造空间氛围， 压缩器用于音量标准化， 均衡器用于频率平衡。
- 推荐的处理顺序为： 均衡器 - 压缩器 - 混响 - 限制器
- 使用 AudioServer.add_bus_effect()可以动态地为每个场景添加/移除效果并切换音频环境。
- 添加 效果 会影响 CPU 负载，因此请尽量减少 效果 的使用。

## 扩展文档

[Godot Docs - Audio buses](https://docs.godotengine.org/en/stable/tutorials/audio/audio_buses.html)
[Godot Docs - AudioEffectReverb](https://docs.godotengine.org/en/stable/classes/class_audioeffectreverb.html)
[Godot Docs - AudioEffectCompressor](https://docs.godotengine.org/en/stable/classes/class_audioeffectcompressor.html)