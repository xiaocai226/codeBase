<template>
	<el-card>
		<div v-if="isDetail">
		    <router-view />
		</div>

		<div v-else>
			<el-table :data="tableData" style="width: 100%" :header-cell-style='getHeaderClass' v-loading="loading">
			    <el-table-column prop="createTime" label="创建时间">
			    </el-table-column>
			    <el-table-column prop="account" label="登录账号">
			    </el-table-column>
				<el-table-column prop="account" label="账号名称">
			    </el-table-column>
				<el-table-column prop="account" label="角色">
			    </el-table-column>
				<el-table-column prop="account" label="创建者">
			    </el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						{{scope.row.status}}
					</template>
			    </el-table-column>
				<el-table-column label="操作" width="170px" fixed="right">
				    <template slot-scope="scope">
						<el-button size="mini" type="primary" plain>编辑</el-button>
						<el-button size="mini" type="danger" plain>删除</el-button>
				    </template>
				</el-table-column>
			</el-table>

			<!-- 分页 -->
			<div class="pag">
			    <el-pagination @size-change="handleSizeChange"
			        @current-change="handleCurrentChange"
			        :page-sizes="[10,50,100]" :page-size="pagData.size"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="pagData.total" :current-page="pagData.current" background>
			    </el-pagination>
			</div>
		</div>
	</el-card>
</template>

<script>
export default {
    data() {
        return {
			loading: false,
			tableData: [
				{createTime: '2023'}
			],
            //分页
            pagData: {
                total: 0, //总数
                size: 10, //条数
                current: 1, //页数
            },
        }
    },
	computed: {
	    isDetail() {
	        return this.$route.query.type || null
	    }
	},
	watch: {
		
	},
    created() {
    },
    methods: {
		getHeaderClass({rowIndex}) {// 设置表格表头
            if (rowIndex == 0) {
                return "background-color:#EEF6F4;";
            }
        },
        //分页:每页条数
        handleSizeChange(val) {
            this.pagData.size = val;
            this.getData();
        },
        //分页:当前页
        handleCurrentChange(val) {
			this.pagData.current = val;
            this.getData();
        },
    },
}
</script>

<style>
.pag {
    margin-top: 40px;
    text-align: center;
}
</style>