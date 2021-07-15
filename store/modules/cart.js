export default {
	state: {
		number: 1,
		list: [{
				id: 1,
				name: "商品一",
				status: true,
				num: 10

			},
			{
				id: 2,
				name: "商品二",
				status: true,
				num: 1

			},
			{
				id: 3,
				name: "商品三",
				status: false,
				num: 20

			}
		]
	},

	getters: {
		activeList(state) {
			return state.list.filter(v => v.status)
		},

		noActiveList(state) {
			return state.list.filter(v => !v.status)
		},

		getList(state, getters) {
			return getters.activeList.filter(v => v.num > 5)
		},

		getById(state) {
			return (id) => {
				return state.list.filter(v => v.id === id)
			}
		},

		getById: (state) => (id) => {
			return state.list.filter(v => v.id === id)
		}
	},

	mutations: {
		inc(state) {
			state.number++;
		},

		// 传参
		getInc(state, n) {
			state.number += n;
		}
	},

	actions: {
		asyncInc(context) {
			setInterval(() => {
				// context.commit === $store.commit
				context.commit('getInc', 20)
				// console.log(context.state.number)
			}, 2000)
		},

		// 传参数
		// asyncInc(context,n) {
		// 	setInterval(() => {
		// 		// context.commit === $store.commit
		// 		context.commit('getInc', n)
		// 		// console.log(context.state.number)
		// 	}, 2000)
		// },

		// 用解构的写法
		asyncInc({
			commit,
			state
		}, n) {
			setInterval(() => {
				commit('getInc', n)
				// console.log(state.number)
			}, 2000)
		},
	}
}
