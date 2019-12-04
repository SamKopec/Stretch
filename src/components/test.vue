<template>
  <div>
    <div class="yellow-circle circle-1"></div>
    <div class="yellow-circle circle-2"></div>
    <div class="yellow-circle circle-3"></div>
    <div class="yellow-circle circle-4"></div>
    <div class="yellow-circle circle-5"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      screenWidth:  '', 
      circle1Width: '',
      circle2Width: '',
      circle3Width: '',
      circle4Width: '',
      circle5Width: '',
    }
  },
  created(){
    this.screenWidth = window.innerWidth
    this.circle1Width = this.screenWidth / 1.182
    window.addEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler(){
      this.screenWidth = window.innerWidth
      this.circle1Width = this.screenWidth / 1.182
      console.log(window.innerWidth)
    }
  }
  //1920(width)/1.182 => size of circle
  //1080 / 7.2 = 150px

}
</script>

<style scoped>

.yellow-circle {
  position: fixed;
  background-color: #FED766;
  z-index: -1;
  border-radius: 100%;
 /* left: 20%;
  bottom: 20%;*/
  left: 498px;
  bottom: 257px;
}





.circle-1 {
  width: 1000px;
  height: 1000px;
}
/*
.circle-1 {
  width: 1624px;
  height: 1624px;
}*/

.circle-2 {
  width: 1030px;
  height: 1030px;
  opacity: 65%;
}

.circle-3 {
  width: 1080px;
  height: 1080px;
  opacity: 50%;
}

.circle-4 {
  width: 1170px;
  height: 1170px;
  opacity: 10%;
}

.circle-5 {
  width: 1300px;
  height: 1300px;
  opacity: 5%;
}

</style>




<template>
  <div id="app">
    <div v-for="(number, index) in numbers" :key="index" @mouseover="makeVisible(index)" @mouseleave="makeInvisible(index)" class="hello">
      <a>Number</a>
      <p v-if="checkVisibility(index)" style="margin: 0; margin-left: 10px"> {{ number }}</p>
    </div>
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
  
export default {
    name: 'app',
    data () {
      return {
        numbers: [1,2,3,4,5,6],
        isVisible: []
      }
    }, 
    components: {
      'app-circle': Circle
    },
    methods: {
      makeVisible(index){
        console.log(this.isVisible)
        this.isVisible[index] = true
      },
      makeInvisible(index){
        console.log("Bye!")
        // this.isVisible[index] = false
      },
      checkVisibility(index){
        return this.isVisible[index]
      }
    },
    created() {
      let amount = this.numbers.length
      while(amount > 0){
        this.isVisible.push(false)
        amount --
      }
    }
  }
</script>


<style>

.hello{
  color: red;
  width: 80px;
  background-color: green;
  display: flex;
  margin-bottom: 10px;
}

</style>
