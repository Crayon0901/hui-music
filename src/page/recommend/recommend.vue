<template>
	<div class="recommend" ref="recommend" >
		<Scroll ref="scroll" class="recommend-content" :data="list" :scrollY="true">
			<div>
				<div v-if="recommends.length" class="slider-wrapper">
					<Slider> <!-- 引用组件，组件包裹的内容会传递给这个组件，也就是下面的div，组件内部占位符会被这个div替换 -->
						<div v-for="(item, index) in recommends" :key="index"> <!-- 遍历recommends数组 -->
							<a :href="item.linkUrl">
								<img class="needsclick" @load="loadImage" :src="item.picUrl"> <!-- better-scroll和fastclick冲突时，可以在元素上添加needsclick，就可以点击了 -->
							</a>
						</div>
					</Slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li v-for="(item, index) in list" :key="index" class="list-wrapper">
							<div class="wrapper-img">
								<img v-lazy="item.imgurl" alt="item.dissname" width="60px" height="60px">
							</div>
							<div class="wrapper-text">
								<h2 class="title">{{item.creator.name}}</h2>
								<span class="dissname">{{item.dissname}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</Scroll>
			<div class="loading-center" v-show="!list.length">
				<Loading></Loading>
			</div>
	</div>
</template>

<script>
	import {getRecommend, getDiscList, getSongVkey} from 'api/recommend';
	import Slider from 'components/slider/slider';// 引入组件
	import Scroll from 'components/scroll/scroll';
	import Loading from 'components/loading/loading';
	export default {
		data(){ // 定义data
			return {
				recommends: [],
				list: []
			}
		},
		created() { // 实例加载前，还没有template和element
			this._getRecommend();
			this._getDiscList();
			this._getVkey();
		},
		mounted(){ // 实例初始化完成，节点有了
			console.log('节点有了',this)
		},
		updated(){ // 数据更新时
			console.log('更新了',this)
		},
		destroyed(){ // 页面卸载时
			console.log('页面卸载了',this)
		},
		beforeRouteLeave(to, from, next){
			console.log('组件离开了1')
			next();
		},
		methods: {// 定义一个方法的集合，把方法都放在这里面
			_getRecommend() {
				getRecommend().then((res) => {
					if (res.code === 0) {
						this.recommends = res.data.slider;// 赋值给recommends
					}
				})
			},
			_getDiscList(){
				getDiscList().then((res) => {
					this.list = res.data.list;
				})
			},
			_getVkey(){
				getSongVkey().then(res => {
					if (res.data && res.data.items.length) {
						sessionStorage.vkey = res.data.items[0].vkey
					}
				})
			},
			loadImage(){ // 监听图片加载事件，当有一个图片加载了的，就可以重新计算scroll的高度了，因为图片的高度不确定的
				if (!this.flagLoadImage) {
					this.$refs.scroll.refresh();
					this.flagLoadImage = true;
				}
			}
		},
		components: { // 组件注册
			Slider,
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~stylus/variable';
	@import '~stylus/mixin';
	.recommend{
		position: fixed;
		bottom: 0;
		width: 100%;
		top: 88px;
		.recommend-content{
			height: 100%;
			overflow: hidden;
			.slider-wrapper{
				position: relative;
				width: 100%;
				overflow: hidden;
			}
			.recommend-list{
				padding: 0 10px;
				.list-title{
					margin: 20px 0;
					font-size: $font-size-large;
				}
				.list-wrapper{
					margin-bottom: 20px;
					flex-row(space-between,center);
					.wrapper-img{
						flex: 0 0 60px;/*固定宽度*/
						margin-right: 20px;
					}
					.wrapper-text{
						height:60px;
						flex:1;
						text-align: left;
						overflow: hidden;
						flex-column(space-around,null);
						.title{
							color: $color-text;
							no-wrap();
						}
						.dissname{
							color: $color-text-d;
							no-wrap();
						}
					}
				}
			}
		}
		.loading-center{
			position: absolute;
			bottom: 0;
			top: 0;
			left: 0;
			right: 0;
			display: flex;
		}
	}
</style>
