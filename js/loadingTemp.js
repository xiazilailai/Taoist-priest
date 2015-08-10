/**
 * Created by nqmy on 2015/8/6.
 * jQuery  loading插件
 * type：0 条形进度条， 1 环装进度条
 */
(function($){
    $.fn.loading = function(type){
        var  w = this.width(), h = this.height(), p_state = this.css("position"),temp = this ;
        if(p_state === "static" ) this.css("position" , "relative");
        temp.progressData = 0;
        type = type ? type :0;
        switch (type){
            case 0 : $('<div class="loading_box"><div class="loading_bar_box"><div class="loading_bar"></div><div class="loading_bar_text">0.00%</div></div></div>').css({width:w,height:h}).appendTo(this);
                this.find(".loading_bar_box").css("marginTop",Math.floor((h-16)/2)+"px");
                this.progress = function(data){
                    if(data <= 100){
                        temp.progressData=data;
                        this.find(".loading_bar").css("width",data+"%");
                        this.find(".loading_bar_text").html(parseFloat(data).toFixed(2)+"%");
                    }
                };
                break;
            case 1 :  $('<div class="loading_box"><div class="loading_circle_box"><div class="loading_semi_circle1"></div><div class="loading_semi_circle2"><div class="loading_semi_circle3"></div></div></div><div class="loading_circle_box2"></div></div>').css({width:w,height:h}).appendTo(this);
                this.find(".loading_circle_box").css({width:h/2,height:h/2,marginTop:h/4+"px"})
                    .find(".loading_semi_circle1").css({width:h/4,height:h/2,borderTopLeftRadius:h/4+"px",borderBottomLeftRadius:h/4+"px"});
                this.find(".loading_semi_circle2").css({width:h/4,height:h/2,borderTopRightRadius:h/4+"px",borderBottomRightRadius:h/4+"px"})
                    .find(".loading_semi_circle3").css({width:h/4,height:h/2,borderTopRightRadius:h/4+"px",borderBottomRightRadius:h/4+"px"});
                this.find(".loading_circle_box2").css({width:h/3,height:h/3,top:(h-h/3)/2,left:(w-h/3)/2,lineHeight:h/3+"px"}).html("0.00%");
                this.progress = function(data){
                    if(data<=100){
                        temp.progressData=data;
                        if(data <= 50) this.find(".loading_semi_circle3").css("transform","rotateZ("+Math.floor(data*3.6)+"deg)");
                        if(data >= 50){
                            this.find(".loading_semi_circle3").css({display:"none"});
                            this.find(".loading_semi_circle1").css("transform","rotateZ("+Math.floor((data-50)*3.6)+"deg)");
                        }
                        this.find(".loading_circle_box2").html(parseFloat(data).toFixed(2)+"%");
                    }
                    return this;
                };
                break;
        }
        this.progressTo = function(num , callBack){
            temp. progressToID = setInterval(function(){
                if(temp.progressData>num){
                    temp.progress(num);
                    clearInterval(temp. progressToID);
                    if(callBack) callBack(temp.progressData,temp);
                }else{
                    temp.progress(temp.progressData);
                    temp.progressData+=0.5;
                }
            },20);
            return this;
        };
        return this;
    }
})(jQuery);

