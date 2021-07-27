<template>
	<!-- 消息通知列表 -->
	<view class="p-2">
		<view
			class="mb-2 p-2 bg-white rounded"
			hover-class="bg-linght-muted"
			v-for="(item, index) in list"
			:key="index"
			@click="openDetail(item)"
		>
			<view class="text-dark font-md line-h-md">{{ item.title }}</view>
			<view class="text-linght-muted font">{{ item.desc }}</view>
			<view class="text-linght-muted font">{{ item.create_time }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					title: '蒹葭苍苍,白露为霜;所谓伊人,在水一方.',
					desc: '诗经 无名氏',
					create_time: '公元前xx年'
				},
				{
					title: '蒹葭苍苍,白露为霜;所谓伊人,在水一方.',
					desc: '诗经 无名氏',
					create_time: '公元前xx年'
				},
				{
					title: '蒹葭苍苍,白露为霜;所谓伊人,在水一方.',
					desc: '诗经 无名氏',
					create_time: '公元前xx年'
				},
				{
					title: '蒹葭苍苍,白露为霜;所谓伊人,在水一方.',
					desc: '诗经 无名氏',
					create_time: '公元前xx年'
				},
				{
					title: '蒹葭苍苍,白露为霜;所谓伊人,在水一方.',
					desc: '诗经 无名氏',
					create_time: '公元前xx年'
				},
				{
					title: '蒹葭苍苍,白露为霜;所谓伊人,在水一方.',
					desc: '诗经 无名氏',
					create_time: '公元前xx年'
				},
				{
					title: '蒹葭苍苍,白露为霜;所谓伊人,在水一方.',
					desc: '诗经 无名氏',
					create_time: '公元前xx年'
				}
			]
		};
	},

	methods: {
		// 打开详情
		openDetail(item) {
			uni.navigateTo({
				url: '../msg-detail/msg-detail?detail=' + JSON.stringify(item)
			});
		}
	}
};
</script>

<style>
page {
	background: #eeeeee;
}
</style>
