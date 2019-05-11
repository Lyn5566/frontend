
 import axios from 'axios'

let appKey = 'e93bf155c1f1aec91d9bf2a893738872db1dceaf60b5b29f2fd50968b7f723ae';
let timestamp = Date.now();
let baseUrl   = 'https://mock.biaoyansu.com/api/1/';
      export default function api(action,params){
      return  axios.post(baseUrl+action,params,{
            headers:{
            'BIAO-MOCK-APP-KEY':appKey,
            'BIAO-MOCK-TIMESTAMP': timestamp,
            'BIAO-MOCK-SIGNATURE':sign(appKey, timestamp)}
        }).then(function(r){
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