const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: app.CONFIG.BGCOLOR,
    showSearchHistory: true,
    keyword: '',
    searchPage: {}
  },
  delete_record:function(res){
    let self = this;
    let notes = self.data.searchPage.history;
    wx.showModal({
      title: '提示',
      content: '确定清除搜索历史吗?',
      success: function (res) {
        if (res.confirm) {
         console.log(res);
          notes.splice(0,notes.length-1);
          self.setData({
            searchPage: notes
          })
        } else if (res.cancel) {
          
        }
      }

    })
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

      });
    }
  },

  /* 添加搜索历史关键词 */
  addSearchHistory() {
    let self = this;
    let keyword = self.data.keyword;
    app.api.addSearchHistory(keyword);
  }
})