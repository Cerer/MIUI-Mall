<template>
	<!-- 用户个人资料 -->
	<view class="">
		<view class="cutLine"></view>
		<uni-list-item title="头像">
			<block slot="footer">
				<image
					src="/static/images/index/contentImag/demo6.jpg"
					style="width: 90rpx;height: 90rpx;"
					class="rounded-circle border border-secondary"
				></image>
			</block>
		</uni-list-item>
		<uni-list-item title="姓名">
			<block slot="footer"><text class="font text-muted">关关雎鸠</text></block>
		</uni-list-item>
		<uni-list-item title="性别" showArrow></uni-list-item>
		<uni-list-item title="生日" showArrow></uni-list-item>

		<view class="cutLine"></view>
		<uni-list-item title="修改密码" showArrow></uni-list-item>
		<uni-list-item title="密保手机" showArrow></uni-list-item>
	</view>
</template>

<script>
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniListItem
	}
};
</script>

<style></style>
