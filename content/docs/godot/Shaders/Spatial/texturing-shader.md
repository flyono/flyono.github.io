---
title: 纹理绘制
description: 给球体添加纹理并做出波浪效果
created: 2026-06-26T15:41:00
---
```gdshader
shader_type spatial;

uniform sampler2D my_texture;

void fragment() {
	vec2 adjusted_uv = UV * 4.;
	adjusted_uv.y += sin(adjusted_uv.x * 50.0 + TIME * 10.0) * 0.025;
	vec4 texture_color = texture(my_texture, adjusted_uv);
	
	ALBEDO = texture_color.rgb;
	ALPHA = 1.0f;
}
```
