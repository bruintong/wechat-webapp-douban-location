// pages/location/location.js
var app = getApp();
Page({
  data: {
    locs: [],
    city: "深圳",
    currentLoc: { "name": "深圳" },
    defaultUid: "shenzhen"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.latitude && options.longitude) {
      console.log("latitude: " + options.latitude + ", longitude" + options.longitude);
    }
    if (typeof app.globalData.userInfo.city == "string") {
      var cityUid = app.globalData.userInfo.city.toLowerCase();
      app.globalData.cityUid = cityUid;
    }
    this.getLocationListData();
  },
  onReady: function () {
    // 页面渲染完成
    console.log("onReady");
  },
  onShow: function () {
    // 页面显示
    console.log("onShow");
    if (app.globalData.reflesh) {
      console.log("reflesh");
      app.globalData.reflesh = null;
      this.setData({ "currentLoc": app.globalData.currentLoc });

      this.getEventByLocationId(app.globalData.locId);
    }
  },
  onHide: function () {
    // 页面隐藏
    console.log("hide");
  },
  onUnload: function () {
    // 页面关闭
    console.log("onUnload");
  },
  /** 获取城市列表 */
  getLocationListData: function () {
    var that = this;
    var cityListURL = app.globalData.doubanBase + app.globalData.loc_list_url;
    wx.request({
      url: cityListURL,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data.locs;
        that.processLocationListData(data);
      }
    })
  },
  /** 处理城市信息 */
  processLocationListData(data) {
    var locs = {};
    for (let idx in data) {
      var loc = data[idx];
      locs[loc.uid] = loc;
    }
    // 默认加载当前城市的活动，如果不支持当前城市，则默认加载深圳的活动
    var cityUid = app.globalData.cityUid;
    var currentLoc = null;
    if (!locs[cityUid]) {
      currentLoc = locs[defaultUid];
    } else {
      currentLoc = locs[cityUid];
    }
    app.globalData.locId = currentLoc.id;
    app.globalData.city = currentLoc.name;
    app.globalData.locs = locs;
    // 获取当前城市名称，如果当前城市不再列表中，则显示深圳
    this.setData({ "city": app.globalData.city, "currentLoc": currentLoc });

  },
  /** 选择城市 */
  bindLocation: function (event) {
    wx.navigateTo({
      url: '/pages/location/select-city/select-city?id=' + this.data.currentLoc.id + "&&name=" + this.data.currentLoc.name + "&&uid=" + this.data.currentLoc.uid
    });
  },
  /** 获取活动信息列表 */
  getEventByLocationId: function (locId, dayType, eventType) {
    console.log("locId: " + locId + ",dayType: " + dayType + ", type: " + eventType);
  },
})