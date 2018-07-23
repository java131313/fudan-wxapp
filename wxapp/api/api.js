import MockData from '../mock/mockData.js';
import COS from 'cos-wx-sdk-v5.js';
const CONFIG = require('config.js');
const mockData = new MockData();

export default class Api {
  constructor(Util) {
    let self = this;
    if (Util) {
      self.Util = Util;
    }
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

  /* 搜索 */
  search(keyword) {
    let self = this;
    let url = '/front/search';
    let postData = {
      keyword: keyword,
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 搜索页面数据,包括 搜索历史，搜索热词 */
  getSearchPage() {
    let self = this;
    let url = '/front/searchPage';
    let postData = {
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 删除搜索历史记录 */
  removeSearchHistory() {
    let self = this;
    let url = '/front/removeSearchHistory';
    let postData = {
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 评论 */
  addComment(id, commentType, content) {
    let self = this;
    let url = '/front/addComment';
    let postData = {
      id: id,
      type: commentType,
      content: content,
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 点赞 */
  addSupportNum(id, supportType) {
    let self = this;
    let url = '/front/addSupportNum';
    let postData = {
      id: id,
      type: supportType,
      session_id: self.getSessionId()
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

  /* 岗位申请 */
  recruitApply(recruitFormData) {
    let self = this;
    let url = '/front/recruitApply';
    let postData = Object.assign(recruitFormData, {
      session_id: self.getSessionId()
    });
    return self.post(url, postData);
  }

  /* 活动申请 */
  activityApply(id) {
    let self = this;
    let url = '/front/activityApply';
    let postData = {
      id: id,
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 提交稿件 */
  contribute(contributeFormData, dynamic_back) {
    let self = this;
    let url = '/front/contribute';
    let dynamic_kv = {};
    dynamic_back && dynamic_back.forEach((x, index) => {
      dynamic_kv[x] = contributeFormData[`dynamic_${index}`];
    });
    let postData = Object.assign(contributeFormData, {
      session_id: self.getSessionId(),
      dynamic_kv: JSON.stringify(dynamic_kv)
    });
    return self.post(url, postData);
  }

  /* 活动详情 */
  getActivityDetail(id) {
    let self = this;
    let url = '/front/activity';
    let postData = {
      id: id,
      session_id: self.getSessionId()
    };
    return self.post(url, postData);
  }

  /* 征稿详情 */
  getContributionDetail(id) {
    let self = this;
    let url = '/front/contribution';
    let postData = {
      id: id,
      session_id: self.getSessionId()
    };
    return self.getRequest(url, postData);
  }

  /* 获取腾讯云签名 */
  getQCloudSign() {
    let self = this;
    let url = '/front/getQCloudSign';
    return self.getRequest(url);
  }

  /* 上传图片到腾讯云(支持多张) */
  uploadImages(imgPath, imgPrefix) {
    return new Promise((reslove, reject) => {
      if (!imgPath || imgPath.length == 0) {
        reslove([]);
        return;
      }
      let self = this;
      let successCount = 0;
      let imgUrl = [];
      self.getQCloudSign().then(res => {
        let config = res.data.data.config;
        imgPath.forEach(x => {
          self.cosImage(config, x, imgPrefix).then(cosRes => {
            imgUrl.unshift(cosRes);
            successCount++;
            if (successCount == imgPath.length) {
              console.log('上传所有图片到腾讯云成功: ', successCount);
              reslove(imgUrl);
            }
          });
        });
      }, res => {
        reject('获取腾讯云配置信息失败');
      });
    });
  }

  /* 腾讯云上传文件SDK */
  cosImage(config, imgPath, imgPrefix) {
    if (!config || !imgPath) return;
    let self = this;
    let imgGuid = self.Util.genId(6);
    let imgYmd = self.Util.getImgYmd();
    const cos = new COS({
      getAuthorization: (params, callback) => {
        let authorization = COS.getAuthorization({
          SecretId: config.cos.secretid,
          SecretKey: config.cos.secretkey,
          Method: params.Method,
          Key: params.Key
        });
        callback(authorization);
      }
    });
    return new Promise((resolve, reject) => {
      cos.postObject({
        Bucket: `${config.bucket}-${config.appid}`,
        Region: config.region,
        Key: `uploads/${imgYmd}/${imgPrefix || 'cosimg'}/${imgGuid}.jpg`,
        FilePath: imgPath
      }, (error, data) => {
        if (error) {
          console.warn("上传腾讯云失败： ", error);
          reject(error);
        } else {
          if (data.statusCode == 200) {
            console.log('上传腾讯云成功： ', data);
            resolve(data.Location);
          }
        }
      });
    });
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
  requestData(method, url, data, header, isNotSelfApi) {
    if (!url || !method) return;
    let self = this;
    let service = CONFIG.DEBUG.STATUS ? CONFIG.DEBUG.API : CONFIG.HTTP.API;
    console.log(`${url}提交数据: `, data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: isNotSelfApi ? url : service + url,
        data: data || {},
        header: header || {},
        method: method.toLocaleUpperCase(),
        success: function(res) {
          if (isNotSelfApi) {
            resolve(res);
            return;
          }
          console.log('后台返回的Message: ', res.data.msg);
          if (res.data.code == 200) {
            console.log(`${url}请求成功返回数据: `, res);
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