import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// mini版本jquery
// import './util/miniJquery.js'
// 所有的组件集合
import './components'
// 处理1px
import './util/scale_750.js'

Vue.use(VueAwesomeSwiper)
// 判断token,与获取标题
router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  components: { App },
  template: '<App/>',
  watch: {
    '$route' (to, from) {
      this.transitionName = from.name === 'home' ? 'slide-left' : 'slide-right'
    }
  }
})
