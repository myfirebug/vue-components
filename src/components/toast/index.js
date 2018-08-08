/*
* @Author: hejianping
* @Date:   2018-05-17 11:08:25
* @Last Modified by:   hejianping
* @Last Modified time: 2018-05-17 15:38:54
*/

import Vue from 'vue'
import ToastVue from './toast.vue'

let instance
// 默认配置
const defaultParam = {
  show: true,
  duration: 2000,
  type: 'html',
  message: '消息提示',
  timmer: null
}

const initInstrance = () => {
  const ToastConstructor = Vue.extend(ToastVue)
  instance = new ToastConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

const Toast = (options = {}) => {
  options = {...defaultParam, ...options}
  if (!instance) {
    initInstrance()
  }
  clearTimeout(instance.timmer)
  Object.assign(instance, {...options})
  Vue.nextTick(() => {
    instance.timer = setTimeout(() => {
      instance.show = false
    }, options.duration)
  })
  return instance
}
export default Toast
