//index.wxs
//获取应用实例
import pageState from '../../common/pageStatus/index'
const app = getApp();
const api = require('../../api/home');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isNetwork: true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    this.getBanner();
    console.log(app.globalData.userInfo)
    this.getAppUserInfo();
  },
  onShow () {
    this.setData({
      isNetwork: wx.getStorageSync('networkStatus')
    });
    if (!this.data.isNetwork) {
      const pageStates = pageState(this);
      console.log(pageStates)
      pageStates.error();
    }
  },
  //  重新加载
  onRetry () {
    console.log(1)
    app.onLaunch();
    this.onLoad();
    this.onShow();
  },
  getUserInfo (e) {
    let that = this;
    wx.login({
      success: code => {
        let params = {
          code: code.code,
          iv: e.detail.iv,
          rawData: e.detail.rawData
        };
        api.getToken(params).then(res => {
          wx.setStorageSync('Token', res.data);
          api.getUserInfo().then(({ data }) => {
            console.log(data)
            app.globalData.userInfo = data
            this.setData({
              userInfo: data,
              hasUserInfo: true
            })
          });
          // app.globalData.userInfo = e.detail.userInfo
          // this.setData({
          //   userInfo: e.detail.userInfo,
          //   hasUserInfo: true
          // })
        });
      }
    });
  },
  getAppUserInfo () {
    if (app.globalData.userInfo) {
      console.warn(1)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.warn(2)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res,
          hasUserInfo: true
        })
      }
    } else {
      console.warn(3)
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  async getBanner () {
    let that = this;
    let params = {
      positionValue: 1
    };
    let obj = await api.getBanner(params);
    console.log(obj)
  }
})
