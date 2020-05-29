/** 封装请求 */
const { host } = require('../config');
const app = getApp();
const dev = '/';

export function request (url, params, method) {
  // wx.showLoading({ title: '请稍候...' });
  return new Promise((resolve, reject) => {
    wx.request({
      url: url.includes('http') ? url : host + dev + url,
      data: params,
      method: method || 'GET',
      success: response => {
        const res = response.data;
        if (res.code === 0 || res.error === 0) {
          resolve(res)
        } else {
          reject(res.message)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: ref => {
        setTimeout(_ => {
          // wx.hideLoading()
        },500)
      }
    });
  })
}