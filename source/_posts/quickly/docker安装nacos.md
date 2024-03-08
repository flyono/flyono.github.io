---
title: Docker 安装 nacos
date: 2024-3-5
updated: 2024-3-5
categories: "教程"
tags: 
  - "Docker"
  - "nacos"
---

# Docker 安装 nacos

1. 寻找镜像

```bash
docker search nacos
```

2. 拉取镜像

```bash
docker pull nacos/nacos-server
```

3. 启动服务

```bash
docker run -d \
 --name nacos \
 --privileged \
 --cgroupns host \
 --env JVM_XMX=256m \
 --env MODE=standalone \
 --env JVM_XMS=256m \
 -p 8848:8848/tcp \
 -p 9848:9848/tcp \
 --restart=always \
 -w /home/nacos \
 nacos/nacos-server
```

4.访问 http://localhost:8848/nacos 即可

