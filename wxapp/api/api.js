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
    if (self.isMock) return mockData.getNewsList();
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

  /* 获取用户信息 */
  getUserInfo() {
    let self = this;
    let url = '/front/getUserInfo';
    let postData = {
      session_id: self.getSessionId(),
    };
    return self.post(url, postData);
  }

  /* 获取用户身份列表 */
  getRoles() {
    let self = this;
    let url = '/front/roles';
    return self.post(url);
  }

  /* 获取标签列表 */
  getTags() {
    let self = this;
    let url = '/front/getTags';
    let postData = {
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 用户设置多个标签 */
  setTags(tags) {
    let self = this;
    let url = '/front/setTags';
    let postData = {
      session_id: self.getSessionId(),
      tags: tags.toString()
    };
    return self.post(url, postData);
  }

  /* 获取我的活动 */
  getMyActivity() {
    let self = this;
    let url = '/front/myActivity'
    let postData = {
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 获取我的投票 */
  getMyVote() {
    let self = this;
    let url = '/front/myVote';
    let postData = {
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 判断是否绑定身份 */
  getHasBindRole() {
    let self = this;
    let url = '/front/hasBindRole';
    let postData = {
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 获取我的投稿 */
  getMyContribution() {
    let self = this;
    let url = '/front/myContribution';
    let postData = {
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 绑定用户身份 */
  setRole(role_id) {
    let self = this;
    let url = '/front/setRole';
    let postData = {
      session_id: self.getSessionId(),
      role_id: role_id
    };
    return self.post(url, postData);
  }

  /* 获取新闻详情 */
  getNewsDetail(id) {
    let self = this;
    let url = '/front/news';
    let postData = {
      id: id
    };
    return self.post(url, postData);
  }

  /* 招聘详情 */
  getRecruitDetail(id) {
    let self = this;
    let url = '/front/recruit';
    let postData = {
      id: id,
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 获取投票详情 */
  getVoteDetail(id) {
    let self = this;
    let url = '/front/vote';
    let postData = {
      id: id,
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 投票 */
  vote(id) {
    let self = this;
    let url = '/front/voteIt';
    let postData = {
      id: id,
      session_id: self.getSessionId()
    };
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
            url: `${service}/front/wxLogin`,
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
          console.log(res.data.msg);
          if (res.data.code == 200) {
            resolve(res);
          } else if (res.data.code == 400) {
            /* session过期需要重新登录一次 */
            console.warn('session过期！');
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