# 1 技术栈  

**基于vue2 + vue-router + vueX + ES6 + scss + axios + zepto，使用vue-cli打包**  
PS:这里说明一下，为什么会使用zepto，因为该项目的日期组件，swiper组件,日历组建,三级联动组件获取dom比较，希望开发人员不到万不得已的情况下不要使用zepto  


# 2 学习官方网站  
a、[Vue.js](https://cn.vuejs.org/v2/guide/)  

b、[vue-router](https://router.vuejs.org/zh/)  

c、[vueX](https://vuex.vuejs.org/zh/api//)  

# 3 快速上手  
a.创建一个 vue.js 项目，我们使用 Vue 官方肢手架工具 vue-cli  

**npm install -g vue-cli**  

**vue init webpack <your_projectname>**  


b.引入 组件  
在入口文件 main.js 中编写如下内容：  

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
// 所有的组件集合
import './components'
// 处理1px
import './util/scale_750.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
``` 
2.引入 开始使用  

运行 **npm run dev** 启动本地服务器进行开发。  

运行 **npm run build** 进行编译。  