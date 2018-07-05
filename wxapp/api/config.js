module.exports = {
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
  },
  PERSONAL: {
    ACTION_BAR_ITEM: [{
        actionNaviTo: '/pages/index/index',
        actionIconUrl: '/images/person_active_icon.png',
        actionText: '我的活动'
      },
      {
        actionNaviTo: '/pages/index/index',
        actionIconUrl: '/images/person_vote_icon.png',
        actionText: '我的投票'
      },
      {
        actionNaviTo: '/pages/index/index',
        actionIconUrl: '/images/person_comment_icon.png',
        actionText: '我的评论'
      }
    ]
  }
}