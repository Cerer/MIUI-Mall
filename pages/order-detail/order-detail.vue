<template>
	<view class="">
		<view class="main-bg-color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">卖家已发货</view>
				<view class="font">还差7天10时自动确认</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>

		<view class="p-3 bg-white">
			<view class="text-linght-muted font-md">
				<text class="font-lg text-dark mr-2">关关雎鸠</text>
				150****1234
			</view>
			<view class="text-linght-muted font-md">广东省 广州市 珠海去 海罗大道东</view>
		</view>

		<view class="cutLine"></view>

		<view class="px-2 bg-white">
			<block v-for="(item, index) in order_items" :key="index">
				<order-list-item :item="item" :index="index"></order-list-item>
			</block>
		</view>

		<view class="cutLine"></view>

		<uni-list-item>
			<view slot="body" class="font-md text-linght-muted">商品总价</view>
			<view slot="footer" class="font-md text-linght-muted ml-auto">￥123.01</view>
		</uni-list-item>
	</view>
</template>

<script>
import orderListItem from '@/components/order/order-list-item.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	components: {
		orderListItem,
		uniListItem
	},

	data() {
		return {
			order_items: [
				{
					cover: '/static/images/list/5.jpg',
					title: '小米8',
					pPrice: 1999.0,
					attrs: '金色 标配',
					num: 1
				},
				{
					cover: '/static/images/list/5.jpg',
					title: '小米8',
					pPrice: 1999.0,
					attrs: '金色 标配',
					num: 1
				}
			]
		};
	}
};
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>
