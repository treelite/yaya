/**
 * @file 列表视图
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var viewport = require('saber-viewport');
    var dom = require('saber-dom');

    require('saber-viewport/transition/slide');

    function navClickHandler(e) {
        var target = e.target;

        if (target.tagName.toLowerCase() == 'a'
            && target.className.indexOf('cur') >= 0
        ) {
            e.preventDefault();
        }
    }

    function View(main) {
        this.main = main;
    }

    View.prototype.render = function () {
        var ele = dom.query('.viewport', this.main);
        viewport.init(ele);

        ele = dom.query('nav', this.main);
        ele.addEventListener('click', navClickHandler, false);
    };

    View.prototype.load = function (url) {
        var items = dom.queryAll('nav a', this.main);
        
        items = Array.prototype.slice.call(items);
        items.forEach(function (item) {
            if (item.href.indexOf('#' + url) >= 0) {
                item.className += ' cur';
            }
            else {
                item.className = item.className.replace(/\s+cur/g, '');
            }
        });
        return viewport.load(url);
    };

    return View;
});
