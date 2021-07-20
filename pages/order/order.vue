<template>
	<!-- 订单 -->
	<view>
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

		<!-- 订单列表 -->
		<block v-for="(tab, tabI) in tabList" :key="tabI">
			<view class="position-relative" v-show="tabI === tabIndex" style="min-height: 440rpx;">
				<!-- 有订单数据 -->
				<template v-if="tab.list.length > 0">
					<block v-for="(item, index) in tab.list" :key="index">
						<order-list :item="item" :index="index"></order-list>
					</block>
				</template>

				<!-- 没有数据,显示空白页 -->
				<template v-else>
					<no-thing :icon="tab.no_thing" :mag="tab.no_mag"></no-thing>
				</template>
			</view>
		</block>

		<!-- 猜你喜欢 -->
		<view class="text-center main-text-color font-md font-weight mt-4">猜你喜欢</view>

		<view class="position-relative all-flex-row text-secondary mb-3 py-3">
			<view class="font position-absolute px-2" style="background: #F5F5F5;z-index: 2;">实时为你推荐</view>
			<view class="position-absolute left-0 right-0 bg-dark" style="height: 1rpx;"></view>
		</view>

		<view class="row j-sb bg-white">
			<com-list v-for="(item, index) of hotList" :key="index" :item="item" :index="index"></com-list>
		</view>
	</view>
</template>

<script>
import comList from '@/components/common/com-list.vue';
import noThing from '@/components/common/no-thing.vue';
import orderList from '@/components/order/order-list.vue';
export default {
	components: {
		comList,
		noThing,
		orderList
	},

	data() {
		return {
			tabIndex: 0,

			tabList: [
				{
					name: '全部',
					no_thing: '',
					no_mag: '您还没有订单',
					list: [
						{
							create_time: '2021-07-20 10:20',
							status: '已发货',
							order_items: [
								{
									cover: '/static/images/list/5.jpg',
									title: '小米8',
									pPrice: 1999.0,
									attrs: '金色 标配',
									num: 1
								}
							],
							totle_num: 3,
							totle_price: 299.0
						},
						{
							create_time: '2021-07-20 10:20',
							status: '已发货',
							order_items: [
								{
									cover: '/static/images/list/5.jpg',
									title: '小米8',
									pPrice: 1999.0,
									attrs: '金色 标配',
									num: 1
								}
							],
							totle_num: 3,
							totle_price: 299.0
						}
					]
				},
				{
					name: '待付款',
					no_thing: 'no_pay',
					no_mag: '您还没有待付款订单',
					list: []
				},
				{
					name: '待收货',
					no_thing: 'no_receiving',
					no_mag: '您还没有待收货订单',
					list: []
				},
				{
					name: '待评价',
					no_thing: 'no_comment',
					no_mag: '您还没有待评价订单',
					list: []
				}
			],

			hotList: [
				{
					cover: '/static/images/list/1.jpg',
					title: '米家空调',
					desc: '1.5匹频率',
					oPrice: 2699,
					pPrice: 1366
				},
				{
					cover: '/static/images/list/1.jpg',
					title: '米家空调',
					desc: '1.5匹频率',
					oPrice: 2699,
					pPrice: 1366
				},
				{
					cover: '/static/images/list/1.jpg',
					title: '米家空调',
					desc: '1.5匹频率',
					oPrice: 2699,
					pPrice: 1366
				},
				{
					cover: '/static/images/list/1.jpg',
					title: '米家空调',
					desc: '1.5匹频率',
					oPrice: 2699,
					pPrice: 1366
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
