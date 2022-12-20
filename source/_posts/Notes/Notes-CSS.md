---
title: CSS(尚硅谷版)
date: 2022年12月3日17:35:37
tags: Web
categories: 前端笔记
---



# 1. CSS技术介绍

**css 是「层叠样式表单」。是用于(增强)控制网页样式并允许将样式信息与网页内容分离的一种标记性语言。**
# 2. CSS语法规则
![uTools_1656656243339.png](https://cdn.nlark.com/yuque/0/2022/png/26328310/1656656262620-360f0da4-a917-4551-9941-e9d93b27e8e9.png#clientId=u09a39950-1a89-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=297&id=ud4704268&margin=%5Bobject%20Object%5D&name=uTools_1656656243339.png&originHeight=445&originWidth=1376&originalType=binary&ratio=1&rotation=0&showTitle=false&size=158251&status=done&style=none&taskId=u73a6846f-18f1-47b6-aa47-f612ba2751a&title=&width=917.3333333333334)
**选择器**：浏览器根据“选择器”决定受CSS样式影响的 HTML 元素（标签）。
**属性(property)：**是你要改变的样式名，并且每个属性都有一个值。属性和值被冒号分开，并
由花括号包围，这样就组成了一个完整的样式声明（declaration），例如：p {color: blue}
**多个声明**：如果要定义不止一个声明，则需要用分号将每个声明分开。虽然最后一条声明的
最后可以不加分号(但尽量在每条声明的末尾都加上分号)
# 3. CSS和HTML的结合方式
## 3.1 在标签的style属性上设置"key:value value;”，修改标签样式。
<div style="border: 1px solid red">div标签1</div>
<div style="border: 1px solid red">div标签2</div>
<span style="border: 1px solid red">span标签1</span>
<span style="border: 1px solid red">span标签2</span>
## 3.2 在 head 标签中,使用 style 标签来定义各种自己需要的 css样式。
### 格式：
**xxx{**
**Key : value value;**
**}**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CSS</title>
    <!--style标签专门用来定义css样式代码-->
    <style type="text/css">
        /*第二种：在 head 标签中,使用 style 标签来定义各种自己需要的 css样式。*/
        div{
            border: 1px solid red;
        }
    </style>
</head>
<body>
<!--第一种：在标签的style属性上设置"key:value value;”，修改标签样式-->
<!--    <div style="border: 1px solid red">div标签1</div>-->
<!--    <div style="border: 1px solid red">div标签2</div>-->
<!--    <span style="border: 1px solid red">span标签1</span>-->
<!--    <span style="border: 1px solid red">span标签2</span>-->
<!--第二种：在 head 标签中,使用 style 标签来定义各种自己需要的 css样式。-->
    <div>div标签1</div>
    <div>div标签2</div>
    <span>span标签1</span>
    <span>span标签2</span>
</body>
</html>
```
## 3.3 把css样式写戒一个单独的 css文件,再通过link标签引入即可复用。
### 步骤：
**使用html的 <link rel="stylesheet" type="text/css" href="./styles.css”/> 标签 导入 css 样**
**式文件。**
**具体操作看IDEA文件**
# 4. CSS选择器
## 4.1 标签名选择器
### 格式
标签名{
属性   ： 值；
}
标签名选择器
## 4.2 id选择器
### 格式
#id 属性值{
属性 ：值;
}
**id 选择器，可以让我们通过 id 属性选择性的去使用这个样式。**
## 4.3 class 选择器（类选择器）
### 格式
.class属性值{
属性 ： 值;
}
**class类型选择器，可以通过 class 属性有效的选择性地去使用这个样式。**
## 4.4 组合选择器
### 格式
选择器1，选择器2，选择器n{
属性 ： 值;
}
**组合选择器可以让多个选择器共用同一个代码。**
## 4.5 常用样式
### 1、字体颜色
color : 颜色；
### 2、宽度
width：？？px;
### 3、高度
height ：？？px;
### 4、背景颜色
background-color：#0000000；
### 5、字体样式
color：#000000
font-size：？？px；
### 6、红色1像素实线边框
### 7、DIV居中
margin-left：auto；
margin-right；auto；
### 8、文本居中
text-align：center；、
### 9、超链接去下划线
text-decoration：none；
### 10、表格细线
table{
border: 1px solid black;	/*设置边框*/
border-collapse: collpse; /*将边框合并*/
}
td,th{
border: 1px solid black;	/*设置边框*/
}
### 11、列表去除修饰
ul{
list-style:none;
}
