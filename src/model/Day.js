/**
 * @file 日消费model
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var util = require('../common/util');
    var tpl = require('saber-firework/tpl!../view/day.tpl');

    var record = require('./record');

    var BaseModel = require('saber-firework/Model');

    function Model() {
        BaseModel.call(this, 'day');
    }

    BaseModel.subClass(Model);

    Model.prototype.fetch = function () {
        var model = this;
        var queryInfo = this.getQueryInfo();       

        return record.query(queryInfo).then(
            function (dataList) {
                model.setQueryInfo(queryInfo);
                return {
                    data: {
                        list: dataList.data,
                        begin: queryInfo.begin,
                        end: queryInfo.end
                    },
                    template: tpl
                };
            }
        );
    };

    Model.prototype.setQueryInfo = function (queryInfo) {
        this.storage('begin', queryInfo.begin);
        this.storage('end', queryInfo.end);
    };

    Model.prototype.getQueryInfo = function () {
        return {
            begin: this.get('begin') || util.stringifyDate(new Date()),
            end: this.get('end') || util.stringifyDate(new Date())
        };
    };

    Model.prototype.query = function () {
        return record.query(this.getQueryInfo());
    };

    return Model;
});
