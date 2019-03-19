<template>
	<Scroll :data="songs" class="wrapper-scroll" :probeType="3" :listenScroll="true" @scroll="scrollAction" :style="hasmaxhight">
		<div class="format">
			<ul>
				<li v-for="(item,index) in songs" :key="index" class="songsitem" @click="selectItem(songs, item, index)">
					<h2 class="name">{{item.name}}</h2>
					<p class="desc">{{getDesc(item)}}</p>
				</li>
			</ul>
		</div>
		<div class="wrapper-loading" v-show="!songs.length">
			<Loading></Loading>
		</div>
	</Scroll>
</template>

<script>
	import Scroll from 'components/scroll/scroll';
	import Loading from 'components/loading/loading';
	export default{
		props: {
			songs: {
				type: Array,
				default: () => { return [] }
			},
			isMaxHeight: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			getDesc(song){
				return song ? `${song.singer}·${song.album}` : ''
			},
			scrollAction(pos){
				this.$emit('scroll', pos.y)
			},
			selectItem(songs, item, index){
				this.$emit('selectItem', songs, item, index);
			}
		},
		computed: {
			hasmaxhight(){
				return this.isMaxHeight ? `overflow: hidden;` : ''
			}
		},
		components: {
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable';
	@import '~common/stylus/mixin';
	.wrapper-scroll{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		.format{
			padding: 20px 30px;
			text-align: left;
			.songsitem{
				padding: 10px 0;
				.name{
					color: $color-text;
					margin-bottom: 15px;
					no-wrap();
				}
				.desc{
					color: $color-text-d;
					margin-bottom: 20px;
					no-wrap();
				}
			}
		}
		.wrapper-loading{
			position: absolute;
			width:100%;
			top: 0;
			bottom: 0;
			display: flex;
		}
	}
</style>
