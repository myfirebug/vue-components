import Vue from 'vue'
import Router from 'vue-router'
// 组件的路由
import componentsRoutes from './components.js'
// 公用路由
import commonRoutes from './common.js'

let routes = []
routes = routes.concat(componentsRoutes, commonRoutes)

Vue.use(Router)

export default new Router({
  routes: routes,
  // mode: 'history',
  base: '/geekerUI-mobile/',
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  fallback: false,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
