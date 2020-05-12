<template>
	<div>
		<transition appear name="fade-toast">
			<div v-if="toastVisible" class="toast">
				<div class="red-text tiny-text white-back">
					{{ toastContent }}
				</div>
			</div>
		</transition>
		<transition v-if="headerVisible" appear name="fade">
			<div class="title-container">
				<h2 class="biggish-text blue-text">Welcome, {{ user.userName }}</h2>
			</div>
		</transition>

		<transition v-if="sessionsVisible" appear name="fade">
			<div class="session-label">
				<h4 class="medium-text red-text">Your Sessions:</h4>
				<div class="session-container">
					<p v-if="sessions.length === 0" class="small-text blue-text">
						Add some sessions to begin!
					</p>
					<div
						class="session-each"
						v-for="(session, index) in sessions"
						v-bind:key="index"
					>
						<router-link
							class="flex small-text"
							:to="{ name: 'timer', params: { id: session.id } }"
						>
							<p class="blue-text hover-blue">{{ session.name }}</p>
							<div class="flex red-text hover-red" style="align-items: center;">
								<p style="margin-right: 10px;">{{ session.minutes }}m</p>
								<p>{{ session.seconds }}s</p>
								<router-link
									class="tiny-text red-text edit hover-red"
									:to="{ name: 'session-edit', params: { id: session.id } }"
								>
									<div>Edit</div>
								</router-link>
							</div>
						</router-link>
					</div>
				</div>
			</div>
		</transition>

		<transition v-if="newVisible" appear name="fade">
			<div>
				<router-link
					class="new-session button-margin"
					:to="{ path: '/newsession' }"
				>
					<h4 class="red-text small-text hover-red">+ New Session</h4>
				</router-link>
				<div class="new-session" @click="logout">
					<h4 class="red-text small-text hover-red">Logout</h4>
				</div>
				<router-link
					v-if="!user.email"
					class="new-session"
					:to="{ name: 'guest-registration' }"
				>
					<h4 class="red-text small-text hover-red">Create Account</h4>
				</router-link>
			</div>
		</transition>
		<app-circle></app-circle>
	</div>
</template>

<script>
import Circle from "./Circle.vue";
import * as auth from "../services/auth";
export default {
	data() {
		return {
			headerVisible: true,
			newVisible: true,
			sessionsVisible: true,
			sessions: [],
			toastVisible: false,
			toastContent: "",
			user: null
		};
	},
	components: {
		"app-circle": Circle
	},
	methods: {
		showToast(content) {
			this.toastContent = content;
			this.toastVisible = true;
			setTimeout(() => {
				this.toastVisible = false;
			}, 2000);
		},
		async logout() {
			const isSignedOut = await auth.logout();
			if (isSignedOut) {
				this.$router.push({
					path: "/login"
				});
			}
		},
		enterCreateUser() {
			this.$router.push({
				name: "dashboard",
				params: { uid: user.uid }
			});
		},
		grabSessions() {
			this.$http
				.get(`sessions.json?orderBy="user"&equalTo="${this.user.uid}"`)
				.then(
					(response) => {
						return response.body;
					},
					(error) => {
						console.log(error);
					}
				)
				.then((data) => {
					let dataArray = [];
					for (let key in data) {
						const session = data[key];
						session.id = key;
						dataArray.push(session);
					}
					this.sessions = dataArray;
				});
		}
	},
	async created() {
		this.user = auth.getUser();
		if (this.$route.params.update === "created") {
			this.showToast("Your Session was created");
		} else if (this.$route.params.update === "deleted") {
			this.showToast("Your Session was deleted");
		} else if (this.$route.params.update === "fromLanding") {
			(this.newVisible = false),
				(this.sessionsVisible = false),
				setTimeout(() => {
					this.sessionsVisible = true;
				}, 1000);
			setTimeout(() => {
				this.newVisible = true;
			}, 2000);
		}
		this.grabSessions();
	}
};
</script>

<style>
.title-container {
	display: flex;
	justify-content: center;
	margin-top: 50px;
	margin-right: 0;
}

.session-label {
	display: block;
	margin: 0;
	margin-top: 35px;
	margin-left: 20%;
}

.session-label h4 {
	margin-right: 20px;
}

.session-container {
	width: 83%;
	overflow: scroll;
	margin-top: 30px;
}

.new-session {
	margin: auto;
	margin-top: 30px;
	display: flex;
	justify-content: center;
}

.button-margin {
	margin-top: 80px;
}

.toast {
	position: absolute;
	display: flex;
	justify-content: center;
	top: 5%;
	width: 100%;
}

.white-back {
	text-align: center;
	background-color: #f4f4f8;
	padding: 5px;
}

.edit {
	margin-left: 15px;
}

@media screen and (min-width: 1300px) {
	.new-session {
		margin-right: 245px;
		justify-content: flex-end;
	}

	.title-container {
		margin-top: 80px;
		margin-right: 120px;
		display: flex;
		justify-content: flex-end;
	}

	.session-container {
		width: 55%;
		max-height: 190px;
		min-width: 545px;
		margin-top: 0px;
	}

	.session-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 80px;
		margin-left: 240px;
		margin-right: 120px;
	}
}

@media screen and (min-width: 850px) {
	.new-session {
		margin-right: 245px;
		justify-content: flex-end;
	}

	.title-container {
		margin-top: 80px;
		margin-right: 120px;
		display: flex;
		justify-content: flex-end;
	}

	.session-container {
		width: 55%;
		max-height: 190px;
		min-width: 545px;
		min-width: 370px;
		margin-top: 0px;
	}

	.session-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 80px;
		margin-left: 240px;
		margin-right: 120px;
	}
}

@media screen and (max-width: 450px) {
	.session-label {
		margin-left: 10%;
	}

	.session-container {
		width: 90%;
		margin-top: 20px;
	}

	.session-each {
		margin-top: 20px;
	}
}
</style>
