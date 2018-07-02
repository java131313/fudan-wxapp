// pages/index/index.js
import {
  Util
} from '../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTZ: false,
    test: "我是模板啊",
    isLoading: false,
    comment: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Util.wxlogin();
    app.api.mockTest().then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        console.log(res.data.data);
        this.setData({
          comment: res.data.data
        });
      }
    });
  },

  cc(res) {
    console.log(res);
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
    let self = this;
    let apifunc = app.api.mockTest();
    let cb = res => {
      self.setData({
        comment: res.data.data
      });
    };
    let pageTitle = '复旦大学';
    Util.onPullDownRefresh(self, apifunc, cb, pageTitle);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  onPageScroll(res) {
    // console.log(res);
    // if (res.scrollTop == 0) {
    //   this.setData({
    //     istt: true
    //   });
    //   setTimeout(() => {
    //     this.setData({
    //       istt: false
    //     });
    //   }, 3000)
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  gobaidu() {
    this.setData({
      isTZ: true
    });
  }
})