---
title: 面向 Unity 开发人员的 C# 基础知识 - 基本要素
description: C# 是支持 Unity 游戏的语言。本文介绍了每个 Unity 初学者都应了解的 C# 基本知识：变量、数据类型、函数和控制流语句。
created: 2026-06-16T11:38:00
---

## 概述

C#("C-sharp") 是用于在 Unity 中编写游戏逻辑的编程语言。了解 C# 基础知识对于掌握 Unity 至关重要。但是，一下子学习 C# 的所有知识可能会让初学者不知所措。

本文重点介绍在 Unity 中编写脚本所需的 C# 基本知识：变量、数据类型、函数以及 if 和 for 循环等基本控制流语句。目的是让您能够自如地在 Unity 中编写简单的逻辑。

## 变量和数据类型

变量就像一个 "方框"，用来存放数字或文本等数据。在 C# 中，您必须明确指定数据类型，以表明该方框将保存何种数据。

让我们来看看 Unity 中常用的基本数据类型：

| 数据类型 | 说明 | 示例 |
| --- | --- | --- |
| int | 整数类型 | int playerScore; |
| float | 浮点数, 在数字后假声 `f` | float speed = 5.5f; |
| bool | 布尔值 | bool isGameOver = false; |
| string | 文本字符串, 用双括号括起来 | string playerName = "Hero"; |
| Vector3 | 三维向量(x, y, z坐标) 代表位置和方向 | Vector3 startPosition = new Vector3(0, 1, 0); |
| GameObject | Unity 的游戏对象本身 | public GameObject playerObject; |

### 声明和使用变量

变量用 `[DataType] [variableName];` 声明，用 `=` 赋值。

```c#
using UnityEngine;

public class VariableExample : MonoBehaviour
{
    // 变量声明
    int health;         // Health (integer)
    float moveSpeed;    // Movement speed (decimal)
    bool isJumping;     // Is jumping? (boolean)

    void Start()
    {
        // 给变量赋值
        health = 100;
        moveSpeed = 7.5f;
        isJumping = false;

        // 在控制台输出变量值
        Debug.Log("Health: " + health);
        Debug.Log("Move Speed: " + moveSpeed);
    }
}
```

### 公共变量

在变量前添加 `public` 关键字可使其在 Unity 的 Inspector 窗口中可见，从而允许非程序员调整数值。这对于调整游戏平衡非常有用。

```c#
using UnityEngine;

public class PlayerSettings : MonoBehaviour
{
    // Public variables appear in Inspector
    // 公共变量会在检视面板中显示
    public string playerName = "Default Name";
    public float jumpPower = 10f;
    public int maxHealth = 200;
}
```

## 函数 / 方法

函数（或方法）是一组打包的操作。通过定义函数，您可以多次调用和重复使用相同的操作。

C# 函数的定义如下:

`[ReturnType] [FunctionName]([Parameters]) { ...code... }`

- ReturnType: 返回类型。函数完成后返回值的数据类型。如果没有返回值，则使用 `void`。
- FunctionName: 函数名称。使用描述性名称，说明函数作用。
- Parameters: 参数。传递给函数的信息，多个参数之间使用逗号分隔。如果不需要，则留空。

```c#
using UnityEngine;

public class FunctionExample : MonoBehaviour
{
    void Start()
    {
        // Call a function
        // 调用一个函数
        SayHello();

        // Call a function with arguments and receive return value
        // 调用一个携带参数和返回值的函数
        int result = Add(10, 5);
        Debug.Log("10 + 5 = " + result);
    }

    // Function with no parameters or return value
    // 没有参数和返回值的函数
    void SayHello()
    {
        Debug.Log("Hello!");
    }

    // Function that takes two int parameters and returns an int
    // 携带两个 int 类型的参数和返回 int 类型的函数
    int Add(int a, int b)
    {
        int sum = a + b;
        // Return value using the return keyword
        // 使用 return 关键字返回值
        return sum;
    }
}
```

Unity 的 `Start` 和 `Update` 是 Unity 引擎在特定时间调用的特殊函数类型。

## 控制流语句

控制流语句控制着程序的流程。下面我们将介绍最基本的控制流语句： `if` 和 `for` 。

### if语句（条件分支）

`if` 语句根据条件在代码中创建分支："如果 X 为真，则执行 Y"。

```c#
int score = 85;

if (score >= 80)
{
    Debug.Log("Excellent!");
}
else if (score >= 60)
{
    Debug.Log("You passed.");
}
else
{
    Debug.Log("Try harder next time.");
}
```

### for循环（迭代）

`for` 循环重复相同操作的指定次数。

```c#
// Repeat 10 times, from 0 to 9
// 重复10次，从0到9
for (int i = 0; i < 10; i++)
{
    Debug.Log("Current count: " + i);
}
```

例如，这可用于同时生成多个敌方角色。

## 总结

在本文中，我们介绍了开始在 Unity 中编写脚本所需的 C# 基础知识。

- Variables: 变量。存放数据的盒子。`int`, `float`, `bool`, `string` 是基本变量。
- Functions: 函数。分组操作。`void` 表示无返回值。
- `if`语句: 根据条件分支代码
- `for`循环: 重复操作。

这些元素构成了所有脚本的基础。一开始可能会觉得很难，但当您练习在 Unity 中编写简单的脚本时，这些概念就会变得自然而然。首先，将这些基础知识作为工具，为您的游戏添加简单的行为和规则。
