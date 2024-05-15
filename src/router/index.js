import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/Layout";
// 新的 Layout 组件引入【没有侧边栏的】
import NewLayout from '@/layout/newLayout.vue';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            hidden: true,
            redirect: "/index"
        },
        {
            path: "/index",
            name: "index",
            component: Layout,
            meta: { title: "首页", icon: "el-icon-s-home" },
            children: [
				{
					path: "/",
					component: () => import("@/views/index")
				},
            ]
        },
		{// 表单
			path: "/form",
			name: "form",
			component: Layout,
			meta: { title: "表单FORM", icon: "el-icon-sunny" },
			children: [
				{
					path: "simulate",
					name: "simulate",
					meta: { title: "日常模拟" },
					component: () => import("@/views/form/simulate.vue"),
				},
				{
					path: "loop",
					name: "loop",
					meta: { title: "循环统一" },
					component: () => import("@/views/form/loop.vue"),
					// children: [
					// 	{// 详情
					// 	path: "...",
					// 	name: "...",
					// 	meta: { title: "详情", active: "..." },
					// 	component: () => ....
					// 	}
					// ]
				},
				{
					path: "component",
					name: "component",
					meta: { title: "组件复用" },
					component: () => import("@/views/form/component.vue"),
				}
			]
    	},
		{// echarts图
			path: "/echarts",
			name: "echarts",
			component: Layout,
			meta: { title: "echarts", icon: "el-icon-sunny" },
			children: [
				{
					path: "daily",
					name: "daily",
					meta: { title: "日常使用" },
					component: () => import("@/views/echarts/daily.vue"),
				},
				{
					path: "component",
					name: "component",
					meta: { title: "组件使用" },
					component: () => import("@/views/echarts/component.vue"),
				},
				{
					path: "network",
					name: "network",
					meta: { title: "网络拓扑图" },
					component: () => import("@/views/echarts/network.vue"),
				},
				{
					path: "reflection",
					name: "reflection",
					meta: { title: "折线图映射" },
					component: () => import("@/views/echarts/reflection.vue"),
				},
				{
					path: "public",
					name: "public",
					meta: { title: "多条折线共用X轴" },
					component: () => import("@/views/echarts/public.vue"),
				},
			]
    	},
		{// study
			path: "/study",
			name: "study",
			component: Layout,
			meta: { title: "每日一学", icon: "el-icon-sunny" },
			children: [
				{
					path: "study_01",
					name: "study_01",
					meta: { title: "数据处理" },
					component: () => import("@/views/study/study_01.vue"),
				},{
					path: "study_02",
					name: "study_02",
					meta: { title: "swiper插件使用" },
					component: () => import("@/views/study/study_02.vue"),
				},{
					path: "study_03",
					name: "study_03",
					meta: { title: "flex布局" },
					component: () => import("@/views/study/study_03.vue"),
				},{
					path: "study_04",
					name: "study_04",
					meta: { title: "双飞翼布局" },
					component: () => import("@/views/study/study_04.vue"),
				}
			]
    	},
		{// 没有菜单栏
			path: "/other",
			name: "other",
			component: NewLayout,
			meta: { title: "其他功能", icon: "el-icon-sunny" },
			children: [
				{
					path: "point",
					name: "point",
					meta: { title: "固定描点滚动" },
					component: () => import("@/views/other/point.vue"),
				}
			]
		}
    ]
})