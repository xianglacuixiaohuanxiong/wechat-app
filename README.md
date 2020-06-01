##  使用说明
项目使用webstorm中的监听less生成wxss文件,所以需要配置监听,步骤如下:
1.  全局安装less(`npm install less -g`)
2.  在webstorm的`settings > Tools > File Watchers`中点击`"+"`添加`less`.配置如下
![输入图片说明](https://raw.githubusercontent.com/xianglacuixiaohuanxiong/wechat-app/master/1585537044477.jpg)
3.  若配置好后不能使用则重启webstorm后就好了.
##  编译说明
本项目使用基于 ES6以上 的语法，所以请在开发工具中开启 “增强编译”， 否则会提示以下错误:
```
thirdScriptError 
 sdk uncaught third Error 
 regeneratorRuntime is not defined 
 ReferenceError: regeneratorRuntime is not defined
```
##  注意事项
1. .less文件不会上传,.less文件自动编译为wxss(使用less需要配置相应的自动编译).
2. local.text文件是用于区分开发环境与生产环境,上传时不会上传.
