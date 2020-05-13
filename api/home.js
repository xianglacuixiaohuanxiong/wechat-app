import { request } from './index'
//  获取token
async function getToken (params) {
  let obj = await request('tUser/userLogin', params, 'post');
  return obj
}
//  获取用户信息
async function getUserInfo (params) {
  let obj = await request('tUser/getUserInfo', params, 'post');
  return obj
}
async function getBanner (params) {
  let obj = await request('sysBanner/selectBannerByPosition', params, 'post');
  return obj
}
module.exports = {
  getToken,
  getUserInfo,
  getBanner
};
