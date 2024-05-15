<template>
<!-- 做区域轮播 -->
<div class="special-page">
    <!-- NMS软件告警 -->
    <div class="page">
        <!-- 标题 height: 82px; -->
        <page-header :title="title" />

        <!-- 内容 -->
        <div class="content">
			<!-- 左边 -->
		    <div class="box" style="margin-right: 24px;">
				<div class="boxTitle flex-between">
					<div>
						<span class="subheading">矿机</span>
						<span class="explain">{{today}} 现存故障记录清零</span>
					</div>
					<div class="flex" style="margin-right: 20px;font-size: 18px;">
						<div class="flex">
							<img src="../assets/dian_red.png" class="yuanqiu"/>{{highProNum}} 条
						</div>
						<div class="flex">
							<img src="../assets/dian_lv.png" class="yuanqiu"/>{{mediumProNum}} 条
						</div>
						<div class="flex">
							<img src="../assets/dian_lan.png" class="yuanqiu"/>{{lowProNum}} 条
						</div>
					</div>
				</div>

				<div class="boxTable">
					<div class="flex table_th">
						<div class="th_style tr1" style="padding-left: 20px;">优先级</div>
						<div class="th_style tr2">省份地市运营商</div>
						<div class="th_style tr3">节点编号</div>
						<div class="th_style tr4">故障类型</div>
						<div class="th_style tr5">故障开始时间</div>
						<div class="th_style tr6">故障持续时间</div>
						<div class="th_style tr7">故障详情</div>
					</div>

					<!-- 紧急 -->
					<div class="table_main_body" :style="{ height: highproHeight }">
						<div class="table_inner_body" :style="{top: highproTop + 'px'}">
							<div class="table_tr flex" v-for="item,index in highProData" :key="'high' + index" :style="{ backgroundColor: getBackgroundColor(item.level) }">
								<div class="tr1 tr">
									<div class="flex">
										<img src="../assets/dian_red.png" style="width: 25px;height: 25px;margin: -4px 0 0 -10px;"/>{{item.level}}
									</div>
								</div>
								<div class="tr2 tr">{{item.province}}{{item.city}}{{item.isp}}</div>
								<div class="tr3 tr">{{item.node}}</div>
								<div class="tr4 tr">{{item.alert_msg}}</div>
								<div class="tr5 tr">{{moment(item.ctime * 1000).format("YYYY-MM-DD HH:mm:ss")}}</div>
								<div class="tr6 tr">
									<span v-if="item.recovered_at == 0">故障还未恢复</span>
									<span v-else>{{timeChange(item.recovered_at - item.ctime)}}</span>
								</div>
								<div class="tr7 tr" style="word-wrap:break-word;">{{item.hostname}}{{item.alert_msg}}</div>
							</div>
						</div>
					</div>
	
					<!-- 严重 -->
					<div class="table_main_body" :style="{ height: mediumproHeight }" v-if="highProData.length < 12">
						<div class="table_inner_body" :style="{top: mediumproTop + 'px'}">
							<div class="table_tr flex" v-for="item,index in mediumProData" :key="'medium' + index" :style="{ backgroundColor: getBackgroundColor(item.level) }">
								<div class="tr1 tr">
									<div class="flex">
										<img src="../assets/dian_lv.png" style="width: 25px;height: 25px;margin: -4px 0 0 -10px;"/>{{item.level}}
									</div>
								</div>
								<div class="tr2 tr">{{item.province}}{{item.city}}{{item.isp}}</div>
								<div class="tr3 tr">{{item.node}}</div>
								<div class="tr4 tr">{{item.alert_msg}}</div>
								<div class="tr5 tr">{{moment(item.ctime * 1000).format("YYYY-MM-DD HH:mm:ss")}}</div>
								<div class="tr6 tr">
									<span v-if="item.recovered_at == 0">故障还未恢复</span>
									<span v-else>{{timeChange(item.recovered_at - item.ctime)}}</span>
								</div>
								<div  class="tr7 tr" style="word-wrap:break-word;">{{item.hostname}}{{item.alert_msg}}</div>
							</div>
						</div>
					</div>

					<!-- 一般 -->
					<div class="table_main_body" :style="{ height: lowproHeight }">
						<div class="table_inner_body">
							<div class="table_tr flex" v-for="item,index in lowProData" :key="'low' + index" :style="{ backgroundColor: getBackgroundColor(item.level) }">
								<div class="tr8 tr">
									<div class="flex">
										<img src="../assets/dian_lan.png" style="width: 25px;height: 25px;margin: -4px 0 0 -10px;"/>{{item.level1}}
									</div>
								</div>
								<div class="tr9 tr">{{item.alert_msg1}}</div>
								<div class="tr10 tr">{{item.count1}} 条</div>

								<div class="tr8 tr">
									<div class="flex">
										<img src="../assets/dian_lan.png" style="width: 25px;height: 25px;margin: -4px 0 0 -10px;"/>{{item.level2}}
									</div>
								</div>
								<div class="tr9 tr">{{item.alert_msg2}}</div>
								<div class="tr10 tr">{{item.count2}} 条</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 右边 -->
		    <div class="box">
				<div class="boxTitle flex-between">
					<div>
						<span class="subheading">盒子</span>
						<span class="explain">{{today}} 现存故障记录清零</span>
					</div>
					<div class="flex" style="margin-right: 20px;font-size: 18px;">
						<div class="flex">
							<img src="../assets/dian_red.png" class="yuanqiu"/>{{highFalNum}} 条
						</div>
						<div class="flex">
							<img src="../assets/dian_lv.png" class="yuanqiu"/>{{mediumFalNum}} 条
						</div>
						<div class="flex">
							<img src="../assets/dian_lan.png" class="yuanqiu"/>{{lowFalNum}} 条
						</div>
					</div>
				</div>
			
				<div class="boxTable">
					<div class="flex table_th">
						<div class="th_style tr1" style="padding-left: 20px;">优先级</div>
						<div class="th_style tr2">省份地市运营商</div>
						<div class="th_style tr3">节点编号</div>
						<div class="th_style tr4">故障类型</div>
						<div class="th_style tr5">故障开始时间</div>
						<div class="th_style tr6">故障持续时间</div>
						<div class="th_style tr7">故障详情</div>
					</div>
					
					<!-- 紧急 -->
					<div class="table_main_body"  :style="{ height: highfalHeight }">
						<div class="table_inner_body"  :style="{top: highfalTop + 'px'}">
							<div class="table_tr flex" v-for="item,index in highFalData" :key="index" :style="{ backgroundColor: getBackgroundColor(item.level) }">
								<div class="tr1 tr">
									<div class="flex">
										<img src="../assets/dian_red.png" style="width: 25px;height: 25px;margin: -4px 0 0 -10px;"/>{{item.level}}
									</div>
								</div>
								<div class="tr2 tr">{{item.province}}{{item.city}}{{item.isp}}</div>
								<div class="tr3 tr">{{item.node}}</div>
								<div class="tr4 tr">{{item.alert_msg}}</div>
								<div class="tr5 tr">{{moment(item.ctime * 1000).format("YYYY-MM-DD HH:mm:ss")}}</div>
								<div class="tr6 tr">
									<span v-if="item.recovered_at == 0">故障还未恢复</span>
									<span v-else>{{timeChange(item.recovered_at - item.ctime)}}</span>
								</div>
								<div class="tr7 tr" style="word-wrap:break-word;">{{item.hostname}}{{item.alert_msg}}</div>
							</div>
						</div>
					</div>

					<!-- 严重 -->
					<div class="table_main_body"  :style="{ height: mediumfalHeight }" v-if="highFalData.length < 12">
						<div class="table_inner_body" :style="{top: mediumfalTop + 'px'}">
							<div class="table_tr flex" v-for="item,index in mediumFalData" :key="index" :style="{ backgroundColor: getBackgroundColor(item.level) }">
								<div class="tr1 tr">
									<div class="flex">
										<img src="../assets/dian_lv.png" style="width: 25px;height: 25px;margin: -4px 0 0 -10px;"/>{{item.level}}
									</div>
								</div>
								<div class="tr2 tr">{{item.province}}{{item.city}}{{item.isp}}</div>
								<div class="tr3 tr">{{item.node}}</div>
								<div class="tr4 tr">{{item.alert_msg}}</div>
								<div class="tr5 tr">{{moment(item.ctime * 1000).format("YYYY-MM-DD HH:mm:ss")}}</div>
								<div class="tr6 tr">
									<span v-if="item.recovered_at == 0">故障还未恢复</span>
									<span v-else>{{timeChange(item.recovered_at - item.ctime)}}</span>
								</div>
								<div class="tr7 tr" style="word-wrap:break-word;">{{item.hostname}}{{item.alert_msg}}</div>
							</div>
						</div>
					</div>

					<!-- 一般 -->
					<div class="table_main_body" :style="{ height: lowfalHeight }">
						<div class="table_inner_body">
							<div class="table_tr flex" v-for="item,index in lowFalData" :key="index" :style="{ backgroundColor: getBackgroundColor(item.level) }">
								<div class="tr8 tr">
									<div class="flex">
										<img src="../assets/dian_lan.png" style="width: 25px;height: 25px;margin: -4px 0 0 -10px;"/>{{item.level1}}
									</div>
								</div>
								<div class="tr9 tr">{{item.alert_msg1}}</div>
								<div class="tr10 tr">{{item.count1}} 条</div>

								<div class="tr8 tr">
									<div class="flex">
										<img src="../assets/dian_lan.png" style="width: 25px;height: 25px;margin: -4px 0 0 -10px;"/>{{item.level2}}
									</div>
								</div>
								<div class="tr9 tr">{{item.alert_msg2}}</div>
								<div class="tr10 tr">{{item.count2}} 条</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
