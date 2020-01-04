import { request } from './index'
async function getBanner (params) {
  let obj = await request('recommendPoetry', params, 'post');
  return obj
}
module.exports = {
  getBanner
};
