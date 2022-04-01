<!-- 横向滚动评论 -->
<template>
	<view class="p-2">
		<scroll-view scroll-x class="scroll-row">
			<view
				class="scroll-row-item rounded mr-2 p-2"
				style="width: 620rpx;height: 380rpx;background-color: #f5f3f7;"
				v-for="(item, index) of comments"
				:key="index"
			>
				<view class="d-flex a-center mb-1">
					<image :src="item.userPic" mode="widthFix" style="width: 70rpx;height: 70rpx;" class="rounded-circle"></image>

					<view class="ml-2">
						<text class="font-md line-h">{{ item.userName }}</text>
						<text class="d-block font text-linght-muted line-h">{{ item.create_time }}</text>
					</view>

					<view class="iconfont icon-dianzan1 font text-linght-muted pl-1 ml-auto">{{ item.goods_num }}</view>
				</view>

				<text class="d-block font-md mb-2 line-h-sm" style="white-space:normal">{{ item.content }}</text>

				<view class="row">
					<view class="span24-8 px-2" v-for="(item2, index2) of item.imgList" :key="index2">
						<image :src="item2" mode="widthFix" style="width: 160rpx;" class="rounded"></image>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="all-flex-row py-2 mt-2 text-primary" hover-class="bg-linght-muted" @click="open">
			更多评论
			<view class="iconfont icon-you"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['comments', 'goods_id'],

	methods: {
		// 打开评论列表
		open() {
			uni.navigateTo({
				url: '/pages/detail-comment/detail-comment?goods_id=' + this.goods_id
			});
		}
	}
};
</script>

<style></style>
