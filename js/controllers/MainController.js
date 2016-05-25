(function (module) {

  'use strict';

  module.controller('MainController',  ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.indicatorSelected = function(indicator){
      $rootScope.$broadcast('teste', indicator);
    }

  }]);
})(angular.module('indicators'));