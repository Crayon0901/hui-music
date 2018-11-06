<template>
	<div class="wrapper-scroll" ref="scroll">
		<slot></slot>
	</div>
</template>

<script>
	import Bsrcoll from 'better-scroll';
	export default {
		props: {
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			listenScroll: {
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
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
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
