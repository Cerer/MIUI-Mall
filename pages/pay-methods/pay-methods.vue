<template>
	<!-- 支付方式 -->
	<view class="">
		<view class="all-flex-column py-5 my-3">
			<text class="font-md text-linght-muted">支付金额</text>
			<price priceSize="font-lg" unitSize="font-md">38.00</price>
		</view>

		<view class="px-5">
			<radio-group class="uni-list">
				<label v-for="(item, index) in list" :key="index">
					<uni-list-item
						showExtraIcon
						:extraIcon="item.extraIcon"
						:title="item.title"
						:note="item.desc"
						clickable
						@click="changeRadio(item.check, index)"
					>
						<radio slot="footer" class="d-flex a-center" color="#FD6801" :checked="item.check"></radio>
					</uni-list-item>
				</label>
			</radio-group>

			<view
				class="rounded main-bg-color text-white font-md w-100 py-2 mt-3 text-center"
				hover-class="main-bg-hover-color"
				@tap="submit"
			>
				确认支付
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
					check: false
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
					check: false
				}
			]
		};
	},

	methods: {
		// 选中支付方式
		changeRadio(row, index) {
			this.list.forEach((v, i) => {
				if (index === i) {
					v.check = !v.check;
				} else {
					v.check = false;
				}
			});
		},

		// 确认支付
		submit() {
			uni.navigateTo({
				url: '../pay-result/pay-result'
			});
		}
	}
};
</script>

<style></style>
