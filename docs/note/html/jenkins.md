# Jenkins教程

## 前言
> 众所周知，我们在开发的过程中，写代码其实只占很小的一部分，更多的时间其实是在设计代码、构建和部署。

代码的设计非常考验代码功底，本人才疏学浅，就不讲解这个部分了。
构建和部署通常来讲没那么复杂，但是却十分繁琐，尤其是手动的方式进行构建部署。重复操作多，流程长，非常消耗耐心和精力。
细心的同学应该发现标题中出现了一个新的名词：**CI/CD**。
> 在软件工程中，CI/CD 或 CICD 通常指的是持续集成和持续交付或持续部署的组合实践。CI/CD 通过在应用程序的构建、测试和部署中实施自动化，在开发和运营团队之间架起了桥梁。
> —— 引用自维基百科

**CI（Continuous Integration）** 指的是持续集成，即项目代码的新更改会定期构建、测试并合并到代码仓库中，有效解决一次开发多个项目分支导致代码冲突问题。
**CD（Continuous Delivery/Continuous Deployment）** 指的是持续持续交付/持续部署，即项目代码的新更改可以自动或手动合并到主分支，并在合并至主分支后自动执行构建、测试流程，检测新更改是否对主分支代码产生影响。构建测试通过后，会自动发布并部署至生产环境，有效减轻运维团队负担。

概念说了这么多，肯定很多同学直呼看不懂。没关系，我们找个实际场景。
相信很多初学前端的同学一定有过一个想法：写一个自己的网站放到服务器上。
实现这个想法通常需要以下几个步骤：


> 编写代码 -> （单元测试/集成测试） -> 上传至代码仓库 -> 打包构建 -> 上传至服务器 -> 配置 Nginx/Apache 将 80 端口映射至网站文件夹

是不是一个非常长的流程？


当我们有了 CI/CD 的系统之后，我们就**只需要编写代码，剩下的步骤都交给 CI/CD 系统**来处理，这极大地解放了我们的双手，提升了开发效率
## `Jenkins` 简介
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1612676261346-99719c4b-ab4d-43c7-a138-1348c73105e7.png#align=left&display=inline&height=675&margin=%5Bobject%20Object%5D&originHeight=675&originWidth=1080&size=0&status=done&style=none&width=1080)
> `Jenkins` 是开源 CI&CD 软件领导者，提供超过 1000 个插件来支持构建、部署、自动化，满足任何项目的需要。

