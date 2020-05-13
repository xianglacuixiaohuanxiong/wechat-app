import { Axios } from "../utils/request";
export const axios = new Axios();
export function request (url, params, method = 'get') {
  return axios.request({
    url,
    method,
    params
  })
}
