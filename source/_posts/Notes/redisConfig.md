---
title: Windows下Redis后台启动配置
date: 2022年11月27日16:06:53
tags: 配置
categories: 问题解决
---

# 解决：资料来自[Windows Redis 开机启动后台运行](https://www.cnblogs.com/zhainan-blog/p/11939828.html)

# 1.从 Redis 的安装目录进入 cmd

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1718779-20191127091742352-177477481.png)

# 2.在 cmd 中输入, 将Redis绑定为 Windows 服务, 并设置为后台启动：

```
redis-server --service-install redis.windows.conf --loglevel verbose    // 安装redis服务
```

![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1718779-20191127091943978-167678441.png)

# 3.启动服务：

```
redis-server --service-start    // 启动服务
```

![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1718779-20191127091955723-1288862965.png)

# 4.停止服务：

```
redis-server --service-stop    // 停止服务
```

# 5.三、四向也可以使用 Windows 图形化界面完成

　　1) 右键"此电脑" --> "服务" --> 找到"Redis"

　　![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1718779-20191127092506913-874235892.png)

 　　2) 右键"Redis" --> "属性" --> "自动" --> "确定"

　　![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1718779-20191127092610431-514815174.png)
