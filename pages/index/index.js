//index.js
//获取应用实例
const app = getApp()




Page({
  data: {
    src1: '../../imgs/list/store.png',
    src2: '../../imgs/list/saoma.png',
    src3: '../../imgs/list/erweima.png',
    src4: '../../imgs/list/maidan.png',
    src5: '../../imgs/list/jysj.png',
    sum:2990,
    num1: 81,
    num2: 81,
    num3: 81,
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ]
  },
  change1:function(e){
    this.setData({
      sum:2990,
      num1: 81,
      num2: 81,
      num3: 81,
    })
  },
  change2: function (e) {
    this.setData({
      sum: 3000,
      num1: 52,
      num2: 70,
      num3: 91,
    })
  },
  change3: function (e) {
    this.setData({
      sum: 8000,
      num1: 150,
      num2: 150,
      num3: 150,
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  }


  
})  
