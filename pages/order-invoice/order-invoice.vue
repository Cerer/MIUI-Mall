<template>
	<!-- 发票 -->
	<view class="bg-white">
		<view class="cutLine "></view>
		<card headTitle="发票类型" bodyPadding>
			<radio-groups :label="label1" :selectIndex.sync="label1.selectIndex"></radio-groups>

			<view class="text-linght-muted line-h-md">
				电子发票与纸质发票具有相同的法律效力，可作为报销、售后、维权凭证，推荐使用电子发票，不怕丢失，更方便，环保。
			</view>
		</card>

		<view class="cutLine"></view>
		<card headTitle="发票抬头" bodyPadding>
			<radio-groups :label="label2" :selectIndex.sync="label2.selectIndex"></radio-groups>
		</card>

		<view class="cutLine"></view>
		<view class="p-2 border-bottom d-flex a-center">
			<text>个人姓名：</text>
			<text class="ml-2">个人</text>
		</view>
		<view class="p-2 border-bottom d-flex a-center">
			<text>发票内容：</text>
			<text class="ml-2">发票明细</text>
		</view>

		<view class="cutLine"></view>
		<view class="p-2 border-bottom d-flex a-center">
			<text>收票人手机：</text>
			<text class="ml-2">130****4567</text>
		</view>
		
		<view class="p-2 text-linght-muted d-flex flex-column font" style="background-color: #EEEEEE;">
			<text>发票须知：</text>
			<text>1.发票为实际支付金额，不包括优惠卷等；</text>
			<text>2.电子发票可在订单完成后，在订单详情中查看；</text>
		</view>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import radioGroups from '@/components/common/radio-group.vue';
export default {
	components: {
		card,
		radioGroups
	},

	data() {
		return {
			label1: {
				selectIndex: 0,
				list: [{ name: '电子发票' }]
			},

			label2: {
				selectIndex: 0,
				list: [{ name: '个人' }, { name: '单位' }]
			}
		};
	}
};
</script>

<style>
page {
	background-color: #eeeeee;
}
</style>
