<template>
	<!-- 收货地址 -->
	<view>
		<block v-for="(item, index) in list" :key="index">
			<uni-swipe-action :right-options="options">
				<uni-swipe-action-item :right-options="options" @click="bindClick($event, index)">
					<uni-list-item showArrow @click="choose(item)" clickable>
						<view slot="body" style="font-size: 28rpx;">
							<view class="text-secondary">
								<view class="d-flex a-center">
									<text class="main-text-color">{{ item.name }}</text>
									{{ item.phone }}
									<text v-if="item.isDefault" class="main-text-color">[默认]</text>
								</view>

								<view>{{ item.path }}</view>

								<view>{{ item.detailPath }}</view>
							</view>
						</view>
					</uni-list-item>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</block>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue';
export default {
	components: {
		uniListItem,
		uniSwipeAction,
		uniSwipeActionItem
	},

	computed: {
		...mapState({
			list: state => state.path.list
		})
	},

	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			uni.navigateTo({
				url: '/pages/user-path-edit/user-path-edit'
			});
		}
	},

	onLoad(e) {
		if (e.type === 'choose') {
			this.isChoose = true;
		}
	},

	data() {
		return {
			isChoose: false,
			options: [
				{
					text: '修改',
					style: {
						backgroundColor: '#007AFF'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},

	methods: {
		...mapActions(['doDelPath']),

		// 点击滑块
		bindClick(e, index) {
			switch (e.index) {
				case 0: //修改
					let obj = JSON.stringify({
						item: this.list[index],
						index: index
					});
					uni.navigateTo({
						url: '/pages/user-path-edit/user-path-edit?data=' + obj
					});
					break;
				case 1: //删除
					this.doDelPath(index);
					break;
			}
		},

		//点击选择收货地址
		choose(item) {
			if (this.isChoose) {
				//通知订单提交修改收货地址
				uni.$emit('chooesPath', item);

				// 关闭当前页面
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style></style>
