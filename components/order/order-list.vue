<template>
	<view class="bg-white">
		<view class="cutLine"></view>
		
		<!-- 头部 -->
		<view class="d-flex a-center p-2 border-bottom border-light-secondary">
			<text class="text-linght-muted font-md">{{ item.create_time }}</text>
			<text class="main-text-color font-md ml-auto">{{ item.status }}</text>
		</view>

		<!-- 身体 -->
		<view class="px-2">
			<view
				class="border-bottom d-flex a-center py-2 border-light-secondary"
				v-for="(item2, index2) in item.order_items"
				:key="index2"
			>
				<image
					:src="item2.cover"
					mode="widthFix"
					style="width: 150rpx;height: 150rpx;"
					class="rounded mx-2 flex-shrink"
				></image>

				<view class="flex-1">
					<view class="d-flex a-center font-md">
						<text class="text-dark">{{ item2.title }}</text>
						<text class="text-linght-muted ml-auto">￥{{ item2.pPrice }}</text>
					</view>
					<view class="d-flex a-center font text-linght-muted">
						<text class="">{{ item2.attrs }}</text>
						<text class="ml-auto">x{{ item2.num }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="d-flex a-center p-2">
			<text class="text-dark font-md ml-auto">共{{ item.totle_num }}件商品,合计: ￥{{ item.totle_price }}</text>
		</view>
		<view class="d-flex j-end a-center px-2 pb-2">
			<view class="rounded border border-light-secondary px-2 py-1 text-secondary" hover-class="bg-linght-muted">
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
export default {
	props: {
		item: Object,
		index: Number
	}
};
</script>

<style></style>
