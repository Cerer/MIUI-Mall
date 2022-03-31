<template>
	<!-- 分类图标组件 -->
	<view class="row j-center m-2">
		<block v-for="(item, index) of resdata" :key="index">
			<view class="span-4 all-flex-column py-1" @tap="event(item)">
				<image :src="item.src" style="width: 60upx;height: 60upx;" mode="widthFix"></image>
				<text class="font-sm">{{ item.text }}</text>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		resdata: [Array, Object]
	},

	methods: {
		// 点击分类
		event(item) {
			console.log('点击了分类', item);
		}
	}
};
</script>

<style></style>
