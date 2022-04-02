<template>
	<view style="width: 372.5upx;" @tap="openDetail">
		<image :src="item.cover" style="width: 372.5upx;" mode="widthFix" lazy-load></image>
		<view class="p-2 pt-1">
			<view class="font-md text-linght-muted">{{ item.title }}</view>
			<text class="d-block font">{{ item.desc }}</text>
			<view class="d-flex">
				<price>{{ item.pprice }}</price>
				<view class="font-sm text-linght-muted line-h-through ml-1 a-self-end line-h">￥{{ item.oprice }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import price from '@/components/common/price.vue';
export default {
	components: {
		price
	},
	props: {
		item: Object,
		index: Number
	},

	methods: {
		openDetail() {
			uni.redirectTo({
				url: '/pages/detail/detail?detail=' + JSON.stringify(this.item)
			});
		}
	}
};
</script>

<style scoped></style>
