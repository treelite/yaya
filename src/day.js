/**
 * @file 日花费列表
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var view = require('./view/day');

    var model = require('./model/day');

    var action = require('saber-firework').action('day');

    function bindEvents() {
        view.on('query', function (value) {
            var queryInfo = {
                    begin: value,
                    end: value
                };
            model.setQueryInfo(queryInfo);
            action.refresh();
        });
    }

    action.enter = function (main) {
        return model.fetch().then(
                function (res) {
                    view.render(main, res.template, res.data);
                    bindEvents();
                }
            );
    };

    action.refresh = function () {
        model.query().then(function (res) {
            view.refresh(res.data);
        });
    };

    return action;
});
