---
title: 使用 GUT 在 Godot 中实现单元测试
description: 学习如何使用 Godot 单元测试 (GUT) 插件实现自动化测试。内容涵盖编写测试用例、断言、信号测试和场景测试。
created: 2026-05-21T17:01:00
---

## 概述

在游戏开发过程中，你是否遇到过类似的情况？

- 你修复了敌人的生命值逻辑，却发现玩家的伤害计算也出错了。
- 重构之后，手动检查每个受影响的区域工作量巨大。
- 你不敢改动某个函数，因为你不确定改动它会不会破坏什么东西。

**单元测试**可以解决这些问题。通过编写能够自动验证代码预期行为的测试代码，你可以在每次更改后运行测试，并立即确认代码没有出现任何问题。

### 什么是单元测试？

单元测试是一种自动验证程序最小单元（函数和方法）是否按预期运行的实践。无需每次都手动启动游戏进行检查，测试代码只需按下一个按钮即可自动完成验证。

```text
手动测试：
启动游戏→攻击敌人→目视确认生命值下降→进入下一个用例……（循环执行）

单元测试：
点击运行测试→数秒内自动校验全部用例→展示结果报告
```

### 什么是 GUT？

**GUT（Godot Unit Test）** 是一个专为 Godot 构建的单元测试插件。由于测试代码的语法与 GDScript 几乎相同，因此您无需学习新的语言或工具。

GUT 的主要功能包括：

- **断言** ：值比较、空值检查、容器元素验证
- **信号测试** ：验证 Godot 特有的信号发射
- **场景测试** ：加载 .tscn 文件并验证节点树
- **模拟对象/桩对象** ：隔离依赖项，以保持测试的独立性
- **GUT 面板** ：在编辑器内一键运行测试
- **命令行执行** ：与 CI/CD 流水线集成

>**提示** ：GUT API 和配置路径可能因版本而异。本文假设使用 GUT 9.x 版本。请从 AssetLibrary 安装最新版本。

## 安装 GUT

首先，让我们将 GUT 添加到您的项目中。只需几个步骤，即可从 Godot 官方 AssetLibrary 安装 GUT。无需任何外部工具或命令行设置——所有操作都在编辑器内完成。

**1. 从资产库安装**:

- 在 Godot 编辑器中打开"AssetLib"选项卡。
- 搜索"GUT"并安装"Godot Unit Test (GUT)"。
- `addons/gut/`文件夹将添加到您的项目中

**2. 启用插件**:

- 转到 **项目**-> **项目设置** -> **插件** 选项卡
- 勾选 **GUT** 旁边的方框

**3. 创建一个测试文件夹**:

- 在项目根目录下创建 `/test` 文件夹
- 放置你的测试文件于该文件夹下

**4. 配置 GUT 面板**:

- 启用插件后，编辑器底部会出现一个 **GUT** 选项卡。
- **测试目录** ：在 GUT 面板设置中，将测试文件搜索目录设置为 `res://test/`
- **文件前缀** ：默认情况下，仅检测以 `test_`前缀的文件。您可以在 GUT 面板的 **Script Prefix** 设置中更改此设置。
- 配置完成后，使用面板中的 **全部运行** 按钮执行测试。

>**提示** ：如果您的测试未出现在列表中，请检查 GUT 面板中的目录和文件前缀设置。默认搜索目录为 `res://test`。

## 创建测试文件

GUT 准备就绪后，让我们来编写你的第一个测试。测试代码使用的语法与常规 GDScript 几乎相同，因此如果你熟悉 GDScript，你会感觉非常得心应手。

这里有一个测试玩家生命值管理的示例。稍后我们将逐段分析代码：

```gdscript
# test/unit/test_player.gd
extends GutTest

# 预加载待测脚本
const Player = preload("res://player.gd")

# 以 test_ 开头的方法会被自动识别为测试方法
func test_player_starts_with_full_health():
    var player = Player.new()
    add_child_autofree(player)
    assert_eq(player.health, 100, "Initial health should be 100")

func test_player_takes_damage():
    var player = Player.new()
    add_child_autofree(player)
    player.take_damage(30)
    assert_eq(player.health, 70, "Health should be 70 after taking 30 damage")

func test_player_cannot_go_below_zero_health():
    var player = Player.new()
    add_child_autofree(player)
    player.take_damage(150)
    assert_eq(player.health, 0, "Health should not go below 0")
```

**代码结构：**

