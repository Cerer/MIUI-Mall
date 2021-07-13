<template>
	<scroll-view scroll-x class="scroll-row">
		<view
			class="scroll-row-item"
			style="width: 170upx;height: 110upx;"
			v-for="(item, index) of baseAttrs"
			:key="index"
		>
			<view class="all-flex-column line-h-sm">
				<view class="iconfont" :class="item.icon"></view>
				<view>{{ item.title }}</view>
				<view class="text-linght-muted font-sm">{{ item.desc }}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	props: ['baseAttrs']
};
</script>

<style></style>
