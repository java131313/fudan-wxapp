const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: app.CONFIG.BGCOLOR,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let self = this;
    self.setData({
      userInfo: app.globalData.userInfo
    });
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

  /* 更改昵称 */
  personNameChange(e) {
    let self = this;
    wx.navigateTo({
      url: app.CONFIG.PAGE.SELFNAMECHANGE
    });
  },

  /* 更改身份 */
  personIdChange(e) {
    let self = this;
    wx.navigateTo({
      url: app.CONFIG.PAGE.SELECTID
    });
  },

  /* 更改头像 */
  personAvatarChange(e) {
    let self = this;
    wx.chooseImage({
      count: 1, //最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        let tempFilePaths = res.tempFilePaths;
        /* 先使用本地的头像图片 */
        self.setData({
          'userInfo.avatar': tempFilePaths[0]
        });
        app.api.uploadImages(tempFilePaths, 'avatar').then(res => {
          let avatarUrl = res.shift();
          app.api.setUserInfo({
            avatarUrl: avatarUrl
          }).then(res => {
            app.globalData.userInfo.avatar = avatarUrl;
            self.setData({
              userInfo: app.globalData.userInfo
            });
          });
        });
      }
    });
  }
})