---
title: Python常用模块
date: 2024-2-24 17:00:00
updated: 2024-2-24 17:00:00
categories: "Python"
tags: "Python","模块"
---



# Python常用内置模块

## time

1. `时间戳(timestamp)`：通常来说，时间戳表示的是从1970年1月1日00:00:00开始`按秒计算的偏移量`.我们运行“type(time.time())”，返回的是float类型。`通常用于时间间隔的计算`。
2. `格式化的时间字符串`(Format String)（按照某种格式显示的）例如‘1999-12-06’。通常用于`格式化显示时间`。

| 符号 |                   说明                    |
| :--: | :---------------------------------------: |
|  %y  |         两位数的年份表示（00-99）         |
|  %Y  |       四位数的年份表示（000-9999）        |
|  %m  |               月份（01-12）               |
|  %d  |           月内中的一天（0-31）            |
|  %H  |          24小时制小时数（0-23）           |
|  %I  |          12小时制小时数（01-12）          |
|  %M  |              分钟数（00-59）              |
|  %S  |                秒（00-59）                |
|  %a  |             本地简化星期名称              |
|  %A  |             本地完整星期名称              |
|  %b  |            本地简化的月份名称             |
|  %B  |            本地完整的月份名称             |
|  %c  |       本地相应的日期表示和时间表示        |
|  %j  |           年内的一天（001-366）           |
|  %p  |          本地A.M.或P.M.的等价符           |
|  %U  | 一年中的星期数（00-53）星期天为星期的开始 |
|  %w  |      星期（0-6），星期天为星期的开始      |
|  %W  | 一年中的星期数（00-53）星期一为星期的开始 |
|  %x  |            本地相应的日期表示             |
|  %X  |            本地相应的时间表示             |
|  %Z  |              当前时区的名称               |
|  %%  |                  %号本身                  |