- **`extends GutTest`**：每个测试文件都必须继承此类。它允许您访问诸如 `assert_eq()`、 `watch_signals()`等测试函数。
- **`preload()`**：预先加载要测试的脚本。然后可以使用 `.new()`创建实例。
- **`test_`**：GUT 会自动发现并运行以该前缀开头的方法。不带该前缀的方法将被视为辅助函数，不会作为测试执行。
- **`add_child_autofree()`**：测试 Node 子类所需 —— 下文将详细说明
- **`assert_eq(a, b, msg)`**：表达"a 应该等于 b"的预期。第三个参数（`message`）是可选的，但建议使用，因为它有助于在测试失败时快速确定问题所在。

运行测试时，所有通过的测试都会显示绿色成功标记，任何失败的测试都会以红色突出显示，并附有有关出错原因和位置的详细信息。

### 何时需要使用 add_child_autofree()？

编写测试时，第一个问题通常是"我应该调用 `add_child_autofree()`吗？"规则很简单：这取决于**被测对象是否继承自 Node** 。

继承自 Node 的类（CharacterBody2D、Sprite2D 等）只有在被添加到场景树后才会调用 `_ready()`方法。如果你的测试依赖于 `_ready()`方法中的初始化，那么如果没有 `add_child_autofree()`，测试将无法正常运行。

```gdscript
# ✅ Node 子类 -> 必须实现 add_child_autofree () 方法
# 确保调用 _ready() 函数，同时让节点加入场景树
func test_player_health():
    var player = Player.new()       # 继承 CharacterBody2D
    add_child_autofree(player)      # 如果不调用该方法， _ready() 不会被调用
    assert_eq(player.health, 100)

# ✅ RefCounted / Resource 子类 -> 无需添加子项
# 这些对象不参与场景树构建
func test_inventory_is_empty():
    var inventory = Inventory.new()  # 继承 RefCounted
    assert_true(inventory.is_empty())
```

| 测试目标类型 | 添加`add_child_autofree()` | 原因 |
| ----------------------------- | ------------------------ | ---------------------- |
| Node、Node2D、CharacterBody2D 等 | **Required** | `_ready()`执行和自动内存清理所必需 |
| RefCounted, Resource | **Not needed** | 不依赖于场景树；通过引用计数自动释放 |

>**提示** ：如有疑问，为了安全起见，请添加 `add_child_autofree()`。对非节点对象调用此函数不会导致错误（尽管实际上只有节点才会被添加到场景树中）。

## 断言函数

断言是测试的核心。它们允许你在代码中表达诸如"这个值应该是 100"或"这个列表应该包含剑"之类的预期。如果实际值与预期不符，测试**就会失败** ，GUT 会准确地报告预期值与实际接收值之间的差异。

GUT 提供了一套丰富的函数，用于比较值、检查空值、验证容器内容等等。

| Function | 描述 |
| ------------------------------------------- | ----------------------------------------- |
| `assert_eq(a, b, msg)` | 验证 a 等于 b |
| `assert_ne(a, b, msg)` | 验证 a 不等于 b |
| `assert_true(val, msg)` | 验证 val 是否为真 |
| `assert_false(val, msg)` | 验证 val是否为假 |
| `assert_null(val, msg)` | 验证 val 是否为空 |
| `assert_not_null(val, msg)` | 验证 val 是否不为空 |
| `assert_gt(a, b, msg)` | 验证 a 是否大于 b |
| `assert_lt(a, b, msg)` | 验证 a 是否小于 b |
| `assert_has(container, val, msg)` | 验证容器包含值 |
| `assert_does_not_have(container, val, msg)` | 验证容器是否不包含 val |

所有断言函数的 `msg`参数都是可选的，但建议包含它——当测试失败时，消息会准确地告诉你正在验证什么，从而大大加快调试速度。

**实际示例** ：让我们结合多个断言来测试一个库存系统：

```gdscript
func test_inventory_system():
    var inventory = Inventory.new()

    # 检查初始状态
    assert_true(inventory.is_empty(), "Should be empty initially")
    assert_eq(inventory.item_count(), 0, "物品数量应为0")

    # 添加项目
    inventory.add_item("sword")
    assert_false(inventory.is_empty(), "Should not be empty after adding an item")
    assert_has(inventory.items, "sword", "应当包含剑")

    # 检查容量限制
    for i in range(10):
        inventory.add_item("potion")
    assert_lt(inventory.item_count(), 100, "应低于容量限值")
```

## 测试信号

在验证了价值之后，我们来探讨一下 Godot 特有的测试主题：信号。Godot 大量依赖信号来实现节点间的通信。诸如"玩家失败时 `died`信号是否触发？"或"是否发出了正确的分数？"之类的问题都可以用 GUT 来验证。

信号测试遵循三步流程：

