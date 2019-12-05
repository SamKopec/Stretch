import LandingPage from './components/LandingPage.vue'
import Dashboard from './components/Dashboard.vue'
import NewSession from './components/NewSession.vue'
import EditSession from './components/EditSession.vue'
import Timer from './components/Timer.vue'

export const routes = [
	{path: '', component: LandingPage },
	{path: '/dashboard', name: 'dashboard', component: Dashboard },
	{path: '/newsession', component: NewSession, props: true },
	{path: '/editsession/:id', component: EditSession, name: 'session-edit', props: true },
	{path: '/timer', component: Timer, name: 'timer', props: true },
]