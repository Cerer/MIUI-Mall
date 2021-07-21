<template>
	<!-- 搜索页点击进去的商品列表 -->
	<view>
		<!-- 排序|筛选 -->
		<view class="d-flex border-top border-bottoms" style="height: 100upx;">
			<view
				class="flex-1 all-flex-row font-md"
				v-for="(item, index) of screen.list"
				:key="index"
				@tap="changeScreen(index)"
			>
				<text :class="screen.currentIndex === index ? 'main-text-color' : 'text-muted'">{{ item.name }}</text>
				<view class="text-linght-muted">
					<view
						class="iconfont icon-paixujiantoushang line-h0"
						:class="item.state === 1 ? 'main-text-color' : 'text-linght-muted'"
					></view>
					<view
						class="iconfont icon-paixujiantouxia line-h0"
						:class="item.state === 2 ? 'main-text-color' : 'text-linght-muted'"
					></view>
				</view>
			</view>

			<view class="flex-1 all-flex-row font-md main-text-color" @click="clickRDrawer('open')">筛选</view>
		</view>

		<!-- 列表 -->
		<block v-for="(item, index) of list" :key="index">
			<search-list :item="item" :index="index"></search-list>
		</block>

		<!-- 筛选抽屉 -->
		<uni-drawer ref="showRight" mode="right" :width="280">
			<card headTitle="服务" :headBorderBottom="false" :headTitleWeight="false"></card>

			<!-- 单选按钮 -->
			<radio-groups :label="label" :selectIndex.sync="label.selectIndex"></radio-groups>

			<!-- 按钮 -->
			<view class="d-flex position-fixed bottom-0 right-0 w-100 font-md border-top border-light-secondary">
				<view class="flex-1 main-bg-color text-white text-center py-2" hover-class="main-bg-hover-color">
					确定
				</view>
				<view class="flex-1 text-center py-2" hover-class="bg-linght-muted">重置</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue';
import radioGroups from '@/components/common/radio-group.vue';
import searchList from '@/components/search-list/search-list.vue';

export default {
	components: {
		uniDrawer,
		card,
		radioGroups,
		searchList
	},
	data() {
		return {
			// showRight: false,
			screen: {
				currentIndex: 0,
				list: [
					{
						name: '综合',
						state: 1
					},
					{
						name: '综合',
						state: 0
					},
					{
						name: '销量',
						state: 0
					}
				]
			},

			label: {
				selectIndex: 0,
				list: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
			},

			list: [
				{
					title: '真无线蓝牙耳机',
					titlePic: '/static/images/list/4.jpg',
					desc: '雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作',
					pPrice: 100,
					comment_num: 1300,
					good_num: '98%'
				},
				{
					title: '真无线蓝牙耳机',
					titlePic: '/static/images/list/5.jpg',
					desc: '雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作',
					pPrice: 100,
					comment_num: 1300,
					good_num: '98%'
				},
				{
					title: '真无线蓝牙耳机',
					titlePic: '/static/images/list/6.jpg',
					desc: '雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作',
					pPrice: 100,
					comment_num: 1300,
					good_num: '98%'
				},
				{
					title: '真无线蓝牙耳机',
					titlePic: '/static/images/list/4.jpg',
					desc: '雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作',
					pPrice: 100,
					comment_num: 1300,
					good_num: '98%'
				},
				{
					title: '真无线蓝牙耳机',
					titlePic: '/static/images/list/5.jpg',
					desc: '雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作',
					pPrice: 100,
					comment_num: 1300,
					good_num: '98%'
				},
				{
					title: '真无线蓝牙耳机',
					titlePic: '/static/images/list/6.jpg',
					desc: '雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作',
					pPrice: 100,
					comment_num: 1300,
					good_num: '98%'
				}
			]
		};
	},

	methods: {
		// 点击顶部筛选
		changeScreen(index) {
			// 判断当前点击是否是激活状态
			let oldIndex = this.screen.currentIndex;
			let oldItem = this.screen.list[oldIndex];
			if (oldIndex === index) {
				return (oldItem.state = oldItem.state === 1 ? 2 : 1);
			}

			let newItem = this.screen.list[index];

			// 移除旧激活状态
			oldItem.state = 0;
			this.screen.currentIndex = index;

			// 增加新激活状态
			newItem.state = 1;
		},

		// 点击筛选弹出
		clickRDrawer(type) {
			this.$refs.showRight[type]();
		}
	}
};
</script>

<style scoped>
.radio-active {
	background: #fce0d5 !important;
	color: #eb7320 !important;
	border-color: #eb7320 !important;
}
</style>
