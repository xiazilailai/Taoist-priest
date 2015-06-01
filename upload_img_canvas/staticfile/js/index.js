/**
 * Created by Administrator on 15-1-17.
 * Created by NMQY
 */
var imgSrc="";
$("#submit").live("click",function(){
    var form = new FormData();
    if(document.getElementById("file").files){
        var filenode = document.getElementById("file").files;
        form.append("music",filenode[0]);
        $.ajax({
            type:"post",
            url:"/qy",
            dataType:"json",
            processData: false,  // tell jQuery not to process the data
            contentType: false ,  // tell jQuery not to set contentType
            data:form,
            success:function(data){
                drawImg_canvas(data.path);
                imgSrc = data.path;
                filenode = null;
            },error:function(e){
//            console.log(e);
            }});
    }else{
        var fileImg = document.getElementById("file");
        var strPic = fileImg.value;
        //if ($.ie && $.browser.version > 6) {
            fileImg.select();
            fileImg.blur();
            strPic = document.selection.createRange().text;
            document.selection.empty();

        //}
        drawImg_canvas(strPic);
        ieImg = strPic;
        document.getElementById("ieImg").src=strPic;
    }

});
/*
*
* Canvas
* */
var canvasBG = document.getElementById("canvasBG");
var ctxBG = canvasBG.getContext("2d");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function drawImg_canvas(src){
    var image = new Image();
    image.onload = function(){
        if(image.width>canvasBG.width){
            image.width=canvasBG.width;
            image.height *= canvasBG.height/image.height;
        }
        ctxBG.clearRect(0,0,canvasBG.width,canvasBG.height);
        ctxBG.drawImage(image,0,0,canvasBG.width,canvasBG.height);
        ctxBG.beginPath();
        ctxBG.fillStyle="rgba(255,255,255,1)";
        ctxBG.rect(0,0,canvasBG.width,canvasBG.height);
        ctxBG.closePath();
        ctxBG.fill();
    };
    image.src=src;
    clip_image(src,move_X,move_Y);
}
function clip_image(src,x,y){
    var images = new Image();
    images.onload = function(){
        if(images.width>canvasBG.width){
            images.width=canvasBG.width;
            images.height *= canvasBG.height/images.height;
        }
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(images,x,y,images.width,images.height,0,0,canvas.width,canvas.height);
    };
    images.crossOrigin="anonymous"; //关键
    images.src=src;
}
var dragAble = false;
$("#canvas").on("mousedown",function(){
    dragAble = true;
    var events = event||arguments[0];
    me_x = events.screenX;
    me_y = events.screenY;
});
var move_X=0;
var move_Y=0;
var me_x= 0,me_y=0;
$("#canvas").on("mousemove",function(){
    if(dragAble==true){
        var events = event||arguments[0];
        clip_image(imgSrc,(move_X-events.screenX+me_x),(move_Y-events.screenY+me_y));
    }
});
$("body").on("mouseup",function(){
    if(dragAble){
        var events = event||arguments[0];
        move_X += me_x - events.screenX;
        move_Y += me_y - events.screenY;
    }
    dragAble = false;
});
window.onmousewheel=function(event){
    event.preventDefault();
    var events = event || arguments[0];
    if(events.wheelDeltaY>0){
        canvasBG.width-=3;
        canvasBG.height-=3;
    }else{
        canvasBG.width+=3;
        canvasBG.height+=3;
    }
    drawImg_canvas(imgSrc);
};
$("#UPLoadImg").on("click",function(){
    var buffer = canvas.toDataURL('image/png');
    $.ajax({
        type:"post",
        url:"/canvas",
        data:{dataStr:buffer.replace("data:image/png;base64,","")},
        success:function(data){
            preView(data);
        }
    });
});
function preView(data){
    document.getElementById("preView").src="load.jpg";
    document.getElementById("preView2").src="load.jpg";
    document.getElementById("preView").src=data;
    document.getElementById("preView2").src=data;
}