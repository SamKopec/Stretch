<template>
  <div>
    <router-view></router-view>
  </div>
</template>


<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>

<style>

  body {
    background-color: #E6E6EA;
    font-family: 'IBM Plex Mono', monospace;
  }

  h2, h4{
    margin: 0;
    font-weight: normal;
  }

  a{
    text-decoration: none;
  }

  p {
    margin: 0;
  }

  input,
  label,
  select,
  button,
  textarea
    {
      margin:0;
      border:0;
      padding:0;
      display:inline-block;
      vertical-align:middle;
      white-space:normal;
      background:none;
      line-height:1;
      
      /* Browsers have different default form fonts */
      font-size:13px;
      font-family: 'IBM Plex Mono', monospace;
    }

  input:focus
    {
      outline:0;
    }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #2AB7CA;
    opacity: 0.4; /* Firefox */
     /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #2AB7CA;
    opacity: 0.4;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: #2AB7CA;
    opacity: 0.4;
  }

  .big-text {
    font-size: 96px;
  }

  .biggish-text {
    font-size:72px;
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
    color: #2AB7CA;
  }

  .red-text {
    color: #FE4A49;
  }

  .push-right {
    display: flex;
    justify-content: flex-end;
  }

  .flex {  
    display: flex;
    justify-content: space-between;
  }

</style>