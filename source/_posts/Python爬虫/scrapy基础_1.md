---
title: (1)Scrapy教学
date: 2024-2-24 17:00:00
updated: 2024-2-24 17:00:00
categories: "Python爬虫"
tags: 
  - "Python"
  - "框架"
  - "Scrapy"
---

### 简介

什么是框架？

所谓的框，其实说白了就是一个【项目的半成品】，该项目的半成品需要被集成了各种功能且具有较强的通用性。

Scrapy是一个为了爬取网站数据，提取结构性数据而编写的应用框架，非常出名，非常强悍。所谓的框架就是一个已经被集成了各种功能（高性能异步下载，队列，分布式，解析，持久化等）的具有很强通用性的项目模板。对于框架的学习，重点是要学习其框架的特性、各个功能的用法即可。

初期如何学习框架？

只需要学习框架集成好的各种功能的用法即可！前期切勿钻研框架的源码！

### 安装

```
Linux/mac系统：
      pip install scrapy（任意目录下）

Windows系统：

      a. pip install wheel（任意目录下）

      b. 下载twisted文件，下载网址如下： http://www.lfd.uci.edu/~gohlke/pythonlibs/#twisted

      c. 终端进入下载目录，执行 pip install Twisted‑17.1.0‑cp35‑cp35m‑win_amd64.whl
      注意：如果该步骤安装出错，则换一个版本的whl文件即可

      d. pip install pywin32（任意目录下）

      e. pip install scrapy（任意目录下）
      
如果安装好后，在终端中录入scrapy指令按下回车，如果没有提示找不到该指令，则表示安装成功
```

### 基本使用

- 创建项目

  - scrapy startproject 项目名称

  - 项目的目录结构：

    - ```
      firstBlood   # 项目所在文件夹, 建议用pycharm打开该文件夹
          ├── firstBlood  		# 项目跟目录
          │   ├── __init__.py
          │   ├── items.py  		# 封装数据的格式
          │   ├── middlewares.py  # 所有中间件
          │   ├── pipelines.py	# 所有的管道
          │   ├── settings.py		# 爬虫配置信息
          │   └── spiders			# 爬虫文件夹, 稍后里面会写入爬虫代码
          │       └── __init__.py
          └── scrapy.cfg			# scrapy项目配置信息,不要删它,别动它,善待它. 
      
      ```

- 创建爬虫爬虫文件：

  - cd  project_name（进入项目目录）
  - scrapy genspider 爬虫文件的名称（自定义一个名字即可） 起始url 
    - （例如：scrapy genspider first www.xxx.com）
  - 创建成功后，会在爬虫文件夹下生成一个py的爬虫文件

- 编写爬虫文件

  - 理解爬虫文件的不同组成部分

  - ```python
    import scrapy
    
    class FirstSpider(scrapy.Spider):
        #爬虫名称：爬虫文件唯一标识：可以使用该变量的值来定位到唯一的一个爬虫文件
        name = 'first' #无需改动
        #允许的域名：scrapy只可以发起百度域名下的网络请求
        # allowed_domains = ['www.baidu.com']
        #起始的url列表：列表中存放的url可以被scrapy发起get请求
        start_urls = ['https://www.baidu.com/','https://www.sogou.com']
    
        #专门用作于数据解析
        #参数response：就是请求之后对应的响应对象
        #parse的调用次数，取决于start_urls列表元素的个数
        def parse(self, response):
            print('响应对象为：',response)
    
    ```

- 配置文件修改:settings.py

  - 不遵从robots协议：ROBOTSTXT_OBEY = False
  - 指定输出日志的类型：LOG_LEVEL = 'ERROR'
  - 指定UA：USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'

- 运行项目

  - ```
    scrapy crawl 爬虫名称 ：该种执行形式会显示执行的日志信息（推荐）
    scrapy crawl 爬虫名称 --nolog：该种执行形式不会显示执行的日志信息（一般不用）
    ```

### 数据解析

- 注意，如果终端还在第一个项目的文件夹中，则需要在终端中执行cd ../返回到上级目录，在去新建另一个项目。

