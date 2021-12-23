import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import expense from './modules/expense'
import staff from './modules/staff'

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
    expense,
    staff
  }
})
