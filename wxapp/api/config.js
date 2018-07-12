module.exports = {
  BGCOLOR: '#f5f5f5',
  SCENES: {
    CHAT: [1007, 1008],
    QRCODE: [1011, 1012, 1013],
    ONECODE: [1025, 1031, 1032],
    WXAPPCODE: [1047, 1048, 1049]
  },
  HTTP: {
    API: 'formal',
  },
  DEBUG: {
    STATUS: true,
    API: 'https://fd.gxdianpu.com',
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
    ACTIVEDETAILS: '/package/index/pages/activeDetails/activeDetails',
    NEWSDETAILS: '/package/index/pages/newsDetails/newsDetails',
    VOTEDETAILS: '/package/index/pages/voteDetails/voteDetails',
    RECRUITDETAILS: '/package/index/pages/recruitDetails/recruitDetails',
    /* 服务 */
    SERVICE: '/pages/service/service',
    /* 我的 */
    PERSONAL: '/pages/personal/personal',
    /* 我的(分包页) */
    PEESONALDETAILS: '/package/personal/pages/personalDetails/personalDetails',
    SELFTAGS: '/package/personal/pages/interestTags/interestTags',
    SELFVOTE: '/package/personal/pages/personalVote/personalVote',
    SELFACTIVE: '/package/personal/pages/personalActive/personalActive',
    SELFComment: '/package/personal/pages/personalComment/personalComment',
    SELFContribute: '/package/personal/pages/personalContribute/personalContribute',
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
        schoolNaviTo: "pages/index/index",
        schoolUrl: '/images/kt1.png',
        schoolText: '课程日历'
      },
      {
        schoolNaviTo: "/package/index/pages/recruitDetails/recruitDetails",
        schoolUrl: '/images/kt2.png',
        schoolText: '场馆预定'
      },
      {
        schoolNaviTo: "pages/index/index",
        schoolUrl: '/images/kt3.png',
        schoolText: '空课室查询'
      }
    ]
  }
}