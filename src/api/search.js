/**
 * @authors FangXiaoHui
 * @date    2018-11-15 17:20:47
 */
import jsonp from 'common/js/jsonp';
import constants from 'common/constants/constants';
const {GETHOTKEY, RECOMMEND_BANNER_URL_PARAMS, OPTION} = constants;

export function gethotkey(){
	const data = Object.assign({},RECOMMEND_BANNER_URL_PARAMS,{
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		_: 1542273592416
	})
	return jsonp(GETHOTKEY, data, OPTION)
}
