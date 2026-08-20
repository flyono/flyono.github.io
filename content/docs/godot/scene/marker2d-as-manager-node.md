---
title: 使用 Marker2D 作为管理节点
description: 如何使用 Marker2D 来管理生成点、武器边缘以及效果锚点。介绍了与 Node2D 不同的用法，如何通过@export 来附加数据，如何利用 global_position，以及保持标记点组织有序的一些技巧。
created: 2026-08-11T15:35:48
---

> 敌人的位置、子弹的飞行路径、可以施加效果的地方：游戏中到处都有需要利用特定坐标的情况。把这些坐标硬编码到脚本中吧，每稍微调整一下坐标数值，就不得不重新输入这些数值，这很快就会让人感到疲惫不堪。

`Marker2D` 彻底解决了这一难题。它将坐标从代码中分离出来，并将其转化为编辑器中的标记，这样你就可以像移动角色一样来移动这些标记了。这篇文章介绍了从基础到实际应用的各种使用方式，比如生成点以及武器轮廓的显示等。

## 什么是 `Marker2D`? 它与 `Node2D` 有什么不同?

`Marker2D`是一个非常轻量的节点，用于在二维空间中作为标记使用。在内部结构上，它与 `Node2D` 几乎相同，唯一的区别在于: `Marker2D` 在编辑器中始终会显示一个十字光标工具。

一个空白的 `Node2D` 没有任何效果，因此你无法在编辑器中看到它的位置（除非你选择它）。而带有 `Marker2D` 的标记则可以让你随时看到瞄准点，从而可以像拖动对象一样精确地定位和调整坐标。这样一来，位置就变成了一个可以看见、可以触摸的实体，而不是代码中抽象的数字了。

## 实践操作: 构建一种灵活的敌人生成系统

`Marker2D` 在管理生成点方面表现得非常出色。在射击游戏中，可以轻松创建敌军的阵型；在策略游戏中，可以设计出复杂的入侵入口；在角色扮演游戏中，可以合理安排怪物的位置。我们需要一个系统，让关卡设计师能够在不编写任何代码的情况下，自由调整“哪些怪物出现在哪里”。

首先，在想要让敌人出现的位置放置 `Marker2D`。为每个 `Marker2D` 附加一个脚本，然后使用 `@export` 来传递诸如要生成的敌人信息之类的数据。

```gdscript
# spawn_point.gd
extends Marker2D

# The enemy to spawn here (assigned in the Inspector)
# 在此生成的敌人（在检视面板中指定）
@export var enemy_type: PackedScene
# Whether to use this point (designers can toggle it)
# 是否使用此点（设计师可以切换）
@export var enabled: bool = true      
```

现在，每个生成点都成为一个标记点，每个标记点都携带着自己的位置、敌人信息以及是否可用的状态。将这些信息统一归类到 `enemies_spawn_points` 组中，然后从管理端读取这些信息。

```gdscript
# game_manager.gd
func _ready() -> void:
    # Fetch the spawn points together via the group
    # 通过分组统一获取生成点位
    for sp in get_tree().get_nodes_in_group("enemies_spawn_points"):
        # Only enabled points that have an enemy assigned
        # 仅启用有敌人的点位
        if sp.enabled and sp.enemy_type:          
            var enemy := sp.enemy_type.instantiate()
            # Spawn at the marker's position
            # 在标记的位置生成
            enemy.global_position = sp.global_position   
            add_child(enemy)
```

这个设计的优点在于，关卡设计师可以在编辑器中进行所有配置：比如“从这个位置开始生成敌人”、“指定该首领的生成方式”、“这次跳过该关卡”等等。所有这些配置都可以直接通过标记来设定，而无需接触任何代码。添加新敌人只需要放置一个 `Marker2D` 标记，然后指定相应的敌人场景即可。这是一种经过实战验证的布局模式，它将敌人的生成机制与点的群管理相结合了起来。

有两点需要注意:

- **关于标记物的位置安排，以及管理器的逻辑处理如下**: `Marker2D` 主要关注“在哪里以及是什么”这些信息，而 `GameManager` 则负责处理“何时以及如何”的问题。由于这两个角色的职责是分开的，因此你可以改变标记物的生成方式，并直接重复使用这些标记物。
- 如下方所述，当标记点是另一个节点的子节点时， `global_position` 仍然可以给出正确的世界坐标值。

## 构建一个能够跟随角色移动的锚点（枪口）。

枪口、剑尖、法杖末端、足部：绑定至特定身体部位的特效处理是`Marker2D`的另一项特色功能。将它设为角色的子对象后，它会自动跟随角色移动与旋转。

