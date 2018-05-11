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
          'XX-Device-Type':"wxapp",
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
          switch (res.statusCode) {
            case 202:
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                mask: true,
                duration: 2000
              });
              break;
            case 203: // 清除token信息并跳转到登录页面
              wx.removeStorageSync('Token');
              wx.redirectTo({
                url: 'pages/login/index',
              })
              break;
          }
        },
        fail: function (res) {
          reject(res);
          // wx.showToast({
          //   title: '系统繁忙，请稍后再试！',
          //   image: this.wrongImgUrl,
          //   duration: 2000
          // })
        }
      })
    })
    return promise;
    // console.log(promise)
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
  // 获取用户授权
  authorize() {
    let promise = new Promise(function (resolve, reject) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            resolve();
          } else {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                resolve();
              },
              fail() {
                wx.showModal({
                  title: '用户未授权',
                  content: "如需正常使用书架收藏功能，请按确定并在授权管理中选中“用户信息”,然后点击确定。最后再重新进入小程序即可正常使用",
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function success(res) {
                          reject();
                        }
                      });
                    }
                  }
                })
              }
            })
          }
        }
      })
    })
    return promise;
  }
  // 获取用户信息
  getUserInfo() {
    let promise = new Promise(function (resolve, reject) {
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          resolve(res.userInfo)
        },
        fail: res => {
          wx.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
    return promise;
  }
  // 登录
  login() {
    let promise = new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          if (res.code) {
            resolve(res)
            // 获取ssid
            // Http.get('mh_api.php', { ac: 'getssid', code: res.code }).then(function (res) {
            //   if (res.status) {
            //     //缓存ssid
            //     try {
            //       wx.setStorageSync('ssid', res.ssid)
            //     } catch (e) {
            //       console.log(e);
            //     }
            //   } else {
            //     console.log('登录失败！');
            //   }
            // })
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