/*
* @Author: hejianping
* @Date:   2018-05-29 10:50:23
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-07-24 14:15:32
*/
import axios from 'axios'
import config from './config.js'
import Toast from '../components/toast/index.js'
// api路径
const API = config.service

// ajax方法
export default function ajax (p) {
  let c = Object.assign({
    url: '',
    type: 'GET',
    params: {},
    loading: true
  }, p)
  return new Promise((resolve, reject) => {
    let t = null
    let timmer = null
    if (c.loading) {
      t = Toast({
        type: 'loading',
        message: '加载中...',
        duration: 6000
      })
      if (timmer) {
        clearTimeout(timmer)
      }
    }
    axios({
      method: c.type,
      url: c.url.indexOf('http') !== -1 ? c.url : API + c.url,
      params: c.params
    }).then((response) => {
      if (c.loading) {
        t.show = false
      }
      resolve(response.data)
    }).catch((error) => {
      if (c.loading) {
        t.type = 'error'
        t.message = '服务器错误'
        timmer = setTimeout(() => {
          t.show = false
        }, 1000)
      }
      reject(error)
    })
  })
}
