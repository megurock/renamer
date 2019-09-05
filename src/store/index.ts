import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

Vue.config.errorHandler = (error: Error, vm: Vue, info: string) => {
  console.log(info, error)
}

Vue.config.warnHandler = (message: string, vm: Vue, trace: string) => {
  console.log(message, trace)
}

export default new Vuex.Store({
  state,
})
