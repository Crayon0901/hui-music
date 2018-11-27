<template>
	<div class="search-box">
		<i class="icon-search"></i>
		<input type="text" v-model="text" name="search" class="search" :placeholder="placeholder">
		<i class="icon-dismiss" v-show="text"></i>
	</div>
</template>

<script>
	export default{
		props:{
			placeholder:{
				type: String,
				default: '搜索歌曲、歌手'
			}
		},
		data(){
			return {
				text: ''
			}
		},
		methods: {
		},
		watch: {
			text(newValue){
				this.$emit('change', newValue)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable';
	@import '~common/stylus/mixin';
	.search-box{
		flex-row(flex-start, center)
		height: 40px;
		background-color: $color-highlight-background;
		border-radius: 5px;
		.icon-search{
			padding: 0 5px;
			font-size: 24px;
			color: $color-dialog-background;
		}
		.search{
			flex: 1;
			background-color: $color-highlight-background;
			color: $color-text-d;
			height: 25px;
			font-size: $font-size-medium;
		}
		.search:focus{
			outline:none;
		}
		.icon-dismiss{
			padding: 0 5px;
			font-size: 16px;
			color: $color-dialog-background;
		}
	}
</style>
