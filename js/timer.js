/**
 * Created by nqmy on 2015/7/24.
 * @ numArr 数字数组
 */
var numArr = [
    [ 1 , 1 , 1//0
    , 1 , 0 , 1
    , 1 , 0 , 1
    , 1 , 0 , 1
    , 1 , 1 , 1],
    [0 , 1 , 0//1
    , 0 , 1 , 0
    , 0 , 1 , 0
    , 0 , 1 , 0
    , 0 , 1 , 0],
    [1 , 1 , 1//2
    , 0 , 0 , 1
    , 1 , 1 , 1
    , 1 , 0 , 0
    , 1 , 1 , 1],
    [1 , 1 , 1//3
    , 0 , 0 , 1
    , 1 , 1 , 1
    , 0 , 0 , 1
    , 1 , 1 , 1],
    [1 , 0 , 1//4
    , 1 , 0 , 1
    , 1 , 1 , 1
    , 0 , 0 , 1
    , 0 , 0 , 1],
    [1 , 1 , 1//5
    , 1 , 0 , 0
    , 1 , 1 , 1
    , 0 , 0 , 1
    , 1 , 1 , 1],
    [1 , 1 , 1//6
    , 1 , 0 , 0
    , 1 , 1 , 1
    , 1 , 0 , 1
    , 1 , 1 , 1],
    [1 , 1 , 1//7
    , 0 , 0 , 1
    , 0 , 0 , 1
    , 0 , 0 , 1
    , 0 , 0 , 1],
    [1 , 1 , 1//8
    , 1 , 0 , 1
    , 1 , 1 , 1
    , 1 , 0 , 1
    , 1 , 1 , 1],
    [1 , 1 , 1//9
    , 1 , 0 , 1
    , 1 , 1 , 1
    , 0 , 0 , 1
    , 1 , 1 , 1]
];

var timerID ;
var node0 = $(".numBox:eq(0)"),node1 = $(".numBox:eq(1)"),node2 = $(".numBox:eq(2)"),node3 = $(".numBox:eq(3)"), beNum = $(".beNum");
function runTime(){
    drawTimer();
    if(timerID) clearInterval(timerID);
    timerID = setInterval(drawTimer,900);
}
function drawTimer(){
    var date = new Date();
    var h = date.getHours(), m = date.getMinutes();
    h = h > 9 ? "" + h : "0" + h;
    m = m > 9 ? "" + m : "0" + m;
    var num0 = parseInt(h[0]),num1 = parseInt(h[1]),num2 = parseInt(m[0]),num3 = parseInt(m[1]);
    node0.children(".numPoint").each(function(i){
        if(numArr[num0][i]){
            $(this).addClass("light");
        }else{
            $(this).removeClass("light");
        }
    });
    node1.children(".numPoint").each(function(i){
        if(numArr[num1][i]){
            $(this).addClass("light");
        }else{
            $(this).removeClass("light");
        }
    });
    node2.children(".numPoint").each(function(i){
        if(numArr[num2][i]){
            $(this).addClass("light");
        }else{
            $(this).removeClass("light");
        }
    });
    node3.children(".numPoint").each(function(i){
        if(numArr[num3][i]){
            $(this).addClass("light");
        }else{
            $(this).removeClass("light");
        }
    });
    beNum.children(".numPoint").toggleClass("light");
}
runTime();
