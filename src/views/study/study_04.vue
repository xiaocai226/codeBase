<template>
	<!-- 
		圣杯布局：
			特点：中间栏自适应宽度，左右栏固定宽度。
			实现：通过负边距和相对定位来调整左右栏的位置，使中间栏自适应。
		双飞翼布局：
			特点：中间栏固定宽度，左右栏自适应宽度。
			实现：通过内部容器和负边距实现左右栏自适应。 
	-->
	<!-- 双飞翼布局 -->
  	<el-card>
		<div class="header">header</div>
		<div class="container">
			<div class="left" >left</div>
			<div class="center">center</div>
			<div class="right" >right</div>
		</div>
  	</el-card>
</template>

<script>
export default {
  	data() {
		return {

		}
  	},
   	methods: {

  	},
   	created() {

  	},
}
</script>

<style>
.header{
	width: 100%;
	height: 100px;
	background-color: bisque;
}
.container{
	display: flex;
	flex-direction: row;
	flex: 1;
}
.center{
	flex: 0 0 1200px;
	height: 500px;
	background-color: skyblue;
}
.left{
	flex: 1;
	height: 500px;
	background-color: pink;
}
.right{
	flex: 1;
	height: 500px;
	background-color: greenyellow;
}
</style>