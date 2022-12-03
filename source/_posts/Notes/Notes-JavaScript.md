---
title: JavaScript(尚硅谷版)
date: 2022年12月3日17:36:32
tags: JavaScript-更新中...
categories: 前端笔记
---



# 1. JavaScript介绍

Javascrio单号完成页面的类作合证。大LE卡运行存客户要中监架来解析执行Javascriot
JS是Netscape网景公司的产品，最早取名为 Livescript;为了吸引更多 java 程序员。更名为 Javascript。
**Js是弱类型，Java是强类型。**
**弱类型：类型可变**
**强类型：定义类型的时候，类型已经确定，而且不可变**
特点：

1. 交互性（它可以做的就是信息的动态交互）
2. 安全性（不允许直接访问本地硬盘）
3.  跨平台性（只要是可以解释 JS 的浏览器都可以执行，和平台无关）
# 2. JavaScript 和 HTML 代码的结合方式
## 1. 只需要在 head 标签中，或者在 body 标签中，使用script 标签来书写 JavaScript 代码
## 2. 使用 script 标签引入入 单独的JavaScript代码文件
**src 属性专门用来引入js文件路径（可以是相对路径，也可以是绝对路径）**
**script标签可以用来定义js代码，也可以用来引入js文件但是，两个功能二选一使用。不能同时使用**
# 3. 变量
## JavaScript 的变量类型：
数值类型：		number
字符串类型：	string
对象类型：		object
布尔类型：		boolean
函数类型：		function	
## JavaScript 里特殊的值：
undefined		未定义，所有js变量未赋于初始值的时候，默认值都是 undefined
null				空值
NAN			全称是：Not a Number。非数字/非数值
## JS中的定义变量格式：
var				变量名;
var				变量名 = 值;
# 4.关系（比较）运算
等于：		==
不等于：	===		除了做字面值的比较外，还会比较两个变量的数据类型
# 5. 逻辑运算
且运算：		&&
或运算：		||
取反运算：		！
**在 Javascript 语言中，所有的变量，都可以做为一个boolean类型的变量去使用。**
**0，null，underdefined，“”（空串，一个空格都没有）默认为假
&&且运算。**
有两种情况：
第一种：当表达式全为真的时候。返回最后一个表达式的值。
第二种：当表达式中，有一个为假的时候。返回第一个为假的表达式的值
**| |， 或运算**
第一种情况：当表达式全为假时，返回最后一个表达式的值
第二种情况：只要有一个表达式为真。就会把回第一个为真的表达式的值
**并且  && 与运算 和 ||或运算 有短路。**
短路就是说，当这个&&或||运算有结果了之后 。后面的表达式不再执行
# **6.数组
## 数组定义方式
js 中 数组的定义：
**格式：**
**var 数组名 = []；	//空数组**
**var 数组名 = [数据]；//定义数组赋值**
# 7. 函数
## 7.1可以使用 function 关键字来定义函数。
**格式:**
**function 函数名（形参列表）{**
**函数体; **
**}**
在Javascript 语言中，如何定义带有返回值的函数？
只需要在函数体内直接使用return语句返回值即
## 7.2 第二种
**格式：**
**var 函数名 = function（形参列表）{函数体};**
**在 Java中函数允许重载。但是在 ]s 中还数的重载会直接覆盖掉上一次的定义**
## 7.3 函数的 arguments 隐形参数（只在	funtion 函数内）
就是在 function 函数中不需要定义，但却可以直接用来获取所有参数的变量。我们管它叫隐形参数。
隐形参数类似Java的可变长参数。操作类似数组
# 8. JS中的自定义对象
## Object形式的自定义对象
var 变量名 = new Object();	//对象实例（空对象）
变量名.属性名 = 值；			//定义一个属性
变量名.函数名 = function(){}	//定义一个函**数**
**对象的访问：**
**变量名.属性/函数名();**
## {}花括号形式的自定义对象
var 变量名 = {}； 	//空对象
var 变量名 = {
属性名 : 值,
属性名 : 值,
函数名 ：function(){}
}； 
**对象的访问：**
**变量名.属性/函数名();**
# 9. JS中的事件
**什么是事件?事件是电脑输入设备与页面进行交互的响应。我们称之为事件。**
## 常用的事件：
**onload 加载完成事件：					页面加载完成后，常用于作页面的js代码的初始化操作**
**onclick单击事件：						常用于按钮的点击响应操作**
**onblur失去焦点事件：					常用于输入框离开（失去）焦点后验证其输入内容是否合法**
**onchange 内容发生改变事件：			常用于下拉框和输入框内容改变后操作**
**onsubmit 表单提交事件：				常用于表单提交前，验证所有表单项是否合法**
## 事件的注册又分为静态注册和动态注册两种：
**事件的注册（绑定）？**
**其实就是告诉浏览器，当事件响应后要执行那些代码，叫事件注册或事件绑定**
### 静态注册事件：
**通过html的标签属性直接赋予事件响应后的代码，这种方式我们叫做静态注册**
### 动态注册事件：
**先通过js代码得到的标签的DOM对象然后再通过dom.对象.事件名 = function(){} 	这种形式赋予事件响应后的代码，叫动态注册**
**基本步骤：**

