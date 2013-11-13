/**
 * @file Add Spending
 * @author treelite(c.xinle@gmail.com)
 */

function parseInput(data) {
    data = data.split(/\s+/);

    return {
        date: data[0],
        event: data[1],
        category: data[2],
        spending: data[3]
    };
}

function Add() {}

Add.prototype.POST = function (query, finish) {
    if (!query.data) {
        throw new Error('no data');
    }

    var res = {status: 0};
    var data = decodeURIComponent(query.data);

    data = parseInput(data);

    require('./db').add(data);
    
    var res = {status: 0};
    finish(JSON.stringify(res));
};

module.exports = Add;
