<template>
<!-- 表格组件 -->
  <!-- tableData：数据 -->
  <!-- v-loading="loading" -->
  <el-table :data="tableData" style="width: 100%" @selection-change="SelectionChange" :header-cell-style='getHeaderClass' v-loading="loading">
    <!-- checkBox -->
    <el-table-column type="selection" v-if="checkBox"></el-table-column>
    <!-- tableHeadData：表头  align='center'居中 -->
    <el-table-column  v-for="item in tableHeadData" :key="item.prop" :label="item.label">
      <template  slot-scope="scope">
        <span> {{ scope.row[item.prop]}} </span>
      </template>
    </el-table-column>
    <!-- 插入列 -->
    <el-table-column :label="labelName" v-if="labelName">
      <template slot-scope="scope">
        <slot name="labelName" :scope="scope.row" :index='scope.$index'></slot>
      </template>
     </el-table-column>
     <!-- 操作栏btnNum:宽度 -->
    <el-table-column label="操作" :width="btnNum" v-if="btnNum" align='center'>
      <template slot-scope="scope" >
        <slot :row='scope.row' :index='scope.$index'></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  props: {
    tableHeadData: Array, //表头
    tableData: Array, //表格
    btnNum: Number, //操作栏长度
    checkBox: Number, //多选
    labelName: String, //特殊处理某一列
    loading: Boolean, //加载
  },
  methods: {
    SelectionChange(val) {
      this.$emit("selectData",val);
      // console.log(val)
    },
    // 表格
    getHeaderClass({rowIndex}) {// 设置表格表头
        if(rowIndex == 0) {
            return "border-top: 1px solid rgb(211, 205, 205);; border-color:rgb(211, 205, 205);background-color:#F4F4F5;" ;
        }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
