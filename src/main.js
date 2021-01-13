import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

Vue.config.productionTip = false
Vue.use(VueMeta)

new Vue({
  router,
  store,
  // @ts-ignore
  render: h => h(App)
}).$mount('#app')
