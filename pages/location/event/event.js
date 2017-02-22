// pages/location/event/event.js
var app = getApp();
Page({
  data: {
    categoryColor: "",
    event: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var url = app.globalData.doubanBase + app.globalData.event_url + id;
    this.getEventDatById(url);
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
  /** 根据id获取活动详情 */
  getEventDatById: function (url) {
    console.log("getEventDataById");
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        that.processEventData(data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  /** 组装活动详情数据 */
  processEventData: function (event) {
    // 判断是否有该类别的集合
    var category = event.category;
    var some_count = "";
    event.wisher_count && (some_count += event.wisher_count + "感兴趣");
    event.participant_count && (some_count += "/" + event.participant_count + "要参与");
    var temp = {
      id: event.id,
      image: event.image,
      loc_name: event.loc_name,
      owner: event.owner,
      category: event.category,
      title: event.title,
      wisher_count: event.wisher_count,
      some_count: some_count,
      has_ticket: event.has_ticket,
      content: event.content,
      can_invite: event.can_invite,
      time_str: event.time_str,
      album: event.album,
      participant_count: event.participant_count,
      tags: event.tags,
      image_hlarge: event.image_hlarge,
      begin_time: event.begin_time,
      price_range: event.price_range,
      geo: event.geo,
      image_lmobile: event.image_lmobile,
      loc_id: event.loc_id,
      end_time: event.end_time,
      address: event.address,
    };
    var categoryColor = category;
    this.setData({ "event": temp, "categoryColor": categoryColor });
  },
  /** 查看活动时间 */
  handleSchedule: function (event) {
    console.log("handleSchedule");
  },
  /** 查看地图 */
  handleMap: function (event) {
    console.log("handleMap");
  },
  /** 在线购票 */
  handleTicket: function (event) {
    console.log("handleTicket");
  },
  /** 拨打电话 */
  handlePhone: function (event) {
    console.log("handlePhone");
  },
  /** 用户感兴趣 */
  handleWish: function (event) {
    console.log("handleWish");
  },
  /** 用户要参加 */
  handleJoin: function (event) {
    console.log("handleJoin");
  },
})