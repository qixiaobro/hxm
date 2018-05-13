// pages/spgl/addgoods/addgoods.js
import Http from '../../../utils/http';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: '',
    goods_name: '',
    cat_id: '',
    brand_id: '',
    weight: '',
    vendor: '',
    shop_price: '',
    market_price: '',
    cost_price: '',
    quantity: '',
    goods_content: '',
    original_img: '',
    shipping_method: '',
    shipping_remark: '',
    is_new: '',
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
          original_img: tempFilePaths,
        })
        that.uploadPhoto();                 //调用上传函数上传头像
      }
    })
  },
  uploadPhoto: function () {
    var that = this
    var para = para ? para : {};            //参数  带上openid和token
    para.token = wx.getStorageSync('Token');
    para.openid = wx.getStorageSync('openid');
    wx.uploadFile({
      url: 'https://v.huxiamai.com/api/asset/file/upload',
      filePath: that.data.original_img,
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
  formSubmit: function (e) {                           //上传表单信息
    var goods_name2 = e.detail.value.goods_name;     //获取表单传过来的值  
    var cat_id2 = e.detail.value.cat_id;
    var brand_id2 = e.detail.value.brand_id;
    var weight2 = e.detail.value.weight;
    var vendor2 = e.detail.value.vendor;
    var shop_price2 = e.detail.value.shop_price;
    var market_price2 = e.detail.value.market_price;
    var cost_price2 = e.detail.value.cost_price;
    var quantity2 = e.detail.value.quantity;
    var goods_content2 = e.detail.value.goods_content;
    var shipping_method2 = e.detail.value.shipping_method;
    var shipping_remark2 = e.detail.value.shipping_remark;
    var is_new2 = e.detail.value.is_new;
    if (goods_name2 != '') {               //判断是否为空，如果不空则将新值赋值给data，如果空，则用原数据
      this.setData({
        goods_name: goods_name2
      })
    }
    if (cat_id2 != '') {
      this.setData({
        cat_id: cat_id2
      })
    }
    if (brand_id2 != '') {
      this.setData({
        brand_id: brand_id2
      })
    }
    if (weight2 != '') {
      this.setData({
        weight: weight2
      })
    }
    if (vendor2 != '') {
      this.setData({
        vendor: vendor2
      })
    }
    if (shop_price2 != '') {
      this.setData({
        shop_price: shop_price2
      })
    }
    if (market_price2 != '') {
      this.setData({
        market_price: market_price2
      })
    }
    if (cost_price2 != '') {
      this.setData({
        cost_price: cost_price2
      })
    }
    if (quantity2 != '') {
      this.setData({
        quantity: quantity2
      })
    }
    if (goods_content2 != '') {
      this.setData({
        goods_content: goods_content2
      })
    }
    if (shipping_method2 != '') {
      this.setData({
        shipping_method: shipping_method2
      })
    }
    if (shipping_remark2 != '') {
      this.setData({
        shipping_remark: shipping_remark2
      })
    }
    if (is_new2 != '') {
      this.setData({
        is_new: is_new2
      })
    }

    var that = this;    //使用data中的数据
    if (that.data.is_new == "是") {
      that.setData({
        is_new: 1
      })
    } else {
      that.setData({
        is_new: 0
      })
    }
    var that = this; 
    Http.post('biz/goods/Goods/goods_update', {
      goods_id: that.data.goods_id,
      goods_name: that.data.goods_name,            //传递修改后的商品信息
      cat_id: that.data.cat_id,
      brand_id: that.data.brand_id,
      weight: that.data.weight,
      vendor: that.data.vendor,
      shop_price: that.data.shop_price,
      market_price: that.data.market_price,
      cost_price: that.data.cost_price,
      quantity: that.data.quantity,
      goods_content: that.data.goods_content,
      original_img: that.data.original_img,
      shipping_method: that.data.shipping_method,
      shipping_remark: that.data.shipping_remark,
      is_new: that.data.is_new,
    }).then(
      (res) => {
        if (res.data.code == 0) {                //修改成功
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        } else {
        }
      }
      );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    Http.get('biz/goods/Goods/goods_info', { goods_id: options.goods_id }).then(
      (res) => {
        if (res.data.code == 0) {
          console.log(res.data.data.goods_id)
          that.setData({
            goods_id: res.data.data.goods_id,
            goods_name: res.data.data.goods_name,
            cat_id: res.data.data.cat_id,
            brand_id: res.data.data.brand_id,
            weight: res.data.data.weight,
            vendor: res.data.data.vendor,
            shop_price: res.data.data.shop_price,
            market_price: res.data.data.market_price,
            cost_price: res.data.data.cost_price,
            quantity: res.data.data.quantity,
            goods_content: res.data.data.goods_content,
            original_img: res.data.data.original_img,
            shipping_method: res.data.data.shipping_method,
            shipping_remark: res.data.data.shipping_remark,
            is_new: res.data.data.is_new,
          })
          that.setIs_new();
        } else {
        }
      }
    );
  },
  //获取数据后将is_new的数值转化为文字
  setIs_new: function () {
    var that = this
    console.log(1)
    if (that.data.is_new == 1) {
      that.setData({
        is_new: '是'
      })
    } else {
      that.setData({
        is_new: '否'
      })
    }
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