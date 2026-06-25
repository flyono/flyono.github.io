---
title: 使用 Node3D 和 MeshInstance3D 学习 Godot 的 3D 空间基础知识
description: 学习 Node3D 和 MeshInstance3D 的基本概念，以便在 Godot 引擎中开始 3D 游戏开发，包括 3D 坐标系、Transform3D 和父子关系，并附有实际的代码示例。
created: 2026-06-24T11:32:00
---

## 引言: Node3D 和 MeshInstance3D 的重要性

在 Godot 引擎中进行 3D 游戏开发时，首先要理解的最重要的概念是 Node3D 和 MeshInstance3D 。它们定义了 3D 空间中所有对象的“位置”和“外观”——这才是 **3D 场景组件的真正基础**

`Node2D` 在 2D 游戏开发中扮演着核心角色，而 `Node3D` 在 3D 游戏开发中发挥着核心作用

## Godot 3D 空间基础知识

Godot 的 3D 空间是建立在坐标系和单位之上的，就像现实世界一样。

### 三维坐标系：Y 轴向上，右手坐标系

Godot 使用许多 3D 软件采用的右手坐标系。尤其重要的是， Y 轴表示上下方向—— **Y 轴向上**

| 轴 | 角色 | 正向方向 |
| --- | --- | --- |
| Y | 高度 (上/下) | 向上 |
| X | 宽度 (左/右) | 向右 |
| Z | 深度 (前/后) | 朝向观察者(-Z 表示向前) |

此外，在 Godot 的三维空间中， 1 个单位等于 1 米 。这作为考虑物体大小和移动距离的标准。

### `Transform3D`: 对象自身的“状态”。

3D 空间中的所有对象都有其空间状态（位置、旋转、缩放），这些状态由称为 `Transform3D` 的数据结构定义。

`Transform3D` 由两个主要元素组成:

1. **Basic(基准)**: 一个 3x3 矩阵，用于定义对象的旋转和缩放 。
2. **Origin(原点)**: 定义对象位置的 `Vector3`。

检查器中常见的 `position`、 `rotation` 和 `scale` 属性只是为方便人类直观地操作复杂的 Transform3D 而提供的便捷属性。

## `Node3D`: 空间“存在”的基础

`Node3D` 是 Godot 中所有 3D 节点的基类。它最重要的作用是保存 3D 空间中的 `Transform3D`（位置、旋转、缩放） 。

`Node3D` 本身没有可见的形态，也没有物理碰撞检测功能。它的存在纯粹是为了在空间中定义一个“点”或“坐标系”。

### Node3D 的主要作用

1. **对象放置**: 所有 3D 对象最终都继承自 Node3D，因此它们始终具有 Transform。
2. **分组和父子关系** ：这是 `Node3D` 最强大的功能。通过将一个空的 `Node3D` 作为父对象，并将多个节点分组作为子对象，您可以将它们视为一个整体。移动父对象会同时移动所有子对象。
3. **相对坐标参考点**: 子节点的 `transform` 始终相对于父节点的 `transform`。

## `MeshInstance3D`: 赋予物体“外观”

`MeshInstance3D` 继承自 `Node3D`，并增加了渲染视觉形状（网格）的功能 。

`Node3D` 决定 "它在哪里"，而 `MeshInstance3D` 决定 "它是什么以及它看起来是什么样子"。


| 节点 | 角色 |	主要属性 | 概念 |
| Node3D | 位置/姿势 | transform(位置、旋转、缩放) | 存在的“地点”和“方式” |
| MeshInstance3D | 外观/形状 | mesh, material_override | 存在的“是什么”以及“以何种方式”存在 |

要使 `MeshInstance3D` 在屏幕上渲染任何内容，您至少必须将 `Mesh资源`（例如 `BoxMesh`、 `SphereMesh` 或导入的 3D 模型）分配给 `mesh` 属性。

## 常见错误和最佳实践

| 常见错误 | 为什么这是问题 | 最佳实践 |
| --- | --- | --- |
| 直接移动 `MeshInstance3D` | 当与物理引擎结合时，只有外观会移动，而碰撞检测不会随之移动 | 使用 `CharacterBody3D` 或 `RigidBody3D` 作为根，并将 `MeshInstance3D` 作为子 |
| 通过 `position` 获取全局坐标 | `position` 是相对于父级的。在场景层级结构较深的情况下，会得到意想不到的坐标 | 需要全局坐标时，请始终使用 `global_transform.origin` |
| 按比例翻转物体 | 负缩放（例如， scale.x = -1）会导致物理和某些着色器出现意外行为 | 导入模型时请保持正确的方向，或者通过 rotation调整方向 |
| 分别放置多个 `MeshInstance3D` | 由于存在许多相同的网格，绘制调用次数会增加，性能会下降 | 考虑使用 MultiMeshInstance3D |

