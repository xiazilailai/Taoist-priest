/**
 * Created by Administrator on 14-8-27.
 */
//var db1 = require("./db1.js");
//var db2 = require("./db2.js");
exports.show= function (req,res) {
  console.log(req.body);
    res.write("<div><p>fjdslkfjklsddls;fld</p></div>");
    res.end();
};
var userList = [];
var listIndex = 0;
var infoList = ["欢迎捞到我的世界，我哈哈哈！~"];
exports.getname = function(req,res){
    userList.push({
        username:""+listIndex,
        index:listIndex,
        req:req,
        res:res
    });
    res.json({username:listIndex+""});
    listIndex++;
};
exports.getInfo = function(req,res){
    var thisIndex = parseInt(req.body.username);
    if(userList[thisIndex] == undefined){
        res.json({todo:"getname"});
    }else{
        userList[thisIndex].req = req;
        userList[thisIndex].res = res;
    }

};
exports.sendInfo = function(req,res){
    var time = new Date();
    var timeY = time.getHours()<10 ? "0"+time.getHours() : time.getHours();
    var timeM = time.getMinutes()<10 ? "0"+time.getMinutes() : time.getMinutes();
    var timeD = time.getSeconds()<10 ? "0"+time.getSeconds() : time.getSeconds();
    infoList.push("<span style='font-size: 16px;font-weight: 700;color: #69d2e7;'>"+req.body.info+" </span><br/>     BY: UserNO."+req.body.username+" At: "+timeY+":"+timeM+":"+timeD);
//    console.log(userList.length);
    resAnyone(userList,infoList);
    res.json({result:"true"});
};
function resAnyone(userList,infoList){
    for(var i=0 ; i<listIndex;i++){
        if(userList[i]){
            userList[i].res.json(infoList);
        }
    }
}