- 新建数据解析项目：

  - 创建工程：scrapy startproject 项目名称
  - cd 项目名称
  - 创建爬虫文件：scrapy genspider 爬虫文件名 www.xxx.com

- 配置文件的修改：settings.py

  - 不遵从robots协议：ROBOTSTXT_OBEY = False
  - 指定输出日志的类型：LOG_LEVEL = 'ERROR'
  - 指定UA：USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'

- 编写爬虫文件：spiders/duanzi.py

  - ```python
    import scrapy
    
    class DuanziSpider(scrapy.Spider):
        name = 'duanzi'
        # allowed_domains = ['www.xxx.com']
        #对首页进行网络请求
        #scrapy会对列表中的url发起get请求
        start_urls = ['https://ishuo.cn/duanzi']
    
        def parse(self, response):
            #如何获取响应数据
            #调用xpath方法对响应数据进行xpath形式的数据解析
            li_list = response.xpath('//*[@id="list"]/ul/li')
            for li in li_list:
                # content = li.xpath('./div[1]/text()')[0]
                # title = li.xpath('./div[2]/a/text()')[0]
                # #<Selector xpath='./div[2]/a/text()' data='一年奔波，尘缘遇了谁'>
                # print(title)#selector的对象，且我们想要的字符串内容存在于该对象的data参数里
                #解析方案1：
                # title = li.xpath('./div[2]/a/text()')[0]
                # content = li.xpath('./div[1]/text()')[0]
                # #extract()可以将selector对象中data参数的值取出
                # print(title.extract())
                # print(content.extract())
                #解析方案2：
                #title和content为列表，列表只要一个列表元素
                title = li.xpath('./div[2]/a/text()')
                content = li.xpath('./div[1]/text()')
                #extract_first()可以将列表中第0个列表元素表示的selector对象中data的参数值取出
                print(title.extract_first())
                print(content.extract_first())
    
    ```

### 持久化存储

两种方案：

- 基于终端指令的持久化存储
- 基于管道的持久化存储（推荐）

#### 基于终端指令的持久化存储

- 只可以将parse方法的返回值存储到指定后缀的文本文件中。

- 编码流程：

  - 在爬虫文件中，将爬取到的数据全部封装到parse方法的返回值中

    - ```python
      import scrapy
      
      class DemoSpider(scrapy.Spider):
          name = 'demo'
          # allowed_domains = ['www.xxx.com']
          start_urls = ['https://ishuo.cn/duanzi']
      
          def parse(self, response):
              # 如何获取响应数据
              # 调用xpath方法对响应数据进行xpath形式的数据解析
              li_list = response.xpath('//*[@id="list"]/ul/li')
              all_data = []#爬取到的数据全部都存储到了该列表中
              for li in li_list:
                  title = li.xpath('./div[2]/a/text()').extract_first()
                  content = li.xpath('./div[1]/text()').extract_first()
                  #将段子标题和内容封装成parse方法的返回
                  dic = {
                      'title':title,
                      'content':content
                  }
                  all_data.append(dic)
      
              return all_data
      
      ```

  - 将parse方法的返回值存储到指定后缀的文本文件中:

    - scrapy crawl 爬虫文件名称 -o duanzi.csv

- 总结：

  - 优点：简单，便捷
  - 缺点：局限性强
    - 只可以将数据存储到文本文件无法写入数据库
    - 存储数据文件后缀是指定好的，通常使用.csv
    - 需要将存储的数据封装到parse方法的返回值中

#### 基于管道实现持久化存储

优点：极大程度的提升数据存储的效率

缺点：编码流程较多

##### 编码流程

1.在爬虫文件中进行数据解析

```python
def parse(self, response):
  # 如何获取响应数据
  # 调用xpath方法对响应数据进行xpath形式的数据解析
  li_list = response.xpath('//*[@id="list"]/ul/li')
  all_data = []  # 爬取到的数据全部都存储到了该列表中
  for li in li_list:
    title = li.xpath('./div[2]/a/text()').extract_first()
    content = li.xpath('./div[1]/text()').extract_first()
```

