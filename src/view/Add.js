/**
 * @file 添加区域视图
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var Emitter = require('saber-emitter');
    var dom = require('saber-dom');
    
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
    
    function View(main) {
        Emitter.mixin(this);
        this.main = main;
    }

    View.prototype.reset = function () {
        var input = dom.query('input', this.main);
        input.value = '';
    };

    View.prototype.render = function () {
        bindEvents(this);
    };
    
    return View;
});
