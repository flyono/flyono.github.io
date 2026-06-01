---
title: 使用 EditorPlugin 扩展 Godot 编辑器（@tool、自定义停靠栏、检查器）
description: 学习如何使用 @tool 注解和 EditorPlugin 类扩展 Godot 编辑器，以添加自定义停靠栏、工具栏按钮和检查器插件。内容涵盖 plugin.cfg 的配置以及最佳实践。
created: 2026-05-20T17:00:00
---

## 概述

Godot 编辑器具有高度可扩展性——使用 EditorPlugin 类，您可以添加自定义停靠栏和检查器面板。但是，如果您不完全了解 `@tool`注解的行为方式以及插件的生命周期，则可能会遇到编辑器崩溃或意外行为。

本文将逐步介绍从基本插件结构到实现自定义停靠和检查器插件以进行实际应用的过程。

## @tool 注解基础知识

在 Godot 中实现编辑器扩展时，首先要理解的是 `@tool`注解。例如，假设你想在编辑器中用圆圈来可视化攻击范围——这就是 `@tool`作用所在。

在脚本顶部添加 `@tool`可以使其在编辑器内运行。但是，务必将编辑器行为与游戏逻辑分开。

```gdscript
@tool
extends Node2D

func _process(delta):
    if Engine.is_editor_hint():
        # 仅在编辑器中运行
        queue_redraw()
    else:
        # 游戏进行时运行
        move_character(delta)
```

**重要提示** ：如果不通过 `Engine.is_editor_hint()`进行分支，游戏逻辑也会在编辑器内部执行。

这里有一个结合使用 `@tool`设置器和 `_draw()`的实际示例。当你在检查器中更改 `radius`，编辑器中的圆会实时更新。

`@tool`的常见用法：

| 用例 | 描述 |
| ------------ | -------------------------- |
| 定制 `drawing` | 使用 `_draw()`在编辑器中显示参考线或预览。 |
| 属性预览 | 当 `@export`值发生变化时，实时更新预览。 |
| 编辑器插件 | 插件主脚本需要此代码 |

```gdscript
@tool
extends Sprite2D

@export var radius: float = 100.0:
    set(value):
        radius = value
        queue_redraw()  # 数值发生变化时重新绘制

func _draw():
    if Engine.is_editor_hint():
        draw_circle(Vector2.ZERO, radius, Color(0, 1, 0, 0.3))
```

## plugin.cfg 和 EditorPlugin 设置

掌握了 `@tool`基础知识后，我们来创建实际的插件。创建插件需要遵循特定的目录结构。Godot 会自动检测这种结构，并将其显示在插件设置面板中。

### 目录结构

```text
addons/
└── my_plugin/
    ├── plugin.cfg          # Plugin configuration file
    ├── my_plugin.gd        # EditorPlugin script
    └── dock/
        └── my_dock.tscn    # Custom dock scene (optional)
```

### plugin.cfg

```text
[plugin]

name="My Plugin"
description="A plugin that adds a custom dock"
author="Your Name"
version="1.0.0"
script="my_plugin.gd"
```

### 编辑器插件基础知识

```gdscript
@tool
extends EditorPlugin

func _enter_tree():
    # 插件被激活时调用
    print("Plugin activated")

func _exit_tree():
    # 插件被停用之时触发调用
    # 务必在此处移除新增的界面元素
    print("Plugin deactivated")
```

**如何启用插件** ：

1. 转到 **项目** -> **项目设置** -> **插件** 选项卡
2. 在列表中找到您的插件，然后选中 **启用** 复选框。

## 添加自定义检查器面板

插件框架搭建完毕后，我们来添加一些实际功能。最常见的用例是向编辑器添加自定义面板（停靠面板）。例如，您可以构建一个调试工具来列出场景中的所有对象，或者一个纹理预览界面。

以下代码在左上面板添加一个自定义停靠栏：

```gdscript
@tool
extends EditorPlugin

var dock: Control

func _enter_tree():
    dock = preload("res://addons/my_plugin/dock/my_dock.tscn").instantiate()
    add_control_to_dock(DOCK_SLOT_LEFT_UL, dock)

func _exit_tree():
    if dock:
        remove_control_from_docks(dock)
        dock.queue_free()
```

### 面板放置槽

| Slot Constant | Position |
| -------------------- | -------- |
| `DOCK_SLOT_LEFT_UL` | 左侧面板，上方 |
| `DOCK_SLOT_LEFT_BL` | 左侧面板，下方 |
| `DOCK_SLOT_RIGHT_UL` | 右侧面板，上方 |
| `DOCK_SLOT_RIGHT_BL` | 右侧面板，下方 |

### 创建面板场景

停靠栏中显示的内容可以创建为常规场景。

使用 Control 节点作为根节点，并添加所需的 UI 元素。

```gdscript
# dock/my_dock.gd
@tool
extends VBoxContainer

@onready var label = $StatusLabel
@onready var button = $RunButton

func _ready():
    button.pressed.connect(_on_run_pressed)

func _on_run_pressed():
    label.text = "Running..."
    # 编辑器插件脚本中可直接访问编辑器接口。
    # 对于停靠面板脚本，可从编辑器插件中传入引用
    # 或是借助信号与插件进行双向通信。
    label.text = "Done"
```

