<template>
	<!-- 搜索组件 -->
  	<div>
		<!-- 普通搜索 -->
		<div  class="topStyle">
			<div class="searchStyle">
				<!-- 时间 -->
				<div class='searchDiv' v-if="timeShow != 0">
					创建时间:
					<el-date-picker v-model="createTime" 
						value-format="yyyy-MM-dd" 
						type="daterange" 
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width:260px;"
						@change="createTimeBtn">
					</el-date-picker>
				</div>
				<!-- 普通select -->
				<div class='searchDiv'>
					<template>
						<!-- 插槽 中间可以添加 -->
						<slot name="commonSelectBtn"></slot>
					</template>
				</div>
				<div class='searchDiv'>
					查询:
					<el-input v-model="queryData[selectNum]" 
						placeholder="请输入要查询的内容" 
						clearable 
						prefix-icon="el-icon-search"
						style="width:210px;" 
						@change="queryBtn(selectNum,queryData[selectNum])">
					</el-input> 
				</div>
			</div>
			<div> 
				<template>
					<!-- 插槽 新建 -->
					<slot name="foundBtn"></slot>
				</template>
			</div>
		</div>
		<!-- 高级搜索 -->
		<div class="searchStyle" v-if="isShow" style="margin-top:5px">
			<!-- 删除时间 -->
			<div style='margin-right:10px'>
				删除时间:
				<el-date-picker 
					v-model="deleteTime"
					type="daterange"
					value-format="yyyy-MM-dd"
					range-separator="至" 
					start-placeholder="开始日期" 
					end-placeholder="结束日期" 
					style="width:260px;"
					@change="deleteTimeBtn">
				</el-date-picker>
			</div>
			<!-- 其他时间 -->
			<div style='margin: 7px 10px 5px 0px;' v-for="item in otherTime" :key='item.nama'>
				{{item.key}}:
				<el-date-picker 
					v-model="otherTimeList[item.name]"
					type="daterange"
					value-format="yyyy-MM-dd"
					range-separator="至" 
					start-placeholder="开始日期" 
					end-placeholder="结束日期" 
					style="width:260px;"
					@change="otherTimeBtn($event,item.name)">
				</el-date-picker>
			</div>
			<!-- 高级搜索其他项 -->
			<div class='searchDiv'>
				<template>
					<!-- 插槽 中间可以添加 -->
					<slot name="highSelectBtn"></slot>
				</template>
			</div>
			<!-- 根据类型搜索 -->
			<div class='seniorSearchDiv' v-for="(item,index) in field" :key='index'>
				<div>
					{{item.key}}:
					<!-- 下拉款为搜索条件 -->
					<el-select v-model="selectSearch[item.name]" 
						placeholder="类型" 
						style="width:110px" 
						@change="selectBtn(item.name,selectSearch[item.name],inputSearch[item.name])">
						<el-option 
							v-for="item in conditions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<!-- 用户输入一个值 -->
				<div>
					<el-input v-model="inputSearch[item.name]" :placeholder="item.key" 
						clearable prefix-icon="el-icon-search" style="width:220px;" 
						@change="inputBtn(item.name,selectSearch[item.name],inputSearch[item.name])">
					</el-input>
				</div>
			</div>
		</div>
		
		<!-- 高级、查询、重置、等等 -->
		<div class='searchDiv'>
			<el-button type="test" @click="isShow=!isShow" >高级</el-button>
			<el-button type="primary" @click="SearchBtn">搜索</el-button>
			<el-button type="info" plain @click="Reset">全部重置</el-button>
			<span style='margin-left:10px;'>
				<template>
					<!-- 插槽 中间可以添加 -->
					<slot name="searchBtn"></slot>
				</template>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		field: Array,
		selectNum: String,
		sign: Number,
		timeShow: Number,
		otherTime: Array,
		initialTime: Array,// 带默认当天时间
	},
	data() {
		return {
			createTime: this.initialTime ? [this.initialTime[0],this.initialTime[1]] : [], //创建时间
			deleteTime: [], //删除时间
			otherTimeList: {}, //其他搜索
			isShow:false, // 高级查询
			queryData: {},
			selectSearch: {},
			inputSearch: {},
			search: {
				stat: {
					deleteTime: {
						gte: '',
						lte: '',
					},
					createTime: {
						gte: this.initialTime ? this.initialTime[0] : '',
						lte: this.initialTime ? this.initialTime[1] : '',
					},
				},
			},
			conditions:[
				{label: "相等",value: 'eq'},
				{label: "模糊查询",value: 'like'},
				{label: "不相等",value: 'neq'},
				{label: "大于",value: 'gt'},
				{label: "大于等于",value: 'gte'},
				{label: "小于",value: 'lt'},
				{label: "小于等于",value: 'lte'},
			],
		}
	},
	methods: {
		//创建时间
		createTimeBtn(e) {
			if(e == null) {
				this.createTime = [];
				this.search.stat.createTime = { gte:'',lte:''};
			}else {
				this.search.stat.createTime.gte = e[0];
				this.search.stat.createTime.lte = e[1];
			}
		},
		// 查询
		queryBtn(e,val) {
			this.search[e] = {search: val};
		},
		//全部重置
		Reset() {
			this.search = {
				stat: {
					deleteTime: {
						gte: '',
						lte: '',
					},
					createTime: {
						gte: this.initialTime ? this.initialTime[0] : '',
						lte: this.initialTime ? this.initialTime[1] : '',
					},
				},
			};
			this.deleteTime = [];
			this.createTime = this.initialTime ? [this.initialTime[0],this.initialTime[1]] : [];
			this.otherTimeList = {};
			this.queryData = {};
			this.selectSearch = {};
			this.inputSearch = {};
			if (this.sign) {//孙调用(子组件的子组件)
				this.$parent.getdate(this.search,100)
			} else {//子调用父组件(子组件)
				this.$parent.$parent.getdate(this.search,100);
			}
		},
		//高级—删除时间
		deleteTimeBtn(e) {
			if(e == null) {
				this.deleteTime = [];
				this.search.stat.deleteTime = { gte:'',lte:''};
			}else {
				this.search.stat.deleteTime.gte = e[0];
				this.search.stat.deleteTime.lte = e[1];
			}
		},
		//高级—类型
		selectBtn(name,selectE,inputE) {
			// console.log(name,selectE,inputE,'高级—类型')
			this.search[name] = {};
			this.search[name][selectE]=inputE;
		},
		//高级—查询
		inputBtn(name,selectE,inputE) {
			// console.log(name,selectE,inputE,'高级—查询')
			if(this.selectSearch[name]) {
				this.search[name][selectE] = inputE;
			}
		},
		//搜索
		SearchBtn() {
			if (this.sign) {
				this.$parent.getdate(this.search,1)
			} else {
				this.$parent.$parent.getdate(this.search,1);
			}
		},
		//其他时间
		otherTimeBtn(e,name) {
			if(e == null) {
				if(name == 'createTime'){
					this.otherTimeList[name] = [];
					this.search.stat[name] = {gte:'',lte:''};
				}else{
					this.otherTimeList[name] = [];
					this.search[name] = {gte:'',lte:''};
				}          
			}else {
				if(name == 'createTime'){
					this.search.stat[name] = {};
					this.search.stat[name].gte = e[0];
					this.search.stat[name].lte = e[1];
				}else{
					this.search[name] = {};
					this.search[name].gte = e[0];
					this.search[name].lte = e[1];
				}  
			}
		}
	},
	created() {

	},
}
</script>

<style scoped lang="scss">
.topStyle {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.searchDiv{
	margin: 7px 10px 5px 0px;
}
.searchStyle {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .seniorSearchDiv{
		display:flex;
		margin: 7px 10px 5px 0px;
    }
}
</style>
