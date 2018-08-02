module.exports = {
  BGCOLOR: '#f5f5f5',
  SHARETITLE: '你所关心的复旦人，你想了解的复旦事',
  SCENES: {
    CHAT: [1007, 1008],
    QRCODE: [1011, 1012, 1013],
    ONECODE: [1025, 1031, 1032],
    WXAPPCODE: [1047, 1048, 1049]
  },
  HTTP: {
    API: '',
    IMAGESITE: ''
  },
  DEBUG: {
    STATUS: true,
    API: 'https://fd.gxdianpu.com',
    IMAGESITE: 'https://xinzhibang168-1253521270.costj.myqcloud.com',
  },
  MOCK: {
    STATUS: true
  },
  PAGE: {
    /* 开机页 */
    TRANSITIONAL: '/pages/transitional/transitional',
    /* 选择身份 */
    SELECTID: '/pages/selectiveID/selectiveID',
    /* 登录 */
    LOGIN: '/pages/loginym/loginym',
    /* 选择兴趣标签 */
    SELECTINTEREST: '/pages/selectInterest/selectInterest',
    /* 首页 */
    INDEX: '/pages/index/index',
    /* 首页(分包页) */
    SEARCH: '/package/index/pages/search/search',
    SEARCHDETAILS: '/package/index/pages/searchDetails/searchDetails',
    ACTIVEDETAILS: '/package/index/pages/activeDetails/activeDetails',
    NEWSDETAILS: '/package/index/pages/newsDetails/newsDetails',
    VOTEDETAILS: '/package/index/pages/voteDetails/voteDetails',
    RECRUITDETAILS: '/package/index/pages/recruitDetails/recruitDetails',
    RECRUITFORM: '/package/index/pages/recruitForm/recruitForm',
    CONTRIBUTEFORM: '/package/index/pages/contributeForm/contributeForm',
    VIDEODETAILS: '/package/index/pages/videoDetails/videoDetails',
    LIVEDETAILS: '/package/index/pages/liveDetails/liveDetails',
    /* 服务 */
    SERVICE: '/pages/service/service',
    /* 服务分包页 */
    COURSECALENDAR: '/package/service/pages/courseCalendar/courseCalendar',
    /* 我的 */
    PERSONAL: '/pages/personal/personal',
    /* 我的(分包页) */
    PEESONALDETAILS: '/package/personal/pages/personalDetails/personalDetails',
    SELFTAGS: '/package/personal/pages/interestTags/interestTags',
    SELFVOTE: '/package/personal/pages/personalVote/personalVote',
    SELFACTIVE: '/package/personal/pages/personalActive/personalActive',
    SELFCOMMENT: '/package/personal/pages/personalComment/personalComment',
    SELFCONTRIBUTE: '/package/personal/pages/personalContribute/personalContribute',
    SELFNAMECHANGE: '/package/personal/pages/personalNameChange/personalNameChange'
  },
  PERSONAL: {
    ACTION_BAR_ITEM: [{
        actionNaviTo: '/package/personal/pages/personalActive/personalActive',
        actionIconUrl: '/images/person_active_icon.png',
        actionText: '我的活动'
      },
      {
        actionNaviTo: '/package/personal/pages/personalVote/personalVote',
        actionIconUrl: '/images/person_vote_icon.png',
        actionText: '我的投票'
      },
      {
        actionNaviTo: '/package/personal/pages/personalComment/personalComment',
        actionIconUrl: '/images/person_comment_icon.png',
        actionText: '我的评论'
      },
      {
        actionNaviTo: '/package/personal/pages/personalContribute/personalContribute',
        actionIconUrl: '/images/person_contribute_icon.png',
        actionText: '我的投稿'
      },
      {
        actionNaviTo: '/package/personal/pages/interestTags/interestTags',
        actionIconUrl: '/images/person_tags_icon.png',
        actionText: '兴趣标签'
      }
    ]
  },
  SCHOOL_SERVICE: {
    SCHOOL_ITEM: [{
        schoolNaviTo: "/package/service/pages/courseCalendar/courseCalendar",
        schoolUrl: '/images/kt1.png',
        schoolText: '课程搜索',
        isOpen: true,
      },
      {
        schoolNaviTo: "",
        schoolUrl: '/images/kt2.png',
        schoolText: '场馆预定',
        isOpen: false
      }
    ]
  },
  BGSTYLE: {
    RED: {
      color: '#d33a3a',
      bellImage: '/images/bell.png',
      personImage: '/images/person_top_bg.png'
    },
    BLUE: {
      color: '#303a73',
      bellImage: '/images/bell-blue.png',
      personImage: '/images/person_top_bg-blue.png'
    },
    GRAY: {
      color: '#363636',
      bellImage: '/images/bell-gray.png',
      personImage: '/images/person_top_bg-ray.png'
    }
  }
}