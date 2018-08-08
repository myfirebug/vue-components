/*
* @Author: hejianping
* @Date:   2018-06-06 09:47:16
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-06-07 12:04:49
*/
const comm = {
  /**
  * [获取url参数]
  * @returns
  */
  getUrlParam (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  /**
  * [判断是否是微信浏览器]
  * @returns
  */
  isWechatBrowsers () {
    let ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') !== -1) {
      return true
    } else {
      return false
    }
  }
}
export default comm
