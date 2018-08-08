[1 强制文档类型](#1-使用正确的文档类型)   

[2 强制使用小写元素名](#2-强制使用小写元素名)   

[3 强制使用小写属性名](#3-强制使用小写属性名)   

[4 强制属性值使用双引号](#4-强制属性值使用双引号)   

[5 强制图片必须使用alt属性](#5-强直图片必须使用alt属性)   

[6 强制纯色图片必须用字体图标](#6-强制纯色图片必须用字体图标)  

[7 页面说明注释](#7-页面说明注释)   

[8 大模块必须添加好注释](#8-大模块必须添加好注释)   



# 1 使用正确的文档类型  

```html 
<!DOCTYPE html>
```  

# 2 强制使用小写元素名  
 
```html  
<ul>
  <li>必须小写哦</li>
</ul>
``` 

# 3 强制使用小写属性名  

```html  
<div class="daq-swiper">
  <div class="daq-swiper-wrapper"></div>
  <div class="daq-swiper-pagination"></div>
</div>
``` 

# 4 强制属性值使用双引号  

```html  
<div id="swiper" class="daq-swiper" data-name="swiper">
  <div class="daq-swiper-wrapper"></div>
  <div class="daq-swiper-pagination"></div>
</div>
```  

# 5 强直图片必须使用alt属性  

```html  
<img src="logo.png" alt="大旗软件" />
``` 

# 6 强制纯色图片必须用字体图标  

```html  
<div class="star">&#xe679;</div>
```  

# 7 页面说明注释  

```html  
<!DOCTYPE html>
<html>
    <head>
        <meta charset="uft-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>成都中科大旗软件科技有限公司</title>
        <link href="css/index.css" />
        <!-- 页面设计：name | 页面重构：name | 前端开发：name | 创建：xxxx-xx-xx -->
    </head>
    <body>
        ...
    </body>
</html>
``` 
# 8  大模块必须添加好注释

```html  
<!DOCTYPE html>
<html>
    <head>
        <meta charset="uft-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>成都中科大旗软件科技有限公司</title>
        <link href="css/index.css" />
        <!-- 页面设计：name | 页面重构：name | 前端开发：name | 创建：xxxx-xx-xx -->
    </head>
    <body>
    		<!--header start-->
        <div class="header">
        	...
        </div>
        <!--header end-->
        <!--container start-->
        <div class="container">
        	...
        </div>
        <!--container end-->
        <!--footer start-->
        <div class="footer">
        	...
        </div>
        <!--footer end-->
    </body>
</html>
```  



