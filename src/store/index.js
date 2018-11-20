/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 16:56:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-20 16:36:40
*/
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
import state from './state';
import createLogger from 'vuex/dist/logger'; // 在state被修改时打印修改前后的日志

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'; // 开发环境为true，可以打印，正式环境不打印

export default new Vuex.Store({ // 实例Store
	actions,
	getters,
	mutations,
	state,
	strict: debug, // 严格模式，检测state的修改是不是来源于mutation，如果不是来源于mutation就会报错，因此会有性能问题，在开发环境不建议使用
	plugins: debug ? [createLogger()] : [] // 插件，测试环境执行打印log
})