import WxParse from '../../../../wxapp/template/wxParse/wxParse.js';
import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mtitle: '',
    searchData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    let keyword = options.keyword;
    let mtype = options.mtype;
    let mtitle = options.mtitle;
    let searchData = JSON.parse(options.searchData);
    self.getSearchData(keyword, mtype, mtitle, searchData);
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

  /* 获取搜索所有数据 */
  getSearchData(keyword, mtype, mtitle, searchData) {
    let self = this;
    self.setData({
      keyword: keyword,
      mtype: mtype,
      mtitle: mtitle,
      searchData: searchData
    });
  },

  /* 进入搜索结果详情页 */
  goSearchDetail(e) {
    let self = this;
    let id = e.detail.sid;
    let mtype = e.detail.stype;
    self.addSearchHistory(Util.getModulePageUrl(mtype, id));
  },

  /* 添加搜索历史关键词并跳转 */
  addSearchHistory(url) {
    let self = this;
    let keyword = self.data.keyword;
    wx.navigateTo({
      url: url,
      success: res => {
        app.api.addSearchHistory(keyword);
      }
    });
  }
})