module.exports = {
  BGCOLOR: '#f5f5f5',
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
    /* 首页 */
    INDEX: '/pages/index/index',
    /* 服务 */
    SERVICE: '/pages/service/service',
    /* 我的 */
    PERSONAL: '/pages/personal/personal',
    /* 我的(分包页) */
    LOGIN: '/package/personal/pages/loginym/loginym',
    PEESONALDETAILS: '/package/personal/pages/personalDetails/personalDetails',
    SELECTINTEREST: '/package/personal/pages/selectInterest/selectInterest',
    SELECTID: '/package/personal/pages/selectiveID/selectiveID',
    SELFTAGS: '/package/personal/pages/interestTags/interestTags',
    SELFVOTE: '/package/personal/pages/personalVote/personalVote'
  },
  PERSONAL: {
    ACTION_BAR_ITEM: [{
        actionNaviTo: '/pages/index/index',
        actionIconUrl: '/images/person_active_icon.png',
        actionText: '我的活动'
      },
      {
        actionNaviTo: '/package/personal/pages/personalVote/personalVote',
        actionIconUrl: '/images/person_vote_icon.png',
        actionText: '我的投票'
      },
      {
        actionNaviTo: '/pages/index/index',
        actionIconUrl: '/images/person_comment_icon.png',
        actionText: '我的评论'
      },
      {
        actionNaviTo: '/pages/index/index',
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
        schoolNaviTo: "pages/index/index",
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