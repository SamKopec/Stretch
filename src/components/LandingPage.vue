<template>
  <div id="app">
    <div class="push-right title-container">
      <div>
        <h2 class="big-text blue-text">Stretch</h2>
        <div class="push-right">  
          <h4><router-link class="small-text red-text" to="/dashboard">Begin</router-link></h4>
        </div>
      </div>
    </div>
  <app-circle></app-circle>
  </div>
</template>

<script>
  import Circle from './Circle.vue'
  export default {
    name: 'app',
    data () {
      return {
      }
    }, 
    components: {
      'app-circle': Circle
    }
  }
</script>

<style>

.title-container {
  margin-top: 80px;
  margin-right: 120px;
}

</style>
