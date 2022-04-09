<template>
	<!-- 支付成功 -->
	<view class="">
		<view class="all-flex-column py-5 my-3">
			<text class="iconfont icon-xuanzhong main-text-color line-h-sm" style="font-size: 120rpx;"></text>
			<text class="text-dark font-md">支付成功</text>
		</view>

		<view class="px-5">
			<view
				class="rounded main-bg-color text-white font-md w-100 py-2 mt-3 text-center"
				hover-class="main-bg-hover-color"
				@click="openDetail"
			>
				查看订单
			</view>
			<view class="rounded font-md w-100 py-2 mt-3 text-center border" hover-class="bg-light" @click="openIndex">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},

	methods: {
		// 查看订单
		openDetail() {
			uni.navigateBack({
				delta: 1
			});
		},

		// 返回首页
		openIndex() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style></style>
