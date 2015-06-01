/**
 * Created by Administrator on 15-1-17.
 * Created by NMQY
 */
//bstr = Array.prototype.map.call( "jfhsdjhjsdk" , function( c ) { return c.charCodeAt(0); } );
//cstr = Array.prototype.map.call(bstr , function(c){
//    return String.fromCharCode(c);
//}).join("");
/*
* @method：strToCodeList  把字符串变成charCode数组
* @method：codeListToStr  把charCode数组变成字符串
* @method：changeCodeList  改变charCode数组内的值
* */
function strTocCodeList(str){
    var charCodeList = Array.prototype.map.call(str , function( c ) { return c.charCodeAt(0); } );
    return charCodeList;
}
function codeListToStr(arr){
    var str = Array.prototype.map.call(arr , function(c){  return String.fromCharCode(c); }).join("");
    return str;
}
function changeCodeList(arr){
    var charCodeList = Array.prototype.map.call(arr , function( c ) { return c; } );
    return charCodeList;
}
