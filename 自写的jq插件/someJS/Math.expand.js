/**
 * Created by nqmy on 2015/7/28.
 * Math.expand.js
 * 原生Math的扩展
 * TPS  : Two point spacing 两点间的距离
 * MBTP : Midpoint between two points 两点的中点
 * COC : Center of Circle  通过圆周上已知的三个点 求得圆心
 * G  ：重力加速度
 */
if(Math){
    Math.TPS = function(x1 , y1 , x2 , y2 ){
        x1 = +x1 ? +x1 : 0;
        y1 = +y1 ? +y1 : 0;
        x2 = +x2 ? +x2 : 0;
        y2 = +y2 ? +y2 : 0;
        return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    };
    Math.MBTP =  function(x1 , y1 , x2 , y2 ){
        x1 = +x1 ? +x1 : 0;
        y1 = +y1 ? +y1 : 0;
        x2 = +x2 ? +x2 : 0;
        y2 = +y2 ? +y2 : 0;
        return {x : (x1+x2)/2 , y: (y1+y2)/2};
    };
    Math.COC = function( x1 , y1 , x2 , y2 , x3 , y3 ){
        var a1, b1, a2, b2, t1, t2, tx1,ty1,tx2,ty2;
        if(x1 == x2 || y1 == y2 ){
            tx1 = x1; ty1 = y1;
            x1 = x2; y1 = y2;
            x2 = x3; y2 = y3;
            x3 = tx1; y3 = ty1;
            tx1 = null; ty1= null;
        }
        a1 = (x1-x2)/(y1-y2);
        //b1 =  x1 -  y1 * a1;
        a2 = (x2-x3)/(y2-y3);
        //b2 =  x2 -  y2 * a1;
        t1 = -1/a1;
        t2 = -1/a2;
        tx1 = Math.MBTP(x1 , y1 , x2 , y2).x;
        ty1 = Math.MBTP(x1 , y1 , x2 , y2).y;
        tx2 = Math.MBTP(x2 , y2 , x3 , y3).x;
        ty2 = Math.MBTP(x2 , y2 , x3 , y3).y;
        return { x : (( ty1 - ty2 - tx1/t1 + tx2/t2 )/(1/t2-1/t1)),  y:( tx1 - tx2 - t1*ty1 + t2*ty2 )/(t2-t1)};
    };
    Math.G = 9.8;
}

