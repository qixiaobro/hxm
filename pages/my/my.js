// pages/my/my.js
import Http from '../../utils/http';
var app = getApp();

Page({
  data: {
    src1: '../../imgs/toolbars/adress.png',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    status:'',
    value:''  //chencked的值
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '15880275889' //仅为示例，并非真实的电话号码
    })
  },
  switch1Change: function (e) {//开关商店 默认为开
    var s = e.detail.value;
    if(s==true){
      this.setData({         //开关打开表示店铺开启
        status:1
      })
    }else{
      this.setData({         //开关关闭表示店铺开启
        status: 0
      })
    }
    var that = this;
    Http.post('/biz/seller/Seller/close2Seller', {
      status: that.data.status //传递stauts
    }).then(
      (res) => {
        if (res.data.code == 0) {
        } else {
        }
      }
      );
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this;
    Http.get('biz/seller/Seller/currentSeller').then(  //获取店铺信息
      (res) => {
        if (res.data.code == 0 ) {   //获取店铺状态信息 并赋值
             if (res.data.data[0].status==1) {
               that.setData({         //开关打开表示店铺开启
                 value: true
               })
             } else {
               that.setData({         //开关关闭表示店铺开启
                 value:false
               })
             }
        } else {                   
        }
      }
    )
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})