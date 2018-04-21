var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Switch, {
  data: {
    checked: false,
  },

  onLoad() {
  },

  onShow() {
  },
  shouhuo1: function(e){
    wx.redirectTo({
      url: '../index/index'
    })
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '15880275889' //仅为示例，并非真实的电话号码
    })
  },
  bangding:function(e){
     wx.navigateTo({
       url: '../index2/bangding',
     })
  },
  person:function(e){
      wx.navigateTo({
        url: '../index2/person',
      })
  },
  handleZanSwitchChange(e) {
    this.setData({
      checked: e.checked
    });
  }
}));