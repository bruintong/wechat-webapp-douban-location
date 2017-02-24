// pages/location/event/action/action.js
Page({
  data: {
    "title": "",
    "somecount": "",
    "action": "join",
    "beforeAnimation": "",
    "wish": "",
    "join": "",
    "value": ""
  },
  onLoad: function (options) {
    var title = options.title;
    var somecount = options.somecount;
    var action = options.action;
    this.setData({ "action": action, "title": title, "somecount": somecount });
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
  /** 用户点击感兴趣，执行动画 */
  handleWish: function (event) {
    this.setData({ "action": "wish", "beforeAnimation": "left", "value": "" });
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })

    animation.translateX(375).step()

    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      this.reset();
    }.bind(this), 400);
  },
  /** 用户点击要参加，执行动画 */
  handleJoin: function (event) {

    this.setData({ "action": "join", "beforeAnimation": "right", "value": "" });
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })

    animation.translateX(-375).step()

    this.setData({
      animationData: animation.export()
    });

    setTimeout(function () {
      this.reset();
    }.bind(this), 400);
  },
  /** 动画完成后，恢复状态 */
  reset: function () {
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear'
    })
    animation.translateX(0).step();
    this.setData({ "beforeAnimation": "", animationData: animation.export() });
  },
  /** 用户点击确定 */
  handleComfirm: function (event) {
    wx.navigateBack();
  },
  /** 用户输入的文本 */
  handleInput: function (event) {
    var action = event.currentTarget.dataset.action;
    var value = event.detail.value;
    var readyData = {};
    readyData[action] = value;
    this.setData(readyData);
  }
})