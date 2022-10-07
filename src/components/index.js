// import PageTools from './PageTools/index.vue'

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
const fn1 = require.context('./', true, /^[^\/]+\/statistics\/?(?:[^\/]+\/?)*$/gm)
console.log(fn1.keys())
// console.log(fn.keys())
// console.log(fn('./PageTools/index.vue'))
const components = fn.keys().map(ele => fn(ele))
export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
}

