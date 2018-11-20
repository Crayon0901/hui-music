import jsonp from '@/common/js/jsonp';
import constants from '@/common/constants/constants';
import axios from 'axios';
import api from './api';

const {SINGER_LIST, RECOMMEND_BANNER_URL_PARAMS, OPTION, SINGER_DETAIL} = constants;

export function getSingerlist(index=-100, sin=0){
	let paramsData = {
		"comm": {
			"ct": 24,
			"cv": 10000
		},
		"singerList": {
			"module": "Music.SingerListServer",
			"method": "get_singer_list",
			"param": {
				"area": -100,
				"sex": -100,
				"genre": -100,
				"index": index,
				"sin": sin,
				"cur_page": 1
			}
		}
	}
	const data = Object.assign({},RECOMMEND_BANNER_URL_PARAMS,{
		loginUin: 0,
		hostUin: 0,
		platform: 'yqq',
		needNewCode: 0,
		inCharset: 'utf8',
		data: JSON.stringify(paramsData)
	});
	return jsonp(SINGER_LIST, data)
}

export function getSingerDetail(id){
	const data = Object.assign({}, RECOMMEND_BANNER_URL_PARAMS, {
		loginUin: 0,
		hostUin: 0,
		platform: 'yqq',
		needNewCode: 0,
		singermid: id,
		order: 'listen',
		begin: 0,
		num: 100,
		songstatus: 1
	})
	return jsonp(SINGER_DETAIL, data, OPTION)
}