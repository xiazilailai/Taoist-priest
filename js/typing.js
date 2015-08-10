/**
 * Created by nqmy on 2015/7/8.
 */
var colorList = ["#ff4400"];
function setColorList(list){
    colorList = list;
}
function typeIn(str){
    var cont = 0,len = colorList.length, strLen = str.length ;
    var mapId = setInterval(function(){
        if(cont < strLen){
            $(".js_typeIn").append('<span style="color: '+colorList[(cont+Math.floor(Math.random()*cont))%len]+'">'+str[cont]+'</span>');
            if(str[cont] == "\n"){
                $(".js_typeIn").append('<br/>');
            }
            $(".typeInMark").toggleClass("none");
        }else{
            if(cont%3 == 0) $(".typeInMark").toggleClass("none");
        }
        cont++;
        if(cont >= 100000000){
            cont = strLen;
        }
    },200);
}
setColorList([
    "#ff4400","#0CC2F3","#836828","#F3A231","#79FF90","#000000"
]);
typeIn("我是一条大鲨鱼\n宁尼玛是个大逗比，老干妈老干爹，哈哈哈哈");
