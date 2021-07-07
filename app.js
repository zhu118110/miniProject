const http = require("./configs/api");

App({

  onLaunch() {
    // 监听网络
    wx.onNetworkStatusChange((result) => {
      if (!result.isConnected) {
       this.globalData.isConnected = false;
       wx.showToast({
        title:"没有网络",
        icon: 'error',
       })
      }
    })
    wx.login({
      success({code}){
        http.login({code})
        .then(res =>{
          console.log(res.data.data)
          wx.setStorageSync('session_key', res.data.data.session_key);
          wx.setStorageSync('openid', res.data.data.openid)
        })
      },
    })
  },
  globalData: {
    isLogin:false,  //是否登录
    isConnected:true,
    navHeight: 40, //自定义导航栏的高度
    navBackground: "#fff", // 导航栏背景色  
  }
})