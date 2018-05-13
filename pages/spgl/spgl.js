import Http from '../../utils/http';
var app = getApp()
Page({
  data: {
    src1: '../../imgs/toolbars/add.png',
    num1:36,
    num2:1356,
    currentTab: 0,
    list1:[]
  },
  onLoad: function () {
    var that = this;
    Http.get('biz/goods/Goods/goods_list').then(
      (res) => {
        if (res.data.code == 0) {
            console.log(res.data);
            that.setData({
              list1:res.data.data
            })
        } else {
        }
      }
    );
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
  },
  addgoods:function(e){
    wx.navigateTo({
      url: '../spgl/addgoods/addgoods',
    })
  }
})