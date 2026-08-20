---
title: 金属度和粗糙度
description: 了解金属度和粗糙度
created: 2026-06-26T14:42:00
---
```gdshader
shader_type spatial;

uniform vec3 albedo: source_color = vec3(1.0);
uniform float metallic: hint_range(0.0, 1.0) = 0.0;
uniform float roughness: hint_range(0.0, 1.0) = 0.0;

void fragment() 
{
	ALBEDO = albedo;
	// 金属度
	METALLIC = metallic;
	// 粗糙度
	ROUGHNESS = roughness;
}
```