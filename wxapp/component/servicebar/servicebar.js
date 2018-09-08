import Util from '../../../utils/util.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    schoolNaviTo: String,
    schoolUrl: String,
    schoolText: String,
    isOpen: {
      type: Boolean,
      value: true
    },
    isSwitch: {
      type: Boolean,
      value: false
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
    _serviceNavi(e) {
      let self = this;
      if (!self.data.isOpen) {
        Util.showToast({
          title: '暂未开放此服务',
          image: 3
        });
      } else {
        if (self.data.isSwitch) {
          wx.switchTab({
            url: self.data.schoolNaviTo
          });
          return;
        }
        wx.navigateTo({
          url: self.data.schoolNaviTo
        });
      }
    }
  }
})