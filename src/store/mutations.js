/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 16:56:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-20 16:43:59
*/
import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER](state, singer){
    state.singer = singer;
  }
}
export default mutations