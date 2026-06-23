---
title: 片段着色器基础及入门 - 颜色变化和效果
description: 从 Godot 引擎中片段着色器的基本作用，到使用 UV 坐标、时间和噪声的动态效果，并提供具体的代码示例和性能优化技术。
created: 2026-06-23T16:11:00
---

## 引言: 为什么要学习着色器

在 Godot 引擎中开发游戏时，**着色器**是不可或缺的强大工具。着色器是在图形处理器 (GPU) 上运行的小程序，它在像素级别控制物体的外观、颜色、光线反射和全屏效果。

为什么着色器如此重要？因为它们可以在**显著提升视觉效果**的同时，实现高性能。通过最大限度地利用 GPU 的并行处理能力，而不是在 CPU 上执行复杂的计算，您可以高效地实现仅靠 GDScript 难以实现的效果——例如火焰、水、自定义光照、独特的屏幕过渡等等。

本文重点介绍片段着色器 ，它负责处理视觉表达，解释了基本知识以及创建颜色变化和效果的第一步，并提供了具体的代码示例。

## Godot 着色器的基本结构

Godot Engine 着色器使用类似于 `GLSL ES 3.0` 的专有着色语言。创建着色器文件(`.gdshader`)时，首先需要定义着色器的应用对象。

```
shader_type canvas_item; // Apply to 2D objects
// shader_type spatial; // Apply to 3D objects
```

`canvas_item` 适用于 2D 精灵和 UI 元素，而 `spatial` 适用于 3D 网格。

Godot 着色器主要由三个函数（入口点）组成：

| 功能 | 角色 | 执行时序 |
| --- | --- | --- |
| `vertex`(顶点) | 操控物体顶点（位置）。用于变形、波浪、旋转等效果 | 每个顶点一次 |
| `fragment`(片段) | **计算像素（片段）颜色**。 用于纹理采样、颜色调整和特效的核心功能 | 每个像素一次 |
| `light`(光) | 计算光线对物体的影响。用于自定义照明 | 每个光源和像素组合一次 |

`fragment`函数（本文的重点）会对屏幕上的每个像素执行，负责确定每个像素的最终颜色。

## 练习 1: 使用片段着色器进行基本颜色操作

片段着色器最基本的作用是确定像素颜色。这里我们将学习如何使用 `COLOR` 输出变量和 `texture()`函数进行基本的颜色操作。

### 纯色填充 着色器

最简单的着色器，可以将物体完全填充为特定颜色。

```gdshader
shader_type canvas_item;

void fragment() {
    // Directly assign a new color to COLOR variable in vec4(R, G, B, A) format.
    // 直接以vec4(红, 绿, 蓝, 透明度)格式为COLOR变量赋予新颜色值。
    // Each component ranges from 0.0 to 1.0.
    // 每个组件的取值范围为0.0至1.0。
    COLOR = vec4(0.8, 0.2, 0.3, 1.0); // Wine red
}
```

### 纹理颜色反转 着色器

让我们在处理过程中保留原始纹理的颜色。使用 `texture()` 获取当前像素的颜色并将其反转。

```gdshader
shader_type canvas_item;

void fragment() {
    // 1. Get texture color at current UV coordinates.
    // 1. 获取当前UV坐标处的纹理颜色。
    vec4 original_color = texture(TEXTURE, UV);

    // 2. Invert colors by subtracting RGB components from 1.0.
    // 2. 将 RGB 各分量与 1.0 相减以反转颜色。
    vec3 inverted_rgb = vec3(1.0) - original_color.rgb;

    // 3. Set inverted RGB with original alpha as final output color.
    // 3. 将反转后的 RGB 通道与原始透明度通道组合，作为最终输出色彩。
    COLOR = vec4(inverted_rgb, original_color.a);
}
```

### 棕褐色滤镜 着色器

举个更实际的例子，我们来给一张图片应用经典的棕褐色滤镜。

```gdshader
shader_type canvas_item;

void fragment() {
    vec4 original_color = texture(TEXTURE, UV);
    vec3 c = original_color.rgb;

    // Convert to grayscale (luminance calculation)
    // 转换为灰度图像（亮度值计算）
    float gray = dot(c, vec3(0.299, 0.587, 0.114));

    // Apply sepia color tone
    // 应用棕褐色调
    vec3 sepia_color = vec3(
        gray * 1.07, // Boost red 提亮红色
        gray * 0.74, // Reduce green 减少绿色调
        gray * 0.43  // Reduce blue further 进一步降低蓝色调
    );

    COLOR = vec4(sepia_color, original_color.a);
}
```

## 练习 2：使用 UV 坐标和时间实现动态效果

片段着色器的真正价值在于使用内置变量（如 UV（纹理坐标）和 TIME将静态图像转换为动态效果。

### 使用 UV 坐标创建圆形遮罩

处理 `UV` 坐标，创建类似聚光灯的圆形遮罩。

