/**
 * @file 月花费列表
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var View = require('./view/Month');
    var Model = require('./model/Month');
    var BaseAction = require('saber-firework/Action');

    function Action () {
        BaseAction.call(this, 'month');
        this.model = new Model();
        this.view = new View();
    }

    BaseAction.subClass(Action);

    Action.prototype.enter = function (main) {
        var action = this;
        return this.model.fetch().then(function (res) {
            action.view.render(main, res.template, res.data);
        });
    };

    Action.prototype.refresh = function () {
        var action = this;
        this.model.query().then(function (res) {
            action.view.refresh(res.data);
        });
    };

    return Action;
});
