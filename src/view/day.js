/**
 * @file 日列表视图
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var dom = require('saber-dom');
    var format = require('saber-string/format');
    var View = require('saber-firework/View');
    var util = require('../common/util');

    var view = new View('day');

    function bindEvents(view) {
        var ele = dom.query('#daySel', view.main);

        ele.addEventListener(
            'change', 
            function () {
                view.emit('query', ele[ele.selectedIndex].value);
            },
            false
        );
    }

    view.render = function (main, template, data) {

        View.prototype.render.call(this, main, template, data);

        main.innerHTML = template.main;
        var ele = dom.query('#daySel', this.main);

        var dayOptions = [];
        var date = new Date();

        dayOptions.push({text: '今天', value: util.stringifyDate(date)});
        date.setDate(date.getDate() - 1);
        dayOptions.push({text: '昨天', value: util.stringifyDate(date)});

        var option;
        var selectedIndex = 0;
        dayOptions.forEach(function (item, index) {
            option = document.createElement('option');
            option.text = item.text;
            option.value = item.value;
            ele.add(option);
            if (item.value == data.begin) {
                selectedIndex = index;
            }
        });
        ele.selectedIndex = selectedIndex;

        this.refresh(data.list);

        bindEvents(this);

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
