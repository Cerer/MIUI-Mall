<template>
	<view class="border-bottom d-flex a-center py-2 border-light-secondary" @click="open">
		<image
			:src="item.cover"
			mode="widthFix"
			style="width: 150rpx;height: 150rpx;"
			class="rounded mx-2 flex-shrink"
		></image>

		<view class="flex-1">
			<view class="d-flex a-center font-md">
				<text class="text-dark">{{ item.title }}</text>
				<text class="text-linght-muted ml-auto">￥{{ item.pPrice }}</text>
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
				url: '/pages/detail/detail'
			});
		}
	}
};
</script>

<style></style>
