// pages/manage/edit.js
var app = getApp();
var dianming = app.globalData.dianming;
var jianjie = app.globalData.jianjie;
Page({
  data: {
    dianming: dianming,
    jianjie: jianjie
  },
  edit1: function (e) {
    this.setData({
      dianming: e.detail.value
    })
    //app.globalData.dianming = dianming;
    console.log(dianming);
    //console.log(app.globalData.dianming);
  }
})

