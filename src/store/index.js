import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    result: [],
    item: null,
    region: "",
    styledata: null
  },
  mutations: {
    styledata_changed (state, styledata) {
      state.styledata = styledata
    },
    items_changed(state, items = []) {
      state.items = items
    },
    result_changed(state, items = []) {
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
