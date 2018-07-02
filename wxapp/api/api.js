import {
  MockData
} from '../mock/mockData.js';
const CONFIG = require('config.js');
const mockData = new MockData();

class Api {
  constructor() {
    let self = this;
    self.isMock = CONFIG.MOCK.STATUS;
  }

  mockTest() {
    let self = this;
    if (self.isMock) return mockData.getCommentList();
  }

  /* 获取缓存里面的session_id */
  getSessionId() {
    return wx.getStorageSync('session_id');
  }

  /* 微信登录 */
  wxlogin(code) {
    let self = this;
    let url = '/front/wxLogin';
    let postData = {
      code: code
    };
    return self.post(url, postData);
  }

  /* 保存用户信息 */
  setUserInfo(userInfo) {
    let self = this;
    let url = '/front/setUserInfo';
    let postData = Object.assign(userInfo, {
      session_id: self.getSessionId()
    });
    return self.post(url, postData);
  }

  /* session过期重新登录 */
  reLogin() {
    let self = this;
    let service = CONFIG.DEBUG.STATUS ? CONFIG.DEBUG.API : CONFIG.HTTP.API;
    let reLoginPromise = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          wx.request({
            url: `${service} `,
            method: 'POST',
            data: {
              code: res.code
            },
            success: res => {
              if (res.data.code == 200) {
                resolve(res);
              } else {
                reject(res);
              }
            },
            fail: res => {
              reject(res);
            }
          })
        }
      });
    });
    return reLoginPromise;
  }

  /* GET请求 */
  getRequest(url, data, header) {
    let self = this;
    return self.requestData('get', url, data, header);
  }

  /* POST请求 */
  post(url, data, header) {
    let self = this;
    return self.requestData('post', url, data, header);
  }

  /* wx请求数据 */
  requestData(method, url, data, header) {
    if (!url || !method) return;
    let self = this;
    let service = CONFIG.DEBUG.STATUS ? CONFIG.DEBUG.API : CONFIG.HTTP.API;
    return new Promise((resolve, reject) => {
      wx.request({
        url: service + url,
        data: data || {},
        header: header || {},
        method: method.toLocaleUpperCase(),
        success: function(res) {
          if (res.data.code == 200) {
            resolve(res);
          } else if (res.data.code == 400) {
            /* session过期需要重新登录一次 */
            console.warn('sessiong过期！');
            if (!(data && data.session_id)) return;
            self.reLogin().then(res => {
              console.log('重新登录成功！');
              wx.setStorageSync('session_id', res.data.data.session_id);
              data.session_id = self.getSessionId();
              /* 如果是登录请求则不需要再进行重复请求 */
              if (url.indexOf('login') > -1) return;
              self.requestData(method, url, data, header);
            }, res => {
              reject(res);
            });
          } else {
            reject(res);
          }
        },
        fail: function(res) {
          reject(res.errMsg || '发送网络错误(http fail)');
        }
      });
    });
  }
}

module.exports = {
  Api: Api
}