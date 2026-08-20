---
title: 使用地形功能设置自动瓦片
description: Godot 4 的地形（自动瓦片）功能的逐步指南，包含编辑器截图，从创建 TileMapLayer 节点开始，通过理解对齐位，绘制地图，以及使用 GDScript 进行程序化生成。
created: 2026-08-07T15:24:08
---

当你构建一个 2D 地图时，手动选择每一处接缝远比听起来要繁琐得多：草地和泥土之间的边界、悬崖的角落、道路的曲线。而且每次你重绘地图的一小部分时，都必须重新处理所有周围的边界瓦片。

Godot 4 的 `Terrains`(自动瓦片)功能让这项工作消失了。你大致地画出“这里画草地，那里画泥土”，引擎就会自动选择并放置适合边界的瓦片。本文将按顺序逐步介绍，跟随实际的编辑界面: 创建 `TileMapLayer` 节点、理解 Peering Bits（Terrains 的核心）、绘制地图，最后从 GDScript 中生成一个程序化地图。

## 自动瓦片化自动化的内容

**自动瓦片化**解决的是选择边界瓦片这一单调的工作。

手工构建地图意味着你需要为每个位置自己选择合适的瓦片: 在田野中间选择"草地中心"瓦片, 在接缝处选择"左边草地，右边泥土"的瓦片，在角落处选择专门的角落瓦片等等。重绘地图时，你也需要重做所有周围的边界瓦片。

设置地形，引擎会帮你处理判断。你只需要绘制地形: "这个区域是草地，这个区域是泥土。"引擎会查看相邻单元格如何组合，并自动放置合适的角落、边缘和中心瓦片。

RPG 世界地图、roguelike 地下城、可破坏的沙盒地形: 你的地图形状变化越频繁，这种自动化带来的好处就越大。

## 设置：准备 `TileMapLayer` 和 `TileSet`

首先，构建你将绘制地图的基础。

### 1. 创建一个 TileMapLayer 节点

将一个 `TileMapLayer` 节点添加到你的场景中。在节点创建对话框中搜索 "tilemap" 会出现两个条目, TileMap和 TileMapLayer。

需要选择的是 **TileMapLayer**。旧版 TileMap节点在 Godot 4.3 中已被弃用，在上面的图片中可以看到它的警告图标。当前的设计将一层视为一个 `TileMapLayer` 节点，因此地面、装饰和碰撞各自存在于自己的 TileMapLayer中。

### 2. 创建一个新的 TileSet

在检查器中，选择 `TileMapLayer` 并从"Tile Set"属性中选择"New TileSet"。这将创建一个 TileSet 资源，该资源定义了瓦片的外观以及它们如何碰撞。

### 3. 将您的瓦片集图像添加到图集

点击你刚刚创建的 `TileSet`, TileSet 编辑器会出现在屏幕底部。在"TileSet"选项卡中，使用左下角的"+"按钮创建一个 atlas，然后将你的 tileSet 图像拖放到里面。在"Setup"模式下，将 Tile Size 设置为与图像中的网格匹配（本例中为 16x16 px）。

现在你可以开始绘制地图了。从这里开始，我们将进入真正的主题：配置地形。

## 地形的核心: 理解对齐位

在深入设置之前，让我们先理解 **Peering Bits** 的概念，因为它们是 `Terrains` 的核心。一旦理解了这一点，下面每个设置步骤的意义就变得显而易见了

**Peering Bits** (观察位)是您为每个瓦片所教授的连接规则: "哪些地形必须围绕我，这个瓦片才能被使用？"您在 3x3 网格上为每个瓦片指定它们。

- 中心单元格: 这个瓦片本身是哪种地形（例如草地）。
- 周围的八个单元格: 哪些地形是它的正交和斜向邻居。

例如，一个标有"中心是草地，右侧和下方是泥土"的瓦片，会告诉引擎它属于一片草地右下角的位置。当你绘制地图时，引擎会检查每个单元格的周围环境，并自动选择与 `Peering Bits` 匹配的瓦片。

