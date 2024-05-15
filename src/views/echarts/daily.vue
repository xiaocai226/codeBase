<template>
  <el-card>
    <div id="echarts" style="margin-bottom: 100px"></div>
    <!-- 准备一个容器用来装折线图-->
    <div id="text1-echarts"></div>
  </el-card>
</template>

<script>
export default {
  name: 'home',
  // 引入组件
  components: {
  },
  data() {
    return {
      
    }
  },
  methods: {
    // 扇形图
    drawEcharts(){
      // 1、由于引入时更改了原型链，因此可以通过this.$echarts来全局使用
      // 3、基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("echarts"))
      // 4、准备配置项(只有这一个会不同，其他的步骤一模一样)
      let option = {
        // #EE9B18 橙色 #9BB855 绿色 #E98F6F 红色 #61A0A8 蓝色
        color:['#EE9B18','#9BB855','#61A0A8','#E98F6F'],
        // 标题
        title: {
          text: '测试1',
          left: 'center',//标题居中
          subtext:'人体重要所需',
          textStyle:{//标题样式
              color: 'black',
              fontWeight: 600,
              fontSize: 20
          },
          top: 8
        },
        // 标识框
        legend: {
          top: 'bottom'
        },
        // 工具栏
        toolbox: {
          right:"5%",  
          show: true,//显示
          feature: {//各工具配置项
            // mark: { show: true },//'辅助线开关'
            saveAsImage: { 
              show: true,//显示
            }
          }
        },
        tooltip:{//提示框
          // trigger: 'item',//显示当前单个数据项的提示框
          // 自定义 用formatter回调函数显示单项数据内容
          formatter: function(params) {
            // var color = params.color;//图例颜色
            var htmlStr = '<div>';
            htmlStr += params.name + '</br>';//x轴的名称
            // 效果
            // htmlStr += '<span style="background-color:'+color+';"></span>'
            // 添加说明内容
            htmlStr += params.seriesName + ':' + params.value + '克';
            htmlStr += '</div>'
            return htmlStr;
          }
        },
        series: [
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
      // 5、将配置项设置给echarts实例对象
      myChart.clear()//之前先清空内容
      myChart.setOption(option);
      // 7、折线图自适应 resize
      window.addEventListener("resize", function () {
          myChart.resize();
      });
    },
    // 折线图/柱状图
    drawChart() {//传横纵坐标及标题值
      // 1、由于引入时更改了原型链，因此可以通过this.$echarts来全局使用
      // 3、基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("text1-echarts"))
      // 4、准备配置项
      let option = {
          title: {
              text:'测试2',
              left: 'center',//标题居中
              // textStyle:{//标题样式
              //     color: '#5A5A59',
              //     fontWeight: 500,
              //     fontSize: 20
              // },
              top: 8
          },
          animation: false,//是否开启动画
          tooltip: {//提示框组件：鼠标划过时显示信息
              trigger: 'axis',// 坐标轴触发
              // axisPointer:{ //坐标轴指示器，坐标轴触发有效
              //     type:'cross'//十字交叉坐标轴指示器
              // }
          },
          legend:{//折线提示
              data: ['流量值'],//要和下面的series的name对应
              bottom : 10,//提示线放在下面
              itemWidth : 50,//图例标记的宽度及高度
              itemHeight : 10
          },
          xAxis: {
              type: 'category',//类目轴
              data: ['苹果','香蕉','橘子','火龙果','水蜜桃'],
              axisLabel:{
                  // inside:true,
                  // show:false,
                  // rotate: 40,//横坐标旋转
                  interval:'0',//强制显示所有
              },
              // boundaryGap: true // 紧埃边缘
          },
          yAxis: {
              type: 'value',
              name:'流量值/G',
              scale: true,//不从0开始
              // splitLine:{//不显示网格线
              //     show:false,
              // },
          },
          series: [
              {
                  name: '流量值',
                  // type: 'bar',// 柱状图
                  type: 'line',// 折线图
                  data: [100,150,200,160,400],
                  color: 'red',//设置折线图颜色
                  symbol:'triangle',//图标设置为三角形
                  symbolSize: 8,//图标大小
              }
          ]
      }
      // 5、将配置项设置给echarts实例对象
      myChart.clear()//之前先清空内容
      myChart.setOption(option);
      // 7、折线图自适应 resize
      window.addEventListener("resize", function () {
          myChart.resize();
      });
    },
  },
  // 渲染完成之前
  created() {

  },
  // 渲染完成之后
  mounted() {
    this.drawEcharts();
    this.drawChart();
    // $nextTick强制性渲染完成
    // this.$nextTick(function(){
    //     // 显示echarts图
    //     this.drawChart("text1-echarts");
    // })
  },
}
</script>

<style lang="scss" scoped>
#echarts,#text1-echarts{
  width: 45%;
  margin: auto;
  height: 300px;
}
</style>
