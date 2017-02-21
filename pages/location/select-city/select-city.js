// pages/location/select-city/select-city.js
var app = getApp();
Page({
  data: {
    locs: [],
    city: null,
    hotCityUid: ["beijing", "shanghai", "guangzhou", "shenzhen", "chengdu", "nanjing", "wuhan", "hangzhou", "chongqing"],
    hotCity: [],
    letterList: [],
    cityList: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var city = app.globalData.city;
    var locs = app.globalData.locs;
    this.setData({
      locs: locs
    });
    this.processCityListData(locs);
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
  /** 搜索城市 */
  bindSearch: function (event) {
    wx.navigateTo({
      url: '/pages/location/select-city/search-city/search-city'
    });
  },
  /** 处理城市信息 */
  processCityListData: function (locs) {
    if (locs && typeof locs == "object") {
      // 提取热门城市
      var hotCity = this.data.hotCityUid.map(function (item, index, input) {
        return locs[item];
      });

      // 按字母顺序排序
      var keys = Object.keys(locs);
      keys.sort();
      // 提取所有城市并按首字母归类
      var cityList = {};
      var letterList = [];
      for (let idx in keys) {
        var key = keys[idx];
        var letter = key.substring(0, 1);
        var city = locs[key];
        if (!cityList[letter]) {
          cityList[letter] = [];
          letterList.push(letter);
        }
        cityList[letter].push(city);
      }
      console.log("cityList: " + cityList);
      this.setData({
        "hotCity": hotCity, "letterList": letterList, "cityList": cityList
      });
    }
  },
  bindCityTap: function (event) {
    var locId = event.currentTarget.dataset.id;
    var city = event.currentTarget.dataset.name;
    var cityUid = event.currentTarget.dataset.uid;
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        app.globalData.reflesh = true;
        app.globalData.locId = locId;
        app.globalData.city = city;
        app.globalData.cityUid = cityUid;
      }
    });
  }
})