// pages/location/splash/splash.js
var app = getApp();
Page({
  data: {
    userInfo: {},
    motto: '豆瓣同城'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;

    //  获取用户信息
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      });
      console.log("userInfo: " + userInfo);
    });
    // 获取用户的位置
    app.getLocation();

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindmottotap: function (event) {
    var loc = "";
    if (app.globalData.latitude && app.globalData.longitude) {
      loc = "?latitude=" + app.globalData.latitude + "&&longitude=" + app.globalData.longitude;
    }
    wx.redirectTo({
      url: '/pages/location/location' + loc
    });
  }
})