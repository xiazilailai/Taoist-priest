/**
 * Created by nqmy on 2015/5/13.
 */
var fileManger = new Object();
var text = "the Name";
(function(window){
    var whoWasSelected = "";
    var selectedIMG = "";
    var staticPath = "/Upload/";
    //var fileDirName =
     /*
    * 改写右键功能
    * */
    function stop(){
        return false;
    }
    function   norightclick(e){
        if   (window.Event){
            if   (e.which   ==   2   ||   e.which   ==   3)
                return   false;
        }else if   (event.button   ==   2   ||   event.button   ==   3){
            event.cancelBubble   =   true;
            event.returnValue   =   false;
            return   false;
        }
    }
    document.oncontextmenu=stop;
    document.onmousedown=norightclick;

    fileManger.fileList = new Object();
    fileManger.dirList = new Object();
    fileManger.fileList.menuNode = document.createElement("div");
    fileManger.dirList.menuNode = document.createElement("div");
    fileManger.fileList.menuNode.id = "rightMenu";
    fileManger.dirList.menuNode.id = "leftMenu";
    fileManger.fileList.data = [{name:"file1",data:"url",icon:"",type:"image"},{name:"file2",data:"url",icon:"",type:"image"}];
    fileManger.dirList.data = [{name:"file1",data:"url",icon:"",type:"image"},{name:"file2",data:"url",icon:"",type:"image"}];
    $(".js-fileList").on("mouseup",function(e){//右键菜单
        if(e.button == 2 ){
            if(selectedIMG){
                if(/(jpg|gif|png)/i.test(getFileType(selectedIMG))){
                    fileManger.fileList.menu= [{      name:"刷新" ,sub:[]  ,func:function(){     getFileView(whoWasSelected);  }   ,enable:true
                    }  ,{   name:"预览图片"   ,sub:[]   ,func:function(){     preView(selectedIMG);   }   ,enable:true
                    }  ,{  name:"上传文件"  ,sub:[] ,func:function(){  file_dialog("UploadImage");  }  ,enable:true
                    } ,{  name:"删除文件"  ,sub:[] ,func:function(){  del_doc(selectedIMG);  }  ,enable:true    }];
                }else{
                    fileManger.fileList.menu= [{      name:"刷新" ,sub:[]  ,func:function(){     getFileView(whoWasSelected);  }   ,enable:true
                    }  ,{  name:"上传文件"  ,sub:[] ,func:function(){  file_dialog("UploadImage");  }  ,enable:true
                    } ,{  name:"删除文件"  ,sub:[] ,func:function(){  del_doc(selectedIMG);  }  ,enable:true    }];
                }
            }else{
                fileManger.fileList.menu= [{      name:"刷新" ,sub:[]  ,func:function(){     getFileView(whoWasSelected);  }   ,enable:true
                }   ,{  name:"上传文件"  ,sub:[] ,func:function(){  file_dialog("UploadImage");  }  ,enable:true    }];
            }
            hideMenu();
            rightMenu($("body"), e.clientX, e.clientY,fileManger.fileList.menu);
        }
    });
    $(".js-dirList").on("mouseup",function(e){//右键菜单
        if(e.button == 2 ){
            if(whoWasSelected){
                fileManger.dirList.menu =  [{                    name:"刷新"                    ,sub:[]                    ,func:function(){                        getAllFile(whoWasSelected, compareObjectWithPath(whoWasSelected , fileListArray.sub));                    }                    ,enable:true
                } ,{                    name:"新建文件夹"                    ,sub:[]                    ,func:function(){                        file_dialog("CreateDir");                    }                    ,enable:true
                } ,{                    name:"删除文件夹"                    ,sub:[]                    ,func:function(){                        del_Dir(whoWasSelected);                    }                    ,enable:true                }];
            }else{
                fileManger.dirList.menu =  [{                    name:"刷新"                    ,sub:[]                    ,func:function(){                        getAllFile(whoWasSelected, compareObjectWithPath(whoWasSelected , fileListArray.sub));                    }                    ,enable:true
                } ,{                    name:"新建文件夹"                    ,sub:[]                    ,func:function(){                        file_dialog("CreateDir");                    }                    ,enable:true                }];
            }
            hideMenu();
            rightMenu($("body"), e.clientX, e.clientY,fileManger.dirList.menu);
        }
    });
    function rightMenu(node,x,y,data){
        if(data == fileManger.fileList.menu){
            var strNode = toHtml(data);
            $(fileManger.fileList.menuNode).css({position:"fixed",left:x+"px" , top:y+"px"}).empty().append(strNode);
            node.append(fileManger.fileList.menuNode);
        }else if(data == fileManger.dirList.menu){
            var strNode = toHtml(data);
            $(fileManger.dirList.menuNode).css({position:"fixed",left:x+"px" , top:y+"px"}).empty().append(strNode);
            node.append(fileManger.dirList.menuNode);
        }else{
            var strNode = toHtml(data);
            var tempNode = document.createElement("div");
            $(tempNode).css({position:"absolute",left:x+"px" , top:y+"px"}).empty().append(strNode);
            node.append(tempNode);
        }
    }
    function toHtml(data){
        var tempUl =  document.createElement("ul");
        for(var i =0 ; i < data.length ;i++){
            var tempLi = document.createElement("li");
            $(tempLi).html('<label class="block padding">'+data[i].name+'</label>').css({position:"relative"}).addClass("margin relative");
            if(data[i].sub.length){
                (function(){
                    var sub_data = data[i].sub;
                    $(tempLi).on("mouseenter",function(e){
                        //rightMenu($(this), $("html").offset().left+$(this).offset().left+120, $("html").offset().top+$(this).offset().top-10, sub_data);
                        rightMenu($(this), 120, -10, sub_data);
                    }) ;
                    $(tempLi).on("click",function(e){
                        //rightMenu($(this),  $("html").offset().left+$(this).offset().left+120, $("html").offset().top+$(this).offset().top-10, sub_data);
                        rightMenu($(this), 120, -10, sub_data);
                        return false;
                    }) ;
                    $(tempLi).on("mouseleave",function(e){
                        $(this).children("div").remove();
                    }) ;
                })();
            }else{
                (function(){
                    var click_func = data[i].func;
                    $(tempLi).on("click",function(){
                        click_func();
                        hideMenu();
                        return false;
                    });
                })();

            }
            $(tempUl).append(tempLi);
        }
        return tempUl;
    }
    function hideMenu(){
        $("#rightMenu ,#leftMenu").remove();
    }
    $("body").on("click",hideMenu);

    /*
    *上面是右键菜单部分。
    * 下面 是文件夹列表 图片列表 DIR list
    * */
    function loadList(data){
        for( var i =0 ; i< data.length ; i++){

        }
    }
    $(".dir-fileDir, .js-fileList , .js-dirList").live("selectstart",function(){
        return false;
    });
    var fileListArray = {
        name:""
        ,parentPath:""
        ,path:""
        ,hasSub:true
        ,docList:[]
        ,sub:[]};
    function getAllFile(str , arr ){
         str = str || "";
        var tempAjax = new Ajax();
        tempAjax.success = function(data){
            arr.sub.splice(0,arr.sub.length);
            for(var i =0 ;i <data.length ; i++){
                arr.sub.push({
                    name:data[i].Name
                    ,parentPath:str
                    ,path:(str ? str+"/" : "")+data[i].Name
                    ,hasSub:data[i].HasSub
                    ,docList:[]
                    ,sub:[]
                })
            }
            //arr.docList = data[1];
            drawInFileList(arr.sub , str.replace(/\//g,"_"));

        };
        tempAjax.NoParameters("Auxiliary" , "GetDirView" , "do" , {'path': str});
    }
    function getNodeByAttr(attr,val){
        var tempNode = null;
        if(!val){val = "all"}
        $(".js_dirListContent , .js_dirListContent div").each(function(){
            if($(this).attr(attr) == val){
                tempNode =  $(this);
            }
        });
        return tempNode;
    }
    function drawInFileList(arr , nodename){
        if(nodename){
            var tempNode = getNodeByAttr("path",nodename);
            if(arr.length){
                appendList(arr , tempNode.next(".dir-fileList"));
                tempNode.next(".dir-fileList").children("ul").children("li").children(".dir-fileDir").each(function(){
                    var tempName = tempNode.attr("path") +"_"+ $(this).attr("path");
                    $(this).attr("path", tempName);
                });
            }else{
                appendList(arr , tempNode.next(".dir-fileList"));
                tempNode.removeClass("hasSub").addClass("dir-open").next(".dir-fileList").addClass("none");
            }
        }else{
            appendList(arr)
        }
    }
    function appendList(arr , node){
        var str = '';
        if(arr.length){
            str += '<ul>';
            for(var i = 0 ; i < arr.length ; i++){
                if(arr[i].hasSub){
                    str += '<li><div class="dir-fileDir hasSub"  path="'+arr[i].name+'"><div class="dir-icon inline_block"></div><label class="alginmiddle paddinglr">'+arr[i].name+'</label></div><div class="dir-fileList none">';
                    str += '</div></li>';
                }else{
                    str += '<li><div class="dir-fileDir dir-open"  path="'+arr[i].name+'"><div class="dir-icon inline_block"></div><label class="alginmiddle paddinglr">'+arr[i].name+'</label></div><div class="dir-fileList none">';
                    str += '</div></li>';
                }
            }
            str += '</ul>';
        }
        if(node){
            node.html(str);
        }else{
            $(".js_dirListContent").html(str);
        }
        //for(var j = 0 ; j < arr.length ; j++){//一次性加载全部文件夹树
        //    if(arr[j].hasSub){
        //        getAllFile(arr[j].path , arr[j]);
        //    }
        //}
    }
    $(".dir-fileDir").live("dblclick",function(){//双击
        if($(this).hasClass("hasSub")){
            $(this).toggleClass("dir-open");
            $(this).next(".dir-fileList").toggleClass("none");
        }
    });
    var dirClickStateID;
    $(".dir-fileDir").live("mousedown",function(){//单击
        if(dirClickStateID){
            clearTimeout(dirClickStateID);
        }
        $(".dir-fileDir").removeClass("bk_selected");
        $(this).addClass("bk_selected");
        var underMark = $(this).attr("path");
        var path = underMark.replace(/_/g,"/");
        whoWasSelected = path;
        showRoute();
        if(fileViewList[underMark]){
            drawDocList(path , fileViewList[underMark]);
        }else{
            getFileView(path);
        }
        if(!$(this).hasClass("hasClick")){
            $(this).addClass("hasClick");
            getAllFile(whoWasSelected ,compareObjectWithPath(whoWasSelected , fileListArray.sub));
        }
    });
    $(".js_dirListContent").parent().on("mousedown",function(){
        dirClickStateID = setTimeout(function(){
            $(".dir-fileDir").removeClass("bk_selected");
            $(this).attr("path","");
            whoWasSelected = "";
            showRoute();
            if(fileViewList["all"]){
                drawDocList("" , fileViewList["all"]);
            }else{
                getFileView("");
            }
        },10);
    });
    $(".js_littleBox").live("mousedown",function(){
        $(this).addClass("doc_selected");
        $(this).siblings().removeClass("doc_selected");
        selectedIMG = $(this).attr("imgSrc");
        window.top.selectedImg = staticPath+whoWasSelected+"/"+selectedIMG;
    });
    $(".js_docListContent").parent().on("mousedown",function(){
        selectedIMG = "";
        window.top.selectedImg = "";
        $(".js_littleBox").removeClass("doc_selected");
    });
    function preView(imgsrc){//预览
        $(".imgPreview_dialog").children("img").attr("src",staticPath+imgsrc).next("div").html("路径："+imgsrc);
        imgPreview_dialog.dialog("open");
    }
    function compareArrayWithPath(path , arr){
            for(var i = 0 ; i < arr.length ; i++){
                if(path == arr[i].path){
                    return arr[i].docList;
                }else if(arr[i].hasSub){
                    return compareArrayWithPath(path , arr[i].sub);
                }else{
                    return arr[i].docList;
                }
            }
    }
    function compareObjectWithPath(path , arr){
           for(var i = 0 ; i < arr.length ; i++){
               if(arr[i].path == path){
                   return arr[i];
               }else if(arr[i].sub.length){
                   return compareObjectWithPath(path , arr[i].sub);
               }else{
                   return arr[i];
               }
           }
    }
    function drawDocList(path , docList){
        var str = '';
        for(var i = 0 ; i < docList.length ; i++){
            var strs =  docList[i].split("/")[1] ? docList[i].split("/") : [docList[i]];
            var docName = strs[strs.length-1];
            var imgSrc = path ?  ""+path+"/"+docName : ""+docName;
            var parentPath = path ?  staticPath+path : staticPath;
            var imgName = docName;
            var docType = getFileType(imgName);
            if(/^(jpg|gif|png)$/i.test(docType)){
                str += '<div class="littleBox js_littleBox" imgSrc="'+imgSrc+'" parentPath="'+parentPath+'" imgName="'+imgName+'"><div class="doc_icon"><img class="" src="'+staticPath+imgSrc+'" docType="img"/></div><div class="doc_name"><label class="" title="'+imgName+'">'+imgName+'</label></div>' ;
            }else{
                str += '<div class="littleBox js_littleBox" imgSrc="'+imgSrc+'" parentPath="'+parentPath+'" imgName="'+imgName+'"><div class="doc_icon"><img class="" src="images/doc.png" docType="doc"/></div><div class="doc_name"><label class="" title="'+imgName+'">'+imgName+'</label></div>' ;
            }
            str +=  '<div class="littleBox_mc"></div></div>';
        }
        $(".js_docListContent").html(str ? str : '<h1 class="algincenter" style="line-height: 380px">空文件夹</h1>');
    }
    function del_Dir(path){//删除文件夹
        var tempAjax = new Ajax();
        tempAjax.success = function(data){
            if(data.state == "1"){
                var tempstrs = path.split("/") == path ? [path] : path.split("/") ;
                tempstrs.splice(tempstrs.length-1,1);
                var parentPath = tempstrs.join("/");
                getAllFile(parentPath , compareObjectWithPath(parentPath , fileListArray.sub) );
                getFileView(parentPath);
                var underMark = path.replace(/\//g,"_") ? path.replace(/\//g,"_") : "all";
                fileViewList[underMark] = [];
            }else{
                alert(data.msg);
            }
        };
        tempAjax.NoParameters("Auxiliary" , "DeleteDir" , "do" , {'path': path});
    }
    function del_doc(path){//删除文件
        var tempAjax = new Ajax();
        tempAjax.success = function(data){
            if(data.state == "1"){
                var tempstrs = path.split("/") == path ? [path] : path.split("/") ;
                tempstrs.splice(tempstrs.length-1,1);
                var parentPath = tempstrs.join("/");
                getFileView( parentPath );
            }else{
                alert(data.msg);
            }
        };
        tempAjax.NoParameters("Auxiliary" , "DeleteFile" , "do" , {'path': path});
    }
    function getFileType(fileName){
        var strs = fileName.split(".");
        return strs[strs.length-1];
    }
    function searchByNameP(path , name){//搜索文件
        var tempAjax = new Ajax();
        tempAjax.success = function(data){
            if(!data.state){
                drawDocList(path , data);
            }else{
                alert(data.msg);
            }
        };
        tempAjax.NoParameters("Auxiliary" , "GetFileFilter" , "do" , {'path': path ,'name': name});
    }
    var fileViewList = [];
    var fileViewMaskLayer ;
    function getFileView(path){
        var tempAjax = new Ajax();
        var underMark = path.replace(/\//g,"_") ? path.replace(/\//g,"_") : "all";
        tempAjax.success = function(data){
            fileViewMaskLayer.removeMaskLayer();
            fileViewList[underMark] = data;
            drawDocList(path , data);
        };
        tempAjax.NoParameters("Auxiliary" , "GetFileView" , "do" , {'path': path});
        fileViewMaskLayer.appendMaskLayer();
    }
    var p_type;
    function file_dialog( type ){
        p_type = type;
        var str = '';
        switch (type){
            case "CreateDir" :
                //str += '<p style="padding: 10px;text-align: left"><label style="display: inline-block;width: 100px;">路径</label><input class="formInp1" name="path" type="text" value="'+whoWasSelected+'" readonly /></p>';
                str += '<p style="padding: 10px;text-align: left"><label style="display: inline-block;width: 100px;">文件名</label><input class="formInp2" name="name" type="text" value="新建文件夹"/></p>';
                $( ".CreateDirUploader_dialog" ).dialog( "option", "title", "创建新文件夹" );
                $(".CreateDirUploader_dialog").html(str);
                CreateDirUploader_dialog.dialog( "open" );break;
            case "UploadImage" :
                //str += '<p style="padding: 10px;text-align: left"><label style="display: inline-block;width: 100px;">路径</label><input class="formInp1" name="path" type="text" value="'+whoWasSelected+'" readonly /></p>';
                str += '<p style="padding: 10px;text-align: left"><label style="display: inline-block;width: 100px;">选择图片</label><input class="formInp2" name="inputImage" type="file"  multiple accept="image/*" /></p>';
                $( ".IMGUploader_dialog" ).dialog( "option", "title", "上传图片" );
                $(".IMGUploader_dialog").html(str);
                IMGUploadForm_dialog.dialog( "open" );break;
        }
    }
    /*
    * 图片上传
    * */
    var IMGUploadForm_dialog = $(".IMGUploader_dialog").dialog({
        autoOpen: false,
        resizable: false,
        content:$(".js_content"),
        height: "auto",
        width: "auto",
        modal: true,
        buttons: {
            "确定": function() {
                IMGUploadForm_dialog.dialog( "close" );
                //fileViewMaskLayer.appendMaskLayer();
                var fileLenfth = 1;
                var tempNode = $(".IMGUploader_dialog").find("input.formInp2");
                if(tempNode[0].files){
                    var len = tempNode[0].files.length;
                    if(len > 6){
                        alert("最多同时上传六个文件");
                        return;
                    }
                }
                uploadFiles($(".IMGUploader_dialog").find("input.formInp2"),function(data){
                    //fileViewMaskLayer.removeMaskLayer();
                    if(data.state == "1"){
                        getFileView(whoWasSelected);
                    }else{
                        alert(data.msg);
                    }
                }, p_type , whoWasSelected);
            }
            ,"取消": function() {
                IMGUploadForm_dialog.dialog( "close" );
            }
        },
        close: function() {
            IMGUploadForm_dialog.dialog( "close" );
        }
    });
    /*
    * 新建文件夹
    * */
    var CreateDirUploader_dialog = $(".CreateDirUploader_dialog").dialog({
        autoOpen: false,
        resizable: false,
        content:$(".js_content"),
        height: "auto",
        width: "auto",
        modal: true,
        buttons: {
            "确定": function() {
                CreateDirUploader_dialog.dialog( "close" );
                //$(".CreateDirUploader_dialog").find("input.formInp2").val(JSON.stringify($(".CreateDirUploader_dialog").find("input.formInp2").val()));
                var createDirAjax = new Ajax();
                createDirAjax.success = function(data){
                    if(data.state == "1"){
                        var temp = compareObjectWithPath(whoWasSelected , [fileListArray]);
                        temp.hasSub = true;
                        getNodeByAttr("path", whoWasSelected.replace(/\//g,"_")).removeClass("dir-open").addClass("hasSub");
                        getAllFile(whoWasSelected , temp);
                    }else{
                        alert(data.msg);
                    }
                };
                createDirAjax.NoParameters("Auxiliary" , "CreateDir" , "do" , {'path': whoWasSelected ,'name': $(".CreateDirUploader_dialog").find("input.formInp2").val()});
                //uploadFiles($(".CreateDirUploader_dialog").find("input.formInp2"),function(data){
                //    if(data.state == "1"){
                //        var temp = compareObjectWithPath(whoWasSelected , fileListArray.sub);
                //        temp.hasSub = true;
                //        getNodeByAttr("path", whoWasSelected.replace(/\//g,"_")).removeClass("dir-open").addClass("hasSub");
                //        getAllFile(whoWasSelected , temp);
                //    }else{
                //        alert(data.msg);
                //    }
                //}, p_type , whoWasSelected);
            }
            ,"取消": function() {
                CreateDirUploader_dialog.dialog( "close" );
            }
        },
        close: function() {
            CreateDirUploader_dialog.dialog( "close" );
        }
    });
    /*
    * 预览
    * */
var imgPreview_dialog = $(".imgPreview_dialog").dialog({
    autoOpen: false,
    resizable: false,
    content:$(".js_content"),
    height: "auto",
    width: "auto",
    modal: true,
    buttons: {
        "关闭": function() {
            imgPreview_dialog.dialog( "close" );
        }
    },
    close: function() {
        imgPreview_dialog.dialog( "close" );
    }
});
 /*
* 初始化。。。。。。。
* */
    fileViewMaskLayer = new MaskLayer($(".js_docListContent").parent());
     getAllFile("", fileListArray);
    getFileView("");
    /*
     * 顶部条的功能
     * */
    function showRoute(){
        $(".js_showRoute").val("Upload/"+whoWasSelected);
    }
    showRoute();
    $(".js_reflesh").on("click",function(){
        getFileView(whoWasSelected);
    });
    $(".js_search").on("click",function(){
        var fileName = $(".js_search_inp").val();
        searchByNameP(whoWasSelected , fileName);
    });
    $(".js_littleBox img").live("mouseenter",function(){
        if($(this).attr("docType") == "img"){
            var imgSrc = $(this).attr("src");
            $(".js_imgPreview").appendTo($(this).parents("div.js_littleBox")).removeClass("none").children("img").attr("src",imgSrc).next("div").html(imgSrc);
        }
    });
    $(".js_littleBox img").live("mouseleave",function(){
        $(".js_imgPreview").addClass("none");
    });
 })(window);