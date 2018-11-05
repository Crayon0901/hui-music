/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 11:00:07
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-05 10:46:57
*/
export default {
	RECOMMEND_BANNER_URL: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',// 获取推荐banner的url
	RECOMMEND_BANNER_URL_PARAMS: {// 获取推荐banner的url的固定公共参数
		g_tk: 1928093487,
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice: 0,
		format: 'jsonp'
	},
	OPTION: {
		param: 'jsonpCallback',
		//prefix: '__jsonp' // jsonp在Response时返回的字段名字
	}
}