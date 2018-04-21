// pages/shouhuo/shouhuo.js
/*Page({
  data: {
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部',
    checked:true
 
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})*/
var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Switch, {
  data: {
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部',
    checked: false
  },

  onLoad() {
  },

  onShow() {
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  handleZanSwitchChange(e) {
    this.setData({
      checked: e.checked
    });
  }
}));
