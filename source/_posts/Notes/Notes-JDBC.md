---
title: JDBC-前置（黑马版）
date: 2022年12月3日17:30:34
tags: JDBC-更新中...
categroies: Java学习笔记
---



# 1.JDBC简介

就是使用Java语言操作关系型数据库的一套API
## JDBC 概念:

1. JDBC 就是使用Java语言操作关系型数据库的一套API
2. 全称: (Java DataBase Connectivity ) Java 数据库连接
## JDBC 本质:

1. 官方（sun公司）定义的一套操作所有关系型数据库的规则，即接口
2.  各个数据库厂商去实现这套接口，提供数据库驱动jar包
3. 我们可以使用这套接口（JDBC）编程，真正执行的代码是驱动jar包中的实现类
## JDBC 好处:

1. 各数据库厂商使用相同的接口，Java代码不需要针对不同数据库分别开发
2. 可随时替换底层数据库，访问数据库的Java代码基本不变
# 2. JDBC 快速入门
![uTools_1657022050442.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657022054948-ae0ba66a-f7cc-4e5b-b8af-939edefd9659.png#clientId=u6270bab2-fd73-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=443&id=uf0711a4c&margin=%5Bobject%20Object%5D&name=uTools_1657022050442.png&originHeight=665&originWidth=892&originalType=binary&ratio=1&rotation=0&showTitle=false&size=165304&status=done&style=none&taskId=u805ef400-eab6-4693-bc6c-821c3249433&title=&width=594.6666666666666)
```java
package com.JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/*
* JDBC 的快速入门
* */
public class JDBCDemo {
    public static void main(String[] args) throws Exception {
        //1.注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");
        
        //2.获取连接
        String url = "jdbc:mysql://localhost:3306/db1?serverTimezone=GMT";
        String username = "root";
        String password = "Flyone";
        Connection conn = DriverManager.getConnection(url, username, password);
        
        //3.定义sql语句
        String sql = "update account set money = 2000 where id = 1";
        
        //4.获取执行SQL的对象 Statement
        Statement stmt = conn.createStatement();
        
        //5.执行sql
        int count = stmt.executeUpdate(sql);//受影响的行数
        
        //6.处理结果
        System.out.println(count);
        
        //7.释放资源
        stmt.close();
        conn.close();
    }
    
}

```
`
# 3. JDBC API 详解
## 一：DriverManger
**DriverManager(驱动管理类)作用:**

1. **注册驱动**
2. **获取数据库连接**

![uTools_1657026240637.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657026247299-6336b90f-d787-4dc7-a648-4b1ff22acfdd.png#clientId=u6270bab2-fd73-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=377&id=u59f8049b&margin=%5Bobject%20Object%5D&name=uTools_1657026240637.png&originHeight=566&originWidth=865&originalType=binary&ratio=1&rotation=0&showTitle=false&size=208150&status=done&style=none&taskId=u9e0c6309-d604-40e6-a0f4-4d62f5cd4c9&title=&width=576.6666666666666)
![uTools_1657026268004.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657026273438-3568d22e-0e20-426e-8726-8bdff66c0e59.png#clientId=u6270bab2-fd73-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=353&id=u3cc9deb6&margin=%5Bobject%20Object%5D&name=uTools_1657026268004.png&originHeight=530&originWidth=1205&originalType=binary&ratio=1&rotation=0&showTitle=false&size=194758&status=done&style=none&taskId=u119562e0-63d6-4530-8bf7-a3db7044781&title=&width=803.3333333333334)
## 二：Connection
**Connection(数据库连接对象)作用:**

1. **获取执行SQL的对象**
2. **管理事务**

![uTools_1657073000065.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657073006456-057b5593-5e55-49d4-9a56-9f51d94912f5.png#clientId=uf89d2982-a90c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=331&id=uf3af7fdf&margin=%5Bobject%20Object%5D&name=uTools_1657073000065.png&originHeight=497&originWidth=943&originalType=binary&ratio=1&rotation=0&showTitle=false&size=124592&status=done&style=none&taskId=ub9313e03-d8ae-450b-85cf-8b10ff88016&title=&width=628.6666666666666)
![uTools_1657073063877.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657073069348-2809202c-e93c-47e3-b6ff-3b9755853cfe.png#clientId=uf89d2982-a90c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=344&id=ued718f39&margin=%5Bobject%20Object%5D&name=uTools_1657073063877.png&originHeight=516&originWidth=1191&originalType=binary&ratio=1&rotation=0&showTitle=false&size=221680&status=done&style=none&taskId=u63b630d9-ceac-4398-b0b8-37f33651226&title=&width=794)
## 三：Statement
![uTools_1657073959014.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657073962580-51eaa19f-2eb4-448d-a4fe-e8c81bd90336.png#clientId=uf89d2982-a90c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=265&id=ua29fc8d8&margin=%5Bobject%20Object%5D&name=uTools_1657073959014.png&originHeight=397&originWidth=1057&originalType=binary&ratio=1&rotation=0&showTitle=false&size=162679&status=done&style=none&taskId=u195789ad-4709-41f3-bbb1-4b2e83fada8&title=&width=704.6666666666666)
## 四：ResultSet
![uTools_1657195030780.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657195040551-fc56979c-176c-4bad-bd9d-ffdaf8cbf4c1.png#clientId=u504453fd-de63-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=437&id=u60242804&margin=%5Bobject%20Object%5D&name=uTools_1657195030780.png&originHeight=656&originWidth=1017&originalType=binary&ratio=1&rotation=0&showTitle=false&size=301999&status=done&style=none&taskId=u1b1d2cd3-6cd7-4fd6-8ecd-22cb7666a9e&title=&width=678)
### 四：(1)ResultSet 案例
![uTools_1657196812974.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657196819091-bbebad72-91b0-47c4-b0f0-28c4a38e28bc.png#clientId=u504453fd-de63-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=380&id=u6de1ad26&margin=%5Bobject%20Object%5D&name=uTools_1657196812974.png&originHeight=570&originWidth=1542&originalType=binary&ratio=1&rotation=0&showTitle=false&size=288433&status=done&style=none&taskId=u9448df63-3cc7-4c95-8abc-7491f98ae4e&title=&width=1028)
```java
 /**
     * 查询account账户表数据，封装为Account对象中，并且存储到ArrayList集合中
     * 1.定义实体类Account
     * 2.查询数据，封装到Account对象中
     * 3.将Account对象存入ArrayList集合中
     * @throws Exception
     */
    @Test
    public void testResultSet2() throws Exception {
        //1.注册驱动
//        Class.forName("com.mysql.cj.jdbc.Driver");

        //2.获取连接，如果连接的是本机mysql数据库并且端口是默认的3306可以简化为
        String url = "jdbc:mysql:///db1?serverTimezone=GMT";
        String username = "root";
        String password = "Flyone";
        Connection conn = DriverManager.getConnection(url, username, password);

        //3.定义sql语句
        String sql = "select * From account";

        //4.获取Statement对象
        Statement stmt = conn.createStatement();

        //5.执行SQL语句
        ResultSet rs = stmt.executeQuery(sql);

        List<Account> list = new ArrayList<>();

        //6.处理结果
        //6.1光标向下移动一行，并且判定当前行是否有数据
        while(rs.next()){
            Account account = new Account();
            //6.2 获取数据
//            int id = rs.getInt(1);
//            String name = rs.getString(2);
//            double money = rs.getDouble(3);
            int id = rs.getInt("id");
            String name = rs.getString("name");
            double money = rs.getDouble("money");

            account.setId(id);
            account.setName(name);
            account.setMoney(money);

            list.add(account);

        }
        System.out.println(list);
        //释放资源
        conn.close();
        stmt.close();
        rs.close();
    }
```

## 五：PreparedStatement
![uTools_1657197626230.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657197631627-ce56160c-8a09-40d5-88c6-f68aa3535a61.png#clientId=u504453fd-de63-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=639&id=u3a6665f2&margin=%5Bobject%20Object%5D&name=uTools_1657197626230.png&originHeight=958&originWidth=1628&originalType=binary&ratio=1&rotation=0&showTitle=false&size=304469&status=done&style=none&taskId=u8bc0e27d-cec2-4244-ae34-cc4fee79a4f&title=&width=1085.3333333333333)
**SQL注入性质：**
**SOL注入是通过操作输入来修改事先定义好的SOL语句，用以达到执行代码对服务器进行政击的方法**
**SQL注入原理：**
**select * from tb_user where username = '李sadaasda' and password = ''(FALSE)or '1' = '1'(TRUE)	**
![uTools_1657359980360.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657359988760-3f5d14a5-fa43-48ee-abc3-08a6f18b74f8.png#clientId=u64c569b4-7c2e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=427&id=u67c075c2&margin=%5Bobject%20Object%5D&name=uTools_1657359980360.png&originHeight=640&originWidth=1024&originalType=binary&ratio=1&rotation=0&showTitle=false&size=328160&status=done&style=none&taskId=u589fc649-18d2-47da-88d0-5447561968b&title=&width=682.6666666666666)
```java
package com.JDBC;

import org.junit.Test;

import java.sql.*;

/*
* 用户登录
* */
public class JDBCDemo7_PreparedStatement {

    @Test
    public void testUserLogin() throws Exception {
        //2.获取连接，如果连接的是本机mysql数据库并且端口是默认的3306可以简化为
        String url = "jdbc:mysql:///db1?serverTimezone=GMT";
        String username = "root";
        String password = "Flyone";
        Connection conn = DriverManager.getConnection(url, username, password);


        //接收用户输入    用户名和密码
        String name = "李四";
        String pwd = "'or '1' = '1'";

        //SQL语句
        String sql = "select * from tb_user where username = ? and password = ?";

        //获取stmt对象
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //设置？的值
        pstmt.setString(1,name);
        pstmt.setString(2,pwd);
        //执行SQL
        ResultSet rs = pstmt.executeQuery();

        if (rs.next()){
            System.out.println("登陆成功");
        }else{
            System.out.println("登陆失败");
        }
        //释放资源
        conn.close();
        pstmt.close();
        rs.close();
    }

}
```
### 原理详解：
[点击查看【bilibili】](https://player.bilibili.com/player.html?bvid=BV1Qf4y1T7Hx&p=37&page=37)
# 4. 数据库连接池 
## 4.1 数据库连接池简介
![uTools_1657366510971.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657366521609-e978fa95-e67e-4f5f-a79d-49cb9d902006.png#clientId=u64c569b4-7c2e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=663&id=u9676b3ad&margin=%5Bobject%20Object%5D&name=uTools_1657366510971.png&originHeight=994&originWidth=2139&originalType=binary&ratio=1&rotation=0&showTitle=false&size=689939&status=done&style=none&taskId=u65d29724-597e-4c83-879a-3f9edabac00&title=&width=1426)
![uTools_1657415649993.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657415658404-82128207-da6e-4ef4-b575-ed2492664859.png#clientId=uf255d8ce-72cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=547&id=u1ef25a6d&margin=%5Bobject%20Object%5D&name=uTools_1657415649993.png&originHeight=820&originWidth=1516&originalType=binary&ratio=1&rotation=0&showTitle=false&size=301143&status=done&style=none&taskId=u1d81c93e-c02c-4504-a9d3-f9a23f20987&title=&width=1010.6666666666666)
## 4.2 Druid 数据库连接池
![uTools_1657418307623.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657418317298-2e69dd2a-8bc0-46cf-9638-0c8a468ff261.png#clientId=uf255d8ce-72cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=269&id=u9f52718f&margin=%5Bobject%20Object%5D&name=uTools_1657418307623.png&originHeight=404&originWidth=638&originalType=binary&ratio=1&rotation=0&showTitle=false&size=95032&status=done&style=none&taskId=ucb6650b9-f3a2-410c-8a76-6775549a6e5&title=&width=425.3333333333333)
```java
package com.Druid;


import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.util.Properties;

/**
 * Druid数据库连接池
 */
public class druidDemo {

    public static void main(String[] args) throws Exception {
        //1.导入jar包

        //2.定义配置文件

        //3.加载配置文件
        Properties prop = new Properties();
        prop.load(new FileInputStream("JDBC/src/druid.properties"));
        //4,获取连接池对象
        DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);
        //5.获取对应数据库连接 Connection
        Connection connection = dataSource.getConnection();

        System.out.println(connection);

//        System.out.println(System.getProperty("user.dir"));
    }
}

