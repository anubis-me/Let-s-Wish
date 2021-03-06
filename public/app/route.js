var app=angular.module('playerRoute',['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider
            //directs to home page
            .when('/', {
                templateUrl  :'app/views/wishing/samplewish.html',
                controller  :'createCtrl',
                controllerAs:'register'
            })
            //adds signin page in index page
            .when('/createwish',{
                templateUrl  : 'app/views/wishing/createwish.html',
                controller  :'createCtrl',
                controllerAs:'register'
            })


            //player info
            .when('/type1',{
                templateUrl: 'app/views/type/type1.html',
                controller  :'createCtrl',
                controllerAs: 'register'
            })
            .when('/type2',{
                templateUrl: 'app/views/type/type2.html',
                controller  :'createCtrl',
                controllerAs: 'register'
            })
            .when('/type3',{
                templateUrl: 'app/views/type/type3.html',
                controller  :'createCtrl',
                controllerAs: 'register'
            })
            .when('/type4',{
                templateUrl: 'app/views/type/type4.html',
                controller  :'createCtrl',
                controllerAs: 'register'
            })
            .when('/type5',{
                templateUrl: 'app/views/type/type5.html',
                controller  :'createCtrl',
                controllerAs: 'register'
            })
            .when('/type6',{
                templateUrl: 'app/views/type/type6.html',
                controller  :'createCtrl',
                controllerAs: 'register'
            })
            .when('/type7',{
                templateUrl: 'app/views/type/type7.html',
                controller  :'createCtrl',
                controllerAs: 'register'
            })
            .when('/type8',{
                templateUrl: 'app/views/type/type8.html',
                controller  :'createCtrl',
                controllerAs: 'register'
            })

            .when('/help',{
                templateUrl: 'app/views/pages/about.html'
            })

            .otherwise({ redirectTo: '/createwish' }); // If user tries to access any other route, redirect to home page

            $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL
    });