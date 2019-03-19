/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 10:45:49
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-06 13:54:59
*/
import jsonp from '@/common/js/jsonp';
import constants from '@/common/constants/constants';// 不知道结构赋值为什么用不了????????
import axios from 'axios';
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
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
// 获取歌曲的vkey
export function getSongVkey() {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    const data = Object.assign({}, {
        callback: 'musicJsonCallback',
        loginUin: 3051522991,
        format: 'jsonp',
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 3051522991,
        guid: 3989104853,
        songmid: '001J5QJL1pRQYB',
        filename: `C400001J5QJL1pRQYB.m4a`
    })
	return jsonp(url, data)
}
