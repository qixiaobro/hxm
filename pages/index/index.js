//index.js
import Http from '../../utils/http';
//获取应用实例
const app = getApp()




Page({
  data: {
    src1: '../../imgs/list/store.png',
    src2: '../../imgs/list/saoma.png',
    src3: '../../imgs/list/erweima.png',
    src4: '../../imgs/list/maidan.png',
    src5: '../../imgs/list/jysj.png',
    sum:2990,
    num1: 81,
    num2: 81,
    num3: 81,
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ]
  },
  change1:function(e){
    this.setData({
      sum:2990,
      num1: 81,
      num2: 81,
      num3: 81,
    })
  },
  change2: function (e) {
    this.setData({
      sum: 3000,
      num1: 52,
      num2: 70,
      num3: 91,
    })
  },
  change3: function (e) {
    this.setData({
      sum: 8000,
      num1: 150,
      num2: 150,
      num3: 150,
    })
  },
  Click2: function () {
    wx.scanCode({
      success: (res) => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },
  /** 
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    // 获取用户授权及信息
    Http.authorize()
      .then(() => Http.getUserInfo())
      .then((res) => {
        console.log(res);
        //用户信息数据处理操作

        // if (!app.globalData.isReAuth) {
        //   that.setData({
        //     userInfo: res
        //   })
        //   try {
        //     var ssid = wx.getStorageSync('ssid')
        //     if (ssid) {
        //       if (!app.globalData.changeState) {
        //         that.getFavData(ssid);
        //       }
        //     }
        //   } catch (e) {
        //     console.log(e);
        //   }
        // }
      }).catch(() => {
        Http.getUserInfo().then((res) => {
          // that.setData({
          //   userInfo: res
          // })
          // try {
          //   var ssid = wx.getStorageSync('ssid')
          //   if (ssid) {
          //     that.getFavData(ssid);
          //   }
          // } catch (e) {
          //   console.log(e);
          // }
        })
      })
    //登录
    Http.login().then((res) => {
      // 获取到code之后的操作
      // 获取openid
      Http.get('api/wxapp/public/login', { code: res.code, app_type: 'WX_MM_MANAGE' }).then(
        (res) => {
          if (res.data.success && res.data.data.openid != '' && res.data.data.token != '') {
            wx.setStorageSync('openid', res.data.data.openid);
            wx.setStorageSync('token', res.data.data.token);
          } else {
            //获取openid失败操作
          }
        }
      );
    })
    var self = this
    //正常异步请求
    // Http.get('userinfo').then(function (res) {
    //   //返回数据处理
    // });
  } 
})  
