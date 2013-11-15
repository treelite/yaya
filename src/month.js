/**
 * @file 月花费列表
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var view = require('./view/month');
    var model = require('./model/month');

    var action = require('saber-firework').action('month');
    
    action.enter = function (main) {
        return model.fetch().then(function (res) {
            view.render(main, res.template, res.data);
        });
    };

    action.refresh = function () {
        dataList.query().then(function (res) {
            view.refresh(res.data);
        });
    };

    return action;
});
