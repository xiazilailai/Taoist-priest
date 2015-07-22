/**
 * Created by nqmy on 2015/6/10.
 */
function GetDataByURL(aURL , type , data,dataType){
    var temp = this;
    this.data=data || {};
    this.type= type || "post";
    this.async = true;
    this.dataType = dataType || "json";
    this.host = "http://www.bp4u.cn";
    this.url = this.host+aURL;
    this.suff = "";
    this.success = function(data){};
    this.error = function(e){        alert("数据读取失败"); alertFun(0);   };
    this.send = function(){
        //jQuery.ajax({
        //    type:this.type
        //    ,url:this.url
        //    ,dataType:this.dataType
        //    ,data:this.data
        //    ,async:this.async
        //    ,success:this.success
        //    ,error:this.error
        //});
        appcan.ajax({
            type:this.type
            //,url:encodeURI(this.host+aURL+this.suff)
            ,url:this.host+aURL+this.suff
            ,dataType:this.dataType
            ,data:this.data
            ,async:this.async
            ,success:this.success
            ,error:this.error
        });
    }
}
var hostName = "http://www.bp4u.cn";
function transformUrl(url){
    return hostName+url.replace("../","/");
}
function transformPid(pid){
    return pid.split("=")[1];
}
function pullRefresh(callBack,callback2){
            uexWindow.setBounce(1);
            uexWindow.notifyBounceEvent(0,1);
            uexWindow.notifyBounceEvent(1,1);
            var json='{"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"向下拖动","pullToReloadText":"拖动刷新页面","releaseToReloadText":"释放刷新","loadingText":"刷新中..."}';
            uexWindow.setBounceParams(0, json);
            uexWindow.showBounceView("0","#f5f5f5", 1);
            var json2 ='{"textColor":"#f5f5f5","imagePath":"res://refesh_icon.png","levelText":"修改日期","pullToReloadText":"上拉到底部","releaseToReloadText":"松手回原处","loadingText":"下载中..."}';
            uexWindow.setBounceParams(1, json2);
            uexWindow.showBounceView("1","#f5f5f5", 1);
            uexWindow.onBounceStateChange = onBounceStateChange;
            function onBounceStateChange(type, state){
            switch(type) {
                case 0:
                if (state == 2) {
                    uexWindow.resetBounceView("0");//展示弹动效果结束后显示的网页。resetBounceView(inType) inType的值为0，则为网页顶端恢复，为1,则支持网页底部恢复
                    if(callBack)callBack();
                }
                break;
                case 1:
                if (state == 2) {
                    uexWindow.resetBounceView("1");
                    if(callback2)callback2();
                   //uexWindow.hiddenBounceView(1);
                }
                break;
             }
         }
}
var uexXmlHttpMgrID = window.localStorage.uexXmlHttpMgrID = 0;
function Ajax(aURL , type , data,dataType){
    var temp = this;
    this.data=data || {};
    this.type= type || "post";
    this.async = true;
    this.dataType = dataType || "json";
    this.host = "http://www.bp4u.cn";
    this.url = this.host+aURL;
    this.suff = "";
    this.success = function(data){};
    this.error = function(e){         uexWindow.toast(0, 5, "读取数据失败", 500);    };
    this.send = function(){
        //jQuery.ajax({
        //    type:this.type
        //    ,url:this.host+aURL+this.suff
        //    ,dataType:this.dataType
        //    ,data:this.data
        //    ,async:this.async
        //    ,success:this.success
        //    ,error:this.error
        //});
        //console.log(this.host+aURL+this.suff);
        appcan.ajax({
            type:this.type
            //,url:encodeURI(this.host+aURL+this.suff)
            ,url:this.host+aURL+this.suff
            ,dataType:this.dataType
            ,data:this.data
            ,async:this.async
            ,success:this.success
            ,error:this.error
        });

    }
}

function Ajax02(aURL , type , data,dataType){
    this.data=data || {};
    this.type= type || "post";
    this.async = true;
    this.dataType = dataType || "json";
    this.host = "http://www.bp4u.cn";
    this.url = this.host+aURL;
    this.success = function(data){};
    this.error = function(e){         uexWindow.toast(0, 5, "读取数据失败", 500);    };//e.responseText
    this.send = function(){
        jQuery.ajax({
            type:this.type
            ,url:this.url
            ,dataType:this.dataType
            ,data:this.data
            ,async:this.async
            ,success:this.success
            ,error:this.error
        });
    }
}

/**
 *  倒计时
 */
