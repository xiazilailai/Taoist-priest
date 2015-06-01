/**
 * Created by nqmy on 2015/5/29.
 */
var socketList = [];
var nameList = [];
exports.onConnect = function(socket){
    var nickName = "";
    socket.on("nick",function(data){
        if(data !=""){
            if(nameList.length>=50){
                socket.emit("accept",{"warn":"人数已满"});
                socket.disconnect();
                return;
            }
            for(var i = 0 ; i < nameList.length ;i++){
                if(nameList[i] == data){
                    socket.emit("accept",{"warn":"昵称已被占用"});
                    return;
                }
            }
            nickName = data;
            nameList.push(nickName);
            socket.name = nickName;
            socket.index = nameList.length-1;
            socketList.push(socket);
            socket.emit("welcome",{"welcome":nickName+"  欢迎你加入聊天！","hiddeNick":""});
            var newMsg = function(data){
                socket.broadcast.emit("accept",{"msg": {nick:nickName , tell : data.msg} });
                socket.emit("accept",{"selfMsg":data.msg});
            };
            socket.on("newMsg",newMsg);
        }else{
            socket.emit("accept",{"warn":"昵称不可为空"});
        }
        socket.on("disconnect",function(){
            if(socket.name && socket.name != ""){
                socketList.splice( socket.index ,1);
                nameList.splice( socket.index , 1);
            }
        })
    });
};
