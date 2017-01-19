(function(){
  
    var app = angular.module('myControllers', ['myDirectives', 'myServices']);
  
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/monitory', {
                controller: 'monitoryController',
                templateUrl: 'views/monitory.html',
                label: 'Monitory'
            })
            .when('/telewizory-i-kino-domowe', {
                controller: 'telewizoryiKinoDomoweController',
                templateUrl: 'views/monitory.html',
                label: 'Telewizory i kino domowe'
            })
            .when('/telewizory-hotelowe', {
                controller: 'telewizoryHoteloweController',
                templateUrl: 'views/monitory.html',
                label: 'Telewizory hotelowe'
            })
            .when('/projektory', {
                controller: 'projektoryController',
                templateUrl: 'views/monitory.html',
                label: 'Projektory'
            })
            .when('/urzadzenia-wielofunkcyjne', {
                controller: 'urzadzeniaWielofunkcyjneController',
                templateUrl: 'views/monitory.html',
                label: 'Urządzenia wielofunkcyjne'
            })
            .otherwise({
                redirectTo: '/monitory'
            });            

        $locationProvider
            .html5Mode(true);
            
    }]);
 
    app.controller('myController', ['$rootScope', '$scope', '$http', '$window', '$location', '$anchorScroll', 'mainService', 'getWWWData', function($rootScope, $scope, $http, $window, $location, $anchorScroll, mainService, getWWWData) {

        $scope.activeOffer = 0;

        $(window).load(function() {
            $('#bg-image-2').hide();
            $('#bg-image-3').hide();
            $('.siteLoader').hide();
            mainService.StartTooltip();

            $(window).scroll(function() {

                var windowElement = $(window);
                var windowScrollTop = windowElement.scrollTop();
                var siteOfertaTopOffset = $('#site-oferta').offset().top - windowScrollTop;
                var sitePobierzTopOffset = $('#site-pobierz').offset().top - windowScrollTop;
                var bgImage1 = $('#bg-image-1');
                var bgImage2 = $('#bg-image-2');
                var bgImage3 = $('#bg-image-3');

                if (sitePobierzTopOffset <= 0) {
                    bgImage1.hide();
                    bgImage2.hide();
                    bgImage3.show();
                } else if (siteOfertaTopOffset <= 0) {
                    bgImage1.hide();
                    bgImage2.show();
                    bgImage3.hide();
                } else {
                    bgImage1.show();
                    bgImage2.hide();
                    bgImage3.hide();
                }
            });
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

    ////////////
    // OFERTA //
    ////////////

    app.controller('monitoryController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {
            $scope.activeOffer = 1;
        });
    }]);

    app.controller('telewizoryiKinoDomoweController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {
            $scope.activeOffer = 2;
        });
    }]);

    app.controller('telewizoryHoteloweController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {
            $scope.activeOffer = 3;
        });
    }]);

    app.controller('projektoryController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {
            $scope.activeOffer = 4;
        });
    }]);

    app.controller('urzadzeniaWielofunkcyjneController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {
            $scope.activeOffer = 5;
        });
    }]);

})();