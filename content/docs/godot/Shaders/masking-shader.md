---
title: 遮罩
description:
created: 2026-06-25T15:41:00
---
```gdshader
shader_type canvas_item;

uniform sampler2D mask_tex;

void fragment() {
	vec4 mask_color = texture(mask_tex, UV);
	vec4 original_color = texture(TEXTURE, UV);
	
	//COLOR = mask_color;
	if(original_color.a > 0.0){
		COLOR.a = mask_color.r;
	}
}
```