---
title: MyBatis（黑马版）
date: 2022年12月3日17:26:19
tags: MyBatis-更新中...
categories: Java学习笔记
---

# 1.Mybatis 简介

## 什么是MyBatis?
MyBatis 是一款优秀的**持久层框架**，用于简化JDBC开发
MyBatis 本是 Apache 的一个开源项目iBatis, 2010年这个项目由apache software
foundation 迁移到了google code为MyBatis 2013年11月迁移到Github
●官网:[mybatis – MyBatis 3 | 简介](https://mybatis.org/mybatis-3/zh/index.html)
## 持久层

1. 负责将数据到保存到数据库的那一层代码
2. JavaEE三层架构：表现层、业务层、持久层
## 框架

1. 框架就是一个半成品软件，是一套可重用的、通用的、软件基础代码模型
2. 在框框架的基础之上构建软件编写更加高效、规范、通用、可扩展
## Mybatis简化：
![uTools_1657506219265.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657506241391-d4bb1629-a2f7-41a1-9390-3a2ab93f48d4.png#clientId=ua1f5f92d-26b0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=577&id=u56b711f2&margin=%5Bobject%20Object%5D&name=uTools_1657506219265.png&originHeight=865&originWidth=1386&originalType=binary&ratio=1&rotation=0&showTitle=false&size=687368&status=done&style=none&taskId=u8bcbb860-6f8d-45d3-8648-9f2ba508a6b&title=&width=924)
**MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作**
# 2. **Mybatis 快速入门
![uTools_1657506832626.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657506837956-28f14a51-5a8d-4e72-ac6e-fe03b2532736.png#clientId=ua1f5f92d-26b0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=537&id=u4649a599&margin=%5Bobject%20Object%5D&name=uTools_1657506832626.png&originHeight=805&originWidth=2081&originalType=binary&ratio=1&rotation=0&showTitle=false&size=629090&status=done&style=none&taskId=u8fcae809-0cca-47ca-af8c-515e8794dbd&title=&width=1387.3333333333333)
# 3. Mapper 代理开发
![uTools_1657542582923.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657542586809-214e0e4f-773b-4225-bdad-33ba046a7ef3.png#clientId=u046bdc14-3bf2-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=336&id=uf9e13a36&margin=%5Bobject%20Object%5D&name=uTools_1657542582923.png&originHeight=504&originWidth=1372&originalType=binary&ratio=1&rotation=0&showTitle=false&size=201704&status=done&style=none&taskId=ufef2fdde-30a7-41c7-a76a-2e7a83c965b&title=&width=914.6666666666666)
![uTools_1657542717398.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657542721631-ed7d823d-25cf-4ff0-95fb-ca45820a64b9.png#clientId=u046bdc14-3bf2-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=473&id=u8567605a&margin=%5Bobject%20Object%5D&name=uTools_1657542717398.png&originHeight=710&originWidth=1350&originalType=binary&ratio=1&rotation=0&showTitle=false&size=432689&status=done&style=none&taskId=uf52d577b-5d9c-48fb-b0f1-f1d444927e3&title=&width=900)
# 4. Mybatis 核心配置文件
![uTools_1657544008304.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657544014638-d4e6c9a8-df9a-4c6c-ab15-4c1f4be3037d.png#clientId=u046bdc14-3bf2-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=457&id=u85bb8b29&margin=%5Bobject%20Object%5D&name=uTools_1657544008304.png&originHeight=685&originWidth=943&originalType=binary&ratio=1&rotation=0&showTitle=false&size=278920&status=done&style=none&taskId=u7c6a75ff-1b43-4b16-ac24-454c0c8c01a&title=&width=628.6666666666666)
# 5. 配置文件完成增删改查
![uTools_1657614699342.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657614703595-d652cd14-e68b-4c71-82e3-eaa9cee0cc3f.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=614&id=u07c20ee1&margin=%5Bobject%20Object%5D&name=uTools_1657614699342.png&originHeight=921&originWidth=1888&originalType=binary&ratio=1&rotation=0&showTitle=false&size=177114&status=done&style=none&taskId=u8ce7ad62-047e-4678-80b2-8a0271873d6&title=&width=1258.6666666666667)
![uTools_1657614759478.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657614764554-006d1101-3565-463b-a477-8576cc0ec4ea.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=320&id=uf67420a3&margin=%5Bobject%20Object%5D&name=uTools_1657614759478.png&originHeight=480&originWidth=1168&originalType=binary&ratio=1&rotation=0&showTitle=false&size=147436&status=done&style=none&taskId=u3d7a98dd-ed77-4035-b565-d9503b550ed&title=&width=778.6666666666666)
![uTools_1657615291413.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657615297012-e50913b9-3309-473c-ad13-f31325231c91.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=647&id=u311bc93d&margin=%5Bobject%20Object%5D&name=uTools_1657615291413.png&originHeight=971&originWidth=1419&originalType=binary&ratio=1&rotation=0&showTitle=false&size=498553&status=done&style=none&taskId=u5b8d5a11-a028-40f2-8429-6ba7567e8ea&title=&width=946)
## 5.1 查询
### 5.1.1 查询所有数据
![uTools_1657615765253.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657615770908-174a35b6-b1c7-4b97-9836-62e84d7b327f.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=594&id=u049c8932&margin=%5Bobject%20Object%5D&name=uTools_1657615765253.png&originHeight=891&originWidth=1689&originalType=binary&ratio=1&rotation=0&showTitle=false&size=482929&status=done&style=none&taskId=uf56fe319-f0b4-44da-9d98-bd07cd7921f&title=&width=1126)
#### 总结：
![uTools_1657616611077.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657616614495-d20c3677-6073-487d-be40-01705e15cd5f.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=331&id=u252ab1d7&margin=%5Bobject%20Object%5D&name=uTools_1657616611077.png&originHeight=496&originWidth=1569&originalType=binary&ratio=1&rotation=0&showTitle=false&size=268716&status=done&style=none&taskId=u0088a486-b2f5-4d85-a59d-23c78d6cb78&title=&width=1046)
![uTools_1657621718623.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657621723187-a7abf271-be1b-4d26-83dd-49b6440c5bd5.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=386&id=u68b96a45&margin=%5Bobject%20Object%5D&name=uTools_1657621718623.png&originHeight=579&originWidth=1850&originalType=binary&ratio=1&rotation=0&showTitle=false&size=350679&status=done&style=none&taskId=ucc6265dc-5f17-4582-9bf0-d84d128cc33&title=&width=1233.3333333333333)
### 5.1.2 查看详情
![uTools_1657621887710.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657621892405-3965254c-dab6-4c53-94d9-c8b91861576f.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=606&id=uef54d9e5&margin=%5Bobject%20Object%5D&name=uTools_1657621887710.png&originHeight=909&originWidth=1970&originalType=binary&ratio=1&rotation=0&showTitle=false&size=513692&status=done&style=none&taskId=u07fc5298-053c-47c2-9eff-e1bb2bc45f1&title=&width=1313.3333333333333)
![uTools_1657622691463.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657622697068-13562584-dd60-4591-8425-f1f5102f5ed9.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=525&id=u47010860&margin=%5Bobject%20Object%5D&name=uTools_1657622691463.png&originHeight=788&originWidth=1636&originalType=binary&ratio=1&rotation=0&showTitle=false&size=416337&status=done&style=none&taskId=u4991897e-26e9-46c8-a003-109f2c7d164&title=&width=1090.6666666666667)
### 5.1.3 条件查询
#### 一：多条件查询
![uTools_1657622779667.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657622789335-b212d261-392e-4bd7-abce-914d088e0d48.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=683&id=u31acf4fd&margin=%5Bobject%20Object%5D&name=uTools_1657622779667.png&originHeight=1024&originWidth=1950&originalType=binary&ratio=1&rotation=0&showTitle=false&size=900805&status=done&style=none&taskId=u820031ac-0e8e-41bd-8a74-5216d12964a&title=&width=1300)
![uTools_1657627999583.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657628005390-10125b60-5b79-44e6-bb50-a8fe05c11524.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=426&id=ud542c9b1&margin=%5Bobject%20Object%5D&name=uTools_1657627999583.png&originHeight=639&originWidth=1972&originalType=binary&ratio=1&rotation=0&showTitle=false&size=394284&status=done&style=none&taskId=u5acd81df-f985-45ef-a8c5-f64e1198d23&title=&width=1314.6666666666667)

#### 二：多条件-动态条件查询
![uTools_1657622803135.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657622815315-6b0bc37e-d98b-48dd-972f-32bb8669b38f.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=659&id=u98ffff5c&margin=%5Bobject%20Object%5D&name=uTools_1657622803135.png&originHeight=989&originWidth=1519&originalType=binary&ratio=1&rotation=0&showTitle=false&size=611388&status=done&style=none&taskId=uce0f4dd8-391f-4caf-9eaa-abd8799a6e1&title=&width=1012.6666666666666)
![uTools_1657628905100.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657628913631-3e9dc297-7a74-410d-8a6c-42e1f9258cda.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=395&id=u903e59eb&margin=%5Bobject%20Object%5D&name=uTools_1657628905100.png&originHeight=593&originWidth=1596&originalType=binary&ratio=1&rotation=0&showTitle=false&size=341814&status=done&style=none&taskId=u5d8b428a-432c-45f4-abf9-40206f438bf&title=&width=1064)
#### 三：单条件=动态条件查询
![uTools_1657622833771.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657622841388-d122a86a-4389-4b19-9f85-57ec13a38828.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=698&id=uadb77c02&margin=%5Bobject%20Object%5D&name=uTools_1657622833771.png&originHeight=1047&originWidth=2039&originalType=binary&ratio=1&rotation=0&showTitle=false&size=891958&status=done&style=none&taskId=ub354929c-53ba-4984-8085-0a155582afc&title=&width=1359.3333333333333)
## 5.2 添加
![uTools_1657629649474.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657629654656-96927249-d636-44dc-95e8-0e216e697afb.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=679&id=uc70b258e&margin=%5Bobject%20Object%5D&name=uTools_1657629649474.png&originHeight=1018&originWidth=1903&originalType=binary&ratio=1&rotation=0&showTitle=false&size=644212&status=done&style=none&taskId=u7c6348fa-85f1-4540-b3c2-065e83ad3a1&title=&width=1268.6666666666667)
![uTools_1657638419260.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657638426688-7e2e1d08-b582-4874-b40e-08eb0f726a5f.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=652&id=ud8e8fb5f&margin=%5Bobject%20Object%5D&name=uTools_1657638419260.png&originHeight=978&originWidth=2011&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1129355&status=done&style=none&taskId=uc86a8b8c-2c81-4d2d-9b97-c23b7c46b81&title=&width=1340.6666666666667)
![uTools_1657638675027.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657638679272-8846b5a0-79f2-4c78-941e-0420002c4ed1.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=436&id=u454c5642&margin=%5Bobject%20Object%5D&name=uTools_1657638675027.png&originHeight=654&originWidth=1674&originalType=binary&ratio=1&rotation=0&showTitle=false&size=296152&status=done&style=none&taskId=ue4af9a66-c09f-4c1d-ae93-bafd5df6bb5&title=&width=1116)
## 5.3 修改
### 5.3.1 修改全部字段
![uTools_1657638707611.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657638711794-9dd58a02-6843-4c86-915d-6e346b1dc05c.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=525&id=u6aa0df98&margin=%5Bobject%20Object%5D&name=uTools_1657638707611.png&originHeight=787&originWidth=2108&originalType=binary&ratio=1&rotation=0&showTitle=false&size=667833&status=done&style=none&taskId=ub7da9e28-dbf2-4bb2-bf42-0633506a9e5&title=&width=1405.3333333333333)
### 5.3.2 修改动态字段
![uTools_1657639268445.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657639273991-55741bff-6702-400c-a869-bc42439ad91d.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=677&id=u6229de01&margin=%5Bobject%20Object%5D&name=uTools_1657639268445.png&originHeight=1015&originWidth=1978&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1057722&status=done&style=none&taskId=ufa056eac-1a9e-469f-8d71-a78d3a92fc5&title=&width=1318.6666666666667)
## 5.4 删除
### 5.4.1 删除一个
![uTools_1657639722849.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657639726882-34c102f3-792f-44b0-90b8-128a49546f98.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=624&id=u593c5e1e&margin=%5Bobject%20Object%5D&name=uTools_1657639722849.png&originHeight=936&originWidth=1911&originalType=binary&ratio=1&rotation=0&showTitle=false&size=374678&status=done&style=none&taskId=u1afd64cc-f40f-4042-aeb8-303206e64fd&title=&width=1274)
### 5.4.2 批量删除	
![uTools_1657640024499.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657640030738-8b28e7bb-b53f-4190-a5b2-45f66c5f888e.png#clientId=u0df98ffa-239c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=670&id=u34945896&margin=%5Bobject%20Object%5D&name=uTools_1657640024499.png&originHeight=1005&originWidth=2025&originalType=binary&ratio=1&rotation=0&showTitle=false&size=637169&status=done&style=none&taskId=u9051b4a5-51da-43a9-9df2-a5df4718e32&title=&width=1350)
# 6. 注解完成增删改查
![uTools_1657677435952.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657677441067-591cea6e-9729-478f-926d-b61535404d11.png#clientId=ued74464b-c071-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=613&id=u5e086247&margin=%5Bobject%20Object%5D&name=uTools_1657677435952.png&originHeight=919&originWidth=1899&originalType=binary&ratio=1&rotation=0&showTitle=false&size=505260&status=done&style=none&taskId=u20f61222-b8c0-457a-bb43-49788f46c2a&title=&width=1266)
# 7. 动态SQL
