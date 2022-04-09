<template>
	<view class="">
		<view class="example-body">
			<uni-steps :options="list" active-color="#007AFF" :active="active" direction="column" />

			<view v-if="list.length === 0" class="d-flex a-center j-center py-5">
				<text class="font-md text-linght-muted">暂无物流信息</text>
			</view>
		</view>
	</view>
</template>

<script>
import uniSteps from '@/components/uni-ui/uni-steps/uni-steps.vue';
export default {
	components: {
		uniSteps
	},

	data() {
		return {
			// 订单id
			id: 0,

			active: 0,

			list: []
		};
	},

	onLoad(e) {
		if (!e.detail) {
			return uni.showToast({
				title: '非法参数',
				icon: 'none'
			});
		}
		this.id = JSON.parse(e.detail).id;
		this.getShipInfo();
	},

	methods: {
		// 获取物流数据
		getShipInfo() {
			let self = this;
			let arr = {
				1: '在途中',
				2: '派件中',
				3: '已签收',
				4: '派件失败(拒签等)'
			};

			self.api
				.get(
					`/order/${self.id}/get_ship_info`,
					{},
					{
						token: true
					}
				)
				.then(res => {
					if (res.result) {
						let status = arr[res.result.deliverystatus];
						if (status) {
							uni.setNavigationBarTitle({
								title: status
							});
						}

						self.list = res.result.list.map(i => {
							return {
								title: i.status,
								desc: i.time
							};
						});

						self.active = res.result.list.length - 1;
					} else {
						self.list = [];
						self.active = 0;
					}
				});
		}
	}
};
</script>

<style></style>
