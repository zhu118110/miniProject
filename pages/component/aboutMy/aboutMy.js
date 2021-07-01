// pages/aboutMy.js
let http = require("../../../configs/http")
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
    scrollHeight:'calc( 100vh - 360rpx  )',
    scrollTop:0,
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
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        _this.setData({
         'userInfor.avatarUrl': res.userInfo.avatarUrl,
         'userInfor.nickName': res.userInfo.nickName,
       })
      }
    })
  },
  // 子组件点击登陆时从子组件中获取用户信息
  myLogin(e){
    console.log(e.detail.userInfor);
    this.setData({
      'userInfor.avatarUrl': e.detail.userInfor.userInfo.avatarUrl,
      'userInfor.nickName': e.detail.userInfor.userInfo.nickName,
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
          })
        }else if (res.cancel) {
          console.log('用户点击取消')
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
        'scrollHeight':'calc( 100vh - 216rpx )',
      })
    }else{
      this.setData({
        'scrollHeight':'calc( 100vh - 360rpx  )',
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

