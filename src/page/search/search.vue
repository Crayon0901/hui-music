<template>
	<div class="wrapper-search">
		<SearchBox ref="searchbox" @change="handleChangeSerach"></SearchBox>
		<h3 class="title-text">热门搜索</h3>
		<div>
			<ul class="list-ul">
				<li v-for="(item, index) in hotkeyList" :key="index" class="song-name" @click="selectKey(item.k)">{{item.k}}</li>
			</ul>
		</div>
		<div class="search-result" v-show="this.serachValue">
			<SearchResult :songs="resultList.songs"
							:singer="resultList.singer"
							@selectSinger="selectSinger"
							@selectSongs="selectSongs">
			</SearchResult>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import {gethotkey, getserach} from 'api/search';
	import SearchBox from 'components/search-box/search-box';
	import {createSong} from 'common/js/song';
	import {createdSinger} from 'common/js/singer';
	import SearchResult from 'components/search-result/search-result';
	import {mapGetters, mapActions, mapMutations} from 'vuex';

	export default{
		data(){
			return {
				hotkeyList: [], // 标签list
				special_key: '', // 主标签
				resultList: { // 搜索结果列表
					songs: [], // 歌曲列表
					singer: {} // 歌手列表
				},
				serachValue: '' // 搜索的文本
			}
		},
		created(){
			this._gethotkey();
		},
		methods: {
			_gethotkey(){
				gethotkey().then((res) => {
					if (res.code === 0) {
						this.special_key = res.data.special_key;
						this.hotkeyList = res.data.hotkey;
					}
				})
			},
			selectKey(key){
				this.$refs.searchbox.setText(key);
			},
			handleChangeSerach(value){
				this.serachValue = value;
				this._getserach()
			},
			selectSinger(item){
				this.$router.push({
					path: `/search/${item.mid}`
				})
				this.setSinger(item)
			},
			selectSongs(item){
				let newPlayList = this.playList.concat();
				newPlayList.push(item);
				this.selectplay({
					list: newPlayList,
					index: newPlayList.length - 1
				})
			},
			_getserach(){
				getserach(this.serachValue).then((res) => {
					if (res.code === 0) {
						const {song, zhida} = res.data;
						this.resultList.songs = song.list.map((item) => {
							return createSong(item)
						});
						this.resultList.singer = createdSinger({
							singer_id: zhida.singerid,
							singer_name: zhida.singername,
							singer_mid: zhida.singermid
						});
						console.log(this.resultList);
					}
				})
			},
			...mapActions([
				'selectplay'
			]),
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
		},
		components: {
			SearchBox,
			SearchResult
		},
		computed: { // 计算的对象
			randomList(){
				let newList = this.hotkeyList;
				let length = newList.length;
				let arr = []
				for (let i = 0; i < 3; i++) {
					let num = Math.floor(Math.random() * (length - 1))
					arr.push(newList[num] ? newList[num].k : '')
					newList.splice(num, 1);
				}
				return arr
			},
			...mapGetters([
				'playList'
			])
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable';
	.wrapper-search{
		padding: 0 15px;
		.title-text{
			font-size: $font-size-medium;
			color: $color-text-d;
			padding: 10px 0;
			text-align: left;
		}
		.list-ul{
			text-align:left;
			.song-name{
				background-color: $color-highlight-background;
				display:inline-block;
				font-size: $font-size-medium;
				color: $color-text-d;
				line-height: 30px;
				padding: 0 10px;
				border-radius: 5px;
				margin-right: 15px;
				margin-bottom: 15px;
			}
		}
		.search-result{
			position: fixed;
			bottom: 0;
			top: 129px;
			left: 0;
			right: 0;
			padding: 0 15px;
		}
	}
</style>
