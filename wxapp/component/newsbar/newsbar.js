Component({
  /**
   * 组件的属性列表
   */
  properties: {
    news_pic: String,
    news_title: String,
    synopsis_time: String,
    synopsis_source: String,
    activity_time: String,
    activity_site: String,
    news_type: Number,
    news_url: String,
    recruit_target: String,
    recruit_require: String,
    vote_options: Object,
    is_top:Number,
    bgStyle: Object,
    addComment:Number,
    addSupportNum:Number
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
    onShareAppMessage:function(res){
      if(res.from == 'button'){
        return false;
      }
      return {
        title:"自定义转发标题",
        path:"pages/index/index"
      }
    },
    // 评论功能
    comment_function:function(res){},
    // 点赞功能
    thumb_up_function:function(res){}
  }
})