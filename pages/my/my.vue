<template>
	<!-- 我的 -->
	<view>
		<!-- 处理初次加载页面出现短暂白屏问题 -->
		<loading-plus v-if="beforeReady"></loading-plus>

		<!-- 头部 -->
		<view class="position-relative d-flex a-center" style="height: 320rpx;">
			<!-- 消息列表 -->
			<view
				class="iconfont icon-xiaoxi1 position-absolute text-white"
				style="z-index: 100;font-size: 50rpx;top: 70rpx;right: 20rpx;"
				@tap="navigate('msg-list')"
			></view>

			<image src="/static/images/my/bg.jpg" style="height: 320rpx;width: 100%;"></image>
			<view class="d-flex a-center position-absolute left-0 right-0" style="bottom: 50rpx;">
				<image
					src="/static/images/index/contentImag/demo6.jpg"
					style="width: 145rpx;height: 145rpx;border: 5rpx solid #f8f9fa;"
					class="rounded-circle ml-4"
				></image>
				<navigator url="../login/login"><view class="ml-2 text-white font-md">关关雎鸠</view></navigator>

				<view
					class="all-flex-row a-self-end ml-auto px-2"
					style="height: 70rpx;background: #FFD43F;color: #CC4A00;border-top-left-radius: 40rpx;border-bottom-left-radius: 40rpx;"
				>
					<view class="iconfont icon-huangguan line-h mr-2"></view>
					会员积分 1.99
				</view>
			</view>
		</view>

		<!-- 图片分类 -->
		<card>
			<view slot="title" class="d-flex a-center j-sb">
				<text class="font-md font-weight">我的订单</text>
				<view class="text-secondary font" @click="navigate('order')">
					全部订单
					<text class="iconfont icon-you font"></text>
				</view>
			</view>
			<view class="d-flex a-center">
				<view
					class="flex-1 all-flex-column py-3"
					hover-class="bg-linght-muted"
					v-for="(item, index) in typeIcon"
					:key="index"
				>
					<view class="iconfont font-lg line-h" :class="item.iconName"></view>
					<view>{{ item.title }}</view>
				</view>
			</view>
		</card>

		<view class="cutLine"></view>

		<uni-list-item
			v-for="(item, index) in listData"
			:key="index"
			:show-extra-icon="true"
			:extra-icon="item.extraIcon"
			showArrow
			:title="item.title"
			@click="navigate('user-set')"
		/>

		<view class="cutLine"></view>

		<uni-list-item
			:show-extra-icon="true"
			:extra-icon="setExtraIcon"
			showArrow
			title="更多设置"
			:to="`/pages/user-set/user-set`"
		></uni-list-item>
	</view>
</template>

<script>
import loading from '@/common/mixin/loading.js';
import card from '@/components/common/card.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	mixins: [loading],

	components: {
		card,
		uniListItem
	},

	data() {
		return {
			typeIcon: [
				{
					title: '待付款',
					iconName: 'icon-4-145'
				},
				{
					title: '待收货',
					iconName: 'icon-daishouhuo'
				},
				{
					title: '待评价',
					iconName: 'icon-xiaoxi'
				},
				{
					title: '退换修',
					iconName: 'icon-buoumaotubiao46'
				}
			],

			listData: [
				{
					title: '小米会员',
					extraIcon: {
						type: 'icon-VIP',
						color: '#FDBF2E',
						isUniIcon: false
					}
				},
				{
					title: '会员中心',
					extraIcon: {
						type: 'icon-huangguan',
						color: '#FCBE2D',
						isUniIcon: false
					}
				},
				{
					title: '服务中心',
					extraIcon: {
						type: 'icon-service',
						color: '#FA6C5E',
						isUniIcon: false
					}
				},
				{
					title: '小米之家',
					extraIcon: {
						type: 'icon-home',
						color: '#FE8B42',
						isUniIcon: false
					}
				},
				{
					title: '更多功能',
					extraIcon: {
						type: 'icon-gengduo',
						color: '#9ED45A',
						isUniIcon: false
					}
				}
			],

			setExtraIcon: {
				type: 'icon-lujing',
				color: '#808C98',
				isUniIcon: false
			}
		};
	},

	methods: {
		navigate(path) {
			uni.navigateTo({
				url: `/pages/${path}/${path}`
			});
		}
	}
};
</script>

<style></style>
