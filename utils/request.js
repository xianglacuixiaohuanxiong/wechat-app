/** 封装请求 */
const { host } = require('../config');
const app = getApp();
const dev = '/api/';
export class Axios {
  constructor () {
    this.baseUrl = host + dev
  }
  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "tokenId": wx.getStorageSync('Token')
      }
    };
    return config;
  }
  request (option) {
    option = Object.assign(this.getInsideConfig(), option);
    wx.showLoading({ title: '请稍候...' });
    return new Promise((resolve, reject) => {
      if(wx.getStorageSync('networkStatus')) {
        wx.request({
          url: option.baseUrl + option.url,
          data: option.params,
          header: option.header,
          method: option.method,
          success: response => {
            const res = response.data;
            if (res.success) {
              resolve(res)
            } else {
            }
          },
          fail: err => {
            reject(err)
          },
          complete: ref => {
            setTimeout(_ => {
              wx.hideLoading()
            },500)
          }
        });
      } else {
        wx.showToast({
          title: '网络断开,请检查网络',
          icon: 'none'
        })
      }
    })
  }
}
