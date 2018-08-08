/*
 * @Author: UEDHE
 * @Date:   2018-05-07 16:25:26
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2018-07-11 16:26:43
 */
// 个人中心所有的接口
import user from './user.js'
// 天气
import weather from './weather.js'
// 公交
import bus from './bus.js'
// 火车
import train from './train.js'

const api = Object.assign({...user}, {...weather}, {...bus}, {...train})

// 所有接口从这里走
export default api
