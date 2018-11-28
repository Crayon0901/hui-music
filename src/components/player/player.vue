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
	                			<img class="image" :class="rotateImage" :src="this.currentSong.image">
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
							<i class="icon-prev" @click="prevSong"></i>
						</div>
						<div class="icon i-center">
							<i :class="playIcon" @click="togglePlaying"></i>
						</div>
						<div class="icon i-right">
							<i class="icon-next" @click="nextSong"></i>
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
					<img :src="this.currentSong.image" alt="" class="miniImage" :class="rotateImage">
				</div>
				<div class="text">
					<p class="song-name">{{this.currentSong.name}}</p>
					<p class="singer-name">{{this.currentSong.singer}}</p>
				</div>
				<div class="playIcon">
					<i :class="miniplayIcon" @click.stop.prevent="togglePlaying"></i>
				</div>
				<div class="listIcon">
					<i class="icon-playlist"></i>
				</div>
			</div>
		</transition>
		<audio style="display: none;" ref="audio" :src="this.currentSong.url" @canplay="ready" @error="error" @ended="ended"></audio>
	</div>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex';
	export default {
		data(){
			return {
				isready: false
			}
		},
		methods: {
			togglePlaying(){
				// if (!this.isready) { // 防止连续点击出现src还没有加载好报错的问题
				// 	return
				// }
				this.set_playing(!this.playing);
				if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && this.playing) {
					this.$refs.audio.play()
				}else{
					this.$refs.audio.pause()
				}
				// this.isready = false;
			},
			showMiniPlayer(){
				this.set_full_play(false);
			},
			showNormalPlayer(){
				this.set_full_play(true);
			},
			nextSong(){
				if (!this.isready) { // 防止连续点击出现src还没有加载好报错的问题
					return
				}
				const index = (this.currentIndex + 1 >= this.playList.length) ? 0 : this.currentIndex+1;
				this.set_current_index(index);
				this.set_playing(true);
				this.isready = false;
			},
			prevSong(){
				if (!this.isready) { // 防止连续点击出现src还没有加载好报错的问题
					return
				}
				const index = this.currentIndex - 1 < 0 ? this.playList.length-1 : this.currentIndex-1;
				this.set_current_index(index);
				this.set_playing(true);
				this.isready = false;
			},
			ready(){ // audio的属性，src加载完毕可以播放时候会调用这个方法，表示歌曲已经就绪可以播放
				this.isready = true;
			},
			error(){
				this.isready = true;
			},
			ended(){ // 播放结束时候调用
				this.nextSong()
			},
			...mapMutations({
				set_playing: 'SET_PLAYING',
				set_full_play: 'SET_FULL_VISIBLE_PLAYER',
				set_current_index: 'SET_CURRENTINDEX'
			})
		},
		computed: {
			backgroundImage(){
				return this.currentSong.image ? `background: url('${this.currentSong.image}') center center / 100% 100% no-repeat;` : ''
			},
			playIcon() {
				return this.playing ? 'icon-pause' : 'icon-play'
			},
			miniplayIcon(){
				return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
			},
			rotateImage(){
				return this.playing ? 'rotateIng' : 'rotateed'
			},
			currentTime(){
				return this.$nextTick(() => {
					return this.$refs.audio.currentTime ? this.$refs.audio.currentTime : 0
				})
			},
			...mapGetters([
				'fullVisiblePlayer',
				'playList',
				'currentSong',
				'playing',
				'currentIndex'
			])
		},
		watch: {
			 // 监听currentSong的话，切换歌曲时这个字段内容会改变，所以play()还是会执行，如果只是监听playing，切换歌曲时，值还是true，并没有改变，还是不会执行play()
			currentSong(){
				console.log(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),this.playing)
				if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && this.playing) {
					this.$refs.audio.play()
				}
				this.$nextTick(() => {
					this.$refs.audio.play()
				})
			},
			playing(newvalue){
				const audio = this.$refs.audio;
				if (newvalue) {
					this.$nextTick(() => {
						audio.play()
					})
				}else{
					audio.pause();
				}
			},
			currentTime(newvalue){
				console.log(newvalue)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable';
	@import '~common/stylus/mixin';
	@keyframes foo {
		from {transform: rotate(0deg)}
		to {transform: rotate(360deg)}
	}
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
								animation: foo 60s linear 0s infinite normal forwards
							}
							.rotateIng{
								animation-play-state:running;
							}
							.rotateed{
								animation-play-state:paused;
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
					animation: foo 60s linear 0s infinite normal forwards
				}
				.rotateIng{
					animation-play-state:running;
				}
				.rotateed{
					animation-play-state:paused;
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
