---
title: 使用 NavigationAgent2D 进行寻路 - 敌方 AI 追击和巡逻
description: 学习如何使用 Godot 引擎的 NavigationAgent2D 实现敌方 AI 的追击和巡逻行为，同时避开障碍物，并提供实用的代码示例和性能优化技巧。
created: 2026-07-10T17:31:29
---

## 引言: 为什么游戏AI需要寻路

在游戏开发中，敌人和 NPC 的移动方式会显著影响玩家的游戏体验。当存在墙壁、障碍物和复杂地图时，AI 需要找到到达目的地的最佳路径 。这种“寻找最佳路径”的技术就是寻路算法 。

Godot Engine 提供了 `NavigationAgent2D` 节点，可以轻松高效地实现这种复杂的寻路处理。

## `NavigationAgent2D` 的工作原理和基本设置

Godot 的导航系统由三个主要部分组成：

| 元素 | 节点名称 | 角色 |
| --- | --- | --- |
| Navigation Map(导航地图) | NavigationServer2D | 后端服务器管理整个场景的可导航区域数据 |
| Navigable Area(可航行区域) | NavigationRegion2D | 定义人工智能可以在地图上移动的区域（导航网格） |
| Pathfinding Agent(寻路代理) |	NavigationAgent2D |	请求路径计算并控制父节点（AI 角色）移动 |
| Dynamic Obstacles(动态障碍物) | NavigationObstacle2D | 定义动态障碍物，例如移动的门或其他角色，供智能体避开 |

### 基本设置

要使`NavigationAgent2D`发挥作用，首先需要在地图上定义可导航区域

1. **放置 `NavigationRegion2D`**: 向场景树添加 `NavigationRegion2D`节点
2. **创建 `NavigationPolygon`**: 在 `NavigationRegion2D` 检查器中，创建一个新的 `NavigationPolygon` 资源，并对其进行编辑以覆盖地图的可导航部分
3. **准备 AI 角色**: 将 `NavigationAgent2D` 节点添加为敌方 AI 根节点（例如 CharacterBody2D）的子节点

## 案例: 敌方 AI 追击玩家

敌方 AI 追逐玩家是寻路算法最基本的应用场景。借助 `NavigationAgent2D`, 您可以轻松创建能够沿着最短路径行进并避开障碍物的 AI

```gdscript
# EnemyAI.gd (Attached to CharacterBody2D)
extends CharacterBody2D

@export var speed: float = 250.0

# Reference to player node (set from inspector)
# 引用玩家节点（在 检查器 中进行设置）
@export var player: Node2D

@onready var navigation_agent: NavigationAgent2D = $NavigationAgent2D

func _ready() -> void:
    # max_speed is a parameter for RVO (Reciprocal Velocity Obstacle) avoidance
    # max_speed是RVO(互斥速度障碍法)避障中的一个参数
    # Actual movement speed is controlled by the speed variable in velocity calculation
    # 实际移动速度由速度计算中的speed变量控制
    navigation_agent.max_speed = speed
    # Do nothing if player doesn't exist
    # 如果玩家不存在则不执行任何操作
    if not is_instance_valid(player):
        set_physics_process(false)

func _physics_process(delta: float) -> void:
    # Do nothing more if destination is reached
    # 到达目标位置后不再执行额外操作
    if navigation_agent.is_navigation_finished():
        velocity = Vector2.ZERO
        move_and_slide()
        return

    # Set player position as target
    # For performance, updating via Timer rather than every frame is preferable (see below)
    # 将玩家位置设置为目标
    # 出于性能考量，最好借助计时器进行更新，而非每帧都更新（详见下文）
    navigation_agent.target_position = player.global_position

    # Get the next point to move toward
    # 获取下一个要前往的目标点
    var next_path_position: Vector2 = navigation_agent.get_next_path_position()
    # Calculate direction to that point
    # 计算指向该点的方向
    var direction: Vector2 = global_position.direction_to(next_path_position)

    # Move along calculated direction
    # 沿着计算得出的方向移动
    velocity = direction * speed
    move_and_slide()
```

这段代码的核心在于它的简洁性：将 `navigation_agent.target_position`设置为玩家的坐标，然后使用 `move_and_slide()` 向 `navigation_agent.get_next_path_position()`返回的坐标移动。所有复杂的路径计算和避障逻辑​​都由 `NavigationAgent2D` 在内部处理。

