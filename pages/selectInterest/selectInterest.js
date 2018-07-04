import {
  Util
} from '../../utils/util.js';
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: [],
    selectedTags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
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

  getTags() {
    let self = this;
    app.api.getTags().then(res => {
      self.setData({
        tags: res.data.data
      });
    });
  },


  /* 选择兴趣标签触发 */
  selectInterestLable(e) {
    let self = this;
    let tid = e.detail.tid;
    let isSelect = e.detail.isSelect;
    self.handleTagsSelected(tid, isSelect);
  },

  /* 处理选择的兴趣标签 */
  handleTagsSelected(tid, isSelect) {
    let self = this;
    let selectedTags = self.data.selectedTags;
    if (isSelect) {
      if (!Util.arrayIsContain(selectedTags, tid)) {
        selectedTags.push(tid);
      }
    } else {
      if (Util.arrayIsContain(self.data.selectedTags, tid) && selectedTags.length > 0) {
        let res = [];
        for (let i = 0; i < selectedTags.length; i++) {
          if (selectedTags[i] != tid) {
            res.push(selectedTags[i]);
            self.setData({
              selectedTags: res
            });
          }
        }
      }
    }
  },

  /* 点击进入我的复旦 */
  goMyFudan(e) {
    let self = this;
    app.api.setTags(self.data.selectedTags).then(res => {
      Util.switchTabToOnload(app.CONFIG.PAGE.INDEX);
    });
  }
})