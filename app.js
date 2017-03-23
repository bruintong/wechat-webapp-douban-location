App({
    globalData: {
        userInfo: undefined,
        latitude: undefined,
        longitude: undefined,
        windowWidth: undefined,
        windowHeight: undefined,
        locs: undefined,
        currentLoc: undefined,
        city: undefined,
        reflesh: false,
        locId: undefined,
        eventCategory: undefined,
        slogan: "在这陌生的城市里能与你相遇，真好",
        doubanBase: "https://api.douban.com",
        loc_list_url: "/v2/loc/list",
        loc_url: "/v2/loc/",
        event_list_url: "/v2/event/list",
        event_url: "/v2/event/"
    },
    onLaunch: function () {
        // Do something initial when launch.
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.globalData.windowWidth = res.windowWidth;
                that.globalData.windowHeight = res.windowHeight;
            }
        });
    },
    onShow: function () {
        // Do something when show.
    },
    onHide: function () {
        // Do something when hide.
    },
    onError: function (msg) {
        console.log(msg)
    },
    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo);
        } else {
            wx.login({
                success: function (res) {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                        }
                    });
                }
            });
        }
    },
    getLocation: function () {
        var that = this;
        wx.getLocation({
            type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function (res) {
                that.globalData.latitude = res.latitude;
                that.globalData.longitude = res.longitude;
            }
        })
    },

})