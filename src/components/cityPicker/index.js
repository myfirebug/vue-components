/*
* @Author: hejianping
* @Date:   2018-05-17 11:08:25
* @Last Modified by:   hejianping
* @Last Modified time: 2018-07-09 19:10:08
*/

import Vue from 'vue'
import CityPickerVue from './cityPicker.vue'

let instance
// 默认配置
const defaultParam = {
  show: true,
  value: {
    provinceName: '',
    provinceRegin: '',
    provinceTouch: true,
    cityName: '',
    cityRegin: '',
    cityTouch: true,
    areaName: '',
    areaRegin: '',
    areaTouch: true
  },
  callback: null
}

const initInstrance = () => {
  const CityPickerConstructor = Vue.extend(CityPickerVue)
  instance = new CityPickerConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

const CityPicker = (options = {}) => {
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
export default CityPicker
