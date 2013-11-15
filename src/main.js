/**
 * @file 主框架模块
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var router = require('saber-router');
    var model = require('./model/record');
    var AddView = require('./view/Add');
    var ListView = require('./view/List');

    var view = {
            add: new AddView(),
            list: new ListView()
        };
    var curAction;

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
            window.require([file], function (Action) {
                var action = new Action();
                action.enter(page.main, query).then(function () {
                    page.enter();
                });
                curAction = action;
            });
        };
    }

    var rounterConfig = {
            '/day': loadAction('/day', 'Day'),
            '/month': loadAction('/month', 'Month')
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
