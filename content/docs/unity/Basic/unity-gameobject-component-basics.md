---
title: Unity 的核心：游戏对象和组件详解
description: 学习 Unity 最基本的概念：游戏对象和组件之间的关系。了解 Unity 为空对象添加功能的设计理念，为初学者进行讲解。
created: 2026-06-16T13:45:00
---

## 概述

在 Unity 的世界里，场景中存在的一切都被称为 GameObject（游戏对象）。而组件则赋予了这些 "物体 "动作、功能和外观。这种 "游戏对象与组件 "的关系是 Unity 设计理念的基石，也是最重要的理解概念。

可以把游戏对象想象成一个 "空容器 "或 "模型套件主体"，而 "组件 "则是附加在它身上的 "引擎 "和 "装饰部件"。通过组合各种部件（组件），单个 GameObject 可以发挥不同的作用。本文将解释这两个基本元素及其如何协同工作。

## 核心概念

### GameObject

GameObject 是 Unity 场景的基本构件。玩家角色、敌人、树木、墙壁、灯光、摄像头--所有可见和不可见的东西都是 GameObject。

然而，一个新创建的 "空 "游戏对象本身几乎什么也做不了。它唯一拥有的就是变换组件，这是管理对象 "位置"、"旋转 "和 "缩放 "的最基本组件。

将 GameObject 视为您添加各种功能的 "基础 "或 "容器"。

### Component 组件

组件是为游戏对象添加特定功能的 "部件"。Unity 提供了大量内置组件：

- Mesh Renderer: 网格渲染器。在屏幕上绘制对象的形状(网格)。
- RigidBody: 刚体。赋予物体物理行为。
- Collider: 碰撞器。定义对象的碰撞检测形状。
- Audio Source: 音源。播放对象发出的声音。
- Light: 光线。使物体成为光源。
- Camera: 摄像机。使对象成为渲染游戏世界的摄像机。

最重要的是，自定义 C# 脚本也被视为组件。您可以通过创建脚本组件并将其添加到 GameObjects 中来实现独特的逻辑和行为。

## 实现

如何在 Unity 中使用游戏对象和组件

### 1.创建游戏对象

在 `层次结构` 窗口中单击右键并选择 Create Empty，即可创建一个只有一个 `变换` 组件的空 GameObject。这是最纯粹的 "容器"。

或者，选择 `3D Object` > `Cube` 创建一个立方体 GameObject。在 `检查器` 窗口中选中该立方体，就会显示在 `Transform` 之后自动添加的这些组件：

- Mesh Filter: 网格过滤器。将显示形状(网格)指定为 **立方体**。
- Mesh Renderer: 网格渲染器。绘制网格过滤器指定的形状。
- Box Collision: 盒子碰撞器。立方体碰撞检测。

### 2.添加组件

可以自由添加组件，为游戏对象赋予新的功能。下面展示添加物理功能：

1. 在 `层次结构` 中选择 Cube
2. 点击检查器底部的 `Add Component` 按钮添加组件
3. 输入框中搜索 `Rigidbody`，然后选择

就这样，`RigidBody`组件现在已经连接到了 Cube 上。玩游戏时，立方体就会因为重力而坠落。这就是通过组件添加功能。

### 3.添加脚本组件

现在，让我们创建一个 C# 脚本来添加自定义动作：

1. 右键单击项目窗口，选择 `Create > C# Script`。将其重命名为 `SimpleMover`。
2. 双击脚本打开编写

```c#
using UnityEngine;

// Inheriting MonoBehaviour makes this class behave as a Component
// 继承 MonoBehaviour 会让该类具备 ** 组件（Component）** 的特性。
public class SimpleMover : MonoBehaviour
{
    public float speed = 5f;

    // Update is called every frame
    // Update 方法会每帧调用
    void Update()
    {
        // Manipulate the Transform of the GameObject this script is attached to
        // 操控挂载该脚本的游戏物体的变换组件
        // Move right at 'speed' units per second
        // 以每秒'speed'单位向右移动
        transform.Translate(Vector3.right * speed * Time.deltaTime);
    }
}
```

3. 保存代码，然后将项目中的 `SimpleMover` 脚本拖到 `层次结构` 中的 Cube 上

现在 SimpleMover元件已连接到立方体上。玩游戏时，立方体会随着重力向右移动而下落。自定义脚本可以作为控制游戏对象行为的组件工作。

## 最佳实践

- **面向组件的设计**: Unity 遵循 `组件导向` 思维。与其用一个庞大的类来管理所有内容，不如创建小型的、重点突出的组件 --`移动功能`, `攻击功能`, `HP 管理`-- 然后将它们组合起来构建游戏对象。
- **不要让单个游戏对象承载过多功能**: 如果一个 "Player" 游戏对象负责移动、攻击、库存和用户界面显示，那么复杂性就会迅速增加。使用子对象来分配对象 -- `空对象用于放置武器`, `空对象用于产生效果` -- 这样管理起来会更加容易。

## 总结

游戏对象和组件是 Unity 开发的基础。了解它们之间的关系是掌握 Unity 的第一步。

- **GameObject**: 作为一切场景最基础的容器。
- **Component**: 赋予游戏对象功能和行为的"部件"。自定义脚本也是组件。
- **Component-Oriented(面向组件)**: 通过组合小而集中的组件来构建复杂的对象。

首先在编辑器中进行试验--在游戏对象中添加各种组件并观察其变化。
