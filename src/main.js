import Vue from 'vue'
import App from './App.vue'
import store from './store'

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

import vuescroll from 'vuescroll';
Vue.use(vuescroll, {
  ops: {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: '#c1c1c1',
      opacity: 0,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: 0.3,
      size: '6px',
      disable: false
    },
    scrollPanel: {
      scrollingX: false
    },
    vuescroll: {
      wheelScrollDuration: 1000
    }
  }
});

import '@/assets/common.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
