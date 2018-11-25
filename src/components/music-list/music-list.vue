<template>
	<div class="wrapper">
		<div class="back-btn" @click="back">
			<i class="icon-back"></i>
		</div>
		<div class="title" ref="Title">
			<h2 class="title-text">{{title}}</h2>
		</div>
		<div class="bg-image" :style="bgStyle" ref="BGImage">
			<div class="play-wrapper" ref="playBtn">
				<div class="play">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter" ref="filter"></div>
		</div>
		<div class="bg-layer" ref="layer"></div>
		<div class="wrapper-songlist" ref="wrapperSongList">
			<songList :songs="songs" @scroll="scrollAction" @selectItem="selectItem"></songList>
		</div>
	</div>
</template>

<script>
	import songList from 'components/song-list/song-list';
	import {mapActions} from 'vuex';
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
			},
			scrollAction(y){
		        let scale = 1;
		        let blur = 0;
				const percent = Math.abs(y / this.Imageheight)
				if (this.Imageheight - this.Titleheight + y > 0) {
					this.$refs.layer.style['transform'] = `translate3d(0,${y}px,0)`;
					this.$refs.BGImage.style.paddingTop = '70%';
					this.$refs.BGImage.style.height = 0;
					this.$refs.playBtn.style.display = '';
					this.$refs.BGImage.style.zIndex = 0;
				}else{
					this.$refs.BGImage.style.zIndex = 2;
					this.$refs.BGImage.style.paddingTop = 0;
					this.$refs.BGImage.style.height = `${this.Titleheight}px`;
					this.$refs.playBtn.style.display = 'none'
				}
		        if (y > 0) {
					scale = 1 + percent;
			        this.$refs.BGImage.style.zIndex = 2;
		        } else {
					blur = Math.min(20, percent * 20)
		        }
		        this.$refs.filter.style['backdrop'] = `blur(${blur}px)`
		        this.$refs.BGImage.style['transform'] = `scale(${scale})`;
			},
			selectItem(songs, item, index){
				// 拿到全部播放的songlist，和当前点击的index，这个时候就需要去mutations多个state，可以使用acion封装统一修改
				this.selectplay({
					list: songs,
					index
				})
			},
			...mapActions([
				'selectplay'
			])
		},
		computed: {
			bgStyle(){
				return this.bgImage ? `background-image: url(${this.bgImage})`: ''
			}
		},
		mounted(){
			this.$refs.wrapperSongList.style.top = this.$refs.BGImage.clientHeight + 'px';
			this.Imageheight = this.$refs.BGImage.clientHeight;
			this.Titleheight = this.$refs.Title.clientHeight;
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
		z-index: 100;
		.back-btn{
			position: absolute;
			top: 0;
			left: 6px;
			z-index: 4;
			text-align: center;
			.icon-back{
				display: block;
				padding: 10px;
				font-size: $font-size-large-x;
			}
		}
		.title{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 44px;
			text-align: center;
			font-size: $font-size-large;
			line-height: 40px;
			z-index: 3;
			no-wrap();
			.title-text{
				color: $color-text;
			}
		}
		.bg-image{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 70%; /*width: 100%;padding-top: 70%;,设置了宽高比为10：7*/
			transform-origin: top; /*旋转的中心点,top,right*/
			background-size: cover;
			z-index: 0;
			.play-wrapper{
				position: absolute;
				bottom: 20px;
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
				z-index: -1;
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
		}
		.wrapper-songlist{
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			background: $color-background;
		}
	}
</style>
