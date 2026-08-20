---
title: 法线贴图
description: 学习法线贴图
created: 2026-06-26T15:04:00
---
## 法线贴图

法线贴图是**次世代 3D 核心纹理技术**，用一张 RGB 彩色贴图存储模型表面每个像素的**法线三维向量 (X/Y/Z)**，渲染时替换模型原始法线参与光照计算，**不增加模型多边形面数，就能模拟凹凸、划痕、铆钉、砖石纹理等微观立体细节**。

```gdshader
shader_type spatial;

uniform sampler2D normal_map: repeat_enable, filter_linear;

void fragment() {
	// 法线贴图
	vec4 normal_tex = texture(normal_map, UV);
	NORMAL_MAP = normal_tex.rgb;
}
```

## Water 着色器

通过叠加两个法线贴图来实现真实水面的效果

```gdshader
shader_type spatial;

uniform vec3 albedo: source_color = vec3(1.0);

uniform sampler2D normal_map: repeat_enable, filter_linear;
uniform sampler2D normal_map2: repeat_enable, filter_linear;

uniform vec2 diretion1 = vec2(1.0, 0.0);
uniform vec2 diretion2 = vec2(1.0, 0.0);

uniform float scroll_speed1: hint_range(0.0, 1.0) = 0.1;
uniform float scroll_speed2: hint_range(0.0, 1.0) = 0.1;

void fragment() {
	vec2 offset1 = scroll_speed1 * diretion1 * TIME;
	vec2 offset2 = scroll_speed2 * diretion2 * TIME;
	// 法线贴图
	vec4 normal1 = texture(normal_map, UV + offset1);
	vec4 normal2 = texture(normal_map2, UV + offset2);
	
	vec4 final_normal = mix(normal1, normal2, 0.5);
	
	NORMAL_MAP = final_normal.rgb;
	
	ALBEDO = albedo;
	METALLIC = 0.0;
	ROUGHNESS = 0.01;
}
```