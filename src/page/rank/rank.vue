<template>
	<Scroll class="wrapper-rankList">
		<div>
			<ul class="ranklist-ul">
				<li v-for="(item, indexs) in rankList" :key="indexs" class="ranklist-li">
					<div class="left-img">
						<img :src="item.picUrl" :alt="item.topTitle" width="100px" height="100px">
					</div>
					<div class="right-list">
						<ul class="right-list-ul">
							<li v-for="(i, index) in item.songList" :key="index" class="songlist-name">
								{{`${i.songname}-${i.singername}`}}
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</Scroll>
</template>

<script>
	import Scroll from 'components/scroll/scroll';
	import {getranklist} from 'api/rank';
	export default{
		data(){
			return {
				rankList: []
			}
		},
		created(){
			this._getRankList();
		},
		methods: {
			_getRankList(){
				getranklist().then((res) => {
					if (res.code === 0) {
						this.rankList = res.data.topList;
					}
				})
			}
		},
		components: {
			Scroll
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/mixin';
	@import '~common/stylus/variable';
	.wrapper-rankList{
		position: fixed;
		bottom: 0;
		width: 100%;
		top: 88px;
		overflow:hidden;
		.ranklist-ul{
			padding: 10px 20px;
			.ranklist-li{
				margin:20px 0;
				background:$color-highlight-background;
				flex-row(flex-start, center);
				.left-img{
					flex: 0 0 60px;
					width: 100px;
					height: 100px;
				}
				.right-list{
					flex: 1;
					padding:0 20px;
					text-align: left;
					height: 100px;
					overflow: hidden;
					.right-list-ul{
						height: 100%;
						font-size: $font-size-small;
						color:$color-text-l;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						.songlist-name{
							no-wrap();
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
</style>
