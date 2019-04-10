/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 10:45:49
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-06 13:54:59
*/
import jsonp from '@/common/js/jsonp';
import constants from '@/common/constants/constants';// 不知道结构赋值为什么用不了????????
import axios from 'axios';
import qs from 'qs';
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
	// const data = Object.assign({},{// 合并参数，第一个是公共固定参数，后面添加的是可变的参数
	// 	"req_0": {
	// 		"module": "vkey.GetVkeyServer",
	// 		"method": "CgiGetVkey",
	// 		"param": {
	// 			"guid": "3989104853",
	// 			"songmid": ["0048ukdm41wbsh", "000Wpb4P33yS4C", "001PeJps37WoGW", "000ie6ID1jEHYg", "001AxwcN2CZiZH", "004WZ2yI2QlxWx", "0024BipY1FIfR4", "000tGVpV2EWnXW", "0015dnr83U9uYe", "002d2PFN4gCBVL", "0009E15m3hamQd", "003d5e8a2YFv7P", "002F9yNf3axTav", "000O5gNc1ytE3G", "000TzJeb3iTla3"],
	// 			"songtype": [],
	// 			"uin": "0",
	// 			"loginflag": 0,
	// 			"platform": "23",
	// 			"h5to": "speed"
	// 		}
	// 	},
	// 	"comm": {
	// 		"g_tk": 5381,
	// 		"uin": 0,
	// 		"format": "json",
	// 		"ct": 23,
	// 		"cv": 0
	// 	}
	// })
	// return axios.post('/api/getVkey',data).then((res) => {
	// 	return Promise.resolve(res.data)
	// })
}
