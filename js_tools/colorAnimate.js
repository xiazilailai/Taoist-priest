/**
 * Created by nmy on 2014/11/21.
 *   颜色渐变 动画效果！
 */
/*
 *  自动将16进制转化为RGB格式！！！
 * */
var colorArray = [];var public_changeColorID;
colorArray["0"]=0;colorArray["1"]=1;colorArray["2"]=2;colorArray["3"]=3;colorArray["4"]=4;colorArray["5"]=5;
colorArray["6"]=6;colorArray["7"]=7;colorArray["8"]=8;colorArray["9"]=9;colorArray["a"]=10;colorArray["A"]=10;
colorArray["b"]=11;colorArray["B"]=11;colorArray["c"]=12;colorArray["C"]=12;colorArray["d"]=13;colorArray["D"]=13;
colorArray["e"]=14;colorArray["E"]=14;colorArray["f"]=15;colorArray["F"]=15;
function colorTransfer(str){//16进制颜色值 转换为 10进制颜色值
    var clipStr = str.replace("#","");    var strs = clipStr.split("");
    var RGBstr = "rgb("+(colorArray[strs[0]]*16+colorArray[strs[1]])+","+(colorArray[strs[2]]*16+colorArray[strs[3]])+","+(colorArray[strs[4]]*16+colorArray[strs[5]])+")";
    return RGBstr;
}
function cutRgb(rgb){
    var str = rgb.split("(")[1].split(")")[0];
    var RGB = [];
    RGB[0] =parseInt(str.split(",")[0]);
    RGB[1] =parseInt(str.split(",")[1]);
    RGB[2] =parseInt(str.split(",")[2]);
    return RGB;
}
function colorAnimate(node,from,to,time){// 背景色渐变动画 方法colorAnimate（）
    clearInterval(public_changeColorID);
    var reg = /^#/;
    var fromRgb,toRgb;
    if(reg.test(from)){
        fromRgb = colorTransfer(from);
    }else{
        fromRgb = from;
    }
    if(reg.test(to)){
        toRgb = colorTransfer(to);
    }else{
        toRgb = to;
    }
    if(time){
        var Time = parseInt(time);
    }else{
        var Time = 200;
    }
    var Node = node;
    var R = cutRgb(fromRgb)[0];
    var G = cutRgb(fromRgb)[1];
    var B = cutRgb(fromRgb)[2];
    var r = cutRgb(toRgb)[0]-cutRgb(fromRgb)[0];
    var g = cutRgb(toRgb)[1]-cutRgb(fromRgb)[1];
    var b = cutRgb(toRgb)[2]-cutRgb(fromRgb)[2];
    var c_ter = Time/10;
    var i=0;
    public_changeColorID = setInterval(function(){
        i++;
        Node.style.backgroundColor = "rgb("+parseInt(R+(r/c_ter)*i)+","+parseInt(G+(g/c_ter)*i)+","+parseInt(B+(b/c_ter)*i)+")";
        if(i >= c_ter){
            clearInterval(public_changeColorID);
        }
    },10);
}
