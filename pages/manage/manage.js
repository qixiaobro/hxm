// pages/manage/manage.js
import Http from '../../utils/http';
var app = getApp();
Page({
  data: {
    avatar: '',         //头像
    seller_name:'',     //店铺名称
    brief:'',           //简介
    img1: '../../imgs/toolbars/spgl.png',          //icon
    img2: '../../imgs/toolbars/xsgl.png',
    img3: '../../imgs/toolbars/khgl.png',
    img4: '../../imgs/toolbars/lunbo.png',
    num1: 20,
    num2: 20,
    num3: 20
  }, 
  onPullDownRefresh: function () {            //刷新店铺信息
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    Http.get('biz/seller/Seller/currentSeller').then(  //获取店铺信息
      (res) => {
        if (res.data.code == 0) {   //获取店铺状态信息 并赋值
          that.setData({         //获取原店铺信息
            avatar: res.data.data[0].avatar,
            seller_name: res.data.data[0].seller_name,
            brief: res.data.data[0].brief,
          });
          wx.hideNavigationBarLoading(); //完成停止加载
          wx.stopPullDownRefresh(); //停止下拉刷新
        } else {
        }
      }
    )
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    Http.get('biz/seller/Seller/currentSeller').then(  //获取店铺信息
      (res) => {
        if (res.data.code == 0) {   //获取店铺状态信息 并赋值
          that.setData({         //获取原店铺信息
            avatar: res.data.data[0].avatar,
            seller_name: res.data.data[0].seller_name,
            brief: res.data.data[0].brief,
          });
        } else {
        }
      }
    )
  },
  set: function (e) {
    wx.navigateTo({
      url: '../manage/edit',
    })
  }

})