---
title: 屏幕阅读
description: 屏幕阅读 Shader
created: 2026-06-25T15:41:00
---
```gdshader
shader_type canvas_item;

uniform sampler2D screen_texture: hint_screen_texture, filter_nearest;

void fragment() {
	vec4 screen_color = texture(screen_texture, SCREEN_UV);
	// 过滤掉对应通道的颜色
	// screen_color.r = 0.0;
	float grayscale = (screen_color.r + screen_color.g + screen_color.b) / 3.0;
	COLOR = vec4(vec3(grayscale), screen_color.a);
}
```