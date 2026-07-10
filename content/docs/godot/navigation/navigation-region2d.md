---
title: 基于 NavigationRegion2D 和 Navigation Meshs 的智能避障
description: 了解 Godot 引擎中的 NavigationRegion2D 和导航网格的工作原理，以及如何构建 AI 可以平滑地绕过障碍物的系统——从烘焙设置到 RVO 避免。
created: 2026-07-10T17:53:49
---

## 概述

在游戏开发中，“智能 AI 移动”(即 NPC 在避开障碍物的同时到达目的地)能够极大地提升玩家体验。在 Godot 引擎中, `NavigationRegion2D` 节点和导航网格负责处理寻路和避障功能。

本文解释了这些节点的作用，以及如何使用它们来创建角色能够平滑地绕过障碍物的系统，并提供了具体的代码示例。

## 为什么需要`Navigation Meshes`

`Navigation Meshes(导航网格)`对于角色移动是必要的，因为传统的基于物理的移动方式不会让角色知道障碍物的存在，直到它们与障碍物发生碰撞。

- 基于物理的运动(碰撞检测): 角色只有在实际与障碍物发生碰撞时才会识别障碍物 （例如 StaticBody2D）。这就像“走到死路再去找另一条路”——效率低下且不自然。
- 导航网格（基于路径）: 可导航区域预先定义为多边形网格。人工智能参考此地图并计算出避开障碍物而不发生碰撞的最佳路径。

`NavigationRegion2D`管理这个“AI 地图”并将其放置在场景空间中。

## 使用 `NavigationRegion2D` 生成（烘焙）导航网格

生成导航网格的过程称为“烘焙”。在 Godot 中，可以根据场景中放置的碰撞检测节点的形状自动计算可导航区域。

### 场景准备

首先，使用具有 `CollisionShape2D` 或 `CollisionPolygon2D` 的节点（例如 `TileMap` 或 `StaticBody2D` 构建舞台。这些节点将成为导航网格的“障碍物”。

### `NavigationRegion2D` 设置

向场景中添加 `NavigationRegion2D` 节点，并在检查器中配置以下关键属性:

| 属性 | 描述 | 推荐值提示 |
| --- | --- | --- |
| `navigation_polygon` | `NavigationPolygon`资源，用于保存导航网格数据 | 使用`New NavigationPolygon`创建新的导航多边形 |
| `enabled` | 如果为 true，则在导航服务器上启用此区域 | 默认值为 true |
| source_geometry_mode` | 如何获取用于网格生成的几何体 | 对于 `TileMap`, 请使用 `SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN` 并将 `TileMap` 添加到`navigation`组 |

`NavigationPolygon`资源需要设置的重要属性:

| 属性 | 描述 | 推荐值提示 |
| --- | --- | --- |
| `agent_radius` | 移动代理的半径。生成的路径会与墙壁和障碍物保持安全距离 | 设置为略大于角色的碰撞半径 |

### 烘烤网格

配置完成后，选择 `NavigationRegion2D` 节点，然后单击编辑器顶部工具栏中的`Bake NavigationMesh`按钮。成功后，场景视图中会出现一个蓝色的半透明多边形。这是 AI 可以移动的区域。

## 使用 `NavigationAgent2D` 的实用移动脚本

导航网格制作完成后，设置可以在网格上移动的角色，`NavigationAgent2D`在此处起到核心作用。

将 `NavigationAgent2D` 添加为要移动的角色（例如 `CharacterBody2D`）的子节点。该代理与导航服务器通信，计算路径并避免与其他代理发生碰撞。

### 扩展移动脚本

以下脚本将一个角色移动到鼠标点击的位置。

```gdscript
# Script attached to CharacterBody2D
extends CharacterBody2D

@export var speed: float = 200.0

@onready var navigation_agent: NavigationAgent2D = $NavigationAgent2D

func _ready() -> void:
    # Set agent properties
    # 设置智能代理属性
    navigation_agent.path_desired_distance = 4.0
    navigation_agent.target_desired_distance = 4.0

func _physics_process(delta: float) -> void:
    if navigation_agent.is_navigation_finished():
        return

    # Get current target position
    # 获取当前目标位置
    var current_agent_target: Vector2 = navigation_agent.get_next_path_position()

    # Calculate movement direction
    # 计算运动方向
    var new_velocity: Vector2 = (current_agent_target - global_position).normalized() * speed

    # Apply RVO (Reciprocal Velocity Obstacles) collision avoidance
    # 应用 RVO(相互速度障碍)碰撞避让。
    # Calling set_velocity() returns safe velocity via velocity_computed signal
    # 调用 set_velocity() 函数后会通过 velocity_computed 信号返回安全速度
    navigation_agent.set_velocity(new_velocity)

func _input(event: InputEvent) -> void:
    if event.is_action_pressed("click"):
        # Set mouse click position as target
        # 将鼠标点击位置设为目标点
        navigation_agent.target_position = get_global_mouse_position()

func _on_navigation_agent_2d_velocity_computed(safe_velocity: Vector2) -> void:
    # Only call move_and_slide() in signal handler
    # (avoid double calling with _physics_process)
    # 仅在信号处理函数中调用 move_and_slide()
    # 防止在_physics_process里重复调用
    velocity = safe_velocity
    move_and_slide()
```

### 路径寻找与RVO避障

`NavigationAgent2D` 主要承担两个角色：

1. **寻路**: 通过 `get_next_path_position()` 提供下一个移动点，使角色能够避开静态障碍物。
2. **RVO 避障**: 利用 `velocity_computed` 信号，根据 RVO（倒数速度障碍） 调整速度矢量，以避免与其他移动的智能体发生碰撞。

## 处理动态障碍物

为了避免在游戏过程中动态出现的障碍物（例如玩家放置的物体），请向这些障碍物添加 `NavigationObstacle2D` 节点。

`NavigationObstacle2D` 会在自身周围设置临时的“避障区域”，而无需重新渲染网格。这会导致其他使用 `NavigationAgent2D` 的智能体调整其行为以避开这些动态障碍物。

## 常见错误和最佳实践

| 常见错误 | 最佳实践 |
| --- | --- |
| 在 `_physics_process`中每帧设置 `target_position` | `target_position`仅在目标位置改变时（例如，鼠标点击时）设置一次。每帧都设置会导致重复路径计算，从而降低性能。|
| 直接将 `global_position` 设置为 `get_next_path_position()` 结果 | `get_next_path_position()`只是“下一个路径点”。角色应该从当前位置向该路径点移动 |
| RVO 避免功能失效（字符重叠） | 使用 `NavigationAgent2D` 的 `velocity_computed` 信号，并将计算出的 `safe_velocity`设置为 `CharacterBody2D` 的 `velocity`，以获得可靠的结果 |
| 动态障碍物未被避开 | 检查是否启用 `NavigationObstacle2D`，以及障碍物碰撞层和代理碰撞掩码是否配置正确 |

## 总结

NavigationRegion2D和导航网格是 Godot 引擎中实现智能 AI 运动的基本元素。

| 元素 | 角色 | 避免 |
| --- | --- | --- |
| NavigationRegion2D | 定义并维护可导航区域（导航网格） | 静态墙体和地形 |
| NavigationAgent2D | 执行路径规划并调整移动 | 其他移动代理, `NavigationObstacle2D` |

通过理解和利用这个系统，你游戏中的 NPC 可以理解地图结构，与其他角色协调，并巧妙地到达目的地。