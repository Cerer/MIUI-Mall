<template>
	<!-- 添加编辑收货地址 -->
	<view class="">
		<uni-list-item>
			<view slot="body" class="d-flex a-center">
				<view class="font-md text-secondary">收货人：</view>
				<input class="font-md" v-model="formData.name" />
			</view>
		</uni-list-item>
		<uni-list-item>
			<view slot="body" class="d-flex a-center">
				<view class="font-md text-secondary">手机号码：</view>
				<input class="font-md" v-model="formData.phone" />
			</view>
		</uni-list-item>
		<uni-list-item>
			<view slot="body" class="d-flex a-center">
				<view class="font-md text-secondary">邮编：</view>
				<input class="font-md" v-model="formData.zip" />
			</view>
		</uni-list-item>

		<view class="cutLine"></view>

		<uni-list-item>
			<view slot="body" class="d-flex a-center w-100">
				<view class="font-md text-secondary" style="width: 200rpx;">所在地区：</view>
				<input
					class="font-md w-100"
					v-model="path"
					disabled
					placeholder="请选择所在地区"
					@click="showMulLinkageThreePicker"
				/>

				<mpvue-city-picker
					ref="mpvueCityPicker"
					:themeColor="themeColor"
					:pickerValueDefault="pickerValue"
					@onConfirm="onConfirm"
				></mpvue-city-picker>
			</view>
		</uni-list-item>
		<uni-list-item>
			<view slot="body" class="d-flex a-center">
				<view class="font-md text-secondary">详细地址：</view>
				<input class="font-md" v-model="formData.address" />
			</view>
		</uni-list-item>

		<view class="cutLine"></view>

		<uni-list-item
			title="设为默认地址："
			showSwitch
			:switchChecked="formData.default ? true : false"
			switchColor="#FD6801"
			@switchChange="formData.default = $event.value ? 1 : 0"
		></uni-list-item>

		<view class="p-3">
			<view
				class="text-center main-bg-color text-white font-md w-100 rounded py-2"
				hover-class="main-bg-hover-color"
				@click="submit"
			>
				保 存
			</view>
		</view>
	</view>
</template>

<script>
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	components: {
		uniListItem,
		mpvueCityPicker
	},
	data() {
		return {
			formData: {
				name: '',
				phone: '',
				zip: '',
				province: '',
				city: '',
				district: '',
				address: '',
				default: 0
			},

			// 多级选择器
			themeColor: '#007AFF', //主题颜色
			pickerValue: [0, 0, 1],

			//判断是新增还是编辑
			isEdit: false,
			formIndex: -1
		};
	},

	computed: {
		path() {
			if (this.formData.province) {
				return this.formData.province + '-' + this.formData.city + '-' + this.formData.district;
			}
		}
	},

	onLoad(e) {
		if (e.data) {
			let resData = JSON.parse(e.data);
			this.formData = resData.item;
			this.formIndex = resData.index;
			this.isEdit = true;

			// 修改顶部标题
			uni.setNavigationBarTitle({
				title: '修改收货地址'
			});
		}
	},

	// 监听返回
	onBackPress() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
			return true;
		}
	},

	// 页面卸载
	onUnload() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
		}
	},

	methods: {
		// 显示三级联动选择
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
		},

		// 多级联动选中
		onConfirm(e) {
			let arr = e.label.split('-');
			this.formData.province = arr[0];
			this.formData.city = arr[1];
			this.formData.district = arr[2];

			this.pickerValue = e.value;
		},

		// 提交
		submit() {
			// 编辑
			if (this.isEdit) {
				this.api
					.post('/useraddresses/' + this.formData.id, this.formData, {
						token: true
					})
					.then(res => {
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						});
						uni.navigateBack({
							delta: 1
						});
					});
				return;
			} else {
				//新增
				this.api
					.post('/useraddresses', this.formData, {
						token: true
					})
					.then(res => {
						uni.showToast({
							title: '创建成功',
							icon: 'none'
						});

						uni.navigateBack({
							delta: 1
						});
					});
			}
		}
	}
};
</script>

<style>
page {
	background: #eeeeee;
}
</style>
