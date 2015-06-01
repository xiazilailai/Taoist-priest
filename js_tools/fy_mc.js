/**
 * Created by nqmy on 2015/4/14.
 */
$(function(){
    $(".unSelectAble").on("selectstart",function(){  //不可选中标签内容
        return false;
    });
});

/*
* 数据状态预先操作处理
* */
//function P_preViewData(data){
  //      if(!data.state){
    //            alert(data.msg);
     //   }
//}
 /*  *
 *分页  的 j s  基本上没有样式
 */
var Paging = function(totalCount , pageSize,current , total , contNode, callBack ,size , tagName){
        if(contNode.innerHTML != undefined){
                contNode = $(contNode);
        }
        if(!current){                current = 1;        }
        if(!total){                total = 1;        }
        if(current > total){ current = total; }
        if(current < 0){ current = 1; }
        if(!callBack){                callBack = window.alert;        }
        if(!tagName){                tagName = "span";        }
        if(!tagName){                tagName = "span";        }
        if(!size){                size = 5;        }
        if(size%2==0){
                size+=1;
        }
        var temp = this;
        temp.totalCount = totalCount;
        temp.pageSize = pageSize;
        temp.current = current;
        temp.total = total;
        temp.contNode = contNode;
        temp.callBack = callBack;
        temp.size = size;
        temp.tagName = tagName;
        this.firstPage = function(){
                if(temp.current!=1){
                    temp.current = 1;
                    temp.callBack(temp.current , temp.pageSize);
                }
                temp.drawInHtml(temp.state);
        };
        this.prevPage = function(){
                if(current-1 > 0){
                    temp.current --;
                    temp.callBack(temp.current , temp.pageSize);
                }
                temp.drawInHtml(temp.state);
        };
        this.nextPage = function(){
                if(temp.current+1 <= temp.total){
                    temp.current ++;
                    temp.callBack(temp.current , temp.pageSize);
                }
                temp.drawInHtml(temp.state);
        };
        this.lastPage = function(){
                if(temp.current!=temp.total){
                    temp.current = temp.total;
                    temp.callBack(temp.current , temp.pageSize);
                }
                temp.drawInHtml(temp.state);
        };
        this.gotoPage = function(){
                var num;
                num = temp.contNode.children("p").children("label").children(".pageNum").val();
                if(isNaN(parseInt(num))){
                        num = 1;
                }else{
                        num = parseInt(num);
                }
                temp.current = num;
                if(temp.current<=0){
                    temp.current = 1;
                }
                if(temp.current > temp.total){
                    temp.current = temp.total;
                }
            temp.callBack(temp.current , temp.pageSize);
                temp.drawInHtml(temp.state);
        };
        this.selectPage = function(){
                var selectNum = parseInt($(this).attr("name"));
                temp.current = selectNum;
            temp.callBack(temp.current , temp.pageSize);
                temp.drawInHtml(temp.state);
        };
        this.changePageSize = function(num){
                temp.pageSize = temp.contNode.children("p").children("label").children(".pageSize").val();
                if(isNaN(parseInt(temp.pageSize))){
                    temp.pageSize = 10;
                }else{
                    temp.pageSize = parseInt(temp.pageSize);
                }
                if(temp.pageSize<=0){
                    temp.pageSize =10;
                }
                temp.current = 1;
            temp.callBack(temp.current , temp.pageSize);
                temp.drawInHtml(temp.state);
        };
        this.drawInHtml = function(bl){
                temp.state = bl;
                this.start = (temp.current - Math.floor(temp.size/2))<=1 ? 1 :  (temp.current -Math.floor(temp.size/2));
                this.end =  this.start+temp.size-1 <= temp.total ? this.start+temp.size-1 : temp.total;
                this.start = this.start+temp.size-1 < temp.total ? this.start : temp.total-temp.size+1;
                //this.start = this.start <1 ? 1 : this.start;
                var str = '<p class="unSelectAble">';
                if(!bl) str += '<label>共'+temp.totalCount+'条记录</label>&nbsp;  ';
                if(!bl) str += '<label>每页显示 <input type="text" value="'+temp.pageSize+'" style="width: 30px;text-align: center;" class="pageSize"/> 条记录</label>&nbsp;<button class="changePageSize bkblue">确定</button>&nbsp;   ';
                str += '<label>共'+temp.total+'页</label>&nbsp;  ';
                if(!bl) str += '<label>当前第'+temp.current+'页</label>&nbsp;  ';
                str += '<button class="firstPage bkblue">首页</button>  ';
                str += '<button class="prevPage bkblue">上一页</button>  ';
                if(this.start > 1){
                        str += '<'+tagName+'>'+'···'+'</'+tagName+'> ';
                }
                for(var i = 0;i<temp.size;i++){
                        if(this.start+i>=1){
                                if(this.start+i != temp.current){
                                        str += '<'+tagName+' style="cursor:pointer;" class="selectPage unSelectAble" name="'+(this.start+i)+'">['+(this.start+i)+']</'+tagName+'> ';
                                }else{
                                        str += '<'+tagName+' style="cursor:pointer;color:blue;"  class="unSelectAble">['+(this.start+i)+']</'+tagName+'> ';
                                }
                        }
                }
                if(this.end < temp.total){
                        str += '<'+tagName+'>'+'···'+'</'+tagName+'> ';
                }
                str += '<button class="nextPage bkblue">下一页</button>  ';
                str += '<button class="lastPage bkblue">末页</button>  ';
                if(!bl) str += '<label>跳转到第 <input type="text" value="'+temp.current+'" style="width: 30px;text-align: center;" class="pageNum"/> 页</label> <button class="gotoPage bkblue">确定</button>&nbsp;   ';
                if(!bl) str += '</p>';
                temp.contNode.html(str);
                temp.contNode.children("p").children("button").css({  padding: "1px 5px", border: "1px solid #c6c6c6"});
                temp.contNode.children("p").children(".firstPage").on("click",this.firstPage);
                temp.contNode.children("p").children(".prevPage").on("click",this.prevPage);
                temp.contNode.children("p").children(".nextPage").on("click",this.nextPage);
                temp.contNode.children("p").children(".lastPage").on("click",this.lastPage);
                temp.contNode.children("p").children(".changePageSize").on("click",this.changePageSize);
                temp.contNode.children("p").children(".gotoPage").on("click",this.gotoPage);
                temp.contNode.children("p").children(".selectPage").on("click",this.selectPage);
        };
};
/*  *
 *遮罩层，每一个操作
 * node : DOM节点
 * url ：loading图片路径
 * w：loading图的宽度，h：loading图的高度
 */
