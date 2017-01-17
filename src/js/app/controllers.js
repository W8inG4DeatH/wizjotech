(function(){

    var app = angular.module('myControllers', ['myDirectives', 'myServices']);

    app.controller('myController', ['$scope', 'mainService', 'getWWWData', function($scope, mainService, getWWWData) {

        getWWWData('www_data', function (data) {
            $scope.wwwData = data;
            $scope.WWWInit();
        });

        $scope.WWWInit = function() {
            $scope.siteDatas = {};
            angular.forEach($scope.wwwData.content, function(site, siteKey) {
                $scope.siteDatas[site.name] = site.label;
            });
        };

        $(window).load(function() {
            $('.siteLoader').hide();
            mainService.StartTooltip();
        });

    }]);

})();