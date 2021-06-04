import Vue from 'vue'
// 初始化微信配置
export function initToken (params = {}, cb) {
  return new Promise((resolve, reject) => {
    if (window.entryUrl === undefined || window.entryUrl === '') {
      window.entryUrl = location.href.split('#')[0]
    }
    const signLink = /(Android)/i.test(navigator.userAgent)
      ? location.href.split('#')[0]
      : window.entryUrl
    Vue.prototype.$api
      .getWxToken({ url: signLink })
      .then(res => {
        const data = res.data
        if (data.code === 0) {
          // 不是微信浏览器，立即执行播放背景音乐的回调函数（要等用户第一次交互后才会播放）
          const userAgent = window.navigator.userAgent.toLowerCase()
          const isWeixinBrowser = /micromessenger/.test(userAgent)
          if (!isWeixinBrowser && typeof cb === 'function') cb()
          // eslint-disable-next-line no-undef
          wx.config({
            debug: false,
            beta: true,
            appId: data.data.appid,
            timestamp: data.data.timestamp,
            nonceStr: data.data.noncestr,
            signature: data.data.signature,
            jsApiList: [
              'updateAppMessageShareData',
              'updateTimelineShareData'
            ]
          })
          // eslint-disable-next-line no-undef
          wx.ready(() => {
            // 是微信浏览器，在ready后自动播放背景音乐
            if (typeof cb === 'function') cb()
            this.initShare(params)
              .then(res => resolve(res))
              .catch(err => reject(err))
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  })
}
// 初始化微信分享
export function initShare (params) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    wx.updateTimelineShareData({
      title: params.timelineTitle || params.title,
      link: params.link,
      imgUrl: params.img,
      success: res => resolve(res),
      cancel: err => reject(err)
    })
    // eslint-disable-next-line no-undef
    wx.updateAppMessageShareData({
      title: params.title,
      link: params.link,
      imgUrl: params.img,
      desc: params.desc || params.title,
      success: res => resolve(res),
      cancel: err => reject(err)
    })
  })
}

// 使用
try {
  await initToken(
    {
      title: 'title',
      desc: 'xxxx',
      img:'', // 必须是绝对路径
      link: ''
    }
  )
} catch (e) {
  console.error(e)
}