import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import school from './modules/school'
import users from './modules/users'
import offenses from './modules/offenses'
import students from './modules/students'
import templates from './modules/templates'

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
    offenses,
    students,
    templates
  }

})
