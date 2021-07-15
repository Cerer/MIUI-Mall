<template>
	<view>
		<view class="p-2">
			<view class="d-flex a-center py-2 border-bottom border-light-secondary">
				<text class="text-muted">用户评价(1234)</text>
				<text class="main-text-color ml-auto mr-1">98%</text>
				<text class="text-muted">满意</text>
			</view>
			<view class="d-flex flex-wrap pt-2" style="margin-right: -20rpx;">
				<view
					class="px-2 py border rounded mr-2 mb-2 cate-item"
					v-for="(item, index) in cateList"
					:key="index"
					:class="cateIndex === index ? 'active' : ''"
					@tap="cateChange(index)"
				>
					{{ item.name }}
				</view>
			</view>
		</view>

		<view class="cutLine"></view>

		<view class="p-2 d-flex a-start border-bottom border-light-secondary">
			<image
				src="/static/images/index/contentImag/demo6.jpg"
				mode="widthFix"
				style="width: 90rpx;height: 90rpx;"
				class="rounded flex-shrink"
			></image>

			<view class="pl-2 flex-1">
				<view class="d-flex a-center">
					<text class="font-md font-weight text-primary mr-auto">窈窕淑女</text>
					<view class="iconfont icon-service main-text-color"><text class="pl-1 font">超好</text></view>
				</view>

				<view class="font-md line-h-md">非常好</view>

				<!-- 图片 -->
				<view class="row">
					<view class="span24-8 px pb">
						<image
							src="/static/images/index/contentImag/demo9.jpg"
							mode="widthFix"
							style="width: 200rpx;"
						></image>
					</view>
				</view>

				<!-- 时间，点赞，评论数 -->
				<view class="d-flex a-center">
					<text class="text-linght-muted mr-auto">2021-7-15</text>
					<view class="d-flex text-linght-muted a-center mr-1">
						0
						<text class="iconfont icon-dianzan1 text-muted ml"></text>
					</view>
					<view class="d-flex text-linght-muted a-center">
						10
						<text class="iconfont icon-pinglun text-muted ml"></text>
					</view>
				</view>

				<!-- 客服回复 -->
				<view class="d-flex a-center flex-wrap bg-linght-muted rounded p-2 mt-1">
					<text class="main-text-color">官方回复：</text>
					官方回复官方回复官方回复官方回复官方回复官方回复hahahahhahahahahahah
					<view class="iconfont icon-dianzan1 text-linght-muted line-h-md font">
						<text class="text-muted pl-1">赞客服 120</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cateIndex: 0,
			cateList: [
				{ name: '全部' },
				{ name: '有图' },
				{ name: '非常喜欢' },
				{ name: '拍照好' },
				{ name: '手感很棒' },
				{ name: '效果好' },
				{ name: '性能很棒' }
			]
		};
	},

	methods: {
		// 点击选择按钮
		cateChange(index) {
			this.cateIndex = index;
		}
	}
};
</script>

<style scoped>
.cate-item {
	background: #ffebec;
	color: #7b6d6c;
	border-color: #f4e0e1;
}

.cate-item.active {
	background: #ff6b01 !important;
	color: #ffffff !important;
	border-color: #de7232 !important;
}
</style>
