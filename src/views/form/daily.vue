<template>
	<el-card>
		<el-form :rules="rules" :model="form" label-position="right" label-width="100px">
			<el-form-item label="输入框:" prop="input">
				<!-- auto-complete="off"防止暴露数据 -->
				<el-input v-model="form.input" auto-complete="off" placeholder='请输入' style="width:300px;"></el-input>
			</el-form-item>
			<el-form-item label="下拉框:" prop="select">
				<el-select v-model="form.select" clearable filterable>
					<el-option 
						v-for="item in selectList" 
						:key="item.value" 
						:label="item.key" 
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="单选组:" prop="radiogroup">
				<el-radio-group v-model="form.radiogroup">
					<el-radio-button v-for="(val, index) in data" :label="val"></el-radio-button>
				</el-radio-group> 
			</el-form-item>
			<el-form-item label="textarea:">
				<el-input v-model="form.textarea" type="textarea" placeholder='请输入(选填)' style="width:300px;"></el-input>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
 export default {
    data () {
		return {
			form: {
				input: '',
				select: '',
				radiogroup: '广州',
				textarea: '',
			},
			selectList: [
				{ key: '全部' ,value: '0' },
				{ key: '选项1' ,value: '1' },
				{ key: '选项2' ,value: '2' },
			],
			data: ["上海","北京","广州","深圳"],
			rules: {
				input: [ { required: true, message: '请输入', trigger: 'blur' }, ],
				select: [ { required: true, message: '请选择', trigger: 'change' }, ],
				radiogroup: [ { required: true, message: '请选择', trigger: 'change' }, ],
			},
		};
    },
    mounted() {

    },
    methods: {
      
    }
  }
</script> 
