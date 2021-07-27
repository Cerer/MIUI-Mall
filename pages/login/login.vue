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
				v-model="userName"
				type="text"
				class="border-bottom mb-4 uni-input px-0 "
				placeholder="请输入手机号/邮箱/账号"
				placeholder-class="text-linght-muted"
				@focus="focus('userName')"
				@blur="blur('userName')"
				:class="focusClass.userName ? 'scroll-border-bottom' : ''"
			/>
			<input
				v-model="password"
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
				@click="submit"
			>
				登录
			</view>

			<label class="checkbox d-flex a-center" @click="check = !check">
				<checkbox :checked="check"></checkbox>
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
			userName: '',
			password: '',
			check: false,
			focusClass: {
				userName: false,
				password: false
			},

			// 验证规则
			rules: {
				userName: [
					{
						rule: /^[a-zA-Z]\w{5,7}$/,
						msg: '用户名必须以字母开头，长度在6~18之间，只包含字母、数字和下划线'
					}
				],
				password: [
					{
						rule: /^.{6,20}$/,
						msg: '密码长度必须为6~20个字符'
					}
				]
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

		// 表单验证
		validata(key) {
			let check = true;
			this.rules[key].forEach(v => {
				//验证失败
				if (!v.rule.test(this[key])) {
					uni.showToast({
						title: v.msg,
						icon: 'none'
					});
					check = false;
					return false;
				}
			});
			return check;
		},

		// 登录提交
		submit() {
			if (!this.check) {
				return uni.showToast({
					title: '请先同意xxxx协议',
					icon: 'none'
				});
			}

			// 验证用户名
			if (!this.validata('userName')) return;

			// 验证密码
			if (!this.validata('password')) return;

			console.log('提交成功');

			// 防止多次点击
			uni.showLoading({
				title: '登录中...',
				mask: true
			});

			setTimeout(() => {
				uni.hideLoading(); //隐藏登录中状态
				uni.navigateBack({
					delta: 1
				});
			}, 3000);
		},

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
