---
title: Unity 的新输入系统
description: 学习如何使用 Unity 的新输入系统。使用输入操作、绑定和播放器输入组件实现跨平台输入处理。
created: 2026-06-17
---

## 概述

"我希望键盘和游戏手柄都能控制""我希望玩家能够自定义键位绑定"。如果您曾在使用旧输入系统时为实现这些目标而苦恼，那么新输入系统将为您提供帮助。

**New Input System** 是 Unity 2019 中推出的下一代输入处理系统。它使用名为 **Input Actions** 的抽象概念来实现灵活、独立于设备的输入处理。

## 安装和初始设置

> Unity 6 已经内置到系统中了，不用安装

### 安装软件包

1. 打开 `Window > Package Manager`
2. 从左上角的下拉菜单中选择 `Unity Registry`
3. 搜索 `Input System` 并安装
4. 当提示重新启动时，点击 `Yes`

### 配置有效输入处理

1. 打开 `Edit > Project Settings > Player`
2. 检查 `Other Settings > Configuration > Active Input Handling`
3. 选择 `Both` 或 `Input System Package (New)`
4. 编辑器将重新启动

> 两者：允许同时使用新旧输入系统。在迁移期间非常有用。

## 与旧输入系统的区别

### 旧输入系统的问题

- 每个设备需要单独的代码
- 难以自定义按键绑定
- 跨平台支持繁琐
- 本地多人游戏难以实现

### 新输入系统的优势

- 独立于设备的实施 - 相同代码可在多种设备上运行
- 跨平台支持 - 通过配置文件集中管理
- 自定义按键绑定 - 作为内置功能提供
- 支持本地多人游戏 - 可通过 `Player Input` 组件轻松实现
- 复杂的输入模式 - 长按、双击等，仅通过配置即可实现

## 新输入系统的组成部分

| 要素 | 说明 |
| --- | --- |
| Input Actions Asset | 存储输入配置的文件 |
| Action Map | 一组相关的输入行为 |
| Action | 输入行为 |
| Binding | 将输入行为绑定到实际输入设备 |
| Player Input | 接收输入事件的组件 |

### Action 类型

| 类型 | 使用案例 |
| Value | 连续值(移动杆、触发器等) |
| Button | 按钮按下状态(跳跃、攻击等) |
| Pass-through | 直接传递输入(处理多个输入源) |

## 创建和配置 Input Actions

### 创建 Input Action Asset

1. 在项目窗口右键
2. 选择 `Create > Input Actions`
3. 双击资产打开编辑窗口

### 创建 Action Map

单击左上角的 +按钮，添加新的 `Action Map`（例如 "Player"）

### 创建 Action

1. 单击 + 按钮并选择行动地图
2. 输入 Action 名称（如 "Move"、"Jump"）
3. 配置操作类型和控制类型

### 添加 Bindings

以 `WASD` 键为例：

1. 选择 "Move" Action
2. 点击 + 并选择 `Add Up/Down/Left/Right Composite`
3. 设置向上：W，向下：S，向左：A，向右：D

添加游戏手柄左摇杆

1. 选择相同的 "Move" Action
2. 点击 +并选择 `Add Binding`
3. 在路径中选择 `Gamepad > Left Stick`

> 多设备支持：通过为同一动作添加多个绑定，同一代码可同时用于键盘和游戏手柄。

## 生成 C# 类（推荐）

您可以从输入操作资产中自动生成一个类型安全的类。

1. 在项目窗口中选择 `Input Actions Asset`
2. 在检查器中选中生成 C# 类
3. 设置类名（如 PlayerInputActions)
4. 可选择设置命名空间
5. 点击应用

这样就生成了 PlayerInputActions.cs，可以用 new PlayerInputActions()对其进行实例化。

## 脚本实施

### 选择正确的方法

| 方法 | 最佳实践 |
| --- | --- |
| Player Input + Unity 事件 | 小项目、原型开发、非程序员需要修改设置时 |
| C# 类生成 | 中大型项目、类型安全措施、复杂输入操作 |

### 1. 玩家输入 + Unity 事件

通过播放器输入组件，您可以将 "Actions" 链接到 "Inspector" 中的方法。

- 配置 `Player Input` 组件

1. 为游戏对象添加一个 `Player Input` 组件
2. 将 `Actions` 设置为 `Input Actions Asset`
3. 将 `Behavior` 改为 `Unity Events`
4. 出现 `Events` 部分
5. 为每个行动注册方法

```c#
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour
{
    private Vector2 moveInput;

    public void OnMove(InputAction.CallbackContext context)
    {
        moveInput = context.ReadValue<Vector2>();
    }

    public void OnJump(InputAction.CallbackContext context)
    {
        if (context.performed)
        {
            Debug.Log("Jump!");
        }
    }
}
```

### 2. C# 类生成（推荐）


