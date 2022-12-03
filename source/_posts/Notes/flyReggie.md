---
title: 瑞吉外卖
date: 2022年12月4日00:51:32
update: 2022年12月4日00:51:25
tags: 更新完成
categories: 项目
---

# 🔝介绍

![uTools_1665207101793.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665207110100-ab3be71b-93e7-4315-b608-06e3baaeffa8.png)![uTools_1665207318081.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665207327307-3bd6c19e-23c6-4eee-82b7-02aa3dd27382.png)![uTools_1665207346112.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665207354944-61ee5bd7-97ed-4b35-9433-a19e674f533e.png)

---

# 🔝开发环境搭建

## 数据库环境搭建

- 创建数据库
  - 图形界面创建
    1. 图形界面软件直接导入SQL文件
    2. [建表语句：db_reggie.sql](https://www.yuque.com/attachments/yuque/0/2022/sql/26328310/1665207885443-67d4cda1-9e43-455f-b630-7608fe32cff9.sql)
  - 命令行创建
    1. 命令行执行SQL文件(SQL文件不要放入中文文件目录下)

```powershell
mysql> use reggie;
mysql> show tables;
mysql> source <直接拖入文件>
```

**数据表含义**

| 表名         | 说明             |
| ------------ | ---------------- |
| employee     | 员工表           |
| category     | 菜品和套餐分类表 |
| dish         | 菜品表           |
| setmeal      | 套餐表           |
| setmeal_dish | 套餐菜品关系表   |
| dish_flavor  | 菜品口味关系表   |
| user         | 用户表           |
| address_book | 地址薄表         |
| shopping     | 购物车表         |
| orders       | 订单表           |
| order_detail | 订单明细表       |



## Maven项目搭建

1. 创建maven项目
2. 导入pom文件
3. 导入springboot配置文件
4. 编写启动类

---

1. **建议直接创建一个springboot项目**
2. **导入前端资源——**
   1. **因为springboot设定静态资源放在static里面，所以我们需要定义配置类来避免访问不了静态资源**

```java
package com.flyone.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Slf4j
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {
    /**
     * 设置静态资源映射
     * @param registry
     */
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.info("开始进行静态资源映射...");
        registry.addResourceHandler("/backend/**").addResourceLocations("classpath:/backend/");
        registry.addResourceHandler("/front/**").addResourceLocations("classpath:/front/");


//      registry.addResourceHandler("/front/**").addResourceLocations("classpath:/front/");
//      registry.addResourceHandler("项目文件下的所有文件").addResourceLocations("访问路径的地址");
    }
}

```

# 🔝后台登录功能

## 需求分析

>  实现账户密码登录

## 代码开发

1. 创建Controller、Service、Mapper、实体类
   
2. 导入通用返回结果类
   ![uTools_1665213599923.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665213611530-5f17dde6-1e09-4efb-b303-40b754875e43.png)
   **处理逻辑如下:**
   **1、将页面提交的密码password进行md5加密处理**
   **2、根据页面提交的用户名username查询数据库**
   **3、如果没有查询到则返回登录失败结果**
   **4、密码比对，如果不一致则返回登录失败结果**
   **5、查看员工状态，如果为已禁用状态，则返回员工已禁用结果**
   **6、登录成功，将员工id存入Session并返回登录成功结果**
   :::

## 功能测试

# 🔝后台退出功能

## 需求分析

>  **员工登录成功后，页面跳转到后台系统首页面(backend/index.html)，此时会显示当前登录用户的姓名：**
> **如果员工需要退出系统，直接点击右侧的退出按钮即可退出系统，退出系统后页面应跳转回登录页面**

## 代码开发

> 用户点击页面中退出按钮，发送请求，请求地址为/employee/logout，请求方式为POST。
> 我们只需要在Controller中创建对应的处理方法即可，
> 具体的处理逻辑:
> 1、清理Session中的用户id
> 2、返回结果

## 功能测试

===============================OK==============================

# 🔝员工功能业务开发

## 🧡登录功能

### --问题分析

> **前面我们已成了后台系统的员工登录功能开发 但是还存在一个问题： 用户如果不登录 直接访问系统首页面 照样可以正常访问。**
> **这种设计并不合理，我们希望看到的效果应该是，只有登录成功后才可以访问系统中的页面，如果没有登录则跳转到登录页面。**
> **那么，具体应该怎么实现呢?**
> **答案就是使用过滤器 或者 拦截器，在过滤器和拦截器中判断用户是否已经完成登录 如果没有登录转到登录页面**

### --代码实现

> **实现步骤：**
> **1、创建自定义过滤器LoginCheckFilter**
> **2、在启动类上加入注解@ServletComponentScan**
> **3、完善过滤器的处理逻辑**

**过滤器具体的处理逻辑如下:**![uTools_1665315144084.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665315157652-a223e309-1987-4d49-b00e-ae4d6daf7222.png)

> **1、获取本次请求的URI**
> **2、判断本次请求是否需要处理**
> **3、如果不需要处理，则直接放行**
> **4、判断登录状态，如果已登录，则直接放行**
> **5、如果未登录则返回未登录结果**

### --功能测试

===============================OK==============================

## 🧡新增员工

### --问题分析

![uTools_1665317315489.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665317329486-a559de67-1728-4d4c-9b42-528c2d40f4bf.png)

1. **employee表 的 员工插入 要将username字段设置为唯一约束**
2. **status字段设置默认值1，表示状态正常**

### --代码实现

> 在开发代码之前，需要梳理一下整个程序的执行过程：
> **1、页面发送ajax请求，将新增员工页面中输入的数据以json的形式提交到服务端**
> **2、服务端Controller接收页面提交的数据并调用Service将数据进行保存**
> **3、Service调用Mapper操作数据库，保存数据**

![uTools_1665317774956.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665317790431-7e62c80d-e33e-456c-9b0c-3472c51b9a93.png)

> ![uTools_1665319329490.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665319351380-80e32e2f-84ed-4467-8709-4e4a2bbea253.png)

### --功能测试

===============================OK==============================

## 🧡员工信息查询

### --问题分析

![uTools_1665320502702.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665320517745-a63ca10e-801a-4d19-9255-9f77d163a733.png)

### --代码实现

> 在开发代码之前，需要梳理一下整个程序的执行过程:
> 1、页面发送aja×请求，将分页查询参数(page、pagesize、name)提交到服务端
> 2、服务端Controller接收页面提交的数据并调用Service查询数据
> 3、Service调用Mapper操作数据库，查询分页数据
> 4、Controller将查询到的分页数据响应给页面
> 5、页面接收到分页数据并通过ElementUI的Table组件展示到页面上

> ![uTools_1665320577231.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665320589750-22bcc87b-7ac2-44e1-8c17-783112ec4e42.png)

### --功能测试

===============================OK==============================

## 🧡启用/禁用员工账户

### --问题分析

> **在员工管理列表页面，可以对某个员工账号进行启用或者禁用操作。账号禁用的员工不能登录系统，启用后的员工可以正常登录。**
> **需要注意，只有管理员（admin用户）可以对其他普通用户进行启用、禁用操作，所以普通用户登录系统后启用、禁用按钮不显示。**

### --代码实现

![uTools_1665735139417.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665735160478-4b1fe900-5a0f-4a51-ace4-df8b5d3eafec.png)

> ![uTools_1665735169765.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665735185973-4c9a7554-513f-42b7-9967-a9ede812270a.png)

### --功能测试

> **ERROR:**
> **JS在对long型数据进行整理时丢失精度，导致提交的id和数据库中的id不一致**
> **解决方法：
> 服务端给页面响应JSON数据时进行处理，将long型数据统一转换为String字符串**
> ![uTools_1665736870679.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665736889720-48419f8f-92da-40df-bea4-5513022f8310.png)

===============================OK==============================

---

## 🧡编辑员工信息

### --问题分析

> ![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665796504473-4f637e16-ea81-4d88-94bd-b3665a35563d.png)

### --代码实现

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665796420381-3ed91927-4563-44e9-b5da-bec4127aa3b4.png)

