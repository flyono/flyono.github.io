---
title: Godot 中的 3D 骨骼动画：动画播放器和动画树
description: 学习如何在 Godot 4 中使用 AnimationPlayer 播放 3D 角色动画，使用 AnimationTree 管理状态和混合，以及使用 SkeletonIK3D 动态调整姿势。
created: 2026-06-04T09:58:00
---
## 概述

想为你的 3D 角色添加行走、奔跑和攻击动画，但却苦于“过渡生硬”或“状态管理过于复杂”？

本文涵盖了如何使用 **AnimationPlayer** 播放基本动画、如何使用 **AnimationTree** 管理状态和混合动画、如何使用 **SkeletonIK3D** 动态调整姿势——所有这些都通过 Godot 4 中的实际示例进行讲解。

## Skeleton3D 和骨骼层级

在进行动画制作之前，了解底层骨骼结构很有帮助。所有骨骼动画都是建立在这个骨骼层级结构之上的。

**Skeleton3D** 节点代表 3D 角色的骨骼结构。它像人类骨骼一样，由层级排列的骨骼组成。动画的实现方式就是让这些骨骼随时间移动。

### Basic Structure  基本结构

```
CharacterBody3D (Root)
├─ MeshInstance3D (Visual)
│  └─ Skeleton3D (Skeleton)
│     ├─ BoneAttachment3D (Attach weapons, etc.)
│     └─ ...
└─ AnimationPlayer (Animation playback)
```

### 获取骨骼信息

如果您需要查看导入的模型有哪些骨骼，可以通过脚本列出所有骨骼。

```gdscript
var skeleton = $MeshInstance3D.find_child("Skeleton3D", true, false)
print("Bone count: ", skeleton.get_bone_count())
print("Bone names:")
for i in skeleton.get_bone_count():
    print("  ", skeleton.get_bone_name(i))

# 获取指定骨骼的索引
var head_bone_idx = skeleton.find_bone("Head")
if head_bone_idx != -1:
    var pose = skeleton.get_bone_pose(head_bone_idx)
    print("Head position: ", pose.origin)
```

## 使用动画播放器播放动画

现在你已经了解了角色骨架，让我们通过播放一些动画来让你的角色活起来吧。

**AnimationPlayer** 是最基本的动画播放节点。导入 3D 模型时，系统会自动创建一个 AnimationPlayer 节点，即可直接使用。

### 基本播放

```gdscript
@onready var anim_player = $AnimationPlayer

func _ready():
    # List all registered animations
    print("Registered animations:")
    for anim_name in anim_player.get_animation_list():
        print("  ", anim_name)

    # Play an animation
    if anim_player.has_animation("idle"):
        anim_player.play("idle")

func walk():
    anim_player.play("walk")

func run():
    anim_player.play("run")
```

### 设置混合时间

如果过渡看起来很生硬，那是因为动画切换时没有进行平滑过渡。`set_blend_time `set_blend_time()`可以实现动画之间平滑的淡入淡出效果。

```gdscript
# 设置动画之间的混合过渡时长（单位：秒）
anim_player.set_blend_time("idle", "walk", 0.2)
anim_player.set_blend_time("walk", "run", 0.3)
anim_player.set_blend_time("run", "idle", 0.4)

func change_to_walk():
    anim_player.play("walk")  # 在0.2秒内从静止状态切换至行走状态
```

### 调整播放速度

```gdscript
# 常规速度
anim_player.play("walk", -1, 1.0)

# 倍速
anim_player.play("walk", -1, 2.0)

# 半速（慢动作）
anim_player.play("walk", -1, 0.5)

# 倒放
anim_player.play_backwards("walk")
```

### 基于信号的控制

信号对于控制动作顺序非常有用——例如，在攻击动画结束后返回空闲状态。

```gdscript
func _ready():
    anim_player.animation_finished.connect(_on_animation_finished)
    anim_player.play("attack")

func _on_animation_finished(anim_name: String):
    if anim_name == "attack":
        print("Attack animation finished")
        anim_player.play("idle")  # 返回空闲状态
```

## 使用 AnimationTree 进行状态管理

AnimationPlayer 对于简单的播放操作来说效果不错，但随着状态数量的增加——例如行走、奔跑、跳跃、攻击——在代码中管理过渡效果很快就会变得难以管理。这时，AnimationTree 就派上用场了。

**AnimationTree** 是一个先进的系统，它通过状态机和混合技术来管理多个动画。它能让你用最少的代码处理诸如行走、奔跑和攻击等复杂的过渡效果。

###  基本设置

```gdscript
@onready var anim_tree = $AnimationTree
@onready var state_machine = anim_tree.get("parameters/playback")

func _ready():
    anim_tree.active = true  # 启用动画树

func _process(delta):
    var velocity = get_velocity()

    if velocity.length() < 0.1:
        state_machine.travel("idle")
    elif Input.is_action_pressed("sprint"):
        state_machine.travel("run")
    else:
        state_machine.travel("walk")
