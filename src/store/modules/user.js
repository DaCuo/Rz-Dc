import { loginAPI } from '@/api/login'

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async  loginActions({ commit }, loginData) {
      const data = await loginAPI(loginData)
      // console.log(data.data)
      commit('SET_TOKEN', data)
    }
  }
}
