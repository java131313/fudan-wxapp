const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    support_num: Number,
    comment_num: Number,
    share_num: Number,
    has_supported: Number,
    supportType: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _moduleSupport(e) {
      let self = this;
      console.log(self.data);
      let support_num = self.data.support_num + 1;
      self.setData({
        has_supported: 1,
        support_num: support_num
      });
    }
  }
})