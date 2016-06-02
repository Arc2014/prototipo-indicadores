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
            ['2015', 3611, 3328, 5937, 5043],
            ['2016', 1660, 2170, 2504, 959]
          ],
          type: 'bar'
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Jan', 'Fev', 'Mar', 'Abr']
          }
        }
      });
    }

    function loadSendToAnalisisByApplicationConsultant () {
      $timeout(function(){
        $scope.chart3 = c3.generate({
        bindto: '#chart4',
          size: {
            height: 534
          },
        data: {
          labels: true,
          color: function(inColor, data) {
            var colors = ['#000000','#d9534f','#d0d5d8', '#9370DB', '#6495ED', '#3CB371', '#FABF62', '#ACB6DD', '#000000','#d9534f','#d0d5d8', '#9370DB', '#6495ED', '#3CB371'];
            if(data.index !== undefined) {
              return colors[data.index];
            }

            return inColor;
          },
          columns: [
            ['2016',1, 14, 6, 1, 1, 4, 6, 7, 1, 3, 1, 8, 1]
          ],
          type: 'bar'
        },
        axis: {
          rotated: true,
          x: {
            type: 'category',
            categories: ['Juliana Seixas', 'Thais', 'Rozimery', 'Juliana AP', 'José Rui', 'Paulo', 'Janaina', 'Mairane', 'Roberta', 'Aline', 'Thaine', 'Rafael', 'Mariana']
          }

        },

        legend: {
          show: false
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
            ['2015', 93, 69, 197, 119],
            ['2016', 24, 42, 167, 106]
          ],
          type: 'bar'
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Jan', 'Fev', 'Mar', 'Abr']
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
          loadSendToAnalisisByApplicationConsultant();
          break;
      }
    }

  }]);
})(angular.module('indicators'));