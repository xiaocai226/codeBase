<template>
<!-- 学习内容：flex布局 -->
    <el-card>
        <!-- <div class="title">order设置排序</div>
        <div class="box">
          <div class="a">1</div>
          <div class="a">2</div>
          <div class="a" style="order: -2;">3</div>
          <div class="a">4</div>
          <div class="a">5</div>
          <div class="a" style="order: -1;">6</div>
          <div class="a">7</div>
        </div> -->

        <!-- <div class="title">覆盖align-items</div>
        <div class="box">
          <div class="a">1</div>
          <div class="a">2</div>
          <div class="a">3</div>
          <div class="a">4</div>
        </div> -->

        <div class="title">grow/shrink</div>
        <!-- <div class="box">
          <div class="a">1</div>
          <div class="a">2</div>
          <div class="a">3</div>
          <div class="a">4</div>
        </div> -->
        <div class="box">
          <div class="a">1</div>
          <div class="a">2</div>
          <div class="a">3</div>
          <div class="a">4</div>
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

<style scoped>
.title{
    font-size: 22px;
    margin: 20px 0;
}
/* 1 */
/* gap设置垂直和水平方向上的间隔为10px */
/* .box{
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
} */


/* 2 */
/* .box{
  width: 500px;
  height: 300px;
  display: flex;
  gap: 10px; 
  align-items: center;
  border: 1px solid black;
} */

/* .a{
  width: 100px;
  height: 100px;
  background-color: aqua;
} */

/* 不设置高度，占满高度 */
/* .a:nth-of-type(2) {
  align-self: stretch;
  height: auto;
} */

/* 3 */
.box{
  width: 500px;
  height: 300px;
  display: flex;
  gap: 10px; 
  align-items: center;
  border: 1px solid black;
}

.a{
  height: 100px;
  width: 125px;
  background-color: aqua;
  flex-shrink: 0;
}

.a:nth-of-type(2) {
  flex-shrink: 2;
}

</style>