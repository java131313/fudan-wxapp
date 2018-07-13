const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    option_num: Number,
    option_id: Number,
    option_img: String,
    option_content: String,
    option_percent: Number,
    option_isVote: {
      type: Boolean,
      value: false
    },
    showVote: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showProgress: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _vote(e) {
      let self = this;
      let id = e.currentTarget.dataset.vid;
      app.api.vote(id).then(res => {
        self.triggerEvent('vote');
      });
    },
    showProgressBar() {
      let self = this;
      self.setData({
        showProgress: true
      });
    },
    hideVote() {
      let self = this;
      self.setData({
        showVote: false
      });
    }
  }
})