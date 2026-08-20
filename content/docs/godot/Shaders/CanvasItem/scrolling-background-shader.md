---
title: 滚动背景着色器
description: 使用  Sprite 2D 节点和 CanvasLayer 节点实现滚动背景效果
created: 2026-06-25T15:05:00
---
```gdshader
shader_type canvas_item;

// 纹理平铺参数
uniform vec2 tiling = vec2(1.0, 1.0);
// 纹理偏移参数
uniform vec2 offset;

void vertex() 
{
	UV = UV * tiling + (offset * TIME);
}
```
