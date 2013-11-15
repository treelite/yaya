/**
 * @file 添加区域视图
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var dom = require('saber-dom');
    var BaseView = require('saber-firework/View');

    function View() {
        BaseView.call(this, 'add');
    }

    BaseView.subClass(View);

    function submit(view) {
        var input = dom.query('input', view.main);
        var value = input.value = input.value.trim();

        if (!value) {
            return;
        }

        view.emit('submit', {data: value});
    }

    function bindEvents(view) {
        var main = view.main;

        var ele = dom.query('#submit', main);
        ele.addEventListener(
            'click',
            function (e) {
                submit(view);
                e.preventDefault();
            },
            false
        );

        ele = dom.query('input', main);
        ele.addEventListener(
            'keydown', 
            function (e) {
                if (e.which === 13) {
                    submit(view);
                }
            }, 
            false
        );
    }
    
    View.prototype.reset = function () {
        var input = dom.query('input', this.main);
        input.value = '';
    };

    View.prototype.render = function (main) {
        BaseView.prototype.render.call(this, main);
        bindEvents(this);
    };
    
    return View;
});
