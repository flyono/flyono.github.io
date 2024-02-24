---
title: CrawlSpider
date: 2024-2-24 17:00:00
updated: 2024-2-24 17:00:00
categories: "Python爬虫"
tags: "CrawlSpider","教程"
---

# CrawlSpider

- 实现网站的全站数据爬取 
  - 就是将网站中所有页码对应的页面数据进行爬取。
- crawlSpider
  - 其实就是Scrapy封装好的一个爬虫类，通过该类提供的方法和属性就可以实现全新高效形式的全站数据爬取
- 爬取流程
  - 新建一个Scrapy项目
  - 进入项目
  - 创建爬虫文件(*)
    - `scrapy genspider -t crawl spiderName www.xx.com`
    - 爬虫文件多了哪些文件？
      - 当前爬虫类的父类为CrawlSpider
      - 爬虫类中多了一个类变量叫做rules
        - LinkExtractor：链接提取器
          - 可以根据allow表示的正则在当前页面中提取符合正则要求的链接
        - Rule：规则解析器
          - 可以接收链接提取器提取到的链接，并且对每一个链接进行请求发送 
          - 可以根据callback指定的回调函数对每一次请求到的数据进行数据解析
        - 思考：如何将一个网站中所有的链接提取到呢？
          - 只需要将链接提取器的allow后面赋值一个空字符串即可
        - 目前在scrapy中有几种发送请求的方式
          - start_urls列表
          - scrapy.Request()
          - scrapy.FormRequest()
          - Rule规则解析器
      - 基于CrawlSpider对免费简历模版进行数据爬取
    - 注意：
      - 链接提取器和规则解析器是一一对应的（一对一的关系）
      - 建议在使用crawlSpider实现深度爬取的时候，需要配合手动请求发送的方式进行搭配
## 分布式
- 分布式在日常开发中并不常见，只是一个噱头
- 概念：可以使用多台电脑搭建一个分布式机群，使得多台对电脑可以对同一个网站的数据进行**联合且分布**的数据爬取。
- 声明： 原生的scrapy框架并无法实现分布式操作！why?
  - 多台电脑之间无法共享同一个调度器
  - 多台电脑之间无法共享同一个管道
- 如何是的scrapy可以实现分布式呢？ 
  - 借助于一个组件：`scrapy-redis`
  - scrapy-redis的作用是什么？
    - 可以给原生的scrapy框架提供可被共享的调度器和管道！
    - 但是只能将爬取的数据存储到redis 的数据库
  - 编码流程（重点）：
  - 1.创建项目
  - 2.cd 项目
  - 3.创建基于crawlSpider的爬虫文件
    - 3.1修改爬虫文件
      - 导包：`from scrapy_.redis.spiders import RedisCrawlSpider`
      - 修改当前爬虫类的父类为RedisCrawlSpider
      - 将 `start_urls` 替换成 `redis_key`
        - `redis_key`——表示调度器队列的名称
    - 3.2进行常规的的请求和数据解析
  - 4.setting配置文件的修改
    - 常规内容修改（UA、robots）
    - 指定可以被共享的管道类
      - ```python
        ITEM PIPELINES = {
        'scrapy_redis.pipelines.Redispipeline':400
        }
        ```
    - 指定可以被共享的调度器
      - ```python
        # 使用scrapy-redis组件的去重队列
        DUPEFILTER CLASS "scrapy_redis.dupefilter.RFPDupeFilter"
        # 使用scrapy-redis:组件自己的调度器
        SCHEDULER "scrapy_redis.scheduler.Scheduler"
        # 是否允许暂停
        SCHEDULER PERSIST True
        ```
    - 指定数据库
      - ```python
        REDIS H0ST='127.0.0.1
        REDIS PORT 6379
        ```
    - 修改redis数据库的配置文件（redis.windows.conf）
      - 在配置文件中找到`bind 12.0.0.1`注释掉即可
        - 实现外部设备访问本机数据库
      - 如果配置文件中还存在：`protected-mode=true`,将true修改为false
        - 修改为false后表示redis数据库关闭了保护模式，表标其他设备可以远程访问且修改你数据库中的数据
  - 6.启动redis数据库的服务端和客户端
  - 7.运行项目
  - 8.需要向可以被共享的调度器的队列(redis_key的值)中放入一个起始的url
    - 在redis数据库的客户端执行如下操作：
      - lpush 队列名称 起始的url
## 增量式
- 爬虫应用场景分类
  - 通用爬虫
  - 聚焦爬虫
  - 功能爬虫
  - 分布式爬虫
  - 增量式爬虫
    - 用来**监测**网站数据更新的情况（爬取网站最新更新出来的数据）
    - 只是一种程序设计的思路，使用什么技术都是可以实现的。
    - 核心：
      - 去重
      - 使用一个记录表来实现数据的去重
        - 记录表：爬取过的数据的记录
        - 记录表需要具备的特性：
          - 去重
          - 需要持久保存的
        - 如何构建和设计一个记录表
          - 方案1：使用python的set集合充当记录表？
            - 不可以，因为set集合无法实现持久化存储
          - 方案2：使用redis的set集合充当记录表
            - 可以的，因为redis的set既可以实现去重又可以进行数据的持久化存储。
- 基于两个场景实现增量式爬虫
  - 如果爬取的数据都是存储在当前网页中，没有深度的数据爬取的必要。
  - 爬取的数据存在于当前页和详情页中，具备深度爬取的必要
- 场景1的实现
  - 数据指纹： 数据的唯一标识。记录表中可以不直接存储数据本身，直接存储数据指纹更好一些。
- 场景2的实现
  - 使用详情页的URL作为数据指纹
## Scrapy项目部署
### Scrapyd部署工具介绍
- scrapyd:是一个用于部署和运行scrapy爬虫的程序，它由scrapy官方提供的。它允许你通过 JSON API来部署爬虫项目和控制爬虫运行。
- > 所谓JSON API本质就是post请求的web api
- 选择一台主机当做服务器，安装并启动scrapyd服务。再这之后，scrapyd会以守护进程的方式存在系统中，监听爬虫地运行与请求，然后启动进程来执行爬虫程序。
### 环境安装
- scrapyd服务： 
- `pip install scrapyd`
- scrapyd客户端： 
- `pip install scrapyd-client`
- > 一定要安装较新的版本10以上的版本，如果是现在安装的一般都是新版本
### 启动scrapyd服务
- 打开终端在scrapy:项目路径下启动scrapyd的命令：`scrapyd`
- scrapyd也提供了web的接口。方便我们查看和管理爬虫程序。默认情况下scrapyd监听6800端口，运行scrapyd后。在本机上使用浏览器访问`http://1oca1host:6800/` 地址即可查看到当前可以运行的项目。