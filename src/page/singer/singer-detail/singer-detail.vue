<template>
	<transition name="slide">
		<div class="wrapper">
			<ul>
				<li v-for="item in list">
					<span>{{item.musicData.songname}}</span>
					<span>{{item.musicData.albumname}}</span>
				</li>
			</ul>
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {getSingerDetail} from 'api/singer';

	export default {
		data(){
			return {
				list: []
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
							this.list = res.data.list;
						}
					}
				)
			}
		},
		computed: {
			...mapGetters([ // get传递数组可以同时获取多个state
				'singer'
			])
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
	.wrapper{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: $color-background;
		z-index: 99;
	}
	.slide-enter-active, .slide-leave-active {
		transition: all .3s
	}
	.slide-enter, .slide-leave-to {
		transform: translate3d(100%,0,0);
	}
</style>
