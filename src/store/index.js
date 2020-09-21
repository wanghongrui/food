import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapLoaded: false,
    items: [],
    result: [],
    item: null,
    region: "全部"
  },
  mutations: {
    map_loaded(state) {
      state.mapLoaded = true
    },
    items_changed(state, items = []) {
      state.items = items
    },
    result_changed(state, items = []) {
      console.log(items)
      state.result = items
    },
    item_changed(state, item) {
      state.item = item
    },
    region_changed (state, region = "全部") {
      state.region = region
    }
  }
})