```
# 5.JDBC 练习
![uTools_1657418410571.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657418417977-1173610a-5ef2-4e58-ae46-cb6745e58c67.png#clientId=uf255d8ce-72cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=237&id=u4b34ba68&margin=%5Bobject%20Object%5D&name=uTools_1657418410571.png&originHeight=355&originWidth=936&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121579&status=done&style=none&taskId=u14e4a87c-c404-43fa-8785-813b58ebebd&title=&width=624)
## ① 准备环境
![uTools_1657418521499.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657418532295-6d75caf7-6278-43b6-94cc-6a2cb09e978c.png#clientId=uf255d8ce-72cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=229&id=uf43fd0e8&margin=%5Bobject%20Object%5D&name=uTools_1657418521499.png&originHeight=343&originWidth=565&originalType=binary&ratio=1&rotation=0&showTitle=false&size=54337&status=done&style=none&taskId=u7615a51c-6521-47cc-91b6-06f87d1387f&title=&width=376.6666666666667)
## ② 查询所有
![uTools_1657419835642.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657419872744-bafce766-3e30-4a11-9042-62eae526b381.png#clientId=uf255d8ce-72cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=473&id=ubbb210f1&margin=%5Bobject%20Object%5D&name=uTools_1657419835642.png&originHeight=709&originWidth=1010&originalType=binary&ratio=1&rotation=0&showTitle=false&size=260558&status=done&style=none&taskId=uddf74e7f-6e3c-47ef-8028-92ad69ca021&title=&width=673.3333333333334)
```java
/**
     * 查询所有
     * 1.SELECT * FROM tb_brand
     * 2.参数:不需要
     * 3.结果：List<brand>
     */
    @Test
    public void testSelectAll() throws Exception {
        Properties prop = new Properties();
        prop.load(new FileInputStream("src/druid.properties"));
        //4,获取连接池对象
        DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);
        //5.获取对应数据库连接 Connection
        Connection conn = dataSource.getConnection();

        //定义SQL语句
        String sql = "SELECT * FROM tb_brand";

        PreparedStatement pstmt = conn.prepareStatement(sql);

        //4.设置参数(没有则不操作)
        //5.执行SQL
        ResultSet rs = pstmt.executeQuery();
        Brand brand = null;
        List<Brand> brands = new ArrayList<>();
        //6.处理结果
        while(rs.next()){
            //获取数据
            int id = rs.getInt("id");
            String brandName = rs.getString("brand_name");
            String companyName = rs.getString("company_name");
            int ordered = rs.getInt("ordered");
            String description = rs.getString("description");
            int status = rs.getInt("status");
            //封装Brand对象
            brand = new Brand();
            brand.setId(id);
            brand.setBrandName(brandName);
            brand.setCompanyName(companyName);
            brand.setOrdered(ordered);
            brand.setDescription(description);
            brand.setStatus(status);
            //装载集合
            brands.add(brand);
        }
        System.out.println(brands);
        //释放资源
        pstmt.close();
        conn.close();
        rs.close();
    }