1. **获取标签对象	**
2. **标签对象.事件名 = function(){}**
### onload 加载完成事件
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
      /*onload事件方法静态注册*/
      function onloadFun(){
        alert('静态注册onload事件,所有代码');
      }
      /*onload事件动态注册，固定写法*/
      window.onload = function (){
        alert('动态注册onload事件,所有代码');
      }
    </script>
  </head>
  <!--静态注册onload事件-->
  <!--<body onload="onloadFun()">-->
  
  </body>
</html>
```
### onclick单击事件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        <!--静态注册onClick-->
        function onClickFun(){
            alert("静态注册onclick事件");
        }
        /*动态注册onclick事件*/
        window.onclick = function (){
            //1.获取标签对象
            /*
            * document 是JavaScript语言提供的一个对象（文档）<br/>
            *
            * */
            var btnObj = document.getElementById("btn01");
            // alert(btnObj)
            //2.标签对象.事件名 = function(){}
            btnObj.onclick = function (){
                alert("动态注册的onclick事件");
            }
        }
    </script>
</head>
<body>
<!--静态注册onClick-->
    <button onclick="onClickFun()">按钮1</button>
    <button id="btn01">按钮2</button>
</body>
</html>
```
### onblur失去焦点事件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        //静态注册onblur事件
        function onblurFun(){
            // alert("静态注册onblur")
            //console控制台对象是由Javascript语言提供，专门用来向浏览器的控制器打印输出，用于测试使用
            console.log("静态注册onblur事件");
        }
        //动态注册失去焦点事件
        window.onload = function (){
            //1.获取标签对象
            var passwordObj = document.getElementById("password");
            //2.标签对象.事件名 = function(){}
            passwordObj.onblur = function (){
                console.log("动态注册失去焦点事件");
            }

        }
    </script>
</head>
<body>
    用户名：<input type="text" onblur="onblurFun()"><br/>
    密码：<input id="password" type="password"><br/>

</body>
</html>
```
### onchange 内容发生改变事件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        function onchangeFun(){
            alert("女神选项已改变");
        }
        window.onload = function (){
            var selectObj = document.getElementById("select01");
            // alert(selectObj);
            selectObj.onchange = function (){
                alert("男神选项已改变");
            }
        }
    </script>
</head>
<body>
    请选择你心目中的女神：
    <!--静态注册onchange事件-->
    <select onchange="onchangeFun()">
        <option>---女神---</option>
        <option>鞠婧祎</option>
        <option>柳岩</option>
        <option>林青霞</option>
    </select>
    请选择你心目中的女神：
    <!--动态注册onchange事件-->
    <select id="select01">
        <option>---男神---</option>
        <option>罗乙菲</option>
        <option>罗伊飞</option>
        <option>雷锋</option>
    </select>
</body>
</html>
```
### onsubmit 表单提交事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        //静态注册表单提交事务
        function onsubmitFun() {
            //要验证所有表单是否合法，如果，有一个不合法就阻止表单提交
            alert("静态注册表单提交事务");
            return false;
        }
        window.onload = function (){
            var elementById = document.getElementById("01");
            elementById.onsubmit = function (a,b){
                var sum;
                a=5,b=5;
                sum = a+b;
                if(sum == 10){
                    alert("静态注册表单提交事务------合法");
                }else{
                    alert("静态注册表单提交事务------不合法");
                    return false;
                }
            }
        }
    </script>
