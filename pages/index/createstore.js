// pages/index/createstore.js
import Http from '../../utils/http';
Page({
  data: {                                     //页面的初始数据
    avatar: '',                               //头像，用于页面显示
    province: '北京市',                       //省
    city: '北京市',                           //市
    district: '东城区',                       //县、区
    region: ['北京市', '北京市', '东城区'],    //地区选择组件默认值
    customItem: '全部',
    avatar2: '../../imgs/toolbars/addavatar.png',                          //头像上传后的返回值
  },
  changeAvatar: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          avatar2: tempFilePaths,            //将头像选取后赋给avatar2
        })
        that.uploadPhoto();                  //调用上传函数上传头像
      }
    })
  },
  uploadPhoto: function () {
    var that = this
    var para = para ? para : {};           //参数  带上openid和token
    para.token = wx.getStorageSync('openid');
    para.openid = wx.getStorageSync('Token');
    wx.uploadFile({
      url: 'https://v.huxiamai.com/api/asset/file/upload',
      filePath: that.data.avatar2,          //头像路径
      name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'XX-Device-Type': "wxapp",
        "XX-Token": wx.getStorageSync('Token')
      },
      formData: para,
      success: function (res) {
        // var obj = JSON.parse(res.data.data)         //不知道为什么返回的url是乱的，所以采用分割，将url重组
        var re = res.data.split(",");
        var result = re[2].split(":")[2] + ':' + re[2].split(":")[3];
        var dd = result.split('"')[1];
        var result = dd.split("\\");
        var avatar = result[0] + result[1] + result[2] + result[3] + result[4] + result[5];  //将url重组并赋值给avatar
        that.data.avatar = avatar

      }
    })

  },
  formSubmit: function (e) {
    var that = this;    //使用data中的数据
    Http.post('biz/seller/Seller/createSeller', {
      seller_name: e.detail.value.seller_name,            //传递参数
      avatar: that.data.avatar,
      brief: e.detail.value.brief,
      desc: e.detail.value.desc,
      phone: e.detail.value.phone,
      owner: e.detail.value.owner,
      industry_type: e.detail.value.industry_type,
      zipcode: e.detail.value.zipcode,
      province: that.data.province,
      city: that.data.city,
      district: that.data.district,
      address: e.detail.value.address,
      slogan: e.detail.value.slogan
    }).then(
      (res) => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '创建店铺成功',
            icon: 'success',
            duration: 2000
          })
        } else {
        }
      }
      )
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value         // 获取地址信息
    })
    var arr = this.data.region;
    var that = this;
    that.setData({              //将region里面的值分别赋值给省 市 区
      province: arr[0],
      city: arr[1],
      district: arr[2]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})