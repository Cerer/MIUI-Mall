/**
	常用工具函数
 */

//1.生成随机len位数字
const randomLenNum = (len, date) => {
	let random = '';
	random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4);
	if (date) random = random + Date.now();
	return random;
}

// 2.保留小数，不四舍五入（22.44555，2）=>22.44
const formatDecimal = (num, decimal) => {
	num = num.toString();
	let index = num.indexOf('.');
	if (index !== -1) {
		num = num.substring(0, decimal + index + 1);
	} else {
		num = num.substring(0);
	}
	return parseFloat(num).toFixed(decimal);
}

// 3.更新购物车tabbar角标
const updateCartBadge = (count) => {
	if (count > 0) {
		return uni.setTabBarBadge({
			index: 2,
			text: count.toString()
		});
	}
	uni.removeTabBarBadge({
		index: 2
	});
}

//4.判断订单状态
const formatStatus = (order) => {
	if (!order) {
		return '';
	}

	// 未支付
	if (!order.paid_time) {
		return '待支付';
	}

	// 退款情况
	if (order.refund_status !== 'pending') {
		switch (order.refund_status) {
			case 'applied':
				return '退款中'
				break;
			case 'success':
				return '退款成功'
				break;
			case 'failed':
				return '退款失败'
				break;
		}
	}

	switch (order.ship_status) {
		case 'pending':
			return '待发货'
			break;
		case 'delivered':
			return '待收货'
			break;
		case 'received':
			return '已签收'
			break;
	}
}

//5.倒计时
const timeDown = (endTime) => {
	//获取时间差
	let now = new Date().getTime() / 1000;
	let totalSeconds = parseInt(endTime - now);

	// 天数
	let days = Math.floor(totalSeconds / (60 * 60 * 24));

	// 取模（余数）
	let modulo = totalSeconds % (60 * 60 * 24);

	// 小时数
	let hours = Math.floor(modulo / (60 * 60));
	modulo = modulo % (60 * 60);

	// 分钟
	let minutes = Math.floor(modulo / 60);

	// 秒
	let seconds = modulo % 60;
	
	// 输出还剩多少时间
	return `${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`
}

module.exports = {
	randomLenNum,
	formatDecimal,
	updateCartBadge,
	formatStatus,
	timeDown
};
