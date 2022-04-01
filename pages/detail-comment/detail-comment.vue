<template>
	<!-- 商品评论页 -->
	<view>
		<view class="p-2">
			<view class="d-flex a-center py-2 border-bottom border-light-secondary">
				<text class="text-muted">用户评价({{ total }})</text>
				<text class="main-text-color ml-auto mr-1">{{ good_rate * 100 + '%' }}</text>
				<text class="text-muted">满意</text>
			</view>
			<view class="d-flex flex-wrap pt-2" style="margin-right: -20rpx;">
				<view
					class="px-2 py border rounded mr-2 mb-2 cate-item"
					v-for="(item, index) in cateList"
					:key="index"
					:class="cateIndex === index ? 'active' : ''"
					@tap="cateChange(index)"
				>
					{{ item.name }}
				</view>
			</view>
		</view>

		<view class="cutLine"></view>

		<view v-for="(item, index) in list" :key="index" class="p-2 d-flex a-start border-bottom border-light-secondary">
			<image
				:src="item.user.avatar"
				mode="widthFix"
				style="width: 90rpx;height: 90rpx;"
				class="rounded flex-shrink"
			></image>

			<view class="pl-2 flex-1">
				<view class="d-flex a-center">
					<text class="font-md font-weight text-primary mr-auto">{{ item.user.nickname }}</text>
					<view class="iconfont icon-service main-text-color">
						<text class="pl-1 font">{{ item.rating | rating }}</text>
					</view>
				</view>

				<view class="font-md line-h-md">{{ item.review.data }}</view>

				<!-- 图片 -->
				<view v-if="item.review.image.length > 0" class="row">
					<view v-for="(img, imgIndex) in item.review.image" :key="imgIndex" class="span24-8 px pb">
						<image :src="img" mode="widthFix" style="width: 200rpx;"></image>
					</view>
				</view>

				<!-- 时间，点赞，评论数 -->
				<view class="d-flex a-center">
					<text class="text-linght-muted mr-auto">{{ item.review_time }}</text>
					<view class="d-flex text-linght-muted a-center mr-1">
						{{ item.goods_num }}
						<text class="iconfont icon-dianzan1 text-muted ml"></text>
					</view>
					<view class="d-flex text-linght-muted a-center">
						000
						<text class="iconfont icon-pinglun text-muted ml"></text>
					</view>
				</view>

				<!-- 客服回复 -->
				<view
					v-if="item.extra"
					v-for="(item2, index2) in item.extra"
					:key="index2"
					class="d-flex a-center flex-wrap bg-linght-muted rounded p-2 mt-1"
				>
					<template v-if="!item2.isuser">
						<text class="main-text-color">官方回复：</text>
						{{ item2.data }}
						<view class="iconfont icon-dianzan1 text-linght-muted line-h-md font">
							<text class="text-muted pl-1">赞客服 {{ item2.good_num }}</text>
						</view>
					</template>
				</view>
			</view>
		</view>
		<!-- 上拉加载 -->
		<view class="all-flex-row text-linght-muted font-md py-3">{{ loadText }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 商品id
			goods_id: '',

			cateIndex: 0,
			cateList: [
				{ name: '全部', value: '' },
				{ name: '好评', value: '/good' },
				{ name: '中评', value: '/middle' },
				{ name: '差评', value: '/bad' }
			],

			// 总条数
			total: 0,

			// 好评率
			good_rate: 0,

			// 列表数据
			list: [],

			// 分页数
			page: 1,

			// 1.上拉加载更多 2.加载中... 3.没有更多数据了
			loadText: '上拉加载更多'
		};
	},

	filters: {
		rating(val) {
			if (val === 3) {
				return '中评';
			} else if (val > 3) {
				return '好评';
			} else {
				return '差评';
			}
		}
	},

	onLoad(e) {
		this.goods_id = e.goods_id;
		this.__init();
	},

	// 上拉加载
	onReachBottom() {
		if (this.loadText !== '上拉加载更多') return;
		this.page++;
		this.getData();
	},

	// 监听下来刷新
	onPullDownRefresh() {
		this.getData(res => {
			uni.showToast({
				title: '刷新成功',
				icon: 'none'
			});
			uni.stopPullDownRefresh();
		}, true);
	},

	methods: {
		// 初始化数据
		__init() {
			this.getData();
		},

		// 加载数据
		getData(callback = false, refresh = false) {
			let value = this.cateList[this.cateIndex].value;

			this.api.get(`/goods/${this.goods_id}/comments${value}?page=${this.page}`).then(res => {
				this.total = res.total;
				this.good_rate = res.good_rate;
				this.list = !refresh ? [...this.list, ...res.list] : [...res.list];
				console.log(this.list);

				this.loadText = res.list.length < 10 ? '没有更多数据了' : '上拉加载更多';

				if (typeof callback === 'function') {
					callback(true);
				}
			});
		},

		// 点击选择按钮
		cateChange(index) {
			this.cateIndex = index;
			uni.showLoading({
				title: '加载中...'
			});

			this.getData(res => {
				uni.hideLoading();
				uni.showToast({
					title: '加载成功',
					icon: 'none'
				});
			}, true);
		}
	}
};
</script>

<style scoped>
.cate-item {
	background: #ffebec;
	color: #7b6d6c;
	border-color: #f4e0e1;
}

.cate-item.active {
	background: #ff6b01 !important;
	color: #ffffff !important;
	border-color: #de7232 !important;
}
</style>
