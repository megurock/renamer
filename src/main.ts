import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/'
import F001 from '@/components/actions/filter/F001/F001.vue'
import F002 from '@/components/actions/filter/F002/F002.vue'

Vue.config.productionTip = false
Vue.config.errorHandler = (error: Error, vm: Vue, info: string) => {
  console.log(info, error)
}
Vue.config.warnHandler = (message: string, vm: Vue, trace: string) => {
  console.log(message, trace)
}
//
Vue.component('F001', F001)
Vue.component('F002', F002)
//
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')


