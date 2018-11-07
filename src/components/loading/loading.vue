<template>
	<div class="wrapper-lodaing">
		<img width="24px" height="24px" src="~common/image/loading.gif">
		<p class="text">{{text}}</p>
	</div>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: '加载中...'
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~stylus/variable';
	.wrapper-lodaing{
		text-align: center;
		margin: auto;
		.text{
			line-height: 20px;
			font-size: $font-size-small;
			color: $color-text-l;
		}
	}
</style>
