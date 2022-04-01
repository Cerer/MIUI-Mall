import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store

Vue.config.productionTip = false

// 引入全局加载动画
import loading from '@/components/common/loading.vue'
Vue.component('loading', loading)

import loadingPlus from '@/common/mixin/loading-plus.vue'
Vue.component('loading-plus', loadingPlus)

// 引入request库
import api from '@/common/lib/request.js';
Vue.prototype.api = api;


App.mpType = 'app'

const app = new Vue({
	store,
	api,
	...App
})
app.$mount()
