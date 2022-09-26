import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
// console.log(store)
// console.log(store.getters)
// console.log(store.getters.userId)
//  全局前置路由守卫
router.beforeEach(async(to, from, next) => {
  // console.log(store.getters.token)
  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('user/userInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
