/**
 * @file 月消费model
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var util = require('../common/util');
    var tpl = require('saber-firework/tpl!../view/month.tpl');

    var record = require('./record');

    var model = require('saber-firework').model('month');

    model.fetch = function () {
        var queryInfo = this.getQueryInfo();       

        return record.query(queryInfo).then(
            function (dataList) {
                return {
                    data: dataList.data,
                    template: tpl
                };
            }
        );
    };

    model.getQueryInfo = function () {
        var res = {
                end: util.stringifyDate(new Date())
            };

        var date;
        date = new Date();
        date.setDate(1);
        res.begin = util.stringifyDate(date);

        return res;
    };

    model.query = function () {
        return record.query(this.getQueryInfo());
    };

    return model;
});