## 添加工具栏按钮

停靠面板始终可见，但如果您只需要单击一下即可触发特定操作，工具栏按钮则更加轻便。例如，一个用于对场景中的所有节点进行验证的按钮就非常合适。

```gdscript
@tool
extends EditorPlugin

var button: Button

func _enter_tree():
    button = Button.new()
    button.text = "My Tool"
    button.pressed.connect(_on_button_pressed)
    add_control_to_container(CONTAINER_TOOLBAR, button)

func _exit_tree():
    if button:
        remove_control_from_container(CONTAINER_TOOLBAR, button)
        button.queue_free()

func _on_button_pressed():
    print("Toolbar button clicked")
```

### 通用容器常量

| Constant | Location |
| ------------------------------- | -------- |
| `CONTAINER_TOOLBAR` | 主工具栏 |
| `CONTAINER_SPATIAL_EDITOR_MENU` | 3D 编辑器菜单 |
| `CONTAINER_CANVAS_EDITOR_MENU` | 2D 编辑器菜单 |
| `CONTAINER_INSPECTOR_BOTTOM` | 检查器底部 |

## 自定义检查器插件

继停靠栏和工具栏按钮之后，检查器是另一个强大的扩展功能。检查器通常会自动显示节点属性，但您也可以在选中特定节点时添加专用的用户界面。例如，您可以添加一个控件，在选中 CharacterBody2D 时以用户友好的方式显示速度值。

首先，从 EditorPlugin 注册检查器插件，然后定义实际的插件类：

```gdscript
# my_plugin.gd
@tool
extends EditorPlugin

var inspector_plugin: MyInspectorPlugin

func _enter_tree():
    inspector_plugin = MyInspectorPlugin.new()
    add_inspector_plugin(inspector_plugin)

func _exit_tree():
    if inspector_plugin:
        remove_inspector_plugin(inspector_plugin)
```

```gdscript
# my_inspector_plugin.gd
@tool
class_name MyInspectorPlugin
extends EditorInspectorPlugin

func _can_handle(object: Object) -> bool:
    # 确定此插件可处理哪些对象
    return object is CharacterBody2D

func _parse_begin(object: Object):
    # 在检查器顶部添加界面元素
    var label = Label.new()
    label.text = "== Character Info =="
    add_custom_control(label)

func _parse_property(object, type, name, hint_type, hint_string, usage_flags, wide):
    if name == "speed":
        var label = Label.new()
        label.text = "Speed: %s" % str(object.get(name))
        add_custom_control(label)
        return true
    return false
```

## 最佳实践

现在您已经了解了主要特性，接下来我们来探讨一下插件开发中常见的陷阱。插件开发与常规 GDScript 开发需要考虑的因素有所不同。尤其需要注意的是，资源管理不善会导致编辑器崩溃或内存泄漏。

| 分类 | 推荐 |
| ------------- | ----------------------------------------------- |
| **空值检查** | 在 `_exit_tree()`中移除元素之前，务必检查是否为空。 |
| **编辑器/运行时分离** | 使用 `Engine.is_editor_hint()`来分支仅限编辑器逻辑 |
| **资源清理** | 在 `_exit_tree()`中对所有添加的 UI 元素调用 `queue_free()`) |
| **使用预加载** | 使用 `preload()`预加载场景和资源 |
| **错误处理** | 使用 `push_warning()`函数通知用户问题 |

**常见错误：**

```gdscript
# BAD: Forgetting to free UI elements in _exit_tree()
func _exit_tree():
    pass  # 造成内存泄漏或编辑器崩溃

# GOOD: 始终整理干净
func _exit_tree():
    if dock:
        remove_control_from_docks(dock)
        dock.queue_free()
    if inspector_plugin:
        remove_inspector_plugin(inspector_plugin)
```

## 总结

- 在脚本顶部添加 **@tool** 会使其在编辑器内运行。
- 使用 **Engine.is_editor_hint()** 来分支仅限编辑器逻辑
- 在 **EditorPlugin** 类中实现 `_enter_tree()`/ `_exit_tree()`方法来设置您的插件
- 使用 `add_control_to_dock()`函数向左侧/右侧面板添加**自定义停靠栏。**
- 使用 **EditorInspectorPlugin** 扩展特定节点的检查器。
- 始终在 `_exit_tree()`中清理所有添加的元素，以防止内存泄漏。

## 文档参考

- [制作插件 — Godot Engine (4.x) 简体中文文档](https://docs.godotengine.org/zh-cn/4.x/tutorials/plugins/editor/making_plugins.html)
- [在编辑器中运行代码 — Godot Engine (4.x) 简体中文文档](https://docs.godotengine.org/zh-cn/4.x/tutorials/plugins/running_code_in_the_editor.html)
- [EditorInspectorPlugin — Godot Engine (4.x) 简体中文文档](https://docs.godotengine.org/zh-cn/4.x/classes/class_editorinspectorplugin.html)
