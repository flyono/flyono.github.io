---
title: 使用节点组进行灵活的对象检查
description: Godot 的组功能通过组标签来标识各个节点，从而按角色进行分类管理。书中介绍了如何使用`is_in_group`进行检查操作，如何通过`call_group`来广播命令，以及性能优化方面的注意事项。还阐述了何时使用元数据、类名称，以及何时采用鸭子类型。所有内容都配有图表说明，便于理解。
created: 2026-08-11T14:26:26
---

> “我希望能同时消灭屏幕上所有的敌人。”“我还想知道玩家的攻击是击中了敌人、易碎的箱子，还是其他物品。”在游戏开发中，你会遇到各种各样的情况，需要根据具体情况来做出相应的处理。

试着从亲子关系的角度来解决这个问题，或者使用像 `if body.name == "Slime"` 这样的标签进行标识。这样每次添加一种新的敌人类型时，都不需要手动修改代码。这种方法能快速解决这些问题。Godot 的组功能在这里非常有用。在节点上添加角色标签后，就可以根据标签来控制和指挥各种对象了，而不需要考虑它们的类型或类别。

## 什么是组(group)呢? 它是一种用于区分角色的分类系统。

"组(group)"是一种用于为节点添加虚拟标签的系统，这种标签的添加与场景树的结构以及节点的类型无关。例如， `CharacterBody2D` 可以被标记为“敌人”， `Area2D`可以被标记为“可收集物品”，不同的类别可以被归类到同一个标签下。

关键在于，这种分类方式跨越了树状结构的各个层次。无论一个节点在树中的位置如何，以及它属于哪种类型，将其标记为“敌人”后，它就会成为群体的一部分。这种分组方式带来了三个好处。

- 按角色分类: 不必受亲子关系的限制，可以根据含义将物品分组，例如“敌人”或“收藏品”等。
- 批量操作: 只需获取所有“敌人”的成员，然后一起指挥他们即可，这很容易编写。
- 保持独立状态: 节点通过共享的标签进行协作，而不需要直接持有对对方的引用。

一个节点可以属于多个组。如果将一个敌人同时分配到“敌人”组和“游骑兵”组中，那么就可以同时攻击所有敌人，或者只攻击远程敌人。

## 有两种方法可以将节点添加到组中

有两种方式可以将节点添加到组中：通过编辑器进行添加，或者通过代码实现。对于已经放置好的静态节点，可以使用编辑器进行编辑；而对于在运行时才会生成的节点，则需要通过代码来实现添加。

- **编辑器添加组(针对静态节点)**: 在场景树中选中一个节点，打开"**节点**"选项卡，在检查器旁边找到“组”选项，输入一个组名称（例如 `enemies`），然后点击“添加”。
- **代码添加(针对动态节点)**: 在运行时生成的节点，比如子弹和效果等，都会通过 `add_to_group()`进行自我注册。

```gdscript
# bullet.gd
func _ready() -> void:
    # Register with the group on spawn
    # 生成时注册到组
    add_to_group("player_bullets")

func _on_hit_target() -> void:
    # Leave when no longer needed (optional)
    # 离开组（可选）
    remove_from_group("player_bullets")
    queue_free()
```

## 使用`is_in_group`方法来判断“这个东西是什么”

当需要判断与什么物体相撞时，群体作战的效果最为显著。通过使用 `is_in_group()`, 你可以无需知道具体是什么物体，就能判断"是一个敌人，还是一个易碎的箱子?"

```gdscript
# player_attack_area.gd (Area2D: the player's sword hitbox)
func _on_body_entered(body: Node) -> void:
    # Does it carry the "enemies" tag and implement take_damage?
    # 检测是否是敌人
    if body.is_in_group("enemies") and body.has_method("take_damage"):
        body.take_damage(attack_power)
    # Break it if it's a destructible object
    # 检测是否是可破坏对象
    elif body.is_in_group("destructible_objects") and body.has_method("destroy"):
        body.destroy()
```

这种代码的美在于 `PlayerAttackArea` 对它攻击的具体类一无所知（ Slime， Goblin）。添加一个新敌人，这个脚本无需任何更改：只需将新节点放入“敌人”组，攻击就会落在它身上。结合 `is_in_group()`（标签检查）与 `has_method()`（行为检查）使其更加安全。

## 实际操作：同时指挥屏幕上的所有敌人

一种能够让屏幕上所有敌人受到惊吓的炸弹物品；一种会让所有守卫处于警戒状态的警报装置；一种针对整个敌人队伍实施的回合制状态效果——“向每个具有特定角色的节点发送相同的指令”。无论是什么游戏类型，这种情况都会经常出现。使用 `get_tree().call_group()` ，你可以一次性调用每个角色的方法，而无需知道角色的数量或他们的位置。

