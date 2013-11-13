/**
 * @file Server服务分发
 * @author treelite(c.xinle@gmail.com)
 */

var path = require('path');
var fs = require('fs');

function getModuleIdFromUrl(url) {
    url = url.substring(1);
    url = url.replace(/\.action([?#].*)?$/, '');
    var name = path.basename(url);
    name = name.charAt(0).toUpperCase() + name.substring(1);

    return './service/' + path.dirname(url) + '/' + name;
}

function extend(target, source) {
    Object.keys(source).forEach(function (key) {
        target[key] = source[key];
    });
    return target;
}

function getQuery(request) {
    var query = '';
    request.url.replace(
        /\?([^#].+)/, 
        function ($0, $1) {
            query = $1;
        }
    );
    var querystring = require('querystring');
    var res = querystring.parse(query);

    if (request.method == 'POST') {
        var data = querystring.parse(request.bodyBuffer.toString());
        res = extend(res, data);
    }

    return res;
}

function finish(context) {
    return function (data) {
        context.status = data.status || 200;
        context.header['Content-Type'] = data.contentType || 'text/html';
        context.content = data.content || data;
        context.start();
    };
}

module.exports = function () {

    return function (context) {
        var request = context.request;
        var moduleId = getModuleIdFromUrl(request.url);

        if (!fs.existsSync(path.resolve(__dirname, moduleId + '.js'))) {
            context.response.writeHeader(404);
            context.end();
            return;
        }

        var Action = require(moduleId);
        var action = new Action();
        var handler = action[request.method];

        if (!handler) {
            context.response.writeHeader(405);
            context.end();
            return;
        }
        
        try { 
            context.stop();
            handler(getQuery(request), finish(context));
        }
        catch (e) {
            console.log('[Server Error] ' + e);
            context.response.writeHeader(500);
            context.end();
        }
    };
};