- 使用 **`watch_signals(obj)`** 开始监视对象的信号
- 执行应触发信号的操作
- 使用 `assert_signal_emitted()`验证信号是否已触发

```gdscript
func test_player_emits_died_signal():
    var player = Player.new()
    add_child_autofree(player)

    # 1. 开始监测信号
    watch_signals(player)

    # 2. 执行触发操作
    player.take_damage(999)

    # 3. 验证信号已发出
    assert_signal_emitted(player, "died", "The died signal should be emitted")
```

当信号带有参数时，请使用 `assert_signal_emitted_with_parameters()`来验证参数值。请注意，参数必须以数组形式传递。

```gdscript
func test_score_changed_signal_with_parameter():
    var game_manager = GameManager.new()
    add_child_autofree(game_manager)
    watch_signals(game_manager)

    game_manager.add_score(100)

    # 验证带参数的信号（参数以数组形式传入）
    assert_signal_emitted_with_parameters(
        game_manager,
        "score_changed",
        [100],
        "score_changed should be emitted with 100"
    )
```

## 测试场景

目前我们一直在测试单个脚本，但在实际游戏中，场景树中的多个节点是协同工作的。诸如"Sprite2D 节点是否作为 Player 节点的子节点存在？"或"主菜单的开始按钮是否正常工作？"之类的问题也值得验证——及早发现场景结构问题可以避免日后出现难以追踪的错误。

使用 `load()`加载 `.tscn`文件，然后调用 `instantiate()`在测试中处理实际的节点树：

```gdscript
func test_player_scene_initial_state():
    # 加载并实例化场景
    var player_scene = load("res://scenes/player.tscn")
    var player = player_scene.instantiate()
    add_child_autofree(player)

    # 验证节点结构
    assert_not_null(player.get_node("Sprite2D"), "Sprite2D should exist")
    assert_not_null(player.get_node("CollisionShape2D"), "CollisionShape2D should exist")
    assert_eq(player.position, Vector2.ZERO, "Initial position should be (0,0)")

func test_ui_button_functionality():
    var ui_scene = load("res://scenes/main_menu.tscn")
    var ui = ui_scene.instantiate()
    add_child_autofree(ui)

    var start_button = ui.get_node("StartButton")
    watch_signals(start_button)

    # 模拟一次按钮点击
    start_button.emit_signal("pressed")
    assert_signal_emitted(start_button, "pressed", "Button should be pressed")
```

在场景测试中，务必使用 `add_child_autofree()`。使用 `instantiate()`创建的节点需要添加到场景树中才能触发 `_ready()`，如果没有 `autofree`，测试结束后就会发生内存泄漏。`autofree`确保在测试完成后自动调用 `queue_free()`。

## 安装与拆卸

您可能已经注意到，我们在每个测试中都使用了 `Player.new()`。随着测试数量的增加，这种重复劳动变得非常繁琐。将相同的设置代码复制到十个测试方法中不仅冗余，而且如果设置需要更改，则意味着需要更新每个测试方法。

GUT 提供了 `before_each`和 `after_each`，用于在每次测试之前和之后自动运行通用逻辑。

```gdscript
extends GutTest

var player: Player

# 在每次测试执行前自动调用
func before_each():
    player = Player.new()
    add_child_autofree(player)
    player.health = 100

# 每次测试结束后自动调用
func after_each():
    # Cleanup if needed
    pass

func test_player_attack():
    # player 已经通过 before_each() 初始化了
    player.attack()
    assert_true(player.is_attacking, "Should be in attacking state")

func test_player_defend():
    player.defend()
    assert_true(player.is_defending, "Should be in defending state")
```

以下是执行流程图，用于直观地展示发生的情况：

```text
before_each() -> test_player_attack() -> after_each()
before_each() -> test_player_defend() -> after_each()
```

因为 `before_each`每次都会创建一个新的实例，所以在一个测试中对 `player`所做的更改不会传递到下一个测试中。

### `before_all` 和 `after_all`

GUT 还提供了 `before_all`和 `after_all`，它们会在整个测试类中运行一次。这些参数对于不希望在每个测试中重复执行的繁重初始化操作非常有用，例如加载大型资源。

```gdscript
# 对整个测试类仅执行一次
func before_all():
    print("Test class starting")

func after_all():
    print("Test class finished")
```

| Callback | 运行时 | 用例 |
| --------------- | --------- | ------------- |
| `before_all()` | 测试类开始时 | 加载大量资源，准备共享数据 |
| `before_each()` | 在每种测试方法之前 | 每个测试的初始化，创建实例 |
| `after_each()` | 每次测试方法之后 | 每个测试的清理工作 |
| `after_all()` | 测试类结束时 | 释放共享资源 |

