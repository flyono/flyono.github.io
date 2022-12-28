---
title: HTML——构建 Web(2)——多媒体与嵌入
date: 2022年12月28日13:32:00
tags: Web
categories: 前端笔记
description: Web入门教程
sticky: 3
---

# 🎈多媒体与嵌入概述

在这份教程中，到目前为止我们已经看到了许多的文字了。但是网页除了文本之外什么都没有，真的非常无聊，所以，让我们开始看看怎样用更多有趣的内容让网页动起来！本模块要探索怎样用 HTML 来让你的网页包含多媒体，包括可以包含图像的不同方式，以及怎样嵌入视频，甚至是整个其他的网页。

## 1.预备知识

在你开始本模块之前，你应该已经拥掌握了关于 HTML 的基础知识，就是之前在[HTML 简介](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML)中所述内容。如果你还没有看过那个模块（或者类似的），先去看看，然后再回来吧！

> **备注：** 如果你正在一台你不能创建文件的设备上作业，那么你需要在在线编程工具上运行（大多数）代码示例，如 [JSBin](http://jsbin.com/) 或 [Glitch](https://glitch.com/) 等。

---

## 2.指南

本模块包含以下的文章，你会了解到所有在网页上关于嵌入多媒体的基础知识。

- HTML 中的图片

  有一些其他类型的多媒体要考虑，但是从简单的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素开始是符合逻辑的，它常常被用来在网页中嵌入一个简单的图片。在这篇文章中，我们要看看怎样更深入的使用它，包括基础知识，使用 [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 来为图片增加说明，以及怎样把它关联到 CSS 背景图片。

- 视频和音频内容

  接下来，我们将看看怎样在我们的页面上用 HTML5 的 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 和[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 元素来嵌入视频和音频；包括基础知识，向不同的浏览器提供不同文件格式的访问方式，增加标题和副标题，以及增加对过时的浏览器的兼容。

- 从 `<object>` 到 `<iframe>` ——其他嵌入技术

  在这一节，我们将来了解一些另辟蹊径的内容，看一组元素，它们可以让你在页面中嵌入许多不同类型的内容： [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe), [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) 和 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object) 元素。`<iframe>` 用来嵌入其他网页，而另外两者可以帮助你嵌入 PDF, SVG, 甚至是 Flash——一种逐渐退出历史舞台的技术，不过也许你还是能时不时的看到它。

- 在页面中添加矢量图像

  矢量图像在一些特定场景中非常有用。不同于常见的格式，比如 PNG/JPG, 它们不会在放大的时候变得扭曲或者显示出像素格——它们可以在缩放时保持光滑。本文将为你介绍什么是矢量图像，以及如何在网页中添加流行的 [SVG](https://developer.mozilla.org/zh-CN/docs/Glossary/SVG) 格式图像。

- 响应式图片

  现在有许多不同的设备类型能够浏览网络——从手机到台式电脑——在现代网络世界中掌握的一个基本概念就是响应式设计。这是指创建可以自动更改其功能以适应不同屏幕尺寸，分辨率等的网页。稍后将在 CSS 模块中详细介绍这一点，但是现在我们将看看 HTML 可用于创建响应式图像的工具，包括 [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture) 元素。

---

## 3.测验

以下测验将测试你对上述指南中涵盖的 HTML 基础知识的理解：

- Mozilla 启动页面

  在这个测验中，我们将测试你对本模块文章中讨论的一些技巧的了解，让你将一些图像和视频添加到一个关于 Mozilla 的时髦的页面！

---

## 4.参见

- [在图像的顶部添加一个点阵图](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Howto/Add_a_hit_map_on_top_of_an_image)

  图像映射提供了一种机制，使图像的不同部分链接到不同的地方（想想地图，链接到有关你点击的每个不同国家的更多信息。）这种技术有时可能是有用的。

- [网络素质基础 2](https://mozilla.github.io/curriculum-final/web-lit-basics-two/session01-why-do-we-use-the-web.html#overview))

  一个优秀的 Mozilla 基础课程，探讨并测试了多媒体和嵌入模块中谈到的一些技巧。深入了解撰写网页的基础知识，设计无障碍，共享资源，使用在线媒体和开放工作。

---

# 🎈HTML 中的图片

在一开始时，Web 仅有文本，那真的是很无趣。幸运的是，没过多久网页上就能嵌入图片和其他有趣的内容了。虽然还有许多其他类型的多媒体，但是从地位比较低的[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)元素开始是符合逻辑的，它常常被用来在网页中嵌入一张简单的图片。在这篇文章中，我们将看到怎样深入的使用它，包括基本的用[`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure)来添加说明文字，以及怎样把它和 CSS 背景图片链接起来。

| 预备知识：     | 掌握基本的电脑知识，[安装基本软件](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Installing_basic_software)，基本的[文件处理](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Dealing_with_files)知识，熟悉[HTML 基础](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started) |
| :------------- | ------------------------------------------------------------ |
| **学习目标：** | **学习如何在 HTML 页面插入简单的图片，为图片添加简单的说明，以及 CSS 背景图片与 HTML 图片的关系。** |

---

## 1.怎样将一幅图片放到网页上？

我们可以用`<img>`元素来把图片放到网页上。它是一个空元素（它不需要包含文本内容或闭合标签），最少只需要一个 `src` （一般读作其全称 *source*）来使其生效。`src` 属性包含了指向我们想要引入的图片的路径，可以是相对路径或绝对 URL，就像 `<a>` 元素的 `href` 属性一样。

> **备注：** 在继续之前，你应该阅读[快速入门 URL 和路径](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#urls与路径(path)快速入门) 来复习一下相对和绝对 URL。

举个例子来看，如果你有一幅文件名为 `dinosaur.jpg` 的图片，且它与你的 HTML 页面存放在相同路径下，那么你可以这样嵌入它：

```html
<img src="dinosaur.jpg">
```

如果这张图片存储在和 HTML 页面同路径的 `images` 文件夹下（这也是 Google 推荐的做法，利于[SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)/索引），那么你可以采用如下形式：

```html
<img src="images/dinosaur.jpg">
```

以此类推。

> **备注：** 搜索引擎也读取图像的文件名并把它们计入 SEO。因此你应该给你的图片取一个描述性的文件名：`dinosaur.jpg` 比 `img835.png` 要好。

你也可以像下面这样使用绝对路径：

```html
<img src="https://www.example.com/images/dinosaur.jpg">
```

但是这种方式是不被推荐的，这样做只会使浏览器做更多的工作，例如重新通过 DNS 再去寻找 IP 地址。通常我们都会把图片和 HTML 放在同一个服务器上。

我们上面的代码会展示如下的结果页面：

![A basic image of a dinosaur, embedded in a browser, with Images in HTML written above it](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/basic-image.png)

> **备注：** 像[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)和[`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)这样的元素有时被称之为**替换元素**，因为这样的元素的内容和尺寸由外部资源（像是一个图片或视频文件）所定义，而不是元素自身。

> **备注：** 你可以在[GitHub 上的这个网页](https://mdn.github.io/learning-area/html/multimedia-and-embedding/images-in-html/index.html)看到这个例子的运行结果（也可以看到[源码](https://github.com/mdn/learning-area/blob/master/html/multimedia-and-embedding/images-in-html/index.html)）。

---

### 备选文本

下一个我们讨论的属性是 `alt` ，它的值应该是对图片的文字描述，用于在图片无法显示或不能被看到的情况。例如，上面的例子可以做如下改进：

```html
<img src="images/dinosaur.jpg"
     alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth">
```

测试`alt` 属性最简单的方式就是故意拼错图片文件名，这样浏览器就无法找到该图片从而显示备选的文本。如果我们将上例的图片文件名改为 `dinosooooor.jpg`，浏览器就不能显示图片，而显示：

![The Images in HTML title, but this time the dinosaur image is not displayed, and alt text is in its place.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/alt-text.png)

那么，为什么我们需要备选文本呢？它可以派上用场的原因有很多：

- 用户有视力障碍，通过[屏幕阅读器](https://zh.wikipedia.org/wiki/螢幕閱讀器)来浏览网页。事实上，给图片一个备选的描述文本对大多数用户都是很有用的。
- 就像上面所说的，你也许会把图片的路径或文件名拼错。
- 浏览器不支持该图片类型。某些用户仍在使用纯文本的浏览器，例如 [Lynx](https://en.wikipedia.org/wiki/Lynx_(web_browser))，这些浏览器会把图片替换为描述文本。
- 你会想提供一些文字描述来给搜索引擎使用，例如搜索引擎可能会将图片的文字描述和查询条件进行匹配。
- 用户关闭的图片显示以减少数据的传输，这在手机上是十分普遍的，并且在一些国家带宽有限且昂贵。

你到底应该在 `alt` 里写点什么呢？这首先取决于为什么这张图片会在这儿，换句话说，如果这张图片没显示出来，会少了什么：

- **装饰：** 如果图片只是用于装饰，而不是内容的一部分，可以写一个空的`alt=""` 。例如，屏幕阅读器不会浪费时间对用户读出不是核心需要的内容。实际上装饰性图片就不应该放在 HTML 文件里， [CSS 背景图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML#css_背景图片)才应该用于插入装饰图片，但如果这种情况无法避免， `alt=""`会是最佳处理方案。
- **内容：** 如果你的图片提供了重要的信息，就要在`alt`文本中简要的提供相同的信息，甚至更近一步，把这些信息写在主要的文本内容里，这样所有人都能看见。不要写冗余的备选文本（如果在主要文本中将所有的段落都重复两遍，对于没有失明的用户来说多烦啊！），如果在主要文本中已经对图片进行了充分的描述，写`alt=""`就好。
- **链接：** 如果你把图片嵌套在[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)标签里，来把图片变成链接，那你还必须[提供无障碍的链接文本](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#用清晰的链接措辞。)。在这种情况下，你可以写在同一个`<a>`元素里，或者写在图片的`alt`属性里，随你喜欢。
- **文本：** 你不应该将文本放到图像里。例如，如果你的主标题需要有阴影，你可以[用 CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)来达到这个目的，而不是把文本放到图片里。如果真的必须这么做，那就把文本也放到`alt`里。

本质上，关键在于在图片无法被看见时也提供一个可用的体验，这确保了所有人都不会错失一部分内容。尝试在浏览器中使图片不可见然后看看网页变成什么样了，你会很快意识到在图片无法显示时备选文本能帮上多大忙。

---

### 宽度和高度

你可以用宽度和高度属性来指定你的图片的高度和宽度（你可以用多种方式找到你的图片的宽度和高度，例如在 Mac 上，你可以用 `Cmd + I` 来得到显示的图片文件的信息）回到我们的例子，你可以这样做：

```html
<img src="images/dinosaur.jpg"
     alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。"
     width="400"
     height="341">
```

在正常的情况下，这不会对显示产生很大的影响，但是如果图片没有显示（例如用户刚刚开始浏览网页，但是图片还没有加载完成），你会注意到浏览器会为要显示的图片留下一定的空间：

![The Images in HTML title, with dinosaur alt text, displayed inside a large box that results from width and height settings](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/alt-text-with-width-height.png)

这是一件好事情——这使得页面加载的更快速更流畅。

然而，你不应该使用 HTML 属性来改变图片的大小。如果你把尺寸设定的太大，最终图片看起来会模糊；如果太小，会在下载远远大于你需要的图片时浪费带宽。如果你没有保持正确的宽高比，图片可能看起来会扭曲。在把图片放到你的网站页面之前，你应该使用图形编辑器使图片的尺寸正确。

> **备注：** 如果你需要改变图片的尺寸，你应该使用[CSS](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)而不是 HTML。

---

### Image titles 图片标题

类似于[超链接](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#使用添加支持信息)，你可以给图片增加`title`属性来提供需要更进一步的支持信息。在我们的例子中，可以这样做：

```html
<img src="images/dinosaur.jpg"
     alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。"
     width="400"
     height="341"
     title="A T-Rex on display in the Manchester University Museum">
```

这会给我们一个鼠标悬停提示，看起来就像链接标题：

![The dinosaur image, with a tooltip title on top of it that reads A T-Rex on display at the Manchester University Museum ](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/image-with-title.png)

图片标题并不必须要包含有意义的信息，通常来说，将这样的支持信息放到主要文本中而不是附着于图片会更好。不过，在有些环境中这样做更有用，比如当没有空间显示提示时，也就是在图片栏中。

然而，这并不是推荐的——title 有很多易访问性问题，主要是基于这样一个事实，即屏幕阅读器的支持是不可预测的，大多数浏览器都不会显示它，除非您在鼠标悬停时（例如：title 无法访问键盘用户），如果你对更多的信息感兴趣，阅读[The Trials and Tribulations of the Title Attribute](https://www.24a11y.com/2017/the-trials-and-tribulations-of-the-title-attribute/) by Scott O'Hara.

---

### 动手练习：嵌入一张图片

好，轮到你了！在这个动手练习中，我们希望你可以做一个简单的嵌入图片练习。你有一个基本的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 标签; 我们希望你可以把下面这个 URL 所指向的图片嵌入到 HTML 中：

```
https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg
```

之前我们说过永远不要从其他服务器热链接图片，但这次只是出于学习目的，所以我们会允许你这么做一次。

我们还希望你可以：

- 添加 `alt`文字，添加完成后，可以故意把 URL 写错，来检查 `<alt>` 的效果。
- 设置图片正确的 `width` 和 `height` 属性（提示：宽 200px，高 171px），然后再将宽和高的值进行改变，看看会有什么影响。
- 在图片上设置 `title` 属性。

如果你遇到了错误，你可以按 reset 按钮来重置。如果你遇到了困难无法完成，按下 显示答案 按钮来看一下答案。

<iframe class="sample-code-frame" title="动手练习：嵌入一张图片 sample" id="frame_动手练习：嵌入一张图片" width="700" height="500" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML/_sample_.%E5%8A%A8%E6%89%8B%E7%BB%83%E4%B9%A0%EF%BC%9A%E5%B5%8C%E5%85%A5%E4%B8%80%E5%BC%A0%E5%9B%BE%E7%89%87.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

## 2.通过为图片搭配说明文字的方式来解说图片

说到说明文字，这里有很多种方法让你添加一段说明文字来搭配图片。比如，没有人会阻止你这么做：

```html
<div class="figure">
  <img src="/images/dinosaur_small.jpg"
     alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。"
     width="400"
     height="341">
  <p>曼彻斯特大学博物馆展出的一只霸王龙的化石</p>
</div>
```

有一个更好的做法是使用 HTML5 的 [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 和 [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption) 元素，它正是为此而被创造出来的：为图片提供一个语义容器，在标题和图片之间建立清晰的关联。我们之前的例子可以重写为：

```html
<figure>
  <img src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg"
      alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。"
      width="400"
      height="341">
  <figcaption>曼彻斯特大学博物馆展出的一只霸王龙的化石</figcaption>
</figure>
```

这个 [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption) 元素 告诉浏览器和其他辅助的技术工具这段说明文字描述了 [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 元素的内容。

> **备注：** 从无障碍的角度来说，说明文字和 [`alt`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-alt) 文本扮演着不同的角色。看得见图片的人们同样可以受益于说明文字，而 [`alt`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-alt) 文字只有在图片无法显示时才这样。所以，说明文字和 `alt` 的内容不应该一样，因为当图片无法显示时，它们会同时出现。尝试让你的图片不显示，看看效果如何。

注意 [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 里不一定要是一张图片，只要是一个这样的独立内容单元：

- 用简洁、易懂的方式表达意图。
- 可以置于页面线性流的某处。
- 为主要内容提供重要的补充说明。

`<figure>` 可以是几张图片、一段代码、音视频、方程、表格或别的。

---

### 动手练习：创建一个 figure

在这个动手练习的部分中，我们希望你把本章节中的上一个动手练习完成的代码拿过来，把它转换为一个 figure:

- 把之前的代码放入 [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) 元素中。
- 将 `title` 属性的文本复制出来，删除 `title` 元素，然后把文字放入 [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption) 元素中，当然这个元素在 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 的下面。

如果你遇到了错误，你可以按 reset 按钮来重置。如果你遇到了困难无法完成，按下 Show solution 按钮来看一下答案。

<iframe class="sample-code-frame" title="动手练习：创建一个 figure sample" id="frame_动手练习：创建一个_figure" width="700" height="500" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML/_sample_.%E5%8A%A8%E6%89%8B%E7%BB%83%E4%B9%A0%EF%BC%9A%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA_figure.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

## 3.CSS 背景图片

你也可以使用 CSS 把图片嵌入网站中（JavaScript 也行，不过那是另外一个故事了），这个 CSS 属性 [`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image) 和另其他 `background-*` 属性是用来放置背景图片的。比如，为页面中的所有段落设置一个背景图片，你可以这样做：

```css
p {
  background-image: url("images/dinosaur.jpg");
}
```

按理说，这种做法相对于 HTML 中插入图片的做法，可以更好地控制图片和设置图片的位置，那么为什么我们还要使用 HTML 图片呢？如上所述，CSS 背景图片只是为了装饰 — 如果你只是想要在你的页面上添加一些漂亮的东西，来提升视觉效果，那 CSS 的做法是可以的。但是这样插入的图片完全没有语义上的意义，它们不能有任何备选文本，也不能被屏幕阅读器识别。这就是 HTML 图片有用的地方了。

**总而言之，如果图像对您的内容里有意义，则应使用 HTML 图像。如果图像纯粹是装饰，则应使用 CSS 背景图片。**

> **备注：** 你可以在 [CSS](https://developer.mozilla.org/zh-CN/docs/Learn/CSS) 模块里学到更多关于[CSS 背景图片](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders)的东西。

---

## 总结

目前到此为止，我们详细介绍了图片和说明文字，在下篇文章中，我们将进一步看看如何使用 HTML 在网页上嵌入音频和视频。

---

# 🎈视频和音频内容

现在我们可以轻松的为一个网页添加简单的图像，下一步我们开始为 HTML 文档添加音频和视频播放器。在这篇文章中，我们会使用 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 和 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 元素来做到这件事；然后我们还会看看如何为你的视频添加字幕。

| 预备知识： | 基础计算机能力，[基础的软件安装](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Installing_basic_software)，基础的[文件处理](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Dealing_with_files)知识，基础的 HTML 知识 (阅读 [开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started) ) 以及 [HTML 中的图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 学习如何在一个网页中嵌入音频和视频，以及如何为视频添加字幕。 |

---

## 1.web 中的音频和视频

web 开发者们一直以来想在 Web 中使用音频和视频，自 21 世纪初以来，我们的带宽开始能够支持任意类型的视频（视频文件比文本和图片要大的多）。在早些时候，传统的 web 技术（如 HTML）不能够在 Web 中嵌入音频和视频，所以一些像 [Flash](https://en.wikipedia.org/wiki/Adobe_Flash) (后来有 [Silverlight](https://en.wikipedia.org/wiki/Microsoft_Silverlight) ) 的专利技术在处理这些内容上变得很受欢迎。这些技术能够正常的工作，但是却有着一系列的问题，包括无法很好的支持 HTML/CSS 特性、安全问题，以及可行性问题。

传统的解决方案能够解决许多这样的问题，前提是它能够正确的工作。幸运的是，几年之后 [HTML5](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML5) 标准提出，其中有许多的新特性，包括 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 和 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 标签，以及一些 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 和 [APIs](https://developer.mozilla.org/zh-CN/docs/Glossary/API) 用于对其进行控制。在这里，我们不讨论有关 JavaScript 的问题，仅仅讲解有关 HTML 的基础。

我们不会教你如何制作音频和视频，因为那需要完全不同的技术。我们已经为你的试验提供了一些视频和音频的文件（ [sample audio and video files and example code](https://github.com/mdn/learning-area/tree/master/html/multimedia-and-embedding/video-and-audio-content) ），以防止你自己没有。

> **备注：** 在你开始之前，你应当了解一些 OVPs (在线视频提供商) 例如 [YouTube](https://www.youtube.com/) 、[Dailymotion](http://www.dailymotion.com/) 、[Vimeo](https://vimeo.com/)、[Bilibili](https://www.bilibili.com/)等，以及在线音频提供商例如 [Soundcloud](https://soundcloud.com/)。这些公司提供方便、简单的方式来支持视频，所以你不必担心庞大的带宽消耗。OVPS 甚至提供现成的代码用于为你的 web 网页嵌入视频/音频。如果你使用这样的服务，你便可以避免在这篇文章中我们将讨论的一些难题。在下一篇文章中，我们将会再讨论这样的服务。

---

### `<video>`元素

`<video>` 允许你轻松地嵌入一段视频。一个简单的例子如下：

```html
<video src="rabbit320.webm" controls>
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

当中的一些属性如下：

- [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-src)

  同 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 标签使用方式相同，`src` 属性指向你想要嵌入网页当中的视频资源，他们的使用方式完全相同。

- [`controls`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-controls)

  用户必须能够控制视频和音频的回放功能。你可以使用 `controls` 来包含浏览器提供的控件界面，同时你也可以使用合适的 [JavaScript API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 创建自己的界面。界面中至少要包含开始、停止以及调整音量的功能。

- `<video>` 标签内的内容

  这个叫做**后备内容** — 当浏览器不支持 `<video>` 标签的时候，就会显示这段内容，这使得我们能够对旧的浏览器提供回退内容。你可以添加任何后备内容，在这个例子中我们提供了一个指向这个视频文件的链接，从而使用户至少可以访问到这个文件，而不会局限于浏览器的支持。

已嵌入视频文件的网页样式如下：

![A simple video player showing a video of a small white rabbit](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/simple-video.png)

你可以点击[这里](https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/simple-video.html)查看网页，或者点击[这里](https://github.com/mdn/learning-area/blob/master/html/multimedia-and-embedding/video-and-audio-content/simple-video.html)查看源代码。

---

### 使用多个播放源以提高兼容性

以上的例子中有一个问题，你可能已经注意到了，如果你尝试使用像 Safari 或者 Internet Explorer 这些浏览器来访问上面的链接。视频并不会播放，这是因为不同的浏览器对视频格式的支持不同。幸运的是，你有办法防止这个问题发生。

#### 媒体文件的内容

我们先来快速的了解一下术语。像 MP3、MP4、WebM 这些术语叫做[容器格式](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Containers)。他们定义了构成媒体文件的音频轨道和视频轨道的储存结构，其中还包含描述这个媒体文件的元数据，以及用于编码的编码译码器等等。

一个格式为 WebM 的电影包含视频轨道，音频轨道和文本轨道，其中视频轨道包含一个主视频轨道和一个可选的 Angle 轨道；音频轨道包含英语和西班牙语的音频轨道，还有一个英语评论的音频轨道；文字轨道包含英语和西班牙语的字幕轨道，如下图所示：

![Diagram conceptualizing the contents of a media file at the track level.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/containersandtracks.png)

为了编解码器（codec）编码媒体，容器中的音频和视频轨道以适合的格式保存。音频轨道和视频轨道使用不同的格式。每个音频轨道都使用[音频编解码器 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs)进行编码，而视频轨道则使用（您可能已经猜到了）[视频编解码器](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Video_codecs)进行编码。如前所述，不同的浏览器支持不同的视频和音频格式，以及不同的容器格式（如 MP3、MP4 和 WebM，这些格式又可以包含不同类型的视频和音频）。

例如：

- WebM 容器通常包括了 Opus 或 Vorbis 音频和 VP8/VP9 视频。这在所有的现代浏览器中都支持，除了他们的老版本。
- MP4 容器通常包括 AAC 以及 MP3 音频和 H.264 视频。这在所有的现代浏览器中都支持，还有 Internet Explorer。
- 老式的 Ogg 容器往往支持 Ogg Vorbis 音频和 Ogg Theora 视频。主要在 Firefox 和 Chrome 当中支持，不过这个容器已经被更强大的 WebM 容器所取代。

有一些特殊情况。例如，对于某些类型的音频，通常编解码器的数据存储没有容器或简化容器。其中一个例子就是 FLAC 编解码器，它通常存储在 FLAC 文件中，FLAC 文件只是 FLAC 的原始轨迹。

另一种情况是一直流行的 MP3 文件。“MP3 文件”实际上是存储在 MPEG 或 MPEG-2 容器中的 MPEG-1 音频层 III（MPEG-1 Audio Layer III，MP3）音频轨道。这一点特别有趣，因为尽管大多数浏览器不支持在[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)和[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)元素中使用 MPEG 媒体，但由于 MP3 的流行，它们可能仍然支持 MP3。

音频播放器将会直接播放音频文件，例如 MP3 和 Ogg 文件。这些不需要容器。

#### 浏览器所支持的媒体文件

你也许会疑惑为什么会有这样的情况存在。**MP3** (音频格式) 和 **MP4/H.264** (视频格式) 是被广泛支持的两种格式，并且质量良好。然而，他们却有专利的阻碍 — MP3 的专利会持续到 2017 年，而 H.264 会持续到 2027 年早期。意思也就是说浏览器若想要支持这些格式，就得支付高额的费用。此外，许多人反对软件技术垄断，支持开放的格式。这就是为什么我们需要准备不同的格式来兼容不同的浏览器。

刚刚所说的格式主要用于将音频和视频压缩成可管理的文件（原始的音频和视频文件非常大）。浏览器包含了不同的 **[Codecs](https://developer.mozilla.org/zh-CN/docs/Glossary/Codec)**,，如 Vorbis 和 H.264，它们用来将已压缩的音频和视频转化成二进制数字。不同的编码器和不同的容器都有各自的优缺点，在你更了解它们后，你可以自己选择使用哪个编码器和容器。

浏览器并不全支持相同的 codecs，所以你得使用几个不同格式的文件来兼容不同的浏览器。如果你使用的格式都得不到浏览器的支持，那么媒体文件将不会播放。

要使你的媒体文件在不同平台，不同设备的浏览器上都可观看，这需要多种编码器组合使用，但是这是一种非常麻烦的事，所以可以参考[Media container formats (file types)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers) 中的 [Choosing the right container](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers#choosing_the_right_container)来选择最适合的容器格式，同样的，参考[Web video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs) 中的 [Choosing a video codec](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#choosing_a_video_codec)和[Web audio codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs) 中的 [Choosing an audio codec](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs#choosing_an_audio_codec)选择编码格式

需要记住的另一件事：同一款浏览器，移动版与桌面版支持的格式可能会有不同。最重要的是，它们都可以减轻媒体播放的处理负担（对于所有媒体或仅针对其内部无法处理的特定类型）。这意味着设备的媒体支持还部分取决于用户安装了什么软件。

<!-- 注：这并没有那么简单，你可以从这里看到 [音视频编码兼容表 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats#浏览器兼容情况)。此外，许多移动平台的浏览器能够播放一些不支持的格式，但是它们用的却是底层系统的媒体播放器。但这也仅是现在支持。-->

我们该怎么做呢？请看如下例子（你可以点击这里[查看](https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/multiple-video-formats.html)网页，或者点击这里[查看](https://github.com/mdn/learning-area/blob/gh-pages/html/multimedia-and-embedding/video-and-audio-content/multiple-video-formats.html)源代码）：

```html
<video controls>
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

现在我们将 `src` 属性从 `<video>` 标签中移除，转而将它放在几个单独的标签 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source) 当中。在这个例子当中，浏览器将会检查 `<source>` 标签，并且播放第一个与其自身 codec 相匹配的媒体。你的视频应当包括 WebM 和 MP4 两种格式，这两种在目前已经足够支持大多数平台和浏览器。

每个 `<source>` 标签页含有一个 `type` 属性，这个属性是可选的，但是建议你添加上这个属性 — 它包含了视频文件的 [MIME types](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type) ，同时浏览器也会通过检查这个属性来迅速的跳过那些不支持的格式。如果你没有添加 `type` 属性，浏览器会尝试加载每一个文件，直到找到一个能正确播放的格式，这样会消耗掉大量的时间和资源。

> **备注：** 你可以在这里（[HTML 媒体格式支持 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats)）查看有关 [MIME types](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type) 的支持。

---

### 其他  `<video>` 特性

这里有许多你可以用在 HTML5 `<video>` 上的特性，请看我们的第三个例子：

```html
<video controls width="400" height="400"
       autoplay loop muted
       poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

这串代码将会给我们呈现出如下页面：

![A video player showing a poster image before it plays. The poster image says HTML5 video example, OMG hell yeah!](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/poster_screenshot_updated.png)

#### 新的特性：

- [`width`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-height)

  你可以用属性控制视频的尺寸，也可以用 [CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS) 来控制视频尺寸。无论使用哪种方式，视频都会保持它原始的长宽比 — 也叫做**纵横比**。如果你设置的尺寸没有保持视频原始长宽比，那么视频边框将会拉伸，而未被视频内容填充的部分，将会显示默认的背景颜色。

- [`autoplay`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-autoplay)

  **这个属性会使音频和视频内容立即播放，即使页面的其他部分还没有加载完全。建议不要应用这个属性在你的网站上，因为用户们会比较反感自动播放的媒体文件。**

- [`loop`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-loop)

  这个属性可以让音频或者视频文件循环播放。同样不建议使用，除非有必要。

- [`muted`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-muted)

  这个属性会导致媒体播放时，默认关闭声音。

- [`poster`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-poster)

  这个属性指向了一个图像的 URL，这个图像会在视频播放前显示。通常用于粗略的预览或者广告。

- [`preload`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-preload)

  这个属性被用来缓冲较大的文件，有 3 个值可选：

  * `"none"` ：不缓冲
  * `"auto"` ：页面加载后缓存媒体文件
  * `"metadata"` ：仅缓冲文件的元数据

你可以点击[这里](https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/extra-video-features.html)查看以上的例子，也可以点击[这里](https://github.com/mdn/learning-area/blob/gh-pages/html/multimedia-and-embedding/video-and-audio-content/extra-video-features.html)查看源代码。注意我们并没有使用 autoplay 属性在这个版本的例子中 — 如果当页面一加载就开始播放视频的话，就不会看到 poster 属性的效果了。

---

### `<audio>` 标签

`<audio>` 标签与 `<video>` 标签的使用方式几乎完全相同，有一些细微的差别比如下面的边框不同，一个典型的例子如下：

```html
<audio controls>
  <source src="viper.mp3" type="audio/mp3">
  <source src="viper.ogg" type="audio/ogg">
  <p>你的浏览器不支持 HTML5 音频，可点击<a href="viper.mp3">此链接</a>收听。</p>
</audio>
```

这串代码将会产生如下的效果：

![A simple audio player with a play button, timer, volume control, and progress bar](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/audio-player.png)

**备注：** 你可以点击这里[查看](https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/multiple-audio-formats.html)以上例子，或者点击[这里](https://github.com/mdn/learning-area/blob/gh-pages/html/multimedia-and-embedding/video-and-audio-content/multiple-audio-formats.html)查看源代码。

音频播放器所占用的空间比视频播放器要小，由于它没有视觉部件 — 你只需要显示出能控制音频播放的控件。一些与 HTML5 `<video>` 的差异如下：

- [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 标签不支持 `width`/`height` 属性 — 由于其并没有视觉部件，也就没有可以设置 `width`/`height` 的内容。
- 同时也不支持 `poster` 属性 — 同样，没有视觉部件。

除此之外，`<audio>` 标签支持所有 `<video>` 标签拥有的特性 — 你可以回顾上面的章节来了解更多的有关信息。

---

### 重新播放媒体

任何时候，你都可以在 JavaScript 中调用 [`load()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/load) 方法来重置媒体。如果有多个由 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source) 标签指定的媒体来源，浏览器会从选择媒体来源开始重新加载媒体。

```javascript
const mediaElem = document.getElementById("my-media-element");
mediaElem.load();
```

---

### 音轨增删事件

你可以监控媒体元素中的音频轨道，当音轨被添加或删除时，你可以通过监听相关事件来侦测到。具体来说，通过监听 [`AudioTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList) 对象的 `addtrack` 事件（即 [`HTMLMediaElement.audioTracks`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/audioTracks) 对象），你可以及时对音轨的增加做出响应。

```javascript
const mediaElem = document.querySelector("video");
mediaElem.audioTracks.onaddtrack = function(event) {
  audioTrackAdded(event.track);
}
```

你可以在我们的 [`TrackEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TrackEvent) 文档中找到更多有用的信息。

---

## 2.显示音轨文本

现在，我们将讨论一个略微先进的概念，这个概念将会十分的有用。许多人不想（或者不能）听到 Web 上的音频/视频内容，至少在某些情况下是这样的，比如：

- 许多人患有听觉障碍（通常来说是很难听清声音的人，或者聋人），所以他们不能听见音频中的声音。
- 另外的情况可能是由于人们并不能听音频，可能是因为他们在一个非常嘈杂的环境当中（比如在一个拥挤的酒吧内恰好赶上了球赛），也可能是由于他们并不想打扰到其他人（比如在一个十分安静的地方，例如图书馆）。
- 有一些人他们不说音频当中的语言，所以他们听不懂，因此他们想要一个副本或者是翻译来帮助他们理解媒体内容。

给那些听不懂音频语言的人们提供一个音频内容的副本岂不是一件很棒的事情吗？所以，感谢 HTML5 `<video>` 使之成为可能，有了 [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) 格式，你可以使用 [`<track>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track) 标签。

> **备注：** “副本”的意思是指，用文本记录下音频的内容。

WebVTT 是一个格式，用来编写文本文件，这个文本文件包含了众多的字符串，这些字符串会带有一些元数据，它们可以用来描述这个字符串将会在视频中显示的时间，甚至可以用来描述这些字符串的样式以及定位信息。这些字符串叫做 **cues** ，你可以根据不同的需求来显示不同的样式，最常见的如下：

- subtitles

  通过添加翻译字幕，来帮助那些听不懂外国语言的人们理解音频当中的内容。

- captions

  同步翻译对白，或是描述一些有重要信息的声音，来帮助那些不能听音频的人们理解音频中的内容。

- timed descriptions

  将文字转换为音频，用于服务那些有视觉障碍的人。

一个典型的 WebVTT 文件如下：

```
WEBVTT

1
00:00:22.230 --> 00:00:24.606
第一段字幕

2
00:00:30.739 --> 00:00:34.074
第二段

  ...
```

让其与 HTML 媒体一起显示，你需要做如下工作：

1. 以 .vtt 后缀名保存文件。
2. 用 [`<track>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track) 标签链接 .vtt 文件， `<track>` 标签需放在 `<audio>` 或 `<video>` 标签当中，同时需要放在所有 `<source>` 标签之后。使用 [`kind`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track#attr-kind) 属性来指明是哪一种类型，如 **subtitles、captions、descriptions**。然后，使用 [`srclang`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track#attr-srclang) 来告诉浏览器你是用什么语言来编写的 subtitles。

如下：

```html
<video controls>
    <source src="example.mp4" type="video/mp4">
    <source src="example.webm" type="video/webm">
    <track kind="subtitles" src="subtitles_en.vtt" srclang="en">
</video>
```

上面这串代码会显示一段带有字幕的视频，如下：

![Video player with stand controls such as play, stop, volume, and captions on and off. The video playing shows a scene of a man holding a spear-like weapon, and a caption reads "Esta hoja tiene pasado oscuro."](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/video-player-with-captions.png)

如果你想了解更多细节，你可以阅读 [Adding captions and subtitles to HTML5 video](https://developer.mozilla.org/zh-CN/docs/Web/Apps/Build/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)。在 Github 上你可以找到与本文相关的样例，他们由 Ian Devlin 编写，点击[这里](https://iandevlin.github.io/mdn/video-player-with-captions/)可以查看该样例，或者点击[这里](https://github.com/iandevlin/iandevlin.github.io/tree/master/mdn/video-player-with-captions)查看源代码。这个样例使用了 JavaScript 代码，它使得用户可以选择不同的字幕。注意，若想要显示字幕，你需要点击 "CC" 按钮，并且选择一种语言 — English, Deutsch, 或 Español。

> **备注：** 文本轨道会使你的网站更容易被搜索引擎抓取到（[SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)），由于搜索引擎的文本抓取能力非常强大，使用文本轨道甚至可以让搜索引擎通过视频的内容直接链接。

---

## 3.实践学习：在你的网站上嵌入你自己的视频或音频。

在这个实践学习当中，我们希望你能够走出去，并且记录一些你自己的视频或者音频 — 如今，大多数手机都能够非常方便的记录视频或者音频，并且你可以将他们上传到你的电脑上面，你可以使用这些功能来记录你的视频或音频。在这时候，你可能需要做一些格式转换，如果是视频的话，你需要将它们转化为 WebM 或者 MP4，如果是音频的话，你需要将它们转化为 MP3 或者 Ogg。不过你并不需要担心，有许多的程序都能够帮你解决这些问题，例如 [Miro Video Converter](http://www.mirovideoconverter.com/) 和 [Audacity](https://sourceforge.net/projects/audacity/)。我们非常希望你能够亲自动手实现它。

如果你无法取得任意的音频或者视频，你可以使用我们已经为你提供的样本（[sample audio and video files](https://github.com/mdn/learning-area/tree/master/html/multimedia-and-embedding/video-and-audio-content)）。同时你也可以使用我们的代码来作为参考。

我们希望你能够：

1. 将你的音频或者视频文件保存在你电脑上的一个新目录中。
2. 创建一个新的 HTML 文件在相同的路径下，命名为 index.html。
3. 在页面上添加 `<audio>` 和 `<video>` 标签；并使用浏览器默认的控件来显示它们。
4. 在当中添加 `<source>` 标签，并添加 `type` 属性，以便于浏览器能够找到其能够支持的格式并加载它。
5. 在 `<video>` 标签中添加 `poster` 属性，这会显示在视频播放之前。

另外，你可以尝试研究一下文本音轨，试着为你的视频添加一些字幕。

---

## 4.测试你的技能！

恭喜你，你已经完成了这篇教程的学习，但你是否还记得教程里最重要的内容呢？在继续之前，你可以通过一些测试来验证你是否已经掌握了这些内容，请参见[测试你的技能：内嵌多媒体](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content/Test_your_skills:_Multimedia_and_embedding)。需要注意倒是，这个测试中的第三个问题可能会需要一些之后讲到的技术，所以我们建议你尝试之前阅读一下[下一篇教程](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies)。

---

## 5.总结

我们祝愿你可以沉浸在 Web 网站的音频和视频当中，下一篇文章，我们将会学习到另外一种在 web 页面中嵌入内容的方法，比如使用 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 或者 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object)。

---

# 🎈从对象到 `iframe` - 其他嵌入技术

到目前为止，你应该掌握了将图像、视频和音频嵌入到网页上的诀窍了。此刻，让我们继续深入学习，来看一些能让你在网页中嵌入各种内容类型的元素：[`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe), [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) 和 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object) 元素。`<iframe>`用于嵌入其他网页，另外两个元素则允许你嵌入 PDF，SVG，甚至 Flash——一种正在被淘汰的技术，但你仍然会时不时的看到它。

| 预备知识： | 基本的计算机知识、[安装基础软件](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Installing_basic_software)、[文件处理](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Dealing_with_files)的基本知识、熟悉 HTML 基础知识（阅读 [开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)）以及本模块中以前的文章。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 要了解如何使用 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object)、[`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) 以及 [`<>iframe`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 元素，在网页中嵌入部件，例如 PDF 文档和其它外部网页。 |

---

## 1.嵌入的简史

很久以前，很流行在网络上使用**框架**创建网站——网站的一小部分存储于单独的 HTML 页面中。这些被嵌入在一个称为**框架集**的主文档中，它允许你指定每个框架能够填充在屏幕上的区域，非常像调整表格的列和行的大小。这些做法在 90 年代中期至 90 年代后期被认为是比较酷的，有证据表明，将网页分解成较小的块，这样有利于下载速度——尤其是在那时网络连接速度太慢的情况下更为明显。然而，这些技术有很多问题，随着网络速度越来越快，这些技术带来的问题远超过它们带来的积极因素，所以你再也看不到它们被使用了。

一小段时间之后（20 世纪 90 年代末，21 世纪初），插件技术变得非常受欢迎，例如 [Java Applet](https://developer.mozilla.org/zh-CN/docs/Glossary/Java) 和 [Flash](https://developer.mozilla.org/zh-CN/docs/Glossary/Adobe_Flash)——这些技术允许网络开发者将丰富的内容嵌入到网页中，例如视频和动画等，这些内容不能通过 HTML 单独实现。嵌入这些技术是通过诸如 `<object>`和较少使用的 `<embed>`元素来实现的，当时它们非常有用。由于许多问题，包括无障碍、安全性、文件大小等，它们已经过时了; 如今，大多数移动设备不再支持这些插件，桌面端也逐渐不再支持。

最后，`<iframe>` 元素出现了（连同其他嵌入内容的方式，如 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)、[`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 等），它提供了一种将整个 web 页嵌入到另一个网页的方法，看起来就像那个 web 页是另一个网页的一个 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 或其它元素一样。[`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 现在经常被使用。

了解完历史之后，让我们继续往下看以了解如何使用它们。

---

## 2.自主学习：嵌入类型的使用

在这篇文章中，我们将直接进入自主学习部分，让你立即体会到嵌入技术的实用性。大家都非常熟悉[Youtube](https://www.youtube.com/)，但很多人不了解它所提供的一些分享功能。让我们来看看 Youtube 如何让我们通过[`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)在页面中嵌入喜欢的视频。

1. 首先，去 bilibili 找一个喜欢的视频。
2. 在视频下方，你会看到一个*共享*按钮 - 点击查看共享选项。
3. 选择“ *嵌入”*选项卡，你将得到一些 `<iframe>` 代码——复制一下。
4. 粘贴到下面的*输入*框里，看看*输出*结果是什么。

1. 首先，去 bilibili 找一个喜欢的视频。
2. 在视频下方，你会看到一个*共享*按钮 - 点击查看共享选项。
3. 选择“ *嵌入代码* ” 选项卡，你将得到一些 `<iframe>` 代码——复制一下。
4. 粘贴到下面的*输入*框里，看看*输出*结果是什么。

此外，你还可以试试在示例中嵌入 [Google 地图](https://www.google.com/maps/)：

1. 去 Google 地图找一个喜欢的地图。
2. 点击 UI 左上角的“汉堡菜单”（三条水平线）。
3. 选择*共享或嵌入地图*选项。
4. 选择嵌入地图选项，这将给你一些`<iframe>`代码 - 复制一下。
5. 粘贴到下面的*输入*框，看看*输出*结果是什么。

如果你犯了某些错误，你可以点击 *重置*  按钮以重置编辑器。如果你确实被卡住了，按下 *显示答案*  按钮以借鉴答案。

<iframe class="hide-codepen-jsfiddle" title="自主学习：嵌入类型的使用 sample" id="frame_自主学习：嵌入类型的使用" width="700" height="600" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies/_sample_.%E8%87%AA%E4%B8%BB%E5%AD%A6%E4%B9%A0%EF%BC%9A%E5%B5%8C%E5%85%A5%E7%B1%BB%E5%9E%8B%E7%9A%84%E4%BD%BF%E7%94%A8.html" loading="lazy" style="box-sizing: border-box; border: 1px solid var(--border-primary); max-width: 100%; width: 765.719px; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(27, 27, 27); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

## 3.`Iframe` 详解

是不是很简单又有趣呢？[`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 元素旨在允许你将其他 Web 文档嵌入到当前文档中。这很适合将第三方内容嵌入你的网站，你可能无法直接控制，也不希望实现自己的版本——例如来自在线视频提供商的视频，[Disqus](https://disqus.com/) 等评论系统，在线地图提供商，广告横幅等。你通过本课程使用的实时可编辑示例就是使用 `<iframe>` 实现的。

我们会在后面提到，关于 `<iframe>` 有一些严重的[安全隐患](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies#安全隐患)需要考虑，但这并不意味着你不应该在你的网站上使用它们——它只需要一些知识和仔细地思考。让我们更详细地探索这些代码。假设你想在其中一个网页上加入 MDN 词汇表，你可以尝试以下方式：

```html
<iframe src="https://developer.mozilla.org/zh-CN/docs/Glossary"
        width="100%" height="500" frameborder="0"
        allowfullscreen sandbox>
  <p> <a href="https://developer.mozilla.org/zh-CN/docs/Glossary">
    Fallback link for browsers that don't support iframes
  </a> </p>
</iframe>
```

此示例包括使用以下所需的 `<iframe>` 基本要素：

- [`allowfullscreen`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-allowfullscreen)

  如果设置，`<iframe>`则可以通过[全屏 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API) 设置为全屏模式（稍微超出本文的范围）。

- [`frameborder`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-frameborder)

  如果设置为 1，则会告诉浏览器在此框架和其他框架之间绘制边框，这是默认行为。0 删除边框。不推荐这样设置，因为在 [CSS 中](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS)可以更好地实现相同的效果。[`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)`: none;`

- [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-src)

  该属性与 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) / 元素表示文档中的图像。[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)一样包含指向要嵌入文档的 URL 路径。

- [`width`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-height)

  这些属性指定你想要的 `iframe` 的宽度和高度。

- 备选内容

  与 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 等其它类似元素相同，你可以在 `<iframe></iframe>` 标签之间包含备选内容，如果浏览器不支持 `<iframe>`，将会显示备选内容，这种情况下，我们已经添加了一个到该页面的链接。现在你几乎不可能遇到任何不支持 `<iframe>` 的浏览器。

- [`sandbox`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-sandbox)

  该属性需要在已经支持其它 `<iframe>` 功能（例如 IE 10 及更高版本）但稍微更现代的浏览器上才能工作，该属性可以提高安全性设置；我们将在下一节中更加详细地谈到。

> **备注：** 为了提高速度，在主内容完成加载后，使用 JavaScript 设置 `iframe` 的 `src` 属性是个好主意。这使你的页面可以更快地被使用，并减少你的官方页面加载时间（重要的 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO) 指标）。

---

### 安全隐患

以上我们提到了安全问题——现在我们来详细介绍一下这一点。我们并不期望你第一次就能完全理解所有内容; 我们只想让你意识到这一问题，在你更有经验并开始考虑在你的实验和工作中使用 `<iframe>` 时为你提供参考。此外，没有必要害怕和不使用 `<iframe>`——你只需要谨慎一点。继续看下去吧...

浏览器制造商和 Web 开发人员了解到网络上的坏人（通常被称为**黑客**，或更准确地说是**破解者**），如果他们试图恶意修改你的网页或欺骗人们进行不想做的事情时常把 `iframe` 作为共同的攻击目标（官方术语：**攻击向量**），例如显示用户名和密码等敏感信息。因此，规范工程师和浏览器开发人员已经开发了各种安全机制，使`<iframe>`更加安全，这有些最佳方案值得我们考虑——我们将在下面介绍其中的一些。

> **备注：** [单击劫持](https://en.wikipedia.org/wiki/Clickjacking)是一种常见的 `iframe` 攻击，黑客将隐藏的 `iframe` 嵌入到你的文档中（或将你的文档嵌入到他们自己的恶意网站），并使用它来捕获用户的交互。这是误导用户或窃取敏感数据的常见方式。

一个快速的例子——尝试在浏览器中加载上面的例子——你也可以 [在 Github 上找到它](https://mdn.github.io/learning-area/html/multimedia-and-embedding/other-embedding-technologies/iframe-detail.html)（[参见源代码](https://github.com/mdn/learning-area/blob/gh-pages/html/multimedia-and-embedding/other-embedding-technologies/iframe-detail.html)）。你将不会看到任何内容，但如果你点击[浏览器开发者工具](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_are_browser_developer_tools)中的*控制台*，你会看到一条消息，告诉你为什么没有显示内容。在 Firefox 中，你会*被告知：“X-Frame-Options 拒绝加载 `https://developer.mozilla.org/zh-CN/docs/Glossary`*。这是因为构建 MDN 的开发人员已经在网站页面的服务器上设置了一个不允许被嵌入到`<iframe>`的设置（请参阅[配置 CSP 指令](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies#配置_csp_指令)）这是有必要的——整个 MDN 页面被嵌入在其它页面中没有多大意义，除非你想要将其嵌入到你的网站上并将其声称为自己的内容，或尝试通过单击劫持来窃取数据，这都是非常糟糕的事情。此外，如果每个人都这样做，所有额外的带宽将花费 Mozilla 很多资金。

----

#### 只有在必要时嵌入

有时嵌入第三方内容（例如 YouTube 视频和地图）是有意义的，但如果你只在完全需要时嵌入第三方内容，你可以省去很多麻烦。网络安全的一个很好的经验法则是“*你怎么谨慎都不为过，如果你决定要做这件事，多检查一遍；如果是别人做的，在被证明是安全的之前，都假设这是危险的。*”

除了安全问题，你还应该意识到知识产权问题。无论在线内容还是离线内容，绝大部分内容都是有版权的，甚至是一些你没想到有版权的内容（例如，[Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page) 上的大多数图片）。不要在网页上展示一些不属于你的内容，除非你是所有者或所有者给了你明确的、书面的许可。对于侵犯版权的惩罚是严厉的。再说一次，你再小心也不为过。

如果内容获得许可，你必须遵守许可条款。例如，MDN 上的内容是[在 CC-BY-SA 下许可的](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Attrib_copyright_license#文档)，这意味着，如果你要引用我们的内容，就必须[用适当的方式注明来源](https://wiki.creativecommons.org/wiki/Best_practices_for_attribution)，即使你对内容做了实质性的修改。

---

#### 使用 HTTPS

[HTTPS](https://developer.mozilla.org/zh-CN/docs/Glossary/https) 是 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 的加密版本。你应该尽可能使用 HTTPS 为你的网站提供服务：

1. HTTPS 减少了远程内容在传输过程中被篡改的机会，
2. HTTPS 防止嵌入式内容访问你的父文档中的内容，反之亦然。

使用 HTTPS 需要一个安全证书，这可能是昂贵的（尽管 [Let's Encrypt](https://letsencrypt.org/) 让这件事变得更容易），如果你没有，可以使用 HTTP 来为你的父文档提供服务。但是，由于 HTTPS 的第二个好处，*无论成本如何，你绝对不能使用 HTTP 嵌入第三方内容*（在最好的情况下，你的用户的 Web 浏览器会给他们一个可怕的警告）。所有有声望的公司，例如 Google Maps 或 Youtube，当你嵌入内容时，`<iframe>` 将通过 HTTPS 提供——查看 `<iframe>` `src` 属性内的 URL。

> **备注：** [Github 页面](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Using_Github_pages)允许默认情况下通过 HTTPS 提供内容，因此对托管内容很有用。如果你正在使用不同的托管，并且不确定，请向你的托管服务商询问。

---

#### 始终使用 `sandbox` 属性

想尽可能减少攻击者在你的网站上做坏事的机会，那么你应该给嵌入的内容仅能完成自己工作的权限。当然，这也适用于你自己的内容。一个允许包含在其里的代码以适当的方式执行或者用于测试，但不能对其他代码库（意外或恶意）造成任何损害的容器称为[沙盒](https://en.wikipedia.org/wiki/Sandbox_(computer_security))。

未沙盒化（Unsandboxed）内容可以做得太多（执行 JavaScript，提交表单，弹出窗口等）默认情况下，你应该使用没有参数的 `sandbox` 属性来强制执行所有可用的限制，如我们前面的示例所示。

如果绝对需要，你可以逐个添加权限（`sandbox=""`属性值内）——请参阅 [`sandbox`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-sandbox) 所有可用选项的参考条目。其中重要的一点是，你*永远不*应该同时添加 `allow-scripts` 和 `allow-same-origin` 到你的 `sandbox` 属性中——在这种情况下，嵌入式内容可以绕过阻止站点执行脚本的同源安全策略，并使用 JavaScript 完全关闭沙盒。

> **备注：** 如果攻击者可以欺骗人们直接访问恶意内容（在 `iframe` 之外），则沙盒无法提供保护。如果某些内容可能是恶意的（例如，用户生成的内容），请保证其是从不同的[域](https://developer.mozilla.org/zh-CN/docs/Glossary/Domain)向你的主站点提供的。

---

#### 配置 CSP 指令

[CSP](https://developer.mozilla.org/zh-CN/docs/Glossary/CSP) 代表 **[内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)**，它提供[一组 HTTP 标头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)（由 web 服务器发送时与元数据一起发送的元数据），旨在提高 HTML 文档的安全性。在 `<iframe>` 的安全性方面，你可以[*将服务器配置为发送适当的 `X-Frame-Options` 标题*](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Frame-Options)。这样做可以防止其他网站在其网页中嵌入你的内容（这将导致[点击劫持](https://zh.wikipedia.org/wiki/点击劫持)和一系列其他攻击），正如我们之前看到的那样，MDN 开发人员已经做了这些工作。

> **备注：** 你可以阅读 Frederik Braun 的帖子[在 X-Frame-Options 安全性标头上](https://blog.mozilla.org/security/2013/12/12/on-the-x-frame-options-security-header/)来获取有关此主题的更多背景信息。显然，在这篇文章中已经解释得很清楚了。

---

## 4.`<embed>`和 `<object>` 元素

[`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) 和 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object) 元素的功能不同于 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)——这些元素是用来嵌入多种类型的外部内容的通用嵌入工具，其中包括像 Java 小程序和 Flash，PDF（可在浏览器中显示为一个 PDF 插件）这样的插件技术，甚至像视频，SVG 和图像的内容！

>  **备注：** **插件**是一种对浏览器原生无法读取的内容提供访问权限的软件。

然而，你不太可能使用这些元素——Applet 几年来一直没有被使用；由于许多原因，Flash 不再受欢迎（见下面的[插件案例](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies#针对插件的情况)）；PDF 更倾向于被链接而不是被嵌入；其他内容，如图像和视频都有更优秀、更容易元素来处理。插件和这些嵌入方法真的是一种传统技术，我们提及它们主要是为了以防你在某些情况下遇到问题，比如内部网或企业项目等。

如果你发现自己需要嵌入插件内容，那么你至少需要一些这样的信息：

|                                                              | [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) | [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object) |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 嵌入内容的[网址](https://developer.mozilla.org/zh-CN/docs/Glossary/URL) | [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed#attr-src) | [`data`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object#attr-data) |
| 嵌入内容的*准确*[媒体类型](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type) | [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed#attr-type) | [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object#attr-type) |
| 由插件控制的框的高度和宽度（以 CSS 像素为单位）              | [`height`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed#attr-height) [`width`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed#attr-width) | [`height`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object#attr-height) [`width`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object#attr-width) |
| 名称和值，将插件作为参数提供                                 | 具有这些名称和值的 ad hoc 属性                               | 单标签[`<param>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/param)元素，包含在内`<object>` |
| 独立的 HTML 内容作为不可用资源的回退                         | 不支持（`<noembed>`已过时）                                  | 包含在元素`<object>`之后`<param>`                            |

> **备注：** `<object>`需要`data`属性，`type`属性或两者。如果你同时使用这两个，你也可以使用该[`typemustmatch`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object#attr-typemustmatch)属性（仅在 Firefox 中实现，在本文中）。`typemustmatch`保持嵌入文件不运行，除非`type`属性提供正确的媒体类型。`typemustmatch`因此，当你嵌入来自不同[来源的](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)内容（可以防止攻击者通过插件运行任意脚本）时，可以赋予重要的安全优势。

---

### 针对插件的情况

以前，插件在网络上是不可或缺的。还记得你必须安装 Adobe Flash Player 才能在线观看电影的日子吗？并且你还会不断地收到关于更新 Flash Player 和 Java 运行环境的烦人警报。Web 技术已经变得更加强大，那些日子已经结束了。对于大多数应用程序，现在是停止依赖插件传播内容，开始利用 Web 技术的时候了。

- **扩大你对大家的影响力**。每个人都有一个浏览器，但插件越来越少，特别是在移动用户中。由于 Web 在很大程度上不需要依赖插件而运行，所以人们宁愿只是去竞争对手的网站而不是安装插件。
- **从 Flash 和其他插件附带的[额外的无障碍问题](https://webaim.org/techniques/flash/)中摆脱**。
- **避免额外的安全隐患**。即使经过无数次补丁[，](http://www.cvedetails.com/product/6761/Adobe-Flash-Player.html?vendor_id=53) Adobe Flash 也是[非常不安全的](http://www.cvedetails.com/product/6761/Adobe-Flash-Player.html?vendor_id=53)。2015 年，Facebook 的首席安全官 Alex Stamos 甚至[要求 Adobe 停止 Flash](http://www.theverge.com/2015/7/13/8948459/adobe-flash-insecure-says-facebook-cso)。

那你该怎么办？如果你需要交互性，HTML 和[JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript)可以轻松地为你完成工作，而不需要 Java 小程序或过时的 ActiveX / BHO 技术。你可以使用 [HTML5 视频](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)来满足媒体需求，矢量图形[SVG](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web)，以及复杂图像和动画[画布](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)。[彼得·埃尔斯特（Peter Elst）几年前已经提到](https://plus.google.com/+PeterElst/posts/P5t4pFhptvp)，对于工作 Adobe Flash 极少是正确的工具，除了专门的游戏和商业应用。对于 ActiveX，即使微软的[Edge](https://developer.mozilla.org/zh-CN/docs/Glossary/Microsoft_Edge)浏览器也不再支持。

---

## 5.总结

在 Web 文档中嵌入其他内容这一主题可以很快变得非常复杂，因此在本文中，我们尝试以一种简单而熟悉的方式来介绍它，这种介绍方式将立即显示出相关性，同时仍暗示了一些涉及更高级功能的技术。刚开始，除了嵌入第三方内容（如地图和视频），你不太可能在网页上使用到嵌入技术。当你变得更有经验时，你可能会开始为他们找到更多的用途。

除了我们在这里讨论的那些外，还有许多涉及嵌入外部内容的技术。我们看到了一些在前面的文章中出现的，如 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)、[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 和 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)，但还有其它的有待关注，如 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 用于 JavaScript 生成的 2D 和 3D 图形，[`svg`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/svg) 用于嵌入矢量图形。我们将在此学习模块的下一篇文章中学习[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)。

---

# 🎈在网页中添加矢量图形

矢量图形在很多情况下非常有用 — 它们拥有较小的文件尺寸，却高度可缩放，所以它们不会在镜头拉近或者放大图像时像素化。在这篇文章中，我们将为您呈现如何在网页中添加矢量图形。

| 前提： | 你需要了解 [HTML 的基本知识](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML) 并且知道如何 [在你的文档中插入图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML). |
| :----- | ------------------------------------------------------------ |
| 目标： | 了解如何嵌入 SVG (矢量) 图形到网页中。                       |

> **备注：** 本文的目的并不是教你 SVG；仅仅是告诉你它是什么，以及如何在网页中添加它。

---

## 1.什么是矢量图形？

在网上，你会和两种类型的图片打交道 — 位图和矢量图：

- 位图使用像素网格来定义 — 一个位图文件精确得包含了每个像素的位置和它的色彩信息。流行的位图格式包括 Bitmap (`.bmp`), PNG (`.png`), JPEG (`.jpg`), and GIF (`.gif`.)
- 矢量图使用算法来定义 — 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。 [SVG](https://developer.mozilla.org/zh-CN/docs/Glossary/SVG) 格式可以让我们创造用于 Web 的精彩的矢量图形。

为了让你清楚的认识到两者的区别，我们来一个例子。你可以在我们的 Github 仓库中在线查看这个例子：[vector-versus-raster.html](https://mdn.github.io/learning-area/html/multimedia-and-embedding/adding-vector-graphics-to-the-web/vector-versus-raster.html) — 它并排展示了两个看起来一致的图像，一个红色的五角星以及黑色的阴影。不同的是，左边的是 PNG，而右边的是 SVG 图像。

当你放大网页的时候，区别就会变得明显起来 — 随着你的放大，PNG 图片变得像素化了，因为它存储是每个像素的颜色和位置信息 — 当它被放大时，每个像素就被放大以填满屏幕上更多的像素，所以图像就会开始变得马赛克感觉。矢量图像看起来仍然效果很好且清晰，因为无论它的尺寸如何，都使用算法来计算出图像的形状，仅仅是根据放大的倍数来调整算法中的值。

为了让你清楚的认识到两者的区别，我们来一个例子。你可以在我们的 Github 仓库中在线查看这个例子：[vector-versus-raster.html](https://mdn.github.io/learning-area/html/multimedia-and-embedding/adding-vector-graphics-to-the-web/vector-versus-raster.html) — 它并排展示了两个看起来一致的图像，一个红色的五角星以及黑色的阴影。不同的是，左边的是 PNG，而右边的是 SVG 图像。

当你放大网页的时候，区别就会变得明显起来 — 随着你的放大，PNG 图片变得像素化了，因为它存储是每个像素的颜色和位置信息 — 当它被放大时，每个像素就被放大以填满屏幕上更多的像素，所以图像就会开始变得马赛克感觉。矢量图像看起来仍然效果很好且清晰，因为无论它的尺寸如何，都使用算法来计算出图像的形状，仅仅是根据放大的倍数来调整算法中的值。

![Two star images, one raster and one vector. At their default size they look identical](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/raster-vector-default-size.png)

![Two star images zoomed in. The raster one on the left starts to look pixellated, whereas the vector one still looks crisp.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/raster-vector-zoomed.png)

> **备注：** 上面的图片实际上都是 PNG 图片 —— 每个例子中左边的图片代表光栅图片，右边的星星代表矢量图。还有，访问 [vector-versus-raster.html](https://mdn.github.io/learning-area/html/multimedia-and-embedding/adding-vector-graphics-to-the-web/vector-versus-raster.html) 示例来查看真正的例子！

此外，矢量图形相较于同样的位图，通常拥有更小的体积，因为它们仅需储存少量的算法，而不是逐个储存每个像素的信息。

---

## 2.SVG 是什么？

[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) 是用于描述矢量图像的[XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML)语言。它基本上是像 HTML 一样的标记，只是你有许多不同的元素来定义要显示在图像中的形状，以及要应用于这些形状的效果。SVG 用于标记图形，而不是内容。非常简单，你有一些元素来创建简单图形，如[`<circle>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/circle) 和[`<rect>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/rect)。更高级的 SVG 功能包括 [`<feColorMatrix>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feColorMatrix)（使用变换矩阵转换颜色）[`<animate>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/animate) （矢量图形的动画部分）和 [`<mask>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/mask)（在图像顶部应用模板）

作为一个简单的例子，以下代码创建一个圆和一个矩形：

```html
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

这将创建以下输出：

<iframe class="hide-codepen-jsfiddle" title="SVG 是什么？" id="frame_what_is_svg" width="300" height="200" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web/_sample_.what_is_svg.html" loading="lazy" style="box-sizing: border-box; border: 1px solid var(--border-primary); max-width: 100%; width: 765.719px; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(27, 27, 27); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>



从上面的例子可以看出，SVG 很容易手工编码。是的，您可以在文本编辑器中手动编写简单的 SVG，但是对于复杂的图像，这很快就开始变得非常困难。为了创建 SVG 图像，大多数人使用矢量图形编辑器，如 [Inkscape](https://inkscape.org/en/) 或 [Illustrator](https://en.wikipedia.org/wiki/Adobe_Illustrator)。这些软件包允许您使用各种图形工具创建各种插图，并创建照片的近似值（例如 Inkscape 的跟踪位图功能）。

SVG 除了迄今为止所描述的以外还有其他优点：

- 矢量图像中的文本仍然可访问（这也有利于 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)）。
- SVG 可以很好地适应样式/脚本，因为图像的每个组件都是可以通过 CSS 或通过 JavaScript 编写的样式的元素。

那么为什么会有人想使用光栅图形而不是 SVG？其实 SVG 确实有一些缺点：

- SVG 非常容易变得复杂，这意味着文件大小会增加; 复杂的 SVG 也会在浏览器中占用很长的处理时间。
- SVG 可能比栅格图像更难创建，具体取决于您尝试创建哪种图像。
- 旧版浏览器不支持 SVG，因此如果您需要在网站上支持旧版本的 IE，则可能不适合（SVG 从 IE9 开始得到支持）。

由于上述原因，光栅图形更适合照片那样复杂精密的图像。

> **备注：** 在 Inkscape 中，将文件保存为纯 SVG 以节省空间。另请参阅[如何为 Web 准备 SVG](http://tavmjong.free.fr/INKSCAPE/MANUAL/html/Web-Inkscape.html)。

---

## 3.将 SVG 添加到页面

在本节中，我们将介绍将 SVG 矢量图形添加到网页的不同方式。

[快捷方式：](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web#快捷方式：img)[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)

要通过 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)元素嵌入 SVG，你只需要按照预期的方式在` src` 属性中引用它。你将需要一个`height`或`width`属性（或者如果您的 SVG 没有固有的宽高比）。如果您还没使用过`<img>`元素，请阅读[HTML 中的图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)教程。

```html
<img
    src="equilateral.svg"
    alt="triangle with all three sides equal"
    height="87px"
    width="100px" />
```

优点

- 快速，熟悉的图像语法与`alt`属性中提供的内置文本等效。
- 可以通过在[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)元素嵌套`<img>`，使图像轻松地成为超链接。

缺点

- 无法使用 JavaScript 操作图像。
- 如果要使用 CSS 控制 SVG 内容，则必须在 SVG 代码中包含内联 CSS 样式。 （从 SVG 文件调用的外部样式表不起作用）
- 不能用 CSS 伪类来重设图像样式（如`:focus`）。

---

### 疑难解答和跨浏览器支持

对于不支持 SVG（IE 8 及更低版本，Android 2.3 及更低版本）的浏览器，您可以从`src`属性引用 PNG 或 JPG，并使用[`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-srcset)属性 只有最近的浏览器才能识别）来引用 SVG。在这种情况下，仅支持浏览器将加载 SVG - 较旧的浏览器将加载 PNG：

```html
<img src="equilateral.png" alt="triangle with equal sides" srcset="equilateral.svg">
```

您还可以使用 SVG 作为 CSS 背景图像，如下所示。在下面的代码中，旧版浏览器会坚持他们理解的 PNG，而较新的浏览器将加载 SVG：

```css
background: url("fallback.png") no-repeat center;
background-image: url("image.svg");
background-size: contain;
```

像上面描述的`<img>`方法一样，使用 CSS 背景图像插入 SVG 意味着它不能被 JavaScript 操作，并且也受到相同的 CSS 限制。

如果 SVG 根本没有显示，可能是因为你的服务器设置不正确。如果是这个问题，[这篇文章](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Getting_Started#a_word_on_webservers)将告诉你正确方向。

---

### 如何在 HTML 中引入 SVG 代码

你还可以在文本编辑器中打开 SVG 文件，复制 SVG 代码，并将其粘贴到 HTML 文档中 - 这有时称为将**SVG 内联**或**内联 SVG**。确保您的 SVG 代码在[`<svg></svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/svg)标签中（不要在外面添加任何内容）。这是一个非常简单的示例，您可以粘贴到文档中：

```html
<svg width="300" height="200">
    <rect width="100%" height="100%" fill="green" />
</svg>
```

优点

- 将 SVG 内联减少 HTTP 请求，可以减少加载时间。
- 您可以为 SVG 元素分配`class`和`id`，并使用 CSS 修改样式，无论是在 SVG 中，还是 HTML 文档中的 CSS 样式规则。实际上，您可以使用任何 [SVG 外观属性](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute#presentation_attributes) 作为 CSS 属性。
- 内联 SVG 是唯一可以让您在 SVG 图像上使用 CSS 交互（如`:focus`）和 CSS 动画的方法（即使在常规样式表中）。
- 您可以通过将 SVG 标记包在[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)元素中，使其成为超链接。

缺点

- 这种方法只适用于在一个地方使用的 SVG。多次使用会导致资源密集型维护（resource-intensive maintenance）。
- 额外的 SVG 代码会增加 HTML 文件的大小。
- 浏览器不能像缓存普通图片一样缓存内联 SVG。
- 您可能会在[`<foreignObject>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/foreignObject) 元素中包含回退，但支持 SVG 的浏览器仍然会下载任何后备图像。你需要考虑仅仅为支持过时的浏览器，而增加额外开销是否真的值得。

### [如何使用 ](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web#如何使用_iframe_嵌入_svg)[`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 嵌入 SVG

您可以在浏览器中打开 SVG 图像，就像网页一样。因此，使用`<iframe>`嵌入 SVG 文档就像我们在 [从对象到 iframe - 其他嵌入技术](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies) 中进行研究一样。

这是一个快速回顾：

```html
<iframe src="triangle.svg" width="500" height="500" sandbox>
    <img src="triangle.png" alt="Triangle with three unequal sides" />
</iframe>
```

这绝对不是最好的方法：

缺点

- 如你所知， `iframe`有一个回退机制，如果浏览器不支持`iframe`，则只会显示回退。
- 此外，除非 SVG 和您当前的网页具有相同的 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)，否则你不能在主页面上使用 JavaScript 来操纵 SVG。

---

## 4.动手学习：使用 SVG

在这个动手学习部分中，我们希望你能够体验一下 SVG 的乐趣。在下面的“input”部分，您将看到我们已经提供了一些样例来开始使用。您还可以访问 [SVG 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element)，了解更多关于 SVG 可以使用的其他玩具的细节，也可以尝试一下。这部分都是为了锻炼你的研究技巧，并且有一些乐趣。

如果你卡住了，无法使你的代码工作，你可以随时使用 Reset 按钮进行重置。

<iframe class="sample-code-frame" title="动手学习：使用 SVG sample" id="frame_动手学习：使用_svg" width="700" height="500" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web/_sample_.%E5%8A%A8%E6%89%8B%E5%AD%A6%E4%B9%A0%EF%BC%9A%E4%BD%BF%E7%94%A8_svg.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem; color: rgb(255, 255, 255); font-family: Inter, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

---

## 5.总结

本文提供了一个矢量图形和 SVG 的快速浏览，让你了解他们的作用，以及如何在网页中引入 SVG。它从来没有打算成为学习 SVG 的完整教程，只是一个指南，让你在网上遇到 SVG 时知道它是什么。所以不要觉得你不是一个 SVG 专家而担心。如果你想了解更多关于它的工作原理，我们在下面列出了一些可能会帮助您的信息。

在本模块的最后一篇文章中，我们将详细探索响应式图像，查看 HTML 可以让您的图像在不同设备上更好地适配。

---

# 🎈响应式图片

在这篇文章中我们将学习关于响应式图片——在不同的屏幕尺寸、分辨率或具有其他类似特性的设备上都呈现良好的图片——并且探究 HTML 提供了什么工具来帮助实现它们，这有助于提升（网页在）不同设备上的性能。响应式图片仅是[响应式设计](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design)的一部分，我们在 CSS 模块中将学到更多关于这一主题的知识。

| 预备知识： | 你应该知道 [HTML 基础](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML)以及如何[在网站上添加静态图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)。 |
| :--------- | ------------------------------------------------------------ |
| 学习目标： | 学习使用 [`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-srcset)、[`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture) 元素等特性来实现网页中响应式图像的解决方案。 |

---

## 1.为什么要使用响应式图片？

让我们来看一个典型的场景，一个典型的网站头部可能会有一张图片，图片下面可能会有一些内容的图片。头部图片很可能会横跨整个头部的宽度，而内容图片会适应某个内容区块的宽度，以下是个简单的例子：

![Our example site as viewed on a wide screen - here the first image works ok, as it is big enough to see the detail in the center.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/picture-element-wide.png)

这个网页在宽屏设备上表现良好，例如笔记本电脑或台式机（你可以[查看在线演示](https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/not-responsive.html)并且在 GitHub 上查看[源代码](https://github.com/mdn/learning-area/blob/master/html/multimedia-and-embedding/responsive-images/not-responsive.html)）。我们不会在这节课中详细讨论它的 CSS，只说以下几个要点：

- 正文内容设置了 1200 像素的最大宽度——在大于该宽度的视口中，正文会保持 1200 像素，并将其本身置于可用空间的中间；在小于该宽度的视口中，正文的宽度是视口宽度的 100%。
- 头部图片已经被设置为，无论头部宽度如何变化，它的中心始终处于头部的中间，这样如果网站显示在窄屏上，图片中心的重要细节（里面的人）仍然可以看到，而两边超出的部分就消失了。图片的高度是 200px。
- 内容图片已经被设置为，如果 body 元素比图片更小，图片就会随之缩小，这样图片总是在 body 中，而不会溢出。

然而，当你尝试在一个小屏幕设备上查看本页面时，问题就会产生。下图中网页的头部看起来还可以，但它在移动设备上占据了过多的屏幕高度，在这个尺寸下，你很难看到第一张内容图片中的两个人脸。

![Our example site as viewed on a narrow screen; the first image has shrunk to the point where it is hard to make out the detail on it.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/non-responsive-narrow.png)

一个改进的方法是，当网站在狭窄的屏幕上观看时，显示一张只含重要细节的裁剪版本的图片，在像平板电脑这样的中等宽度的屏幕设备上显示时，显示另一张裁剪的图片。但为各种布局提供不同版本的裁剪图片，会产生众所周知的**美术设计问题**。

此外，如果是在小屏手机屏幕上显示网页，那么没有必要在网页上嵌入这样大的图片，反过来说，一张小的[位图 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Raster_image)，如果它的显示尺寸大于原始尺寸，看起来就会有颗粒感（位图有固定数量的像素宽，固定数量的像素高，与[矢量图](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web)外观相同，但本质不同）。这被称之为**分辨率切换问题**。

换言之，没有必要把一张大图显示在比它的实际尺寸小得多的屏幕上，这样做会浪费带宽——当可以在设备上使用小图像时，手机用户尤其不愿意因为下载用于桌面的大图像而浪费带宽。理想的情况是用户浏览器有不同分辨率的图片可用，这样可以根据不同设备的屏幕大小载入合适分辨率的图片。

让事情变得复杂的是，有些设备有很高的分辨率，为了显示得更出色，可能需要超出你预料的更大的图片。这在本质上是一样的问题，但在具体场景中有所不同。

你可能会认为矢量图形能解决这些问题，在某种程度上是这样的——它们无论是文件大小还是比例都合适，无论在哪里你都应该尽可能地使用它们。然而，它们并不适合所有的图片类型，虽然在简单图形、图案、界面元素等方面较好，但如果是有大量的细节的照片，创建矢量图像会变得非常复杂。像 JPEG 这样格式的位图会更适合用作上面例子中的图片来显示。

当 web 面世时，这样的问题并不存在，在上世纪 90 年代中期，仅仅可以通过笔记本电脑和台式机来浏览 web 页面，所以浏览器开发者和规范制定者甚至没有想到要实现这种解决方式（响应式开发）。最近应用的响应式图片技术，通过让浏览器提供多个图像文件来解决上述问题，比如使用相同显示效果的图片但包含多个不同的分辨率（分辨率切换），或者使用不同的图片以适应不同的空间分配（美术设计）。

> **备注：** 在这篇文章中讨论的新特性——[`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-srcset)/[`sizes`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-sizes)/[`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)——都已经被新版本的现代浏览器和移动浏览器所支持（包括 Edge，而不是 IE）。

---

## 2.如何创建响应式图片？

在这一部分中，我们会探究上面提出的两个问题，演示如何用 HTML 的响应式图片来解决。需要注意的是，如以上示例所示，在本节中我们将专注于 HTML 的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素，但网站头部的图片仅是装饰性的，实际上应该要用 CSS 的背景图片来实现。[CSS 是比 HTML 更好的响应式设计的工具](https://cloudfour.com/thinks/responsive-images-101-part-8-css-images/)，我们会在未来的 CSS 模块中讨论。

### [分辨率切换：不同的尺寸](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#分辨率切换：不同的尺寸)

那么，我们想要用分辨率切换解决什么问题呢？我们想要显示相同的图片内容，依据设备来决定显示得更大或更小——这是我们在示例中的第二个内容图像的情况。标准的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素传统上仅仅让你给浏览器指定唯一的资源文件。

```html
<img src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy" />
```

我们可以使用两个新的属性——[`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-srcset) 和 [`sizes`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-sizes)——来提供更多额外的资源图像和提示，帮助浏览器选择合适的一个资源。你可以从 Github 上的 [responsive.html](https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/responsive.html) 中查看示例（也可以查看它的[源代码](https://github.com/mdn/learning-area/blob/master/html/multimedia-and-embedding/responsive-images/responsive.html)）：

```html
<img
  srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px,
         800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy" />
```

`srcset` 和 `sizes` 属性看起来很复杂，但是如果你按照上图所示进行格式化，那么他们并不是很难理解，每一行有不同的属性值。每个值都包含逗号分隔的列表，列表的每一部分由三个子部分组成。让我们来看看每一个内容：

**`srcset`** 定义了浏览器可选择的图片设置以及每个图片的大小，每张图片信息的设置和前一个用逗号隔开，每个设置要写：

1. 一个**文件名**（`elva-fairy-480w.jpg`）
2. 一个空格
3. **图片的固有宽度**（以像素为单位）（480w）。注意，这里使用宽度描述符 `w`，而非你可能期望的 `px`。图片的[固有宽度 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size)是它的真实大小，可以通过检查你电脑上的图片文件找到（例如，在 Mac 上，你可以在 Finder 上选择这个图片，然后按 Cmd + I 来显示信息）。

**`sizes`** 定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择——这就是我们之前提到的提示。上面的示例中，在每个逗号之前，我们写：

1. 一个**媒体条件**（`(max-width:600px)`）——你会在 [CSS 主题](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)中学到更多相关的知识，这里我们说一个媒体条件描述了一种屏幕可能处于的状态。上面示例中，我们说“当视口的宽度小于等于 600px 时”。
2. 一个空格
3. 当媒体条件为真时，图像将填充的**槽的宽度**（`480px`）

> **备注：** 对于槽的宽度，你也许会提供一个固定值（如 `480px`）， 或者是一个相对于视口的宽度 （如 `50vw`），但不是百分比。你也许已经注意到最后一个槽的宽度是没有媒体条件的（当没有任何一个媒体条件为真时，它默认生效）。当浏览器成功匹配第一个媒体条件的时候，剩下所有的条件都会被忽略，所以要注意媒体条件的顺序。

有了这些属性后，浏览器会：

1. 检查设备宽度
2. 检查 `sizes` 列表中哪个媒体条件是第一个为真
3. 查看给予该媒体查询的槽大小
4. 加载 `srcset` 列表中引用的最接近所选的槽大小的图像

就是这样！所以在这里，如果支持浏览器以 480px 的视口来加载页面，那么 `(max-width: 600px)` 的媒体条件为真，因此 `480px` 的槽会被选择，继而将加载 `elva-fairy-480w.jpg`，因为它的固有宽度（`480w`）最接近于槽宽度。800px 的照片大小为 128KB 而 480px 版本仅有 63KB 大小——节省了 65KB。现在想象一下，如果这是一个有很多图片的页面，使用这种技术会节省移动端用户的大量带宽。

> **备注：** 在桌面端浏览器测试上面的示例时，如果你把浏览器设到最小宽度，却没有加载更小的图片，请检查一下此时的视口是什么（你可以打开浏览器的 JavaScript 控制台，输入 `document.querySelector('html').clientWidth` 来获得近似视口宽度）。不同的浏览器设置了窗口可以缩小到的最小宽度，它可能比你想的更宽一点。使用移动端浏览器测试时，可以使用类似 Firefox 的 `about:debugging` 页这样的工具，使用桌面端开发者工具检查在移动端加载的页面。你可以在 Firefox 开发者工具中的 [Network 标签](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/index.html)中查看加载了哪张图片。

不支持这些特性的旧版本浏览器，会忽略这些属性，它们直接越过并按常规加载 [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-src) 属性引用的图像文件。

> **备注：** 在 HTML 文件中的 [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head) 标签里，你将会找到这一行代码 `<meta name="viewport" content="width=device-width">`：这行代码会强制让手机浏览器采用它们真实可视窗口的宽度来加载网页（有些手机浏览器会提供不真实的可视窗口宽度，用比真实视口更大的宽度加载网页，然后再缩小加载的页面，这样的做法对响应式图片或其他响应式设计，没有任何帮助）。

---

### 分辨率切换：相同的尺寸，不同的分辨率

如果你要支持多分辨率显示，但希望每个人在屏幕上看到的图片的实际尺寸是相同的，你可以使用 `srcset` 结合 x 语法——一种更简单的语法——而不用 `sizes`，来让浏览器选择合适分辨率的图片。你可以参考这个示例 [srcset-resolutions.html](https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/srcset-resolutions.html)（或查看[源代码](https://github.com/mdn/learning-area/blob/master/html/multimedia-and-embedding/responsive-images/srcset-resolutions.html)）：

```html
<img srcset="elva-fairy-320w.jpg, elva-fairy-480w.jpg 1.5x, elva-fairy-640w.jpg 2x"
     src="elva-fairy-640w.jpg"
     alt="Elva dressed as a fairy" />
```

![A picture of a little girl dressed up as a fairy, with an old camera film effect applied to the image](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/resolution-example.png)

在这个例子中，下面的 CSS 会应用在图片上，所以它的宽度在屏幕上是 320 像素（也称作 CSS 像素）：

```css
img {
  width: 320px;
}
```

在这种情况下，就不用到 `sizes` 属性——浏览器计算出正在显示的显示器的分辨率，然后显示 `srcset` 引用的最适合的图片。因此，如果访问页面的设备具有标准/低分辨率显示，用一个设备像素表示一个 CSS 像素，那么会加载 `elva-fairy-320w.jpg`（1x 是默认值，所以你不需要写出来）。如果设备有高分辨率，用两个或更多的设备像素表示一个 CSS 像素，会加载 `elva-fairy-640w.jpg`。640px 的图像大小为 93KB，320px 的图像的大小仅仅有 39KB。

---

### 美术设计

回顾一下，**美术设计问题**涉及到更改显示的图像以适应不同的显示尺寸。例如，如果在桌面浏览器上的一个网站上显示一张大的、横向的照片，照片中央有个人，然后当在移动端浏览器上浏览这个网站时，照片会缩小，这时照片上的人会变得非常小，看起来会很糟糕。这种情况可能在移动端显示一个更小的、聚焦到这个人的肖像图会更好。[`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture) 元素允许我们这样实现。

回到我们最初的例子 [not-responsive.html](https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/not-responsive.html)，我们有一张图片需要进行美术设计：

```html
<img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva" />
```

让我们改用 [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)！就像 [`<video>` 和 `<audio>`](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)，[`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture) 元素包含了一些 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source) 元素，它使浏览器在不同资源间做出选择，紧跟着的是最重要的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素。[responsive.html](https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/responsive.html) 的代码如下：

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg" />
  <source media="(min-width: 800px)" srcset="elva-800w.jpg" />
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva" />
</picture>
```

- `<source>` 元素包含一个 `media` 属性，这一属性包含一个媒体条件——就像第一个 `srcset` 例子，这些条件来决定哪张图片会显示——第一个条件返回真，那么就会显示这张图片。在上述示例中，如果视窗的宽度为 799px 或更少，第一个 `<source>` 元素的图片就会显示。如果视窗的宽度是 800px 或更大，就显示第二张图片。
- `srcset` 属性包含要显示图片的路径。请注意，正如我们在 `<img>` 上面看到的那样，`<source>` 可以使用引用多个图像的 `srcset` 属性，还有 `sizes` 属性。所以你可以通过一个 `<picture>` 元素提供多个图片，不过也可以给每个图片提供多分辨率的图片。实际上，你可能不想经常做这样的事情。
- 在任何情况下，你都必须在 `</picture>` 之前正确提供一个 `<img>` 元素以及它的 `src` 和 `alt` 属性，否则不会有图片显示。当媒体条件都不返回真的时候（你可以在这个例子中删除第二个 `<source>` 元素），它会显示默认图片；如果浏览器不支持 `<picture>` 元素时，它可以作为后备方案。

这样的代码允许我们在宽屏和窄屏上都能显示合适的图片，如下所示：

![Our example site as viewed on a wide screen - here the first image works OK, as it is big enough to see the detail in the center.](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/picture-element-wide.png)![Our example site as viewed on a narrow screen with the picture element used to switch the first image to a portrait close up of the detail, making it a lot more useful on a narrow screen](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/picture-element-narrow.png)

> **备注：** 你应该仅仅当在需要美术设计的场景中使用 `media` 属性；当你使用 `media` 时，不要在 `sizes` 属性中也提供媒体条件。

---

### 为什么我们不用 CSS 或 JavaScript 来实现？

当浏览器开始加载一个页面，它会在主解析器开始加载和解析页面的 CSS 和 JavaScript 之前先下载（预加载）任意的图片。这种有用的机制总体上会减少页面加载时间，但是它对响应式图片没有帮助，所以需要类似 `srcset` 的实现方法。因为你不能先加载好 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素后，再用 JavaScript 检测可视窗口的宽度，如果觉得大小不合适，再动态地加载小的图片替换已经加载好的图片，这样的话，原始的图像已经被加载了，然后你又加载了小的图像，这反而更不“响应”了。

---

### 大胆的使用现代图像格式

像 [WebP](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Image_types#webp_image) 和 [AVIF](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Image_types#avif_image) 等新型图片格式可以做到高质量的同时保持较低的文件大小，如今这些格式已有相对广泛的浏览器支持，且几乎没有“历史包袱”。

`<picture>` 让我们能继续满足老式浏览器的需要。你可以在 `type` 属性中提供 MIME 类型，这样浏览器就能立即拒绝其不支持的文件类型：

```html
<picture>
  <source type="image/svg+xml" srcset="pyramid.svg" />
  <source type="image/webp" srcset="pyramid.webp" />
  <img src="pyramid.png" alt="regular pyramid built from four equilateral triangles" />
</picture>
```

- 不要使用 `media` 属性，除非你也需要用到美术设计。
- 在 `<source>` 元素中，你只可以引用在 `type` 中声明的文件类型。
- 像之前一样，如果必要，你可以在 `srcset` 和 `sizes` 中使用逗号分割的列表。

---

## 3.实践学习：实现你自己的响应式图片

在本次实践学习中，我们希望你能勇敢地独立完成（大部分）。我们希望你使用 `<picture>` 来实现自己美术设计上的宽/窄屏显示适配，以及使用 `srcset` 切换不同的分辨率。

1. 写一些简单 HTML 来包含你的代码（如果你喜欢，也可以使用 `not-responsive.html` 作为起点）。
2. 找一张漂亮的宽屏风景图像，其中需要包含一些细节。使用图像编辑器创建一个网页大小的版本。然后裁剪一下，显示一个更小的部分，其中包含放大的细节，然后创建第二张图片（差不多 480px 宽度比较好）。
3. 使用 `<picture>` 元素来实现艺术图片切换器！
4. 创建不同大小的多张图片，每个图片的图像都是一样的。
5. 使用 `srcset`/`size` 来创建一个分辨率切换器的示例，可以在不同的分辨率的情况下，提供相同尺寸的图像，或者在不同的视图大小的情况下，提供不同尺寸大小的图像。

---

## 4.小结

这章节中充满了响应式图像——希望你享受学习新技术的过程。总而言之，我们讨论了两个不同的问题：

- **美术设计**：当你想为不同布局提供不同剪裁的图片——比如在桌面布局上显示完整的、横向图片，而在手机布局上显示一张剪裁过的、突出重点的纵向图片，可以用 [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture) 元素来实现。
- **分辨率切换**：当你想要为窄屏提供更小的图片时，因为小屏幕不需要像桌面端显示那么大的图片；以及你想为高/低分辨率屏幕提供不同分辨率的图片时，都可以通过[矢量图](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web)（SVG 图片）、[`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-srcset) 以及 [`sizes`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-sizes) 属性来实现。

此时整个[多媒体与嵌入](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding)模块接近尾声！在继续下一个模块之前，你现在唯一要做的就是进行一次[多媒体与嵌入的测试](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Mozilla_splash_page)，看看你学得怎样。希望你玩得开心！

---

# 🎈Mozilla 醒目页面

在这个测验中，我们将测试你对于本模块文章所讨论的技术的掌握程度，让你将一些有关于 Mozilla 的图片和视频添加到一个漂亮的页面上！

| 学习本章节的要求： | 在开始这个测验之前，你应该了解了 [多媒体与嵌入](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding) 模块的其他文章。 |
| :----------------- | ------------------------------------------------------------ |
| 目的：             | 测试这些知识的掌握程度：在页面中嵌入图片和视频，框架，和 HTML 响应式图片技术。 |

---

## 1.起点

为了开始这次测验，你需要从 [mdn-splash-page-start](https://github.com/roy-tian/learning-area/tree/master/html/multimedia-and-embedding/mdn-splash-page-start) 这个 GitHub 目录下下载 HTML 和图片。保存在你本地设备上。

访问 [originals](https://github.com/roy-tian/learning-area/tree/master/html/multimedia-and-embedding/mdn-splash-page-start/originals) 文件夹中不同的图片文件，然后用同样的方法将它们下载到本地。现在，你需要将这些图片文件保存到不同的目录下，因为在这些图片准备好被使用之前，你需要使用图像编辑器来处理这些图片。

> **备注：** 这个示例的 HTML 文件包含一些页面的 CSS 样式。你不需要去碰 CSS 的内容，而只是 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 元素中的 HTML 部分，只要你插入了正确的标记，样式就会正确显示。

## 2.项目概要

在这个测验中，我们为你呈现了一个接近完成了的 Mozilla 醒目页面，旨在说明一些关于 Mozilla 的有趣的事情，以及提供一些更一步的资源链接。但目前还没有添加任何视频或图片，这份工作就交给你了！你需要添加一些图片、视频等多媒体元素，好让页面变得更漂亮和更有意义。下一小节详细描述了你需要做的工作：

### 准备图片

使用你最爱的图片编辑器，创建下面几张图片的 400px 宽的版本和 120px 宽的版本：

- `firefox_logo-only_RGB.png`
- `firefox-addons.jpg`
- `mozilla-dinosaur-head.png`

给它们取个有意义的名字，例如`firefoxlogo400.png` 和`firefoxlogo120.png`。

这些图片将和 `mdn.svg` 一起作为`further-info`区内资源链接的图标和网站页眉的火狐图标。将这些图片副本保存在与 `index.html`文件的同一个目录下。

接着，创建一个 1200px 宽的 `red-panda.jpg`风景图片版本，和一个 600px 宽的肖像版本，用来显示更近镜头下的熊猫。同样地，为它们取一个你可以轻松分辨出来的名字。将它们的副本保存在与 `index.html`文件相同的目录下。

**备注：** 你应该在看起来还行的前提下尽量优化 JPG 和 PNG 图片的大小，[tinypng.com](https://tinypng.com/)为此提供了很好的服务。

### 为 header 添加一个图标

在 [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header) 元素中添加一个 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素，嵌入一个小尺寸版本的火狐图标。

### 为主 article 添加一个视频

就在 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 元素中（开放标签下面），嵌入一个 Bilibili 视频（https://www.bilibili.com/video/BV1rs411d7hC?p=2），使用 Bilibili 生成嵌入代码。视频的宽度应该是 400px。

### 为 further info 的链接添加响应式图片

在`further-info`类的 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div)里你会看到四个 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 元素，每个都指向一个有趣的、关于 Mozilla 的页面。为了完成这一部分，你需要在每个[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 元素里插入一个 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素，需要包含合适的 [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-src)，[`alt`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-alt)，[`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-srcset) 和 [`sizes`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-sizes) 属性。

我们希望每张图片（除了某个本身就是响应式的）在浏览器的视口的宽度小于等于 480px 时使用的 120px 宽的图片，其他情况下选择 400px 的版本。

确保正确的链接匹配了正确的图片！

> **备注：** 为了正确的测试 `srcset`/`sizes` 示例，你需要把你的网站上传到服务器（使用 [Github pages](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Using_Github_pages) 是一个简单免费的方法），访问服务器上的网页，你就可以使用浏览器开发者工具来测试它们是否正常工作，如 [响应式图片：有用的开发工具](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#useful_developer_tools)中所说

### 一张小熊猫的艺术照

在`red-panda`类的[`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 中，我们希望插入一个[`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)元素，在视口宽度小于等于 600px 时使用那张比较小的纵向的熊猫图片，在其他情况下则使用大的横向的图片。

## 3.示例

下面的截图展示了在正确标记后，醒目页面在宽屏和窄屏下的样子。（可 [在线查看](https://roy-tian.github.io/learning-area/html/multimedia-and-embedding/mdn-splash-page-finished/)）

![A wide shot of our example splash page](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/wide-shot.png)

![A narrow shot of our example splash page](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/2855/narrow-shot.png)

---

