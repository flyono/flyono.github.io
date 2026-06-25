---
title: 子视口技术——小地图、2D 中的 3D 和渲染纹理，增强 Godot 的表现力
description: 学习 Godot 引擎中的子视口。内容涵盖从迷你地图和 2D/3D 混合 UI 实现到动态渲染纹理和性能优化等实用技巧。
created: 2026-06-24T13:43:27
---

## 引言：利用`SubViewport`将游戏表现力提升到新水平

在使用 Godot 引擎进行开发时，您是否遇到过这些挑战？

- 想在屏幕角落放置一个小地图 ，以便向玩家清晰地显示大地图。
- 想在物品栏界面预览角色装备的 3D 模型物品 。
- 想要类似传送门或监控摄像头的效果，可以显示其他地点的实时画面 。

单靠单个游戏屏幕很难解决这些挑战。然而，掌握 Godot 强大的 `SubViewport` 节点就能让这一切成为可能。

`SubViewport`创建了一个独立于主屏幕的“虚拟屏幕”，允许您将其渲染结果自由地用作纹理。这极大地改善了用户界面、游戏逻辑和图形表现力。

## `SubViewport`核心概念：一个独立的渲染世界

理解 SubViewport的关键在于它“独立于主渲染管线”。放置在该节点下的场景拥有自己的世界、相机和渲染设置，并在完全独立的位置进行绘制。

`ViewportTexture`充当桥梁，将渲染结果引入主场景。通过将 `SubViewport` 的输出设置为此纹理，您可以将其应用于 `TextureRect`（用于 UI）、 `Sprite2D`，甚至是 3D 模型材质。

### 基本设置

1. **添加节点**: 向场景中添加一个 `SubViewportContainer`, 然后添加一个 `SubViewport` 作为其子节点。（使用 `SubViewportContainer` 可以更轻松地管理大小）
2. **创建内容** ：将要显示的场景（例如，2D/3D 节点、摄像机）构建为 `SubViewport` 的子对象。
3. **显示**: 将 `TextureRect` 放置在与 `SubViewportContainer` 相同的级别，将其 `Texture`属性设置为“New ViewportTexture”，并在检查器中指定 `SubViewport` 路径。


## 1. 实现功能丰富的迷你地图

小地图是 `SubViewport` 的一个典型应用场景。让我们来看看除了简单的玩家跟随功能之外的其他实现方式。

### 高级 GDScript: 显示多个目标和图标控制

实用的代码，不仅可以在小地图上显示玩家，还可以显示敌人和物品，并根据状态改变图标。

```gdscript
# minimap_controller.gd (Attached to SubViewport)
extends SubViewport

@onready var player: CharacterBody2D = get_tree().get_first_node_in_group("player")
@onready var minimap_camera: Camera2D = $MinimapCamera

# Minimap scale (conversion ratio from world coordinates to minimap coordinates)
# 小地图缩放比例（世界坐标转换为小地图坐标的换算比率）
@export var map_scale: float = 0.1

# Cache references to enemy icons (avoid per-frame node searches)
# 缓存敌方图标的引用（避免逐帧节点检索）
var enemy_icons: Dictionary = {}

# Cache textures with preload (avoid per-frame load())
# 通过预加载缓存纹理（避免逐帧执行加载函数load()）
const ICON_NORMAL = preload("res://assets/enemy_icon.png")
const ICON_ALERT = preload("res://assets/enemy_alert_icon.png")

func _process(delta: float) -> void:
    if not is_instance_valid(player):
        return

    # Make camera follow player
    # 使摄像机跟随玩家
    minimap_camera.global_position = player.global_position

    # Convert enemy positions to minimap coordinates and display
    # 将敌方坐标转换为小地图坐标并显示
    update_enemy_icons()

func update_enemy_icons() -> void:
    # Get existing enemies and update icons
    # 获取现有敌方单位并更新图标
    for enemy in get_tree().get_nodes_in_group("enemies"):
        if not is_instance_valid(enemy):
            continue

        # Create icon if none exists
        if not enemy_icons.has(enemy):
            var icon = TextureRect.new()
            icon.texture = ICON_NORMAL
            add_child(icon)
            enemy_icons[enemy] = icon

        var icon: TextureRect = enemy_icons[enemy]

        # Change icon based on state
        # 根据状态切换图标
        icon.texture = ICON_ALERT if enemy.is_in_alert_state() else ICON_NORMAL

        # Convert world coordinates to minimap local coordinates
        # 将世界坐标转换为小地图局部坐标
        # TextureRect uses position (not global_position)
        # 纹理矩形使用position（而非global_position）
        var relative_pos = enemy.global_position - minimap_camera.global_position
        icon.position = relative_pos * map_scale + size / 2
``` 

这段代码让 `SubViewport` 本身监控敌人位置，并在小地图上动态创建/更新图标。这样就将游戏主逻辑与小地图渲染逻辑分离了。

## 2. 2D 用户界面中的交互式 3D 预览

如果玩家能够在物品栏界面旋转和查看角色或物品的 3D 模型，他们的满意度会大大提高。这也是 `SubViewport` 的专长所在。

### 实施步骤和互动

1. 将 `SubViewportContainer` 和 `SubViewport` 放置在 UI 场景中。
2. 在 `SubViewport`中，放置 `Camera3D`、 `WorldEnvironment` (用于背景和环境光)、 `DirectionalLight3D` 以及要显示的 3D 模型 (`MeshInstance3D`等)。
3. 将脚本附加到 `SubViewportContainer` 以接收鼠标输入并旋转 3D 模型。

