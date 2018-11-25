<template>
	<div class="player" v-show="this.playList.length">
		<transition name="normal">
			<div class="normal-player" v-show="this.fullVisiblePlayer">
				<div class="background" :style="backgroundImage"></div>
				<div class="top">
					<div class="back" @click="showMiniPlayer">
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
							<i :class="playIcon" @click="togglePlaying"></i>
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
		</transition>
		<transition name="mini">
			<div class="mini-player" v-show="!this.fullVisiblePlayer" @click="showNormalPlayer">
				<div class="mini-image">
					<img :src="this.currentSong.image" alt="">
				</div>
				<div class="text">
					<p class="song-name">{{this.currentSong.name}}</p>
					<p class="singer-name">{{this.currentSong.singer}}</p>
				</div>
				<div class="playIcon">
					<i class="icon-play-mini"></i>
				</div>
				<div class="listIcon">
					<i class="icon-playlist"></i>
				</div>
			</div>
		</transition>
		<audio style="display: none;" ref="audio" :src="this.currentSong.url"></audio>
	</div>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex';
	export default {
		
		methods: {
			togglePlaying(){
				this.set_playing(!this.playing)
				if (this.playing) {
					this.$refs.audio.play()
				}else{
					this.$refs.audio.pause()
				}
			},
			showMiniPlayer(){
				this.set_full_play(false);
			},
			showNormalPlayer(){
				this.set_full_play(true);
			},
			...mapMutations({
				set_playing: 'SET_PLAYING',
				set_full_play: 'SET_FULL_VISIBLE_PLAYER'
			})
		},
		computed: {
			backgroundImage(){
				return this.currentSong.image ? `background: url('${this.currentSong.image}') no-repeat center center;    background-size: 100% 100%;` : ''
			},
			playIcon() {
				return this.playing ? 'icon-pause' : 'icon-play'
			},
			...mapGetters([
				'fullVisiblePlayer',
				'playList',
				'currentSong',
				'playing'
			])
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable';
	@import '~common/stylus/mixin';
	.normal-enter-active, .normal-leave-active{
		transition: all .4s
		.top, .footer{
			transition: all .4s
		}
		.middle{
			.middle-l{
				.cd-wrapper{
					transition: all .4s
				}
			}
		}
	}
	.normal-enter, .normal-leave-to{
		opacity: 0;
		.top{
			transform: translate3d(0, -100px, 0);
		}
		.footer{
			transform: translate3d(0, 100px, 0);
		}
		.middle{
			.middle-l{
				.cd-wrapper{
					transform: translate3d(-40%, 200%, 0) scale(.2,.3);
				}
			}
		}
	}
	.mini-enter-active, .mini-leave-active{
		transition: all .4s
	}
	.mini-enter, .mini-leave-to{
		opacity: 0;
		transform: translate3d(0, 100px, 0);
	}
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
		.mini-player{
			position: fixed;
			width: 100%;
			bottom: 0;
			height: 60px;
			background-color: $color-highlight-background;
			z-index: 150;
			text-align: center;
			display: flex;
			align-items: center;
			.mini-image{
				width: 40px;
				padding: 0 10px 0 20px;
				flex: 0 0 40px;
				img{
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
			}
			.text{
				flex: 1;
				flex-column(column, flex-start);
				line-height: 20px;
				font-size:$font-size-small;
				.song-name{
					color: $color-text;
					margin-bottom: 3px;
				}
				.singer-name{
					color: $color-text-d;
				}
			}
			.playIcon{
				width: 30px;
				padding: 0 10px;
				flex: 0 0 30px;
				font-size: 30px;
			}
			.listIcon{
				width: 30px;
				padding: 0 10px;
				flex: 0 0 30px;
				font-size: 30px;
			}
		}
	}
</style>
