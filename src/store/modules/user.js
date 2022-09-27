import { loginAPI } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    GET_USER_INFO(state, data) {
      state.userInfo = data
    },
    REMOVE_SUER_INFO(state) {
      state.userInfo = {}
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_HRESAAS(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: {
    // 存储token
    async loginActions({ commit }, loginData) {
      const data = await loginAPI(loginData)
      commit('SET_TOKEN', data)
      commit('SET_HRESAAS', +new Date())
    },
    // 请求用户信息
    async userInfo({ commit }) {
      // 接口请求
      const data = await getUserInfo()
      const res = await getUserDetailById(data.userId)
      const results = { ...data, ...res }
      commit('GET_USER_INFO', results)
      return JSON.parse(JSON.stringify(results))
    },
    async logout({ commit }) {
      commit('REMOVE_SUER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
