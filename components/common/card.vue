<template>
	<!-- 卡片组件 -->
	<view class="card">
		<!-- head -->
		<view v-if="showHead" class="p-2 border-bottom main-border-color">
			<slot name="title">
				<text v-if="headTitle" class="font-md font-weight">{{ headTitle }}</text>
			</slot>
		</view>

		<!-- body -->
		<view class="">
			<image v-if="bodyCover" :src="bodyCover" mode="widthFix" style="width: 100%;"></image>
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		headTitle: String,
		bodyCover: String,
		showHead: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style></style>
