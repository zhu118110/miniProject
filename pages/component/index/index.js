// index.js
// 获取应用实例
let http = require("../../../configs/http")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:"60",
    firstPageData:[],
    isShow:false,  //触发下拉加载时loading动画是否显示
    isPullDown:false,  //禁止频繁下拉刷新
    tabsIndex:1,   //控制头部tab选中状态
    capsuleWidth:100,
    capsuleRight:20
  },
  // 点击切换头部tabs选中状态
  changeTabas(e){
    let tabIndex = e.currentTarget.dataset.index;
    this.setData({
      'tabsIndex': tabIndex
    })
  },

  // 点击搜索框时跳转到搜索页面
  tabSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 刚进入页面时加载数据
  initData(){
    http.get("/firstDataInfo",{})
    .then(res =>{
      if(res.statusCode == 200 && res.data.code == 1){
        this.setData({
          "firstPageData":res.data.data
        })
      }
    })
    .catch(err =>{
      wx.showToast({
        title: '失败',
        icon: 'error',
        duration: 2000
      })
    })
  },
  // 下拉获取更多数据
  pullDownData(){
    if(this.data.isPullDown === true){
      return false;
    }
    this.setData({
      'isShow':true,
      'isPullDown':true
    });
    this.initData();
    let _this = this;
    setTimeout(function () {
      _this.setData({
        'isShow':false,
        'isPullDown':false
      })
    }, 2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let rect = app.globalData.capsule;
    console.log(rect)
    this.setData({
      navHeight:app.globalData.navHeight,
      capsuleWidth:rect.capsuleWidth, //胶囊宽度
      capsuleRight: rect.capsuleRight //胶囊与屏幕右边距离
    });
    console.log( this.data.capsuleWidth, this.data.capsuleRight,)
    this.initData();
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   this.pullDownData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

 
})
