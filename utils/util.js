import {
  Api
} from '../wxapp/api/api.js';
const api = new Api();
const app = getApp();

class Util {
  constructor() {
    let self = this;
  }

  /* 格式化时间 */
  static formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const formatNumber = n => {
      n = n.toString();
      return n[1] ? n : '0' + n
    }
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }

  /* 判断A字符串是否包含B字符串 */
  static strIsContain(strA, strB) {
    if (strA.toString().indexOf(strB.toString() > -1)) return true;
    else return false;
  }

  /* 模态弹窗 */
  static showModal(options) {
    let defaultOption = {
      title: '提示',
      content: '',
      confirmText: '确定',
      cancelText: '取消'
    };
    options = Object.assign(defaultOption, options || {});
    return new Promise(function(resolve, reject) {
      wx.showModal({
        title: options.title,
        content: options.content,
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        success: function(res) {
          if (res.confirm) {
            resolve();
          } else {
            reject();
          }
        }
      })
    });
  }

  /* 验证授权并保存用户信息 */
  static checkIsAuthorized(event, cb) {
    let userInfo = event.detail.userInfo;
    if (!userInfo) return;
    /* 用户已授权 */
    if (app.globalData.userInfo) {
      typeof cb == 'function' && cb();
      return;
    }
    /* 用户还未授权 */
    app.globalData.userInfo = userInfo;
    api.setUserInfo(userInfo).then((res) => {
      console.log('保存用户信息成功: ', res);
      typeof cb == 'function' && cb();
    });
  }

  /* 判断用户是否已经授权 */
  static getSetting() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log('用户已授权！');
              app.globalData.userInfo = res.userInfo;
            }
          });
        } else {
          console.log('用户未授权！');
        }
      }
    });
  }

  /* 微信用户登录 */
  static wxlogin() {
    wx.login({
      success: res => {
        let code = res.code;
        console.log('登录code:', code);
        api.wxlogin(code).then(res => {
          console.log(res);
        });
      }
    });
  }

  /* 分享和转发 */
  static onShareAppMessage(title, path, imageUrl, cb) {
    let defaultImageUrl = '../../images/share.jpg';
    return {
      title: title,
      path: path,
      imageUrl: imageUrl || defaultImageUrl,
      success(res) {
        console.log('分享转发成功！', res);
        if (!res.shareTickets) {
          api.shareFriend().then(() => {
            console.log('分享转发到个人成功!');
            typeof cb == 'function' && cb();
          });
        } else {
          let st = res.shareTickets[0];
          wx.getShareInfo({
            shareTicket: st,
            success(res) {
              let iv = res.iv
              let encryptedData = res.encryptedData;
              api.groupShare(encryptedData, iv).then(res => {
                console.log('分享转发到群成功!', res);
                typeof cb == 'function' && cb();
              });
            }
          });
        }
      },
      fail: function(res) {
        console.log('分享转发失败！');
      }
    };
  }

  /* 用户下拉重新加载数据 */
  static onPullDownRefresh(ctx, apifunc, cb, pageTitle) {;
    let self = this;
    wx.stopPullDownRefresh();
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '正在刷新...'
    });
    ctx.setData({
      isLoading: true
    });
    let finallyfunc = () => {
      ctx.setData({
        isLoading: false
      });
      wx.hideNavigationBarLoading();
      wx.setNavigationBarTitle({
        title: pageTitle || ''
      })
    }
    self.strIsContain(apifunc, 'Promise') && apifunc.then(res => {
      typeof cb == 'function' && cb(res);
      finallyfunc();
    }, res => {
      console.error('重新加载失败: ', res);
      finallyfunc();
    });
  }
}

module.exports = {
  Util: Util
}