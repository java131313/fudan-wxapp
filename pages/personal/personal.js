// pages/personal/personal.js
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
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.getUserInfo();
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

  getUserInfo() {
    let self = this;
    /* 获取用户信息 */
    app.api.getUserInfo().then(res => {
      self.setData({
        userInfo: res.data.data
      });
    });
  },

  wxAuthorize(e) {
    let self = this;
    Util.checkIsAuthorized(e).then(() => {
      self.getUserInfo();
    });
  }
})