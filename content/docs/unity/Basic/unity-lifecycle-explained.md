---
title: Unity 生命周期完整指南 - 唤醒、启动和更新执行顺序
description: 了解 Unity 脚本的执行时间和顺序至关重要。为初学者讲解唤醒、启动和更新等关键事件功能的作用和区别。
created: 2026-06-16T16:32:00
---

## 概述

了解脚本（C# 代码）的执行时间和顺序对 Unity 游戏开发至关重要。这个顺序被称为 "生命周期"。正确理解 "生命周期 "可让您按照预期实现对象初始化和更新逻辑，从而提高开发效率并减少错误。

本文重点介绍 Unity 生命周期中最重要的事件函数-- Awake、 Start、 Update、 FixedUpdate、 LateUpdate--解释它们的作用、执行顺序和有效用法。

## 生命周期事件概述

Unity 脚本具有 "事件函数"，可在特定事件发生时自动调用。这些函数按照规定的顺序执行，从对象加载到场景开始，直到对象被销毁为止。主要事件函数的执行顺序如下

1. **初始化**
    - `Awake()`: 对象加载后立即调用一次。在任何其他函数之前执行。
    - `OnEnable()`: 对象激活时调用。
    - `Start()`: 在第一帧的 `Update()` 之前调用一次。在 `Awake()` 之后执行。
2. **Physics**
    - `FixedUpdated()`: 以固定时间间隔调用。适用于物理计算。
3. **GameLogic**
    - `Update()`: 每帧调用一次。在此编写主要游戏逻辑和输入处理。
    - `LateUpdate()`: 在所有 `Update()` 功能完成后，每帧调用一次。用于摄像机跟踪等。
4. **Rendering**
    - `OnRenderObject()`: 与对象渲染相关的处理。
5. **Teardown 拆卸**
    - `OnDisable()`: 当对象处于非活动状态时调用。
    - `OnDestroy()`: 在对象被销毁前调用。

## 关键事件功能详解

### 初始化: `Awake()` 和 `Start()`

`Awake()` 和 `Start()` 都用于初始化，但在时间上有重要区别。

| 功能 | 执行时间 | 主要用途 |
| ---- | ------ | ------ |
| `Awake()` | 紧随脚本实例加载之后。总是在 `Start()`之前 | 获取自己的组件引用；初始化不依赖于其他对象 |
| `Start()` | 就在第一帧的 `Update()` 之前, `Awake()` 之后 | 假定其他对象的 `Awake()` 已完成初始化 |

最重要的是，所有对象的 Awake()都会在调用任何对象的 Start()之前完成。因此，在脚本间传递引用时，应确保 `Awake()` 中的引用安全，并在 `Start()` 中使用它们进行处理。

```c#
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    private Rigidbody rb;
    private GameManager gameManager;

    // Get own components in Awake
    // 在Awake函数中获取自身组件
    void Awake()
    {
        rb = GetComponent<Rigidbody>();
        Debug.Log("Awake: Got Rigidbody.");
    }

    // Processing that assumes other objects are initialized goes in Start
    // 假定其他对象已完成初始化的处理逻辑放置于启动环节中
    void Start()
    {
        gameManager = FindObjectOfType<GameManager>();
        gameManager.RegisterPlayer(this);
        Debug.Log("Start: Registered player with GameManager.");
    }
}
```

## 更新: `Update()` vs `FixedUpdate()` vs `LateUpdate()`

这些功能每帧或以类似频率被调用，但有不同的目的。

| 功能 | 执行时间 | 主要用途 |
| ---- | ------ | ------ |
| `FixedUpdate()` | 紧随脚本实例加载之后。总是在 `Start()`之前 | 获取自己的组件引用；初始化不依赖于其他对象 |
| `Update()` | 每帧间隔随帧速率而变化。 | 输入处理、基于时间的移动、一般游戏逻辑 |
| `LateUpdate()` | 在所有 `Update()` 完成后调用 | 摄像机跟随、角色 IK（逆运动学）等 |

`FixedUpdate()` 与物理引擎的更新时序同步，因此向 Rigidbody 施加力等物理操作必须在这里进行. `Update()` 称为每帧，适用于与物理不直接相关的输入检测和视觉更新。乘以 Time.deltaTime可实现与帧速率无关的移动

`LateUpdate()` 用于在所有其他对象的 `Update()` 移动完成后进行处理。例如，玩家角色在 `Update()` 中移动后，摄像机在 `LateUpdate()` 中跟随移动。这样可以防止摄像机移动时出现卡顿

```c#
using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Transform target;
    public Vector3 offset;

    // Update camera position after target movement completes
    // 目标移动完成后更新摄像机位置
    void LateUpdate()
    {
        if (target != null)
        {
            transform.position = target.position + offset;
        }
    }
}
```

## 性能因素考虑

`Update()` 和 `FixedUpdate()` 的调用频率非常高，因此这些函数的大量处理会严重影响游戏的整体性能。有经验的开发人员经常提出的问题：

- **避免过度使用 `Update()`**: 分离不需要每帧运行的处理。例如，使用事件驱动设计或例程进行条件处理。
- **缓存 `GetComponent`**: 在 `Update()` 中调用 `GetComponent<T>()` 效率极低。在 `Awake()` 或 `Start()` 中检索一次所需的组件，并将其存储（缓存）在变量中
- **自定义 `Update` 管理器**: 当成百上千个对象都有 `Update()` 时，Unity 本机代码和 C# 之间的调用开销就会成为问题。创建一个单例类（自定义`Update`管理器）来管理更新处理并调用每个对象的更新方法，可以提高性能。

## 总结

了解 Unity 的生命周期是所有 Unity 开发人员（从初学者到专业人员）的必备知识。了解每个事件函数的调用时间和原因，可以让您编写出更可靠、性能更好的代码。

- `初始化`: 在 `Awake()` 中做好准备，在 `Start()` 中开始与其他对象协调。
- `Updates`: 物理在 `FixedUpdate()` 中，输入/逻辑在 `Update()` 中，后续处理在 `LateUpdate()` 中。
- **性能**: 避免在 Update()中进行大量处理，持续缓存组件。

掌握这些基础知识，向高效的 Unity 开发迈出第一步。
