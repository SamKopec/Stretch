<template>
	<div class="login-container">
		<div class="form-container">
			<div class="login-label">
				<p class="red-text small-text">Sign Up</p>
			</div>
			<div>
				<p class="blue-text tiny-text input-label">First Name</p>
				<input
					class="login-input full-input blue-text tiny-text"
					type="text"
					v-model="userName"
				/>
			</div>
			<div>
				<p class="blue-text tiny-text input-label">Email</p>
				<input
					class="login-input full-input blue-text tiny-text"
					type="text"
					v-model="email"
				/>
			</div>
			<div>
				<p class="blue-text tiny-text input-label">Password</p>
				<input
					class="login-input full-input blue-text tiny-text"
					type="text"
					v-model="password"
				/>
			</div>
			<div
				@click="createUser"
				class="login-label red-text hover-red small-text"
			>
				Sign up
			</div>
			<div class="login-label blue-text tiny-text">
				Existing Account?
				<router-link :to="{ path: '/login' }">
					<span class="red-text hover-red sign-up-margin">Login</span>
				</router-link>
			</div>
		</div>
		<app-circle></app-circle>
	</div>
</template>

<script>
import Circle from "./Circle.vue";
import firebase from "firebase/app";
import * as auth from "../services/auth";
export default {
	data() {
		return {
			userName: "",
			email: "",
			password: ""
		};
	},
	components: {
		"app-circle": Circle
	},
	methods: {
		createUser() {
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then((data) => {
					this.makeUser(data.user);
				})
				.catch((error) => {
					console.log(error.message);
				});
		},
		async makeUser(user) {
			await auth.establishAuth();
			firebase
				.database()
				.ref("users/" + user.uid)
				.set({
					userName: this.userName,
					email: this.email
				});
			this.$router.push({
				name: "dashboard",
				params: { update: "fromLanding" }
			});
		}
	}
};
</script>

<style scoped>
.full-input {
	width: 100%;
}

.login-input {
	border-bottom: 3px solid #2ab7ca;
}

.login-label {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
	margin-top: 20px;
}

.input-label {
	margin-top: 20px;
}

.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}
.form-container {
	color: white;
	width: 50%;
	height: 85%;
}

.sign-up-margin {
	margin-left: 10px;
}

@media screen and (min-width: 850px) {
	.full-input {
		width: 80%;
	}
}
</style>
