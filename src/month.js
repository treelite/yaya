/**
 * @file 月花费列表
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var View = require('./view/MonthList');
    var record = require('./model/record');
    var util = require('./common/util');

    var view;
    var dataList;
    
    return {
        enter: function (main) {
            view = new View(main);
            
            var end = new Date();
            var begin = new Date();
            begin.setDate(1);
            dataList = record.query({
                begin: util.stringifyDate(begin),
                end: util.stringifyDate(end)
            });

            return dataList.fetch(0, 10).then(function (res) {
                view.render(res.data);
            });
        },

        refresh: function () {
            dataList.fetch(0, 10).then(function (res) {
                view.refresh(res.data);
            });
        }
    };

});
