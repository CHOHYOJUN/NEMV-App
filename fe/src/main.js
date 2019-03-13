import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.$axios = axios
const apiRootPath = 'http://localhost:3000/api/'
Vue.prototype.$apiRootPath = apiRootPath

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
