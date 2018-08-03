import Util from '../../../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleType: app.ENUM.ModuleType.Vote,
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
    let self = this;
    let shareCallback = () => {
      let share_num = self.data.voteDetail.share_num + 1;
      self.setData({
        'voteDetail.share_num': share_num
      });
    };
    let shareId = self.data.voteDetail.id;
    let shareType = self.data.moduleType;
    return Util.onShareAppMessage({
      shareId: shareId,
      shareType: shareType,
      path: Util.getModulePageUrl('vote', self.data.voteDetail.id)
    }, shareCallback);
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
    }, res => {
      Util.handleNoPermission(res.data.msg);
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
  },

  /* 打开添加评论窗口 */
  showCommentView(e) {
    let self = this;
    self.selectComponent('#voteComment').showCommentView();
  }
})