// pages/manage/manage.js
var app = getApp();
Page({
  data: {
    src1: '../../imgs/toolbars/logo.png',
    img1: '../../imgs/toolbars/spgl.png',
    img2: '../../imgs/toolbars/xsgl.png',
    img3: '../../imgs/toolbars/khgl.png',
    dianming: app.globalData.dianming,
    jianjie: app.globalData.jianjie,
    num1: 20,
    num2: 20,
    num3: 20
  },
  set: function (e) {
    wx.navigateTo({
      url: '../manage/edit',
    })
  }

})