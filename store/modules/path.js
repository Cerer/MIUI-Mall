export default {
	state: {
		list: [{
				name: '关关雎鸠',
				phone: '130****5410',
				path: '广州市 天河区 **街道',
				detailPath: '**街道',
				isDefault: false
			},
			{
				name: '关关雎鸠',
				phone: '130****5410',
				path: '广州市 天河区 **街道',
				detailPath: '**街道',
				isDefault: false
			}
		]
	},

	getters: {
		// 获取默认地址
		defalutPath: (state) => {
			return state.list.filter(v => v.isDefault)
		}
	},

	mutations: {
		// 创建收货地址
		createPath(state, item) {
			state.list.unshift(item);
		},

		// 编辑收货地址
		updatePath(state, {
			item,
			index
		}) {
			for (let key in item) {
				state.list[index][key] = item[key];
			}
		},

		// 取消默认地址
		removeDefault(state) {
			state.list.forEach(v => {
				if (v.isDefault) {
					v.isDefault = false;
				}
			})
		},

		// 删除收货地址
		delPath(state, index) {
			state.list.splice(index, 1)
		}
	},

	actions: {
		// 创建数据
		doCreatePath({
			commit,
			state
		}, item) {
			if (item.isDefault) {
				commit('removeDefault')
			}
			commit('createPath', item)
			uni.navigateBack({
				delta: 1
			})
			setTimeout(() => {
				uni.showToast({
					title: '创建成功',
					icon: 'none'
				})
			})
		},

		// 编辑数据
		doUpdatePath({
			commit,
			state
		}, obj) {
			if (obj.item.isDefault) {
				commit('removeDefault')
			}
			commit('updatePath', obj)
			uni.navigateBack({
				delta: 1
			})
			setTimeout(() => {
				uni.showToast({
					title: '修改成功',
					icon: 'none'
				})
			})
		},

		// 删除数据
		doDelPath({
			commit,
			state
		}, index) {
			uni.showModal({
				content: '要删除改收货地址吗?',
				success() {
					commit('delPath', index);
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
				}
			})
		}
	}
}