</div>
</template>

<script>
import PageHeader from '@/views/software/pageHeader';
import * as api from "@/api/equip";
import moment from "moment";
export default {
    components: {
        PageHeader,
    },
    data() {
        return {
			moment,// 时间转换
			title: '设备故障监控',
			today: moment().format('YYYY-MM-DD'),

			// 矿机
			highProNum: 0,// 紧急
			mediumProNum: 0,// 严重
			lowProNum: 0,// 一般
			highProData: [],// 紧急表格
			mediumProData: [],// 严重表格
			lowProData: [],// 一般表格

			highproTop: 0,// 紧急
			highproSize: 0,// 条数
			mediumproTop: 0,// 严重
			mediumproSize: 0,// 条数
			protableTimer1: null,// 定时器
			protableTimer2: null,// 定时器

			// 盒子
			highFalNum: 0,// 紧急
			mediumFalNum: 0,// 严重
			lowFalNum: 0,// 一般
			highFalData: [],// 紧急表格
			mediumFalData: [],// 严重表格
			lowFalData: [],// 一般表格

			highfalTop: 0,// 紧急
			highfalSize: 0,// 条数
			mediumfalTop: 0,// 严重
			mediumfalSize: 0,// 条数
			faltableTimer1: null,// 定时器
			faltableTimer2: null,// 定时器

			//需要根据情况设置的参数
			maxHeight: 840,// 70*12
			downHeight: 770,// 70*11
			// visibleSize: 12, //容器内可视最大完整行数
			lineHeight: 70, //每行的实际高度（包含margin-top/bottom,border等）
			tableTimerInterval: 100, //向上滚动 1px 所需要的时间，越小越快，推荐值 100

			highproCount: 0,
			mediumproCount: 0,

			highfalCount: 0,
			mediumfalCount: 0,

			interval: null,
        }
    },
	computed: {
		// 矿机
		highproHeight() {
			const dynamicproHeight = this.lowProData.length !== 0
				? this.highProData.length > 11 ? this.downHeight : this.highProData.length * 70
				: this.highProData.length > 12 ? this.maxHeight : this.highProData.length * 70;
			return `${dynamicproHeight}px`;
		},
		mediumproHeight() {
			const highProLength = this.highProData.length;
    		const mediumProLength = this.mediumProData.length;

			if(this.lowProData.length != 0) {
				if (highProLength === 0) {
					return mediumProLength > 11 ? `${this.downHeight}px` : `${mediumProLength * 70}px`;
				} else {
					const maxmedproHeight1 = this.downHeight - highProLength * 70;
					return `${Math.min(maxmedproHeight1, mediumProLength * 70)}px`;
				}
			}else {
				if (highProLength === 0) {
					return mediumProLength > 12 ? `${this.maxHeight}px` : `${mediumProLength * 70}px`;
				} else {
					const maxmedproHeight2 = this.maxHeight - highProLength * 70;
					return `${Math.min(maxmedproHeight2, mediumProLength * 70)}px`;
				}
			}
		},
		lowproHeight() {
			// 有值就至少要70px
			if(this.highProData.length + this.mediumProData.length === 0) {
				return this.lowProData.length > 12 ? `${this.maxHeight}px` : `${this.mediumProData.length * 70}px`;
			}else {
				if(this.lowProData.length != 0){
					return `${Math.min(70, this.lowProData.length * 70)}px`;
				}else{
					const maxlowproHeight = this.maxHeight - (this.highProData.length + this.mediumProData.length) * 70;
					return `${Math.min(maxlowproHeight, this.lowProData.length * 70)}px`;
				}
			}
		},

		// 盒子
		highfalHeight() {
			const dynamicfalHeight = this.lowFalData.length !== 0
				? this.highFalData.length > 11 ? this.downHeight : this.highFalData.length * 70
				: this.highFalData.length > 12 ? this.maxHeight : this.highFalData.length * 70;
			return `${dynamicfalHeight}px`;
		},
		mediumfalHeight() {
			const highFalLength = this.highFalData.length;
    		const mediumFalLength = this.mediumFalData.length;

			if(this.lowFalData.length != 0) {
				if (highFalLength === 0) {
					return mediumFalLength > 11 ? `${this.downHeight}px` : `${mediumFalLength * 70}px`;
				} else {
					const maxmedfalHeight1 = this.downHeight - highFalLength * 70;
					return `${Math.min(maxmedfalHeight1, mediumFalLength * 70)}px`;
				}
			}else {
				if (highFalLength === 0) {
					return mediumFalLength > 12 ? `${this.maxHeight}px` : `${mediumFalLength * 70}px`;
				} else {
					const maxmedfalHeight2 = this.maxHeight - highFalLength * 70;
					return `${Math.min(maxmedfalHeight2, mediumFalLength * 70)}px`;
				}
			}
		},
		lowfalHeight() {
			// 有值就至少要70px
			if(this.highFalData.length + this.mediumFalData.length === 0) {
				return this.lowFalData.length > 12 ? `${this.maxHeight}px` : `${this.mediumFalData.length * 70}px`;
			}else {
				if(this.lowFalData.length != 0){
					return `${Math.min(70, this.lowFalData.length * 70)}px`;
				}else{
					const maxlowfalHeight = this.maxHeight - (this.highFalData.length + this.mediumFalData.length) * 70;
					return `${Math.min(maxlowfalHeight, this.lowFalData.length * 70)}px`;
				}
			}
		}
	},
	methods: {
		// 时间转换
		timeChange(value) {
			return this.$judChange.timeToChinese(value);
		},
		// 设置背景色
		getBackgroundColor(level) {
			switch (level) {
				case 'high':
					return '#A53E48'; // Set the background color for 'info'
				case 'medium':
					return '#0B8188'; // Set the background color for 'warning'
				case 'low':
					return '#126CBB'; // Set the background color for 'error'
				default:
					return 'white'; // Set a default background color
        	}
		},
		// 第一次获取总数
		async getFirstData() {
			clearInterval(this.protableTimer1);
			clearInterval(this.protableTimer2);
			clearInterval(this.faltableTimer1);
			clearInterval(this.faltableTimer2);
			
			// 参数有 level, source, day, page, page_size
			await api.yesNormal({level: 'low',source: 'prometheus',day: this.today, page_size: '100'}).then(res => {
				if(res.data) {
					this.lowProNum = res.data.reduce((sum, obj) => sum + obj.count, 0);
					// 新的数组
					this.lowProData = [];
					// 遍历原始数组，每两条数据组成一个新的对象
					for (let i = 0; i < res.data.length; i += 2) {
						const obj1 = res.data[i] || {}; // 取第一条数据，如果不存在则为空对象
						const obj2 = res.data[i + 1] || {}; // 取第二条数据，如果不存在则为空对象

						// 组成新的对象
						const newObj = {
							level: 'low',
							count1: obj1.count,
							alert_msg1: obj1.alert_msg,
							level1: obj1.level,
							source1: obj1.source,
							count2: obj2.count,
							alert_msg2: obj2.alert_msg,
							level2: obj2.level,
							source2: obj2.source,
						};

						// 将新的对象添加到新数组
						this.lowProData.push(newObj);
					}
				}
				// console.log('一般表格pro',this.lowProNum,this.lowProData)
			})
			await api.yesNormal({level: 'low',source: 'falcon',day: this.today, page_size: '100'}).then(res => {
				if(res.data) {
					this.lowFalNum = res.data.reduce((sum, obj) => sum + obj.count, 0);

					// 新的数组
					this.lowFalData = [];
					// 遍历原始数组，每两条数据组成一个新的对象
					for (let i = 0; i < res.data.length; i += 2) {
						const obj1 = res.data[i] || {}; // 取第一条数据，如果不存在则为空对象
						const obj2 = res.data[i + 1] || {}; // 取第二条数据，如果不存在则为空对象

						// 组成新的对象
						const newObj = {
							level: 'low',
							count1: obj1.count,
							alert_msg1: obj1.alert_msg,
							level1: obj1.level,
							source1: obj1.source,
							count2: obj2.count,
							alert_msg2: obj2.alert_msg,
							level2: obj2.level,
							source2: obj2.source,
						};

						// 将新的对象添加到新数组
						this.lowFalData.push(newObj);
					}
				}
				// console.log('一般fal',this.lowFalNum,this.lowFalData)
			})
			
			// 矿机
			const proAction = this.lowProData.length !== 0 ? 11 : 12;
			
			await api.noNormal({level: 'high',source: 'prometheus',day: this.today, page_size: '100'}).then(res => {
				this.highProNum = res.count;
				this.highProData = res.data.slice(0,6);// .slice(0,6)
				// console.log('紧急表格pro',this.highProNum,this.highProData)

				this.highproSize = this.highProData.length;
				if (this.highproSize > proAction) {// 总数据大于显示数据
					this.protableTimerFun('high',proAction);
				}	
			})
			
			await api.noNormal({level: 'medium',source: 'prometheus',day: this.today, page_size: '100'}).then(res => {
				this.mediumProNum = res.count;
				this.mediumProData = res.data;
				// console.log('严重表格pro',this.mediumProNum,this.mediumProData)

				this.mediumproSize = this.mediumProData.length;
				if(this.highproSize + this.mediumproSize > proAction) {
					this.protableTimerFun('medium',proAction);
				}
			})

			// 盒子
			const falAction = this.lowFalData.length !== 0 ? 11 : 12;

			await api.noNormal({level: 'high',source: 'falcon',day: this.today, page_size: '100'}).then(res => {
				this.highFalNum = res.count;
				this.highFalData = res.data;// .slice(0,13)
				// console.log('紧急fal',this.highFalNum,this.highFalData)

				// 一共多少条 100！
				this.highfalSize = this.highFalData.length;
				if (this.highfalSize > falAction) {// 总数据大于显示数据
					this.faltableTimerFun('high',falAction);
				} 
			})
			
			await api.noNormal({level: 'medium',source: 'falcon',day: this.today, page_size: '100'}).then(res => {
				this.mediumFalNum = res.count;
				this.mediumFalData = res.data;
				// console.log('严重fal',this.mediumFalNum,this.mediumFalData)

				this.mediumfalSize = this.mediumFalData.length;
				if(this.highfalSize + this.mediumfalSize > falAction) {
					this.faltableTimerFun('medium',falAction);
				}
			})
		},
		// 矿机 数据轮播
		protableTimerFun(sign,num) {
			if(sign == 'high') {
				this.highproCount = 0;
				this.protableTimer1 = setInterval(() => {
					// 100*70-12*70去掉最后一页时间
					if (this.highproCount < (this.highProData.length) * this.lineHeight - num*70) {
						this.highproTop -= 1;
						this.highproCount++;
					} else {
						this.highproCount = 0;
						this.highproTop = 0;
					}
				}, this.tableTimerInterval);
			}else if(sign == 'medium') {
				this.mediumproCount = 0;
				this.protableTimer2 = setInterval(() => {
					if (this.mediumproCount < (this.mediumProData.length) * this.lineHeight - (num-this.highproSize)*70) {
						this.mediumproTop -= 1;
						this.mediumproCount++;
					} else {
						this.mediumproCount = 0;
						this.mediumproTop = 0;
					}
				}, this.tableTimerInterval);
			}
		},
		// 盒子 数据轮播
		faltableTimerFun(sign,num) {
			if(sign == 'high') {
				this.highfalCount = 0;
				this.faltableTimer1 = setInterval(() => {
					// 100*70-12*70去掉最后一页时间
					if (this.highfalCount < (this.highFalData.length) * this.lineHeight - num*70) {
						this.highfalTop -= 1;
						this.highfalCount++;
					} else {
						this.highfalCount = 0;
						this.highfalTop = 0;
					}
				}, this.tableTimerInterval);
			}else if(sign == 'medium') {
				this.mediumfalCount = 0;
				this.faltableTimer2 = setInterval(() => {
					if (this.mediumfalCount < (this.mediumFalData.length) * this.lineHeight - (num-this.highfalSize)*70) {
						this.mediumfalTop -= 1;
						this.mediumfalCount++;
					} else {
						this.mediumfalCount = 0;
						this.mediumfalTop = 0;
					}
				}, this.tableTimerInterval);
			}
		},
		clearTime() {
			if(this.interval) {
				clearInterval(this.interval);
				this.interval = null;
			}
		}
	},
	created() {
		this.getFirstData();

		this.interval = setInterval(() => {
			this.mediumproCount = 0;
			this.mediumproTop = 0;
			this.highproCount = 0;
			this.highproTop = 0;
			this.highfalCount = 0;
			this.highfalTop = 0;
			this.mediumfalCount = 0;
			this.mediumfalTop = 0;

			this.getFirstData();
		}, 5 * 60 * 1000);
	},
	beforeDestroy() {
		this.clearTime();
		// this.clearProTime();
		// this.clearFalTime();
	},
}
</script>

