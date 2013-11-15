/**
 * @file 日花费列表
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var View = require('./view/Day');

    var Model = require('./model/Day');

    var BaseAction = require('saber-firework/Action');

    function bindEvents(action) {
        action.view.on('query', function (value) {
            var queryInfo = {
                    begin: value,
                    end: value
                };
            action.model.setQueryInfo(queryInfo);
            action.refresh();
        });
    }

    function Action() {
        BaseAction.call(this, 'day');
        this.view = new View();
        this.model = new Model();
    }

    BaseAction.subClass(Action);

    Action.prototype.enter = function (main) {
        var action = this;
        return this.model.fetch().then(
                function (res) {
                    action.view.render(main, res.template, res.data);
                    bindEvents(action);
                }
            );
    };

    Action.prototype.refresh = function () {
        var action = this;
        this.model.query().then(function (res) {
            action.view.refresh(res.data);
        });
    };

    return Action;
});
