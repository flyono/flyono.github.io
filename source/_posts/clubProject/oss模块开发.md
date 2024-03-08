---
title: oss模块开发
date: 2024-3-5
updated: 2024-3-6
categories: "模块设计"
tags: 
  - "oss"
  - "模块化"
---

# OSS 模块开发

## 介绍

当我们是想要更换不同的OSS服务时，我们可以抽取单独独立一个模块来开发相关服务，这样一来，如果我们需要更换oss服务，就只需修改模块内的相关代码，而不必修改整个项目

## 配置 Minio

1. 首先创建 `oss` 模块，导入基本`maven`依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>2.4.2</version>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-logging</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>2.4.2</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
</dependencies>
```

2. 修改配置

```yml
server:
	port: 4000
```

3. 修改目录结构

```
----main
	----java
		----com
			----flyone
				----oss
					----config
					----controller
					----util
	----resource
----test
```

4. 导入 `minio`相关的依赖

```xml
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.4.5</version>
</dependency>
```

5. 配置 `Minio`

```java
package com.flyone.oss.config;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

/**
 * Minio 配置管理
 *
 * @author flyone
 * @date 2024/3/5
 */
public class MinioConfig {
    /**
     * minio URL 为 9000端口
     */
    @Value("${minio.url}")
    private String url;

    /**
     * minio 用户名
     */
    @Value("${minio.accessKey}")
    private String accessKey;

    /**
     * minio 密码
     */
    @Value("${minio.secretKey}")
    private String secretKey;

    /**
     * 获取 MinioClient
     * @return MinioClient
     */
    @Bean
    public MinioClient getMinioClient() {
        return MinioClient.builder()
                .endpoint(url)
                .credentials(accessKey, secretKey)
                .build();
    }
}
```

6. 配置`MinioUtil`的文件操作类

```java
/**
 * minio 文件操作工具
 */
@Component
public class MinioUtil {

    @Resource
    private MinioClient minioClient;

    /**
     * 创建 bucket
     */
    public void createBucket(String bucketName) throws Exception {
        boolean exists = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        if (!exists) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }
    }

    /**
     * 上传文件
     *
     * @param inputStream 文件流
     * @param bucket      存储桶
     * @param objectName  文件名
     * @throws Exception 异常
     */
    public void uploadFile(InputStream inputStream, String bucket, String objectName) throws Exception {
        ObjectWriteResponse objectWriteResponse = minioClient.putObject(
            PutObjectArgs.builder().bucket(bucket).object(objectName).
            stream(inputStream, -1, Integer.MAX_VALUE).build());

    }

    /**
     * 列出所有桶
     */
    public List<String> getAllBucket() throws Exception {
        List<Bucket> buckets = minioClient.listBuckets();
        return buckets.stream().map(Bucket::name).collect(Collectors.toList());
    }

    /**
     * 列出当前桶及文件
     * @param bucket 桶名
     */
    public List<FileInfo> getAllFile(String bucket) throws Exception {
        Iterable<Result<Item>> results = minioClient.listObjects(
            ListObjectsArgs.builder().bucket(bucket).build());
        List<FileInfo> fileInfoList = new ArrayList<>();
        for (Result<Item> result : results) {
            Item item = result.get();
            FileInfo fileInfo = new FileInfo();
            fileInfo.setFileName(item.objectName());
            fileInfo.setDirectoryFlag(item.isDir());
            fileInfo.setEtag(item.etag());
            fileInfoList.add(fileInfo);
        }
        return fileInfoList;
    }

    /**
     * 下载文件
     * @param bucket 桶名
     * @param objectName 文件名
     * @return 文件流
     */
    public InputStream downloadFile(String bucket, String objectName) throws Exception {
        return minioClient.getObject(GetObjectArgs.builder().bucket(bucket).object(objectName).build());
    }

    /**
     * 删除桶
     * @param bucket 桶名
     */
    public void deleteBucket(String bucket) throws Exception {
        minioClient.removeBucket(RemoveBucketArgs.builder().bucket(bucket).build());
    }

    /**
     * 删除文件
     * @param bucket 桶名
     * @param objectName 文件名
     */
    public void deleteObject(String bucket, String objectName) throws Exception {
        minioClient.removeObject(RemoveObjectArgs.builder().bucket(bucket).object(objectName).build());
    }
}
```

7. 测试 minio

```java
@RequestMapping("/testGetAllBucket")
public String testGetAllBucket() throws Exception {
    List<String> allBucket = minioUtil.getAllBucket();
    return allBucket.toString();
}
```

## 扩展 Service

创建`StorageService`来帮助其他服务调用。

然后创建`MinioStorageServiceImpl`来实现`Minio`的服务调用

在创建`AliStorageServiceImpl`来实现阿里云的服务调用

可以发现当两个实现类都使用`@Service`的注解后启动会报错

> `Caused by: org.springframework.beans.factory.NoUniqueBeanDefinitionException: No qualifying bean of type 'com.flyone.oss.service.StorageService' available: expected single matching bean but found 2: aliStorageServiceImpl,minioStorageServiceImpl`

这是因为Spring不清楚我们需要用的是哪个服务，所以需要在注解上标注出服务

![image-20240305125039590](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240305125039590.png)

这样我们在调用的时候只需要导入相应的服务即可

```java
@Resource
private StorageService minioStorageServiceImpl;
```

但是，这样当我们需要更换`OSS`服务时，就需要去修改每一个调用的地方

> 于是，我们就可以用到适配器模式。

## 适配器模式

适配器模式是一种结构型设计模式，它允许将一个类的接口转换成客户端所期望的另一个接口。这种模式通常用于解决两个不兼容的接口之间的兼容性问题。

在适配器模式中，有三个主要角色：

1. **目标接口（Target）**：客户端期望的接口，适配器会实现这个接口，使得客户端可以通过这个接口与适配器进行交互。
2. **适配器（Adapter）**：适配器是一个实现了目标接口的类，它包含了一个对源接口的引用。适配器会通过实现目标接口的方法，并在其中调用源接口的方法来实现接口的适配。
3. **源接口（Adaptee）**：需要被适配的接口，也就是客户端原本无法直接使用的接口。适配器会封装源接口，并将其适配成目标接口。

适配器模式的使用场景包括：

- 当需要使用一个已经存在的类，但其接口与所需接口不匹配时。
- 当需要创建一个可重用的类，该类能与多个不兼容的接口一起工作时。
- 当希望通过某种方式将一些类与其他类解耦时。

### 使用

1. 新建`FileService`

```java
@Service
public class FileService {

