---
title: Unity 调试基础 - Debug.Log 和错误处理
description: Bug 是朋友，不是敌人！学习 Unity 最基本的调试技巧：使用 Debug.Log、解读常见错误信息以及使用调试器进行高级调试。
created: 2026-06-23T13:53:00
---

## 概述

编程中出现 bug 是不可避免的。无论你编写的代码多么细致，都会出现意料之外的错误和非预期行为。优秀的开发者并非那些从不编写 bug 的人，而是那些能够高效地找到并修复 bug 的人。这个查找 bug 的过程就叫做调试 。

Unity 提供了多种强大的调试工具。本文涵盖了每个初学者都应该了解的基础知识：最简单的调试方法 `Debug.Log`、解读 Unity 控制台的错误信息，以及调试器的基本用法，以便进行更高级的调试。

## 最简单的调试工具: `Debug.Log()`

`Debug.Log()`会将指定的消息输出到 Unity 编辑器的控制台窗口。这是确认特定代码段是否执行以及检查该处变量值的最简单有效的方法。`


```C#
using UnityEngine;

public class DebugExample : MonoBehaviour
{
    private int score = 0;

    void Start()
    {
        // Output message when game starts
        // 游戏启动时输出的提示信息
        Debug.Log("Game has started.");
    }

    void Update()
    {
        // Check if button was pressed
        // 检查按钮是否按下
        if (Input.GetKeyDown(KeyCode.Space))
        {
            score += 10;
            // Output current score variable value
            // 输出当前分数变量的值
            Debug.Log("Space key pressed. Current score: " + score);
        }
    }
}
```

在 Unity 编辑器中，通过 `Window > General > Console`打开控制台窗口。

### `Debug.LogWarning()` 和 `Debug.LogError()`

Debug类针对不同的消息严重级别有不同的变体：

- `Debug.LogWarning()`: 输出警告信息（黄色图标）。用于非错误但值得注意的情况（例如，未设置选项）。
- `Debug.LogError()`: 输出错误信息（红色图标）。用于阻止程序正常执行的严重问题。

正确使用这些功能可以整理控制台日志，并有助于快速评估问题的严重程度。

## 解读错误信息

当程序出现问题时，Unity 会在控制台中显示红色错误信息。虽然这些信息对初学者来说可能难以理解，但它们包含解决问题的重要提示。

### 常见错误： NullReferenceException

这种错误被称为 `空指针异常`, 是最常见的错误之一。当`试图访问不存在（空）对象的方法或属性`时，就会发生这种情况。

常见原因：

- `GetComponent<T>()`尝试获取一个实际上并未附加的组件。
- 应该在检查器中设置的 `public` 变量为空。

```C#
// Example: Trying to access Rigidbody that isn't attached
// 示例：尝试访问未挂载的刚体组件
public class NullRefExample : MonoBehaviour
{
    private Rigidbody rb;

    void Start()
    {
        // rb gets nothing assigned here
        // rb在此处未分配任何值
    }

    void FixedUpdate()
    {
        // rb is null, so NullReferenceException occurs here
        // rb为空，因此此处触发空引用异常
        rb.AddForce(Vector3.up);
    }
}
```

> **解决方案**: 双击错误信息跳转到相应的代码行。使用 Debug.Log或 if (variable != null)检查该行使用的变量是否为 null以确定原因。

## 使用调试器执行单步操作

`Debug.Log`很方便，但有时您需要暂停程序执行，并观察该时刻所有变量的状态。**调试器**可以实现这种高级调试功能。

Visual Studio 和 Rider 等代码编辑器都内置了与 Unity 集成的调试器。

基本用法：

1. 设置断点: 在编辑器中单击代码行的左侧，即可设置一个红色圆圈（断点）。
2. 连接到 Unity: 按下 `连接到 Unity` 按钮（通常是一个播放按钮图标）将调试器连接到 Unity 编辑器。
3. 运行游戏: 在 Unity 编辑器中运行游戏。
4. 执行暂停: 当程序执行到断点行时，程序会在那里停止。
5. 检查变量和单步执行: 程序停止时，调试窗口会显示变量值。使用`单步跳过`(前进一行)或`单步进入`(进入函数)逐行跟踪程序流程。

掌握调试器需要练习，但它是解决复杂错误的终极武器。

## 总结

调试是一个反复试验的过程。不要害怕错误——把它们当作解决问题的线索。

- **积极使用`Debug.Log`**: 随时检查变量值和执行流程。
- **仔细阅读错误信息**: 它们就像藏宝图，显示了问题的类型和位置。
- **注意 `NullReferenceException`**：始终注意对象和组件是否已正确设置/检索。
- **尝试使用调试器**: 遇到复杂问题时，可以查看程序执行情况。

培养这些调试技能可以显著提高开发速度和质量。