让我们构建一个报警系统吧。指挥方会单独拨打 `call_group()` 这个号码一次。

```gdscript
# alarm_system.gd
func _on_alarm_triggered() -> void:
    # Call enter_alert_mode on everyone in the "guards" group, with an argument
    # 调用 guards 组别的 enter_alert_mode 方法，参数为玩家最后的位置
    get_tree().call_group("guards", "enter_alert_mode", get_player_last_position())
```

接收方（每个守护程序）只需要加入该组，并提供需要调用的方法即可。

```gdscript
# guard.gd (CharacterBody2D)
func _ready() -> void:
    # Join guards on spawn
    # 生成时加入 guards 组
    add_to_group("guards")

func enter_alert_mode(target_position: Vector2) -> void:
    # Switch state to alert
    # 切换状态为警告
    state = State.ALERT
    # Head to the last known position
    # 朝最后已知位置移动
    nav_agent.target_position = target_position   
```

有两个要点值得注意。

- 发送方不需要知道守卫的数量: `AlarmSystem` 并不关心场景中守卫的数量或位置。无论有多少守卫, `call_group()`那一行代码都不会改变，这使得设计能够适应敌方数量的变化。
- 那些没有该方法的节点会被悄悄跳过: `call_group()` 在目标节点没有该方法时不会引发错误，也不会执行任何操作。不过，忽略这些节点可能会容易被忽视，因此要么让组中的每个节点都确保拥有该方法，要么通过 `has_method()` 进行确认。

每个守卫都具有智能的“先发出警报再追击”的行为模式，这种行为属于人工智能中的状态机范畴。而前往目标地点的过程则通过 `NavigationAgent2D` 进行路径查找。让各个小组负责“发出命令”，而每个节点的决策权则留给相关模块来处理，这样就能保持分工的清晰明了。

## 常见的错误与最佳实践

| 常见的错误 | 最佳实践 |
| --- | --- |
| 在 _process内部调用 get_nodes_in_group() | 将列表缓存在 _ready()中，或者使用 call_group()和信号进行处理。每帧扫描整个场景是非常消耗资源的操作 |
| 处理每个与组相关的检查 | 群体遵循动态分类机制。可以使用 class_name进行静态类型检查，并通过元数据来附加数值 |
| 将组名硬编码为字符串字面量 | 将它们设为常量，比如 const ENEMY_GROUP := "enemies"，这样就能避免拼写错误和名称重命名的问题。;

那些硬编码的组名确实会悄悄带来麻烦。在数十个地方使用 `"enemies"`这个字符，而一个拼写错误就可能导致整个功能失效。最好将这些内容放在常量中，或者通过一个自动加载的方式来处理，这样只需要修改一个地方而已

## 何时使用其他方法

群体机制并非适用于所有情况。根据具体的目标，可以采用更简单、更高效的另一种机制。

这些功能是互补的，而不是相互竞争的。实际上，前面的碰撞检查已经将它们整合到了一起：先检查与组的关联，然后再通过 has_method()来确认行为。角色属于组，类型属于 class_name，能力属于 has_method，而值则属于元数据。在最合适的场合使用这些功能，就能实现简洁的设计。

需要注意的是: 处理“什么与什么相撞”这种物理问题并不适合由小组来负责。这一任务应该由 Collision Layers 和 Masks 类来承担。小组主要负责碰撞发生后的逻辑处理，而层过滤则负责碰撞本身的筛选工作。

## 额外信息：供以后参考吧

- 这种机制如何与信号协同工作：群体适合用于“向所有人发出指令”的场景。而相反的情况，即通知各个地点发生了某事时，使用信号更为合适。指令通过群体传递，而通知则通过信号来传达。
- 团体订单的排序并不具有确定性: 因此，最好不要编写依赖于 ``get_nodes_in_group`()排序的逻辑。如果排序非常重要，建议自行进行排序处理。
- call_group有一个标志变体： `call_group_flags()`可以让你控制，例如延迟调用（在帧结束时运行所有调用）。这在向大量节点广播时很有帮助。

## 总结

- 组是独立于场景层次结构的“角色标签”机制。不同的类别可以共享同一个标签。
- 通过编辑器添加节点（静态方式）或使用 add_to_group()进行添加（动态方式）
- `is_in_group()`允许你在不知道具体类的情况下检查其他对象的角色和分支
- `get_tree().call_group()` 向每个组成员广播。发送者无需知道数量或位置
- 避免每帧都调用 `get_nodes_in_group()`。可以将其缓存起来，或者改用 `call_group()`。

将它与元数据 class_name和 has_method结合起来，让每个元素都能在最合适的位置发挥作用
