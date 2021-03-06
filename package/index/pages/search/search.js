import WxParse from '../../../../wxapp/template/wxParse/wxParse.js';
import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: app.CONFIG.BGCOLOR,
    showSearchHistory: true,
    keyword: '',
    searchValue: '',
    searchPage: {},
    searchResultData: {},
    showNoSearchResult: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.getSearchPage();
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
    return Util.onShareAppMessage();
  },

  /* 获取搜索页面数据 */
  getSearchPage() {
    let self = this;
    app.api.getSearchPage().then(res => {
      self.setData({
        searchPage: res.data.data
      });
    });
  },

  /* 关键词搜索 */
  searchKeyword(e) {
    let self = this;
    let keyword = e.detail.value;
    self.setData({
      showSearchHistory: keyword ? false : true,
      keyword: keyword
    });
    if (keyword) {
      app.api.searchKeyword(keyword).then(res => {
        let searchResult = res.data.data;
        self.handleSearchResult(searchResult);
      });
    }
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
  },

  removeSearchHistory() {
    let self = this;
    app.api.removeSearchHistory().then(res => {
      self.getSearchPage()
    });
    wx.navigateTo({
      url: url,
      success: res => {
        app.api.addSearchHistory(keyword);
      }
    });
  },

  /* 删除搜索历史记录 */
  removeSearchHistory() {
    let self = this;
    Util.showModal({
      content: '确定清除搜索记录吗？',
      cancelText: '取消'
    }).then(() => {
      app.api.removeSearchHistory().then(res => {
        self.getSearchPage();
      });
    });
  },

  /* 进入搜索结果详情页 */
  goSearchDetail(e) {
    let self = this;
    let id = e.detail.sid;
    let mtype = e.detail.stype;
    self.addSearchHistory(Util.getModulePageUrl(mtype, id));
  },

  /* 查看更多 */
  searchMore(e) {
    let self = this;
    let keyword = self.data.keyword;
    let mtitle = e.detail.mtitle;
    let mtype = e.detail.stype;
    let searchData = JSON.stringify(self.allSearchResult[mtype]);
    wx.navigateTo({
      url: `${app.CONFIG.PAGE.SEARCHDETAILS}?keyword=${keyword}&mtitle=${mtitle}&mtype=${mtype}&searchData=${searchData}`
    });
  },

  /* 点击关键词 */
  keyboardClick(e) {
    let self = this;
    let keyword = e.currentTarget.dataset.stext;
    self.setData({
      searchValue: keyword,
      showSearchHistory: keyword ? false : true,
      keyword: keyword
    });
    app.api.searchKeyword(keyword).then(res => {
      let searchResult = res.data.data;
      self.handleSearchResult(searchResult);
    });
  },

  /* 处理搜索结果 */
  handleSearchResult(searchResult) {
    let self = this;
    let showNoSearchResult = true;
    self.allSearchResult = Object.assign({}, searchResult);
    for (let key in searchResult) {
      if (searchResult[key].length > 0) {
        showNoSearchResult = false;
      }
      searchResult[key] = searchResult[key].slice(0, 2);
    }
    self.setData({
      searchResultData: searchResult,
      showNoSearchResult: showNoSearchResult
    });
  }
})