/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 11:00:07
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-02 10:16:44
*/

/**
 * 时间工具
 */

import moment from 'moment'

const module = {
    /**
     * 根据服务器端时间转换成客户端日期
     */
    getDate: str => {
        return module.format(str, 'yyyy-MM-dd')
    },
    /**
     * 根据服务器端时间转换成客户端时间
     */
    getTime: str => {
        return module.format(str, 'yyyy-MM-dd hh:mm')
    },
    /**
     * 时间格式化
     */
    format: (str, format) => {
        if (!str) return ''
        str = str.replace(/-/g, '/') //兼容ie
        const date = new Date(str);
        var rules = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        }
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (var key in rules) {
            if (new RegExp("(" + key + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? rules[key] : ("00" + rules[key]).substr(("" + rules[key]).length))
            }
        }
        return format
    },
    /**
     * 获取下个月的第一天
     * 如果传入参数就选择传入的月份，如果没传默认当月
     */
    getFirstDayAtNextMonth: (num) => {
        var now = new Date()
        var year = now.getFullYear()
        var month = num ? num :now.getMonth() + 1
        month += 1
        if (month == 13) {
            month = 1
            year += 1
        }
        return new Date(year, month - 1, 1)
    },
    /**
     * 获取这个月的最后一天
     */
    getLastDayAtThisMonth: () => {
        // var firstDayAtNextMonth = module.getFirstDayAtNextMonth()
        // return new Date(firstDayAtNextMonth - 24 * 60 * 60 * 1000)
        return new Date();
    },
    /**
     * 获取上个月的第一天
     */
    getFirstDayAtLastMonth: () => {
        var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth() + 1
        month -= 1
        if (month == 0) {
            month = 12
            year -= 1
        }
        return new Date(year, month - 1, 1)
    },

    /**
     * 获取当月
     */
    getDefaultAtThisMonth: () => {
        var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth() + 1
        return new Date(year, month - 1)
    },

    getDefaultAtThisMonthMomet: () => {
        var thisMonth = module.getDefaultAtThisMonth()
        return new moment(thisMonth)
    },

    /**
     * 默认获取当月一整月
     */
    getDefaultThisMonth: () => {
        var thisMonth = module.getDefaultAtThisMonth()
        return [new moment(thisMonth), (new moment(thisMonth)).endOf('month')]
    },

    /**
     * 获取这个月的第一天
     */
    getFirstDayAtThisMonth: () => {
        var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth()
        return new Date(year, month, 1)
    },
    /**
     * 获取上个月的最后一天
     */
    getLastDayAtLastMonth: () => {
        var firstDayAtNextMonth = module.getFirstDayAtThisMonth()
        return new Date(firstDayAtNextMonth - 24 * 60 * 60 * 1000)
    },
    /**
     * 获取默认的奖扣时间
     * 从上月的第一天 到当月的最后一天
     */
    getDefaultQuantifyDate: () => {
        var firstDayAtLastMonth = module.getFirstDayAtLastMonth()
        var lastDayAtThisMonth = module.getLastDayAtThisMonth()
        return [new moment(firstDayAtLastMonth), new moment(lastDayAtThisMonth)]
    },
    /**
     * 获取上月奖扣时间
     * 从上月的第一天 到上月的最后一天
     */
    getLastMonthQuantifyDate: () => {
        var firstDayAtLastMonth = module.getFirstDayAtLastMonth()
        var lastDayAtLastMonth = module.getLastDayAtLastMonth()
        return [new moment(firstDayAtLastMonth), new moment(lastDayAtLastMonth)]
    },
    /**
     * 获取本月奖扣时间
     * 从本月的第一天 到本月的最后一天
     */
    getThisMonthQuantifyDate: () => {
        var firstDayAtThisMonth = module.getFirstDayAtThisMonth()
        var lastDayAtThisMonth = module.getLastDayAtThisMonth()
        return [new moment(firstDayAtThisMonth), new moment(lastDayAtThisMonth)]
    },
    /**
     * 获取这个月的前一个月
     */
    getThisMonthBeforeMonth: () => {
        var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth()
        var day = now.getDate()
        if (month === 0) {
            return new Date(year - 1, 11, 1)
        }
        return new Date(year, month - 1, 1)
    },
    /**
     * 获取当前月的天数
     */
    getThisMonthDay: (year, month) => { //传入月份下标0开始
        var d = new Date(year, month + 1, 0)
        return d.getDate()
    },
    /** 
     * 把时间戳转换为年月日时分秒
     */
    timestampToTime: (timestamp) => {
        if (timestamp == null || timestamp.length) return null
        //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var date = timestamp.length == 10 ? new Date(timestamp * 1000) : new Date(timestamp)
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return Y + M + D + h + m;
    },
    /**
     * 不可选的日期
     */
    disabledDate(current) {
        return current && current > moment().endOf('day')
    }
}


export default module