### --功能测试

===============================OK==============================

# 🔝分类功能业务开发

## 🧡公共字段自动填充

### ---问题分析

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665799564603-c8cfa79e-4d48-4e3d-92e7-3c0b1150fa24.png)

> **公共字段自动填充：**
> **在插入或者更新的时候为指定的字段赋予指定的值，使用它的好处就是可以统一对这些字段进行处理，避免了重复代码。**
> **实现步骤：**

1. > **在实体类上加入@TableFiled注解，指定自动填充的策略**
2. > **按照框架按要求编写元数据对象处理器，在此类中统一为公共字段赋值，此类需要实现MetaObjectHandler接口**

### ---代码实现

> 1. 为实体类的字段添加**@TableFiled **字段

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665800416930-b719bf9b-5d8d-4465-9b5a-75112622a4e3.png)

3. 在工具类里添加插入、更新具体操作。（获取员工的ID暂未实现，将在**功能完善**里实现）

### ---功能测试

===============================OK==============================

### ---功能完善

> ![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665801609037-d92a3e52-6dcf-4d05-8112-7e2db5788257.png)
> **ThreadLocal**：
> ![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665801739668-382af5df-8980-4a67-b784-480c93b44f17.png)
> ![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665802169224-ab774404-6213-4ba7-bf87-5466cec0f375.png)
> ![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665802345778-0fb4b405-946c-4cd7-b816-5688b3353128.png)

## 🧡新增分裂

### ---需求分析

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665803146051-b42b0cb5-3f46-4f75-a5c3-828abfa75b5d.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665803166464-d3512da5-0d92-40b1-affc-bb12757d1a8f.png)

### ---数据模型

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665803413027-84d0dd3d-fc48-4037-9f55-16e9bea2da51.png)

### ---代码开发

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665803428144-584a5f90-fc16-403e-9011-164cba464e70.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665805379746-e96c86a2-ddfc-4183-95aa-dff2d0a65474.png)

### ---功能测试

===============================OK==============================

## 🧡分类信息分页查询

### ---需求分析

![uTools_1665878598465.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665878622632-f150a5da-6109-4a7d-83ff-df970c85af8a.png)

### ---代码实现

![uTools_1665880637369.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665880670817-eb77fc41-72a5-4bd1-aac5-4fe68d5877b9.png)

### ---功能测试

===============================OK==============================

## 🧡删除分类

### ---问题分析

![uTools_1665880935760.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665880959782-2139fd3c-4c02-4938-b037-63ca23ddeb9c.png)

### ---代码实现

![uTools_1665880994277.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665881019749-856228ba-5918-464f-a765-0295b808380d.png)

### ---功能测试

===============================OK==============================

### ---功能完善

![uTools_1665881196560.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665881223898-7ca2d632-2930-4f45-9b2f-a3bd63add109.png)

### ---功能完善

## 🧡修改分类

### ---问题分析

**前端已经实现数据回显**
![uTools_1665883235833.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665883257256-a76a40f1-5716-42c2-937b-8f5aa75656db.png)

### ---代码实现

略....

### ---功能测试

===============================OK==============================

---

# 🔝菜品管理业务开发

## 🧡文件上传下载

### ----文件上传介绍

![uTools_1665901146876.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665901229865-fa5286c8-bc64-42f8-b629-4467fc6f1946.png)
![uTools_1665901432777.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665901455769-9c7f6751-a06a-42b5-908e-382b0eac7886.png)

### ----文件下载介绍

![uTools_1665901512266.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665901534625-2bd326d6-1528-4eae-b86a-902cd63fc53b.png)

### ----文件上传代码实现

```java
    /**
     * 文件上传
     *
     * @param file
     * @return
     */
    @PostMapping("/upload")
    public R<String> upload(MultipartFile file) {
        //file是一个临时文件，需要转存到指定位置，否则本次请求完成后临时文件会删除
        log.info(file.toString());
        //原始文件名
        String originalFilename = file.getOriginalFilename();
//   1.   String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
        String[] splits = Objects.requireNonNull(originalFilename).split("\\.");
        //UUID防止文件名重复
//   1.   String filename = UUID.randomUUID().toString()+suffix;    //1.
        String filename = UUID.randomUUID().toString() + "." + splits[1];

        //创建目录对象
        File dir = new File(basePath);
        if (!dir.exists()){
            dir.mkdir();
        }

        try {
            //将临时文件转存到指定位置
            file.transferTo(new File(basePath + filename));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return R.success(filename);
    }

```

### ----文件下载代码实现

```java
/**
     * 文件下载
     * @param name
     * @param response
     */
    @GetMapping("/download")
    public void download(String name, HttpServletResponse response){

        try {
            //输入流，通过输入流读取文件内容
            FileInputStream fileInputStream = new FileInputStream(new File(basePath + name));
            //输出流，通过输出流将文件写会文件夹，在浏览器展示图片
            ServletOutputStream outputStream = response.getOutputStream();

            response.setContentType("image/jpeg");

            byte[] bytes = new byte[1024];
            int len = 0;
            while ((len = fileInputStream.read(bytes)) != -1){
                outputStream.write(bytes,0,len);
                outputStream.flush();
            }

            fileInputStream.close();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

## 🧡新增菜品

### ----需求分析

![uTools_1665909464451.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665909485200-346c0e97-9dca-4d42-8af5-fcca31d083f4.png)
![uTools_1665909476259.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665909499531-bf47ac64-45ca-4f23-9717-f05720078cc9.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665909522486-dc3e2adb-5fc7-4bf5-a44d-237128d5d145.png)

### ----数据模型

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665909557728-047a4ca8-921e-4691-9a72-9d16c3c3b449.png)

### ----代码开发

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665909794494-c7e70ec9-2425-43d5-b7bb-b9014d0f3538.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665909994266-7ceb67ce-45df-4b7c-b26e-8f44e1616765.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1665912287097-707e68a9-6901-47ce-905b-b6df2cf5598a.png)

### ----功能测试

> **创建实体对象Dish和DishFlavor是使用插件创建的createTime和updateTime字段的类型为Date是错误的，应该为LocaDateTime。**
> ===============================OK==============================

---

## 🧡菜品信息查询

### ----需求分析

![uTools_1666178432227.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666178462827-fa6f0568-29c2-42e6-a391-c88d1b93d4b9.png)

### ----代码开发

```java
    /**
     * 分页查询
     * @param page
     * @param pageSize
     * @param name
     * @return
     */
    @GetMapping("/page")
    public R<Page> page(int page, int pageSize, String name){

        //构造分页构造器
        Page pageInfo = new Page(page,pageSize);
        //构造条件构造器
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper();
        //添加过滤条件
        queryWrapper.like(StringUtils.isNotEmpty(name), Dish::getName,name);
        //添加排序条件
        queryWrapper.orderByAsc(Dish::getSort);
        //执行查询
        dishService.page(pageInfo,queryWrapper);

        return R.success(pageInfo);
    }

