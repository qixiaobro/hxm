// pages/manage/guke.js
import Http from '../../utils/http';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  // 上拉加载更多
  loadMore: function () {
    
  },
  getData: function () {
    var self = this;
    Http.get('biz/cust/Customer/customerList').then(
      (res) => {
        
        if (res.data.code == 0) {
          console.log(res.data);

        } else {
          //获取openid失败操作
        }
      }
    );

  },
})