const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentType: app.ENUM.ModuleType.Recruit,
    recruitDetail: {},
    recruitFormUrl: app.CONFIG.PAGE.RECRUITFORM
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.getRecruitDetail(1);
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

  /* 获取招聘详情 */
  getRecruitDetail(id) {
    let self = this;
    app.api.getRecruitDetail(id).then(res => {
      self.setData({
        recruitDetail: res.data.data
      });
    });
  },

  /* 岗位申请 */
  recruitApply() {
    if (!Util.checkIsHasPermission()) return;
    let self = this;
    wx.navigateTo({
      url: `${self.data.recruitFormUrl}?id=${self.data.recruitDetail.id}&title=${self.data.recruitDetail.title}`
    });
  }
})