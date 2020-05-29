App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getNetworkType({
      success: res => {
        const networkType = res.networkType;
        // this.globalData.networkType = res.networkType;
        wx.setStorageSync('networkType', res.networkType);
        if (networkType !== 'none') {
          wx.setStorageSync('networkStatus', true);
        }
      }
    })
    wx.onNetworkStatusChange(function (res) {
      // this.globalData.networkStatus = res.isConnected;
      // this.globalData.networkType = res.networkType;
      wx.setStorageSync('networkStatus', res.isConnected);
      wx.setStorageSync('networkType', res.networkType);
      console.log(wx.getStorageSync('networkStatus'))
      console.log(wx.getStorageSync('networkType'))
    })
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // });
    //  自动登录
    // AUTH.checkHasLogined().then(async isLogined => {
    //   if (!isLogined) {
    //     AUTH.register()
    //   } else {
    //     AUTH.getUserInfo().then((res) => {
    //       const { userInfo } = res
    //       // 更新用户信息
    //       WXAPI.modifyUserInfo({
    //         avatarUrl: userInfo.avatarUrl,
    //         city: userInfo.city,
    //         nick: userInfo.nickName,
    //         province: userInfo.province,
    //         token: wx.getStorageSync('token')
    //       })
    //     })
    //   }
    // })

  },
  globalData: {
    expires: 0,
    userInfo: null,
    networkStatus: true,
    networkType: '',
    appid: 'wx5fadfde3504664de',
  },
})
