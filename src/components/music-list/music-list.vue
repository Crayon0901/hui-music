<template>
	<div class="wrapper">
		<div class="title">
			<div class="back-btn" @click="back">
				<i class="icon-back"></i>
			</div>
			<h2>{{title}}</h2>
		</div>
		<div class="bg-image" :style="bgStyle">
			<div class="play-wrapper">
				<div class="play">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			bgImage: {
				type: String,
				default: ''
			},
			songs: {
				type: Array,
				default: []
			}
		},
		methods: {
			back(){
				this.$router.back();
			}
		},
		computed: {
			bgStyle(){
				return `background-image: url(${this.bgImage})`
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable';
	@import '~common/stylus/mixin';
	.wrapper{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: $color-background;
		z-index: 99;
		.title{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 44px;
			text-align: center;
			font-size: $font-size-large-x;
			line-height: 40px;
			no-wrap();
			.back-btn{
				position: absolute;
				top: 0;
				left: 6px;
				z-index: 50;
				text-align: center;
				.icon-back{
					display: block;
					padding: 10px;
					font-size: $font-size-large-x;
				}
			}
		}
		.bg-image{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 70%;
			transform-origin: top; /*旋转的中心点,top,right*/
			background-size: cover;
			.play-wrapper{
				position: absolute;
				bottom: 20px;
				z-index: 50;
				width: 100%;
				.play{
					box-sizing: border-box;
					width: 135px;
					padding: 7px 0;
					margin: 0 auto;
					text-align: center;
					border: 1px solid $color-theme;
					color: $color-theme;
					border-radius: 100px;
					font-size: 0;
					.icon-play{
						display: inline-block;
						vertical-align: middle;
						margin-right: 6px;
						font-size: $font-size-medium-x;
					}
					.text{
						display: inline-block;
						vertical-align: middle;
						font-size: $font-size-small;
					}
				}
			}
		}
	}
</style>
