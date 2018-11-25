/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 16:56:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-25 10:55:43
*/
export const singer = state => state.singer;

export const playing = state => state.player.playing;

export const fullVisiblePlayer = state => state.player.fullVisiblePlayer;

export const playList = state => state.player.playList;

export const sequenceList = state => state.player.sequenceList;

export const mode = state => state.player.mode;

export const currentIndex = state => state.player.currentIndex;

export const currentSong = state => {
	return state.player.playList[state.player.currentIndex] || {};
}