## 使用 Mocks 和 Stubs

随着测试用例的增多，你会遇到依赖关系问题，例如"此函数依赖于外部 API"或"测试敌人 AI 需要玩家存在"。举例来说，测试商店的折扣计算不应该仅仅为了测试就需要设置真实的数据库或网络连接。

**模拟对象（mock）** 是一种在测试期间替代真实对象的"假"对象。GUT 的 `double()`允许你创建模拟对象、覆盖方法返回值，以及验证特定方法是否被调用。

### 创建基本模型

```gdscript
func test_enemy_uses_attack_when_in_range():
    # 为敌人类创建模拟对象（测试替身）
    var enemy = double(Enemy).new()
    add_child_autofree(enemy)

    # 让`get_distance`方法始终返回10.0（桩函数模拟）
    stub(enemy, "get_distance").to_return(10.0)

    enemy.update_ai(0.1)

    # 验证attack()方法已被调用
    assert_called(enemy, "attack")
```

### 使用 Stubs

`stub()`函数用于固定特定方法的返回值。通过声明"此方法始终返回此值"，您可以消除外部依赖项，并专注于测试您关心的逻辑。

```gdscript
func test_shop_calculates_discount():
    var shop = double(Shop).new()

    # 始终视作贵宾会员
    stub(shop, "is_vip_member").to_return(true)
    # 将玩家金币数值固定为1000
    stub(shop, "get_player_gold").to_return(1000)

    var price = shop.calculate_price("sword")
    assert_lt(price, 100, "VIP discount should be applied")
```

在这个例子中，我们不需要实际的玩家数据或存档文件。通过固定 `is_vip_member()`和 `get_player_gold()`的返回值，我们可以完全独立地测试折扣计算逻辑。

### Key Mock / Stub Functions

| Function | 描述 |
| ----------------------------------------- | ----------- |
| `double(Class)` | 创建一个类的模拟对象 |
| `stub(obj, "method").to_return(val)` | 修改方法的返回值 |
| `assert_called(obj, "method")` | 验证方法是否被调用 |
| `assert_not_called(obj, "method")` | 确认某个方法未被调用 |
| `assert_call_count(obj, "method", count)` | 验证方法被调用的次数。 |

## 最佳实践

现在你应该对如何编写测试有了扎实的了解。以下是一些指导原则，可以帮助你保持测试代码的长期可维护性。

| 推荐 | 描述 |
| -------------------------- | ---------------------------------------------- |
| **One assertion per test** | 每个测试都应验证单一行为 |
| **Use clear test names** | 测试名称为 `test_what_should_happen_when_condition` |
| **Follow the AAA pattern** | Arrange -> Act -> Assert（安排 -> 执行 -> 断言） |
| **Use autofree** | 使用 `add_child_autofree()`可以防止内存泄漏。 |
| **Watch signals** | 通过信号测试重要事件 |
| **Use mocks/stubs** | 使用 `double()`和 `stub()`隔离依赖项 |
| **Integrate with CI/CD** | 利用自动化测试尽早发现回归问题 |

**AAA 模式**对提高可读性尤为重要。通过将测试分成带标签的部分，任何人都能一目了然地看出哪些内容正在设置、哪些内容正在测试以及哪些内容正在验证：

```gdscript
func test_player_heals_correctly():
    # Arrange
    var player = Player.new()
    add_child_autofree(player)
    player.health = 50

    # Act
    player.heal(30)

    # Assert
    assert_eq(player.health, 80, "Health should be 80 after healing 30 from 50")
```

**命令行示例** ：

```shell
# 以无头模式运行测试（路径因GUT版本不同可能存在差异）
godot --headless -s res://addons/gut/gut_cmdln.gd -gdir=res://test/unit
```

## 总结

- **GUT** 是一个专为 Godot 构建的单元测试插件，它使用与 GDScript 相同的语法。
- 测试文件继承自 `GutTest`，并使用 `test_`前缀来命名测试方法。
- **Node 子类**在测试中需要使用 `add_child_autofree()`；RefCounted/Resource 类则不需要。
- **断言函数**用于验证预期值（ `assert_eq`、 `assert_true`等）。
- **信号测试**使用 `watch_signals()`和 `assert_signal_emitted()`
- **场景测试**使用 `add_child_autofree()`进行自动内存管理
- **`before_each`/`after_each`** 提供每个测试的设置/清理； **`before_all`/`after_all`** 每个类只运行一次。
- **double()/stub()** 隔离依赖项，以保持测试独立性

## 参考文档

- [Gut 9.6.0 (Godot 4.6) — GUT 9.6.0 documentation](https://gut.readthedocs.io/en/latest/)
