import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  /* have to set strict to false because vuex is complete shit. storing the google maps object in the store causes it to
  fail with "RangeError: Maximum call stack size exceeded" if strict is true. see:
  https://github.com/vuejs/vuex/issues/1587 */
  strict: false,
  modules
})
