<template>
	<!-- 消息通知详情页 -->
	<view class="p-2">
		<!-- 标题 -->
		<view class="font-lg text-dark mb-2 font-weight">{{ detail.title }}</view>

		<!-- 内容 -->
		<u-parse className="uParse" :content="detailData" @preview="preview" @navigate="navigate"></u-parse>
	</view>
</template>

<script>
import uParse from '@/components/uni-ui/uni-parse/parse.vue';

var htmlString = `
<p>
<img src="../../static/images/detail/3.webp">
<img src="../../static/images/detail/4.webp">
<img src="../../static/images/detail/5.webp">
<img src="../../static/images/detail/6.webp">
<img src="../../static/images/detail/7.webp">
<img src="../../static/images/detail/8.webp">
<img src="../../static/images/detail/9.webp">
</p>
`;
export default {
	components: {
		uParse
	},
	onLoad(e) {
		if (!e.detail) {
			uni.navigateBack({
				delta: 1
			});
		}
		this.detail = JSON.parse(e.detail);

		// 设置页面标题
		uni.setNavigationBarTitle({
			title: this.detail.title
		});
	},

	data() {
		return {
			detail: [],
			detailData: htmlString
		};
	},

	methods: {
		// 点击详情图预览
		preview(src, e) {
			// do something
		},

		// 点击跳转超链接
		navigate(href, e) {
			// do something
		}
	}
};
</script>

<style></style>
