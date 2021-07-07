const http = require("./http");

let hotModeApi="/hotSearch";
function hotMode(){
  return http.get(hotModeApi,{})
};
// 登录接口参数是code
let loginApi="/login";
function login(params){
  return http.post(loginApi,params)
};

// 获取评论
let commentApi="/pl";
function comment(){
  return http.get(commentApi)
};

// 推荐
let referralApi = "/firstDataInfo";
function referral(){
  return http.get(referralApi)
};
module.exports={
  hotMode,
  login,
  comment,
  referral
}