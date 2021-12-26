import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import style from './assets/scss/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  style,
  render: h => h(App)
}).$mount('#app')