```

### ----功能测试

===============================OK==============================

## 🧡修改菜品

### ----需求分析

![uTools_1666406862729.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666406903059-e4a8ade9-6635-4727-82f8-51b1c4eecb0a.png)

### ----代码开发

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666406919306-309d7af3-ef34-4c14-8474-701b37bda72b.png)
**定义新的接口方法**

### ----功能测试

===============================OK==============================

---

# 🔝套餐管理业务开发

## 🧡新增套餐

### ----需求分析

![uTools_1666436047822.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666436080894-30c7c24b-f7b9-4d98-89cc-6fb450db9759.png)

### ----数据模型

![uTools_1666436190531.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666436224566-48fa2706-df57-4de4-aaf7-1591696fe214.png)

### ----代码开发

![uTools_1666436462187.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666436497398-6f4f1c55-9e97-4338-9d92-8cb8beaa5702.png)
![uTools_1666437794137.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666437827767-42544c7f-fe8a-4a7d-b661-59193468bb42.png)

### ----功能测试

===============================OK==============================

## 🧡套餐信息分类查询

### ----需求分析

![1.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666501621274-a30d96a0-dac5-4f38-ad11-a634e1c8f301.png)

### ----代码开发

![uTools_1666501559648.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666501596692-9aace523-982b-43dc-bdaf-ace8916e204d.png)

### ----功能测试

===============================OK==============================

## 🧡删除套餐

### ----代码开发

```java
    /**
     * 删除传入的一个或多个菜品信息以及口味信息
     * @param ids
     * @return
     */
    @DeleteMapping
    public R<String> delete(String ids){
        String[] split = ids.split(",");
        List<Long> list = new ArrayList<>();
        for (int i = 0; i < split.length; i++) {
            list.add(Long.parseLong(split[i]));
        }
        log.info(list.toString());
        setmealService.deleteByIdsWithDish(list);

        return R.success("删除成功");
    }
```

```java
    /**
     * 删除套餐以及对应的菜品信息
     * @param ids
     */
    @Override
    public void deleteByIdsWithDish(List<Long> ids) {
        //删除Setmeal表基本信息
        this.removeByIds(ids);
        //清理当前套餐对应菜品信息---setmeal_dish表的delete操作
        LambdaQueryWrapper<SetmealDish> queryWrapper = new LambdaQueryWrapper();
        for (int i = 0; i < ids.size(); i++) {
            queryWrapper.eq(SetmealDish::getDishId, ids.get(i));
            setmealDishService.remove(queryWrapper);
        }
    }
```

### ----功能测试

===============================OK==============================

# 🔝手机验证码登录

## 🧡效果展示

![uTools_1666502209094.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666502244633-d057b817-fbc2-41d4-914a-9bacf3c2e43f.png)

## 🧡短信发送

### ----短信服务介绍

**日前市面上有很多笔一方提供的短信服务 这些第三方短信服务会和各个运营商（ 移动 联通 电信）对接 ，我们只要注册成为会员并且按照提供的开发文档进行调用就可以发送短信。需要说明的是，这些短信服务一般都是收费服务。**
**常用短信服务：**

- **阿里云**
- **华为云**
- **腾讯云**
- **京东**
- **梦网**
- **乐信**

### ----阿里云短信服务

**阿里云短信服务(Short Messagervice)是厂大企业各户快达手机用户所优选使用的通信能力。调用API或用群发助手，即可发送验证码、通知类和营销类短信；国内验证短信秒级触达，到达率最高可达99%；国际/港澳台短信覆盖200多个国家和地区，安全稳定，广受出海企业选用。**
**应用场景:**

- **验证码**
- **短信通知**
- **推广短信**

### ----代码开发

**采用邮箱发送**

## 🧡手机验证码登录

### ----需求分析

![uTools_1666505530741.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666505566143-4491b5df-1b5c-4e71-b66c-63d36fa8a207.png)

### ----数据模型

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666595866473-c4db169c-69e1-4c06-9b7d-d89e9d71f943.png)

### ----代码开发

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666595949061-31344200-7722-49ed-9783-28c229918e44.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666595999366-71b210c5-453b-46a7-a7f1-97e9ff516f6c.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666597166359-0317c279-7a34-4203-9e92-1ae79e83d515.png)

### ----功能测试

===============================OK==============================

# 🔝菜品展示、购物车、下单

## 🧡导入用户地址簿相关功能代码

### ----需求分析

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666762356494-d4185610-2664-4a94-b0cc-cf36b492eb11.png)

### ----数据模型

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666762367435-bc45a93f-3c2e-4f43-8cce-c09364c042d5.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666762427687-3b3995f9-2f36-4f2a-b210-c4937697be27.png)

### ----导入功能代码

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666762439351-38f9ad2d-2ca0-4f67-98ff-7c29c24ed626.png)

### ----功能测试

===============================OK==============================

## 🧡菜品展示

### ----需求分析

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666930258131-46520ce4-ea2b-4041-8625-802d165e6740.png)

### ----代码开发

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666930318518-a0538df7-6d7c-473c-850b-1ae4608a27f7.png)

```java
/**
     * 添加套餐信息和套餐菜品等
     * @param categoryId
     * @return 成功的R类信息
     */
    @GetMapping("/list")
    public R<List<DishDto>> save(Long categoryId){
        log.info("添加套餐");
        List<Dish> list = dishService.getByCategoryId(categoryId);

        List<DishDto> DtoList = list.stream().map((item) -> {
            DishDto dishDto = new DishDto();

            BeanUtils.copyProperties(item, dishDto);

            Long categoryIdInDish = item.getCategoryId();//分类ID
            //根据ID查询分类对象
            Category category = categoryService.getById(categoryIdInDish);
            if (category != null){
                String categoryName = category.getName();
                dishDto.setCategoryName(categoryName);
            }
            //当前Id的id
            Long dishId = item.getId();
            LambdaQueryWrapper<DishFlavor> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(DishFlavor::getDishId,dishId);
            List<DishFlavor> dishFlavorList = dishFlavorService.list(queryWrapper);
            dishDto.setFlavors(dishFlavorList);
            return dishDto;
        }).collect(Collectors.toList());


        return R.success(DtoList);
    }
