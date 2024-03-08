---
title: Docker 安装 Redis
date: 2024-3-8
updated: 2024-3-8
categories: "Docker"
tags: 
  - "Redis"
  - "Docker"
---

# Docker 安装 Redis

1. 搜索 `Redis`

```bash
docker search redis
```

2. 拉取`Redis`镜像

```bash
docker pull redis
```

3. 启动`Redis`

[Redis configuration | Redis](https://redis.io/docs/management/config/)

启动前先配置`redis.conf`文件

```
docker run -p 6379:6379 --name redis -v /data/redis/redis.conf:/etc/redis/redis.conf -v /data/redis/data:/data -d redis redis-server /etc/redis/redis.conf --appendonly yes
```

