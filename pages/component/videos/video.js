// pages/component/videos/video.js
const http = require("../../../configs/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoInfor: null, //存放视频信息
    sliderValue: 0,
    isChange: false,
    current: 0,
    videoplayer: {},
    videoComment: {},
    comVal: "",
    dialogIsShow: false,
  },
  swiperItemChange(e) {
    let cur = e.detail.current;
    this.data.videoplayer['videoplayer' + this.data.current].pause()
    this.setData({
      current: cur
    })
  },
  getVideo() {
    let _this = this;
    let videoArr = [];
    for (let i = 0; i <= 5; i++) {
      wx.request({
        url: 'https://api.iyk0.com/weishi/',
        method: "GET",
        timeout: 10000,
        success: function (res) {
          if (res.statusCode == 200 && res.data !== null) {
            videoArr.push(res.data)
            videoArr.forEach((val, index) => {
              val.isChange = false;
              val.sliderValue = 0;
              val.isPlaying = false; //是否是播放状态
              val.isPaused = false; //是否是暂停状态
              val.isEnd = false; //是否播放结束
              val.dialogShow = false; //是否出现评论列表
              val.nice = false,  //是否点赞
              _this.data.videoplayer['videoplayer' + index] = wx.createVideoContext('videoplayer' + index);
            })

            _this.setData({
              'videoInfor': videoArr
            })
          }
          wx.hideLoading();
        },
        fail: function (err) {
          wx.hideLoading();
        }
      })
    }
  },
  // 获取评论
  getComment(i) {
    let _this = this;
    http.comment()
      .then(res => {
        if (res.statusCode == 200) {
          let myData = res.data.data;
          _this.setData({
            [`videoComment[${i}].myData`]: myData
          })
        }
      })
  },
  // 点击封面图根据下标让视频播放
  tapFaceImg(e){
    let index = e.currentTarget.dataset.index;
    this.data.videoplayer['videoplayer' + index].play();
    let videoInfor = this.data.videoInfor;
    videoInfor[index].isPlaying = true;
    this.setData({
      'videoInfor': videoInfor
    })
  },
  // 视频播放时根据播放时长改变进度条位置
  videoUpdate(e) {
    let index = e.currentTarget.dataset.index;
    let sliderValue = e.detail.currentTime / e.detail.duration * 100;
    let videoInfor = this.data.videoInfor;
    videoInfor[index].sliderValue = sliderValue;
    videoInfor[index].duration = e.detail.duration;
    this.setData({
      'videoInfor': videoInfor
    })
  },
  // 视频播放结束时触发,出现重新播放按钮
  videoEnd(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`videoInfor[${index}].isEnd`]: true,
      [`videoInfor[${index}].isPaused`]: false
    })
  },
  // 点击重新播放按钮时根据下标让视频重新播放
  againPlay(e) {
    let index = e.currentTarget.dataset.index;
    this.data.videoplayer['videoplayer' + index].play();
    this.setData({
      [`videoInfor[${index}].isEnd`]: false
    })
  },
  // 视频暂停播放时出现暂停按钮
  videoPaused(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`videoInfor[${index}].isPaused`]: true
    })
  },
  // 点击暂停播放按钮让视频播放
  continuePlay(e) {
    let index = e.currentTarget.dataset.index;
    this.data.videoplayer['videoplayer' + index].play();
    this.setData({
      [`videoInfor[${index}].isPaused`]: false
    })
  },
  videoPlay(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`videoInfor[${index}].isPaused`]: false,
      [`videoInfor[${index}].isEnd`]: false
    })
  },
  videoWait(e) {
    console.log(e.currentTarget.dataset.index)
  },
  // 点击分享:1或者点赞:2按钮时判断是否登录
  checkIsLogin(e){
     // 判断是否登录
     let isLogin = wx.getStorageSync('isLogin');
     let num = e.currentTarget.dataset.num;
     let index = e.currentTarget.dataset.index;
     if (!isLogin) {
       wx.navigateTo({
         url: '../../component/login/login',
       });
       return;
     }
    //  切换视频点赞样式
     if(num == 2){
       let data = this.data.videoInfor;
       data[index].nice == false ? data[index].nice = true : data[index].nice = false;
       this.setData({
        videoInfor: data
      });
     }
  },
  // 点击评论出现模态对话框，并请求评论数据
  showDialog(e) {
    let index = e.currentTarget.dataset.index;
    // 判断是否登录
    let isLogin = wx.getStorageSync('isLogin')
    if (!isLogin) {
      wx.navigateTo({
        url: '../../component/login/login',
      });
      return;
    }
    this.setData({
      [`videoInfor[${this.data.current}].dialogShow`]: true,
      'dialogIsShow': true
    });
    // 防止每次请求接口渲染数据
    if (this.data.videoComment[this.data.current]) {
      console.log("有数据了")
    } else {
      this.getComment(this.data.current)
    }
  },
  closeDialog(e) {
    // let index = e.currentTarget.dataset.index;

    this.setData({
      [`videoInfor[${this.data.current}].dialogShow`]: false,
      'dialogIsShow': false
    });
  },
  comInput(e) {
    let val = e.detail.value;
    this.setData({
      comVal: val
    })
  },
  // 点击评论输入框的发送按钮
  sendCommon(e) {
    let _this = this;
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: "您的评论为:" + _this.data.comVal,
      complete() {
        _this.setData({
          comVal: ""
        })
      },
    })
  },
  // 拖动过程中触发
  sliderChanging() {
    // this.setData({
    //   'isChange': false //拖拽过程中，不允许更新进度条
    // })
  },
  // 进度条拖动完毕时触发
  slideChange(e) {
    let index = e.currentTarget.dataset.index;
    this.data.videoplayer['videoplayer' + index].seek(e.detail.value / 100 * this.data.videoInfor[index].duration); //完成拖动后，计算对应时间并跳转到指定位置
    let videoInfor = this.data.videoInfor;
    videoInfor[index].sliderValue = e.detail.value;
    videoInfor[index].isChange = true;
    this.setData({
      'videoInfor': videoInfor,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getVideo()
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
      color: "#ffffff",
      backgroundColor: "#000000"
    });
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