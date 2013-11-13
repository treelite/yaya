/**
 * @file 月列表视图
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var tpl = require('tpl!./monthList.tpl');
    var dom = require('saber-dom');
    var format = require('saber-string/format');

    function View(main) {
        this.main = main;
    }

    View.prototype.render = function (data) {
        this.main.innerHTML = tpl.main;
        this.refresh(data);
    };

    View.prototype.refresh = function (data) {
        var ele = dom.query('.table', this.main);

        var html = ['<table>'];
        html.push(tpl.tableHeader);
        data.forEach(function (item) {
            html.push(format(tpl.tableItem, item));
        });
        html.push('</table>');

        ele.innerHTML = html.join('');
    };

    return View;
});
