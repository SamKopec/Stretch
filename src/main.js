import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {routes} from './routes' 
import key from './myInfo'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.root = key;

const router = new VueRouter({
	routes: routes,
	mode: 'history'
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
