function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatUri(url, data){
  url += (url.indexOf('?') < 0 ? '?' : '') + spliceParams(data);
  return url
}

function spliceParams(data){ // 接收一个对象进行拼接
  let url = '';
  for (let i in data){
    let value = data[i] !== undefined ? data[i] : '';
    url += `&${i}=${encodeURIComponent(value)}`;
  }
  return url // ? url.substring(1) : ''//url存在则切割掉第一个&
}