2.将解析到的数据封装到Item类型的对象中

- 2.1 在items.py文件中定义相关的字段

  - ```python
    class SavedataproItem(scrapy.Item):
        # define the fields for your item here like:
        # name = scrapy.Field()
        #爬取的字段有哪些，这里就需要定义哪些变量存储爬取到的字段
        title = scrapy.Field()
        content = scrapy.Field()
    ```

- 2.2 在爬虫文件中引入Item类，实例化item对象，将解析到的数据存储到item对象中

  - ```python
        def parse(self, response):
        		from items import SavedataproItem #导入item类
            # 如何获取响应数据
            # 调用xpath方法对响应数据进行xpath形式的数据解析
            li_list = response.xpath('//*[@id="list"]/ul/li')
            all_data = []  # 爬取到的数据全部都存储到了该列表中
            for li in li_list:
                title = li.xpath('./div[2]/a/text()').extract_first()
                content = li.xpath('./div[1]/text()').extract_first()
                #实例化一个item类型的对象
                item = SavedataproItem()
                #通过中括号的方式访问item对象中的两个成员，且将解析到的两个字段赋值给item对象的两个成员即可
                item['title'] = title
                item['content'] = content
    ```

3.将item对象提交给管道

- ```python
  #将存储好数据的item对象提交给管道
  yield item
  ```

4.在管道中接收item类型对象(pipelines.py就是管道文件)

- 管道只可以接收item类型的对象，不可以接收其他类型对象

- ```python
  class SavedataproPipeline:
      #process_item用来接收爬虫文件传递过来的item对象
      #item参数，就是管道接收到的item类型对象
      def process_item(self, item, spider):
          print(item)
          return item
  ```

5.在管道中对接收到的数据进行任意形式的持久化存储操作

- 可以存储到文件中也可以存储到数据库中

- ```python
  # Define your item pipelines here
  #
  # Don't forget to add your pipeline to the ITEM_PIPELINES setting
  # See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
  
  
  # useful for handling different item types with a single interface
  from itemadapter import ItemAdapter
  
  
  class SavedataproPipeline:
      #重写父类的方法
      fp = None
      def open_spider(self,spider):
          print('我是open_spider方法，我在项目开始运行环节，只会被执行一次！')
          self.fp = open('duanzi.txt','w',encoding='utf-8')
      #process_item用来接收爬虫文件传递过来的item对象
      #item参数，就是管道接收到的item类型对象
      #process_item方法调用的次数取决于爬虫文件给其提交item的次数
      def process_item(self, item, spider):
          #item类型的对象其实就是一个字典
          # print(item)
          #将item字典中的标题和内容获取
          title = item['title']
          content = item['content']
          self.fp.write(title+':'+content+'\n')
          print(title,':爬取保存成功！')
          return item
  
      def close_spider(self,spider):
          print('在爬虫结束的时候会被执行一次！')
          self.fp.close()
  ```

6.在配置文件中开启管道机制

- 注意：默认情况下，管道机制是没有被开启的，需要在配置文件中手动开启
- 在setting.py中把ITEM_PIPELINES解除注释就表示开启了管道机制

# Scrapy框架

## Scrapy框架概述

Scrapy是基于Python的一个非常流行的网络爬虫框架，可以用来抓取Web站点并从页面中提取结构化的数据。

下图展示了Scrapy的基本架构，其中包含了主要组件和系统的数据处理流程（图中带数字的红色箭头）。

![image-20230531212623124](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20230531212623124.png)

### Scrapy的组件

