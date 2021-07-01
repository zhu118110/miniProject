// pages/component/search/search.js
const http = require("../../../configs/api");
const app = getApp();
const searchApi = 'https://res.abeim.cn/api-baidu_keyword';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsuleWidth:100,
    capsuleRight:10,
    hotMode:[],
    timer:null,
    inputVal:"",
  },

  navigateBack(){
    wx.navigateBack({
      delta: 0,
    })
  },
  
  // 搜索框输入内容时显示
  insert(e){
    if (this.timer) {
      clearTimeout(this.timer)
    };
    let value = e.detail.value;
    this.setData({
      'inputVal':value
    });
    if(value==""){
      return
    }
    this.timer =setTimeout(()=>{
      wx.request({
        method: "GET",
        url: searchApi + "?wd=" + value,
        success: function (res) {
          console.log(res)
        }
      })
    },800)
    
    
  },
  
  // 点击输入框右侧清除图标清除内容
  clearValue(){
    this.setData({
      'inputVal': ""
    });
  },
  // 热门榜单
  hotMode(){
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url:"https://res.abeim.cn/api-weibo_hot",
      data:{},
      method : 'GET',
      success:function(res){
        console.log(res);
        if(res.data.code == 200){
          _this.setData({
            'hotMode': res.data.data
          })
          wx.hideLoading()
        }
      },
      fail:function(err){
        console.log (err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let rect = app.globalData.capsule;
    this.setData({
      capsuleWidth:rect.capsuleWidth, //胶囊宽度
      capsuleRight: rect.capsuleRight //胶囊与屏幕右边距离
    });

    this.hotMode();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  
})