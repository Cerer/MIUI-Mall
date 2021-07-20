<template>
	<!-- 空白页 -->
	<view class="position-absolute all-flex-column all-direction-0">
		<image :src="getIcon" mode="widthFix" style="width: 250rpx;"></image>
		<view class="" style="color: #B2B2B2;">{{ mag }}</view>
	</view>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: 'no_comment'
		},
		mag: {
			type: String,
			default: '您还没有待付款订单'
		}
	},

	computed: {
		getIcon() {
			return `/static/images/nothing/${this.icon}.png`;
		}
	}
};
</script>

<style></style>
