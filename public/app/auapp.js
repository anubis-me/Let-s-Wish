angular.module('wishapp',['playerRoute','wishController','wishService','ngAnimate'])
.config(function($compileProvider){
    //other configuration code here
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp):/);
});