// pages/aboutMy.js

import { toBarcode } from '../../../configs/code';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const code = '1221334122546765342'; 
    toBarcode('barcode', code , 600, 200);
    
// const codeStr = `${code.slice(0, 4)}****${code.slice(20)}`;
  },
  byn(){
    // 允许从相机和相册扫码
    let _this = this;
    wx.scanCode({
      scanType:['barCode'],
      success (res) {
        _this.setData({
          aa:res.result
        })
        console.log(res)
      }
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