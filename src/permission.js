import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
console.log(store)
//  全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log(store.getters.token)
  if (store.getters.token) {
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
