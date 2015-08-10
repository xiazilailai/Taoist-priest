/**
 * Created by nqmy on 2015/7/27.
 *  能量守恒  E=MV²/2
 *  动量守恒  m₁v₁ = m₂v₂
 */
(function($){
    $.fn.energy = function(m,v){
        this.m = m;
        this.v = v;
        this.power = function(){
            return this.m*this.v*this.v/2 || 0;
        };
        this.conservation = function(){};
        this.non_conservation = function(){};
        return this;
    };
})(jQuery);

