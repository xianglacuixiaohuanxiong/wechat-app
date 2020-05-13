/** 登录流程 */
const api = require('../api/home');
//  进入页面时的流程
export const login = (option) => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resCode => {
        let code = resCode.code;
        if (code) {
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: user => {
                    api.getToken({
                      code,
                      iv: user.iv,
                      rawData: user.rawData
                    }).then(({ data }) => {
                      wx.setStorageSync('Token', data);
                      //  获取用户信息
                      api.getUserInfo().then(({ data }) => {
                        resolve(data);
                      });
                    })
                  }
                })
              } else {
                //  没有授权
                reject();
              }
            }
          })
        } else {
          //  没有获取到登录信息,请重试
          reject();
        }
      }
    })
  })
}
