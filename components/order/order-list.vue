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
			<text class="text-dark font-md ml-auto">共{{ item.totle_num }}件商品,合计: ￥{{ item.totle_price }}</text>
		</view>
		<view class="d-flex j-end a-center px-2 pb-2">
			<view
				class="rounded border border-light-secondary px-2 py-1 text-secondary"
				hover-class="bg-linght-muted"
				@click.stop="openAfterSale"
			>
				申请售后
			</view>
			<view
				class="rounded border border-light-secondary px-2 py-1 text-secondary ml-2"
				hover-class="bg-linght-muted"
				@click.stop="openLogistics"
			>
				查看物流
			</view>
			<view
				class="rounded border border-light-secondary px-2 py-1 text-secondary ml-2"
				hover-class="bg-linght-muted"
			>
				确认收货
			</view>
		</view>
	</view>
</template>

<script>
import orderListItem from '@/components/order/order-list-item.vue';
export default {
	props: {
		item: Object,
		index: Number
	},

	components: {
		orderListItem
	},

	methods: {
		// 打开详情
		openDetail() {
			uni.navigateTo({
				url: '/pages/order-detail/order-detail'
			});
		},

		// 查看物流
		openLogistics() {
			uni.navigateTo({
				url: '/pages/logistics-detail/logistics-detail'
			});
		},

		// 申请售后
		openAfterSale() {
			uni.navigateTo({
				url: '/pages/after-sale/after-sale'
			});
		}
	}
};
</script>

<style></style>
