/**
 * Created by nqmy on 2015/6/5.
 */
var sideCanvas = document.getElementById("canPre");
var sideCtx = sideCanvas.getContext("2d");
sideCanvas.width = window.innerWidth || 1024;
//sideCanvas.height = window.innerHeight || 768;
function resetCan(){
    sideCanvas.width = window.innerWidth || 1024;
    //sideCanvas.height = window.innerHeight || 768;
}
var sideW = sideCanvas.width, sideH = sideCanvas.height;
var tempArr = sideCtx.getImageData(0 , 0 , sideW , sideH );

var text = "type...";
var textColor = "rgba(0,0,0,255)";
var gradient=sideCtx.createLinearGradient(0,0,sideW,0);
gradient.addColorStop("0","#FFF");
gradient.addColorStop("0.5","#f93");
gradient.addColorStop("1.0","#CF9");


function writeText(str , color){//写字
    sideCtx.fillStyle = color;
    //sideCtx.textAlign = "center";
    //sideCtx.textBaseline = "top";
    sideCtx.font = "normal normal 800 200px/200px 楷体";
    tw = sideCtx.measureText(str).width;
    step = 128 * Math.ceil(tw/100);
    appendSide(step);
    tw = tw > sideW  ? sideW  : tw;
    sideCtx.fillText( str ,10 + (sideW - tw)/2 , sideH/2-50 , sideW-20);
}
function transformData(arr){
    var i , len = arr.length ,  tempArr = [] , tempStr = 'rgba(';
    for( i = 0 ; i < len ; i++){
        if((i+1)%4 == 0){
            tempStr+= arr[i] +')';
            if(tempStr == textColor){
                tempArr.push({
                    x:((i+1)/4)%(sideW)
                    ,y:Math.floor(((i+1)/4)/sideW)
                    ,color:tempStr
                });
            }
            tempStr = 'rgba(';
        }else{
            tempStr+= arr[i] +',';
        }
    }
    return tempArr;
}
var checkArr = [];
var tw, step;
function changeCheckArr(text){
    writeText(text , textColor);
    checkArr = transformData(sideCtx.getImageData(0 , 0 , sideW ,sideH).data);
    sideCtx.clearRect(0 , 0 , sideW , sideH);
}
function Side(sideCtx , color ,x , y){
    var temp = this;
    this.x = x;
    this.y = y;
    this.normalSpeed = 3+Math.random();
    this.speed = this.normalSpeed;
    this.draw = function(){
        sideCtx.beginPath();
        sideCtx.fillStyle = color;
        sideCtx.arc(this.x , this.y , 5 , 0 , 3.14*2);
        sideCtx.fill();
        sideCtx.closePath();
    };
    this.moveTo = function(tx , ty , time ){
        var dx = Math.round(tx - this.x);
        var dy = Math.round(ty - this.y);
        time = time || 200;
        if(this.x != tx){
            this.x += dx/(time/25);
        }
        if(this.y != ty){
            this.y += dy/(time/25);
        }
        this.draw();
    }
}

var sides = [];
function appendSide(num){
    sides = [];
    for(var i = 0 ; i < num ; i++ ){
        //sides.push(new Side(sideCtx , "#FFFFFF" ,10+ (i*32)%sideW  , 10+Math.floor((i*32)/sideW)*32)) ;
        sides.push(new Side(sideCtx , gradient ,200+ (i*20)%(sideW-400)  , 300)) ;
    }
}
function drawSides(){
    var i, len = sides.length;
    for( i = 0 ;  i< len ; i++){
        sides[i].draw();
    }
}
drawSides();
function moveSides(){
    var i, len = checkArr.length ,  steps = Math.floor(len/step);
    for( i = 0 ; i  < len; i+= steps){
        if(sides[i/steps]){ sides[i/steps].moveTo(checkArr[i].x , checkArr[i].y); }
    }
}
/*
* 主线
* */
var _marker  = 0;
var mainLineID;
var preMainLineID;
var _Main = function(){
    if(preMainLineID){
        clearTimeout(preMainLineID);
    }
    mainLineID= setInterval(//主线
        function(){
            sideCtx.clearRect(0 , 0 , sideW , sideH);
            moveSides();
            _marker ++;
            if(_marker == 400){
                _marker = 0;
            }
        },25
    );
    setTimeout(function(){
        clearInterval(mainLineID);
    },step>sideW ? step : sideW);
};

changeCheckArr(text);
_Main();

var inpNode = document.getElementById("acceptInp");
inpNode.onkeyup = function(e){
    if(e.keyCode == 13){
        inpNode.value = (inpNode.value.length>20 ? "不要太长了嘛" : inpNode.value) ? inpNode.value : "你啥子都没输入";
        changeCheckArr(inpNode.value);
        inpNode.value = "";
        _Main();
    }
};
