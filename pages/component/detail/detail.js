const http = require("../../../configs/api")
// pages/component/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:[],
    referralData:[],  //推荐数据,
    imgNumber:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let infor = wx.getSystemInfoSync();  
    let MenuButton = wx.getMenuButtonBoundingClientRect();
    console.log(infor)
    console.log(infor.screenHeight -  infor.windowHeight)

    // 获取要展示得详细数据
    let data = JSON.parse( decodeURIComponent(options.data) );
    let arr = [];
    arr.push(data);
    
    this.setData({
      detailData:arr,
      imgNumber:arr[0].imgArr.length
    });
    // 获取推荐内容
    this.getReferralData();
  },
  // 获取推荐内容
  getReferralData(){
    http.referral()
    .then(res =>{
      if(res.data.code == 1){
        let data = res.data.data;
        this.setData({
          referralData:data
        })
      }
    })
    .catch(err =>{
      wx.showToast({
        title: '加载失败',
        icon:"error"
      })
    })
  },
  // 预览图片
  previeImg(e){
    let arr = this.data.detailData[0].imgArr;
    wx.previewImage({
      urls: arr,
      showmenu: false
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