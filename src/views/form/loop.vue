<template>
  	<el-card>
		<div v-if="!isDetail">
			<!-- 搜索 -->
			<el-form :inline="true" v-model="search" @submit.native.prevent>
				<!-- 时间搜索 -->
				<span v-for="(item,index) in timeType" :key="'time' + index">
				<el-form-item :label="item.typeName">
					<el-date-picker 
						v-model="item.time" 
						type="daterange" 
						range-separator="至"
						start-placeholder="开始日期" 
						end-placeholder="结束日期" 
						value-format="yyyy-MM-dd"
						style="width: 240px;" 
						@change="timeBtn($event,index,item.start,item.end)">
					</el-date-picker>
				</el-form-item>
				</span>
				<!-- 下拉框搜索 -->
				<span v-for="(item,index) in selectType" :key='"select" + index'>
					<el-form-item :label="item.typeName">
						<el-select v-model="search[item.typeSign]" filterable clearable>
						<el-option 
							v-for="item in item.typeList" 
							:key="item.value" 
							:label="item.label" 
							:value="item.value">
						</el-option>
						</el-select>
					</el-form-item>
				</span>
				<!-- 输入框搜索 -->
				<span v-for="(item,index) in inputType" :key='"input" + index'>
					<el-form-item :label="item.typeName">
						<el-input v-model="search[item.typeSign]" :placeholder="item.placeholder" clearable></el-input>
					</el-form-item>
				</span>
				<!-- 操作按钮 -->
				<el-form-item>
					<el-button type="primary" @click='Search'>查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="info" plain @click='Reset'>重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 开个路由 跳详情 -->
		<div v-else>
			<router-view />
		</div>
	</el-card>
</template>

<script>
export default {
	// 判断是否存在详情页
	computed: {
		isDetail() {
			return this.$route.query.type || null;
		}
	},
	data() {
		return {
			search: {},// 搜索
			timeType: [// 时间搜索
				{
					typeName: '创建时间',
					time: [],
					start: 'startTime',// 字段名称
					end: 'endTime',// 字段名称
				},
				{
					typeName: '绑定时间',
					time: [],
					start: 'startTime',
					end: 'endTime',
				},
			],
			selectType: [// 下拉搜索
				{
					typeName: '客户', 
					typeSign: 'user',// 字段名称
					typeList: [
						{value: '0',label: '下拉1'},
						{value: '1',label: '下拉2'},
					],
				},
				{
					typeName: '联网状态', 
					typeSign: 'status',// 字段名称
					typeList: [
						{value: '0',label: '下拉1'},
						{value: '1',label: '下拉2'},
					],
				},
				{
					typeName: '运行状态', 
					typeSign: 'yxstatus',// 字段名称
					typeList: [
						{value: '0',label: '下拉1'},
						{value: '1',label: '下拉2'},
					],
				}
			],
			inputType: [// 输入框搜索
				{
					typeName: 'IMEI', 
					typeSign: 'imei',// 字段名称
					placeholder: '请输入设备IMEI(多个以,隔开)'
				}
			],
		}
	},
	methods: {
		// 时间判断
		timeBtn(e, i, start, end) {
			if (e == null) {
				this.timeType[i].time = [];
				this.search[start] = '';
				this.search[end] = '';
			} else {
				this.search[start] = e[0];
				this.search[end] = e[1];
			}
		},
		// 搜索
		Search() {

		},
		// 重置
		Reset() {

		},
		// 获取数据
		getdata() {

		},
		// 删除
		Delete() {

		},
		// 详情
        // Detail(id) {
        //     let routeUrl = this.$router.resolve({
        //         path:'/detail/preDetail',
        //         query:{
        //              type:"detail",
        //         }
        //     })
        //     window.open(routeUrl.href,'_blank');
        // },
	},
}
</script>

<style scoped>
.el-divider--horizontal {
  margin: 2px 0 15px;
}
</style>
