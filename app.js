import {
  Util
} from 'utils/util.js';
import {
  Api
} from 'wxapp/api/api.js';
import {
  MockData
} from 'wxapp/mock/mockData.js';
const CONFIG = require('wxapp/api/config.js');
const ENUM = require('utils/enum.js');
const api = new Api();
const mockData = new MockData();
export let bindRolePromise = new Promise((resolve, reject) => {});

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {
    let self = this;
    /* 微信登录 */
    bindRolePromise = Util.wxlogin().then(() => {
      return self.getHasBindRole(options.scene);
    });
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },

  /* 判断是否绑定身份 */
  getHasBindRole(scene) {
    let self = this;
    return self.api.getHasBindRole().then(() => {
      /* 已绑定身份 */
      self.globalData.isAuthorized = true;
      Util.getUserInfo();
    }, () => {
      /* 未绑定身份,如果通过分享进来跳转到开机页 */
      if (Util.arrayIsContain(self.CONFIG.SCENES.CHAT, scene)) {
        wx.redirectTo({
          url: self.CONFIG.PAGE.TRANSITIONAL
        });
      }
    });
  },

  /* 全局设置 */
  globalData: {
    userInfo: null,
    sysConfig: null,
    isAuthorized: false
  },
  CONFIG: CONFIG,
  ENUM: ENUM,
  api: api,
  mockData: mockData
})