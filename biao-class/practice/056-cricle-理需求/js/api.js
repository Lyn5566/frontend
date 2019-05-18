/*
|--------------------------------------------------------------------------
| 表Mock API请求库
|--------------------------------------------------------------------------
*/

;(function () {
  'use strict';

  // 暴露接口，api默认为post()
  window.api = post;
  // 可以使用api.get(...)来调用get方法
  api.get    = get;

  let appKey = 'd60f7aa49bc31c242ecaba19308ff706aa2ada25564cee0a787e22b416459dbe';

  /**
   *
   * @param action 行为，如：'user/create'
   * @param data 发送的数据，如：{username: 'whh' ...}
   * @param onSuccess 成功后的回调
   * @param onError 失败后的回调
   */
  function post (action, data, onSuccess, onError) {
    send('post', action, data, onSuccess, onError);
  }

  /**
   * @param action 行为，如：'user/create'
   * @param onSuccess 成功后的回调
   * @param onError 失败后的回调
   */
  function get (action, onSuccess, onError) {
    send('get', action, null, onSuccess, onError);
  }

  /**
   * 底层的请求函数
   * @param method 如：get|post
   * @param action 'user/create'
   * @param data {username: 'whh' ...}
   * @param onSuccess 成功后的回调
   * @param onError 失败后的回调
   */
  function send (method, action, data, onSuccess, onError) {
    let http      = new XMLHttpRequest();
    let baseUrl   = 'https://mock.biaoyansu.com/api/1/';
    let timestamp = (new Date).getTime();
    // 这个地方填你的应用key

    http.open(method, baseUrl + action);

    http.setRequestHeader('BIAO-MOCK-APP-KEY', appKey);
    http.setRequestHeader('BIAO-MOCK-TIMESTAMP', timestamp);
    http.setRequestHeader('BIAO-MOCK-SIGNATURE', sign(appKey, timestamp));
    http.setRequestHeader("Content-Type", "application/json");

    let json = JSON.stringify(data);

    http.send(json);

    http.addEventListener('load', $ => {
      onSuccess && onSuccess(JSON.parse(http.responseText));
    });

    http.addEventListener('error', $ => {
      onError && onError(JSON.parse(http.responseText));
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

})();
