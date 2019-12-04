<template>
  <div>
      <div class="flex top-bar">
        <div><router-link class="arrow-red" tag="div" to="/dashboard"></router-link></div>
        <div :class="determineIcon()" @click="pauseTimer"></div>
      </div>
      <div class="image-stretch">
        <img :src="session[currentIndex].icon"></img>
      </div>
      <h2 class="biggish-text blue-text stretch-name">{{session[currentIndex].name}}</h2>
      <div class="timer-container">
        <h1 class="timer blue-text">{{clock}}</h1>
      </div>
      <div v-if="waiting" class="modal">{{num}}</div>
      <app-circle class="move-it"></app-circle>
  </div>
</template>

<script>
  import Circle from './Circle.vue'
  export default {
    data () {
      return {
        session: this.$route.params.session.stretches,
        clock: '',
        bestTime: '',
        timerStarted: false, 
        timer: '',
        restTimer: '',
        currentIndex: 0,
        sessionAmount: '',
        audioStart: new Audio('http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3'),
        audioRest: new Audio('http://soundbible.com/mp3/Air%20Plane%20Ding-SoundBible.com-496729130.mp3'),
        audioEnd: new Audio('http://soundbible.com/mp3/party_horn-Mike_Koenig-76599891.mp3'),
        waiting: false,
        num: 5
      }
    }, 
    components: {
        'app-circle': Circle
    },
    methods: {
      startTimer(){
        if(!this.timerStarted){
          console.log("timer started")
          this.audioStart.play();
          this.timer = setInterval(()=>{
            this.bestTime = this.bestTime - 1
            this.convertTime()
          }, 1000)
          this.timerStarted = true
        } 
      },
      convertTime(){
        let minutes = Math.floor(this.bestTime/60)
        let minutesInSeconds = minutes * 60
        let seconds = this.bestTime - minutesInSeconds
        if(seconds < 10){
          seconds = '0' + seconds
        }
        this.clock = minutes + ":" + seconds
      },
      setTimer(){
        if(this.session[this.currentIndex]){
          let minute = Math.floor(this.session[this.currentIndex].duration)
          let decimal = (this.session[this.currentIndex].duration-minute).toFixed(2)
          let seconds = Math.round(60 * decimal)
          this.bestTime = (minute * 60) + seconds
          this.convertTime()
        } else {
          this.clock = '0:00'
        }
      },
      pauseTimer(){
        if(this.timerStarted){ 
          this.timerStarted = false,
          clearInterval(this.timer);
        } else {
          this.startTimer()
        }
      },
      determineIcon(){
        if(this.timerStarted){
          return 'pause'
        } else {
          return 'play'
        }
      },
      playNoise(){
        this.audioRest.play();
        if(this.currentIndex < this.sessionAmount){
          this.waiting = true
          setTimeout(()=> {
            this.waiting = false
            this.startTimer()
          }, 5000)
        }
      },
      image(){
        return `url(${forwardStretch})`
      }
    },
    watch: {
      bestTime: function(value){
        if(value === 0){
          clearInterval(this.timer);
          this.timerStarted = false
          this.currentIndex = this.currentIndex + 1
          this.setTimer()
          this.playNoise()
        }
      }, 
      currentIndex: function(value){
        if(value >= this.sessionAmount){
          this.currentIndex = 0
          this.clock = '0:00'
          this.timerStarted = false
          this.audioEnd.play()
          clearInterval(this.timer);
          this.setTimer()
        }
      },
      waiting: function(value){
        this.num = 5
        if(value){
          this.restTimer = setInterval(() => {
            if(this.num > 0){
              console.log(this.num)
              this.num --
            } else {
              this.num = 5
              clearInterval(this.restTimer)
            }
          }, 1000)
        } 
      }
    },
    created(){
      this.sessionAmount = this.session.length
      this.setTimer()
    }, 
    destroyed(){
      clearInterval(this.timer)
      clearInterval(this.restTimer)
    }
  }
</script>

<style>

.arrow-red{
  background: url('../assets/red-arrow.svg') no-repeat top left;
  height: 50px;
  width: 50px;
}

.top-bar{
  margin: 20px 20px 0 20px;

}

.move-it{
  position: fixed;
  transform: rotate(-226.29deg);
  z-index: -1;
  left: 345px;
  bottom: -800px;
}

.pause {
  background: url('../assets/pause.svg') no-repeat top left;
  height: 50px;
  width: 50px;
}

.play {
  background: url('../assets/play.svg') no-repeat top left;
  height: 50px;
  width: 50px;
}

.image-stretch {
  background-repeat: no-repeat;
  background-position: top left;
  height: 200px;
  width: 200px;
  background-size: contain;
  margin: auto;
}

.stretch-name {
  text-align: center;
  cursor: pointer;
}

.modal {
  background-color: blue;
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 50%;
  left: 50%;
  color: white;
  font-size: 50px;
  text-align: center;
}

.timer-container{
  display: flex;
  justify-content: center;
}

.timer {
  font-size: 265px;
  margin: 0;
}

</style>
