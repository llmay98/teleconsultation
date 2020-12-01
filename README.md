# 标准 Readme

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

## 内容列表

- [背景](#背景)
- [安装](#安装)
- [代码修改](#代码修改)
	- [前端](#1、前端)
	- [后端](#2、后端)
- [相关仓库](#相关仓库)
- [维护者](#维护者)
- [使用许可](#使用许可)

## 背景

`标准 Readme`   
这一项目是为了满足远程会诊的要求，所开发的远程会诊模块。  
功能点包括了：
+ 视频语音通讯
+ 病历分享
+ 病理切片共同查看

> 如果你的文档是完整的，那么使用你代码的人就不用再去看代码了。这非常的重要。它使得你可以分离接口文档与具体实现。它意味着你可修改实现的代码而保持接口与文档不变。  

> 请记住：是文档而非代码，定义了一个模块的功能。

## 安装
### 1、前端 frontends
> 这个项目的前端使用 [node](http://nodejs.org) 和 [npm](https://npmjs.com)  
> 会议的前端代码使用了[kurento-group-call](https://github.com/Kurento/kurento-tutorial-java/tree/master/kurento-group-call)的js文件与vue框架的融合  
> 请确保你本地安装了它们。

```sh
1、首先将整个项目git到本地
2、$ cd frontends
3、安装相关依赖
   $ npm install
4、运行前端网页
   $ npm run serve
```  
### 2、后端 backends（已经在服务器端启动）
> 这个项目的后端使用了java语言以及spring-boot框架。  
> 在视频会议使用了[kurento-tutorial-java](https://github.com/Kurento/kurento-tutorial-java)  
> 使用了其中的[kurento-group-call](https://github.com/Kurento/kurento-tutorial-java/tree/master/kurento-group-call)  
> 在其中加入关于切片共享的操作函数  
> [参考文档](https://doc-kurento.readthedocs.io/en/latest/)
```sh
1、运行后端服务器
$ cd backends/kurento-group-call
$ mvn -U clean spring-boot:run
```  
## 代码修改
### 1、前端
+ [vue](https://cn.vuejs.org/v2/guide/)框架
  - 初学者推荐去b站上面逛逛！
+ [element ui](https://element.eleme.io/#/zh-CN/component/installation)
  - 根据文档来就很好
#### （1）配置文件
+ vue.config.js配置网页的端口、ip、代理、https证书等，详见[文档](https://cli.vuejs.org/config/)
  -  在我所写基础上修改ip和端口已经https证书即可
#### （2）页面路由
+ router.js
当增加页面时请注意添加
#### （3）APP.vue
> 控制打开网页时的初始展示页面，其中添加了对于PC端和移动端的判断来区分页面展示模式
#### （4）components文件——主要可修改部分，对于页面的布局和相关逻辑
> src/components  
> 每个vue文件包含了某个页面的布局、js、样式  
> PC为电脑端的页面、MOBILE为移动端的页面  

##### MOBILE  
+ MobileHome为会议登录界面
+ MobileMeeting为会议界面  

##### PC
+ Home为首页
  - 加入会诊：登录会议界面
  - ~~预约会诊~~
  - ~~我的会诊~~
  - ~~我的病人~~
+ Meeting为会议界面
+ ~~Login~~
+ ~~Mine~~
+ ~~Register~~  
> 所划内容已经开发了页面布局样式和基础逻辑，但是未使用

####（5）package.json
> 前端相关依赖  
> 可以通过 `npm install/uninstall xxx` 添加或删除
####（6）静态文件public
> https证书  
> 图标文件

### 2、后端
> [源码文件](https://github.com/llmay98/transmeeting/tree/master/backends/kurento-group-call/src/main/java/org/kurento/tutorial/groupcall)
> + 位于 backends/kurento-group-call/src/main/java/org/kurento/tutorial/groupcall  
> + CallHandler.java
>  - 添加所需的websocket消息的处理函数
>  - 例如增加的图片打开消息等
> + Room.java
>  - 添加在会议中所需的操作函数，在CallHandler中被调用

> [配置文件](https://github.com/llmay98/transmeeting/blob/master/backends/kurento-group-call/src/main/resources/application.properties)  
> + application.properties  
> + 位于 backends/kurento-group-call/src/main/resources
> + 修改端口 

## 相关仓库

- [kurento-tutorial-java](https://github.com/Kurento/kurento-tutorial-java)

## 维护者

[@llmay98](https://github.com/llmay98)

## 使用许可

+ XJTU