</head>
<body>
    <form action="https://baidu.com" method="get" onsubmit="return onsubmitFun()">
        <input type="submit" value="静态注册">
    </form>
    <form action="https://baidu.com" method="get" id="01">
        <input type="submit" value="动态注册">
    </form>
</body>
</html>
```
# 10. DOM模型
## 10.1 概念介绍
**DOM 全称是 Document Object Model文档对象模型**
大白话，就是**把文档中的标签，属性，文本，转换成为对象来管理。**
那么 它们是如何实现把标签，属性，文本转换成为对象来管理呢。这就是学习的重点。 
**Document 对象的理解：**
**第一点：Document它管理了所有的 HTML文档内容。**
**第二点：document 它是一种树结构的文档。有层级关系。**
**第三点：它让我们把所有的标签 都 对象化**
**第四点：我们可以通过document 访问所有的标签对象。**
### **模拟对象化，相当于
**class Dom{**
**private String id;**
**//id属性**
**private String tagName; //表示标签名**
**private Dom parentNode;/1父亲**
**private List<Dom> children；// 孩子结点**
**private String innerHTML://起始标签和结束标签中间的内容**
**}**
## **10.2 Document 对象中的方法介绍
**document.getElementById(elementId)**
通过标签的 id 属性查找标签 dom 对象，elementId 是标签的 id 属性值
### document .getElementsByName(elementName)
通过标签的 name 属性查找标签dom 对象，elementName标签的 name 属性值
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        function checkAll(){
            //让所有都选中
            var hobbies = document.getElementsByName("hobby");
            // alert(hobbies[0].checked);
            for(var i = 0;i < hobbies.length;i++){
                hobbies[i].checked = true;
            }
        }
        function checkNo(){
            var hobbies = document.getElementsByName("hobby");
            for(var i = 0; i < hobbies.length;i++){
                hobbies[i].checked = false;
            }
        }
        function checkReverse(){
            var hobbies = document.getElementsByName("hobby");
            for(var i = 0; i < hobbies.length;i++){
                hobbies[i].checked = !hobbies[i].checked;
        }
    </script>
</head>
<body>
    兴趣爱好：
    <input type="checkbox" name="hobby" value="cpp" checked="checked">C++
    <input type="checkbox" name="hobby" value="java">Java
    <input type="checkbox" name="hobby" value="js">JavaScript
    <br>
    <button onclick="checkAll()">全选</button>
    <button onclick="checkNo()">全不选</button>
    <button onclick="checkReverse()">反选</button>
</body>
</html>
```
### document.getElementsByTagName(tagname)
通过标签名查找标签dom对象。tagname是标签名
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        function checkAll(){
            // document.getElementsByTagName("input”）:是按照指定标签名来进行查询并返回集合
            // 这个集合的操作跟数组 一样
            //集合中都是dom对象
            //集合中元素顺序是他们在html页面中从上到下的顺序。
            var inputs = document.getElementsByTagName("input");
            // alert(inputs);
            for(var i = 0; i<inputs.length;i++){
                inputs[i].checked = true;
            }
        }
    </script>
</head>
<body>
    兴趣爱好：
    <input type="checkbox" value="cpp" checked="checked">C++
    <input type="checkbox" value="java">Java
    <input type="checkbox" value="js">JavaScript
    <br>
    <button onclick="checkAll()">全选</button>
