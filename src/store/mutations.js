/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 16:56:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-25 11:03:58
*/
import * as types from './mutation-types';

const mutations = {
	[types.SET_SINGER](state, singer){
		state.singer = singer;
	},
	[types.SET_PLAYING](state, flag){
		state.player.playing = flag;
	},
	[types.SET_FULL_VISIBLE_PLAYER](state, flag){
		state.player.fullVisiblePlayer = flag;
	},
	[types.SET_PLAYLIST](state, list){
		state.player.playList = list;
	},
	[types.SET_SEQUENCELIST](state, list){
		state.player.sequenceList = list;
	},
	[types.SET_MODE](state, mode){
		state.player.mode = mode;
	},
	[types.SET_CURRENTINDEX](state, index){
		state.player.currentIndex = index;
	}
}
export default mutations