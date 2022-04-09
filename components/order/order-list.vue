<template>
	<view class="bg-white" @click.stop="openDetail">
		<view class="cutLine"></view>

		<!-- 头部 -->
		<view class="d-flex a-center p-2 border-bottom border-light-secondary">
			<text class="text-linght-muted font-md">{{ item.create_time }}</text>
			<text class="main-text-color font-md ml-auto">{{ item.status }}</text>
		</view>

		<!-- 身体 -->
		<view class="px-2">
			<block v-for="(order, orderIndex) in item.order_items" :key="orderIndex">
				<order-list-item :item="order" :index="orderIndex"></order-list-item>
			</block>
		</view>

		<!-- 底部 -->
		<view class="d-flex a-center p-2">
			<text class="text-dark font-md ml-auto">共{{ item.order_items.length }}件商品,合计: ￥{{ item.total_price }}</text>
		</view>
		<view class="d-flex j-end a-center px-2 pb-2">
			<template v-if="item.status === '待支付'">
				<common-button @click="openPayMethods">去支付</common-button>
				<common-button @click="closeOrder">取消订单</common-button>
			</template>
			<template v-else-if="item.status === '待发货'">
				<common-button>提醒发货</common-button>
				<common-button @click="applyRefund">申请退款</common-button>
			</template>
			<template v-else-if="item.status === '待收货'">
				<common-button @click="openLogistics">查看物流</common-button>
				<common-button @click="received">确认收货</common-button>
			</template>
			<template v-else>
				<common-button @click="openDetail">查看详情</common-button>
			</template>
		</view>
	</view>
</template>

<script>
import orderListItem from '@/components/order/order-list-item.vue';
import commonButton from '../common/common-button.vue';
export default {
	props: {
		item: Object,
		index: Number
	},

	components: {
		orderListItem,
		commonButton
	},

	methods: {
		//去支付
		openPayMethods() {
			let self = this;
			//跳转到支付页面
			uni.navigateTo({
				url:
					'/pages/pay-methods/pay-methods?detail=' +
					JSON.stringify({
						id: self.item.id,
						price: self.item.total_price
					})
			});
		},

		//取消订单
		closeOrder() {
			let self = this;
			uni.showModal({
				content: '是否要取消该订单?',
				success: res => {
					if (res.confirm) {
						uni.showLoading({
							title: '取消订单中...',
							mask: false
						});

						self.api
							.post(
								`/closeorder/${self.item.id}`,
								{},
								{
									token: true
								}
							)
							.then(res => {
								uni.hideLoading();
								uni.showToast({
									title: '取消订单成功',
									icon: 'none'
								});
								self.$emit('update');
							})
							.catch(err => {
								uni.hideLoading();
							});
					}
				}
			});
		},

		//申请退款
		applyRefund() {
			let self = this;
			uni.navigateTo({
				url:
					'/pages/order-refund/order-refund?detail=' +
					JSON.stringify({
						id: self.item.id
					})
			});
		},

		// 查看物流(这块的数据因为还没有获取到数据，所以还没有校验是否正确返回显示)
		openLogistics() {
			let self = this;
			uni.navigateTo({
				url:
					'/pages/logistics-detail/logistics-detail?detail=' +
					JSON.stringify({
						id: self.item.id
					})
			});
		},

		//确认收货(目前因为还没有数据，所以还没有校验接口是否能通)
		received() {
			let self = this;
			uni.showModal({
				content: '是否要确认收货?',
				success: res => {
					if (res.confirm) {
						uni.showLoading({
							title: '确认收货中...',
							mask: false
						});
						self.api
							.post(
								`/order/${self.item.id}/received`,
								{},
								{
									token: true
								}
							)
							.then(item => {
								uni.hideLoading();
								uni.showToast({
									title: '确认收货成功',
									icon: 'none'
								});
								self.$emit('update');
							})
							.catch(err => {
								uni.hideLoading();
							});
					}
				}
			});
		},

		// 打开详情
		openDetail() {
			let self = this;
			uni.navigateTo({
				url: '/pages/order-detail/order-detail?order_id=' + self.item.id
			});
		}
	}
};
</script>

<style></style>
