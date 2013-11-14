/**
 * @file 日列表视图
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var tpl = require('tpl!./dayList.tpl');
    var dom = require('saber-dom');
    var format = require('saber-string/format');
    var Emitter = require('saber-emitter');
    var util = require('../common/util');

    var dayOptions = [
            {text: '今天', value: 0},
            {text: '昨天', value: 1}
        ];

    function getQueryInfo(view) {
        var res = {};
        var ele = dom.query('#daySel', view.main);

        var value = ele[ele.selectedIndex].value;
        
        if (value == 0) {
            res.begin = util.stringifyDate(new Date());
            res.end = util.stringifyDate(new Date());
        }
        else {
            var date = new Date();
            date.setDate(date.getDate() - 1);
            res.begin = util.stringifyDate(date);
            res.end = util.stringifyDate(date);
        }

        return res;
    }

    function bindEvents(view) {
        var ele = dom.query('#daySel', view.main);

        ele.addEventListener(
            'change', 
            function () {
                view.emit('query', getQueryInfo(view));
            },
            false
        );
    }

    function View(main) {
        this.main = main;
        Emitter.mixin(this);
    }

    View.prototype.render = function () {
        this.main.innerHTML = tpl.main;

        var ele = dom.query('#daySel', this.main);
        var selectedIndex = 0;
        var option;
        dayOptions.forEach(function (item) {
            option = document.createElement('option');
            option.text = item.text;
            option.value = item.value;
            ele.add(option);
        });
        ele.selectedIndex = selectedIndex;

        bindEvents(this);
    };

    View.prototype.getQuery = function () {
        return getQueryInfo(this);
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