```

```java
    /**
     * 根据条件查询套餐数据
     * @param setmeal
     * @return
     */
    @GetMapping("/list")
    public R<List<Setmeal>> list(Setmeal setmeal){
        //写查询条件
        LambdaQueryWrapper<Setmeal> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(setmeal.getCategoryId()!=null, Setmeal::getCategoryId,setmeal.getCategoryId());
        queryWrapper.eq(setmeal.getStatus()!=null, Setmeal::getStatus,setmeal.getStatus());
        queryWrapper.orderByDesc(Setmeal::getUpdateTime);

        List<Setmeal> list = setmealService.list(queryWrapper);


        return R.success(list);
    }
```

### ----功能测试

===============================OK==============================

## 🧡购物车

### ----需求分析

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666944223045-1a4efbf7-f37d-47c4-8bb3-fa499a80d86b.png)

### ----数据模型

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666944470546-79083663-02f1-44ff-b690-c83a8def0c08.png)

### ----代码开发

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666944667384-0ad08ac7-3ef9-4d1e-940c-ec091e1f1977.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1666945864916-bec76e11-d8fc-46e5-9d96-ea51e4ab931a.png)

### ----功能测试

===============================OK==============================

## 🧡用户下单

### ---需求分析

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667016980099-8181e48f-5f29-4243-9469-119a85770117.png)

### ---数据模型

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667017088216-951d6832-7f40-44f3-9e1b-4415cf8b4732.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667017242054-c690d063-7c8d-497e-bf85-253ed30b9821.png)

### ---代码开发

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667017284216-612bcec1-33db-41d8-bd32-38365962417c.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667017866858-fc1c7ffc-cb92-456c-abe1-a93f48a8b5f5.png)

### ---功能测试

===============================OK==============================

# 😥Git(二刷。复习)

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667022343179-20ed6aaa-97d8-403e-92da-f984d494980e.png)
**功能**

---

**代码回溯**
**版本切换**
**多人协作**
**远程备份**

---

## 💢Git 概述

### |Git 简介

Git是一个分布式版本控制工具，通常用来对软件开发过程中的源代码文件进行管理。通过Git 仓库来存储和管理这些文件，Git 仓库分为两种：

- **本地仓库：开发人员自己电脑上的 Git仓库**
- **远程仓库：远程服务器上的Git仓库**

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667022872743-3ae8ada6-3727-40df-8261-bb7970b7e31d.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667022882589-5fd17142-cb22-404f-850e-4058b0a8b163.png)

### |下载

> 下载地址：[https://git-scm.com/download](https://git-scm.com/download)

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667022905451-dbacce5a-a551-4706-a53e-48533b7fa1eb.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667022948000-557c7555-c1ec-4840-8643-5e0c37dc58dd.png)

## 💢Git 代码托管服务

### |常用的Git代码托管服务

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667023026439-79cf046d-c7a4-4a86-8daf-8459fbe440d3.png)

### |使用码云代码托管服务

## 💢Git 常用指令

### |Git 全局设置

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667023483995-d26c704e-2703-4cb1-8b0b-b341b44598dc.png)

### |获取Git 仓库

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667023559957-486d7530-ddab-4b89-8644-7d4e86e9f40a.png)

#### ——在本地初始化一个Git仓库（不常用）

#### ![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667023594714-d37d68cf-c4bd-415f-824d-fc9741934551.png)

#### ——从远程仓库克隆（常用）

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667023723512-1f448eac-5c7a-44f5-b3a0-07762e6a3cea.png)

### |工作区、暂存区、版本库的概念

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667029196713-fde03319-1825-4239-a933-e088f9e5cd7e.png)

### |Git 工作区中的文件的状态

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667029296546-3aa106ac-dd21-43ea-84ff-356546c52e6b.png)

### |本地仓库操作

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667029438362-8e553b9d-83b9-4cd4-91ed-583e9937825a.png)

### |远程仓库操作	

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667029802788-1bcb1915-e8a6-44c4-80d1-707cf7f8d31b.png)
:::info
输错的，控制面板—>用户账户—>管理Windows凭据—>Windows凭据—>普通凭据，找到gitee，点击编辑可以修改用户名和密码
:::
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667030403685-439988a4-d7cd-48b0-97b6-d1ba3fdffa44.png)

### |分支操作

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667030943797-13fb1df2-4a2a-432b-adac-d65359ddef9d.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667031090385-bb75b27e-ae62-4508-9df3-0b3a1d370a5b.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667031133534-1b01bf07-acb1-4fdd-aef0-3e7cd3b93241.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667031229901-bb4875f7-342c-4f2e-baa9-95845dde1111.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667031240426-468570d2-026d-4b5e-a799-66715f0df7a1.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667031460950-6a9a13a4-44fc-4978-87e9-db954832a34d.png)

### |标签操作

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667031859083-ac86bcf9-d9e3-41b0-bf25-1124551b40bc.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667031953753-69ead07b-1334-4bc7-ba09-717d3fb2a60e.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667032026195-ef05f1e2-a2d8-4289-90ce-f1ec13a648cb.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667032030407-01a80ce9-f2d6-4639-87c2-7f3ace1fe973.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667032129535-10d5948a-30ab-4863-8093-518eff756f85.png)

## 💢在IDEA中使用 Git

### |在IDEA中配置Git

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667032452802-42c2c831-9ab6-4083-9683-9e53d5861ac5.png)

### |获取Git仓库

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667032464666-cdce005d-62dc-445c-b805-e2c221869da4.png)

### |本地仓库操作

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667033169871-3f00304a-a200-46d0-aa92-4eaee5c44fa5.png)

### |远程仓库操作

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667034396713-c40e5db2-9200-46ca-a769-2a3326823f58.png)

### |分支操作

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667034616473-750d92d1-9ac4-474f-953c-75af126033a8.png)

# 💨Linux

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667035638311-323f4ef7-bb04-42a8-ba07-6c4b8c666e24.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667035826439-cee58af6-c90b-4acc-9e63-229dff3e52b7.png)

## 🔆Linux 简介

### |不同应用领域的主流操作系统

- **桌面操作系统**
  - Windows（用户数量最多）	
  - Mac OS（操作体验好，办公人士首选）
  - Linux（用户数量少）
- **服务器操作系统**
  - UNIX（安全、稳定、付费）
  - Linux（安全、稳定、免费、占有率高）
  - Windows Server（付费、占有率低）
- **移动设备操作系统**
  - Android（基于Linux、开源，主要用于智能手机、平板电脑和智能电视）
  - iOS（苹果公司开发、不开源，用于苹果公司的产品，例如：iPhone、iPad)
- **嵌入式操作系统**
  - Linux（机顶盒、路由器、交换机）	

### |Linux发展历史

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667036127855-595790a9-a4e6-4e51-8a8d-1cfd4e7008db.png)

### |Linux系统版本

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667036188947-e9c77e64-1ba4-42a3-9727-8db51fb30287.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667036235342-898b6d54-6b1e-4014-8a04-6167c2d1ed97.png)

## 🔆Linux 安装

### |安装方式介绍

:::info
Linux系统的安装方式
物理机安装：直接将操作系统安装到服务器硬件上
虚拟机安装：通过虚拟机软件安装

虚拟机（VirtualMachine）指通过软件模拟的具有完整硬
件系统功能、运行在完全隔离环境中的完整计算机系统。
:::
常用虚拟机软件

- **VMWare**
- **VirtualBox**
- **VMLite WorkStation**
- **Qemu**
- **HopeddotVos**

### |安装Linux

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667045102954-bea95114-a920-4668-96b2-a0883cfd8fdf.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667045120458-71fc5adf-7a8a-4ed5-8ada-44378e1fed54.png)

### |网卡设置

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667045177368-d282b89f-a790-42bc-b832-632dd5968219.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667045206822-7334c7d4-90fb-4bc0-ba1e-a09219cd3bb1.png)

### |安装SSH连接工具

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667045430233-cdcc11b5-4ee6-4aa9-8f67-47c7f83ff44f.png)

---

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667045774554-371a0c76-ce4c-488d-9505-456cb23388d7.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667045868437-b9cae4a3-ec5f-473c-a5a9-c473cb1364c4.png)

## 🔆Linux 常用命令

### |Linux命令初体验

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667051439671-cb7c4388-b050-42ab-a059-66f3f08ddc3f.png)

#### 命令技巧

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667051888379-37c5932c-3263-46be-8733-347f2dbe290e.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667052020708-17139367-1da2-49ed-990a-919253bf501f.png)

### |文件目录操作目录

#### ls——显示指定目录下的内容

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667101560447-33292606-8d50-4651-b6ad-07bb6c426658.png)

#### cd——切换目录

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667101951970-83978153-d154-41fe-8424-f95f2250b56b.png)

#### cat——显示文件内容

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667102049945-21b5cf6e-ce32-42da-9f4c-cc3ed85fafef.png)

#### more——以分页的形式显示文件内容

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667102203546-d36dfe78-cb2a-477e-ae0b-3428135e8d01.png)

---

#### tail——查看文件末尾的内容

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667102664419-68a96afb-1794-4caf-b5ad-5cc693ff7146.png)

#### mkdir——创建目录

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667102691329-7ee4eec7-d055-4a4b-9b8e-83afb3d86645.png)

#### rmdir——删除空目录

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667102771876-b586df4e-3b6c-48c2-8595-0f562562192d.png)

#### rm——删除文件或目录

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667105222250-f05897ca-c983-4690-8918-eab71896ea79.png)

### |拷贝移动命令

#### cp——复制文件或目录

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667105377010-5b24997e-d0db-4bb8-95e9-21b9e11efadc.png)

#### mv——给文件、目录改名或移动

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667105945070-6f69ded3-c8bf-4241-b78d-c95766e4331a.png)

### |打包压缩命令

#### tar——打包压缩

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667106340017-17a7d914-fd81-4206-8902-039549dc400c.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667107279049-9c7257ef-fef8-4abe-99bb-15a52f8dbab8.png)

### |文本编辑命令

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667107403956-6da5fbfd-4a53-42da-948d-1279a0ea75de.png)

---

**Vim**
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667107725037-9e5aed80-16d0-4e95-b676-b3a6bf27631a.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667107824287-fc47eea5-4f9c-4ab8-ac13-8dbab255a0fc.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667107830296-9d6f4070-7ba4-4e1a-b313-e5182892d0eb.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667107893867-55826237-d565-4276-8fd2-deb956849de1.png)

### |查找命令

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667108427597-f3fce3f9-e34f-4a3c-a8ac-bd4bc674eb05.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667109795601-5e943967-f87c-411a-bc20-abdb31567341.png)

## 🔆Linux 软件安装

### |软件安装方式

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667110268131-9b987320-8406-46a5-a410-8f1d7808d02d.png)

### |安装jdk

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667110355053-0ccdffa5-7b50-40ac-816c-157f218bc04b.png)

### |安装Tomcat

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667111151797-139845ed-0fa5-4eb1-9d64-18a49995b049.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667111576072-85247b04-f5e7-43b1-99c0-483b4d0aad3a.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667113098012-b4dd35b1-92e3-4817-9f3d-bb72da48d0ac.png)

#### ps命令——进程查看命令

> **ps -ef：可以查看当前运行的所有进程的详细信息**

#### systemctl\firewall命令——管理服务的命令\防火墙指令

:::info
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667112429181-b58e41ec-20f3-4294-a4da-c79163e1297d.png)
:::

### |安装MySQL

#### ①检测当前系统是否安装MySQL数据库

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667113330829-7e61d2a8-8b45-424b-93d2-5fa1e42a200c.png)

#### ②卸载以及安装的冲突软件

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667113498984-a490d1fe-a156-4a66-9e8e-db1f5c1d43ed.png)

#### ③将MySQL安装包上传到Linux并解压

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667113858951-bd3a9acb-9223-4364-980d-b8ce395d68ee.png)

#### ④按照顺序安装rpm软件包

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667113867099-9cd85e4d-8d23-44a1-8063-6b97d46dab27.png)

#### ⑤启动MySQL

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667114256419-38c66df4-f398-4ccd-b2bb-123b5ce9db5e.png)

#### ⑥登录MySQL数据库，查阅临时密码

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667114440248-08d6f12a-0fc4-43ab-8083-4d3ab6ce36f0.png)

#### ⑦登录MySQL，修改密码。开放访问权限

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667114542416-9d305d0f-b493-476c-8af8-bed257c44669.png)

#### ⑧测试MySQL数据库是否正常工作

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667115280190-ea73f679-e2ae-4165-933a-241cd134b730.png)
:::info
**注意Linux虚拟机需要开放端口3306**
**并且一定要设置立即生效——firewall-cmd --reload**
:::

### |安装lrzsz

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667115850167-b8c58889-4baa-4514-b932-682348fbf91f.png)
:::info
rz：打开文件上传页面
:::

## 🔆项目部署

### |手工部署项目

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667123572120-0464ee63-710c-458d-922b-85066dd933dd.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667123634122-1a341b24-af85-443a-b57d-3eb7b0b0fcdb.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667123719455-707c6007-0cb6-4d1c-8208-e7d8d9b5a7c5.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667123723826-e14c77bc-3c2f-41e5-8605-57b2e70f121a.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667123816987-4b8985b0-0e7d-4697-a0d5-325e027d0abd.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667124068817-0bb8e805-7de6-45bd-86a4-1ccc774f877a.png)

### |通过Shell脚本自动部署项目

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667124146214-3af80b45-6523-4434-b04c-b553ffc7dbb4.png)

#### ①在Linux中安装Git

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667124307514-874c6418-8534-4b94-b449-8538bf616d36.png)

#### ②使用Git克隆代码![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667124480917-ef1d44fa-5376-40dd-bf7f-5fcf75d367a0.png)

#### ③安装maven ![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667124506989-a6b41712-64e0-4ad2-8d49-85637fcd5757.png)

#### ④Shell脚本复制到Linux

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667124744759-fca43071-9d8f-447f-bc94-a78c6251db9b.png)

#### ⑤为用户授权

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667125002606-62a07677-63a5-4928-b26b-27e10ffb0072.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667125213208-60927a3d-0c5b-40e3-8458-a28cb034fe2e.png)

#### ⑦设置静态IP![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667125547838-275cfec3-40bb-443e-a698-ece1e18f6bbd.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667125810312-cd3d1c33-fc30-4a7a-a07f-9af2c6142a88.png)

# 💬Redis

**Redis是一个基于**内存**的key-value结构数据库。**
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667126213462-5260bed6-6943-43ad-b157-5f38c369b1d4.png)

## 💙Redis入门

### |Redis 简介

> **Redis is an open source (BSD licensed), in-memory data structure store, used as a database,cache, and messagebroker，**
> **翻译为：Redis是一个开源的内存中的数据结构存储系统，它可以用作：数据库、缓存和消息中间件。**

官网：[https://redis.io](https://redis.io)

> **Redis是用C语言开发的一个开源的高性能键值对(key-value)数据库，官方提供的数据是可以达到100000+的QPS（每秒内查询次数）。它存储的value类型比较丰富，也被称为结构化的NoSql数据库。**

> **NoSql(Not Only SQL），不仅仅是SQL，泛指非关系型数据库。NoSql数据库并不是要取代关系型数据库，而是关系型数据库的补充。**

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667126675728-3edc7064-2e9c-42fc-9f7e-170b1a962640.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667126695442-c8fad20b-02dd-471e-8b24-e9325c9710bb.png)

### |Redis 下载和安装

> Redis安装包分为windows版和Linux版:

> Windows版下载地址：[https://github.com/microsoftarchive/redis/releases](https://github.com/microsoftarchive/redis/releases)

> Linux版下载地址：[https://download.redis.io/releases/](https://download.redis.io/releases/)

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667126767788-38e45c11-dba2-438d-82c5-55903e0eb307.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667126889635-a581030c-48f7-43c4-a89e-e74f600f2d22.png)

### |Redis 服务的启动和停止

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667127104922-01c62896-a8e7-4595-9f94-5187b64c84e3.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667127332566-e7bb2f91-0b6d-473c-a3ea-e41b2ef0f47a.png)后台运行
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667127563437-766fc590-fcdc-4bca-af10-ae0ca66b19c1.png)设置密码
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667127832562-ee96ff64-a9d6-4660-b1a0-5882f9fb5ba6.png)允许远程连接

## 💙数据类型

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667295645877-df0e935e-8f12-4b8d-8de5-76e13456f7cf.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667295682445-1696d5f6-26e3-4f41-aad8-45b2ebd58ca5.png)

## 💙常用命令

### | 字符串string 操作命令 

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667296180927-f2334ac4-8215-4910-9033-eef63ba8050d.png)更多命令可以参考Redis中文网：[https://www.redis.net.cn](https://www.redis.net.cn)

### | 哈希 hash 操作命令

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667298965408-1c0dc7b0-f48c-4f4e-907a-91f7df3ad4d0.png)

### | 列表 list 操作命令![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667299267942-33ccca81-5e09-41b0-9cd6-68a9f1fe67eb.png)

### | 集合 set 操作命令

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667299632528-c4bfb970-e507-4992-a150-953f12b6f995.png)

### | 有序集合 sorted set 操作命令

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667299966107-04406f3d-d047-4ada-ae67-41b080653e3d.png)

### | 通用命令

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667300357813-0f63a5f1-5ce3-432e-b7a0-310f5a57b684.png)

## 💙在Java中操作Redis

### | 介绍

:::info
Redis的Java客户端很多，官方推荐的有三种：

- Jedis
- Lettuce
- Redisson

Spring对Redis客户端进行了整合，提供了**Spring Data Redis**,在Spring Booti项目中还提供了对应的Starter,即**spring-boot-starter-data-redis**
:::

### |Jedis

```xml
<-- Jedis的maven坐标 !->
<dependency>
	<groupId>redis.clients</groupId>
	<artifactId>jedis</artifactId>
	<version>2.8.0</version>
