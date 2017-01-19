(function(){
  
    var app = angular.module('myControllers', ['myDirectives', 'myServices']);
  
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'views/home.html',
                label: 'Witaj'
            })
            .when('/firma', {
                controller: 'firmaController',
                templateUrl: 'views/firma.html',
                label: 'Firma'
            })
            .when('/oferta/:categoryName', {
                controller: 'ofertaController',
                templateUrl: 'views/oferta.html',
                label: 'Oferta'
            })
            .when('/oferta', {
                controller: 'ofertaController',
                templateUrl: 'views/oferta.html',
                label: 'Oferta'
            })
            .when('/pobierz', {
                controller: 'pobierzController',
                templateUrl: 'views/pobierz.html',
                label: 'Pobierz'
            })
            .when('/kontakt', {
                controller: 'kontaktController',
                templateUrl: 'views/kontakt.html',
                label: 'Kontakt'
            })
            .otherwise({
                redirectTo: '/home'
            });            

        $locationProvider
            .html5Mode(true);
            
    }]);
 
    app.controller('myController', ['$scope', '$http', '$window', '$location', '$anchorScroll', 'mainService', 'getWWWData', function($scope, $http, $window, $location, $anchorScroll, mainService, getWWWData) {

        $scope.activeBG = 1;

        $(window).load(function() {
            $('.siteLoader').hide();
            mainService.StartTooltip();
        });

        $( window ).resize(function() {
            $scope.OnWindowResize();
        });

        $scope.OnWindowResize = function() {
            var width = $( window ).width();
            var height = $( window ).height();
            if ( width > (1280/800) * height ) {
                $('.bg-image').width(width);
                $('.bg-image').height(800 * width / 1280);
            } else {
                $('.bg-image').height(height);
                $('.bg-image').width(1280 * height / 800);
            } 
        };

        $scope.ScrollSite = function(sectorId) {
            $location.hash(sectorId);
            $anchorScroll();
        };

        $scope.OnWindowResize();

    }]);

    //////////
    // HOME //
    //////////

    app.controller('homeController', ['$scope', 'mainService', function($scope, mainService){

        angular.element(document).ready(function() {

        });

    }]);

    ////////////
    // OFERTA //
    ////////////  

    app.controller('ofertaController', ['$scope', '$routeParams', 'mainService', function($scope, $routeParams, mainService){

        angular.element(document).ready(function() {
            //$scope.Animateprodukty();
        });

    }]);

    /////////////
    // POBIERZ //
    /////////////

    app.controller('pobierzController', ['$scope', 'mainService', function($scope, mainService){

        angular.element(document).ready(function() {

        });

    }]);

    /////////////
    // KONTAKT //
    /////////////

    app.controller('kontaktController', ['$scope', 'mainService', function($scope, mainService){

        angular.element(document).ready(function() {

        });

    }]);

})();