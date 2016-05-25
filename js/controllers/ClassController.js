(function (module) {

  'use strict';

  module.controller('ClassController',  ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {

    $scope.chart = null;

        function loadCourseClassFinalized () {
          $scope.chart = c3.generate({
            bindto: '#chart',
            data: {
              labels: true,
              colors: {
                2015: '#828282',
                2016: '#d9534f'
              },
              columns: [
                ['2015', 30, 200, 100, 400, 150, 250],
                ['2016', 50, 20, 10, 40, 15, 25]
              ],
              type: 'bar'
            },
            axis: {
              x: {
                type: 'category',
                categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
              }
            }
          });
        }

    function loadCourseClassCanceled() {
      $timeout(function(){
        $scope.chart2 = c3.generate({
          bindto: '#chart2',
          data: {
            labels: true,
            colors: {
              2015: '#828282',
              2016: '#d9534f'
            },
            columns: [
              ['2015', 10],
              ['2016', 8]
            ],
            type: 'pie'
          }
        });
      }, 0);
    }

    function loadCharts(type){
      switch (type){
        case 'TC':
          loadCourseClassCanceled();
              break;
        case 'TF':
          loadCourseClassFinalized();
              break;
      }
    }

    $rootScope.$on('teste', function(ev, indicator){
      loadCharts(indicator);
    })
  }]);
})(angular.module('indicators'));