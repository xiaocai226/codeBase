<template>
	<!-- 多条折线图X轴不一样且只能有一条x轴 -->
    <el-card>
        <!-- Vue中ref属性绑定的name最好不要有特殊符号！！！ -->
		<!-- 2、准备容器 -->
        <div id='manyEcharts'></div>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
			// chart: null,
		}
    },
    methods: {
        drawChart() {
            // 1、由于引入时更改了原型链，因此可以通过this.$echarts来全局使用
            // 3、基于准备好的dom，初始化echarts实例
            var mychart = this.$echarts.init(document.getElementById("manyEcharts"))
            // 4、准备配置项
            let option = {
				legend: {
					show:true,
        			data:['111','222']
				},
				grid: [
					{ right: '10%',left: '10%', bottom: '57%', },
					{ right: '10%',left: '10%', top: '57%', }
				],
				tooltip: {// 提示框组件：鼠标划过时显示信息
                    trigger: "axis",// 坐标轴触发
                },
				xAxis: [
					{
						// 根据x轴数据决定type类型
        				// type: 'time', 
						type: 'category',
						gridIndex: 0,
						// 注： x轴不指定data,自动会从series取
						// data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
					},
					{
						// 根据x轴数据决定type类型
        				// type: 'time', 
						type: 'category',
						gridIndex: 1,
						// 注： x轴不指定data,自动会从series取
						// data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
					},
				],
				yAxis: [
					{ type: 'value', gridIndex: 0, name: '单位' },
					{ type: 'value', gridIndex: 1, name: '单位' },
				],
				series: [
					{
						type: 'line',
						symbolSize: 2.5,
						xAxisIndex: 0,
						yAxisIndex: 0,
						name: '111',
						data: [
							[
								'2020-11-26 00:00:00',
								"6"
							],
							[
								"2020-11-26 01:00:00",
								"6"
							],
							[
								"2020-11-26 02:00:00",
								"6"
							],
							[
								"2020-11-26 03:00:00",
								"5"
							]
						]
					},
					{
						type: 'line',
						symbolSize: 2.5,
						xAxisIndex: 0,
						yAxisIndex: 0,
						name: '222',
						data: [
							[
								"2020-11-26 00:57:00",
								"17.3"
							],
							[
								"2020-11-26 05:22:22",
								"16.8"
							],
							[
								"2020-11-26 08:32:16",
								"17.3"
							],
							[
								"2020-11-26 08:40:57",
								"17.8"
							],
							[
								"2020-11-26 08:46:54",
								"18.3"
							]
						]
					},
					{
						type: 'line',
						symbolSize: 2.5,
						xAxisIndex: 1,
						yAxisIndex: 1,
						name: '111',
						data: [
							[
								'2020-11-26 00:00:00',
								"6"
							],
							[
								"2020-11-26 01:00:00",
								"6"
							],
							[
								"2020-11-26 02:00:00",
								"6"
							],
							[
								"2020-11-26 03:00:00",
								"5"
							]
						]
					},
					{
						type: 'line',
						symbolSize: 2.5,
						xAxisIndex: 1,
						yAxisIndex: 1,
						name: '222',
						data:  [
							[
								"2020-11-26 00:57:00",
								"17.3"
							],
							[
								"2020-11-26 05:22:22",
								"16.8"
							],
							[
								"2020-11-26 08:32:16",
								"17.3"
							],
							[
								"2020-11-26 08:40:57",
								"17.8"
							],
							[
								"2020-11-26 08:46:54",
								"18.3"
							]
						]
					},
				]
            };
            // 5、将配置项设置给echarts实例对象
            mychart.clear()//之前先清空内容
            mychart.setOption(option);
            // // 7、折线图自适应 resize
            window.addEventListener("resize", () => {
                mychart.resize();
            });
        },
    },
    // created渲染之前，准备要渲染
    created() {

    },
    // mounted渲染之后，已完成渲染
    mounted() {
		// $nextTick强制性渲染完成
        this.$nextTick(function(){
            // 显示echarts图
            this.drawChart("manyEcharts");
        })
    },
}
</script>

<style lang="scss" scoped>
// 占父元素的全部 父元素要设置宽高
#manyEcharts{
    height:500px;
    width:100%;
}
</style>
