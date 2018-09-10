import WxParse from '../../../../wxapp/template/wxParse/wxParse.js';
import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleType: app.ENUM.ModuleType.Live,
    liveDetail: {},
    showChangeScreenBtn: false,
    isFullScreen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.getLiveDetail(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let self = this;
    self.playerctx = wx.createLivePlayerContext('player');
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
      let share_num = self.data.liveDetail.share_num + 1;
      self.setData({
        'liveDetail.share_num': share_num
      });
    };
    let shareId = self.data.liveDetail.id;
    let shareType = self.data.moduleType;
    return Util.onShareAppMessage({
      shareId: shareId,
      shareType: shareType,
      path: Util.getModulePageUrl('live', self.data.liveDetail.id)
    }, shareCallback);
  },

  /* 获取视频详情 */
  getLiveDetail(id) {
    let self = this;
    app.api.getLiveDetail(id).then(res => {
      self.setData({
        liveDetail: res.data.data
      });
      WxParse.wxParse('intro', 'html', res.data.data.intro, self, 30);
    }, res => {
      Util.handleNoPermission(res.data.msg);
    });
  },

  /* 打开添加评论窗口 */
  showCommentView(e) {
    let self = this;
    self.selectComponent('#liveComment').showCommentView();
  },

  /* 点击直播组件显示切换屏幕按钮 */
  showAction(e) {
    let self = this;
    self.setData({
      showChangeScreenBtn: !self.data.showChangeScreenBtn
    });
  },

  /* 切换屏幕显示 */
  changeScreen(e) {
    let self = this;
    if (self.data.isFullScreen) {
      self.playerctx.exitFullScreen({
        success: res => {
          self.setData({
            isFullScreen: false,
            showChangeScreenBtn: false
          });
          console.log('关闭全屏成功：', res);
        },
        fail: res => {
          console.warn('关闭全屏失败：', res);
        }
      });
    } else {
      self.playerctx.requestFullScreen({
        direction: -90,
        success: res => {
          self.setData({
            isFullScreen: true,
            showChangeScreenBtn: false
          });
          console.log('全屏播放成功：', res);
        },
        fail: res => {
          console.warn('全屏播放失败：', res);
        }
      });
    }
  }
})