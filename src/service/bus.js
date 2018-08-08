/*
 * @Author: UEDHE
 * @Date:   2018-05-07 16:25:26
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2018-07-24 14:14:39
 */

import ajax from './fetch.js'

// 所有接口从这里走
export default {
  /*
   根据地址获取经纬度
   */
  busCoordinateByName (params) {
    return ajax({
      url: 'gov/app/bus/coordinateByName',
      type: 'get',
      loading: true,
      params: params
    })
  },
  /*
   根据起始点获取公交路线
   */
  busList (params) {
    return ajax({
      url: 'gov/app/bus/busList',
      type: 'get',
      loading: true,
      params: params
    })
  },
  /*
   附近公交站
   */
  busAround (params) {
    return ajax({
      url: 'gov/app/bus/around',
      type: 'get',
      loading: true,
      params: params
    })
  }
}
