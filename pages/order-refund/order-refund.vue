<!-- 申请退款 -->
<template>
	<view class="">
		<textarea v-model="reason" placeholder="请填写退款理由" class="uni-textarea p-2" />
		<view class="p-3">
			<button type="default" class="bg-white" :disabled="reason.length === 0" :loading="loading" @click="submit">
				{{ loading ? '加载中...' : '申请退款' }}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 订单id
			id: 0,

			// 退款理由
			reason: '',

			loading: false
		};
	},

	onLoad(e) {
		if (!e.detail) {
			return uni.showToast({
				title: '非法参数',
				icon: 'none'
			});
		}
		this.id = JSON.parse(e.detail).id;
	},

	methods: {
		submit() {
			let self = this;
			self.api
				.post(
					`/order/${self.id}/apply_refund`,
					{
						reason: self.reason
					},
					{
						token: true
					}
				)
				.then(res => {
					self.loading = false;
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '申请成功，请等待商家审核',
						icon: 'none'
					});
				})
				.catch(err => {
					self.loading = false;
				});
		}
	}
};
</script>

<style></style>
