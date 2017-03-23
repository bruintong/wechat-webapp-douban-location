// pages/location/category/category.js
var app = getApp();
Page({
  data: {
    locId: "",               // 当前城市的id
    windowWidth: undefined,   // 视窗宽度
    windowHeight: undefined,   // 视窗高度
    showCategory: false,     // 是否显示类型选择列表
    isTypeTap: false,      // 是否类型标签页被点击
    isDateTap: false,     // 是否时间标签页被点击
    eventsData: {},           // 活动列表
    g_eventCategory: {},  // 全局的类型信息
    districtsCategory: {},   // 区域类型信息，暂时不会用到，API不支持获取城市某个区域的活动
    dateCategory: {},       // 活动日期的信息：future, week, weekend, today, tomorrow
    typeCategory: {},       // 活动的类型信息：all,music, film, drama, commonweal, salon, exhibition, party, sports, travel, others
    eventCategory: {},     // 当前点击的标签页的类型列表信息
    "current": "",
    "type": "all",         // 当前选择的活动类型
    "date": "future",      // 当前选择的活动时间
    'district': "all"      // 当前选择的活动区域
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var locId = options.locId;
    var eventType = options.type;
    // 初始化活动类型列表
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
      "course": { "id": "course", "name": "course", "title": "课程" }
    };
    // 初始化活动日期类型列表
    var dateCategory = {
      "future": { "id": "future", "name": "future", "title": "全部" },
      "today": { "id": "today", "name": "today", "title": "今天" },
      "tomorrow": { "id": "tomorrow", "name": "tomorrow", "title": "明天" },
      "weekend": { "id": "weekend", "name": "weekend", "title": "周末" },
      "week": { "id": "week", "name": "week", "title": "近期" },
    };
    // 全局保存的活动类型信息
    var g_eventCategory = app.globalData.eventCategory;

    // 获取视窗宽度、高度
    var windowWidth = app.globalData.windowWidth;
    var windowHeight = app.globalData.windowHeight;
    this.setData({ "locId": locId, "type": eventType, "eventCategory": typeCategory, "current": this.data.type, "typeCategory": typeCategory, "dateCategory": dateCategory, "g_eventCategory": g_eventCategory, "windowWidth": windowWidth, "windowHeight": windowHeight });

    // 请求活动列表
    this.getEventListData();
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
  /** 重置标签页状态 */
  resetMenuTap: function (menu) {
    var readyData = { "isTypeTap": false, "isDateTap": false };
    this.setData(readyData);
  },
  /** 选择类型 */
  handleType: function (event) {
    this.setData({ "eventCategory": this.data.typeCategory, "current": this.data.type, "showCategory": true });
    this.resetMenuTap();
    this.setData({ "isTypeTap": true });
    console.log("handleType");
  },
  /** 选择时间 */
  handleTime: function (event) {
    this.setData({ "eventCategory": this.data.dateCategory, "current": this.data.date, "showCategory": true });
    this.resetMenuTap();
    this.setData({ "isDateTap": true });
    console.log("handleTime");
  },
  /** 选择地点，API接口不支持，这里查找该城市所有区域的活动 */
  handleLoc: function (event) {
    this.setData({ "eventCategory": this.data.districtsCategory, "current": 'all', "showCategory": true });
    console.log("handleLoc");
  },
  /** 点击某个子类型 */
  handleCategory: function (event) {
    var id = event.currentTarget.dataset.id;
    var readyData = { "showCategory": false };
    this.data.isTypeTap && (readyData["type"] = id);
    this.data.isDateTap && (readyData["date"] = id);
    readyData["eventsData"] = {};
    this.setData(readyData);

    this.getEventListData();
    this.resetMenuTap();
  },
  /** 点击类别外的区域，取消显示类别信息 */
  handleCoverTap: function (event) {
    this.setData({ "showCategory": false });
  },
  /** 搜索活动   */
  getEventListData: function () {
    // 组装URL
    var that = this;

    var offset = that.data.eventsData["offset"] || 0;
    var total = that.data.eventsData["total"] || 999;

    if (offset >= total) {
      return;
    }

    // 显示加载中
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    var params = "?";
    this.data.locId && (params += "loc=" + this.data.locId);
    this.data.type && (params += "&&type=" + this.data.type);
    this.data.date && (params += "&&day_type=" + this.data.date);
    var url = app.globalData.doubanBase + app.globalData.event_list_url + params + "&&start=" + offset + "&&count=5";
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data;
        that.processDistrictsData(data.districts);
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
  /** 组装区域数据 */
  processDistrictsData: function (districts) {
    // 接口不支持区域搜索，这里搜索该城市的所有区域
    var districts = {
      "all": { "id": "all", "name": "all", "title": "全部" }
    }
    this.setData({ "districtsCategory": districts });
  },
  /** 组装活动数据 */
  processEventListData: function (data) {
    //events
    var list = this.data.eventsData["events"] || [];
    var offset = this.data.eventsData["offset"] || 0;
    var total = data.total;
    offset += data.events.length;

    for (let idx in data.events) {
      var event = data.events[idx];
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
      list.push(temp);
    }
    var readyData = {};
    readyData["eventsData"] = {
      "events": list,
      "offset": offset,
      "total": total
    }
    this.setData(readyData);
    console.log(this.data);
  },
  /** 到达页面底部 */
  handleLower: function (event) {
    console.log("handleLower");
    // 请求活动列表
    this.getEventListData();
  },
  /** 到达页面顶部 */
  handleUpper: function (event) {
    console.log("handleUpper");
  },
  /** 查看活动详情 */
  handleEventTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/location/event/event?id=' + id
    });
  },
})