在玩家场景中，将一个 `Marker2D`作为精灵的子节点添加，放置在枪口位置，并命名为"`Muzzle`"。然后，在开火时，只需将那个标记的 `global_position`和 `global_rotation`传递给子弹。

```gdscript
# player.gd
@onready var muzzle: Marker2D = $Sprite2D/Muzzle
@export var bullet_scene: PackedScene

func _process(_delta: float) -> void:
    if Input.is_action_just_pressed("shoot"):
        var bullet := bullet_scene.instantiate()
        # From the muzzle's position
        # 子弹出发位置为枪口的位置
        bullet.global_position = muzzle.global_position
        # At the muzzle's angle
        # 子弹发射角度为枪口角度  
        bullet.global_rotation = muzzle.global_rotation   
        # Don't parent bullets to the player
        # 子弹不挂载到玩家
        get_tree().current_scene.add_child(bullet)        
```

无论角色面向左侧还是右侧，Muzzle 始终位于枪管的位置，因此子弹会以正确的角度从正确的位置射出。这种技术同样适用于任何“基于身体部位而设计的特效”: 脚下的灰尘、背部的火焰喷射等等。

> 警告：如果你翻转那个带有 flip_h的精灵，那么仅使用 global_rotation可能无法产生正确的子弹方向。因此，你需要根据翻转后的角度来修正方向，或者选择使用 muzzle.global_transform.x（标记物正面向的方向）作为移动的方向，以确保安全。

## 常见错误与最佳实践

| 常见错误 | 最佳实践 |
| --- | --- |
| 在代码中移动位置 (marker.position.x += 10) | 将位置调整的功能留给编辑器来处理吧，让代码只显示 global_position这一行内容。这样做会破坏“所见即所编辑”的设计理念 |
| 像 Marker2D和 Marker2D2这样的通用名称 | 使用能够体现角色名称的标识符，例如 PlayerSpawn、 Muzzle或 BossEntry |
| 将它们直接散布在根部下方 | 将它们归类到由空 Node2D 父对象构成的组中，比如 SpawnPoints或 EffectAnchors这样的对象 |
| 在子类标记上使用 position | 始终使用 `global_position` 当你想使用世界坐标(position是相对于父对象) |

在这里， `position` 和 `global_position` 之间的区别最为重要。子节点的 `position` 是相对于其父节点的位置而言的，因此当父节点发生移动或旋转时，子节点的位置可能会偏离预期的位置。

当你想指代“屏幕上的这个位置”时，比如在处理生成和发射操作时，一定要使用 `global_position` 这个坐标，这样无论父物体的位置或旋转如何变化，你都能得到正确的世界坐标。

整理你的标记工具也是很有好处的。将相关的标记工具集中到一个父节点下，就可以作为一个整体来移动或隐藏它们，这样就能让场景树保持整洁。

## 额外信息：供以后参考

一旦你能够熟练地使用 Marker2D 来处理坐标问题，接下来就可以考虑使用这些功能了。

- **Path2D/Curve2D 类负责处理“直线”的绘制**: 如果 `Marker2D` 类用于管理点，那么 `Path2D` 和 `Curve2D` 则用于管理直线（路径）。你可以定义敌方巡逻路线以及摄像机的移动路径。将用标记标记出的点逐渐连接起来，就能形成一条条路径。这是自然而然的延伸过程。
- **从放置数据生成关卡**: 读取 `_ready()` 中的标记信息并从它组装整个关卡会导致程序生成。
- **当准星不够用时自定义 Gizmo**: 使用 `@tool` 脚本和 `_draw()` ，你可以在编辑器中绘制自己的辅助图标。

## 总结

- `Marker2D` 是一种位置标记工具。其内部结构与 `Node2D` 几乎相同，但它的优势在于：在编辑器中，十字光标始终可见。
- 使用 `@export` 将数据附加到生成点，这样设计师就可以完全在编辑器中进行生成参数的调整了。
- 将其作为角色的子节点放置，它会跟随角色移动与旋转，借助全局位置(`global_position`)/全局旋转(`global_rotation`)获得准确的发射位置和角度。
- 不要在代码中修改坐标值，应在编辑器中进行调整；使用 `global_position` 来读取这些坐标值；将它们按组归类，归类到父节点 `Node2D` 之下。

如果你有一个硬编码的坐标，试着用 `Marker2D` 来替代它。一旦你熟悉了无需打开脚本即可调整位置的操作，之后就再也无法回到以前的方式了。
