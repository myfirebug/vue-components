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
   *  [天气]
   * */
  getWeather (region) {
    return ajax({
      url: 'https://appapi.daqsoft.com/weatherServer/weather',
      type: 'get',
      params: {
        code: region
      }
    })
  },
  /*
   * 获取上级地区信息
   * */
  getPrevRegion (params) {
    return ajax({
      url: 'http://data.daqsoft.com/regionBySuper',
      type: 'get',
      params: Object.assign({
        lang: 'cn'
      }, {...params})
    })
  }
}
