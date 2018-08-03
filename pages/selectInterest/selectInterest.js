import Util from '../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: app.CONFIG.BGCOLOR,
    role_id: '',
    tags: [],
    selectedTags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.setData({
      role_id: options.id
    });
    self.getTags();
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

  /* 获取标签列表 */
  getTags() {
    let self = this;
    let role_id = self.data.role_id;
    app.api.getTags(role_id).then(res => {
      self.setData({
        tags: res.data.data
      });
    });
  },

  /* 选择兴趣标签触发 */
  selectInterestLable(e) {
    let self = this;
    Util.handleTagsSelected(e, 'selectedTags', self);
    console.log('已选择兴趣标签: ', self.data.selectedTags);
  },

  /* 点击进入我的复旦 */
  goMyFudan(e) {
    let self = this;
    if (self.data.selectedTags.length == 0) {
      Util.showModal({
        content: '请选择你感兴趣的标签'
      });
      return;
    }
    app.api.setTags(self.data.selectedTags).then(res => {
      let url = app.CONFIG.PAGE.INDEX;
      let callback = () => {
        Util.getUserInfo();
      };
      Util.switchTabToOnload(url, callback);
    });
  }
})