3. `结构化时间(struct_time)` ：struct_time元组共有9个元素共九个元素:(年，月，日，时，分，秒，一年中第几周，一年中第几天等）

| 索引（Index） |     属性（Attribute）     |    值（Values）    |
| :-----------: | :-----------------------: | :----------------: |
|       0       |       tm_year（年）       |      比如2011      |
|       1       |       tm_mon（月）        |       1 - 12       |
|       2       |       tm_mday（日）       |       1 - 31       |
|       3       |       tm_hour（时）       |       0 - 23       |
|       4       |       tm_min（分）        |       0 - 59       |
|       5       |       tm_sec（秒）        |       0 - 60       |
|       6       |    tm_wday（weekday）     | 0 - 6（0表示周一） |
|       7       | tm_yday（一年中的第几天） |      1 - 366       |
|       8       | tm_isdst（是否是夏令时）  |      默认为0       |

```python
import time

print("""时间戳""")
time1 = time.time()
# 睡眠1s
time.sleep(1)
time2 = time.time()

diff_time = time2 - time1
print("时间间隔：{0} s".format(diff_time))

"""时间字符串"""
str1 = time.strftime("%Y-%m-%d %X")
print(str1)

"""结构化时间"""
loc_time_1 = time.localtime()  # 本地时区的struct_time
loc_time_2 = time.gmtime()  # UTC时区的struct_time
print(loc_time_1)
print(loc_time_2)
print("\n")
print("-----------------时间戳<-->时间字符串-------------------")
t = time.time()
st = time.localtime(t)
ft = time.strftime('%Y/%m/%d %H:%M:%S', st)
print("时间戳转为结构化时间：", st)
print("结构化时间转为格式化时间：" + ft)
print("-----------------结构化时间(struct_time)<--->时间字符串-------------------")
st = time.strftime('%Y/%m/%d %H:%M:%S')  # 根据格式规范将时间元组转换为字符串。当时间元组不存在时，默认使用localtime()返回的当前时间
ft = time.strptime(st, '%Y/%m/%d %H:%M:%S')  # 根据格式规范将字符串解析为时间元组。
st = time.strftime('%Y/%m/%d %H:%M:%S', ft)
print("时间字符串 ---> 格式化时间：" + st)
print("格式化时间 ---> 时间字符串", ft)
print("\n")
print('--------------时间戳》》时间字符串-------------')
# time.ctime(时间戳)  如果不传参数，直接返回当前时间的格式化串
time1 = time.time()  # 时间戳，float类型
str_time = time.ctime(time1)
print(str_time)

print('--------------结构化时间(struct_time)》》时间字符串 -------------')
# time.asctime(结构化时间) 如果不传参数，直接返回当前时间的格式化串
loc_time = time.localtime()  # 本地时区的struct_time
print(time.asctime(loc_time))
```

---

## datetime

datetime模块中包含如下类：

|     类名      |                          功能说明                           |
| :-----------: | :---------------------------------------------------------: |
|     date      |           日期对象，常用的属性有year, month, day            |
|     time      |                          时间对象                           |
|   datetime    | 日期时间对象，常用的属性有hour, minute, second, microsecond |
| datetime_CAPI |                    日期时间对象C语言接口                    |
|   timedelta   |              时间间隔，即两个时间点之间的长度               |
|    tzinfo     |                        时区信息对象                         |

datetime模块中包含的常量：

|  常量   |       功能说明       |       用法       | 返回值 |
| :-----: | :------------------: | :--------------: | :----: |
| MAXYEAR | 返回能表示的最大年份 | datetime.MAXYEAR |  9999  |
| MINYEAR | 返回能表示的最小年份 | datetime.MINYEAR |   1    |

```python
import datetime

now_time = datetime.datetime.now()
# 只能调整的字段：weeks days hours minutes seconds
print("3周后：", datetime.datetime.now() + datetime.timedelta(weeks=3))
print("3周前：", datetime.datetime.now() + datetime.timedelta(weeks=-3))

current_time = datetime.datetime.now()
# 可直接调整到指定的 年 月 日 时 分 秒 等
print(current_time)
print(current_time.replace(year=1977))  # 直接调整到1977年
print(current_time.replace(month=1))  # 直接调整到1月份
print(current_time.replace(year=1989, month=4, day=25))  # 1989-04-25 18:49:05.898601

# 将时间戳转化成时间
print(datetime.date.fromtimestamp(1232132131))  # 2009-01-17

print(datetime.date.today())  # 2023-05-31
```

---

## calendar

> 1. **`calendar.calendar(year,w=2,l=1,c=6,m=3)`，返回一个字符串格式的年历。**
>    * **`year`接收一个年份数字，可以是过去现在或未来，比如我这里打印的是1千年以后的3019年。**
>    * **`w`表示个位天数相邻两天之间的间隔宽度(字符空格数)，默认是2.**
>    * **`l`表示每一个周占用的行数，默认是1。**
>    * **`c`表示并排的两个月之间的间隔宽度，默认是6。但是c不小于w。即当c值小于w时，c等于w。**
>    * **`m`表示并排展示多少个月。默认是3，显示一排3个月，会显示4排。**
> 2. `calendar.prcal(year,w=2,l=1,c=6, m=3)`，**也是打印一年的年历，相当于print(calendar.calendar(year,w,l,c))。**
> 3. `calendar.month(2019, 10, w=0, l=0)`，**打印某一个月的日历。**
> 4. `calendar.timegm(tupletime)`，**接受一个时间元组，返回时间戳，时间元组的值依次表示年、月、日、时、分、秒。**
> 5. `calendar.weekday(year,month,day)`,=，**返回传入的日期是星期几。**
> 6. `calendar.isleap(year)`**返回传入的年是不是闰年，是返回True，否则为false。如2020年是闰年。**
> 7. `calendar.leapdays(start, end)`**返回start,end之间有多少个闰年，左闭右开区间。**

```python
import calendar

print("month: \n", calendar.month(2019, 10, w=0, l=0))
print("month: \n", calendar.calendar(2019, w=2, l=1, c=6, m=3))
# print("month: \n", calendar.prmonth(2019, 10, w=0, l=0))

print("monthcalendar: ", calendar.monthcalendar(2019, 11))  # 2019年11月的日历
print("monthrange: ", calendar.monthrange(2019, 10))  # 2019年11月日历的范围
```

---

## sys

Python的sys模块提供访问由解释器`使用或维护的变量的接口`，并提供了一些函数用来和解释器进行交互，操控Python的运行时环境。

|        属性/方法         |                           功能说明                           |
| :----------------------: | :----------------------------------------------------------: |
|       **sys.argv**       |                传递给程序的**命令行参数列表**                |
|       **sys.path**       |     模块的搜索路径；**sys.path[0]** 表示当前脚本所在目录     |
|     **sys.exit(n)**      | 通过引发SystemExit异常来退出当前程序。n为0表示正常，非零表示异常。 |
|       sys.modules        |                      已加载的模块的字典                      |
|      sys.exc_info()      |                 获取正在处理的异常的相关信息                 |
| sys.builtin_module_names |                 当前解释器所有内置模块的名称                 |
|      sys.copyright       |                包含解释器版权相关信息的字符串                |
|   **sys.exec_prefix**    |          用于查找特定于当前机器的python库的路径前缀          |
|      sys.executable      |               Python解释器可执行文件的绝对路径               |
|      sys.float_info      |              包含有关浮点数实现的信息的结构序列              |
|   sys.float_repr_style   |           表示浮点数的repr()方法的输出样式的字符串           |
|      sys.hash_info       |                包含哈希算法相关信息的结构序列                |
|      sys.hexversion      | 对sys.version_info中包含的版本信息进行编码后使用十六进制表示的整数 |
|    sys.implementation    |                 包含有关Python实现的相关信息                 |
|       sys.int_info       |               包含有关整形实现的信息的结构序列               |
|       sys.maxsize        |        返回字符串、列表、字典和其他内置类型的最大长度        |
|      sys.maxunicode      |            返回能够表示的最大Unicode码点的整数值             |
|     **sys.platform**     |                     返回平台标识符字符串                     |
|        sys.prefix        |               返回安装平台无关Python文件的目录               |
|     sys.thread_info      |               包含有关线程实现的信息的结构序列               |
|     **sys.version**      |                  表示当前解释器版本的字符串                  |
|     sys.version_info     |                   当前解释器版本的命名元组                   |
|      sys.byteorder       |       本机的字节排序方式，little表示小尾，big表示大尾        |
|     sys.api_version      |           返回表示Python解释器的C语言版本API的整数           |
|   **sys.getsizeof()**    |             获取对象占用的内存大小（用字节表示）             |

```python
import sys

# 1. sys.argv：传递给程序的命令行参数列表，其中argv[0]是传入的脚本名字，其它为传入的参数名字，且为str类型。
for i in range(len(sys.argv)):
    print('argv{0}: type is {1}, value is {2}'.format(i, type(sys.argv[i]), sys.argv[i]))
# 2. sys.path：表示模块的搜索路径，其中sys.path[0]表示脚本当前目录。
print(sys.path[0])

# 3. sys.getsizeof()：获取对象占用的内存大小（用字节表示）
# ljust()：返回长度为width的左对齐字符串。 填充使用指定的填充字符(默认为空格)完成。
for obj in [int(), float(), list(), tuple(), set(), dict(), object]:
    print(str(obj.__class__).ljust(20), sys.getsizeof(obj))

```

---

## os

os模块是与操作系统交互的一个接口。

|                  方法                   |                             说明                             |
| :-------------------------------------: | :----------------------------------------------------------: |
|             **os.getcwd()**             |         获取当前工作目录，Current working directory          |
|         **os.chdir("dirname")**         |            改变当前脚本工作目录；相当于shell下cd             |
|              **os.curdir**              |                   返回**当前目录: ('.')**                    |
|                os.pardir                |             获取当前目录的父目录字符串名：('..')             |
|  **os.makedirs('dirname1/dirname2')**   |                      可生成多层递归目录                      |
|      **os.removedirs('dirname1')**      | 若目录为空，则删除，并递归到上一级目录，如若也为空，则删除，依此类推 |
|         **os.mkdir('dirname')**         |           生成单级目录；相当于shell中mkdir dirname           |
|         **os.rmdir('dirname')**         | 删除单级空目录，若目录不为空则无法删除，报错；相当于shell中rmdir dirname |
|          os.listdir(‘dirname’)          | 列出指定目录下的所有文件和子目录，包括隐藏文件，并以**列表**方式打印。它不包括 . 和 … 即使它在文件夹中。 |
|             **os.remove()**             |                         删除一个文件                         |
|   **os.rename("oldname","newname")**    |                       重命名文件/目录                        |
|        os.stat(‘path/filename’)         |                      获取文件/目录信息                       |
|               **os.sep**                |     输出操作系统特定的路径分隔符，win下为"",Linux下为"/"     |
|               os.linesep                |   输出当前平台使用的行终止符，win下为"\t\n",Linux下为"\n"    |
|               os.pathsep                |       输出用于分割文件路径的字符串 win下为;,Linux下为:       |
|               **os.name**               |    输出字符串指示当前使用平台。win->‘nt’; Linux->‘posix’     |
|      **os.system("bash command")**      |                   运行shell命令，直接显示                    |
|               os.environ                |                       获取系统环境变量                       |
|          os.path.abspath(path)          |                   返回path规范化的绝对路径                   |
|           os.path.split(path)           |            将path分割成目录和文件名**二元组返回**            |
|             os.path.join()              |                         **路径拼接**                         |
|          os.path.dirname(path)          |   返回path的目录。其实就是os.path.split(path)的第一个元素    |
|         os.path.basename(path)          | 返回path最后的文件名。如何path以／或\结尾，那么就会返回空值。即os.path.split(path)的第二个元素 |
|        **os.path.exists(path)**         |          path是否存在，可以是**文件或者文件夹**路径          |
|         **os.path.isabs(path)**         |                 如果path是绝对路径，返回True                 |
|        **os.path.isfile(path)**         |    如果path是一个存在的**文件**，返回True。否则返回False     |
|         **os.path.isdir(path)**         |   如果path是一个存在的**目录**，则返回True。否则返回False    |
| **os.path.join(path1[, path2[, ...]])** |    将多个路径组合后返回，第一个绝对路径之前的参数将被忽略    |
|         os.path.getatime(path)          |          返回path所指向的文件或者目录的最后存取时间          |
|         os.path.getmtime(path)          |          返回path所指向的文件或者目录的最后修改时间          |
|        **os.path.getsize(path)**        |              返回path(文件或文件夹)的大小，字节              |

```python
import os

# 1. 进入空间操作
print(os.getcwd())  # 当前工作目录
os.chdir('..')  # 返回上级目录
print(os.curdir)  # 当前目录
print(os.pardir)  # 当前工作目录的上一层

# 2. 去掉隐藏文件
cwd = os.getcwd()
list_dir = [f for f in os.listdir(cwd) if not f.startswith('.')]
print(list_dir)
```



---

## pathlib

pathlib 库从 python3.4 开始，到 python3.6 已经比较成熟。如果你的新项目可以直接用 3.6 以上，建议用 pathlib。相比于老式的 os.path 有几个优势：

> * 老的路径操作函数管理比较混乱，有的是导入 os, 有的又是在 os.path 当中，而新的用法统一可以用 pathlib 管理。
> * 老用法在处理不同操作系统 win，mac 以及 linux 之间很吃力。换了操作系统常常要改代码，还经常需要进行一些额外操作。
> * 老用法主要是函数形式，返回的数据类型通常是字符串。但是路径和字符串并不等价，所以在使用 os 操作路径的时候常常还要引入其他类库协助操作。新用法是面向对象，处理起来更灵活方便。
> * pathlib 简化了很多操作，用起来更轻松。

有两大类一个是纯路径不带I/0操作，另一个可以进行I/0的类。pathlib各个类的继承关系如下图：
![在这里插入图片描述](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/529d51c0c3264c729061f29e719381a1.png)

Path获得的路径为对象类型，`可以使用str方法转化为字符串。同样可以使用Path()方法将字符串转化path对象`。

> file = Path("文件夹/文件名")

|               方法               |                             说明                             |
| :------------------------------: | :----------------------------------------------------------: |
|        pathlib.Path.cwd()        |                         获得当前路径                         |
|       pathlib.Path.home()        |                         获得home目录                         |
|       file.stat().st_size        |                         获得文件大小                         |
|       file.stat().st_ctime       |                         文件创建时间                         |
|       file.stat().st_mtime       |                         文件修改时间                         |
|            file.name             |         文件名，包含后缀名，如果是目录则获取目录名。         |
|            file.stem             |                     文件名，不包含后缀。                     |
|           file.suffix            |                    后缀，比如 .txt, .png                     |
|            p.suffixs             |                        路径的所有后缀                        |
|           file.parent            |                    父级目录，相当于 cd …                     |
|            p.parents             |                          所有父目录                          |
|           file.anchor            |               锚，目录前面的部分 C:\ 或者 /。                |
|          file.resolve()          |                         获得绝对路径                         |
|        dir_path.iterdir()        | 可以扫描某个目录下的所有路径（文件和子目录)， 打印的会是处理过的绝对路径。 |
|      dir_path.glob(‘*.txt’)      |                   匹配路径下的所有.txt文件                   |
|       file.match(‘*.txt’)        |                     检查路径是否符合规则                     |
| Path.home() /‘dir’ / ‘file.txt’  | 可以使用/方法拼接路径，同Path.home().joinpath(‘dir’, ‘file.txt’) |
|          file.is_file()          |                      检查路径是否为文件                      |
|          file.is_dir()           |                      检查路径是否为目录                      |
|           file.exists            |                       检查路径是否存在                       |
|           path.mkdir()           |             **创建单级路径，如果是多级别则报错**             |
|     path.mkdir(parents=True)     |                         创建多级目录                         |
|           path.rmdir()           |                           删除目录                           |
|           path.unlink            |                           删除文件                           |
| txt_path.replace(‘new_demo.txt’) | 移动文件，txt_path目录下的 demo.txt 文件移动到当前工作目录，并重命名为 new_demo.txt。如果移动的目录不存在，则会报错，可以使用exists方法查询是否存在。 |
|  txt_path.with_name(‘new.txt’)   |                          重命名文件                          |
|  txt_path.with_suffix(‘.json’)   |                        修改文件后缀名                        |

