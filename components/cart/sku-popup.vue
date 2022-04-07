<!-- 商品属性弹框 -->
<template>
	<view class="">
		<com-popup :popupClass="popupShow" @hide="doHidePopup">
			<!-- 商品信息 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image
					:src="popupData.cover"
					mode="widthFix"
					style="width: 180rpx;height: 180rpx;"
					class="border rounded"
				></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">{{ showPrice }}</price>
					<view class="d-block">{{ checkedSkus }}</view>
				</view>
			</view>

			<!-- 表单部分 -->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card
					v-for="(item, index) in popupData.selects"
					:key="index"
					:headTitle="item.title"
					:headTitleWeight="false"
					:headBorderBottom="false"
				>
					<radio-groups :label="item" :selectIndex.sync="item.selectIndex"></radio-groups>
				</card>

				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<!-- :min="popupData.item.minNum"
						:max="popupData.item.maxNum" -->
					<uni-number-box
						:value="popupData.item ? popupData.item.num : 0"
						@change="popupData.item.num = popupData.item ? $event : 0"
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
import comPopup from '@/components/common/com-popup.vue';
import price from '@/components/common/price.vue';
import radioGroups from '@/components/common/radio-group.vue';
import card from '@/components/common/card.vue';
import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue';
export default {
	components: {
		comPopup,
		price,
		radioGroups,
		card,
		uniNumberBox
	},

	computed: {
		...mapState({
			popupShow: state => state.cart.popupShow,
			popupData: state => state.cart.popupData
		}),

		//拿到选中skus组成字符串
		checkedSkus() {
			let selects = this.popupData.selects;
			if (!Array.isArray(selects)) {
				return '';
			}
			let checkedSkus = this.popupData.selects.map(v => {
				return v.list[v.selectIndex].name;
			});
			return checkedSkus.join(',');
		},

		// 拿到选中skus索引
		checkedSkusIndex() {
			let goodsSkus = this.popupData.goods_skus;
			if (!Array.isArray(goodsSkus)) {
				return -1;
			}
			let index = goodsSkus.findIndex(item => {
				return item.skusText === this.checkedSkus;
			});
			return index;
		},

		// 当前选中显示价格
		showPrice() {
			if (this.checkedSkusIndex < 0) {
				return this.popupData.min_price || 0.0;
			}
			return this.popupData.goods_skus[this.checkedSkusIndex].pprice;
		}
	},

	methods: {
		...mapActions([, 'doHidePopup'])
	}
};
</script>

<style></style>
