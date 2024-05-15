<template>
    <el-card>
        <!-- 搜索、高级搜索 -->
        <Search :field='field' :selectNum='selectNum'>
            <!-- slot为组件中留下来的插槽 -->
            <template slot="commonSelectBtn">
                <div>
                    人:
                    <el-select 
                        v-model="searchObj.secMan.search"  
                        clearable filterable
                        style="width:120px"
                        placeholder="人">
                        <el-option 
                            v-for="item in dutyOptions" 
                            :key="item.id" 
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </template>
            <template slot="foundBtn">
                <div>
                    <el-button type="primary">新建单位</el-button>
                </div>
            </template>
        </Search>
    </el-card>
</template>

<script>
import Search from "@/components/Search";
export default {
    components: {
        Search,
    },
    data() {
        return {
			//搜索组件传值
            field:[
                { name:'id', key:'id' },
                { name:'cdnNo', key:'CDN许可证' },
                { name:'title', key:'单位名称' },
                { name:'address', key:'单位地址' },
                { name:'legalMan', key:'企业法人' },
            ],
			selectNum: 'company',
			// 搜索请求参数 普通搜索+高级搜索
            searchObj: {
                secMan:{//信安责任人信息
                    search:'',//名称
                },
            },
			dutyOptions: [
				{ id:'0',title: 'hha' }
			], 
        }
    },
    methods: {
        getdate(search,i) {
			let obj = Object.assign( this.searchObj,search);
			console.log(obj,'合并？？？')
			console.log(this.searchObj)
		}
    },
    created(){

    }
}
</script>

<style scoped lang="scss">

</style>