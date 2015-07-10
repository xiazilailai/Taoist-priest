/**
 * Created by nqmy on 2015/6/8.
 * 可视化数据视图
 */
var tempArr = [10,20,24,15,30,50,12];

var InfoView = function(node , obj){
    if(obj instanceof Array){
        console.log("Array");
    }else if(obj instanceof Object){
        console.log(typeof "Object");
    }
    var str = '';

    node.html();
};
InfoView(tempArr);
