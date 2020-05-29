const app = getApp().globalData;
import pageState from '../../common/pageStatus/index'
import api from '../../api/login'
const AUTH = require('../../utils/auth');
Page({
  data: {
    userInfo: {},
    isLoad: false,
    isAuth: false
  },
  onLoad: function () {
    this.getIndexConfig().then(_ => {
      if (app.audit) {
        this.setData({
          isAuth: true
        })
        wx.setNavigationBarTitle({
          title: '书币幸运奖'
        });
        AUTH.login().then(res => {
         this.setData({
           userInfo: res
         })
        }).finally(_ => {
          this.setData({
            isLoad: true
          })
        })
      } else {
        this.setData({
          isAuth: false
        })
        wx.setNavigationBarTitle({
          title: '趣味看图'
        })
      }
    })
  },
  //  首页配置
  getIndexConfig () {
    const that = this;
    return new Promise((resolve, reject) => {
      if (app.hasConfig) {
        this.setData({
          audit: app.audit,
          advert: app.advert,
        })
      }
      api.indexConfig({ appid: app.appid })
        .then(res => {
          let { advert, audit } = res.data;
          app.advert = Number(advert);
          app.audit = Number(audit);
          app.hasConfig = 1;
          that.setData({
            audit: app.audit,
            advert: app.advert,
            hasConfig: 1
          })
          resolve()
        })
        .catch(err => {
          reject()
        })
    })
  },
  //  广告
  viewAd () {
    wx.showLoading({
      title: '广告加载中',
    })
    // 在页面中定义激励视频广告
    let videoAd = null
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-4760875b27632196',
        multiton: true
      })
    }
    videoAd.load().catch(_ => {
      wx.showToast({
        title: '加载失败,请重试.',
        icon: 'none'
      })
    }).finally(_ => {
      wx.hideLoading()
    })
    videoAd.onError(err => {
      wx.showToast({
        title: '加载失败,请重试.',
        icon: 'none'
      })
    })
    videoAd.onClose(res => {
      if (res && res.isEnded) {
        // 正常播放结束，下发奖励
        console.log(`正常播放完成.`)
      }
    })
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(_ => {
          videoAd.load()
            .then(() => videoAd.show())
            .catch(err => {
              console.log('激励视频 广告显示失败')
            })
        })
    }
  }
})