常用的 pathlib 和 os 对比图：

|      操作      |    os and os.path    |              pathlib              |
| :------------: | :------------------: | :-------------------------------: |
|    绝对路径    |   os.path.abspath    |           Path.resolve            |
|    修改权限    |       os.chmod       |            Path.chmod             |
|    创建目录    |       os.mkdir       |            Path.mkdir             |
|     重命名     |      os.rename       |            Path.rename            |
|      移动      |      os.replace      |           Path.replace            |
|    删除目录    |       os.rmdir       |            Path.rmdir             |
|    删除文件    | os.remove, os.unlink |            Path.unlink            |
|    工作目录    |      os.getcwd       |             Path.cwd              |
|    是否存在    |    os.path.exists    |            Path.exists            |
|    用户目录    |  os.path.expanduser  |   Path.expanduser and Path.home   |
|   是否为目录   |    os.path.isdir     |            Path.is_dir            |
|   是否为文件   |    os.path.isfile    |           Path.is_file            |
|   是否为连接   |    os.path.islink    |          Path.is_symlink          |
|    文件属性    |       os.stat        | Path.stat, Path.owner, Path.group |
| 是否为绝对路径 |    os.path.isabs     |       PurePath.is_absolute        |
|    路径拼接    |     os.path.join     |         PurePath.joinpath         |
|     文件名     |   os.path.basename   |           PurePath.name           |
|    上级目录    |   os.path.dirname    |          PurePath.parent          |
|    同名文件    |   os.path.samefile   |           Path.samefile           |
|      后缀      |   os.path.splitext   |          PurePath.suffix          |

```python
from pathlib import Path

# 获取当前路径
v = Path.cwd()

# 创建 project/test目录
Path('project/test').mkdir(parents=True, exist_ok=True)

# 将test.txt 重命名为 project/tests.txt
Path('project/test').rename('project/test.txt')

# 拼接目录
paths = ["test", "test.txt"]
Path.cwd().parent.joinpath(*paths)

# 获取上上层目录
print(Path.cwd().parent.parent)

# 迭代器访问的所有文件、文件夹路径的迭代器
p = Path.cwd()
for i in p.iterdir():
    print(i)  # i为Path类型，linux下为pathlib.PosixPath类型

# *******************其它操作*************************
path = Path.cwd()

print(path.parent)  # 返回所有上级目录的列表

print(path.parts)  # 分割路径 类似os.path.split(), 不过返回元组

print(path.root)  # 返回路径的根目录

print(path.is_dir())  # 判断是否是目录

print(path.is_dir())  # 是否是文件

print(path.exists())  # 判断路径是否存在

print(path.open(self, mode, buffering, encoding, errors, newline))  # 打开文件(支持with)需填入参数

print(path.resolve())  # 返回绝对路径

print(path.cwd())  # 返回当前目录

print(path.iterdir())  # 遍历目录的子目录或者文件

print(path.mkdir())  # 创建目录

print(path.rename())  # 重命名路径

print(path.unlink())  # 删除文件或目录(目录非空触发异常)

print(path.joinpath())  # 拼接路径

```



