/**
 * @file 查询请求
 * @author treelite(c.xinle@gmail.com)
 */


function now() {
    var now = new Date();

    var month = now.getMonth() + 1;

    if (month < 10) {
        month = '0' + month;
    }

    return now.getFullYear()
        + '-'
        + month
        + '-'
        + now.getDate();
}

function Query() {}

Query.prototype.GET = function (query, finish) {
    var data = require('./db').query(
            query.begin || now(),
            query.end || now(),
            query.page || 0,
            query.size || 10
        );

    var res = {status: 0, data: data};

    finish({
        contentType: 'application/json',
        content: JSON.stringify(res)
    });
};

module.exports = Query;
