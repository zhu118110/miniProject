// pages/publicPages/show-page/show-page.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageData:{
      value:[],
      type:Array
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    navHeight:40,
    lineNum:2,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    open(){
      const query = wx.createSelectorQuery();
      query.select(".article").boundingClientRect();
      query.exec(res => {
        
        // const LineHeight = 30; // 行高
        // const LineNum = res[0].height / LineHeight; // 行数
        // if (LineNum < 5) {
        //     this.setData({
        //         lineNum: LineNum
        //     });
        // }
      });

    }
  },
  lifetimes: {
    attached(){
      this.setData({
        navHeight : app.globalData.navHeight,
      });
      
    },
  },

  pageLifetimes:{
    show(){
      this.open()
    }
  }

})