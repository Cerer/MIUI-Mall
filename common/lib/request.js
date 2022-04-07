// 封装接口

import $store from '@/store/index.js';

export default {
	// 全局配置
	common: {
		// 接口根路径
		baseUrl: 'http://ceshi3.dishait.cn/api',

		// 请求头
		header: {
			"Content-Type": "application/json; charset=utf-8",
			"Content-Type": "application/x-www-form-urlencoded"
		},

		// 数据
		data: {},

		// 请求方法
		method: 'GET',

		// 数据类型
		dataType: 'json'
	},

	// 请求,返回promise
	request(options = {}) {
		// 组织参数
		options.url = this.common.baseUrl + options.url;
		options.header = options.header || this.common.header;
		options.data = options.data || this.common.data;
		options.method = options.method || this.common.method;
		options.dataType = options.dataType || this.common.dataType;

		// 判断是否要取token
		if (options.token) {
			options.header.token = $store.state.user.token;

			// 二次验证
			if (options.checkToken && !options.header.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});

				return uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}

		// 请求
		return new Promise((res, rej) => {
			uni.request({
				...options,
				success: (result) => {
					// 服务端失败
					if (result.statusCode !== 200) {

						// 判断是否要给提示
						if (options.toase !== false) {
							uni.showToast({
								title: result.data.msg || '服务端失败',
								icon: 'none'
							});
						}
						return rej();
					}

					let data = result.data.data;
					return res(data);
				},

				fail: (error) => {
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej();
				}
			})
		})
	},

	// get请求
	get(url, data = {}, option = {}) {
		option.url = url;
		option.data = data;
		option.method = 'GET';
		return this.request(option);
	},

	// post请求
	post(url, data = {}, option = {}) {
		option.url = url;
		option.data = data;
		option.method = 'POST';
		return this.request(option);
	},
	
	// delete请求
	del(url, data = {}, option = {}) {
		option.url = url;
		option.data = data;
		option.method = 'DELETE';
		return this.request(option);
	}
}
