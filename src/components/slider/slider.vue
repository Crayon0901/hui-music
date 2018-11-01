<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot><!-- 占位符，用于占据父组件传递近来的DOM节点 -->
		</div>
		<div class="dots"></div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll';
	import {addClass} from 'common/js/dom';

	export default{
		props: { // 配置属性
			loop: { // 是否循环轮播，默认ture
				type: Boolean,
				default: true
			},
			autoPlay: { // 是否自动开始轮播，默认ture
				type: Boolean,
				default: true
			},
			Interval: { // 轮播间隔,默认400毫秒
				type: Number,
				default: 400
			}
		},
		mounted(){
			setTimeout(() => {
				this._setSliderWidth();
				this._initSlider();
			},20)
		},
		methods: {
			_setSliderWidth(){ // 设置slider宽度
				this.children = this.$refs.sliderGroup.children; // 获取sliderGroup的子节点
				let width = 0;
				let sliderWidth = this.$refs.slider.clientWidth; // 获取slider的宽度
				for (let i = 0; i < this.children.length; i++){
					let child = this.children[i];
					addClass(child, 'slider-item'); // 为每一个节点添加class
					child.style.width = sliderWidth + 'px'; // 每一个图片的宽度等于父节点的宽度
					width += sliderWidth;
				}
				if (this.loop) {
					width += 2 * sliderWidth;
					this.$refs.sliderGroup.style.width = width + 'px';
				}
			},
			_initSlider(){
				console.log(22)
				this.slider = new Bscroll(this.$refs.slider,{
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: true,
					snapLoop: this.loop,
					snapThreshold: 0.3,
					snapSpeed: 400
				})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable'
	.slider{
		min-height: 1px;
		.slider-group{
			position: relative;
			overflow: hidden;
			white-space: nowrap
			.slider-item{
				float: left;
				box-sizing: border-box;
				overflow: hidden;
				text-align: center;
				a{
					display: block;
					width: 100%;
					overflow: hidden;
					text-decoration: none;
				}
				img{
					display: block;
					width: 100%;
				}
			}
		}
	}
</style>
