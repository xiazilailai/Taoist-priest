/**
 * Created by nqmy on 2015/7/10.
 * 各个窗口之间的通信 发布-订阅 模式
 * 一条发布 - 多条订阅
 */

window.top.Pub_Sub = {
    pub:function(channel , data){
        if(window.top.Pub_Sub[channel]){
            for (var index in window.top.Pub_Sub[channel]){
                window.top.Pub_Sub[channel][index](data);
            }
        }
    },
    sub:function(channel , index ,fun){
        if(window.top.Pub_Sub[channel]) {
            window.top.Pub_Sub[channel][index] = fun;
        }else{
            window.top.Pub_Sub[channel] = {};
            window.top.Pub_Sub[channel][index] = fun;
        }
    },
    dis:function(channel){
        if(window.top.Pub_Sub[channel]) window.top.Pub_Sub[channel] = null;
    }
};