/*
* @Author: hejianping
* @Date:   2018-05-17 11:08:25
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-05-25 15:51:28
*/

import Vue from 'vue'
import ActionSheetVue from './actionSheet.vue'

let instance
// 默认配置
const defaultParam = {
  show: true,
  actionSheetList: [],
  callBack: null
}

const initInstrance = () => {
  const ActionSheetConstructor = Vue.extend(ActionSheetVue)
  instance = new ActionSheetConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

const ActionSheet = (options = {}) => {
  options = {...defaultParam, ...options}
  if (!instance) {
    initInstrance()
  }
  clearTimeout(instance.timmer)
  Object.assign(instance, {...options})
  return instance
}
export default ActionSheet