var MaskLayer = function(node,url,w,h){
        if(node.innerHTML != undefined){                node = $(node);        }
        if(!w){                w = 100;        }
        if(!h){ h = 40 ;}
        if(!url){                url = "../images/loading/Loding.gif";        }
        node.css({position:"relative"});
        node.append('<div class="js-MaskLayer" style="position: absolute;top: 0;left: 0;z-index: 999;text-align: center;"></div>');
        var tempNode = node.children("div.js-MaskLayer");
        var NH = node.innerHeight();
        var NW = node.innerWidth();
        tempNode.css({width:NW,height:NH,lineHeight:NH,background: 'url('+url+') '+((NW/2-w/2)+"px "+(NH/2-h/2)+"px ")+' no-repeat,url("../images/loading/loadBG2.png")'});
        this.removeMaskLayer = function(){
                tempNode.remove();
        };
        this.appendMaskLayer = function(){
                var NH = node.innerHeight();
                var NW = node.innerWidth();
                tempNode.css({width:NW,height:NH,lineHeight:NH,background: 'url('+url+') '+((NW/2-50)+"px "+(NH/2-10)+"px ")+' no-repeat,url("../images/loading/loadBG2.png")'});
                node.append(tempNode);
        };
};

/*
* 菜单拖动 ！！
* */
var DragMenu = function(node , calback){
        if(node.innerHTML != undefined){
                node = $(node);
        }
        var temp = this;
        var y = 0;
        var positiony=0;
        var delty = 0;
        var newPy,index=0,newIndex=0;
        var dragstate = false;
        var h = node.innerHeight();
        var w = node.children("div").css("width");
        var tempNode = null;
        node.css({position:"relative"});
        node.children("div").children("button.js-drag").on("mousedown",function(event){
                node.css({height:h+"px"});//高度可能需要处理！！
                y = event.clientY;
                positiony = $(this).parent().position().top;
                newPy = positiony;
                dragstate = true;
                tempNode = $(this).parent();
                index = tempNode.index();
                tempNode.css({position:"absolute",width:w,top:newPy+"px",zIndex:2});
                tempNode.children().addClass("unSelectAble");
        });
        node.on("mousemove",function(event){
                if(dragstate){
                        delty = event.clientY - y ;
                        newPy = delty+positiony;
                        newPy = newPy<0 ? 0 : newPy;
                        newPy = newPy>h ? h : newPy;
                        tempNode.css({top:newPy+"px"});
                }
        });
        node.on("mouseleave",function(){
                if(dragstate){
                        dragstate = false;
                        temp.compare();
                }
                node.css({height:"auto"});
        });
        node.on("mouseup",function(){
                if(dragstate){
                        dragstate = false;
                        temp.compare();
                }
                node.css({height:"auto"});
        });
        this.compare = function(){
                var len = tempNode.siblings().length;
                var data;
                for(var i = 0 ; i < len ;i++){
                        var tempDiv = tempNode.siblings(":eq("+i+")");
                        var tempY = tempDiv.position().top;
                        if(Math.abs(tempY-newPy) <=16){
                                var tempDivIndex = tempDiv.index();
                                tempNode.css({position:"relative",top:"0",zIndex:1}).insertBefore(tempDiv);
                                data = {
                                        "id":tempNode.attr("id")
                                        ,"index":tempNode.index()
                                        ,"list":[]
                                };
                                var min = index<tempDivIndex ? index : tempDivIndex;
                                var max = index>tempDivIndex ? index : tempDivIndex;
                                if(max == tempDivIndex){
                                        max --;
                                }
                                node.children().each(function(i){
                                        if(i<=max && i>=min && i != tempNode.index()){
                                                var thisid = $(this).attr("id");
                                                var thisIndex = $(this).index();
                                                data.list.push({
                                                        "id":thisid
                                                        ,"index":thisIndex
                                                });
                                        }
                                });
                                node.css({height:"auto"});
                                calback(data);
                                return;
                        }
                }
                tempNode.css({position:"relative",top:"0",zIndex:1}).insertBefore(tempDiv);
                tempNode.appendTo(node);
                data = {
                        "id":tempNode.attr("id")
                        ,"index":tempNode.index()
                        ,"list":[]
                };
                tempNode.siblings().each(function(){
                        var thisid = $(this).attr("id");
                        var thisIndex = $(this).index();
                        data.list.push({
                                "id":thisid
                                ,"index":thisIndex
                        });
                });
                calback(data);
        }
};

(function(){
    if (window.top.location.href == location.href && !/(login\/login.html|index.html)/ig.test(location.href)){
        location.href = "/Tips/404.html";
    }
})();
