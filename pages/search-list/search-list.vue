<template>
	<!-- 搜索页点击进去的商品列表 -->
	<view>
		<!-- #ifdef MP -->
		<!-- 自定义导航栏 -->
		<view class="d-flex a-center bg-white" style="height: 90rpx;position: fixed;top: 0;left: 0;right: 0;z-index: 100;">
			<input type="text" v-model="keyword" class="flex-1 bg-linght-muted rounded ml-3 px-2 py-1" placeholder="智能积木" />

			<!-- 右边 -->
			<view class="d-flex j-center a-center" style="width: 85rpx;" @click="search">搜索</view>
		</view>
		<view style="height: 90rpx;"></view>
		<!-- #endif -->

		<!-- 排序|筛选 -->
		<view
			class="d-flex border-top border-bottoms a-center position-fixed left-0 right-0 bg-white"
			style="height: 100upx;z-index: 100;"
		>
			<view
				class="flex-1 all-flex-row font-md"
				v-for="(item, index) of screen.list"
				:key="index"
				@tap="changeScreen(index)"
			>
				<text :class="screen.currentIndex === index ? 'main-text-color' : 'text-muted'">{{ item.name }}</text>
				<view class="text-linght-muted">
					<view
						class="iconfont icon-paixujiantoushang line-h0"
						:class="item.state === 1 ? 'main-text-color' : 'text-linght-muted'"
					></view>
					<view
						class="iconfont icon-paixujiantouxia line-h0"
						:class="item.state === 2 ? 'main-text-color' : 'text-linght-muted'"
					></view>
				</view>
			</view>

			<view class="flex-1 all-flex-row font-md main-text-color" @click="clickRDrawer('open')">筛选</view>
		</view>
		<view style="height: 100rpx;"></view>

		<!-- 筛选抽屉 -->
		<uni-drawer ref="showRight" mode="right" :width="280" @change="closeDrawer">
			<card headTitle="价格范围" :headBorderBottom="false" :headTitleWeight="false"></card>

			<!-- 单选按钮 -->
			<radio-groups :label="label" :selectIndex.sync="label.selectIndex"></radio-groups>

			<!-- 按钮 -->
			<view class="d-flex position-fixed bottom-0 right-0 w-100 font-md border-top border-light-secondary">
				<view class="flex-1 main-bg-color text-white text-center py-2" hover-class="main-bg-hover-color" @click="confirm">
					确定
				</view>
				<view class="flex-1 text-center py-2" hover-class="bg-linght-muted" @click="reset">重置</view>
			</view>
		</uni-drawer>

		<!-- 列表 -->
		<block v-for="(item, index) of list" :key="index"><search-list :item="item" :index="index"></search-list></block>

		<!-- 没有数据 -->
		<no-thing v-if="list.length === 0" mag="空空如也"></no-thing>

		<!-- 加载更多 -->
		<view class="all-flex-row text-linght-muted font-md py-3">{{ loadText }}</view>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue';
import radioGroups from '@/components/common/radio-group.vue';
import searchList from '@/components/search-list/search-list.vue';
import noThing from '@/components/common/no-thing.vue';

