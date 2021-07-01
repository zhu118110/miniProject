// pages/publicPages/header/header.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    height:"40",  //默认高度是40px
    statusHeights:"6",
    capsuleTop:0,
    capsuleWidth:100,
    capsuleRight:20
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
        height:height,
        capsuleTop: rect.top - statuHeight, //胶囊与状态栏距离
        capsuleWidth:rect.width, //胶囊宽度
        capsuleRight: rect.right //胶囊与屏幕右边距离
      });
      
      app.globalData.navHeight = height;  //导航栏高度
      app.globalData.capsule={
        capsuleHeight:  rect.height,   //胶囊高度
        capsuleWidth: rect.width,  //胶囊宽度
        capsuleTop : rect.top - statuHeight,   //胶囊与状态栏距离
        capsuleRight : rect.right   //胶囊与屏幕右边距离
      }
      console.log(app.globalData)
    }
  }
})
