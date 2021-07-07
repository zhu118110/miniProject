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
    isShowTopLoading:false,  //触发下拉加载时loading动画是否显示
    isPullDown:false,  //禁止频繁下拉刷新
    tabsIndex:1,   //控制头部tab选中状态
    capsuleWidth:100,
    capsuleRight:20,
    background:"#fff",
    isShowDownLoading: false,
    pageSize:1
  },
  // 点击切换头部tabs选中状态
  changeTabas(e){
    let tabIndex = e.currentTarget.dataset.index;
    this.setData({
      'tabsIndex': tabIndex
    });
    if(tabIndex == 2){
      wx.navigateTo({
        url: '../videos/video',
      })
    }
  },
  
  // 点击搜索框时跳转到搜索页面
  tabSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 刚进入页面时加载数据
  // @params flag:true时代表执行得是上拉刷新,数据从前面插入;默认false
  initData(flag){
    http.get("/firstDataInfo",{})
    .then(res =>{
      if(res.statusCode == 200 && res.data.code == 1){
        if(!flag){
          this.setData({
            "firstPageData":res.data.data,
            'isShowTopLoading':false,
            'isPullDown':false
          })
        }else{
          // 上拉加载时执行
          let data = this.data.firstPageData;
          data.push(...res.data.data)
          this.setData({
            "firstPageData":data,
            'isShowDownLoading':false,
            'isPullDown':false
          })
        }
       
      }
    })
    .catch(err =>{
      wx.showToast({
        icon: 'none',
        title: '请求失败',
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
      'isShowTopLoading':true,
      'isPullDown':true,
      pageSize:1
    });
    this.initData();
    
  },
  // 上拉加载
  onReachBottom(){
    if(this.data.isPullDown === true || this.data.pageSize == 4){
      return false;
    }
    let pageSize = this.data.pageSize;
    pageSize+=1
    this.setData({
      'isShowDownLoading':true,
      'isPullDown':true,
      pageSize:pageSize
    });
    this.initData(true)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let rect = app.globalData.capsule;
    this.setData({
      navHeight:app.globalData.navHeight,
      capsuleWidth:rect.capsuleWidth, //胶囊宽度
      capsuleRight: rect.capsuleRight //胶囊与屏幕右边距离
    });
    this.initData();
  },

  onShow:function(){
    wx.setTabBarStyle({
      color:"#000000",
      backgroundColor:"#fff"
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   this.pullDownData()
  },
})
