<template>
	<el-menu :default-active="$route.path" router background-color="#2E363D" text-color="#fff" active-text-color='#fff'>
		<el-menu-item index="/">
			<i class="el-icon-s-home"></i>
			<span slot="title">首页</span>
		</el-menu-item>
		<!-- 循环路由router -->
		<template v-for="(item,i) in routes">
			<!-- 排除hidden和index -->
			<el-submenu v-if="!item.hidden && item.path != '/index'" :index="item.path" :key="i">
				<template slot="title">
					<i :class="item.meta.icon"></i>
					<span>{{ item.meta.title }}</span>
				</template>
				<!-- 确保有children存在 -->
				<template v-if="item.children && item.children.length">
					<el-menu-item-group>
						<!-- :index="`${item.path}/${child.path}`" 路径 -->
						<el-menu-item
								v-for="child in item.children"
								:key="child.name"
								:index="`${item.path}/${child.path}`"
						>{{ child.meta.title }}</el-menu-item>
					</el-menu-item-group>
				</template>
			</el-submenu>
		</template>
	</el-menu>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
    routes() {
        // 拿到初始化时配置的路由规则
        // this.@route可以拿到当前路由信息
        return this.$router.options.routes
    },
  },
  methods: {

  },
  created() {
    // console.log('routes',this.$router.options.routes)
  },
}
</script>

<style scoped>
.el-menu {
  border: 0px;
  min-height: 100%;
}
</style>

<style>
  .el-menu-item-group__title {
    padding: 0px 0 0px 0px !important;
  }
  /* .el-submenu__title高亮 */
  /* .el-submenu.is-opened .el-submenu__title {
    background: #206546 !important;
  } */
  /* .el-menu-item单击、移入高亮 */
  .el-menu-item.is-active {
    background-color: #dcbae5 !important;
  }
  .el-menu-item:hover{
    background-color: #dcbae5 !important;
  }
  /* .el-submenu .el-menu-item {
    color: #808080 !important;
  } */
</style>