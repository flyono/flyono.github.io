---
title: TileMapLayer 入门 - Tilemap 基础、碰撞和多图层
description: 介绍如何使用 Godot 4.3+ 中的 TileMapLayer 构建 2D 地图。涵盖 TileMapLayer 与 TileSet 的关系、通过物理层为瓦片添加碰撞、将地面和装饰分散到多个层、以及使用 set_cell 从脚本放置瓦片，所有内容均有图示说明。
created: 2026-08-07T15:08:17
---

> 2D 游戏中的地面、墙壁、洞穴和城市景观：一次放置一个精灵来布置所有这些内容是令人痛苦的。这就是瓦片地图的作用。它们允许你通过在网格上平铺小的艺术作品来高效地构建大型地图。

从 Godot 4.3 版本开始，这个中心节点是 `TileMapLayer`。本文将介绍基础知识：`TileMapLayer` 和 `TileSet` 之间的关系，如何为瓦片添加碰撞，如何将地面和装饰分散到多个层，以及如何从脚本中放置瓦片。

## `TileMapLayer` 和 `TileSet`：地图与调色板

一个瓦片地图由两部分组成：一个 TileSet 和一个 TileMapLayer。它们的作用分工明确，让我们从这里开始

- TileSet (调色板): 一个定义哪些瓦片存在的资源。它将瓦片图像沿网格切割，并将每个单元格注册为可用的瓦片。
- TileMapLayer (地图):  一个负责瓦片放置的节点。你从调色板中选择一个瓦片，并将其绘制到网格上。

工作流程很简单。在场景中添加一个 `TileMapLayer` 节点，从检查器的"Tile Set"创建一个新的 TileSet，并注册你的瓦片图像。然后，使用编辑器底部的 `TleMap` 板选择瓦片并绘制地图。

> 注意: 在 Godot 4.3 以上版本中, 旧的 `TileMap` 节点被 `TileMapLayer` 替换并已弃用。创建节点时请选择 `TileMapLayer` .由于一个 TileSet 可以被多个 TileMapLayers 共享，你可以保留一个绘制框，并创建任意数量的地图。

## 为瓦片添加碰撞

玩家沿着地板行走并在墙壁处停止。这种碰撞由各个瓦片承担。设置它只需要"给 `TileSet` 添加一个物理层，然后在每个瓦片上绘制一个碰撞形状。"

1. 在 `TileSet` 编辑器中添加一个 "物理层"
2. 选择每个瓦片并在其上绘制碰撞多边形(碰撞形状)

这就是让碰撞自动出现在每个瓦片放置位置所需的一切。即使有数百个地板瓦片，你也不需要逐个配置碰撞。在瓦片上绘制一次，然后只需绘制即可。现在玩家(一个 CharacterBody2D)可以站在该碰撞上并行走(参见在 2D 物理体之间进行选择)

## 将工作分配到多个 `TileMapLayers`

你可以使用单个 TileMapLayer 来构建地图，但按角色划分节点可以大大简化管理。在 Godot 4.3 及以上版本中, 一个 `TileMapLayer` 就是一个层，因此地面和装饰分别放在不同的节点中。

```plaintext
Level (Node2D)
├── Background (TileMapLayer)   # background (sky, distant scenery)
├── Ground (TileMapLayer)       # ground and walls (with collision)
└── Decoration (TileMapLayer)   # grass and props (drawn on top of the ground)
```

- 绘制顺序 (堆叠): 树中位置较低的节点会先绘制。要在地面之上叠加草，将 `Decoration` 放在 `Ground` 下面。
- 角色分离: 你可以只给 `Ground` 添加碰撞，而让 `Decoration`(草、标志)保持无碰撞。诀窍在于不要将“你与之发生碰撞的地面”和“纯粹用于视觉装饰”混为一谈。

> 物理层和 TileMapLayer 是不同的概念。"物理层"是 TileSet 设置中赋予瓦片碰撞的属性，而"TileMapLayer（节点）"是承载地图一张图层的节点。虽然名称相似，但前者描述瓦片属性，后者描述地图堆叠。

## 实践：从脚本放置瓦片

在编辑器中，瓦片不仅可以通过手动绘制来创建。你也可以通过代码动态地放置它们。程序生成的 `roguelike` 地下城、沙盒中的地形破坏、模拟中的地形生成: 任何地图由规则构建的类型。

关键调用是 `set_cell()`。你指定"将这个 `TileSet` 瓦片放在这个坐标上".  `source_id` 和 `atlas_coords` 参数是指明哪个瓦片图像，以及它在其中的列和行。

```gdscript
extends TileMapLayer

func _ready() -> void:
    # Place the tile at atlas coords (2, 0) from source_id=0 at coordinate (3, 5)
    # 将 source_id=0 中图集坐标为(2, 0)的图块放置到坐标(3, 5)处
    set_cell(Vector2i(3, 5), 0, Vector2i(2, 0))

    # Lay down a 10x10 floor in one go
    # 一次性放置一个10x10的地板
    for x in 10:
        for y in 10:
            set_cell(Vector2i(x, y), 0, Vector2i(1, 1))

    # Erase the tile at coordinate (3, 5)
    # 擦除坐标(3, 5)的图块
    erase_cell(Vector2i(3, 5))
```

有两个要点需要记住:

- **`set_cell`不接受层参数**: 使用 `TileMapLayer` 时，一个节点就是一个层，所以你写 `set_cell(coords, source_id, atlas_coords)`。这与旧版 TileMap的 `set_cell(layer, ...)`不同，因此要注意来自较旧文章的代码。要移除瓦片，使用 `erase_cell(coords)`。
- **生成算法仅决定"哪个坐标变成什么"**: 使用随机游走、元胞自动机或其他任何方法来决定哪些坐标是地板，然后用 `set_cell` 铺设它们。当你还想自动边缘瓦片时，来自地形(自动瓦片)的 `set_cells_terrain_connect()` 是下一步。

## 小贴士：以后需要知道的事情

- **让引擎选择边缘瓦片**: 手动选择每块草到土的边界瓦片很繁琐。使用地形（自动瓦片），你只需绘制地形，引擎就会为你放置边界瓦片。当这里的基础知识掌握牢固后，下一步就去那里。
- **让敌人行走于你的地图**: 你可以从瓦片地图构建一个寻路网格。`NavigationRegion2D` 和 `Navigation Meshes` 是入口。
- **使用相机滚动大型地图**: 屏幕以外的地图通过 Camera2D 跟随和滚动显示。

## 总结

- `TileSet` 是“哪些瓦片存在”的调色板, `TileMapLayer` 是“它们去哪里”的地图。一个 TileSet 可以被多个层共享。
- 从 Godot 4.3 版本开始，请使用 `TileMapLayer`(旧版的 `TileMap`已弃用)
- 碰撞是通过 TileSet 的物理层逐瓦片处理的。绘制瓦片时，碰撞会随之而来
- 将地面和装饰分为单独的 `TileMapLayers`; 树中位置较低的节点会绘制在前方
- `set_cell(coords, source_id, atlas_coords)` 从脚本中放置瓦片（无需层参数）

首先为你的地面瓦片添加一个物理层，并让玩家在上面行走。TileMaps 是 2D 游戏舞台构建的基础。
