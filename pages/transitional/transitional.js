const app = getApp();
import {
  bindRolePromise
} from '../../app.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    redirectUrl: app.CONFIG.PAGE.SELECTID,
    showLoginBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    bindRolePromise.then(() => {
      if (app.globalData.isAuthorized) {

        wx.switchTab({
          url: app.CONFIG.PAGE.INDEX
        });
      } else {
        self.setData({
          showLoginBtn: true
        });
      }
    });
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

  }
})