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
    sum: 2990,
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
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    that.onLoad()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
  change1: function (e) {
    this.setData({
      sum: 2990,
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

    Http.login().then((res) => {
      // 获取到code之后的操作
      // 获取openid
      Http.get('api/wxapp/public/login', { code: res.code, app_type: 'WX_MM_MANAGE' }).then(
        (res) => {
          console.log(res.data);
          if (res.data.code == 0 && res.data.data.openid != '' && res.data.data.token != '') {
            wx.setStorageSync('openid', res.data.data.openid);
            wx.setStorageSync('Token', res.data.data.token);
            Http.get('biz/seller/Seller/currentSeller').then(  //获取店铺信息
              (res) => {
                if (res.data.code == 0) {   //如果可以获取，则代表用户已创建店铺
                  console.log(res.data.data)
                } else {                   //否则 提示用户需不需要创建店铺
                  wx.showModal({
                    title: '创建店铺',
                    content: '想要创建一个属于自己的店铺吗？',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.navigateTo({
                          url: '../index/createstore',
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            );
          } else {
            //获取openid失败操作
          }
        }
      );
    })
  }
})  
