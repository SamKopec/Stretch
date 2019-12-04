<template>
  <div>
		<div class="push-right title-container">
      <h2 class="biggish-text blue-text">Welcome, Sam</h2>
    </div>
    <div class="session-label">
    	<h4 class="medium-text red-text">Your Sessions:</h4>
    	<div class="session-container">
  			<div v-for="(session, index) in sessions">
  				<router-link class="flex small-text" :to="{ name: 'timer', params: {session: session}}">
		    		<p class="blue-text">{{session.name}}</p>
		    		<div class="flex" style="align-items: center">
		    			<p class="red-text">{{session.duration}} min</p>
		    			<router-link v-if="" class="tiny-text red-text edit" :to="{ name:'session-edit', params: {id: index}}">
	    					<div>Edit</div>
	    				</router-link>
		    		</div>
	    		</router-link>
    		</div>
    	</div>
    </div>
    <div>
    	<router-link class="new-session push-right" :to="{ path: '/newsession'}">
    	<h4 class="red-text small-text">New Session</h4>
    	</router-link>
    </div>
		<app-circle></app-circle>
  </div>
</template>

<script>
	import Circle from './Circle.vue'
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
	    	forwardStretch,
	    	forwardBend,
	    	butterfly,
	    	legRaise,
	    	lunge,
	    	singleLegForward,
	    	stepForward,
	    	sessions: [], 
	    }
	  }, 
	  components: {
	      'app-circle': Circle
	  },
	  methods: {
	  },
	  created(){
			this.$http.get('sessions.json')
        .then(response => {
          return response.json()
        }, error => {
          console.log(error)
        })
        .then(data => {
          let dataObject = {}
          for(let key in data){
            dataObject[key] = data[key];
          }
          this.sessions = dataObject
        })
	    }
	}
</script>

<style>

.new-session{
	margin-top: 80px;
  margin-right: 245px;
}

.title-container {
  margin-top: 80px;
  margin-right: 120px;
}

.session-container {
	width: 55%;
	max-height: 190px;
	overflow: scroll;
}

.session-label {
	display: flex;
	justify-content: space-between;
	margin-top: 80px;
	margin-left: 240px;
	margin-right: 120px;
}

.edit {
	margin-left: 15px;
}

.edit:hover {
	color: #D03D3C;
}

</style>
