import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = true

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
]
const router = new VueRouter({
  routes,
})

new Vue({
  vuetify,
  router,
  el: '#app',
  render: h => h(App),
})