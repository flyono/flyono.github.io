---
title: 在Python中使用JS
date: 2024-2-24 17:00:00
updated: 2024-2-24 17:00:00
categories: "逆向"
tags: "JS逆向","教程"
---

# 环境安装

-  安装node.js开发环境
-  js改写工具

---

# PyExecJS介绍

- `PyExecJS`是一个可以使用Python来模拟运行JavaScript的库。
  - 使用该模块可以通过python程序调用执行 JS 代码，获取 JS 代码返回的结果！

- 使用步骤：

  - 导包

    - import execjs

  - 创建node对象

    - ```node = execjs.get()
      node = execjs.get()
      ```

  - 编译js文件返回上下文ctx对象

    - ```python
      fp = open(filePath,encoding='utf-8')
      ```

    - ```python
      ctx =  node.compile(fp.read())```
      ```

  - 用上下文对象ctx调用eval函数执行js文件中的指定函数即可

    - ```python
      result = ctx.eval('getPwd("123456")')
      ```

```py	
import execjs

node = execjs.get()

fp = open('test.js', 'r', encoding='utf-8')
ctx = node.compile(fp.read())

result = ctx.eval('getPwd("123456")')

print(result)
```

---

# 微信公众平台案例

- url：https://mp.weixin.qq.com

- 分析思路:

  - 先抓包发现密码是加密的，且密码的位数为32位，大概率是MD5加密
  - 发现加密后的数据是被`pwd`这个请求参数使用的。
  - 全局搜索`pwd`

  ![image-20230610212726336](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20230610212726336.png)

  - 搜索后，逐一点击搜索到的数据包，在数据包的内容中定位搜索的关键字（重点关注js后缀的搜索结果文件)

  - 在可疑的地方打断点

  - 刷新请求

    - 在断点的位置，可以将鼠标放在某些变量上面，就可以显示变量的值是什么。

    - `pwd:f(n.pwd,substr(0,16)`:表示的含义就是将pwd这个明文密码，f函数就是对密码进行加密，返回密文数据吧。因此，得知`f`函数就是加密函数！

    - f函数是一个js函数，我们只需要将函数的函数定义找到，通过python模拟调用该函数就可以得到密码加密后的密文数据吧！

    - 键入f函数代码如下

      ```js
      n.exports = function(e, t, n) {
          return t ? n ? i(t, e) : o(i(t, e)) : n ? r(e) : o(r(e))
      }
      ```

  - 使用js改写工具对函数的实现进行改写：

    - 改写工具功能：

      - 格式化：格式化js代码

      - 加载代码按钮：用来检测js代码是否存在语法错误

      - 计算表达式按钮：可以直接调用计算按钮左侧框中对应的函数调用

      - ```js
        function l(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
        }
        
        function a(e, t, n, o, r, i) {
            return l((t = l(l(t, e), l(o, i))) << r | t >>> 32 - r, n)
        }
        
        function p(e, t, n, o, r, i, s) {
            return a(t & n | ~t & o, e, t, r, i, s)
        }
        
        function f(e, t, n, o, r, i, s) {
            return a(t & o | n & ~o, e, t, r, i, s)
        }
        
        function m(e, t, n, o, r, i, s) {
            return a(t ^ n ^ o, e, t, r, i, s)
        }
        
        function g(e, t, n, o, r, i, s) {
            return a(n ^ (t | ~o), e, t, r, i, s)
        }
        
        function s(e, t) {
            e[t >> 5] |= 128 << t % 32,
                e[14 + (t + 64 >>> 9 << 4)] = t;
            for (var n, o, r, d, i = 1732584193,
                     s = -271733879,
                     a = -1732584194,
                     c = 271733878,
                     u = 0; u < e.length; u += 16) i = p(n = i, o = s, r = a, d = c, e[u], 7, -680876936),
                c = p(c, i, s, a, e[u + 1], 12, -389564586),
                a = p(a, c, i, s, e[u + 2], 17, 606105819),
                s = p(s, a, c, i, e[u + 3], 22, -1044525330),
                i = p(i, s, a, c, e[u + 4], 7, -176418897),
                c = p(c, i, s, a, e[u + 5], 12, 1200080426),
                a = p(a, c, i, s, e[u + 6], 17, -1473231341),
                s = p(s, a, c, i, e[u + 7], 22, -45705983),
                i = p(i, s, a, c, e[u + 8], 7, 1770035416),
                c = p(c, i, s, a, e[u + 9], 12, -1958414417),
                a = p(a, c, i, s, e[u + 10], 17, -42063),
                s = p(s, a, c, i, e[u + 11], 22, -1990404162),
                i = p(i, s, a, c, e[u + 12], 7, 1804603682),
                c = p(c, i, s, a, e[u + 13], 12, -40341101),
                a = p(a, c, i, s, e[u + 14], 17, -1502002290),
                i = f(i, s = p(s, a, c, i, e[u + 15], 22, 1236535329), a, c, e[u + 1], 5, -165796510),
                c = f(c, i, s, a, e[u + 6], 9, -1069501632),
                a = f(a, c, i, s, e[u + 11], 14, 643717713),
                s = f(s, a, c, i, e[u], 20, -373897302),
                i = f(i, s, a, c, e[u + 5], 5, -701558691),
                c = f(c, i, s, a, e[u + 10], 9, 38016083),
                a = f(a, c, i, s, e[u + 15], 14, -660478335),
                s = f(s, a, c, i, e[u + 4], 20, -405537848),
                i = f(i, s, a, c, e[u + 9], 5, 568446438),
                c = f(c, i, s, a, e[u + 14], 9, -1019803690),
                a = f(a, c, i, s, e[u + 3], 14, -187363961),
                s = f(s, a, c, i, e[u + 8], 20, 1163531501),
                i = f(i, s, a, c, e[u + 13], 5, -1444681467),
                c = f(c, i, s, a, e[u + 2], 9, -51403784),
                a = f(a, c, i, s, e[u + 7], 14, 1735328473),
                i = m(i, s = f(s, a, c, i, e[u + 12], 20, -1926607734), a, c, e[u + 5], 4, -378558),
                c = m(c, i, s, a, e[u + 8], 11, -2022574463),
                a = m(a, c, i, s, e[u + 11], 16, 1839030562),
                s = m(s, a, c, i, e[u + 14], 23, -35309556),
                i = m(i, s, a, c, e[u + 1], 4, -1530992060),
                c = m(c, i, s, a, e[u + 4], 11, 1272893353),
                a = m(a, c, i, s, e[u + 7], 16, -155497632),
                s = m(s, a, c, i, e[u + 10], 23, -1094730640),
                i = m(i, s, a, c, e[u + 13], 4, 681279174),
                c = m(c, i, s, a, e[u], 11, -358537222),
                a = m(a, c, i, s, e[u + 3], 16, -722521979),
                s = m(s, a, c, i, e[u + 6], 23, 76029189),
                i = m(i, s, a, c, e[u + 9], 4, -640364487),
                c = m(c, i, s, a, e[u + 12], 11, -421815835),
                a = m(a, c, i, s, e[u + 15], 16, 530742520),
                i = g(i, s = m(s, a, c, i, e[u + 2], 23, -995338651), a, c, e[u], 6, -198630844),
                c = g(c, i, s, a, e[u + 7], 10, 1126891415),
                a = g(a, c, i, s, e[u + 14], 15, -1416354905),
                s = g(s, a, c, i, e[u + 5], 21, -57434055),
                i = g(i, s, a, c, e[u + 12], 6, 1700485571),
                c = g(c, i, s, a, e[u + 3], 10, -1894986606),
                a = g(a, c, i, s, e[u + 10], 15, -1051523),
                s = g(s, a, c, i, e[u + 1], 21, -2054922799),
                i = g(i, s, a, c, e[u + 8], 6, 1873313359),
                c = g(c, i, s, a, e[u + 15], 10, -30611744),
                a = g(a, c, i, s, e[u + 6], 15, -1560198380),
                s = g(s, a, c, i, e[u + 13], 21, 1309151649),
                i = g(i, s, a, c, e[u + 4], 6, -145523070),
                c = g(c, i, s, a, e[u + 11], 10, -1120210379),
                a = g(a, c, i, s, e[u + 2], 15, 718787259),
                s = g(s, a, c, i, e[u + 9], 21, -343485551),
                i = l(i, n),
                s = l(s, o),
                a = l(a, r),
                c = l(c, d);
            return [i, s, a, c]
        }
        
        function c(e) {
            for (var t = "",
                     n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
            return t
        }
        
        function u(e) {
            var t, n = [];
            for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
            for (t = 0; t < 8 * e.length; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n
        }
        
        function o(e) {
            for (var t, n = "0123456789abcdef",
                     o = "",
                     r = 0; r < e.length; r += 1) t = e.charCodeAt(r),
                o += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
            return o
        }
        
        function d(e) {
            return unescape(encodeURIComponent(e))
        }
        
        function r(e) {
            return c(s(u(e = d(e)), 8 * e.length))
        }
        
        function i(e, t) {
            var n, e = d(e),
                t = d(t),
                o = u(e),
                r = [],
                i = [];
            for (r[15] = i[15] = void 0, 16 < o.length && (o = s(o, 8 * e.length)), n = 0; n < 16; n += 1) r[n] = 909522486 ^ o[n],
                i[n] = 1549556828 ^ o[n];
            return e = s(r.concat(u(t)), 512 + 8 * t.length),
                c(s(i.concat(e), 640))
        }
        
        function getPwd(e, t, n) {
            return t ? n ? i(t, e) : o(i(t, e)) : n ? r(e) : o(r(e))
        }
        ```

  - 将改写的js代码，存储到一个js文件中，然后使用pyExceJS进行模拟执行，返回加密结果即可！

```python
import execjs

node = execjs.get()

fp = open('getPwd.js', 'r', encoding='utf-8')

ctx = node.compile(fp.read())
pwd = input("输入密码：")
funcName = 'getPwd("%s")' % pwd
result = ctx.eval(funcName)
print('加密后的数据为:', result)
```

---

# Steam逆向分析

- url:  https://store.steampowered.com/login/?redir=&redir_ssl=1

- 分析思路：
  - 输入用户名和密码后，点击登录按钮，通过抓包工具捕获点击登录按钮后发起请求对
    应的相关数据包
  - 定位到登录的数据包
  - 发现只有密码是加密的，因此需要对密码进行逆向，加密的密码对应的请求参数名
    称是：password,接下来打开全局搜索框，搜索password.即可。
  - 发现`GetPasswordRSAPublicKey`方法可疑，跟进后得到
    - `publickey_exp`：010001
    - `publickey_mod`：`b8b96700df28a24a6fe0c944562c5d13b92fb28a74d292a9c487cf43c183a2adea4dc833a060871755bb06609c93f8e89ca8fa1dffbde8b41212470ab7c2c2ec37016166dd90964b2176c0bb451741add5c1681f4c69a2e4798cb295412e3611e1474f80d97fb4c1a80114399191c1a7c34793dba322aa79459996716ccefdcf94db89cc6fb8f2405519386263ab5add5b10a2ab62aba11aef84b29693d99e061ff3c0be488d2ea5f33487b9c9a0fa4af5b846c8e5fefd85c745d02dc1c6953a354d5a96a1f17a1be21b47a163253a8f13909d3a1b67b1a47e3b6935c4dfce2f8753b9c806ad1f965513af9be498c718bb7311727992f8ed3b686223709a72cb`
- 重要的经验分享：
  - js的内置对象有：window,document,.navigator
  - 在js改写的过程中，如果出现了上述内置对象未定义的情况，直接给该内置对象赋值this即可！`window=this;` `navigator=this;`

---

# 完美世界逆向分析

- url：https://passport.wanmei.com/login?location=L3NhZmUv

  - 定位到正确的断点位置

  - 进行js改写操作

    - 断点代码的关键字：setPublicKey，encrypt
    - 通过这两个关键字确定该算法为非对称秘钥加密算法！

  - 注意：e.setPublicKey(`$`('#e).val():该行代码是在设置公钥，因此函数的参数应该是公钥表示的字符串。`$`('#e).val(0就是公钥表示的字符串。$('#e').val(0的意思是，获取id为e的标签中存储的数据值，将该数据值作为公钥使用。

  - 注意：直接将s代码粘贴到发条改写工具中，可能会出现编码问题，则可以将s代码先粘贴到pycharm中，再将pycharm中的代码复制粘贴到发条改写工具中，不要点击格式化按钮，然后直接点击加载代码按钮，会出现一个错，定位在了s="…",可以将该行代码删除，自己重新写一遍即可！至此编码问题就解决了！

  - 

  - ```python
    import execjs
    
    node = execjs.get()
    # 换成utf-8会报错
    fp = open('getPwd.js', 'r', encoding='gbk', errors='ignore')
    ctx = node.compile(fp.read())
    pwd = "123456"
    pubKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjfeE0MIYsZes/HwV06/kvRw34Hmhn9WPt0feLPp1PVqdqZz1/xFvPPEAJ/lAvfqt5kyn+A06bvYXIhizTjlOzPgLE4897ihuSYXgfwcUshPZvydRLbftU6Exj5SLbv5tw4GInbgQv7RWLWOKyQA81q6lWae2Kcgd1XpDRsQNXVwIDAQAB"
    
    jsFunc = 'getPwd("%s","%s")' % (pwd, pubKey)
    result = ctx.eval(jsFunc)
    print(result)
    ```

---

# 逆向的主要作用

- 数据的加密和解密的处理
- 动态参数的请求参数
  - 都是通过JS代码生成

---

# 试客联盟逆向分析

- url：http://login.shikee.com

- 分析思路

  - 输入用户名和密码后，打开抓包工具，请求后发现捕获到数据包

  - 在可疑之处打断点，重新发起请求是否会进入调试

  - js代码的改写：

    - var formData =$("#loginForm").serializeArray();

      - 将等号右侧的内容选中，鼠标放上去，则显示该内容返回的结果是什么，返回的结果是一个数组，里面存储了4个元素（字典）

      - ```
        [
        0: {name: 'username', value: '1508948470@qq.com'}
        1: {name: 'password', value: '123456'}
        2: {name: 'vcode', value: ''}
        3: {name: 'to', value: 'https://user.shikee.com/'}
        ]
        ```
    
    - 找寻rsa_n的值，这个值表示的是公钥，它要么是单独的请求获取的，要么是隐藏在前台页面的。
      - 在请求数据中查询rsa_n关键字

---

# 长房网逆向分析

- url:http://eip.chanfine.com/login.jsp

---

# 有道翻译逆向分析

- url:https://fanyi.youdao.com/

请求参数
```
i: cat
sign: 2edad7ef1eb973eb0ee4d3605c2867ac
mysticTime: 1687927933402
--------------------
i: dog
sign: 1b3fc20914b862eb002a69898e4efdbe
mysticTime: 1687928013033
------------------------
```

