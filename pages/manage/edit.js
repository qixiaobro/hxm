// pages/index/createstore.js
import Http from '../../utils/http';
const Zan = require('../../dist/index');//引用组件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',                            //头像，用于页面显示
    seller_name: '',                       //店铺名称
    brief: '',                             //店铺简介
    desc: '',                              //店铺描述
    phone: '',                             //联系方式
    owner: '',                             //店主
    industry_type: '',                     //服务类型
    zipcode: '',                           //邮编
    address: '',                           //详细地址
    slogan: '',                             //广告语 
    province: '',                           //省份
    city: '',                               //市
    district: '',                            //县
    region: ['北京市', '北京市', '东城区'],     //地区选择组件默认值
    customItem: '全部',
  },
  changeAvatar: function () {              //头像选择函数
    var that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          avatar: tempFilePaths,      
        })
        console.log(that.data.avatar)
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
      filePath: that.data.avatar,
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
        var avatar = result[0] + result[1] + result[2] + result[3] + result[4] + result[5]; //将url重组并赋值给avatar
        that.data.avatar = avatar
        console.log(avatar);
      }
    })

  }, 
  bindRegionChange: function (e) {                //地区选择函数
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
  formSubmit: function (e) {                           //上传表单信息
    var seller_name2 = e.detail.value.seller_name;     //获取表单传过来的值  
    var brief2 = e.detail.value.brief;
    var desc2 = e.detail.value.desc;
    var phone2 = e.detail.value.phone;
    var owner2 = e.detail.value.owner;
    var industry_type2 = e.detail.value.industry_type;
    var zipcode2 = e.detail.value.zipcode;
    var address2 = e.detail.value.address;
    var slogan2 = e.detail.value.slogan;
    if (seller_name2 != '') {               //判断是否为空，如果不空则将新值赋值给data，如果空，则用原数据
      this.setData({         
        seller_name: seller_name2
      })
    } 
    if (brief2 != '') {
      this.setData({
        brief: brief2
      })
    } 
    if (desc2 != '') {
      this.setData({
        desc: desc2
      })
    } 
    if (phone2 != '') {
      this.setData({
        phone: phone2
      })
    } 
    if (owner2 != '') {
      this.setData({
        owner: owner2
      })
    } 
    if (industry_type2 != '') {
      this.setData({
        industry_type: industry_type2
      })
    } 
    if (zipcode2 != '') {
      this.setData({
        zipcode: zipcode2
      })
    } 
    if (address2 != '') {
      this.setData({
        address: address2
      })
    } 
    if (slogan2 != '') {
      this.setData({
        slogan: slogan2
      })
    }            
    var that = this;    //使用data中的数据
    Http.post('biz/seller/Seller/updateSeller', {
      seller_name: that.data.seller_name,            //传递修改后的店铺信息
      avatar: that.data.avatar,
      brief: that.data.brief,
      desc: that.data.desc,
      phone: that.data.phone,
      owner: that.data.owner,
      industry_type: that.data.industry_type,
      zipcode: that.data.zipcode,
      province: that.data.province,
      city: that.data.city,
      district: that.data.district,
      address: that.data.address,
      slogan: that.data.slogan
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
    Http.get('biz/seller/Seller/currentSeller').then(  //获取店铺信息
      (res) => {
        if (res.data.code == 0) {   //获取店铺状态信息 并赋值
          that.setData({         //获取原店铺信息
            avatar: res.data.data[0].avatar,
            seller_name: res.data.data[0].seller_name,
            brief: res.data.data[0].brief,
            desc: res.data.data[0].desc,
            phone: res.data.data[0].phone,
            owner: res.data.data[0].owner,
            industry_type: res.data.data[0].industry_type,
            zipcode: res.data.data[0].zipcode,
            address: res.data.data[0].address,
            slogan: res.data.data[0].slogan,
            'region[0]': res.data.data[0].province,
            'region[1]': res.data.data[0].city,
            'region[2]': res.data.data[0].district,
            province: res.data.data[0].province,
            city: res.data.data[0].province,
            district: res.data.data[0].province
          });
        } else {
        }
      }
    )
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