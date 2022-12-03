---
title: Web 核心（黑马版）
date: 2022年12月3日16:45:13
tag: JavaWeb-更新中...
categories: Java学习笔记
---

# 一. Web

![image-20221203165058657](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203165058657.png)

---

# 二. HTTP
![image-20221203165112499](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203165112499.png)
## HTTP协议特点:

1. 基于TCP协议:面向连接，安全
2.  基于请求-响应模型的：一次请求对应一次响应
3. HTTP协议是无状态的协议：对于事务处理没有记忆能力。每次请求-响应都是独立的。
   * 缺点：多次请求间不能共享数据。Java中使用会话技术（Cookie，Session）来解决这个问题
   * 优点：速度快
## 2.1 HTTP-请求数据格式
**请求数据分为3部分:**

1. **请求行**：请求数据的第一行。其中GET表示请求方式，/表示请求资源路径，HTTP/1.1表示协议版本
2. **请求头**：第二行开始，格式为key:value形式。
3. **请求体**：POST请求的最后一部分，存放请求参数

```
GET / HTTP /1.1
Host: www.itheima.cn
Connection: keep-alive
Cache-Control: max-age=0 Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 Chrome/91.0.4472.106
···
```

**GET请求和 POST请求区别:**

1. * GET请求参数在请求行中，没有请求体。
   * POST请求请求参数在请求体中

2. * GET请求参数大小有限制
   * POST请求参数大小没有限制

```
Post / HTTP /1.1
Host: www.itheima.cn
Connection: keep-alive
Cache-Control: max-age=0 Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 Chrome/91.0.4472.106

username=superbaby&password=123456
```

### 常见的HTTP 请求头:

1. **Host**:				表示请求的主机名
2. **User-Agent**:		浏览器版本，例如Chrome浏览器的标识类似Mozilla/5.0 .
3. **Chrome/79**: 		IE浏览器的标识类似Mozilla/5.0 (Windows NT ..) like Gecko；
4. **Accept**:				表示浏览器能接收的资源类型，如text/*, image/*或者*/*表示所有;
5. **Accept-Language**：	表示浏览器偏好的语言，服务器可以据此返回不同语言的网页;
6. **Accept-Encoding**：	表示浏览器可以支持的压缩类型，例如qzip, deflate等。
## 2.2 HTTP-响应数据格式
**响应数据分为3部分:**

1. **响应行**：响应数据的第一行。其中HTTP/1.1表示协议版本，200表示响应状态码，OK表示状态码描述
2. **响应头**：第二行开始， 格式为key: value形式
3. **响应体**：最后一部分。存放响应数据

```
HTTP/1.1 200 OK
Server: Tengine
Content-Type: text/html
Transfer-Encoding: chunked

<html>
<head>
	<title></title>
</head>
<body></body>
</html>
```

### 响应状态码
#### 一、状态码大类
| 状态码分类 | 说明 |
| --- | --- |
| 1xx | **响应中**——临时状态码，表示请求已经接受，告诉客户端应该继续请求或者如果它已经完成则忽略它 |
| 2xx | **成功**——表示请求已经被成功接收，处理已完成 |
| 3xx | **重定向**——重定向到其它地方：它让客户端再发起一个请求以完成整个处理。 |
| 4xx | **客户端错误**——处理发生错误，责任在客户端，如：客户端的请求一个不存在的资源，客户端未被授权，禁止访问等 |
| 5xx | **服务器端错误**——处理发生错误，责任在服务端，如：服务端抛出异常，路由出错，HTTP版本不支持等 |

### [状态码大全](https://cloud.tencent.com/developer/chapter/13553)

#### 二、常见的响应状态码
| 状态码 | 英文描述 | 解释 |
| --- | --- | --- |
| 200 | `**OK**` | 客户端请求成功，即**处理成功**，这是我们最想看到的状态码 |
| 302 | `**Found**` | 指示所请求的资源已移动到由`Location`
响应头给定的 URL，浏览器会自动重新访问到这个页面 |
| 304 | `**Not Modified**` | 告诉客户端，你请求的资源至上次取得后，服务端并未更改，你直接用你本地缓存吧。隐式重定向 |
| 400 | `**Bad Request**` | 客户端请求有**语法错误**，不能被服务器所理解 |
| 403 | `**Forbidden**` | 服务器收到请求，但是**拒绝提供服务**，比如：没有权限访问相关资源 |
| 404 | `**Not Found**` | **请求资源不存在**，一般是URL输入有误，或者网站资源被删除了 |
| 428 | `**Precondition Required**` | **服务器要求有条件的请求**，告诉客户端要想访问该资源，必须携带特定的请求头 |
| 429 | `**Too Many Requests**` | **太多请求**，可以限制客户端请求某个资源的数量，配合 Retry-After(多长时间后可以请求)响应头一起使用 |
| 431 | `**Request Header Fields Too Large**` | **请求头太大**，服务器不愿意处理请求，因为它的头部字段太大。请求可以在减少请求头域的大小后重新提交。 |
| 405 | `**Method Not Allowed**` | 请求方式有误，比如应该用GET请求方式的资源，用了POST |
| 500 | `**Internal Server Error**` | **服务器发生不可预期的错误**。服务器出异常了，赶紧看日志去吧 |
| 503 | `**Service Unavailable**` | **服务器尚未准备好处理请求**，服务器刚刚启动，还未初始化好 |
| 511 | `**Network Authentication Required**` | **客户端需要进行身份验证才能获得网络访问权限** |

### 常见的HTTP 响应头:

1. **Content-Type**：		表示该响应内容的类型，例如text/html，image/jpeg;
2. **Content-Length**:		表示该响应内容的长度（字节数) ;
3. **Content-Encoding**：	表示该响应压缩算法，例如gzip;
4. **Cache-Control**：		指示客户端应如何缓存，例如max-age=300表示可以最多缓存300秒

---

# 三. Web 服务器 - TomCat
![image-20221203165831750](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203165831750.png)
## 3.1 TomCat 
### 3.1.1 简介
![image-20221203165847635](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203165847635.png)
#### 1. Web 服务器作用？

- 封装HTTP协议操作，简化开发
- 可以将web项目部署到服务器中，对外提供网上浏览服务
#### 2. Tomcat是一个轻量级的Web服务器，支持Servlet/JSP少量JavaEE规范，也称为Web容器，Servlet容器
### 3.1.2 基本使用
![image-20221203165922890](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203165922890.png)
![image-20221203170218553](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170218553.png)
**端口号默认为8080（0-65535)**
![image-20221203170246139](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170246139.png)

### 3.1.3 在IDEA中创建Maven Web项目
#### 3.1.3.1 Web项目结构
![image-20221203170302219](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170302219.png)
![image-20221203170316753](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170316753.png)
![image-20221203170337626](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170337626.png)

#### 3.1.3.2  在IDEA中创建Maven Web项目

- **使用骨架**

![image-20221203170357995](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170357995.png)

- 不使用骨架

![image-20221203170414212](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170414212.png)
### 3.1.4 IDEA中使用Tomcat
![image-20221203170511848](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170511848.png)
![image-20221203170527114](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170527114.png)

---

# 四. Servlet
## 4.1 简介

![image-20221203170540196](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170540196.png)

