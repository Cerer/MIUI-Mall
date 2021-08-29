<!-- 申请售后 -->
<template>
	<view class="">
		<view class="cutLine"></view>

		<card headTitle="申请售后的产品" class="bg-white">
			<view class="d-flex a-center px-3 py-2 ">
				<image
					src="/static/images/cate/cate_02.png"
					mode="widthFix"
					style="width: 100rpx;height: 100rpx;"
				></image>

				<view class="flex-1 ml-3">
					<view class="font-md font-weight">商品名称</view>
					<view class="font-sm text-linght-muted">维修服务：剩余111天</view>
				</view>
			</view>
		</card>

		<view class="cutLine"></view>

		<card headTitle="服务类型" bodyPadding class="bg-white">
			<radio-groups :label="label1" :selectIndex.sync="label1.selectIndex"></radio-groups>
		</card>

		<view class="cutLine"></view>

		<card headTitle="问题描述" bodyPadding class="bg-white">
			<view class="position-relative">
				<textarea
					v-model="content"
					class="border rounded p-2"
					placeholder="请详细描述一下你遇到的问题"
					:maxlength="maxlength"
					style="width: 100%;height: 400rpx;box-sizing: border-box;"
				/>
				<view class="position-absolute text-linght-muted font" style="right: 5rpx;bottom: 5rpx;">
					{{ content.length }}/{{ maxlength }}
				</view>
			</view>
		</card>

		<view class="p-3">
			<view class="rounded main-bg-color text-white text-center font-md py-2" hover-class="main-bg-hover-color">
				下一步
			</view>
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
				list: [{ name: '维修' }]
			},

			maxlength: 50,

			content: ''
		};
	}
};
</script>

<style>
page {
	background-color: #eeeeee;
}
</style>
