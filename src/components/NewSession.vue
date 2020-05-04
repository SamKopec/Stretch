<template>
	<transition appear name="fade">
  <div style="display: flex;">
  	<div class="main-left-container">
  		<div class="top-left-container">
				<div><router-link class="arrow" tag="div" to="/dashboard"></router-link></div>
				<input type="text" placeholder="Session Name Here" class="stretch-input blue-text small-text" v-model="sessionName">
			</div>
			<div class="added-stretches-container">
				<div>	
					<draggable class="visible" v-model="stretches" v-bind="dragOptions" group="stretch">
						<div class="flex stretch-margin stretch-margin " style='height: 50px; align-items: center' v-for="(stretch, index) in stretches" :key="index">
							<p class="tiny-text blue-text "> {{stretch.name}} </p>
							<div class="flex">
								<input type="number" min="0" step="1" class="stretch-input-red tiny-text" v-model="stretch.minutes">
								<p class="red-text tiny-text" style="padding-bottom:4px">min</p>
								<input type="number" min="0" step="1" class="stretch-input-red tiny-text" v-model="stretch.seconds">
								<p class="red-text tiny-text" style="padding-bottom:4px">sec</p>
							</div>
						</div>
					</draggable>
				</div>
			</div>
			<div @click="makeSession" class="button-container">
				<h3 class="red-text hover-red">Add Session</h3>
			</div>
  	</div>
  	<div class="vertical-line">
  		<div class="explanation tiny-text blue-text">Drag Stretches Here to Add</div>
  	</div>
  	<div class="main-left-container">
  		<div class="top-left-container">
				<input type="text" class="stretch-input blue-text small-text" style="visibility: hidden;" :value="''">
			</div>
			<div class="added-stretches-container">
				<div>	
					<draggable class="visible" v-bind="dragOptions" v-model="availableStretches" :group="{ name: 'stretch', pull: 'clone'}">
						<div class="stretch-container" v-for="stretch in availableStretches">
							<img :src="stretch.icon" class="stretch-icon">
							<div class="name-stretch stretch-margin">		
								<p class="tiny-text blue-text"> {{stretch.name}} </p>
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
	import draggable from 'vuedraggable'
	import forwardStretch from '../assets/icons/ForwardFull.svg'
	import forwardBend from '../assets/icons/ForwardBendFull.svg'
	import butterfly from '../assets/icons/ButterflyFull.svg'
	import legRaise from '../assets/icons/LegRaiseFull.svg'
	import lunge from '../assets/icons/LungeFull.svg'
	import singleLegForward from '../assets/icons/SingleLegForwardFull.svg'
	import stepForward from '../assets/icons/StepForwardFull.svg'
	export default {
	  data () {
	    return {
	    	sessionName: '',
	    	sessionMinutes: null,
	    	sessionSeconds: null,
	    	forwardStretch,
	    	forwardBend,
	    	butterfly,
	    	legRaise,
	    	lunge,
	    	singleLegForward,
	    	stepForward,
	    	stretches: [],
	    	availableStretches: [], 
	    	constantStretches: [
					{name: 'Forward Stretch', icon: forwardStretch, minutes: '1', seconds: '0'},
					{name: 'Forward Bend', icon: forwardBend, minutes: '1', seconds: '0'},
					{name: 'Butterfly', icon: butterfly, minutes: '1', seconds: '0'},
					{name: 'Leg Raise', icon: legRaise, minutes: '1', seconds: '0'},
					{name: 'Lunge', icon: lunge, minutes: '1', seconds: '0'},
					{name: 'Single Leg Forward', icon: singleLegForward, minutes: '1', seconds: '0'},
					{name: 'Step Forward', icon: stepForward, minutes: '1', seconds: '0'}
				],
	    }
	  }, 
	  created(){
	  	this.availableStretches = this.constantStretches
	  },
	  watch: {
	  	availableStretches: function(){
	  		this.availableStretches = this.constantStretches
	  	}
	  },
	  components: {
      draggable,
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
  		makeSession(){
  			this.determineDuration()
  			this.filterOutEmpties()
  			let newSession = {
  				name: this.sessionName,
  				minutes: this.sessionMinutes,
  				seconds: this.sessionSeconds,
  				stretches: this.stretches
  			}
  			if(newSession.stretches.length >= 1){
  				 this.$http.post('sessions.json', newSession)
	        .then(response => {
	          console.log(response)
	          this.$router.push({name: 'dashboard', params: {update: 'created'}})
	        }, error => {
	          console.log(error)
	        });
  			} else {
  				console.log("Add some stretches to your session")
  			}
  		},
  		determineDuration(){
  			let minutes = 0
  			let seconds = 0
  			for(let stretch of this.stretches){
  				if (stretch.minutes === '' || parseInt(stretch.minutes) <= 0){
  					stretch.minutes = 0
  				}
  				if (stretch.seconds === '' || parseInt(stretch.seconds) <= 0){
  					stretch.seconds = 0
  				}		
  				minutes = minutes + parseInt(stretch.minutes)
  				seconds = seconds + parseInt(stretch.seconds)
  			}
  			const extraMin = parseInt(seconds/60)
  			if(extraMin >= 1){
  				minutes = minutes + extraMin
  				seconds = seconds - (60 * extraMin)
  			}
  			this.sessionMinutes = minutes
  			this.sessionSeconds = seconds
  		},
  		filterOutEmpties(){
				this.stretches = this.stretches.filter(stretch => !(parseInt(stretch.seconds) === 0 && parseInt(stretch.minutes) === 0))
  		},
  	}
	}
</script>

<style>

.arrow {
	background: url('../assets/arrow.svg') no-repeat top left;
	height: 50px;
	width: 50px;
}

.arrow:hover {
	background: url('../assets/arrow-hover.svg') no-repeat top left;
	height: 50px;
	width: 50px;
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

.stretch-container{
	display: flex;
}

.main-left-container {
	width: 50%;
	display: flex;
	flex-direction: column;
	height: 100vh;
	margin-top: 30px;
  margin-left: 20px;
}

.top-left-container {
	display: flex;
}

.stretch-input {
	border-bottom: 3px solid #2AB7CA;
	padding-bottom: 5px;
	margin-left: 90px;
}

.stretch-input-red {
	width: 50px;
  border-bottom: 3px solid #FE4A49;
  margin-left: 20px;
  margin-right: 5px;
  text-align: center;
  color: #FE4A49;
}

.visible {
  min-height: 60vh;
  border: 3px dashed #C3DDE3;
  min-width: 25vw;
  padding: 30px;
  cursor: pointer;
}

.stretch-margin {
	margin-right: 15px;
	margin-bottom: 15px;
}

.name-stretch{
	display: flex;
	align-items: center;
}

.vertical-line {
	height: 100vh;
  border-left: 3px dashed #C3DDE3;
  margin-left: 50px;
}

.explanation {
	position: absolute;
	transform: rotate(90deg);
	top: 50%;
	left: 40%;
}

.added-stretches-container {
  align-items: center;
  display: flex;
  flex-grow: 0.4;
  margin-left: 140px;
}

.button-container{
	display: flex;
	justify-content: space-between;
  width: 25vw;
  padding: 0 30px;
	margin-left: 140px;
}

.button-container h3{
	text-align: center;
	font-size: 20px;
	margin: 0;
	cursor: pointer;
}

</style>
