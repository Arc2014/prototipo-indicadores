(function (module) {

  'use strict';

  module.controller('MainController',  ['$scope', '$timeout', function ($scope, $timeout) {


    $scope.showIndicator = {};
    var oldIndicatorType = '';
    $scope.chart = null;
    $scope.chart2 = null;
    $scope.chart3 = null;

    function loadParticipantsInCourseClass () {
      $scope.chart3 = c3.generate({
        bindto: '#chart3',
        size: {
          height: 500
        },
        data: {
          labels: true,
          colors: {
            2015: '#000000',
            2016: '#d9534f'
          },
          columns: [
            ['2015', 30, 200, 100, 400, 150, 250,30, 200, 100, 400, 150, 250],
            ['2016', 120, 200, 30, 200, 100, 400, 150, 250, 120, 200, 140, 200]
          ]
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov','Dez']
          }
        }
      });
    }

    function loadSendToAnalisisByApplicationConsultant () {
      $timeout(function(){
        $scope.chart3 = c3.generate({
        bindto: '#chart4',
        size: {
          height: 500
        },
        data: {
          labels: true,
          colors: {
            THAIS: '#828282',
            ALINE: '#d9534f',
            MAIRANE: '#ABC111',
            ROZIMARY: '#1BB38C',
            ANA: '#9E3667',
            CHRISTINA: '#00000'
          },
          columns: [
            ['THAIS', 30],
            ['ALINE', 12],
            ['MAIRANE', 100],
            ['ROZIMERY', 50],
            ['ANA', 60],
            ['CHRISTINA', 30]
          ],
          type: 'donut'
        }
      });
      }, 100);
    }

    function loadCourseClassFinalized () {
      $scope.chart = c3.generate({
        bindto: '#chart',
        data: {
          labels: true,
          colors: {
            2015: '#000000',
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
          size: {
            height: 500
          },
          data: {
            labels: true,
            colors: {
              2015: '#000000',
              2016: '#d9534f'
            },
            columns: [
              ['2015', 10],
              ['2016', 8]
            ],
            type: 'pie'
          }
        });
      }, 2);
    }

    $scope.loadCharts = function loadCharts(type){
      $scope.showIndicator[oldIndicatorType] = false;
      $scope.showIndicator[type] = true;
      oldIndicatorType = type;
      switch (type){
        case 'TC':
          loadCourseClassCanceled();
          break;
        case 'TF':
          loadCourseClassFinalized();
          break;
        case 'PCT':
          loadParticipantsInCourseClass();
          break;
        case 'SAC':
          loadSendToAnalisisByApplicationConsultant()
          break;
      }
    }

  }]);
})(angular.module('indicators'));