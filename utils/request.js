/** 封装请求 */
const { host } = require('../config');
const dev = '';
export class Axios {
  constructor () {
    this.baseUrl = host + dev
  }
  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      header: {
        "content-type": "application/x-www-form-urlencoded",
      }
    };
    return config;
  }
  request (option) {
    option = Object.assign(this.getInsideConfig(), option);
    wx.showLoading({ title: '请稍候...' });
    return new Promise((resolve, reject) => {
      wx.request({
        url: option.baseUrl + option.url,
        data: option.params,
        header: option.header,
        method: option.method,
        success: response => {
          const res = response.data;
          resolve(res)
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
    })
  }
}
