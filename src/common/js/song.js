// import {getLyric} from 'api/song'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  // getLyric() {
  //   if (this.lyric) {
  //     return Promise.resolve(this.lyric)
  //   }

  //   return new Promise((resolve, reject) => {
  //     getLyric(this.mid).then((res) => {
  //       if (res.retcode === 0) {
  //         this.lyric = Base64.decode(res.lyric)
  //         resolve(this.lyric)
  //       } else {
  //         reject('no lyric')
  //       }
  //     })
  //   })
  // }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=3989104853&vkey=ECE9BD3ADDA55CB5C26B9928CDF3B43F7C056F3E5286174641E4DB872501871F4E118113914548F8F2928C820743C8E789219A5731D53D36&uin=0&fromtag=38`
    
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

