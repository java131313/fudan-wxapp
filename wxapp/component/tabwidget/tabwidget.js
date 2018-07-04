// wxapp/component/tabwidget/tabwidget.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hoverClass: String,
    tagText: String,
    dataTid: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showHoverClass: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _selectTag(e) {
      let self = this;
      let tid = e.currentTarget.dataset.tid;
      self.setData({
        showHoverClass: !self.data.showHoverClass
      });
      self.triggerEvent('selectTag', {
        tid: tid,
        isSelect: self.data.showHoverClass
      });
    },
    setHoverCss() {
      let self = this;
      self.setData({
        showHoverClass: true
      });
    },
    clearHoverCss() {
      let self = this;
      self.setData({
        showHoverClass: false
      });
    }
  }
})