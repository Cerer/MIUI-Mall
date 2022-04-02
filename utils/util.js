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

module.exports = {
	randomLenNum,
	formatDecimal
};
