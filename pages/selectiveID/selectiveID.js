// pages/selectiveID/selectiveID.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idList: [],
    selectedID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    app.api.getRoles().then(res => {
      self.setData({
        idList: res.data.data
      });
    });
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

  /* 选择身份触发 */
  selectIdentity(e) {
    let self = this;
    let tid = e.detail.tid;
    self.setData({
      selectedID: tid
    });
    self.selectComponent(`#com_${tid}`).setHoverCss();
    self.data.idList.forEach(x => {
      if (x.id != tid) {
        self.selectComponent(`#com_${x.id}`).clearHoverCss();
      }
    });
  }
})