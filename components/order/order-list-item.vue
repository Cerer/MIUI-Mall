<template>
	<view class="border-bottom d-flex a-center py-2 border-light-secondary" @tap.stop="open">
		<image :src="item.cover" mode="widthFix" style="width: 150rpx;height: 150rpx;" class="rounded mx-2 flex-shrink"></image>

		<view class="flex-1">
			<view class="d-flex a-center font-md">
				<text class="text-dark">{{ item.title }}</text>
				<text class="text-linght-muted ml-auto">￥{{ item.pprice }}</text>
			</view>
			<view class="d-flex a-center font text-linght-muted">
				<text class="">{{ item.attrs }}</text>
				<text class="ml-auto">x{{ item.num }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	},

	methods: {
		open() {
			uni.navigateTo({
				url: '/pages/detail/detail?detail=' + JSON.stringify(this.item)
			});
		}
	}
};
</script>

<style></style>
