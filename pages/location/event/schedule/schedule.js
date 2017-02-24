// pages/location/event/schedule/schedule.js
Page({
  data: {
    schedule: [],
    time: "",
    week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var title = options.title;
    var beginTime = options.beginTime;
    var endTime = options.endTime;

    wx.setNavigationBarTitle({
      title: title
    });
    this.processScheduleData(beginTime, endTime);
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
  processScheduleData: function (beginTime, endTime) {
    var begin_time = beginTime;
    var end_time = endTime;
    // 开始时间
    var beginArr = begin_time.split(" ")[0].split('-');
    var beginYear = beginArr[0];
    var beginMonth = beginArr[1] - 1;
    var beginDayOfMonth = beginArr[2];
    var beginDate = new Date(beginYear, beginMonth, beginDayOfMonth);
    var beginTimeMilli = beginDate.getTime();

    // 当前时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth();
    var nowDayOfMonth = now.getDate();
    var nowTime = now.getTime();

    if (nowTime - beginTimeMilli > 0) {
      beginDate = now;
    }

    // 结束日期
    var endArr = end_time.split(" ")[0].split("-");
    var endYear = endArr[0];
    var endMonth = endArr[1] - 1;
    var endDayOfMonth = endArr[2];
    var endDate = new Date(endYear, endMonth, endDayOfMonth);
    var endTimeMilli = endDate.getTime();
    // 一天对应的毫秒数
    var oneDayMill = 24 * 60 * 60 * 1000;



    // 计算有多少天
    var len = endTimeMilli / oneDayMill - beginDate / oneDayMill + 1;
    var time = begin_time.split(" ")[1];

    var schedule = [];
    for (let i = 0; i < len && i < 3; i++) {
      var day = parseInt(beginDate.getDate()) + parseInt(i);
      var date = new Date(beginDate.getFullYear(), beginDate.getMonth(), day);
      var temp = (date.getMonth() + 1) + "月" + date.getDate() + "日 " + this.data.week[date.getDay()];
      schedule.push(temp);
    }

    this.setData({
      "schedule": schedule, "time": time
    });
    console.log("schedule: " + schedule);

  }
})