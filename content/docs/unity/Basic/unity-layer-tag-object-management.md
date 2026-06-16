---
title: 掌握图层和标签：Unity 中的智能对象分类和管理
description: 学习如何区分层（Layers）和标签（Tag）、控制碰撞检测，以及使用 LayerMask 优化光线投射以实现有效的对象管理。
created: 2026-06-16T15:19:00
---

## 概述

随着 Unity 游戏开发的进展，场景中的 GameObjects 数量会迅速增加。玩家、敌人、物品、地形、用户界面元素--当成百上千的对象共存时，您经常会遇到以下问题：

1. 性能下降：所有物体之间都会进行不必要的物理计算（碰撞检测），从而降低处理速度。
2. 搜索效率低下：从脚本中查找特定类型的对象（如所有敌人）需要花费时间。
3. 渲染复杂性：摄像机会尝试渲染不该渲染的物体。

为了解决这些问题，提高开发效率和游戏性能，Unity 提供了强大的对象分类和管理功能，即标签和层。

本文结合具体代码示例，从基本概念到碰撞检测控制和高效对象搜索等实用技术，介绍了专业的 Unity 开发人员如何区分标签和层。

## Tags: 作为对象 "标识符 "使用

标签是可以附加到游戏对象上的识别标签。它们最常用于从脚本中轻松查找特定类型的对象。

### 基本标签用法

要设置标签，请从检查器顶部的下拉菜单中选择现有标签，或从 "添加标签... "中创建新标签。

标签的最大优势在于能够非常直观地从脚本中搜索对象。

```c#
using UnityEngine;

public class TagSearchExample : MonoBehaviour
{
    void Start()
    {
        // Search for one object with "Player" tag in the scene
        // 在场景中查找一个带有“Player”标签的物体
        GameObject player = GameObject.FindWithTag("Player");
        if (player != null)
        {
            Debug.Log("Found player object: " + player.name);
        }

        // Search for all objects with "Enemy" tag in the scene
        // 在场景中查找所有带有“Enemy”标签的物体
        GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
        Debug.Log("Total enemies: " + enemies.Length);
    }

    // Example of identifying the other object using tag during collision
    // 碰撞过程中借助标签识别另一物体的示例
    private void OnTriggerEnter(Collider other)
    {
        // If the collided object's tag is "DamageZone"
        // 如果发生碰撞的物体标签为“DamageZone”
        if (other.gameObject.CompareTag("DamageZone"))
        {
            Debug.Log("Entered a damage zone!");
            // Reduce player HP here, etc.
            // 在此处降低玩家生命值，等等。
        }
    }
}
```

GameObject.FindWithTag()搜索整个场景，因此频繁调用会影响性能。在 Start()或 Awake()中搜索一次并缓存（存储在变量中）结果；避免在每一帧的 Update()中使用它。

## Layers: 用于功能 "分组

层与标签不同，主要用于功能控制。最重要的两个用途是

1. 物理计算（碰撞检测）控制：您可以设置特定图层忽略相互之间的碰撞。
2. 摄像机渲染控制：您可以设置摄像机只渲染特定图层对象，或者反过来不渲染这些对象。

### 用图层优化碰撞检测

层的最强大用途是碰撞检测控制。例如，如果 "背景对象 "和 "背景对象 "之间的碰撞是不必要的，那么将它们设置为同一图层并禁用碰撞，就可以大大减少物理计算负荷。

1. 创建图层：在 `Edit-> Project Settings -> Tags and Layers` 中创建一个新图层（如 Background）。
2. 应用于对象：将 `Background` 图层应用于背景对象。
3. 禁用碰撞：打开 `Edit-> Project Settings-> Physics（或 Physics 2D）`，在图层碰撞矩阵中取消选中 Background和 Background相交处的复选框。

| Layer | Default | Player | Enemy | Background |
| ------- | ---- | ---- | ---- | ---- |
| Default | √ | √ | √ | √ |
| Player | √ | √ | √ | √ |
| Enemy | √ | √ | √ | √ |
| Background | √ | √ | √ | Uncheck |

在此设置下，属于 Background层的对象即使相互接触，也不会执行物理碰撞检测。

### 使用图层掩码优化光线投射

在执行 Raycast（通过投射射线检测碰撞）时，层也非常重要。使用 `"层掩码"（LayerMask）`可以只针对属于特定层的对象执行 Raycast，从而跳过不必要的检查并加快处理速度。

```c#
using UnityEngine;

public class RaycastExample : MonoBehaviour
{
    // Declare as public variable so it can be set from Inspector
    // 声明为公共变量，以便可在检视面板中对其赋值
    public LayerMask targetLayer;

    void Update()
    {
        // Cast ray forward
        // 向前投射光线
        Ray ray = new Ray(transform.position, transform.forward);
        RaycastHit hit;

        // Execute Raycast. Specify LayerMask as third argument
        // Here, only objects on layers set in targetLayer will be detected
        // 执行光线投射。将层级遮罩设为第三个参数
        // 此处仅会检测处于目标层级所设置层级内的物体
        if (Physics.Raycast(ray, out hit, 10f, targetLayer))
        {
            Debug.Log("Hit object in LayerMask: " + hit.collider.name);
        }
    }
}
```

LayerMask类型的变量在 "检查器 "中显示为下拉菜单，让您可以通过复选框轻松选择要针对的图层。与在代码中使用神奇数字（值）相比，这种方法更易于管理，也更不容易出错。

## 初学者的常见陷阱

### 混淆的标签和图层

最常见的错误是混淆标签和图层的用途。

- **Tags**: 用于识别。如 "这是敌人" 或 "这是物品"。
- **Layers**: 用于功能控制。如 "此对象不执行碰撞检测" 或 "此对象未渲染"。

通过明确区分--需要功能控制（尤其是物理控制）时使用层，需要简单识别或搜索时使用标签--你的代码和设置就会变得井井有条。

### 图层屏蔽的位操作

在脚本中使用 LayerMask 时，需要使用位操作 ( 1 << layerNumber) 而不是直接使用层数 (0-31)。

例如，只针对第 10 层，写法如下：

```c#
// Create LayerMask for layer number 10
// 为图层编号10创建图层遮罩
int layerNumber = 10;
int layerMask = 1 << layerNumber;

// Execute Raycast
// 执行射线检测
Physics.Raycast(ray, out hit, 10f, layerMask);
```

这是因为 Unity 的 "层掩码"（LayerMask）是作为一个 32 位整数来管理的，其中每一位代表相应层的启用/禁用状态。理解了这种位操作机制，就能实现高级应用，如组合多个层（如 layerMask = (1 << 8) | (1 << 9);）。

## 总结

通过有效利用 Unity 的 "标签 "和 "图层"，可以显著改善场景中的对象管理。以下是本文涉及的要点：

- **Tags** 专门用于识别物体，通过 `GameObject.FindWithTag()` 进行搜索，并确定碰撞伙伴的类型。
- **Layers** 专门用于对物体进行功能控制，对于优化物理计算（碰撞检测）和摄像机渲染至关重要。
- 使用层的碰撞检测控制是在 Project Settings-> Physics的层碰撞矩阵中完成的，省略了不必要的计算以提高性能。
- 对于 Raycast 等进程，使用 LayerMask 只针对特定层对象可优化处理。
- 在脚本中处理图层编号时，基本方法是使用位操作（ 1 << layerNumber）创建 LayerMask。

掌握这些基本要素，让你的 Unity 项目更有条理、更高效。
