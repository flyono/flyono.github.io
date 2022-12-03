---
title: MySQL-前置（黑马版）
date: 2022年12月3日17:32:34
tags: MySQL-更新中...
categories: Java学习笔记
---

# 1.数据库相关概念

**数据库**
存储数据的仓库，数据是有组织的进行存储
英文:DataBase，简称DB
**数据库管理系统**
管理数据库的大型软件
.英文:DataBase Management System，简称DBMS
**SQL**
英文: Structured Query Language，简称SQL，结构化查询语言
操作关系型数据库的编程语言
定义操作所有**关系型数据库**的统一标准
# 2.MySQL数据模型
**关系型数据库**
关系型数据库是建立在关系模型基础上的数据库,简单说 ,关系型数据库是由多张能互相连接的**二维表**组成的数据库
#### 优点
1. 都是使用表结构，格式一致，易于维护。
2.使用通用的SQL 语言操作，使用方便，可用于复杂查询。
3.数据存储在磁盘中，安全。
# 3. SQL语言
## 3.1 SQL简介

1. 英文:Structured Query Language，简称 SQL
2.  结构化查询语言，一门操作关系型数据库的编程语言
3. 定义操作所有关系型数据库的统一标准
4. 对于同一个需求，每一种数据库操作的方式可能会存在一些不一样的地方，我们称为“方言”
## 3.2 SQL语法

1.  SQL语句可以单行或多行书写，以分号结尾。
2. MySQL数据库的 SQL 语句不区分大小写，关键字建议使用大写。
3. 注释
   1. 单行注释：一 注释内容 或 #注释内容(MySQL 特有)
   2. 多行注释: /* 注释*/
## 3.3 SQL分类
DDL(Data Definition Language)**数据定义语言**，用来定义数据库对象：数据库，表，列等
DML(Data Manipulation Language)**数据操作语言**，用来对数据库中表的数据进行增删改
DQL(Data Query Language) **数据查询语言**，用来查询数据库中表的记录(数据)
DCL(Data Control Language) **数据控制语言**，用来定义数据库的访问权限和安全级别，及创建用户
![uTools_1656833349981.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656833366141-1727e6d2-bb28-46d8-97b2-dfd6453f0118.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=730&id=u307a2f1f&margin=%5Bobject%20Object%5D&name=uTools_1656833349981.png&originHeight=1095&originWidth=1894&originalType=binary&ratio=1&rotation=0&showTitle=false&size=659825&status=done&style=none&taskId=u4217bea3-fd44-47b9-8375-a184c396649&title=&width=1262.6666666666667)
### 3.3.1 DDL 操作数据库，表等
#### 操作数据库：（查询、创建、删除、使用数据库）
![uTools_1656833450338.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656833454199-2b71183b-0daf-40c3-bf90-ca168be3a521.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=362&id=u3053a503&margin=%5Bobject%20Object%5D&name=uTools_1656833450338.png&originHeight=543&originWidth=1284&originalType=binary&ratio=1&rotation=0&showTitle=false&size=202559&status=done&style=none&taskId=u669cb389-7648-4d14-8488-13c1a85372c&title=&width=856)
#### 操作表
##### 创建（Create）：
##### ![uTools_1656834548351.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656834552565-33b405b8-8056-45e4-ab79-577f06d36bc8.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=289&id=JG8QU&margin=%5Bobject%20Object%5D&name=uTools_1656834548351.png&originHeight=434&originWidth=1269&originalType=binary&ratio=1&rotation=0&showTitle=false&size=116551&status=done&style=none&taskId=u1ae18c4e-c7ea-4ab8-b622-7cb78698a2e&title=&width=846)
##### 查询（Retrieve）：
![uTools_1656834439356.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656834443586-fc3aa2f2-0276-4e98-8381-b56457456698.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=191&id=dS8zO&margin=%5Bobject%20Object%5D&name=uTools_1656834439356.png&originHeight=287&originWidth=1297&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42357&status=done&style=none&taskId=u56b18a1b-fcb9-45bc-a70f-fe4c2a99b15&title=&width=864.6666666666666)
##### 修改（Updata）：
![uTools_1656836540786.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656836548632-a4381a1d-4ee1-4483-b4b4-fc46519c6164.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=325&id=I7Mqt&margin=%5Bobject%20Object%5D&name=uTools_1656836540786.png&originHeight=488&originWidth=1251&originalType=binary&ratio=1&rotation=0&showTitle=false&size=189964&status=done&style=none&taskId=u147d2067-596c-4b92-bf74-5bf94923dc1&title=&width=834)

##### 删除（Delete）：
![uTools_1656836385158.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656836392505-f47c536d-ec15-4f2f-b6d7-31c2d4ee01d2.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=203&id=fb2OW&margin=%5Bobject%20Object%5D&name=uTools_1656836385158.png&originHeight=304&originWidth=802&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45598&status=done&style=none&taskId=u72e25045-ca97-4909-a040-ff6c3ab7105&title=&width=534.6666666666666)
### **数据类型：
MySQL支持多种类型，可以分为三类：

1. 数值
2. 日期
3. 字符串

