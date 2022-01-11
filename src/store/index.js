import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import expenditure from './modules/expenditure'
import staff from './modules/staff'
import shared from './modules/shared'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    expenditure,
    staff,
    shared
  }
})
