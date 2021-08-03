const data = {
  orders: [
      {
          name: 'Livi優活 抽取式衛生紙(100抽x10包x10串/箱)',
          logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
          status: {
            code: 3,
            type: '已取消'
          },
          date: '107/6/12'
      },
      {
          name: 'BALMUDA The Toaster 百慕達烤麵包機-黑色',
          logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
          status: {
            code: 2,
            type: '已成立'
          },
          date: '108/7/21'
      },
      {
          name: '贈-短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...',
          logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
          status: {
            code: 1,
            type: '處理中'
          },
          date: '108/6/2'
       },
       {
          name: 'Apple AirPds 2',
          logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
          status: {
            code: 4,
            type: '已送達'
          },
          date: '108/3/02'
      }
  ]
}

const state = {
  orders: []
}
const mutations = {
  SET_ORDER(state, data) {
    state.orders = data.sort((a,b) => {
      return b.date.localeCompare(a.date)
    })
  },
  POST_STATUS(state, data) {
    console.log(data)
    // state.orders = 
  },
  POST_ORDER(state, data) {
    data.forEach(el => {
      state.orders = [...state.orders, el]
    })
  }
}
const actions = {
  getOrder: async ({ commit }) => {
    commit('SET_ORDER', data.orders)
  },
  postStatus: async ({ commit }, value) => {
    try {
      if (value) {
        commit('POST_STATUS', value)
      }
    } catch(e) {
      console.log(e)
    }
  },
  postOrder: async ({ commit }, value) => {
    commit('POST_ORDER', value)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}