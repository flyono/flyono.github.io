---
title: MySQL
date: 2024-6-6
updated: 2024-6-6
categories: "面试"
tags: 
	- "MySQL"
	- "八股文"
---

# MySQL开篇

优化：

- 定位慢查询
- SQL执行计划
- 索引
  - 存储引擎
  - 索引底层数据结构
  - 聚簇和非聚簇索引
  - 索引创建原则
  - 索引失效场景
- SQL优化经验

其他面试题

- 事务相关
  - 事务特性
  - 隔离级别
  - MVCC
- 主从同步原理
- 分库分表

# 优化——定位慢查询

出现慢查询的常见场景：

- 聚合查询
- 多表查询
- 表数据量过大查询
- 深度分页查询

表象：页面加载过慢，接口压测响应时间过长(超过1s)

方案一：开源工具

- 调试工具：Arthas
- 运维工具：Prometheus、Skywalking

方案二：MySQL自带慢日志

> 慢查询日记记录了所有执行时间超过指定参数(`long_query_time`, 单位: 秒，默认10s)的所有SQL语句的日志，如果要开启慢日志查询日志，需要在MySQL的配置文案中配置如下信息

```shell
# 开启MySQL慢日志查询开关
slow_query_log=1
# 设置慢日志的时间为2s，SQL语句执行时间超过2s，就会被视为慢查询，记录慢查询日志。
long_query_time=2
```

配置完毕之后，通过以下指令重新启动MySQL服务器进行测试，查看慢日志文件中记录的信息`/var/lib/mysql/localhost-slow.log`.

# 优化——SQL执行计划

可以采用`EXPLAIN`或者`DESC`命令获取 MySQL 如何执行 SELECT 语句的信息

![image-20240606174553710](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240606174553710.png)

- possible_key: 当前sql可能会用到的索引
- key: 实际命中的索引
- key_len: 索引占用的大小
- Extra: 额外的优化建议

|          Extra           |                             含义                             |
| :----------------------: | :----------------------------------------------------------: |
| Using where; Using Index | 查找使用了索引，需要的数据都在索引列中能找到，不需要回表查询数据 |
|  Using index condition   |             查找使用了索引，但是需要回表查询数据             |

- type: 这条sql连接的类型。性能由好到差为NULL，system，const，eq_ref，ref，range，index，all

  - system: 查询系统中的表
  - const: 根据主键查询
  - eq_ref: 主键索引查询或唯一索引查询
  - ref: 索引查询
  - range: 范围查询

  --以下类型的就需要优化了--

  - index: 索引树查询
  - all: 全盘扫描

# 优化——索引

> ​	索引（index）是帮助MySQL高效获取数据的数据结构(有序)。在数据之外，数据库系统还维护着满足特定查找算法的数据结构（**B+树**），这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是**索引**。

MySQL 默认使用的索引底层数据结构是B+树。

> ​	B-Tree, B树是一种多叉路平衡查找树，相对于二叉树，B树的每个节点可以有多个分支，即多叉。以一颗最大度数(max-degree)为5(5阶)的b-tree为例，那这个B树每个节点最多存储4个key

> ​	B+Tree，是在BTree基础上的一种优化，使其更适合实现外存储索引结构，InnoDB存储引擎就是用B+Tree实现其索引结构的

![image-20240606194607009](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240606194607009.png)

B树与B+树对比：

①：磁盘读写代价B+树更低；

②：查询效率B+树更加稳定；

③：B+树便于扫库和区间查询

## 聚簇和非聚簇索引

|   分类   |                            含义                            |         特点         |
| :------: | :--------------------------------------------------------: | :------------------: |
| 聚集索引 |  将数据存储与索引放到一块，索引结构的叶子节点保存了行数据  | 必须有，而且只有一个 |
| 二级索引 | 将数据和索引分开存储，索引结构的叶子节点关联的是对应的主键 |     可以存在多个     |

聚集索引选取规则：

