<template>
	<!-- 订单详情 -->
	<view class="">
		<!-- 商品详情大图 -->
		<com-swiper :resdata="banners" height="750" :preview="true"></com-swiper>

		<!-- 基础详情 -->
		<detail-info :detail="detail" :show-price="showPrice"></detail-info>

		<!-- 滚动商品特性 -->
		<scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>

		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-linght-muted">
				<uni-list-item v-if="detail.sku_type === 1" showArrow clickable @click="show('attr')">
					<view slot="body">
						<view class="d-flex font">
							<text class="mr-2 text-muted">已选</text>
							<text>{{ checkedSkus }}</text>
						</view>
					</view>
				</uni-list-item>
				<uni-list-item showArrow clickable @click="goToCoupon">
					<view slot="body">
						<view class="d-flex font">
							<text class="text-muted">优惠券</text>
							<text class="mx-2 main-text-color">马上领取</text>
						</view>
					</view>
				</uni-list-item>
				<uni-list-item showArrow clickable @click="show('express')">
					<view slot="body">
						<view class="d-flex font">
							<text class="text-muted">配送</text>
							<text class="mx-2">北京 东城区</text>
							<text class="main-text-color">现配</text>
						</view>
					</view>
				</uni-list-item>
				<uni-list-item showArrow clickable @click="show('service')">
					<view slot="body">
						<view class="d-flex font">
							<view class="text-muted d-flex a-center mr-2">
								<view class="iconfont icon-finish main-text-color"></view>
								小米自营
							</view>
							<view class="text-muted d-flex a-center mr-2">
								<view class="iconfont icon-finish main-text-color"></view>
								小米发货
							</view>
							<view class="text-muted d-flex a-center mr-2">
								<view class="iconfont icon-finish main-text-color"></view>
								7天无理由退货
							</view>
						</view>
					</view>
				</uni-list-item>
			</view>
		</view>

		<!-- 横向滚动评论 -->
		<scroll-comments :goods_id="detail.id" :comments="comments"></scroll-comments>

		<!-- 商品详情 -->
		<view class="py-4">
			<u-parse className="uParse" :content="detailData" @preview="preview" @navigate="navigate"></u-parse>
		</view>

		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<com-list v-for="(item, index) of hotList" :key="index" :item="item" :index="index" type="redirectTo"></com-list>
			</view>
		</card>

		<!-- 底部操作条 -->
		<bottom-btn @show="show('attr')"></bottom-btn>

		<!-- 选项卡弹出框 -->
		<com-popup :popupClass="popup.attr" @hide="hide('attr')">
			<!-- 商品信息 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image
					src="/static/images/cate/cate_01.png"
					mode="widthFix"
					style="width: 180rpx;height: 180rpx;"
					class="border rounded"
				></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">{{ showPrice }}</price>
					<text class="d-block">{{ checkedSkus }}</text>
				</view>
			</view>

			<!-- 表单部分 -->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card
					v-for="(item, index) in selects"
					:key="index"
					:headTitle="item.title"
					:headTitleWeight="false"
					:headBorderBottom="false"
				>
					<radio-groups :label="item" :selectIndex.sync="item.selectIndex"></radio-groups>
				</card>

				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :max="maxStock" :value="detail.num" @change="detail.num = $event"></uni-number-box>
				</view>
			</scroll-view>

			<!-- 按钮 -->
			<view
				class="text-white font-md all-flex-row"
				:class="maxStock === 0 ? 'bg-secondary' : 'main-bg-color'"
				:hover-class="maxStock !== 0 ? 'main-bg-hover-color' : ''"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
				@tap.stop="addCart"
			>
				{{ maxStock === 0 ? '暂无库存' : '加入购物车' }}
			</view>
		</com-popup>

		<!-- 收货地址弹出框 -->
		<com-popup :popupClass="popup.express" @hide="hide('express')">
			<view class="all-flex-row font-md border-bottom border-light-secondary font-weight" style="height: 100rpx;">
				收货地址
			</view>

			<!-- 表单部分 -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<uni-list-item showArrow v-for="(item, index) in pathList" :key="index">
					<view slot="body">
						<view class="iconfont icon-27 font-md font-weight">{{ item.name }}</view>
						<view class="font text-linght-muted d-block">{{ item.path }} {{ item.detailPath }}</view>
					</view>
				</uni-list-item>
			</scroll-view>

			<!-- 按钮 -->
			<view
				class="main-bg-color text-white font-md all-flex-row"
				hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
				@tap.stop="openCreatePath"
			>
				选择新地址
			</view>
		</com-popup>

		<!-- 服务说明弹出框 -->
		<com-popup :popupClass="popup.service" @hide="hide('service')">
			<view class="all-flex-row font-md border-bottom border-light-secondary font-weight" style="height: 100rpx;">
				服务说明
			</view>

			<!-- 表单部分 -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-1" v-for="(item, index) of serviceList" :key="index">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color mr-1"></view>
						{{ item.title }}
					</view>
					<text v-if="item.desc" class="text-linght-muted font pl-4">{{ item.desc }}</text>
				</view>
			</scroll-view>

			<!-- 按钮 -->
			<view
				class="main-bg-color text-white font-md all-flex-row"
				hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
				@tap.stop="hide('service')"
			>
				确定
			</view>
		</com-popup>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import comSwiper from '@/components/index/com-swiper.vue';