```gdscript
# 3d_preview_viewport.gd (Attached to SubViewportContainer)
extends SubViewportContainer

@onready var subviewport: SubViewport = $SubViewport
@onready var model: Node3D = $SubViewport/TargetModel # Model to rotate

var is_dragging = false

func _ready() -> void:
    # Set mouse_filter to receive mouse input
    # Explicitly set as default may not pass input
    # 将 mouse_filter 设置为接收鼠标输入
    # 显式设为默认值可能无法通过输入校验
    mouse_filter = Control.MOUSE_FILTER_STOP

func _gui_input(event: InputEvent) -> void:
    if event is InputEventMouseButton:
        if event.button_index == MOUSE_BUTTON_LEFT:
            is_dragging = event.is_pressed()

    if event is InputEventMouseMotion and is_dragging:
        # Rotate model on Y-axis based on mouse movement
        # 根据鼠标移动沿 Y 轴旋转模型
        model.rotate_y(deg_to_rad(-event.relative.x * 0.5))
```

由于 `SubViewportContainer` 可以接收 GUI 输入，因此这种 UI 协调非常容易。

## 3. 使用渲染纹理的高级视觉效果

`SubViewport`的真正价值在于将其输出作为纹理与着色器结合使用。这使得它能够实现超越静态 UI 显示之外的动态表达。

### 用例：搭载后期处理着色器的安防摄像头

对来自其他位置的摄像机拍摄的视频素材应用噪点和扫描线等效果，以营造“监控摄像头”的效果。

1. 在您想要监控的位置设置子 `SubViewport` 和 `Camera3D`。
2. 在主场景中，准备一个 `MeshInstance3D`（例如 `PlaneMesh`）作为监视器。
3. 使用以下着色器代码将 `ShaderMaterial` 应用于显示器网格。

```gdshader
// security_camera_shader.gdshader
shader_type spatial;

uniform sampler2D screen_texture;
uniform float noise_amount = 0.05;
uniform float scanline_intensity = 0.1;

void fragment() {
    vec2 uv = UV;
    // Scan lines
    float scanline = sin(uv.y * 800.0) * scanline_intensity;
    // Noise
    float noise = (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * noise_amount;

    vec4 color = texture(screen_texture, uv);
    ALBEDO = color.rgb - scanline - noise;
}
```

4. 使用 `GDScript` `SubViewport` 的 `ViewportTexture` 传递给着色器的 `screen_texture`参数。

```gdscript
# monitor_screen.gd (Attached to MeshInstance3D)
extends MeshInstance3D

@export var camera_viewport: SubViewport

func _ready() -> void:
    if not camera_viewport:
        return

    var material: ShaderMaterial = self.get_surface_override_material(0)
    if material:
        var texture = camera_viewport.get_texture()
        material.set_shader_parameter("screen_texture", texture)
```

## 性能、常见错误和最佳实践

`SubViewport` 功能强大，但未经规划的使用会导致性能下降。请参考下表了解高效的实现方式。

| 常见错误 | 最佳实践 |
| --- | --- |
| 始终将更新模式设置为 `Always` | **仅在需要时更新**。对于 UI 显示，请使用 `When Visible`; 对于手动更新, Disabled; 并避免在 `_process` 中进行逐帧更新 |
| 设置过高的分辨率 | **优化分辨率**。对于 3D 预览，请使用与显示尺寸相匹配的最小分辨率，例如 256x256 |
| 不考虑相机 `culling_mask` | **分离渲染图层**. 让小地图摄像机只渲染应该显示在小地图上的图层，从而避免不必要的计算 |
| 将所有内容都塞进一个 `SubViewport` | 按角色拆分 `SubViewport`。 例如，小地图、3D 预览等分别使用不同的子视口。这样可以简化管理，并允许进行个性化优化 |
| 不考虑其他方案 | 平衡成本和表现力。 考虑采用更轻量级的替代方案：静态预览使用静态图像，简单的迷你地图可以使用基于逻辑的 UI 绘图 |

尤其是在移动游戏开发中，使用 SubViewport务必谨慎。请始终记住，每个视口都会生成额外的绘制调用和渲染过程。

## 后续步骤及相关主题

掌握了 `SubViewport` 之后，你就可以学习更高级的表达式了:

- **动态贴花**: 通过 `SubViewport` 渲染弹孔或人物脚印，并投影到网格上。
- **流体模拟可视化**: 通过 `SubViewport` 将计算结果烘焙到纹理上，以创建交互式水面。
- **多通道渲染**: 使用不同的着色器或设置多次渲染同一场景，以合成轮廓绘制或特殊效果。

Godot 的官方文档和社区教程是了解这些主题的绝佳资源。

## 总结

本文从基础知识到实际应用，详细讲解了 `SubViewport`，并提供了具体的代码示例和优化技巧。 `SubViewport` 不仅仅是一个用户界面组件，它更是扩展 Godot 渲染管线、显著提升游戏表现力的关键所在。

| 用例 | 主要目的 | 性能关键 |
| --- | --- | --- |
| 功能丰富的迷你地图 | 提供游戏世界局势的鸟瞰图 | 优化 `Update Mode`，使用 `culling_mask` 限制渲染目标 |
| 交互式 3D 预览 | 在 2D 用户界面中以吸引人的方式展示 3D 模型 | 尽量降低 `SubViewport` 分辨率 |
| 渲染纹理 | 将实时拍摄的画面与着色器相结合，实现高级视觉效果 | 平衡着色器复杂度和视口更新频率 |

运用这些技巧，让你的 Godot 项目更加独特、更具吸引力。