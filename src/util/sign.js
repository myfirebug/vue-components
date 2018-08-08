/*
* @Author: hejianping
* @Date:   2018-05-29 18:14:02
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-06-08 20:13:38
*/

import Ajax from '../service/'
import config from '../service/config.js'
import comm from '../util/comm.js'
import localStorage from '../util/localStorage.js'

/**
 * [微信jsDK授权]
 * @return
 */
const sign = (fn) => {
  Ajax.getsign()
    .then((data) => {
      wx.config({
        debug: false,
        appId: data.appid,
        timestamp: 1421142450,
        nonceStr: 'Wm3WZYTPz0wzccnW',
        signature: data.sign,
        jsApiList: [
          'scanQRCode', 'getLocation', 'openLocation', 'previewImage', 'chooseImage', 'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd'
        ]
      })
      if (typeof fn === 'function') {
        wx.ready(() => {
          fn()
        })
      }
    })
}
/**
 * [微信授权]
 * @return
 */
const authorize = () => {
  // 判断是否是微信浏览器
  if (comm.isWechatBrowsers()) {
    // 判断是否有code属性
    if (!comm.getUrlParam('code')) {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${config.redirectUri}&response_type=${config.responseType}&scope=${config.scope}&state=${config.state}`
    } else {
      // 如果没有找到unionid
      if (!localStorage.get('userInfo')) {
        getUserInfo({
          code: comm.getUrlParam('code')
        })
      }
    }
  }
}
/**
 * [获取用户信息]
 * @param  {[Object]} params [参数]
 * @return
 */
const getUserInfo = (params) => {
  Ajax.getUserInfo(params)
    .then((data) => {
      console.log(data)
      // 存取userInfo
      localStorage.set('userInfo', {
        unionid: data.data.unionid,
        openid: data.data.openid,
        head: data.data.headimgurl
      })
    })
}
export default {
  sign: sign,
  authorize: authorize
}