[MySQL数据类型.xlsx](https://www.yuque.com/attachments/yuque/0/2022/xlsx/26328310/1656835259520-125ee850-ea42-4ef6-bba5-debc885c0625.xlsx)
### 3.3.2 DML 对表中数据进行增删改
#### ①：添加数据
![uTools_1656845512295.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656845518399-7532d2d3-5193-49cc-b2fb-9b19abdf0e90.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=359&id=u38400b1a&margin=%5Bobject%20Object%5D&name=uTools_1656845512295.png&originHeight=538&originWidth=1257&originalType=binary&ratio=1&rotation=0&showTitle=false&size=176190&status=done&style=none&taskId=u11eb606c-acb0-4c0b-b77c-beb09347f8d&title=&width=838)
#### ②：修改数据
![uTools_1656846208112.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656846211105-8fccd7b9-22a9-4692-96a7-fc3c3142f65d.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=211&id=u4ad9ed6e&margin=%5Bobject%20Object%5D&name=uTools_1656846208112.png&originHeight=316&originWidth=1234&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90188&status=done&style=none&taskId=ufd1725bc-3522-4117-a38c-76bb3f015c9&title=&width=822.6666666666666)
**注意：如果update语句没有加where条件，则会将表中所有数据全部修改！**
#### ③：删除数据
![uTools_1656846492140.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656846496749-7fa74a92-1114-44f2-98a6-765c4560a1b3.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=212&id=u8f711d7c&margin=%5Bobject%20Object%5D&name=uTools_1656846492140.png&originHeight=318&originWidth=1261&originalType=binary&ratio=1&rotation=0&showTitle=false&size=76443&status=done&style=none&taskId=u62d92cf0-343d-4d47-8975-9561031ea05&title=&width=840.6666666666666)
**注意：如果DELETE语句没有加where条件，则会将表中所有数据全部删除！**
### 3.3.3 DQL 对表中数据进行查询
![uTools_1656857913228.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656857917472-7b73e56f-2bf8-42ae-a490-fc322c1882a6.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=442&id=uec33f15e&margin=%5Bobject%20Object%5D&name=uTools_1656857913228.png&originHeight=663&originWidth=508&originalType=binary&ratio=1&rotation=0&showTitle=false&size=98580&status=done&style=none&taskId=ubbc88444-5f46-4916-925c-73f7dc0d3a9&title=&width=338.6666666666667)
#### 3.3.3.1 基础查询
![uTools_1656858042538.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656858046697-95166d93-f23b-49b7-8852-3e53592ef4e4.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=379&id=u4fa5b663&margin=%5Bobject%20Object%5D&name=uTools_1656858042538.png&originHeight=569&originWidth=1003&originalType=binary&ratio=1&rotation=0&showTitle=false&size=109829&status=done&style=none&taskId=u1ab5a746-b797-4e15-ac10-20b9815fb3f&title=&width=668.6666666666666)
```sql
-- 删除stu表
DROP TABLE
IF
	EXISTS stu;-- 创建stu表
CREATE TABLE stu (
	id INT,-- 编号
	NAME VARCHAR ( 20 ),-- 姓名
	age INT,-- 年龄
	sex VARCHAR ( 5 ),-- 性别
	address VARCHAR ( 100 ),-- 地址
	math DOUBLE ( 5, 2 ),-- 数学成绩
	english DOUBLE ( 5, 2 ),-- 英语成绩
	hire_date date -- 入学时间
	
);-- 查看表结构
SELECT
	* 
FROM
	stu;-- 添加数据
INSERT INTO stu ( id, NAME, age, sex, address, math, english, hire_date )
VALUES
	( 1, "马运", 55, '男', "杭州", 66, 78, "1995-09-01" ),
	( 2, "马花疼", 45, '女', '深圳', 98, 87, "1998-09-01" ),
	( 3, '马斯克', 55, '男', '香港', 56, 77, "1999-09-02" ),
	( 4, '柳白', 20, '女', "湖南", 76, 65, "1997-09-05" ),
	( 5, '柳青', 20, '男', "湖南", 86, NULL, "1998-09-01" ),
	( 6, '刘德花', 57, '男', "香港", 99, 99, "1998-09-01" ),
	( 7, "张学右", 22, '女', "香港", 99, 99, "1998-09-01" ),
	( 8, "德玛西亚", 18, '男', '南京', 56, 65, "1994-09-02" );
SELECT
	* 
FROM
	stu;-- 基础查询
-- 查询name age两列
SELECT
	name,
	age 
FROM
	stu;-- 查询所有列的数据
SELECT
	* 
FROM
	stu
	
-- 查询地址
SELECT address FROM stu;
-- 去除重复记录
SELECT DISTINCT address FROM stu; 


-- 查询姓名、数学、英语成绩
SELECT NAME,math  数学成绩,english as 英语成绩 FROM stu;
```
#### 3.3.3.2 条件查询
![uTools_1656859622517.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656859629458-336e0034-7046-4ef9-afa7-027594f20995.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=688&id=u7c1c2b97&margin=%5Bobject%20Object%5D&name=uTools_1656859622517.png&originHeight=1032&originWidth=1473&originalType=binary&ratio=1&rotation=0&showTitle=false&size=303183&status=done&style=none&taskId=u0bb4a365-b5f6-4ecb-8898-2828ab490ae&title=&width=982)
```sql
-- 删除stu表
DROP TABLE
IF
	EXISTS stu;-- 创建stu表
CREATE TABLE stu (
	id INT,-- 编号
	NAME VARCHAR ( 20 ),-- 姓名
	age INT,-- 年龄
	sex VARCHAR ( 5 ),-- 性别
	address VARCHAR ( 100 ),-- 地址
	math DOUBLE ( 5, 2 ),-- 数学成绩
	english DOUBLE ( 5, 2 ),-- 英语成绩
	hire_date date -- 入学时间
	
);-- 查看表结构
SELECT
	* 
FROM
	stu;-- 添加数据
INSERT INTO stu ( id, NAME, age, sex, address, math, english, hire_date )
VALUES
	( 1, "马运", 55, '男', "杭州", 66, 78, "1995-09-01" ),
	( 2, "马花疼", 45, '女', '深圳', 98, 87, "1998-09-01" ),
	( 3, '马斯克', 55, '男', '香港', 56, 77, "1999-09-02" ),
	( 4, '柳白', 20, '女', "湖南", 76, 65, "1997-09-05" ),
	( 5, '柳青', 20, '男', "湖南", 86, NULL, "1998-09-01" ),
	( 6, '刘德花', 57, '男', "香港", 99, 99, "1998-09-01" ),
	( 7, "张学右", 22, '女', "香港", 99, 99, "1998-09-01" ),
	( 8, "德玛西亚", 18, '男', '南京', 56, 65, "1994-09-02" );
-- 条件查询

-- 1.查询年龄大于20岁的学员信息
SELECT * FROM stu WHERE age>20;
-- 2.查询年龄大于等于20岁的学员信息
SELECT * FROM stu WHERE age>=20;
-- 3.查询年龄大于等于20岁 并且 年龄 小于等于30岁 的学员信息
SELECT * FROM stu WHERE age>=20 AND age<=30;
SELECT * FROM stu WHERE age BETWEEN 20 AND 30;
-- 4.查询入学日期在'1998-09-01’到 '1999-09-01’之间的学员信息
SELECT * FROM stu WHERE hire_date BETWEEN '1998-09-01' AND '1999-09-01';
-- 5．查询年龄等于18岁的学员信息
SELECT * FROM stu WHERE age=18;
-- 6．查询年龄不等于18岁的学员信息
SELECT * FROM stu WHERE age!=18;
SELECT * FROM stu WHERE age<>18;
-- 7. 查询年龄等于18岁 或者 年龄等于20岁 或者 年龄等于22岁的学员信息
SELECT * FROM stu WHERE age=18 OR age = 20 OR age = 22;
SELECT * FROM stu WHERE age in (18,20,22);
-- 8．查询英语成绩为 null的学员信息
SELECT * FROM stu WHERE ISNULL(english);
SELECT * FROM stu WHERE english IS NULL;

-- 模糊查询 LIKE
/*
通配符：
（1）_ ：代表单个任意字符
（2）% ：代表任意个数字符
*/
-- 1．查询姓'马的学员信息
SELECT * FROM stu WHERE NAME LIKE '马%';
-- 2．查询第二个字是·花’的学员信息
SELECT * FROM stu WHERE `name` LIKE "_花%";
-- 3．查询名字中包含 ‘德’的学员信息
SELECT * FROM stu WHERE `name` LIKE "%德%";
```
#### 3.3.3.3 排序查询
![uTools_1656860758640.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656860762206-b56c26bb-fce4-41f0-ad06-e25a9a06634e.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=292&id=u262b5c05&margin=%5Bobject%20Object%5D&name=uTools_1656860758640.png&originHeight=438&originWidth=1342&originalType=binary&ratio=1&rotation=0&showTitle=false&size=149999&status=done&style=none&taskId=u6f75ac66-e286-4231-996d-d3e14391e90&title=&width=894.6666666666666)
```sql
-- 删除stu表
DROP TABLE
IF
	EXISTS stu;-- 创建stu表
CREATE TABLE stu (
	id INT,-- 编号
	NAME VARCHAR ( 20 ),-- 姓名
	age INT,-- 年龄
	sex VARCHAR ( 5 ),-- 性别
	address VARCHAR ( 100 ),-- 地址
	math DOUBLE ( 5, 2 ),-- 数学成绩
	english DOUBLE ( 5, 2 ),-- 英语成绩
	hire_date date -- 入学时间
	
);-- 查看表结构
SELECT
	* 
FROM
	stu;-- 添加数据
INSERT INTO stu ( id, NAME, age, sex, address, math, english, hire_date )
VALUES
	( 1, "马运", 55, '男', "杭州", 66, 78, "1995-09-01" ),
	( 2, "马花疼", 45, '女', '深圳', 98, 87, "1998-09-01" ),
	( 3, '马斯克', 55, '男', '香港', 56, 77, "1999-09-02" ),
	( 4, '柳白', 20, '女', "湖南", 76, 65, "1997-09-05" ),
	( 5, '柳青', 20, '男', "湖南", 86, NULL, "1998-09-01" ),
	( 6, '刘德花', 57, '男', "香港", 99, 99, "1998-09-01" ),
	( 7, "张学右", 22, '女', "香港", 99, 99, "1998-09-01" ),
	( 8, "德玛西亚", 18, '男', '南京', 56, 65, "1994-09-02" );


/*
	排序查询：
		*语法：SELECT字段列表FROM表名ORDER BY 排序字段名1【排序方式1】,排序字段名2[排序方式2]…… 
		*排序方式：
			* ASC：升序排列（默认值）
			* DESC：降序排列
7
*/
-- 1.查询学生信息，按照年龄升序排列
SELECT * FROM stu ORDER BY age ASC;
SELECT * FROM stu ORDER BY age;
-- 2.查询学生信息，按照数学成绩降序排列
SELECT * FROM stu ORDER BY math DESC;
-- 3.查询学生信息，按照数学成绩降序排列 ，如果数字成绩一样，再按照英语成绩升序排列
SELECT * FROM stu ORDER BY math DESC,english ASC;
```
#### 3.3.3.4 聚合查询
![uTools_1656861200598.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656861203481-0ce17687-47eb-437e-8c37-203cb3c59b1e.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=459&id=u8b818001&margin=%5Bobject%20Object%5D&name=uTools_1656861200598.png&originHeight=688&originWidth=1289&originalType=binary&ratio=1&rotation=0&showTitle=false&size=297806&status=done&style=none&taskId=ucb765ba0-8187-47b7-9312-c3150665007&title=&width=859.3333333333334)
```sql
-- 删除stu表
DROP TABLE
IF
	EXISTS stu;-- 创建stu表
CREATE TABLE stu (
	id INT,-- 编号
	NAME VARCHAR ( 20 ),-- 姓名
	age INT,-- 年龄
	sex VARCHAR ( 5 ),-- 性别
	address VARCHAR ( 100 ),-- 地址
	math DOUBLE ( 5, 2 ),-- 数学成绩
	english DOUBLE ( 5, 2 ),-- 英语成绩
	hire_date date -- 入学时间
	
);-- 查看表结构
SELECT
	* 
FROM
	stu;-- 添加数据
INSERT INTO stu ( id, NAME, age, sex, address, math, english, hire_date )
VALUES
	( 1, "马运", 55, '男', "杭州", 66, 78, "1995-09-01" ),
	( 2, "马花疼", 45, '女', '深圳', 98, 87, "1998-09-01" ),
	( 3, '马斯克', 55, '男', '香港', 56, 77, "1999-09-02" ),
	( 4, '柳白', 20, '女', "湖南", 76, 65, "1997-09-05" ),
	( 5, '柳青', 20, '男', "湖南", 86, NULL, "1998-09-01" ),
	( 6, '刘德花', 57, '男', "香港", 99, 99, "1998-09-01" ),
	( 7, "张学右", 22, '女', "香港", 99, 99, "1998-09-01" ),
	( 8, "德玛西亚", 18, '男', '南京', 56, 65, "1994-09-02" );
/*
	聚合函数
		count:统计数量
		* 取值：
				1．主键
				2. *
		* max：求最大值
		* min：求最小值
		* sum：求和
		* avg: 求平均值
*/
-- 1.	统计班级一共有多少个学生
SELECT MAX(id) FROM stu;
SELECT COUNT(id) FROM stu;
SELECT COUNT(*) FROM stu; -- count 统计的列名不能为null
-- 2．查询数学成绩的最高分
SELECT MAX(math) FROM stu;
-- 3．查询数学成绩的最低分
SELECT MIN(MAth) FROM stu;
-- 4. 查询数学成绩的总分
SELECT SUM(math) FROM stu;
-- 5．查询数学成绩的平均分
SELECT AVG(math) FROM stu;
-- 6．查询英语成绩的最低分
SELECT MIN(english) FROM stu; -- null值不参与聚合函数运算
```
#### 3.3.3.5 分组查询
![uTools_1656861783648.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656861787370-94e5e34c-d67f-4f64-bc96-46c64da2a943.png#clientId=u7f319467-05b4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=344&id=u6f51eb2c&margin=%5Bobject%20Object%5D&name=uTools_1656861783648.png&originHeight=516&originWidth=1322&originalType=binary&ratio=1&rotation=0&showTitle=false&size=210594&status=done&style=none&taskId=u7f2072a2-1522-49de-82ed-84f32302573&title=&width=881.3333333333334)
```sql
-- 删除stu表
DROP TABLE
IF
	EXISTS stu;-- 创建stu表
CREATE TABLE stu (
	id INT,-- 编号
	NAME VARCHAR ( 20 ),-- 姓名
	age INT,-- 年龄
	sex VARCHAR ( 5 ),-- 性别
	address VARCHAR ( 100 ),-- 地址
	math DOUBLE ( 5, 2 ),-- 数学成绩
	english DOUBLE ( 5, 2 ),-- 英语成绩
	hire_date date -- 入学时间
	
);-- 查看表结构
SELECT
	* 
FROM
	stu;-- 添加数据
INSERT INTO stu ( id, NAME, age, sex, address, math, english, hire_date )
VALUES
	( 1, "马运", 55, '男', "杭州", 66, 78, "1995-09-01" ),
	( 2, "马花疼", 45, '女', '深圳', 98, 87, "1998-09-01" ),
	( 3, '马斯克', 55, '男', '香港', 56, 77, "1999-09-02" ),
	( 4, '柳白', 20, '女', "湖南", 76, 65, "1997-09-05" ),
	( 5, '柳青', 20, '男', "湖南", 86, NULL, "1998-09-01" ),
	( 6, '刘德花', 57, '男', "香港", 99, 99, "1998-09-01" ),
	( 7, "张学右", 22, '女', "香港", 99, 99, "1998-09-01" ),
	( 8, "德玛西亚", 18, '男', '南京', 56, 65, "1994-09-02" );


/*	分组函数
				SELECT 字段列表 FROM 表名 [WHERE 分组前条件限定] GROUP BY 分组字段名 [HAVING分组后条件过滤]..
*/
select * from stu ;
-- 1．查询男同学和女同学各自的数学平均分
SELECT sex,AVG(math) FROM stu GROUP BY sex;
-- 注意：分组之后，查询的字段为聚合函数和分组字段，查询其他字段无任何意义
-- 2.查询男同学和女同学各自的数学平均分，以及各自人数

SELECT sex 性别,AVG(math) 数学平均分,COUNT(*) 人数 FROM stu GROUP BY sex;

-- 3.查询男同学和女同学各自的数学平均分，以及各自人数求：分数低于70分的不参与分组

SELECT sex 性别,AVG(math) 数学平均分,COUNT(*) 人数 FROM stu WHERE math>70 GROUP BY sex;

-- 4.查询男同学和女同学各自的数学平均分，以及各自人数求：分数低于70分的不参与分组,分组之后人数大于2

SELECT sex 性别,AVG(math) 数学平均分,COUNT(*) 人数 FROM stu WHERE math>70 GROUP BY sex HAVING 人数>2;
```
#### 3.3.3.6 分页查询
![uTools_1656907203263.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656907208588-122953ca-1b54-4b64-83d9-083bb10a634f.png#clientId=u9fd229bb-54b6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=521&id=u88ea5cfd&margin=%5Bobject%20Object%5D&name=uTools_1656907203263.png&originHeight=781&originWidth=1977&originalType=binary&ratio=1&rotation=0&showTitle=false&size=277358&status=done&style=none&taskId=uf5dcefcc-4a57-4ae9-925b-7cc504e85c5&title=&width=1318)
```sql
-- 删除stu表
DROP TABLE
IF
	EXISTS stu;-- 创建stu表
CREATE TABLE stu (
	id INT,-- 编号
	NAME VARCHAR ( 20 ),-- 姓名
	age INT,-- 年龄
	sex VARCHAR ( 5 ),-- 性别
	address VARCHAR ( 100 ),-- 地址
	math DOUBLE ( 5, 2 ),-- 数学成绩
	english DOUBLE ( 5, 2 ),-- 英语成绩
	hire_date date -- 入学时间
	
);-- 查看表结构
SELECT
	* 
FROM
	stu;-- 添加数据
INSERT INTO stu ( id, NAME, age, sex, address, math, english, hire_date )
VALUES
	( 1, "马运", 55, '男', "杭州", 66, 78, "1995-09-01" ),
	( 2, "马花疼", 45, '女', '深圳', 98, 87, "1998-09-01" ),
	( 3, '马斯克', 55, '男', '香港', 56, 77, "1999-09-02" ),
	( 4, '柳白', 20, '女', "湖南", 76, 65, "1997-09-05" ),
	( 5, '柳青', 20, '男', "湖南", 86, NULL, "1998-09-01" ),
	( 6, '刘德花', 57, '男', "香港", 99, 99, "1998-09-01" ),
	( 7, "张学右", 22, '女', "香港", 99, 99, "1998-09-01" ),
	( 8, "德玛西亚", 18, '男', '南京', 56, 65, "1994-09-02" );


/*
		分页查询：
		SELECT 字段列表 FROM 表名 LIMIT 起始索引，查询条目数
			* 起始索引：从0开始
*/
select * from stu ;
-- 1．从0开始查询，查询3条数据
SELECT * FROM stu LIMIT 0,3;
-- 2．每页显示3条数据，查询第1页数据
SELECT * FROM stu LIMIT 0,3;
-- 3．每页显示3条数据，查询第2页数据
SELECT * FROM stu LIMIT 3,3;
-- 4.每页显示3条数据，查询第3页数据
SELECT * FROM stu LIMIT 6,3;

-- 起始索引的计算
-- 起始索引 = （当前页码-1）*每页显示条数

```
#### 3.3.3.7 DQL小结
![uTools_1656907718542.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656907721356-a64cbd0d-d445-4533-a151-1c7af8ed9031.png#clientId=u9fd229bb-54b6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=415&id=uc978f57a&margin=%5Bobject%20Object%5D&name=uTools_1656907718542.png&originHeight=622&originWidth=419&originalType=binary&ratio=1&rotation=0&showTitle=false&size=88325&status=done&style=none&taskId=ub5495d58-e83d-454d-aea4-8719b0282fa&title=&width=279.3333333333333)

### 3.3.4 DCL 对数据库静心权限控制
# 4. 数据库
## 4.1 约束
### 概念&分类
![uTools_1656908350888.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656908359095-3a7ab3b8-afe9-4dba-a6f5-35695dd99311.png#clientId=u9fd229bb-54b6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=662&id=ude58857f&margin=%5Bobject%20Object%5D&name=uTools_1656908350888.png&originHeight=993&originWidth=2013&originalType=binary&ratio=1&rotation=0&showTitle=false&size=902919&status=done&style=none&taskId=ud5517640-fc61-43dc-bac7-a80827eb3e3&title=&width=1342)
#### 一：非空约束	NOT NULL
#### 二：唯一约束	UNIQUE
#### 三：主键约束	PRIMARY KEY
#### 四：默认约束	CHECK
#### 五：检查约束	DEFAULT	（MySQL不支持）
#### *六：外键约束	FOREIGN KEY
![uTools_1656910952271.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656910958282-f3de0105-847d-40be-8cf7-d105dcc874c9.png#clientId=u9fd229bb-54b6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=292&id=u0c629537&margin=%5Bobject%20Object%5D&name=uTools_1656910952271.png&originHeight=438&originWidth=1006&originalType=binary&ratio=1&rotation=0&showTitle=false&size=107709&status=done&style=none&taskId=ue620de1e-e10a-422a-ad6e-cab461cfac8&title=&width=670.6666666666666)
![uTools_1656911547069.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656911553320-678e2b87-3335-4177-922d-1149b69187af.png#clientId=u9fd229bb-54b6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=437&id=u23682c7e&margin=%5Bobject%20Object%5D&name=uTools_1656911547069.png&originHeight=655&originWidth=1274&originalType=binary&ratio=1&rotation=0&showTitle=false&size=281202&status=done&style=none&taskId=u4710c719-37ac-4ad4-b9e4-cbf18ff4242&title=&width=849.3333333333334)
## 4.2 数据库设计
### 4.2.1 数据库设计简介
![uTools_1656914345823.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656914351224-036a72d2-f6af-419d-8646-54d1ce2e8c1d.png#clientId=u56b8dcd5-6122-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=441&id=ulZP2&margin=%5Bobject%20Object%5D&name=uTools_1656914345823.png&originHeight=662&originWidth=1196&originalType=binary&ratio=1&rotation=0&showTitle=false&size=392047&status=done&style=none&taskId=u048cf452-b628-4492-a8cf-7e4d3e6e61c&title=&width=797.3333333333334)

1. **数据库设计设计什么？**

有哪些表
表里有哪些字段
表和表之间是什么关系

2. **表关系有哪几种?**

一对一
一对多（多对一）
多对多
### 4.2.2 表关系之一对多（多对一）

1. 部门 和 员工
2. 一个部门对应多个员工，一个员工对应一个部门
> #### *六：外键约束	FOREIGN KEY 案例

### 4.2.3 表关系之多对多

1. 商品和订单
2. 一个商品对应多个订单，一个订单包含多个商品

**实现方式：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键**

### 4.2.4 表关系之一对一

1. 用户 和 用户详情
2. 一对一关系多用于表拆分，将一个实体中经常使用的字段放一张表，不经常使用的字段放另一张表，用于提升查询性能

**实现方式：在任意一方加入外键，关联另一方主键，并且设置外键为唯一(UNIQUE)**
### 4.2.4 数据库设计案例
[点击查看【bilibili】](https://player.bilibili.com/player.html?bvid=BV1Qf4y1T7Hx&p=24&page=24)
## 4.3 多表查询
```sql
-- 部门表
CREATE TABLE dept(
	id int PRIMARY KEY AUTO_INCREMENT,
	dep_name VARCHAR(20),
	addr VARCHAR(20)
);

-- 员工表
CREATE TABLE emp(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(20),
	age INT, 
	dep_id INT,
	
	-- 添加外键 dep_id	关联 dept 表的id主键
	CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES dept(id)
	
);

-- 添加 2 个部门
INSERT INTO dept(dep_name,addr) VALUES
('研发部','广州'),('销售部','深圳');

-- 添加员工
INSERT INTO emp(`name`,age,dep_id) VALUES
('张三',20,1),
('李四',20,1),
('王五',20,1),
('赵六',20,2),
('孙七',22,2),
('周八',18,2);
-- --------------------

-- 多表查询
SELECT * FROM emp,dept；

-- 会产生笛卡尔积：有A、B两个集合，取A、B所有的组合情况

-- 我们需要消除无效数据

-- 查询 emp 和 dept 的数据，emp.dep_id = dept.id;！！！内连接
SELECT * FROM emp,dept WHERE emp.dep_id=dept.id;

```
### 4.3.1 连接查询
#### ①内连接
**相当于查询A、B的交集数据**
##### 查询语法：
![uTools_1656916063607.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656916066747-c7c54b13-071f-491b-800d-657c160c87cf.png#clientId=u56b8dcd5-6122-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=348&id=ud7c67692&margin=%5Bobject%20Object%5D&name=uTools_1656916063607.png&originHeight=522&originWidth=1229&originalType=binary&ratio=1&rotation=0&showTitle=false&size=163912&status=done&style=none&taskId=u3b83bfcc-8db6-4547-aa56-0d36db71a29&title=&width=819.3333333333334)
```sql
-- 部门表
CREATE TABLE dept ( 
  id INT PRIMARY KEY AUTO_INCREMENT, 
  dep_name VARCHAR ( 20 ), 
  addr VARCHAR ( 20 ) 
);
-- 员工表
CREATE TABLE emp (
	id INT PRIMARY KEY auto_increment,
	NAME VARCHAR ( 20 ),
	age INT,
	dep_id INT,
-- 添加外键 dep_id	关联 dept 表的id主键
	CONSTRAINT fk_emp_dept FOREIGN KEY ( dep_id ) REFERENCES dept ( id ) 
);
-- 添加 2 个部门
INSERT INTO dept ( dep_name, addr )
VALUES
	( '研发部', '广州' ),(
		'销售部',
		'深圳' 
	);-- 添加员工
INSERT INTO emp ( `name`, age, dep_id )
VALUES
	( '张三', 20, 1 ),
	( '李四', 20, 1 ),
	( '王五', 20, 1 ),
	( '赵六', 20, 2 ),
	( '孙七', 22, 2 ),
	( '周八', 18, 2 );
-- --------------------
-- 多表查询
SELECT
	* 
FROM
	emp,
	dept；
-- 会产生笛卡尔积：有A、B两个集合，取A、B所有的组合情况
-- 我们需要消除无效数据
-- 查询 emp 和 dept 的数据，emp.dep_id = dept.id;
-- 隐式内连接
SELECT
	* 
FROM
	emp,
	dept 
WHERE
	emp.dep_id = dept.id;
-- 查询 emp的 name，gender，dept表的dep_name
SELECT
	emp.`name`,
	emp.age,
	dept.dep_name 
FROM
	emp,
	dept 
WHERE
	emp.dep_id = dept.id;
-- 给表起别名
SELECT
	t1.`name`,
	t1.age,
	t2.dep_name 
FROM
	emp t1,
	dept t2 
WHERE
	t1.dep_id = t2.id;
	
-- 显示内连接

SELECT * FROM emp INNER JOIN dept ON emp.dep_id = dept.id;
SELECT * FROM emp JOIN dept ON emp.dep_id = dept.id; 

```
#### ②外连接
![uTools_1656916507406.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656916516140-c2d28fea-f94b-4220-9548-436b6b2a64e5.png#clientId=u56b8dcd5-6122-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=394&id=uca1310e2&margin=%5Bobject%20Object%5D&name=uTools_1656916507406.png&originHeight=591&originWidth=1265&originalType=binary&ratio=1&rotation=0&showTitle=false&size=188630&status=done&style=none&taskId=ua6b7466b-21ac-4770-8448-41f0319b1b0&title=&width=843.3333333333334)

1. **左外连接：相当于查询A表所有数据和交集部分数据**
2. **右外连接：相当于查询B表所有数据和交集部分数据**
```sql
-- 部门表
CREATE TABLE dept ( id INT PRIMARY KEY AUTO_INCREMENT, dep_name VARCHAR ( 20 ), addr VARCHAR ( 20 ) );-- 员工表
CREATE TABLE emp (
	id INT PRIMARY KEY auto_increment,
	NAME VARCHAR ( 20 ),
	age INT,
	dep_id INT,-- 添加外键 dep_id	关联 dept 表的id主键
	CONSTRAINT fk_emp_dept FOREIGN KEY ( dep_id ) REFERENCES dept ( id ) 
);-- 添加 2 个部门
INSERT INTO dept ( dep_name, addr )
VALUES
	( '研发部', '广州' ),(
		'销售部',
		'深圳' 
	);-- 添加员工
INSERT INTO emp ( `name`, age, dep_id )
VALUES
	( '张三', 20, 1 ),
	( '李四', 20, 1 ),
	( '王五', 20, 1 ),
	( '赵六', 20, 2 ),
	( '孙七', 22, 2 ),
	( '周八', 18, NULL);-- --------------------
-- 多表查询
-- 左外连接
-- 查询emp表所有数据和对应的部门信息

SELECT * FROM emp LEFT JOIN dept ON emp.dep_id=dept.id;

-- 右外连接
-- 查询dept表所有数据和对应的员工信息

SELECT * FROM emp RIGHT JOIN dept ON emp.dep_id=dept.id;

```
### 4.3.2 子查询
![uTools_1656917452616.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656917457928-b237cef1-04ce-4c39-baa7-c6ce0a88b16e.png#clientId=u56b8dcd5-6122-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=246&id=u0e87c6e0&margin=%5Bobject%20Object%5D&name=uTools_1656917452616.png&originHeight=369&originWidth=850&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51886&status=done&style=none&taskId=u26ac1cdd-3580-48d7-a940-c6974ad9116&title=&width=566.6666666666666)
 ![uTools_1656917563570.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656917566325-a4bab645-8a0f-4fd8-9100-ab4429d47114.png#clientId=u56b8dcd5-6122-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=323&id=u012d933d&margin=%5Bobject%20Object%5D&name=uTools_1656917563570.png&originHeight=484&originWidth=1451&originalType=binary&ratio=1&rotation=0&showTitle=false&size=275306&status=done&style=none&taskId=uf524eb4f-92bf-484d-ace1-668e1938898&title=&width=967.3333333333334)
![uTools_1656917607316.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656917612012-4dc02896-4cbf-46fb-bf62-ea0bfac055f0.png#clientId=u56b8dcd5-6122-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=277&id=u8efe3243&margin=%5Bobject%20Object%5D&name=uTools_1656917607316.png&originHeight=416&originWidth=1204&originalType=binary&ratio=1&rotation=0&showTitle=false&size=164632&status=done&style=none&taskId=u9c32dd21-aa81-489e-abbc-7f3bc921de2&title=&width=802.6666666666666)

### 4.3.3 多表查询案例
```sql
DROP TABLE
IF
	EXISTS emp;
DROP TABLE
IF
	EXISTS dept;
DROP TABLE
IF
	EXISTS job;
DROP TABLE
IF
	EXISTS salarygrade;-- 部门表
CREATE TABLE dept ( id INT PRIMARY KEY, -- 部门id
	dname VARCHAR ( 50 ), -- 部门名称
	loc VARCHAR ( 50 ) -- 部门所在地
);-- 职位表，职务名称，职位描述
CREATE TABLE job ( id INT PRIMARY KEY, jname VARCHAR ( 20 ), description VARCHAR ( 50 ) );-- 员工表
CREATE TABLE emp (
	id INT PRIMARY KEY,
	ename VARCHAR ( 50 ),
	job_id INT,-- 职务id
	mgr INT,-- 上级领导
	joindate DATE,
	salary DECIMAL ( 7, 2 ),
	bounds DECIMAL ( 7, 2 ),
	dept_id INT,-- 所在部门编号
	CONSTRAINT emp_jobid_ref_job_id_fk FOREIGN KEY ( job_id ) REFERENCES job ( id ),
	CONSTRAINT emp_deptid_ref_dept_id_fk FOREIGN KEY ( dept_id ) REFERENCES dept ( id ) 
);-- 工资等级表
CREATE TABLE salarygrade ( grade INT PRIMARY KEY, -- 级别
	losalary INT, -- 最低工资
	hisalary INT -- 最高工资
);-- 添加4个部门
INSERT INTO dept ( id, dname, loc )
VALUES
	( 10, '教研部', '北京' ),
	( 20, '学工部', '上海' ),
	( 30, '销售部', '广州' ),
	( 40, '财务部', '深圳' );-- 添加四个职务
INSERT INTO job ( id, jname, description )
VALUES
	( 1, '董事长', '管理整个公司、接单' ),
	( 2, '经理', '管理部门员工' ),
	( 3, '销售员', '向客人推销产品' ),
	( 4, '文员', '使用办公软件' );-- 添加员工
INSERT INTO emp ( id, ename, job_id, mgr, joindate, salary, bounds, dept_id )
VALUES
	( 1001, '孙悟空', 4, 1004, '2000-12-17', '8000.00', NULL, 20 ),
	( 1002, '卢俊义', 3, 1006, '2001-02-20', '16000.00', '3000', 30 ),
	( 1003, '林冲', 3, 1006, '2001-02-22', '12500.00', '5000', 30 ),
	( 1004, '唐僧', 2, 1009, '2001-04-02', '29750.00', NULL, 20 ),
	( 1005, '李逵', 4, 1006, '2001-09-28', '12500.00', '14000', 30 ),
	( 1006, '宋江', 2, 1009, '2001-05-01', '28500.00', NULL, 30 ),
	( 1007, '刘备', 2, 1009, '2001-09-01', '24500.00', NULL, 10 ),
	( 1008, '猪八戒', 4, 1004, '2007-04-19', '30000.00', NULL, 20 ),
	( 1009, '罗贯中', 1, NULL, '2001-11-17', '50000.00', NULL, 30 ),
	( 1010, '吴用', 3, 1006, '2001-09-08', '15000.00', '0.00', 20 ),
	( 1011, '沙僧', 4, 1004, '2007-05-23', '11000.00', NULL, 20 ),
	( 1012, '李逵', 4, 1006, '2001-12-03', '9500.00', NULL, 30 ),
	( 1013, '小白龙', 4, 1004, '2001-12-03', '30000.00', NULL, 20 ),
	( 1014, '关羽', 4, 1007, '2002-01-23', '13000.00', NULL, 10 );-- 添加5 个工资等级
INSERT INTO salarygrade ( grade, losalary, hisalary )
VALUES
	( 1, 7000, 12000 ),
	( 2, 12010, 14000 ),
	( 3, 14010, 20000 ),
	( 4, 20010, 30000 ),
	( 5, 30010, 99990 );-- 1.查询所有员工信息。查询员工编号，员工姓名，汇资，职务名称。职务描述
/*分析：
	1.员工编号，员工姓名，工资 信息在emp 员工表中
	2．职务名称，职务描述 信息在 job 职务表中
	3.job 职务表 和 emp 员工表 足一对多的关系 emp.job_id = job.id
*/-- 隐式内连接
SELECT
	emp.id,
	emp.ename,
	emp.salary,
	job.jname,
	job.description 
FROM
	emp,
	job 
WHERE
	emp.job_id = job.id 
ORDER BY
	id;-- 显式内连接
SELECT
	emp.id,
	emp.ename,
	emp.salary,
	job.jname,
	job.description 
FROM
	emp
	INNER JOIN job ON emp.job_id = job.id 
ORDER BY
	id;-- 2.查询员工编号，员工姓名，工资，职务名称，职务描述，部门名称，部门位置
/*分析：
	1.员工编号，员工姓名，工资 信息在emp 员工表中
	2．职务名称，职务描述 信息在 job 职务表中
	3.job 职务表 和 emp 员工表 满足一对多的关系 emp.job_id = job.id
	4.部门名称，部门位置来自于 部门表 dept
	5.dept 和 emp 一对多关系   dept.id = emp.dept.id;
	
*/-- 隐式内连接
SELECT
	emp.id,
	emp.ename,
	emp.salary,
	job.jname,
	job.description,
	dept.dname,
	dept.loc 
FROM
	emp,
	job,
	dept 
WHERE
	emp.job_id = job.id 
	AND dept.id = emp.dept_id 
ORDER BY
	id;-- 显式内连接
SELECT
	emp.id,
	emp.ename,
	emp.salary,
	job.jname,
	job.description,
	dept.dname,
	dept.loc 
FROM
	emp
	INNER JOIN job ON emp.job_id = job.id
	INNER JOIN dept ON dept.id = emp.dept_id 
ORDER BY
	id;-- 3.查询员工姓名，工资，工资等级
/*分析：
	1.员工编号，员工姓名，工资 信息在emp 员工表中
	2.工资等级，信息在 salarygrade 表中
	3.emp.salary >= salarygrade.losalary AND emp.salary <= salarygrade.hisalary
	
*/-- 隐式内连接
SELECT
	emp.ename,
	emp.salary,
	t2.grade 
FROM
	emp,
	salarygrade t2 
WHERE
	emp.salary BETWEEN t2.losalary 
	AND t2.hisalary;-- 显式内连接
SELECT
	emp.ename,
	emp.salary,
	t2.grade 
FROM
	emp
	INNER JOIN salarygrade t2 ON emp.salary BETWEEN t2.losalary 
	AND t2.hisalary;-- 4.查询员工姓名，工资，职务名称，职务描述，部门名称，部门位置，工资等级
-- 隐式内连接
SELECT
	emp.ename,
	emp.salary,
	job.jname,
	job.description,
	dept.dname,
	dept.loc,
	t3.grade 
FROM
	emp,
	job,
	dept,
	salarygrade t3 
WHERE
	emp.job_id = job.id 
	AND emp.dept_id = dept.id 
	AND emp.salary BETWEEN t3.losalary 
	AND t3.hisalary;-- 显式内连接
SELECT
	emp.ename,
	emp.salary,
	job.jname,
	job.description,
	dept.dname,
	dept.loc,
	t3.grade 
FROM
	emp
	INNER JOIN job ON emp.job_id = job.id
	INNER JOIN dept ON emp.dept_id = dept.id
	INNER JOIN salarygrade t3 ON emp.salary BETWEEN t3.losalary 
	AND t3.hisalary;-- 5.查询出部门编号、部门名称、部门位置、部门人数
-- 隐式内连接
SELECT
	* 
FROM
	dept;
SELECT
	dept_id,
	COUNT(*) 
FROM
	emp 
GROUP BY
	dept_id;-- SELECT * FROM dept,(SELECT dept_id,COUNT(*) FROM 	emp GROUP BY dept_id) t1 WHERE dept.id=t1.dept_id;
SELECT
	dept.id,
	dept.dname,
	dept.loc,
	t1.count 
FROM
	dept,(
	SELECT
		dept_id,
		COUNT(*) count 
	FROM
		emp 
	GROUP BY
		dept_id 
	) t1 
WHERE
	dept.id = t1.dept_id;-- 显式内连接
SELECT
	dept.id,
	dept.dname,
	dept.loc,
	COUNT( dept.id ) 
FROM
	emp,
	dept 
WHERE
	emp.dept_id = dept.id;
```
## 4.4 事物
### 4.4.1 事物简介

1. 数据库的事务（Transaction）是一种机制、一个操作序列，包含了**一组数据库操作命令**
2. 事务把所有的命令作为一个整体一起向系统提交或撤销操作请求，即这一组数据库命令**要么同**

**时成功，要么同时失败**

3. 事务是一个不可分割的工作逻辑单元

![uTools_1657014093972.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1657014104221-6950261e-96cc-4c8a-81a9-38037fab272b.png#clientId=u2699cccb-8996-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=193&id=ufefc43b6&margin=%5Bobject%20Object%5D&name=uTools_1657014093972.png&originHeight=289&originWidth=353&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58496&status=done&style=none&taskId=uacd6f3bf-6752-4409-9bd6-eff0b5b3bab&title=&width=235.33333333333334)
### 4.4.2 事物操作	
```sql
DROP TABLE IF EXISTS account;

-- 创建账户表
CREATE TABLE account(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(10),
	money double(10,2)
); 
UPDATE account SET money = 1000;

-- 添加数据
INSERT INTO account(name,money) VALUES
('张三',1000),('李四',1000);

SELECT * FROM account; 

-- 转账操作

-- 开启事务
BEGIN;
-- 1.查询李四的余额

-- 2.李四金额 -500
UPDATE account set money = money-500 WHERE name = '李四';
-- 出错了....
-- 3.张三金额 +500
UPDATE account set money = money+500 WHERE name = '张三';

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;


```
### 4.4.3 事物四大特征

1. 原子性（**A**tomicity）:	事务是不可分割的最小操作单位，要么同时成功，要么同时失败
2. 一致性（**C**onsistency) :	事务完成时，必须使所有的数据都保持一致状态
3. 隔离性（**I**solation）:		多个事务之间，操作的可见性 
4.  持久性（**D**urability）:	事务一旦提交或回滚，它对数据库中的数据的改变就是永久的
#### MySQL事务默认自动提交
**-- 查看事务的默认提交方式**
SELECT @@autocommit;
**-- 1 自动提交 0 手动提交**
**--修改事务提交方式**
set @@autocommit = 0;
