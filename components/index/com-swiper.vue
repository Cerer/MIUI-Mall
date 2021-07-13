<template>
	<!-- 轮播组件 -->
	<view>
		<swiper :style="getStyle" indicator-dots autoplay :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item, index) of resdata" :key="index">
				<view class="swiper-item">
					<image class="w-100" :src="item.src" @tap="event(item, index)" :style="getStyle"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	props: {
		resdata: Array,
		height: {
			type: String,
			default: '350rpx'
		},
		preview: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		getStyle() {
			return `height: ${this.height}rpx;`;
		},

		getUrls() {
			return this.resdata.map(v => v.src);
		}
	},

	methods: {
		// 点击轮播图
		event(item, index) {
			if (this.preview) {
				return uni.previewImage({
					current: index,
					urls: this.getUrls,
					indicator: 'default'
				});
			}
		}
	}
};
</script>

<style></style>
