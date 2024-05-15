<template>
  <el-card>
    <!-- 折线图/条形图 -->
    <Echarts :chartData="echartData.order" :title="title" style="height:280px;width:100%;"></Echarts>
    <el-divider></el-divider>
    <!-- 扇形图 -->
    <!-- echartData：数据 isAxisChart：图类型(折线图/扇形图/条形图) title：标题 -->
    <Echarts :chartData="echartData.fan" :title="title" :isAxisChart='isAxisChart' style="height:280px;width:100%;"></Echarts>
  </el-card>
</template>

<script>
import Echarts from '@/components/Echarts.vue';
export default {
  name: 'home',
  // 引入组件
  components: {
    Echarts,
  },
  data() {
    return {
      title: '组件图',
      isAxisChart: false,// 是否为折线图 否：扇形图
      echartData :{
        // 折线图/条形图
        order: {
          xData:[],
          series:[]
        },
        // 扇形图
        fan: {
          series:[
            {
              name: '含量',
              type: 'pie',// 饼图
              radius: [10, 80],// 控制大小
              center: ['50%', '60%'],// 位置
              // roseType: 'area',// 现状类型
              itemStyle: {
                borderRadius: 8
              },
              // 数据 降序的形式
              data: [
                { value: 30,name: 'A' },
                { value: 23,name: 'B' },
                { value: 10,name: 'C' },
                { value: 39,name: 'D' },
                { value: 88,name: 'F' },
              ]
            }
          ]
        }
      }
    }
  },
  methods: {
    // 组件图
    getdata(){
      let xData = ['hh','zz','xx','qq','oo'];
      let series = [];
      // 多条/单条都可以
      series.push(
        {
          name:'哈哈',
          data:[100,220,300,130,210],
          type:'line'
        },{
          name:'嘿嘿',
          data:[120,20,320,30,250],
          type:'line'
        }
      )
      this.echartData.order.xData = xData;
      this.echartData.order.series = series;
    },
  },
  // 渲染完成之前
  created() {
    this.getdata();
  },
  // 渲染完成之后
  mounted() {

  }
}
</script>

<style scoped>

</style>
