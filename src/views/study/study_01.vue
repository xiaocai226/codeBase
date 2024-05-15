<template>
	<!-- 数据处理 -->
	<el-card>
		<h2 style="margin-bottom: 20px;">数据扁平化</h2>
		<div>原数组：{{oldArr}}</div>
		<div>新数组：{{newArr}}</div>
		<el-divider></el-divider>

		<h2 style="margin-bottom: 20px;">数组去重</h2>
		<div>未去重：{{repeatArr}}</div>
		<div>已去重：{{newRepeat}}</div>
		<el-divider></el-divider>

		<h2 style="margin-bottom: 20px;">转伪数组为真数组</h2>
		<div>伪数组({{jiaArr}})</div>
		<div>真数组{{realArr}}</div>
	</el-card>
</template>

<script>
 export default {
    data () {
		return {
			// 数据扁平化
			oldArr: [1, [2, [3, 4, 5]],[6,[2, [3, 4, 5]],[8,9,10]]],// 旧数据
			newArr: [],// 扁平化处理之后的数据

			// 数组去重
			repeatArr: [1,1,4,2,4,1,6,3,3,2,1,1,1],// 重复数组
			newRepeat: [],

			// 转伪数组为真数组
			realArr: [],
			jiaArr: '2,3',
		};
    },
    methods: {
		// 数据扁平化
		// Array.prototype.flat是ES6新增的一个数组方法，
		// 它的作用就是用来数组扁平化，并且根据传入的参数来决定展开的层级，是数组扁平化的终极解决方案。
		flatten(arr) {
			// 参数Infinity表示完全展开，使用起来非常方便、快捷
			this.newArr = arr.flat(Infinity);
		},

		// 数组去重
		// downRepeat(arr) {
		// 	this.newRepeat = [];
		// 	arr.forEach(item => {
		// 		if (this.newRepeat.indexOf(item) < 0) {
		// 			this.newRepeat.push(item);
		// 		}
		// 	})
		// }
		downRepeat(arr) {
			let set = new Set(arr);
   			//因为set结构并不是数组，所以需要转为数组
   			// set = [...set];
			this.newRepeat = [...set];
		},

		// 转伪数组为真数组
		arrToreal() {
			this.realArr = Array.from(this.jiaArr)
			// arguments.__proto__ = Array.prototype;
			// this.realArr = arguments;
			// // arguments.push(10)
			// console.log('arguments',arguments)
		},
    },
	created() {
		// 数据扁平化
		this.flatten(this.oldArr);

		// 数组去重
		this.downRepeat(this.repeatArr);

		// 转伪数组为真数组
		this.arrToreal()
	},
}
</script> 