- 如果存在主键，主键索引就是聚集索引。
- 如果不存在主键，将使用第一个唯一（UNIQUE）索引作为聚集索引。
- 如果表没有主键，或没有合适的唯一索引，则InnoDB会自动生成一个rowid作为隐藏的聚集索引。 

**回表查询**

> ​	通过二级索引找到对应的主键值，到聚集索引中查找整行索引，这个过程就是回表。

## 覆盖索引

> ​	**覆盖索引**是指查询使用了索引，并且**需要返回的列**，在该索引中已经全部能够找到。

![image-20240607212002892](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240607212002892.png)

如果返回的列中没有创建索引，有可能会触发回表查询，尽量避免使用select *

### MySQL超大分页处理

>  在数据量大的时候，如果进行limit分页查询，在查询时，越往后，分页查询效率越低。

优化思路：

​	一般分页查询时，通过创建`覆盖索引`能够比较好地提高性能，可以通过`覆盖索引`加`子查询`形式进行优化

```sql
select *
from tb_sku t,
	(select id from tb_sku order by id limit 90000000, 10) a
where t.id = a.id;
```

- 问题：在数据量比较大时，limit分页查询，需要对数据进行排序，效率低
- 解决方案：覆盖索引+子查询

## 索引创建原则

- 先陈述自己在实际地工作中，是怎么用的
- 主键索引
- 唯一索引
- 根据业务创建的索引(复合索引)

1. 针对于数据量大，且查询比较频繁的表建立索引
   - 单表超过10万数据(增加用户体验)
2. 针对与常作为查询条件(where)、排序(order by)、分组(group by)操作的字段建立索引
3. 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高
4. 如果是字符串类型的字段，字段的长度较长，可以针对与字段的特点，建立**前缀索引**
5. 尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率
6. 要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价也就越大，会影响增删改查的效率
7. 如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引最有效地用于查询

## 什么情况下索引会失效

1. 违反最左前缀法则
   - 如果索引了多列，要遵守最左前缀法则。指的是查询从索引地最左前列开始，并且不跳过索引中的列。匹配最左前缀法则，走索引。

![image-20240607214726956](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240607214726956.png)

2. 范围查询右边的列，不能使用索引

![image-20240607214852453](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240607214852453.png)

3. 不要在索引列上进行运算操作，索引将失效
4. 字符串不加单引号，造成索引失效
   - 由于在查询时，没有对字符串加单引号，MySQL的查询优化器会自动地进行类型转换，造成索引失效

5. 以%开头地Like查询可能造成索引失效。如果仅仅是尾部模糊匹配，索引不会失效。如果是头部模糊匹配，索引失效

# 谈谈你对SQL优化地经验

