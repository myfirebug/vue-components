[1 命名](#1-命名)   

[2 禁止使用id做为样式名](#2-禁止使用id做为样式名)   

[3 CSS选择器中避免标签名](#3-CSS选择器中避免标签名)     

[4 能用样式写出来的效果，禁止使用背景图片背景或者字体图标](#4-能用样式写出来的效果，禁止使用背景图片背景或者字体图标)  

[5 所有设置的颜色，字体大小必须使用setting.scss里的变量](#5-所有设置的颜色，字体大小必须使用setting.scss里的变量)  

[6 项目里必须使用flex布局，慎用float](#6-项目里必须使用flex布局，慎用float)    

[7 scss层级不能大于4级](#7-scss层级不能大于4级)    




# 1 命名  

**首先应该判断是全局样式还是局部样式如果是全局则以：daq-模块名，如果是局部则以：业务名**  

**正确**  
```scss
// 全局图片滚动
.daq-swiper{
    &-wrap{
        ...
    }
    &-pagination{
        ...
    }
}
// 局部滚动
.bunner-swiper{
    &-wrap{
        ...
    }
    &-pagination{
        ...
    }
}
``` 
# 2 禁止使用id做为样式名  

**正确**  
```scss
.container{
    .title{
       color: red 
   }
}
``` 
**错误**  
```scss
#container{
    .title{
       color: red 
   }
}
``` 

# 3 CSS选择器中避免标签名  

**推荐**  
```scss
.container{
    .title{
        .text{
            color: red
        }
    }
}
``` 
**不推荐**  
```scss
.container{
    h2.title{
        span{
            color: red
        }
    }
}
``` 
# 4 能用样式写出来的效果，禁止使用背景图片背景或者字体图标  

这里举个栗子：假如这是设计稿 (｜ 新闻列表)  

**推荐**  
```scss
<div class="news">
    <div class="news-title">新闻列表</div>
</div>
.news{
    &-title{
        font-size:$f30;
        &:before{
            content: '';
            display:inline-block;
            width:.03rem;
            height:.3rem;
            margin-right:.1rem;
            background:$bor01;
        }
    }
}
``` 
**不推荐**  
```scss
<div class="news">
    <div class="news-title"><i class="ic-font">&#xe656;</i>新闻列表</div>
</div>
.news{
    &-title{
        font-size:$f30;
        .ic-font{
            color:$bor01;
            padding-right:.1rem;
        }
    }
}
``` 

# 5 所有设置的颜色，字体大小必须使用setting.scss里的变量 

**正确**  
```scss
.container{
    .title{
        color: $fc01;
        font-size: $f30;
    }
}
``` 
**错误**  
```scss
container{
    .title{
        color: red;
        font-size:.3rem;
    }
}
``` 

# 6 项目里必须使用flex布局，慎用float  

**且不需要写全部的flex hike**

**推荐**  
```scss
.container{
    display: flex;
}
``` 
**不推荐**  
```scss
container{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
``` 
**不推荐**  
```scss
container{
    .item{
        float:left;
    }
}
``` 

# 7 scss层级不能大于4级

**推荐**  
```scss
<div class="container">
    <div class="header">我是内部区的标题</div>
    <div class="body">
        <ul class="list">
            <li class="item">
                <div class="title">我是item的标题</div>
                ...
            </li>
        </ul>
    </div>
</div>
.container{
    .header{
        ...
    }
    .body{
        .list{
            ...
        }
        .item{
            ...
        }
        .title{
            ...
        }
    }
}
``` 
**不推荐**  
```scss
<div class="container">
    <div class="header">我是内部区的标题</div>
    <div class="body">
        <ul class="list">
            <li class="item">
                <div class="title">我是item的标题</div>
                ...
            </li>
        </ul>
    </div>
</div>
.container{
    .header{
        ...
    }
    .body{
        .list{
            .item{
                .title{
                    ...
                }
            }
        }
    }
}
``` 