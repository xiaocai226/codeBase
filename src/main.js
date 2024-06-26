import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index';
import store from '@/store/index';
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//全局引入echarts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
