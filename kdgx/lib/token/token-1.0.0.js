// 需要提供cookie操作功能, 和querystring重写功能
// 无需调用接口判断token是否失效, 每个数据接口会判断

// js-cookie
var _Cookies = null;
(function(factory) {
    _Cookies = factory()
    window._Cookies = _Cookies
}(function() {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                // We're using "expires" because "max-age" is not supported by IE
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                var stringifiedAttributes = '';

                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (!this.json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function(key) {
            return api.call(api, key);
        }
        ;
        api.getJSON = function() {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        }
        ;
        api.defaults = {};

        api.remove = function(key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        }
        ;

        api.withConverter = init;

        return api;
    }

    return init(function() {});
}))

function _parseQueryString() {
    var queryObj = {}
      , query = location.search
    var arr = query.substr(query.indexOf('?') + 1).split('&')
    arr.forEach(function(item) {
        var temp = item.split('=')
        queryObj[temp[0]] = temp[1]
    })
    return queryObj
}

var A_HOUR_MILLISECOND = 50 * 60 * 1000

var queryString = _parseQueryString()

var token = queryString.token
// url上带token, 重新写cookie

var innerToken = window._Cookies.get('token')
  , innerTokenSec = window._Cookies.get('token-inner')

if (!innerToken || !innerTokenSec || innerToken == 'undefined' || innerTokenSec == 'undefined') {
    try {
        if (Android) {
            location.replace('http://auth.pocketuniversity.cn/login/puapp?redirect_url=' + encodeURIComponent(location.href))
        } else {
            location.replace('http://auth.pocketuniversity.cn/login/kdgx?redirect_url=' + encodeURIComponent(location.href))
        }
    } catch (error) {
        location.replace('http://auth.pocketuniversity.cn/login/kdgx?redirect_url=' + encodeURIComponent(location.href))
    }
    // token可用
} else {
    XMLHttpRequest.prototype.open = (function(open) {
        return function() {
            open.apply(this, arguments)
            this.setRequestHeader('authorization', window._Cookies.get('token'))
        }
    }
    )((new XMLHttpRequest()).open)
}

// token可用, 往下走业务逻辑
