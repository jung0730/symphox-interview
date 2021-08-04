import { setLocalstorage, getLocalstorage } from '@/utils/Localstorage'

const state = {
  account: ''
}
const mutations = {
  SET_ACCOUNT(state, account) {
    state.account = account
  }
}
const actions = {
  init: async ({ commit }) => {
    const account = getLocalstorage('ACCOUNT')
    if (account !== null) {
      commit('SET_ACCOUNT', account)
    }
  },
  login: async ({ commit }, account) => {
    commit('SET_ACCOUNT', account)
    setLocalstorage('ACCOUNT', account)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}