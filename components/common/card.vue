<template>
	<!-- 卡片组件 -->
	<view class="card">
		<!-- head -->
		<view v-if="showHead" class="p-2 main-border-color d-flex a-center j-sb" :class="getHeadClass">
			<slot name="title">
				<text v-if="headTitle" class="font-md" :class="headTitleWeight ? 'font-weight' : ''">
					{{ headTitle }}
				</text>
			</slot>
			<slot name="right"></slot>
		</view>

		<!-- body -->
		<view :class="getBodyClass">
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

		// 是否显示头部
		showHead: {
			type: Boolean,
			default: true
		},

		// 标题是否显示下边线
		headBorderBottom: {
			type: Boolean,
			default: true
		},

		// 标题是否加粗
		headTitleWeight: {
			type: Boolean,
			default: true
		},

		// 是否给内边距
		bodyPadding: {
			type: Boolean,
			default: false
		},

		// 样式
		cardStyle: {
			type: String,
			default: ''
		}
	},

	computed: {
		getHeadClass() {
			let BorderBottom = this.headBorderBottom ? 'border-bottom' : '';
			return `${BorderBottom}`;
		},

		getBodyClass() {
			let BodyPadding = this.bodyPadding ? 'p-2' : '';
			return `${BodyPadding}`;
		}
	}
};
</script>

<style></style>
