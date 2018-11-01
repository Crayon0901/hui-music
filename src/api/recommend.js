/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 10:45:49
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-01 14:13:52
*/
import jsonp from '@/common/js/jsonp';
import constants from '@/common/constants/constants';// 不知道结构赋值为什么用不了????????

export function getRecommend(){
	const {RECOMMEND_BANNER_URL, RECOMMEND_BANNER_URL_PARAMS, OPTION} = constants;
	const url = RECOMMEND_BANNER_URL;
	const data = Object.assign({},RECOMMEND_BANNER_URL_PARAMS,{// 合并参数，第一个是公共固定参数，后面添加的是可变的参数
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})
	return jsonp(url, data, OPTION)// url拼接data形成完整的请求url，option是callback参数
}