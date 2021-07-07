// pages/component/login/login.js
const app = getApp();
const http = require("../../../configs/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfor(e){
    wx.getUserProfile({
      desc: '获取您的头像信息',
      success:function(res){
        console.log(res)
        wx.setStorageSync('isLogin',true);
        wx.setStorageSync('userInfo',res.userInfo);
        app.globalData.isLogin = true;
        app.globalData.userInfo = res.userInfo;
        let pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; // 上一个页面
        prevPage.setData({
          isLogin:true
        });
        wx.navigateBack({
          delta: 1,
        })
      },
      fail:function(err){
        if(err.errMsg){
          wx.showToast({
            title: '您已拒绝授权获取信息',
            icon:"none",
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1800);
        }
      }
    })
    
  },
  getavtor(){
    wx.getUserProfile({
      desc: '获取您的头像信息',
      success:function(res){
        console.log(res)
        wx.setStorageSync('isLogin',true);
        wx.setStorageSync('userInfo',res.userInfo);
        app.globalData.isLogin = true;
        app.globalData.userInfo = res.userInfo;
        // let pages = getCurrentPages();
        // var prevPage = pages[pages.length - 2]; // 上一个页面
        // prevPage.setData({
        //   isLogin:true
        // });
        // wx.navigateBack({
        //   delta: 1,
        // })
      },
      fail:function(err){
        if(err.errMsg){
          wx.showToast({
            title: '您已拒绝授权获取信息',
            icon:"none"
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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