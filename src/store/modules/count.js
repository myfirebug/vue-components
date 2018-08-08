/*
* @Author: hejianping
* @Date:   2018-05-29 14:44:11
* @Last Modified by:   hejianping
* @Last Modified time: 2018-05-29 15:20:35
*/
// state
const state = {
  count: 0
}

// getters
const getters = {
  newCount (state) {
    return `我是通过getters改变count值：` + state.count
  }
}

// mutations
const mutations = {
  updateCount (state, payload) {
    state.count = state.count + payload
  }
}

// actions
const actions = {
  updateCountAsync ({commit}) {
    commit('updateCount', 5)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
