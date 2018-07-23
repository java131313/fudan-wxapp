import Util from '../../../utils/util.js';
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comments: Array,
    commentId: Number,
    commentType: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    writeReview: '',
    show_commentView: false
  },


  /**
   * 组件的方法列表
   */
  methods: {
    _commentSubmit(e) {
      let self = this;
      let commentId = self.data.commentId;
      let commentType = self.data.commentType;
      let content = e.detail.value.content;
      if (!content) {
        Util.showToast({
          title: '请填写评论内容',
          image: 2
        });
        return;
      }
      app.api.addComment(commentId, commentType, content).then(res => {
        Util.showToast({
          title: '评论成功'
        });
      }, res => {
        Util.showToast({
          title: '评论失败',
          image: 2
        });
      });
    },
    _startedReview() {
      let self = this;
      self.setData({
        show_commentView: true
      })
    },
    unselect(res) {
      let self = this;
      self.setData({
        show_commentView: false
      })
    },
    IdentifyingChoice(res) {
      let self = this;
      self.setData({
        show_commentView: false
      })
    }
  }
})