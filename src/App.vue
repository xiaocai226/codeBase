<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
/* 项目公共样式 */
body,div,p,span,table,tr,th,td,tbody,thead,tfoot,img,
h1,h2,h3,h4,h5,h6,ul,li,dl,dt,a,input,button,textarea,select{
	margin: 0;
	padding: 0;
}
html,body,#app {
  height: 100%;
  font-size: 14px;
}
</style>
