<template>
	<!-- 搜索页 -->
	<view>
		<card headTitle="热门搜索" bodyCover="/static/images/search/search-banner.png"></card>

		<!-- 多色按钮 -->
		<view class="px-1 mb-2"><color-tag v-for="(item, index) of hot" :key="index" :item="item"></color-tag></view>

		<!-- 常用分类 -->
		<card headTitle="常用分类" :bodyPadding="true" :headBorderBottom="false">
			<color-tag v-for="(item, index) of cate" :key="index" :item="item" :color="false"></color-tag>
		</card>

		<!-- 分割线 -->
		<view class="cutLine"></view>

		<!-- 搜索记录 -->
		<card headTitle="搜索记录">
			<uniListItem title="小米" :showArrow="false" :showBadge="false"></uniListItem>
			<uniListItem title="小米" :showArrow="false" :showBadge="false"></uniListItem>
		</card>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import colorTag from '@/components/search/color-tag.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	components: {
		card,
		colorTag,
		uniListItem
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
			],

			cate: [
				{
					name: '耳机'
				},
				{
					name: '手机'
				},
				{
					name: '音箱'
				},
				{
					name: '手表'
				},
				{
					name: '配件'
				},
				{
					name: '网关/传感器'
				},
				{
					name: '健康'
				},
				{
					name: '酷玩'
				}
			]
		};
	},

	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			uni.navigateTo({
				url: '/pages/search-list/search-list'
			});
		}
	}
};
</script>

<style></style>
