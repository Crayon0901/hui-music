<template>
	<Scroll class="result-scroll" :data="songs">
		<div class="wrapper-result">
			<div v-show="this.singer && this.singer.name" class="list-row" @click="selectSinger">
				<i class="icon-mine iconType"></i>
				<p class="text" v-html="getSingerName"></p>
			</div>
			<div>
				<ul>
					<li v-for="item in songs" class="list-row" @click="selectSongs(item)">
						<i class="icon-music iconType"></i>
						<p class="text" v-html="`${item.name}-${item.singer}`"></p>
					</li>
				</ul>
			</div>
			<Loading v-show="!this.songs.length"></Loading>
		</div>
	</Scroll>
</template>

<script>
	import Scroll from 'components/scroll/scroll';
	import Loading from 'components/loading/loading';
	export default {
		props: {
			singer: {
				type: Object,
				default: () => {return {}}
			},
			songs: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			selectSinger(){
				this.$emit('selectSinger',this.singer)
			},
			selectSongs(item){
				this.$emit('selectSongs',item)
			}
		},
		computed: {
			getSingerName(){
				return this.singer.name ? this.singer.name : ''
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
	.result-scroll{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: $color-background;
		.wrapper-result{
			color: $color-text-d;
			padding: 10px 0;
			.list-row{
				padding: 10px 5px;
				text-align: left;
				no-wrap();
				.iconType{
					display: inline-block;
					font-size: $font-size-medium-x;
					margin-right: 5px;
				}
				.text{
					display: inline-block;
					font-size: $font-size-medium-x;
				}
			}
		}
	}
</style>
