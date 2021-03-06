import api from "@/common/lib/request.js"
import util from '@/utils/util.js';
export default {
	state: {
		list: [],

		// 放置选中的数据id
		selectedList: [],

		// 属性选中显示
		popupShow: 'none',

		// 当前商品索引
		popupIndex: -1,

		// 当前商品属性数据
		popupData: {}
	},

	getters: {
		// 判断是否全选
		checkedAll: (state) => {
			return state.list.length === state.selectedList.length
		},

		// 合计
		totalPrice: (state) => {
			let total = 0;
			state.list.forEach(v => {
				if (state.selectedList.indexOf(v.id) > -1) {
					total += v.pprice * v.num;
				}
			});
			return total;
		},

		// 禁用全选
		disabledSelectAll: (state) => {
			return state.list.length === 0;
		},

		// 购物车商品数量
		cartCount: (state) => {
			if (state.list.length <= 99) {
				return state.list.length;
			}
			return '99+'
		}
	},

	mutations: {
		// 初始化数据
		initCartData(state, list) {
			state.list = list;
			util.updateCartBadge(state.list.length);
		},

		// 选中/取消某一个商品
		selectItem(state, index) {
			let id = state.list[index].id;
			let i = state.selectedList.indexOf(id);

			// 取消数据
			if (i > -1) {
				// 取消当前商品选中状态
				state.list[index].checked = false;

				// 移除取消数据
				return state.selectedList.splice(i, 1);
			}

			// 选中数据
			state.list[index].checked = true;
			state.selectedList.push(id);
		},

		// 全选
		selectedAll(state) {
			state.selectedList = state.list.map(v => {
				// 设置选中状态
				v.checked = true;
				return v.id;
			})
		},

		// 取消全选
		unSelectedAll(state) {
			state.list.forEach(v => {
				// 设置选中状态
				v.checked = false;
			})

			state.selectedList = [];
		},

		// 删除选中数据
		delGoods(state) {
			state.list = state.list.filter(v => {
				// 返回没有选中的数据，就相当于把选中的数据删除掉
				return state.selectedList.indexOf(v.id) === -1;
			})
			util.updateCartBadge(state.list.length);
		},

		// 初始化popupIndex
		initPopupIndex(state, index) {
			state.popupIndex = index;
		},

		// 加入购物车
		addGoodsToCart(state, goods) {
			state.list.unshift(goods);
			util.updateCartBadge(state.list.length);
		},

		// 清空购物车
		clearCart(state) {
			state.list = [];
			state.selectedList = [];
			util.updateCartBadge(state.list.length);
		}
	},

	actions: {
		// 更新购物车列表
		updateCartList({
			commit,
			state
		}) {
			return new Promise((res, rej) => {
				api.get('/cart', {}, {
						token: true,
						toase: false
					}).then(item => {
						// 取消全选
						commit('unSelectedAll');

						// 赋值
						commit('initCartData', item);
						res(item)
					})
					.catch(err => {
						rej(err)
					});
			})
		},

		// 显示属性选显卡
		doShowPopup({
			commit,
			state
		}, {
			index,
			data
		}) {
			commit('initPopupIndex', index);
			state.popupData = data;
			state.popupData.item = state.list[index];
			state.popupShow = 'show';
		},

		// 隐藏属性选显卡
		doHidePopup({
			commit,
			state
		}) {
			state.popupShow = 'hide';
			setTimeout(() => {
				state.popupShow = 'none';
				commit('initPopupIndex', -1)
			}, 200)
		},

		// 取消全选/全选
		doSelectedAll({
			commit,
			getters
		}) {
			getters.checkedAll ? commit('unSelectedAll') : commit('selectedAll');
		},

		// 删除选中数据
		doDelGoods({
			state,
			commit,
			getters
		}) {
			// 先判断有没有选中数据
			if (state.selectedList.length === 0) {
				return uni.showToast({
					title: '请选择要删除的商品',
					icon: 'none'
				});
			}

			uni.showModal({
				content: "是否删除选中数据?",
				success(res) {
					if (res.confirm) {
						api.post('/cart/delete', {
							shop_ids: state.selectedList.join(',')
						}, {
							token: true
						}).then(item => {
							commit('delGoods');
							commit('unSelectedAll');
							uni.showToast({
								title: "删除成功",
								icon: "none"
							})
						})
					}

				}
			})
		}
	}
}