1. Scrapy引擎(Engine):用来控制整个系统的数据处理流程。
2. 调度器(Scheduler)：调度器从引擎接受请求并排序列入队列，并在引擎发出请求后返还给它们。
3. 下载器(Downloader)：下载器的主要职责是抓取网页并将网页内容返还给蜘蛛(Spiders)。
4. 蜘蛛程序(Spiders):蜘蛛是用户自定义的用来解析网页并抓取特定URL的类，每个蜘蛛都能处理一个域名或一组域名，简单的说就是用来定义特定网站的抓取和解析规则的模块。
5. 数据管道(Item Pipeline)：管道的主要责任是负责处理有蜘蛛从网页中抽取的数据条目，它的主要任务是清理、验证和存储数据。当页面被蜘蛛解析后，将被发送到数据管道，并经过几个特定的次序处理数据。每个数据管道组件都是一个Python类，它们获取了数据条目并执行对数据条目进行处理的方法，同时还需要确定是否需要在数据管道中继续执行下一步或是直接丢弃掉不处理。数据管道通常执行的任务有：清理HTML数据、验证解析到的数据（检查条目是否包含必要的字段）、检查是不是重复数据（如果重复就丢弃）、将解析到的数据存储到数据库（关系型数据库或NoSQL数据库）中。
6. 中间件(Middlewares):中间件是介于引擎和其他组件之间的一个钩子框架，主要是为了提供自定义的代码来拓展Scrapy的功能，包括下载器中间件和蜘蛛中间件。

---

### 数据处理流程

Scrapy的整个数据处理流程由引擎进行控制，通常的运转流程包括以下的步骤：

1. 引擎询问蜘蛛需要处理哪个网站，并让蜘蛛将第一个需要处理的URL交给它。
2. 引擎让调度器将需要处理的URL放在队列中。
3. 引擎从调度那获取接下来进行爬取的页面。
4. 调度将下一个爬取的UL返回给引擎，引擎将它通过下载中间件发送到下载器。
5. 当网页被下载器下载完成以后，响应内容通过下载中间件被发送到引擎；如果下载失败了，引擎会通知调度器记录这个URL,待会再重新下载。
6. 引擎收到下载器的响应并将它通过蜘蛛中间件发送到蜘蛛进行处理。
7. 蜘蛛处理响应并返回爬取到的数据条目，此外还要将需要跟进的新的URL发送给引擎。
8. 引擎将抓取到的数据条目送入数据管道，把新的URL发送给调度器放入队列中。

上述操作中的第2步到第8步会一直重复直到调度器中没有需要请求的URL,爬虫就停止工作。

---

## 创建Scrapy项目

### 安装和使用Scrapy

可以使用Python的包管理工具pip来安装Scrapy。

```python
# 切换镜像源
pip config set global.index-url https://pypi.doubanio.com/simple
# 安装scrapy
pip install scrapy
```

在命令行中使用`scrapy`命令创建名为`demo`的项目。

```
scrapy startproject Scrapy_demo
```

项目的目录结构如下图所示。

```
Scrapy_demo
|___ Scrapy_demo
|______ spiders
|_________ __init__.py
|______ __init_.py
|______ items.py
|______ middlewares.py
|______ pipelines.py
|______ settings.py
|___ scrapy.cfg
```

切换到`Scrapy_demo`目录，用下面的命令创建名为`douban`的蜘蛛程序。

```
scrapy genspider douban movie.douban.com
```

### 配置虚拟环境

进入Scrapy_demo项目后设置配置python解释器，即虚拟环境。

配置好后在虚拟环境中重新安装一遍scrapy

---

## 编写蜘蛛程序

### 开始爬取

 打开我们配置的蜘蛛程序（douban.py）

修改start_urls为https://movie.douban.com/top250即我们的目标网站

---

 ![image-20230531221725445](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20230531221725445.png)

