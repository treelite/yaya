/**
 * @file 日花费列表
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var View = require('./view/DayList');
    var record = require('./model/record');

    var view;
    var dataList;

    function bindEvents() {
        view.on('query', function (queryInfo) {
            dataList = record.query(queryInfo);
            dataList.fetch(0, 10).then(function (res) {
                view.refresh(res.data);
            });
        });
    }

    return {
        enter: function (main) {
            view = new View(main);
            view.render();

            bindEvents();

            dataList = record.query(view.getQuery());
            return dataList.fetch(0, 10).then(function (res) {
                view.refresh(res.data);
            });
        },

        refresh: function () {
            dataList.fetch(0, 10).then(function (res) {
                view.refresh(res.data);
            });
        }
    };

});
