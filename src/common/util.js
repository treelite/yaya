/**
 * @file 工具
 * @authro treelite(c.xinle@gmail.com)
 */

define(function () {

    var exports = {};

    exports.stringifyDate = function (date) {
        var month = date.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        return date.getFullYear() 
                + '-' 
                + month
                + '-'
                + date.getDate();
    };

    return exports;
});