```python
import scrapy
from scrapy import Selector

from Scrapy_demo.items import MovieItem


class DoubanSpider(scrapy.Spider):
    name = "douban"
    allowed_domains = ["movie.douban.com"]
    start_urls = ["https://movie.douban.com/top250"]

    # response 服务器给我们的响应
    def parse(self, response):
        # 获得选择器对象
        sel = Selector(response)
        # 层叠样式表解析
        list_items = sel.css('#content > div > div.article > ol > li')  # 获取带有电影数据的数据列表
        for list_item in list_items:  # 遍历列表
            # 将爬到的数据组装到MovieItem里
            movie_item = MovieItem()
            # 获取span标签title类的选择器对象
            movie_item.title = list_item.css('span.title::text').extract_first()  # 拿到选择器对象的第一条数据
            # 获取span标签rating_num类的选择器对象
            movie_item['rank'] = list_items.css('span.rating_num::text').get()  # 现在更新为用get()方法抽取，一样的效果
            # 获取span标签inq类的选择器对象
            movie_item['subject'] = list_items.css('span.inq::text').get()
            yield movie_item

        # xpath 解析
        # sel.xpath()
        # 正则表达式解析
        # sel.re()
```

到items.py封装MovieItem对象

```python
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


# 爬虫获取到的数据需要组装成Item对象
class MovieItem(scrapy.Item):
    title = scrapy.Field()
    rank = scrapy.Field()
    subject = scrapy.Field()
```

到setting.py改我们的User-Agent

```python
# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.57"

# Obey robots.txt rules
ROBOTSTXT_OBEY = True

# 配置Scrapy执行的最大并发请求数(默认:16) 并发请求项，爬多个页面用
CONCURRENT_REQUESTS = 8

# 下载延迟
# DOWNLOAD_DELAY = 3
# 随机延迟
RANDOMIZE_DOWNLOAD_DELAY = True
```

这样我们的程序已经可以跑起来了

打开终端运行以下命令即可

```shell
scrapy crawl douban -o douban.csv
```

---

### 爬取更多的页面

 ```python
import scrapy
from scrapy import Selector, Request
from scrapy.http import HtmlResponse

from Scrapy_demo.items import MovieItem


class DoubanSpider(scrapy.Spider):
    name = "douban"
    allowed_domains = ["movie.douban.com"]
    start_urls = ["https://movie.douban.com/top250"]
	# 第二种方法
    def start_requests(self):
        for page in range(10):
            yield Request(url=f'https://movie.douban.com/top250?start={page * 25}&filter=')

    # response 服务器给我们的响应
    def parse(self, response: HtmlResponse):
        # 获得选择器对象
        sel = Selector(response)
        # 层叠样式表解析
        list_items = sel.css('#content > div > div.article > ol > li')  # 获取带有电影数据的数据列表
        for list_item in list_items:  # 遍历列表
            # 将爬到的数据组装到MovieItem里
            movie_item = MovieItem()
            # 获取span标签title类的选择器列表对象
            movie_item['title'] = list_item.css('span.title::text').extract_first()  # 拿到选择器列表对象的第一条数据
            # 获取span标签rating_num类的选择器列表对象
            movie_item['rank'] = list_item.css('span.rating_num::text').extract_first()  # 现在更新为用get()方法抽取，一样的效果
            # 获取span标签inq类的选择器列表对象
            movie_item['subject'] = list_item.css('span.inq::text').extract_first()
            yield movie_item
		# 第一种方法，但是会出现第一页数据重复爬取
        href_list = sel.css('div.paginator > a::attr(href)')
        for href in href_list:
            # 将此响应的url与可能的相对url连接起来，以形成对后者的绝对解释
            url = response.urljoin(href.extract())
            yield Request(url=url)
 ```

---

## 编写数据管道

1. **数据管道写入Excel**

 `popelines.py`是我们的数据管道文件

```python
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

import openpyxl

class ScrapyDemoPipeline:
    
    # 初始化函数，创建对象后自动执行
    def __init__(self):
        # 创建工作薄
        self.wb = openpyxl.Workbook()
        # 创建工作表
        # wb.create_sheet()
        # 拿到默认的工作表
        self.ws = self.wb.active
        # 更改工作表名称
        self.ws.title = 'Top250'
        self.ws.append(('标题', '评分', '主题'))

    def close_spider(self, spider):
        self.wb.save('电影数据.xlsx')

    def process_item(self, item, spider):
        # self.ws.append((item['title'], item['rank'], item['subject']))
        title = item.get('title', '')
        rank = item.get('rank', '')
        subject = item.get('subject', '')
        self.ws.append((title, rank, subject))
        return item
```

