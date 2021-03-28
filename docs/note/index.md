# 开始使用Nest.js

## 1. 安装启动项目
```git
npm i -g @nestjs/cli
```
### 1.1 构建项目
> 将 service-nest 替换成你自己的项目名称

```git
nest new service-nest
```
不出意外你的项目文件如下
![image.png](https://cdn.nlark.com/yuque/0/2020/png/2991766/1607409404633-1d3f6622-5c60-4f26-8bde-eafe5afaf461.png#align=left&display=inline&height=388&margin=%5Bobject%20Object%5D&name=image.png&originHeight=388&originWidth=273&size=17783&status=done&style=none&width=273)
### 1.2 启动项目
> 更多命令查看 package.json文件

```git
yarn start
or
npm start
// 后面加上:dev ，监听文件变化自动重启
yarn start:dev
or
npm start:dev
```
> 访问 [http://localhost:3000/](http://localhost:3000/) ，当你看到 Hello World! ，说明已正常运行。

### 1.3 路由加前缀
```typescript
import { NestFactory } from '@nestjs/core';

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api'); // 配置路由前缀 http://xxx:3000/api/*
await app.listen(3000);
```
## 2. 在src下多创建几个文件
> 在src下几个重要的文件介绍

| **文件夹/文件** | **说明** |
| --- | --- |
| main.ts 项目入口 | 整个项目的入口文件 |
| app.module.ts 模块集合 | 所有项目模块的集合 |
| modules 主要工作 | 路由模块存放/前端请求的接口可能都在这 |
| common 公共函数 | 存放公共方法/模块/类 |
| config 配置文件 | 存放固定参数配置文件，如：数据库/邮件/微信等 |
| tasks 定时任务 | 存放定时任务，如：定时更新任务、爬取页面等 |
| templates 模板文件 | 存放模板，如：邮件/HTML/短信模板等 |

## 3. 关于modules的几个约定文件
| **文件** | **快捷命令** | **说明** |
| --- | --- | --- |
| controller | nest g co modules/ | 控制器处理get|put|post等请求的参数，定义路由 |
| module | nest g mo modules/ | 负责功能模块引入、关联 |
| service | nest g s modules/ | 负责返回结果、查询数据库、查询其他接口 |
| resolver | nest g r modules/ | graphql展示的接口 |
| *.graphql | 不支持 | 配合resolver使用，定义graphql 数据格式 |
| entity | 不支持 | 管理数据库表结构 |
| dto/ | 不支持 | 定义数据类型 |
| dtos/ | 不支持 | 和graphql绑定使用，定义input和query类型 |
| *.spec.ts | 自动 | 相关测试文件 |



