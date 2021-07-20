<template>
	<view class="">
		<!-- 商品详情大图 -->
		<com-swiper :resdata="banners" height="750" :preview="true"></com-swiper>

		<!-- 基础详情 -->
		<detail-info :detail="detail"></detail-info>

		<!-- 滚动商品特性 -->
		<scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>

		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-linght-muted">
				<uni-list-item showArrow clickable @click="show('attr')">
					<view slot="body">
						<view class="d-flex font">
							<text class="mr-2 text-muted">已选</text>
							<text>火焰红 64G 标配</text>
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
		<scroll-comments :comments="comments"></scroll-comments>

		<!-- 商品详情 -->
		<view class="py-4">
			<u-parse className="uParse" :content="detailData" @preview="preview" @navigate="navigate"></u-parse>
		</view>

		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<com-list v-for="(item, index) of hotList" :key="index" :item="item" :index="index"></com-list>
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
					<price priceSize="font-lg" unitSize="font">3369</price>
					<text class="d-block">火焰红 64G 标配</text>
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
					<uni-number-box
						:min="detail.minNum"
						:max="detail.maxNum"
						:value="detail.num"
						@change="detail.num = $event"
					></uni-number-box>
				</view>
			</scroll-view>

			<!-- 按钮 -->
			<view
				class="main-bg-color text-white font-md all-flex-row"
				hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
				@tap.stop="addCart"
			>
				加入购物车
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

var htmlString = `
<p>
<img src="../../static/images/detail/3.webp">
<img src="../../static/images/detail/4.webp">
<img src="../../static/images/detail/5.webp">
<img src="../../static/images/detail/6.webp">
<img src="../../static/images/detail/7.webp">
<img src="../../static/images/detail/8.webp">
<img src="../../static/images/detail/9.webp">
</p>
`;

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
		})
	},

	data() {
		return {
			popup: {
				attr: 'none',
				express: 'none',
				service: 'none'
			},

			banners: [
				{
					src: '/static/images/detail/1.webp'
				},
				{
					src: '/static/images/detail/2.webp'
				}
			],

			detail: {
				id: '10',
				title: '小米MIX3 6GB+128GB',
				desc: '磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电',
				pPrice: 3299,
				num: 1,
				minNum: 1,
				maxNum: 100,
				cover: '/static/images/list/1.jpg'
			},

			baseAttrs: [
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				},
				{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '绞龙845八核'
				}
			],

			comments: [
				{
					userPic: '/static/images/index/contentImag/demo6.jpg',
					userName: '关关雎鸠',
					create_time: '2021-7-14',
					goods_num: '123',
					content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
					imgList: ['/static/images/list/2.jpg', '/static/images/list/3.jpg', '/static/images/list/4.jpg']
				},
				{
					userPic: '/static/images/index/contentImag/demo6.jpg',
					userName: '关关雎鸠',
					create_time: '2021-7-14',
					goods_num: '123',
					content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
					imgList: ['/static/images/list/2.jpg', '/static/images/list/3.jpg', '/static/images/list/4.jpg']
				},
				{
					userPic: '/static/images/index/contentImag/demo6.jpg',
					userName: '关关雎鸠',
					create_time: '2021-7-14',
					goods_num: '123',
					content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
					imgList: ['/static/images/list/2.jpg', '/static/images/list/3.jpg', '/static/images/list/4.jpg']
				}
			],

			detailData: htmlString,

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
			],

			// 选项卡单选按钮数据
			selects: [
				{
					title: '颜色',
					selectIndex: 0,
					list: [{ name: '黄色' }, { name: '黑色' }, { name: '红色' }]
				},
				{
					title: '容量',
					selectIndex: 0,
					list: [{ name: '64GB' }, { name: '128GB' }]
				},
				{
					title: '套餐',
					selectIndex: 0,
					list: [{ name: '标配' }, { name: '套餐一' }, { name: '套餐二' }]
				}
			],

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
			// 组织数据
			let goods = this.detail;
			goods['checked'] = false;
			goods['attrs'] = this.selects;

			// 加入购物车
			this.addGoodsToCart(goods);

			// 隐藏筛选框
			this.hide('attr');

			// 成功提示
			uni.showToast({
				title: '加入成功',
				icon: 'none'
			});
		},

		// 新增地址
		openCreatePath() {
			uni.navigateTo({
				url: '/pages/user-path-edit/user-path-edit'
			});
			this.hide('express');
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
