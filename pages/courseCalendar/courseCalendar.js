import Util from '../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchDate: '',
    course: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.setData({
      searchDate: Util.formatDateWithWeek(new Date())
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

  /* 选择日期触发 */
  bindDateChange(e) {
    let self = this;
    let date = Util.formatDateWithWeek(e.detail.value);
    self.setData({
      searchDate: date
    });
  },

  /* 课程搜索 */
  searchCourse(e) {
    let self = this;
    let cdate = e.detail.value.cdate.substring(0, 10);
    let cname = e.detail.value.cname;
    if (!cname) {
      Util.showToast({
        title: '请输入课程名称',
        image: 2
      });
      return;
    }
    app.api.searchCourse(cdate, cname).then(res => {
      if (!res.data.data || res.data.data.length == 0) {
        Util.showToast({
          title: '未搜索到该课程',
          image: 3
        });
        self.setData({
          course: []
        });
      } else {
        self.handleCourseData(res.data.data);
      }
    });
  },

  /* 处理课程数据 */
  handleCourseData(course) {
    if (!course) return;
    let self = this;
    let courseArray = [];
    for (let room in course) {
      for (let name in course[room]) {
        for (let date in course[room][name]) {
          let couserData = {
            courseRoom: room,
            courseName: name,
            courseDate: date,
            courseTime: course[room][name][date]
          };
          courseArray.push(couserData);
        }
      }
    }
    self.setData({
      course: courseArray
    });
  }
})