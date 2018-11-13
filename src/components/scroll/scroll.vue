<template>
	<div class="wrapper-scroll" ref="scroll">
		<slot></slot>
	</div>
</template>

<script>
	import Bsrcoll from 'better-scroll';
	export default {
		props: {
			probeType: { // 监听页面scroll，可选值：1、2、3，当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			listenScroll: { // 是否监听滚动事件
				type: Boolean,
				default: false
			},
			data: {
				type: Array,
				default: null
			},
			pullup: {
				type: Boolean,
				default: false
			},
			beforeScroll: {
				type: Boolean,
				default: false
			},
			refreshDelay: {
				type: Number,
				default: 20
			},
			scrollY: {
				type: Boolean,
				default: true
			},
			scrollX: {
				type: Boolean,
				default: false
			}
		},
		mounted(){
			setTimeout(() => {
				this._initScroll();
			},20)
		},
		methods: {
			_initScroll(){
				if (!this.$refs.scroll) {
					return
				}
				this.scroll = new Bsrcoll(this.$refs.scroll,{
					probeType: this.probeType,
					click: this.click,
					scrollY: this.scrollY,
					scrollX: this.scrollX
				})
				if (this.listenScroll) {
					let that = this;
					this.scroll.on('scroll', (pos) => {
						that.$emit('scroll', pos); // $emit,是向父组件派发事件'scroll'，把滚动事件拿到的参数传递给父组件的'scroll'函数
					})
				}
			},
			disable() {
				this.scroll && this.scroll.disable();
			},
			enable() {
				this.scroll && this.scroll.enable();
			},
			refresh() {
				this.scroll && this.scroll.refresh();
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);// 因为要传递argument参数，所以要用apply
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
			}
		},
		watch: {
			data(){
				setTimeout(() => {
					this.refresh()
				},this.refreshDelay)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
