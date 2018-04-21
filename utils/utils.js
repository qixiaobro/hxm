const app = getApp();
//接口请求
const fetch = (options) => {
  wx.request({
    url: options.url,
    method: options.method || 'GET',
    data: options.data || '',
    dataType: options.dataType || 'json',
    success: options.success || null,
    fail: options.fail || null
  })
};

// 数据处理：目录文字正则处理
const processCatelogTitle = (title, str) => {
  title = title.replace(/\s/g, '');
  let reg = new RegExp(`${title}\\s\*`);
  return str.replace(reg, '');
};
//用户授权
const getUserAuth = () => {
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        resolve(true)
      },
      fail() {
        reject(false)
      }
    });
  })
};
//获取code
const getJsCode= () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject('获取用户登录状态失败')
        }
      }
    })
  })
};
//获取openid
const getOpenid = (url, jscode) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: {
        ac: 'getopenid',
        code: jscode
      },
      success(res) {
        if (res.data.code === 'success') {
          app.globalData.openid = res.data.openid;
          resolve(res.data.openid)
        } else {
          reject('获取用户信息失败，请重新登录')
        }
      }
    })
  })
};
//获取用户信息
const getUserInfo = () => {
  return new Promise((resolve) => {
    wx.getUserInfo({
      success(res) {
        resolve(res.userInfo)
      }
    })
  })
};
//显示加载弹窗
const showLoading = (title = '正在加载') => {
  wx.showLoading({
    title: title
  })
};
//显示提示弹窗
const showToast = (options, context, duration = 1000) => {
  context.setData(options);
  setTimeout(() => {
    context.setData({
      showToast: false
    });
  }, duration)
};

const debounce = (func, wait, immediate) => {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = new Date().getTime() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

module.exports = {
  fetch,
  processCatelogTitle,
  getUserAuth,
  getJsCode,
  getOpenid,
  getUserInfo,
  showLoading,
  showToast,
  debounce
}