<template>
<!-- 指定数据到坐标轴的映射 -->
    <el-card>
        <!-- Vue中ref属性绑定的name最好不要有特殊符号！！！ -->
		<!-- 2、准备容器 -->
        <div id='moreEcharts'></div>
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
            var mychart = this.$echarts.init(document.getElementById("moreEcharts"));
            // 4、准备配置项
            let option = {
				legend: {
					show:true,
        			data:['111','222']
				},
				tooltip: {},
				grid: [
					{ right: '57%', bottom: '10%' },
					{ left: '57%', bottom: '10%' }
				],
				xAxis: [
					{
						type: 'category',
						gridIndex: 0,
						data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
					},
					{
						type: 'category',
						gridIndex: 1,
						data: ['Sun1', 'Mon1', 'Tue1', 'Wed1', 'Thu1', 'Fri1', 'Sat1']
					},
				],
				yAxis: [
					{ type: 'value', gridIndex: 0, name: '单位' },
					{ type: 'value', gridIndex: 1, name: '单位1' },
				],
				series: [
					{
						type: 'line',
						symbolSize: 2.5,
						xAxisIndex: 0,
						yAxisIndex: 0,
						name: '111',
						data: [1220, 1832, 1491, 2354, 2960, 3730, 8310]
					},
					{
						type: 'line',
						symbolSize: 2.5,
						xAxisIndex: 0,
						yAxisIndex: 0,
						name: '222',
						data: [2220, 1832, 1941, 2534, 2960, 3370, 3110]
					},
					{
						type: 'line',
						symbolSize: 2.5,
						xAxisIndex: 1,
						yAxisIndex: 1,
						name: '111',
						data: [2240, 1821, 1917, 2334, 23290, 330, 3610],
					},
					{
						type: 'line',
						symbolSize: 2.5,
						xAxisIndex: 1,
						yAxisIndex: 1,
						name: '222',
						data: [220, 182, 191, 234, 290, 330, 310],
					},
				]
            };
            // 5、将配置项设置给echarts实例对象
            mychart.clear()//之前先清空内容
            mychart.setOption(option);
            // 7、折线图自适应 resize
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
            this.drawChart("moreEcharts");
        })
    },
}
</script>

<style lang="scss" scoped>
// 占父元素的全部 父元素要设置宽高
#moreEcharts{
    height:500px;
    width:100%;
}
</style>