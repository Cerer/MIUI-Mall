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
							<coupon v-for="(item, index) in tab.list" :key="index" :item="item" :index="index"></coupon>
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
					list: [
						{
							title: '手机立减1000元',
							start_time: '2021-07-21',
							end_time: '2021-08-21',
							price: 1000,
							desc: '满300元使用',
							status: true,
							disabled: false
						},
						{
							title: '手机立减1000元',
							start_time: '2021-07-21',
							end_time: '2021-08-21',
							price: 1000,
							desc: '满300元使用',
							status: true,
							disabled: true
						},
						{
							title: '手机立减1000元',
							start_time: '2021-07-21',
							end_time: '2021-08-21',
							price: 1000,
							desc: '满300元使用',
							status: true,
							disabled: true
						}
					]
				},
				{
					name: '已失效',
					no_thing: 'no_pay',
					no_mag: '您还没有失效的优惠卷',
					list: [
						{
							title: '手机立减1000元',
							start_time: '2021-07-21',
							end_time: '2021-08-21',
							price: 1000,
							desc: '满300元使用',
							status: false,
							disabled: false
						},
						{
							title: '手机立减1000元',
							start_time: '2021-07-21',
							end_time: '2021-08-21',
							price: 1000,
							desc: '满300元使用',
							status: false,
							disabled: false
						}
					]
				}
			]
		};
	},

	methods: {
		// 切换选项卡
		changeTab(index) {
			this.tabIndex = index;
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
