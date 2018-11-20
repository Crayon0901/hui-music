<template>
	<transition name="slide">
		<div class="wrapper">{{this.$route.params.id}}</div>
	</transition>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
	.wrapper{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: $color-background;
		z-index: 99;
	}
	.slide-enter-active, .slide-leave-active {
		transition: all .3s
	}
	.slide-enter, .slide-leave-to {
		transform: translate3d(100%,0,0);
	}
</style>
