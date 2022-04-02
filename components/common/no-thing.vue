<template>
	<!-- 空白页 -->
	<view class="d-flex flex-column a-center j-center h-100" style="background-color: #F5F5F5;">
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
