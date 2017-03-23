# 微信小程序版豆瓣同城
## 概述
微信小程序版豆瓣同城（非官方出品）
- 数据来源：[豆瓣同城API](https://developers.douban.com/wiki/?title=event_v2)
- 开发工具：微信开发者工具 0.14.140900


## 功能
- 活动列表
- 城市切换
- 活动筛选
- 活动详情

## 预览

　　活动列表页：用户点击进入程序后，获取用户的定位信息，并向服务器请求用户所在城市的前50个活动。如果用户所在城市不支持同城活动，则显示深圳的活动列表。活动按照类型分类，如果某种类型的活动不满4个则不显示，点击更多进入分类筛选并请求该类型的前20个活动。

![活动列表](https://github.com/bruintong/resource/blob/master/screenshots/wechat-webapp-douban-location/event-list.gif)

　　城市切换页：显示所有支持同城活动的城市列表。城市列表按照字母顺序排序，支持拼音跟中文搜索，点击城市后，返回主页并且显示该城市的活动列表。
        
![城市切换](https://github.com/bruintong/resource/blob/master/screenshots/wechat-webapp-douban-location/select-city.gif)
 
 　　活动筛选页：用户可以搜索某一类型的活动，支持按活动类型搜索跟按时间搜索。
 
 ![活动筛选](https://github.com/bruintong/resource/blob/master/screenshots/wechat-webapp-douban-location/select-category.gif)
 
 　　活动详情页：显示活动的内容，点击图片可以查看该图片，支持图片下载。用户可以发表活动评论，但不能上传到服务器，API接口不支持。显示活动地址，拨打客服热线，显示活动内容信息。活动内容是服务器编译好的静态页面，微信小程序不支持WebView，所以活动内容中会出现网页标签。
 
 ![活动详情](https://github.com/bruintong/resource/blob/master/screenshots/wechat-webapp-douban-location/event-detail.gif)
 
## 其他
声明：非豆瓣官方出品，引用请注明出处

## License
MIT
