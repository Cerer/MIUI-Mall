<template>
	<view class="">
		<view class="main-bg-color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">{{ status }}</view>
				<view class="font">{{ timeDownText }}</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>

		<view class="p-3 bg-white">
			<view class="text-linght-muted font-md">
				<text class="font-lg text-dark mr-2">{{ address.name }}</text>
				{{ address.phone }}
			</view>
			<view class="text-linght-muted font-md">{{ path }}</view>
		</view>

		<view class="cutLine"></view>

		<view class="px-2 bg-white">
			<block v-for="(item, index) in order_items" :key="index">
				<order-list-item :item="item" :index="index"></order-list-item>
			</block>
		</view>

		<view class="cutLine"></view>

		<uni-list-item>
			<view slot="body" class="font-md text-linght-muted">商品总价</view>
			<view slot="footer" class="font-md text-linght-muted ml-auto">￥{{ price }}</view>
		</uni-list-item>
		<uni-list-item>
			<view slot="body" class="font-md text-linght-muted">快递</view>
			<view slot="footer" class="font-md text-linght-muted ml-auto">包邮</view>
		</uni-list-item>
		<uni-list-item>
			<view slot="body" class="font-md text-linght-muted">优惠卷</view>
			<view slot="footer" class="font-md text-linght-muted ml-auto">{{ coupon }}</view>
		</uni-list-item>
		<uni-list-item>
			<view slot="body" class="font-md main-text-color">实际付款</view>
			<view slot="footer" class="font-md ml-auto">
				<price>{{ total_price }}</price>
			</view>
		</uni-list-item>

		<view class="cutLine"></view>

		<card headTitle="订单信息">
			<uni-list-item title="订单编号">
				<view slot="footer" class="font-md text-linght-muted ml-auto">{{ no }}</view>
			</uni-list-item>
		</card>
		<card v-if="extra" headTitle="退款相关">
			<uni-list-item title="申请退款">
				<view slot="footer" class="font-md text-linght-muted ml-auto">{{ extra.refund_reason }}</view>
			</uni-list-item>
			<view style="height: 50rpx;"></view>
		</card>

		<view v-if="status === '待支付' || status === '待发货' || status === '待收货'" style="height: 100rpx;"></view>
		<view
			v-if="status === '待支付' || status === '待发货' || status === '待收货'"
			class="d-flex a-center j-end position-fixed bottom-0 left-0 right-0 bg-white px-3"
			style="height: 100rpx;"
		>
			<template v-if="status === '待支付'">
				<common-button @click="openPayMethods">去支付</common-button>
				<common-button @click="closeOrder">取消订单</common-button>
			</template>
			<template v-else-if="status === '待发货'">
				<common-button>提醒发货</common-button>
				<common-button @click="applyRefund">申请退款</common-button>
			</template>
			<template v-else-if="status === '待收货'">
				<common-button @click="openLogistics">查看物流</common-button>
				<common-button @click="received">确认收货</common-button>
			</template>
		</view>
	</view>
</template>

<script>
import orderListItem from '@/components/order/order-list-item.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import price from '@/components/common/price.vue';
import card from '@/components/common/card.vue';
import commonButton from '@/components/common/common-button.vue';
var timer = '';

