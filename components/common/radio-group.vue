<template>
	<view class="row">
		<view class="span24-8 px-2 mb-2" v-for="(item, index) of label.list" :key="index">
			<view
				:class="label.selectIndex === index ? 'radio-active' : 'border-light-secondary'"
				class="px-2 py-1 bg-linght-muted font-md text-center rounded border"
				@tap="changeRadio(index)"
			>
				{{ item.name }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		label: Object
	},

	methods: {
		changeRadio(index) {
			this.$emit('update:selectIndex', index);
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
