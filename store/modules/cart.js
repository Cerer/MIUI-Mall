export default {
	state: {
		list: [{
				checked: false,
				id: '1',
				title: '商品标题11',
				cover: '/static/images/list/1.jpg',
				// 选中商品属性
				attrs: [{
						title: '颜色',
						selectIndex: 0,
						list: [{
							name: '火焰红'
						}, {
							name: '炭黑'
						}, {
							name: '冰川兰'
						}]
					},
					{
						title: '容量',
						selectIndex: 0,
						list: [{
							name: '64GB'
						}, {
							name: '128GB'
						}]
					},
					{
						title: '套餐',
						selectIndex: 0,
						list: [{
							name: '标配'
						}, {
							name: '套餐一'
						}, {
							name: '套餐二'
						}]
					}
				],
				pPrice: 3360,
				num: 1,
				minNum: 1,
				maxNum: 100
			},
			{
				checked: false,
				id: '2',
				title: '商品标题11',
				cover: '/static/images/list/1.jpg',
				// 选中商品属性
				attrs: [{
						title: '颜色',
						selectIndex: 0,
						list: [{
							name: '火焰红'
						}, {
							name: '炭黑'
						}, {
							name: '冰川兰'
						}]
					},
					{
						title: '容量',
						selectIndex: 0,
						list: [{
							name: '64GB'
						}, {
							name: '128GB'
						}]
					},
					{
						title: '套餐',
						selectIndex: 0,
						list: [{
							name: '标配'
						}, {
							name: '套餐一'
						}, {
							name: '套餐二'
						}]
					}
				],
				pPrice: 3360,
				num: 1,
				minNum: 1,
				maxNum: 100
			},
			{
				checked: false,
				id: '3',
				title: '商品标题11',
				cover: '/static/images/list/1.jpg',
				// 选中商品属性
				attrs: [{
						title: '颜色',
						selectIndex: 0,
						list: [{
							name: '火焰红'
						}, {
							name: '炭黑'
						}, {
							name: '冰川兰'
						}]
					},
					{
						title: '容量',
						selectIndex: 0,
						list: [{
							name: '64GB'
						}, {
							name: '128GB'
						}]
					},
					{
						title: '套餐',
						selectIndex: 0,
						list: [{
							name: '标配'
						}, {
							name: '套餐一'
						}, {
							name: '套餐二'
						}]
					}
				],
				pPrice: 3360,
				num: 1,
				minNum: 1,
				maxNum: 100
			}
		],

		// 放置选中的数据id
		selectedList: [],

		// 属性选中显示
		popupShow: 'none',

		// 当前商品索引
		popupIndex: -1

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
					total += v.pPrice * v.num;
				}
			});
			return total;
		},

		// 禁用全选
		disabledSelectAll: (state) => {
			return state.list.length === 0;
		},

		// 拿到当前需要修改属性的商品
		popupData: (state) => {
			return state.popupIndex > -1 ? state.list[state.popupIndex] : {}
		}
	},

	mutations: {
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
		},

		// 初始化popupIndex
		initPopupIndex(state, index) {
			state.popupIndex = index;
		},

		// 加入购物车
		addGoodsToCart(state, goods) {
			state.list.unshift(goods)
		}
	},

	actions: {
		// 显示属性选显卡
		doShowPopup({
			commit,
			state
		}, index) {
			commit('initPopupIndex', index)
			state.popupShow = 'show';
		},

		// 隐藏属性选显卡
		doHidePopup({
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
			commit,
			getters
		}) {
			uni.showModal({
				content: "是否删除选中数据?",
				success() {
					commit('delGoods');
					uni.showToast({
						title: "删除成功",
						icon: "none"
					})
				}
			})
		}
	}
}
