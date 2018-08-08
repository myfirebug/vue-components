
import ajax from './fetch.js'

export default {
  /**
   * [热门城市]
   * @returns
   */
  getHotCityList (params) {
    return ajax({
      url: 'gov/app/train/listHotStation',
      type: 'get',
      params: Object.assign({
      }, {...params})
    })
  },
  /**
   * [根据车站首字母获取全国车站简码]
   * @returns
   */
  getStationName (params) {
    return ajax({
      url: 'gov/app/train/getStationName',
      type: 'get',
      params: Object.assign({
      }, {...params})
    })
  },
  /**
   * [根据起始点获取火车信息]
   * @returns
   */
  getTrainList (params) {
    return ajax({
      url: 'gov/app/train/trainList',
      type: 'get',
      params: Object.assign({
      }, {...params})
    })
  },
  /**
   * [获取车次编码]
   * @returns
   */
  getTrainNo (params) {
    return ajax({
      url: 'gov/app/train/queryO',
      type: 'get',
      params: Object.assign({
      }, {...params})
    })
  },
  /**
   * [获取车次详情]
   * @returns
   */
  getTrainDetail (params) {
    return ajax({
      url: 'gov/app/train/queryByTrainNo',
      type: 'get',
      params: Object.assign({
      }, {...params})
    })
  }
}
