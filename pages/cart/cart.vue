<template>
	<view>
		<!-- 顶部导航栏 -->
		<uni-nav-bar
			title="购物车"
			:rightText="isEdit ? '完成' : '编辑'"
			statusBar
			:fixed="true"
			@clickRight="isEdit = !isEdit"
		></uni-nav-bar>

		<!-- 空白页显示 -->
		<view v-if="disabledSelectAll" class="py-5 all-flex-row bg-white">
			<view class="iconfont icon-gouwuche text-linght-muted" style="font-size: 50rpx;"></view>
			<text class="text-linght-muted mx-2">购物车还是为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-linght-muted">去逛逛</view>
		</view>

		<!-- 购物车商品列表 -->
		<view v-else class="bg-white px-1">
			<!-- 列表 -->
			<view
				class="d-flex a-center py-3 border-bottom border-light-secondary"
				v-for="(item, index) of list"
				:key="index"
			>
				<label
					class="radio all-flex-row flex-shrink"
					style="width: 100rpx;height: 100rpx;"
					@click="selectItem(index)"
				>
					<radio :value="item.id" color="#FD6801" :checked="item.checked"></radio>
				</label>

				<image
					:src="item.cover"
					style="width: 150rpx;height: 150rpx;"
					class="border border-light-secondary rounded p-2 flex-shrink"
				></image>

				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35rpx;">{{ item.title }}</view>

					<!-- 属性规格 -->
					<view
						class="d-flex text-linght-muted mb-1"
						:class="isEdit ? 'p-1 bg-linght-muted mb-2' : ''"
						@tap.stop="doShowPopup(index)"
					>
						<text class="mr-1" v-for="(item2, index2) of item.attrs" :key="index2">
							{{ item2.list[item2.selectIndex].name }}
						</text>

						<view v-if="isEdit" class="iconfont icon-xia font ml-auto"></view>
					</view>

					<view class="d-flex j-sb mt-auto">
						<price>{{ item.pPrice }}</price>
						<view class="a-self-end">
							<uni-number-box
								:min="item.minNum"
								:max="item.maxNum"
								:value="item.num"
								@change="item.num = $event"
							></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 为你推荐 -->
		<view class="text-center main-text-color font-md font-weight mt-4">为你推荐</view>

		<view class="position-relative all-flex-row text-secondary mb-3 py-3">
			<view class="font position-absolute px-2" style="background: #F5F5F5;z-index: 2;">买的人还买了</view>
			<view class="position-absolute left-0 right-0 bg-dark" style="height: 1rpx;"></view>
		</view>

		<view class="row j-sb bg-white">
			<com-list v-for="(item, index) of hotList" :key="index" :item="item" :index="index"></com-list>
		</view>

		<!-- 占位 -->
		<view style="height: 200rpx;"></view>

		<!-- 合计 -->
		<view
			class="d-flex a-center position-fixed right-0 left-0 border-top border-dark a-stretch bg-white h5-bottom-0 app-bottom-100"
			style="height: 100rpx;z-index: 1000;"
		>
			<label class="radio all-flex-row flex-shrink" style="width: 100rpx;" @click="doSelectedAll">
				<radio color="#FD6801" :checked="checkedAll" :disabled="disabledSelectAll"></radio>
			</label>

			<template v-if="!isEdit">
				<view class="flex-1 all-flex-row font-md">
					合计
					<price>{{ totalPrice }}</price>
				</view>
				<view class="flex-1 all-flex-row main-bg-color text-white font-md" hover-class="main-bg-hover-color">
					结算
				</view>
			</template>

			<template v-else>
				<view class="flex-1 all-flex-row main-bg-color text-white font-md" hover-class="main-bg-hover-color">
					移入收藏
				</view>
				<view
					class="flex-1 all-flex-row bg-danger text-white font-md"
					hover-class="main-bg-hover-color"
					@click="doDelGoods"
				>
					删除
				</view>
			</template>
		</view>

		<com-popup :popupClass="popupShow" @hide="doHidePopup">
			<!-- 商品信息 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image
					src="/static/images/cate/cate_01.png"
					mode="widthFix"
					style="width: 180rpx;height: 180rpx;"
					class="border rounded"
				></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">3369</price>
					<view class="d-block">
						<text class="mr-1" v-for="(item, index) of popupData.attrs" :key="index">
							{{ item.list[item.selectIndex].name }}
						</text>
					</view>
				</view>
			</view>

			<!-- 表单部分 -->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card
					v-for="(item, index) in popupData.attrs"
					:key="index"
					:headTitle="item.title"
					:headTitleWeight="false"
					:headBorderBottom="false"
				>
					<radio-groups :label="item" :selectIndex.sync="item.selectIndex"></radio-groups>
				</card>

				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box
						:min="popupData.minNum"
						:max="popupData.maxNum"
						:value="popupData.num"
						@change="popupData.num = $event"
					></uni-number-box>
				</view>
			</scroll-view>

			<!-- 按钮 -->
			<view
				class="main-bg-color text-white font-md all-flex-row"
				hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
				@tap.stop="doHidePopup"
			>
				确定
			</view>
		</com-popup>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
import price from '@/components/common/price.vue';
import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue';
import comPopup from '@/components/common/com-popup.vue';
import card from '@/components/common/card.vue';
import radioGroups from '@/components/common/radio-group.vue';
import comList from '@/components/common/com-list.vue';
export default {
	components: {
		uniNavBar,
		price,
		uniNumberBox,
		comPopup,
		card,
		radioGroups,
		comList
	},

	computed: {
		...mapState({
			list: state => state.cart.list,
			popupShow: state => state.cart.popupShow
		}),

		...mapGetters(['checkedAll', 'totalPrice', 'disabledSelectAll', 'popupData'])
	},

	data() {
		return {
			isEdit: false,
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

	onLoad() {},

	methods: {
		...mapMutations(['selectItem']),

		...mapActions(['doShowPopup', 'doHidePopup', 'doSelectedAll', 'doDelGoods'])
	}
};
</script>

<style>
page {
	background: #f5f5f5;
}
</style>

<style scoped>
/* #ifdef APP-PLUS */
.h5-bottom-0 {
	bottom: 0;
}
/* #endif */

/* #ifdef H5 */
.app-bottom-100 {
	bottom: 100rpx;
}
/* #endif */
</style>
