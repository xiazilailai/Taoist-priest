/**
 * Created by nqmy on 2015/7/27.
 * jQuery 拖拽插件。。。。
 *  statex 水平拖拽状态 0(false) : 可以拖拽 1(true) :  不可拖拽(保持垂直 top不变)
 *  statey 垂直拖拽状态 0(false) : 可以拖拽 1(true) :  不可拖拽(保持水平 left不变)
 *  minX  , minY: 起始点（左上角的顶点位置） ；
 *  maxX , maxY  : 结束点（右下角的顶点位置）。
 *  eg :  $(".drag").dragAble(false , false , 2 , 2 , 398 , 398); 这样 在一个400*400的容器内，不管怎么拖动都会距离边界2px
 */

(function($){
    $.fn.dragAble = function(statex , statey, minX , minY , maxX, maxY ){
        var $this = $(this) , x, y, dirx, diry,px, py, dragStart , draging, dragend , unSelect,nowx = 0 , nowy = 0 ;
        if(!minX) minX = 0;
        if(!minY) minY = 0;
        if(!maxX) maxX = $(window).innerWidth();
        if(!maxY) maxY = $(window).innerHeight();
        maxX = maxX - $this.width();
        maxY = maxY - $this.height();
        dragStart = function(e){
            e.preventDefault();
            x = e.clientX;
            y = e.clientY;
            dirx = diry = 0;
            px = $this.position().left;
            py = $this.position().top;
            $(window).on("selectstart",unSelect);
            $(window).on("mousemove",draging);
            $(window).on("mouseup",dragend);
        };
        draging = function(e){
            if(!statex) dirx = e.clientX - x;
            if(!statey) diry = e.clientY - y;
            nowx = nowy = 0;
            nowx = px + dirx > minX ? px + dirx : minX;
            nowx = nowx < maxX ? nowx : maxX;
            nowy = py + diry > minY ? py + diry : minY;
            nowy = nowy < maxY ? nowy : maxY;
            $this.css({left: nowx , top : nowy });
        };
        dragend = function(e){
            //$this.off("mousedown",dragStart);
            $this.L = (nowx - px) + (nowy + py);
            $(window).off("selectstart",unSelect);
            $(window).off("mousemove",draging);
            $(window).off("mouseup",dragend);
        };
        unSelect = function(e){
            e.preventDefault();
            return false;
        };
        $this.on("mousedown",dragStart);
        return $this;
    };
})(jQuery);