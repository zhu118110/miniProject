// pages/publicPages/header/header.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    height:"40",  //默认高度是40px
    statusHeights:"6",
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
  },
  lifetimes:{
    attached(){
      let statuHeight = wx.getSystemInfoSync().statusBarHeight;   //状态栏高度
      let rect = wx.getMenuButtonBoundingClientRect();
      // （胶囊距离顶部 - 状态栏高度*2） + 胶囊高度 + 状态栏高度
      let height = (rect.top - statuHeight)*2 + rect.height + statuHeight;
      this.setData({
        statusHeights:statuHeight,
        height:height
      });
      app.globalData.navHeight = height;
    }
  }
})
