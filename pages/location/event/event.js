// pages/location/event/event.js
var app = getApp();
Page({
  data: {
    extended: false,
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

    // 显示加载中
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });

    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data;
        that.processEventData(data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  /** 组装活动详情数据 */
  processEventData: function (event) {
    // 判断是否有该类别的集合
    var category = event.category;
    var some_count = "";
    event.wisher_count && (some_count += event.wisher_count + "感兴趣");
    event.participant_count && (some_count += " / " + event.participant_count + "要参与");

    var contentStr = event.content;
    if (typeof contentStr == 'string') {
      contentStr = contentStr.replace(new RegExp("<br>", "gm"), "\n").replace(new RegExp("<img ", "gm"), "\<image ").replace(new RegExp('alt="">', "gm"), ">\<\/image\>").replace(new RegExp("<div ", "gm"), "\<view ").replace(new RegExp("</div>", "gm"), "\<\/view\>");
    }
    console.log("contentStr: " + contentStr + ", content: " + event.content);

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
      content: contentStr,
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
  /** 查看图片 */
  handlePosterTap: function (event) {
    var posterUrl = this.data.event.image;
    wx.navigateTo({
      url: '/pages/location/event/poster/poster?posterUrl=' + posterUrl
    });
  },
  /** 查看活动时间 */
  handleSchedule: function (event) {
    console.log("handleSchedule");
    var param = "";
    this.data.event.title && (param += "title=" + this.data.event.title);
    this.data.event.begin_time && (param += "&&beginTime=" + this.data.event.begin_time);
    this.data.event.begin_time && (param += "&&endTime=" + this.data.event.end_time);
    wx.navigateTo({
      url: '/pages/location/event/schedule/schedule?' + param
    });
  },
  /** 查看地图 */
  handleMap: function (event) {
    console.log("handleMap");
    var geo = this.data.event.geo;
    if (typeof geo == 'string') {
      var loc = geo.split(" ");
      var latitude = parseFloat(loc[0]);
      var longitude = parseFloat(loc[1]);
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28
      });

    }
  },
  /** 在线购票 */
  handleTicket: function (event) {
    console.log("handleTicket");
    wx.showModal({
      title: '在线购票',
      content: '请拨打客服热线',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  /** 拨打电话 */
  handlePhone: function (event) {
    var phone = event.currentTarget.dataset.phone;
    console.log("handlePhone");
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function (res) {
        // success
      }
    });
  },
  /** 用户感兴趣 */
  handleWish: function (event) {
    console.log("handleWish");
    var params = "action=wish";
    this.data.event.title && (params += "&&title=" + this.data.event.title);
    this.data.event.some_count && (params += "&&somecount=" + this.data.event.some_count);
    wx.navigateTo({
      url: '/pages/location/event/action/action?' + params,
    });
  },
  /** 用户要参加 */
  handleJoin: function (event) {
    console.log("handleJoin");
    var params = "action=join";
    this.data.event.title && (params += "&&title=" + this.data.event.title);
    this.data.event.some_count && (params += "&&somecount=" + this.data.event.some_count);
    wx.navigateTo({
      url: '/pages/location/event/action/action?' + params,
    });
  },
  bindExtend: function (event) {
    this.setData({ "extended": true });
  }
})