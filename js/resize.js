/**
 * Created by nqmy on 2015/7/8.
 *  窗口  改变
 */
$(function(){
    var h = $(window).height();
    $(".box").css({margin:(h-768)/2+"px auto"});
    $(window).on("resize",function(){
        var h = $(window).height();
        $(".box").css({margin:(h-768)/2+"px auto"});
    })
});