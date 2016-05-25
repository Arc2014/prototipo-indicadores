(function (module) {

    'use strict';

    module.factory('DatetimeUtil', function () {
        return {

            DATETIME_MYSQL_FORMAT: 'YYYY-MM-DD HH:mm:ss',
            DATETIME_FORMAT_BR: 'DD/MM/YYYY HH:mm',
            DATETIME_ANGULAR_FORMAT_BR: 'dd/MM/yyyy HH:mm',
            DATE_FORMAT_BR: 'DD/MM/YYYY',
            TIME_FORMAT: 'HH:mm',

            getMoment: function (datetime, pattern) {
                var momentObject = moment(datetime);
                if (pattern) {
                    momentObject = moment(datetime, pattern);
                }
                return momentObject;
            },
            getDayOfWeekPtBr : function (date, pattern) {
                return this.getMoment(date, pattern).locale('pt-br').format('dddd');
            },
            compareTime: function (init, second) {
                var initFormatted = this.getMoment(init, this.TIME_FORMAT);
                var secondFormatted = this.getMoment(second, this.TIME_FORMAT);
                var result = -1;
                if (initFormatted.isSame(secondFormatted)) {
                    result = 0;
                } else if (initFormatted.isAfter(secondFormatted)) {
                    result =  1;
                }
                return result;
            },
            format: function (datetime, pattern) {
                return this.getMoment(datetime).format(pattern);
            },
            getTimestamp: function (datetime, pattern) {
                if (!_.isNumber(datetime)) {
                    return this.getMoment(datetime, pattern).toDate().getTime();
                }
                return datetime;
            },
            getTimeOnlyTimestamp: function (time, pattern) {
                return this.getTimestamp('01/01/1970 ' + time, this.DATE_FORMAT_BR + ' ' + pattern);
            },
            add: function (datetime, value, type, pattern) {
                return this.getMoment(datetime, pattern).add(value, type).toDate().getTime();
            },
            subtract: function (datetime, value, type, pattern) {
                return this.getMoment(datetime, pattern).subtract(value, type).toDate().getTime();
            },
            isStartDateAfterEndDate: function (dateStart, dateEnd, pattern) {
                dateStart = this.getTimestamp(dateStart, pattern);
                dateEnd = this.getTimestamp(dateEnd, pattern);
                return dateStart > dateEnd;
            },
            isHoliday: function (holidays, date) {
                var isHoliday = false;
                angular.forEach(holidays, function (item) {
                    var holiday = moment(item.date);
                    if (date.date() === holiday.date()) {
                        isHoliday = true;
                    }
                });
                return isHoliday;
            },
            isWeekend: function (weekday) {
                return weekday === 6 || weekday === 0;
            },
            getStartWeek: function (day) {
                return this.format(this.getMoment(day, this.DATE_FORMAT_BR).startOf('week'), this.DATE_FORMAT_BR);
            },
            getEndWeek: function (day) {
                return this.format(this.getMoment(day, this.DATE_FORMAT_BR).endOf('week'), this.DATE_FORMAT_BR);
            },
            isBetween: function (date, initDate, endDate) {
                return (date.isAfter(moment(initDate, this.DATETIME_FORMAT_BR)) || date.isSame(moment(initDate, this.DATETIME_FORMAT_BR))) &&
                    (date.isBefore(moment(endDate, this.DATETIME_FORMAT_BR)) || date.isSame(moment(endDate, this.DATETIME_FORMAT_BR)));
            },
            buildRangePeriod : function (periodStart, periodEnd, pattern) {
                var period = '';
                if (periodStart && periodEnd) {
                    period = {
                        startDate: this.format(periodStart, pattern),
                        endDate: this.format(periodEnd, pattern)
                    };
                }
                return period;
            }
        };
    });
})(angular.module('indicators'));
