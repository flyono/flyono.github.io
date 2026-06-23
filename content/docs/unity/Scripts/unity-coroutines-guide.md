---
title: 掌握 Coroutines - Unity 的异步处理
description: 需要等待几秒钟再恢复？想要跨帧分割繁重的处理过程？初学者可通过 IEnumerator 和 yield return 学习 Unity 强大的 Coroutine 功能。
created: 2026-06-18T17:16:00
---

## 概述

在 Unity 中开发游戏时，您会经常遇到以下情况："3 秒后生成一个敌人"、"按下按钮时淡出 "或 "在多个帧中分割重载以防止冻结"。

使用常规函数实现这种基于时间或繁重的处理变得非常复杂。Unity 提供了 "协程"（Coroutines）--一种强大的功能，使编写类似异步处理的程序变得异常简单。本文将重点介绍 `IEnumerator` 和 `yield return`关键字，介绍协程的基本原理。

## 什么是 `Coroutines`

协程是一种特殊函数，可以暂时停止执行，然后在特定时间恢复执行。普通函数一旦被调用就必须执行完毕，而协程可以在执行过程中通过 "下一帧继续 "或 "5 秒后继续 "等指令将控制权返回给 Unity。

这样就能直观地实现基于时间的事件和处理分割，而不会使 `Update` 函数复杂化。

## 协程基础

执行协程需要三个要素:

1. **返回`IEnumerator` 类型的函数**: 这是 `Coroutine` 主体。`IEnumerator` 是一个标准的 C# 接口, 意思是"可枚举".
2. `yield return`: 暂停执行协程程序并将控制权返回给 Unity 的关键字。在此之后指定恢复条件.
3. `StartCoroutine()`: 启动 `Coroutine` 的方法.

### Time-Waiting Coroutine

最基本的用法是等待指定时间后再继续。使用 `yield return new WaitForSeconds(float seconds)`

```C#
using System.Collections;
using UnityEngine;

public class CoroutineExample : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Starting coroutine.");
        // Start coroutine using method name as string
        // 使用函数名称开启协程
        StartCoroutine("WaitAndPrint");
    }

    // Define coroutine as IEnumerator-returning function
    // 将协程定义为返回 IEnumerator 的函数
    IEnumerator WaitAndPrint()
    {
        // Pause execution for 3 seconds
        // 暂停执行3s
        yield return new WaitForSeconds(3.0f);

        // Execution resumes here after 3 seconds
        // 3s后继续执行
        Debug.Log("3 seconds have passed!");
    }
}
```

运行该脚本后，会立即显示 "Starting coroutine."，然后在三秒后显示 "3 seconds have passed!"。 `Start` 函数在启动 coroutine 后立即完成，但 coroutine 会继续在后台等待，并在指定时间过后恢复。

### 使用 `yield return` 的各种暂停条件

除了 `WaitForSeconds` 之外，在 `yield return`之后还可以出现各种暂停/恢复条件:

| `yield return` 之后 | 恢复计时 |
| --- | --- |
| null | 在调用下一帧的 `Update()` 之前恢复执行 |
| `new WaitForEndOfFrame()` | 帧渲染完成后立即恢复(该帧结束) |
| `new WaitForFixedUpdate` | 在调用下一帧的 `FixedUpdate()` 之前恢复执行 |
| `StartCoroutine(AnotherCoroutine())` | 在其他协程完全完成后继续运行。启用嵌套程序 |

`yield return null;`  通常用于拆分高负载处理任务

```C#
IEnumerator HeavyProcess()
{
    for (int i = 0; i < 10000; i++)
    {
        // Heavy calculation
        // 复杂计算
        DoSomethingHeavy(i);

        // Wait 1 frame every 100 iterations
        // 每一百次循环等待一帧
        if (i % 100 == 0)
        {
            Debug.Log(i + " iterations processed. Taking a 1-frame break.");
            yield return null; // Pause here, resume next frame
            // 这里暂停，下一帧恢复
        }
    }
}
```

## 停止协程

已启动的例行程序可以在执行过程中停止。要停止一个例程，可将 `StartCoroutine`的返回值保存在 `Coroutine` 变量中，并将其传递给 `StopCoroutine`

```C#
using System.Collections;
using UnityEngine;

public class StoppableCoroutine : MonoBehaviour
{
    private Coroutine myCoroutine;

    void Start()
    {
        Debug.Log("Starting coroutine that executes something in 10 seconds.");
        myCoroutine = StartCoroutine(LongProcess());
    }

    void Update()
    {
        // Stop coroutine when C key is pressed
        // 当按下 C 键时停止协程
        if (Input.GetKeyDown(KeyCode.C))
        {
            if (myCoroutine != null)
            {
                Debug.Log("Coroutine cancelled.");
                StopCoroutine(myCoroutine);
                myCoroutine = null; // Clear reference after stopping for safety
                // 停止协程后安全的清空引用
            }
        }
    }

    IEnumerator LongProcess()
    {
        yield return new WaitForSeconds(10f);
        Debug.Log("10 seconds passed! Processing executed.");
    }
}
```
`StopAllCoroutines()`同时停止该脚本上所有正在运行的 `Coroutines`

## 总结

在 Unity 中，协程是异步处理的基础--掌握了协程，就能简单编写富有表现力的逻辑。

- 协程是可以暂停和恢复执行的特殊函数。
- 返回 `IEnumerator`，用 `yield return` 暂停。
- 以 `StartCoroutine()` 开始，以 `StopCoroutine()`停止。
- `new WaitForSeconds(t)` 表示时间等待， `null` 表示 1 帧等待，这些都是最基本的。

基于时间的特效、AI 逻辑循环、拆分高负载运算 —— 协程的应用场景数不胜数。先从简单的延时等待入手，感受它的便捷之处。