```c#
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour
{
    private PlayerInputActions inputActions;
    private Vector2 moveInput;

    void Awake()
    {
        inputActions = new PlayerInputActions();
        inputActions.Player.Move.performed += OnMove;
        inputActions.Player.Move.canceled += OnMove;
        inputActions.Player.Jump.performed += OnJump;
    }

    void OnEnable() => inputActions.Enable();
    void OnDisable() => inputActions.Disable();

    void OnDestroy()
    {
        // Unsubscribe event handlers (prevent memory leaks)
        inputActions.Player.Move.performed -= OnMove;
        inputActions.Player.Move.canceled -= OnMove;
        inputActions.Player.Jump.performed -= OnJump;
        inputActions.Dispose();
    }

    private void OnMove(InputAction.CallbackContext context)
    {
        moveInput = context.ReadValue<Vector2>();
    }

    private void OnJump(InputAction.CallbackContext context)
    {
        Debug.Log("Jump!");
    }
}
```

>防止内存泄漏：在 OnDestroy中用 -=取消订阅事件处理程序，并调用 Dispose()以防止对象销毁时内存泄漏。

### 切换 Action Maps

您可以在游戏操作和用户界面操作之间切换活动 `Action Maps`。

```c#
public class InputManager : MonoBehaviour
{
    private PlayerInputActions inputActions;

    void Awake()
    {
        inputActions = new PlayerInputActions();
    }

    // During gameplay: Enable Player map, Disable UI map
    // 游戏进行中：开启 玩家 映射，关闭 界面 映射
    public void EnableGameplayInput()
    {
        inputActions.Player.Enable();
        inputActions.UI.Disable();
    }

    // During UI interaction: Enable UI map, Disable Player map
    // 界面交互阶段：开启 UI 映射，关闭 玩家 映射
    public void EnableUIInput()
    {
        inputActions.Player.Disable();
        inputActions.UI.Enable();
    }
}
```

> 用例示例：打开暂停菜单时切换至「UI 输入映射表」，关闭菜单时切回「玩家输入映射表」。该机制可避免玩家在操作菜单时角色发生移动。

## 交互规则与输入处理器

### 交互规则

| 规则 | 案例 |
| --- | --- |
| Hold | 长按开火 |
| Tap | 检测轻触操作 |
| Multi Tap | 检测连续点击，如双击 |

### 输入处理器

| 处理器 | 描述 |
| --- | --- |
| Normalize | 对向量进行归一化处理(修正对角线移动速度) |
| Invert | 反转输入值 |
| Scale | 缩放输入值 |
| Dead Zone | 忽略小于指定阈值的输入值 |

## 设备连接/断开检测

您可以检测设备状态变化，例如插入和拔出游戏手柄。

```c#
using UnityEngine;
using UnityEngine.InputSystem;

public class DeviceManager : MonoBehaviour
{
    void OnEnable()
    {
        InputSystem.onDeviceChange += OnDeviceChange;
    }

    void OnDisable()
    {
        InputSystem.onDeviceChange -= OnDeviceChange;
    }

    void OnDeviceChange(InputDevice device, InputDeviceChange change)
    {
        switch (change)
        {
            case InputDeviceChange.Added:
                Debug.Log($"Device connected: {device.displayName}");
                break;
            case InputDeviceChange.Removed:
                Debug.Log($"Device disconnected: {device.displayName}");
                break;
        }
    }
}
```

> 用例示例在游戏手柄断开连接时显示暂停屏幕，或在连接游戏手柄时显示 "检测到控制器 "通知。

## 常见问题和故障排除

### 输入无响应

- 验证 `inputActions.Enable()` 在 `OnEnable` 中被调用
- 检查是否已启用 **Action Map**
- 验证 **Bindings** 配置是否正确
- If not included in the build: 检查输入操作资产设置 (见下文)

### Input Actions Asset 未被打包进构建程序

要在构建程序中包含 `Input Actions Asset`, 请使用以下方法之一：

1. 通过「Player Input组件」建立引用：将该资源引用至挂载在游戏对象上的 `Player Input` 组件中
2. 从脚本引用 - 用 `[SerializeField]` 引用资产
3. 注册为可寻址资产 - 将其作为可寻址资产进行管理

> 注意：输入系统 1.1 及更早版本中的 "预加载 "复选框已被弃用（Unity 2021+）。使用上述方法之一引用资产。

### 移动不停歇

同时注册 canceled事件：

```
inputActions.Player.Move.performed += OnMove;
inputActions.Player.Move.canceled += OnMove;
```

> 为什么可以使用相同的方法？当 `canceled` 事件触发时，`context.ReadValue<Vector2>()` 会自动返回 `Vector2.zero`。因此，在 `performed` 和 `canceled` 中使用相同的 `OnMove` 方法可以在没有输入时正确设置 `Vector2.zero`。

### 对角线移动太快

- 将合成绑定模式设置为 `Digital Normalized` 模式
- 或添加 `Normalize Vector 2` 处理器

## 总结

新输入系统的学习曲线比较陡峭，但其强大的功能使其物有所值。

- 独立于设备的输入操作
- 用于上下文相关输入切换的操作图
- 为多个设备分配相同操作的绑定
- 仅通过配置就能实现复杂输入模式的交互和处理器
- 类型安全实施的 C# 类生成

从简单的动作和跳跃开始，然后逐步增加更复杂的功能。

## 文献资料

- [Unity 文档 - 输入系统](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest)
- [统一手册 - 输入系统](https://docs.unity3d.com/Manual/com.unity.inputsystem.html)
