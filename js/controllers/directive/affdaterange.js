(function (module) {

    'use strict';
    var DATE_MASK = 'DD/MM/YYYY';
    var DATE_TIME_MASK = 'DD/MM/YYYY HH:mm';
    var dateMask = DATE_MASK;
    var options = {
        format: dateMask,
        locale: {
            cancelLabel: 'Limpar',
            applyLabel: 'Selecionar',
            fromLabel: 'De',
            toLabel: 'Até',
            daysOfWeek: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa'],
            monthNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        }
    };

    module.directive('affDateRange', function () {
        return {
            require: 'ngModel',
            scope: {
                minDate: '=',
                maxDate: '='
            },
            restrict: 'AE',
            link: function ($scope, element, attrs, ngModelController) {
                var buildElement = function () {
                    if (attrs.timePicker) {
                        options.timePicker = true;
                        options.timePicker12Hour = false;
                        options.format = DATE_TIME_MASK;
                        dateMask = DATE_TIME_MASK;
                    }
                    element.daterangepicker(options).on('apply.daterangepicker', function (event, picker) {
                        $scope.$apply(function () {
                            var startDate = picker.startDate.format(dateMask);
                            var endDate = picker.endDate.format(dateMask);
                            ngModelController.$setViewValue({startDate: startDate, endDate: endDate});
                        });
                    }).on('cancel.daterangepicker', function () {
                        $scope.$apply(function () {
                            element.val('');
                            ngModelController.$setViewValue(undefined);
                        });
                    }).on('keyup', function () {
                        this.value = '';
                    });
                };

                $scope.$watch('minDate', function () {
                    if ($scope.minDate) {
                        options.minDate = $scope.minDate;
                    }
                    buildElement();
                });

                $scope.$watch('maxDate', function () {
                    if ($scope.maxDate) {
                        options.maxDate = $scope.maxDate;
                    }
                    buildElement();
                });

                buildElement();

                ngModelController.$parsers.unshift(function (value) {
                    if (isRangePresent(value)) {
                        value.startDate = moment(value.startDate, dateMask).valueOf();
                        value.endDate = moment(value.endDate, dateMask).valueOf();
                    }
                    return value;
                });

                ngModelController.$formatters.unshift(function (value) {
                    var formattedRange = '';
                    if (isRangePresent(value)) {
                        formattedRange = value.startDate + ' - ' + value.endDate;
                    }
                    return formattedRange;
                });

                var isRangePresent = function (value) {
                    return value && (value.startDate && value.endDate);
                };
            }
        };
    });
})(angular.module('indicators'));