import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import { routes } from "./routes";
import key from "./myInfo";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = key;

const router = new VueRouter({
	routes: routes,
	mode: "history"
});

new Vue({
	render: (h) => h(App),
	router: router
}).$mount("#app");
