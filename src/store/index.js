import Vue from 'vue'
import Vuex from 'vuex'
import Home from './modules/Home'
import Environment from './modules/Environment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    initEnvironment: async ({ dispatch}) => {
      dispatch('Environment/init')
    }
  },
  modules: {
    Home,
    Environment
  }
})
