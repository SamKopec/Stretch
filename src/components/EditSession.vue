<template>
	<transition appear name="fade">
		<div style="display: flex;">
			<transition appear name="fade-toast">
				<div v-if="toastVisible" class="toast">
					<div class="red-text tiny-text yellow-back">
						Your changes have been saved
					</div>
				</div>
			</transition>
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
								v-for="stretch in stretches"
								v-bind:key="stretch.name"
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
				<div class="button-container">
					<h3 @click="editSession" class="red-text hover-red tiny-text">
						Edit Session
					</h3>
					<h3 @click="destroySession" class="red-text hover-red tiny-text">
						Delete Session
					</h3>
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
								v-for="stretch in availableStretches"
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

<!-- :src="'~/assets/Icons/' + stretch.icon" -->

<script>
import draggable from "vuedraggable";
export default {
	data() {
		return {
			sessionName: "",
			sessionMinutes: null,
			sessionSeconds: null,
			sessionUrl: "",
			stretches: [],
			toastVisible: false,
			availableStretches: [],
			constantStretches: [
				{
					name: "Forward Stretch",
					icon: "ForwardFull.svg",
					minutes: "1",
					seconds: "0"
				},
				{
					name: "Forward Bend",
					icon: "ForwardBendFull.svg",
					minutes: "1",
					seconds: "0"
				},
				{
					name: "Butterfly",
					icon: "ButterflyFull.svg",
					minutes: "1",
					seconds: "0"
				},
				{
					name: "Leg Raise",
					icon: "LegRaiseFull.svg",
					minutes: "1",
					seconds: "0"
				},
				{ name: "Lunge", icon: "LungeFull.svg", minutes: "1", seconds: "0" },
				{
					name: "Single Leg Forward",
					icon: "SingleLegForwardFull.svg",
					minutes: "1",
					seconds: "0"
				},
				{
					name: "Step Forward",
					icon: "StepForwardFull.svg",
					minutes: "1",
					seconds: "0"
				},
				{
					name: "Calf Stretch",
					icon: "CalfStretchFull.svg",
					minutes: "1",
					seconds: "0"
				},
				{
					name: "Quad Stretch",
					icon: "QuadStretchFull.svg",
					minutes: "1",
					seconds: "0"
				},
				{
					name: "Overhead Stretch",
					icon: "OverHeadStretch.svg",
					minutes: "1",
					seconds: "0"
				},
				{
					name: "Cross Arm Stretch",
					icon: "CrossArmFull.svg",
					minutes: "1",
					seconds: "0"
				}
			]
		};
	},
	created() {
		const newId = window.location.href.split("/").pop();
		this.sessionUrl = "sessions/" + newId + ".json";

		this.$http
			.get(this.sessionUrl)
			.then(
				(response) => {
					return response.json();
				},
				(error) => {
					console.log(error);
				}
			)
			.then((data) => {
				this.sessionName = data.name;
				this.stretches = data.stretches;
			});

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
		editSession() {
			this.determineDuration();
			this.filterOutEmpties();
			let changedSession = {
				name: this.sessionName,
				minutes: parseInt(this.sessionMinutes),
				seconds: parseInt(this.sessionSeconds),
				stretches: this.stretches
			};
			if (changedSession.stretches.length >= 1) {
				this.$http.put(this.sessionUrl, changedSession).then(
					() => {
						this.showToast();
					},
					(error) => {
						console.log(error);
					}
				);
			} else {
				this.destroySession();
			}
		},
		destroySession() {
			if (confirm("Do you really want to delete?")) {
				this.$http.delete(this.sessionUrl).then(
					() => {
						this.$router.push({
							name: "dashboard",
							params: { update: "deleted" }
						});
					},
					(error) => {
						console.log(error);
					}
				);
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
		showToast() {
			this.toastVisible = true;
			setTimeout(() => {
				this.toastVisible = false;
			}, 2000);
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
.toast {
	position: absolute;
	display: flex;
	justify-content: center;
	top: 5%;
	width: 100%;
}

.yellow-back {
	text-align: center;
	background-color: #fed766;
	padding: 5px;
}
</style>
