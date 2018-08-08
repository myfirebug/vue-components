[1 组件](#1-组件) 

　　[1.1 badge](#11-badge)  

　　[1.2 button](#12-button) 

　　[1.3 cells](#13-cells)  

　　[1.4 cellsItem](#14-cellsItem) 

　　[1.5 checkbox](#15-checkbox) 

　　[1.6 header](#16-header)

　　[1.7 radio](#17-radio)

　　[1.8 searchBar](#18-searchBar)  

　　[1.9 switch](#19-switch) 

　　[1.10 tips](#110-tips)

　　[1.11 toast](#111-toast) 

　　[1.12 tabbar](#112-tabbar) 

　　[1.13 tabbarItem](#113-tabbarItem) 

　　[1.14 actionSheet](#114-actionSheet)  

　　[1.15 calendar](#115-calendar) 

　　[1.16 datePicker](#116-datePicker)  

　　[1.17 dialog](#116-dialog)  

　　[1.18 popUp](#118-popUp)  

　　[1.19 daqPriceRange](#119-daqPriceRange)  

　　[1.20 range](#120-range)  

　　[1.21 swiper](#121-swiper)  

　　[1.22 tabs](#122-tabs)  



# 1 组件

## 1.1 badge

小徽章:主要用于消息提示、新功能等,支持四种大小  

**基本使用**  

```html 
<daq-badge>1</daq-badge>
``` 
**指定大小**  

```html 
<daq-badge size="medium">1</daq-badge>
``` 
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| size | string | 徽章大小 | large、medium、small、mini | large |  


## 1.2 button

按钮，支持按钮选择类型，选择大小，是否禁用，是否50%的圆角    

**基本使用**  

```html 
<daq-button>多字按钮</daq-button>
``` 
**指定类型**  

```html 
<daq-badge type="primary">多字按钮</daq-badge>
``` 
**指定大小**  

```html 
<daq-badge size="medium">多字按钮</daq-badge>
``` 
**禁用**  

```html 
<daq-badge disabled>多字按钮</daq-badge>
``` 
**50%的圆角**  

```html 
<daq-badge isRound>多字按钮</daq-badge>
``` 
**API**  

| 参数名称|数据类型|说明|可选值|默认值|
| ------------- |:-------------:|:-------------:|:-------------:|-------------|
| title |String|按钮文本| | |
| type |String|按钮类型|default、primary、danger|defaut|
| size |String|按钮大小|large、medium、small|large|
| disabled |Boolean|是否禁用||false|
| isRound |Boolean|是否50%的圆角||false|   

**事件**  

| 参数名称|说明|
| ------------- |-------------|
| change |点击按钮时所触发的事件|  

## 1.3 cells

主要用于列表的盒元素，多与**daq-cells-item**配置使用  

**基本使用**  

```html 
<daq-cells>12</daq-cells>
``` 
**指定块元素的标题**  

```html 
<daq-badge title="我是标题哦">1</daq-badge>
``` 
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|
| title | String | 标题 |  |  | 

## 1.4 cellsItem

列表  

**基本使用**  

```html 
<daq-cells>
	<daq-cells-item title="列表项"></daq-cells-item>
</daq-cells>
``` 

**API**  

| 参数名称|数据类型|说明|可选值|默认值|
| ------------- |:-------------:|:-------------:|:-------------:|-------------|
| title | String | 标题 |   |   | 
| icon | Boolean | 是否显示icon区域 |   | false | 
| jsJump | Boolean | 跳转路由 |   | true | 
| url | String | 跳转的路由 |   |   | 
| value | String/Number  | 显示的值 |   |   | 


**事件**  

| 参数名称|说明|
| ------------- |-------------|
| change |点击按钮时所触发的事件|   

**SLOTS**  

| 参数名称|说明|
| ------------- |-------------|
| icon |icon区域|
| bd |内容区域|
| ft |尾部区域| 


## 1.5 checkbox

复选框  

**基本使用**  

```html 
<template>
  <div>
    <daq-checkbox title="单选" :options="options" :value="value" @change="changeHandle"></daq-checkbox>
    <p style="line-height:.8rem;padding-left:.3rem">选中的值：{{value}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ['value2', 'value3'],
      options: [
        {
          name: '多选项',
          value: 'value1'
        },
        {
          name: '多选项',
          value: 'value2'
        },
        {
          name: '多选项',
          value: 'value3',
          disabled: true
        }
      ]
    }
  },
  methods: {
    changeHandle (value) {
      this.value = value
    }
  }
}
</script>
``` 

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| title | string | 标题 |  |  |  
| options | Array | 数据列表，必须填 |  |  |  
| value | Array | 默认选中数据列表 |  |  |  



## 1.6 header

头部  

**基本使用**  

```html 
<daq-header >
	<span slot="title" fixed>标题长会隐藏后面或轮播后面或轮播</span>
</daq-header>
``` 
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| fixed | Boolean | 是否固定在头部 |  |  | 

**SLOTS**  

| 参数名称|说明|
| ------------- |-------------|
| left |左侧内容|
| title |标题内容|
| right |右侧内容| 

## 1.7 radio

复选框  

**基本使用**  

```html 
<template>
  <div>
    <daq-radio title="单选" :options="options" :value="value" @change="changeHandle"></daq-radio>
    <p style="line-height:.8rem;padding-left:.3rem">选中的值：{{value}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 'value2',
      options: [
        {
          name: '单选项',
          value: 'value1'
        },
        {
          name: '单选项',
          value: 'value2'
        },
        {
          name: '单选项',
          value: 'value3',
          disabled: true
        }
      ]
    }
  },
  methods: {
    changeHandle (value) {
      this.value = value
    }
  }
}
</script>
``` 

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| title | string | 标题 |  |  |  
| options | Array | 数据列表，必须填 |  |  |  
| value | string | 默认选中数据列表 |  |  |  


## 1.8 searchBar

搜索栏   

**基本使用**  

```html 
<template>
  <div>
    <daq-search @aa="returnPrev"></daq-search>
  </div>
</template>
<script>
export default {
  methods: {
    returnPrev () {
      alert('这里是跳转路由哦')
      this.$router.go(-1)
    }
  }
}
</script>
``` 

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| searchWrapStyles | string | 外层框的样式 |  |  |  
| searchStyles | string | 搜索框的样式 |  |  |  
| text | string | 索索框文本 |  |  |  

**SLOTS**  

| 参数名称|说明|
| ------------- |-------------|
| left |左侧内容|
| right |右侧内容|  

**事件**  

| 参数名称|说明|
| ------------- |-------------|
| search |点击搜索时触发的事件|  



## 1.9 switch

复选框  

**基本使用**  

```html 
<template>
  <div>
    <daq-switch title="单选" :options="options" :value="value" @change="changeHandle"></daq-switch>
    <p style="line-height:.8rem;padding-left:.3rem">选中的值：{{value}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ['value2', 'value3'],
      options: [
        {
          name: '多选项',
          value: 'value1'
        },
        {
          name: '多选项',
          value: 'value2'
        },
        {
          name: '多选项',
          value: 'value3',
          disabled: true
        }
      ]
    }
  },
  methods: {
    changeHandle (value) {
      this.value = value
    }
  }
}
</script>
``` 

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| title | string | 标题 |  |  |  
| options | Array | 数据列表，必须填 |  |  |  
| value | Array | 默认选中数据列表 |  |  |  


## 1.10 tips

复选框  

**消息提示**  

```html 
<template>
  <div>
    <daq-button type="default" @change="showError">错误提示</daq-button>
  </div>
</template>
<script>
import Tips from '../components/tips'
export default {
  methods: {
    showError () {
      Tips({
        message: '你输入的用户名不对！',
        icon: '&#xe645;',
        style: 'background-color:red',
        duration: 3000
      })
    }
  }
}
</script>
``` 

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| show | Boolean | 是否显示 |  |  |  
| icon | String | icon编码 |  |  |  
| style | String | 样式 |  |  | 
| message | String | 消息文字 |  |  |  
| duration | Number | 多久消失 |  | 2000 | 

## 1.11 toast

toast提示  

**基本使用**  

```html 
<template>
  <div>
    <daq-button type="default" @change="showError">错误提示</daq-button>
  </div>
</template>
<script>
import Toast from '../components/toast'
export default {
  methods: {
    showError () {
      Toast({
        type: 'error',
        duration: 3000,
        message: '出错了'
      })
    }
  }
}
</script>
``` 

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| show | Boolean | 是否显示 |  |  |  
| icon | String | icon编码 |  |  |  
| type | String | 类型 | loading、html、sucess、error | html | 
| message | String | 消息文字 |  |  | 
| duration | Number | 多久消失 |  | 2000 |  

## 1.12 tabbar

底部盒子需要与tarbbarItem共同使用  

**基本使用**  

```html 
<daq-tabbar :fixed="true"></daq-tabbar>
``` 

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| fixed | Boolean | 是否固定大尾部 |  |  |    


## 1.13 tabbarItem

tabbar列表  

**基本使用**  

```html 
<daq-tabbar :fixed="true">
  <daq-tabbar-item url="home" text="首页" icon="&#xe689;"></daq-tabbar-item>
  <daq-tabbar-item url="bottomMenuBar" text="菜单" icon="&#xe69e;"></daq-tabbar-item>
  <daq-tabbar-item url="list" text="列表" icon="&#xe6a0;"></daq-tabbar-item>
  <daq-tabbar-item url="button" text="按钮" icon="&#xe695;"></daq-tabbar-item>
  <daq-tabbar-item url="badge" text="角标" icon="&#xe692;"></daq-tabbar-item>
</daq-tabbar>
``` 

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| type | String | 类型 | default、showIcon、showText、special | default |  
| url | String | 跳转的url地址 |  |  | 
| icon | String | 图标编码 |  |  |  
| text | String | 文本 |  |  |   

## 1.14 actionSheet

actionSheet列表  

**基本使用**  

```html 
<daq-button type="default" @change="show">actionSheet1</daq-button>
``` 
```javascript
export tdefault {
  methods: {
    show () {
      ActionSheet({
        show: true,
        actionSheetList: [
          {
            name: '列表一',
            value: 'a'
          },
          {
            name: '列表二',
            value: 'b'
          },
          {
            name: '列表三',
            value: 'c'
          },
          {
            name: '列表四',
            value: 'd'
          }
        ],
        callBack (item) {
          console.log(item.name, item.value)
        }
      })
    }
  }
}
```
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| show | Boolean | 是否显示 |  | true |  
| actionSheetList | Array |  |  |  | 
| callBack | Function |  |  |  |  


## 1.15 calendar

日历  

**基本使用**  

```html 
<daq-calendar :show="show" :number="number" :start="start" :end="end" :systemDate="systemDate" @cancel="cancelHandler" @confirm="confirmHandler"></daq-calendar>
<daq-button @change="showHandle">选择日期</daq-button>
``` 
```javascript
import Toast from '../components/toast'
export default {
  data () {
    return {
      show: false,
      number: 6,
      systemDate: '2018-06-04',
      start: '2018-06-10',
      end: '2018-06-15'
    }
  },
  methods: {
    showHandle () {
      this.show = true
    },
    cancelHandler () {
      this.show = false
    },
    confirmHandler (start, end) {
      Toast({
        message: '开始日期：' + start + '结束日期：' + end
      })
      this.start = start
      this.end = end
    }
  }
}
```
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| show | Boolean | 是否显示 |  | true |  
| number | Number | 显示显示几个月的日历(必填) |  | 6 | 
| start | String | 开始日期(必填) |  |  |  
| end | String | 结束日期(必填) |  |  |  


## 1.16 datePicker

日期  

**基本使用**  

```html 
<daq-button @change="changeHandle">年月日日期选择</daq-button>
``` 
```javascript
import DatePicker from '../components/datePicker'
import Toast from '../components/toast'
export default {
  data () {
    return {
      date: '2018-01-03'
    }
  },
  methods: {
    changeHandle () {
      let _this = this
      /* eslint-disable no-new */
      new DatePicker({
        show: true,
        date: 'date',
        min: '2007-10-01',
        max: '2018-10-30',
        value: this.date,
        callback (value) {
          _this.date = value
          Toast({
            duration: 2000,
            message: '您选择的日期是：' + value
          })
        }
      })
    }
  }
}
```
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| show | Boolean | 是否显示 |  | true |  
| date | String | 日期类型(必填) | year,month,date | date | 
| min | String | 最小值(必填) |  |  |  
| max | String | 最大值(必填) |  |  |  
| value | String | 最大值(必填) | 选中值 |  |  
| callback | Function | 返回函数 |  |  |  



## 1.17 dialog

弹窗  

**基本使用**  

```html 
<daq-button type="default" @change = "showDialog">弹框有操作</daq-button>
``` 
```javascript
import Dialog from '../components/dialog/index.js'
import Toast from '../components/toast/index.js'
export default {
  methods: {
    showDialog () {
      Dialog({
        title: '普通弹框',
        content: '告知当前状态，信息和解决办法，文字换行的情况',
        align: 'center',
        comfirmValue: '主操作',
        cancelValue: '辅助操作',
        comfirmFn () {
          Toast({
            message: '你点击了主操作'
          })
        },
        cancelFn () {
          Toast({
            message: '你点击了辅助操作'
          })
        }
      })
    }
  }
}
```
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| show | Boolean | 是否显示 |  | true |  
| title | String | 标题 |  |  | 
| content | String | 内容 |  |  |  
| comfirmValue | String | 确认按钮值 |  |  |  
| cancelValue | String | 取消按钮值 |  |  |  
| align | String | 内容区域文本内容流的方式 | left,center,right  | left |  
| comfirmFn | Function | 确认按钮回调 |  |  |  
| cancelFn | Function | 取消按钮回调 |  |  |  



## 1.18 popUp

滑出  

**基本使用**  

```html 
<daq-button size="large" @change="changeHandle">向右弹起</daq-button>
<daq-popUp :show="show3" dir="left" @hide="hideHandle" width="80%" height="100%">
  <p>我是内容哦</p>
  <p>我是内容哦</p>
  <p>我是内容哦</p>
  <p>我是内容哦</p>
  <p>我是内容哦</p>
  <p>我是内容哦</p>
  <p>我是内容哦</p>
  <p>我是内容哦</p>
</daq-popUp>
``` 
```javascript
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    changeHandle () {
      this.show = true
    },
    hideHandle () {
      this.show = false
    }
  }
}
```
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| show | Boolean | 是否显示 |  | true |  
| width | String | 宽度 |  |  | 
| height | String | 高度 |  |  |  
| dir | String | 方向 | bottom, top, left, right | bottom |  
| distance | number | 距离 |  | 0 |  


## 1.19 daqPriceRange

价格滑动  

**基本使用**  

```html 
<daq-price-range :graduate="graduate" :min="min" :max="max" :defaultMinValue="defaultMinValue" :defaultMaxValue="defaultMaxValue" :step="step" @changeValue ="changeValueHandle"></daq-price-range>
``` 
```javascript
export default {
  data () {
    return {
      graduate: [0, 100, 200, 300, 400, 500, '不限'],
      min: 0,
      max: 600,
      defaultMinValue: 1,
      defaultMaxValue: 2,
      step: 100
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    changeValueHandle (min, max) {
      this.defaultMinValue = min
      this.defaultMaxValue = max
    }
  }
}
```  

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| graduate | Array | 区间值（必填） |  |  |  
| min | Number | 最小值(必填) |  |  |   
| max | Number | 最大值(必填) |  |  |   
| defaultMinValue | Number | 默认最小值（必填） |  |  |   
| defaultMaxValue | Number | 默认最大值（必填 |  |   |   
| step | Number | 步长 |  |  |   

## 1.20 range

滑动  

**基本使用**  

```html 
<daq-range :min="0" :max="600" :step="100" :defaultValue="2" @changeValue = "changeValueHandle"></daq-range>
``` 
```javascript
export default {
  data () {
    return {
      min: 0,
      max: 600,
      defaultValue: 2,
      step: 100
    }
  },
  methods: {
    changeValueHandle (value) {
      this.defaultValue = value
    }
  }
}
```  

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| min | Number | 最小值(必填) |  |  |   
| max | Number | 最大值(必填) |  |  |   
| defaultValue | Number | 默认值（必填） |  |  |   
| step | Number | 步长 |  |  |   



## 1.21 swiper

滚动  

**基本使用**  

```html 
<daq-swiper width="100%" :height="300" :autoPlay="false">
  <div class="daq-swiper-slide">我是第一张</div>
  <div class="daq-swiper-slide">我是第二张</div>
  <div class="daq-swiper-slide">我是第三张</div>
  <div class="daq-swiper-slide">我是第四张</div>
  <div class="daq-swiper-slide">我是第五张</div>
  <div class="daq-swiper-slide">我是第六张</div>
  <div class="daq-swiper-slide">我是第七张</div>
</daq-swiper>
```  

**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| width | [Number, String] | 宽度 |  |  |   
| height | [Number, String] | 高度 |  |  |   
| autoPlay | Boolean | 是否自动播放 |  |  |   
| speed | Number | 速度 |  | 3000 |   
| initialSlide | Number | 默认选中值 |  | 0 |   
| direction | String | 方向 | horizontal, vertical | horizontal |  


## 1.22 tabs

选项卡  

**基本使用**  

```html 
<daq-tabs :tabIndex="tabIndex" :tabList="tabList" @tabs="tabsHandle">
  <div class="pane">{{content}}</div>
</daq-tabs>
```  
```javascript
export default {
  data () {
    return {
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: '选项一',
          content: '我是第一项的内容'
        },
        {
          index: 1,
          name: '选项二',
          content: '我是第二项的内容'
        },
        {
          index: 2,
          name: '选项三',
          content: '我是第三项的内容'
        },
        {
          index: 3,
          name: '选项四',
          content: '我是第四项的内容'
        }
      ],
      content: ''
    }
  },
  methods: {
    tabsHandle (v) {
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].index === v) {
          this.tabIndex = v
          this.content = this.tabList[i].content
        }
      }
    }
  },
  mounted () {
    if (this.tabList.length) {
      this.content = this.tabList[0].content
    }
  }
} 
```
**API**  

| 参数名称 | 数据类型 | 说明 | 可选值 | 默认值 |  
| ------------- |:-------------:|:-------------:|:-------------:|-------------|  
| tabList | [Array] | 内容（必填） |  |  |   
| tabIndex | [Number, String] | 选中的项 |  |  |   
| type | String | 样式 |  |  |     

**事件**  

| 参数名称 | 说明 |
| -------------|-------------|  
| tabs | 点击菜单触发的事情 |  
