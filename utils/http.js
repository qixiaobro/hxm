class Http {
  constructor() {
    this.api = "https://v.huxiamai.com/";
    this.accept = "application/json";
  }
  getToken() {//每次请求都带上token
    let Token = wx.getStorageSync('Token');
    return Token || "";
  }
  getOpenId() {//每次请求都带上token
    let openId = wx.getStorageSync('openid');
    return openId || "";
  }
  request(type, uri, para) {
    let root = this;
    let url = this.api + uri;
    para = para ? para : {};
    para.token = this.getToken();
    para.openid = this.getOpenId();
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: para,
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'accept': root.accept,
          'Authorization': root.getToken() ? ('Bearer ' + root.getToken()) : "",
          'XX-Device-Type': "wxapp",
          "XX-Token": root.getToken()
        },
        dataType: 'json',
        method: type,
        success: function (res) {//每次请求得到的token都刷新storage
          resolve(res);
          //如果token过期则替代掉
          if (res.data.token) {
            let Token = res.data.token;
            wx.removeStorageSync('Token');
            wx.setStorageSync('Token', Token);
          }
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
    return promise;
  }
  get(url, para) {
    return this.request('get', url, para);
  }
  put(url, para) {
    return this.request('put', url, para);
  }
  post(url, para) {
    return this.request('post', url, para);
  }
  delete(url, para) {
    return this.request('delete', url, para);
  }

  // 登录
  login() {
    let promise = new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          if (res.code) {
            resolve(res)
          } else {
            reject('获取用户登录状态失败')
          }
        }
      });
    })
    return promise;
  }
}
export default new Http();