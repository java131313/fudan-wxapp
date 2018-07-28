Component({
  /**
   * 组件的属性列表
   */
  properties: {
    search_module: String,
    search_type: String,
    search_content: Object
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
    _goSearchDetail(e) {
      let self = this;
      let sid = e.currentTarget.dataset.sid;
      let stype = e.currentTarget.dataset.stype;
      self.triggerEvent('goSearchDetail', {
        sid: sid,
        stype: stype
      });
    }
  }
})