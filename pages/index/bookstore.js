// 工具方法
const util = require('../../utils/utils.js');
const {
  fetch, 
  processCatelogTitle, 
  getUserAuth, 
  getJsCode, 
  getOpenid,
  getUserInfo,
  showToast,
  showLoading
} = util;

const app = getApp();

Page({

  data: {
    bookList: [],                   // 收藏的小说列表
    showToast: false,               // 是否显示toast
    toastContent: '您已删除所有小说',  // toast文案
    isEditor: false,                // 小说是否可编辑（小说项组件只有在收藏这里可以编辑）
    total: 0,                       // 收藏总数
    userInfo: null,                 // 用户信息
    openid: '',                     // 用户openid
    page: 1,                        // 请求分页，默认为1
    allowPullLoad: true             // 是否允许上拉加载（编辑模式下为false，默认为true）
  },

  onLoad (options) {
    let that = this;
    let appid = app.globalData.appid;
    let page = this.data.page;

    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 获取用户基本信息
          that._getAndRenderUserInfo();
          // 获取用户openid
          getJsCode()
            .then((jscode) => getOpenid(app.globalData.baseUrl, jscode))
            .then((openid) => {
              that._getUserBookList(openid, page);
              that.setData({
                openid: openid
              })
            });
        } else {
          // 重新获取授权
          getUserAuth()
            .then(() => getJsCode())
            .then((jscode) => getOpenid(app.globalData.baseUrl, jscode))
            .then((openid) => {
              that._getUserBookList(openid, page);
              that.setData({
                openid: openid
              })
            })
            .then(() => that._getAndRenderUserInfo())
            .catch((msg) => showToast({
              showToast: true,
              toastContent: '您拒绝了我们的授权请求，得十分钟之后才能重新授权'
            }, that))
        }
      }
    });
  }
})