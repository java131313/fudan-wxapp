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
    INDEX: '/pages/index/index',
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