---

## shutil

shutil模块提供了许多关于`文件和文件集合的高级操作，特别提供了支持文件复制和删除`的功能。

|                          方法                           |                             说明                             |
| :-----------------------------------------------------: | :----------------------------------------------------------: |
|       **copyfileobj(fsrc, fdst, length=16*1024)**       | 将fsrc**文件内容复制**至fdst文件，length为fsrc每次读取的长度，用做缓冲区大小 |
|                 **copyfile(src, dst)**                  |     将src**文件内容**复制至dst文件,如果dst没有则创建一份     |
|                   copymode(src, dst)                    |   将src文件权限复制至dst文件。文件内容，所有者和组不受影响   |
|                   copystat(src, dst)                    | 将权限，上次访问时间，上次修改时间以及src的标志复制到dst。文件内容，所有者和组不受影响 |
|                   **copy(src, dst)**                    | 将文件src复制至dst。dst可以是个目录，会在该目录下创建与src同名的文件，若该目录下存在同名文件，将会报错提示已经存在同名文件。权限会被一并复制。**本质是先后调用了copyfile与copymode** |
|                   **copy2(src, dst)**                   | 将文件src复制至dst。dst可以是个目录，会在该目录下创建与src同名的文件，若该目录下存在同名文件，将会报错提示已经存在同名文件。权限、上次访问时间、上次修改时间和src的标志会一并复制至dst。**本质是先后调用了copyfile与copystat方法** |
|             **ignore_patterns(*patterns)**              | 忽略模式，用于配合copytree()方法，传递文件将会被忽略，不会被拷贝 |
|   **copytree(src, dst, symlinks=False, ignore=None)**   |    拷贝文档树，**将src文件夹里的所有内容**拷贝至dst文件夹    |
|   **rmtree(path, ignore_errors=False, onerror=None)**   |      移除文档树，将文件夹目录删除，**如果没有则会报错**      |
|                   **move(src, dst)**                    | 将src移动至dst目录下。若dst目录不存在，则效果等同于src改名为dst。若dst目录存在，将会把src文件夹的所有内容移动至该目录下面 |
|                    disk_usage(path)                     |                 获取当前目录所在硬盘使用情况                 |
|           chown(path, user=None, group=None)            |            修改路径指向的文件或文件夹的所有者或分            |
|                           ---                           |                             ---                              |
|       which(cmd, mode=os.F_OK os.X_OK, path=None)       | 搜索环境变量PATH，查找给定的命令cmd，并返回其绝对路径。如果找不到则返回None |
|      make_archive(base_name, format, root_dir, …)       |                         生成压缩文件                         |
|                  get_archive_formats()                  | 获取支持的压缩文件格式。目前支持的有：tar、zip、gztar、bztar。在Python3还多支持一种格式xztar |
| unpack_archive(filename, extract_dir=None, format=None) |                           解压操作                           |
|                  get_unpack_formats()                   | 获取支持的解压文件格式。目前支持的有：tar、zip、gztar、bztar和xztar。Python3新增方法 |

```python
import os.path
import shutil

# copyfileobj
f1 = open("file.txt", 'r')
# a+ 以追加的方式读写
f2 = open("file_copy.txt", 'a+')
shutil.copyfileobj(f1, f2, length=1024)

# copyfile 将src文件内容复制至dst文件,如果dst没有则创建一份
shutil.copyfile("file.txt", "file_copy_1.txt")

# copytree
folder1 = os.path.join(os.getcwd(), "aaa")  # 必须存在
folder2 = os.path.join(os.getcwd(), "bbb", "ccc")  # bbb与ccc文件夹都可以不存在,会自动创建
print(folder1)
print(folder2)
# 将"abc.txt","bcd.txt"忽略，不复制
shutil.copytree(folder1, folder2, ignore=shutil.ignore_patterns("abc.txt", "bcd.txt"))

# rmtree 删除的文件树必须存在 运行时先将copytree注释掉
folder1 = os.path.join(os.getcwd(), "bbb")
shutil.rmtree(folder1)
```

---

## random

random模块用于生成随机数

|                random.random()                |            生成0到1之间的随机浮点数            |
| :-------------------------------------------: | :--------------------------------------------: |
|             random.randint(1,10)              |        生成1到10之间的随机整数，包括10         |
|            random.uniform(1.1,5.4)            | 生成1.1到5.4之间的随机浮点数，区间可以不是整数 |
|           random.randrange(1,100,2)           |   生成从1到100的间隔为2的随机整数，不包括100   |
|           random.choice('tomorrow')           |            从序列中随机选取一个元素            |
|     random.choice(['剪刀', '石头', '布'])     |                  随机选择元素                  |
| random.sample('zyxwvutsrqponmlkjihgfedcba',5) |       随机选择5个元素，生成一个新的列表        |
|             random.shuffle(items)             |                对items打乱排序                 |

```python
import random

print(random.randint(1, 10))
print(random.random())  # 0~1之间的随机浮点数
print(random.uniform(1.1, 5.4))  # 1.1~5.4之间的随机浮点数
print(random.choice("tomorrow"))
print(random.choice(['剪刀', '石头', '布']))  # 随机选择元素
print(random.randrange(1, 100, 2))  # 生成从1到100的间隔为2的随机整数，不包括100
print(random.sample('zyxwvutsrqponmlkjihgfedcba', 5))  # 随机选择5个元素，生成一个新的列表

# 打乱排序
items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
random.shuffle(items)
print(items)
```

---

## json

JSON (JavaScript Object Notation) 是一种`轻量级的数据交换格式`。Python3 中可以使用 json 模块来对 JSON 数据进行编解码，它主要提供了`四个方法： dumps、dump、loads、load`。

- dump和dumps对python对象进行序列化。将一个Python对象进行JSON格式的编码。
- load和loads反序列化方法,将json格式数据解码为python对象。

python 原始类型向 json 类型的`转化对照表`：

|      Python      |  JSON  |
| :--------------: | :----: |
|       dict       | object |
|   list, tuple    | array  |
|   str, unicode   | string |
| int, long, float | number |
|       True       |  true  |
|      False       | false  |
|       None       |  null  |

|    方法    |                   说明                   |
| :--------: | :--------------------------------------: |
| json.dumps |     将 Python 对象编码成 JSON 字符串     |
| json.loads | 将已编码的 JSON 字符串解码为 Python 对象 |

