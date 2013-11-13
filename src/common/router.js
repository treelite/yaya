/**
 * @file hash请求路由
 * @author treelite(c.xinle@gmail.com)
 */

define(function () {

    var exports = {};
    var handlers = {};

    function normalURL(url) {
        if (url.charAt(0) != '/') {
            url = '/' + url;
        }
        return url;
    }

    function parseHash(hash) {
        var res = {};

        hash.replace(/^([^~]*)(~|$)/, function ($0, $1) {
            res.path = $1;
        });

        res.query = {};
        hash.replace(/~(.*)$/, function ($0, $1) {
            var items = $1.split('&');
            items.forEach(function (item) {
                item = item.split('=');
                res.query[item[0]] = item[1];
            });
        });

        return res;
    }

    function hashChangeHandler() {
        var hash = location.hash.substring(1);
        var info = parseHash(hash);

        var handler;
        if (handler = handlers[info.path]) {
            handler(info.query);
        }
        else {
            throw new Error(info.path + ' can not find');
        }
    }

    function redirect(url) {
        var newHash = '#' + url;
        var curHash = location.hash;

        location.hash = newHash;
        return newHash != curHash;
    }

    var exports = {};

    exports.index = '/';

    exports.add = function (path, handler) {
        path = normalURL(path);
        if (!handlers[path]) {
            handlers[path] = handler;
        }
        else {
            throw new Error(path + ' had been existed');
        }
    };

    exports.remove = function (path) {
        path = normalURL(path);
        if (handlers[path]) {
            delete handlers[path];
        }
    };

    exports.start = function () {
        window.addEventListener('hashchange', hashChangeHandler, false);

        var url = location.hash || exports.index;

        if (url.charAt('#')) {
            url = url.substring(1);
        }

        exports.redirect(url, true);
    };

    exports.redirect = function (url, force) {
        url = normalURL(url);
        if (!redirect(url) && force) {
            hashChangeHandler();
        }
    };

    return exports;
});
