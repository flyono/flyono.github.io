---
title: Unity 特性指南：赋予代码特殊行为的元数据标记
description: 学习如何使用 C# 特性自定义 Unity 的检查器。包括 SerializeField、Header、Range、RequireComponent 等特性的实际用法。
created: 2026-06-18T14:06:00
---

## 概述

"我想在检查器中显示私有变量，但怎么做？"我想在字段上方添加标题，使检查器更容易阅读......"

这就是特性的作用所在。特性是 C# 的元数据标记，放在类、特性或方法声明的上方时，可以指示特殊行为。

```c#
[HideInInspector]
public float strength;
```

## Inspector Attributes

### SerializeField: 在 Inspector 中显示私有变量

```c#
[SerializeField]
private float speed = 5.0f;
```

这样，设计人员和规划人员就可以在检查器中调整数值，同时保持封装。

### filed: SerializeField: 序列化特性

在检查器中显示 C# 自动特性的现代方法。

```c#
[field: SerializeField] public float Speed { get; private set; } = 5.0f;
```

这提供了一种简洁的方法，使特性在代码中只读，但在检查器中可编辑。

### 从 Inspector 中隐藏变量

```c#
[HideInInspector]
public float currentHealth;
```

该值仍被序列化，因此会被保存。

### NonSerialized: 禁用序列化

```c#
[System.NonSerialized]
public float tempValue;
```

| Attribute | 序列化 | Shown in Inspector |
| --- | --- | --- |
| HideInInspector |	是 | 没有 |
| NonSerialized | 没有 | 没有 |

> 何时使用：对不想保存的临时变量使用 NonSerialized。使用 HideInInspector来保存不希望在检查器中编辑的值。

### Header: 显示标题

```c#
[Header("Movement Settings")]
[SerializeField] private float moveSpeed = 5.0f;
[SerializeField] private float jumpForce = 10.0f;

[Header("Attack Settings")]
[SerializeField] private float attackPower = 20.0f;
```

### Tooltip: 显示工具提示

```c#
[Tooltip("Movement speed (units: m/s)")]
[SerializeField] private float moveSpeed = 5.0f;
```

### Range: 显示滑块

```c#
[Range(0, 100)]
[SerializeField] private float volume = 50.0f;
```

> 注意 `Range` 仅限制检查器中的输入。当直接从脚本赋值时，仍然可以设置超出范围的值。如果需要在代码中执行限制，请同时使用 `Mathf.Clamp`。

### Min: 设置最小值

```c#
[Min(0)]
[SerializeField] private float health = 100.0f;
```

### Space: 添加间距

```c#
[SerializeField] private float moveSpeed = 5.0f;
[Space(20)]
[SerializeField] private float attackPower = 20.0f;
```

### TextArea: 多行文本输入

```c#
[TextArea(3, 10)]
[SerializeField] private string description;
```

## 方法特性

### ContextMenu: 在 Inspector 中添加方法

```c#
[ContextMenu("Restore Full Health")]
private void ResetHealth()
{
    currentHealth = maxHealth;
    Debug.Log("Health fully restored");
}
```

右键单击 "Inspector" 中的组件，查看菜单项。

### MenuItem: 为 Unity 编辑器添加方法

> 重要：使用 `[MenuItem]` 的脚本必须放在 `Editor` 文件夹内。 `UnityEditor` 命名空间仅限编辑器使用，因此将其放在编辑器文件夹之外会导致编译错误。

```c#
// Editor/MyEditorTools.cs
using UnityEditor;
using UnityEngine;

public class MyEditorTools
{
    [MenuItem("Tools/Reset All Objects")]
    private static void ResetAllObjects()
    {
        Debug.Log("All objects have been reset");
    }
}
```

### RuntimeInitializeOnLoadMethod: 游戏启动时初始化

```c#
using UnityEngine;

public class GameInitializer
{
    [RuntimeInitializeOnLoadMethod]
    private static void Initialize()
    {
        Debug.Log("Game has started");
    }
}
```

它可用于不继承于 `MonoBehaviour` 的静态类。

## 类特性

### RequireComponent: 指定所需组件

```c#
[RequireComponent(typeof(Rigidbody))]
public class PlayerController : MonoBehaviour
{
    private Rigidbody rb;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }
}
```

当您附加 `PlayerController` 时，也会自动附加 `Rigidbody`。

### DisallowMultipleComponent: 防止重复组件

```c#
[DisallowMultipleComponent]
public class GameManager : MonoBehaviour
{
}
```

### ExecuteAlways: 在编辑器下(始终)运行

```c#
[ExecuteAlways]
public class GridGenerator : MonoBehaviour
{
    void Update()
    {
        // Separate logic for editor mode and play mode
        // 区分编辑器模式与运行模式的逻辑
        if (Application.isPlaying)
        {
            // Runtime logic
            // 运行模式下运行逻辑
        }
        else
        {
            // Editor logic (e.g., visualizing in Scene view)
            // 编辑器逻辑（例如：在场景视图中可视化展示）
        }
    }
}
```

