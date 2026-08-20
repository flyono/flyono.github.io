---
title: 映射渐变颜色
description: 使用灰度值作为 UV 坐标取样渐变颜色作为纹理颜色
created: 2026-06-25T16:05:00
---
```gdshader
shader_type canvas_item;

uniform sampler2D gradient_texture;

void fragment() 
{
	vec4 original_color = texture(TEXTURE, UV);
	// 计算灰度值
	float grayscale = (original_color.r + original_color.g + original_color.b) / 3.0;
	
	vec2 sample_coords = vec2(grayscale);
	vec4 gradient_color = texture(gradient_texture, sample_coords);
	
	COLOR = vec4(gradient_color.rgb, original_color.a);
}
```