1. dump和dumps介绍：

> * **dump函数形式**：json.dump(obj, fp, *, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=None, separators=None, default=None, sort_keys=False, kw)
> * **dumps函数形式**：json.dumps(obj, *, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=None, separators=None, default=None, sort_keys=False, kw)

| 参数           | 说明                                                         |
| :------------- | :----------------------------------------------------------- |
| obj            | 表示要序列化的对象                                           |
| fp             | **dump与dumps的唯一区别，dumps没有该参数**。文件描述符，将序列化的str保存到文件中。json模块总是生成str对象，而不是字节对象；因此，fp.write（）必须支持str输入 |
| skipkeys       | 默认为False，如果skipkeys为True，则将跳过不是基本类型（str，int，float，bool，None）的dict键，不会引发TypeError |
| ensure_ascii   | 默认值为True，能将所有传入的非ASCII字符转义输出。如果ensure_ascii为False，则这些字符将按原样输出 |
| check_circular | 默认值为True，如果check_circular为False，则将跳过对容器类型的循环引用检查，循环引用将导致OverflowError |
| allow_nan      | 默认值为True，如果allow_nan为False，则严格遵守JSON规范，序列化超出范围的浮点值（nan，inf，-inf）会引发ValueError。 如果allow_nan为True，则将使用它们的JavaScript等效项（NaN，Infinity，-Infinity） |
| indent         | 参数设置缩进格式，默认值为None，选择的是最紧凑的表示。如果indent是非负整数或字符串，那么JSON数组元素和对象成员将使用该缩进级别进行输入；indent为0，负数或“”仅插入换行符；indent使用正整数缩进多个空格；如果indent是一个字符串（例如“\t”），则该字符串用于缩进每个级别 |
| separators     | 去除分隔符后面的空格，默认值为None，如果指定，则分隔符应为（item_separator，key_separator）元组。如果缩进为None，则默认为（’，’，’：’）；要获得最紧凑的JSON表示，可以指定（’，’，’:’）以消除空格 |
| default        | 默认值为None，如果指定，则default应该是为无法以其他方式序列化的对象调用的函数。它应返回对象的JSON可编码版本或引发TypeError。如果未指定，则引发TypeError |
| sort_keys      | 默认值为False，如果sort_keys为True，则字典的输出将按键值排序 |

2. load和loads

> - load函数形式：`json.load(fp, *, cls=None, object_hook=None, parse_float=None, parse_int=None, parse_constant=None, object_pairs_hook=None, **kw)`
>
> |       fp       | 文件描述符，将fp（.read（）支持包含JSON文档的文本文件或二进制文件）反序列化为Python对象 |
> | :------------: | :----------------------------------------------------------: |
> |  object_hook   | 默认值为None，object_hook是一个可选函数，此功能可用于实现自定义解码器。指定一个函数，该函数负责把反序列化后的基本类型对象转换成自定义类型的对象 |
> |  parse_float   | 默认值为None，如果指定了parse_float，用来对JSON float字符串进行解码，这可用于为JSON浮点数使用另一种数据类型或解析器 |
> |   parse_int    | 默认值为None，如果指定了parse_int，用来对JSON int字符串进行解码，这可以用于为JSON整数使用另一种数据类型或解析器 |
> | parse_constant | 默认值为None，如果指定了parse_constant，对-Infinity，Infinity，NaN字符串进行调用。如果遇到了无效的JSON符号，会引发异常 |
>
> - loads函数形式：json.loads(s, *, encoding=None, cls=None, object_hook=None, parse_float=None, parse_int=None, parse_constant=None, object_pairs_hook=None, **kw)
>
> |   参数   |                             说明                             |
> | :------: | :----------------------------------------------------------: |
> |    s     | 将s（包含JSON文档的str，bytes或bytearray实例）反序列化为Python对象。 |
> | encoding |                     指定一个编码的格式。                     |
>
> `loads也不需要文件描述符，其他参数的含义和load函数的一致`。

```python
# dumps和dump
import json

# dumps可以格式化所有的基本数据类型为字符串
data1 = json.dumps([1, 2, 3, 4])
print(data1, type(data1))
data2 = json.dumps(100)
print(data2, type(data2))
data3 = json.dumps('qlee')  # 字符串
print(data3, type(data3))
dict = {"name": "Tom", "age": 23}  # 字典
data4 = json.dumps(dict)
print(data4, type(data4))

with open("test.json", "w", encoding='utf-8') as f:
    # indent,表示空格数，默认为None，小于0为零个空格
    f.write(json.dumps(dict, indent=4))  # 保存到f中
    # json.dump(dict, f, indent=4)  # 保存到f中
```

```python
# load 和 loads
dict = '{"name": "Tom", "age": 23}'  # 将字符串还原为dict
print(type(dict))
data1 = json.loads(dict)
print(data1, type(data1))

with open("test.json", "r", encoding='utf-8') as f:
    data2 = json.loads(f.read())  # 加载方式一：load的传入参数为字符串类型
    print(data2, type(data2))
    f.seek(0)  # 将文件游标移动到文件开头位置
    data3 = json.load(f)  # 加载方式二
    print(data3, type(data3))
```

---

## pickle

pickle模块实现了用于序列化和反序列化Python对象结构的`二进制协议`。pickle模块只能在Python中使用，python中几乎所有的数据类型（列表，字典，集合，类等）都可以用pickle来序列化，pickle序列化后的数据，可读性差，人一般无法识别。

pickle协议和JSON（JavaScript Object Notation）的区别 ：

> 1. `JSON是一种文本序列化格式`（它输出unicode文本，虽然大部分时间它被编码utf-8），而`pickle是二进制序列化格式`;
> 2. `JSON是人类可读的，而pickle则不是`;
> 3. JSON是可互操作的，并且在Python生态系统之外广泛使用，而`pickle是特定于Python的`;

|                             方法                             |                             说明                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|  pickle.dump(obj, file, protocol=None, *, fix_imports=True)  | 将序列化后的对象obj以二进制形式写入文件file中，效等同于 Pickler(file, protocol).dump(obj) |
|    pickle.dumps(obj, protocol=None, *, fix_imports=True)     | pickle.dumps()方法不需要写入文件中，它是直接返回一个序列化的bytes对象 |
|   pickle.Pickler(file, protocol=None, *, fix_imports=True)   |             实现的功能跟 pickle.dump() 是一样的              |
| pickle.load(file, *, fix_imports=True, encoding="ASCII", errors="strict") | 将序列化的对象从文件file中读取出来。它的功能等同于 Unpickler(file).load() |
| pickle.loads(bytes_object, *, fix_imports=True, encoding="ASCII", errors="strict") | pickle.loads()方法是直接从bytes对象中读取序列化的信息，而非从文件中读取 |
| pickle.Unpickler(file, *, fix_imports=True, encoding="ASCII", errors="strict") |  Unpickler(file).load() 实现的功能跟 pickle.load() 是一样的  |

