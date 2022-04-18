import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import school from './modules/school'
import users from './modules/users'
import offenses from './modules/offenses'

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
    school,
    users,
    offenses
  }

})
