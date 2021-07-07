// pages/aboutMy.js
let http = require("../../../configs/http");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,  //当前显示的滑块的下标
    pageData:[],
    isShow:true,
    userInfor:{},
    isLogin:false,
    scrollHeight:'calc( 100vh - 240rpx  )',
    scrollTop:0,
    sendData:[],
    likeData:[],
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.dynamic()
    
  },
  // 点击立即登陆获取用户头像信息
  toLogin(){
    let _this=  this;
    wx.navigateTo({
      url: '../login/login',
    })
   
  },
  

  // 点击退出登录
  quitLogin(){
    let _this = this;
    wx.showModal({
      title:"提示",
      content: "切换账号",
      cancelColor: "#e17808",
      success(res){
        if(res.confirm){
          _this.setData({
            'userInfor':{},
            'isLogin':false,
          });
          wx.removeStorage({
            key: 'isLogin',
            success(){
              wx.removeStorage({
                key: 'userInfo',
              })
            },
          })
        }
      },
    })
  },
// 动态栏下的数据
  dynamic(){
    var that = this;
    http.get("/dynite",{})
    .then(res =>{
      if(res.statusCode == 200 && res.data.code == 1){
        this.setData({
          "pageData":res.data.data,
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
  // 点击tab时根据点击的current参数切换对应滑块
  changeTabs(e){
    let cur = e.target.dataset.current;
    if(cur == this.data.current){
      return
    }
    this.setData({
      'current':cur,
      'isShow':true,
      'scrollTop':0,
    })
  },
  
  // 滑动滑块时根据current参数切换选中的tabbar
  changeSwiperItem(e){
    let cur = e.detail.current;
    this.setData({
      'current':cur,
      'isShow':true,
      'scrollTop':0,
    })
    
  },
  // 向上滑动多少距离时tab栏固定,头部信息隐藏
  scrolling(e){
    if(e.detail.scrollTop >= 400 ){
      this.setData({
        'isShow': false,
        'scrollHeight':'calc( 100vh - 100rpx )',
      })
    }else{
      this.setData({
        'scrollHeight':'calc( 100vh - 240rpx  )',
        'isShow': true
      })
    }
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
    wx.setTabBarStyle({
      color:"#000000",
      backgroundColor:"#fff"
    });

    let isLogin = wx.getStorageSync('isLogin');
    if(isLogin){
      let userInfor = wx.getStorageSync('userInfo');
      console.log(userInfor)
      this.setData({
        userInfor:userInfor,
        isLogin: true
      })
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

