// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueSession from 'vue-session'
import HttpStatus from 'http-status'
import moment from 'moment'
import { store } from './store'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(BootstrapVue)
Vue.use(VueSession, {persist: true})
moment.locale('ko')
Vue.use(require('vue-moment'), {moment})
Vue.use(Loading, {
  canCancel: false,
  color: '#ad2552',
  loader: 'spinner' // spinner or dots or bars
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created: function () {
    var _this = this
    axios.interceptors.request.use(function (config) {
      config.headers['Authorization'] = 'Bearer ' + _this.$session.get('user-token')
      return config
    }, function (error) {
      return Promise.reject(error)
    })
    axios.interceptors.response.use(function (response) {
      console.trace(response)
      return response
    }, function (error) {
      if (error.response && error.response.status === HttpStatus.UNAUTHORIZED) {
        if (!error.config.url.endsWith('/api/auth/login')) {
          console.error(error)
          location.href = '/login'
          return
        }
      }

      return Promise.reject(error)
    })
  }
})
