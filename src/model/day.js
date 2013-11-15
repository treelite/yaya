/**
 * @file 日消费model
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var util = require('../common/util');
    var tpl = require('saber-firework/tpl!../view/day.tpl');

    var record = require('./record');

    var model = require('saber-firework').model('day');

    model.fetch = function () {
        var queryInfo = model.getQueryInfo();       

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

    model.setQueryInfo = function (queryInfo) {
        model.storage('begin', queryInfo.begin);
        model.storage('end', queryInfo.end);
    };

    model.getQueryInfo = function () {
        return {
            begin: model.get('begin') || util.stringifyDate(new Date()),
            end: model.get('end') || util.stringifyDate(new Date())
        };
    };

    model.query = function () {
        return record.query(this.getQueryInfo());
    };

    return model;
});
