/**
 * Created by nqmy on 2015/5/29.
 */
//var app = require('express')();
var express = require('express')
    , http = require('http')
    , chart = require('./chart.js')
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
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', chart.onConnect);
server.listen(app.get('port'),function(){
    console.log("express已启动，端口为："+app.get('port'));
});
app.post("/qy",function(req,res){
    res.json({name:"qy"});
});