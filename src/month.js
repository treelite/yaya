/**
 * @file 月花费列表
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var View = require('./view/MonthList');
    var record = require('./model/record');

    var view;
    var dataList;
    
    return {
        enter: function (main) {
            view = new View(main);
            dataList = record.query({
                begin: '2013-11-13',
                end: '2013-11-13'
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
