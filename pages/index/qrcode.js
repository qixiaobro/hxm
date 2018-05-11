// pages/index/qrcode.js
import Http from '../../utils/http';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src1: '../../imgs/toolbars/logo.png',
    src2: '../../imgs/toolbars/share.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   /* wx.request({
      // 获取token
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
      data: {
        appid: 'wxfda6f88432e53965',
        secret: 'f03e35b12aaeb6ae0ec00aa56388df27'
      },
      success(res) {
        wx.request({
          // 调用接口C
          url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + res.data.access_token,
          method: 'POST',
          data: {
            "path": "pages/homepage/homepage",
            "width": 430
          },
          success(res) {
            // res是二进制流，后台获取后，直接保存为图片，然后将图片返回给前台
            // 后台二进制怎么转图片？我也不会后台，学会了再贴代码
          }
        })
      }
      
    })*/
 
    Http.get('biz/seller/Seller/getQrcode').then(
        (res) => {
          if (res.data.code == 0) {
            console.log(sucess)
          } else {

          }
        }
      );
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '胡虾卖',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
