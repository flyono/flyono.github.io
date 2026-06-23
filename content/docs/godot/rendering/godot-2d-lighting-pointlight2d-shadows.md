---
title: Godot 2D 光照指南：使用 PointLight2D 和阴影进行深度表现
description: 学习如何使用 PointLight2D 和 LightOccluder2D 实现 2D 光照和阴影。内容涵盖从基本设置到常见问题解决方案以及性能优化。
created: 2026-06-23T16:44:00 
---

## 概述

在用 Godot 引擎制作的 2D 游戏中，光照的作用远不止装饰。精心配置的光影能够赋予场景深度和氛围，引导玩家的注意力，并增强游戏世界感。

本文重点介绍 `PointLight2D` 节点(Godot 2D 照明系统的核心)和阴影配置，解释实用的最佳实践，同时解决初学者常犯的错误。

## `2D Lighting` 的基本要素

Godot 的 2D 光照是通过协调三个主要节点来实现的。

| 物品 | 代表节点 | 角色 |
| --- | --- | --- |
| 光源 | `PointLight2D`, `DirectionalLight2D` | 向场景中发光的实体。决定光源类型，例如点光源或方向光源 |
| 遮蔽器 | `LightOccluder2D` | 定义阻挡光线并产生阴影的形状。独立于物理碰撞检测 |
| 主题 | Sprite2D、 TileMap等 | 所有继承自 CanvasItem节点。受光照影响——被照亮或隐藏在阴影中 |

### `PointLight2D` 的工作原理

`PointLight2D`是最基本的光源，它从一个点向各个方向辐射光线。可以在检查器属性中精细调整光源的形状和颜色。

- **Enable**: 启用/禁用此光源。
- **Texture**: 用于定义光线形状和衰减的纹理。通常使用径向渐变(GradientTexture2D)，中心为白色，向外逐渐过渡到黑色。
- **Color**: 灯光颜色. #FFFFFF（白色）为默认值。
- **Energy**: 光照强度。数值越高，亮度越高。
- **Shadow > Enabled**: 决定此光源是否生成阴影。仅在必要的光源上启用，因为它会影响性能。

> 提示: 将 `PointLight2D` 添加到场景后，在检查器中单击 `Texture` 属性的 [empty]，然后选择 `[New GradientTexture2D]`。接着单击显示的 `GradientTexture2D`，并将 `Fill` 更改为 `Radial` ——这就是创建基本光源纹理所需的全部步骤。

### 阴影边界：LightOccluder2D

阴影不会自动生成。你需要告诉 Godot “什么会阻挡光线”。这就是 `LightOccluder2D` 节点的作用。

将此节点添加为要投射阴影的对象（墙壁、柱子、角色等）的子节点。然后在 `Occluder` 属性中创建一个新的 `OccluderPolygon2D`资源，并通过从编辑器顶部工具栏添加顶点来绘制一个多边形来阻挡光线。

## 常见错误和最佳实践

2D 照明设置虽然直观，但也存在一些陷阱。

| 误区 | 问题 | 解决方案(最佳实践) |
| --- | --- | --- |
| 未使用 `lightOccluder2D` | 即使启用了 `PointLight2D` 的 `Shadow > Enabled`，也不会生成阴影，因为没有定义遮挡物 | 将 `LightOccluder2D` 添加到所有应该投射阴影的对象（或其父对象），并使用 `OccluderPolygon2D`精确定义遮挡范围 |
| 将 `CanvasModulate` 设置为黑色 | 整个场景陷入漆黑，只有被照亮的区域可见 | `CanvasModulate` 颜色通过正片叠底混合模式应用，并成为 `Light2D` 不存在区域的颜色。为了确保最小可见性，请设置略微明亮的灰色（例如 #202020）而不是完全黑暗 |
| `OccluderPolygon2D` 顶点过多 | 复杂的多边形会增加每帧阴影计算的成本，导致性能下降，尤其是在移动设备上 | 创建顶点数最少的多边形来表示遮挡物形状。尤其对于 `TileMap`，应在 `TileSet` 编辑器中设置遮挡，而不是单独设置图块，这样可以让引擎进行优化 |
| 启用所有灯光的阴影效果 | 即使对于装饰性小灯或性能无关紧要的灯，也会计算阴影，从而造成不必要的负载 | 仅对直接影响玩家游戏的重要光源（例如手电筒、主要路灯）启用阴影，并禁用辅助环境光源的 `Shadow > Enabled` |
| 未使用 `Light Mask` | 所有灯光都会影响所有物体，导致意外照明或错失优化机会 | 使用 `Range > Item Cull Mask`（光照面）和 `Visibility > Light Mask`（物体面）来分层光照 |

