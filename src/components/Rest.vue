<template>
	<div id="rest-container">
		<div class="flex top-bar">
			<div>
				<router-link
					class="arrow-red-modal"
					tag="div"
					to="/dashboard"
				></router-link>
			</div>
		</div>
		<div class="next-up-text">
			<h2 class="biggish-text red-text">Next up: {{ stretch }}</h2>
		</div>
		<div class="circle-countdown-container">
			<div class="countdown flex-center blue-text">
				<p class="inner-circle-text">{{ num }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "app",
	props: {
		num: Number,
		stretch: String
	},
	data() {
		return {};
	}
};
</script>

<style>
#rest-container {
	background-color: #e6e6ea;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	min-width: 320px;
}

.next-up-text {
	text-align: center;
	cursor: pointer;
	margin-top: 40px;
}

.arrow-red-modal {
	background: url("../assets/red-arrow.svg") no-repeat top left;
	height: 50px;
	width: 50px;
	margin-left: 8px;
}

.arrow-red-modal:hover {
	background: url("../assets/red-arrow-hover.svg") no-repeat top left;
	cursor: pointer;
}

.circle-countdown-container {
	display: flex;
	justify-content: center;
}

.inner-circle-text {
	line-height: 288px;
}

.countdown {
	background-color: #fed766;
	width: 400px;
	height: 400px;
	margin-top: 80px;
	border-radius: 1000px;
	font-size: 288px;
}

@media screen and (max-width: 450px) {
	.countdown {
		width: 250px;
		height: 250px;
		font-size: 188px;
	}
	.inner-circle-text {
		line-height: 188px;
	}
}
</style>
