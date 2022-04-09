<!-- 订单公共按钮 -->
<template>
	<view class="">
		<view
			class="ml-2 rounded border border-light-secondary px-2 py-1 text-secondary"
			hover-class="bg-linght-muted"
			@click.stop="$emit('click')"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script></script>

<style></style>