</dependency>
```

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667300573583-0341e0ba-d686-4766-b3fc-9e18f0f68559.png)

### | Spring Data Redis

**在Spring Boot项目中，可以使用Spring Data Redis.来简化Redis:操作，maven坐标：**

```xml
<dependency>
	<groupld>org.springframework.boot</groupld>
	<artifactld>spring-boot-starter-data-redis</artifactld>
</dependency>
```

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667302464883-d284b869-df7f-4534-b9d0-dc9d8def58c7.png)

> 序列化器：默认的Key序列化器为：JdkSerializationRedisSerialization

```java
package com.flyone.config;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.connection.DataType;
import org.springframework.data.redis.core.*;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@SpringBootTest
@RunWith(SpringRunner.class)
class AppTests {

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 操作string类型-字符串
     */
    @Test
    public void testString() {
        //设置key和value
        redisTemplate.opsForValue().set("string", "beijing");
        //得到值为“string”的value
        String value = (String) redisTemplate.opsForValue().get("string");
        System.out.println(value);
        //设置key和value以及指定过时时间和单位
        redisTemplate.opsForValue().set("stringTime", "time", 10l, TimeUnit.SECONDS);
        //当key值不重复时设定value,返回值为boolean类型，ture为无重复值，设定成功，反之为false
        Boolean aBoolean = redisTemplate.opsForValue().setIfAbsent("string2", "nanjing");
        System.out.println(aBoolean);
    }

