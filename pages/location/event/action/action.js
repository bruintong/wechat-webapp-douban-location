// pages/location/event/action/action.js
Page({
  data: {
    "action": "join"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  handleWish: function (event) {
    this.setData({ "action": "wish" });
  },
  handleJoin: function (event) {
    this.setData({ "action": "join" });
  },
})