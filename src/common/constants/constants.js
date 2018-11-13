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
		param: 'jsonpCallback', // 发给后端的回调key
		// prefix: '__jp' // 发给后端的回调value,被后端拿来做回调的名字
	},
	SINGER_LIST: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
	RANK_LIST: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
}