export default {
	components: {
		orderListItem,
		uniListItem,
		price,
		card,
		commonButton
	},

	data() {
		return {
			//订单id
			order_id: 0,

			no: '', // 订单编号

			// 地址
			address: {
				province: '',
				city: '',
				district: '',
				address: '',
				zip: 0,
				name: '',
				phone: ''
			},

			total_price: '', //总价

			remark: '', //备注

			paid_time: null, //支付时间

			payment_method: '', //支付方式

			payment_no: '', //支付单号

			refund_status: '', //退款状态

			ship_status: '', //当前状态

			extra: null,

			create_time: '', //创建时间

			update_time: '', //修改时间

			reviewed: 0,

			order_items: [], //订单信息

			couponUserItem: [], //优惠券信息

			end_time: 0,

			timeDown: '' //倒计时
		};
	},

	computed: {
		// 商品总价
		price() {
			let p = 0;
			this.order_items.forEach(i => {
				p += i.pprice * i.num;
			});
			return p.toFixed(2);
		},

		// 订单状态
		status() {
			return this.util.formatStatus({
				paid_time: this.paid_time,
				refund_status: this.refund_status,
				ship_status: this.ship_status
			});
		},

		// 发货提示状态
		timeDownText() {
			let msg = '';
			switch (this.status) {
				case '待支付':
					msg = '取消';
					break;
				case '待收货':
					msg = '确认';
					break;
				case '待发货':
					return '等待商家发货';
					break;
				case '退款中':
					return '等待商家审核';
					break;
				case '已签收':
					return '订单已签收';
					break;
			}

			if (msg !== '' && this.timeDown !== '') {
				return `还差${this.timeDown} 自动${msg}`;
			}
			return '';
		},

		//地址
		path() {
			let { province, city, district, address } = this.address;
			return `${province} ${city} ${district} ${address}`;
		},

		// 优惠券
		coupon() {
			if (Array.isArray(this.couponUserItem) && this.couponUserItem.length === 0) {
				return '未使用';
			}

			let { type, value } = this.couponUserItem.coupon;
			if (type === 0) {
				return `-￥${value}`;
			} else {
				return `打￥{value}折`;
			}
		}
	},

	onLoad(e) {
		if (!e.order_id) {
			uni.showToast({
				title: '订单不存在',
				icon: 'none'
			});

			return uni.navigateBack({
				delta: 1
			});
		}

		this.order_id = e.order_id;
	},

	onUnload() {
		if (timer) {
			clearInterval(timer);
		}
	},

	onShow() {
		this.getData();
	},

	methods: {
		// 获取订单详情
		getData() {
			let self = this;
			self.api
				.get(
					`/order/${self.order_id}`,
					{},
					{
						token: true
					}
				)
				.then(res => {
					// 处理订单信息
					let order_items = res.orderItems.map(v => {
						let attrs = [];
						if (v.skus_type === 1 && v.goodsSkus && v.goodsSkus.skus) {
							let skus = v.goodsSkus.skus;
							for (let k in skus) {
								attrs.push(skus[k].value);
							}
						}
						return {
							id: v.goods_id,
							cover: v.goodsItem.cover,
							title: v.goodsItem.title,
							pprice: v.price,
							attrs: attrs.join(','),
							num: v.num
						};
					});

					self.no = res.no;
					self.address = res.address;
					self.total_price = res.total_price;
					self.remark = res.remark;
					self.paid_time = res.paid_time;
					self.payment_method = res.payment_method;
					self.payment_no = res.payment_no;
					self.refund_status = res.refund_status;
					self.ship_status = res.ship_status;
					self.extra = res.extra;
					self.create_time = res.create_time;
					self.update_time = res.update_time;
					self.reviewed = res.reviewed;
					self.order_items = order_items;
					self.couponUserItem = res.couponUserItem;
					self.end_time = res.end_time ? res.end_time : 0;

					// 开启定时器
					self.openTimeDown();
				});
		},

		// 开启定时器
		openTimeDown() {
			let self = this;
			if (self.status === '待支付' || self.status === '待收货') {
				if (timer) {
					clearInterval(timer);
				}

				timer = setInterval(() => {
					let now = new Date().getTime() / 1000;
					if (now > self.end_time) {
						uni.switchTab({
							url: '../index/index'
						});
						uni.showToast({
							title: self.status === '待支付' ? '订单已关闭' : '订单已确认',
							icon: 'none'
						});

						self.timeDown = '';

						return clearInterval(timer);
					}
					self.timeDown = self.util.timeDown(self.end_time);
				}, 1000);
			}
		},

		//去支付
		openPayMethods() {
			let self = this;
			//跳转到支付页面
			uni.navigateTo({
				url:
					'/pages/pay-methods/pay-methods?detail=' +
					JSON.stringify({
						id: self.order_id,
						price: self.total_price
					})
			});
		},

		//取消订单
		closeOrder() {
			let self = this;
			uni.showModal({
				content: '是否要取消该订单?',
				success: res => {
					if (res.confirm) {
						uni.showLoading({
							title: '取消订单中...',
							mask: false
						});

						self.api
							.post(
								`/closeorder/${self.order_id}`,
								{},
								{
									token: true
								}
							)
							.then(res => {
								uni.hideLoading();
								uni.navigateBack({
									delta: 1
								});
								uni.showToast({
									title: '取消订单成功',
									icon: 'none'
								});
							})
							.catch(err => {
								uni.hideLoading();
							});
					}
				}
			});
		},

		//申请退款
		applyRefund() {
			let self = this;
			uni.navigateTo({
				url:
					'/pages/order-refund/order-refund?detail=' +
					JSON.stringify({
						id: self.order_id
					})
			});
		},

		// 查看物流(这块的数据因为还没有获取到数据，所以还没有校验是否正确返回显示)
		openLogistics() {
			let self = this;
			uni.navigateTo({
				url:
					'/pages/logistics-detail/logistics-detail?detail=' +
					JSON.stringify({
						id: self.order_id
					})
			});
		},

		//确认收货(目前因为还没有数据，所以还没有校验接口是否能通)
		received() {
			let self = this;
			uni.showModal({
				content: '是否要确认收货?',
				success: res => {
					if (res.confirm) {
						uni.showLoading({
							title: '确认收货中...',
							mask: false
						});
						self.api
							.post(
								`/order/${self.order_id}/received`,
								{},
								{
									token: true
								}
							)
							.then(item => {
								uni.hideLoading();
								uni.navigateBack({
									delta: 1
								});
								uni.showToast({
									title: '确认收货成功',
									icon: 'none'
								});
							})
							.catch(err => {
								uni.hideLoading();
							});
					}
				}
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>
