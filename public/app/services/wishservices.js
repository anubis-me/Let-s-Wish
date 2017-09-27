angular.module('wishService',[])

    .factory('wishing',function ($http) {
        wishfactory = {};

        //player.create(regdata)
        wishfactory.create = function (regdata) {
            return $http.post('/api/wisher', regdata);
        };


        //player.create(regdata)
        wishfactory.increa = function (viewdata) {
            return $http.post('/api/wisher', viewdata);
        };

        //player.create(regdata)
        wishfactory.getmsg = function (cdata) {
            return $http.post('/api/message', cdata);
        };
        return wishfactory;
    });

