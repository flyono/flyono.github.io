---
title: 使用 InputMap 管理按键绑定
description: 学习 Godot 引擎的 InputMap 功能。从基本用法到动态按键配置、保存设置，以及构建灵活输入系统的最佳实践。
created: 2026-06-01T11:59:00
---
## 概述

玩游戏时，许多玩家都希望自定义键盘或游戏手柄的按键布局（按键绑定），以满足自己的偏好。Godot 提供了一项名为“InputMap”的强大功能，使管理这些按键绑定变得异常简单高效。

开发者面临的一个常见挑战是**按键绑定管理的复杂性** 。如果在脚本中分散编写类似 `if Input.is_key_pressed(KEY_W):`的代码，以后更改按键就会变得非常困难。

本文从基本用法到高级技巧，详细讲解了 InputMap 的用法。

## 什么是 InputMap？一种用于抽象输入的系统

InputMap 用作中间层，将物理按键（ `W`键、鼠标左键、游戏手柄 A 键等）与特定的游戏内操作（“前进”、“攻击”、“跳跃”等）连接起来。

在你的代码中，你没有直接引用物理键，而是调用了已定义的操作名称。这样做有以下好处：

- **灵活性** ：玩家可以在游戏内自由重新映射按键。您的代码无需任何更改。
- **可维护性** ：像“我想把攻击键从空格键改为回车键”这样的请求，只需修改一个 InputMap 设置即可完成。
- **多设备支持** ：键盘、鼠标和游戏手柄等不同的输入设备可以轻松分配给同一操作。

## 基本设置（Godot 编辑器）

让我们先来学习在 Godot 编辑器中配置 InputMap 的基本步骤。

1. **打开项目设置** ：从菜单栏中选择 `项目 → 项目设置`。
2. 1. **导航至 输入映射 选项卡** ：从顶部的选项卡中选择“输入映射”。
3. **添加动作** ：在顶部的 `添加动作` 字段中输入新的动作名称（例如， `player_attack`），然后单击 `添加` 按钮。请为其取一个清晰的名称，以描述该动作的功能。
4. **分配事件（按键）** ：点击添加动作右侧的 `+` 图标，然后从出现的菜单中选择“按键”、“鼠标按钮”等。对话框出现后，只需按下要分配的物理按键即可完成注册。例如，您可以将鼠标左键和键盘 `X`键都分配给 `player_attack`。

## 脚本基本用法

```gdscript
# Player.gd

const SPEED = 300.0

func _process(delta):
    # --- Single-shot action input ---
    # 当按下“player_jump”动作键时执行跳跃指令
    if Input.is_action_just_pressed("player_jump"):
        jump()

    # --- Continuous action input ---
    # 长按执行“player_attack”操作时释放法术
    if Input.is_action_pressed("player_attack"):
        cast_magic()

    # --- Analog input (direction) ---
    # 从“左移”和“右移”指令获取水平输入值（取值范围-1.0至1.0）
    var direction = Input.get_axis("move_left", "move_right")
    velocity.x = direction * SPEED
```

这段代码的妙处在于，它**没有在任何地方显示具体的按键名称** 。即使玩家更改按键设置，也不需要对脚本进行任何修改。

## 实际应用

掌握了基础知识后，我们来看看更实用、更高级的用法。

### 1. 实现八方向移动（ `get_vector`）

通过组合上下左右四个动作，您可以轻松实现二维八方向移动。使用 `get_vector`代替调用两次 `get_axis`。

```gdscript
# Set up move_left, move_right, move_up, move_down in InputMap

func _physics_process(delta):
    # 通过四项动作获取二维向量
    var input_vector = Input.get_vector("move_left", "move_right", "move_up", "move_down")

    # 沿该向量移动
    velocity = input_vector * SPEED
    move_and_slide()
```

`get_vector`自动对向量进行归一化（将长度设置为 1），防止对角线移动过快的问题。

### 2. 实现动态按键配置

玩家在游戏内更改关键设置的功能现在几乎是必不可少的。使用 `InputMap`单例模式即可实现这一点。

```gdscript
# KeyConfigScreen.gd

# 用于控制是否等待按键输入的标记
var waiting_for_input: bool = false
var target_action: String = ""

# 用于修改指定操作（例如玩家跳跃player_jump）按键绑定的界面按钮处理程序
func _on_change_jump_key_button_pressed():
    waiting_for_input = true
    target_action = "player_jump"
    # 告知玩家我们正在等待新的按键输入
    print("Press a new key for jump...")

# 用于接收按键输入的回调函数
func _input(event: InputEvent):
    # 若未等待输入则不执行任何操作
    if not waiting_for_input:
        return

    # 检测是否为键盘输入且该按键刚刚被按下
    if event is InputEventKey and event.is_pressed():
        # 先清除所有已存在的分配任务
        InputMap.action_erase_events(target_action)
        # 添加新按键事件
        InputMap.action_add_event(target_action, event)
        print("Changed jump key to %s." % OS.get_keycode_string(event.keycode))

        # 退出等待状态并处理该事件
        waiting_for_input = false
        get_viewport().set_input_as_handled()
```

