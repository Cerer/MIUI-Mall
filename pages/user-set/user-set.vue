<template>
	<view class="">
		<card headTitle="账号管理">
			<uni-list-item title="个人资料"></uni-list-item>
			<uni-list-item title="收货地址"></uni-list-item>
		</card>

		<card headTitle="关于">
			<uni-list-item title="个人资料"></uni-list-item>
			<uni-list-item title="收货地址"></uni-list-item>
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
	}
};
</script>

<style scoped>
page {
	background: #eeeeee;
}
</style>
