---
title: HTML——构建 Web(1)——HTML介绍
date: 2022年12月25日00:15:51
tags: Web
categories: 前端笔记
description: Web入门教程
---

# 🏀HTML简介

就其核心而言，[HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML) 是一种相当简单的、由不同[元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)组成的标记语言，它可以被应用于文本片段，使文本在文档中具有不同的含义（它是段落吗？它是项目列表吗？它是表格吗？），将文档结构化为逻辑块（文档是否有头部？有三列内容？有一个导航菜单？），并且可以将图片，影像等内容嵌入到页面中。本模块将介绍前两个用途，并且介绍一些 HTML 的基本概念和语法。

---

## [指南](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML#指南)

本模块包含以下文章，它们将带你了解 HTML 的所有基本理论，并为你提供充分的机会来测试一些技能。

- [HTML 入门](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)

  涵盖了 HTML 绝对基础知识以帮助你入门——定义元素、属性和其他重要术语，并展示了它们在语言中的位置。我们还展示了一个典型的 HTML 页面的结构和一个 HTML 元素的结构，并解释了一些重要的基本语言特征。一路下来，我们会与 HTML 一起玩耍，以激发你的兴趣！

- [head 标签中有什么？HTML 中的元数据](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)

  当页面被加载后，HTML 中的 head 部分**是不会**被显示在 Web 浏览器中的。它包含了许多信息，例如网页的标题 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title)，指向 [CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS) 的链接（如果你使用 CSS 来设计 HTML 内容的样式的话），指向自定义网站图标的链接和一些元数据（关于 HTML 本身的数据，例如它的作者和描述这个文档的关键字）。

- [HTML 文本处理基础](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)

  HTML 的主要工作之一就是给予文本意义（也被叫做[语义](https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics)），以让浏览器知道如何正确的显示文本。这篇文章关注于如何用 HTML 将文本块分解为结构化的标题和段落、强调和加粗单词、创建列表以及其他内容。

- [创建超链接](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)

  超链接真的很重要——它们是“web”的意义所在。本文展示了创建超链接所需的语法，并讨论了创建超链接的最佳做法。

- [高级文本排版](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting)

  HTML 中还有许多没有在 [HTML 文本处理基础](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)页面中提到的其他元素可以用于排版文本。这里的元素不太为人所知，但了解这些元素仍然很有用。在这篇文章里，你将学习如何标记引文、描述列表、计算机代码和其他类似的文本、下标和上标、联系信息等。

- [文档和网站结构](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)

  除了定义页面的个别部分（例如“段落”或“图像”）外，HTML 也被用于定义网站的区域（例如“标题”、“导航菜单”和“主要内容”）。本文将探讨如何规划一个基本的网站结构，以及如何编写 HTML 来表示这个结构。

- [调试 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML)

  光是编写 HTML 还好，但如果出了什么问题，而你找不到问题的来源怎么办？本文将介绍一些可以帮上忙的工具。

---

# 🏀开始学习HTML

本文将从 HTML 最基础的部分讲起，对元素（Element）、属性（Attribute）以及可能涉及的一些重要术语进行介绍，并明确它们在语言中所处的位置。本文还会讲解 HTML 元素和页面的组织方式，以及其他一些重要的基本语言特性。学习的过程中，我们会使用 HTML 做一些好玩的事情。

| 预备知识： | 具备计算机基础知识，安装了[基础软件环境](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Installing_basic_software)，了解基本的[文件组织方法](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Dealing_with_files)。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 熟悉 HTML 语言的基础知识，掌握几个 HTML 元素的基本用法。     |

## 1.什么是 HTML?

[HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML) (HyperText Markup Language) 不是一门编程语言，而是一种用来告知浏览器如何组织页面的**标记语言**。HTML 可复杂、可简单，一切取决于开发者。它由一系列的**元素（[elements](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)）**组成，这些元素可以用来包围不同部分的内容，使其以某种方式呈现或者工作。一对标签（ [tags](https://developer.mozilla.org/zh-CN/docs/Glossary/Tag)）可以为一段文字或者一张图片添加超链接，将文字设置为斜体，改变字号，等等。例如下面一行内容：

```
My cat is very grumpy
```

可以将这行文字封装成一个段落（Paragraph）[`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p)元素来使其在单独一行呈现：

```
<p>My cat is very grumpy</p>
```

> **备注：** HTML 标签不区分大小写。也就是说，输入标签时既可以使用大写字母也可以使用小写字母。例如，标签 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title) 写作 `<title>`、`<TITLE>`、`<Title>`、`<TiTlE>`，等等都可以正常工作。不过，从一致性、可读性来说，最好仅使用小写字母。

---

## 2.剖析一个 HTML 元素

让我们进一步探讨我们的段落元素：

![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/grumpy-cat-small.png)

这个元素的主要部分有：

1. **开始标签**（Opening tag）：包含元素的名称（本例为 p），被左、右角括号所包围。表示元素从这里开始或者开始起作用 —— 在本例中即段落由此开始。
2. **结束标签**（Closing tag）：与开始标签相似，只是其在元素名之前包含了一个斜杠。这表示着元素的结尾 —— 在本例中即段落在此结束。初学者常常会犯忘记包含结束标签的错误，这可能会产生一些奇怪的结果。
3. **内容**（Content）：元素的内容，本例中就是所输入的文本本身。
4. **元素**（Element）：开始标签、结束标签与内容相结合，便是一个完整的元素。

---

### 主动学习：创建第一个 HTML 元素

通过使用标签`<em>`和`</em>`（在前面放置`<em>`打开元素，在后面放置`</em>`关闭元素）——这使得行内容变成斜体强调！你可以在“输出”区域中实时查看更改更新。

如果写错了，可随时按【重置】按钮重新开始，如果实在想不出来，可按【显示答案】按钮查看答案。

<iframe class="sample-code-frame" title="主动学习：创建第一个 HTML 元素 sample" id="frame_主动学习：创建第一个_html_元素" width="700" height="400" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/_sample_.%E4%B8%BB%E5%8A%A8%E5%AD%A6%E4%B9%A0%EF%BC%9A%E5%88%9B%E5%BB%BA%E7%AC%AC%E4%B8%80%E4%B8%AA_html_%E5%85%83%E7%B4%A0.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

---

### 嵌套元素

你也可以把元素放到其它元素之中——这被称作嵌套。如果我们想要表明我们的小猫脾气很暴躁，可以将 **very** 嵌套在 [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong) 中，意味着这个单词被着重强调：

```html
<p>My cat is <strong>very</strong> grumpy.</p>
```

你需要确保元素被正确的嵌套：在上面的例子中我们先打开[`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p)元素，然后才打开[`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong)元素，因此必须先将[`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong)元素关闭，然后再去关闭[`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p)元素。下面的例子是错误的：

```html
<p>My cat is <strong>very grumpy.</p></strong>
```

所有的元素都需要正确的打开和关闭，这样才能按你所想的方式展现。如果像上述的例子一样进行了错误的嵌套，那么浏览器会去猜测你想要表达的意思，但很有可能会得出错误的结果。所以永远不要这么做！

---

### 块级元素和内联元素

在 HTML 中有两种你需要知道的重要元素类别，块级元素和内联元素。

- 块级元素在页面中以块的形式展现 —— 相对于其前面的内容它会出现在新的一行，其后的内容也会被挤到下一行展现。块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等。一个以 block 形式展现的块级元素不会被嵌套进内联元素中，但可以嵌套在其它块级元素中。
- 内联元素通常出现在块级元素中并环绕文档内容的一小部分，而不是一整个段落或者一组内容。内联元素不会导致文本换行：它通常出现在一堆文字之间，例如超链接元素 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 或者强调元素：[`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/em) 和 [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong)。

看一看下面的例子：

```html
<em>第一</em><em>第二</em><em>第三</em>

<p>第四</p><p>第五</p><p>第六</p>
```

[`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/em) 是一个内联元素，所以就像你在下方可以看到的，第一行代码中的三个元素都没有间隙的展示在了同一行。而 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 是一个块级元素，所以第二行代码中的每个元素分别都另起了新的一行展现，并且每个段落间都有一些间隔（这是因为默认的浏览器有着默认的展示 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 元素的 [CSS 样式](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps)）。

<iframe class="sample-code-frame" title="主动学习：创建第一个 HTML 元素 sample" id="frame_主动学习：创建第一个_html_元素" width="700" height="400" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/_sample_.%E4%B8%BB%E5%8A%A8%E5%AD%A6%E4%B9%A0%EF%BC%9A%E5%88%9B%E5%BB%BA%E7%AC%AC%E4%B8%80%E4%B8%AA_html_%E5%85%83%E7%B4%A0.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

> **备注：** HTML5 重新定义了元素的类别：见 [元素内容分类](https://html.spec.whatwg.org/multipage/indices.html#element-content-categories)([译文](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories))。尽管这些新的定义更精确，但却比上述的“块级元素”和“内联元素”更难理解，因此在之后的讨论中仍使用旧的定义。

> **备注：** 在这篇文章中提到的“块”和“内联”，不应该与 [CSS 盒子的类型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#块级盒子（block_box）_和_内联盒子（inline_box）)中的同名术语相混淆。尽管它们默认是相关的，但改变 CSS 显示类型并不会改变元素的分类，也不会影响它可以包含和被包含于哪些元素。防止这种混淆也是 HTML5 摒弃这些术语的原因之一。

> **备注：** 你可以查阅包含了块级元素和内联元素列表的参考页面—see [Block-level elements](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements) and [Inline elements](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elements).

---

### 空元素

不是所有元素都拥有开始标签，内容，结束标签。一些元素只有一个标签，通常用来在此元素所在位置插入/嵌入一些东西。例如：元素[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)是用来在元素[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)所在位置插入一张指定的图片。例子如下：

```
<img src="https://roy-tian.github.io/learning-area/extras/getting-started-web/beginner-html-site/images/firefox-icon.png">
```

> **备注：** 空元素（Empty elements）有时也被叫作 *void elements*.

---

## 3.属性

元素也可以拥有属性，如下：

![&lt;p class="editor-note">我的猫咪脾气爆&lt;/p>](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/grumpy-cat-attribute-small.png)

属性包含元素的额外信息，这些信息不会出现在实际的内容中。在上述例子中，这个 class 属性给元素赋了一个识别的名字（id），这个名字此后可以被用来识别此元素的样式信息和其他信息。

一个属性必须包含如下内容：

1. 一个空格，在属性和元素名称之间（如果已经有一个或多个属性，就与前一个属性之间有一个空格）。
2. 属性名称，后面跟着一个等于号。
3. 一个属性值，由一对引号 ("") 引起来。

---

### 学习实践：为一个元素添加属性

另一个例子是关于元素[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)的——元素[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)是锚，它使被标签包裹的内容成为一个超链接。此元素也可以添加大量的属性，其中几个如下：

- `href`

  这个属性声明超链接的 web 地址，当这个链接被点击浏览器会跳转至 href 声明的 web 地址。例如：`href="https://www.mozilla.org/"`。

- `title`

  标题`title`属性为超链接声明额外的信息，比如你将链接至的那个页面。例如：`title="The Mozilla homepage"`。当鼠标悬停在超链接上面时，这部分信息将以工具提示的形式显示。

- `target`

  **目标`target`属性用于指定链接如何呈现出来。例如，`target="_blank"`将在新标签页中显示链接。如果你希望在当前标签页显示链接，忽略这个属性即可。**

编辑下面的文本框中的内容，使之变成指向任一个你喜欢的 web 地址的链接。首先，添加`<a>`元素，然后为它添加 `href` 属性和 `title` 属性。你可以即时的在输出区域看到你修改的内容。你应该可以看到一个连接，当鼠标移上此链接时会显示 title 属性值，当点击此链接时会跳转到 `href`指定的 web 地址。记住：在元素名和属性名之间以及两个属性之间要有一个空格。

<iframe class="sample-code-frame" title="学习实践：为一个元素添加属性 sample" id="frame_学习实践：为一个元素添加属性" width="700" height="350" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/_sample_.%E5%AD%A6%E4%B9%A0%E5%AE%9E%E8%B7%B5%EF%BC%9A%E4%B8%BA%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%E5%B1%9E%E6%80%A7.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>



> **备注：** 可到 Github 在线使用这个“[代码操场](https://roy-tian.github.io/learning-area/extras/tools/playable-code)”。

---

### 布尔属性

有时你会看到没有值的属性，它是合法的。这些属性被称为布尔属性，他们只能有跟它的属性名一样的属性值。例如[`disabled`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-disabled) 属性，**他们可以标记表单输入使之变为不可用 (变灰色)，此时用户不能向他们输入任何数据。**

```html
<input type="text" disabled="disabled">
```

Copy to Clipboard

方便起见，我们完全可以将其写成以下形式（我们还提供了一个非禁止输入的表单元素供你参考，以作为对比）：

```html
<!-- 使用 disabled 属性来防止终端用户输入文本到输入框中 -->
<input type="text" disabled>

<!-- 下面这个输入框没有 disabled 属性，所以用户可以向其中输入 -->
<input type="text">
```

上面两段 HTML 代码产生的效果如下：

<iframe class="hide-codepen-jsfiddle" title="布尔属性 sample" id="frame_布尔属性" width="700" height="100" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/_sample_.%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7.html" loading="lazy" style="box-sizing: border-box; border: 1px solid var(--border-primary); max-width: 100%; width: 765.719px; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(27, 27, 27); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

### 省略包围属性值的引号

当你浏览那些粗糙的 web 网站，你将会看见各种各样奇怪的标记风格，其中就有不给属性值添加引号。在某些情况下它是被允许的，但是其他情况下会破坏你的标记。例如，我们可以写一个只拥有一个 href 属性的链接，如下：

```html
<a href=https://www.mozilla.org/>收藏页面</a>
```

然而，当我们再添加一个 title 属性时就会出错，如下：

```html
<a href=https://www.mozilla.org/ title=The Mozilla homepage>收藏页面</a>
```

此时浏览器会误解你的标记，它会把 title 属性理解为三个属性——title 的属性值为"The“，另外还有两个布尔属性“`Mozilla`”和“`homepage`”。看下面的例子，它明显不是我们所期望的，并且在这个编码里面它会报错或者出现异常行为。试一试把鼠标移动到链接上，看会显示什么 title 属性值！

<iframe class="hide-codepen-jsfiddle" title="省略包围属性值的引号 sample" id="frame_省略包围属性值的引号" width="700" height="100" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/_sample_.%E7%9C%81%E7%95%A5%E5%8C%85%E5%9B%B4%E5%B1%9E%E6%80%A7%E5%80%BC%E7%9A%84%E5%BC%95%E5%8F%B7.html" loading="lazy" style="box-sizing: border-box; border: 1px solid var(--border-primary); max-width: 100%; width: 765.719px; color: rgb(155, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(27, 27, 27); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

我们建议始终添加引号——这样可以避免很多问题，并且使代码更易读。

---

### 单引号或者双引号？

在目前为止，本章内容所有的属性都是由双引号来包裹。也许在一些 HTML 中，你以前也见过单引号。这只是风格的问题，你可以从中选择一个你喜欢的。以下两种情况都可以：

```html
<a href="http://www.example.com">示例站点链接</a>

<a href='http://www.example.com'>示例站点链接</a>
```

但你应该注意单引号和双引号不能在一个属性值里面混用。下面的语法是错误的：

```html
<a href="http://www.example.com'>示例站点链接</a>
```

在一个 HTML 中已使用一种引号，你可以在此引号中嵌套另外一种引号：

```html
<a href="http://www.example.com" title="你觉得'好玩吗'？">示例站点链接</a>
```

如果你想将引号当作文本显示在 html 中，你就必须使用[实体引用](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started#实体引用：在_html_中包含特殊字符)。

---

## 4.剖析 HTML 文档

学习了一些 HTML 元素的基础知识，这些元素单独一个是没有意义的。现在我们来学习这些特定元素是怎么被结合起来，从而形成一个完整的 HTML 页面的：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>我的测试站点</title>
  </head>
  <body>
    <p>这是我的页面</p>
  </body>
</html>
```

分析如下：

1. ```
   <!DOCTYPE html>
   ```

   : 声明文档类型。很久以前，早期的 HTML(大约 1991 年 2 月)，文档类型声明类似于链接，规定了 HTML 页面必须遵从的良好规则，能自动检测错误和其他有用的东西。使用如下：

   ```html
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   ```

   然而这种写法已经过时了，这些内容已成为历史。只需要知道`<!DOCTYPE html>`是最短有效的文档声明。

2. `<html></html>`: `<html>`元素。这个元素包裹了整个完整的页面，是一个根元素。

3. `<head></head>`: `<head>`元素。这个元素是一个容器，它包含了所有你想包含在 HTML 页面中但不想在 HTML 页面中显示的内容。这些内容包括你想在搜索结果中出现的关键字和页面描述，CSS 样式，字符集声明等等。以后的章节能学到更多关于<head>元素的内容。

4. `<meta charset="utf-8">`: 这个元素设置文档使用 utf-8 字符集编码，utf-8 字符集包含了人类大部分的文字。基本上他能识别你放上去的所有文本内容。毫无疑问要使用它，并且它能在以后避免很多其他问题。

5. `<title></title>`: 设置页面标题，出现在浏览器标签上，当你标记/收藏页面时它可用来描述页面。

6. `<body></body>`: `<body>`元素。包含了你访问页面时所有显示在页面上的内容，文本，图片，音频，游戏等等。

---

### 学习实践：为 HTML 文档添加一些特征

如果你想在你的本地练习写一些 HTML 页面，你可以这样做：

1. 复制上面的 HTML 页面例子。
2. 在编辑器创建一个新文件。
3. 粘贴代码到这个文件。
4. 保存为`index.html`.

> **备注：** 可在 [学习区代码仓库](https://github.com/roy-tian/learning-area/blob/master/html/introduction-to-html/getting-started/index.html) 上查看该示例。

你可以打开浏览器看看这段代码的效果是什么样的，然后改变代码刷新浏览器看看新的结果。最开始的代码是这样的效果：

![A simple HTML page that says This is my page](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/template-screenshot.png)

所以在这段练习中，你可以用你的电脑在本地编写运行代码，如上所述，你也可以在下面的简单可编辑窗口编辑它 (此时这个简单的可编辑窗口仅显示`<body>`标签内的内容.) 我们希望你能够实践以下步骤：

- 就在[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 元素开始标签下方，为这个文档添加一个主标题。这个主标题应该被包含在`<h1>`开始标签和`</h1>`结束标签之间。
- 编辑这个段落以包含一些你感兴趣的文本。
- 把字词包含在开始标记`<strong>`和结束标记`</strong>`之间可以使他们以粗体显示，从而突出任何重要的字词。
- 在你的文档中添加一个超文本链接，[如前所述](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started#学习实践：为一个元素添加属性)。
- 在段落下方向你的文档添加一张图片，[如前所述](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started#空元素)。如果你尝试对不同的图片（在你的本地电脑或是在 Web 的其他位置上）添加链接，那你就更棒了。

---

### HTML 中的空白

在上面的例子中，你可能已经注意到了在代码中包含了很多的空格——这是没有必要的；下面的两个代码片段是等价的：

```html
<p>狗 狗 很 呆 萌。</p>

<p>狗 狗        很
         呆 萌。</p>
```

无论你在 HTML 元素的内容中使用多少空格 (包括空白字符，包括换行)，当渲染这些代码的时候，HTML 解释器会将连续出现的空白字符减少为一个单独的空格符。

那么为什么我们会在 HTML 元素的嵌套中使用那么多的空白呢？答案就是为了可读性 —— 如果你的代码被很好地进行格式化，那么就很容易理解你的代码是怎么回事，反之就只有聚做一团的混乱。在我们的 HTML 代码中，我们让每一个嵌套的元素以两个空格缩进。你使用什么风格来格式化你的代码取决于你 (比如所对于每层缩进使用多少个空格)，但是你应该坚持使用某种风格。

---

## 5.实体引用：在 HTML 中包含特殊字符

在 HTML 中，字符 `<`、`>`、`"`、`'` 和 `&` 是特殊字符。它们是 HTML 语法自身的一部分，那么你如何将这些字符包含进你的文本中呢，比如说如果你真的想要在文本中使用符号&或者小于号，而不想让它们被浏览器视为代码并被解释？

我们必须使用字符引用 —— 表示字符的特殊编码，它们可以在那些情况下使用。每个字符引用以符号&开始，以分号 (;) 结束。

| 原义字符 | 等价字符引用 |
| :------- | :----------- |
| <        | `&lt`        |
| >        | `&gt`        |
| "        | `&quot`      |
| '        | `&apos`      |
| &        | `amp`        |

在下面的例子中你可以看到两个段落，它们在谈论 web 技术：

```html
<p>HTML 中用 <p> 来定义段落元素。</p>

<p>HTML 中用 &lt;p&gt; 来定义段落元素</p>
```

在下面的实时输出中，你会看到第一段是错误的，因为浏览器会认为第二个<p>是开始一个新的段落！第二段是正确的，因为我们用字符引用来代替了角括号（'<'和'>'符号）.

<iframe class="sample-code-frame" title="实体引用：在 HTML 中包含特殊字符 sample" id="frame_实体引用：在_html_中包含特殊字符" width="700" height="200" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/_sample_.%E5%AE%9E%E4%BD%93%E5%BC%95%E7%94%A8%EF%BC%9A%E5%9C%A8_html_%E4%B8%AD%E5%8C%85%E5%90%AB%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

> **备注：** 维基百科上有一个包含所有可用 HTML 字符实体引用的列表：[XML 和 HTML 字符实体引用列表](http://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references)。

---

## 6.HTML 注释

如同大部分的编程语言一样，在 HTML 中有一种可用的机制来在代码中书写注释 —— 注释是被浏览器忽略的，而且是对用户不可见的，它们的目的是允许你描述你的代码是如何工作的和不同部分的代码做了什么等等。如果你在半年后重新返回你的代码库，而且不能记起你所做的事情 —— 或者当你处理别人的代码的时候，那么注释是很有用的。

为了将一段 HTML 中的内容置为注释，你需要将其用特殊的记号<!--和-->包括起来，比如：

```html
<p>我在注释外！</p>

<!-- <p>我在注释内！</p> -->
```

正如你下面所见的那样，第一段出现在了实时输出中，但是第二段却没有。

<iframe class="sample-code-frame" title="HTML 注释 sample" id="frame_html_注释" width="700" height="100" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/_sample_.html_%E6%B3%A8%E9%87%8A.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

## 7.总结

你已经来到了这篇文章的结尾——希望你享受基础的 HTML 学习的旅程。在这里你应该可以理解 HTML 语言的全貌、它基本的工作原理。你应该还学会了一些元素和属性的使用。在这个模块的后续文章中，我们会深入一些你已经见过的东西的细节，并且介绍一些新的 HTML 的特性。未完待续！

> **备注：** 现在，你将开始学习更多关于 HTML 的知识，你可能也想了解一些层叠样式列表（[CSS](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)）的基础知识。CSS 是一种用来设计网页样式的语言（比如，用它改变字体、颜色或页面布局等）。你很快就会发现，HTML 和 CSS 能很好地协调配合。

---

---

# 🏀`<head>`标签里有什么？Metadata-HTML 中的元数据

在页面加载完成的时候，[head](https://developer.mozilla.org/zh-CN/docs/Glossary/Head) 标签里的内容，是不会在页面中显示出来的。它包含了诸如页面的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title)（标题）、指向 [CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS) 的链接（如果你选择用 CSS 来为 HTML 内容添加样式）、指向自定义图标的链接和其它的元数据（描述 HTML 的数据，比如，作者和描述文档的重要关键词）等信息。本文将涵盖上述内容并拓展，为您对标记的使用打下一个良好的基础。

展，为您对标记的使用打下一个良好的基础。

| 预备知识： | 初步了解 HTML（参见 [开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)）。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 学习 HTML <head> 标签的概念、用途、基本组成，以及它对 HTML 文档所起的作用。 |

---

## 1.什么是 HTML  标签

让我们简单回顾一下[上一章节的 HTML 文档](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started#剖析html文档)：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>我的测试页面</title>
  </head>
  <body>
    <p>这是我的页面</p>
  </body>
</html>
```

HTML [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head) 元素与 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 元素不同，它的内容不会在浏览器中显示，它的作用是保存页面的一些[元数据](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)。上述示例的 head 元素非常简短：

```html
<head>
  <meta charset="utf-8">
  <title>我的测试页面</title>
</head>
```

然而，大型页面的 head 会包含很多元数据。可以用[开发者工具](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_are_browser_developer_tools)查看网页的 head 信息。本节并不打算面面俱到地讲述 head，只是初步介绍几项 head 中重要的常用元素，让我们开始吧。

---

## 2.添加标题

之前已经讲过 [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title) 元素，它可以为文档添加标题。但别和 [`<h1>` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) 元素搞混了，[`<h1>` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) 是为 body 添加标题的。有时候 [`<h1>` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) 也叫作网页标题。但是二者并不相同。

- [`<h1>` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) 元素在页面加载完毕时显示在页面中，通常只出现一次，用来标记页面内容的标题（故事名称、新闻摘要，等等）。
- [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title) 元素是一项元数据，用于表示整个 HTML 文档的标题（而不是文档内容）。

---

### 实践操作：一个简单的示例

1. 为了开始这个练习，我们希望你到我们的 Github 库中下载一份我们的title-example.html 网页。要做到这一点，你可以选择下面两种操作之一：
   1. 使用你的代码编辑器，从页面中拷贝粘贴代码到一个新的文本文件中，然后将其保存到一个适当的地方。
   2. 按下页面中的 "Raw" 按钮，从浏览器的菜单中选择 *另存为...*，然后选择一个地方来保存这个文件。
   3. 或者直接复制下面

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>&lt;title&gt; element</title>
</head>

<body>
    <h1>&lt;h1&gt; element</h1>
</body>

</html>
```

2. 在浏览器中打开文件，你会看到类似这样效果：

![image-20221221134413233](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221221134413233.png)

现在很明显的可以看到 `<h1>` 出现的地方，和 `<title>` 出现的地方！

3. 你应该尝试着在你的代码编辑器中打开这些代码，编辑这些元素的内容，然后在你的浏览器中刷新页面。祝你玩得开心。



`<title>` 元素也被以其他的方式使用着。比如说，如果你尝试为某个页面添加书签，（在火狐浏览器中：点击*书签 > 将当前标签页添加到书签*，或点击地址栏末尾的星标），你会看到 `<title>` 的内容被作为建议的书签名。

![A webpage being bookmarked in Firefox; the bookmark name has been automatically filled in with the contents of the <title> element ](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/bookmark-example.png)

`<title>` 元素的内容也被用在搜索的结果中，正如你即将在下面看到的。

---

## 3.元数据： `<meta>`元素

元数据就是描述数据的数据，而 HTML 有一个“官方的”方式来为一个文档添加元数据——[`<meta>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) 元素。当然，其它的在这篇文章中提到的东西也可以被当作元数据。有很多不同种类的 `<meta>` 元素可以被包含进你的页面的 `<head>` 元素，但是现在我们还不会尝试去解释所有类型，这只会引起混乱。我们会解释一些你常会看到的类型，先让你有个概念。

---

### 指定你的文档中字符的编码

在上面的示例中，这行是被包含的：

```
<meta charset="utf-8">
```

这个元素简单的指定了文档的字符编码——在这个文档中被允许使用的字符集。`utf-8<` 是一个通用的字符集，它包含了任何人类语言中的大部分的字符。意味着该 web 页面可以显示任意的语言；所以对于你的每一个页面都使用这个设置会是一个好主意！比如说，你的页面可以很好的处理英文和日文：

![a web page containing English and Japanese characters, with the character encoding set to universal, or utf-8. Both languages display fine,](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/correct-encoding.png)

比如说，如果你将你的字符集设置为 `ISO-8859-1`，那么页面将出现乱码：

![a web page containing English and Japanese characters, with the character encoding set to latin. The Japanese characters don't display correctly](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/bad-encoding.png)

> **备注：** 一些浏览器（比如 Chrome）会自动修正错误的编码，所以取决于你所使用的浏览器，你或许不会看到这个问题。无论如何，你仍然应该为你的页面手动设置编码为 `utf-8`，来避免在其他浏览器中可能出现的潜在问题。

---

### 实践操作：体验字符编码

为了开始这个练习，回到你在前面 `<title>` 章节中获取的 HTML 模板（[title-example.html](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/the-html-head/title-example.html)），试着改变其字符集的值为 `ISO-8859-1`，然后将日语添加到页面中。这就是我们使用的代码：

```html
<p>Japanese example: ご飯が熱い。</p>
```

---

### 添加作者和描述

许多 `<meta>` 元素包含了 `name` 和 `content` 属性：

- `name` 指定了 meta 元素的类型；说明该元素包含了什么类型的信息。
- `content` 指定了实际的元数据内容。

这两个 meta 元素对于定义你的页面的作者和提供页面的简要描述是很有用的。让我们看一个例子：

```html
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Web Docs Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
```

指定作者在某些情况下是很有用的：如果你需要联系页面的作者，问一些关于页面内容的问题。一些内容管理系统能够自动获取页面作者的信息，然后用于某些用途。

指定包含关于页面内容的关键字的页面内容的描述是很有用的，因为它可能或让你的页面在搜索引擎的相关的搜索出现得更多（这些行为在术语上被称为：[搜索引擎优化](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)，或 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)。）

---

### 实践操作：在搜索引擎中 description 的使用

description 也被使用在搜索引擎显示的结果页中。下面通过一个例子来说明：

1. 访问 [MDN Web 文档](https://developer.mozilla.org/zh-CN/)。

2. 查看网页源代码（通过鼠标右键点击网页在弹出的菜单中选择*查看网页源代码*）

3. 找到 description 的 meta 标签。就和如下展示的这样：

   ```html
   <meta name="description" content="The MDN Web Docs site
     provides information about Open Web technologies
     including HTML, CSS, and APIs for both Web sites and
     progressive web apps.">
   ```

4. 现在，在你喜欢的搜索引擎里搜索“MDN Web Docs”（下图展示的是在谷歌搜索里的情况）。你会看到 description `<meta>` 和 `<title>` 元素如何在搜索结果里显示——很值得这样做哦！![A Yahoo search result for "Mozilla Developer Network"](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/mdn-search-result.png)

> **备注：** 在谷歌搜索里，在主页面链接下面，你将看到一些相关子页面——这些是站点链接，可以在 [Google's webmaster tools](https://search.google.com/search-console/about) 配置——一种可以使你的站点对搜索引擎更友好的方式。

> **备注：** 许多 `<meta>` 特性已经不再使用。例如，keyword `<meta>` 元素（`<meta name="keywords" content="fill, in, your, keywords, here">`）——提供关键词给搜索引擎，根据不同的搜索词，查找到相关的网站——已经被搜索引擎忽略了，因为作弊者填充了大量关键词到 keyword，错误地引导搜索结果。

---

### 其他类型的元数据

当你在网站上查看源码时，你也会发现其它类型的元数据。你在网站上看到的许多功能都是专有创作，旨在向某些网站（如社交网站）提供可使用的特定信息。

例如，Facebook 编写的元数据协议 [Open Graph Data](https://ogp.me/) 为网站提供了更丰富的元数据。在 MDN Web 文档源代码中，你会发现：

```html
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

上面代码展现的一个效果就是，当你在 Facebook 上链接到 MDN 时，该链接将显示一个图像和描述：这为用户提供更丰富的体验。

![Open graph protocol data from the MDN homepage as displayed on facebook, showing an image, title, and description.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/facebook-output.png)

Twitter 还拥有自己的类型的专有元数据协议（称为：[Twitter Cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards)），当网站的 URL 显示在 twitter.com 上时，它具有相似的效果。例如下面：

```html
<meta name="twitter:title" content="Mozilla Developer Network">
```

---

## 4.在你的站点增加自定义图标

为了进一步丰富你的网站设计，你可以在元数据中添加对自定义图标（**favicon**，为“favorites icon”的缩写）的引用，这些将在特定的场合（浏览器的收藏，或书签列表）中显示。

这个不起眼的图标已经存在很多很多年了，16x16 像素是这种图标的第一种类型。你可以看见这些图标出现在浏览器每一个打开的标签页中以及书签页中。

页面添加图标的方式有：

1. 将其保存在与网站的索引页面相同的目录中，以 `.ico` 格式保存（大多数浏览器将支持更通用的格式，如 `.gif` 或 `.png`，但使用 ICO 格式将确保它能在如 Internet Explorer 6 那样古老的浏览器显示）

2. 将以下行添加到 HTML 的`<head>`中以引用它：

   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

如今还有很多其他的图标类型可以考虑。例如，你可以在 MDN Web 文档的源代码中找到它：

```html
<!-- fash -->
<link rel="icon" href="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/%E5%9B%BE%E6%A0%87.png">
```

这些注释解释了每个图标的用途——这些元素涵盖的东西提供一个高分辨率图标，这些高分辨率图标当网站保存到 iPad 的主屏幕时使用。

不用担心现在实现所有这些类型的图标——这是一个相当先进的功能，你将不会被要求在这个课堂上学习这个知识点。这里的主要目的是让你提前了解有这一样东西以防当你浏览其他网站的源代码时不理解源代码的含义。

> **备注：** 如果你的网站使用了内容安全策略（Content Security Policy，CSP）来增加安全性，这个策略会应用在图标上。如果你遇到了图标没有被加载的问题，你需要确认 [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) 响应头的 [`img-src` 指令 (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src) 没有禁止访问图标。

---

## 5.在 HTML 中应用 CSS 和 JavaScript

如今，几乎你使用的所有网站都会使用 [CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS) 来让网页更加炫酷，并使用 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 来让网页有交互功能，比如视频播放器、地图、游戏以及更多功能。这些应用在网页中很常见，它们分别使用 [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 元素以及 [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 元素。

- `<link>`元素经常位于文档的头部。这个 link 元素有 2 个属性，`rel="stylesheet"`表明这是文档的样式表，而`href`包含了样式表文件的路径：

  ```html
  <link rel="stylesheet" href="my-css-file.css">
  ```

- `<script>`元素没必要非要放在文档的`<head>`中，并包含`src`属性来指向需要加载的 **JavaScript** 文件路径，同时最好加上**`defer`以告诉浏览器在解析完成 HTML 后再加载 JavaScript**。**这样可以确保在加载脚本之前浏览器已经解析了所有的 HTML 内容（如果脚本尝试访问某个不存在的元素，浏览器会报错）**。实际上还有很多方法可用于处理加载 JavaScript 的问题，但这是现代浏览器中最可靠的一种方法。

  ```html
  <script src="my-js-file.js" defer></script>
  ```

> **备注：** `<script>` 元素看起来像一个空元素，但它并不是，因此需要一个结束标记。您还可以选择将脚本放入 `<script>`元素中，而不是指向外部脚本文件。

---

### [实践操作：在网页中应用 CSS 和 JavaScript](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#实践操作：在网页中应用_css_和_javascript)

1. 开始操作之前，先拷贝我们的 [meta-example.html](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/the-html-head/meta-example.html)、[script.js](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/the-html-head/script.js) 和 [style.css](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/the-html-head/style.css) 文件，并把它们保存到本地电脑的同一目录下，确保使用了正确的文件名和文件格式。
2. 使用浏览器和文字编辑器同时打开你的 HTML 文件。
3. 根据上面的信息，添加 [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 和 [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 元素到你的 HTML 文件中，这样你的 HTML 就可以应用 CSS 和 JavaScript 了。

如果按照上述步骤正确地执行，当你保存 HTML 文件并重新刷新浏览器的话，你会发现页面已经变样了：

![image-20221221142315279](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221221142315279.png)

- JavaScript 在页面中添加了一个空列表。现在当你点击列表中的任何地方，浏览器会弹出一个对话框要求你为新列表项输入一些文本内容。当你点击 OK 按钮，刚刚那个新的列表项会添加到页面上，当你点击那些已有的列表项，会弹出一个对话框允许你修改列表项的文本。
- CSS 使页面背景变成了绿色，文本变得大了一点。它还将 JavaScript 添加到页面中的一些内容进行了样式化，（带有黑色边框的红色条是 CSS 添加到 js 生成的列表中的样式。）

> **备注：** 如果你卡在这个练习当中，无法正常应用 CSS 和 JavaScript，试着查看一下我们的 [css-and-js.html](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/the-html-head/css-and-js.html) 页面实例。

---

## 6.为文档设定主语言

最后，值得一提的是可以（而且有必要）为站点设定语言，这个可以通过添加 [`lang` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)到 HTML 开始的标签中来实现（参考 [meta-example.html](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/the-html-head/meta-example.html)），如下所示：

```html
<html lang="zh-CN">
```

这在很多方面都很有用。如果你的 HTML 文档的语言设置好了，那么你的 HTML 文档就会被搜索引擎更有效地索引（例如，允许它在特定于语言的结果中正确显示），对于那些使用屏幕阅读器的视障人士也很有用（例如，法语和英语中都有“six”这个单词，但是发音却完全不同）。

你还可以将文档的分段设置为不同的语言。例如，我们可以把日语部分设置为日语，如下所示：

```html
<p>Japanese example: <span lang="ja">ご飯が熱い。</span>.</p>
```

这些代码是根据 [ISO 639-1](https://zh.wikipedia.org/wiki/ISO_639-1) 标准定义的。你可以在 [Language tags in HTML and XML](https://www.w3.org/International/articles/language-tags/) 找到更多相关内容。

---

# 🏀HTML 文字处理基础

HTML 的主要工作是编辑文本结构和文本内容（也称为语义[semantics](https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics)），以便浏览器能正确的显示。本文介绍了 [HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML)的使用方法：在一段文本中添加标题和段落，强调语句，创建列表等等。

| 先决条件： | 阅读 [开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)，了解基本的 HTML 知识。 |
| :--------- | ------------------------------------------------------------ |
| 目的：     | 学习如何用标记 (段落、标题、列表、强调、引用) 来建立基础文本页面的文本结构和文本内容。 |

---

## 1.基础：标题和段落

大部分的文本结构由标题和段落组成。不管是小说、报刊、教科书还是杂志等。

![An example of a newspaper front cover, showing use of a top level heading, subheadings and paragraphs.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/newspaper_small.jpg)

内容结构化会使读者的阅读体验更轻松，更愉快。

在 HTML 中，每个段落是通过 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 元素标签进行定义的，比如下面这样：

```html
<p>我是一个段落，千真万确。</p>
```

每个标题（Heading）是通过“标题标签”进行定义的：

```html
<h1>我是文章的标题</h1>
```

这里有六个标题元素标签 —— `<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>`。每个元素代表文档中不同级别的内容; `<h1>` 表示主标题（the main heading），`<h2>` 表示二级子标题（subheadings），`<h3>` 表示三级子标题（sub-subheadings），等等。

---

### 编辑结构层次

这里举一个例子。在一个故事中，<h1>表示故事的名字，<h2>表示每个章节的标题， <h3>表示每个章节下的子标题，以此类推。

```HTML
<h1>三国演义</h1>

<p>罗贯中</p>

<h2>第一回 宴桃园豪杰三结义 斩黄巾英雄首立功</h2>

<p>话说天下大势，分久必合，合久必分。周末七国分争，并入于秦。及秦灭之后，楚、汉分争，又并入于汉……</p>

<h2>第二回 张翼德怒鞭督邮 何国舅谋诛宦竖</h2>

<p>且说董卓字仲颖，陇西临洮人也，官拜河东太守，自来骄傲。当日怠慢了玄德，张飞性发，便欲杀之……</p>

<h3>却说张飞</h3>

<p>却说张飞饮了数杯闷酒，乘马从馆驿前过，见五六十个老人，皆在门前痛哭。飞问其故，众老人答曰：“督邮逼勒县吏，欲害刘公；我等皆来苦告，不得放入，反遭把门人赶打！”……</p>
```

所涉及的元素具体代表什么，完全取决于作者编辑的内容，只要层次结构是合理的。在创建此类结构时，您只需要记住一些最佳实践：

- 您应该最好只对每个页面使用一次<h1> — 这是顶级标题，所有其他标题位于层次结构中的下方。
- 请确保在层次结构中以正确的顺序使用标题。不要使用<h3>来表示副标题，后面跟<h2>来表示副副标题 - 这是没有意义的，会导致奇怪的结果。
- 在可用的六个标题级别中，您应该只在每页使用不超过三个，除非您认为有必要使用更多。具有许多级别的文档（即，较深的标题层次结构）变得难以操作并且难以导航。在这种情况下，如果可能，建议将内容分散在多个页面上。

---

### 为什么我们需要结构化？

回答这个问题前，让我们先来看一段文档示例“[text-start.html](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/html-text-formatting/text-start.html)” — 并从运行这段文档示例（美味的豆沙食谱）开始。首先，您可以复制一份并保存到本地机器上，在之后的练习中您将用到它。在这个文档的主体（body）中包含了多个内容 — 这些内容没有做任何标记，但是编辑时使用了换行 (输入回车/换行跳转到下一行) 处理。

然而，当您在浏览器中打开文档时，您会看到文本显示为一整块！

![A webpage that shows a wall of unformatted text, because there are no elements on the page to structure it.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/screen_shot_2017-03-29_at_09.20.35.png)

这是因为没有元素给内容结构，所以浏览器不知道什么是标题，什么是段落。此外：

- 用户在阅读网页时，往往会快速浏览以查找相关内容，经常只是阅读开头的标题（我们通常在一个网页上会花费很少的时间 [spend a very short time on a web page](http://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/))。如果用户不能在几秒内看到一些有用的内容，他们很可能会感到沮丧并离开。
- 对您的网页建立索引的搜索引擎将标题的内容视为影响网页搜索排名的重要关键字。没有标题，您的网页在[SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)（搜索引擎优化）方面效果不佳。
- 严重视力障碍者通常不会阅读网页；他们用听力来代替。完成这项工作的软件叫做屏幕阅读器（[screen reader](http://en.wikipedia.org/wiki/Screen_reader)）。该软件提供了快速访问给定文本内容的方法。在使用的各种技术中，它们通过朗读标题来提供文档的概述，让用户能快速找到他们需要的信息。如果标题不可用，用户将被迫听到整个文档的大声朗读。
- 使用[CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS)样式化内容，或者使用[JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript)做一些有趣的事情，你需要包含相关内容的元素，所以 CSS / JavaScript 可以有效地定位它。

因此，我们需要给我们的内容结构标记。

---

### 实践操作：编辑我们的内容结构

让我们直接跳进一个实例。在下面的示例中，向“Input”字段中的原始文本添加元素，使其在“Output”字段中显示为标题和两个段落。

如果您犯了错误，您可以使用*重置*按钮进行重置。如果卡住，请按*显示解决方案*按钮以查看答案。

<iframe class="sample-code-frame" title="实践操作：编辑我们的内容结构 sample" id="frame_实践操作：编辑我们的内容结构" width="700" height="500" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals/_sample_.%E5%AE%9E%E8%B7%B5%E6%93%8D%E4%BD%9C%EF%BC%9A%E7%BC%96%E8%BE%91%E6%88%91%E4%BB%AC%E7%9A%84%E5%86%85%E5%AE%B9%E7%BB%93%E6%9E%84.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

### 为什么我们需要语义？

在我们身边的任何地方都要依赖语义学 — 我们依靠以前的经验就知道日常事物都代表什么；当我们看到什么，我们就会知道它代表什么。举个例子，我们知道红色交通灯表示“停止”，绿色交通灯表示”通行“。如果运用了错误的语义，事情会迅速地变得非常棘手 (难道有某个国家使用红色代表通行？我不希望如此)

同样的道理，我们需要确保使用了正确的元素来给予内容正确的意思、作用以及外形。在这里，[`<h1>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) 元素也是一个语义元素，它给出了包裹在您的页面上用来表示顶级标题的角色（或意义）的文本。

```html
<h1>这是一个顶级标题</h1>
```

一般来说，浏览器会给它一个更大的字形来让它看上去像个标题（虽然你可以使用 CSS 让它变成任何你想要的样式。更重要的是，它的语义值将以多种方式被使用，比如通过搜索引擎和屏幕阅读器（上文提到过的）。

在另一方面，你可以让任一元素看起来像一个顶级标题，如下：

```html
<span style="font-size: 32px; margin: 21px 0;">这是顶级标题吗？</span>
```

这是一个 [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span) 元素，它没有语义。当您想要对它用 CSS（或者 JS）时，您可以用它包裹内容，且不需要附加任何额外的意义（在未来的课程中你会发现更多这类元素）。我们已经对它使用了 CSS 来让它看起来像一个顶级标题。然而，由于它没有语义值，所以它不会有任何上文提到的帮助。最好的方法是使用相关的 HTML 元素来标记这个项目。

---

## 2.列表

现在，让我们学习一下列表。列表在生活中随处可见——从购物清单到回家的路线方案，再到本教程的说明列表。在网络上，列表也随处可见，大致包含了三种不同类型的列表。

---

### 无序 Unordered

无序列表用于标记列表项目顺序无关紧要的列表 — 让我们以早点清单为例。

```
豆浆
油条
豆汁
焦圈
```

每份无序的清单从 [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ul) 元素开始——需要包裹清单上所有被列出的项目：

```html
<ul>
豆浆
油条
豆汁
焦圈
</ul>
```

然后就是用 [`<li>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/li) 元素把每个列出的项目单独包裹起来：

```html
<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```

---

### 实践操作：标记无序列表

尝试编辑下面的示例来创建一个 HTML 无序列表。

<iframe class="sample-code-frame" title="实践操作：标记无序列表 sample" id="frame_实践操作：标记无序列表" width="700" height="400" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals/_sample_.%E5%AE%9E%E8%B7%B5%E6%93%8D%E4%BD%9C%EF%BC%9A%E6%A0%87%E8%AE%B0%E6%97%A0%E5%BA%8F%E5%88%97%E8%A1%A8.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

### 有序 Ordered

有序列表需要按照项目的顺序列出来——让我们以一组方向为例：

```
沿着条路走到头
右转
直行穿过第一个十字路口
在第三个十字路口处左转
继续走 300 米，学校就在你的右手边
```

这个标记的结构和无序列表一样，除了需要用`ol`元素将所有项目包裹，而不是`<ul>：`

```html
<ol>
  <li>沿着条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>
```

---

### 实践操作：标记有序列表

尝试编辑下面的示例来创建一个 HTML 有序列表：

<iframe class="sample-code-frame" title="实践操作：标记有序列表 sample" id="frame_实践操作：标记有序列表" width="700" height="500" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals/_sample_.%E5%AE%9E%E8%B7%B5%E6%93%8D%E4%BD%9C%EF%BC%9A%E6%A0%87%E8%AE%B0%E6%9C%89%E5%BA%8F%E5%88%97%E8%A1%A8.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

### 实践操作：标记我们的食谱

到了这里，你拥有了所有你需要的信息来标记我们的食谱样例。你可以选择从[text-start.html](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/html-text-formatting/text-start.html)复制一份文件并保存在本地，打开它进行编辑，或者在下面的例子中进行编辑。因为在本地你可以保存你的项目，所以在本地做这个工作可能更好。而如果你在下面可编辑的样本中作业，下一次你打开这个网站时你可能会丢失你的数据。各有利弊吧。

<iframe class="sample-code-frame" title="实践操作：标记我们的食谱 sample" id="frame_实践操作：标记我们的食谱" width="700" height="800" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals/_sample_.%E5%AE%9E%E8%B7%B5%E6%93%8D%E4%BD%9C%EF%BC%9A%E6%A0%87%E8%AE%B0%E6%88%91%E4%BB%AC%E7%9A%84%E9%A3%9F%E8%B0%B1.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

如果你感到棘手，你可以随时按下*Show solution*按钮，或者在我们的 github repo 上检查我们的 [text-complete.html](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/html-text-formatting/text-complete.html) 样例。

---

### 嵌套列表 Nesting lists

将一个列表嵌入到另一个列表是完全可以的。你可能想让一些子项目列在首项目之下。让我们从食谱示例中获取第二个列表：

```html
<ol>
  <li>先用蛋白一个、盐半茶匙及淀粉两大匙搅拌均匀，调成“腌料”，鸡胸肉切成约一厘米见方的碎丁并用“腌料”搅拌均匀，腌渍半小时。</li>
  <li>用酱油一大匙、淀粉水一大匙、糖半茶匙、盐四分之一茶匙、白醋一茶匙、蒜末半茶匙调拌均匀，调成“综合调味料”。</li>
  <li>鸡丁腌好以后，色拉油下锅烧热，先将鸡丁倒入锅内，用大火快炸半分钟，炸到变色之后，捞出来沥干油汁备用。</li>
  <li>在锅里留下约两大匙油，烧热后将切好的干辣椒下锅，用小火炒香后，再放入花椒粒和葱段一起爆香。随后鸡丁重新下锅，用大火快炒片刻后，再倒入“综合调味料”继续快炒。</li>
  <li>如果你采用正宗川菜做法，最后只需加入花生米，炒拌几下就可以起锅了。</li>
  <li>如果你在北方，可加入黄瓜丁、胡萝卜丁和花生米，翻炒后起锅。</li>
 </ol>
```

由于最后两项与它们的前一项非常密切相关（它们看起来更像该项的子项或选项），将它们编辑成无序列表，并嵌套在该项的子项中可能更合理。就像下面这样：

```html
<ol>
  <li>先用蛋白一个、盐半茶匙及淀粉两大匙搅拌均匀，调成“腌料”，鸡胸肉切成约一厘米见方的碎丁并用“腌料”搅拌均匀，腌渍半小时.</li>
  <li>用酱油一大匙、淀粉水一大匙、糖半茶匙、盐四分之一茶匙、白醋一茶匙、蒜末半茶匙调拌均匀，调成“综合调味料”。</li>
  <li>鸡丁腌好以后，色拉油下锅烧热，先将鸡丁倒入锅内，用大火快炸半分钟，炸到变色之后，捞出来沥干油汁备用。</li>
  <li>在锅里留下约两大匙油，烧热后将切好的干辣椒下锅，用小火炒香后，再放入花椒粒和葱段一起爆香。随后鸡丁重新下锅，用大火快炒片刻后，再倒入“综合调味料”继续快炒。
    <ul>
      <li>如果你采用正宗川菜做法，最后只需加入花生米，炒拌几下就可以起锅了。</li>
      <li>如果你在北方，可加入黄瓜丁、胡萝卜丁和花生米，翻炒后起锅。</li>
    </ul>
  </li>
</ol>
```

---

## 3.重点强调

在日常用语中，我们常常会加重某个字的读音，或者用加粗等方式突出某句话的重点。与此类似，HTML 也提供了相应的标签，用于标记某些文本，使其具有加粗、倾斜、下划线等效果。下面，我们将学习一些最常见的标签。

---

### 强调

在口语表达中，我们有时会强调某些字，用来改变这句话的意思。同样地，在书面用语中，我们可以使用斜体字来达到同样的效果。例如，下面两个句子便有不同的意思：

I am glad you weren't late.

I am *glad* you weren't *late*. (ps: 此句中"*glad"*和"late"为斜体字体)

第一句话听起来真的像松了一口气因为没有迟到。相反，第二句话听起来具有讽刺性而且有隐含的攻击性，表达对一个人迟到的恼怒。

在 HTML 中我们用[`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/em)（emphasis）元素来标记这样的情况。这样做既可以让文档读起来更有趣，也可以被屏幕阅读器识别出来，并以不同的语调发出。浏览器默认风格为斜体，但你不应该纯粹使用这个标签来获得斜体风格，为了获得斜体风格，你应该使用[`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span)元素和一些 CSS，或者是[`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/i)元素（见下文）。

```html
<p>I am <em>glad</em> you weren't <em>late</em>.</p>
```

---

### 非常重要

为了强调重要的词，在口语方面我们往往用重音强调，在文字方面则是用粗体字来达到强调的效果。例如下面这段：

This liquid is **highly toxic**.

I am counting on you. **Do not** be late!

在 HTML 中我们用[`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong) (strong importance) 元素来标记这样的情况。这样做既可以让文档更加地有用，也可以被屏幕阅读器识别出来，并以不同的语调发出。浏览器默认风格为粗体，但你不应该纯粹使用这个标签来获得粗体风格，为了获得粗体风格，你应该使用[`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span)元素和一些 CSS，或者是 [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/b) 元素 (见下文)。

```html
<p>This liquid is <strong>highly toxic</strong>.</p>

<p>I am counting on you. <strong>Do not</strong> be late!</p>
```

如有需要你可以将 strong 元素和 em 元素嵌套在其他的标签中：

```html
<p>This liquid is <strong>highly toxic</strong> —
if you drink it, <strong>you may <em>die</em></strong>.</p>
```

---

### 实践操作：我们是重要的！

在这个实践操作中，我们提供了可编辑的例子。在这个例子中，我们想让你把斜体 (em) 和加粗 (strong) 放在你认为重要的词汇上，仅仅为了练习。

<iframe class="sample-code-frame" title="实践操作：我们是重要的！ sample" id="frame_实践操作：我们是重要的！" width="700" height="500" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals/_sample_.%E5%AE%9E%E8%B7%B5%E6%93%8D%E4%BD%9C%EF%BC%9A%E6%88%91%E4%BB%AC%E6%98%AF%E9%87%8D%E8%A6%81%E7%9A%84%EF%BC%81.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

### 斜体字、粗体字、下划线...

迄今为止我们已经讨论的元素都是意义清楚的语义元素。[`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/b), [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/i), 和 [`<u>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/u) 的情况却有点复杂。它们出现于人们要在文本中使用粗体、斜体、下划线但 CSS 仍然不被完全支持的时期。像这样的元素，仅仅影响表象而且没有语义，被称为**表象元素（presentational elements）**并且不应该再被使用。因为正如我们在之前看到的，语义对无障碍，SEO（搜索引擎优化）等非常重要。

HTML5 用新的语义规则重新定义了 `<b>`、`<i>` 和 `<u>`,使得它们的语言显得稍微有点混乱。

这里是最好的经验法则：如果没有更合适的元素，那么使用 `<b>`、`<i>` 或 `<u>` 来表达传统上的粗体、斜体或下划线表达的意思是合适的。然而，始终拥有[无障碍](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility)的思维模式是至关重要的。斜体的概念对人们使用屏幕阅读器是没有帮助的，对使用其他书写系统而不是拉丁文书写系统的人们也是没有帮助的。

- [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/i) 被用来传达传统上用斜体表达的意义：外国文字，分类名称，技术术语，一种思想……
- [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/b) 被用来传达传统上用粗体表达的意义：关键字，产品名称，引导句……
- [`<u>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/u) 被用来传达传统上用下划线表达的意义：专有名词，拼写错误……

> **备注：** 使用下划线的忠告：因为我们常常会认为网页中的下划线代表着一个超链接**，**所以最好只用下划线来代表超链接。而在语义适合的情况下不得不使用<u>元素时，可以使用 CSS 来改变<u>元素对应的下划线的默认样式，从而和超链接的下划线区分开来。下面是一个具体的例子：

```html
<!-- 学名 -->
<p>
  红喉北蜂鸟（学名：<i>Archilocus colubris</i>）
  是北美东部最常见的蜂鸟品种。
</p>

<!-- 舶来词 -->
<p>
  菜单上有好多舶来词汇，比如 <i lang="uk-latn">vatrushka</i>（东欧乳酪面包）,
  <i lang="id">nasi goreng</i>（印尼炒饭）以及<i lang="fr">soupe à l'oignon</i>（法式洋葱汤）。
</p>

<!-- 已知的错误书写 -->
<p>
  总有一天我会改掉写<u style="text-decoration-line: underline; text-decoration-style: wavy;">措字</u>的毛病。
</p>

<!-- 在一组指令中突出显示关键字 -->
<ol>
  <li>
    <b>切</b>下两片面包，
  </li>
  <li>
    在两片面包中间<b>夹入</b>一片西红柿和一片生菜叶。
  </li>
</ol>
```

---

## 4.总结

至此，本文应该给您做了一个很好的了解，如何开始在 HTML 中标记文本，并介绍了一些最重要的元素。在这一领域还有许多语义元素，我们将在后面的“更多语义元素”文章中看到更多的语义元素。在下一篇文章中，我们将详细介绍如何创建超链接（[create hyperlinks](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)），它可能是 Web 上最重要的元素。

---

# 🏀创建超链接

超链接非常重要 ——它们使互联网成为一个互联的网络。本文介绍了创建链接所需的语法，并且讨论了链接的最佳实现方法。

| 预备知识： | 熟悉基本 HTML（包含在[开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)中），HTML 文本格式（包含在 [HTML 文字处理基础](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)中）。 |
| :--------- | ------------------------------------------------------------ |
| 目标：     | 学习如何实现一个有效地把多个文件链接在一起的超文本链接。     |

---

## 1.什么是超链接？

超链接是互联网提供的最令人兴奋的创新之一，它们从一开始就一直是互联网的一个特性，使互联网成为互联的网络。超链接使我们能够将我们的文档链接到任何其他文档（或其他资源），也可以链接到文档的指定部分，我们可以在一个简单的网址上提供应用程序（与必须先安装的本地应用程序或其他东西相比）。几乎任何网络内容都可以转换为链接，点击（或激活）超链接将使网络浏览器转到另一个网址（[URL](https://developer.mozilla.org/zh-CN/docs/Glossary/URL)）。

> **备注：** URL 可以指向 HTML 文件、文本文件、图像、文本文档、视频和音频文件以及可以在网络上保存的任何其他内容。如果浏览器不知道如何显示或处理文件，它会询问你是否要打开文件（需要选择合适的本地应用来打开或处理文件）或下载文件（以后处理它）。

以 BBC 的主页为例，里面就包含了非常多的链接，各自连到不同新闻、网站的其它地方（导览功能），或者登入/注册页面（用户工具）等等。

![frontpage of bbc.co.uk, showing many news items, and navigation menu functionality](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/updated-bbc-website.png)

---

## 2.链接的解析

通过将文本（或其它内容，见[块级链接](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#块级链接)) 包裹在 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 元素内，并给它一个 [`href`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#attr-href) 属性（也称为**超文本引用**或**目标**，它将包含一个网址）来创建一个基本链接。

```html
<p>我创建了一个指向
<a href="https://www.mozilla.org/zh-CN/">Mozilla 主页</a>的超链接。
</p>
```

结果如下所示：

我创建了一个指向 [Mozilla 主页](https://www.mozilla.org/zh-CN/)的超链接。

---

### 使用 title 属性添加支持信息

你可能要添加到你的链接的另一个属性是 `title`（标题）；这旨在包含关于链接的补充信息，例如页面包含什么样的信息或需要注意的事情。

```html
<p>我创建了一个指向<a href="https://www.mozilla.org/en-US/"
   title="了解 Mozilla 使命以及如何参与贡献的最佳站点。">Mozilla 主页</a
   >的超链接。
</p>
```

结果如下（当鼠标指针悬停在链接上时，标题将作为提示信息出现）：

我创建了一个指向 [Mozilla 主页](https://www.mozilla.org/zh-CN/)的超链接。

> **备注：** 链接的标题仅当鼠标悬停在其上时才会显示，这意味着使用键盘来导航网页的人很难获取到标题信息。如果标题信息对于页面非常重要，你应该使用所有用户能都方便获取的方式来呈现，例如放在常规文本中。

---

### 主动学习：创建你自己的示例链接

主动学习时间：我们希望你使用本地代码编辑器和我们的[入门模板](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/getting-started/index.html)来创建一个 HTML 文档。

- 在 HTML 内，尝试添加一个或者多个段落或其它你知道类型的内容。
- 将某些内容转换为链接。
- 包含标题属性。

---

### 块级链接

如上所述，你可以将一些内容转换为链接，甚至是[块级元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)。例如你想要将一个图像转换为链接，你只需把引用了图像文件的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素放到 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 标签内。

```
<a href="https://www.mozilla.org/zh-CN/">
  <img src="mozilla-image.png" alt="链接至 Mozilla 主页的 Mozilla 标志">
</a>
```

> **备注：** 你会在未来的文章中发现更多在 Web 中使用图像的例子。

---

## 3.统一资源定位符（URL）与路径（path）快速入门

要全面地了解链接目标，你需要了解统一资源定位符和文件路径。本小节将介绍相关的信息。

统一资源定位符（英文：**U**niform **R**esource **L**ocator，简写：URL）是一个定义了在网络上的位置的一个文本字符串。例如 Mozilla 的中文主页定位在 `https://www.mozilla.org/zh-CN/`.

URL 使用路径查找文件。路径指定文件系统中你感兴趣的文件所在的位置。看一下一个简单的目录结构的例子（参见[创建超链接](https://github.com/mdn/learning-area/tree/main/html/introduction-to-html/creating-hyperlinks)目录。）

![A simple directory structure. The parent directory is called creating-hyperlinks and contains two files called index.html and contacts.html, and two directories called projects and pdfs, which contain an index.html and a project-brief.pdf file, respectively](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/simple-directory.png)

此目录结构的**根目录**称为 `creating-hyperlinks`。当在网站上工作时，你会有一个包含整个网站的目录。在根目录，我们有一个 `index.html` 和一个 `contacts.html` 文件。在真实的网站上，`index.html` 将会成为我们的主页或登录页面（作为网站或网站特定部分的入口的网页。）。

我们的根目录还有两个目录——`pdfs` 和 `projects`，它们分别包含一个 PDF（`project-brief.pdf`）文件和一个 `index.html` 文件。请注意你可以有两个 `index.html` 文件，前提是他们在不同的目录下，许多网站就是如此。第二个 `index.html` 或许是项目相关信息的主登录界面。

* **指向当前目录**：如果 `index.html`（目录顶层的 `index.html`）想要包含一个超链接指向 `contacts.html`，你只需要指定想要链接的文件名，因为它与当前文件是在同一个目录的。所以你应该使用的 URL 是 `contacts.html`:

```html
<p>要联系某位工作人员，请访问我们的<a
 href="contacts.html">联系人页面</a>。</p>
```

* **指向子目录**：如果 `index.html` （目录顶层 `index.html`）想要包含一个超链接指向 `projects/index.html`，你需要先进入 `projects` 项目目录，然后指明要链接到的文件 `index.html`。通过指定目录的名称，然后是正斜杠，然后是文件的名称。因此你要使用的 URL 是 `projects/index.html`：

```html
<p>请访问<a href="projects/index.html">项目页面</a>。</p>
```

* **指向上级目录**：如果你想在 `projects/index.html` 中包含一个指向 `pdfs/project-brief.pdf` 的超链接，你必须先返回上级目录，然后再回到 `pdf` 目录。“返回上一个目录级”使用两个英文点号表示（`..`），所以你应该使用的 URL 是 `../pdfs/project-brief.pdf`：

```html
<p>点击打开<a href="../pdfs/project-brief.pdf">项目简介</a>。</p>
```

> **备注：** 如果需要的话，你可以将这些功能的多个例子和复杂的 URL 结合起来。例如：`../../../complex/path/to/my/file.html`。

---

### 文档片段

超链接除了可以链接到文档外，也可以链接到 HTML 文档的特定部分（被称为**文档片段**）。要做到这一点，你必须首先给要链接到的元素分配一个 [`id`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#id) 属性。例如，如果你想链接到一个特定的标题，可以这样做：

```html
<h2 id="Mailing_address">邮寄地址</h2>
```

然后链接到那个特定的 `id`，你可以在 URL 的结尾使用一个井号指向它，例如：

```html
<p>要提供意见和建议，请将信件邮寄至<a href="contacts.html#Mailing_address">我们的地址</a>。</p>
```

你甚至可以在同一份文档下，通过链接文档片段，来链接到同一份文档的另一部分：

```html
<p>本页面底部可以找到<a href="#Mailing_address">公司邮寄地址</a>。</p>
```

---

### 绝对 URL 和相对 URL

你可能会在网络上遇到两个术语，**绝对 URL** 和**相对 URL**（或者称为，**绝对链接**和**相对链接**）：

> **绝对 URL**：指向由其在 Web 上的绝对位置定义的位置，包括[协议](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol)和[域名](https://developer.mozilla.org/zh-CN/docs/Glossary/Domain_name)。像下面的例子，如果 `index.html` 页面上传到了 `projects` 这一个目录。并且 `projects` 目录位于 web 服务站点的根目录，web 站点的域名为 `http://www.example.com`，那么这个页面就可以通过 `http://www.example.com/projects/index.html` 访问（或者通过 `http://www.example.com/projects/` 来访问，因为在没有指定特定的 URL 的情况下，大多数 web 服务器会默认访问加载 `index.html` 这类页面）

不管绝对 URL 在哪里使用，它总是指向确定的相同位置。

> **相对 URL**：指向与你链接的文件相关的位置，更像我们在前面一节中所看到的位置。例如，如果我们想从示例文件链接 `http://www.example.com/projects/index.html` 转到相同目录下的一个 PDF 文件，URL 就是文件名（例如 `project-brief.pdf`），没有其他的信息要求。如果 PDF 文件能够在 `projects` 的子目录 `pdfs` 中访问到，相对路径就是 `pdfs/project-brief.pdf`（对应的绝对 URL 是 `http://www.example.com/projects/pdfs/project-brief.pdf`）

一个相对 URL 将指向不同的位置，这取决于它所在的文件所在的位置——例如，如果我们把 `index.html` 文件从 `projects` 目录移动到 Web 站点的根目录（最高级别，而不是任何目录中），里面的 `pdfs/project-brief.pdf` 相对 URL 将会指向 `http://www.example.com/pdfs/project-brief.pdf`，而不是 `http://www.example.com/projects/pdfs/project-brief.pdf`

当然，`project-brief.pdf` 文件和 `pdfs` 文件夹的位置不会因为你移动了 `index.html` 文件而突然发生变化——这将使你的链接指向错误的位置，因此如果单击它，它将无法工作。你得小心点！

---

## 4.链接最佳实践

下面是一些在编写链接元素时可以遵循的最佳实践。

---

### 使用清晰的链接措辞

把链接放在你的页面上很容易。这还不够。我们需要让所有的读者都可以使用链接，不管他们当前的环境和哪些工具。例如：

- 使用屏幕阅读器的用户喜欢从页面上的一个链接跳到另一个链接，并且脱离上下文来阅读链接。
- 搜索引擎使用链接文本来索引目标文件，所以在链接文本中包含关键词是一个很好的主意，以有效地描述与之相关的信息。
- 读者往往会浏览页面而不是阅读每一个字，他们的眼睛会被页面的特征所吸引，比如链接。他们会找到描述性的链接。

下面是一个具体的例子：

**好的**链接文本：[下载 Firefox](https://www.mozilla.org/firefox/)

```html
<p><a href="https://www.mozilla.org/firefox/">
 下载 Firefox
</a></p>
```

**不好的**链接文本：[点击这里](https://www.mozilla.org/firefox/)下载 Firefox

```html
<p><a href="https://www.mozilla.org/firefox/">
  点击这里
</a>下载 Firefox</p>
```

其他提示：

- 不要重复 URL 作为链接文本的一部分——URL 看起来很丑，当屏幕阅读器一个字母一个字母的读出来的时候听起来就更丑了。
- 不要在链接文本中说“链接”或“链接到”——它只是无用的内容。屏幕阅读器告诉人们有一个链接。可视化用户也会知道有一个链接，因为链接通常是用不同的颜色设计的，并且存在下划线（这个惯例一般不应该被打破，因为用户习惯了它。）
- 保持你的链接标签尽可能短——这非常重要，因为屏幕阅读器需要解释整个链接文本。
- 尽量减少相同文本的多个副本链接到不同地方的情况。如果存在标记为“单击此处”、“单击此处”、“单击此处”这样脱离上下文的链接文本，容易对使用屏幕阅读器的用户带来问题。

---

### 链接到非 HTML 资源——留下清晰的指示

当链接到一个需要下载的资源（如 PDF 或 Word 文档）或流媒体（如视频或音频）或有另一个潜在的意想不到的效果（打开一个弹出窗口，或加载 Flash 电影），你应该添加明确的措辞，以减少混乱。

如下的例子会让人反感：

- 你在使用低带宽连接的情况下，点击一个链接，然后就开始下载大文件。
- 你没有安装 Flash 播放器，点击一个链接，然后突然被带到一个需要 Flash 的页面。

```html
<p><a href="https://www.example.com/large-report.pdf">
  下载销售报告（PDF, 10MB）
</a></p>

<p><a href="https://www.example.com/video-stream/" target="_blank">
  观看视频（将在新标签页中播放，HD 画质）
</a></p>

<p><a href="https://www.example.com/car-game">
  进入汽车游戏（需要 Flash 插件）
</a></p>
```

---

### 在下载链接时使用 download 属性

当你链接到要下载的资源而不是在浏览器中打开时，你可以使用 download 属性来提供一个默认的保存文件名。下面是一个 Firefox 的 Windows 最新版本下载链接的示例：

```html
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=zh-CN"
   download="firefox-latest-64bit-installer.exe">
  下载最新的 Firefox 中文版 - Windows（64 位）
</a>
```

---

## 5.主动学习：创建一个导航菜单

在这个练习中，我们希望你把一些页面和导航菜单链接起来，创建一个多页面的网站。这是创建网站的一种常见方式——每一页都使用相同的页面结构，包括相同的导航菜单，所以当链接被点击时，它给人的印象是你停留在同一个地方，不同的内容正在被提出来。

你需要将以下四页的本地副本放在同一目录中。有关完整的文件列表，请参见 [navigation-menu-start](https://github.com/mdn/learning-area/tree/main/html/introduction-to-html/navigation-menu-start) 目录：

- [index.html](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/navigation-menu-start/index.html)
- [projects.html](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/navigation-menu-start/projects.html)
- [pictures.html](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/navigation-menu-start/pictures.html)
- [social.html](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/navigation-menu-start/social.html)

你应该：

1. 在一个页面上的指定位置添加一个无序列表，其中包含要链接到的页面的名称。导航菜单通常只是一个链接列表，因此这在语义上是确定的。
2. 将每个页面名称转换为该页的链接。
3. 将导航菜单复制到每个页面。
4. 在每一页上，只删除同一页的链接——一个页面包含自己的链接是令人困惑和毫无意义的，而缺少链接会对你当前的页面起到很好的视觉提示作用。

最终的例子应该是这样的：

![简单的 HTML 导航菜单，包含主页、图片、项目、社交四个项目。](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/navigation-example.png)

> **备注：** 如果你卡住了，或者不确定你是否正确，你可以访问 [navigation-menu-marked-up](https://github.com/mdn/learning-area/tree/main/html/introduction-to-html/navigation-menu-marked-up) 目录，来查看正确的答案。

---

## 6.电子邮件链接

当点击一个链接或按钮时，打开一个新的电子邮件发送信息而不是连接到一个资源或页面，这种情况是可能做到的。这样做是使用 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 元素和 `mailto`:URL 的方案。

其最基本和最常用的使用形式为一个 `mailto:` 链接，链接指明收件人的电子邮件地址。例如：

```html
<a href="mailto:nowhere@mozilla.org">向 nowhere 发邮件</a>
```

这会创建一个链接，看起来像这样：[向 nowhere 发邮件](mailto:nowhere@mozilla.org)。

实际上，电子邮件地址是可选的。如果你忘记了（也就是说，你的 [`href`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#attr-href) 仅仅只是简单的`“mailto”`），一个新的发送电子邮件的窗口也会被用户的邮件客户端打开，只是没有收件人的地址信息，这通常在“分享”链接是很有用的，用户可以给他们选择的地址发送邮件。

---

### 指定详细信息

除了电子邮件地址，你还可以提供其他信息。事实上，任何标准的邮件头字段可以被添加到你提供的 `mailto` URL 中。其中最常用的是主题（subject）、抄送（cc）和主体（body）（这不是一个真正的标头字段，但允许你为新邮件指定一个简短的内容消息）。每个字段及其值被指定为查询项。

下面是一个包含 cc、bcc、主题和主体的示例：

```html
<a href="mailto:nowhere@mozilla.org?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email">
  Send mail with cc, bcc, subject and body
</a>
```

> **备注：** 每个字段的值必须是使用 URL 编码的，即使用[百分号转义的](https://zh.wikipedia.org/wiki/百分号编码)非打印字符（不可见字符比如制表符、换行符、分页符）和空格。同时注意使用问号（`?`）来分隔主 URL 与参数值，以及使用 & 符来分隔 `mailto:` URL 中的各个参数。这是标准的 URL 查询标记方法。阅读 [GET 方法](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Sending_and_retrieving_form_data#get_方法)以了解哪种 URL 查询标记方法是更常用的。

---

## 7.小结

这就是链接！当你开始查看样式时，你将在稍后的课程中返回链接。接下来是 HTML，我们将返回文本语义，并查看一些更高级/不寻常的功能，你会发现有用的——高级文本格式是你的下一站。

---

# 🏀高阶文字排版

HTML 中有许多其他元素可以用于格式化文本，我们没有在[HTML 文字处理基础](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)中提到它们。本文中所描述的元素虽然少有人知，但仍然值得去学习（尽管仍然不是完整的列表）。在这里你将了解标记引文、描述列表、计算机代码和其他相关文本、下标和上标、联系信息等。

| 预备知识： | 熟悉 HTML 基础（包含在 [开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started) 中）、HTML 文本格式（包含在 [HTML 文字处理初步](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals) 中）。 |
| :--------- | ------------------------------------------------------------ |
| 目标：     | 学习一些不常见的 HTML 元素标记来使用高级语义功能。           |

---

## 1.描述列表

在 HTML 基础部分，我们讨论了如何在 HTML 中[标记基本的列表](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals#列表_lists)，但是我们没有提到你偶尔会遇到的第三种类型的列表—**描述列表** (description list) 。这种列表的目的是标记一组项目及其相关描述，例如术语和定义，或者是问题和答案等。让我们看一组术语和定义的示例：

```
内心独白
戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。
语言独白
戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。
旁白
戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。
```

描述列表使用与其他列表类型不同的闭合标签— [`<dl>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dl); 此外，每一项都用 [`<dt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dt) (description term) 元素闭合。每个描述都用 [`<dd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dd) (description definition) 元素闭合。让我们来完成下面的标记例子：

```html
<dl>
  <dt>内心独白</dt>
    <dd>戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。</dd>
  <dt>语言独白</dt>
    <dd>戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。</dd>
  <dt>旁白</dt>
    <dd>戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。</dd>
</dl>
```

浏览器的默认样式会在**描述列表的描述部分**（description definition）和**描述术语**（description terms）之间产生缩进。MDN 非常严密地遵循这一惯例，同时也鼓励关于术语的其他更多的定义（but also embolden the terms for extra definition）。

下面是前述代码的显示结果：

- 内心独白

  戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。

- 语言独白

  戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。

- 旁白

  戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。

请注意：一个术语 `<dt>` 可以同时有多个描述 `<dd>`，比如说：

- 旁白

  戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。写作中，指与当前主题相关的一段内容，通常不适于直接置于内容主线中，因此置于附近的其它位置（通常位于主线内容旁边一个文本框内）。

---

### 主动学习：标记一组定义

现在是时候尝试一下描述列表了; 在输入区域的原始文本里添加相应的元素，使得它在输出区域是以描述列表的形式出现。如果你喜欢，你也可以使用你自己的描述术语和描述。

如果你做错了，你可以随时点击【重置】按钮。如果实在进行不下去，可以点击【显示答案】。

<iframe class="sample-code-frame" title="主动学习：标记一组定义 sample" id="frame_主动学习：标记一组定义" width="700" height="500" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting/_sample_.%E4%B8%BB%E5%8A%A8%E5%AD%A6%E4%B9%A0%EF%BC%9A%E6%A0%87%E8%AE%B0%E4%B8%80%E7%BB%84%E5%AE%9A%E4%B9%89.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

## 2.引用

HTML 也有用于标记引用的特性，至于使用哪个元素标记，取决于你引用的是一块还是一行。

---

### 块引用

如果一个块级内容（一个段落、多个段落、一个列表等）从其他地方被引用，你应该把它用[`<blockquote>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote)元素包裹起来表示，并且在[`cite`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote#attr-cite)属性里用 URL 来指向引用的资源。例如，下面的例子就是引用的 MDN 的`<blockquote>`元素页面：

```html
<p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
```

要把这些转换为块引用，我们要这样做：

```html
<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
  Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
</blockquote>
```

浏览器在渲染块引用时默认会增加缩进，作为引用的一个指示符；MDN 是这样做的，但是也增加了额外的样式：

> The **HTML `<blockquote>` Element** (or *HTML Block Quotation Element*) indicates that the enclosed text is an extended quotation.

---

### 行内引用

行内元素用同样的方式工作，除了使用[`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q)元素。例如，下面的标记包含了从 MDN`<q>`页面的引用：

```html
<p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended
for short quotations that don't require paragraph breaks.</q></p>
```

浏览器默认将其作为普通文本放入引号内表示引用，就像下面：

<iframe class="sample-code-frame" title="行内引用 sample" id="frame_行内引用" width="100%" height="78px" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting/_sample_.%E8%A1%8C%E5%86%85%E5%BC%95%E7%94%A8.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

---

### 引文

[`cite`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote#attr-cite)属性内容不会被浏览器显示、屏幕阅读器阅读，需使用 JavaScript 或 CSS，浏览器才会显示`cite`的内容。如果你想要确保引用的来源在页面上是可显示的，更好的方法是为[`<cite>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/cite)元素附上链接：

```html
<p>According to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
<cite>MDN blockquote page</cite></a>:
</p>

<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
  Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
</blockquote>

<p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended
for short quotations that don't require paragraph breaks.</q> -- <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">
<cite>MDN q page</cite></a>.</p>
```

引文默认的字体样式为斜体。你可以在[quotations.html](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/advanced-text-formatting/quotations.html)中参看代码。

---

### 主动学习：是谁说的？

到了主动学习的时间！在这个例子中我们想要你：

1. 把中间的段落变成块引用，它要包含`cite`属性
2. 把第三个段落的一部分变成行内引用，它要包含`cite`属性
3. 每一个引用都要包含`<cite>`元素

你需要的引用源：

- `http://www.brainyquote.com/quotes/authors/c/confucius.html` 对应 "孔子曰"。
- `http://www.affirmationsforpositivethinking.com/` 对应 "不要说泄气的话"。

如果你做错了，你可以随时点击【重置】按钮。如果实在进行不下去，可以点击【显示答案】。

<iframe class="sample-code-frame" title="主动学习：是谁说的？ sample" id="frame_主动学习：是谁说的？" width="700" height="450" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting/_sample_.%E4%B8%BB%E5%8A%A8%E5%AD%A6%E4%B9%A0%EF%BC%9A%E6%98%AF%E8%B0%81%E8%AF%B4%E7%9A%84%EF%BC%9F.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

---

## 3.缩略语

另一个你在 web 上看到的相当常见的元素是[`<abbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/abbr)——它常被用来包裹一个缩略语或缩写，并且提供缩写的解释（包含在[`title`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#title)属性中）。让我们看看下面两个例子：

```html
<p>我们使用 <abbr title="超文本标记语言（Hyper text Markup Language）">HTML</abbr> 来组织网页文档。</p>

<p>第 33 届 <abbr title="夏季奥林匹克运动会">奥运会</abbr> 将于 2024 年 8 月在法国巴黎举行。</p>
```

这些代码的显示效果如下（当光标移动到项目上时会出现提示）：

我们使用 HTML 来组织网页文档。

第 33 届 奥运会 将于 2024 年 8 月在法国巴黎举行。

> **备注：** 还有另一个元素<acronym>，它基本上与<abbr>相同，专门用于首字母缩略词而不是缩略语。然而，这已经被废弃了 - 它在浏览器的支持中不如<abbr>，并且具有类似的功能，所以没有意义。只需使用<abbr>。

---

### 主动学习：标记一个缩略语

在这个简单的主动学习任务中，我们希望你简单地标记一个缩写。你可以使用下面的示例，或者用自己的示例来替换。

<iframe class="sample-code-frame" title="主动学习：标记一个缩略语 sample" id="frame_主动学习：标记一个缩略语" width="700" height="300" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting/_sample_.%E4%B8%BB%E5%8A%A8%E5%AD%A6%E4%B9%A0%EF%BC%9A%E6%A0%87%E8%AE%B0%E4%B8%80%E4%B8%AA%E7%BC%A9%E7%95%A5%E8%AF%AD.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

## 4.标记联系方式

HTML 有个用于标记联系方式的元素——[`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/address)。它仅仅包含你的联系方式，例如：

```html
<address>
  <p>Chris Mills, Manchester, The Grim North, UK</p>
</address>
```

但要记住的一点是，`<address>`元素是为了标记编写 HTML 文档的人的联系方式，而不是任何其他的内容。因此，如果这是 Chris 写的文档，上面的内容将会很好。注意，下面的内容也是可以的：

```html
<address>
  <p>Page written by <a href="../authors/chris-mills/">Chris Mills</a>.</p>
</address>
```

---

## 5.上标和下标

当你使用日期、化学方程式、和数学方程式时会偶尔使用上标和下标。[`<sup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sup) 和[`<sub>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sub)元素可以解决这样的问题。例如：

```html
<p>咖啡因的化学方程式是 C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>。</p>
<p>如果 x<sup>2</sup> 的值为 9，那么 x 的值必为 3 或 -3。</p>
```

这些代码输出的结果是：

![image-20221224224007762](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-20221224224007762.png)

---

## 6.展示计算机代码

有大量的 HTML 元素可以来标记计算机代码：

- [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/code): 用于标记计算机通用代码。
- [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre): 用于保留空白字符（通常用于代码块）——如果您在文本中使用缩进或多余的空白，浏览器将忽略它，您将不会在呈现的页面上看到它。但是，如果您将文本包含在`<pre></pre>`标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。
- [`<var>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/var): 用于标记具体变量名。
- [`<kbd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/kbd): 用于标记输入电脑的键盘（或其他类型）输入。
- [`<samp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/samp): 用于标记计算机程序的输出。

让我们看看一些例子。你应该尝试运行一下（尝试运行一下[other-semantics.html](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/advanced-text-formatting/other-semantics.html)样例文件的拷贝）：

上面的代码显示效果如下：

<iframe class="sample-code-frame" title="展示计算机代码 sample" id="frame_展示计算机代码" width="100%" height="300" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting/_sample_.%E5%B1%95%E7%A4%BA%E8%AE%A1%E7%AE%97%E6%9C%BA%E4%BB%A3%E7%A0%81.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

## 7.标记时间和日期

HTML 还支持将时间和日期标记为可供机器识别的格式的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) 元素。例如：

```html
<time datetime="2016-01-20">2016 年 1 月 20 日</time>
```

为什么需要这样做？因为世界上有许多种书写日期的格式，上边的日期可能被写成：

- 20 January 2016
- 20th January 2016
- Jan 20 2016
- 20/06/16
- 06/20/16
- The 20th of next month
- 20e Janvier 2016
- 2016 年 1 月 20 日
- And so on

但是这些不同的格式不容易被电脑识别 — 假如你想自动抓取页面上所有事件的日期并将它们插入到日历中，[`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) 元素允许你附上清晰的、可被机器识别的 时间/日期来实现这种需求。

---

## 8.总结

到这里你就完成了 HTML 语义文本元素的学习。但要记住，你在本课程中学到的并不是 HTML 文本元素的详细列表 — 我们想要尽量覆盖主要的、通用的、常见的，或者至少是有趣的部分。如果你想找到更多的 HTML 元素，可以看一看我们的[HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)（从 [内联文本语义](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#内联文本语义)部分开始会是一个好的选择） 。在下一篇文章中我们将会学习用来组织 HTML 文档不同部分的 HTML 元素。

---

# 🏀文档与网站架构

[HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML) 不仅能够定义网页的单独部分（例如“段落”或“图片”），还可以使用块级元素（例如“标题栏”、“导航菜单”、“主内容列”）来定义网站中的复合区域。本文将探讨如何规划基本的网站结构，并根据规划的结构来编写 HTML。

| 预备知识： | 阅读 [开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)、[HTML 文字处理初步](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals) 、[创建超链接](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)，掌握相关基础知识。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 会用语义标签来构建文档，会搭建简单的网站结构。               |

---

## 1.文档的基本组成部分

网页的外观多种多样，但是除了全屏视频或游戏，或艺术作品页面，或只是结构不当的页面以外，都倾向于使用类似的标准组件：

- 页眉

  通常横跨于整个页面顶部有一个大标题 和/或 一个标志。这是网站的主要一般信息，通常存在于所有网页。

- 导航栏

  指向网站各个主要区段的超链接。通常用菜单按钮、链接或标签页表示。类似于标题栏，导航栏通常应在所有网页之间保持一致，否则会让用户感到疑惑，甚至无所适从。许多 web 设计人员认为导航栏是标题栏的一部分，而不是独立的组件，但这并非绝对；还有人认为，两者独立可以提供更好的 [无障碍访问特性](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility)，因为屏幕阅读器可以更清晰地分辨二者。

- 主内容

  中心的大部分区域是当前网页大多数的独有内容，例如视频、文章、地图、新闻等。这些内容是网站的一部分，且会因页面而异。

- 侧边栏

  一些外围信息、链接、引用、广告等。通常与主内容相关（例如一个新闻页面上，侧边栏可能包含作者信息或相关文章链接），还可能存在其他的重复元素，如辅助导航系统。

- 页脚

  横跨页面底部的狭长区域。和标题一样，页脚是放置公共信息（比如版权声明或联系方式）的，一般使用较小字体，且通常为次要内容。还可以通过提供快速访问链接来进行 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)。

一个“典型的网站”可能会这样布局：

![一个简单站点首页截图](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/sample-website.png)

---

## 2.用于构建内容的 HTML

以上简单示例不是很精美，但是足够说明网站的典型布局方式了。一些站点拥有更多列，其中一些远比这复杂，但一切在你掌握之中。通过合适的 CSS，你可以使用相当多种的任意页面元素来环绕在不同的页面区域来做成你想要的样子，但如前所述，我们要敬畏语义，做到**正确选用元素**。

这是因为视觉效果并不是一切。我们可以修改最重要内容（例如导航菜单和相关链接）的颜色、字体大小来吸引用户的注意，但是这对视障人士是无效的，“粉红色”和“大字体”对他们并不奏效。

> **备注：** [全球色盲患者比例为 4%](http://www.color-blindness.com/2006/04/28/colorblind-population/)，换句话说，每 12 名男性就有一位色盲，每 200 名女性就有一位色盲。全盲和视障人士约占世界人口（[约 70 亿](https://en.wikipedia.org/wiki/World_human_population#/media/File:World_population_history.svg)）的 13％（2015 年 [全球约有 9.4 亿人口存在视力问题](https://en.wikipedia.org/wiki/Visual_impairment)）。

HTML 代码中可根据功能来为区段添加标记。可使用元素来无歧义地表示上文所讲的内容区段，屏幕阅读器等辅助技术可以识别这些元素，并帮助执行“找到主导航“或”找到主内容“等任务。参见前文所讲的 [页面中元素结构和语义不佳所带来的后果](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals#为什么我们需要结构化)。

为了实现语义化标记，HTML 提供了明确这些区段的专用标签，例如：

- [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header)：页眉。
- [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav)：导航栏。
- [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main)：主内容。主内容中还可以有各种子内容区段，可用[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 和 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 等元素表示。
- [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside)：侧边栏，经常嵌套在 [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) 中。
- [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer)：页脚。

---

### 主动学习：研究示例代码

上图的示例可用下面的代码表示（完整代码请参见 [GitHub](https://github.com/roy-tian/learning-area/blob/master/html/introduction-to-html/document-and-website-structure/index.html)），请结合图片观察代码，并找出代码中可见的区段：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>二次元俱乐部</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Sonsie+One" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=ZCOOL+KuaiLe" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
  </head>

  <body>
    <header> <!-- 本站所有网页的统一主标题 -->
      <h1>聆听电子天籁之音</h1>
    </header>

    <nav> <!-- 本站统一的导航栏 -->
      <ul>
        <li><a href="#">主页</a></li>
        <!-- 共 n 个导航栏项目，省略…… -->
      </ul>

      <form> <!-- 搜索栏是站点内导航的一个非线性的方式。 -->
        <input type="search" name="q" placeholder="要搜索的内容">
        <input type="submit" value="搜索">
      </form>
    </nav>

    <main> <!-- 网页主体内容 -->
      <article>
        <!-- 此处包含一个 article（一篇文章），内容略…… -->
      </article>

      <aside> <!-- 侧边栏在主内容右侧 -->
        <h2>相关链接</h2>
        <ul>
          <li><a href="#">这是一个超链接</a></li>
          <!-- 侧边栏有 n 个超链接，略略略…… -->
        </ul>
      </aside>
    </main>

    <footer> <!-- 本站所有网页的统一页脚 -->
      <p>© 2050 某某保留所有权利</p>
    </footer>
  </body>
</html>
```

请花一些时间来阅读，其中的注释应该能够帮助你理解这些代码。现在能够理解上面的代码就可以，因为编写一套正确的 HTML 结构是理解文档布局的前提，布局工作就交给 CSS 吧。在学习 CSS 一章时我们再展开介绍。

---

## 3.HTML 布局元素细节

理解所有 HTML 区段元素具体含义是很有益处的，这一点将随着个人 web 开发经验的逐渐丰富日趋显现。更多细节请查阅 [HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)。现在，你只需要理解以下主要元素的意义：

- [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) 存放每个页面独有的内容。每个页面上只能用一次 `<main>`，且直接位于 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 中。最好不要把它嵌套进其它元素。
- [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 包围的内容即一篇文章，与页面其它部分无关（比如一篇博文）。
- [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 与 `<article>` 类似，但 `<section>` 更适用于组织页面使其按功能（比如迷你地图、一组文章标题和摘要）分块。一般的最佳用法是：以 [标题](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Howto/Set_up_a_proper_title_hierarchy) 作为开头；也可以把一篇 `<article>` 分成若干部分并分别置于不同的 `<section>` 中，也可以把一个区段 `<section>` 分成若干部分并分别置于不同的 `<article>` 中，取决于上下文。
- [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside) 包含一些间接信息（术语条目、作者简介、相关链接，等等）。
- [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header) 是简介形式的内容。如果它是 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 的子元素，那么就是网站的全局页眉。如果它是 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 或[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 的子元素，那么它是这些部分特有的页眉（此 `<header>` 非彼 [标题](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#增加一个标题)）。
- [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav) 包含页面主导航功能。其中不应包含二级链接等内容。
- [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer) 包含了页面的页脚部分。

---

### 无语义元素

有时你会发现，对于一些要组织的项目或要包装的内容，现有的语义元素均不能很好对应。有时候你可能只想将一组元素作为一个单独的实体来修饰来响应单一的用 [CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS) 或 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript)。为了应对这种情况，HTML 提供了 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 和 [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span) 元素。应配合使用 [`class`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#class) 属性提供一些标签，使这些元素能易于查询。

`<span>`是一个内联的（inline）无语义元素，最好只用于无法找到更好的语义元素来包含内容时，或者不想增加特定的含义时。例如：

```html
<p>国王喝得酩酊大醉，在凌晨 1 点时才回到自己的房间，踉跄地走过门口。<span class="editor-note">[编辑批注：此刻舞台灯光应变暗]</span>.</p>
```

这里，“编辑批注”仅仅是对舞台剧导演提供额外指引；没有具体语义。对于视力正常的用户，CSS 应将批注内容与主内容稍微隔开一些。

`<div>` 是一个块级无语义元素，应仅用于找不到更好的块级元素时，或者不想增加特定的意义时。例如，一个电子商务网站页面上有一个一直显示的购物车组件。

```html
<div class="shopping-cart">
  <h2>购物车</h2>
  <ul>
    <li>
      <p><a href=""><strong>银耳环</strong></a>：$99.95.</p>
      <img src="../products/3333-0985/" alt="Silver earrings">
    </li>
    <li>
      ...
    </li>
  </ul>
  <p>售价：$237.89</p>
</div>
```

这里不应使用 `<aside>`，因为它和主内容并没有必要的联系（你想在任何地方都能看到它）。甚至不能用 `<section>` ，因为它也不是页面上主内容的一部分。所以在这种情况下就应使用 `<div>`，为满足无障碍使用特征，还应为购物车的标题设置一个可读标签。

> **警告：**`<div>` 非常便利但容易被滥用。由于它们没有语义值，会使 HTML 代码变得混乱。要小心使用，只有在没有更好的语义方案时才选择它，而且要尽可能少用，否则文档的升级和维护工作会非常困难。

---

### 换行与水平分割线

有时会用到 [`<br>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) 和 [`<hr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/hr) 两个元素，需要介绍一下。

`<br>` 可在段落中进行换行；`<br>` 是唯一能够生成多个短行结构（例如邮寄地址或诗歌）的元素。比如：

```html
<p>从前有个人叫小高<br>
他说写 HTML 感觉最好<br>
但他写的代码结构语义一团糟<br>
他写的标签谁也懂不了。</p>
```

没有 `<br>` 元素，这段会直接显示在长长的一行中（如前文所讲，[HTML 会忽略大部分空格](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started#html中的空白)）；使用 `<br>` 元素，才使得诗看上去像诗：

从前有个人叫小高 他说写 HTML 感觉最好 但他写的代码结构语义一团糟 他写的标签谁也懂不了。

`<hr>` 元素在文档中生成一条水平分割线，表示文本中主题的变化（例如话题或场景的改变）。一般就是一条水平的直线。例如：

```html
<p>原来这唐僧是个慈悯的圣僧。他见行者哀告，却也回心转意道：“既如此说，且饶你这一次。再休无礼。如若仍前作恶，这咒语颠倒就念二十遍！”行者道：“三十遍也由你，只是我不打人了。”却才伏侍唐僧上马，又将摘来桃子奉上。唐僧在马上也吃了几个，权且充饥。</p>
<hr>
<p>却说那妖精，脱命升空。原来行者那一棒不曾打杀妖精，妖精出神去了。他在那云端里，咬牙切齿，暗恨行者道：“几年只闻得讲他手段，今日果然话不虚传。那唐僧已此不认得我，将要吃饭。若低头闻一闻儿，我就一把捞住，却不是我的人了。不期被他走来，弄破我这勾当，又几乎被他打了一棒。若饶了这个和尚，诚然是劳而无功也。我还下去戏他一戏。”</p>
```

将渲染成：

原来这唐僧是个慈悯的圣僧。他见行者哀告，却也回心转意道：“既如此说，且饶你这一次。再休无礼。如若仍前作恶，这咒语颠倒就念二十遍！”行者道：“三十遍也由你，只是我不打人了。”却才伏侍唐僧上马，又将摘来桃子奉上。唐僧在马上也吃了几个，权且充饥。

却说那妖精，脱命升空。原来行者那一棒不曾打杀妖精，妖精出神去了。他在那云端里，咬牙切齿，暗恨行者道：“几年只闻得讲他手段，今日果然话不虚传。那唐僧已此不认得我，将要吃饭。若低头闻一闻儿，我就一把捞住，却不是我的人了。不期被他走来，弄破我这勾当，又几乎被他打了一棒。若饶了这个和尚，诚然是劳而无功也。我还下去戏他一戏。”

---

## 4.[规划一个简单的网站](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#规划一个简单的网站)

---

# 🏀HTML 调试

HTML 优雅明了，但要是出了错，你会不会一头雾水呢，本节将介绍一些查找和修复 HTML 错误的工具。

| 预备知识： | 阅读并理解 [HTML 入门](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)、[HTML 文字处理初步](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals) 和 [创建超链接](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks) 等文章，熟悉 HTML 的基本概念。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 学习调试工具的基础用法，以查找 HTML 中的错误。               |

---

## 1.调试并不可怕

写代码通常都是按部就班的，但是一旦犯了错，可怕的代码问题就出现了：或彻底罢工，或得不到正确结果。比如，以下窗口显示了：用 [Rust](https://www.rust-lang.org/) 编写的一个小程序在 [编译](https://developer.mozilla.org/zh-CN/docs/Glossary/Compile) 时得到的出错信息：

![一个控制台窗口，显示了一个 rust 工程编译时的出错信息。（println 宏少一个引号）](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/error-message.png)

这里错误信息比较容易理解："unterminated double quote string"，即"双引号字符串未闭合"。错误列表中可以看到 `println!(Hello, world!");` 这里少一个双引号，然而当程序规模变大时，错误信息也会变得更复杂和更难解释，同时对于 Rust 新手而言，上述提示也是找不到北。

调试其实没有那么可怕，写代码和调试的关键其实是：熟悉语言本身和相关工具。

---

## 2.HTML 和调试

HTML 并不像 Rust 那么难以理解，浏览器并不会将 HTML 编译成其它形式，而是直接解析并显示结果（称之为解释，而非编译）。可以说 HTML 的 [元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Element) 语法比 Rust、[JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 或 [Python](https://developer.mozilla.org/zh-CN/docs/Glossary/Python) 这样“真正的编程语言”更容易理解。浏览器解析 HTML 的过程比编程语言的编译运行的过程要**宽松**得多，但这是一把双刃剑。

### 宽松的代码

宽松是什么意思呢？通常写错代码会带来以下两种主要类型的错误：

- **语法错误**：由于拼写错误导致程序无法运行，就像上面的 Rust 示例。通常熟悉语法并理解错误信息后很容易修复。
- **逻辑错误**：不存在语法错误，但代码无法按预期运行。通常逻辑错误比语法错误更难修复，因为无法得到指向错误源头的信息。

HTML 本身不容易出现语法错误，因为浏览器是以宽松模式运行的，这意味着即使出现语法错误浏览器依然会继续运行。浏览器通常都有内建规则来解析书写错误的标记，所以即使与预期不符，页面仍可显示出来。当然，是存在隐患的。

> **备注：** HTML 之所以以宽松的方式进行解析，是因为 Web 创建的初心就是：人人可发布内容，不去纠结代码语法。如果 Web 以严格的风格起步，也许就不会像今天这样流行了。

---

# 🏀测验：标记信件

写信是每个人的必备技能，它也是测验文本格式化技能的一个不错的办法呀！本次测验要求你为你一封写好的信做出标记，以测验你基础和高级的 HTML 文本格式化技能，包括超链接等等。此外将测验你对一些 HTML `<head>` 内容的熟悉程度。

| 预备知识： | 阅读并掌握以下文章的内容：[开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)、[“头”里有什么？HTML 元信息](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)、[HTML 文字处理初步](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)、[创建超链接](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)和[高级文字格式](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting)。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 测验对 HTML 文本格式和超链接基本和高级用法、HTML `<head>` 内容的理解程度。 |

---

## 1.起点

开始测验之前，请先下载信件的原始文本和 [CSS 代码](https://github.com/mdn/learning-area/blob/main/html/introduction-to-html/marking-up-a-letter-start/css.txt)。然后用文本编辑器（用 [CodePen](https://codepen.io/)、[jsFiddle](https://jsfiddle.net/) 或 [Glitch](https://glitch.com/) 等在线编辑工具亦可）创建一个新的 `.html` 文件来进行测验。

```
---原始文本---
Dr. Eleanor Gaye
Awesome Science faculty
University of Awesome
Bobtown, CA 99999,
USA
Tel: 123-456-7890
Email: no_reply@example.com

20 January 2016

Miss Eileen Dover
4321 Cliff Top Edge
Dover, CT9 XXX
UK


Re: Eileen Dover university application

Dear Eileen,

Thank you for your recent application to join us at the University of Awesome's science faculty to study as part of your PhD next year. I will answer your questions one by one, in the following sections.

Starting dates

We are happy to accommodate you starting your study with us at any time, however it would suit us better if you could start at the beginning of a semester; the start dates for each one are as follows:

First semester: 9 September 2016
Second semester: 15 January 2017
Third semester: 2 May 2017

Please let me know if this is ok, and if so which start date you would prefer.

You can find more information about important university dates on our website.


Subjects of study

At the Awesome Science Faculty, we have a pretty open-minded research facility — as long as the subjects fall somewhere in the realm of science and technology. You seem like an intelligent, dedicated researcher, and just the kind of person we'd like to have on our team. Saying that, of the ideas you submitted we were most intrigued by are as follows, in order of priority:

Turning H2O into wine, and the health benefits of Resveratrol (C14H12O3.)
Measuring the effect on performance of funk bassplayers at temperatures exceeding 30°C (86°F), when the audience size exponentially increases (effect of 3 × 103 increasing to 3 × 104.)
HTML and CSS constructs for representing musical scores.

So please can you provide more information on each of these subjects, including how long you'd expect the research to take, required staff and other resources, and anything else you think we'd need to know? Thanks.


Exotic dance moves

Yes, you are right! As part of my post-doctorate work, I did study exotic tribal dances. To answer your question, my favourite dances are as follows, with definitions:

Polynesian chicken dance
A little known but very influential dance dating back as far as 300BC, a whole village would dance around in a circle like chickens, to encourage their livestock to be "fruitful".
Icelandic brownian shuffle
Before the Icelanders developed fire as a means of getting warm, they used to practice this dance, which involved huddling close together in a circle on the floor, and shuffling their bodies around in imperceptibly tiny, very rapid movements. One of my fellow students used to say that he thought this dance inspired modern styles such as Twerking.
Arctic robot dance
An interesting example of historic misinformation, English explorers in the 1960s believed to have discovered a new dance style characterized by "robotic", stilted movements, being practiced by inhabitants of Northern Alaska and Canada. Later on however it was discovered that they were just moving like this because they were really cold.

For more of my research, see my exotic dance research page.

Yours sincerely,
Dr Eleanor Gaye

University of Awesome motto: "Be awesome to each other." -- The memoirs of Bill S Preston, Esq

```

```CSS
body {
  max-width: 800px;
  margin: 0 auto;
}

.sender-column {
  text-align: right;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.3em;
}

p,ul,ol,dl,address {
  font-size: 1.1em;
}

p, li, dd, dt, address {
  line-height: 1.5;
}
```

> **备注：** 如果你遇到了困难，请联系我们以寻求帮助——见本页面底部的[评估或进一步帮助](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter#评估或进一步帮助)。

## 2.项目概要

本项目中，你的任务为对一封大学内网信件进行标记，这封信是研究人员对一名学生有关申请博士学位问题的回复。

### 块/结构语义

- 你应该使用适当的结构来构造整体文档，包括 doctype、[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html)、[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head) 和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 元素。
- 除下面提到的几点之外，这封信应该被标记成有着段落和标题的结构。这封信有 1 个顶级标题（“Re:”那行）和 3 个二级标题。
- 使用适当类型的列表标记该学期的开学时间（the semester start dates）、学习科目（study subjects）和异域舞蹈（exotic dances）。
- 两个地址应该放在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/address) 元素下。每行的地址应该放在新的一行而不是新的段落。

### 内联语义

- 应着重显示发信人和收信人的姓名（以及“电话”（*Tel*）和“电子邮件”（*Email*）字样）。
- 用适当的元素把文档中的四个日期标记成机器可读的日期。
- 为信中第一个地址和第一个日期设置一个类属性“*sender-column*”，这样就能通过添加 CSS 来使它们右对齐，以符合经典信件的布局。
- 信件正文中有 5 个首字母缩略词/缩写词（PhD、HTML、CSS、BC、Esq），给出这些词语的英文全称。
- 正确标注 6 个下标/上标（位于化学方程式、科学计数法中）。
- 试着标记至少对两个单词进行着重（`<strong>`）/ 强调（`<em>`）显示。
- 有两个地方应加上超链接，要为它们添加适当的标题。链接指向 `https://example.com/` 即可。
- 用适当的元素标记校训和引文。

### 文档的头部

- 用适当的元标签把文档的字符集声明为 utf-8。
- 用适当的元标签说明信件的作者。
- 用适当的标签引入我们提供的 CSS 代码。

## 3.提示和技巧

- 使用 [W3C HTML 验证器](https://validator.w3.org/)来验证 HTML，验证通过有额外加分。
- 完成这个测验不需要任何 CSS 知识，只需把现成的 CSS 放到 HTML 元素里就好。

## 4.示例

以下截图展示了这封信标记完成后可能的外观。

![Example](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/letter-update.png)

---

# 🏀构建内容丰富的网页

构建页面内容是一项重要技能，页面构建清晰才能顺利交付进行 CSS 布局。本测验将测试你是否能构思出页面的最终外观，以及是否会选用适当的结构语义。

| 预备知识： | 完成本章之前的全部课程，特别是 [文档和站点结构](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 测验网页结构知识和用标记呈现预期布局设计的方法。             |

---

## 起点

开始测验前，请先下载 [assets.zip](https://raw.githubusercontent.com/roy-tian/learning-area/master/html/introduction-to-html/structuring-a-page-of-content-start/assets.zip)。其中包含：

- 需要补充结构标记的 HTML 文件。
- 给标记添加样式的 CSS 文件。
- 页面中使用的图片。

可在电脑上创建示例，也可以用 [JSBin](http://jsbin.com/) 或 [Glitch](https://glitch.com/) 等网站来完成测验。

## 项目简介

本项目的任务是为“观鸟网”的主页添加结构化的元素，使其可以进行布局设计。需要添加的有：

- 页眉（`<header>`），应充满页面宽度，并包含网站主标题、网站 logo 和导航栏菜单。样式生效后标题和 logo 应显示在在两边，导航栏在它们下方。
- 主内容区域（`<main>`），应有两栏，其中主区域显示欢迎信息，侧边栏包含一些缩略图。
- 页脚（`<footer>`），包含版权信息和鸣谢。

你应该为以下内容添加合适的标签：

- 页眉
- 导航菜单
- 主要内容
- 欢迎语
- 图片侧边栏
- 页脚

还应：

- 添加一个 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 元素把现成的 CSS 文件引入页面。

## 提示

- 可用 [W3C HTML 验证器](https://validator.w3.org/) 来验证 HTML；验证通过有额外加分。(有两行包含“googleapis”的 `<link>` 元素用于从 Google Fonts 服务引入自定义字体到页面；它们不会被验证，所以不用担心。)
- 本测验不需要任何 CSS 知识；只需用 HTML 元素添加现成的 CSS 即可。
- 现成的 CSS 已经设计好布局，使用正确的结构元素，页面就会渲染成绿色。
- 如果你遇到困难不知道应该把添加元素到哪里，通常一个好的做法是：画一个简单的页面布局模块图，然后为每个块记录下恰当的元素。

## 示例

以下截图展示了添加标记后主页可能的外观：（可 [在线查看](https://roy-tian.github.io/learning-area/html/introduction-to-html/structuring-a-page-of-content-finished/)）

![测试示例。一个简单的“观鸟网”主页，由页眉、页脚、欢迎信息、收藏照片等部分组成。](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/example-page.png)
