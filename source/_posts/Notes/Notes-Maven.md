---
title: （黑马）Maven-前置基础（黑马版）
date: 2022年12月3日17:28:38
tags: Maven-更新中...
categories: Java学习笔记
---



# 1. 概述-简介

## 概述：
Maven是专门用于管理和构建Java项目的工具，它的**主要功能**有:

1. 提供了一套标准化的项目结构
2. 提供了一套标准化的构建流程（编译，测试，打包，发布......
3. 提供了一套依赖管理机制
## 简介：
**Apache Maven** 是一个项目管理和构建**工具**，它基于项目对象模型（POM）的概念，通过一小段描述信息来管理项目的构建、报告和文档
官网: [http://maven.apache.org/](http://maven.apache.org/)
![uTools_1657423264622.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657423271885-9865e6fd-f3e9-482b-8ba6-fe817f6d16a8.png#clientId=u19620cf4-3c0a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=460&id=u64e1cad5&margin=%5Bobject%20Object%5D&name=uTools_1657423264622.png&originHeight=690&originWidth=2166&originalType=binary&ratio=1&rotation=0&showTitle=false&size=442665&status=done&style=none&taskId=u726bb24e-3f2f-4f0a-83aa-b7a71c75d92&title=&width=1444)
![uTools_1657424086620.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657424093396-9e0f6025-d1a2-4e91-8da2-96fea57bb5d3.png#clientId=u19620cf4-3c0a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=506&id=u8cc2fd9f&margin=%5Bobject%20Object%5D&name=uTools_1657424086620.png&originHeight=759&originWidth=1425&originalType=binary&ratio=1&rotation=0&showTitle=false&size=332685&status=done&style=none&taskId=uc93f42a5-d795-4eb0-aa91-342fce1ce99&title=&width=950)
# 2. Maven安装配置

1. 解压apache-maven-3.6.1.rar既安装完成
2. 配置环境变量MAVEN_HOME 为安装路径的bin目录
3. 配置本地仓库：修改conf/settings.xml中的<localRepository> 为一个指定目录
4. 配置阿里云私服：修改comf/settings.xml中的 <mirrors>标签，为其添加如下子标签:

<mirror>
<id>alimaven</id>
<name>aliyun maven</name>
<url>[http://maven.aliyun.com/nexus/content/qroups/public/</url>](http://maven.aliyun.com/nexus/content/qroups/public/</url>)
<mirrorOf>central</mirrorOf>
</mirror>
# 3. Maven基本使用
## 3.1 Maven 常用命令

1. **complie：	编译**
2. **clean：		清理**
3. **test：		测试**
4. **package：	打包**
5. **install：	安装**
## 3.2 Maven 生命周期
![uTools_1657461620200.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657461625055-5492ccb2-36e5-41e3-badb-a065c0af12bf.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=315&id=uc3b631b9&margin=%5Bobject%20Object%5D&name=uTools_1657461620200.png&originHeight=473&originWidth=1254&originalType=binary&ratio=1&rotation=0&showTitle=false&size=205177&status=done&style=none&taskId=ub549398b-327c-4e54-84b4-b8c2acf6b90&title=&width=836)
![uTools_1657461790268.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657461799422-1a9e64e3-28f2-48f9-b320-90dda1f6063c.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=704&id=u3cc24f32&margin=%5Bobject%20Object%5D&name=uTools_1657461790268.png&originHeight=1056&originWidth=1513&originalType=binary&ratio=1&rotation=0&showTitle=false&size=664514&status=done&style=none&taskId=u53aaa5b9-badb-4191-a218-050a7c12d10&title=&width=1008.6666666666666)
# 4.IDEA 配置 Maven
## 4.1 IDEA 配置 Maven环境
![uTools_1657461959079.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657461965411-dccfcd52-541b-4ac2-b585-39b6bbc0a54c.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=668&id=u14bb9ec9&margin=%5Bobject%20Object%5D&name=uTools_1657461959079.png&originHeight=1002&originWidth=2150&originalType=binary&ratio=1&rotation=0&showTitle=false&size=957436&status=done&style=none&taskId=u1fcf6c8b-6fb9-4c3b-b885-3a7551cd0b7&title=&width=1433.3333333333333)
## 4.2 Maven 坐标详解
![uTools_1657462175415.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657462180176-2ba548db-eb14-4385-9aa2-b1c27461920e.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=382&id=ufc2a9848&margin=%5Bobject%20Object%5D&name=uTools_1657462175415.png&originHeight=573&originWidth=1260&originalType=binary&ratio=1&rotation=0&showTitle=false&size=288884&status=done&style=none&taskId=ub0295260-85d9-4965-a074-ac6b7806dcf&title=&width=840)
## 4.3 IDEA 创建 Maven 项目
![uTools_1657463752962.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657463767463-414d8b4a-cd7e-4fea-839e-a892c0621873.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=620&id=u800dce68&margin=%5Bobject%20Object%5D&name=uTools_1657463752962.png&originHeight=930&originWidth=2049&originalType=binary&ratio=1&rotation=0&showTitle=false&size=906890&status=done&style=none&taskId=ud6b521c2-3dc2-4f12-95f8-00dd6351787&title=&width=1366)
## 4.4 IDEA 导入 Maven 项目
![uTools_1657463782446.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657463791285-334ecc27-f502-4864-a785-9ec037215130.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=689&id=ub756b09a&margin=%5Bobject%20Object%5D&name=uTools_1657463782446.png&originHeight=1033&originWidth=2154&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1030167&status=done&style=none&taskId=u611a7df7-faf0-4c5b-85b9-abe99196935&title=&width=1436)
### 小插件
![uTools_1657464001652.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657464014616-c4f8cdcf-b576-4996-b10a-8774cbfb2fab.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=704&id=uc55c96c0&margin=%5Bobject%20Object%5D&name=uTools_1657464001652.png&originHeight=1056&originWidth=2073&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1114507&status=done&style=none&taskId=u7a6a55c8-9265-41a9-a8a9-2c21713c5df&title=&width=1382)
# 5. 依赖管理
![uTools_1657464056430.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657464059112-d72809b2-c569-4333-bfd4-ac0f3920ca70.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=432&id=u3f2373cd&margin=%5Bobject%20Object%5D&name=uTools_1657464056430.png&originHeight=648&originWidth=1320&originalType=binary&ratio=1&rotation=0&showTitle=false&size=305722&status=done&style=none&taskId=u3470a600-32d5-4180-8d11-91c1704c0cb&title=&width=880) ![uTools_1657464627897.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657464631773-164de610-fa5c-4601-b89f-a9740e7651ba.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=473&id=u807366b6&margin=%5Bobject%20Object%5D&name=uTools_1657464627897.png&originHeight=710&originWidth=1365&originalType=binary&ratio=1&rotation=0&showTitle=false&size=375380&status=done&style=none&taskId=u72c8a651-9a2a-4c42-ad73-3da9855d1f4&title=&width=910)
![uTools_1657464644856.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657464649596-5c2d0116-96f1-4c52-9fda-87dbe749a6a8.png#clientId=ueabe4783-af9a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=474&id=ucfe00c32&margin=%5Bobject%20Object%5D&name=uTools_1657464644856.png&originHeight=711&originWidth=1327&originalType=binary&ratio=1&rotation=0&showTitle=false&size=332715&status=done&style=none&taskId=u4b87374b-5cc1-4420-8ff2-9d6764fb1c3&title=&width=884.6666666666666)

