---
title: Unity 脚本基础：了解 MonoBehaviour 类
description: 在每个 Unity C# 脚本中都会出现的 MonoBehaviour 类是什么？了解它的作用，以及如何使用 transform 和 gameObject 等方便的属性。
created: 2026-06-16T17:27:00
---

## 概述

在 Unity 中创建 C# 脚本时，您总是会看到 `public class MyScript : MonoBehaviour`。这个 MonoBehaviour到底是什么呢？

`MonoBehaviour` 是一个重要的 "基类"，它将 Unity 的 API 与您的自定义脚本连接起来。通过继承该类（将其写在 :之后），您的脚本可以作为组件添加到 GameObjects 中，接收 `Update` 和 `Start` 等生命周期事件，并访问 `transform` 和 `gameObject` 等方便的属性。

## MonoBehaviour 的作用

继承 `MonoBehaviour` :

1. **组件化**: 脚本可以作为组件附加到 **GameObject** 上为对象添加行为。
2. **生命周期事件接收**: 使用Unity预设特定时机自动调用的事件函数——`Awake`、`Start`、`Update`等
3. **访问关键属性**: 轻松访问脚本所连接的 `GameObject` 及其 `Transform` 组件
4. **协程执行**: 使用 `StartCoroutine` 异步执行耗时进程

如果创建的普通 C# 类没有继承 MonoBehaviour（有时也称为 `POCO - Plain Old C# Object`），则无法附加到 GameObject，也不会接收生命周期事件。此类类用于数据存储或计算，由 MonoBehaviour 脚本调用。

## 关键属性和方法

在继承了 `MonoBehaviour` 的脚本中，可以直接调用许多方便的属性和方法。以下是最常用的几种:

### transform

返回该脚本所连接的 GameObject 的变换组件的引用。常用于操作对象的位置、旋转和缩放。这是 `GetComponent<Transform>()`的快捷方式，因为使用频率很高，所以特别提供

```c#
using UnityEngine;

public class PositionChanger : MonoBehaviour
{
    void Start()
    {
        // Use the transform property to set the object's Y position to 5
        // 使用transform属性将对象的Y轴位置设置为5
        transform.position = new Vector3(0, 5, 0);
    }
}
```

### gameObject

返回该脚本所连接的 GameObject 自身的引用。这是停用对象或获取其他组件的起点。

```c#
using UnityEngine;

public class ObjectController : MonoBehaviour
{
    void Start()
    {
        // Deactivate this GameObject after 5 seconds
        // 5秒后停用该游戏对象
        Invoke("DeactivateObject", 5f);
    }

    void DeactivateObject()
    {
        // Use gameObject property to deactivate itself
        // 利用游戏物体属性将自身置为非激活状态
        gameObject.SetActive(false);
    }
}
```

### `GetComponent<T>()`

获取连接到同一 `GameObject` 的指定类型组件 `T` 的引用。在 Unity 面向组件的设计中，这是与其他组件进行通信的最基本方法。

```c#
using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    private Rigidbody rb;

    void Start()
    {
        // Get the Rigidbody component on the same GameObject
        // 获取同一游戏物体上的刚体组件
        rb = GetComponent<Rigidbody>();
        if (rb != null)
        {
            // If Rigidbody found, set its mass to 10
            // 如果检测到刚体组件，将其质量设置为10
            rb.mass = 10f;
        }
    }
}
```

>性能提示: `GetComponent<T>()`是一个相对昂贵的操作。避免在 Update()等每帧都调用的函数中调用它 - 在 `Awake()`或 `Start()` 中调用一次，并将结果缓存到变量中。

### `Instantiate()` and `Destroy()`

- `Instantiate(original)`: 在场景中创建 original（预制件或现有游戏对象）的克隆。用于动态生成敌人、子弹和特效。
- `Destroy(obj)`: 销毁指定的 GameObject、组件或资产。用于删除场景中不必要的对象。

```c#
using UnityEngine;

public class BulletSpawner : MonoBehaviour
{
    public GameObject bulletPrefab;

    void Update()
    {
        // When Space is pressed
        // 当 空格 被按下时
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // Spawn a bullet from the Prefab
            // 从预制体生成一颗子弹
            GameObject newBullet = Instantiate(bulletPrefab, transform.position, Quaternion.identity);

            // Destroy that bullet after 3 seconds
            // 3秒后销毁该子弹
            Destroy(newBullet, 3f);
        }
    }
}
```

## 总结

`MonoBehaviour` 是 Unity 脚本的核心类。通过继承该类，我们的 C# 代码终于可以与 Unity 的世界进行交互，让 GameObjects 栩栩如生。

- `MonoBehaviour` 是连接 Unity 和脚本的桥梁。
- 继承可实现组件行为和生命周期事件接收。
- 提供方便的属性和方法，如 `transform`, `gameObject`, `GetComponent<T>()`

Unity 开发在很大程度上取决于你对 MonoBehaviour的掌握程度。首先要熟悉这里介绍的基本属性和方法。
