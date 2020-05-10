import LandingPage from "./components/LandingPage.vue";
import VueRouter from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import Timer from "./components/Timer.vue";
import NewSession from "./components/NewSession.vue";
import EditSession from "./components/EditSession.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import firebase from "firebase";
import * as auth from "./services/auth";

export const routes = [
	{ path: "", component: LandingPage },
	{
		path: "/dashboard",
		name: "dashboard",
		component: Dashboard,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/stretch/:id",
		component: Timer,
		name: "timer",
		props: true,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/newsession",
		component: NewSession,
		props: true,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/login",
		component: Login,
		meta: {
			requiresGuest: true
		}
	},
	{
		path: "/new-user",
		component: Register,
		meta: {
			requiresGuest: true
		}
	},
	{
		path: "/editsession/:id",
		component: EditSession,
		name: "session-edit",
		props: true,
		meta: {
			requiresAuth: true
		}
	}
];

export const router = new VueRouter({
	routes: routes,
	mode: "history"
});

router.beforeEach(async (to, from, next) => {
	await auth.establishAuth();
	const user = auth.getUser();
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!user) {
			next({ path: "/login", query: { redirect: to.fullPath } });
		} else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.requiresGuest)) {
		if (user) {
			next({ path: "/dashboard", query: { redirect: to.fullPath } });
		} else {
			next();
		}
	} else {
		next();
	}
});
