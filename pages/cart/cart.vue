<template>
	<view class="">cart</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {};
	},

	computed: {
		...mapState({
			list: state => state.cart.list
		}),

		...mapGetters({
			activeList: 'activeList'
		})
	},

	onLoad() {
		// 直接调用
		// console.log(this.$store.state.cart.list);

		console.log(this.activeList);
	},

	methods: {}
};
</script>

<style></style>
