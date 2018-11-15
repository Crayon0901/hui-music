<template>
	<div>
		<h3>热门搜索</h3>
		<div>
			<ul>
				<li></li>
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
				const length = this.hotkeyList.length;
				return Math.random()*10
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
