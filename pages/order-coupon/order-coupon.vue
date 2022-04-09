<template>
	<!-- 优惠卷 -->
	<view class="d-flex flex-column" style="height: 100%;">
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom border-light-secondary">
			<view
				class="flex-1 all-flex-row py-2"
				v-for="(item, index) in tabList"
				:key="index"
				:class="tabIndex === index ? 'tabActive' : ''"
				@tap="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</view>

		<scroll-view scroll-y class="flex-1">
			<block v-for="(tab, tabI) in tabList" :key="tabI">
				<view class="position-relative" v-show="tabI === tabIndex" style="min-height: 440rpx;">
					<template v-if="tab.list.length > 0">
						<view class="p-3">
							<coupon
								v-for="(item, index) in tab.list"
								:key="index"
								:item="item"
								:index="index"
								@onClick="chooseCoupon(item)"
							>
								<text v-if="item.disabled">已使用</text>
								<text v-else>{{ item.status ? '去使用' : validText }}</text>
							</coupon>
						</view>
					</template>

					<!-- 默认无 -->
					<template v-else>
						<no-thing :icon="tab.no_thing" :mag="tab.no_mag"></no-thing>
					</template>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
import noThing from '@/components/common/no-thing.vue';
import coupon from '@/components/order-coupon/coupon.vue';
export default {
	components: {
		noThing,
		coupon
	},

	data() {
		return {
			tabIndex: 0,

			tabList: [
				{
					name: '可用',
					no_thing: 'no_comment',
					no_mag: '您还没有可以的优惠卷',
					page: 1,
					key: 'valid',
					firstLoad: false,
					list: []
				},
				{
					name: '已失效',
					no_thing: 'no_pay',
					no_mag: '您还没有失效的优惠卷',
					page: 1,
					key: 'invalid',
					firstLoad: false,
					list: []
				}
			],

			// 选择商品价格
			price: 0
		};
	},

	computed: {
		// 当前页码
		page() {
			return this.tabList[this.tabIndex].page;
		},

		// 是否失效
		isvaild() {
			return this.tabList[this.tabIndex].key;
		},

		// 优惠券使用状态
		validText() {
			return this.tabIndex === 0 ? '不可用' : '已失效';
		}
	},

	onLoad(e) {
		if (e.detail) {
			this.price = JSON.parse(e.detail).price;
		}

		this.getData();
	},

	methods: {
		// 获取数据
		getData() {
			let self = this;
			let index = self.tabIndex;
			self.api
				.get(
					`/usercoupon/${self.page}/${self.isvaild}`,
					{},
					{
						token: true
					}
				)
				.then(res => {
					self.tabList[index].list = res.map(v => {
						let status = index === 0 && self.price >= parseFloat(v.coupon.min_price);
						return {
							id: v.id,
							title: v.coupon.name,
							start_time: v.coupon.start_time,
							end_time: v.coupon.end_time,
							price: v.coupon.value,
							desc: v.coupon.desc,
							status: status,
							disabled: v.used,
							type: v.coupon.type
						};
					});
					self.tabList[index].firstLoad = true;
				});
		},

		// 切换选项卡
		changeTab(index) {
			this.tabIndex = index;
			if (!this.tabList[index].firstLoad) {
				this.getData();
			}
		},

		// 选择优惠券
		chooseCoupon(item) {
			// 已使用
			if (item.disabled) {
				return uni.showToast({
					title: '该优惠券已经使用过了',
					icon: 'none'
				});
			}

			// 已失效/不可用
			if (!item.status) {
				return uni.showToast({
					title: '该优惠券' + this.validText,
					icon: 'none'
				});
			}

			uni.$emit('couponUser', {
				id: item.id,
				type: item.type,
				value: item.price
			});

			uni.navigateBack({
				delta: 1
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
<style scoped>
.tabActive {
	border-bottom: 2rpx solid #fd6801;
	color: #fd6801;
	margin-bottom: -5rpx;
}
</style>
