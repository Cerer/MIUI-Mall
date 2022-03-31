<template>
	<!-- 三位广告图组件 -->
	<view class="d-flex">
		<image class="left-image" :src="resdata.big.src" lazy-load @tap="enevt(resdata.big)"></image>

		<view class="d-flex flex-column">
			<image
				class="right-image"
				:src="resdata.smalltop.src"
				lazy-load
				style="border-bottom: 2upx solid #F5F5F5;"
				@tap="enevt(resdata.smalltop)"
			></image>
			<image
				class="right-image"
				:src="resdata.smallbottom.src"
				lazy-load
				@tap="enevt(resdata.smallbottom)"
			></image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		resdata: Object
	},

	methods: {
		enevt(obj) {
			console.log(obj);
		}
	}
};
</script>

<style scoped>
.left-image {
	width: 373upx;
	height: 530upx;
	border-right: 2upx solid #f5f5f5;
}

.right-image {
	width: 375upx;
	height: 264upx;
}
</style>
