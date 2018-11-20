<template>
	<div>
		<h3>热门搜索</h3>
		<div>
			<ul class="list-ul">
				<li v-for="item in hotkeyList" class="song-name">{{item.k}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {gethotkey} from 'api/search';
	export default{
		data(){
			return {
				hotkeyList: [], // 标签list
				special_key: '' // 主标签
			}
		},
		created(){
			this._gethotkey();
		},
		methods:{
			_gethotkey(){
				gethotkey().then((res) => {
					if (res.code === 0) {
						this.special_key = res.data.special_key;
						this.hotkeyList = res.data.hotkey;

					}
				})
			}
		},
		components:{

		},
		computed: { // 计算的对象
			randomList(){
				let newList = this.hotkeyList;
				let length = newList.length;
				let arr = []
				for(let i = 0; i < 3; i++){
					let num = Math.floor(Math.random()*(length-1))
					arr.push(newList[num]?newList[num].k:'')
					newList.splice(num, 1);
				}
				return arr
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable';
	.list-ul{
		text-align:left;
		padding: 0 10px;
		.song-name{
			display:inline-block;
			font-size: $font-size-medium;
			line-height: 30px;
			padding: 0 10px;
			border:1px solid #ccc;
			border-radius: 20px;
			margin-right: 14px;
			margin-bottom: 10px;
		}
	}
</style>
