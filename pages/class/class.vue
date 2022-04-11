<!-- 分类 -->
<template>
	<view style="height: 100vh;" class="d-flex flex-column">
		<!-- #ifdef MP -->
		<!-- 自定义导航栏 -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 左边 -->
			<view class="d-flex j-center a-center" style="width: 85rpx;" @click="clickXiaoxi">
				<text class="iconfont icon-xiaoxi1"></text>
			</view>

			<!-- 中间 -->
			<view
				class="flex-1 bg-linght-muted rounded d-flex a-center text-linght-muted"
				style="height: 65rpx;"
				@click="clickSearchInput"
			>
				<text class="iconfont icon-sousuo mx-2"></text>
				智能积木
			</view>

			<!-- 右边 -->
			<view class="d-flex j-center a-center" style="width: 85rpx;"><text class="iconfont icon-richscan_icon"></text></view>
		</view>
		<!-- #endif -->

		<view class="d-flex border-top border-light-secondary" style="height: 100%;box-sizing: border-box;">
			<!-- 处理初次加载页面出现短暂白屏问题 -->
			<loading-plus v-if="beforeReady"></loading-plus>

			<scroll-view
				id="leftScroll"
				scroll-y
				style="flex: 1;height: 100%;"
				class="border-right border-light-secondary"
				:scroll-top="leftScrollTop"
			>
				<view
					class="border-bottom border-light-secondary py-1 left-scroll-item"
					hover-class="bg-linght-muted"
					v-for="(item, index) of cate"
					:key="index"
					@tap="changeCate(index)"
				>
					<view class="py-1 font-md text-muted text-center" :class="activeIndex === index ? 'class-active' : ''">
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
			<scroll-view
				scroll-y
				style="flex: 3.5;height: 100%;"
				:scroll-top="rightScrollTop"
				:scroll-with-animation="true"
				@scroll="onRightScroll"
			>
				<view class="row right-scroll-item" v-for="(item, index) of list" :key="index">
					<view
						class="span24-8 text-center py-2"
						v-for="(item2, index2) of item.list"
						:key="index2"
						@click="openDetail(item2)"
					>
						<image :src="item2.cover" style="width: 120upx;height: 120upx;"></image>
						<text class="d-block">{{ item2.name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import loading from '@/common/mixin/loading.js';
export default {
	mixins: [loading],
	data() {
		return {
			showLoading: true,
			activeIndex: 0,
			cate: [],
			list: [],

			leftDomsTop: [],
			rightDomsTop: [],

			leftScrollTop: 0,
			rightScrollTop: 0,

			catrItemHeight: 0
		};
	},

	watch: {
		async activeIndex(newValue, oldValue) {
			// 获取scroll-view高度，scrollTop
			let data = await this.getElInfo({
				size: true,
				scrollOffset: true
			});

			let H = data.height;
			let ST = data.scrollTop;

			// 下边
			if (this.leftDomsTop[newValue] + this.catrItemHeight > H + ST) {
				return (this.leftScrollTop = this.leftDomsTop[newValue] + this.catrItemHeight - H);
			}

			// 上边
			if (ST > this.catrItemHeight) {
				this.leftScrollTop = this.leftDomsTop[newValue];
			}
		}
	},

	onLoad() {
		this.getData();
	},

	onReady() {},

	methods: {
		// #ifdef MP
		// 小程序点击消息
		clickXiaoxi() {
			uni.navigateTo({
				url: '/pages/msg-list/msg-list'
			});
		},

		// 小程序点击搜索
		clickSearchInput() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		},
		// #endif

		// 获取节点信息
		getElInfo(obj = {}) {
			return new Promise((res, rej) => {
				let option = {
					size: obj.size ? true : false, //宽高
					rect: obj.rect ? true : false,
					scrollOffset: obj.scrollOffset ? true : false ////滚动情况
				};

				const query = uni.createSelectorQuery().in(this);
				let q = obj.all ? query.selectAll(`.${obj.all}-scroll-item`) : query.select('#leftScroll');
				q.fields(option, data => {
					res(data);
				}).exec();
			});
		},

		// 获取数据
		getData() {
			this.api.get('/category/app_category').then(res => {
				if (res) {
					let cate = [];
					let list = [];
					res.forEach(i => {
						cate.push({
							id: i.id,
							name: i.name
						});

						list.push({
							list: i.app_category_items
						});
					});

					this.cate = cate;
					this.list = list;
				} else {
					this.cate = [];
					this.list = [];
				}

				this.$nextTick(() => {
					this.getElInfo({
						all: 'left',
						size: true,
						rect: true
					}).then(data => {
						this.leftDomsTop = data.map(v => {
							this.catrItemHeight = v.height; //获取到每个节点的高度
							return v.top;
						});
					});

					this.getElInfo({
						all: 'right',
						size: false,
						rect: true
					}).then(data => {
						this.rightDomsTop = data.map(v => v.top);
					});

					this.showLoading = false;
				});
			});
		},

		// 点击左边分类
		changeCate(index) {
			this.activeIndex = index;

			// 右边滚动到对应区块
			this.rightScrollTop = this.rightDomsTop[index];
		},

		// 监听右边滚动事件
		async onRightScroll(e) {
			this.rightDomsTop.forEach((i, k) => {
				if (i < e.detail.scrollTop + 3) {
					this.activeIndex = k;
					return false;
				}
			});
		},

		// 打开商品详情页
		openDetail(item) {
			uni.navigateTo({
				url:
					'/pages/detail/detail?detail=' +
					JSON.stringify({
						id: item.goods_id,
						title: item.name
					})
			});
		}
	}
};
</script>

<style scoped>
.class-active {
	border-left: 8upx solid #fd6801;
	color: #fd6801 !important;
}
</style>