```
## ③ 添加数据
![uTools_1657421053126.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657421059853-890dc493-c67c-496e-9a57-0a484a2ea81b.png#clientId=uf255d8ce-72cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=664&id=ue87ac1bc&margin=%5Bobject%20Object%5D&name=uTools_1657421053126.png&originHeight=996&originWidth=1673&originalType=binary&ratio=1&rotation=0&showTitle=false&size=383181&status=done&style=none&taskId=ud7e132f0-85b5-46f4-98a2-edf02cdbfa8&title=&width=1115.3333333333333)
```java
/**
     * 添加数据
     * 1.insert into tb_brand(brand_name, company_name, ordered, description, status) values(?,?,?,?,?);
     * 2.参数:除了id外的所有信息
     * 3.结果：Boolean
     */
    @Test
    public void testAdd() throws Exception {
        //接收页面提交的参数
        String brandName = "香飘飘";
        String companyName = "香飘飘";
        int ordered = 1;
        String description = "绕地球一圈";
        int status = 1;
        //1.导入jar包
        //2.定义配置文件
        //3.加载配置文件
        Properties prop = new Properties();
        prop.load(new FileInputStream("src/druid.properties"));
        //4,获取连接池对象
        DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);
        //5.获取对应数据库连接 Connection
        Connection conn = dataSource.getConnection();

        //定义SQL语句
        String sql = "insert into tb_brand(brand_name, company_name, ordered, description, status) values(?,?,?,?,?)";

        PreparedStatement pstmt = conn.prepareStatement(sql);

        //4.设置参数(没有则不操作)
        pstmt.setString(1,brandName);
        pstmt.setString(2,companyName);
        pstmt.setInt(3,ordered);
        pstmt.setString(4,description);
        pstmt.setInt(5,status);
        //5.执行SQL
        int count = pstmt.executeUpdate();
        //6.处理结果
        System.out.println(count > 0);

        //释放资源
        pstmt.close();
        conn.close();
    }
