/**
 * @file DB操作
 * @author treelite(c.xinle@gmail.com)
 */

var storage = [];

function get(begin, end) {
    var res = [];
    storage.forEach(function (item) {
        if (item.date >= begin 
            && item.date <= end
        ) {
            res.push(item);
        }
    });

    return res;
}

function paging(data, page, size) {
    var res = [];
    var i = page * size;

    for (var max = i + size, item; i < max && (item = data[i]); i++) {
        res.push(item);
    }

    return res;
}

exports.query = function (begin, end, page, size) {
    var data = get(begin, end);

    return paging(data, page, size);
};

exports.add = function (data) {
    storage.push(data);
    storage.sort(function (a, b) {
        return a.date > b.date;
    });
};
