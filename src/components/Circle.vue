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
  data() {
    return {};
  },
};
</script>

<style scoped>
.yellow-circle {
  position: fixed;
  background-color: #fed766;
  z-index: -1;
  border-radius: 100%;
  right: -300px;
  /*top: -357px;*/
  top: -840px;
}

.circle-1 {
  /*width: 1000px;
  height: 1000px;*/
  width: 1575px;
  height: 1575px;
}

.circle-2 {
  /*  width: 1030px;
  height: 1030px;
  opacity: 65%;*/
  width: 1600px;
  height: 1600px;
  opacity: 65%;
}

.circle-3 {
  /*  width: 1080px;
  height: 1080px;
  opacity: 50%;*/
  width: 1645px;
  height: 1645px;
  opacity: 50%;
}

.circle-4 {
  width: 1718px;
  height: 1718px;
  opacity: 10%;
}

.circle-5 {
  width: 1827px;
  height: 1827px;
  opacity: 5%;
}
</style>
