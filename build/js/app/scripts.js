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

})();;
(function(){

    var app = angular.module('myDirectives', ['myFilters']);

})();;
(function(){
 
    var app = angular.module('myFilters', []);

    app.filter('capitalize', function() {
        return function(input, scope) {
            if (input !== null)
            input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        };
    });

    app.filter('maskEmail', function(){
        return function (input, length) {

            input = input||'';
            length = length||3;

            var parts = input.split('@');
            var masked = parts[0].substr(0, length);
            var maskLength = parts[0].length - length;

            for (var i = 0; i<maskLength; i++) {
                masked += '*';
            }

            parts[0] = masked;

            return parts.join('@');
        };
    });


})();;
(function(){

    var app = angular.module('myServices', []);

    app.factory('getWWWData', ['$http', '$log', function($http, $log){
        var cache = {};
        var urls = {
            'www_data': 'json/www_data.json'
        };

        return function (type, callback){
            if(angular.isUndefined(cache[type])){
                callback = callback||function(){};

                var url = urls[type];

                $http.get(urls[type])
                    .success(function (data, status, headers, config) {
                        cache[type] = data;
                        callback(data);
                    })
                    .error(function (data, status, headers, config) {

                        $log.error('Wystąpił błąd podczas żądania "'+url+'"!');

                    });
            } else {
                callback(data);
            }

        };
    }]);

    app.service('mainService', function () {
        var mainService = {};

        mainService.dataLoaded = false;
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        mainService.StartTooltip = function() {
            $('[data-toggle="tooltip"]').tooltip({
                placement: 'right'
            });
        };        

        mainService.EmptyWord = function(myTag) {
            $(myTag).empty();
        };
        mainService.AnimateWord = function(myTag,myWord,myDelay,myStep,fade) {
            var myChars = myWord.split("");
            var i = 0;
            var myTimer;
            var myTimeout = setTimeout(function() {
                myTimer = setInterval(timerTick, myStep);
            }, myDelay);
            function timerTick() {
                var mySpan = document.createElement("span");
                var myText = document.createTextNode(myChars[i]);
                mySpan.appendChild(myText);
                $(myTag).append(mySpan);
                if (fade) {
                    mySpan.classList.add('animation-1');                    
                }
                i++;
                if (i >= myChars.length) {
                    clearInterval(myTimer);
                }
            }
        };
        mainService.SetNoOpacity = function(myTag) {
            $(myTag).css('opacity','0');
        };
        mainService.FadeIn = function(myTag,myDelay,myStep) {
            var FadeInShow = setTimeout(function() {
                $(myTag).animate({opacity: '1'}, myStep);
            }, myDelay);
        };

        mainService.ShowWebsite = function(showWebsiteData) {
            var totalTime = 0;
            for (var key in showWebsiteData) {
                switch (showWebsiteData[key].mode) {
                    case "AnimateWord":
                        mainService.EmptyWord(showWebsiteData[key].selector);
                        mainService.AnimateWord(showWebsiteData[key].selector,showWebsiteData[key].word,(totalTime+showWebsiteData[key].delayTime),showWebsiteData[key].stepTime);
                        totalTime += showWebsiteData[key].delayTime + (showWebsiteData[key].word.length * showWebsiteData[key].stepTime);
                        break;
                    default:      // "FadeIn"
                        mainService.SetNoOpacity(showWebsiteData[key].selector);
                        mainService.FadeIn(showWebsiteData[key].selector,(totalTime+showWebsiteData[key].delayTime),showWebsiteData[key].stepTime);
                        totalTime += showWebsiteData[key].delayTime + showWebsiteData[key].stepTime;
                }
            }
        };

        ////////////////////////////////////////////////////////////////////////////////////////////

        mainService.GetRandomInt = function(min, max) {
            var myInt = max+1;
            while (myInt > max) {
                myInt = parseInt(Math.random()*(max-min+1) + min);
            }
            return myInt;
        };

        mainService.ShuffleTable = function(myTable) {
            for(var j, x, i = myTable.length; i; j = Math.floor(Math.random() * i), x = myTable[--i], myTable[i] = myTable[j], myTable[j] = x);
            return myTable;
        };

        return mainService;
    });


})();