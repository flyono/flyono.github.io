---
title: minio
date: 2024-3-4
updated: 2024-3-4
categories: "minio"
tags: "服务器"
---

# minio

## 什么是 `minio`

​	`MinIO`是一个开源的对象存储服务器，它兼容Amazon S3云存储服务的API。它允许开发人员构建高性能的分布式存储系统，可以在私有云、公有云或混合云环境中部署和运行。

​	`MinIO`设计用于高性能、高可用性和可扩展性。它可以在普通的硬件基础上运行，并且具有自我修复功能，可以自动处理硬件故障和数据损坏。`MinIO`还提供了丰富的功能，包括数据加密、访问控制、版本控制和事件通知等。

​	由于其开源和易于部署的特性，`MinIO`被广泛用于构建对象存储解决方案，例如用于数据备份、存档、大数据分析、内容交付网络（CDN）等应用场景。

## Docker 安装 `minio`

```bash
# 搜索 minio
docker search minio
```

```bash
# 拉取 minio 镜像
docker pull minio/minio
```

## 启动 `minio`

```bash
docker run -p 9000:9000 -p 9090:9090 \
> --name minio \
> -d --restart=always \
> -e "MINIO_ACCESS_KEY=minioadmin" \
> -e "MINIO_SECRET_KEY=minioadmin" \
> -v /mydata/minio/data:/data \
> minio/minio server \
> /data --console-address ":9090" -address ":9000"
```

运行后访问http://124.221.121.35:9090/即可

![image-20240304171833333](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304171833333.png)

## `Minio` 使用

### 创建 `Bucket`

![image-20240304172418145](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304172418145.png)

输入`Bucket`名称即可

