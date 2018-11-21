<template>
	<transition name="slide">
		<MusicList :title="title" :songs="songs" :bgImage="bgImage"></MusicList>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {getSingerDetail} from 'api/singer';
	import {createSong} from 'common/js/song';
	import MusicList from 'components/music-list/music-list';

	export default {
		data(){
			return {
				songs: []
			}
		},
		created(){
			const {id} = this.$route.params;
			this._getSingerDetailList(id);
		},
		methods: {
			_getSingerDetailList(id){
				getSingerDetail(id).then(res => {
						if (res.code === 0) {
							this._noramalizeSongs(res.data.list);
						}
					}
				)
			},
			_noramalizeSongs(list){
				let musicData = list.map(item => item.musicData);
				let ret = [];
				musicData.forEach((item) => {
					ret.push(createSong(item)) // 工程化，创建song实例
				})
				this.songs = ret;
			}
		},
		computed: {
			title(){
				return this.singer.name
			},
			bgImage(){
				return this.singer.avatar
			},
			...mapGetters([ // get传递数组可以同时获取多个state
				'singer'
			])
		},
		components: {
			MusicList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
	.slide-enter-active, .slide-leave-active {
		transition: all .3s
	}
	.slide-enter, .slide-leave-to {
		transform: translate3d(100%,0,0);
	}
</style>
