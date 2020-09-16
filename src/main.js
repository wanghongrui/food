import Vue from 'vue'
import App from './App.vue'
import store from './store'

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon); 

import '@/assets/common.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
