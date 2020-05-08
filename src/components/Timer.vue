<template>
  <transition appear name="fade">
    <div>
      <div class="flex top-bar">
        <div>
          <router-link class="arrow-red" tag="div" to="/dashboard">
          </router-link>
        </div>
        <div class="flex">
          <div style="margin: 10px 0;">
            <input id="checkbox" v-model="setWaitingTimer" type="checkbox" />
            <label for="checkbox" class="checkbox-label">Use Rest Timer</label>
          </div>
          <div
            v-if="!waiting"
            :class="determineIcon()"
            @click="pauseTimer"
          ></div>
        </div>
      </div>
      <div class="image-stretch">
        <img :src="getImgUrl(session[currentIndex].icon)" />
      </div>
      <h2 class="biggish-text blue-text stretch-name">
        {{ session[currentIndex].name }}
      </h2>
      <div class="timer-container">
        <h1 class="timer blue-text">{{ clock }}</h1>
      </div>
      <div class="timer-container">
        <h3 @click="nextStretch" class="red-text hover-red">
          Next Stretch
        </h3>
      </div>
      <app-rest
        v-if="waiting"
        :num="num"
        :stretch="session[currentIndex].name"
      ></app-rest>
      <app-circle class="move-it"></app-circle>
    </div>
  </transition>
</template>

<script>
import Circle from "./Circle.vue";
import Rest from "./Rest.vue";
export default {
  data() {
    return {
      session: this.$route.params.session.stretches,
      clock: "",
      bestTime: "",
      timerStarted: false,
      restTimerStarted: false,
      setWaitingTimer: true,
      timer: "",
      restTimer: "",
      currentIndex: 0,
      sessionAmount: "",
      audioStart: new Audio(
        "http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3"
      ),
      audioRest: new Audio(
        "http://soundbible.com/mp3/Air%20Plane%20Ding-SoundBible.com-496729130.mp3"
      ),
      audioEnd: new Audio(
        "http://soundbible.com/mp3/party_horn-Mike_Koenig-76599891.mp3"
      ),
      waiting: false,
      num: 5
    };
  },
  components: {
    "app-circle": Circle,
    "app-rest": Rest
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/Icons/" + pic);
    },
    startTimer() {
      if (!this.timerStarted) {
        this.audioStart.play();
        this.timer = setInterval(() => {
          this.bestTime = this.bestTime - 1;
          this.convertTime();
        }, 1000);
        this.timerStarted = true;
      }
    },
    convertTime() {
      let minutes = Math.floor(this.bestTime / 60);
      let minutesInSeconds = minutes * 60;
      let seconds = this.bestTime - minutesInSeconds;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.clock = minutes + ":" + seconds;
    },
    setTimer() {
      if (this.session[this.currentIndex]) {
        let minute = parseInt(this.session[this.currentIndex].minutes);
        let seconds = parseInt(this.session[this.currentIndex].seconds);
        this.bestTime = minute * 60 + seconds;
        this.convertTime();
      } else {
        this.clock = "0:00";
      }
    },
    pauseTimer() {
      clearInterval(this.restTimer);
      if (this.timerStarted) {
        (this.timerStarted = false), clearInterval(this.timer);
      } else {
        this.startTimer();
      }
    },
    determineIcon() {
      if (this.timerStarted) {
        return "pause";
      } else {
        return "play";
      }
    },
    playRestNoise() {
      this.audioRest.play();
    },
    setupWaitingTimer() {
      if (this.currentIndex < this.sessionAmount) {
        this.waiting = true;
        setTimeout(() => {
          // this.waiting = false;
          this.startTimer();
        }, 5000);
      }
    },
    spacePause(event) {
      event.preventDefault();
      if (!this.restTimerStarted) {
        if (event.code === "Space") {
          this.pauseTimer();
        }
      }
    },
    nextStretch() {
      clearInterval(this.timer);
      this.timerStarted = false;
      this.currentIndex = this.currentIndex + 1;
      this.setTimer();
      if (this.setWaitingTimer) {
        this.playRestNoise();
        this.setupWaitingTimer();
      } else {
        this.startTimer();
      }
    }
  },
  watch: {
    bestTime: function (value) {
      if (value === 0) {
        this.nextStretch();
      }
    },
    currentIndex: function (value) {
      if (value >= this.sessionAmount) {
        this.currentIndex = 0;
        this.clock = "0:00";
        this.timerStarted = false;
        this.audioEnd.play();
        clearInterval(this.timer);
        this.setTimer();
      }
    },
    waiting: function (value) {
      if (!this.restTimerStarted) {
        this.num = 5;
        this.restTimerStarted = true;
        if (value) {
          this.restTimer = setInterval(() => {
            if (this.num > 0) {
              this.num--;
            } else {
              this.num = 5;
              this.restTimerStarted = false;
              clearInterval(this.restTimer);
            }
          }, 1000);
        }
      }
    }
  },
  created() {
    window.addEventListener("keyup", this.spacePause);
    this.sessionAmount = this.session.length;
    this.setTimer();
  },
  destroyed() {
    window.removeEventListener("keyup", this.spacePause);
    clearInterval(this.timer);
    clearInterval(this.restTimer);
    this.timerStarted = true;
  }
};
</script>

<style>
.arrow-red {
  background: url("../assets/red-arrow.svg") no-repeat top left;
  height: 50px;
  width: 50px;
}

.arrow-red:hover {
  background: url("../assets/red-arrow-hover.svg") no-repeat top left;
  cursor: pointer;
}

.top-bar {
  margin: 20px 20px 0 20px;
}

.move-it {
  position: fixed;
  transform: rotate(-226.29deg);
  z-index: -1;
  left: 345px;
  bottom: -800px;
}

.pause {
  background: url("../assets/pause.svg") no-repeat top left;
  height: 50px;
  width: 50px;
  margin-left: 30px;
}

.pause:hover {
  background: url("../assets/pause-hover.svg") no-repeat top left;
  cursor: pointer;
}

.play {
  background: url("../assets/play.svg") no-repeat top left;
  height: 50px;
  width: 50px;
  margin-left: 30px;
}

.play:hover {
  background: url("../assets/play-hover.svg") no-repeat top left;
  cursor: pointer;
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

.checkbox-label {
  margin-left: 10px;
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

.timer-container {
  display: flex;
  justify-content: center;
}

.timer {
  font-size: 143px;
  margin: 0;
}

@media screen and (min-width: 850px) {
  .timer {
    font-size: 230px;
  }
}
@media screen and (max-width: 450px) {
  .timer {
    font-size: 100px;
  }
}
</style>
