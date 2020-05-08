<template>
  <div class="login-container">
    <div class="form-container">
      <div class="login-label">
        <h3 class="red-text small-text">User Login</h3>
      </div>
      <div>
        <h3 class="blue-text tiny-text">Email</h3>
        <input class="login-input full-input blue-text tiny-text" type="text" />
      </div>
      <div>
        <h3 class="blue-text tiny-text">Password</h3>
        <input class="login-input full-input blue-text tiny-text" type="text" />
      </div>
      <div class="login-label red-text hover-red small-text">Login</div>
      <div class="login-label blue-text tiny-text">
        New to Stretch?
        <router-link :to="{ path: '/new-user' }">
          <span class="red-text hover-red sign-up-margin">Sign Up</span>
        </router-link>
      </div>
    </div>
    <app-circle></app-circle>
  </div>
</template>

<script>
import Circle from "./Circle.vue";
export default {
  data() {
    return {};
  },
  components: {
    "app-circle": Circle
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.form-container {
  /*background-color: turquoise;*/
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