写好数据管道后，到setting.py配置文件开启数据管道

```python
# 配置项目管道
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
# 当由多个数据管道时，后面的数字给的越小越先执行
ITEM_PIPELINES = {
   "Scrapy_demo.pipelines.ScrapyDemoPipeline": 300,
}
```

执行爬虫

```shell
# 不打开日志执行
scrapy crawl douban --nolog  
```

2. **数据管道写入数据库**

新建一个数据管道`DbPipeline`

```python
class DbPipeline:

    def __init__(self):
        self.conn = pymysql.connect(
            host='localhost',
            port=3306,
            user='root',
            password='Flyone',
            database='592test',
            charset='utf8mb4'
        )
        self.cursor = self.conn.cursor()

    def close_spider(self, spider):
        self.conn.commit()
        self.conn.close()

    def process_item(self, item, spider):
        title = item.get('title', '')
        rank = item.get('rank', 0)
        subject = item.get('subject', '')
        # 注意这里传入的参数是没有引号的，需要手动添加
        sql = "insert into tb_top_movie (title, rating, subject) values ('%s', %s, '%s')" % (title, rank, subject)
        print('--------------------------------------', sql)
        self.cursor.execute(sql)
        return item
```

到setting.py配置文件开启数据管道

```python
# 配置项目管道
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   "Scrapy_demo.pipelines.DbPipeline": 200,
   "Scrapy_demo.pipelines.ExcelPipeline": 300,
}
```

执行爬虫

```shell
# 不打开日志执行
scrapy crawl douban 
```

---

我们会发现执行过程中，存入数据库是一条一条的插入到数据库的，所以我们可以进行优化，比如爬取一百条数据后一次存入数据库，这样就不用反复进行连接数据库，执行写入操作了

开始优化：

```python
class DbPipeline:

    def __init__(self):
        self.conn = pymysql.connect(
            host='localhost',
            port=3306,
            user='root',
            password='Flyone',
            database='592test',
            charset='utf8mb4'
        )
        self.cursor = self.conn.cursor()
        # 初始化列表
        self.data = []

    def close_spider(self, spider):
        if len(self.data) > 0:
            self._write_to_db()
        self.conn.close()

    def process_item(self, item, spider):
        title = item.get('title', '')
        rank = item.get('rank', '0')
        subject = item.get('subject', '')
        self.data.append((title, rank, subject))
        if len(self.data) == 100:
            self._write_to_db()
            self.data.clear()
        return item

    def _write_to_db(self):
        sql = 'insert into tb_top_movie (title, rating, subject) values (%s, %s, %s)'
        self.cursor.executemany(sql, self.data)
        self.conn.commit()
```

---

如果浏览器限制访问需要登录才能继续访问

那么就需要配置Proxy或者登录后将Cookie注入到爬虫request中：

```python
# 解析Cookie为字典
def get_cookie_dict():
    cookie_str = 'bid=8Jd4KD5vgP0; __utmz=223695111.1685279021.7.6.utmcsr=bing|utmccn=(' \
                 'organic)|utmcmd=organic|utmctr=(not%20provided)'
    cookie_dict = {}
    for item in cookie_str.split('; '):
        key, value = item.split('=', maxsplit=1)
        cookie_dict[key] = value
    return cookie_dict


COOKIE_DICT = get_cookie_dict()

def process_request(self, request: Request, spider):
    # Called for each request that goes through the downloader
    # middleware.

    # Must either:
    # - return None: continue processing this request
    # - or return a Response object
    # - or return a Request object
    # - or raise IgnoreRequest: process_exception() methods of
    #   installed downloader middleware will be called
    # 配置代理
    # request.meta = {'proxy': 'address'}
    # 配置Cookie
    request.cookies = COOKIE_DICT
    return None

```

最后到配置文件开启中间件配置即可

```python
# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
   "Scrapy_demo.middlewares.ScrapyDemoDownloaderMiddleware": 543,
}
```

---





