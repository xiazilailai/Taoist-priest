/**
 * Created by nqmy on 2015/5/18.
 */

        /*
         * 进度条
         * */
        var imgPreview_dialog = $(".UploaderProgress_dialog").dialog({
            autoOpen: false,
            resizable: false,
            title:"上传进度",
            height: "auto",
            width: "800",
            modal: true
            //,buttons: {
            //    "关闭": function() {
            //        imgPreview_dialog.dialog( "close" );
            //    }
            //},
            //close: function() {
            //    imgPreview_dialog.dialog( "close" );
            //}
        });
        var progressbar = $( "#progressbar"),
        progressLabel = $(".progressLabel");
        progressbar.progressbar({
        value: false,
        change: function() {
            progressLabel.text( (progressbar.progressbar( "value" )).toFixed(1) + "%" );
        },
        complete: function() {
            progressLabel.text( "Complete!" );
            imgPreview_dialog.dialog( "close" );
        }
        });
var xhr_provider = function() {
    var xhr = jQuery.ajaxSettings.xhr();
    if(xhr.upload) {
        xhr.upload.addEventListener('progress', function(evt){
            imgPreview_dialog.dialog("open");
            progressbar.progressbar({
                value: (evt.loaded/evt.total)*100
            });
        }, false);
    }
    return xhr;
};
function uploadFiles(nodes, callback, url, route){
    var temp = this;
    this.tempForm = document.createElement("form");
    this.tempForm.action = url ? ("/Auxiliary/"+url+".do") : "/Auxiliary/UploadImage.do";
    this.tempForm.method = "post";
    this.tempForm.style.display = "none";
    this.inputNode = document.createElement("input");
    $(this.inputNode).attr("type", "test") ;
    this.inputNode.name = "path";
    this.inputNode.value =  JSON.stringify(route);
    $(this.tempForm).append(this.inputNode);
    for(var i = 0 ; i < nodes.length ;i++){
        $(this.tempForm).append(nodes[i]);
    }
    $(this.tempForm).appendTo("body");
    this.options = {dataType:"json",success:callback
    ,xhr: xhr_provider};
    $(this.tempForm).ajaxForm(this.options).submit();
    this.remover = function(){
        $(temp.tempForm).remove();
        temp.tempForm = null;
    }
}