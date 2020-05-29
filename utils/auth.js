let app = getApp().globalData;
console.log(app)
import api from '../api/login'
function showModal(title, content) {
  wx.showModal({
    title: title,
    content: content.toString(),
    showCancel: false
  })
}
// 弹出loading
function showLoading(title) {
  wx.showLoading({
    title: title,
    mask: true
  })
}
//  获取页面配置
function indexConfig () {
  const that = this;
  if (app.hasConfig) {
    this.setData({
      audit: app.audit,
      advert: app.advert,
    })
  }
}
//  判断授权并根据授权返回相应的状态
function login(flag) {
  return new Promise((resolve, reject) => {
    let now = new Date().getTime();
    let expires = app.expires ? app.expires : Number(wx.getStorageSync('expires'));
    if (expires && app.userInfo && expires - 200000 > now) {
      resolve(app.userInfo);
    } else {
      wx.getSetting({
        success(setting) {
          if (setting.authSetting["scope.userInfo"]) {
            if (flag) {
              showLoading('登录中...')
            }
            if (!app.userInfo) {
              wx.login({
                success(res) {
                  wx.getUserInfo({
                    success(res1) {
                      let params = {
                        code: res.code,
                        encryptedData: res1.encryptedData,
                        iv: res1.iv,
                        appid: app.appid
                      }
                      api.login(params).then(res => {
                        if (!res.error) {
                          app.userInfo = res.data;
                          app.expires = new Date().getTime() + 7200000;
                          wx.setStorageSync('userInfo', res.data);
                          wx.setStorageSync('expires', app.expires.toString());
                          resolve(app.userInfo)
                        } else {
                          showModal('提示', res.msg);
                          reject(res.msg)
                        }
                      }).catch(err => {
                        showModal('提示', err);
                        reject(err);
                      })
                    }
                  })
                }
              })
            } else {
              let params = {
                uid: app.userInfo.uid,
                openid: app.userInfo.openid,
                appid: app.appid
              }
              api.refreshToken(params).then(res => {
                if (res.code === 8) {
                  wx.setStorageSync('userInfo', '');
                  wx.setStorageSync('expires', '');
                  app.userInfo = '';
                  app.expires = '';
                  login(flag).then(userInfo => {
                    resolve(userInfo)
                  });
                } else if (!res.error) {
                  let userInfo = wx.getStorageSync('userInfo');
                  userInfo.token = res.data.token;
                  app.userInfo = userInfo;
                  app.expires = now + 7200000;
                  wx.setStorageSync('userInfo', app.userInfo);
                  wx.setStorageSync('expires', app.expires.toString());
                  getUserInfo(app.userInfo.openid).then(() => {
                    resolve(app.userInfo);
                  })
                } else {
                  showModal('提示', res.msg);
                  reject(res.msg)
                }
              }).catch(err => {
                showModal('提示', '服务器异常，请稍候再试');
                reject(err)
              })
            }
          }
        }
      })
    }
  })
}
function getUserInfo(openid) {
  let _this = this;
  return new Promise((resolve, reject) => {
    showLoading('加载中');
    wx.request({
      url: `${baseUrl}/bookCoin/userInfo`,
      method: 'GET',
      header: {
        Authorization: app.userInfo.token
      },
      data: {
        openid
      },
      success(res) {
        if (res.data.error) {
          showModal('出错了', res.data.msg);
          return reject()
        }
        wx.setStorageSync('userDetails', res.data.data);
        resolve(res.data.data)
      },
      fail() {
        showModal('出错了', '获取信息失败');
        reject()
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}
module.exports = {
  login,
  showModal,
  showLoading
}