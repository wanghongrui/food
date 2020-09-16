import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapLoaded: false
  },
  mutations: {
    map_loaded(state) {
      state.mapLoaded = true
    }
  },
  actions: {
  },
  modules: {
  }
})
