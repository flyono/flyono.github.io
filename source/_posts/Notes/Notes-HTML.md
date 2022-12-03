---
title: HTML(尚硅谷版)
date: 2022年12月3日17:34:22
tags: HTML-更新中...
categories: 前端笔记
---



# 1、B/S 软件的结构

![uTools_1656567823567.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656567829822-074d76f1-c2a0-410a-b8c2-317044111ccc.png#clientId=u873be0a5-5e09-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=560&id=ued7db392&margin=%5Bobject%20Object%5D&name=uTools_1656567823567.png&originHeight=840&originWidth=1383&originalType=binary&ratio=1&rotation=0&showTitle=false&size=489782&status=done&style=none&taskId=u13d5a829-b862-4b5e-bcd9-eda86429373&title=&width=922)
JavaSE	
C/S结构    Client-Server
B/S结构    Browser-Server
# 2、前端开发的流程
![uTools_1656568007683.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656568013370-5c8d4607-8520-46ff-98b6-7a44aac4fa0c.png#clientId=u873be0a5-5e09-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=573&id=ub90f06d5&margin=%5Bobject%20Object%5D&name=uTools_1656568007683.png&originHeight=859&originWidth=1376&originalType=binary&ratio=1&rotation=0&showTitle=false&size=553386&status=done&style=none&taskId=ud1ca47df-6b84-4ac0-ad73-0c973a8776d&title=&width=917.3333333333334)
# 3、网页的组成部分
### 页面由三部分内容组成！
分别是**内容（结构）、表现、行为。**
#### 内容（结构）
是我们在页面中可以看到的数据。我们称之为内容。一般内容 我们使用html 技术来展示。
#### 表现
指的是这些内容在页面上的展示形式。比如说。布局，颜色，大小等等。一般使用CSS 技术实现
#### 行为
指的是页面中元素与输入设备交互的响应。一般由JavaScript 技术实现
# 4、HTML 简介
#### Hyper Text Markup Language（超文本标记语言）简写：HTML
HTML通过标签来标记要显示的网页中的各个部分。网页文件本身是一种文本文件，
通过在文本文件中添加标记符，可以告诉浏览器如何显示其中的内容（如：文字如何处理，
画面如何安排，图片如何显示等）
# 5、创建HTML 文件
## 1.创建一个web工程（静态的web工程）
## 2.在工程下创建html页面
# 6、HTML 文件的书写规范
## 工程文件——JavaWeb里面查看
# 7、HTML 标签介绍
1.标签的格式：
<标签名>封装的数据</标签名>
2.标签名大小写不敏感。
3.标签拥有自己的属性。
i. 基本属性：bgcolor="red"
ii.事件属性：onclick="alert(' 你好! ');"
4.标签又分为，单标签和双标签。
i．单标签格式：<标签名 />
ii. 双标签格式：  <标签名> ...封装的数据...</标签名>
# 8、常用标签介绍
## 8.1 fron字体（过时）
## 8.2 特殊字符
<    ——————>>>>> 	&lt;
>	 	 ——————>>>>>	&gt;
>	
>	 空格  ——————>>>>>     &nbsp;
## 8.3 标题标签
**<h1(2,3,4,5,6)>文本</h1(2,3,4,5,6)>**
**align	对齐属性**
**left	左对齐**
**center 居中对齐**
**right 右对齐**
## **8.4 超链接
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>标题</title>
</head>
<body>
    <h1><a href="http:\\www.baidu.com" target="_self">百度</a><!--自身跳转--><br/></h1>
    <h2><a href="http:\\www.baidu.com" target="_blank">百度</a><!--新开窗口跳转--></h2>
</body>
</html>
## 8.5 列表标签
### 无序列表：
<ul>
    <li>赵四</li>
    <li>刘能</li>
    <li>小沈阳</li>
    <li>宋小宝</li>
</ul>
### 有序列表:
<ol>
    <li>赵四</li>
    <li>刘能</li>
    <li>小沈阳</li>
    <li>宋小宝</li>
</ol>
### 定义列表(不常用)
## 8.6 Img 标签
**img标签是图片标签,用来显示图片**
**src属性可以设置图片的路径**
**width属性设置图片的宽度**
**height属性设置图片的高度**
**border属性设置图片边框大小**
**alt属性设置当指定路径找不到图片时,用来代替显示的文本内容**
#### 在JavaSE中路径也分为相对路径和绝对路径.

1. 相对路径:从工程名开始算
2. 绝对路径:盘符:/目录/文件名
#### 在web中路径分为相对路径和绝对路径两种

1. 相对路径:

.		表示当前文件所在的目录
..		表示当前文件所在的上一级目录
文件名	表示当前文件所在目录的文件，相当于 ./文件名	./可以省略

2. 绝对路径：

http://ip:port/工程名/资源路径 
## **8.7 表格标签
**table 标签是表格标签**
**border 设置表格标签**
**width 设置表格宽度**
**height 设置表格高度**
**cellspacing 设置单元格间距** 
**tr	是行标签**
**th 	是表头标签**
**td 	是单元格标签**
**align 设置单元格文本对齐方式**
**b	加粗标签**
## 8.8 跨行跨列表格
**colspan 属性设置跨列**
**rowspan 属性设置跨行**
## 8.9 了解iframe 框架标签
<!--iframe标签
    iframe和a标签组合使用的步骤：
        1 在iframe标签中使用name属性定义一个名称
        2 在a标签的target属性上设置iframe的name的属性值-->

<iframe src="1636557904444.jpg" width="1500" height="800" **name="abc"**></iframe>
<br/>

<ul>
    <li><a href="Hello.html" **target="abc**">Hello.html</a></li>
</ul>
## **8.10 表单标签
form标签是表单标签
**        action属性设置提交的服务器地址**
**        method属性设置提交的方式GET（默认）或POST**
表单提交的时候，**数据没有发送给服务器**的三种情况：
          **  1、表单项没有name属性值**
**            2、单选、复选（下拉列表中的option标签）都需要添加value属性，以便发送给服务器**
**            3、表单项不在提交的form标签中**
** GET请求的特点是：**
            1、浏览器地址栏中的地址是：action属性[+?+请求参数]
                  请求参数的格式是：name=value&name=value
            2、不安全
            3、它有数据长度的限制
** POST请求的特点是：**
            1、浏览器地址栏中只有action属性值
            2、相对于GET请求要安全
            3、理论上没有数据长度的限制
```html
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8">
    <title>表单</title>
</head>
<body>
<!--需求1:创建一个个人信息的表单乔面。包含用户名，密码，码。性别（单选），发好（多选），国耤(下
拉列表）。隐藏域，自我评价（多行文本域）。重置，提交。-->
<!--form标签就是表单
    input type="text"       文本输入框   value设置默认显示内容
    input type="password"   密码输入框   value设置默认显示内容 maxlength 限制长度
    input type="radio"      单选框       name对内容进行分组   checked="checked" 默认选中
    input type="checkbox"   复选框       checked="checked" 默认选中
    input type="reset"      重置        value修改按钮上的文本
    input type="submit"     提交        value修改按钮上的文本
    input type="button"     按钮        value修改按钮上的文本
    input type="file"       文件上传
    input type="hidden"     隐藏域     当我们要发送某些信息，而这些信息，不需要用户参与，就可以使用隐藏域（提交的时候同时发送给服务器）
    select 标签是下拉列表框
    option 标签是下拉拉列表框中的选项   selected="selected"  默认选中
    textarea    表示多行文本输入域
            rows表示显示几行的高度
            cols表示每行可以显示几个字符宽度  -->
<form>
    <h1 align="center">用户注册</h1>
    <table align="center">
        <tr>
            <td>用户名称：</td>
            <td><input type="text" value="默认"><br/></td>
        </tr>
        <tr>
            <td>用户密码：</td>
            <td><input type="password" maxlength="6"><br/></td>
        </tr>
        <tr>
            <td>确认密码：</td>
            <td><input type="password" maxlength="6"><br/></td>
        </tr>
        <tr>
            <td>性别：</td>
            <td><input type="radio" name="sex" checked="checked">男<input type="radio" name="sex">女<br/></td>
        </tr>
        <tr>
            <td>确认密码：</td>
            <td><input type="password" maxlength="6"><br/></td>
        </tr>
        <tr>
            <td>兴趣爱好：</td>
            <td><input type="checkbox">Java<input type="checkbox">JavaScript<input type="checkbox">C++<br/></td>
        </tr>
        <tr>
            <td>国籍：</td>
            <td><select>
                <option>---请选择国籍---</option>
                <option selected="selected">中国</option>
                <option>美国</option>
                <option>小日本</option>
            </select> <br/></td>
        </tr>
        <tr>
            <td>自我评价：</td>
            <td><textarea rows="10" cols="20">默认值</textarea><br/></td>
        </tr>
        <tr>
            <td><input type="reset" value="重置"></td>
            <td align="center"><input type="submit" value="提交"></td>
        </tr>
    </table>
<!--    <td><input type="button" value="abc"></td>
    <input type="file">
    <input type="hidden" name="abc" value="abcValue">-->
</form>
</body>
</html>
```
```html
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8">
    <title>表单</title>
</head>
<body>
<!--
    form标签是表单标签
        action属性设置提交的服务器地址
        method属性设置提交的方式GET（默认）或POST

        表单提交的时候，数据没有发送给服务器的三种情况：
            1、表单项没有name属性值
            2、单选、复选（下拉列表中的option标签）都需要添加value属性，以便发送给服务器
            3、表单项不在提交的form标签中
        GET请求的特点是：
            1、浏览器地址栏中的地址是：action属性[+?+请求参数]
               请求参数的格式是：name=value&name=value
            2、不安全
            3、它有数据长度的限制
        POST请求的特点是：
            1、浏览器地址栏中只有action属性值
            2、相对于GET请求要安全
            3、理论上没有数据长度的限制
            -->
<form action="http://www.baidu" method="get">
    <input type="hidden" name="action" value="login">
    <h1 align="center">用户注册</h1>
    <table align="center">
        <tr>
            <td>用户名称：</td>
            <td><input type="text" name="username" value="默认"><br/></td>
        </tr>
        <tr>
            <td>用户密码：</td>
            <td><input type="password" name="userPassword" maxlength="6"><br/></td>
        </tr>
        <tr>
            <td>确认密码：</td>
            <td><input type="password" name="againPassword" maxlength="6"><br/></td>
        </tr>
        <tr>
            <td>性别：</td>
            <td><input type="radio" name="sex" checked="checked">男<input type="radio" name="sex">女<br/></td>
        </tr>
        <tr>
            <td>兴趣爱好：</td>
            <td><input name="hobby" type="checkbox">Java
                <input name="hobby" type="checkbox">JavaScript
                <input name="hobby" type="checkbox">C++<br/></td>
        </tr>
        <tr>
            <td>国籍：</td>
            <td><select name="country">
                <option>---请选择国籍---</option>
                <option selected="selected">中国</option>
                <option>美国</option>
                <option>小日本</option>
            </select> <br/></td>
        </tr>
        <tr>
            <td>自我评价：</td>
            <td><textarea name="desc" rows="10" cols="20">默认值</textarea><br/></td>
        </tr>
        <tr>
            <td><input type="reset" value="重置"></td>
            <td align="center"><input type="submit" value="提交"></td>
        </tr>
    </table>
<!--    <td><input type="button" value="abc"></td>
    <input type="file">
    <input type="hidden" name="abc" value="abcValue">-->
</form>
</body>
</html>
```
## 8.11 其他标签
### div、span、p标签的演示
**div标签  默认独占一行
span标签 他的长度是封装数据的长度
p段落标签 默认会在段落的上方或下方空出一行来(如果已有就不再空)**
