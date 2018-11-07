<template>
	<div>歌手123</div>
</template>

<script>
	import {getSingerlist} from 'api/singer';
	export default{
		created(){
			this._getSingerList();
		},
		methods: {
			_getSingerList(){
				getSingerlist().then((res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
