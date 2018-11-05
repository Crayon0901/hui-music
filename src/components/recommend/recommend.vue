<template>
	<div class="recommend" ref="recommend">
		<div class="recommend-content">
			<div v-if="recommends.length" class="slider-wrapper">
				<Slider> <!-- 引用组件，组件包裹的内容会传递给这个组件，也就是下面的div，组件内部占位符会被这个div替换 -->
					<div v-for="item in recommends"> <!-- 遍历recommends数组 -->
						<a :href="item.linkUrl">
							<img :src="item.picUrl">
						</a>
					</div>
				</Slider>
			</div>
			<div class="recommend-list">
				<h1 class="list-title">热门歌单推荐</h1>
				<ul></ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {getRecommend, getDiscList} from 'api/recommend';
	import Slider from 'components/slider/slider';// 引入组件
	export default {
		data(){ // 定义data
			return {
				recommends: []
			}
		},
		created() {
			this._getRecommend();
			this._getDiscList();
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
				getDiscList()
			}
		},
		components: { // 组件注册
			Slider
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~stylus/variable';
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
		}
	}
</style>