export default {
	components: {
		uniDrawer,
		card,
		radioGroups,
		searchList,
		noThing
	},
	data() {
		return {
			// 搜索关键词
			keyword: '',

			// 分页数
			page: 1,

			// 列表数据
			list: [],

			// 排序筛选
			screen: {
				currentIndex: 0,
				list: [
					{
						name: '综合',
						state: 2,
						key: 'all'
					},
					{
						name: '销量',
						state: 0,
						key: 'sale_count'
					},
					{
						name: '价格',
						state: 0,
						key: 'min_price'
					}
				]
			},

			// 筛选数据
			label: {
				selectIndex: 0,
				list: [
					{ name: '不限', rule: false, value: false },
					{ name: '0-50', rule: 'between', value: '0,50' },
					{ name: '50-100', rule: 'between', value: '50,100' },
					{ name: '100-500', rule: 'between', value: '100,500' },
					{ name: '500-1000', rule: 'between', value: '500,1000' },
					{ name: '大于1000', rule: '>', value: '1000' }
				]
			},

			//筛选条件组织
			condition: {},

			// 旧的筛选值
			oldSelected: 0,

			// 抽屉关闭状态
			drawerState: 'maskClose',

			// 1.上拉加载更多 2.加载中... 3.没有更多了
			loadText: '上拉加载更多'
		};
	},

	computed: {
		// 排序相关
		options() {
			let obj = this.screen.list[this.screen.currentIndex];
			let value = obj.state === 1 ? 'asc' : 'desc';
			return {
				[obj.key]: value
			};
		}
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.getData(true, () => {
			uni.showToast({
				title: '刷新成功',
				icon: 'none'
			});
			uni.stopPullDownRefresh();
		});
	},

	// 上拉刷新
	onReachBottom() {
		// 是否已经处于加载状态
		if (this.loadText !== '上拉加载更多') return;

		// 改变加载状态
		this.loadText = '加载中...';
		this.page++;

		// 请求数据
		this.getData();
	},

	// 顶部搜索框右边搜索按钮
	onNavigationBarButtonTap() {
		this.search();
	},

	// 搜索框
	onNavigationBarSearchInputChanged(e) {
		this.keyword = e.text;
	},

	// 搜索提交事件
	onNavigationBarSearchInputConfirmed() {
		this.search();
	},

	onLoad(e) {
		this.keyword = e.keyword;
		this.getData(false);
	},

	methods: {
		// 初始化搜索
		initSearch() {
			this.label.selectIndex = 0;
			this.condition = {};
			this.page = 1;
		},

		// 搜索
		search() {
			if (this.keyword === '') {
				return uni.showToast({
					title: '搜索关键词不能为空',
					icon: 'none'
				});
			}
			uni.hideKeyboard();

			this.addHistory();

			this.initSearch();

			this.getData(true);
		},

		// 添加搜索历史
		addHistory() {
			// 拿到当前搜索历史数据
			let history = uni.getStorageSync('searchHistory');
			history = history ? JSON.parse(history) : [];

			let index = history.indexOf(this.keyword);

			// 搜索历史记录不重复
			if (index === -1) {
				history.unshift(this.keyword);
			} else {
				//又重复搜索的字段置顶
				history.unshift(history.splice(index, 1)[0]);
			}

			// 缓存到本地
			uni.setStorageSync('searchHistory', JSON.stringify(history));
		},

		// 获取数据
		getData(refresh = false, callback = false) {
			let page = refresh ? 1 : this.page;
			this.api
				.post('/goods/search', {
					title: this.keyword,
					page: page,
					...this.options,
					...this.condition
				})
				.then(res => {
					let list = this.format(res);
					this.list = refresh ? [...list] : [...this.list, ...list];

					// 恢复加载状态
					this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多';

					if (typeof callback === 'function') {
						callback();
					}
				});
		},

		// 格式化数据
		format(res) {
			return res.map(v => {
				let good_num =
					v.comments_count === 0 ? 0 : this.util.formatDecimal((v.comments_good_count / v.comments_count) * 100, 2);
				return {
					id: v.id,
					title: v.title,
					titlePic: v.cover,
					desc: v.desc,
					pPrice: v.min_price,
					comment_num: v.comments_count,
					good_num: good_num + '%'
				};
			});
		},

		// 点击顶部筛选
		changeScreen(index) {
			// 判断当前点击是否是激活状态
			let oldIndex = this.screen.currentIndex;
			let oldItem = this.screen.list[oldIndex];
			if (oldIndex === index) {
				oldItem.state = oldItem.state === 1 ? 2 : 1;
				this.getData(true);
				return;
			}

			let newItem = this.screen.list[index];

			// 移除旧激活状态
			oldItem.state = 0;
			this.screen.currentIndex = index;

			// 增加新激活状态
			newItem.state = 1;

			this.getData(true);
		},

		// 点击筛选弹出
		clickRDrawer(type) {
			this.$refs.showRight[type]();
			this.oldSelected = this.label.selectIndex;
		},

		// 筛选确定
		confirm() {
			this.getCondition();

			// 获取数据
			this.getData(true);

			// 关闭抽屉
			this.drawerState = 'otherClose';
			this.$refs.showRight.close();
		},

		// 组织筛选条件
		getCondition() {
			let num = this.label.list[this.label.selectIndex];
			if (num.rule && num.value) {
				this.condition = {
					price: num.rule + ',' + num.value
				};
			} else {
				this.condition = {};
			}
		},

		// 关闭抽屉
		closeDrawer(e) {
			if (!e && this.drawerState === 'maskClose') {
				// 恢复原来的值
				this.label.selectIndex = this.oldSelected;
				this.oldSelected = 0;
			}

			this.drawerState = 'maskClose';
		},

		// 重置
		reset() {
			this.condition = {};
			this.label.selectIndex = 0;
			this.getData(true);
			this.drawerState = 'otherClose';
			this.$refs.showRight.close();
		}
	}
};
</script>

<style scoped>
.radio-active {
	background: #fce0d5 !important;
	color: #eb7320 !important;
	border-color: #eb7320 !important;
}
</style>
