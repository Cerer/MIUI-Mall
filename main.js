import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入全局加载动画
import loading from '@/components/common/loading.vue'
Vue.component('loading', loading)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
