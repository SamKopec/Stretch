<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
body {
  background-color: #e6e6ea;
  font-family: "IBM Plex Mono", monospace;
}

h2,
h4 {
  margin: 0;
  font-weight: normal;
}

a {
  text-decoration: none;
}

p {
  margin: 0;
}

input,
label,
select,
button,
textarea {
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  background: none;
  line-height: 1;

  /* Browsers have different default form fonts */
  font-size: 13px;
  font-family: "IBM Plex Mono", monospace;
}

input:focus {
  outline: 0;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #2ab7ca;
  opacity: 0.4; /* Firefox */
  /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #2ab7ca;
  opacity: 0.4;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #2ab7ca;
  opacity: 0.4;
}

.big-text {
  font-size: 96px;
}

.biggish-text {
  font-size: 72px;
}

.medium-text {
  font-size: 48px;
}

.small-text {
  font-size: 36px;
}

.tiny-text {
  font-size: 20px;
}

.blue-text {
  color: #2ab7ca;
}

.red-text {
  color: #fe4a49;
}

.push-right {
  display: flex;
  justify-content: flex-end;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hover-red:hover {
  cursor: pointer;
  color: #d03d3c;
}

.hover-blue:hover {
  cursor: pointer;
  color: rgb(31, 137, 151);
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  transition: opacity 0s;
  opacity: 0;
}

.fade-toast-enter {
  opacity: 0;
}

.fade-toast-enter-active {
  transition: opacity 0.5s;
}

.fade-toast-leave {
  opacity: 1;
}

.fade-toast-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>