## 实际案例: 动态对象创建和层次结构

让我们用 GDScript 构建一个更实际的场景。主题是“一颗旋转的行星和一颗绕其运行的卫星”。

```gdscript
@tool
extends Node3D

@export var rotation_speed: float = 1.0
@export var orbit_speed: float = 2.0
@export var orbit_distance: float = 4.0

var planet: MeshInstance3D
var satellite: MeshInstance3D

func _ready():
    if not has_node("PlanetPivot"):
        _create_celestial_bodies()

    planet = $PlanetPivot/Planet
    satellite = $PlanetPivot/SatellitePivot/Satellite

func _process(delta):
    if not Engine.is_editor_hint():
        # Planet rotation (rotate around Y-axis at rotation_speed degrees per second)
        # 行星自转（以每秒rotation_speed度绕Y轴旋转）
        planet.rotate_y(deg_to_rad(rotation_speed * delta))

        # Satellite orbit (rotate the parent Pivot)
        # 卫星轨道（旋转父级轴心）
        var satellite_pivot = satellite.get_parent()
        satellite_pivot.rotate_y(deg_to_rad(orbit_speed * delta))

func _create_celestial_bodies():
    # 1. Node3D as planet's rotation axis (Pivot)
    # 1. 将 Node3D 作为行星的自转轴（旋转支点）
    var planet_pivot = Node3D.new()
    planet_pivot.name = "PlanetPivot"
    add_child(planet_pivot)

    # 2. Planet body (MeshInstance3D)
    # 2. 行星实体 (MeshInstance3D)
    planet = MeshInstance3D.new()
    planet.name = "Planet"
    planet.mesh = SphereMesh.new()
    planet.mesh.radius = 1.5
    planet.mesh.height = 3.0
    var planet_material = StandardMaterial3D.new()
    planet_material.albedo_color = Color.DODGER_BLUE
    planet.set_surface_override_material(0, planet_material)
    planet_pivot.add_child(planet)

    # 3. Node3D as satellite's orbit axis (Pivot)
    # 3. 将 Node3D 作为卫星轨道轴（旋转支点）
    var satellite_pivot = Node3D.new()
    satellite_pivot.name = "SatellitePivot"
    planet_pivot.add_child(satellite_pivot)

    # 4. Satellite body (MeshInstance3D)
    # 4. 卫星主体（MeshInstance3D）
    satellite = MeshInstance3D.new()
    satellite.name = "Satellite"
    satellite.mesh = SphereMesh.new()
    satellite.mesh.radius = 0.5
    satellite.mesh.height = 1.0
    var satellite_material = StandardMaterial3D.new()
    satellite_material.albedo_color = Color.LIGHT_GRAY
    satellite.set_surface_override_material(0, satellite_material)

    # Place satellite on orbit (position relative to parent)
    # 将卫星送入轨道（相对于主天体的位置）
    satellite.position = Vector3(orbit_distance, 0, 0)
    satellite_pivot.add_child(satellite)
```

### 重点

- **枢轴节点**: 与其直接旋转对象本身，不如旋转其父轴，这样可以独立控制旋转和轨道。
- **父子关系**: 由于 `satellite_pivot` 是 `planet_pivot` 的子节点，因此移动整个行星也会移动卫星。

## 性能考量

虽然 `Node3D` 和 `MeshInstance3D` 很方便，但根据使用情况，它们可能会成为性能瓶颈。

- **节点数量庞大**: 场景树中存在成千上万个 `Node3D` 会增加 CPU 负载。
- **绘制调用次数增加**: 随着具有不同材质的 `MeshInstance3D` 数量增加，成本也会增加。

### 替代方案

- `MultiMeshInstance3D`: 当放置大量具有相同网格和材质的对象时（例如，森林树木），效果最佳。
- `RenderingServer`: 要将性能发挥到极致，可以直接使用底层 API。

## 总结

本文解释了 Godot 3D 开发中最基本的元素 `Node3D` 和 `MeshInstance3D` 涵盖了它们的作用、关系和实际用途。

| 概念 | 要点 | 角色 |
| --- | --- | --- |
| 三维空间 | Y轴向上(右手), 1 单位 = 1 m | 对象存在的环境 |
| `Transform3D` | `basic`, `origin` | 定义物体在空间中的姿态 |
| `Node3D` | 父子关系， 核心 | 骨骼定义位置和姿势 |
| `MeshInstance3D` | `mesh`, `material` | 凸显肉体轮廓的外观 |

理解 Node3D 和 MeshInstance3D 这两个节点之间的角色分工是掌握 Godot 3D 场景构建的关键。使用 Node3D 构建骨架，使用 MeshInstance3D 添加血肉。牢记这一原则并将其应用到你的游戏开发中。
