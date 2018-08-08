/*
* @Author: hejianping
* @Date:   2018-05-17 11:08:25
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-05-25 15:51:29
*/

import Vue from 'vue'
import DatePickerVue from './datePicker.vue'

let instance
// 默认配置
const defaultParam = {
  show: true,
  type: 'month',
  min: '2007-10',
  max: '2018-10',
  value: '',
  callback: null
}

const initInstrance = () => {
  const DatePickerConstructor = Vue.extend(DatePickerVue)
  instance = new DatePickerConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

const DatePicker = (options = {}) => {
  options = {...defaultParam, ...options}
  if (!instance) {
    initInstrance()
  } else {
    instance = null
    initInstrance()
  }
  Object.assign(instance, {...options})
  return instance
}
export default DatePicker
