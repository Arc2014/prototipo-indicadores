(function (module) {

  'use strict';

  module.controller('ClassController',  ['$scope', '$http', 'DatetimeUtil', function ($scope, $http, DatetimeUtil) {

    var classes;
    $http.get('JSON/class.json').success(function (data) {
      classes = data;
      console.log('classes', classes);
    });

    function getClassesByMonthAndYear (month, year) {
      return _.filter(classes, function (c) {
        return DatetimeUtil.isBetween(moment('01/' + month + year), c.startDate, c.endDate);
      });
    }

    $scope.titleCard = 'Indicador: Turmas Únicas Ativas e Canceladas';
    $scope.subTitleCard = 'Mensurar a quantidade de treinamentos finalizados e cancelados, no formato Trilha, realizados no período referência.';

    $scope.chart = null;

        $scope.chart = c3.generate({
          bindto: '#chart',
          data: {
            type: 'bar',
            columns: [
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 50, 20, 10, 40, 15, 25]
            ]
          }
        });

  }]);
})(angular.module('indicators'));