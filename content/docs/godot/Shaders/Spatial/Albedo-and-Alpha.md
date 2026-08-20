---
title: 漫反射和透明度
description: 学习如何使用片段着色器给网格设置颜色
created: 2026-06-26T15:41:00
---
## Shader 中的漫反射和透明度

```gdshader
shader_type spatial;

uniform vec3 sphere_color: source_color = vec3(1.0);

void fragment() {
	// 设置漫反射: vec3
	ALBEDO = sphere_color;
	// 设置透明度: float
	ALPHA = 1.0;
}
```

## 案例: 点击鼠标左键为 `MeshInstance3D` 赋予随机颜色材质

```gdscript
extends Node3D

@onready var sphere_eample: MeshInstance3D = $SphereEample

func _process(_delta):
	if Input.is_action_just_pressed("quit"):
		get_tree().quit()
	
	if Input.is_action_just_pressed("mouse_left"):
		var sphere_mat: ShaderMaterial = sphere_eample.get_active_material(0)
		var random_color := Vector3(randf(), randf(), randf())
		sphere_mat.set_shader_parameter("sphere_color", random_color)
```

```gdshader
shader_type spatial;

uniform vec3 sphere_color: source_color = vec3(1.0);

void fragment() {
	// 设置漫反射: vec3
	ALBEDO = sphere_color;
	// 设置透明度: float
	ALPHA = 1.0;
}
```
