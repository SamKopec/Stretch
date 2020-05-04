<template>
  <div>
  	<transition appear name="fade-toast">
	  	<div v-if="toastVisible"  class="toast">
	  		<div class="red-text tiny-text white-back">	
	  			{{ toastContent }}
	  		</div>
	  	</div>
  	</transition>
  	<transition v-if="headerVisible" appear name="fade">
			<div class="push-right title-container">
	      <h2 class="biggish-text blue-text">Welcome, Sam</h2>
	    </div>
  	</transition>

		<transition v-if="sessionsVisible" appear name="fade">
	    <div class="session-label">
	    	<h4 class="medium-text red-text">Your Sessions:</h4>
	    	<div class="session-container">
		    	<p v-if="sessions.length === 0" class="small-text blue-text">No sessions right now!</p>
	  			<div v-for="(session, index) in sessions">
	  				<router-link class="flex small-text" :to="{ name: 'timer', params: {session: session}}">
			    		<p class="blue-text hover-blue">{{session.name}}</p>
			    		<div class="flex red-text hover-red" style="align-items: center">
			    			<p style="margin-right: 10px;">{{session.minutes}}m</p>
			    			<p>{{session.seconds}}s</p>
			    			<router-link v-if="" class="tiny-text red-text edit hover-red" :to="{ name:'session-edit', params: {id: session.id}}">
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
	    	<router-link class="new-session push-right" :to="{ path: '/newsession'}">
	    	<h4 class="red-text small-text hover-red">New Session</h4>
	    	</router-link>
	    </div>
    </transition>
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
	    	headerVisible: true,
	    	newVisible: true,
	    	sessionsVisible: true,
	    	forwardStretch,
	    	forwardBend,
	    	butterfly,
	    	legRaise,
	    	lunge,
	    	singleLegForward,
	    	stepForward,
	    	sessions: [], 
	    	toastVisible: false,
	    	toastContent: '',
	    }
	  }, 
	  components: {
	      'app-circle': Circle,
	  },
	  methods: {
	  	showToast(content){
	  		this.toastContent = content
  			this.toastVisible = true
  			setTimeout(()=> {
  				this.toastVisible = false
  			}, 2000)
  		}
	  },
	  created(){
	  	if(this.$route.params.update === 'created'){
				this.showToast('Your Session was created')
  		} else if(this.$route.params.update === 'deleted'){
	  		this.showToast('Your Session was deleted')	
  		} else if (this.$route.params.update === 'fromLanding'){
	    	this.newVisible = false,
	    	this.sessionsVisible = false,
  			setTimeout(() => {
          this.sessionsVisible = true
	      }, 1000)
	      setTimeout(() => {
	          this.newVisible = true
	      }, 2000)
  		}
			this.$http.get('sessions.json')
        .then(response => {
          return response.json()
        }, error => {
          console.log(error)
        })
        .then(data => {
          let dataArray = []
          for(let key in data){
            const session = data[key]
            session.id = key
            dataArray.push(session)
          }
          this.sessions = dataArray
          console.log("sessions", dataArray)
        })
	    }
	}
</script>

<style>

.new-session{
	margin-top: 80px;
  margin-right: 245px;
}

.toast{
	position: absolute;
	display: flex;
	justify-content: center;
	top: 5%;
	width: 100%;
}

.white-back{
	text-align: center;
	background-color: #F4F4F8;
	padding: 5px;
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
	align-items: center;
	margin-top: 80px;
	margin-left: 240px;
	margin-right: 120px;
}

.edit {
	margin-left: 15px;
}

</style>