> 注意：使用 `[ExecuteAlways]` 时，即使在编辑器模式下，每帧也会调用 `Update`。繁重的操作会减慢编辑器的运行速度，因此应使用 Application.isPlaying来分支逻辑或保持轻量级操作。

### CreateAssetMenu: 添加可脚本对象创建菜单

```c#
[CreateAssetMenu(fileName = "NewWeapon", menuName = "MyGame/Weapon")]
public class WeaponData : ScriptableObject
{
    public string weaponName;
    public int damage;
}
```

## 序列化特性

### Serializable: 序列化自定义类

要在检查器中显示自定义类（不继承自 MonoBehaviour 或 `ScriptableObject`），需要 `[Serializable]`.

```c#
[System.Serializable]
public class EnemyData
{
    public string name;
    public int hp;
    public float speed;
}

public class EnemySpawner : MonoBehaviour
{
    [SerializeField] private EnemyData[] enemies;
}
```

### SerializeReference: 引用多态序列化

允许在基类或接口字段中保存派生类的实例。

```c#
public interface ISkill
{
    void Execute();
}

[System.Serializable]
public class FireSkill : ISkill
{
    public float damage;
    public void Execute() { /* Fire attack */ }
}

[System.Serializable]
public class IceSkill : ISkill
{
    public float slowDuration;
    public void Execute() { /* Ice attack */ }
}

public class Player : MonoBehaviour
{
    [SerializeReference] private ISkill skill;  // Can hold FireSkill or IceSkill
}
```

> 注意：使用 SerializeReference时，在检查器中选择类型需要自定义编辑器或第三方资产（如 OdinInspector）。

## 自定义特性

要创建影响检查器的自定义特性，请继承 `PropertyAttribute`。

```c#
using UnityEngine;

[System.AttributeUsage(System.AttributeTargets.Field)]
public class ReadOnlyAttribute : PropertyAttribute
{
}
```

> 注意：必须从 `UnityEngine.PropertyAttribute`继承，而不能从 `System.Attribute`继承。 从 `System.Attribute`继承对 `PropertyDrawers` 无效。

### 与编辑器扩展功能相结合

PropertyDrawers 必须放在 `Editor/` 文件夹内。

```
Assets/
├── Scripts/
│   └── ReadOnlyAttribute.cs    // Attribute definition
└── Editor/
    └── ReadOnlyDrawer.cs       // PropertyDrawer (inside Editor folder)
```

```c#
// Editor/ReadOnlyDrawer.cs
using UnityEditor;
using UnityEngine;

[CustomPropertyDrawer(typeof(ReadOnlyAttribute))]
public class ReadOnlyDrawer : PropertyDrawer
{
    public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
    {
        GUI.enabled = false;
        EditorGUI.PropertyField(position, property, label);
        GUI.enabled = true;
    }
}
```

> 重要：将 `PropertyDrawers` 放在 `Editor/` 文件夹之外会导致编译错误。 UnityEditor 命名空间仅限编辑器使用，不能包含在构建中。

## 实例

```c#
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CapsuleCollider))]
public class PlayerController : MonoBehaviour
{
    [Header("Movement Settings")]
    [Tooltip("Movement speed (units: m/s)")]
    [SerializeField] private float moveSpeed = 5.0f;

    [Tooltip("Jump force")]
    [SerializeField] private float jumpForce = 10.0f;

    [Space(20)]

    [Header("Attack Settings")]
    [Range(10, 100)]
    [SerializeField] private float attackPower = 20.0f;

    [Min(0)]
    [SerializeField] private float attackRange = 2.0f;

    [Space(20)]

    [Header("Status")]
    [HideInInspector]
    public float currentHealth;

    [SerializeField] private float maxHealth = 100.0f;

    [ContextMenu("Restore Full Health")]
    private void ResetHealth()
    {
        currentHealth = maxHealth;
    }
}
```

## 最佳实践

- 将 `SerializeField` 与 `private` 结合 - 保持封装，同时允许检查员调整
- 使用页眉和空格，提高可读性 - 对变量进行分组，改进检查员组织工作
- 添加工具提示说明 - 帮助团队成员了解每个字段
- 使用范围和最小值设置适当的范围 - 防止错误的数值分配
- 对依赖关系使用 RequireComponent - 明确组件依赖关系

## 总结

特性是 C#中 的元数据标记，用于为代码指定特殊行为。

- **SerializeField** - 在检查器中显示私有变量
- **页眉、空格** - 提高检查员的可读性
- **范围，最小值** - 设置数值范围限制
- **ContextMenu** - 使编辑器中的方法可执行

## 深入学习

[Unity 官方文档 - 序列化引用](https://docs.unity3d.com/ScriptReference/SerializeReference.html)