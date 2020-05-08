import LandingPage from "./components/LandingPage.vue";
import Dashboard from "./components/Dashboard.vue";
import Timer from "./components/Timer.vue";
import NewSession from "./components/NewSession.vue";
import EditSession from "./components/EditSession.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

export const routes = [
	{ path: "", component: LandingPage },
	{ path: "/dashboard", name: "dashboard", component: Dashboard },
	{ path: "/stretch/:id", component: Timer, name: "timer", props: true },
	{ path: "/newsession", component: NewSession, props: true },
	{ path: "/login", component: Login },
	{ path: "/new-user", component: Register },
	{
		path: "/editsession/:id",
		component: EditSession,
		name: "session-edit",
		props: true
	}
];
