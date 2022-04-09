<!-- 优惠券 -->
<template>
	<view class="p-3">
		<coupon v-for="(item, index) in list" :key="index" :item="item" :index="index" @onClick="getCoupon(item)">
			<text v-if="!item.status">已失效</text>
			<text v-else-if="item.disabled">已领取</text>
			<text v-else>马上领取</text>
		</coupon>

		<!-- 加载更多 -->
		<view v-if="list.length > 0" class="all-flex-row text-linght-muted font-md py-3">{{ loadText }}</view>

		<!-- 没有数据 -->
		<no-thing v-else mag="没有优惠券"></no-thing>
	</view>
</template>

<script>
import coupon from '@/components/order-coupon/coupon.vue';
import noThing from '@/components/common/no-thing.vue';
export default {
	components: {
		coupon,
		noThing
	},

	data() {
		return {
			list: [],

			// 分页数
			page: 1,

			// 1.上拉加载更多 2.加载中... 3.没有更多了
			loadText: '上拉加载更多'
		};
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.getData(true)
			.then(res => {
				uni.stopPullDownRefresh();
			})
			.catch(err => {
				uni.stopPullDownRefresh();
			});
	},

	// 上拉加载
	onReachBottom() {
		if (this.loadText !== '上拉加载更多') return;
		this.loadText = '加载中...';
		this.page++;
		this.getData();
	},

	onLoad() {
		this.getData();
	},

	methods: {
		// 获取数据
		getData(refresh = false) {
			let self = this;
			return new Promise((res, rej) => {
				self.api
					.get(
						'/coupon/' + self.page,
						{},
						{
							token: true
						}
					)
					.then(item => {
						let list = item.map(i => {
							let nowTime = new Date().getTime();
							let status = i.end_time > nowTime / 1000 && i.status;

							return {
								id: i.id,
								title: i.name,
								start_time: i.start_time,
								end_time: i.end_time,
								price: i.value,
								desc: i.desc,
								status, //false已失效
								disabled: i.coupon_user.length > 0 //true已领取
							};
						});

						self.list = !refresh ? [...self.list, ...list] : [...list];

						self.loadText = item.length < 10 ? '没有更多了' : '上拉加载更多';

						res(item);
					})
					.catch(err => {
						this.page--;
						rej(err);
					});
			});
		},

		//领取优惠券
		getCoupon(item) {
			let self = this;
			self.api
				.post(
					'/getcoupon/' + item.id,
					{},
					{
						token: true
					}
				)
				.then(res => {
					// 设为已领取状态
					item.disabled = true;
					uni.showToast({
						title: '领取成功',
						icon: 'none'
					});
				});
		}
	}
};
</script>

<style></style>
