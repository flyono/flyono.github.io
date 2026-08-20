---
title: 3D 中的顶点
description: 玩转3D空间中的顶点
created: 2026-06-26T14:50:00
---
```gdshader
shader_type spatial;

void vertex() {
	// vec3, 移动
	// VERTEX += vec3(cos(TIME * 2.0), sin(TIME * 2.0), 0.0);
	
	// 缩放
	//VERTEX *= (sin(TIME * 10.0) + 1.0) * 0.5 + 1.0;
	
	// 正弦波
	VERTEX.x += sin(TIME * 10.0 + VERTEX.y * 10.0) * 0.02;
}
```