    /**
     * 操作hash类型-哈希
     */
    @Test
    public void testHash(){
        //获取哈希类型对象
        HashOperations hashOperations = redisTemplate.opsForHash();
        //设置key以及value(哈希类型：hashkey-value)
        hashOperations.put("001","name","xiaoming");
        hashOperations.put("001","age","20");
        hashOperations.put("001","address","chongqing");
        //得到key为001、hashkey为age的value
        Object age = hashOperations.get("001", "age");
        System.out.println(age);

        //获取hash结构中的所有字段
        Set keys = hashOperations.keys("001");
        for (Object key:keys) {
            System.out.println(key);
        }
        //获取hash结构中的所有值
        List values = hashOperations.values("001");
        for (Object value : values){
            System.out.println(value);
        }
    }

    /**
     * 操作list类型-列表
     */
    @Test
    public void testList(){
        //获取列表类型对象
        ListOperations listOperations = redisTemplate.opsForList();
        //设置key、value从左边存入一个数据
        listOperations.leftPush("list","a");
        //设置key、value从左边存入多个个数据
        listOperations.leftPushAll("list","b","c","d");
        //取出list的值,索引为全部(0,-1);
        List<String> list = listOperations.range("list", 0, -1);
        for (String value : list) {
            System.out.println(value);
        }

        //获取list长度
        Long size = listOperations.size("list");
        int lSize = size.intValue();
        for (int i = 0; i < lSize; i++) {
            //出队列,从右边出
            String element = (String) listOperations.rightPop("list");
            System.out.println(element);
        }
    }

