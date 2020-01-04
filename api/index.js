import { Axios } from "../utils/request";
export const axios = new Axios();
export function request (url, parmas, method = 'get') {
  return axios.request({
    url,
    method,
    parmas
  })
}
