import { loginAPI } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
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
    }
  },
  actions: {
    // 存储token
    async loginActions({ commit }, loginData) {
      const data = await loginAPI(loginData)
      commit('SET_TOKEN', data)
    },
    // 请求用户信息
    async userInfo({ commit }) {
      // 接口请求
      const data = await getUserInfo()
      const res = await getUserDetailById(data.userId)
      // console.log(res)
      const results = { ...data, ...res }
      commit('GET_USER_INFO', results)
      console.log(results)
      return JSON.parse(JSON.stringify(results))
    }
  }
}
