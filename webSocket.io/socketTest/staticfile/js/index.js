/**
 * Created by nqmy on 2015/5/29.
 */

var msgNode = $("#msg");
var nickNode = $("#niceValue");
function exec_( cmdstr , options ,context ){
    if(!options){ options = []; }
    if(!context){ context = window; }
        try{
            eval(cmdstr).apply(context,options);
        }catch (e){
            cmdstr.apply(context,options);
        }
}
function msg(str){
    var tempNode = document.createElement("div");
    tempNode.innerHTML = '<p style="color: #f3a231;font-size: 12px;"><span>▶ </span>'+str.nick+'：</p><p style="color: #ffffff;font-size: 14px;">'+str.tell+'</p>';
    this.append(tempNode);
    $(tempNode).slideDown("fast",function(){
        tempNode = null;
    });
}
function selfMsg(str){
    var tempNode = document.createElement("div");
    tempNode.innerHTML = '<p style="text-align: right;">'+str+'<span style="color: #0cc2f3">◀ </span></p>';
    this.append(tempNode);
    $(tempNode).slideDown("fast",function(){
        tempNode = null;
    });
}
function welcome(str){
    var tempNode = document.createElement("div");
    tempNode.innerHTML = '<p><span style="color: #0cc2f3">▶ </span>'+str+'</p>';
    this.append(tempNode);
    $(tempNode).slideDown("fast",function(){
        tempNode = null;
    });
}
function warn(str){
    alert(str);
}
var socket = io.connect('http://192.168.1.119:8000',{'reconnect':false,'auto connect':false} );
socket.on("welcome",function(data){
    var name;
    for( name in data){
        exec_(""+name , [data[name]] , $("#msgBody"));
    }
});
socket.on("accept",function(data){
    var name;
    for( name in data){
        exec_(""+name , [data[name]] , $("#msgBody"));
    }
});
function sendSocket(){
    socket.emit("newMsg",{"msg":""+msgNode.val()});
    msgNode.val("");
}
msgNode.on("keydown",function(e){
    var kCode = e.keyCode;
    if(kCode == 13){
        sendSocket();
    }
});
function setNick(){
    socket.emit("nick",nickNode.val());
    nickNode.val("");
    msgNode.focus();
}
nickNode.on("keydown",function(e){
    var kCode = e.keyCode;
    if(kCode == 13){
        setNick();
    }
});
function hiddeNick(){
    $(".nickName").addClass("none");
    msgNode.focus();
}
function disc(){
    //console.log("disconnect");
    //console.log(io);
    io.disconnect();
}