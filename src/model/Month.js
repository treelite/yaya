/**
 * @file 月消费model
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var util = require('../common/util');
    var tpl = require('saber-firework/tpl!../view/month.tpl');

    var record = require('./record');

    var BaseModel = require('saber-firework/Model');

    function Model() {
        BaseModel.call(this, 'month');
    }

    BaseModel.subClass(Model);

    Model.prototype.fetch = function () {
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

    Model.prototype.getQueryInfo = function () {
        var res = {
                end: util.stringifyDate(new Date())
            };

        var date;
        date = new Date();
        date.setDate(1);
        res.begin = util.stringifyDate(date);

        return res;
    };

    Model.prototype.query = function () {
        return record.query(this.getQueryInfo());
    };

    return Model;
});
