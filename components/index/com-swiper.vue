<template>
	<!-- 轮播组件 -->
	<view>
		<swiper indicator-dots autoplay :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item, index) of resdata" :key="index">
				<view class="swiper-item">
					<image :src="item.src" @tap="event(item)" style="height: 350upx;width: 100%;"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	props: {
		resdata: Array
	},

	methods: {
		// 点击轮播图
		event(item) {
			console.log('点击轮播', item);
		}
	}
};
</script>

<style></style>
