/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 16:56:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-25 10:50:11
*/
import constants from 'common/constants/constants';
const {PLAY_MODE} = constants;

const state = {
	singer: {}, // 歌手信息
	player: { // 播放器属性
		playing: false, // 是否播放
		fullVisiblePlayer: false, // 全屏播放
		playList: [], // 播放列表(播放列表是固定的，根据添加的歌曲显示)
		sequenceList: [], // 顺序列表(顺序播放，单曲播放，随机播放),根据不同的播放模式，列表会进行切换,是变化的列表
		mode: PLAY_MODE.sequence, // 播放模式(顺序播放，单曲播放，随机播放),默认顺序播放
		currentIndex: -1, // 播放索引
	}
}
 export default state