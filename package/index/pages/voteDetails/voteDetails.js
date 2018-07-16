import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteId: '',
    voteDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    if (options.id) {
      self.setData({
        voteId: options.id
      });
      self.getVoteDetail();
    }
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

  /* 获取投票详情 */
  getVoteDetail() {
    let self = this;
    let voteId = self.data.voteId;
    app.api.getVoteDetail(voteId).then(res => {
      self.setData({
        voteDetail: res.data.data
      });
      self.handleDefaultCss(self.data.voteDetail.voted);
    });
  },

  /* 点击投票触发->显示progress */
  vote(e) {
    let self = this;
    self.getVoteDetail();
  },

  /* 如果已经投票过，需要显示progress */
  handleDefaultCss(voted) {
    if (!voted) return;
    let self = this;
    let optionsIds = self.data.voteDetail.options.map(x => x.id);
    optionsIds.forEach(x => {
      self.selectComponent(`#vote_${x}`).showProgressBar();
      if (!Util.arrayIsContain(voted.split(','), x.toString())) {
        self.selectComponent(`#vote_${x}`).hideVote();
      }
    });
  }
})