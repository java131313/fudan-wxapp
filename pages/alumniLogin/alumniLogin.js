import Util from '../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgStyle: {},
    searchDate: '请选择毕业时间',
    collegeList: [],
    collegeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.getCollegeList();
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
      bgStyle: app.globalData.sysConfig.bgStyle
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
    return Util.onShareAppMessage();
  },

  /* 获取学院列表 */
  getCollegeList() {
    let self = this;
    app.api.getCollegeList().then(res => {
      let collegeList = res.data.data.map(x => x.name);
      collegeList.unshift('请选择毕业学院');
      self.setData({
        collegeList: collegeList
      });
    });
  },

  /* 选择日期触发 */
  bindDateChange(e) {
    let self = this;
    self.setData({
      searchDate: e.detail.value
    });
  },

  /* 选择学院触发 */
  bindDateCollegeChange(e) {
    let self = this;
    self.setData({
      collegeIndex: e.detail.value
    });
  },

  /* 校友登录表单提交 */
  alumniLogin(e) {
    let self = this;
    let graduate_year = e.detail.value.graduate_year;
    let graduate_college = self.data.collegeList[Number(e.detail.value.graduate_college)];
    if (!graduate_year) {
      Util.showToast({
        title: self.data.searchDate,
        image: 3
      });
      return;
    }
    if (graduate_college == 0) {
      Util.showToast({
        title: self.data.collegeList[self.data.collegeIndex],
        image: 3
      });
      return;
    }
    app.api.setGraduateInfo(graduate_year, graduate_college).then(res => {
      let selecedID = app.ENUM.Identity.Alumnus;
      wx.navigateTo({
        url: `${app.CONFIG.PAGE.SELECTINTEREST}?id=${selecedID}`
      });
    });
  }
})