<template>
    <div>
        <!-- Vue中ref属性绑定的name最好不要有特殊符号！！！ -->
        <div class='echarts' ref="echart"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    // watch:{
    //     chartData:{//一旦图标的数据发生变化，重新渲染图表
    //         deep:true,// 深度监听(当需要监听一个对象的改变时)
    //         handler : function(){
    //             this.initChart();// 变化就运行
    //         }
    //     }
    // },
    props:{//接收参数
        //  标题
        title:{
            type:String,
            default:"Echarts图",
        },
        // 判断是柱状图/折线图,还是饼图
        isAxisChart:{
            type:Boolean,
            default:true,// 默认为柱状图/折线图
        },
        // 图表的数据
        chartData:{
            type:Object,
            default(){
                return{// 默认为柱状图/折线图
                    xData:[],
                    series:[],
                    // legend:[],
                }
            }
        },
    },
    data() {
        return {
            // 折线图与柱状图的配置
            axisOptions:{
                // 主调色
                color:['#59B399','#6092C0','#D36086','#9170B8','#CA8EAE','#D6BF57','#B9A888','#DA8B45','#AA6556','#E7664C'],// 颜色
                title: {// 标题
                    text: '',// 传值
                },
                xAxis: {// X轴
                    type: "category", // 类目轴
                    data: [],// 传值
                    axisLabel: {// 坐标轴刻度标签
                        interval: 0,// 强制显示所有
                        color: "#333",
                        // inside:true,// 刻度标签是否朝内，默认朝外
                        // show:false,// 是否显示刻度标签
                        // rotate: 40,// 横坐标旋转
                    },
                    // boundaryGap: true, // 紧埃边缘
                    // axisTick:{ // 隐藏x轴刻度线
                    //     show:false,
                    // },
                    axisLine: {// 坐标轴设置x轴线
                        lineStyle: {
                            // color: "#17b3a3",
                            color: "#333",
                        },
                        // show:false,// 隐藏x轴线
                    },
                    // splitLine:{//显示网格线
                    //   show:true,
                    // },
                },
                // yAxis: [// Y轴 y轴加单位
                //     {
                //         type : 'value',
                //         axisLabel:{formatter:'{value} G'}
                //     }
                // ],
                yAxis: {// Y轴
                    type: "value",
                    axisLine: {// 坐标轴设置
                        lineStyle: {
                            color: "#333",
                        },
                        // show:false,// 隐藏y轴线
                    },
                    // scale: true,//不从0开始
                    // splitLine:{//不显示网格线
                    //     show:false,
                    // },
                    // min: 0, // 指定最小值
                    // max: 2000, // 指定最大值
                    // axisTick:{ // 隐藏y轴刻度线
                    //   show:false,
                    // },
                },
                tooltip: {// 提示框组件：鼠标划过时显示信息
                    trigger: "axis",// 坐标轴触发
                    // axisPointer:{ //坐标轴指示器，坐标轴触发有效
                    //     type:'cross'//十字交叉坐标轴指示器
                    // }

                    // 自定义 用formatter回调函数显示单项数据内容
                    // formatter: function(params) {
                    //     // var color = params.color;//图例颜色
                    //     var htmlStr = '<div>';
                    //     htmlStr += params.name + '</br>';//x轴的名称
                    //     // 效果
                    //     // htmlStr += '<span style="background-color:'+color+';"></span>'
                    //     // 添加说明内容
                    //     htmlStr += params.seriesName + ':' + params.value + '克(每100克)';
                    //     htmlStr += '</div>'
                    //     return htmlStr;
                    // }
                },
                // 如果要传值的话 可以这样写
                // legend: {// 折线提示
                //     data: [],
                // },
                legend: {// 折线提示
                    textStyle: {// 图例文字颜色
                        color: "#333",
                    },
                    // data: ['流量值'],//要和下面的series的name对应
                    // bottom : 1,//提示线放在下面
                    // itemWidth : 50,//图例标记的宽度及高度
                    // itemHeight : 10
                },
                grid: {// 图表居中（让图表占满容器）
                    right:'5%',//左右距离
                    left:'5%',
                    bottom:'15%',
                    top:'15%'
                },
                series: [],// 传值
            },
            // 饼图的配置信息
            normalOptions:{    
                color:['#59B399','#6092C0','#D36086','#9170B8','#CA8EAE','#D6BF57','#B9A888','#DA8B45','#AA6556','#E7664C'],// 颜色
                title: {// 标题
                    text: '',// 传值
                    left: 'center',//标题居中
                    textStyle:{//标题样式
                        color: '#5A5A59',
                        fontWeight: 500,
                        fontSize: 20
                    },
                    // top: 15
                },
                legend: {// 折线提示
                    textStyle: {// 图例文字颜色
                        color: "#333",
                    },
                    bottom : 1,//提示线放在下面
                },
                tooltip: {// 提示框组件：鼠标划过时显示信息
                    trigger: "item",
                },
                toolbox: {// 工具栏
                    right:"5%",  
                    show: true,//显示
                    feature: {//各工具配置项
                        // mark: { show: true },//'辅助线开关'
                        saveAsImage: { 
                            show: true,//显示
                        }
                    }
                },
                series: [],// 传值
            },
            // 判断当前页面中是否有echart图表
            echart:null,
        }
    },
    // 计算属性 判断用哪个options
    computed:{
        options(){
            // 判断是折线图/柱状图，还是饼图
            return this.isAxisChart ? this.axisOptions : this.normalOptions;
        }
    },
    methods: {
        // 生成图表
        initChart(){
            this.initChartData();// 初始化图表数据
            if(this.echart){// 如果图表已经存在，只需要更新配置信息
                this.echart.setOption(this.options);
            }else{// 如果不存在，则生成图表并配置信息
                this.echart = this.$echarts.init(this.$refs.echart);
                this.echart.setOption(this.options);
            }
            // 折线图自适应 resize 箭头函数不报错！
            // window.addEventListener("resize", function () {
            window.addEventListener("resize", () => {
                this.echart.resize();
            });
        },
        // 图表数据
        initChartData(){
            if(this.isAxisChart){// 如果是柱状图/折线图
                this.axisOptions.title.text = this.title;// 标题
                // this.axisOptions.legend.data = this.chartData.legend;// legend
                this.axisOptions.xAxis.data = this.chartData.xData;// x轴数据
                this.axisOptions.series = this.chartData.series;// y轴
            }else{// 如果是饼图
                // 饼图只用配置series(data[{name:'',value:''},{name:'',value:''}])
                this.normalOptions.title.text = this.title;// 标题
                this.normalOptions.series = this.chartData.series;
            }
        },
    },
    // created渲染之前，准备要渲染
    created() {
        // $nextTick强制性渲染完成
        this.$nextTick(function(){
            // 显示echarts图
            this.initChart();
        })
    },
    // mounted渲染之后，已完成渲染
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
// 占父元素的全部 父元素要设置宽高
.echarts{
    height:100%;
    width:100%;
}
</style>
