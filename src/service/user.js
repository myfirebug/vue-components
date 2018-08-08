/*
 * @Author: UEDHE
 * @Date:   2018-05-07 16:25:26
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2018-07-24 14:14:39
 */

import ajax from './fetch.js'

// 所有接口从这里走
export default {
  /**
  * [用户登录]
  * @param  {[string]} accesstoken [token]
  * @returns
  */
  getList (params) {
    return ajax({
      url: 'gov/app/hotel/list',
      type: 'GET',
      params: params
    })
  }
}
