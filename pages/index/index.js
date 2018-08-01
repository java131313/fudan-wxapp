import Util from '../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: app.CONFIG.BGCOLOR,
    bgStyle: {},
    newsDetailUrl: app.CONFIG.PAGE.NEWSDETAILS,
    activityUrl: app.CONFIG.PAGE.ACTIVEDETAILS,
    recruitUrl: app.CONFIG.PAGE.RECRUITDETAILS,
    voteUrl: app.CONFIG.PAGE.VOTEDETAILS,
    contributeUrl: app.CONFIG.PAGE.CONTRIBUTEFORM,
    isLoading: false,
    showLoadingMore: false,
    newsItem: {},
    weekRank: {},
    menuType: 1,
    news_page_index: 0,
    weekrank_page_index: 0,
    isLoadWeekRank: false,
    news_page_num: 0,
    weekrank_page_num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.setData({
      bgStyle: app.globalData.sysConfig.bgStyle
    });
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
  onShow: function(options) {

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
    let menuType = self.data.menuType;
    let apifunc = menuType == 1 ? app.api.getNewsList(0) : app.api.getWeekRank(0);
    let cb = res => {
      if (menuType == 1) {
        self.setData({
          news_page_num: res.data.data.page_num,
          news_page_index: 0,
          newsItem: res.data.data.data
        });
      } else {
        self.setData({
          weekrank_page_num: res.data.data.page_num,
          weekrank_page_index: 0,
          weekRank: res.data.data.data
        });
      }
    };
    let pageTitle = '复旦大学';
    Util.onPullDownRefresh(self, apifunc, cb, pageTitle);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let self = this;
    let menuType = self.data.menuType;
    if (menuType == 1) {
      self.setData({
        news_page_index: self.data.news_page_index + 1
      });
      let news_page_index = self.data.news_page_index;
      let news_page_num = self.data.news_page_num;
      if (news_page_index <= news_page_num - 1) {
        self.setData({
          showLoadingMore: true
        });
        app.api.getNewsList(news_page_index).then(res => {
          self.setData({
            newsItem: self.data.newsItem.concat(res.data.data.data),
            showLoadingMore: false
          });
        });
      }
    } else {
      self.setData({
        weekrank_page_index: self.data.weekrank_page_index + 1
      });
      let weekrank_page_index = self.data.weekrank_page_index;
      let weekrank_page_num = self.data.weekrank_page_num;
      if (weekrank_page_index <= weekrank_page_num - 1) {
        self.setData({
          showLoadingMore: true
        });
        app.api.getWeekRank(weekrank_page_index).then(res => {
          self.setData({
            weekRank: self.data.weekRank.concat(res.data.data.data),
            showLoadingMore: false
          });
        });
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /* 获取首页推荐列表数据 */
  getNewsList() {
    let self = this;
    app.api.getNewsList(0).then(res => {
      self.setData({
        news_page_num: res.data.data.page_num,
        newsItem: res.data.data.data
      });
    });
  },

  /* 获取本周热榜 */
  getWeekRank() {
    let self = this;
    app.api.getWeekRank(0).then(res => {
      self.setData({
        isLoadWeekRank: true,
        weekrank_page_num: res.data.data.page_num,
        weekRank: res.data.data.data
      });
    });
  },

  /* 点击切换推荐页 */
  menuClick(e) {
    let self = this;
    let menuType = Number(e.currentTarget.dataset.num);
    self.setData({
      menuType: menuType
    });
    if (menuType == 2 && !self.data.isLoadWeekRank) {
      self.getWeekRank();
    }
  },

  /* 搜索获取焦点触发 */
  search() {
    wx.navigateTo({
      url: app.CONFIG.PAGE.SEARCH
    });
  }
})