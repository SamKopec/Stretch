<template>
	<transition appear name="fade">
		<div style="display: flex;">
			<div class="main-left-container">
				<div class="top-left-container">
					<div>
						<router-link class="arrow" tag="div" to="/dashboard"></router-link>
					</div>
					<input
						type="text"
						maxlength="14"
						placeholder="Session Name Here"
						class="stretch-input blue-text small-text"
						v-model="sessionName"
					/>
				</div>
				<div class="added-stretches-container">
					<div>
						<draggable
							class="visible"
							v-model="stretches"
							v-bind="dragOptions"
							group="stretch"
						>
							<div
								class="flex stretch-margin stretch-margin"
								style="height: 50px; align-items: center;"
								v-for="(stretch, index) in stretches"
								:key="index"
							>
								<p class="tiny-text blue-text">{{ stretch.name }}</p>
								<div class="flex">
									<input
										type="text"
										maxlength="2"
										class="stretch-input-red tiny-text"
										v-model="stretch.minutes"
										@keypress="isInteger"
									/>
									<p class="red-text tiny-text" style="padding-bottom: 4px;">
										min
									</p>
									<input
										type="text"
										maxlength="2"
										class="stretch-input-red tiny-text"
										v-model="stretch.seconds"
										@keypress="isInteger"
									/>
									<p class="red-text tiny-text" style="padding-bottom: 4px;">
										sec
									</p>
								</div>
							</div>
						</draggable>
					</div>
				</div>
				<div @click="makeSession" class="button-container">
					<h3 class="red-text hover-red tiny-text">Add Session</h3>
				</div>
			</div>
			<p class="vertical-divide tiny-text blue-text">
				Drag Stretches Here to Add
			</p>
			<div class="main-left-container">
				<div class="top-left-container">
					<input
						type="text"
						class="stretch-input blue-text small-text"
						style="visibility: hidden;"
					/>
				</div>
				<div class="existing-stretches-container">
					<div>
						<draggable
							class="visible"
							v-bind="dragOptions"
							v-model="availableStretches"
							:group="{ name: 'stretch', pull: 'clone' }"
						>
							<div
								class="stretch-container"
								v-for="(stretch, index) in availableStretches"
								v-bind:key="`${stretch.name}-${index}`"
							>
								<img :src="getImgUrl(stretch.icon)" class="stretch-icon" />
								<div class="name-stretch stretch-margin">
									<p class="tiny-text blue-text">{{ stretch.name }}</p>
								</div>
							</div>
						</draggable>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import draggable from "vuedraggable";
import * as auth from "../services/auth";
import { stretchesList } from "../data/stretches";
export default {
	data() {
		return {
			sessionName: "",
			sessionMinutes: null,
			sessionSeconds: null,
			stretches: [],
			availableStretches: [],
			constantStretches: stretchesList
		};
	},
	created() {
		this.availableStretches = this.constantStretches;
	},
	watch: {
		availableStretches: function () {
			this.availableStretches = this.constantStretches;
		}
	},
	components: {
		draggable
	},
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost"
			};
		}
	},
	methods: {
		makeSession() {
			this.determineDuration();
			this.filterOutEmpties();
			let user = auth.getUser();
			let newSession = {
				name: this.sessionName,
				minutes: this.sessionMinutes,
				seconds: this.sessionSeconds,
				stretches: this.stretches,
				user: user.uid
			};
			if (newSession.stretches.length >= 1) {
				this.$http.post("sessions.json", newSession).then(
					(response) => {
						this.$router.push({
							name: "dashboard",
							params: { update: "created" }
						});
					},
					(error) => {
						console.log(error);
					}
				);
			} else {
				console.log("Add some stretches to your session");
			}
		},
		determineDuration() {
			let minutes = 0;
			let seconds = 0;
			for (let stretch of this.stretches) {
				stretch.minutes = stretch.minutes * 1;
				stretch.seconds = stretch.seconds * 1;
				if (stretch.minutes === "" || parseInt(stretch.minutes) <= 0) {
					stretch.minutes = 0;
				}
				if (stretch.seconds === "" || parseInt(stretch.seconds) <= 0) {
					stretch.seconds = 0;
				}
				minutes = minutes + parseInt(stretch.minutes);
				seconds = seconds + parseInt(stretch.seconds);
			}
			const extraMin = parseInt(seconds / 60);
			if (extraMin >= 1) {
				minutes = minutes + extraMin;
				seconds = seconds - 60 * extraMin;
			}
			this.sessionMinutes = minutes;
			this.sessionSeconds = seconds;
		},
		filterOutEmpties() {
			this.stretches = this.stretches.filter(
				(stretch) =>
					!(parseInt(stretch.seconds) === 0 && parseInt(stretch.minutes) === 0)
			);
		},
		getImgUrl(pic) {
			return require("../assets/Icons/" + pic);
		},
		isInteger(event) {
			let numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
			if (!numberArray.includes(event.key)) {
				event.preventDefault();
			} else {
				return true;
			}
		}
	}
};
</script>

<style>
.vertical-divide {
	writing-mode: vertical-rl;
	margin: 0px;
	border-right: 3px dashed #c3dde3;
	height: 100%;
	text-align: center;
}

.arrow {
	background: url("../assets/arrow.svg") no-repeat top left;
	height: 30px;
	width: 30px;
}

.arrow:hover {
	background: url("../assets/arrow-hover.svg") no-repeat top left;
	height: 30px;
	width: 30px;
}

.stretch-icon {
	background-repeat: no-repeat;
	background-position: top left;
	height: 50px;
	width: 50px;
	margin-right: 50px;
	margin-bottom: 15px;
}

.ghost {
	opacity: 0.5;
}

.stretch-container {
	display: flex;
}

.main-left-container {
	width: 50%;
	height: 100vh;
	margin-top: 30px;
	margin-left: 20px;
	margin-right: 20px;
}

.top-left-container {
	display: flex;
	height: 50px;
}

.stretch-input {
	border-bottom: 3px solid #2ab7ca;
	margin-left: 5%;
}

.stretch-input-red {
	width: 50px;
	border-bottom: 3px solid #fe4a49;
	margin-left: 20px;
	margin-right: 5px;
	text-align: center;
	color: #fe4a49;
}

.visible {
	min-height: 60vh;
	border: 3px dashed #c3dde3;
	min-width: 25vw;
	padding: 30px;
	overflow: scroll;
	cursor: pointer;
}

.stretch-margin {
	margin-right: 15px;
	margin-bottom: 15px;
}

.name-stretch {
	display: flex;
	align-items: center;
}

.added-stretches-container {
	margin-left: 10%;
}

.existing-stretches-container {
	margin-left: 40px;
}

.button-container {
	display: flex;
	justify-content: space-between;
	width: 25vw;
	padding-top: 15px;
	margin-left: 10%;
}

.button-container h3 {
	text-align: center;
	margin: 0;
	margin-right: 5%;
	cursor: pointer;
}

@media screen and (min-width: 850px) {
	.arrow {
		height: 50px;
		width: 50px;
	}
	.arrow:hover {
		height: 50px;
		width: 50px;
	}
}

@media screen and (max-width: 320px) {
	.stretch-input {
		max-width: 154px;
	}
}
</style>