```

### 构建状态机（编辑）

您可以在编辑器中以可视化的方式设计状态转换。

1. 添加一个 `AnimationTree` 节点
2. 在检查器中，设置**Tree Root > AnimationNodeStateMachine**
3. 在底部面板的 `AnimationTree` 面板中：
	- 使用`Add Animation`添加 `idle`、 `walk`和 `run`节点。
	- 右键单击每个节点，然后选择 `Connect to...` 以创建过渡效果。
	- 选择一条过渡线，并将 `Xfade Time` 设置为 0.2

### 程序化状态转换

```gdscript
# 强制变更状态
state_machine.travel("attack")

# 获取当前状态
var current_state = state_machine.get_current_node()
print("Current state: ", current_state)

# 设置参数（用于混合空间）
anim_tree.set("parameters/movement/blend_position", velocity.length())
```

## 使用 BlendSpace 进行方向控制

状态机处理离散的状态转换，但对于像运动速度或方向这样连续变化的值，BlendSpace 才是正确的工具。

**BlendSpace1D/2D** 可根据输入值混合多个动画。例如，静止状态速度为 0，行走速度为 5，奔跑速度为 10——并在它们之间平滑过渡。

### BlendSpace1D 示例（移动速度）

```gdscript
# 在编辑器中创建 BlendSpace1D 节点，并采用以下设置：
# - Min/Max: 0.0 / 10.0
# - Add Blend Point:
#   - 0.0 = idle
#   - 3.0 = walk
#   - 10.0 = run

# 通过代码进行控制
var speed = velocity.length()
anim_tree.set("parameters/movement_blend/blend_position", speed)
```

### BlendSpace2D 示例（8 方向移动）

对于动作角色扮演游戏或其他角色向各个方向移动的游戏，2D 混合空间可以让你平滑地在方向动画之间进行插值。

```gdscript
# 在编辑器中创建一个 BlendSpace2D 节点并配置如下参数：
# - X/Y axis: -1.0 / 1.0
# - Add Blend Point:
#   - (0, 1) = walk_forward
#   - (0, -1) = walk_backward
#   - (1, 0) = walk_right
#   - (-1, 0) = walk_left
#   - (1, 1) = walk_forward_right
#   # ...other directions

# Control from code
var direction = Vector2(
    Input.get_axis("move_left", "move_right"),
    Input.get_axis("move_back", "move_forward")
).normalized()

anim_tree.set("parameters/locomotion/blend_position", direction)
```

## 使用 SkeletonIK3D 进行动态姿态调整

单凭动画数据无法处理诸如双脚踩在不平坦的地形上或伸手去够移动物体等情况。这时就需要用到逆运动学（IK）来进行实时姿态调整。

>**提示** ：Godot 4.x 版本已弃用 SkeletonIK3D，取而代之的是4.6版本回归的 **IKModifier3D**  系统。对于新项目，建议使用 IKModifier3D。SkeletonIK3D 在现有项目中仍可继续使用，但未来版本可能会将其移除。

## 性能优化

有了这些功能，你可以制作出丰富的动画，但在角色众多的场景中，处理成本会迅速增加。以下是一些保持动画流畅运行的技巧。

### 基于 LOD 的动画更新频率

位于屏幕边缘、几乎看不见的角色不需要像玩家角色那样精细的动画。根据镜头距离降低动画更新频率。

```gdscript
# 根据距离降低骨骼更新频率
func _process(delta):
    var distance = global_position.distance_to(camera.global_position)

    if distance > 50.0:
        # 远距离：完全停止动画更新
        anim_tree.active = false
    elif distance > 20.0:
        # 中远距离模式：隔帧跳过，将更新频率减半
        anim_tree.active = true
        if Engine.get_process_frames() % 2 != 0:
            return
    else:
        # 近距离：常规更新
        anim_tree.active = true
```

>**提示** ：`advance()` 方法需要 `active = true`才能正常工作。如果将 `active = false` 则会完全停止动画树的运行，因此不能将其与 `advance()`结合使用。如果要在中等距离下降低更新频率，请保持动画树处于活动状态并跳过帧。

### 禁用不必要的 IK

### 动画压缩

```gdscript
# 在导入设置中启用压缩功能
# Select .glb file > Import > Animation:
# - Compression: Lossy
# - Optimize: true
# - Position Error: 0.01
# - Rotation Error: 0.01
```

## 总结

- **AnimationPlayer** 负责处理基本的动画播放，可通过 `play()`和 `set_blend_time()`控制。
- **AnimationTree** 通过状态机管理复杂的动画过渡，使用 `travel()`函数切换状态。
- **BlendSpace1D/2D** 根据速度或方向混合动画，可通过 `blend_position`控制。
- **SkeletonIK3D** 支持动态姿势调整，例如脚部着地和手部伸展（在 Godot 4.x 中已弃用——对于新项目，请考虑使用 **IKModifier3D** ）
- 为了获得更佳性能，请使用基于距离的 LOD（细节层次），禁用不必要的 IK（反向运动学），并启用动画压缩。
- 使用 `animation_finished`信号来检测动画何时结束并过渡到下一个动作

## 延伸阅读

- [Godot 文档 - 动画功能简介](https://docs.godotengine.org/en/stable/tutorials/animation/introduction.html)
- [Godot 文档 - 动画树](https://docs.godotengine.org/en/stable/tutorials/animation/animation_tree.html)

