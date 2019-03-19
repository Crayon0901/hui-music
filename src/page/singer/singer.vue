<template>
	<div>
		<Scroll :data="singerList"
				ref="scroll"
				class="scroll"
				:listenScroll="true"
				@scroll="scroll"
				:probeType="3">
			<ul class="wrapper-singerList" v-show="reveal">
				<li v-for="(arry, indexs) in singerListM" :key="indexs" ref="listGroup">
					<div class="list-name">{{arry.name}}</div>
					<div v-for="(item, index) in arry.item" :key="index" @click="routerlink(item)">
						<div class="list-item">
							<img v-lazy="item.avatar" class="pic" width="60px" height="60px">
							<span class="singerName">{{item.name}}</span>
						</div>
					</div>
				</li>
			</ul>
			<div class="wrapper-loading" v-show="!reveal">
				<Loading></Loading>
			</div>
			<div v-show="reveal" @touchstart="handleTouchStart" @touchmove.stop.prevent="handleTouchMove"> <!-- .stop.prevent阻止事件冒泡和事件捕获 -->
				<ul class="right-list">
					<li v-for="(item,index) in shortcutList" :key="index" :data-index="index" :class="{'current':currentIndex === index}">{{item}}</li>
				</ul>
			</div>
			<div class="fixed-title" ref="fixedTitle" v-show="fixedTitleName">
				{{fixedTitleName}}
			</div>
		</Scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSingerlist} from 'api/singer';
	import Scroll from 'components/scroll/scroll';
	import Loading from 'components/loading/loading';
	import {getData} from 'common/js/dom';
	import {mapMutations} from 'vuex';
	import {createdSinger} from 'common/js/singer';

	let index = 0;
	let firstTouch = {};
	export default{
		data(){
			return {
				singerList: [], // 纯歌手列表
				singerListM: [], // 包括字母的歌手列表
				scrollY: -1, // 默认的scroll滚动坐标
				listHeightGroup: [], // 28个列表的高度集合
				currentIndex: 0, // 滑动到第N个
				reveal: false, // 显示列表
				fixedTitleName: ''
			}
		},
		created(){
			this._getSingerList();
		},
		beforeEnter(to, from, next){
			console.log('进入歌手页面路由4')
			next();
		},
		beforeRouteEnter(to, from, next){
			console.log('进入歌手页面路由5')
			next(vm => {
				console.log('最后的回调8')
			});
		},
		methods: {
			// 获取列表
			_getSingerList(indexs, sin){
				getSingerlist(indexs,sin).then((res) => {
					if (res.code === 0) {
						index += 1;
						const resindex = res.singerList.data.index;
						const tags = res.singerList.data.tags.index;
						let letter = tags.find((item) => {
							return item.id === resindex
						})
						this.singerList.push(...res.singerList.data.singerlist.slice(0,10));
						this.singerListM.push({
							name: letter.name,
							item: res.singerList.data.singerlist.slice(0,10).map((item) => {
								return createdSinger(item)
							})
						});
						if (index < 28) {
							this._getSingerList(index);
						} else {
							console.log(this.singerListM);
							this.reveal = true;
						}
					}
				})
			},
			// 右侧列表触碰
			handleTouchStart(e){
				firstTouch.y1 = e.touches[0].pageY; // e.touches[0]是第一个触碰手指的element，.pageY是纵坐标（相对于页面）
				let anchorIndex = getData(e.target, 'index'); // 获取当前触碰的对应的index
				firstTouch.anchorIndex = +anchorIndex;
				this.currentIndex = +anchorIndex
				this.scrollTo(anchorIndex);
				let listGroup = this.$refs.listGroup;
				this.fixedTitleName = listGroup[this.currentIndex].getElementsByClassName('list-name')[0].innerHTML
			},
			// 右侧列表触碰移动
			handleTouchMove(e){
				firstTouch.y2 = e.touches[0].pageY; // 移动过程中的Y值
				let delta = (firstTouch.y2 - firstTouch.y1) / 18 | 0; // 用移动中的值减去第一次触碰的值，计算差值，然后除以每个字母的高度，在取整
				let anchorIndex = firstTouch.anchorIndex + delta; // 第一次触碰的值加上偏差的值，等于最终的值
				this.scrollTo(anchorIndex);
			},
			scrollTo(index){
				this.$refs.scroll.scrollToElement(this.$refs.listGroup[index],200); // 有多个$refs是listGroup的话会变成一个集合取index即可
			},
			scroll(pos){
				this.scrollY = pos.y;
			},
			routerlink(item){
				this.$router.push({
					path: `/singer/${item.mid}`
				})
				this.setSinger(item)
			},
			...mapMutations({ // 映射一个mutation
				setSinger: 'SET_SINGER' // 重命名SET_SINGER的mutation为setsinger
			})
		},
		computed: { // 计算的对象
			shortcutList(){
				return this.singerListM.map((item) => {
					return item.name.slice(0,1)
				})
			}
		},
		components: {
			Scroll,
			Loading
		},
		watch: {
			scrollY(newY) { // 监听滚动事件
				let abs = Math.abs(newY); // 去Y轴绝对值
				let listGroup = this.$refs.listGroup;
				let indexKey = listGroup.filter((item) => {
					const dom = item.getElementsByClassName('list-name')[0];
					return dom.offsetTop <= parseInt(abs) // 对比滚动的值和标题，有多少个标题小于滚动的值
				})
				this.currentIndex = indexKey.length - 1;
				if (newY > 0) {
					this.fixedTitleName = '';
				} else {
					this.fixedTitleName = listGroup[this.currentIndex].getElementsByClassName('list-name')[0].innerHTML
				}
				let secondCurrent = listGroup[this.currentIndex + 1] ? listGroup[this.currentIndex + 1].getElementsByClassName('list-name')[0].offsetTop : listGroup[this.currentIndex].getElementsByClassName('list-name')[0].offsetTop;
				if (secondCurrent - parseInt(abs) <= 30 && parseInt(abs) < secondCurrent) {
					this.$refs.fixedTitle.style.transform = `translate(0,-${(30 - (secondCurrent + newY))}px)`
				} else {
					this.$refs.fixedTitle.style.transform = `translate(0,0px)`
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~stylus/variable';
	@import '~stylus/mixin';
	.scroll{
		position: fixed;
		bottom: 0;
		width:100%;
		top: 88px;
		overflow: hidden;
		.wrapper-singerList{
			.list-name{
				color: $color-text-l;
				text-align: left;
				font-size: $font-size-medium;
				line-height: 30px;
				background-color: $color-highlight-background;
				padding-left: 20px;
			}
			.list-item{
				flex-row(flex-start,center);
				padding: 10px 30px;
				.pic{
					margin-right: 20px;
					border-radius: 50%;
					flex: 0 0 60px;
				}
				.singerName{
					display: block;
					flex: 1;
					text-align: left;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					color: $color-text-l;
				}
			}
		}
		.wrapper-loading{
			position: absolute;
			width:100%;
			top: 0;
			bottom: 0;
			display: flex;
		}
		.right-list{
			position: absolute;
			width: 25px;
			right: 0;
			top: 50%;
			transform: translate(0,-50%);
			background-color: $color-background-d;
			color: $color-text-l;
			font-size: $font-size-small-s;
			line-height: 18px;
			padding: 10px 0;
			border-top-left-radius: 50px;
			border-bottom-left-radius: 50px;
			.current{
				color: $color-theme
			}
		}
		.fixed-title{
			position: absolute;
			top: 0;
			width:100%;
			color: $color-text-l;
			text-align: left;
			font-size: $font-size-medium;
			line-height: 30px;
			background-color: $color-highlight-background;
			padding-left: 20px;
		}
	}
</style>
