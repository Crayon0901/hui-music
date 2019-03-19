/*
* @Author: FangXiaoHui
* @Date:   2018-11-06 11:25:11
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-06 11:58:50
*/
import axios from 'axios';
import {formatUri} from 'common/js/util';

export default function api(url, urlData, params = {}){
	const formatUrl = formatUri(url, urlData);
	if (JSON.stringify(params) === "{}") {
		axios.get(formatUrl)
		.then((res) => {
			console.log(res);
		}).catch((e) => {
			console.log(e)
		})
	} else {
		axios.post(formatUrl,params)
		.then((res) => {
			console.log(res);
		}).catch((e) => {
			console.log(e)
		})
	}
}