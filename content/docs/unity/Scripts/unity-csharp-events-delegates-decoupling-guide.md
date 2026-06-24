---
title: Unity C# 设计模式：使用事件和委托实现代码解耦
description: 过度使用 GetComponent 和 FindObjectOfType 会使代码变得复杂且脆弱。学习使用 C# 强大的委托和事件来打破对象依赖关系，并设计松耦合、可扩展、可重用的系统。
created: 2026-06-22T18:04:00
---

## 概述

随着游戏开发的进行，对象间的通信变得越来越复杂。例如：“当玩家受到伤害时，更新用户界面上的生命条，通过音频管理器播放一声尖叫，晃动镜头，并通知游戏管理器玩家已死亡。”

这种简单的实现方式是让玩家脚本直接引用 UIManager、 AudioManager、 CameraManager和 GameManager，并调用它们的方法。但这种方法（ 紧耦合 ）存在很多问题：

- **复杂的依赖关系**: 播放器脚本假定了解 UI、音频和其他它本不应该了解的系统。
- **扩展性差**: 添加“成就通知系统”需要修改玩家脚本。
- **可重用性差**: 将此玩家系统重用于敌人会带来不必要的 UI 和摄像机依赖性。

解决这些问题并编写简洁、可扩展代码的强大机制是使用 C# 的委托和事件进行事件驱动设计 。

核心理念：将 `宣布事件发生的一方` 与 `事件发生后想要采取行动的一方` 完全分开。玩家只需喊出“我受伤了！”——无需知道谁在听。用户界面和音频会听到这声喊叫，并各自执行相应的功能。

## 什么是委托(Delegates)

**委托**本质上是 `可以保存方法引用的类型`. 它类似于 C/C++ 的函数指针，但更安全、更面向对象。委托允许你像传递变量一样传递方法，将它们传递给其他方法，或者将它们存储在类字段中。

```c#
// First, define the delegate "type"
// 首先，定义委托“类型”
// This defines "a method type with void return and one int parameter"
// 这定义了“一个无返回值、仅有一个整型参数的方法类型”
public delegate void MyDelegate(int number);

public class DelegateExample
{
    public void Run()
    {
        // Assign a method to delegate variable
        // 为委托变量分配方法
        MyDelegate myDelegate = PrintNumber;
        // Multicast delegate: register multiple methods
        // 多播委托：注册多个方法
        myDelegate += PrintDoubleNumber;

        // Invoke delegate (all registered methods are called)
        // 调用委托（执行所有已注册的方法）
        myDelegate(5);
        // Output:
        // Number: 5
        // Double Number: 10
    }

    void PrintNumber(int num) { Debug.Log($"Number: {num}"); }
    void PrintDoubleNumber(int num) { Debug.Log($"Double Number: {num * 2}"); }
}
```

## 什么是事件(Events)

委托功能强大，但 `public` 委托变量可以从外部自由调用(`myDelegate(5)`)或清除(`myDelegate = null`)——封装性差。

事件封装了委托, 将外部访问限制为仅允许订阅`+=`和取消订阅`-=` 。事件调用只能在声明类内部进行。这实现了安全的通知模式。

## Unity 实践案例：解耦式健康系统

让我们用事件驱动设计来实现玩家生命值系统。

1. 事件发布器 (PlayerHealth.cs)

`PlayerHealth` 会将伤害和死亡作为事件通知玩家。该类不涉及用户界面或音频。

```c#
using System;
using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    // Event definitions
    // 定义事件
    // Action<T> is a convenient delegate type built into .NET/Unity
    // Action<T> 是 .NET/Unity 内置的一种便捷委托类型
    // Args: current health, max health
    // 参数：当前生命值、最大生命值
    public static event Action<int, int> OnHealthChanged; 
    public static event Action OnPlayerDied;

    public int maxHealth = 100;
    private int currentHealth;

    private void Start()
    {
        currentHealth = maxHealth;
    }

    public void TakeDamage(int damage)
    {
        currentHealth -= damage;
        if (currentHealth < 0) currentHealth = 0;

        // Publish event (subscribers get notified)
        // 发布事件（订阅者将收到通知）
        // ?.Invoke() is safe call that prevents NullReferenceException when no subscribers
        // ?.Invoke() 是安全调用，在无订阅者时可避免空引用异常
        OnHealthChanged?.Invoke(currentHealth, maxHealth);

        if (currentHealth <= 0)
        {
            OnPlayerDied?.Invoke();
        }
    }
}
```

2. 事件订阅者(UIManager.cs、AudioManager.cs)

`UIManager` 和 `AudioManager` 订阅 `PlayerHealth` 事件，并在收到通知时执行各自的处理。

```c#
// UIManager.cs
using UnityEngine;
using UnityEngine.UI; // Required for Text

public class UIManager : MonoBehaviour
{
    public Text healthText;
    
    // When object becomes active
    // 对象激活时
    private void OnEnable()
    {
        // Subscribe to PlayerHealth event
        // 订阅玩家生命值事件
        PlayerHealth.OnHealthChanged += UpdateHealthUI;
    }

    // When object becomes inactive
    // 当对象变为非激活状态
    private void OnDisable()
    {
        // Always unsubscribe (prevents memory leaks)
        // 务必取消订阅（避免内存泄漏）
        PlayerHealth.OnHealthChanged -= UpdateHealthUI;
    }

    private void UpdateHealthUI(int current, int max)
    {
        healthText.text = $"HP: {current} / {max}";
    }
}
```

```c#
// AudioManager.cs
public class AudioManager : MonoBehaviour
{
    private void OnEnable()
    {
        PlayerHealth.OnPlayerDied += PlayDeathSound;
    }

    private void OnDisable()
    {
        PlayerHealth.OnPlayerDied -= PlayDeathSound;
    }

    private void PlayDeathSound()
    {
        // Play death sound processing
        // 播放死亡音效处理
    }
}
```

使用 `static` 事件可以按类名订阅而无需实例引用，从而使管理类能够轻松地进行通信而无需单例。

## 总结

事件驱动设计是一种编写简洁、可扩展的 Unity 代码的基本而强大的技术。

- 通过直接引用实现的紧耦合使得代码难以修改和重用。
- 委托是`方法引用`；事件是`安全委托包装器`。
- 发布者只需声明“发生了什么”，他们不需要了解订阅者的情况。
- 订阅者可以订阅(`+=`)感兴趣的活动，并且在完成后必须取消订阅(`-=`)。
- 这种模式能够实现独立、松耦合、可扩展的系统设计。

在使用 GetComponent或 FindObjectOfType查找其他对象之前，先问问自己：`这是否可以通过事件通知` 养成这种习惯会让你的代码达到专业水平。

