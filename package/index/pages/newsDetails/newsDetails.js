import WxParse from '../../../../wxapp/template/wxParse/wxParse.js';
import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleType: app.ENUM.ModuleType.News,
    newsDetail: null,
    sold_out: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.getNewsDetail(options.id);
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
      let share_num = self.data.newsDetail.share_num + 1;
      self.setData({
        'newsDetail.share_num': share_num
      });
    };
    let shareId = self.data.newsDetail.id;
    let shareType = self.data.moduleType;
    return Util.onShareAppMessage({
      shareId: shareId,
      shareType: shareType,
      path: Util.getModulePageUrl('news', self.data.newsDetail.id)
    }, shareCallback);
  },

  /* 获取新闻详情 */
  getNewsDetail(id) {
    let self = this;
    app.api.getNewsDetail(id).then(res => {
      if (res.data.data.transcoding == 1) {
        res.data.data.content = Util.articleParse(res.data.data.content);
      } else {
        WxParse.wxParse('article', 'html', res.data.data.content, self, 30);
      }
      self.setData({
        newsDetail: res.data.data
      });
    }, res => {
      self.setData({
        sold_out: true
      });
    });
  },

  /* 打开添加评论窗口 */
  showCommentView(e) {
    let self = this;
    self.selectComponent('#newsComment').showCommentView();
  }
})