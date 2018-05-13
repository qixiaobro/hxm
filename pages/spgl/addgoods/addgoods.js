// pages/spgl/addgoods/addgoods.js
import Http from '../../../utils/http';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '是', value: '是' },
      { name: '否', value: '否', checked: 'true' },
    ],
    goods_name:'',
    cat_id:'',
    brand_id:'',
    weight:'',
    vendor:'',
    shop_price:'',
    market_price:'',
    cost_price:'',
    quantity:'',
    goods_content:'',
    original_img:'',
    shipping_method:'',
    shipping_remark:'',
    is_newL:'',
    original_img2: '/imgs/toolbars/addgoods.png',
  },
  chooseImg: function () {              //图片选择函数
    var that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          original_img2: tempFilePaths,
        })
        that.uploadPhoto();                 //调用上传函数上传头像
      }
    })
  },
  uploadPhoto: function () {
    var that = this
    var para = para ? para : {};            //参数  带上openid和token
    para.token = wx.getStorageSync('openid');
    para.openid = wx.getStorageSync('Token');
    wx.uploadFile({
      url: 'https://v.huxiamai.com/api/asset/file/upload',
      filePath: that.data.original_img2,
      name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'XX-Device-Type': "wxapp",
        "XX-Token": wx.getStorageSync('Token')
      },
      formData: para,
      success: function (res) {
        console.log(res);
        // var obj = JSON.parse(res.data.data)                //不知道为什么返回的url是乱的，所以采用分割，将url重组
        var re = res.data.split(",");
        var result = re[2].split(":")[2] + ':' + re[2].split(":")[3];
        var dd = result.split('"')[1];
        var result = dd.split("\\");
        var original_img = result[0] + result[1] + result[2] + result[3] + result[4] + result[5]; //将url重组并赋值给avatar
        that.data.original_img = original_img;
        console.log(original_img);
      }
    })
  }, 
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    if(e.detail.value=='是'){
      that.setData({
        is_newL: 1
      })
    }else{
      that.setData({
        is_newL: 0
      })
    }
    
  },
  formSubmit: function (e) {
    var that = this;    //使用data中的数据
    Http.post('biz/goods/Goods/goods_add', {
      goods_name: e.detail.value.goods_name,            //传递参数
      original_img: that.data.original_img,
      cat_id: e.detail.value.cat_id,
      brand_id: e.detail.value.brand_id,
      weight: e.detail.value.weight,
      vendor: e.detail.value.vendor,
      shop_price: e.detail.value.shop_price,
      market_price: e.detail.value.market_price,
      cost_price: e.detail.value.cost_price,
      quantity: e.detail.value.quantity,
      goods_content: e.detail.value.goods_content,
      shipping_method: e.detail.value.shipping_method,
      shipping_remark: e.detail.value.shipping_remark,
      is_new: that.data.is_new
    }).then(
      (res) => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '添加商品成功',
            icon: 'success',
            duration: 2000
          })
        } else {
        }
      }
      )
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
  
  }
})