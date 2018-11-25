<template>
	<div class="player" v-show="playList.length">
		<div class="normal-player" v-show="fullVisiblePlayer">
			<div class="background" :style="backgroundImage"></div>
			<div class="top">
				<div class="back">
					<i class="icon-back"></i>
				</div>
				<h1 class="title">{{this.currentSong.name}}</h1>
				<h2 class="subtitle">{{this.currentSong.singer}}</h2>
			</div>
			<div class="middle">
				<div class="middle-l">
					<div class="cd-wrapper">
						<div class="cd">
                			<img class="image" :src="this.currentSong.image">
            			</div>
					</div>
				</div>
			</div>
			<div class="footer">
				<div class="operators">
					<div class="icon i-left">
						<i class="icon-sequence"></i>
					</div>
					<div class="icon i-left">
						<i class="icon-prev"></i>
					</div>
					<div class="icon i-center">
						<i class="icon-play"></i>
					</div>
					<div class="icon i-right">
						<i class="icon-next"></i>
					</div>
					<div class="icon i-right">
						<i class="icon icon-not-favorite"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="mini-player" v-show="!fullVisiblePlayer">
			mini播放器
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default {
		computed: {
			backgroundImage(){
				return this.currentSong.image ? `background: url('${this.currentSong.image}') no-repeat center center;    background-size: 100% 100%;` : ''
			},
			...mapGetters([
				'fullVisiblePlayer',
				'playList',
				'currentSong'
			])
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable';
	@import '~common/stylus/mixin';
	.player{
		.normal-player{
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: $color-background;
			z-index: 150;
			.background{
				position: absolute;
				top: 0;
				bottom: 0;
				width: 100%;
				z-index: -1;
				opacity: 0.6;
				filter: blur(20px);
			}
			.top{
				position: relative;
				margin-bottom: 25px;
				.back{
					position: absolute;
					top: 0;
					left: 6px;
					z-index: 50;
					.icon-back{
						display: inline-block;
						padding: 9px;
						font-size: $font-size-large-x;
						transform: rotate(-90deg);
					}
				}
				.title{
					width: 70%;
					margin: 0 auto;
					line-height: 40px;
					no-wrap();
					font-size: $font-size-large;
					text-align: center;
					color: $color-text;
				}
				.subtitle{
					line-height: 20px;
					font-size: $font-size-medium;
					text-align: center;
					color: $color-text;
				}
			}
			.middle{
				position: fixed;
				width: 100%;
				top: 80px;
				bottom: 170px;
				white-space: nowrap;
				font-size: 0;
				.middle-l{
					display: inline-block;
					vertical-align: top;
					position: relative;
					width: 100%;
					height: 0;
					padding-top: 80%;
					.cd-wrapper{
						position: absolute;
						left: 10%;
						top: 0;
						width: 80%;
						height: 100%;
						.cd{
							width: 100%;
							height: 100%;
							box-sizing: border-box;
							border: 10px solid rgba(255, 255, 255, .1);
							border-radius: 50%;
							.image{
								position: absolute;
								left: 0;
								top: 0;
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
					}
				}
			}
			.footer{
				position: absolute;
				bottom: 50px;
				width: 100%;
				.operators{
					display: flex;
					align-items: center;
					.icon{
						flex:1;
						&.disable{
							color: $color-theme-d
						}
						i{
							font-size: 30px;
						}
					}
					.i-left{
						text-align: right
					}
					.i-center{
						padding: 0 20px;
						text-align: center;
						i{
							font-size: 40px;
						}
					}
					.i-right{
						text-align: left;
					}
					.icon-not-favorite{
						color: color-sub-theme;
					}
				}
			}
		}
	}
</style>