```
## ④ 修改数据
![uTools_1657421662257.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657421676430-4d3f2c31-a1f9-4a10-970c-81f9903fc8b8.png#clientId=uf255d8ce-72cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=473&id=ucd388ec6&margin=%5Bobject%20Object%5D&name=uTools_1657421662257.png&originHeight=710&originWidth=1289&originalType=binary&ratio=1&rotation=0&showTitle=false&size=245067&status=done&style=none&taskId=u00c87397-2f6e-4355-ac3d-212950a048a&title=&width=859.3333333333334)
```java
/**
     * 修改数据
     * 1.SQL:
      update tb_brand
          set brand_name = ?,
          company_name = ?,
          ordered = ?,
          description = ?,
          status = ?
      where id = ?
     * 2.参数:需要，所有数据
     * 3.结果：Boolean
     */
    @Test
    public void testUpdate() throws Exception {
        //接收页面提交的参数
        String brandName = "香飘飘";
        String companyName = "香飘飘";
        int ordered = 1000;
        String description = "绕地球san圈";
        int status = 1;
        int id = 4;
        //1.导入jar包
        //2.定义配置文件
        //3.加载配置文件
        Properties prop = new Properties();
        prop.load(new FileInputStream("src/druid.properties"));
        //4,获取连接池对象
        DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);
        //5.获取对应数据库连接 Connection
        Connection conn = dataSource.getConnection();

        //定义SQL语句
        String sql = "update tb_brand\n" +
                "          set brand_name = ?,\n" +
                "          company_name = ?,\n" +
                "          ordered = ?,\n" +
                "          description = ?,\n" +
                "          status = ?\n" +
                "      where id = ?";

        PreparedStatement pstmt = conn.prepareStatement(sql);

        //4.设置参数(没有则不操作)
        pstmt.setString(1,brandName);
        pstmt.setString(2,companyName);
        pstmt.setInt(3,ordered);
        pstmt.setString(4,description);
        pstmt.setInt(5,status);
        pstmt.setInt(6,id);
        //5.执行SQL
        int count = pstmt.executeUpdate();
        //6.处理结果
        System.out.println(count > 0);

        //释放资源
        pstmt.close();
        conn.close();
    }
```
## ⑤ 删除数据
![uTools_1657422053075.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657422057824-ff5742dd-291c-4354-bd83-f37aa4d0898d.png#clientId=uf255d8ce-72cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=419&id=u06a7d03a&margin=%5Bobject%20Object%5D&name=uTools_1657422053075.png&originHeight=629&originWidth=1210&originalType=binary&ratio=1&rotation=0&showTitle=false&size=146490&status=done&style=none&taskId=udd16caa6-a21c-442f-b5b8-6de3fa80695&title=&width=806.6666666666666)
