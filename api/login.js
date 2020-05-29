import { request } from '../utils/request';

//  获取首页配置
function indexConfig (params) {
  return request('https://mipaapi.maiyawx.cn/index_info', params, 'get');
}

//  登录
function login (params) {
  return request('users', params, 'post');
}
//  获取token
function refreshToken (params) {
  return request('refreshToken', params, 'post');
}

export default {
  refreshToken,
  login,
  indexConfig
}