    /**
     * 操作Set类型-集合
     */
    @Test
    public void testSet(){
        //获取Set类型对象
        SetOperations setOperations = redisTemplate.opsForSet();
        //设置key、多个value
        setOperations.add("mySet","a","b","c","c");
        //取出Set的值
        Set<String> mySet = setOperations.members("mySet");
        for (String value : mySet) {
            System.out.println(value);
        }

        //删除成员
        setOperations.remove("mySet","a","b");
        mySet = setOperations.members("mySet");
        for (String value : mySet) {
            System.out.println(value);
        }
    }
    /**
     * 操作ZSet类型
     */
    @Test
    public void testZSet(){
        //获取ZSet类型对象
        ZSetOperations zSetOperations = redisTemplate.opsForZSet();
        //设置key、多个value
        zSetOperations.add("myZSet","a",10.0);
        zSetOperations.add("myZSet","b",11.0);
        zSetOperations.add("myZSet","c",12.0);
        zSetOperations.add("myZSet","d",13.0);
        //取出Set的值,索引为全部(0,-1);
        Set<String> myZSet = zSetOperations.range("myZSet", 0, -1);
        for (String value : myZSet) {
            System.out.println(value);
        }
        //修改分数
        //追加分数
        zSetOperations.incrementScore("myZSet","b",20.0);
        //删除成员
        zSetOperations.remove("myZSet","a","b");
    }
    /**
     * 通用操作
     */
    @Test
    public void testCommon(){
        //获取Redis中所有的key
        Set<String> keys = redisTemplate.keys("*");
        for (String key : keys) {
            System.out.println(key);
        }
        //判断某个key是否存在,存在则true，不存在则false
        Boolean aBoolean = redisTemplate.hasKey("flyone");
        System.out.println(aBoolean);
        //删除指定key
        redisTemplate.delete("myZSet");
        //获取指定key对应的数据类型
        DataType mySet = redisTemplate.type("mySet");
        System.out.println(mySet);
    }
}

```

# 👀项目优化

## ✔缓存优化

### 问题说明

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667368748265-80c24194-062c-407d-819c-d356be0c96b2.png)

## ✔环境搭建

### --maven坐标

**在项目的pom.xml文件中导入spring data redis的maven坐标**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### --配置文件

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667370828254-a5204cee-c3b5-470b-8d23-ce8c2476b8a2.png)

### --配置类

```java
package com.flyone.config;

import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;


/**
* Redis配置类
*/

@Configuration
    public class RedisConfig extends CachingConfigurerSupport {

        @Bean
        public RedisTemplate<Object,Object> redisTemplate(RedisConnectionFactory connectionFactory){
            RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();

            //默认的Key序列化器为：JdkSerializationRedisSerialization
            redisTemplate.setKeySerializer(new StringRedisSerializer());
            redisTemplate.setHashKeySerializer(new StringRedisSerializer());

            redisTemplate.setConnectionFactory(connectionFactory);

            return redisTemplate;
        }
    }

