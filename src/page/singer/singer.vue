<template>
	<Scroll :data="singerList" ref="scroll" class="scroll">
		<ul class="wrapper-singerList">
			<li v-for="arry in singerListM">
				<div class="list-name">{{arry.name}}</div>
				<div v-for="item in arry.item">
					<div class="list-item">
						<img v-lazy="item.singer_pic" class="pic" width="60px" height="60px">
						<span class="singerName">{{item.singer_name}}</span>
					</div>
				</div>
			</li>
		</ul>
		<div class="wrapper-loading" v-show="!singerList.length">
			<Loading></Loading>
		</div>
	</Scroll>
</template>

<script>
	import {getSingerlist} from 'api/singer';
	import Scroll from 'components/scroll/scroll';
	import Loading from 'components/loading/loading';

	let index = 0;

	export default{
		data(){
			return {
				singerList: [], // 纯歌手列表
				singerListM: [] // 包括字母的歌手列表
			}
		},
		created(){
			this._getSingerList();
		},
		methods: {
			_getSingerList(indexs, sin){
				getSingerlist(indexs,sin).then((res) => {
					if (res.code === 0) {
						index += 1;
						const resindex = res.singerList.data.index;
						const tags = res.singerList.data.tags.index;
						let letter = tags.find((item) => {
							return item.id === resindex
						})
						this.singerList.push(...res.singerList.data.singerlist.slice(0,10));
						this.singerListM.push({
							name: letter.name,
							item: res.singerList.data.singerlist.slice(0,10)
						});
						if (index < 28) {
							this._getSingerList(index, 160);
						}else{
							console.log(this.singerListM)
						}
					}
				})
			}
		},
		components: {
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~stylus/variable';
	@import '~stylus/mixin';
	.scroll{
		position: fixed;
		bottom: 0;
		width:100%;
		top: 88px;
		overflow: hidden;
		.wrapper-singerList{
			.list-name{
				color: $color-text-l;
				text-align: left;
				font-size: $font-size-medium;
				line-height: 30px;
				background-color: $color-highlight-background;
				padding-left: 20px;
			}
			.list-item{
				flex-row(flex-start,center);
				padding: 10px 30px;
				.pic{
					margin-right: 20px;
					border-radius: 50%;
					flex: 0 0 60px;
				}
				.singerName{
					display: block;
					flex: 1;
					text-align: left;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					color: $color-text-l;
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
