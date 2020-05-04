<template>
  <div id="app">
    <div class="push-right title-container">
      <div>
        <transition appear name="fade">
          <h2 class="big-text blue-text">Stretch</h2>
        </transition>
        <transition v-if="second" appear name="fade">
          <div class="push-right">  
            <h4 class="small-text red-text hover-red" @click="toDash">Begin</h4>
          </div>
        </transition>
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
        second: false
      }
    }, 
    components: {
      'app-circle': Circle
    },
    created(){
      setTimeout(() => {
          this.second = true
          console.log(this.second)
        }, 1000)
    },
    methods: {
      toDash(){
        this.$router.push({name: 'dashboard', params: {update: 'fromLanding'}})
      }
    }
  }
</script>

<style>

  .title-container {
    margin-top: 80px;
    margin-right: 120px;
  }


</style>
