/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 11:00:07
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-02 10:24:52
*/

/**
 * 时间工具
 */

const prejudge = {
	/**
	 * 是否是一个数组
	 */
	isArray: obj => {
		return Object.prototype.toString.call(obj) === '[object Array]'
	},
	/**
	 * 是否是一个对象
	 */
	isObject: obj => {
		return Object.prototype.toString.call(obj) === '[object Object]'
	},
	/**
	 * 是否是一个字符串
	 */
	isString: obj => {
		return Object.prototype.toString.call(obj) === '[object String]'
	},
	/**
	 * 是否是一个数字
	 */
	isNumber: obj => {
		return Object.prototype.toString.call(obj) === '[object Number]'
	},
	/**
	 * 深拷贝
	 */
	deepClone: data => {
		var t = Object.prototype.toString.call(data),
			o, i, ni;
		if (t === '[object Array]') {
			o = []
		} else if (t === '[object Object]') {
			o = {}
		} else {
			return data
		}
		if (t === '[object Array]') {
			for (i = 0, ni = data.length; i < ni; i++) {
				o.push(deepClone(data[i]))
			}
			return o
		} else if (t === '[object Object]') {
			for (i in data) {
				o[i] = deepClone(data[i])
			}
			return o
		}
	},

}

export default prejudge;