一句话概括：`Jenkins` 是一款以插件化的方式实现 CI/CD 的软件。
## 前期工作
准备一台**干净的**装有 **CentOS 7+** 的物理机/虚拟机/云服务器。
**注意：后续操作建议在 `root` 用户下进行，避免出现权限问题！**
## 安装 `Jenkins`
首先，我们先检查一下机器是否安装了 `Java`。
很简单，终端输入 `java`，输出不是 `command not found` 就说明我们的机器已经安装了 `Java`。
不过我还是建议使用 `yum` 重新安装一下：
```shell
yum install java
```
接着，安装下载工具 `wget`：
```shell
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
```
然后，导入下载密匙：
```shell
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
```
等上述步骤都执行完成后，就可以开始安装 `Jenkins` 了：
```shell
yum install jenkins
```
安装过程中可能会跳出几个提示，输入 `yes` 或者 `y` 放行就好。
### 启动 `Jenkins`
经过了漫长的等待，我们可以启动 `Jenkins` 了：
```shell
systemctl start jenkins
```
> 在安装jenkins出现了jenkins不支持java 1.8以下的错误，所以导致jenkins不能正常启动
> 重新安装 java jdk 参考：[https://blog.csdn.net/qq_40907977/article/details/106851695](https://blog.csdn.net/qq_40907977/article/details/106851695)

`Jenkins` 运行在机器的 `8080` 端口，**使用云服务器的同学记得到防火墙放行端口**。
### 初始化 `Jenkins`
> 在浏览器输入 `http://<你的服务器 IP>:8080` 就可以访问到 `Jenkins` 的解锁界面了。
> 初始化 `Jenkins` 需要输入一段命令来查看密码：

初始化 `Jenkins` 需要输入一段命令来查看密码：
```shell
cat /var/lib/jenkins/secrets/initialAdminPassword
```
把控制台输出的密码复制到 `Jenkins` 解锁界面中，插件安装界面了。
### 安装插件
我们选择左边的**安装推荐插件**，然后静等插件安装完成。
如果有安装失败的插件，点击重试就好，一般多试几次就可以。
当然不排除有多试几次也不行的，建议重置一下服务器从头再来一次。
不嫌麻烦的话也可以一个一个手动安装，插件下载地址：手动下载地址。
### 创建用户
都搞定之后就是创建一个管理员账号了，输入自己喜欢的用户名和密码，输入全名和电子邮箱就可以创建了。
### 安装 `Node.js` 插件
创建完用户之后就能够进入到欢迎页了，我们找到左边的 **管理 `Jenkins`**，然后找到 **插件管理**。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1613835883686-f64ca0d4-5259-466b-aa3d-61c36381f210.png#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)插件管理
在 **插件管理** 页我们点击 **可选插件** Tab，然后在搜索栏中输入 `NodeJS`，只会命中一个插件，我们安装它。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1613835883652-39c032ba-3bd8-4791-8dbb-f0fe31809cbc.png#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)搜索 NodeJS
等待安装完成。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1613835883657-b057fcde-ffe8-4b02-a8f7-e2437663be05.png#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)NodeJS 安装完成
### 配置 `Node.js` 插件
紧接着我们就要去配置 `Node.js` 了，点击 **管理 `Jenkins`**，找到 **全局工具配置**，然后翻到最底下，有一个 `NodeJS`的配置区域。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1613835883657-7462747f-8c10-46cc-9451-32229ebcc56d.png#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)配置 NodeJS
我们点击 **新增 `NodeJS`**，给它取个名字，选个版本，建议选 `LTS` 的版本。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1613835883660-a83b1b0c-ce18-4b68-8c5e-721ea2d36327.png#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)新增 NodeJS
### 安装 `Publish Over SSH` 插件
配置好 `Node.js` 之后继续回到 **插件管理**，搜索 `Publish Over SSH` 并安装。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1613835883707-245591c1-0c31-40e1-a6c9-d6149cb318bc.png#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)Publish Over SSH 安装完成
### 配置 `Publish Over SSH` 插件
安装好之后就要配置 `SSH` 了，还是点击 **管理 `Jenkins`**，找到 **系统配置**，配置好云服务器的 `SSH` 连接信息，点击右下角的 **Test Configuration** 测试一下连接是否正常，显示 **Success** 就说明配置正确了。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1658583/1613835883682-d646523d-edb7-40ba-a7aa-86cbd16514d5.jpeg#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)配置 Publish Over SSH
### 安装 `GitHub API` 插件
跟前面安装插件的步骤一样，我们安装好 `GitHub API` 插件。
### 配置 `GitHub API` 插件
在配置之前，我们先要到 `GitHub` 生成 **Personal access token**。
我们点击右上角 **头像** - **Settings**，找到 **Developer settings**，然后选中 **Personal access tokens**，点击右上角 **Generate new token**，按图中所示勾选对应的内容。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1658583/1613835883852-6dd9eb38-141f-4969-9158-6e0020914181.jpeg#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)生成 Personal access token
点击 **Generate token** 之后就会生成一段 **token**。**注意：token 只会显示一次！token 只会显示一次！token 只会显示一次！**建议用记事本记一下。
既然是要实现代码 `push` 到仓库就自动构建并发布，那么我们肯定得用到 `Webhook`，不过我们不需要手动创建 `Webhook`，插件会帮我们自动创建。
现在我们继续来配置插件，还是到 **系统配置** 当中，找到 `GitHub` 配置的部分，点击 **添加 `GitHub` 服务器**，点击 **凭据** 右侧的 **添加** 按钮，选择 **`Jenkins`**。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1658583/1613835883652-ffb4efe7-bc05-44bb-8f96-b8404327ee1c.jpeg#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)添加 GitHub 服务器
点击后会弹出一个添加凭据的窗口，**类型** 选择为 **Secret text**，将我们刚才生成的 **Personal access token** 复制到 **Secret** 一栏中，点击添加。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1658583/1613835883684-205adf04-eed6-4914-ab5f-1274fa0ca460.jpeg#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)添加凭据
添加后我们在 **凭据** 一栏选中 **Secret text**，勾选 **管理 Hook**，点击 **连接测试**，如果正确显示了你的 `GitHub` 用户名，就说明配置成功了。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1658583/1613835883690-b498d128-e09e-46c5-94ce-27131b21dcd7.jpeg#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)GitHub 配置完成
### 新建任务
现在我们可以新建任务了，点击主界面左侧的 **新建任务**，选择 **构建一个自由风格的软件项目**，给任务取个名字。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1658583/1613835883722-17caecb9-9d18-494a-9f45-8ee1f587bfd1.jpeg#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)新建任务
我们勾选 **`GitHub` 项目**，输入 **项目 `URL`**（就是项目的浏览器地址）。将下面的 **源码管理** 选中为 **`Git`**，将你要构建部署的项目的 **`clone`** 地址填到 **Repository URL** 一栏中（就是项目的浏览器地址加上 `.git` 后缀名）。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1658583/1613835883715-edbbd9c3-fe30-493b-95a9-916a7eeae719.jpeg#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)配置任务
**注意：如果是公开的仓库，Credentials 一栏可以选择无；如果是私有的仓库，需要先添加一个可以访问该仓库的 `GitHub` 账号，方法类似配置 `GitHub API` 插件，只不过类型一栏选择 用户名密码，然后在下方输入 用户名 密码。**
紧接着我们勾选 **构建触发器** 一栏中的 **GitHub hook trigger for GITScm polling**，勾选 **构建环境** 一栏中的 **Use secret text(s) or file(s)**，在 **凭据** 一栏中选中我们之前添加的 **Secret text**，勾选 **Provide Node & npm bin/ folder to PATH** 为构建项目提供 `Node.js` 环境。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1658583/1613835883695-67be17bd-58ad-465d-a1ad-cfef2ad821f6.jpeg#align=left&display=inline&height=608&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=1080&size=0&status=done&style=none&width=1080)配置任务
然后我们到 **构建** 一栏中，**增加构建步骤**，选择 **执行 `shell`**，在命令中输入：
## 配置一个Jenkins任务
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1612320808289-bfa8f602-dd49-4ce3-91e9-6210f6d47f46.png#align=left&display=inline&height=437&margin=%5Bobject%20Object%5D&name=image.png&originHeight=437&originWidth=1102&size=26822&status=done&style=none&width=1102)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1612320824413-9af5945c-d492-4068-8d32-9f53d9bf92b6.png#align=left&display=inline&height=713&margin=%5Bobject%20Object%5D&name=image.png&originHeight=713&originWidth=948&size=57307&status=done&style=none&width=948)










参考链接：

1. [https://blog.csdn.net/xgangzai/article/details/110412537](https://blog.csdn.net/xgangzai/article/details/110412537)
1. [http://www.bubuko.com/infodetail-3469922.html](http://www.bubuko.com/infodetail-3469922.html)
1. Send build artifacts over SSH：[https://blog.csdn.net/zhululu178/article/details/99968708](https://blog.csdn.net/zhululu178/article/details/99968708)
1. Send build artifacts over SSH：[https://blog.csdn.net/rankawin/article/details/81699460](https://blog.csdn.net/rankawin/article/details/81699460)

安装docker：[https://www.cnblogs.com/qgc1995/archive/2018/08/29/9553572.html](https://www.cnblogs.com/qgc1995/archive/2018/08/29/9553572.html)
## 1、有关防火墙的命令
##查看防火墙所有开放的端口
firewall-cmd --zone=public --list-ports
##开放和关闭端口
firewall-cmd --zone=public --add-port=8080/tcp --permanent # 开放5672端口
firewall-cmd --zone=public --remove-port=8080/tcp --permanent #关闭5672端口
##查看监听端口
netstat -lnpt
##检查端口被哪个进程占用
netstat -lnpt |grep 5672
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1611997336295-3a578939-4413-46ca-9158-6c98bb6754ce.png#align=left&display=inline&height=656&margin=%5Bobject%20Object%5D&name=image.png&originHeight=656&originWidth=551&size=36176&status=done&style=none&width=551)
在安装jenkins出现了jenkins不支持java 1.8以下的错误，所以导致jenkins不能正常启动
重新安装 java jdk [https://blog.csdn.net/qq_40907977/article/details/106851695](https://blog.csdn.net/qq_40907977/article/details/106851695)
## 


