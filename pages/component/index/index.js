// index.js
// 获取应用实例
let http = require("../../../configs/http")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstPageData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.get("/firstDataInfo",{})
    .then(res =>{
      if(res.statusCode == 200 && res.data.code == 1){
        this.setData({
          "firstPageData":res.data.data
        })
      }
     
      console.log(this.data.firstPageData)
    })
    .catch(err =>{
      wx.showToast({
        title: '失败',
        icon: 'error',
        duration: 2000
      })
    })
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