</body>
</html>
```
### document.createElement( tagName)
方法，通过给定的标签名，创建一个标签对象。tagName是要创建的标签名
### **正则表达式
// var patt = /^\w{5,12}$/;
//要求字符串中必须在包含字母e
//表示要求字符串中，是否包含字母e
// var patt = new RegExp("e");
// var patt = /e/：// 也是正则表达式对象
//表示要求字符串中，是否包含字母a或b或c
// var patt = /[abc]/;
// 表示要求字符串，是否包含小写字母
// var patt = /[a-z]/;
//表示要求字符串，是否包含任意大写字母
// var patt = /[A-Z]/;
//表示要求字符串，是否包含任意数字
// var patt = /[0-9]/;
// var patt = /\w/;
//表示要求字符串，是否包含字母，数字，下划线 
**部分代码格式**
**具体查看文档**
### 两张常见的验证提示效果
第一种：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        /*当用户点击了校验的按钮要获取输入框里的内容验证是否合法
        * 验证的规则：必须有字母、下划线、数字组成，并且长度为5-12位
        * */
        function onclickFun(){
            //1 当我们要操作标签的时候，必须获取标签的对象
            var usernameObj = document.getElementById("usernameID");
            
            //[object HTMLInputElement] ---> dom对象
            // alert(usernameObj.value)
            var Text = usernameObj.value;
            //如何验证：使用正则表达式
            var patt = /^\w{5,12}$/;
            /*
            * test()用于测试某个字符串是否匹配我的规则
            * 匹配返回true，不匹配返回false
            * */
            var usernameSpanObj = document.getElementById("sign");
            usernameSpanObj.innerHTML = "用户名合法"
            if(patt.test(Text)){
                usernameSpanObj.innerHTML = "用户名合法!"
            }else{
                usernameSpanObj.innerHTML = "用户名不合法!"
            }
        }
    </script>
</head>
<body>
    用户名：<input type="text" id="usernameID">
    <span style="color: red" id="sign"></span>
    <button onclick="onclickFun()">校验</button>
</body>
</html>
```
第二种：、
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        /*当用户点击了校验的按钮要获取输入框里的内容验证是否合法
        * 验证的规则：必须有字母、下划线、数字组成，并且长度为5-12位
        * */
        function onclickFun(){
            //1 当我们要操作标签的时候，必须获取标签的对象
            var usernameObj = document.getElementById("usernameID");
            
            //[object HTMLInputElement] ---> dom对象
            // alert(usernameObj.value)
            var Text = usernameObj.value;
            //如何验证：使用正则表达式
            var patt = /^\w{5,12}$/;
            /*
            * test()用于测试某个字符串是否匹配我的规则
            * 匹配返回true，不匹配返回false
            * */
            var usernameSpanObj = document.getElementById("sign");
            usernameSpanObj.innerHTML = "用户名合法"
            if(patt.test(Text)){
                usernameSpanObj.innerHTML = "<img src=\"选择.png\" height=\"15\" width=\"20\">"
            }else{
                usernameSpanObj.innerHTML = "<img src=\"错误.png\" height=\"15\" width=\"20\">"
            }
        }
    </script>
</head>
<body>
    用户名：<input type="text" id="usernameID">
    <span style="color: red" id="sign">
    </span>
    <button onclick="onclickFun()">校验</button>
</body>
</html>
```
## 10.3 注意事项
**优先顺序:**
**document的三个查询方法：优先使用getElementById方法，其次使用getElementsByName方法，最后按getElementsByTagName方法**
**以上三个方法，一定要在页面加载完成之后执行，才能查询标签对象

**
## 10.4 节点的常用属性和方法
**节点就是标签对象**
### 方法：

1. 通过具体的元素节点调用getElementsByTagName()方法，获取当前节点的指定标签名孩子节点Ⅰ
2. appendChild( oChildNode )方法，可以添加一个子节点，oChildNode是要添加的孩子节点
### 属性：

1. childNodes属性		获取当前节点的所有子节点
2. firstChild属性		获取当前节点的第一个子节点
3. lastChild属性		获取当前节点的最后一个子节点
4. parentNode属性		获取当前节点的父节点
5. nextSibling属性		获取当前节点的下一个节点
6. previousSibling属性	获取当前节点的上一个节点
7. className 			用于获取或设置标签的 class 属性值
8. innerHTML属性		表示获取/设置起始标签和结束标签中的内容
9. innerText属性		表示获取/设置起始标签和结束标签中的文本



