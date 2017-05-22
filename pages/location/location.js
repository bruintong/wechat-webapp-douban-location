// pages/location/location.js
var app = getApp();
Page({
  data: {
    locs: [],     // 支持的所有城市
    city: "深圳",  //  当前所在的城市
    currentLoc: { "name": "深圳" }, // 默认城市信息
    defaultUid: "shenzhen",  // 默认城市uid
    districts: [],   // 区域
    events: {},      // 所有活动
    eventsKey: [],  // 所有活动中包含的类别，获得的所有活动并不一定所有类别都有
    eventCategory: {},   // 所有活动类别
    categoryId: ["10", "18", "11", "17", "13", "12", "14", "15", "16", "19"],   // 所有类别id
    categoryColor: ["#666", "#ff6666", "#996699", "#6666cc", "#336699", "#9933cc", "#3399cc", "#cc9933", "#cccc99", "#993333"], // 类别对应不同的背景色
    categoryName: ["music", "film", "drama", "commonweal", "salon", "exhibition", "party", "sports", "travel", "course"],  // 所有类别名称
    categoryTitle: ["音乐", "电影", "戏剧", "公益", "讲座", "展览", "聚会", "运动", "旅行", "课程"],   // 所有列表标题
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.latitude && options.longitude) {
      console.log("latitude: " + options.latitude + ", longitude" + options.longitude);
    }
    // 获取用户所在的城市uid
    if (typeof app.globalData.userInfo.city == "string") {
      var cityUid = app.globalData.userInfo.city.toLowerCase();
      app.globalData.cityUid = cityUid;
    }

    // 组装活动类型
    var eventCategory = {};
    for (let idx in this.data.categoryName) {
      var id = this.data.categoryId[idx];
      var name = this.data.categoryName[idx];
      var title = this.data.categoryTitle[idx];
      var color = this.data.categoryColor[idx];
      eventCategory[name] = {
        "id": id, "name": name, "title": title, "color": color
      }
      app.globalData.eventCategory = eventCategory;
      this.setData({ "eventCategory": eventCategory });
    }

    // 获取城市列表
    this.getLocationListData();

  },
  onReady: function () {
    // 页面渲染完成
    console.log("onReady");
  },
  onShow: function () {
    // 页面显示
    console.log("onShow");
    // 界面是否需要重新刷新
    if (app.globalData.reflesh) {
      console.log("reflesh");
      app.globalData.reflesh = null;
      this.setData({ "currentLoc": app.globalData.currentLoc });
      // 根据城市Id获取活动列表
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
    // 显示加载中
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });

    var cityListURL = app.globalData.doubanBase + app.globalData.loc_list_url;
    wx.request({
      url: cityListURL,
      data: {
        "start": 0,
        "count": 500
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data.locs;
        // 组装城市列表
        that.processLocationListData(data);
      },
      complete: function () {
        //wx.hideToast();
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
      currentLoc = locs[this.data.defaultUid];
    } else {
      currentLoc = locs[cityUid];
    }
    app.globalData.locId = currentLoc.id;
    app.globalData.city = currentLoc.name;
    app.globalData.locs = locs;
    // 获取当前城市名称，如果当前城市不再列表中，则显示深圳
    this.setData({ "city": app.globalData.city, "currentLoc": currentLoc });

    // 获取当前城市的活动列表
    this.getEventByLocationId(currentLoc.id);
  },
  /** 跳转到城市选择页面 */
  bindLocation: function (event) {
    var parameter = "?id=" + this.data.currentLoc.id + "&&name=" + this.data.currentLoc.name + "&&uid=" + this.data.currentLoc.uid;
    wx.navigateTo({
      url: '/pages/location/select-city/select-city' + parameter
    });
  },
  /** 获取活动信息列表 */
  getEventByLocationId: function (locId, dayType, eventType) {
    var that = this;
    console.log("locId: " + locId + ",dayType: " + dayType + ", type: " + eventType);
    // 拼接参数

    // 显示加载中
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });

    var parameter = "?";
    locId && (parameter += "loc=" + locId);
    dayType && (parameter += "day_type=" + dayType);
    eventType && (parameter += "type=" + eventType);
    // 请求活动列表,获取50个活动
    var eventListURL = app.globalData.doubanBase + app.globalData.event_list_url + parameter + "&&start=0&&count=50";
    wx.request({
      url: eventListURL,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data;
        that.processEventListData(data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  /** 组装活动列表 */
  processEventListData: function (data) {

    var events = {};
    for (let idx in data.events) {
      var event = data.events[idx];
      // 判断是否有该类别的集合
      var category = event.category;
      if (!events[category]) {
        events[category] = [];
      }
      // 装饰event对象
      var time_str = event.time_str;
      var time = "";

      if (typeof time_str == 'string') {
        var time_arr = time_str.split(" ");
        time = time_arr[0];
      }

      var temp = {
        id: event.id,
        image: event.image,
        loc_name: event.loc_name,
        owner: event.owner,
        category: event.category,
        title: event.title,
        wisher_count: event.wisher_count,
        has_ticket: event.has_ticket,
        content: event.content,
        can_invite: event.can_invite,
        time_str: time,
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
      events[category].push(temp);
    }
    var keys = Object.keys(events);
    keys.sort();

    // 如果活动少于4个则显示
    var eventsKey = [];
    for (let i in keys) {
      var key = keys[i];
      var arr = events[key];
      if (arr.length >= 4) {
        eventsKey.push(key);
      }
    }
    this.setData({ "events": events, "eventsKey": eventsKey });
  },
  /** 查看活动详情 */
  handleEventTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/location/event/event?id=' + id
    });
  },
  /** 选择类型 */
  bindCategory: function (event) {
    var param = "locId=" + this.data.currentLoc.id;
    wx.navigateTo({
      url: '/pages/location/category/category?' + param,
    });
  },
  /** 用户点击更多，选择某个特定类型的活动 */
  handleMore: function (event) {
    var type = event.currentTarget.dataset.type;
    var param = "locId=" + this.data.currentLoc.id + "&&type=" + type;
    wx.navigateTo({
      url: '/pages/location/category/category?' + param,
    });
  }
})