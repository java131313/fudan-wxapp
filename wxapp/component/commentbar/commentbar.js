Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comments: Array

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
    StartedReview() {
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