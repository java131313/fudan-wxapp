import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleType: app.ENUM.ModuleType.Recruit,
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
    let self = this;
    let shareCallback = () => {
      let share_num = self.data.recruitDetail.share_num + 1;
      self.setData({
        'recruitDetail.share_num': share_num
      });
    };
    let shareId = self.data.recruitDetail.id;
    let shareType = self.data.moduleType;
    return Util.onShareAppMessage({
      shareId: shareId,
      shareType: shareType
    }, shareCallback);
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
    let self = this;
    wx.navigateTo({
      url: `${self.data.recruitFormUrl}?id=${self.data.recruitDetail.id}&title=${self.data.recruitDetail.title}`
    });
  },

  /* 打开添加评论窗口 */
  showCommentView(e) {
    let self = this;
    self.selectComponent('#recruitComment').showCommentView();
  }
})