    /**
     * 文件存储适配器
     *
     * @auther flyone
     * @date 2024/3/5
     */
    private final StorageAdapter storageAdapter;

    public FileService(StorageAdapter storageAdapter) {
        this.storageAdapter = storageAdapter;
    }

    public List<String> getAllBucket() {
        return storageAdapter.getAllBucket();
    }
}
```

2. 然后新建`StorageConfig`类

```java
/**
 * 存储 配置
 *
 * @author flyone
 * @date 2024/3/5
 */
@Configuration
public class StorageConfig {

    @Value("${storage.service.type}")
    private String storageType;

    @Bean
    public StorageAdapter storageService() {
        if ("ali".equals(storageType)) {
            return new AliStorageAdapter();
        } else if ("minio".equals(storageType)) {
            return new MinioStorageAdapter();
        } else {
            throw new IllegalArgumentException("未找到对应的存储实现类");
        }
    }

}
```

3. 定义存储实现适配器

```java
/**
 * Minio 存储实现类
 *
 * @author flyone
 * @date 2024/3/5
 */
public class MinioStorageAdapter implements StorageAdapter {

}
```

```java
/**
 * Minio 存储实现类
 *
 * @author flyone
 * @date 2024/3/5
 */
public class AliStorageAdapter implements StorageAdapter {
   
}
```

至此，适配器的使用基本完成

## 动态配置

此操作须在`nacos`中进行配置，请务必确保`nacos`服务启动。

1. 项目导入 `nacos`依赖

```xml
<!--nacos-->
<dependency>
    <groupId>com.alibaba.boot</groupId>
    <artifactId>nacos-config-spring-boot-starter</artifactId>
    <version>0.2.11</version>
</dependency>
```

2. 导入配置

```yaml
# nacos 配置
nacos:
  config:
    access-key: nacos
    secret-key: nacos
    data-id: club-oss
    group: DEFAULT_GROUP
    type: yaml
    server-addr: http://124.221.121.35:8848/
    # 自动刷新
    auto-refresh: true
    # 是否开启远程配置
    remote-first: true
    # 是否开启监听
    bootstrap:
      enable: true
```

3. 启动项目进行测试

### `nacos` 实现 `bean` 动态加载

1. 注释掉`nacos-config-spring-boot-starter`重新导入依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    <version>2021.1</version>
</dependency>
```

2. 新建配置文件`bootstrap.yml`

该配置文件会比`application.yml`文件更早的进行注入

```yml
spring:
  application:
    name: club-oss-dev
  profiles:
    active: dev
  cloud:
    nacos:
      config:
        server-addr: 124.221.121.35:8848
        prefix: ${spring.application.name}
        group: DEFAULT_GROUP
        namespace:
        file-extension: yaml
      discovery:
        enabled: true
        server-addr: 124.221.121.35:8848
```

这时的环境配置就完成了

