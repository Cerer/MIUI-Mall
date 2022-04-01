<template>
	<view class="p-2">
		<view class="font-lg">{{ detail.title }}</view>
		<view class="font text-linght-muted mb-3 line-h-sm">{{ detail.desc }}</view>
		<price priceSize="font-lg" unitSize="font">{{ showPrice }}</price>
	</view>
</template>

<script>
import price from '@/components/common/price.vue';
export default {
	props: {
		detail: Object,

		showPrice: [String, Number]
	},

	components: {
		price
	}
};
</script>

<style></style>