```python
import pickle

path = 'test'  # 保存路径
f = open(path, 'wb')
data = {'a': 123, 'b': 'ads', 'c': [[1, 2], [3, 4]]}
pickle.dump(data, f)  # 保存
f.close()

f1 = open(path, 'rb')
data1 = pickle.load(f1)  # 解析
print(data1)
```

---

## logging

logging模块是Python内置的标准模块，主要用于输出运行日志，可以设置输出日志的等级、日志保存路径、日志文件回滚等；相比print，具备如下优点：

可以通过设置不同的日志等级，在release版本中只输出重要信息，而不必显示大量的调试信息；
print将所有信息都输出到标准输出中，严重影响开发者从标准输出中查看其它数据；logging则可以由开发者决定将信息输出到什么地方，以及怎么输出；

1. ## 基本使用

`只有级别大于或等于日志记录器指定级别的日志记录才会被输出，小于该级别的日志记录将会被丢弃`。级别排序:CRITICAL > ERROR > WARNING > INFO > DEBUG。

logging.basicConfig函数各参数说明：

|    参数    |                             说明                             |
| :--------: | :----------------------------------------------------------: |
|  filename  |                        指定日志文件名                        |
|  filemode  |    和file函数意义相同，指定日志文件的打开模式，‘w’或者‘a’    |
| **format** |    **指定输出的格式和内容，format可以输出很多有用的信息**    |
|  datefmt   |               指定时间格式，同time.strftime()                |
|   level    |             设置日志级别，默认为logging.WARNNING             |
|   stream   | 指定将日志的输出流，可以指定输出到sys.stderr，sys.stdout或者文件，默认输出到sys.stderr，当stream和filename同时指定时，stream被忽略 |

format中输出的格式个内容：

|      参数      |                    说明                     |
| :------------: | :-----------------------------------------: |
|  %(levelno)s   |             打印日志级别的数值              |
| %(levelname)s  |             打印日志级别的名称              |
|  %(pathname)s  | 打印当前执行程序的路径，其实就是sys.argv[0] |
|  %(filename)s  |             打印当前执行程序名              |
|  %(funcName)s  |             打印日志的当前函数              |
|   %(lineno)d   |             打印日志的当前行号              |
|  %(asctime)s   |               打印日志的时间                |
|   %(thread)d   |                 打印线程ID                  |
| %(threadName)s |                打印线程名称                 |
|  %(process)d   |                 打印进程ID                  |
|  %(message)s   |                打印日志信息                 |

```python
import logging

# logging的级别为DEBUG，所以全部输出
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

logging.debug('debug message')
logging.info('info message')
logging.warning('warning message')
logging.error('error message')
logging.critical('critical message')
```

2. ## 将日志输出到文件

```python
# 将日志输出到文件
logger = logging.getLogger(__name__)
logger.setLevel(level=logging.DEBUG)

handler = logging.FileHandler("log.txt")  # 将日志输出到log.txt
handler.setLevel(logging.WARNING)  # 只输出handler和logger的setLevel级别更高的一级
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

logger.debug('debug message')
logger.info('info message')
logger.warning('warning message')
logger.error('error message')
logger.critical('critical message')
logger.info("Finish")
```

3. ## 使用json文件配置

使用JSON配置文件：

```python
import json
import logging.config
import os


def setup_logging(default_path="logging.yaml", default_level=logging.INFO, env_key="LOG_CFG"):
    path = default_path
    value = os.getenv(env_key, None)
    if value:
        path = value
    if os.path.exists(path):
        with open(path, "r") as f:
            config = json.load(f)
            logging.config.dictConfig(config)
    else:
        logging.basicConfig(level=default_level)


def func():
    logging.info("start func")
    logging.error("exec func")
    logging.warning("end func")


if __name__ == "__main__":
    setup_logging(default_path="logging.yaml")
    func()
```

使用YAML配置文件：

```python
import yaml
import logging.config
import os
 
def setup_logging(default_path = "logging.yaml",default_level = logging.INFO,env_key = "LOG_CFG"):
    path = default_path
    value = os.getenv(env_key,None)
    if value:
        path = value
    if os.path.exists(path):
        with open(path,"r") as f:
            config = yaml.load(f)
            logging.config.dictConfig(config)
    else:
        logging.basicConfig(level = default_level)
 
def func():
    logging.info("start func")
 
    logging.info("exec func")
 
    logging.info("end func")
 
if __name__ == "__main__":
    setup_logging(default_path = "logging.yaml")
    func()
```

---

# Python常用外置模块

## virtualenv

​	在python开发中，我们可能会遇到一种情况，就是当前的项目依赖的是某一个版本，但是另一个项目依赖的是另一个版本，这样就会造成依赖冲突，而virtualenv就是解决这种情况的，**virtualenv通过创建一个虚拟化的python运行环境，将我们所需的依赖安装进去的，不同项目之间相互不干扰**，如下所示。 

![img](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/141dcffba30f4fd5b8b7835e46b0d5b9.png)

**安装virtualenv**:

```python
pip install virtualenv
# 或者
apt-get install virtualenv
```

**virtualenv运行使用**

```shell
virtualenv project_name
# 这里我的demo名称如下，后续也是一样
virtualenv venv
```

**激活虚拟环境**

创建好虚拟环境后,控制台cd到`venv`目录下的`Scripts`目录直接输入activate激活

```shell
# 注意路径是否正确
(projects) PS G:\StudySpace\Python爬虫\modules\external\virtualenv\venv\venv\Scripts> .\activate
```

如果控制台出现`(venv)`则激活成功，如下图所示

![image-20230531173552343](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20230531173552343.png)

**安装依赖**

在以上完成之后就可以通过命令pip install 来安装python包了，这里安装python包就不需要root权限了，直接就可以安装十分方便。在venv的环境中，使用pip安装的包都**不会再是全局性**的包，只会在当前的虚拟环境中起作用，避免了污染系统环境。

**退出虚拟环境**

使用deactivate退出虚pip拟环境

> deactivate

**综上**
virtualenv就是一个搭建虚拟化的python环境，便于不同的项目在同一台机器上开发运行。

virtualenv更多的还是适用于本地开发不同的项目，但是在生产环境中还是使用**Docker**给不同的项目创建不同的容器，各自分开运行为好，不宜放在一个单独的物理机中运行。

---

## requests

**简介**

requests 模块是 python 基于 urllib，采用 Apache2 Licensed 开源协议的 HTTP 库。它比 urllib 更加方便，可以节约我们大量的工作，

完全满足 HTTP 测试需求。Requests 的哲学是以 PEP 20 的习语为中心开发的，所以它比 urllib 更加 Pythoner

**安装**

通过 `pip install requests` 安装 requests 库

---

**扩展：**

**HTTP协议**

