<template>
	<!-- 表格组件 -->
	<el-table :data="tableData" style="width: 100%" @selection-change="SelectionChange" :header-cell-style='getHeaderClass' v-loading="loading">
		<!-- 多选 -->
		<el-table-column type="selection" v-if="checkBox"></el-table-column>

		<!-- 常规列 -->
		<el-table-column v-for="item in tableHeadData" :key="item.prop" :label="item.label">
			<template slot-scope="scope">
				<span>{{ scope.row[item.prop] }}</span>
			</template>
		</el-table-column>

		<!-- 插入特殊列 单个 -->
		<!-- <el-table-column :label="labelName" v-if="labelName">
			<template slot-scope="scope">
				<slot name="labelName" :scope="scope.row" :index='scope.$index'></slot>
			</template>
		</el-table-column> -->

		<!-- 插入特殊列 多个 -->
		<el-table-column v-for="specialColumn in specialColumns" :key="specialColumn.name" :label="specialColumn.label">
			<template slot-scope="scope">
				<!-- :scope="scope.row" :index='scope.$index'传递给插槽 -->
				<slot :name="specialColumn.name" :scope="scope.row" :index="scope.$index"></slot>
			</template>
		</el-table-column>

		<!-- 操作栏 -->
		<el-table-column label="操作" :width="btnNum" v-if="btnNum" align='center'>
			<template slot-scope="scope">
				<slot :row='scope.row' :index='scope.$index'></slot>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>

export default {
	props: {
		checkBox: Boolean, //多选
		tableHeadData: Array, //表头
		tableData: Array, //表格
		btnNum: Number, //操作栏长度
		// labelName: String, //特殊处理某一列 单个
		specialColumns: Array,// 特殊列 多个
		loading: Boolean, //加载
	},
	methods: {
		// 表格
		getHeaderClass({rowIndex}) {// 设置表格表头
			if(rowIndex == 0) {
				return "border-top: 1px solid rgb(211, 205, 205); border-color:rgb(211, 205, 205);background-color:#F4F4F5;" ;
			}
		},
		// 传给父组件
		SelectionChange(val) {
			// console.log(val,'多选')
			this.$emit("selectData",val);
		},
	},
}
</script>

<style lang="scss" scoped>

</style>
