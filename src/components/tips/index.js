/*
* @Author: hejianping
* @Date:   2018-05-17 11:08:25
* @Last Modified by:   hejianping
* @Last Modified time: 2018-05-31 09:59:47
*/

import Vue from 'vue'
import TipsVue from './tips.vue'

let instance
// 默认配置
const defaultParam = {
  show: true,
  duration: 2000,
  message: '消息提示',
  styles: '',
  timmer: null
}

const initInstrance = () => {
  const TipsConstructor = Vue.extend(TipsVue)
  instance = new TipsConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

const Tips = (options = {}) => {
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
export default Tips
