/*
* @Author: hejianping
* @Date:   2018-05-29 14:48:44
* @Last Modified by:   hejianping
* @Last Modified time: 2018-06-06 11:01:34
*/
import Vue from 'vue'
import Vuex from 'vuex'

import count from './modules/count.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    count
  }
})

export default store
