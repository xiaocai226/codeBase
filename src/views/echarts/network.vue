<template>
  <el-card>
    <!-- 加一个下拉框 -->
    <el-select v-model="select" multiple clearable placeholder="请选择" @change="Change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

    <div class="network-topology-chart" ref="chartContainer"></div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      select: [],
      // 默认第一个选中'5'
      options: [// 选项
        {
          value: 5,
          label: '正大集团1',
          node: {
            id: 5,
            name: 'CPE:d9-r5-h5-g3\n客户:正大集团1\nIP:192.168.10.1',// \n换行
            symbol: 'image://'+ require('@/img/cpe.png'), // 节点的图形
            symbolSize: [50, 30], // 节点的大小，宽度为50，高度为30
            select: '正大集团1',
            x: 100*1000,
            y: -100*1000,
          }
        },
        {
          value: 6,
          label: '正大集团2',
          node: {
            id: 6,
            name: 'CPE:d9-r5-h5-g3\n客户:正大集团2\nIP:192.168.20.1',// \n换行
            symbol: 'image://'+ require('@/img/cpe.png'), // 节点的图形
            symbolSize: [50, 30], // 节点的大小，宽度为50，高度为30
            select: '正大集团2',
            x: 200*1000,
            y: -100*1000,
          }
        },
        {
          value: 7,
          label: '正大集团3',
          node: {
            id: 7,
            name: 'CPE:d9-r5-h5-g3\n客户:正大集团3\nIP:192.168.30.1',// \n换行
            symbol: 'image://'+ require('@/img/cpe.png'), // 节点的图形
            symbolSize: [50, 30], // 节点的大小，宽度为50，高度为30
            select: '正大集团3',
            x: 300*1000,
            y: -100*1000,
          }
        },
        {
          value: 8,
          label: '正大集团4',
          node: {
            id: 8,
            name: 'CPE:d9-r5-h5-g3\n客户:正大集团4\nIP:192.168.40.1',// \n换行
            symbol: 'image://'+ require('@/img/cpe.png'), // 节点的图形
            symbolSize: [50, 30], // 节点的大小，宽度为50，高度为30
            select: '正大集团4',
            x: 400*1000,
            y: -100*1000,
          }
        },
      ],

      // 最初的节点数据
      // 设置节点数据 x， y 作为节点的位置
      nodesInit: [
        {
          id: 0,// 用于连线的代号
          name: 'POP-美国V1',// 设备名称
          // 要加'image://'才可以显示图片
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 400*1000,// 位置信息
          y: -400*1000,
        },
        {
          id: 1,
          name: 'POP-香港V1',
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 300*1000,
          y: -400*1000,
        },
        {
          id: 2,
          name: 'POP-广东东莞V1',
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 300*1000,
          y: -300*1000,
        },
        {
          id: 3,
          name: 'POP-厦门电信V1',
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 200*1000,
          y: -200*1000,
        },
        {
          id: 4,
          name: 'POP-江苏宿迁V1',
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 400*1000,
          y: -200*1000,
        },
        {
          id: 5,
          name: 'CPE:d9-r5-h5-g3\n客户:正大集团1\nIP:192.168.10.1',// \n换行
          symbol: 'image://'+ require('@/img/cpe.png'), // 节点的图形
          symbolSize: [50, 30], // 节点的大小，宽度为50，高度为30
          select: '正大集团1',
          x: 100*1000,
          y: -100*1000,
        },
        {
          id: 6,
          name: 'CPE:d9-r5-h5-g3\n客户:正大集团2\nIP:192.168.20.1',// \n换行
          symbol: 'image://'+ require('@/img/cpe.png'), // 节点的图形
          symbolSize: [50, 30], // 节点的大小，宽度为50，高度为30
          select: '正大集团2',
          x: 200*1000,
          y: -100*1000,
        },
        {
          id: 7,
          name: 'CPE:d9-r5-h5-g3\n客户:正大集团3\nIP:192.168.30.1',// \n换行
          symbol: 'image://'+ require('@/img/cpe.png'), // 节点的图形
          symbolSize: [50, 30], // 节点的大小，宽度为50，高度为30
          select: '正大集团3',
          x: 300*1000,
          y: -100*1000,
        },
        {
          id: 8,
          name: 'CPE:d9-r5-h5-g3\n客户:正大集团4\nIP:192.168.40.1',// \n换行
          symbol: 'image://'+ require('@/img/cpe.png'), // 节点的图形
          symbolSize: [50, 30], // 节点的大小，宽度为50，高度为30
          select: '正大集团4',
          x: 400*1000,
          y: -100*1000,
        }
      ],
      // 没有CPE的数组
      nodesInitNO: [
        {
          id: 0,// 用于连线的代号
          name: 'POP-美国V1',// 设备名称
          // 要加'image://'才可以显示图片
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 400*1000,
          y: -400*1000,
        },
        {
          id: 1,
          name: 'POP-香港V1',
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 300*1000,
          y: -400*1000,
        },
        {
          id: 2,
          name: 'POP-广东东莞V1',
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 300*1000,
          y: -300*1000,
        },
        {
          id: 3,
          name: 'POP-厦门电信V1',
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 200*1000,
          y: -200*1000,
        },
        {
          id: 4,
          name: 'POP-江苏宿迁V1',
          symbol: 'image://'+ require('@/img/pop.png'), // 节点的图形
          symbolSize: 50, // 节点的大小
          x: 400*1000,
          y: -200*1000,
        },
      ],
      nodes: [],

      // 设置连接数据
      links: [
        {source: 0, target: 1},
        {source: 1, target: 2},
        {source: 2, target: 3},
        {source: 2, target: 4},
        {source: 3, target: 4},
        {source: 3, target: 5},
        {source: 3, target: 6},
        {source: 3, target: 7},
        {source: 4, target: 8},
      ],
      nodesIndexMap: {},// 用于保存节点id和索引之间的映射关系
    };
  },
  mounted() {
    this.drawNetworkTopology();
  },
  methods: {
    Change(e) {
      if(e.length == 0){
        this.nodes = this.nodesInit;
      }else{
        let arr = e;
        // 根据arr数组中的每一个值去匹配获取options中对应node对象
        let resultNodes = this.options.filter(option => arr.includes(option.value)).map(option => option.node);
        this.nodes = this.nodesInitNO.concat(resultNodes);
      }

      this.drawNetworkTopology();
    },
    drawNetworkTopology() {
      // 初始化 ECharts 实例
      const chart = this.$echarts.init(this.$refs.chartContainer);

      // 更新节点id和索引之间的映射关系
      this.nodesIndexMap = {};
      this.nodes.forEach((node, index) => {
        this.nodesIndexMap[node.id] = index;
      });

      // 更新连接关系的索引
      const updatedLinks = this.links.map(link => ({
        source: this.nodesIndexMap[link.source],
        target: this.nodesIndexMap[link.target]
      }));

      // 绘制拓扑图
      const option = {
        // tooltip: {},
        series: [
          {
            type: 'graph',// 关系图
            layout: 'none', // 图的布局，none不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
            data: this.nodes.length != 0 ? this.nodes : this.nodesInit,
            links: Object.keys(this.nodesIndexMap).length === 0 ? this.links : updatedLinks,
            label: {
              show: true,
              position: 'bottom',
            },
          },
        ],
      };
      chart.clear()//之前先清空内容
      chart.setOption(option);
      // 7、折线图自适应 resize
      window.addEventListener("resize", () => {
          // chart.resize();
          setTimeout(() => {
            chart.resize();
          }, 100);
      });
    },
  },
};
</script>

<style>
.network-topology-chart {
  width: 100%;
  height: 600px;
}
</style>