<style lang="scss" scoped>
.page {
    height: 100%;
    width: 100%;
    color: #fff;
    background: url("../assets/bg.jpg") no-repeat;
    background-size: 100% 100%;
}
.content {
    display: flex;
    // flex-direction: column; // 按水平分
    height: calc(100% - 120px);
    padding: 0 24px 24px;
}
.box {
	height: 100%;
	width: 50%;
	flex-grow: 1;
	// background-color: rgba(125, 136, 219, 0.1);
	// padding: 20px;
}

.boxTitle{
	height: 50px;
	line-height: 50px;
	background-color: rgba(125, 136, 219, 0.1);
	margin-bottom: 20px;
}

.subheading{
	font-size: 20px;
	font-weight: 600;
	padding: 0 15px;
	background-color: #2A59BA;
	height: 50px;
	line-height: 50px;
	display: inline-block;
}

.explain{
	font-size: 18px;
	margin-left: 10px;
}

.yuanqiu{
	width: 48px;
	height: 48px;
	margin: 0 -12px 0 10px;
}

.boxTable{
	height: calc(100% - 70px);
	background-color: rgba(125, 136, 219, 0.1);
}

.table_th{
	width: 100%;
	// background-color: #1F3A85;
	height: 30px;
	line-height: 30px;
	padding: 0 0 0 5px;
}

