const http = require("./http");

let hotModeApi="/hotSearch";
function hotMode(){
  return http.get(hotModeApi,{})
};

module.exports={
  hotMode
}