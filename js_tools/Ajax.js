// ====JQuery的Ajax
var Ajax = function () {
    this.success = function (data) { };
    this.error = function (data) { };
    this.async = true;
        this.data = null;
    this.NoParameters = function (Class, Method, Suffix, arr) {
            for(var name in arr){
                    try{
                            JSON.parse( arr[name]);
                    }catch (e){
                            arr[name] = JSON.stringify( arr[name]);
                    }
            }
        $.ajax({
            url: "/"+Class + "/" + Method + "." + Suffix,
            type: "post",
            data: arr,
            context: this,
            dataType: "json",
            async:this.async,
            success: function (data) {
                this.success(data);
            },
            error: function (data) {
                this.error(data);
            }
        });
    };
};
// ====angularJS的Ajax
function AngularAjax(nameSpace, name, suff, data, $http, $scope, $rootScope){
        this.transform = function(data){
                return $.param(data);
        };
        this.async = true;
        this.type = "post";
        this.url = "/"+nameSpace+"/"+name+"."+suff;
        this.data = data;
        this.JSONData = null;
        this.success = function(data,a,b,c){ };
        this.error = function(error,state){};
        this.send = function(){
                for(var name in this.data){
                        try{
                                JSON.parse(this.data[name]);
                        }catch (e){
                                this.data[name] = JSON.stringify(this.data[name]);
                        }
                }
                $http({
                        method:this.type,
                        url:this.url,
                        data: this.data,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest: this.transform
                }).success(
                        this.success
                ).error(
                        this.error
                );
        }
}
