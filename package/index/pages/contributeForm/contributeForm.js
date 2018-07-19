import WxParse from '../../../../wxapp/template/wxParse/wxParse.js';
import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contributionId: '',
    contributionDetail: {},
    tempFilePaths: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.setData({
      contributionId: options.id
    });
    self.initValidateRules();
    self.getContributionDetail();
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
      tel: {
        required: true,
        tel: true
      },
      email: {
        required: true,
        email: true
      },
      name: {
        required: true
      }
    }, {
      tel: {
        required: '请填写手机号'
      },
      email: {
        required: '请填写邮箱'
      },
      name: {
        required: '请填写征稿内容'
      }
    });
  },

  /* 获取征稿详情 */
  getContributionDetail() {
    let self = this;
    if (!self.data.contributionId) return;
    app.api.getContributionDetail(self.data.contributionId).then(res => {
      if (res.data.data.dynamic_kv) {
        res.data.data.dynamic_kv = JSON.parse(res.data.data.dynamic_kv);
      }
      self.setData({
        contributionDetail: res.data.data
      });
      WxParse.wxParse('article', 'html', res.data.data.content, self, 30);
    });
  },

  /* 上传图片 */
  uploadPictures(e) {
    let self = this;
    wx.chooseImage({
      count: 9, //最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        let tempFilePaths = res.tempFilePaths;
        self.setData({
          tempFilePaths: res.tempFilePaths
        });
      }
    });
  },

  /* 提交征稿 */
  contribute(e) {
    // if (!Util.checkIsHasPermission()) return;
    let self = this;
    if (!self.wxValidate.checkForm(e)) {
      const error = self.wxValidate.errorList[0];
      Util.showToast({
        title: error.msg,
        image: 2
      });
    } else {
      wx.showLoading({
        title: '正在提交中'
      });
      let formData = e.detail.value;
      let tempFilePaths = self.data.tempFilePaths;
      app.api.uploadImages(tempFilePaths, 'contri').then(res => {
        let dynamic_kv = self.data.contributionDetail.dynamic_kv;
        Object.assign(formData, {
          id: self.data.contributionId,
          imgs: res
        });
        app.api.contribute(formData, dynamic_kv).then(res => {
          wx.hideLoading();
          Util.showToast({
            title: '提交征稿成功'
          });
        }, res => {
          wx.hideLoading();
          Util.showToast({
            title: res.data.msg || '提交征稿失败',
            image: 3
          });
        });
      }, res => {
        wx.hideLoading();
        Util.showToast({
          title: '提交征稿失败',
          image: 2
        });
      });
    }
  }
})