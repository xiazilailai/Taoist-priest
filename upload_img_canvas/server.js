/**
 * Created by Administrator on 14-8-20.
 */
var express = require('express')
    , http = require('http')
    , co = require('./contorl.js')
    , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);  /*     设置端口    */

app.set('view engine','ejs');         /*  设置模板引擎  */
app.set('views',__dirname+'/view');   /*  设置模板引擎  */

app.use(express.static(__dirname + '/staticfile'));
app.use(express.static(path.join(__dirname, 'staticfile/music')));
app.use(express.favicon());       //   设置网页 titile 的图标
app.use(express.logger('dev'));   //  日志
//app.use(express.bodyParser());   //    解析body
app.use(express.bodyParser({uploadDir:'./staticfile/cache'}));// 配置上传后文件存放的地方
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here create'));    // 使用cookie    后台必勇
app.use(express.session());                                     // 使用session  后台必勇
app.use(app.router);

// development only   开发者仅用
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
/*----------------------------  创建服务器  ----------------------*/
http.createServer(app).listen(app.get('port'),function(){
    console.log("express已启动，端口为："+app.get('port'));
});
app.post("/qy",co.show);
//app.post("/nmy",co.look);
//app.get("/cxj",co.opGET);
app.post("/canvas",co.canvas);
app.post("/images",co.images);