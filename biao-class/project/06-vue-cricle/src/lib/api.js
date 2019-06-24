import axios from 'axios';

let appKey = 'd60f7aa49bc31c242ecaba19308ff706aa2ada25564cee0a787e22b416459dbe';

window.api = api;

export default function api (url, data) {
  let timestamp = Date.now();

  return axios.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
    headers : {
      'BIAO-MOCK-APP-KEY'   : appKey,
      'BIAO-MOCK-TIMESTAMP' : timestamp,
      'BIAO-MOCK-SIGNATURE' : sign(appKey, timestamp),
    },
  }).then(r => {
    return r.data;
  });
}


/**
 * 签名
 * @param appKey 应用的键，可在应用管理中拿到：https://mock.biaoyansu.com/app
 * @param timestamp 时间戳
 * @return {string}
 */
function sign (appKey, timestamp) {
  return btoa(appKey + timestamp);
}
