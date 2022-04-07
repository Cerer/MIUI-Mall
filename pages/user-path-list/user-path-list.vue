<template>
	<!-- 收货地址 -->
	<view>
		<block v-for="(item, index) in list" :key="index">
			<uni-swipe-action :right-options="options">
				<uni-swipe-action-item :right-options="options" @click="bindClick($event, index)">
					<uni-list-item showArrow clickable @click="choose(item)">
						<view slot="body" style="font-size: 28rpx;">
							<view class="text-secondary">
								<view class="d-flex a-center">
									<text class="main-text-color">{{ item.name }}</text>
									{{ item.phone }}
									<text v-if="index === 0 && item.last_used_time !== null" class="main-text-color">[默认]</text>
								</view>

								<view>{{ item.province }} {{ item.city }} {{ item.district }}</view>

								<view>{{ item.address }}</view>
							</view>
						</view>
					</uni-list-item>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</block>

		<!-- 没有数据 -->
		<no-thing v-if="list.length === 0" mag="空空如也"></no-thing>

		<!-- 加载更多 -->
		<view class="all-flex-row text-linght-muted font-md py-3">{{ loadText }}</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue';
import noThing from '@/components/common/no-thing.vue';

export default {
	components: {
		uniListItem,
		uniSwipeAction,
		uniSwipeActionItem,
		noThing
	},

	computed: {
		...mapState({
			list: state => state.path.list
		})
	},

	data() {
		return {
			isChoose: false,
			options: [
				{
					text: '修改',
					style: {
						backgroundColor: '#007AFF'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],

			// 分页码
			page: 1,

			// 1.上拉加载更多 2.加载中... 3.没有更多了
			loadText: '上拉加载更多'
		};
	},

	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			uni.navigateTo({
				url: '/pages/user-path-edit/user-path-edit'
			});
		}
	},

	onLoad(e) {
		if (e.type === 'choose') {
			this.isChoose = true;
		}

		this.getData();
	},

	onShow() {
		this.getData();
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.getData(() => {
			uni.stopPullDownRefresh();
		});
	},

	// 上拉刷新
	onReachBottom() {
		// 是否已经处于加载状态
		if (this.loadText !== '上拉加载更多') return;

		// 改变加载状态
		this.loadText = '加载中...';
		this.page++;

		// 请求数据
		this.getData(false);
	},

	methods: {
		...mapMutations(['updatePathList']),

		// 获取数据
		getData(callback = false) {
			this.api
				.get(
					'/useraddresses/' + this.page,
					{},
					{
						token: true
					}
				)
				.then(res => {
					let refresh = this.page === 1 ? true : false;
					this.updatePathList({
						refresh: refresh,
						list: res
					});

					this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多';

					if (typeof callback === 'function') {
						uni.showToast({
							title: '刷新成功',
							icon: 'none'
						});
						callback();
					}
				})
				.catch(err => {
					if (typeof callback === 'function') {
						callback();
					}

					if (this.page > 1) {
						// 页码回归上一页
						this.page--;
						this.loadText = '上拉加载更多';
					}
				});
		},

		// 点击滑块
		bindClick(e, index) {
			let { content } = e;
			if (content.text === '修改') {
				let obj = {
					item: this.list[index],
					index: index
				};

				// 加上是否默认
				obj.item.default = index === 0 && obj.item.last_used_time !== null ? 1 : 0;

				uni.navigateTo({
					url: '/pages/user-path-edit/user-path-edit?data=' + JSON.stringify(obj)
				});
			} else if (content.text === '删除') {
				this.delData(index);
			}
		},

		// 删除数据
		delData(index) {
			let self = this;
			uni.showModal({
				content: '要删除改收货地址吗?',
				success(res) {
					if (res.confirm) {
						self.api
							.del(
								'/useraddresses/' + self.list[index].id,
								{},
								{
									token: true
								}
							)
							.then(item => {
								uni.showToast({
									title: '删除成功',
									icon: 'none'
								});
								self.getData();
							});
					}
				}
			});
		},

		//点击选择收货地址
		choose(item) {
			if (this.isChoose) {
				//通知订单提交修改收货地址
				uni.$emit('chooesPath', item);

				// 关闭当前页面
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style></style>
