import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitId: '',
    recruitTitle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.setData({
      recruitId: options.id,
      recruitTitle: options.title
    });
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
      name: {
        required: true,
        minlength: 2,
        maxlength: 10
      },
      contact: {
        required: true,
        tel: true
      }
    }, {
      name: {
        required: '请填写姓名'
      },
      contact: {
        required: '请填写联系方式'
      }
    });
  },

  /* 提交应聘申请 */
  recruitSubmit(e) {
    let self = this;
    if (!self.wxValidate.checkForm(e)) {
      const error = self.wxValidate.errorList[0];
      Util.showToast({
        title: error.msg,
        image: 2
      });
    } else {
      let formData = e.detail.value;
      Object.assign(formData, {
        id: self.data.recruitId
      });
      app.api.recruitApply(formData).then(res => {
        Util.showToast({
          title: '岗位申请成功'
        }).then(() => {
          wx.redirectTo({
            url: `${app.CONFIG.PAGE.RECRUITDETAILS}?id=${self.data.recruitId}`
          });
        });
      }, res => {
        Util.showToast({
          title: res.data.msg || '岗位申请失败',
          image: 2
        });
      });
    }
  },

  /* 点击取消 */
  recruitCacel(e) {
    wx.navigateBack();
  }
})