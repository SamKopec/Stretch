import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import { router } from "./routes";
import { firebaseLink } from "./myInfo";
import { firebaseConfig } from "./myInfo";
import firebase from "firebase/app";

Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = firebaseLink;

new Vue({
	render: (h) => h(App),
	router: router
}).$mount("#app");