## 4.2 快速入门
![image-20221203170557085](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170557085.png)
## 4.3 Servlet 执行流程
![image-20221203170649379](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221203170649379.png)
## 4.4 Servlet 生命周期
![uTools_1657789561646.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657789570243-840978f9-d05d-44f5-92fa-ed4855ce9ed1.png#clientId=u2fd3a702-6bd5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=727&id=u7f16ac2b&margin=%5Bobject%20Object%5D&name=uTools_1657789561646.png&originHeight=1091&originWidth=1571&originalType=binary&ratio=1&rotation=0&showTitle=false&size=771237&status=done&style=none&taskId=u15debdbc-397d-46b9-ad64-1c9b7545d98&title=&width=1047.3333333333333)
![uTools_1657789630238.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657789638974-30275bdd-4622-4e52-8328-7a71ac4186e8.png#clientId=u2fd3a702-6bd5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=227&id=ue38a7062&margin=%5Bobject%20Object%5D&name=uTools_1657789630238.png&originHeight=340&originWidth=671&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134824&status=done&style=none&taskId=u8bdacc81-c192-4213-bb08-1c090fadc83&title=&width=447.3333333333333)**设置Servlet的启动时机**
![uTools_1657790483457.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657790495771-11b38ba8-b45f-4143-82e9-6d47f6075ec8.png#clientId=u2fd3a702-6bd5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=682&id=u30cffcd7&margin=%5Bobject%20Object%5D&name=uTools_1657790483457.png&originHeight=1023&originWidth=1579&originalType=binary&ratio=1&rotation=0&showTitle=false&size=473728&status=done&style=none&taskId=u344c1e0a-4e25-424f-912d-f4e90cabf7a&title=&width=1052.6666666666667)
## 4.5 Servlet 体系结构
![uTools_1657790714758.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657790723795-54b4b979-6208-4211-b6d9-8b67c34eaf71.png#clientId=u2fd3a702-6bd5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=656&id=u14f4c8ce&margin=%5Bobject%20Object%5D&name=uTools_1657790714758.png&originHeight=984&originWidth=2157&originalType=binary&ratio=1&rotation=0&showTitle=false&size=554288&status=done&style=none&taskId=u7ce1170d-4844-48a8-9058-5360133b28a&title=&width=1438)
![uTools_1657791489069.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657791498889-80bacdea-ef27-4ec8-8dc1-fe4c1edd10ac.png#clientId=u2fd3a702-6bd5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=503&id=ub74314db&margin=%5Bobject%20Object%5D&name=uTools_1657791489069.png&originHeight=754&originWidth=1819&originalType=binary&ratio=1&rotation=0&showTitle=false&size=291578&status=done&style=none&taskId=u4acb8431-5583-4d3b-a21d-4ecc3da20dd&title=&width=1212.6666666666667)
## 4.6 Servlet urlPattern配置
![uTools_1657791547701.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657791556508-a68002ed-1746-42d0-ad16-d423ed1f4879.png#clientId=u2fd3a702-6bd5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=567&id=u58a05eaa&margin=%5Bobject%20Object%5D&name=uTools_1657791547701.png&originHeight=850&originWidth=1107&originalType=binary&ratio=1&rotation=0&showTitle=false&size=252012&status=done&style=none&taskId=u89da04d0-64b2-48f6-b785-ea1cc1d3d92&title=&width=738)
![uTools_1657791788105.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657791797090-6cfe832a-c0d7-4b30-9c10-963d949bb0fd.png#clientId=u2fd3a702-6bd5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=732&id=u67c52677&margin=%5Bobject%20Object%5D&name=uTools_1657791788105.png&originHeight=1098&originWidth=1893&originalType=binary&ratio=1&rotation=0&showTitle=false&size=625855&status=done&style=none&taskId=u592dcafa-9c4a-4a39-8e1a-a8cbc996e8a&title=&width=1262)
![uTools_1657792358863.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657792369308-03b88349-b253-4e33-b37b-64da99ec64ed.png#clientId=u2fd3a702-6bd5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=319&id=u23fbb208&margin=%5Bobject%20Object%5D&name=uTools_1657792358863.png&originHeight=478&originWidth=955&originalType=binary&ratio=1&rotation=0&showTitle=false&size=137626&status=done&style=none&taskId=u9e5c5e52-1374-48b4-9dc1-34ec49ccb02&title=&width=636.6666666666666)
## 4.7 XML 配置方法编写 Servlet
![uTools_1657855835984.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657855850718-9a447065-e15a-447a-9150-f7065486c694.png#clientId=u49fd9129-48e6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=409&id=u35f990d6&margin=%5Bobject%20Object%5D&name=uTools_1657855835984.png&originHeight=613&originWidth=1221&originalType=binary&ratio=1&rotation=0&showTitle=false&size=257408&status=done&style=none&taskId=ua63d3ce9-2389-4e87-9b5f-785fde1f0fa&title=&width=814)

---

# 五. Request
![uTools_1657856475242.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657856485804-1a8d32db-d990-4cc2-9bb6-30fca62bd328.png#clientId=u49fd9129-48e6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=679&id=uaf6db986&margin=%5Bobject%20Object%5D&name=uTools_1657856475242.png&originHeight=1018&originWidth=1975&originalType=binary&ratio=1&rotation=0&showTitle=false&size=805222&status=done&style=none&taskId=u0b2a8e51-bf1b-45a1-8092-3331faa56ff&title=&width=1316.6666666666667)
## 5.1 Request 继承体系
![uTools_1657856814811.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657856825220-f2d9c925-6996-451f-aa2f-ab5216363e1e.png#clientId=u49fd9129-48e6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=468&id=u98192245&margin=%5Bobject%20Object%5D&name=uTools_1657856814811.png&originHeight=702&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=250250&status=done&style=none&taskId=uc653fe5c-f65a-4b58-985b-d4eb29f52a9&title=&width=1057.3333333333333)
![uTools_1657857272617.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657857283946-972e24dd-ecce-4138-a124-34ca11d44a4d.png#clientId=u49fd9129-48e6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=212&id=ue22795df&margin=%5Bobject%20Object%5D&name=uTools_1657857272617.png&originHeight=318&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&size=145563&status=done&style=none&taskId=u765002d8-1f56-4392-ae52-becf2bcb8d4&title=&width=624.6666666666666)
## 5.2 Request 获取请求数据
### 5.2.1 获取请求数据
#### ①请求行![uTools_1657857472961.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657857483208-7c1a917c-5964-42cb-8e3d-d7d4481524f2.png#clientId=u49fd9129-48e6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=44&id=u25ef6c97&margin=%5Bobject%20Object%5D&name=uTools_1657857472961.png&originHeight=84&originWidth=857&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49433&status=done&style=stroke&taskId=ub299711a-7915-41a8-a00d-01b04b010cd&title=&width=451.3333435058594)

- **String getMethod(): 获取请求方式: GET**
- **String getContextPath() 获取虚拟目录(项目访问路径)：/request-demo**
- **StringBuffer getRequestURL(): 获取URL(统一资源定位符): **[**http://localhost:8080/request-demo/req1**](http://localhost:8080/request-demo/req1)
- **String getRequestURI0：获取URI(统一资源标识符):/request-demo/req1**
- **String getQueryString() 获取请求参数(GET方式): 	**username=zhangsan&password=123
- **BufferedReader getReader() 获取请求参数(POST方式)**
#### ②请求头![uTools_1657857806100.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657857817307-27db1afe-00d8-4366-9846-0bbf427ce505.png#clientId=u49fd9129-48e6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=31&id=udc49a2a5&margin=%5Bobject%20Object%5D&name=uTools_1657857806100.png&originHeight=60&originWidth=846&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46712&status=done&style=stroke&taskId=ud39673b9-463e-4ce3-af9c-3d717bf0337&title=&width=432)

- **String getHeader(Stringname):根据请求头名称，获取值**
#### ③请求体![uTools_1657857896110.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657857907229-91c1238e-9b45-4cb9-8d73-2082314791ed.png#clientId=u49fd9129-48e6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=34&id=uf904a807&margin=%5Bobject%20Object%5D&name=uTools_1657857896110.png&originHeight=65&originWidth=848&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36124&status=done&style=stroke&taskId=u5a28f145-4011-468a-bb16-b7b50edf734&title=&width=441.3333740234375)

- **ServletlnputStream getlnputStream(): 获取字节输入流**
- **BufferedReadergetReader(): 获取字符输入流**
### 5.2.2 通用方式获取请求参数
```java
//获取请求方式
String method = this.getMethod();
//判断
if("GET".equals(method)){
    params = this.getQueryString();
}else if("POST".equals(method)){
    BufferedReader reader = this.getReader();
    params = reader.readLine();
}
```

- **Map<String, String[ ]> getParameterMap():获取所有参数Map集合**
- **String[] getParameterValues(String name)：根据名称获取参数值（数组）**
- **String getParameter(String name): 根据名称获取参数值（单个值)**
### 5.2.3 请求参数中文乱码处理
![uTools_1657949554633.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657949564477-60ae7aa6-d330-4cea-a91a-a2ddd8f7c62d.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=329&id=ufd55491e&margin=%5Bobject%20Object%5D&name=uTools_1657949554633.png&originHeight=494&originWidth=911&originalType=binary&ratio=1&rotation=0&showTitle=false&size=192518&status=done&style=stroke&taskId=uaeec39d1-fd2a-4dc6-9ad3-109b04d5e58&title=&width=607.3333333333334)
![uTools_1657948577555.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657948582652-2864f7d3-0b65-43d0-be47-6bb2d0d6977e.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=145&id=ua3a44ac9&margin=%5Bobject%20Object%5D&name=uTools_1657948577555.png&originHeight=218&originWidth=773&originalType=binary&ratio=1&rotation=0&showTitle=false&size=54058&status=done&style=stroke&taskId=ubfaaa0ed-d641-4d2a-ab6a-5fe5d162d08&title=&width=515.3333333333334)
![uTools_1657948668791.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657948673840-92ed5d9f-4585-49b7-8b2a-475d295c9d1e.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=217&id=ue5587c2e&margin=%5Bobject%20Object%5D&name=uTools_1657948668791.png&originHeight=326&originWidth=1003&originalType=binary&ratio=1&rotation=0&showTitle=false&size=198078&status=done&style=stroke&taskId=u53295275-b582-447c-9ecd-901f05ae75b&title=&width=668.6666666666666)
![uTools_1657948871927.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657948878130-ac266f5b-6a59-4acf-846a-16ca52eeff69.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=291&id=u9ece43e7&margin=%5Bobject%20Object%5D&name=uTools_1657948871927.png&originHeight=437&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&size=228612&status=done&style=stroke&taskId=u02042d35-3171-4128-96cf-a02d6ac7247&title=&width=624.6666666666666)
## 5.3 Requset 请求转发
**请求转发(forward): 一种在服务器内部的资源跳转方式**
![uTools_1657950020537.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657950025363-b93bffe4-edf8-4fa0-a654-b709c7f4403b.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=569&id=u32aea7b7&margin=%5Bobject%20Object%5D&name=uTools_1657950020537.png&originHeight=853&originWidth=1353&originalType=binary&ratio=1&rotation=0&showTitle=false&size=403897&status=done&style=stroke&taskId=uf2218071-04c2-4115-a544-1badba93ce4&title=&width=902)
![uTools_1657950166767.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657950172467-ba8c8fb3-9a9d-41f4-ae09-417de13f1d64.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=170&id=ua89e9c89&margin=%5Bobject%20Object%5D&name=uTools_1657950166767.png&originHeight=255&originWidth=779&originalType=binary&ratio=1&rotation=0&showTitle=false&size=82496&status=done&style=stroke&taskId=u3e588975-f064-43a4-b82d-2f9a679dfc3&title=&width=519.3333333333334)

---

# 六.  Response
## 6.1 Response 设置响应数据功能介绍
![uTools_1657950612688.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657950626161-37c9a37a-0296-48e0-9068-d0dbcfe26b63.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=532&id=ube65577a&margin=%5Bobject%20Object%5D&name=uTools_1657950612688.png&originHeight=798&originWidth=1371&originalType=binary&ratio=1&rotation=0&showTitle=false&size=368108&status=done&style=stroke&taskId=uf8049208-4689-4338-8f16-494734e3dc3&title=&width=914)
## 6.2 Response 完成重定向
**重定向（Redirect）： 一种资源跳转方式**
![uTools_1657950789155.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657950795893-7aa62ed5-44af-41ae-b6a7-c8467abb382d.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=303&id=u48af2631&margin=%5Bobject%20Object%5D&name=uTools_1657950789155.png&originHeight=455&originWidth=1007&originalType=binary&ratio=1&rotation=0&showTitle=false&size=192424&status=done&style=stroke&taskId=ub174ffbb-7e54-4912-8883-3ecc894c6d5&title=&width=671.3333333333334)

| 方法 | 说明 |
| --- | --- |
| resp.setStatus(302) | 设置响应码为302 |
| resp.settHeader("location","资源的路径") | 设置响应头键值对 |
| resp.sendRedirect("资源B的路径") | 简化重定向方法 |


![uTools_1657952000895.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657952006735-4ba0b138-d288-4ddf-ae40-63ac18f9d575.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=179&id=u8f59337b&margin=%5Bobject%20Object%5D&name=uTools_1657952000895.png&originHeight=268&originWidth=838&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90283&status=done&style=stroke&taskId=u3278ee2a-7ca9-40c8-a2aa-58c2ae46fd1&title=&width=558.6666666666666)
### 路径问题
![uTools_1657952208030.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657952213407-35181b29-77f5-48ba-ae26-ac8cfcbe8e53.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=693&id=u0dcc2676&margin=%5Bobject%20Object%5D&name=uTools_1657952208030.png&originHeight=1039&originWidth=2041&originalType=binary&ratio=1&rotation=0&showTitle=false&size=603562&status=done&style=stroke&taskId=u04f5f23a-92a6-454b-b644-3d2b8f6ba43&title=&width=1360.6666666666667)
## 6.3 Response 响应字符数据
![uTools_1657954553286.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657954562763-f399cb84-5d2d-4ff2-aeb4-5f479fa890c6.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=551&id=u47df1b50&margin=%5Bobject%20Object%5D&name=uTools_1657954553286.png&originHeight=827&originWidth=1354&originalType=binary&ratio=1&rotation=0&showTitle=false&size=362214&status=done&style=stroke&taskId=u0635a54c-ed4b-422a-805a-6cdbb88d4bc&title=&width=902.6666666666666)
## 6.4 Response 响应字节数据
![uTools_1657955111034.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657955119967-6bf38971-9a5c-4de2-b581-a54b47115b93.png#clientId=u0f42a03c-47da-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=717&id=u2b2bc1c0&margin=%5Bobject%20Object%5D&name=uTools_1657955111034.png&originHeight=1075&originWidth=1307&originalType=binary&ratio=1&rotation=0&showTitle=false&size=475523&status=done&style=stroke&taskId=u31d827df-2f95-43a2-8e57-c57d9c18926&title=&width=871.3333333333334)

---

# 七.案例：用户登录与注册
## 7.1 用户登录-UserLoginDemo
![uTools_1657974779269.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657974783373-03e3c90a-f6b9-47cd-8470-009c88a894cf.png#clientId=uba1b131f-8ff3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=484&id=ue1f91c5a&margin=%5Bobject%20Object%5D&name=uTools_1657974779269.png&originHeight=726&originWidth=1509&originalType=binary&ratio=1&rotation=0&showTitle=false&size=336171&status=done&style=stroke&taskId=ub92d84b6-b87a-4309-a57d-c7c114e563e&title=&width=1006)
![uTools_1657974825772.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657974831034-6247a0da-778d-48f1-bfea-be3a9dd6ae9b.png#clientId=uba1b131f-8ff3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=221&id=udc3267b5&margin=%5Bobject%20Object%5D&name=uTools_1657974825772.png&originHeight=332&originWidth=1197&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103270&status=done&style=stroke&taskId=u1dc47406-bb66-4c24-ba2b-34fe5c62c05&title=&width=798)
## 7.2 用户注册-UserLoginDemo
![uTools_1658047106318.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658047110107-d6ae64eb-55ad-4e38-9dee-74c0c5a96086.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=485&id=uad9e41ba&margin=%5Bobject%20Object%5D&name=uTools_1658047106318.png&originHeight=728&originWidth=1540&originalType=binary&ratio=1&rotation=0&showTitle=false&size=332586&status=done&style=stroke&taskId=ue8927586-bf35-4f69-ab4c-80cff9e48a7&title=&width=1026.6666666666667)

---

# 八. SqlSessionFactory 工具类抽取
![uTools_1658048818520.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658048822529-20f220b4-3714-4a7c-9639-95f5c83eb6c1.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=325&id=u05dd5bd7&margin=%5Bobject%20Object%5D&name=uTools_1658048818520.png&originHeight=488&originWidth=1131&originalType=binary&ratio=1&rotation=0&showTitle=false&size=195768&status=done&style=stroke&taskId=uee958602-302f-499a-a12c-346ab2b087e&title=&width=754)
```java
package com.Flyone.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class SqlSessionFactoryUtils {

    private static SqlSessionFactory sqlSessionFactory;

    static {
        // 静态代码块会随着类的加载而自动执行，且只执行一次
        try {
            String resource = "mybatis-config.xml";
            InputStream inputStream = null;
            inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static SqlSessionFactory getSqlSessionFactory(){
        return sqlSessionFactory;
    }
}
```

---

# 九. JSP（淘汰-简单了解）

- **概念: Java Server Pages, Java服务端页面**
- **一种动态的网页技术，其中既可以定义 HTML、JS、CSS等静态内容，还可以定义Java代码的动态内容**
- **JSP = HTML + Java**
- **JSP的作用：简化开发，避免了在Servlet中直接输出HTML标签**
## 9.1 JSP 快速入门
![uTools_1658051080600.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658051089120-84e05c38-bae1-425d-9025-952c1e6dfa9c.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=717&id=ue637d28a&margin=%5Bobject%20Object%5D&name=uTools_1658051080600.png&originHeight=1075&originWidth=1578&originalType=binary&ratio=1&rotation=0&showTitle=false&size=551150&status=done&style=stroke&taskId=ue861406e-f4c9-42b9-b64a-8ddea5c973d&title=&width=1052)
## 9.2 JSP 原理
![uTools_1658051413945.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658051419133-44285975-c145-4e81-8a53-527d932d2cd7.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=619&id=uf9f96241&margin=%5Bobject%20Object%5D&name=uTools_1658051413945.png&originHeight=928&originWidth=1789&originalType=binary&ratio=1&rotation=0&showTitle=false&size=436036&status=done&style=stroke&taskId=ue59bb456-ef9e-4cdb-8d63-0c9463ee950&title=&width=1192.6666666666667)
## 9.3 JSP 脚本
![uTools_1658051688764.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658051694023-1265bb66-52fb-48a6-976a-8df15b816eba.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=302&id=u8416bf8e&margin=%5Bobject%20Object%5D&name=uTools_1658051688764.png&originHeight=453&originWidth=1048&originalType=binary&ratio=1&rotation=0&showTitle=false&size=141602&status=done&style=stroke&taskId=ub9f8cfbf-845a-4bbf-9a0a-73b081d1241&title=&width=698.6666666666666)
### 练习:使用JSP脚本展示品牌数据
![uTools_1658051738808.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658051742467-dc70f2fe-5706-4065-8ddd-07584f1dcc1e.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=215&id=ucc1685a4&margin=%5Bobject%20Object%5D&name=uTools_1658051738808.png&originHeight=322&originWidth=1374&originalType=binary&ratio=1&rotation=0&showTitle=false&size=246409&status=done&style=stroke&taskId=u9411835f-dc91-4e82-a4b2-2048cb5889b&title=&width=916)
```java
<%@ page import="com.Flyone.pojo.Brand" %>
    <%@ page import="java.util.List" %>
    <%@ page import="java.util.ArrayList" %><%--
    Created by IntelliJ IDEA.
    User: luoyifei
    Date: 2022/7/17
        Time: 18:00
            To change this template use File | Settings | File Templates.
            --%>
            <%@ page contentType="text/html;charset=UTF-8" language="java" %>
            
            <%
            //查询数据库
            List<Brand> brands = new ArrayList<Brand>();
brands.add(new Brand(1,"三只松鼠","三只松鼠",100,"三只松鼠，好吃不上火",1));
brands.add(new Brand(2,"优衣库","优衣库",200,"优衣库，服适人生",0));
brands.add(new Brand(3,"小米","小米科技有限公司",1000,"为发烧而生",1));
%>
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Title</title>
    </head>
    <body>
    <input type="button" value="新增"><br>
    <hr>
    <table border="1" cellspacing="0" width="800">
    <tr>
    <th>序号</th>
    <th>品牌名称</th>
    <th>企业名称</th>
    <th>排序</th>
    <th>品牌介绍</th>
    <th>状态</th>
    <th>操作</th>
    </tr>
    
    
    
    <%--    <tr align="center">--%>
    <%--        <td>2</td>--%>
    <%--        <td>优衣库</td>--%>
    <%--        <td>优衣库</td>--%>
    <%--        <td>10</td>--%>
    <%--        <td>优衣库，服适人生</td>--%>
    <%--        <td>禁用</td>--%>
    <%--        <td><a href="#">修改</a> <a href="#">删除</a> </td>--%>
    <%--    </tr>--%>
    
    <%--    <tr align="center">--%>
    <%--        <td>3</td>--%>
    <%--        <td>小米</td>--%>
    <%--        <td>小米科技有限公司</td>--%>
    <%--        <td>1000</td>--%>
    <%--        <td>为发烧而生</td>--%>
    <%--        <td>启用</td>--%>
    
    <%--        <td><a href="#">修改</a> <a href="#">删除</a> </td>--%>
    <%--    </tr>--%>
    <%
    for (int i = 0; i < brands.size(); i++) {
    Brand brand = brands.get(i);
    %>
    <tr align="center">
    <td><%=brand.getId()%></td>
    <td><%=brand.getBrandName()%></td>
    <td><%=brand.getCompanyName()%></td>
    <td><%=brand.getOrdered()%></td>
    <td><%=brand.getDescription()%></td>
    <%--        <%--%>
    <%--            if(brand.getStatus() == 1){--%>
    <%--        %>--%>
    <%--        <td><%="启用"%></td>--%>
    <%--        <%--%>
    <%--            }else{--%>
    <%--        %>--%>
    <%--        <td><%="禁用"%></td>--%>
    <%--        <%--%>
    <%--            }--%>
    <%--        %>--%>
    <td><%=brand.getStatus()==1?"启用":"禁用"%></td>
    <td><a href="#">修改</a> <a href="#">删除</a> </td>
    </tr>
    <%
    }
    %>
    </table>
    </body>
    </html>

```

![uTools_1658053121095.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658053127791-ec87b559-3cd9-4088-a4f8-e70bba34b563.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=387&id=u67dd4f91&margin=%5Bobject%20Object%5D&name=uTools_1658053121095.png&originHeight=580&originWidth=1451&originalType=binary&ratio=1&rotation=0&showTitle=false&size=223169&status=done&style=stroke&taskId=u500c7c2b-3beb-4666-bf7d-872ac9e3570&title=&width=967.3333333333334)
![uTools_1658053839500.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658053845891-ca126be9-1b85-4052-a8a9-5c788fc5526c.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=267&id=u15a21a64&margin=%5Bobject%20Object%5D&name=uTools_1658053839500.png&originHeight=400&originWidth=1208&originalType=binary&ratio=1&rotation=0&showTitle=false&size=326271&status=done&style=stroke&taskId=u4ef19e83-654c-4a73-ac90-33bb9713f6c&title=&width=805.3333333333334)
## 9.4 EL 表达式
![uTools_1658053982276.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658053987082-78f0c980-0a12-479c-815a-1a3dac696ab6.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=294&id=u2e4c1d11&margin=%5Bobject%20Object%5D&name=uTools_1658053982276.png&originHeight=441&originWidth=1189&originalType=binary&ratio=1&rotation=0&showTitle=false&size=132551&status=done&style=stroke&taskId=u8c41d663-078c-49f5-8045-a1f63672f8d&title=&width=792.6666666666666)
![uTools_1658054827720.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658054832823-824f195a-8101-456a-ac60-fc2b48b08604.png#clientId=u1cf9e5f0-2406-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=287&id=u6a546cb5&margin=%5Bobject%20Object%5D&name=uTools_1658054827720.png&originHeight=430&originWidth=954&originalType=binary&ratio=1&rotation=0&showTitle=false&size=160716&status=done&style=stroke&taskId=uf1105ae4-16a8-40b7-83fc-9e33aa2c5c5&title=&width=636)
## 9.5 JSTL 标签
![uTools_1658069483469.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658069489414-cc9d9b76-5cd7-47c2-ad98-f6d70c78d792.png#clientId=uff2339bd-ef55-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=702&id=u648ee55b&margin=%5Bobject%20Object%5D&name=uTools_1658069483469.png&originHeight=1053&originWidth=2033&originalType=binary&ratio=1&rotation=0&showTitle=false&size=558588&status=done&style=stroke&taskId=uc47108d7-7136-4402-ba96-50bbcce707b&title=&width=1355.3333333333333)
![uTools_1658069513807.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658069519434-7c6e2cc6-e3af-43b3-ad08-dbc277475600.png#clientId=uff2339bd-ef55-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=697&id=u7f05461b&margin=%5Bobject%20Object%5D&name=uTools_1658069513807.png&originHeight=1045&originWidth=1645&originalType=binary&ratio=1&rotation=0&showTitle=false&size=509871&status=done&style=stroke&taskId=u6a88af35-7783-4803-b405-1bbef3a2bd7&title=&width=1096.6666666666667)
![uTools_1658071705123.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658071710627-14c6aacd-7b6e-4857-9741-3f30df9610e4.png#clientId=uff2339bd-ef55-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=709&id=ua77e5eac&margin=%5Bobject%20Object%5D&name=uTools_1658071705123.png&originHeight=1063&originWidth=2187&originalType=binary&ratio=1&rotation=0&showTitle=false&size=852867&status=done&style=stroke&taskId=ue2e1d537-de9b-4c47-9d36-e6a7ac217ed&title=&width=1458)
## **9.6 MVC 模式和三层架构
### 9.6.1 MVC模式

- **M：Model，业务模型，处理业务**
- **V ：View，视图，界面请求**
- **C ：Controller，控制器，处理请求，调用模型和视图**

![uTools_1658215171409.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658215174950-8195f5ae-3c6a-48c6-b844-47dc9d43c903.png#clientId=ufbb0279b-fa1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=259&id=u1c86cc63&margin=%5Bobject%20Object%5D&name=uTools_1658215171409.png&originHeight=389&originWidth=952&originalType=binary&ratio=1&rotation=0&showTitle=false&size=104463&status=done&style=stroke&taskId=uad66aa1f-2c8e-466a-92a4-6f63c74ab1f&title=&width=634.6666666666666)
### MVC 好处：

- 职责单一，互不影响
- 有利于分工协作
- 有利于组件重组
### 9.6.2 三层架构
![uTools_1658215628731.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658215632347-a23f7f06-a28a-410b-9618-208ce20332ed.png#clientId=ufbb0279b-fa1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=702&id=uf3fc20a6&margin=%5Bobject%20Object%5D&name=uTools_1658215628731.png&originHeight=1053&originWidth=2161&originalType=binary&ratio=1&rotation=0&showTitle=false&size=857912&status=done&style=stroke&taskId=u951d81ba-f0b1-4dff-b9a6-a6e4b828a0c&title=&width=1440.6666666666667)
### MVC 和 三层架构:
![uTools_1658215722097.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658215728096-1dab7d6f-0351-454d-ad66-53dc9ae68d8c.png#clientId=ufbb0279b-fa1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=726&id=u1ebf1c3b&margin=%5Bobject%20Object%5D&name=uTools_1658215722097.png&originHeight=1089&originWidth=1702&originalType=binary&ratio=1&rotation=0&showTitle=false&size=482636&status=done&style=stroke&taskId=u09c50b13-2484-43de-b734-b111ca84f79&title=&width=1134.6666666666667)
## 9.7 案例: 完成品牌数据的增删改查操作(brandDemo_MVC)
![uTools_1658215784459.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658215787435-c1172c43-10ed-43b1-844e-e62068c7d316.png#clientId=ufbb0279b-fa1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=213&id=u386fb920&margin=%5Bobject%20Object%5D&name=uTools_1658215784459.png&originHeight=319&originWidth=1567&originalType=binary&ratio=1&rotation=0&showTitle=false&size=295323&status=done&style=stroke&taskId=u206682bf-f09a-45d2-9866-0fc3ed907d3&title=&width=1044.6666666666667)
### 9.7.1 准备环境
![uTools_1658215816525.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658215821059-e6544450-ed9b-492e-bea9-a86eb9c4564c.png#clientId=ufbb0279b-fa1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=377&id=u2ab37ad2&margin=%5Bobject%20Object%5D&name=uTools_1658215816525.png&originHeight=566&originWidth=851&originalType=binary&ratio=1&rotation=0&showTitle=false&size=140559&status=done&style=stroke&taskId=ua337b48c-46c4-48d6-8f8d-720b811f163&title=&width=567.3333333333334)
### 9.7.2 查询所有
![uTools_1658218085448.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658218090322-b642ed02-4aa3-48c8-be47-18f2779fae61.png#clientId=ufbb0279b-fa1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=398&id=ua2c53994&margin=%5Bobject%20Object%5D&name=uTools_1658218085448.png&originHeight=597&originWidth=1986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=469360&status=done&style=stroke&taskId=ud8f323e2-ed0a-4e6d-82f3-f94b146477f&title=&width=1324)
### 
9.7.3 添加
![uTools_1658221275007.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658221280585-224429c6-6437-46fe-8a39-02832186ad7a.png#clientId=ufbb0279b-fa1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=400&id=u646c9e4d&margin=%5Bobject%20Object%5D&name=uTools_1658221275007.png&originHeight=600&originWidth=2153&originalType=binary&ratio=1&rotation=0&showTitle=false&size=442993&status=done&style=stroke&taskId=u6745e39e-70c0-42c2-a5e5-089385ba2f5&title=&width=1435.3333333333333)
### 9.7.4 修改

- **回显数据**

![uTools_1658236505434.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658236508772-6fbbeb62-4999-4ed9-83b2-515c2f0f57f9.png#clientId=udc4a5a10-858e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=392&id=uf40b0c8b&margin=%5Bobject%20Object%5D&name=uTools_1658236505434.png&originHeight=588&originWidth=2166&originalType=binary&ratio=1&rotation=0&showTitle=false&size=447141&status=done&style=stroke&taskId=u8d7a14ac-c4e8-4b8d-9f92-b2f9706b839&title=&width=1444)

- **修改数据**
# ![uTools_1658238446509.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658238452114-1e8a6fb5-3063-4b85-b7e2-a05d375b42b4.png#clientId=udc4a5a10-858e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=377&id=udaba4140&margin=%5Bobject%20Object%5D&name=uTools_1658238446509.png&originHeight=565&originWidth=2148&originalType=binary&ratio=1&rotation=0&showTitle=false&size=564304&status=done&style=stroke&taskId=ua4ef3703-117e-4515-bddf-40d3bc57d80&title=&width=1432)

---

# 十. 会话跟踪技术
## 10.1介绍

- **会话：**

**用户打开浏览器，访问web服务器的资源，会话建立，直到有一方断开连接，会话结         束。在一次会话中可以包含多次请求和响应**

- **会话跟踪：**

**一种维护浏览器状态的方法，服务器需要识别多次请求是否来自于同一浏览器，以便         在同一次会话的多次请求间共享数据**

- **HTTP是无状态的，每次服务器向浏览器请求时，服务器都会将该请求视为新的请求，因此我们需要会话跟踪技术来实现会话内数据共享**
- **实现方式**
   - **客户端会话跟踪技术：Cookie**
   - **服务端会话跟踪技术：Session**
## 10.2 Cookie & Session
### 10.2.1 Cookie基本使用

- **Cookie**

客户端会话技术，将数据保存到客户端，以后每次请求都携带Cookie数据进行访问

- **Cookie基本使用步骤**
   - **发送Cookie**

![uTools_1658299192881.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658299196494-25a07756-bac3-4bff-aeff-6ce9ac7f56c1.png#clientId=u3c635488-1547-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=202&id=ucede83c5&margin=%5Bobject%20Object%5D&name=uTools_1658299192881.png&originHeight=303&originWidth=896&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134686&status=done&style=stroke&taskId=uabe52635-b947-4fc7-893b-b5a265d3c21&title=&width=597.3333333333334)

   - **获取Cookie**

![uTools_1658300800841.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658300805922-96037811-e4fa-41c4-94b7-761d5073673b.png#clientId=u3c635488-1547-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=294&id=u8dd59d6a&margin=%5Bobject%20Object%5D&name=uTools_1658300800841.png&originHeight=441&originWidth=946&originalType=binary&ratio=1&rotation=0&showTitle=false&size=176675&status=done&style=stroke&taskId=u234d9327-30b7-4e55-8ce6-05bd08aab9e&title=&width=630.6666666666666)
### 10.2.2 Cookie原理

- **Cookie的实现是基于HTTP协议的**
   - **响应头：set-cookie**
   - **请求头：cookie**

![uTools_1658301683850.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658301690237-be569098-a9ca-4123-8c4e-157712cf20b2.png#clientId=u3c635488-1547-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=331&id=u5d571147&margin=%5Bobject%20Object%5D&name=uTools_1658301683850.png&originHeight=496&originWidth=1257&originalType=binary&ratio=1&rotation=0&showTitle=false&size=249093&status=done&style=stroke&taskId=uc4f23a24-56f2-4b41-8380-059ebc4666c&title=&width=838)
### 10.2.3 Cookie 使用细节

- **Cookie 存活时间：**
   - **默认情况下，Cookie 存储在浏览器内存中，当浏览器关闭，内存释放，则Cookie被销毁**
   - **setMaxAge(int seconds):设置Cookie存活时间**
      - **正数：将Cookie 写入浏览器所在电脑的硬盘，持久化存储，到时间自动删除**
      - **负数：默认值，Cookie在当前浏览器内存中，当浏览器关闭,则Cookie被销毁**
      - **零：删除对于Cookie**
- **Cookie 存储中文:**
   - **Cookie不能直接存储中文**
   - **如需要存储，要进行转码：URL编码**
### 10.2.4 Session 基本使用

- **服务端会话跟踪技术：将数据保存到服务端**
- **JavaEE 提供 HttpSession接口，来实现一次会话的多次请求间数据共享功能**
- **使用：**
1. 获取Session对象
:::info
HttpSession session = request.getSession();
:::

2. Session对象功能
> ▶️ void setAttribute(String name,Object o) : 存储数据到Session域中
> ▶️ Object getAttribute(String name) : 根据key，获取值
> ▶️ void removeAttribute(String name) : 根据key，删除该键值对

### 10.2.5 Session 原理

- **Session的实现是基于Cookie的**

![uTools_1658304282361.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658304286931-f733c721-5b50-49da-bb66-8db7a42eb83a.png#clientId=u3c635488-1547-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=405&id=u352d067f&margin=%5Bobject%20Object%5D&name=uTools_1658304282361.png&originHeight=607&originWidth=1733&originalType=binary&ratio=1&rotation=0&showTitle=false&size=427248&status=done&style=stroke&taskId=u5cdeea65-e0b3-41f3-8dbf-8a511260f4f&title=&width=1155.3333333333333)
### 10.2.6 Session 使用细节

- **Session 钝化、活化：**
   - **服务器重启后，Session中的数据是否还存在？**
      - **钝化：服务器在正常关闭后，Tomcat 会自动将Session数据写入到硬盘的文件中**
      - **活化：再次启动服务器后，从文件中加载数据到Session中**
- **Session 销毁**
> ▶️ 默认情况下，无操作，30分钟自动销毁
> <session-config>
> <session-timeout>30</session-timeout>
> </session-config>
> ▶️ 调用Session对象的invalidate()方法

### 小结：

- **Cookie 和 Session 都是来完成一次会话内多次请求间数据共享的**
- **区别	**
1. 存储位置：Cookie 是将数据存储在客户端，Session 将数据存储在服务端
2. 安全性：Cookie 不安全，Session 安全
3. 数据大小：Cookie 最大3KB，Session 大小无限制
4. 存储时间：Cookie 可以长期储存，Session 默认30分钟
5. 服务器性能：Cookie 不占服务器资源，Session占用服务器资源
### 10.2.7 案例:登录注册案例
#### 需求说明：
![uTools_1658305995094.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658305998442-c109b6af-ce76-4f9c-90ca-b99a59a89869.png#clientId=u3c635488-1547-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=213&id=u89e858fe&margin=%5Bobject%20Object%5D&name=uTools_1658305995094.png&originHeight=319&originWidth=1343&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134640&status=done&style=stroke&taskId=u984704b7-46c2-4aeb-a056-615c0b11b3a&title=&width=895.3333333333334)
#### ① 用户登录
![uTools_1658322783218.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658322786666-9f32644a-a95e-4db6-8dc2-5c1a73aa4e4e.png#clientId=ud6b365fe-fac9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=491&id=u627c30fb&margin=%5Bobject%20Object%5D&name=uTools_1658322783218.png&originHeight=736&originWidth=1507&originalType=binary&ratio=1&rotation=0&showTitle=false&size=377873&status=done&style=stroke&taskId=u6e71d240-3955-4b74-b857-5f041a1af28&title=&width=1004.6666666666666)
#### ② 记住用户
![uTools_1658323459687.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658323464918-9621c025-46ef-437e-9002-2582bcf2c7d8.png#clientId=ud6b365fe-fac9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=494&id=uf0642aa0&margin=%5Bobject%20Object%5D&name=uTools_1658323459687.png&originHeight=741&originWidth=1184&originalType=binary&ratio=1&rotation=0&showTitle=false&size=307426&status=done&style=stroke&taskId=ua5e561e6-92a1-4640-be26-9066d2ed907&title=&width=789.3333333333334)
![uTools_1658324289735.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658324308578-79033e4f-7946-4188-b33a-2d71f264c133.png#clientId=u57ed8815-f97b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=486&id=ueaab7bbf&margin=%5Bobject%20Object%5D&name=uTools_1658324289735.png&originHeight=729&originWidth=1264&originalType=binary&ratio=1&rotation=0&showTitle=false&size=347705&status=done&style=stroke&taskId=uc9756d8d-7494-450e-8f19-374f694f20f&title=&width=842.6666666666666)
#### ③ 用户注册
![uTools_1658324385803.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658324465476-b0e6ea96-1e88-405c-ad89-679dee366462.png#clientId=u57ed8815-f97b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=486&id=u8799a83c&margin=%5Bobject%20Object%5D&name=uTools_1658324385803.png&originHeight=729&originWidth=1575&originalType=binary&ratio=1&rotation=0&showTitle=false&size=356033&status=done&style=stroke&taskId=uee50c4f6-ac2a-44e2-bb8a-257f15951c3&title=&width=1050)
#### ④ 验证码-展示&校验
**展示：**
![uTools_1658377548430.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658377552609-a359a021-ff1d-4aeb-8ed5-6088e312967b.png#clientId=u2043917a-be75-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=687&id=uce63922e&margin=%5Bobject%20Object%5D&name=uTools_1658377548430.png&originHeight=1031&originWidth=1186&originalType=binary&ratio=1&rotation=0&showTitle=false&size=355248&status=done&style=stroke&taskId=u72987f4b-aae0-4d37-ba6a-b1d13c4c238&title=&width=790.6666666666666)
**校验:**
![uTools_1658377689232.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658377693019-57281596-897f-4432-adbb-c2359cf9983d.png#clientId=u2043917a-be75-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=669&id=ue55ffc73&margin=%5Bobject%20Object%5D&name=uTools_1658377689232.png&originHeight=1003&originWidth=1945&originalType=binary&ratio=1&rotation=0&showTitle=false&size=673697&status=done&style=stroke&taskId=uf0fb8690-e477-40f8-ad99-6946163f0ad&title=&width=1296.6666666666667)
# 十一.Filter
## 11.1 Filter 简介

- **概念: Filter 表示过滤器，是JavaWeb三大组件（Servlet、Filter、Listener)之一。**
- **过滤器可以把对资源的请求拦截下来，从而实现一些特殊的功能。**
- **过滤器一般完成一些通用的操作，比如：权限控制、统一编码处理、敏感字符处理等等**
## 11.2 Filter 快速入门
![uTools_1658379438680.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658379442802-d0f63f9d-b820-4109-bc48-8bae136812bb.png#clientId=u2043917a-be75-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=683&id=u57a293e8&margin=%5Bobject%20Object%5D&name=uTools_1658379438680.png&originHeight=1025&originWidth=2128&originalType=binary&ratio=1&rotation=0&showTitle=false&size=835762&status=done&style=stroke&taskId=u1d95fd45-93bb-423e-8ee5-32cf2bcb3a9&title=&width=1418.6666666666667)
## 11.3 Filter 执行流程
![uTools_1658380643246.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658380647277-1c04f2e0-878f-4f3b-be4e-2e337cc2c039.png#clientId=u2043917a-be75-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=688&id=u815967b3&margin=%5Bobject%20Object%5D&name=uTools_1658380643246.png&originHeight=1032&originWidth=1644&originalType=binary&ratio=1&rotation=0&showTitle=false&size=640618&status=done&style=stroke&taskId=u9744145e-2558-4053-8933-10d1f95c471&title=&width=1096)
## 11.4 Filter 使用细节
### 11.4.1 Filter 拦截路径配置
![uTools_1658380908581.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658380911714-63004fe4-9c03-4355-aced-da2342227869.png#clientId=u2043917a-be75-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=457&id=uf36e5f94&margin=%5Bobject%20Object%5D&name=uTools_1658380908581.png&originHeight=685&originWidth=1251&originalType=binary&ratio=1&rotation=0&showTitle=false&size=356948&status=done&style=stroke&taskId=u55ae2de5-59f5-402c-be69-73631a6fd9f&title=&width=834)
### 11.4.2 过滤器链
![uTools_1658381528259.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658381531930-af895bd7-64b7-4c76-b0e7-e5500ad7c61a.png#clientId=u2043917a-be75-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=615&id=u42f2a512&margin=%5Bobject%20Object%5D&name=uTools_1658381528259.png&originHeight=922&originWidth=1726&originalType=binary&ratio=1&rotation=0&showTitle=false&size=638816&status=done&style=stroke&taskId=uadaccf05-6d85-4e3f-9efd-9d1371e077d&title=&width=1150.6666666666667)
## 11.5 案例:登录验证

- **需求：访问服务器资源时，需要先进行登录验证，如果没有登录，则自动跳转到登录页面**

![uTools_1658382841460.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658382845058-983ab666-a8b4-4c73-9c0b-a52ccfc24a24.png#clientId=u2043917a-be75-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=620&id=u59845f29&margin=%5Bobject%20Object%5D&name=uTools_1658382841460.png&originHeight=930&originWidth=2049&originalType=binary&ratio=1&rotation=0&showTitle=false&size=554922&status=done&style=stroke&taskId=u9953e858-62d7-4791-a076-dca871f4c93&title=&width=1366)
# 十二. Listener
## Listenes 简介

- **概念: Listener -表示监听器,是JavaWeb 三大组件(Servlet、Filter、Listener)之一。**
- **监听器可以监听就是在application,session,request三个对象创建、销毁或者往其中添加修改删除**

**属性时自动执行代码的功能组件**

- **Listener分类：JavaWeb中提供了8个监听器**
| **监听器分类** | **监听器名称** | **作用** |
| --- | --- | --- |
| ServletContext监听 | ServletContextListener | 用于对ServletContext对象进行监听（创建、销毁） |
|  | ServletContextAttributeListener | 对ServletContext对象中属性的监听（增删改属性） |
| Session监听 | HttpSessionListener | 对Session对象的整体状态的监听（创建、销毁） |
|  | HttpSessionAttributeListener | 对Session对象中的属性监听（增删改属性） |
|  | HttpSessionBindingListener | 监听对象于Session的绑定和解除 |
|  | HttpSessionActivationListener | 对Session数据的钝化和活化的监听 |
| Request监听 | ServletRequestListener | 对Request对象进行监听（创建、销毁） |
|  | ServletRequestAttributeListener | 对Request对象属性的监听（增删改属性） |

![uTools_1658394343120.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658394351759-233cd547-6f56-49bb-a4de-81cd5ab41632.png#clientId=u94030da1-fb2c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=609&id=ud41f2af6&margin=%5Bobject%20Object%5D&name=uTools_1658394343120.png&originHeight=913&originWidth=1476&originalType=binary&ratio=1&rotation=0&showTitle=false&size=473679&status=done&style=stroke&taskId=u79c34588-e954-4b28-b355-dc2d353ed11&title=&width=984)
# 十三. AJAX
## 13.1 AJAX简介

- **概念：AJAX(Asynchronous JavaScript And XML):异步的JavaScript和 XML**
- **AJAX作用：**
1. 与服务器进行数据交换：通过AJAX可以给服务器发送请求，并获取服务器响应的数据
   - 使用了AJAX和服务器进行通信，就可以使用HTML+AJAX来替换JSP页面了
2. 异步交互：可以在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术，如搜索联想、用户名是否可用校验，等等...
## 异步与同步：
![uTools_1658395359745.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658395362545-689683d6-bfc8-41bd-8d7a-c175524175ff.png#clientId=u94030da1-fb2c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=469&id=u7009b559&margin=%5Bobject%20Object%5D&name=uTools_1658395359745.png&originHeight=703&originWidth=1582&originalType=binary&ratio=1&rotation=0&showTitle=false&size=226637&status=done&style=stroke&taskId=u8feb365b-18a1-4b24-b5e2-d786ca12f1a&title=&width=1054.6666666666667)
## 13.2 AJAX 快速入门
![uTools_1658395727685.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658395731715-93af85ab-9698-4d62-94a8-ffd770e017c9.png#clientId=u94030da1-fb2c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=721&id=u60eca7d9&margin=%5Bobject%20Object%5D&name=uTools_1658395727685.png&originHeight=1081&originWidth=1352&originalType=binary&ratio=1&rotation=0&showTitle=false&size=590450&status=done&style=stroke&taskId=u6416dba9-fc15-4f02-8073-47292c1248f&title=&width=901.3333333333334)
## 13.3 简单案例
![uTools_1658398960072.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658398963176-be37ffdd-eb1a-4305-9e65-6599935b67ed.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=639&id=uf47d592d&margin=%5Bobject%20Object%5D&name=uTools_1658398960072.png&originHeight=958&originWidth=2055&originalType=binary&ratio=1&rotation=0&showTitle=false&size=543312&status=done&style=stroke&taskId=u7957b460-01e3-434b-b1af-ba36d0a6381&title=&width=1370)
## 13.4 Axios 异步框架
![uTools_1658400519500.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658400523414-c92bfa28-fa1f-4743-8119-fd11838a063b.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=466&id=u838b59d0&margin=%5Bobject%20Object%5D&name=uTools_1658400519500.png&originHeight=699&originWidth=1659&originalType=binary&ratio=1&rotation=0&showTitle=false&size=243568&status=done&style=stroke&taskId=u9d365f92-6a5e-4b63-9281-97113379b8b&title=&width=1106)
### 13.4.1 Axios 快速入门
![uTools_1658404854235.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658404860549-1485e027-570b-45d3-9071-c2b9ca86480e.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=708&id=ub22649aa&margin=%5Bobject%20Object%5D&name=uTools_1658404854235.png&originHeight=1062&originWidth=1969&originalType=binary&ratio=1&rotation=0&showTitle=false&size=630051&status=done&style=stroke&taskId=u0c5c4b10-f72f-4a6c-8754-3d81e4a3541&title=&width=1312.6666666666667)
### 13.4.2 Axios 请求方式别名
![uTools_1658405284858.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658405289378-dc70087a-2103-473b-a5c0-4d203ed19d2f.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=687&id=u130bc0bd&margin=%5Bobject%20Object%5D&name=uTools_1658405284858.png&originHeight=1030&originWidth=1830&originalType=binary&ratio=1&rotation=0&showTitle=false&size=637554&status=done&style=stroke&taskId=u93a7d72f-24ec-4e6e-8ee9-bddd46cac30&title=&width=1220)
### 13.4.3 练习
![uTools_1658405333061.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658405345931-8a51427c-2ffd-4455-b7f1-27a6dd10ec0e.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=621&id=u95a68767&margin=%5Bobject%20Object%5D&name=uTools_1658405333061.png&originHeight=932&originWidth=1816&originalType=binary&ratio=1&rotation=0&showTitle=false&size=546192&status=done&style=stroke&taskId=u8e8a15a8-c982-487c-a443-cd9b420381f&title=&width=1210.6666666666667)
## 13.5 JSON
### 13.5.1 JSON简介

- **概念: JavaScript ObjectNotation。JavaScript 对象表示法**
- **由于其语法简单，层次结构鲜明，现多用于作为数据载体，在网络中进行数据传输**

![uTools_1658406105472.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658406110080-d7d84228-6b65-43ee-8f9b-9c4bc23d4367.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=437&id=ua6b5c72e&margin=%5Bobject%20Object%5D&name=uTools_1658406105472.png&originHeight=655&originWidth=1656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=216791&status=done&style=stroke&taskId=ub504209d-c152-4b5d-a807-a8283bc69a5&title=&width=1104)
### 13.5.2 JSON 基础语法
![uTools_1658406363271.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658406366885-7b8e136f-070b-4f72-8195-f58baf0d6562.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=622&id=u56d46bd9&margin=%5Bobject%20Object%5D&name=uTools_1658406363271.png&originHeight=933&originWidth=1375&originalType=binary&ratio=1&rotation=0&showTitle=false&size=390699&status=done&style=stroke&taskId=u25b8a18d-a6d8-47b9-b99e-55b23668eec&title=&width=916.6666666666666)
### **13.5.3 JSON 数据和Java对象转换
![uTools_1658406714524.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658406720650-6fb7cd86-4e05-474e-bbc3-d746d29195e7.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=603&id=uf32406cb&margin=%5Bobject%20Object%5D&name=uTools_1658406714524.png&originHeight=905&originWidth=1531&originalType=binary&ratio=1&rotation=0&showTitle=false&size=308781&status=done&style=stroke&taskId=ue911326d-b70c-4765-90fc-ee003d5bb89&title=&width=1020.6666666666666)
![uTools_1658406805570.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658406809114-67e75551-3e78-4735-98a6-0d7c2fc590f1.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=694&id=u70a53164&margin=%5Bobject%20Object%5D&name=uTools_1658406805570.png&originHeight=1041&originWidth=2197&originalType=binary&ratio=1&rotation=0&showTitle=false&size=692941&status=done&style=stroke&taskId=udcf1afe3-166e-482f-a810-dc84773bd2a&title=&width=1464.6666666666667)
### 13.5.4 案例
#### ①查询所有
 ![uTools_1658412389754.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658412394993-78e32044-2b7a-433b-a968-4cd00e2a2cb8.png#clientId=ue5a5bda8-3dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=670&id=ufe6ffcba&margin=%5Bobject%20Object%5D&name=uTools_1658412389754.png&originHeight=1005&originWidth=2173&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1024807&status=done&style=stroke&taskId=uac6122f9-51c2-445d-b2ee-535437fbf8f&title=&width=1448.6666666666667)
#### ②新增品牌
![uTools_1658418717351.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658418721046-9529b231-27ee-4801-8550-c6ffc4839961.png#clientId=uc694eb45-ab33-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=686&id=u5dc3d52b&margin=%5Bobject%20Object%5D&name=uTools_1658418717351.png&originHeight=1029&originWidth=2199&originalType=binary&ratio=1&rotation=0&showTitle=false&size=842326&status=done&style=stroke&taskId=ua9eafed9-2528-4fde-a706-60f0781c054&title=&width=1466)
# 十四. Vue
## 14.1 Vue 简介

- **Vue 是一套前端框架，免除原生JavaScript中的DOM操作，简化书写**
- **基于MVVM（Model-View-ViewModel）思想，实现数据的双向绑定，将编程的关注点放在数据上**
- **官网：https://cn.vuejs.org**

![uTools_1658466896323.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658466904214-148dcf82-2388-4876-8397-ba43b111314c.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=427&id=ue8969765&margin=%5Bobject%20Object%5D&name=uTools_1658466896323.png&originHeight=640&originWidth=2109&originalType=binary&ratio=1&rotation=0&showTitle=false&size=369532&status=done&style=stroke&taskId=u43bb6d8e-ee83-43c3-be2e-179dba207c5&title=&width=1406)
## 14.2 Vue 快速入门
![uTools_1658467158501.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658467162391-ca0377da-7847-44ee-a38d-6b64ef4fac2f.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=726&id=u13fa9070&margin=%5Bobject%20Object%5D&name=uTools_1658467158501.png&originHeight=1089&originWidth=1639&originalType=binary&ratio=1&rotation=0&showTitle=false&size=433325&status=done&style=stroke&taskId=u307a308e-f467-4422-b396-63d2520e499&title=&width=1092.6666666666667)
## 14.3 Vue 常用指令
![uTools_1658468038002.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658468041561-70a0454b-c4f0-40f5-b966-6145566399c5.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=683&id=u5be3122b&margin=%5Bobject%20Object%5D&name=uTools_1658468038002.png&originHeight=1025&originWidth=1769&originalType=binary&ratio=1&rotation=0&showTitle=false&size=544384&status=done&style=stroke&taskId=ud161c7b8-1b4e-4cf0-82b5-1da8a16c7e3&title=&width=1179.3333333333333)
![uTools_1658469453886.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658469459984-fdfc8eaf-1a1e-472c-98a4-7c242eafdb31.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=665&id=u9aefedf3&margin=%5Bobject%20Object%5D&name=uTools_1658469453886.png&originHeight=998&originWidth=1606&originalType=binary&ratio=1&rotation=0&showTitle=false&size=398410&status=done&style=stroke&taskId=ufa213f94-2878-4787-b046-43dd342682c&title=&width=1070.6666666666667)
![uTools_1658469492734.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658469498955-b54edd3d-30fc-478a-9010-ec7918d9a5c7.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=709&id=ua119c066&margin=%5Bobject%20Object%5D&name=uTools_1658469492734.png&originHeight=1063&originWidth=1615&originalType=binary&ratio=1&rotation=0&showTitle=false&size=430714&status=done&style=stroke&taskId=ub430e589-637e-4c81-9bb1-6e9a693940d&title=&width=1076.6666666666667)
![uTools_1658469775216.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658469780571-f7c45ecb-7bf8-4410-b416-69c09bf59d53.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=639&id=ud4295880&margin=%5Bobject%20Object%5D&name=uTools_1658469775216.png&originHeight=959&originWidth=1606&originalType=binary&ratio=1&rotation=0&showTitle=false&size=443287&status=done&style=stroke&taskId=u38962f2b-60cd-4fc2-bf45-87477b3c0c4&title=&width=1070.6666666666667)
![uTools_1658470719368.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658470723640-3081cb5d-b90d-4287-859d-654d4adec99b.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=617&id=u0ae419b6&margin=%5Bobject%20Object%5D&name=uTools_1658470719368.png&originHeight=925&originWidth=1579&originalType=binary&ratio=1&rotation=0&showTitle=false&size=368904&status=done&style=stroke&taskId=u89eff755-0dde-4ab3-8727-f0c42eca1fa&title=&width=1052.6666666666667)
## 14.4 Vue 生命周期
![uTools_1658470774136.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658470777610-9899ac8e-833d-4476-b5d1-1c090596f4bd.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=606&id=u7020b0a0&margin=%5Bobject%20Object%5D&name=uTools_1658470774136.png&originHeight=909&originWidth=1546&originalType=binary&ratio=1&rotation=0&showTitle=false&size=311929&status=done&style=stroke&taskId=u58c839d9-44b3-466d-af8f-2fb71ba3a6d&title=&width=1030.6666666666667)
![uTools_1658470796339.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658470801339-da5ef39d-f738-47f7-a851-d858f0e882ee.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=713&id=u01662c44&margin=%5Bobject%20Object%5D&name=uTools_1658470796339.png&originHeight=1069&originWidth=1696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=609254&status=done&style=stroke&taskId=ufcfa2a49-260c-46a2-9401-aef69a639c7&title=&width=1130.6666666666667)
## 14.5 案例:品牌列表数据
![uTools_1658471023760.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658471028217-c08b5062-570b-4aa0-9cee-7e603ba49439.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=412&id=uea7498cf&margin=%5Bobject%20Object%5D&name=uTools_1658471023760.png&originHeight=618&originWidth=1856&originalType=binary&ratio=1&rotation=0&showTitle=false&size=433986&status=done&style=stroke&taskId=u79d83b98-5571-450a-9c58-356b518f8f6&title=&width=1237.3333333333333)
![uTools_1658477763218.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658477768341-1dbd1c24-cf3a-4eaa-b0c5-fd15bf988811.png#clientId=u71fa1ea4-f762-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=709&id=u9251485a&margin=%5Bobject%20Object%5D&name=uTools_1658477763218.png&originHeight=1064&originWidth=2131&originalType=binary&ratio=1&rotation=0&showTitle=false&size=653004&status=done&style=stroke&taskId=u188be8cd-d371-4293-9557-b8d1c86d9e5&title=&width=1420.6666666666667)
# 十五.Element
## 15.1 Element 简介

- **Element:是饿了么公司前端开发团队提供的一套基于 Vue 的网站组件库，用于快速构建网页**
- **组件：组成网页的部件，例如超链接、按钮、图片、表格等等~**
## 15.2 Element 快速入门
![uTools_1658489477105.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658489482722-41fe3d14-dbaf-47fa-b1ae-c2022acd6623.png#clientId=u300f356a-fabb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=637&id=ua4ead01f&margin=%5Bobject%20Object%5D&name=uTools_1658489477105.png&originHeight=956&originWidth=2014&originalType=binary&ratio=1&rotation=0&showTitle=false&size=445920&status=done&style=stroke&taskId=u87ac253e-d66a-4544-9cc4-b93c3f20adc&title=&width=1342.6666666666667)
## 15.3 Element 布局
![uTools_1658489458870.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658489464407-92bd0431-c3c4-4a57-b307-d939d25d3b73.png#clientId=u300f356a-fabb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=723&id=u30e38829&margin=%5Bobject%20Object%5D&name=uTools_1658489458870.png&originHeight=1085&originWidth=1421&originalType=binary&ratio=1&rotation=0&showTitle=false&size=307628&status=done&style=stroke&taskId=ue92a4fd8-1587-45a1-9019-1d0901dc984&title=&width=947.3333333333334)
## 15.4 Element 组件
![uTools_1658491822962.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658491826907-8380f596-61e8-4679-8fcc-e1cdb030f6f6.png#clientId=u300f356a-fabb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=513&id=u37d856ab&margin=%5Bobject%20Object%5D&name=uTools_1658491822962.png&originHeight=769&originWidth=1846&originalType=binary&ratio=1&rotation=0&showTitle=false&size=407780&status=done&style=stroke&taskId=u4164ae3f-3f03-4ae9-a085-07af572d722&title=&width=1230.6666666666667)
### 15.4.1 表格、表单、对话框和表单、分页工具条
```java
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .el-table .warning-row {
            background: oldlace;
        }

        .el-table .success-row {
            background: #f0f9eb;
        }
    </style>

</head>
<body>
<div id="App">
    <!--搜索表单-->
    <el-form :inline="true" :model="brand" class="demo-form-inline">
        <el-form-item label="当前状态">
            <el-select v-model="brand.status" placeholder="当前状态">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
            <el-input v-model="brand.brandName" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
            <el-input placeholder="品牌名称" v-model="brand.companyName"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
    <!--按钮-->
    <el-button type="danger" plain>批量删除</el-button>
    <el-button type="primary" plain @click="dialogVisible = true">新增</el-button>
    <br>
    <br>
    <!--添加数据对话框表单-->
    <el-dialog
            title="编辑品牌"
            :visible.sync="dialogVisible"
            width="30%">

        <!--添加表单数据-->
        <el-form ref="brand" :rules="rules" :model="brand" label-width="80px">
            <el-form-item label="品牌名称">
                <el-input v-model="brand.brandName" prop="brandName"></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
                <el-input v-model="brand.companyName"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="brand.ordered"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="brand.description"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch v-model="brand.status"
                           active-value="1"
                           inactive-value="0"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addBrand">提交</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!--表格-->
    <template>
        <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55"
                    align="center">
            </el-table-column>

            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="brandName"
                    label="品牌名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="companyName"
                    label="企业名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ordered"
                    label="排序"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="当前状态"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <el-button type="primary">修改</el-button>
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
    </template>
    <!--分页工具条-->
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
    </el-pagination>

</div>


<script src="js/vue.js"></script>
<script src="element-ui/lib/index.js"></script>
<link rel="stylesheet" href="element-ui/lib/theme-chalk/index.css">
<script>
    new Vue({
        el: "#App",
        methods: {

            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            //复选框选中后执行的方法
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
            //查询方法
            onSubmit() {
                console.log(this.brand);
            },
            //新增数据方法
            addBrand() {
                console.log(this.brand);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                //当前页码
                currentPage: 4,
                //添加数据对话框是否展示的标记
                dialogVisible: false,
                // 品牌模型表单数据
                brand: {
                    id:"",
                    brandName: '',
                    companyName: '',
                    ordered:"",
                    description:"",
                    status: ''
                },
                //复选框选中数据集合
                multipleSelection: [],
                //表格数据
                tableData: [{
                    brandName: "华为",
                    companyName: "华为有限科技公司",
                    ordered: "1000",
                    status: "启用"
                }, {
                    brandName: "小米",
                    companyName: "小米有限科技公司",
                    ordered: "100",
                    status: "启用"
                }, {
                    brandName: "小米",
                    companyName: "小米有限科技公司",
                    ordered: "100",
                    status: "禁用"
                }, {
                    brandName: "小米",
                    companyName: "小米有限科技公司",
                    ordered: "100",
                    status: "启用"
                }]
            }
        }
    })
</script>
</body>
</html>
```
# 十六.Web综合案例
![uTools_1658497246942.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658497250316-5acd373f-45ab-433d-acc1-2963d2a7db27.png#clientId=u300f356a-fabb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=591&id=uca534eb4&margin=%5Bobject%20Object%5D&name=uTools_1658497246942.png&originHeight=886&originWidth=2110&originalType=binary&ratio=1&rotation=0&showTitle=false&size=358440&status=done&style=stroke&taskId=ub836b213-0070-4367-aa1e-c0fc69fa8be&title=&width=1406.6666666666667)
![uTools_1658498004625.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658498009402-276a65ce-d66d-4be8-ba89-2acb663ab7a6.png#clientId=u300f356a-fabb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=246&id=u5c6977ab&margin=%5Bobject%20Object%5D&name=uTools_1658498004625.png&originHeight=369&originWidth=1216&originalType=binary&ratio=1&rotation=0&showTitle=false&size=139528&status=done&style=stroke&taskId=u6bbd3771-0ed7-444d-bc12-a642c175e28&title=&width=810.6666666666666)
## 功能列表：
### 1.查询所有
![uTools_1658498366648.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658498369751-939df23c-02bd-4964-89e9-a5b21367055f.png#clientId=u300f356a-fabb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=355&id=ud2118721&margin=%5Bobject%20Object%5D&name=uTools_1658498366648.png&originHeight=532&originWidth=2189&originalType=binary&ratio=1&rotation=0&showTitle=false&size=412274&status=done&style=stroke&taskId=u796552a8-11d6-47cd-a423-c79f894800f&title=&width=1459.3333333333333)
### 2.新增品牌
![uTools_1658549176043.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658549184103-d7a73b1c-53d9-418a-942e-14745ad1a15f.png#clientId=uf86f49c8-6443-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=705&id=u55c18865&margin=%5Bobject%20Object%5D&name=uTools_1658549176043.png&originHeight=1058&originWidth=2193&originalType=binary&ratio=1&rotation=0&showTitle=false&size=509812&status=done&style=stroke&taskId=u02c2ef07-0d62-4856-8ce7-80ddac54c5f&title=&width=1462)
### 3. 修改品牌
**(已完成)**
### 4.删除品牌
**(已完成)**
### 5.批量删除
![uTools_1658572745472.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658572750543-7ae53232-753a-402a-8e1b-0ac461949b48.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=683&id=u6c14f27a&margin=%5Bobject%20Object%5D&name=uTools_1658572745472.png&originHeight=1024&originWidth=2196&originalType=binary&ratio=1&rotation=0&showTitle=false&size=603195&status=done&style=stroke&taskId=u1af1468b-7b68-4f41-bef9-5f617473e5c&title=&width=1464)
### 6.分页查询 
**-- 分页查询 LIMIT**
**-- 参数1：开始索引**
**-- 参数2：查询条目数**
**SELECT * FROM tb_brand LIMIT 0,5**
![uTools_1658573000982.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658573005918-c3b0faec-22f3-475a-baf2-fd3ab5b4c14a.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=168&id=u203c41b4&margin=%5Bobject%20Object%5D&name=uTools_1658573000982.png&originHeight=252&originWidth=1002&originalType=binary&ratio=1&rotation=0&showTitle=false&size=216788&status=done&style=stroke&taskId=uba933eb8-c868-4abd-b1a2-af5a54aca00&title=&width=668)
**SELECT * FROM tb_brand LIMIT 5,5**![uTools_1658572984747.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658572988837-c091fb43-e5bf-4b99-88f6-b2f10219468c.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=159&id=u53b30b82&margin=%5Bobject%20Object%5D&name=uTools_1658572984747.png&originHeight=238&originWidth=1006&originalType=binary&ratio=1&rotation=0&showTitle=false&size=222081&status=done&style=stroke&taskId=u6c0b3be7-8ae0-481d-8163-ced1ae9df72&title=&width=670.6666666666666)
**-- 页面传递的参数**
**-- 当前页码**
**-- 每页显示条数**

**-- 参数1：开始索引 = （当前页码-1）*每页显示条数**
**-- 参数2：查询条目数 = 每页显示条数**
**SELECT * FROM tb_brand LIMIT 0,5**
![uTools_1658573000982.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658573005918-c3b0faec-22f3-475a-baf2-fd3ab5b4c14a.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=168&id=mDZbl&margin=%5Bobject%20Object%5D&name=uTools_1658573000982.png&originHeight=252&originWidth=1002&originalType=binary&ratio=1&rotation=0&showTitle=false&size=216788&status=done&style=stroke&taskId=uba933eb8-c868-4abd-b1a2-af5a54aca00&title=&width=668)
**SELECT * FROM tb_brand LIMIT 5,5**
![uTools_1658573154119.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658573162502-8b002e45-bdc5-4b22-916e-9e20044aeb75.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=169&id=u2ac0ec0c&margin=%5Bobject%20Object%5D&name=uTools_1658573154119.png&originHeight=253&originWidth=1039&originalType=binary&ratio=1&rotation=0&showTitle=false&size=221880&status=done&style=stroke&taskId=uf19fb8b8-e251-4e20-a357-f094e0505ff&title=&width=692.6666666666666)
![uTools_1658576866559.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658576873064-1945bb2b-3818-415c-b086-a2aaf1fe1112.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=695&id=uda2c74d4&margin=%5Bobject%20Object%5D&name=uTools_1658576866559.png&originHeight=1042&originWidth=2224&originalType=binary&ratio=1&rotation=0&showTitle=false&size=549560&status=done&style=stroke&taskId=uecd969a8-f015-4392-925e-32a23b8dc18&title=&width=1482.6666666666667)

### 7.条件查询
![uTools_1658577015731.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658577021270-cb28c306-4958-474e-abc0-2d5ac2485ab5.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=713&id=ua42374e8&margin=%5Bobject%20Object%5D&name=uTools_1658577015731.png&originHeight=1070&originWidth=1735&originalType=binary&ratio=1&rotation=0&showTitle=false&size=564184&status=done&style=stroke&taskId=u77d3fa56-9b63-407b-8294-2e35c5d663f&title=&width=1156.6666666666667)
![uTools_1658582759841.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658583054123-2c69cce6-ae5c-441d-bcf6-bd8a1e77ff0a.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=695&id=uf352b140&margin=%5Bobject%20Object%5D&name=uTools_1658582759841.png&originHeight=1042&originWidth=2222&originalType=binary&ratio=1&rotation=0&showTitle=false&size=587752&status=done&style=stroke&taskId=u67fff982-da82-42cc-9e88-469654319a2&title=&width=1481.3333333333333)
## Servlet 优化:(**反射知识)
![uTools_1658567606764.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1658567612406-b6d7a6c1-bf31-470a-b9bd-80782ba024d2.png#clientId=u7693df33-b57b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=706&id=u5690b0df&margin=%5Bobject%20Object%5D&name=uTools_1658567606764.png&originHeight=1059&originWidth=2084&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1106164&status=done&style=stroke&taskId=u92a51aea-6003-4d67-8240-657fd0174ce&title=&width=1389.3333333333333)