.th_style{
	font-weight: bold;
	// font-size: 18px;
	// overflow: hidden;
	// text-overflow: ellipsis;
	// white-space: nowrap;
	// box-sizing: border-box;
	// padding: 0 5px;
	// text-align: center;
}

.tr1{
	width: 10%;
}
.tr2{
	width: 12%;
}
.tr3{
	width: 10%;
}
.tr4{
	width: 12%;
	word-wrap: break-word; /* 允许单词内换行 */
  	overflow-wrap: break-word; /* 允许单词内换行 */
}
.tr5{
	width: 16%;
}
.tr6{
	width: 12%;
}
.tr7{
	width: 28%;
}
.tr8{
	width: 12%;
}
.tr9{
	width: 30%;
}
.tr10{
	width: 8%;
}

.table_main_body{
	width: 100%;
	// height: 340px;
	// 全部高度
	overflow: hidden;
	position: relative; 
	// border: 1px solid brown;
}

.table_inner_body {
  width: 100%;
  position: absolute;
  left: 0;
}

.table_tr{
	height: 70px;
	border-bottom: 1px solid #2A48A5;
	// line-height: 40px;
	// color: #eee;
	// font-size: 15px;
	// background: #A63F4B;
	// border: 1px solid rgb(4, 114, 131);

	// margin-top: 7px;
	padding: 18px 10px;
}

.tr {
	// overflow: hidden;
	// text-overflow: ellipsis;
	// white-space: nowrap;
	// box-sizing: border-box;
	// padding: 0 5px;
	// text-align: center;
	// font-size: 14px;
}
</style>