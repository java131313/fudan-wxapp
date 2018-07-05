import {
  Util
} from '../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionBarItem: app.CONFIG.PERSONAL.ACTION_BAR_ITEM,
    authorizeIDUrl: app.CONFIG.PAGE.SELECTID,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let self = this;
    self.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /* 获取用户信息 */
  getUserInfo() {
    let self = this;
    self.setData({
      userInfo: app.globalData.userInfo
    });
  },

  wxAuthorize(e) {
    let self = this;
    let cb = () => {
      Util.getUserInfo();
    };
    Util.checkIsAuthorized(e, cb);
  }
})