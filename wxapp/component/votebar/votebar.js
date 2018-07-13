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
    progress_show:{
      type:Boolean,
      value:false
    },
    option_isVote: {
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
    _vote(e) {
      let id = e.currentTarget.dataset.vid;
      let self = this;
      // app.api.voteClick(id).then(res => {
      // console.log(this)
      this.setData({
        option_isVote: true,
        progress_show:true
      })
      // });

    }
  }
})