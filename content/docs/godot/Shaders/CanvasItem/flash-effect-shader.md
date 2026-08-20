---
title: 闪光效果
description: 使用片段着色器给玩家添加闪光效果
created: 2026-06-25T15:41:00
---
```gdshader
shader_type canvas_item;

uniform vec4 flash_color: source_color = vec4(1.0);
uniform float flash_pct: hint_range(0.0, 1.0) = 0.0;

void fragment() {
	vec4 original_color = texture(TEXTURE, UV);
	// 把纹理原来的Color 和 闪光 Color 混合起来 
	vec4 mix_color = mix(original_color, flash_color, flash_pct);
	COLOR = mix_color;
	// 确保透明区域依旧透明
	COLOR.a *= original_color.a;
}
```