---
title: 使用 Tween 制作流畅动画
description: 了解如何使用 create_tween()轻松实现基于时间的 UI 效果、视觉效果和移动平台的值变化，并提供实用的代码示例。
created: 2026-06-11T17:43:00
---
## 概述

在游戏中，物体平滑移动的感觉要比即时传送更自然、更令人愉悦。从屏幕外滑入的用户界面元素、受损时闪烁的角色、逐渐减少的 HP 值--这些 "基于时间的数值变化 "都可以使用 Godot 的 **Tween** 功能轻松实现。

在 Godot 4 中，您可以通过调用 `create_tween()`方法轻松创建基于代码的动画。

## Tween 基础知识：从一行开始

Tween 的基本概念很简单：**"在指定的持续时间内将对象的特定属性更改为目标值"**

```gdscript
func _ready():
    # 1. 创建一个补间动画对象
    var tween = create_tween()

    # 2. 播放动画
    # 在1秒内将$Sprite2D的位置属性修改为二维向量(500, 300)
    tween.tween_property($Sprite2D, "position", Vector2(500, 300), 1.0)
```

使用 `create_tween()`创建的 Tween 会自动终止，并在所有队列动画完成后从内存中释放。这种 "触发即忘 "的便利性是 Tween 的最大优势之一。

>注意：当使用 `queue_free()`删除创建 Tween 的节点时，Tween 会自动停止并释放。如果需要在节点生命周期结束后继续播放动画，可考虑使用 `create_tween().set_ignore_time_scale(false).bind_node(another_node)`将 Tween 绑定到另一个节点，或在自动加载（单例）中管理 Tween。

## 实用代码食谱

### 配方 1：用户界面幻灯片动画（带缓和功能）

用户界面元素从屏幕外平滑滑入的效果。使用 `set_trans()`和 `set_ease()`可实现专业的动态效果。

```gdscript
func show_menu():
    var menu_panel = $MenuPanel
    menu_panel.visible = true

    var viewport_width = get_viewport_rect().size.x
    menu_panel.position.x = viewport_width

    var tween = create_tween()
    # TRANS_SINE: 正弦曲线插值
    # EASE_OUT: 动画结尾处减速
    tween.tween_property(menu_panel, "position:x", viewport_width - menu_panel.size.x, 0.5)\
         .set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
```

`set_trans`指定插值方法，而 `set_ease`则指定在过渡期间应用缓和的位置。

### 配方 2：平滑的 HP 条变化

让 HP 条逐渐变化而不是即时反映伤害或治疗效果，有助于玩家直观地了解情况。

```gdscript
@onready var hp_bar: ProgressBar = $ProgressBar

func update_health_smoothly(new_health: float):
    var tween = create_tween()
    tween.tween_property(hp_bar, "value", new_health, 0.4)\
         .set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN_OUT)

func _on_player_took_damage(damage_amount: float):
    var current_health = hp_bar.value
    update_health_smoothly(current_health - damage_amount)
```

### 配方 3：伤害闪烁效果

Tween 的另一个优势是，当角色受到伤害时，可以通过闪烁效果直观地显示无敌帧。

```gdscript
func start_invincibility_flicker():
    # 设置循环实现5次闪烁效果
    var tween = create_tween().set_loops(5)

    # 修改 modulate 属性的透明度（不透明度）数值
    tween.tween_property(self, "modulate:a", 0.3, 0.1)
    tween.tween_property(self, "modulate:a", 1.0, 0.1)
```

## 全面控制动画的高级技术

### 顺序和并行

- **Sequence:** 连续写入 `tween_property`调用会按顺序执行。
- **Parallel:** 在调用之间插入 `parallel()`可使后续动画与前一个动画同时启动。

```gdscript
func complex_animation():
    var tween = create_tween()
    var sprite = $Sprite2D

    # 1. 首先，向右移动，持续1秒
    tween.tween_property(sprite, "position:x", 500.0, 1.0)

    # 2. 接下来向下移动，同时旋转45度
    tween.parallel().tween_property(sprite, "position:y", 300.0, 0.5)
    tween.parallel().tween_property(sprite, "rotation_degrees", 45.0, 0.5)

    # 3. 等待0.5秒
    tween.tween_interval(0.5)

    # 4. 最后，在0.3秒内渐隐
    tween.tween_property(sprite, "modulate:a", 0.0, 0.3)
```

### 与 `await`异步集成

当您想在动画完成后执行特定操作时，GDScript 的 `await`功能非常有用。

```gdscript
func play_and_destroy():
    var tween = create_tween()
    tween.tween_property(self, "scale", Vector2.ZERO, 0.5)

    # 在此行代码处等待，直至补间动画发出完成信号
    await tween.finished

    # 动画完成后执行
    queue_free()
```

## 常见错误和最佳做法

| 常见错误                                    | 最佳实践                                                    |
| :-------------------------------------- | :------------------------------------------------------ |
| 在 `_process()`内的每一帧调用 `create_tween()`。 | 只有在启动动画时才调用 `create_tween()`。如果要连续跟随，可考虑使用 `lerp`或其他方法。 |
| 启动新的 Tweens，而不停止现有的 Tweens，造成运动冲突。      | 在开始新动画之前，用 `kill()`停止现有的 Tweens（见下面的代码示例）。              |
| 将许多进程连接到 `tween.finished`信号，增加了复杂性。     | 使用 `await tween.finished`并将流程写成异步函数，代码流程会更简洁、更线性。       |
| 尝试使用 Tween 实现所有动画。                      | 涉及多个节点和轨道的复杂场景更适合 `AnimationPlayer`。                    |

### 使用 `kill()`防止过渡冲突

```gdscript
var current_tween: Tween

func animate_to(target_position: Vector2):
    # 如果正在运行则停止当前补间动画
    if current_tween and current_tween.is_valid():
        current_tween.kill()

    # 创建新补间动画
    current_tween = create_tween()
    current_tween.tween_property(self, "position", target_position, 0.5)
```

## 在动画播放器和动画播放器之间做出选择

| 比较       | Tween (`create_tween`)   | AnimationPlayer      |
| :------- | :----------------------- | :------------------- |
| **最适合**  | 基于代码的动态动画、用户界面效果、简单的数值变化 | 预设复杂序列、场景和角色动画       |
| **设置**   | 简单（只需代码）                 | 更复杂（需要在编辑器中设置关键帧）    |
| **灵活性**  | 高（可根据运行时值自由生成动画）         | 较低（主要播放预定义动画）        |
| **视觉编辑** | 不可能                      | 出色（可在时间轴中进行可视化编辑和预览） |

## 总结

Godot 4 的 `Tween`功能是一款出色的工具，可以轻松而强大地实现基于代码的动画效果。

- **用户界面效果**
- **视觉效果（闪烁、淡出等）**
- **创建移动平台和机械装置**

利用 `Tween`来处理这些元素，可以显著提高游戏质量。