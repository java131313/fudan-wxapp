import Util from '../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: app.CONFIG.BGCOLOR,
    newsDetailUrl: app.CONFIG.PAGE.NEWSDETAILS,
    activityUrl: app.CONFIG.PAGE.ACTIVEDETAILS,
    recruitUrl: app.CONFIG.PAGE.RECRUITDETAILS,
    voteUrl: app.CONFIG.PAGE.VOTEDETAILS,
    contributeUrl: app.CONFIG.PAGE.CONTRIBUTEFORM,
    isLoading: false,
    newsItem: {},
    menuType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.getNewsList();
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
    let apifunc = app.api.getNewsList();
    let cb = res => {
      self.setData({
        newsItem: res.data.data
      });
    };
    let pageTitle = '复旦大学';
    Util.onPullDownRefresh(self, apifunc, cb, pageTitle);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /* 获取首页推荐列表数据 */
  getNewsList() {
    let self = this;
    app.api.getNewsList().then(res => {
      self.setData({
        newsItem: res.data.data
      });
    });
  },

  /* 点击切换推荐页 */
  menuClick(e) {
    let self = this;
    self.setData({
      menuType: Number(e.currentTarget.dataset.num)
    });
  },

  /* 搜索获取焦点触发 */
  search() {
    wx.navigateTo({
      url: app.CONFIG.PAGE.SEARCH
    });
  }
})