- 表的设计优化
- 索引优化 [索引创建原则](#索引创建原则) [索引失效](#什么情况下索引会失效)
- SQL语句优化
- 主从复制、读写分离
- 分库分表

### 表的设计优化（参考阿里开发手册《嵩山版》）

① 比如设置合适的数值（tinyint, int, bigint），要根据实际情况选择

② 比如设置合适的字符串类型（char和varchar）char定长效率高，varchar可变长度，效率稍低

### SQL语句优化

① SELECT 语句务必指明字段名称（避免直接使用select * ）、

② SQL语句要避免造成索引失效地写法

③ 尽量用`union all`代替`union`, `union`会多一次过滤，效率低

④ 避免在where子句中对字段进行表达式操作

⑤ Join 优化 能用inner join 就不用left join、right join，如必须使用一定要以小表为驱动，内连接会对两个表进行优化，优先把小表放在外边，把大表放在里边。left join或right join，不会重新调整顺序

### 主从复制、读写分离

> ​	如果数据库的使用场景读的操作比较多的时候，为了避免写的操作所造成的性能影响可以采用读写分离的架构，读写分离解决的是数据库的写入，影响了查询的效率

# 事务——事务的特性

> ​	事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

**ACID**

- A: 原子性, 事务是不可分割的最小单元，要么全部成功，要么全部失败
- C: 一致性, 事务完成时，必须是所有的数据都保持一致状态
- I: 隔离性, 数据库系统提供的隔离机制，保证事务在不受外部并发影响的独立环境下运行
- D: 持久性, 事务一旦完成或回滚，它对数据库中的数据的改变就是永久的

 

## 事务——并发事务问题，隔离级别

**并发事务问题**

- 脏读
- 不可重复读
- 幻读

**隔离级别**

- 读未提交
- 读已提交
- 可重复读
- 串行化 

| 问题       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 脏读       | 一个事务读到另一个事务还没有提交的数据                       |
| 不可重复读 | 一个事务先后读取同一条数据，但两次读取的数据不同，称之为不可重复读 |
| 幻读       | 一个事务按照条件查询条件时，没有对应的操作，但是在插入数据时，又发现这行数据已经存在，好像出现了"幻影" |

**如何解决并发事务问题呢**？

解决方案：对事物进行隔离

√ 表示不能解决

× 表示能解决

| 隔离级别                       | 脏读 | 不可重复读 | 幻读 |
| ------------------------------ | ---- | ---------- | ---- |
| Read uncommitted 未提交读      | √    | √          | √    |
| Read committed 读已提交        | ×    | √          | √    |
| Repeatable Read(默认) 可重复读 | ×    | ×          | √    |
| Serializable 串行化            | ×    | ×          | ×    |

> 事务隔离级别越高，数据越安全，但是性能越低

## 事务——`undo log`和`redo log`的区别

- `缓冲池（buffer pool）`: 主内存中的一个区域，里面可以缓存磁盘上经常操作的真实数据，在执行增删改查操作时，先操作缓冲池中的数据（若缓冲池没有数据，则从磁盘中加载并缓存），以一定频率刷新到磁盘，从而减少磁盘IO，加快处理数据
- `数据页（Page）`: 是InnoDB 存储引擎磁盘管理的最小单元，每个页的大小默认为16KB。页中存储的是行数据

### redo log

> ​	重做日志，记录的是事务提交时数据页的物理修改，是**用来实现事务的持久性**。
>
> 该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（rodo log file）, 前者是在内存中，后者是在磁盘中。当事务提交之后会把所有修改信息都存到该日志文件中，用于在刷新脏页到磁盘，发生错误时，进行数据恢复使用。

可以保证事务的持久性

### undo log

> ​	回滚日志，用于记录数据修改前的信息，作用包含两个：`提供回滚`，`MVCC`（多版本并发控制）。undo log 和 redo log记录物理日志不一样，他是逻辑日志。
>
> - 可以认为当delete一条记录时，undo log中会记录一条对应的insert记录，反之亦然
> - 当update一条记录时，它记录一条对应相反的update记录。当执行rollback时，就可以从undo log中的逻辑记录读取到相应的内容并回滚。

可以实现事务的一致性和原子性

## 事务——MVCC

### 事务中的隔离性是如何保证的呢？

> 锁：排他锁（如果一个事务获取了一个数据行的排他锁，其他事务就不能在获取该行的其他锁）
>
> mvcc：多版本并发控制

### 什么是MVCC呢?

> ​	全称Multi-Version Concurrency Control,多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突。

MVCC 具体实现主要依赖于数据库记录的`隐式字段`、`undo log`、`readView`。

#### 实现原理

- 记录中的隐藏字段

![image-20240609002028876](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240609002028876.png)

|  隐藏字段   |                             含义                             |
| :---------: | :----------------------------------------------------------: |
|  DB_TRX_ID  | 最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID |
| DB_ROLL_PTR | 回滚指针，指向这条记录的上一个版本，用于配合undo log, 指向上一个版本 |
|  DB_ROW_ID  |     隐藏主键，如果表结构没有指定主键，将会生成该隐藏字段     |

- undo log

回滚日志，在insert、update、delete的时候产生的便于数据回滚的日志。

当insert的时候，产生的undo log日志只在回滚时需要，在事务提交后，可被立即删除。

而update、delete的时候，产生的undo log日志不仅在回滚时需要，mvcc版本访问也需要，不会立即被删除。

- undo log 版本链

![image-20240609002644695](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240609002644695.png)

​	不同事务或相同事务对同一条记录进行修改，会导致该记录的undolog生成一条记录版本链表，链表的头部是最新的l旧记录，链表尾部是最早的旧记录。

- readView

> ​	ReadView（读视图）是**快照读**SQL执行时MVCC提取数据的依据，记录并维护系统当前活跃的事务（未提交的）id

| 字段含义       | 含义                                               |
| -------------- | -------------------------------------------------- |
| m_ids          | 当前活跃的事务ID集合                               |
| min_trx_id     | 最小活跃事务ID                                     |
| max_trx_id     | 预分配事务ID，当前最大事务ID+1(因为事务ID是自增的) |
| creator_trx_id | ReadView创建者的事务ID                             |

为了获取准确的快照读id, 定义了版本链数据访问规则：

trx_id：代表的是当前事务ID

1. trx_id == creator_trx_id ? 可以访问该版本
2. trx_id < min_trx_id ? 可以访问该版本
3. trx_id > max_trx_id ? 不可以访问该版本
4. min_trx_id <= trx_id <= max_trx_id ? 如果trx_id不在m_ids中是可以访问该版本的

不同的隔离级别，生成ReadView的时机不同：

- READ COMMITTED：在事务中每一次执行快照读时生成ReadViev
- REPEATABLE READ：仅在事务中第一次执行快照读时生成ReadVieW，后续复用该ReadVieW。

![image-20240609005115915](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240609005115915.png)

![image-20240609005232987](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240609005232987.png)

> - 当前读
>
>   读取的是记录的最新版本，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。对于我们日常的操作，如：select...lock in share mode（共享锁）,select...forupdate、update、insert、delete(排他锁)都是一种当前读
>
> - 快照读
>
>   简单的select(不加锁)就是快照读，快照读，读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读
>
>   - Read Committed: 每次select, 都生成一个快照读
>   - Repeatable Read: 开启事务后第一个select语句才是快照读的地方

# MySQL主从同步原理

![image-20240609005602148](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240609005602148.png)

核心就是二进制文件

> 二进制文件(BINLOG)记录了所有的DDL(数据定义语言)语句和DML(数据操纵语言)语句，但不包括数据查询语言(SELECT、SHOW)语句

![image-20240609005940451](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240609005940451.png)

复制分成三步：

1. Master主库在事务提交时，会把数据变更记录在二进制日志文件Binlog中
2. 从库读取主库的二进制日志文件Binlog，写入到从库的中继日志RelayLog
3. slave重做中继日志中的事件，将改变反映它自己的数据

# MySQL分库分表

分库分表的时机：

1. 前提，项目业务数据逐渐增多，或业务发展比较迅速 单表的数据量达1000W或20G以后
2. 优化已解决不了性能问题（主从读写分离、查询索引...)
3. IO瓶颈（磁盘IO、网络IO）、CPU瓶颈（聚合查询、连接数太多)

策略：

- 垂直拆分

  - 垂直分库：以表为依据，根据业务将不同表拆分到不同库中
    - 特点：
      - 按业务对数据分级管理、维护、监控、扩展
      - 在高并发下，提高磁盘IO和数据量连接数

  - 垂直分表：以字段为依据，根据字段属性将不同字段拆分到不同表中
    - 特点
      - 冷热数据分离
      - 减少IO过渡争抢，两表互不影响

- 水平拆分

  - 路由规则
    - 根据id节点取模
    - 按id也就是范围路由，节点1（1-100万），节点2（100万-200万）

  - 水平分库：将一个库的数据拆分到多个库中
    - 特点
      - 解决了单库大数量，高并发的性能瓶颈问题
      - 提高了系统的稳定性和可用性
  - 水平分表：将一个表的数据拆分到多个表中(可以在同一个库内)。
    - 特点
      - 优化单一表数据量过大而产生的性能问题
      - 避免I0争抢并减少锁表的几率；

分库之后的问题：

- 分布式事务一致性问题
- 跨界点关联查询
- 跨界点分页、排序函数
- 主键避重

解决方法：分库分表中间件

- sharding-sphere
- mycat