```gdshader
shader_type canvas_item;

void fragment() {
    // 1. Adjust UV coordinates to center at (0,0).
    // 1. 将UV坐标调整至以(0,0)为中心。
    vec2 centered_uv = UV - vec2(0.5);

    // 2. Calculate distance from center.
    // 2. 计算与中心的距离。
    float dist = length(centered_uv);

    // 3. Use smoothstep for smooth boundary rendering.
    // 3. 使用平滑阶梯函数实现边界平滑渲染。
    float mask = 1.0 - smoothstep(0.3, 0.4, dist);

    vec4 original_color = texture(TEXTURE, UV);

    // 4. Apply mask by multiplying with original alpha.
    // 4. 将蒙版与原始透明度通道相乘以应用蒙版。
    COLOR = vec4(original_color.rgb, original_color.a * mask);
}
```

### 使用时间轴的滚动动画

在 `UV` 坐标中添加 `TIME`变量可以自动滚动纹理。这对于流动的水面和云朵效果至关重要。

```gdshader
shader_type canvas_item;

uniform float scroll_speed = 0.1;

void fragment() {
    // 1. Add time to UV's x component to shift UVs.
    // 1. 为UV的X分量添加时间值以偏移UV坐标。
    vec2 scrolled_uv = UV + vec2(TIME * scroll_speed, 0.0);

    // 2. Use fract() to loop UV coordinates in 0.0-1.0 range.
    // 2. 使用fract()函数将纹理坐标循环限定在0.0至1.0区间内。
    scrolled_uv = fract(scrolled_uv);

    // 3. Sample texture with new UV coordinates.
    // 3. 使用新的UV坐标生成采样纹理。
    COLOR = texture(TEXTURE, scrolled_uv);
}
```

### 使用噪声实现溶解效果

使用噪声纹理可以实现更自然、更复杂的效果。

```gdshader
shader_type canvas_item;

// Noise texture set externally
// 外部设置的噪点纹理
uniform sampler2D noise_texture;
// Control dissolve progress from GDScript
// 通过GDScript控制溶解过渡进度
uniform float dissolve_threshold : hint_range(0.0, 1.0) = 0.5;

void fragment() {
    // Get value from noise texture
    // 从噪点纹理中获取数值
    float noise_value = texture(noise_texture, UV).r;

    // If noise value is below threshold, discard pixel (make transparent)
    // 若噪声数值低于阈值，则舍弃该像素（设为透明）
    if (noise_value < dissolve_threshold) {
        // discard prevents pixel from being drawn
        // 丢弃操作会阻止像素被渲染绘制
        discard; 
    }

    COLOR = texture(TEXTURE, UV);
}
```

通过 GDScript 将 `dissolve_threshold` 从 0.0 调整到 1.0 可以实现平滑的溶解动画。

## 性能与优化

着色器功能强大，但实现不当会成为性能瓶颈。由于片段着色器是逐像素执行的，因此即使是微小的效率低下也会导致显著的负载。

- **避免使用 `if` 语句**: 由于 GPU 并行处理的特性，使用 `if` 进行分支计算会消耗大量资源。尽可能使用无分支函数例如 `step()`、 `smoothstep()`、 `mix()`来替代逻辑。
- **顶点着色器中的繁重计算**: 每个像素不变的计算（例如，使用 TIME的 sin/cos 计算）应该在顶点着色器中完成，并通过 `varying` 变量将结果传递给片段着色器，以显著减少计算量。
- **减少纹理采样**: `texture()`函数调用相对来说比较耗费资源。当多次采样同一纹理时，请将结果保存到变量中以便重复使用。

## 常见错误和最佳实践

| 常见错误 | 最佳实践 |
| --- | --- |
| 大量使用 `if` 语句 | 使用 `if` 进行分支计算会消耗大量资源。尽可能使用无分支函数例如 `step()`、 `smoothstep()`、 `mix()`来替代逻辑 |
| 硬编码 `UV` 坐标 | UV并不总是在 vec2(0.0, 1.0)范围内。养成使用 `fract()` 或 `mod()` 函数对 UV 坐标进行归一化的习惯 |
| 过度使用 `discard` | 虽然 `discard` 很方便，但在某些 GPU 上可能会抑制深度测试优化。可以考虑将 `alpha` 值设置为 0 作为替代方案 |
| 纹理过采样 | 使用 `texture()` 多次采样同一纹理会增加系统负载。将结果保存到变量中以便重复使用 |
| 用着色器实现 GDScript 能做到的事 | 着色器专门用于逐像素操作。使用 Sprite2D的 modulate属性可以更简单快捷地对整个对象进行简单的颜色更改 |

## 总结: 片段着色器的后续步骤

本文介绍了 Godot 引擎中 `Fragment Shaders` 的基本作用、结构以及实现颜色变化和动态效果的方法。

片段着色器是计算每个像素颜色的强大工具，通过利用内置变量 如 `UV` 坐标和 `TIME`，您可以创建无限的视觉效果。

重点:

- 着色器在 GPU 上执行，以高性能控制视觉表现。
- `fragment` 函数确定每个像素的颜色，并将结果输出到 `COLOR` 变量。
- `UV` 坐标指示纹理上的位置，对于渐变和基于坐标的效果至关重要。
- 使用 `TIME` uniform 可以实现高效的基于时间的动画。

掌握了这些基础知识后，接下来要学习 Uniforms 来传递外部值，从 GDScript 控制着色器参数，并尝试使用 vertex着色器进行对象变形。