import Http from '../../utils/http';
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    src1: '../../imgs/toolbars/add.png',
    num1:36,
    num2:1356,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  onLoad: function () {
    var that = this;
    Http.get('biz/goods/Goods/goods_list').then(
      (res) => {
        if (res.data.code == 0) {
          console.log(res.data)
          avatar: that.data.avatar
        } else {

        }
      }
    );
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  changeToGoodDetail:function(e){
  wx.navigateTo({
    url: '../spgl/shopdetail/shopdetail',
  })
  }
})