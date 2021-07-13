<template>
	<view class="">
		<!-- 商品详情大图 -->
		<com-swiper :resdata="banners" height="750" :preview="true"></com-swiper>

		<!-- 基础详情 -->
		<detail-info :detail="detail"></detail-info>

		<!-- 滚动商品特性 -->
		<scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>
	</view>
</template>

<script>
import comSwiper from '@/components/index/com-swiper.vue';
import detailInfo from '@/components/detail/detail-info.vue';
import scrollAttrs from '@/components/detail/scroll-attrs.vue';

export default {
	components: {
		comSwiper,
		detailInfo,
		scrollAttrs
	},

	data() {
		return {
			banners: [
				{
					src: '/static/images/detail/1.webp'
				},
				{
					src: '/static/images/detail/2.webp'
				}
			],

			detail: {
				title: '小米MIX3 6GB+128GB',
				desc: '磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电',
				pPrice: 3299
			},

			baseAttrs: [
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				}
			]
		};
	}
};
</script>

<style></style>
