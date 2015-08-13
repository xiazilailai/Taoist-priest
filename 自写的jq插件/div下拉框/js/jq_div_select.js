/**
 * Created by nqmy on 2015/8/6.
 */
jQuery.fn.buildSelect = function( list ,  cb){
    var $this = $(this);
    $this.css({fontSize:"16px"});
    var box1 = $('<div class="valueSelected" style="position: relative;display: inline-block;height: inherit;border: 1px solid #afafaf;background-color: #FFFFFF;cursor: pointer;font-size: 16px;padding: 5px 0;"><div style="display: inline-block;padding-left: 2px;" class="selectValue">'+list[0]+'</div><div style="display: inline-block;float: right;font-size: 12px;margin-top: 3px;color: #AAA;">▼</div></div>');
    var box2 = $('<div class="valueList" style="border: 1px solid #afafaf;position: absolute;top: 100%;left: -1px;background-color: #FFFFFF;width: auto;"></div>');
    var str = '', len = list.length || 0;
    var tempNode,maxW=0;
    for(var i =0 ; i<len ; i++){
        str += '<div class="values" value="'+i+'" >'+list[i]+'</div>';
    }
    box2.append(str);
//        box1.append(box2);
    box2.appendTo("body");
    maxW = box2.width()+8;
    box1.css({width:maxW});
    box2.css({width:maxW,display:"none"}).appendTo(box1);
    $this.append(box1);
    box1.on("click",function(){
        box2.slideToggle(100);
        return false
    });
    var hide = function(){
        box2.css({display:"none"});
    };
    $(window).on("click",hide);
    box2.children(".values").on("click",function(){
        var val = $(this).attr("value"), ind = $(this).index();
        box2.css({display:"none"});
        //$(window).off("click",hide);
        $this.attr("value",val);
        box1.children(".selectValue").html(list[ind]);
        if(cb) cb(ind);
        return false;
    });
    $this.attr("value","0");
    return this;
};
