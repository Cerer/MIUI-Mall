<template>
	<!-- 首页 -->
	<view class="content">
		<!-- #ifdef MP -->
		<!-- 自定义导航栏 -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 左边 -->
			<view class="d-flex j-center a-center" style="width: 85rpx;"><text class="iconfont icon-xiaoxi1"></text></view>

			<!-- 中间 -->
			<view class="flex-1 bg-linght-muted rounded d-flex a-center text-linght-muted" style="height: 65rpx;">
				<text class="iconfont icon-sousuo mx-2"></text>
				智能积木
			</view>

			<!-- 右边 -->
			<view class="d-flex j-center a-center" style="width: 85rpx;"><text class="iconfont icon-richscan_icon"></text></view>
		</view>
		<!-- #endif -->

		<!-- 顶部选项卡 -->
		<scroll-view
			scroll-x
			class="border-bottom scroll-row"
			style="height: 80rpx;"
			:scroll-into-view="scrollinto"
			:scroll-with-animation="true"
		>
			<view
				class="scroll-row-item px-3"
				style="height: 80rpx;line-height: 80rpx;"
				v-for="(item, index) of tabBars"
				:key="index"
				:class="tabIndex === index ? 'main-text-color scroll-border-bottom' : ''"
				:id="'tab' + index"
				@click="changeTab(index)"
			>
				<text class="font-md">{{ item.name }}</text>
			</view>
		</scroll-view>

		<swiper :duration="150" :style="'height:' + scrollH + 'px;'" @change="onChangeTab">
			<swiper-item v-for="(item, index) of newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadMore(index)">
					<template v-if="item.list.length > 0">
						<block v-for="(list, listIndex) in item.list" :key="listIndex">
							<!-- 轮播图组件 -->
							<com-swipers v-if="list.type === 'swiper'" :resdata="list.data"></com-swipers>

							<template v-else-if="list.type === 'indexnavs'">
								<!-- 首页分类 -->
								<com-nav :resdata="list.data"></com-nav>

								<!-- 分割线 -->
								<view class="cutLine"></view>
							</template>

							<template v-else-if="list.type === 'threeAdv'">
								<!-- 三图广告 -->
								<three-adv :resdata="list.data"></three-adv>

								<!-- 分割线 -->
								<view class="cutLine"></view>
							</template>

							<!-- 大图广告位 -->
							<!-- <card headTitle="每日精选" bodyCover="/static/images/index/banner/1.jpg" /> -->

							<view v-if="list.type === 'list'" class="row j-sb">
								<block v-for="(keyItem, keyIndex) in list.data" :key="keyIndex">
									<com-list :item="keyItem" :index="keyIndex"></com-list>
								</block>
							</view>
						</block>

						<!-- 分割线 -->
						<view class="cutLine"></view>

						<!-- 加载更多 -->
						<view class="all-flex-row text-linght-muted font-md py-3">{{ item.loadText }}</view>
					</template>

					<!-- 加载中 -->
					<template v-else-if="item.firstLoad === 'before' || item.firstLoad === 'ing'">
						<view class="d-flex j-center a-center pt-5"><text class="font-md text-muted">加载中...</text></view>
					</template>

					<!-- 空数据 -->
					<template v-else>
						<view class="d-flex j-center a-center pt-5"><text class="font-md text-muted">暂无数据</text></view>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import comSwipers from '@/components/index/com-swiper.vue';
import comNav from '@/components/index/com-nav.vue';
import threeAdv from '@/components/index/three-adv.vue';
import card from '@/components/common/card.vue';
import comList from '@/components/common/com-list.vue';

export default {
	components: {
		comSwipers,
		comNav,
		threeAdv,
		card,
		comList
	},
	data() {
		return {
			scrollinto: '',
			scrollH: 500,
			tabIndex: 0,
			tabBars: [],

			newsList: []
		};
	},

	// 点击搜索框
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url: '/pages/search/search'
		});
	},

	// 点击顶部按钮
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			uni.navigateTo({
				url: '../msg-list/msg-list'
			});
		}
	},

	onLoad() {
		// 获取可视区域高度
		uni.getSystemInfo({
			success: res => {
				let nabH = 0;
				// #ifdef MP
				nabH = 0;
				// #endif

				// #ifndef MP
				nabH = uni.upx2px(90);
				// #endif

				this.scrollH = res.windowHeight - uni.upx2px(82) - nabH;
			}
		});
		this.__init();
	},
	methods: {
		// 初始化数据
		__init() {
			this.api.get('/index_category/data').then(res => {
				// 获取顶部选项卡
				this.tabBars = res.category;

				//根据顶部选项卡生成页面
				let arr = [];
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						list: [],

						// 1.上拉加载更多 2.加载中... 3.没有更多了
						loadText: '上拉加载更多',
						firstLoad: 'before'
					};

					// 获取首屏数据
					if (i === 0) {
						obj.list = res.data;
						obj.firstLoad = 'after';
					}
					arr.push(obj);
				}
				this.newsList = arr;
			});
		},

		// 加载数据
		async addData(callback = false) {
			let index = this.tabIndex;

			let obj = this.newsList[index];

			// 拿到当前分类id
			let id = this.tabBars[index].id;

			// 拿到当前分类的分页数
			let page = Math.ceil(obj.list.length / 5) + 1;

			// 请求加载中
			if (page === 1) {
				obj.firstLoad = 'ing';
			}

			let data = await this.api.get('/index_category/' + id + '/data/' + page);

			// 请求完成
			if (page === 1) {
				obj.firstLoad = 'after';
			}

			if (data) {
				// 赋值
				obj.list = [...obj.list, ...data];
				obj.loadText = data.length < 5 ? '没有更多了' : '上拉加载更多';
			}

			// 执行回调函数
			if (typeof callback === 'function') {
				callback();
			}
		},

		// 切换选项卡
		changeTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.scrollinto = 'tab' + index;

			if (this.newsList[index].firstLoad === 'after') {
				return;
			}
			this.addData();
		},

		// 监听滑动
		onChangeTab(e) {
			this.changeTab(e.detail.current);
		},

		// 上拉加载
		loadMore(index) {
			let item = this.newsList[index];

			// 是否处于可加载状态
			if (item.loadText !== '上拉加载更多') return;

			// 模拟加载
			item.loadText = '加载中...';

			this.addData(() => {
				// 恢复状态
				uni.showToast({
					title: '加载成功',
					icon: 'none'
				});
			});
		}
	}
};
</script>

<style scoped>
.content {
	/* padding-bottom: 100upx; */
}
</style>
