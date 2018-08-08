/*
 * @Author: hejianping
 * @Date:   2018-05-29 13:51:13
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2018-07-17 15:02:39
 */
// 公交
import Weather from '../page/common/weather/weather.vue'
import BusSearch from '../page/common/bus/bus-search/bus-search.vue'
import BusResult from '../page/common/bus/bus-result/bus-result.vue'
import NearBus from '../page/common/bus/near-bus/near-bus.vue'
// 火车
import trainSearch from '../page/common/train/train-search.vue'
import trainLocation from '../page/common/train/train-location.vue'
import trainResult from '../page/common/train/train-result.vue'
import trainDetail from '../page/common/train/train-detail.vue'

const commonRoutes = [
  {
    path: '/weather',
    name: 'weather',
    component: Weather,
    meta: {
      title: '天气预报'
    }
  },
  {
    path: '/bus-search',
    name: 'bus-search',
    component: BusSearch,
    meta: {
      title: '公交查询'
    }
  },
  {
    path: '/bus-result',
    name: 'bus-result',
    component: BusResult,
    meta: {
      title: '查询结果'
    }
  },
  {
    path: '/near-bus',
    name: 'near-bus',
    component: NearBus,
    meta: {
      title: '查询结果'
    }
  },
  {
    path: '/train-search',
    name: 'train-search',
    meta: {
      title: '火车票查询'
    },
    component: trainSearch
  },
  {
    path: '/train-location',
    name: 'train-location',
    meta: {
      title: '火车票查询'
    },
    component: trainLocation
  },
  {
    path: '/train-result',
    name: 'train-result',
    meta: {
      title: '火车票查询'
    },
    component: trainResult
  },
  {
    path: '/train-detail',
    name: 'train-detail',
    meta: {
      title: '查询详情'
    },
    component: trainDetail
  }
]

export default commonRoutes
