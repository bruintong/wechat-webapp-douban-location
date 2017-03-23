// pages/location/event/poster/poster.js
var app = getApp();
Page({
  data: {
    posterUrl: "",
    windowWidth: undefined,
    windowHeight: undefined
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var posterUrl = options.posterUrl;
    var windowWidth = app.globalData.windowWidth;
    var windowHeight = app.globalData.windowHeight;
    this.setData({ "posterUrl": posterUrl, "windowWidth": windowWidth, "windowHeight":windowHeight });
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
  handleDownload: function () {
    var url = this.data.posterUrl;
    wx.downloadFile({
      url: url,
      type: 'image', // 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
      // header: {}, // 设置请求的 header
      success: function (res) {
        var data = res;
        wx.showToast({
          title: '下载完成',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  handleTap: function (event) {
    wx.navigateBack();
  }
})