http ，超文本传输协议，是互联网上应用最为广泛的一种[网络协议](https://so.csdn.net/so/search?q=网络协议&spm=1001.2101.3001.7020)。所有的WWW文件都必须遵守这个标准。设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法，HTTP是一种基于"请求与响应"模式的、无状态的应用层协议。HTTP协议采用URL作为定位网络资源的的标识符

**URL:**

统一资源定位符是互联网上标准资源地址。互联网上的每一个文件都有一个唯一的 URL，它包含的信息指出文件的位置以及浏览器应该怎么处理它

URL 的一般语法格式为：

```java
protocol://host[:port]/path/[?query]#fragment
http://www.itcast.cn/index.html?name=andy&age=18#link
```

| 组成部分 |                             说明                             |
| :------: | :----------------------------------------------------------: |
| protocol |               通信协议，常用的有http、https等                |
|   host   |                     主机，即域名或IP地址                     |
|   port   | 端口号，可选，省略时使用方案的默认端口（如http的默认端口为80） |
|   path   | 路径，由零或多个‘/’符号隔开的字符串，一般用来表示主机上的一个目录或文件地址 |
|  query   |              参数，以键值对的形式通过‘&’来连接               |
| fragment |              片段，‘#’后面的内容常见于链接锚点               |

> URL是通过HTTP协议存取资源的的Internet路径，一个URL对应一个数据资源

**常用HTTP请求方法**

|  方法  |                          说明                           |
| :----: | :-----------------------------------------------------: |
|  GET   |                  请求获取URL位置的资源                  |
|  HEAD  | 请求获取URL位置资源的响应消息报告，即获得资源的头部信息 |
|  POST  |            请求向URL位置的资源后附加新的消息            |
|  PUT   |     请求向URL位置存储一个资源，覆盖原URL位置的资源      |
| PATCH  |   请求局部更新URL位置的资源，即改变该处资源的部分内容   |
| DELETE |                请求删除URL位置存储的资源                |

> `GET`,`HEAD`是从服务器获取信息到本地，`PUT`,`POST`,`PATCH`,`DELETE`是从本地向服务器提交信息。通过URL和命令管理资源，操作独立无状态，网络通道及服务器成了黑盒子

---

**API**

| requests.request() |             构造一个请求，是下面方法的支撑              |
| :----------------: | :-----------------------------------------------------: |
|   requests.get()   |              获取网页，对应HTTP中的GET方法              |
|  requests.post()   |          向网页提交信息，对应HTTP中的POST方法           |
|  requests.head()   |       获取html网页的头信息，对应HTTP中的HEAD方法        |
|   requests.put()   |         向html提交put方法，对应HTTP中的PUT方法          |
|  requests.patch()  | 向html网页提交局部请求修改的请求，对应HTTP中的PATCH方法 |
| requests.delete()  |       向html提交删除请求，对应HTTP中的DELETE方法        |

---

> 主要使用 get 和 post 方法

---

**具体使用**

> GET

```python
import requests

resp = requests.get(url="https://www.baidu.com")
print(resp)
-------控制台输出----------
<Response [200]>
```

> resp 是一个Response对象，一个包含服务器资源的对象

参数列表:

|  参数   |  类型  |                             作用                             |
| :-----: | :----: | :----------------------------------------------------------: |
| params  |  字典  | URL为基准的URL地址，不包含查询参数；该方法会自动对params字典进行编码，然后和URL拼接 |
|   url   | 字符串 |                    requests发起请求的地址                    |
| headers |  字典  | 请求头，发送请求的过程中附加的内容，通常用于传递一些必要的参数 |
| cookies |  字典  |           携带登录状态，可以在请求中携带cookie信息           |
| proxies |  字典  |     用于设置代理IP服务器，可以在请求中指定使用代理服务器     |
| timeout |  整型  | 用于设定超时时间，单位为秒，如果在指定时间内服务器没有响应，则会抛出Timeout异常 |

---

> POST

```python
# 单词翻译案例
import requests

word = input("输入一个单词")
url = "https://fanyi.baidu.com/sug"
data = {
    "kw": word,
}
headers = {
    'User-Agent': "Mozilla / 5.0(Windows NT 10.0;Win64;x64) AppleWebKit / 537.36(KHTML, likeGecko) Chrome / 96.0.4664 .93 Safari / 537.36",
}
resp = requests.post(url, data, headers)
print(resp.json())
```

参数列表:

| 参数 | 类型 |                             作用                             |
| :--: | :--: | :----------------------------------------------------------: |
| data | 字典 |      作为向服务器提供或提交资源时提交，主要用于POST请求      |
| json | 字典 | JSON格式的数据，通常用于传输结构化数据，在相关的API中可以使用JSON格式进行传输 |

>注意：
>
>- data 和 params 的区别是： data提交的数据并不放在url链接里， 而是放在url链接对应位置的地方作为数据来存储
>- data 和 json 的作用类似，适用方法相同
>- get 里面的参数大部分也适用

---

> response：http请求响应后的数据对象

|        属性/方法        |                             说明                             |
| :---------------------: | :----------------------------------------------------------: |
|    resp.status_code     |          HTTP请求的返回状态，若为200则表示请求成功           |
| resp.raise_for_status() | 该语句在方法内部判断`resp.status_code`是否等于200，如果不等于，则抛出异常 |
|      **resp.text**      |        **HTTP响应内容的字符串形式，即返回的页面内容**        |
|      resp.encoding      |            从HTTP header中猜测的相应内容编码方式             |
| resp.apparent_encoding  |       从内容中分析出的响应内容编码方式（备选编码方式）       |
|      resp.content       |                   HTTP响应内容的二进制形式                   |
|       resp.json()       |             得到对应的JSON格式的数据，类似于字典             |

> head

```python
import requests

url = "http://www.baidu.com"
header = {
    'User-Agent': "Mozilla / 5.0(Windows NT 10.0;Win64;x64) AppleWebKit / 537.36(KHTML, likeGecko) Chrome / 96.0.4664 .93 Safari / 537.36",
}
resp = requests.head(url=url)
print(resp.headers)
```

> resp.headers 方法反馈头部内容，很少网络流量获得概要信息

---

> PUT

python接口自动化

put请求的作用：更新资源
其语法和 post 请求的语法类似

> put 和 post 区别：
>
> 新建一条记录的话就用post
> POST 方法被用于请求源服务器接受请求中的实体作为请求资源的一个新的从属物
> 更新一条记录的话就用put
> PUT方法请求服务器去把请求里的实体存储在请求URI标识下

---

## pymysql

**安装**

在python3的环境中直接使用以下命令即可：

```shell
pip install pymysql
#或者
pip3 install pymysql
```

安装完毕后可使用以下命令查看：

```shell
pip list 
#注意大小写 查看是否有下面一行
PyMySQL            1.0.3
```

---

**连接数据库**

pymysql连接数据库使用的是 `pymsql.connect() `函数，其常用参数如下：

|      参数       |                             说明                             |
| :-------------: | :----------------------------------------------------------: |
|       dsn       |             数据源名称，给出该参数表示数据库依赖             |
|      host       |                        数据库连接地址                        |
|      user       |                         数据库用户名                         |
|    password     |                        数据库用户密码                        |
|    database     |                      要连接的数据库名称                      |
|      port       |                      端口号，默认为3306                      |
|     charset     | 要连接的数据库的字符编码（可以在终端登陆mysql后使用 \s 查看，如下图） |
| connect_timeout |                连接数据库的超时时间，默认为10                |

**连接完数据库后，需要创建一个游标对象，模块会通过游标对象来执行sql语句以及获取查询结果，接下来直接通过代码展示各方法。**

```python
import pymysql

# 连接数据库
db = pymysql.connect(
    host="localhost",
    port=3306,
    user="root",
    password="Flyone", # 你自己的数据库密码
    charset="utf8mb4"
)
# 创建游标对象
cursor = db.cursor()
# 编写SQL语句
sql = "show databases"
# 执行SQL语句
cursor.execute(sql)
one = cursor.fetchone() # 获取一条数据
print("one", one)
```

运行代码后发现报错

![image-20230531192848755](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20230531192848755.png)

发现需要安装`cryptography`库来支持`sha256_password`或`caching_sha2_password`验证方法。这两种验证方法是MySQL 8.0及以上版本默认的密码验证方法，如果没有安装`cryptography`库，就会出现上述错误。

要解决这个问题，可以通过安装`cryptography`库来支持这些验证方法。可以使用pip来安装：

```python
pip install cryptography
```

安装后重新运行:

> 成功

![image-20230531193035402](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20230531193035402.png)

> 继续获取多条数据

```python
import pymysql

# 连接数据库
db = pymysql.connect(
    host="localhost",
    port=3306,
    user="root",
    password="Flyone",
    charset="utf8mb4"
)
# 创建游标对象
cursor = db.cursor()
# 编写SQL语句
sql = "show databases"
# 执行SQL语句
cursor.execute(sql)
one = cursor.fetchone()  # 获取一条数据
print("one", one)

many = cursor.fetchmany(3)  # 获取指定条数的数据，不写默认为1
print('many:', many)

allData = cursor.fetchall()  # 获取全部数据
print('all:', allData)

cursor.close()
db.close()  # 关闭数据库的连接
```

从结果可以看出，fetchone()，fetchmany(size)，fetchall() 三个函数返回值都是元组，但是fetchone()返回的是单个元组，另外两个返回的都是元组的嵌套。

---

**创建数据库和管理数据库**

```python
import pymysql

# 连接数据库
db = pymysql.connect(
    host="localhost",
    port=3306,
    user="root",
    password="Flyone",
    charset="utf8mb4"
)

cursor = db.cursor()

try:
    sql = "show databases"
    cursor.execute(sql)
    print("未创建数据库前：", cursor.fetchall())  # 查询全部数据库

    dbName = "test_create"
    sql = "create database if not exists %s" % dbName  # 创建数据库
    cursor.execute(sql)
    sql = 'show databases'
    cursor.execute(sql)
    print("创建数据库后：", cursor.fetchall())

    sql = "drop database if exists %s" % dbName  # 删除数据库
    cursor.execute(sql)
    sql = 'show databases'
    cursor.execute(sql)
    print("删除数据库后：", cursor.fetchall())

except Exception as e:
    print(e)
    db.rollback()  # 出现错误后，回滚事务

finally:
    cursor.close()
    db.close() # 关闭数据库连接
```

---

**创建和管理表**

```python
import pymysql

# 连接数据库
db = pymysql.connect(
    host="localhost",
    port=3306,
    user="root",
    password="Flyone",
    database="592test",
    charset="utf8mb4"
)

cursor = db.cursor()

try:
    tableName = 'user'
    sql = 'create table if not exists  %s (id varchar(20) not null, name varchar(20) not null, primary key(id))' % tableName
    cursor.execute(sql)  # 执行sql语句，创建表

    sql = 'show tables'
    cursor.execute(sql)
    print('显示创建的表:', cursor.fetchall())  # 显示创建的表

    sql = 'desc %s' % tableName
    cursor.execute(sql)
    print('显示表结构:', cursor.fetchall())  # 显示表结构

    sql = "insert into %s values(2,'张三')" % tableName
    cursor.execute(sql)

    sql = "select * from %s" % tableName
    cursor.execute(sql)
    print("%s数据:" % tableName, cursor.fetchall())
    # 提交事物 必须提交事务，否则事务会进行回滚
    db.commit()
except Exception as e:
    print(e)
    db.rollback()  # 出现错误后，回滚事务

finally:
    cursor.close()
    db.close()

```

---

**总结**

对于修改表结构，插入，查询，删除数据等操作，与上面的操作大体一样，主要是对 sql 语句的编写，此处不做赘述。
整体过程：
连接数据库 -> 创建游标对象 -> 编写sql语句 -> 执行sql语句 -> 获取结果 -> 关闭数据库连接

**(插入、更新和删除等操作后，需要使用`conn.commit()`语句提交事务)**

`connect()` 函数常用参数：

|      参数       |                             说明                             |
| :-------------: | :----------------------------------------------------------: |
|       dsn       |             数据源名称，给出该参数表示数据库依赖             |
|      host       |                        数据库连接地址                        |
|      user       |                         数据库用户名                         |
|    password     |                        数据库用户密码                        |
|    database     |                      要连接的数据库名称                      |
|      port       |                      端口号，默认为3306                      |
|     charset     | 要连接的数据库的字符编码（可以在终端登陆mysql后使用 \s 查看，如下图） |
| connect_timeout |                连接数据库的超时时间，默认为10                |

`connect() `函数返回的连接对象的方法总结：

|   方法名   |                          说明                           |
| :--------: | :-----------------------------------------------------: |
|  close()   |                     关闭数据库连接                      |
|  commit()  |                        提交事务                         |
| rollback() |                        回滚事务                         |
|  cursor()  | 获取游标对象，操作数据库，如执行DML操作，调用存储过程等 |

游标对象的方法：

|                方法名                 |                    说明                    |
| :-----------------------------------: | :----------------------------------------: |
|   callproc(procname,[,parameters])    |        调用存储过程，需要数据库支持        |
|                close()                |                关闭当前游标                |
|   execute(operation,[,parameters])    |   执行数据库操作，sql语句或者数据库命令    |
| executemany(operation, seq_of_params) |                用于批量操作                |
|              fetchone()               |       获取查询结果集合中的下一条记录       |
|            fetchmany(size)            |             获取指定数量的记录             |
|              fetchall()               |          获取查询结果集合所有记录          |
|               nextset()               |           跳至下一个可用的数据集           |
|               arraysize               |   指定使用fetchmany()获取的行数，默认为1   |
|          setinputsizes(size)          | 设置调用execute*()方法时分配的内存区域大小 |
|         setoutputsizes(size)          |    设置列缓冲区大小，对大数据列尤其有用    |

