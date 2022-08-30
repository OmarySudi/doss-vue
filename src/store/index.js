import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import school from './modules/school'
import users from './modules/users'
import offenses from './modules/offenses'
import students from './modules/students'
import messages from './modules/messages'
import offenseOccurrences from './modules/offenseOccurrences'
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
    messages,
    users,
    offenses,
    students,
    offenseOccurrences,
    templates
  }

})
