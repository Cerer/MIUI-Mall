<template>
	<!-- 支付方式 -->
	<view class="">
		<view class="all-flex-column py-5 my-3">
			<text class="font-md text-linght-muted">支付金额</text>
			<price priceSize="font-lg" unitSize="font-md">{{ detail.price }}</price>
		</view>

		<view class="px-5">
			<radio-group class="uni-list" @change="changePay">
				<label v-for="(item, index) in list" :key="index">
					<uni-list-item showExtraIcon :extraIcon="item.extraIcon" :title="item.title" :note="item.desc" clickable>
						<radio
							slot="footer"
							class="d-flex a-center"
							color="#FD6801"
							:value="item.value"
							:checked="payMethods === item.value"
						></radio>
					</uni-list-item>
				</label>
			</radio-group>

			<view
				class="rounded text-white font-md w-100 py-2 mt-3 text-center"
				:class="loading ? 'bg-secondary' : 'main-bg-color'"
				hover-class="main-bg-hover-color"
				@tap="submit"
			>
				{{ loading ? '支付中...' : '确认支付' }}
			</view>
		</view>
	</view>
</template>

<script>
import price from '@/components/common/price.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	components: {
		price,
		uniListItem
	},

	data() {
		return {
			list: [
				{
					title: '支付宝支付',
					desc: '推荐使用支付宝支付',
					extraIcon: {
						type: 'icon-zhifubao',
						color: '#007bff',
						size: 60,
						isUniIcon: false
					},
					check: false,
					value: 'alipay'
				},
				{
					title: '微信支付',
					desc: '',
					extraIcon: {
						type: 'icon-wxpay',
						color: '#28a745',
						size: 60,
						isUniIcon: false
					},
					check: false,
					value: 'wxpay'
				}
			],

			// 支付方式
			payMethods: 'alipay',

			//支付数据
			detail: {
				id: 0,
				price: 0
			},

			// 支付状态加载
			loading: false
		};
	},

	onLoad(e) {
		if (!e.detail) {
			return uni.showToast({
				title: '支付失败',
				icon: 'none'
			});
		}

		this.detail = JSON.parse(e.detail);
	},

	methods: {
		// 切换支付方式
		changePay(e) {
			let self = this;
			self.payMethods = e.detail.value;
		},

		// 确认支付
		submit() {
			let self = this;
			// 防止重复支付
			if (self.loading) return;

			self.loading = true;

			self.api
				.get(
					`/payment/${self.detail.id}/${self.payMethods}`,
					{},
					{
						token: true,
						native: true
					}
				)
				.then(item => {
					//能成功跳转到支付宝界面支付，但是还没有测试能都支付成功
					uni.requestPayment({
						provider: self.payMethods,
						orderInfo: item.data, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
						success: res => {
							// 重定向，防止重复支付问题
							uni.redirectTo({
								url: '../pay-result/pay-result'
							});
							console.log('success:' + JSON.stringify(res));
						},
						fail: err => {
							uni.showModal({
								title: '提示',
								content: '支付失败',
								showCancel: false
							});
							console.log('fail:' + JSON.stringify(err));
						},

						complete: () => {
							self.loading = false;
						}
					});
				})
				.catch(error => {
					console.log(error);
					uni.showToast({
						title: '支付失败',
						icon: 'none'
					});
				});
		}
	}
};
</script>

<style></style>
