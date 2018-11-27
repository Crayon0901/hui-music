/**
 * @authors FangXiaoHui
 * @date    2018-11-15 17:20:47
 */
import jsonp from 'common/js/jsonp';
import axios from 'axios';
import constants from 'common/constants/constants';
const {GETHOTKEY, GETSEARCH, RECOMMEND_BANNER_URL_PARAMS, OPTION} = constants;

export function gethotkey(){
	const data = Object.assign({},RECOMMEND_BANNER_URL_PARAMS,{
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		_: 1542273592416
	})
	return jsonp(GETHOTKEY, data, OPTION)
}

export function getserach(text){
	const data = Object.assign({},RECOMMEND_BANNER_URL_PARAMS,{
		g_tk: 431580809,
		uin: 0,
		format: 'json',
		platform: 'h5',
		needNewCode: 1,
		w: text,
		zhidaqu: 1,
		catZhida: 1,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		perpage: 20,
		n: 20,
		p: 1,
		remoteplace: 'txt.mqq.all',
		_: 1543314668234
	})
	return axios.get('/api/getSerach',{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}