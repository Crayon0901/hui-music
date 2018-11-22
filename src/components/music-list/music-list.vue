<template>
	<div class="wrapper">
		<div class="title">
			<div class="back-btn" @click="back">
				<i class="icon-back"></i>
			</div>
			<h2 class="title-text">{{title}}</h2>
		</div>
		<div class="bg-image" :style="bgStyle" ref="BGImage">
			<div class="play-wrapper">
				<div class="play">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter" ref="filter"></div>
		</div>
		<div class="bg-layer" ref="layer"></div>
		<div class="wrapper-songlist" ref="wrapperSongList">
			<songList :songs="songs" @scroll="scrollAction" :isMaxHeight="isMaxHeight"></songList>
		</div>
	</div>
</template>

<script>
	import songList from 'components/song-list/song-list';
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
		data(){
			return {
				isMaxHeight: false
			}
		},
		methods: {
			back(){
				this.$router.back();
			},
			scrollAction(y){
				const Imageheight = this.$refs.BGImage.clientHeight;
				const SongListHeight = this.$refs.wrapperSongList.offsetTop;
				console.log(SongListHeight,y)
				if (Imageheight - 44 + y > 0) {
					this.isMaxHeight = false;
					this.$refs.layer.style['transform'] = `translate3d(0,${y}px,0)`;
					// this.$refs.wrapperSongList.style.top = (Imageheight + y) + 'px'
				}else{
					this.$refs.wrapperSongList.style.overflow = 'hidden';
					// this.isMaxHeight = true;
				}
			}
		},
		computed: {
			bgStyle(){
				return this.bgImage ? `background-image: url(${this.bgImage})`: ''
			}
		},
		mounted(){
			this.$refs.wrapperSongList.style.top = this.$refs.BGImage.clientHeight + 'px';
		},
		components: {
			songList
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
			font-size: $font-size-large;
			line-height: 40px;
			z-index: 50;
			no-wrap();
			.back-btn{
				position: absolute;
				top: 0;
				left: 6px;
				z-index: 40;
				text-align: center;
				.icon-back{
					display: block;
					padding: 10px;
					font-size: $font-size-large-x;
				}
			}
			.title-text{
				color: $color-text;
			}
		}
		.bg-image{
			background-image: url('~common/image/logo@2x.png');
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
			.filter{
				position: absolute;
				top: 0;
				bottom: 0;
				width: 100%;
				background: rgba(7, 17, 27, 0.4)
			}
		}
		.bg-layer{
			position: relative;
			height: 100%;
			background: $color-background;
		    z-index: 60;
		}
		.wrapper-songlist{
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			background: $color-background;
			z-index: 60;
		}
	}
</style>
