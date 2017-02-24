// pages/location/category/category.js
var app = getApp();
Page({
  data: {
    locId: "",
    eventCategory: {},
    districtsCategory: {},
    dateCategory: {},
    typeCategory: {},
    "current": "",
    "type": "all",
    "date": "future"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var locId = options.locId;
    var eventType = options.type;
    var typeCategory = {
      "all": { "id": "all", "name": "all", "title": "全部" },
      "music": { "id": "music", "name": "music", "title": "音乐" },
      "film": { "id": "film", "name": "film", "title": "电影" },
      "drama": { "id": "drama", "name": "drama", "title": "戏剧 " },
      "commonweal": { "id": "commonweal", "name": "commonweal", "title": "公益" },
      "salon": { "id": "salon", "name": "salon", "title": "讲座 " },
      "exhibition": { "id": "exhibition", "name": "exhibition", "title": "展览" },
      "party": { "id": "party", "name": "party", "title": "聚会" },
      "sports": { "id": "sports", "name": "sports", "title": "运动" },
      "travel": { "id": "travel", "name": "travel", "title": "旅行" },
      "course": { "id": "course", "name": "course", "title": "课程" },
      "others": { "id": "others", "name": "others", "title": "其他" },
    };
    var dateCategory = {
      "future": { "id": "future", "name": "future", "title": "全部" },
      "today": { "id": "today", "name": "today", "title": "今天" },
      "tomorrow": { "id": "tomorrow", "name": "tomorrow", "title": "明天" },
      "weekend": { "id": "weekend", "name": "weekend", "title": "周末" },
      "week": { "id": "week", "name": "week", "title": "近期" },
    };
    this.setData({ "locId": locId, "eventCategory": typeCategory, "current": this.data.type, "typeCategory": typeCategory, "dateCategory": dateCategory });

    // 请求活动列表
    this.getEventListDat();
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
  /** 选择类型 */
  handleType: function (event) {
    this.setData({ "eventCategory": this.data.typeCategory, "current": this.data.type });
    console.log("handleType");
  },
  /** 选择时间 */
  handleTime: function (event) {
    this.setData({ "eventCategory": this.data.dateCategory, "current": this.data.date });
    console.log("handleTime");
  },
  /** 选择地点 */
  handleLoc: function (event) {
    this.setData({ "eventCategory": this.data.dateCategory, "current": this.data.date });
    console.log("handleLoc");
  },
  /** 点击类型 */
  handleCategory: function (event) {
    var param = "?";
    this.data.type && (param += "type=" + this.data.type);
    this.data.date && (param += "&&day_type=" + this.data.date);
    var url = app.globalData.doubanBase + app.globalData.event_list_url + this.data.locId + param;
    this.getEventListDat(url);
  },
  /** 搜索活动   */
  getEventListDat: function () {
    // 组装URL
    var that = this;
    var parameter = "?";
    this.data.locId && (parameter += "loc=" + this.data.locId);
    this.data.eventType && (parameter += "type=" + this.data.eventType);
    var url = app.globalData.doubanBase + app.globalData.event_list_url + parameter + "&&start=0&&count=20";
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data;
        that.processDistrictsData(data.districts);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  /** 组装区域数据 */
  processDistrictsData: function (districts) {
    this.setData({ "districtsCategory": districts });
  }
})