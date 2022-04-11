<template>
	<!-- 购物车 -->
	<view>
		<!-- 处理初次加载页面出现短暂白屏问题 -->
		<loading-plus v-if="beforeReady"></loading-plus>

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
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item, index) of list" :key="index">
				<label class="radio all-flex-row flex-shrink" style="width: 100rpx;height: 100rpx;" @click="selectItem(index)">
					<radio :value="item.id" color="#FD6801" :checked="item.checked"></radio>
				</label>

				<image
					:src="item.cover"
					style="width: 150rpx;height: 150rpx;"
					class="border border-light-secondary rounded p-2 flex-shrink"
				></image>

				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35rpx;">{{ item.title }}</view>

					<!-- 属性规格-->
					<view
						v-if="item.skus_type === 1"
						class="d-flex text-linght-muted mb-1"
						:class="isEdit ? 'p-1 bg-linght-muted mb-2' : ''"
						@tap.stop="showPopup(item, index)"
					>
						{{ item.skusText }}
						<view v-if="isEdit" class="iconfont icon-xia font ml-auto"></view>
					</view>

					<view class="d-flex j-sb mt-auto">
						<price>{{ item.pprice }}</price>
						<view class="a-self-end">
							<uni-number-box
								:min="item.minNum"
								:max="item.maxNum"
								:value="item.num"
								@change="changeNum($event, item, index)"
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
				<view
					class="flex-1 all-flex-row main-bg-color text-white font-md"
					hover-class="main-bg-hover-color"
					@tap="orderConfirm"
				>
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

		<!-- 属性弹出框 -->
		<sku-popup></sku-popup>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import loading from '@/common/mixin/loading.js';
import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
import price from '@/components/common/price.vue';
import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue';
import comList from '@/components/common/com-list.vue';
import skuPopup from '@/components/cart/sku-popup.vue';
export default {
	mixins: [loading],

	components: {
		uniNavBar,
		price,
		uniNumberBox,
		comList,
		skuPopup
	},

	computed: {
		...mapState({
			list: state => state.cart.list,
			selectedList: state => state.cart.selectedList
		}),

		...mapGetters(['checkedAll', 'totalPrice', 'disabledSelectAll'])
	},

	data() {
		return {
			isEdit: false,
			hotList: []
		};
	},

	onLoad() {
		this.getData();

		// 监听购物车更新
		uni.$on('updateCart', () => {
			this.getData();
		});
	},

	// 卸载
	beforeDestroy() {
		uni.$off('updateCart');
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.getData();
	},

	methods: {
		...mapMutations(['selectItem', 'initCartData', 'unSelectedAll']),

		...mapActions(['doShowPopup', 'doHidePopup', 'doSelectedAll', 'doDelGoods', 'updateCartList']),

		//获取数据
		getData() {
			let self = this;
			// 获取购物车数据
			this.updateCartList()
				.then(res => {
					uni.stopPullDownRefresh();
				})
				.catch(err => {
					uni.stopPullDownRefresh();
				});

			// 获取热门列表数据
			self.api.get('/goods/hotlist').then(res => {
				self.hotList = res.map(v => {
					return {
						id: v.id,
						cover: v.cover,
						title: v.title,
						desc: v.desc,
						oprice: v.min_price,
						pprice: v.min_oprice
					};
				});
			});
		},

		// 订单结算
		orderConfirm() {
			let self = this;
			if (self.selectedList.length === 0) {
				return uni.showToast({
					title: '请选择要结算的商品',
					icon: 'none'
				});
			}

			uni.navigateTo({
				url: '/pages/order-confirm/order-confirm?detail=' + JSON.stringify(self.selectedList)
			});
		},

		// 编辑显示属性弹框
		showPopup(item, index) {
			let self = this;
			if (!self.isEdit) return;
			self.api
				.get(
					`/cart/${item.id}/sku`,
					{},
					{
						token: true
					}
				)
				.then(res => {
					// 商品规格
					let check = item.skusText.split(',');
					res.selects = res.goods_skus_card.map((v, index1) => {
						let selectIndex = 0;
						let valueList = v.goods_skus_card_value.map((i, index2) => {
							if (check[index1] === i.value) {
								selectIndex = index2;
							}

							return {
								id: i.id,
								name: i.value
							};
						});

						return {
							id: v.id,
							title: v.name,
							selectIndex,
							list: valueList
						};
					});

					//商品规格（匹配价格）
					res.goods_skus.forEach(i => {
						let nameList = [];
						for (let key in i.skus) {
							nameList.push(i.skus[key].value);
						}
						i.skusText = nameList.join(',');
					});

					self.doShowPopup({
						index,
						data: res
					});
				});
		},

		// 修改商品数量
		changeNum(e, item, index) {
			let self = this;
			if (item.num === e) return;

			uni.showLoading({
				title: '加载中...'
			});

			self.api.post('/cart/updatenumber/' + item.id, { num: e }, { token: true }).then(res => {
				item.num = e;
				uni.hideLoading();
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
