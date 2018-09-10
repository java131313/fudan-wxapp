import WxParse from '../../../../wxapp/template/wxParse/wxParse.js';
import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleType: app.ENUM.ModuleType.Video,
    videoDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.getVideoDetail(options.id);
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
      let share_num = self.data.videoDetail.share_num + 1;
      self.setData({
        'videoDetail.share_num': share_num
      });
    };
    let shareId = self.data.videoDetail.id;
    let shareType = self.data.moduleType;
    return Util.onShareAppMessage({
      shareId: shareId,
      shareType: shareType,
      path: Util.getModulePageUrl('video', self.data.videoDetail.id)
    }, shareCallback);
  },

  /* 获取视频详情 */
  getVideoDetail(id) {
    let self = this;
    app.api.getVideoDetail(id).then(res => {
      self.setData({
        videoDetail: res.data.data
      });
      WxParse.wxParse('intro', 'html', res.data.data.intro, self, 30);
    }, res => {
      Util.handleNoPermission(res.data.msg);
    });
  },

  /* 打开添加评论窗口 */
  showCommentView(e) {
    let self = this;
    self.selectComponent('#videoComment').showCommentView();
  }
})