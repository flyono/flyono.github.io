---
title: 灰度
description: RGB 通道数值一样就能获取不同的灰度值
created: 2026-06-25T15:41:00
---
```gdshader
shader_type canvas_item;

void fragment() 
{
	//vec4(0.0, 0.0, 0.0, 1.0)
	//vec4(1.0, 1.0, 1.0, 1.0)
	
	//COLOR = vec4(0.5, 0.5, 0.5, 1.0);
	vec4 original_color = texture(TEXTURE, UV);
	// 计算灰度值
	float grayscale = (original_color.r + original_color.g + original_color.b) / 3.0;
	COLOR = vec4(vec3(grayscale), original_color.a);
}
```