## 案例: 守卫 AI 沿固定路线巡逻

使用 `NavigationAgent2D` 也可以轻松实现敌方 AI 循环巡逻多个地点的行为。用于判断到达点的 `is_navigation_finished()` 函数起着关键作用。

```gdscript
# PatrolAI.gd (Attached to CharacterBody2D)
extends CharacterBody2D

@export var speed: float = 150.0
# Array of patrol points
# 巡检点数组
@export var patrol_points: Array[Vector2] = [
    Vector2(100, 100), Vector2(800, 100), Vector2(800, 500), Vector2(100, 500)
]

@onready var navigation_agent: NavigationAgent2D = $NavigationAgent2D

var current_point_index: int = 0

func _ready() -> void:
    navigation_agent.max_speed = speed
    # Set first patrol point as target
    # 将第一个巡查点设为目标
    _set_next_patrol_point()

func _physics_process(delta: float) -> void:
    # is_navigation_finished() is a reliable way to determine target arrival
    # is_navigation_finished()是判断是否抵达目标位置的可靠方法
    if navigation_agent.is_navigation_finished():
        # Move to next point
        current_point_index = (current_point_index + 1) % patrol_points.size()
        _set_next_patrol_point()

    # Move toward next point, similar to pursuit logic
    # 朝着下一个点位移动，逻辑与追踪算法一致
    var next_path_position: Vector2 = navigation_agent.get_next_path_position()
    var direction: Vector2 = global_position.direction_to(next_path_position)

    velocity = direction * speed
    move_and_slide()

func _set_next_patrol_point() -> void:
    if patrol_points.is_empty():
        return
    navigation_agent.target_position = patrol_points[current_point_index]
```

## 常见错误和最佳实践

`NavigationAgent2D`功能强大，但误用会导致意外行为和性能下降。

| 常见错误 | 最佳实践 |
| --- | --- |
| 每帧更新 `target_position` | 使用 `Timer` 节点每 0.1–0.3 秒更新一次目标位置。或者加入逻辑，仅当与目标的距离超过阈值时才更新 |
| 仅使用 `is_navigation_finished()` 进行到达检测 | 此外，为了更可靠地检测目标，还可以使用 `navigation_agent.distance_to_target()` 来考虑在距离目标一定容差范围内到达的情况 |
| 直接设定 `velocity` | 使用 `velocity = velocity.lerp(direction * speed, weight)` 从当前速度平滑地插值到目标速度，以实现自然的加速/减速 |
| 手动创建复杂形状 | 使用 `TileMap` 节点的图层功能创建脚本，从特定图块自动生成导航网格 |

## 性能和替代方案

### 性能优化

- **路径重新计算频率**: 更新 `target_position` 可能成为最大的瓶颈。根据 AI 的重要性和数量合理设置更新频率。
- **动态障碍物(NavigationObstacle2D)**: 使用 `NavigationObstacle2D` 移动楼层或门很方便，但成本很高。应尽量减少使用
- **Agent数量**: 简化或暂停远程或屏幕外 AI 的处理(`set_physics_process(false)`)是一种有效的优化方法。

### 替代方案: 与 `AStar2D`比较

| 层面 | `NavigationAgent2D` | `AStar2D` |
| --- | --- | --- |
| 抽象层 | 高级(高度灵活) | 低级(高度灵活)
| 配置 | 只需烘焙 `NavigationRegion2D` | 必须手动定义点和连接 |
| 避障 | 自动(支持动态障碍物) | 必须自己执行 |
| 用例 | 角色空间移动 | 基于网格的游戏，回合制策略 |

对于角色在地图上实时移动的典型情况, `NavigationAgent2D`既方便又高效

## 总结

Godot Engine 的 `NavigationAgent2D` 是一个强大的工具，可以极大地简化 2D 游戏中 AI 的移动逻辑。

- 使用 **`NavigationRegion2D`** 定义可导航区域
- 在 **`NavigationAgent2D`** 上设置目标位置
- 将角色移动到通过 **`get_next_path_position()`** 获取的下一个点

通过这个简单的步骤，您可以立即为您的游戏添加实用、自然的 AI ，它可以智能地避开障碍物、追逐玩家或巡逻固定路线。