---
title: 伙伴匹配系统
date: 2022年11月27日16:06:53
tags: 项目
categories: 问题解决
---

1. 前端跨域访问出错

问题描述：

![image-20221128141323068](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221128141323068.png)

* 当URL地址为**https**时会导致前端发送请求无法访问，控制台输出`ERR_SSL_PROTOCOL_ERROR`错误

解决：

将其改为

![image-20221128141919010](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221128141919010.png)

2. 搜索携带参数时请求失败

问题描述：

![image-20221128150219380](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221128150219380.png)

**400状态码**

解决：

因为传参的@RequestParam注解会给List参数名加上 [] ![image-20221128144657388](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221128144657388.png)所以要用qs去返回指定的参数名

但是貌似这一段代码会出错

```Vue
paramsSerializer: params => {
  return qs.stringify(params, {indices: false})
}
```

![image-20221128145853070](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221128145853070.png)查阅资料发现**产生原因**是 axios版本升级后，在请求参数中熟组序列化会出问题

需要更改这段代码为

```
paramsSerializer: {
  serialize:function(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  }
}
```

最后成功解决：

![image-20221128145826468](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221128145826468.png)