```

## ✔缓存短信验证码

### --实现思路

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667371710401-b7cb6057-29ca-4b07-b696-fe9f2778dcff.png)

### --代码改造

**UserController里两个TODO已完成**

### --功能测试

**=============================OK==============================**

## ✔缓存菜品数据

### --实现思路

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667373757006-03549697-be9d-4a02-a65d-b404516975fc.png)

### --代码改造 

**见DishController**

### --功能测试

**=============================OK==============================**

## ✔Spring Cache

### --Spring Cache介绍

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667446154351-e0341983-dccf-4c76-9ed1-38bde3e710f7.png)

### --Spring Cache常用注解

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667446276467-0710f1be-f05a-4f90-a71c-0b2c03a6c994.png)

### --Spring Cache使用方式

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667562508365-2dd9ab78-66dc-41a5-86f3-54fe16c38ed5.png)
:::info
Ctrl + Alt + b：查看该接口的所有实现类
要导航至抽象方法的实现，请将文本光标置于声明中的用法或名称处，然后按 Ctrl+Alt+B。
:::

## ✔缓存套餐数据

### --实现思路

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667563012520-d1ad9e23-fc9c-47f4-b200-72273fffc072.png)

### --代码改造

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667563234660-86eaa920-3731-4aad-a3fb-1a73a0f26779.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667563239459-efa55951-4b17-4acb-aec0-e0c99ee2edf0.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667563287815-2cfa4c42-6ec5-47e5-a551-fed92ae11594.png)

### --功能测试

**=============================OK==============================**

# 👀读写分离

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667564461777-ffb1264b-d003-473b-88f0-04b7b212eb27.png)

## 🎁MySQL主从复制

### | 介绍

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667564654765-1c1c5058-1c59-47fa-a0ce-85b6dd8292cc.png)

### | 配置

> mysql远程连接权限

:::info
MySQL 8以前版本的语法格式
grant all privileges on *.* to ‘root‘@‘%‘ identified by ‘123456‘ with grant option
:::
:::info
MySQL 8的语法格式
create user root@'%' identified by '123456';
grant all privileges on *.* to root@'%' with grant option;
:::

> MySQL8.0——创建用户和授权

:::info
1.创建用户
默认用户为root，创建新用户用：create user '用户名'@'IP地址' identified by '密码'。
例如：create user ‘XXX’@‘192.168.43.1’ identified by '111111'；（用户为XXX，密码为111111只		    能在IP为192.168.43.1机器上登录）
    create user ‘XXX’@‘192.168.%’ identified by '111111'；（可以在前缀为192.168的任意机器		    上登录，%表示任意）
    create user ‘XXX’@‘%’ identified by '111111'；（可以在任意机器上登录）
2.授权:
授权：grant all privileges on 数据库 to '用户名'@'IP地址';
撤销权限：revoke all privileges from 数据库 to '用户名'@'IP地址';
all privileges指除了grant之外的所有权限，也可以自己设置权限
例如：grant insert on world.* to '用户名'@'IP地址';(只能对world数据库做插入操作，world.*表示对world中所有表）
:::
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667567120734-957f58e3-4874-4c4d-8b40-d6f8ed65b424.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667567444299-df3aacd1-41c3-4705-8d3f-e5b69851cc76.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667567953656-0a25b74c-4101-4c80-9303-4d8a3672b47d.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667568768842-fb594e8f-ba83-4030-8a8f-be655f84f282.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667568840121-7c408bdf-a9b8-4d9b-9592-6061938e2343.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667569191586-0ec0edb9-1643-4b3e-8b32-c7faaace0a84.png)

> Windows命令：net stop mysql
>    net start mysql

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667569248982-8d088e99-b411-4d93-af38-6100e7aab1df.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667569395869-df3ba1e1-d88f-4be6-8fd1-4a9f26a5e81c.png)

### | 测试

**=============================OK==============================**

## 🎁读写分离案例

### | 背景

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667618592509-b7500b5f-fe5a-4595-b0c6-ed6e88d735eb.png)

### | Sharding-JDBC介绍

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667618793086-bc2a4629-7666-45ea-bb9f-df7bc132e8d2.png)

### | 入门案例

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667618926557-ffd91584-9ba1-4aba-b1fb-20682fe91c70.png)

### | 功能测试

**=============================OK==============================**

## 🎁项目实现读写分离

### | 数据库环境准备（主从复制）

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667624400705-c12da0fd-9016-450d-9311-6ade62b65dcd.png)

### | 代码改造

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667624410027-f1e7cead-ec64-49aa-8ab2-6e9bb4c5147e.png)

### | 功能测试

**=============================OK==============================**

# 💬Nginx

## 🐱‍🐉 Nginx 概述

### | Nginx 介绍

> **Nginx是一款轻量级的Web服务器/反向代理服务器及电子邮件(IMAP/PoP3)代理服务器。其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx的网站有：百度、京东、新浪、网易、腾讯、淘宝等。**

> **Nginx:是由伊戈尔，赛索耶夫为俄罗斯访问量第二的Rambler.ru站点（俄文：PaM6nep)开发的，第一个公开版本0.1.8发布于2004年10月4日。**

> **官网：**[**https://nginx.org/**](https://nginx.org/)

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667625267246-002d53ce-ffd3-4a40-a660-a606a3479fa8.png)

### | Nginx 下载和安装

> 可以到Nginx官方网站下载Nginx的安装包，地址为：[https://nginx.org/en/download.html](https://nginx.org/en/download.html)

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667625411950-e4537a7a-da68-4ba9-b301-4016713699f6.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667625463048-d21d4a97-0c62-45a0-b2c7-f8f5ea70d60b.png)

### | Nginx 目录结构

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667626213428-d37b57ee-e1bf-4d36-a284-b1dedd062e9b.png)

## 🐱‍🐉 Nginx 命令

### | 查看版本 

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667626625982-ee46cb0d-7530-4bb5-b1d3-c2537ea8132f.png)

### | 检查配置文件正确性

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667626663114-035da986-c4d6-445b-afbc-a7765a780480.png)

### | 启动和停止

> 云服务器Nginx的地址：/www/server/nginx/sbin/nginx
> 已经运行了需要停止

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667626778279-d7db650b-228e-466b-98c3-ecbd55594a36.png)

### | 重新加载配置文件

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667627451326-24b71b07-108b-4286-86e1-120fa166e286.png)

> **配置环境变量**

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667627519447-d7b5c5de-fbee-4b99-8ee9-39eab96388ee.png)

> **刷新配置**

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667627551902-3fbd4b05-3874-4883-b17b-445a1d8ffc91.png)

## 🐱‍🐉 Nginx 配置文件结构

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667629525239-04ab23ff-249c-4a58-9ca1-3e0634750aa0.png)

### | 全局块

### | Events块

### | Http块

## 🐱‍🐉 Nginx 具体应用

### | 部署静态功能

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667630291316-89950281-3206-4012-afea-b560bad4150c.png)

> 红色：固定的，不能更改的
> 黑色：可更改的

### | 反向代理

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667646739242-55072b31-b180-4666-a144-fcef7e1d1f30.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667647470800-b273b996-68d3-4c86-a98f-c4743ba580f2.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667647476468-9854fc98-eb72-4688-9a4e-c4ded7e36927.png)

### | 复载均衡![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667647871550-b260e087-dde4-49c4-836f-2b458244a973.png)

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667648031161-fe693d96-f2d1-441b-9c87-68b7937b008d.png)
![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667648356339-cd795ff2-8a49-49be-b735-f3c5cfdc0db1.png)

# 😎前后端分离开发

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667648609855-1c6f6cc6-efac-4408-a02f-954068a47466.png)

## 🐱‍🐉前后端分离开发

### | 介绍

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667648852859-96188b96-3673-4100-99f6-d622cf8f54ca.png)

### | 开发流程

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667649137747-3e4052c1-e0ec-4db6-b134-3ee437c07f60.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667649191517-145b0155-0620-43a2-b438-449c8cef0142.png)

### | 前端技术栈

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667649541896-fbfc45e7-80fd-45e1-8753-c6e2531199d0.png)

## 🐱‍🐉YApi

### | 介绍

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667649751514-6e1b33b7-79c4-43ce-9958-d71aa208d23f.png)源码地址：[https://github.com/YMFE/yapi](https://github.com/YMFE/yapi)

### | 使用

## 🐱‍🐉Swagger

### | 介绍

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667650548106-71294c43-223b-4626-9c26-1c7b7f989be6.png)

### | 使用方式

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667650586684-b96694ec-d95e-4b68-aae1-c528e0114744.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667650696227-9bb94920-a2e0-444a-a171-fb1e0aab76e8.png)

```xml
<dependency>
  <groupld>com.github.xiaoymin</groupld>
  <artifactld>knife4j-spring-boot-starter</artifactld>
  <version>3.0.2</version>
</dependency>
```

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667650733619-7ac778a4-0fba-45f0-8ff0-acbb1b36d7b5.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667651144870-1dfe84f9-cff0-4e3a-adfb-fda1553c1904.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667651279198-f6b80829-2ff5-427f-9a34-7e79e08b7cd3.png)

### | 常用注解

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667651732272-4085ea51-7622-4eaf-9f04-d5a3fe0dc192.png)

## 🐱‍🐉项目部署

### | 部署架构

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667652265987-bacd5d68-b862-418f-87cf-7064aee4fb4d.png)

### | 部署环境说明

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667652444586-926f820e-e737-45c5-be74-59cea3b45687.png)

### | 部署前端项目

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667652650376-94972352-b596-4284-bc3f-5ea124686f58.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667653052510-caf3255d-b3e9-497f-9ba6-619ba322e6e6.png)

> rewrite ^/api/(.*)$ /$1 break; ：本来发送的请求会多加一个/api,但是Nginx反向代理发送的location里面的rewrite 会重写请求路径，通过正则表达式去掉/api，实现访问另一台服务器的地址

### | 部署后端项目

![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667660227715-b59733ea-48c5-4129-92e4-f2df74080509.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667660610807-8b879e3a-98be-4d00-a7d5-7c3620e43857.png)![image.png](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/1667660856323-a4bc533b-c423-4163-9e0a-c50f90adf919.png)

# 总结

> 由于作者并没有至少两台服务器（因为在配置虚拟机时电脑出现问题，所有不敢再用），所有无法使后端代码完全部署到云服务器上——即上传到服务器不可用，所以搁置此项目后端部署
> 注意：前端部署已经成功且运行成功
> 暂且当做新手做项目的不充分问题。
