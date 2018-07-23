import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentType: app.ENUM.CommentType.Activity,
    activityId: '',
    activityDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.setData({
      activityId: options.id
    });
    self.getActivityDetail();
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

  /* 获取活动详情 */
  getActivityDetail() {
    let self = this;
    if (!self.data.activityId) return;
    app.api.getActivityDetail(self.data.activityId).then(res => {
      self.setData({
        activityDetail: res.data.data
      });
    });
  },

  /* 活动报名 */
  activeRegister(e) {
    let self = this;
    if (!Util.checkIsHasPermission()) return;
    app.api.activityApply(self.data.activityId).then(res => {
      Util.showToast({
        title: '活动报名成功'
      });
    }, res => {
      Util.showToast({
        title: res.data.msg,
        image: 3
      });
    });
  }
})