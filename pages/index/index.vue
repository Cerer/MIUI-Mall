<template>
	<view class="content">
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
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'">
					<block v-for="(list, listIndex) of item.list" :key="listIndex">
						<!-- 轮播图组件 -->
						<com-swipers v-if="list.type === 'swipers'" :resdata="list.data"></com-swipers>

						<template v-else-if="list.type === 'indexNavs'">
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
						<card headTitle="每日精选" bodyCover="/static/images/index/banner/1.jpg" />

						<view v-if="list.type === 'commonList'" class="row j-sb">
							<block v-for="(keyItem, keyIndex) of list.data" :key="keyIndex">
								<com-list :item="keyItem" :index="keyIndex"></com-list>
							</block>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
// 模拟后端数据
let demoTabs = [
	{
		name: '推荐'
	},
	{
		name: '体育'
	},
	{
		name: '热点'
	},
	{
		name: '财经'
	},
	{
		name: '娱乐'
	},
	{
		name: '军事'
	},
	{
		name: '历史'
	},
	{
		name: '本地'
	}
];

let demo1 = [
	{
		type: 'swipers',
		data: [
			{
				src: '../../static/images/index/banner/1.jpg'
			},
			{
				src: '../../static/images/index/banner/1.jpg'
			},
			{
				src: '../../static/images/index/banner/1.jpg'
			}
		]
	},
	{
		type: 'indexNavs',
		data: [
			{
				src: '../../static/images/index/nav/1.png',
				text: '新品分类'
			},
			{
				src: '../../static/images/index/nav/2.gif',
				text: '小米众筹'
			},
			{
				src: '../../static/images/index/nav/3.gif',
				text: '以旧换新'
			},
			{
				src: '../../static/images/index/nav/4.gif',
				text: '1分拼团'
			},
			{
				src: '../../static/images/index/nav/5.gif',
				text: '超值特卖'
			},
			{
				src: '../../static/images/index/nav/6.gif',
				text: '小米秒杀'
			},
			{
				src: '../../static/images/index/nav/7.gif',
				text: '真心想要'
			},
			{
				src: '../../static/images/index/nav/8.gif',
				text: '电视热卖'
			},
			{
				src: '../../static/images/index/nav/9.gif',
				text: '家电热卖'
			},
			{
				src: '../../static/images/index/nav/10.gif',
				text: '米粉卡'
			}
		]
	},
	{
		type: 'threeAdv',
		data: {
			big: {
				src: '/static/images/index/contentImag/1.jpg'
			},
			smallTop: {
				src: '/static/images/index/contentImag/2.jpg'
			},
			smallBottom: {
				src: '/static/images/index/contentImag/2.jpg'
			}
		}
	},

	{
		type: 'commonList',
		data: [
			{
				cover: '/static/images/list/1.jpg',
				title: '米家空调',
				desc: '1.5匹频率',
				oPrice: 2699,
				pPrice: 1366
			},
			{
				cover: '/static/images/list/1.jpg',
				title: '米家空调',
				desc: '1.5匹频率',
				oPrice: 2699,
				pPrice: 1366
			},
			{
				cover: '/static/images/list/1.jpg',
				title: '米家空调',
				desc: '1.5匹频率',
				oPrice: 2699,
				pPrice: 1366
			},
			{
				cover: '/static/images/list/1.jpg',
				title: '米家空调',
				desc: '1.5匹频率',
				oPrice: 2699,
				pPrice: 1366
			}
		]
	}
];

let demo2 = [
	{
		type: 'swipers',
		data: [
			{
				src: '../../static/images/index/banner/1.jpg'
			},
			{
				src: '../../static/images/index/banner/1.jpg'
			},
			{
				src: '../../static/images/index/banner/1.jpg'
			}
		]
	},
	{
		type: 'indexNavs',
		data: [
			{
				src: '../../static/images/index/nav/1.png',
				text: '新品分类'
			},
			{
				src: '../../static/images/index/nav/2.gif',
				text: '小米众筹'
			},
			{
				src: '../../static/images/index/nav/3.gif',
				text: '以旧换新'
			},
			{
				src: '../../static/images/index/nav/4.gif',
				text: '1分拼团'
			},
			{
				src: '../../static/images/index/nav/5.gif',
				text: '超值特卖'
			},
			{
				src: '../../static/images/index/nav/6.gif',
				text: '小米秒杀'
			},
			{
				src: '../../static/images/index/nav/7.gif',
				text: '真心想要'
			},
			{
				src: '../../static/images/index/nav/8.gif',
				text: '电视热卖'
			},
			{
				src: '../../static/images/index/nav/9.gif',
				text: '家电热卖'
			},
			{
				src: '../../static/images/index/nav/10.gif',
				text: '米粉卡'
			}
		]
	},
	{
		type: 'commonList',
		data: [
			{
				cover: '/static/images/list/1.jpg',
				title: '米家空调',
				desc: '1.5匹频率',
				oPrice: 2699,
				pPrice: 1366
			},
			{
				cover: '/static/images/list/1.jpg',
				title: '米家空调',
				desc: '1.5匹频率',
				oPrice: 2699,
				pPrice: 1366
			},
			{
				cover: '/static/images/list/1.jpg',
				title: '米家空调',
				desc: '1.5匹频率',
				oPrice: 2699,
				pPrice: 1366
			},
			{
				cover: '/static/images/list/1.jpg',
				title: '米家空调',
				desc: '1.5匹频率',
				oPrice: 2699,
				pPrice: 1366
			}
		]
	}
];
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
	onLoad() {
		// 获取可视区域高度
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(82);
			}
		});
		this.__init();
	},
	methods: {
		// 初始化数据
		__init() {
			// 获取顶部选项卡
			this.tabBars = demoTabs;

			//根据顶部选项卡生成页面
			let arr = [];
			for (let i = 0; i < this.tabBars.length; i++) {
				let obj = {
					list: []
				};

				// 获取首屏数据
				if (i === 0) {
					obj.list = demo1;
				}
				arr.push(obj);
			}
			this.newsList = arr;
		},

		// 切换选项卡
		changeTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.scrollinto = 'tab' + index;
			this.addData(this.tabIndex);
		},

		// 监听滑动
		onChangeTab(e) {
			this.changeTab(e.detail.current);
		},

		// 加载数据
		addData(index) {
			if (index === 0) {
				this.newsList[index].list = demo1;
			} else {
				this.newsList[index].list = demo2;
			}
		}
	}
};
</script>

<style scoped>
.content {
	/* padding-bottom: 100upx; */
}
</style>
