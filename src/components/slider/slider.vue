<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot><!-- 占位符，用于占据父组件传递近来的DOM节点 -->
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex === index}"></span>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll';
	import {addClass} from 'common/js/dom';

	export default{
		data(){
			return {
				dots: [],
				currentPageIndex: 0 // 当前第几页，用于小圆点显示
			}
		},
		props: { // 配置属性
			loop: { // 是否循环轮播，默认ture，如果为true，自动填充前后各一张图片。所以总图片是n+2.最后一张和第一张可以无缝切换
				type: Boolean,
				default: true
			},
			autoPlay: { // 是否自动开始轮播，默认ture
				type: Boolean,
				default: true
			},
			interval: { // 轮播间隔,默认400毫秒
				type: Number,
				default: 2000
			},
			Threshold: { // 表示可滚动到下一个的阈值,0-1
				type: Number,
				default: 0.3
			},
			speed: { // 滑动时的速度
				type: Number,
				default: 400
			}
		},
		mounted(){
			setTimeout(() => {
				this._setSliderWidth();
				this._initDots();
				this._initSlider();
				if (this.autoPlay) {
					this._play();
				}
			},20);
			window.addEventListener('resize', () => { // 监听窗口大小变化事件
				if (!this.slider) {
					return
				}
				this._setSliderWidth();
			})
		},
		destroyed(){ // 页面卸载时，清除计时器
			clearTimeout(this.timer);
		},
		activated(){ // 缓存页面的生命周期函数，页面加载时调用
			let pageIndex = this.slider.getCurrentPage().pageX; // 该方法用于获取当前是第几个page
			if (this.loop) { // 自动轮播了，图片是n+2了，所以第一个图片应该是下标为1的图片
				// pageIndex -= 1;
			}
			this.currentPageIndex = pageIndex;
			if (this.autoPlay) {
				clearTimeout(this.timer);
				this._play();
			}
		},
		deactivated(){ // 缓存页面的生命周期函数，页面卸载时调用
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
				if (this.loop) { // 如果自动轮播要新增左右各1个，用于无缝循环
					width += 2 * sliderWidth;
				}
				this.$refs.sliderGroup.style.width = width + 'px';
			},
			_initDots(){
				this.dots = new Array(this.children.length); // 长度为5的空数组
			},
			_initSlider(){
				this.slider = new Bscroll(this.$refs.slider,{
					scrollX: true,
					scrollY: false,
					momentum: false, // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画。
					snap: {
						loop: this.loop, // 是否无缝轮播，即最后一张在滑动就到第一张了。如果为false，则到最后一张不能在滑动到第一张了。
						threshold: this.Threshold, // 表示可滚动到下一个的阈值
						speed: this.speed // 滑动时的速度
					}
				})
				this.slider.on('scrollEnd', () => { //绑定滑动结束的函数
					let pageIndex = this.slider.getCurrentPage().pageX; // 该方法用于获取当前是第几个page
					if (this.loop) { // 自动轮播了，图片是n+2了，所以第一个图片应该是下标为1的图片
						// pageIndex -= 1;
					}
					this.currentPageIndex = pageIndex;
					if (this.autoPlay) {
						clearTimeout(this.timer);
						this._play();
					}
				})
				this.slider.on('scrollStart',() => { //绑定滑动开始的函数
					if (this.autoPlay) {
						clearTimeout(this.timer);
					}
				})
			},
			_play(){
				let pageIndex = this.currentPageIndex + 1;
				if (pageIndex >= this.dots.length) {
					pageIndex = 0;
					// this.slider.next();
					// pageIndex += 1;
				}
				this.timer = setTimeout(() => {
					this.slider.goToPage(pageIndex, 0, this.speed) // 三个参数，X方向，Y方向，速度
				}, this.interval)
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
		.dots{
			position: absolute;
		    right: 0;
		    left: 0;
		    bottom: 12px;
		    text-align: center;
		    font-size: 0;
			.dot{
				display: inline-block;
				width:8px;
				height: 8px;
				border-radius: 50%;
				margin: 0 4px;
				background: $color-text-l;
				&.active{
					width: 20px;
					border-radius: 5px;
					background: $color-text-ll;
				}
			}
		}
	}
</style>
