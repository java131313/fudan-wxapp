Component({
  /**
   * 组件的属性列表
   */
  properties: {
    search_module: String,
    search_type: String,
    search_content: Object,
    show_loadmore: {
      type: Boolean,
      value: true
    }
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
      let stype = self.data.search_type;
      self.triggerEvent('goSearchDetail', {
        sid: sid,
        stype: stype
      });
    },
    _searchMore(e) {
      let self = this;
      let stype = self.data.search_type;
      let mtitle = self.data.search_module;
      self.triggerEvent('searchMore', {
        mtitle: mtitle,
        stype: stype
      });
    }
  }
})