import detailInfo from '@/components/detail/detail-info.vue';
import scrollAttrs from '@/components/detail/scroll-attrs.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import scrollComments from '@/components/detail/scroll-comments.vue';
import uParse from '@/components/uni-ui/uni-parse/parse.vue';
import card from '@/components/common/card.vue';
import comList from '@/components/common/com-list.vue';
import bottomBtn from '@/components/detail/bottom-btn.vue';
import comPopup from '@/components/common/com-popup.vue';
import price from '@/components/common/price.vue';
import radioGroups from '@/components/common/radio-group.vue';
import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue';

export default {
	components: {
		comSwiper,
		detailInfo,
		scrollAttrs,
		uniListItem,
		scrollComments,
		uParse,
		card,
		comList,
		bottomBtn,
		comPopup,
		price,
		radioGroups,
		uniNumberBox
	},

	computed: {
		...mapState({
			pathList: state => state.path.list
		}),

		//拿到选中skus组成字符串
		checkedSkus() {
			let checkedSkus = this.selects.map(v => {
				return v.list[v.selectIndex].name;
			});
			return checkedSkus.join(',');
		},

		// 拿到选中skus索引
		checkedSkusIndex() {
			let goodsSkus = this.detail.goodsSkus;
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
				return this.detail.min_price || 0.0;
			}
			return this.detail.goodsSkus[this.checkedSkusIndex].pprice;
		},

		// 最大库存
		maxStock() {
			if (this.detail.sku_type === 0) {
				return this.detail.stock;
			}

			if (!Array.isArray(this.detail.goodsSkus)) {
				return 100;
			}

			return this.detail.goodsSkus[this.checkedSkusIndex].stock;
		}
	},

	data() {
		return {
			popup: {
				attr: 'none',
				express: 'none',
				service: 'none'
			},

			// 轮播图数据
			banners: [],

			// 商品基本信息数据
			detail: {},

			// 滚动属性数据
			baseAttrs: [],

			// 热门评论数据
			comments: [],

			// 商品详情数据
			detailData: '',

			// 热门商品数据
			hotList: [],

			// 商品规格数据
			selects: [],

			serviceList: [
				{
					title: '小米自营',
					desc: ''
				},
				{
					title: '小米发货',
					desc: '由小米发货'
				},
				{
					title: '7天无理由就是不退货',
					desc: ''
				},
				{
					title: '运费说明',
					desc: '不管满多少，就是不退货；特殊产品，也是一样'
				}
			]
		};
	},

	onLoad(e) {
		if (e.detail) {
			this.$nextTick(function() {
				this.__init(JSON.parse(e.detail));
			});
		}
	},

	// 监听页面返回事件
	onBackPress() {
		// 关闭模态框
		for (let key in this.popup) {
			if (this.popup[key] !== 'none') {
				this.popup[key] = 'none';
				return true;
			}
		}
	},

	methods: {
		...mapMutations(['addGoodsToCart']),

		// 初始化页面
		__init(data) {
			this.api.get('/goods/' + data.id).then(res => {
				// 轮播图
				this.banners = res.goodsBanner.map(v => {
					return {
						src: v.url
					};
				});

				// 基本信息
				this.detail = res;
				this.detail.num = 1;

				//修改页面标题
				uni.setNavigationBarTitle({
					title: res.title
				});

				// 滚动商品属性数据
				this.baseAttrs = res.goodsAttrs.map(v => {
					return {
						icon: 'icon-cpu',
						title: v.name,
						desc: v.value
					};
				});

				// 热门评论
				this.comments = res.hotComments.map(v => {
					return {
						id: v.id,
						user_id: v.user_id,
						userPic: v.user.avatar,
						userName: v.user.nickname,
						create_time: v.review_time,
						goods_num: v.goods_num,
						content: v.review.data,
						imgList: v.review.image
					};
				});

				// 商品详情(这块有点问题，先调了组件，数据为空，界面会显示数据不能为空，后才有数据，赋值图片成功)
				this.detailData = res.content;

				// 热门商品
				this.hotList = res.hotList.map(v => {
					return {
						id: v.id,
						cover: v.cover,
						title: v.title,
						desc: v.desc,
						oprice: v.min_oprice,
						pprice: v.min_price
					};
				});

				// 多规格商品才做处理
				if (this.detail.sku_type === 1) {
					// 商品规格
					this.selects = res.goodsSkusCard.map(v => {
						let valueList = v.goodsSkusCardValue.map(i => {
							return {
								id: i.id,
								name: i.value
							};
						});

						return {
							id: v.id,
							title: v.name,
							selectIndex: 0,
							list: valueList
						};
					});

					//商品规格（匹配价格）
					this.detail.goodsSkus.forEach(i => {
						let nameList = [];
						for (let key in i.skus) {
							nameList.push(i.skus[key].value);
						}
						i.skusText = nameList.join(',');
					});
				}
			});
		},

		// 点击详情图预览
		preview(src, e) {
			// do something
		},

		// 点击跳转超链接
		navigate(href, e) {
			// do something
		},

		// 点击显示弹框
		show(key) {
			this.popup[key] = 'show';
		},

		// 隐藏弹框
		hide(key) {
			this.popup[key] = 'hide';
			setTimeout(() => {
				this.popup[key] = 'none';
			}, 200);
		},

		// 加入购物车
		addCart() {
			let self = this;
			// 没有库存
			if (self.maxStock === 0) return;
			let shop_id = self.detail.sku_type === 0 ? self.detail.id : this.detail.goodsSkus[self.checkedSkusIndex].id;
			self.api
				.post(
					'/cart',
					{
						shop_id: shop_id,
						skus_type: self.detail.sku_type,
						num: self.detail.num
					},
					{
						token: true
					}
				)
				.then(res => {
					// 通知购物车页面更新数据
					uni.$emit('updateCart');

					// 隐藏筛选框
					this.hide('attr');

					// 成功提示
					uni.showToast({
						title: '加入成功',
						icon: 'none'
					});
				});
		},

		// 新增地址
		openCreatePath() {
			uni.navigateTo({
				url: '/pages/user-path-edit/user-path-edit'
			});
			this.hide('express');
		},

		//跳转到领取优惠券页面
		goToCoupon() {
			this.navigateTo({
				url: '/pages/coupon/coupon'
			});
		}
	}
};
</script>

<style scoped>
.uParse .p {
	padding: 0 !important;
}

.uParse view {
	line-height: 0 !important;
}
</style>
