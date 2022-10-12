// import PageTools from './PageTools/index.vue'
import * as filters from '@/filters/index'
// console.log(filters)
// const components = [PageTools]

// export default {
//   install(Vue) {
//     components.forEach(ele => {
//       console.log(ele)
//       Vue.component(ele.name, ele)
//     })
//   }
// }
const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys())
// console.log(fn('./PageTools/index.vue'))
const components = fn.keys().map(ele => fn(ele))
export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}

