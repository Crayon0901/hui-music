/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 16:56:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-25 11:56:08
*/

/*用于封装同时触发的多个行为，去mutations多个state*/

import * as types from './mutation-types';

// action默认有一个对象{commit, state},commit是提交的mutation，state就是数据了,commit会触发mutation里面的函数，从而改变state
export const selectplay = function ({commit, state}, {list, index}){
	commit(types.SET_SEQUENCELIST, list);
	commit(types.SET_PLAYLIST, list);
	commit(types.SET_CURRENTINDEX, index);
	commit(types.SET_FULL_VISIBLE_PLAYER, true);
	commit(types.SET_PLAYING, true);
}