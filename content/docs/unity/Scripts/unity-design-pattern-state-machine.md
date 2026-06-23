---
title: Unity 设计模式：使用状态模式管理复杂的 AI 和角色状态
description: 摆脱嵌套的 if/switch 语句地狱。学习如何使用经典的“状态模式”设计模式，将复杂的角色状态（空闲、攻击、防御、逃跑）实现为简洁、可扩展的状态机。
created: 2026-06-23T14:20:00
---

## 概述

玩家角色和敌方 AI 会根据游戏情况呈现不同的“状态”。敌方 AI 会在“巡逻状态”、“追击玩家状态”、“攻击状态”、“待机状态”、“逃跑状态”等之间切换。如果在一个庞大的 Update方法中使用嵌套的 `if-else` 或 `switch` 语句来实现这些状态转换，很快就会变得非常复杂，并且使得添加新状态或修改行为变得极其困难。

```C#
// Bad example: Giant Update method
// 反面示例：臃肿的更新方法
void Update()
{
    if (state == "Patrol")
    {
        // Patrol processing
        // 巡逻处理
        if (CanSeePlayer())
        {
            state = "Chase";
        }
    }
    else if (state == "Chase")
    {
        // Chase processing
        // 追踪处理
        if (IsInAttackRange())
        {
            state = "Attack";
        }
        else if (!CanSeePlayer())
        {
            state = "Patrol";
        }
    }
    else if (state == "Attack")
    {
        // Attack processing
        // 攻击处理
        if (!IsInAttackRange())
        {
            state = "Chase";
        }
    }
    // ... more states keep adding
}
```

用于优雅地管理此类“状态相关行为变化”的面向对象设计模式是状态模式 。其核心思想是： 将 **`状态`** 表示为类，并将特定于状态的行为实现为这些类的方法 。状态持有实体（上下文）持有对当前状态对象的引用，并将处理“委托”给该对象。

## 状态模式组件

状态模式由三个主要要素组成：

1. **Context(上下文)**: 持有状态的实体。在本例中，是敌方 AI 角色。它持有对当前状态对象 (IState) 的引用，并负责状态转换。
2. **IState(接口)**: 定义所有状态类必须实现的通用接口。方法包括 `OnEnter()`（进入状态时的处理）、 `OnUpdate()`（状态的逐帧处理）、 `OnExit()`（离开状态时的处理）。
3. **具体状态**: 实现了 `IState`接口 的特定状态类，例如 PatrolState、 ChaseState、 AttackState等。每个类都实现了该状态的特定行为。

## Unity 实现示例：敌方 AI 状态机

### 1. 定义 `IState` 接口

首先，将接口定义为所有状态类的蓝图。

```C#
// IState.cs
public interface IState
{
    // Called once when entering this state
    // 当进入该状态时调用一次
    void OnEnter(EnemyAI context);

    // Called every frame while in this state
    // 当处于该状态时每帧调用一次
    void OnUpdate();

    // Called once when leaving this state
    // 离开这个状态时调用一次
    void OnExit();
}
```

### 2. 实现具体状态类

接下来，创建特定的状态类。每个状态类处理自身的逻辑，并检查转换到其他状态的条件。

```C#
// PatrolState.cs
using UnityEngine;

public class PatrolState : IState
{
    private EnemyAI enemy;

    public void OnEnter(EnemyAI context)
    {
        this.enemy = context;
        Debug.Log("Transitioning to patrol state");
        // Start patrol animation, etc.
        // 开始巡逻动画等
    }

    public void OnUpdate()
    {
        // Implement patrol logic here
        // 这里实现训练逻辑
        // If player spotted, transition to chase state
        // 如果玩家被发现，转换到追逐状态
        if (enemy.CanSeePlayer())
        {
            enemy.ChangeState(new ChaseState());
        }
    }

    public void OnExit()
    {
        // Stop patrol animation, etc.
        // 停止巡逻动画等
    }
}
```

```C#
// ChaseState.cs
using UnityEngine;

public class ChaseState : IState
{
    private EnemyAI enemy;

    public void OnEnter(EnemyAI context)
    {
        this.enemy = context;
        Debug.Log("Transitioning to chase state");
    }

    public void OnUpdate()
    {
        // Implement chase logic (follow player) here
        // 这里实现追逐逻辑(跟随玩家)
        // If within attack range, transition to attack state
        // 如果处于攻击范围，转换到攻击状态
        if (enemy.IsInAttackRange())
        {
            enemy.ChangeState(new AttackState());
        }
        // If player lost, return to patrol state
        // 如果玩家丢失，返回到巡逻状态
        else if (!enemy.CanSeePlayer())
        {
            enemy.ChangeState(new PatrolState());
        }
    }

    public void OnExit() { }
}

// AttackState, etc... implemented similarly
```

### 3. 实现 `Context(上下文类)`

最后，实现用于管理状态的 `EnemyAI` 类。它保存当前状态，并将`Update`处理委托给当前状态对象。

```C#
// EnemyAI.cs
using UnityEngine;

public class EnemyAI : MonoBehaviour
{
    private IState currentState;

    void Start()
    {
        // Set initial state
        // 设置初始状态
        ChangeState(new PatrolState());
    }

    void Update()
    {
        // Call current state's Update processing
        // 调用当前状态的 Update 处理
        if (currentState != null)
        {
            currentState.OnUpdate();
        }
    }

    // Method to switch states
    // 改变状态的方法
    public void ChangeState(IState nextState)
    {
        // If current state exists, call its exit processing
        // 如果玩家退出状态，调用退出方法
        if (currentState != null)
        {
            currentState.OnExit();
        }

        // Switch to new state and call its initialization
        // 转换为新状态并调用初始化方法
        currentState = nextState;
        currentState.OnEnter(this);
    }

    // Helper methods used by state classes
    // 状态类所使用的辅助方法
    public bool CanSeePlayer() { /* Player visibility check logic */ return false; }
    public bool IsInAttackRange() { /* Attack range check logic */ return false; }
}
```

## 状态模式的优点

- **关注点分离**: 每个状态的逻辑完全独立封装在各自类中。敌方人工智能（EnemyAI）无需再知晓各类状态专属的行为细节。
- **可扩展性**: 添加新状态（例如 FleeState）只需要创建一个新的 IState实现类——对现有代码的影响极小。
- **可读性和可维护性**: 告别层层嵌套的 `if-else` 语句，代码变得非常简洁易读。修改状态的行为只需编辑其类即可。

## 总结

状态模式是一种强大的设计模式，它以有条理、可扩展、可维护的方式实现具有复杂状态转换的对象。

- 将状态表示为类，并将特定于状态的行为封装在其中。
- 上下文（实体）持有对当前状态对象的引用，并将处理委托给该对象。
- 状态转换逻辑由各个状态类自身管理。

适用于角色 AI、复杂的玩家动作（普通动作、游泳、爬梯子）、UI 模态窗口管理以及许多游戏开发场景。当你的 `Update` 方法开始充斥着大量的 if 和 switch语句时，就应该考虑引入状态模式了。