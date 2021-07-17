<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view
			class="d-flex a-stretch bg-white position-fixed bottom-left-0 right-0"
			style="height: 100rpx;z-index: 100;"
		>
			<view class="flex-1 all-flex-column line-h-md" hover-class="bg-linght-muted">
				<view class="iconfont icon-xihuan text-muted line-h-md"></view>
				收藏
			</view>
			<view class="flex-1 all-flex-column line-h-md" hover-class="bg-linght-muted" @tap="toCart">
				<view class="iconfont icon-gouwuche text-muted line-h-md"></view>
				购物车
			</view>
			<view
				class="all-flex-row font-md main-bg-color text-white"
				hover-class="main-bg-hover-color"
				style="flex: 2.5;"
				@tap="$emit('show')"
			>
				加入购物车
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		// 跳转到购物车
		toCart() {
			uni.switchTab({
				url: '/pages/cart/cart'
			});
		}
	}
};
</script>

<style></style>
