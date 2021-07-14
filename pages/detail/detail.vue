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
				<uni-list-item showArrow clickable @click="show">
					<view class="d-flex font">
						<text class="mr-2 text-muted">已选</text>
						<text>火焰红 64G 标配</text>
					</view>
				</uni-list-item>
				<uni-list-item showArrow clickable>
					<view class="d-flex font">
						<text class="text-muted">配送</text>
						<text class="mx-2">北京 东城区</text>
						<text class="main-text-color">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item showArrow clickable>
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
		<bottom-btn></bottom-btn>

		<!-- 弹出框 -->
		<com-popup :popupClass="popupClass" @hide="hide"></com-popup>
	</view>
</template>

<script>
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
		comPopup
	},

	data() {
		return {
			popupClass: 'none',
			banners: [
				{
					src: '/static/images/detail/1.webp'
				},
				{
					src: '/static/images/detail/2.webp'
				}
			],

			detail: {
				title: '小米MIX3 6GB+128GB',
				desc: '磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电',
				pPrice: 3299
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
			]
		};
	},

	methods: {
		// 点击详情图预览
		preview(src, e) {
			// do something
		},

		// 点击跳转超链接
		navigate(href, e) {
			// do something
		},
		// 点击显示弹框
		show() {
			this.popupClass = 'show';
		},

		// 隐藏弹框
		hide() {
			this.popupClass = 'hide';
			setTimeout(() => {
				this.popupClass = 'none';
			}, 200);
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
