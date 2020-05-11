<template>
  <div id="app">
    <div class="push-right landingpage-container">
      <div>
        <h2 class="big-text blue-text">Stretch</h2>
        <transition v-if="second" appear name="fade">
          <div class="push-right">
            <router-link :to="{ path: '/login' }">
              <h4 class="small-text red-text hover-red">Login</h4>
            </router-link>
          </div>
        </transition>
        <transition v-if="second" appear name="fade">
          <div class="push-right">
            <h4 class="small-text red-text hover-red" @click="logChoices">
              Enter as Guest
            </h4>
          </div>
        </transition>
      </div>
    </div>
    <app-circle></app-circle>
  </div>
</template>

<script>
import Circle from "./Circle.vue";
export default {
  name: "app",
  data() {
    return {
      second: false
    };
  },
  components: {
    "app-circle": Circle
  },
  created() {
    setTimeout(() => {
      this.second = true;
    }, 1000);
  },
  methods: {
    logChoices() {
      console.log("guest");
    }
  }
};
</script>

<style scoped>
.landingpage-container {
  margin-top: 80px;
  margin-right: 120px;
  display: flex;
  justify-content: flex-end;
}

.big-text {
  font-size: 96px;
}

.small-text {
  font-size: 36px;
}

@media screen and (max-width: 650px) {
  .landingpage-container {
    margin-right: 0;
    justify-content: center;
    min-width: 450px;
  }
}
</style>
