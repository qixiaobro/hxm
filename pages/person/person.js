var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Switch, {
  data: {
    checked: false,
    areaIndex: 0,
    area: ['男', '女']
  },
  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },
  onLoad() {
  },

  onShow() {
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '15880275889' //仅为示例，并非真实的电话号码
    })
  },
  handleZanSwitchChange(e) {
    this.setData({
      checked: e.checked
    });
  }
}));