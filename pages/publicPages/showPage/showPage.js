// pages/publicPages/show-page/show-page.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageData: {
      value: [],
      type: Array
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    navHeight: 40,
    lineNum: 2,
  },

  /**
   * 组件的方法列表
   */
  methods: {
  
    // 点击关注
    careAbout(e) {
      let index = e.currentTarget.dataset.index;
      // 没有登录则跳转到登录页，否则切换是否关注
      let isLogin = wx.getStorageSync('isLogin')
      if (!isLogin) {
        wx.navigateTo({
          url: '../../component/login/login',
        })
      } else {
        let data = this.data.pageData
        data[index].care == 1 ? data[index].care = 0 : data[index].care = 1;
        this.setData({
          pageData: data
        })
      }
    },
    // 根据下标跳转到详情页
    toDetail(e) {
      let index = e.currentTarget.dataset.index;
      let _data = encodeURIComponent(JSON.stringify(this.data.pageData[index]));
      wx.navigateTo({
        url: '../../component/detail/detail?data=' + _data,
      })
    },
    // 图片加载完成
    imgLoad(e) {
      // let index = e.target.dataset.imgindex;
      // let data = this.data.pageData;
      // data[index].showImg = true
      // this.setData({
      //   pageData: data
      // })
    },
    imgError(e) {
      let index = e.target.dataset.imgindex;
      // this.setData({
      //   [`pageData[${index}].isloding`]: false,
      //   [`pageData[${index}].islosed`]: true
      // })
    },
  },
  lifetimes: {
    attached() {
      // 设置导航栏高度
      this.setData({
        navHeight: app.globalData.navHeight,
      });
   
    },
  },
  pageLifetimes:{
    show(){
     
    },
  }

})