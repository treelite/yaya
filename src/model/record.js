/**
 * @file 消费记录数据实体
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    
    var ajax = require('saber-ajax');
    var DataList = require('saber-firework/model/DataList');
    var record = {};

    var URL = {
            QUERY: '/query.action',
            ADD: '/add.action'
        };

    record.query = function (queryInfo) {
        var dataList = new DataList(URL.QUERY, queryInfo);

        return dataList.fetch();
    };

    record.add = function (data) {
        return ajax.post(URL.ADD, 'data=' + encodeURIComponent(data));
    };

    return record;
});
