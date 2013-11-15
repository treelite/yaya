/**
 * @file 月列表视图
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var dom = require('saber-dom');
    var format = require('saber-string/format');
    var View = require('saber-firework/View');

    var view = new View('month');

    view.render = function (main, template, data) {
        View.prototype.render.call(this, main, template);
        this.main.innerHTML = template.main;
        this.refresh(data);
    };

    view.refresh = function (data) {
        var ele = dom.query('.table', this.main);
        var tpl = this.template;

        var html = ['<table>'];
        html.push(tpl.tableHeader);
        data.forEach(function (item) {
            html.push(format(tpl.tableItem, item));
        });
        html.push('</table>');

        ele.innerHTML = html.join('');
    };

    return view;
});
