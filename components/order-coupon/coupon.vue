<template>
	<view class="bg-white rounded border d-flex a-center border-light-secondary mb-3" @click="$emit('onClick')">
		<view class="flex-1 d-flex flex-column j-center px-3">
			<view class="font-md" :class="item.disabled || !item.status ? 'text-linght-muted' : ''">{{ item.title }}</view>
			<view class="font text-linght-muted">
				{{ $moment.unix(item.start_time).format('YYYY-MM-DD HH:mm') }}~{{
					$moment.unix(item.end_time).format('YYYY-MM-DD HH:mm')
				}}
			</view>
		</view>
		<view
			class="text-white all-flex-column"
			:class="item.disabled || !item.status ? 'bg-secondary' : 'main-bg-color'"
			style="width: 220rpx;height: 200rpx;"
		>
			<view class="font-md line-h">
				{{ item.price }}
				<text class="font">{{ item.type === 0 ? '元' : '折' }}</text>
			</view>
			<view class="font">{{ item.desc }}</view>
			<view
				class="border rounded bg-white w-50 text-center"
				:class="item.disabled || !item.status ? 'text-secondary' : 'main-text-color'"
				hover-class="bg-light"
			>
				<slot>{{ item.status ? '去使用' : '已失效' }}</slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	}
};
</script>

<style></style>