换句话说，配置地形不过是教引擎，一块砖接一块砖地，哪个砖块用于哪个邻域。

### 选择模式

地形集的模式决定了窥探位细致程度。

| 模式 | 它检查什么 | 最合适的瓦片集 |
| --- | --- | --- |
| Match Corners and Sides (匹配角落和边缘) | 两侧和角落(8 个方向) | 带有平滑边框且包含角落模式的瓦片集 |
| Match Corners (匹配角落) | 仅角落 | 围绕角落构建的瓦片集 |
| Match Sides (匹配边缘) | 仅边缘(4 个方向) | 不需要角落连接的简单图集 |

Match Corners and Sides是最灵活的。它可以表达复杂的边界，但需要更多的位数来绘制。从这种模式开始是一个好的默认选择。

## 配置地形集 (Terrain Set) 和 观察位 (Peering Bits)

### 4. 创建一个地形集和一个地形

在 `TileMapLayer` 检查器中，展开 `TileSet` 并在 "地形集" 下添加一个元素。选择一个模式(Match Corners and Sides)，然后在 "地形" 下添加一个地形，并设置其名称和标识颜色。在这个示例中，我们创建了一个名为 "森林地形" 的地形，并使用醒目的颜色。

> 颜色是你将在下一步中涂抹到瓦片上的 "笔刷颜色". 它不会影响地面的外观, 所有任何与其他地形容易区分的颜色都可以作为 "笔刷颜色".

### 5. 在绘画模式下, 为每个瓷砖的 "Peering Bits" 部分进行着色

将 `TileSet` 编辑器切换到 "绘画" 模式，然后从 "绘画属性" 下拉菜单中选择“地形”。

选择你想要绘制的地形，然后开始用相应的颜色来绘制各个方块。在这里，你需要绘制每个方块的中心单元格，以及它们应该连接的方向。这就是我们刚才提到的“Peering Bits”的逐块对齐方式。

当你将 "Peering Bits" 图案绘制到整个 TileSet 上时，那些与地形相关的瓷砖就会以高亮颜色显示出来，如下图所示。这样，"TileSet" 的设置就完成了。

## 使用地形刷绘制地图

现在是时候绘制地图了。在场景中选中 TileMapLayer这个对象后，屏幕底部的地图面板中会会出现一个“地形”选项卡。

打开“地形”选项卡，选择你创建的地形（森林地形），然后将其拖动到地图上的任意位置。中心区域、边界区域、角区——引擎会根据“视距单位”规则自动为这些区域分配相应的地形块。原本需要逐个处理地形块的边界区域，现在在拖动时就能平滑地连接在一起了。

## 常见的错误和最佳实践

| 常见的错误 | 最佳实践 |
| --- | --- |
| 让“观察位”保持原样，不进行着色处理 | 覆盖所有的边界图案吧。那些“地面与空白空间”结合的边界图案，是最容易被遗忘的。 |
| 使用旧的 `TileMap` 节点 | 从 Godot 4.3 版本开始，可以使用 TileMapLayer。按照角色进行分类管理节点，会使管理变得更加简单 |
| 一个巨大的地图集 | 按角色分类分割地图块。将“地面”、“装饰”和“碰撞”这些部分分开处理，可以让编辑和替换变得更加简单 |
| 试图将每一个布局过程自动化 | 将自动分块功能与手动放置操作结合起来使用。可以使用“地形”工具来绘制基础地形，然后手动放置一些特殊的、一次性使用的地形块 |

那些缺失的 Peering Bits 会显示为“那里有一个奇怪的方块”或“边界上存在一个缺口”。当各个部分无法正确连接时，解决问题的关键就是判断那个方块上的 Peering Bits 是否符合你的预期配置。

## 性能优化

`TileMapLayer` 非常高效，但在那些包含数万个图块的巨大地图中，绘制成本就变得不可忽视了。

