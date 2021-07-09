<template>
	<view>
		<card headTitle="热门搜索" bodyCover="/static/images/search/search-banner.png"></card>

		<!-- 多色按钮 -->
		<view class="px-1 mb-2"><color-tag v-for="(item, index) of hot" :key="index" :item="item"></color-tag></view>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import colorTag from '@/components/search/color-tag.vue';
export default {
	components: {
		card,
		colorTag
	},

	data() {
		return {
			hot: [
				{
					name: '领卷中心'
				},
				{
					name: 'Redmi K20'
				},
				{
					name: 'RedmiBook 14'
				},
				{
					name: '智能积木 越野四驱车'
				},
				{
					name: '手环 腕带'
				}
			]
		};
	}
};
</script>

<style></style>
