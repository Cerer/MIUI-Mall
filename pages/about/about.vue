<!-- 关于商城 -->
<template>
	<view class="">
		<view class="d-flex flex-column j-center a-center py-5 my-3">
			<image
				src="/static/images/index/contentImag/demo5.jpg"
				mode="widthFix"
				style="width: 100rpx;height: 100rpx;"
			></image>

			<view class="text-linght-muted font-md">xxx商城1.0.0</view>
		</view>

		<view v-for="(item, index) of list" :key="index">
			<uni-list-item :title="item.title" showArrow></uni-list-item>
		</view>
	</view>
</template>

<script>
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniListItem
	},

	data() {
		return {
			list: [
				{
					title: '版本更新'
				},
				{
					title: '了解小米'
				},
				{
					title: '官方微博'
				},
				{
					title: '廉洁小米'
				},
				{
					title: 'APP分享'
				},
				{
					title: '授权直供店'
				},
				{
					title: '清除缓存'
				}
			]
		};
	}
};
</script>

<style>
page {
	background: #eeeeee;
}
</style>
