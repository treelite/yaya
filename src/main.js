/**
 * @file 主框架模块
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var curAction;

    var router = require('saber-router');
    var model = require('./model/record');
    var view = {
            add: require('./view/add'),
            list: require('./view/list'),
        };

    function bindEvents() {
        view.add.on('submit', function (e) {
            var me = this;
            var data = e.data;
            model.add(data).then(function () {
                me.reset();
                curAction.refresh();
            });
        });
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

    var action = require('saber-firework').action('main');

    action.enter = function () {
        view.add.render('header');
        view.list.render('.content');

        bindEvents();

        Object.keys(rounterConfig).forEach(function (key) {
            router.add(key, rounterConfig[key]);
        });

        router.index = '/day';
        router.start();
    };

    return action;
});
