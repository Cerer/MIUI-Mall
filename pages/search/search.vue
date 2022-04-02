<template>
	<!-- 搜索页 -->
	<view>
		<card headTitle="热门搜索" bodyCover="/static/images/search/search-banner.png"></card>

		<!-- 多色按钮 -->
		<view class="px-1 mb-2">
			<color-tag v-for="(item, index) of hot" :key="index" :item="item" @click="quickSearch(item.name)"></color-tag>
		</view>

		<!-- 常用分类 -->
		<card headTitle="常用分类" :bodyPadding="true" :headBorderBottom="false">
			<color-tag
				v-for="(item, index) of cate"
				:key="index"
				:item="item"
				:color="false"
				@click="quickSearch(item.name)"
			></color-tag>
		</card>

		<template v-if="historyList.length > 0">
			<!-- 分割线 -->
			<view class="cutLine"></view>

			<!-- 搜索记录 -->
			<card headTitle="搜索记录">
				<view slot="right" class="font text-primary" @click="clearHistory">清除搜索记录</view>
				<uni-list-item
					v-for="(item, index) in historyList"
					:key="index"
					:title="item"
					:showArrow="false"
					:showBadge="false"
					clickable
					@click="quickSearch(item)"
				></uni-list-item>
			</card>
		</template>
	</view>
</template>

<script>
import card from '@/components/common/card.vue';
import colorTag from '@/components/search/color-tag.vue';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	components: {
		card,
		colorTag,
		uniListItem
	},

	data() {
		return {
			// 搜索历史数据
			historyList: [],

			// 搜索关键字
			keyword: '',

			hot: [
				{
					name: '领卷中心'
				},
				{
					name: 'Redmi K20'
				},
				{
					name: 'RedmiBook 14'
				},
				{
					name: '智能积木 越野四驱车'
				},
				{
					name: '手环 腕带'
				}
			],

			cate: [
				{
					name: '耳机'
				},
				{
					name: '手机'
				},
				{
					name: '音箱'
				},
				{
					name: '手表'
				},
				{
					name: '配件'
				},
				{
					name: '网关/传感器'
				},
				{
					name: '健康'
				},
				{
					name: '酷玩'
				}
			]
		};
	},

	// 右边搜索按钮
	onNavigationBarButtonTap(e) {
		this.search();
	},

	// 监听搜索关键字
	onNavigationBarSearchInputChanged(e) {
		this.keyword = e.text;
	},

	// 搜索提交事件
	onNavigationBarSearchInputConfirmed() {
		this.search();
	},

	onShow() {
		// 获取本地缓存的历史数据
		let history = uni.getStorageSync('searchHistory');
		this.historyList = history ? JSON.parse(history) : [];
	},

	methods: {
		// 快速搜索
		quickSearch(name) {
			this.keyword = name;
			this.search();
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

			uni.navigateTo({
				url: '/pages/search-list/search-list?keyword=' + this.keyword,
				success: () => {
					this.addHistory();
				}
			});
		},

		// 加入搜索记录
		addHistory() {
			let index = this.historyList.indexOf(this.keyword);

			// 搜索历史记录不重复
			if (index === -1) {
				this.historyList.unshift(this.keyword);
			} else {
				//又重复搜索的字段置顶
				this.historyList.unshift(this.historyList.splice(index, 1)[0]);
			}

			// 超过6条,移除最后一条
			if (this.historyList.length > 6) {
				this.historyList.splice(this.historyList.length - 1, 1);
			}

			// 缓存到本地
			uni.setStorageSync('searchHistory', JSON.stringify(this.historyList));
		},

		// 清除搜索记录
		clearHistory() {
			uni.showModal({
				title: '提示',
				content: '是否要清除搜索历史?',
				cancelText: '取消',
				confirmText: '清除',
				success: res => {
					if (res.confirm) {
						uni.removeStorageSync('searchHistory');
						this.historyList = [];
					}
				}
			});
		}
	}
};
</script>

<style></style>
