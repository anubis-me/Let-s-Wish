/**
 * Created by abhi on 24-Sep-17.
 */
angular.module('wishController',['wishService'])

    .controller('createCtrl',function ($http,$timeout,$location,wishing) {
        var app = this;
        //input counter fest type message
        this.regwish = function (regdata) {
            app.regdata.views = "1";
            app.regdata.counter = Math.round((Math.random() * 1000000000000000) * 8);
            wishing.create(app.regdata).then(function (data) {
                app.successmsg = false;
                if (data.data.success) {
                    app.successmsg = "Your wish has been created now you can share it.";
                    app.pub_url = "wishing-app.herokuapp.com/"+data.data.choice+"?counter="+data.data.counter;
                }
                else {

                    $timeout(function () {
                        $location.path('/samplewish');
                    }, 2000);
                }
            });
        };


        //input counter
        this.incview = function (viewdata) {
            wishing.increa(app.viewdata).then(function (data) {
                app.viewsuccess = data.data.message ;
            });
        };
        //input counter
        this.mupdate = function() {
            var cdata ={};
            app.cdata = $location.search();
            app.loadmsg=false;
            wishing.getmsg(app.cdata).then(function (data) {
                app.wishtype=false;
                if(data.data.success){
                    app.loadmsg   = true;
                    app.wishtype  = data.data.fest;
                    app.wishmsg   = data.data.messages;
                    app.views_num = data.data.views;
                }
                else{
                    $location.path('/createwish');
                }
            });
        };

        this.routechange = function(){
            $location.path('/createwish');
        }
        this.routechan = function(){
            $location.path('/');
        }
        this.helps = function () {
            $location.path('/help');
        }
    });