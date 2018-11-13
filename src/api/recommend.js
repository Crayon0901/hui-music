/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 10:45:49
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-06 13:54:59
*/
import jsonp from '@/common/js/jsonp';
import constants from '@/common/constants/constants';// 不知道结构赋值为什么用不了????????
import axios from 'axios';
import api from './api';
const {RECOMMEND_BANNER_URL, RECOMMEND_BANNER_URL_PARAMS, OPTION} = constants;

export function getRecommend(){
	const url = RECOMMEND_BANNER_URL;
	const data = Object.assign({},RECOMMEND_BANNER_URL_PARAMS,{// 合并参数，第一个是公共固定参数，后面添加的是可变的参数
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})
	return jsonp(url, data, OPTION)// url拼接data形成完整的请求url，option是callback参数
}

export function getDiscList(){
	const data = Object.assign({},RECOMMEND_BANNER_URL_PARAMS,{// 合并参数，第一个是公共固定参数，后面添加的是可变的参数
		platform: 'yqq',
	    hostUin: 0,
	    sin: 0,
	    ein: 29,
	    sortId: 5,
	    needNewCode: 0,
	    categoryId: 10000000,
	    rnd: Math.random(),
	    format: 'json'
	})
	return axios.get('/api/getDiscList',{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
