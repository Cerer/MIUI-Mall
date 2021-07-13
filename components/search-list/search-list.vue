<template>
	<view class="row p-2 border-bottom border-light-secondary animate__animated animate__fadeIn animate__faster">
		<view class="span-6"><image :src="item.titlePic" mode="widthFix" class="w-100"></image></view>
		<view class="span-14 pl-3 d-flex flex-column">
			<view class="font-md font-weight">{{ item.title }}</view>
			<view class="font text-linght-muted line-h-md mb-auto">{{ item.desc }}</view>
			<price>{{ item.pPrice }}</price>
			<view class="font-sm text-linght-muted">{{ item.comment_num }} 条评论 {{ item.good_num }}满意</view>
		</view>
	</view>
</template>

<script>
import price from '@/components/common/price.vue';
export default {
	props: {
		item: Object,
		index: Number
	},

	components: {
		price
	}
};
</script>

<style></style>
