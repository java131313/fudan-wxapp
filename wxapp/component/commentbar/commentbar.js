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
    show_commentView: false,
    support_num: 0
  },


  /**
   * 组件的方法列表
   */
  methods: {
    _commentSupport(e) {
      let self = this;
      let comments = self.data.comments;
      let commentId = e.target.dataset.commentid;
      let supportType = app.ENUM.ModuleType.Comment;
      app.api.addSupportNum(commentId, supportType).then(res => {
        try {
          comments.forEach(x => {
            if (x.id == commentId) {
              x.support_num++;
              x.has_supported = 1;
              throw `${x.id}终止循环`
            }
          });
        } catch (e) {
          console.warn(e);
        }
        self.setData({
          comments: comments
        });
      });
    },
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
        self.setData({
          show_commentView: false
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
      });
    },
    _commentCancel(res) {
      let self = this;
      self.setData({
        show_commentView: false
      });
    },
    showCommentView() {
      let self = this;
      self.setData({
        show_commentView: true
      });
    }
  }
})