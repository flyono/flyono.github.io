---
title: Jenkins 自动化部署
date: 2024年3月4日 13:00:00
updated: 2024-3-5 16:39:41
categories: "教程"
tags: 
  - "自动化"
  - "Jenkins"
---

# Jenkins 自动化部署

# 一、项目创建、启动

1. 新建Item

![image-20240304135834729](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304135834729.png)

2. 输入基本信息

![image-20240304135915246](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304135915246.png)

3. 配置仓库

![image-20240304135955338](C:/Users/luoyifei/AppData/Roaming/Typora/typora-user-images/image-20240304135955338.png)

4. 新增构建步骤

![image-20240304140022335](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304140022335.png)

5. 不要忘了 Maven 的 `Maven安装` 以及 `Tool` 配置

![image-20240304140136299](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304140136299.png)

![image-20240304140106811](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304140106811.png)

6. 现在就可以运行我们的项目了

![image-20240304140354770](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304140354770.png)

# 二、自动化部署

## 插件下载

`Publish-Over-SSH`

## 系统配置SSH

打开 Jenkins Manager -> System -> Publish over SSH

新增`SSH Servers`

![image-20240304141329944](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304141329944.png)

![image-20240304141717011](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304141717011.png)

## 构建步骤

![image-20240304141131772](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304141131772.png)

![image-20240304143302117](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304143302117.png)

> 这里测试连接发现报错
>
> `Failed to connect and initialize SSH connection. Message: [Failed to connect SFTP channel. Message [4: Received message is too long: 1282367839]]`
>
> 原因：
>
> 该错误是由远程系统（SFTP服务器）上的默认shell启动（或初始化）文件，如.bashrc、.bash_profile、/etc/profile或.shrc引起的，如果这些文件尝试将文本写入终端，就会引发错误。SSH会话具有由系统或者每个shell启动文件的程序传输信息，干扰了正常的SFTP或SCP协议。
>
> 我遇到的情况是有人在服务器端为了个性化输出一些内容，比如我想在服务器端每次用ssh登陆时看到“欢迎登陆”之类的消息，修改了~/.bashrc文件，导致客户端sftp连接失败。
> ————————————————
>
>                             版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
>
> 原文链接：https://blog.csdn.net/Total_128Bits/article/details/129289056
>
> 修改 /etc/ssh/sshd_config 文件
>
> ```bash
> vim /etc/ssh/sshd_config
>  
> #将下面的字段
> Subsystem sftp /usr/libexec/openssh/sftp-server
> #修改为
> Subsystem sftp internal-sftp
> ```
>
> 然后重启SSH服务 
>
> ```
> service sshd restart
> ```

![image-20240304143507962](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304143507962.png)

没有问题直接保存

---

接着配置我们的项目

![image-20240304144312568](https://bed.flyone.space/%E7%AC%94%E8%AE%B0/image-20240304144312568.png)

```shell
cp /var/jenkins_home/workspace/club-subject/club-subject/club-subject-starter/target/jc-club-subject-starter.jar  /var/jenkins_home/jar/
#!/bin/bash
APP_NAME=club-starter.jar
LOG_NAME=club-starter.log

pid=`ps -ef | grep $APP_NAME | grep -v grep|awk '{print $2}'`

function is_exist(){
pid=`ps -ef | grep $APP_NAME | grep -v grep|awk '{print $2}'`
if [ -z ${pid} ]; then
String="notExist"
echo $String
else
String="exist"
echo $String
fi
}

str=$(is_exist)
if [ ${str} = "exist" ]; then
echo " 检测到已经启动的程序，pid 是 ${pid} "
kill -9 $pid
else
echo " 程序没有启动了 "
echo "${APP_NAME} is not running"
fi

str=$(is_exist)
if [ ${str} = "exist" ]; then
echo "${APP_NAME} 已经启动了. pid=${pid} ."
else
source /etc/profile
BUILD_ID=dontKillMe
nohup java -Xms300m -Xmx300m -jar /var/jenkins_home/jar/$APP_NAME   >$LOG_NAME 2>&1 &
echo "程序已重新启动..."
fi
```

再次启动项目即可
