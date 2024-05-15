<template>
	<el-card>
		<div>
			<!--  :labelName='labelName' 单个 -->
			<Table :tableData="tableData" :specialColumns="specialColumns" :tableHeadData='tableHeadData' :loading="loading" :btnNum='btnNum' @selectData='selectData' :checkBox='checkBox'>
				<!-- 单个 特殊处理 -->
				<!-- v-slot:labelName="scope": 只接受一个scope参数 -->
				<!-- <template v-slot:labelName="{ scope, index }">
					<span :style="scope.status == '故障中' ? 'color:red' : ''">
						{{scope.status}} {{index + 1}} 
					</span>
				</template> -->

				<!-- 多个 特殊列插槽内容 -->
				<template v-slot:specialCol1="{ scope, index }">
					<span :style="scope.status === '故障中' ? 'color:red' : ''">
						{{ scope.status }} (Row: {{ index }})
					</span>
				</template>
				<template v-slot:specialCol2="{ scope, index }">
					<span>
						{{ scope.other_field }} - Additional Info
					</span>
				</template>
				
				<!-- 操作栏 -->
				<template slot-scope="scope">
					<el-button size="mini" type="primary" plain>查看</el-button>
					<el-button size="mini" type="primary" plain>编辑</el-button>
					<el-button size="mini" type="danger">删除</el-button>
				</template>
			</Table>
		</div>
		<!-- 分页 -->
		<div class="pag">
			<el-pagination 
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[10,50,100]" 
				:page-size="pagData.limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pagData.total" background>
			</el-pagination>
		</div>
	</el-card>
</template>

<script>
import Table from '@/components/Table';
export default {
	data() {
		return {
			checkBox: true, //用来判断是否要显示多选框
			tableData:[
				{id:1, status: '故障中', other_field: 'test'},
				{id:2, status: '正常', other_field: 'test'},
			],  //表格数据
			tableHeadData:[ //表头
				{ prop: 'ctime', label: '创建时间' },
				{ prop: "id", label: 'ID' },
				{ prop: 'name', label: '应用名称' },
				{ prop: 'name_cn', label: '客户名称' },
				{ prop: 'repo_project', label: '项目' },
				{ prop: 'deploy_type', label: '类型' },
				{ prop: 'utime', label: '更新时间' },
			],
			loading: false,// 刷新
			btnNum: 210,//操作栏宽度
			checkboxData: [],// 多选数据
			// labelName: '状态',// 特殊处理列 单个
			// 特殊处理列 多个
			specialColumns: [
				{ name: 'specialCol1', label: '状态' },
				{ name: 'specialCol2', label: '测试' }
			],			
			
			//分页
			pagData: {
				total: 0,
				offset: 0,
				limit: 10,
				page: 1,
			},
		}
	},
	components: {
		Table,
	},
	methods: {
		//接收复用表单传来的数据，子传父
		selectData(val) {
			this.checkboxData = val;
			console.log(this.checkboxData, '子传父');
		},
		//分页:每页条数
		handleSizeChange(val) {
			this.pagData.limit = val;
		},
		//分页:当前页
		handleCurrentChange(val) {
			this.pagData.offset = this.pagData.limit * (val - 1);
		},
	},
	created() {
		
	},
}
</script>

<style lang="scss" scoped>
.pag {
    margin-top: 40px;
    text-align: center;
}
</style>
