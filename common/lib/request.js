// 封装接口

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
	request(option = {}) {
		// 组织参数
		option.url = this.common.baseUrl + option.url;
		option.header = option.header || this.common.header;
		option.data = option.data || this.common.data;
		option.method = option.method || this.common.method;
		option.dataType = option.dataType || this.common.dataType;

		// 请求
		return new Promise((res, rej) => {
			uni.request({
				...option,
				success: (result) => {
					// 服务端失败
					if (result.statusCode !== 200) {
						uni.showToast({
							title: result.data.msg || '服务端失败',
							icon: 'none'
						});
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
	}
}