此模式使用标志变量 `waiting_for_input`来管理输入等待状态。每当发生输入事件时，Godot 都会调用 `_input()`函数，从而允许您在按下按钮后等待下一个按键输入。调用 `set_input_as_handled()`可以阻止此输入事件传播到其他节点。

### 3. 保存和加载设置

更改后的按键设置应在游戏关闭后仍然保留。使用 `ConfigFile`类，您可以轻松地将 InputMap 状态保存到文件并从中恢复。

```gdscript
# ConfigManager.gd

const SAVE_PATH = "user://keyconfig.cfg"

# 将关键配置保存至文件
func save_key_config():
    var config = ConfigFile.new()
    # 遍历所有输入映射操作
    for action in InputMap.get_actions():
        # 保存与该操作相关的所有事件
        config.set_value(action, "events", InputMap.action_get_events(action))
    config.save(SAVE_PATH)

# 从文件加载按键配置
func load_key_config():
    var config = ConfigFile.new()
    # 若存档文件不存在，则不执行任何操作
    if config.load(SAVE_PATH) != OK:
        return

    # 清除现有的输入映射
    InputMap.load_from_project_settings() # 恢复为项目默认设置

    for action in config.get_sections():
        var events = config.get_value(action, "events")
        # 添加新事件前清除已有事件
        InputMap.action_erase_events(action)
        for event in events:
            InputMap.action_add_event(action, event)
```

## 常见错误和最佳实践

要有效使用 InputMap，需要考虑以下几个方面并推荐一些模式。

| 常见错误                                                                        | 最佳实践                                                                                          |
| :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **操作名称以字符串形式硬编码。**  <br>`Input.is_action_pressed("player_jump")`            | **使用常量或枚举管理操作名称**  <br>`Input.is_action_pressed(PlayerActions.JUMP)`  <br>这可以防止拼写错误并实现代码自动完成。 |
| **检查脚本中的物理按键代码**  <br>`if event.is_action_pressed(KEY_SPACE):`              | **始终通过 InputMap 操作处理输入**  <br>避免直接使用物理按键，因为这会抵消 InputMap 的优势。                                 |
| **在 `_process`中每帧都调用 `get_axis`**  <br><br>对于简单的处理来说还可以，但随着输入处理变得复杂，可读性会降低。 | **利用 `_unhandled_input`**  <br><br>非常适合处理未被图形用户界面 (GUI) 接收的输入。在此处编写游戏输入可以将其与 UI 操作清晰地区分开来。    |
| **按设备拆分操作**<br>分为 `jump_keyboard`和 `jump_gamepad`。                          | **合并语义相同的操作为一个**  <br>将键盘按键和游戏手柄按键都分配给一个 `jump`动作。                                            |

## 性能和其他模式的比较

InputMap 非常轻量级，几乎不会影响性能。对 `Input`单例的检查在 C++ 层面进行了高度优化。

如果不使用 InputMap 直接检查物理按键，则会出现以下问题：

- **缺乏灵活性** ：更改一个键需要修改代码中的所有引用点。
- **可读性降低** ：从代码中无法确定 `KEY_A`含义是“向左移动”还是“确认”。
- **可扩展性问题** ：当支持游戏手柄或其他设备时， `if`语句会不断增加和嵌套，导致代码复杂化。

区分 `_input()`和 `_unhandled_input()`也非常重要。`_input()`会将输入事件传播到所有节点，包括 GUI 元素，而 `_unhandled_input()`仅在 GUI 元素尚未处理该事件时才会调用。在 `_unhandled_input()`中处理游戏玩法相关的输入（例如角色移动）可以避免诸如按下 UI 按钮时角色移动之类的问题。

## 总结

InputMap 不仅仅是一个按键分配功能，它更是一种**设计理念** ，用于组织游戏的所有输入处理流程，从而提升灵活性和可维护性。虽然一开始可能会感觉像是额外的工作，但在项目早期阶段就合理设计 InputMap，绝对是对未来最好的投资。

养成避免硬编码的习惯，并插入一个名为“动作”的抽象层。这样你的游戏更容易被玩家接受，长期开发也会更加轻松。首先在项目设置中为各个层命名。
