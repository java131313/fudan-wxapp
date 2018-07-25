import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: app.CONFIG.BGCOLOR
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.initValidateRules();
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

  /* 加载表单验证规则 */
  initValidateRules() {
    let self = this;
    self.wxValidate = app.wxValidate({
      nickname: {
        required: true,
        maxlength: 10
      }
    }, {
      nickname: {
        required: '请输入昵称'
      }
    });
  },

  /* 修改昵称 */
  submitName(e) {
    let self = this;
    if (!self.wxValidate.checkForm(e)) {
      const error = self.wxValidate.errorList[0];
      Util.showToast({
        title: error.msg,
        image: 2
      });
    } else {
      let nickname = e.detail.value.nickname;
      app.api.setUserInfo({
        nickname: nickname
      }).then(res => {
        app.globalData.userInfo.nickname = nickname;
        wx.navigateBack();
      });
    }
  }
})