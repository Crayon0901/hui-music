import originJsonp from 'jsonp'// 引入第三方插件库jsonp用于第三方QQapi请求
import {formatUri} from './util';

export default function jsonp(url, data, option) {
  url = formatUri(url, data);

  return new Promise((resolve, reject) => { // 返回一个promise
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}