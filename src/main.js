/**
 * @file 主框架模块
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var dom = require('saber-dom');
    var AddView = require('./view/Add');
    var ListView = require('./view/List');
    var record = require('./model/record');
    var rounter = require('./common/router');

    var curAction;
    var view = {};

    function bindEvents() {
        view.add.on('submit', function (e) {
            var me = this;
            var data = e.data;
            record.add(data).then(function () {
                me.reset();
                curAction.refresh();
            });
        });
    }

    function render() {
        Object.keys(view).forEach(function (key) {
            view[key].render();
        });

        bindEvents();
    }

    function loadAction(url, file) {
        return function (query) {
            var page = view.list.load(url);
            window.require([file], function (action) {
                action.enter(page.main, query).then(function () {
                    page.enter();
                });
                curAction = action;
            });
        };
    }

    var rounterConfig = {
            '/day': loadAction('/day', 'day'),
            '/month': loadAction('/month', 'month')
        };

    return {
        enter: function () {
            var ele = dom.query('header');
            view.add = new AddView(ele);
            
            ele = dom.g('content');
            view.list = new ListView(ele);

            render();

            Object.keys(rounterConfig).forEach(function (key) {
                rounter.add(key, rounterConfig[key]);
            });
            rounter.index = '/day';
            rounter.start();
        }
    };
});
