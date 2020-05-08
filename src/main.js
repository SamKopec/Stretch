import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import { routes } from "./routes";
import { firebaseLink } from "./myInfo";
import { firebaseConfig } from "./myInfo";
import firebase from "firebase";

Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = firebaseLink;

const router = new VueRouter({
	routes: routes,
	mode: "history"
});

new Vue({
	render: (h) => h(App),
	router: router
}).$mount("#app");
