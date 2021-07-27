<template>
	<!-- 订单结算 -->
	<view>
		<!-- 地址选择 -->
		<view
			class="main-bg-color text-white d-flex a-center px-3"
			style="height: 250rpx;"
			hover-class="main-bg-hover-color"
			@tap="openPathList"
		>
			<template v-if="path">
				<view>
					<view class="font-weight font-lg d-flex a-center">
						{{ path.name }} {{ path.phone }}
						<view class="border border-white rounded px-1 font ml-2" v-if="path.isDefault">默认</view>
					</view>
					<view class="font">{{ path.path }} {{ path.detailPath }}</view>
				</view>
			</template>
			<template v-else>
				<view class="font-weight font-lg d-flex a-center">请选择收货地址</view>
			</template>

			<view class="iconfont icon-you ml-auto"></view>
		</view>

		<!-- 商品信息 -->
		<view style="border-top-left-radius: 25rpx;border-top-right-radius: 25rpx;margin-top: -25rpx;overflow: hidden;">
			<view class="bg-white">
				<uni-list-item showArrow>
					<view slot="body" class="d-flex a-center">
						<image
							src="/static/images/index/contentImag/demo6.jpg"
							style="width: 100rpx;height: 100rpx;"
							class="rounded mr-2"
						></image>
						<image
							src="/static/images/index/contentImag/demo6.jpg"
							style="width: 100rpx;height: 100rpx;"
							class="rounded mr-2"
						></image>
						<image
							src="/static/images/index/contentImag/demo6.jpg"
							style="width: 100rpx;height: 100rpx;"
							class="rounded mr-2"
						></image>
					</view>
					<view slot="footer" class="ml-auto d-flex a-center"><text class="font-md">共3件</text></view>
				</uni-list-item>

				<uni-list-item title="商品总价">
					<view slot="footer"><price color="text-dark">20.00</price></view>
				</uni-list-item>

				<uni-list-item title="运费"><view slot="footer" class="font-md">包邮</view></uni-list-item>

				<uni-list-item title="优惠卷" showArrow clickable @tap="navigator('order-coupon')">
					<view slot="footer" class="text-linght-muted font-md">无可用</view>
				</uni-list-item>

				<uni-list-item>
					<view slot="body"><text class="main-text-color">小计</text></view>
					<view slot="footer" class="ml-auto"><price>20.00</price></view>
				</uni-list-item>

				<view class="cutLine"></view>

				<uni-list-item title="发票" showArrow clickable @click="openOrderInvoice">
					<view slot="footer" class="font-md">电子发票-个人</view>
				</uni-list-item>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="position-fixed d-flex a-center j-end border bg-white bottom-left-0 right-0 p-2 font-md">
			合计：
			<price>24.00</price>
			<view
				class="px-4 py-1 main-bg-color text-white ml-2"
				hover-class="main-bg-hover-color"
				style="border-radius: 50rpx;"
				@tap="openPayMethods"
			>
				去支付
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import price from '@/components/common/price.vue';

export default {
	components: {
		uniListItem,
		price
	},

	computed: {
		...mapGetters(['defalutPath'])
	},

	onLoad() {
		if (this.defalutPath.length) {
			this.path = this.defalutPath[0];
		}

		// 开启监听选择收货地址事件
		uni.$on('chooesPath', res => {
			this.path = res;
		});
	},

	onUnload() {
		// 关闭监听选择收货地址事件
		uni.$off('chooesPath', e => {
			console.log('关闭监听收货地址');
		});
	},

	data() {
		return {
			path: false
		};
	},

	methods: {
		// 选择收货地址
		openPathList() {
			uni.navigateTo({
				url: '/pages/user-path-list/user-path-list?type=choose'
			});
		},

		//点击进入发票
		openOrderInvoice() {
			uni.navigateTo({
				url: '/pages/order-invoice/order-invoice'
			});
		},

		// 跳转到支付
		openPayMethods() {
			uni.navigateTo({
				url: '/pages/pay-methods/pay-methods'
			});
		},

		navigator(path) {
			uni.navigateTo({
				url: `/pages/${path}/${path}`
			});
		}
	}
};
</script>

<style>
page {
	background: #f5f5f5;
}
</style>
