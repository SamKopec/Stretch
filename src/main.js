import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import { router } from "./routes";
import { firebaseLink } from "./myInfo";
import { firebaseConfig } from "./myInfo";
import firebase from "firebase/app";
import * as auth from "./services/auth";

firebase.initializeApp(firebaseConfig);

(async () => {
	await auth.establishAuth();
	Vue.config.productionTip = false;
	Vue.use(VueRouter);
	Vue.use(VueResource);
	Vue.http.options.root = firebaseLink;
	const app = new Vue({
		render: (h) => h(App),
		router: router
	});
	app.$mount("#app");
})();
