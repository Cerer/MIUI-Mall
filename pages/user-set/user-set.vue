<template>
	<!-- 设置 -->
	<view class="">
		<card v-if="loginStatus" headTitle="账号管理">
			<uni-list-item title="个人资料" to="/pages/user-userInfo/user-userInfo"></uni-list-item>
			<uni-list-item title="收货地址" clickable @click="navigate('user-path-list')"></uni-list-item>
			<!-- to="/pages/user-path-list/user-path-list" -->
		</card>

		<card headTitle="关于">
			<uni-list-item v-for="(item, index) in list" :key="index" :title="item.title" :to="item.path"></uni-list-item>
		</card>

		<view v-if="loginStatus" class="p-3"><button type="default" class="bg-white" @click="logoutEvent">退出登录</button></view>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
		card,
		uniListItem
	},

	data() {
		return {
			list: [
				{ title: '关于商城', path: '/pages/about/about' },
				{ title: '意见反馈', path: '' },
				{ title: '协议规则', path: '' },
				{ title: '资质证件', path: '' },
				{ title: '用户协议', path: '' },
				{ title: '隐私政策', path: '' }
			]
		};
	},

	computed: {
		...mapState({
			token: state => state.user.token,
			loginStatus: state => state.user.loginStatus
		})
	},

	methods: {
		...mapMutations(['logout']),

		// 跳转
		navigate(path, check = false) {
			if (check) {
				return this.navigateTo({
					url: `/pages/${path}/${path}`
				});
			}

			uni.navigateTo({
				url: `/pages/${path}/${path}`
			});
		},

		// 退出登录
		logoutEvent() {
			this.api.post('/logout', {}, { token: true, toase: false }).then(res => {
				this.logout();
				uni.showToast({
					title: '退出成功',
					icon: 'none'
				});
				uni.navigateBack({
					delta: 1
				});
			});
		}
	}
};
</script>

<style scoped></style>

<style>
page {
	background: #eeeeee;
}
</style>
