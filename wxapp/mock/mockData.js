import Mock from 'mock.js';
const analogData = require('analogData.js');

class MockData {
  constructor() {
    let self = this;
  }

  /* 模拟评论列表数据 */
  getCommentList() {
    let self = this;
    let data = Mock.mock({
      'list|10-100': [{
        'id|+1': 1,
        'comments|1': analogData.comments
      }]
    });
    console.log('模拟评论列表数据', data);
    return self.mockApi(data, 2000);
  }

  /* 模拟新闻封面列表数据 */
  getNewsList() {
    let self = this;
    let data = Mock.mock({
      'news|5-15': [{
        'id|+1': 1,
        'title|1': analogData.newsTitle,
        'source|1': analogData.source,
        'createtime|1': analogData.createtime,
        'activetime|1': analogData.activetime
      }]
    });
    console.log('模拟新闻封面列表数据', data);
    return self.mockApi(data, 2000);
  }

  /* 模拟API真实请求 */
  mockApi(data, delayTime, code, msg) {
    let result = {
      data: {
        code: code || 200,
        msg: msg || '请求成功!',
        data: data || {}
      },
      errMsg: 'request:ok',
      header: {
        'Content-Type': 'text/html; charset=utf-8',
        'Date': new Date()
      },
      statusCode: 200
    };
    switch (result.data.code) {
      case 200:
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(result);
          }, delayTime || 1000);
        });
        break;
      case 500:
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            Object.assign(result.data, {
              msg: '请求失败！',
              data: null
            });
            reject(result);
          }, delayTime || 1000);
        });
        break;
      default:
        return new Promise((resolve, reject) => {
          reject('未识别的code！');
        });
    }
  }
}

module.exports = {
  MockData: MockData
}