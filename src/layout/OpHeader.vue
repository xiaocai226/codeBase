<template>
  <div class="CommonHeader">
    <div class="header_font">
      <i class="el-icon-sunny"></i>
        嘿嘿 你好
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data() {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<style scoped lang='scss'>
.CommonHeader {
  height: 100%;
  background-color: #23292E;
  // 垂直居中
  display: flex;
  align-items: center;
  // justify-content: space-between;
}
.header_font {
  font-weight: 700;
  font-size: 24px;
  color: #dcbae5;
  margin-left: 20px;
}
</style>
