<template>
	<!-- 设置 -->
	<view class="">
		<card v-for="(item, index) in list" :key="index" :headTitle="item.label">
			<uni-list-item
				v-for="(item2, index2) in item.value"
				:key="index2"
				:title="item2.title"
				:to="item2.path"
			></uni-list-item>
		</card>

		<view class="p-3"><button type="default" class="bg-white">退出登录</button></view>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	components: {
		card,
		uniListItem
	},

	data() {
		return {
			list: [
				{
					label: '账号管理',
					value: [
						{ title: '个人资料', path: '/pages/user-userInfo/user-userInfo' },
						{ title: '收货地址', path: '/pages/user-path-list/user-path-list' }
					]
				},
				{
					label: '关于',
					value: [
						{ title: '关于商城', path: '/pages/about/about' },
						{ title: '意见反馈', path: '' },
						{ title: '协议规则', path: '' },
						{ title: '资质证件', path: '' },
						{ title: '用户协议', path: '' },
						{ title: '隐私政策', path: '' }
					]
				}
			]
		};
	}
};
</script>

<style scoped></style>

<style>
page {
	background: #eeeeee;
}
</style>
