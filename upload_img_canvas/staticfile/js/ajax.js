/**
 * Created by Administrator on 14-8-20.
 */
function ajax(method,action,reqstr,callbackfun){
    var xmlhttp = null;
    if(window.ActiveXObject){
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }else{
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4){
            if(xmlhttp.status == 200){
                callbackfun(xmlhttp.responseText);
            }
        }
    };
    var temp = action;
    if(method=="get"){
        temp+="?"+reqstr;
        xmlhttp.open(method,temp,true);
        xmlhttp.send();
    }else if(method=="post"){
        xmlhttp.open(method,temp,true);  /*     ===POST 协议必须在头里面用语句调用下面的应用===      */
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(reqstr);
    }
}
