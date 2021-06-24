let baseUrl = "https://mobile-ms.uat.homecreditcfc.cn/mock/60d2afe44a9639001d427eed/mini"
function get(url,params){
  return new Promise( (resolve,reject) =>{
    wx.request({
      url:baseUrl + url,
      data:params,
      method : 'GET',
      success:function(data){
        resolve (data) 
      },
      fail:function(err){
        reject (err)
      }
    })
  })
}

function post(url,params){
  return new Promise( (resolve,reject) =>{
    wx.request({
      url:baseUrl + url,
      data:params,
      method : 'POST',
      success:function(data){
        resolve (data) 
      },
      fail:function(err){
        reject (err)
      }
    })
  })
}

module.exports = {
  get,
  post
};