<template>
	<!-- 登录页面 -->
	<view class="">
		<uni-nav-bar
			leftIcon="closeempty"
			rightText="忘记密码"
			:border="false"
			statusBar
			@clickLeft="goBack"
			@clickRight="forget"
		></uni-nav-bar>

		<view class="p-5">
			<view class="font-big font-weight mb-5">密码登录</view>
			<input
				type="text"
				class="border-bottom mb-4 uni-input px-0 "
				placeholder="请输入手机号/邮箱/账号"
				placeholder-class="text-linght-muted"
				@focus="focus('userName')"
				@blur="blur('userName')"
				:class="focusClass.userName ? 'scroll-border-bottom' : ''"
			/>
			<input
				type="text"
				class="border-bottom mb-4 uni-input px-0"
				placeholder="请输入密码"
				placeholder-class="text-linght-muted"
				:class="focusClass.password ? 'scroll-border-bottom' : ''"
				@focus="focus('password')"
				@blur="blur('password')"
			/>

			<view
				class="py-2 w-100 all-flex-row main-bg-color text-white rounded font-md mb-4"
				hover-class="main-bg-hover-color"
			>
				登录
			</view>

			<label class="checkbox d-flex a-center">
				<checkbox value=""></checkbox>
				<text class="font text-linght-muted">已阅读并同意xxxxx协议</text>
			</label>
		</view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';

export default {
	components: {
		uniNavBar
	},

	data() {
		return {
			focusClass: {
				userName: false,
				password: false
			}
		};
	},

	methods: {
		// 点击返回
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},

		//忘记密码
		forget() {},

		// input聚焦事件
		focus(key) {
			this.focusClass[key] = true;
		},

		// input失焦事件
		blur(key) {
			this.focusClass[key] = false;
		}
	}
};
</script>

<style></style>
