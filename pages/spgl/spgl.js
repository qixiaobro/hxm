import Http from '../../utils/http';
var app = getApp()
Page({
  data: {
    src1: '../../imgs/toolbars/add.png',
    num1: 36,
    num2: 1356,
    currentTab: 0,
    list1: [],
    hasMore: true,
    hidden: false,
  },
  //加载商品信息
  onLoad: function () {
    var that = this;
    Http.get('biz/goods/Goods/goods_list').then(
      (res) => {
        if (res.data.code == 0) {
          that.setData({
            list1: res.data.data,
            hidden: true,
          })
        } else {
        }
      }
    );
  },
  //加载更多
  loadMore: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    if (!this.data.hasMore) return
    Http.get('biz/goods/Goods/goods_list').then(
      (res) => {
        if (res.data.code == 0) {
          that.setData({
            list1: res.data.data,
            hidden: true,
            hasMore: false,
          })
        } else {
        }
      }
    );
  },
  onPullDownRefresh: function () {            //刷新商品信息
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.onLoad();
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新

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
  changeToGoodDetail: function (e) {
    wx.navigateTo({
      url: '../spgl/shopdetail/shopdetail',
    })
  },
  addgoods: function (e) {
    wx.navigateTo({
      url: '../spgl/addgoods/addgoods',
    })
  }
})