- 分层管理: 将地面、建筑物和装饰元素分别放在不同的 TileMapLayer节点中，并根据更新频率和作用进行整理。这样，就可以只操作或隐藏所需的层，而整个场景依然保持清晰可辨。
- 停止绘制屏幕外的内容: `VisibleOnScreenEnabler2D` 在其目标移动出屏幕时会自动禁用处理. 并由 VisibleOnScreenEnabler2D/ VisibleOnScreenNotifier2D替代。
- 分块加载: 在开放世界规模的游戏中, 只加载和释放玩家所在区域的数据, 可以将地图划分为固定大小的区块, 在玩家靠近时生成这些区块, 在玩家离开时释放他们.

## 动手实践：从 GDScript 生成地下城

"Terrains' 不仅可以在编辑器中手动绘制出来。只要通过 GDScript 脚本调用它，就可以在运行时生成地图。每次运行都会变化的 RPG 式地牢、复杂的沙盒地形、模拟生成的景观——在任何那种需要根据规则来构建地图的游戏中，这种技术都能发挥出巨大的作用。

关键的调用时 `set_cells_terrain_connect`. 你只提供一个桌标, 然后说 "将这些单元格设置为地形x", 他就会自动处理边界的连接问题.

```gdscript
extends TileMapLayer

const TERRAIN_SET := 0
const FLOOR_TERRAIN := 0     # index of the terrain created in step 4

func _ready() -> void:
    generate_dungeon()

func generate_dungeon() -> void:
    var floor_cells: Array[Vector2i] = []
    # Dig corridors with a random walk and collect the cells that become floor
    var pos := Vector2i.ZERO
    for i in 200:
        floor_cells.append(pos)
        pos += [Vector2i.UP, Vector2i.DOWN, Vector2i.LEFT, Vector2i.RIGHT].pick_random()

    # Turn the collected cells into terrain at once; the engine connects the borders
    set_cells_terrain_connect(floor_cells, TERRAIN_SET, FLOOR_TERRAIN)

```

有两个要点要记住:

1. 放置过程其实很简单, 就是 "手机坐标然后将其传递出去". 你无需考虑某个单元格是角落、边缘还是中心。将你希望作为地面的单元格数组传递给 set_cells_terrain_connect()，而边界单元格则根据 Peering Bits 规则来选定。你的生成算法（如随机行走、BSP 方法、细胞自动机等）只需决定哪些单元格属于地面即可。
2. `TileMapLayer` 不需要层索引参数: 与旧的 `TileMap` 的 set_cells_terrain_connect(layer, ...)不同， TileMapLayer每个层只有一个节点，因此不需要前置层索引参数。 set_cell()和 get_cell_source_id()也是如此。在参考旧文章中的代码时，请注意这种差异。

当想要直接放置单个瓷砖时，可以使用 `set_cell()`符号（该符号不会自动连接；它会精确地放置你指定的瓷砖）

```gdscript
# Place atlas 0, tile (2, 3) directly at coordinate (10, 5) (no auto-connection)
# 放置图集中的瓷砖 (0, 2, 3)，精确放置在坐标 (10, 5)（不会自动连接）
set_cell(Vector2i(10, 5),0, Vector2i(2, 3))
```

一旦你希望敌人能够沿着你生成的地图进行移动, 那么 NavigationRegion2D 和 Navigation Meshes 就提供了如何根据 tilemap 来构建路径查找网格的方法

## 总结

- 地形（自动调整大小）由引擎来处理瓷砖的选择工作。复杂的地形和角落、边缘以及中心区域都会为您自动处理。
- 使用 TileMapLayer节点（在 Godot 4.3 版本中，旧的 TileMap节点已不再被推荐使用）
- 其核心是“视界单位”规则，这些规则规定了每个 3x3 的网格属于哪个邻域。
- 在 GDScript 中， `set_cells_terrain_connect()`通过仅传递坐标来实现 procedural 生成效果（无需在 TileMapLayer上使用层参数）
- 通过分层分割、 `VisibleOnScreenEnabler2D` 和分块处理，优化大型地图的性能。