## 使用 GDScript 实现动态照明控制

使用 GDScript 动态控制灯光，可以让游戏更具互动性。

### 手电筒实现示例

一款能够跟随玩家移动并进行能量管理的闪光灯。

```gdscript
# Player.gd (Expects child node named "Flashlight" as PointLight2D)
# 玩家脚本Player.gd（需存在名为“Flashlight”的子节点，类型为二维点光源PointLight2D）
extends CharacterBody2D

@onready var flashlight: PointLight2D = $Flashlight

@export var max_light_energy: float = 1.0
@export var energy_drain_rate: float = 0.02 # Energy consumed per second 每秒消耗的能量

var current_energy: float

func _ready() -> void:
    current_energy = max_light_energy
    flashlight.enabled = false

func _unhandled_input(event: InputEvent) -> void:
    if event.is_action_pressed("toggle_light"):
        flashlight.enabled = not flashlight.enabled
        get_viewport().set_input_as_handled()

func _process(delta: float) -> void:
    if not flashlight.enabled:
        return

    # Gradually decrease energy
    # 逐步降低能耗
    current_energy -= energy_drain_rate * delta
    if current_energy <= 0.0:
        current_energy = 0.0
        flashlight.enabled = false

    # Change light intensity based on remaining energy
    # 根据剩余电量调节灯光亮度
    flashlight.energy = lerp(0.5, 1.5, current_energy / max_light_energy)

    # Point flashlight toward mouse cursor
    # Note: PointLight2D radiates light radially, so rotation doesn't change appearance.
    # For a cone-shaped flashlight effect, you need a cone-shaped gradient image as Texture.
    # 将手电筒光束对准鼠标光标
    # 注释：二维点光源沿径向发射光线，因此旋转不会改变视觉效果。
    # 如需实现锥形手电筒光照效果，你需要一张锥形渐变图像作为纹理贴图。
    var mouse_pos = get_global_mouse_position()
    flashlight.rotation = (mouse_pos - global_position).angle()

# Function to restore energy
# 恢复能量的功能
func restore_energy(amount: float) -> void:
    current_energy = min(current_energy + amount, max_light_energy)
    if not flashlight.enabled and current_energy > 0:
        flashlight.enabled = true
```

### 与 `DirectionalLight2D` 的比较

`PointLight2D` 是点光源，而 `DirectionalLight2D` 是平行光源，它像阳光或月光一样，从一个方向照射整个场景。

| 特征 | `PointLight2D` | `DirectionalLight2D` |
| 光的形状 | 从一点向外辐射 | 整个场景呈平行状落下 |
| 主要用途 | 火炬、灯泡、魔法灯——特定位置的光源 | 阳光、月光、户外环境光 |
| 影子行为 | 根据光源位置，阴影会向各个方向延申 | 阴影会根据光线角度沿一个方向延伸 |
| 表现 | 随着放置物品数量的增加，负载也会增加 | 通常每个场景一个或两个。比较轻便 |

> 使用技巧： 对于户外场景，首先使用 `DirectionalLight2D` 设置整体亮度和阴影方向，然后使用 `PointLight2D` 补充洞穴入口、篝火等

## 总结

理解 `PointLight2D` 和 `LightOccluder2D` 的组合是成功使用 Godot 2D 照明的关键。

- **PointLight2D**: 光源本身。通过纹理和能量调整光照外观。
- **LightOccluder2D**: 用于投射阴影的边界。生成阴影的必备节点。

掌握这些基本技巧，你的 2D 游戏就能摆脱单调乏味，蜕变为光影交错、层次丰富的世界。建议的进阶学习包括使用法线贴图来表现更逼真的光照效果，以及使用自定义着色器来扩展光照效果。