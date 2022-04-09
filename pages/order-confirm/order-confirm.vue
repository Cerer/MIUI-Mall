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
					<view class="font">{{ path.province }} {{ path.city }} {{ path.district }} {{ path.address }}</view>
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
							v-for="(item, index) in goodsList"
							:key="index"
							:src="item.cover"
							style="width: 100rpx;height: 100rpx;"
							class="rounded mr-2"
						></image>
					</view>
					<view slot="footer" class="ml-auto d-flex a-center">
						<text class="font-md">共{{ goodsList.length }}件</text>
					</view>
				</uni-list-item>

				<uni-list-item title="商品总价">
					<view slot="footer">
						<price color="text-dark">{{ totalPrice }}</price>
					</view>
				</uni-list-item>

				<uni-list-item title="运费"><view slot="footer" class="font-md">包邮</view></uni-list-item>

				<uni-list-item title="优惠卷" showArrow clickable @tap="navigator('order-coupon')">
					<view slot="footer" class=" font-md" :class="couponCount > 0 ? 'main-text-color' : 'text-linght-muted'">
						<text v-if="coupon.id > 0">
							{{ coupon.type === 0 ? '-' + coupon.value + '元' : coupon.value + '折' }}
						</text>
						<text v-else>{{ couponCount === 0 ? '无可用' : couponCount + '张可用' }}</text>
					</view>
				</uni-list-item>

				<uni-list-item>
					<view slot="body"><text class="main-text-color">小计</text></view>
					<view slot="footer" class="ml-auto">
						<price>{{ price }}</price>
					</view>
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
			<price>{{ price }}</price>
			<view
				class="px-4 py-1 text-white ml-2"
				:class="loading ? 'bg-secondary' : 'main-bg-color'"
				hover-class="main-bg-hover-color"
				style="border-radius: 50rpx;"
				@tap="openPayMethods"
			>
				{{ loading ? '加载中' : '去支付' }}
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import price from '@/components/common/price.vue';

export default {
	components: {
		uniListItem,
		price
	},

	data() {
		return {
			path: false,

			// 购物车选择结算商品id
			items: [],

			//可用优惠券数量
			couponCount: 0,

			// 选择优惠券数据
			coupon: {
				id: 0,
				type: 0,
				value: 0
			},

			//点击支付加载状态
			loading: false,

			order_id: 0
		};
	},

	computed: {
		...mapState({
			list: state => state.cart.list
		}),

		...mapGetters(['defalutPath', 'totalPrice']),

		// 商品列表
		goodsList() {
			return this.items.map(id => {
				return this.list.find(i => i.id === id);
			});
		},

		// 最终价格
		price() {
			// 没有优惠券
			if (this.coupon.id === 0) {
				return this.totalPrice;
			}

			if (this.coupon.type === 0) {
				return (this.totalPrice - this.coupon.value).toFixed(2);
			}

			return (this.totalPrice * (this.coupon.value / 10)).toFixed(2);
		}
	},

	onLoad(e) {
		if (!e.detail) {
			uni.showToast({
				title: '请选择要下单的商品',
				icon: 'none'
			});
			return uni.navigateBack({
				delta: 1
			});
		}

		this.items = JSON.parse(e.detail);

		if (this.defalutPath.length) {
			this.path = this.defalutPath[0];
		}

		// 开启监听选择收货地址事件
		uni.$on('chooesPath', res => {
			this.path = res;
		});

		// 监听选择优惠券
		uni.$on('couponUser', res => {
			this.coupon = res;
		});

		// 计算当前价格有多少张可用优惠券
		this.getCouponCount();
	},

	onUnload() {
		// 关闭监听选择收货地址事件
		uni.$off('chooesPath');
		uni.$off('couponUser');
	},

	onShow() {
		//如果已经提交过订单，重定向到订单详情页
		if (this.order_id > 0) {
			uni.redirectTo({
				url: '/pages/order-detail/order-detail?order_id=' + this.order_id
			});
		}
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

		// 处理订单信息
		openPayMethods() {
			let self = this;

			// 防止重复下单
			if (self.loading) return;

			// 判断是否选择收货地址
			if (!self.path) {
				return uni.showToast({
					title: '请选择收货地址',
					icon: 'none'
				});
			}

			let options = {
				user_addresses_id: self.path.id,
				items: self.items.join(',')
			};

			// 是否选择优惠券
			if (self.coupon.id > 0) {
				options.coupon_user_id = self.coupon.id;
			}

			self.loading = true;

			self.api
				.post('/order', options, {
					token: true
				})
				.then(res => {
					//跳转到支付页面
					uni.navigateTo({
						url:
							'/pages/pay-methods/pay-methods?detail=' +
							JSON.stringify({
								id: res.id,
								price: res.total_price
							})
					});

					// 保存订单id
					self.order_id = res.id;

					// 通知购物车更新数据
					uni.$emit('updateCart');

					self.loading = false;
				})
				.catch(err => {
					self.loading = false;
					uni.showToast({
						title: '创建订单失败',
						icon: 'none'
					});
				});
		},

		// 跳转页面
		navigator(path) {
			if (path === 'order-coupon') {
				uni.navigateTo({
					url:
						`/pages/${path}/${path}?detail=` +
						JSON.stringify({
							price: this.totalPrice
						})
				});
			} else {
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			}
		},

		// 计算当前价格有多少张可用优惠券
		getCouponCount() {
			let self = this;
			self.api
				.post(
					'/coupon_count',
					{
						price: self.totalPrice
					},
					{
						token: true
					}
				)
				.then(res => {
					self.couponCount = res;
				})
				.catch(err => {
					uni.showToast({
						title: '获取可用优惠券数量失败',
						icon: 'none'
					});
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