function TimeRun(now, begin , end , node , mast){
    this.nowT = new Date(now).getTime();
    this.beginT = new Date(parseInt(begin)).getTime();
    this.endT = new Date(parseInt(end)).getTime();
    this.delT = [];
    this.step = 1000;
    var temp = this;
    this.notBegin = function(){};
    this.alive = function(){};
    this.end = function(){};
    var day = 1000*60*60*24, hour = 1000*60*60, min = 1000*60, sec = 1000 ;
    this.returnTime = function(delT){
        var delDay = Math.floor(delT/day);
        var delHour =  Math.floor(delT/hour)%24;
        var delMin = Math.floor(delT/min)%60;
        var delSec = Math.floor(delT/sec)%60;
        return [
            delDay >= 10 ? delDay : "0"+delDay
            , delHour >= 10 ? delHour : "0"+delHour
            , delMin >= 10 ? delMin : "0"+delMin
            ,delSec >= 10 ? delSec : "0"+delSec
        ];
    };
    this.notBeginState = false;
    this.aliveState = false;
    this.endState = false;
    this.judgeT = function(){
        if(temp.nowT < temp.beginT){
            //未开始
            if(!temp.notBeginState){
                temp.notBegin();
                temp.notBeginState = true;
            }
            temp.delT = temp.returnTime(temp.beginT - temp.nowT);
            if(temp.delT[0] < mast)node.html('<div class="timeRUN"><label class="tr-title">距离活动开始还有：</label><span class="tr-num">'+
            temp.delT[0]+'</span><span class="tr-uni">天</span><span class="tr-num">'+
            temp.delT[1]+'</span><span class="tr-uni">小时</span><span class="tr-num">'+
            temp.delT[2]+'</span><span class="tr-uni">分</span><span class="tr-num">'+
            temp.delT[3]+'</span><span class="tr-uni">秒</span></div>');
        }else if(temp.nowT <= temp.endT && temp.nowT >= temp.beginT){
            //活动中
            if(!temp.aliveState){
                temp.alive();
                temp.aliveState = true;
            }
            temp.delT = temp.returnTime(temp.endT - temp.nowT);
            if(temp.delT[0] < mast) node.html('<div class="timeRUN"><label class="tr-title">距离活动结束还有：</label><span class="tr-num">'+
            temp.delT[0]+'</span><span class="tr-uni">天</span><span class="tr-num">'+
            temp.delT[1]+'</span><span class="tr-uni">小时</span><span class="tr-num">'+
            temp.delT[2]+'</span><span class="tr-uni">分</span><span class="tr-num">'+
            temp.delT[3]+'</span><span class="tr-uni">秒</span></div>');
        }else{
            //一结束
            clearInterval(temp.lineID);
            if(!temp.endState){
                temp.end();
                temp.endState = true;
            }
            node.html('<div class="timeRUN"><label class="tr-title">活动已经结束。</label></div>');
        }
    };
    this.beginTimeRunner = function(){
        this.lineID = setInterval(function(){
            temp.nowT += temp.step;
            temp.judgeT();
        },temp.step);
        temp.judgeT();
    };
}
/*五分钟掉线自动登录，有红包消息的提醒*/
function redAndLogin(){
    var userSave = window.localStorage["userSave"];//获得用户名(登录名)
    if(userSave == "" || userSave == undefined ){}
    else{//五分钟掉线后自动登录 重新打开时  --- --- ---> 自动登录
        var loginStater = new Ajax("/AjaxHandle/RegAndLogin/AjaxLogin.ashx");
        loginStater.success = function(data){
            if(data.Msg == "未登录"){
                var userSave = window.localStorage["userSave"];
                var psdSave = window.localStorage["psdSave"];
                //var userSave = "15928116401";
                //var psdSave = "tkh12345678";
                var loginFun = new Ajax("/AjaxHandle/RegAndLogin/AjaxLogin.ashx?LoginOperation=Login");
                var loginObj = {};
                loginObj.Accountname =userSave;
                loginObj.Password = psdSave;
                loginObj.Automatic = false;
                loginFun.data={data:JSON.stringify(loginObj)};
                loginFun.success = function(data){
                    if(data.Sucess == false){
                        if(data.Msg == "用户名或密码错误"){
                            window.localStorage["loginStater"]=false;
                            window.localStorage["shuaXi"]=true;//退出后刷新 个人中心 页面数据
                            window.localStorage["loginUserName"]="";//设置用户名
                            window.localStorage["loginSizeIntegral"]="";//设置用户积分
                            window.localStorage["loginMyImg"]="";//设置用户头像
                            window.localStorage["userSave"]="";//设置登陆状态
                            window.localStorage["psdSave"]="";//设置登陆状态
                            window.localStorage.userID = "";
                            appcan.alert("温馨提示:","用户信息已过期，请重新登录！");
                            openTest("login/login");
                        }else{
                            //alert("此帐号已登录，请五分钟后尝试!")
                        }
                    }
                    if(data.Sucess){
                        vipStater.send();
                    }
                };
                loginFun.send();
            }else{//未掉线……
                vipStater.send();
            }
        };
        loginStater.send();
    }
    var vipStater = new Ajax("/AjaxHandle/AjaxUserStart.ashx");
    //vipStater.host = "http://192.168.1.88";
    vipStater.success = function(data){//判断是否是vip 以及获取用户信息
        window.localStorage.redBao = data.bl;
        if(data.bl){//有红包
            uexWindow.evaluateScript('', 0, "redBao("+true+")");
            //alert("kok")
        }else{//无红包
            uexWindow.evaluateScript('', 0, "redBao("+false+")");
            //alert("oko")
        }
    };
}

function alertFun(type,aType,i,text,time){
    if(type == 1){
        uexWindow.toast(aType,i,text,time);//打开提醒消息
        //uexWindow.toast(1,5,"加载中…",0);//打开提醒消息
    }else{
        uexWindow.closeToast();//关闭提醒消息
    }
}