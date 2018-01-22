(function() {
    var utils = {}

    var APPID = null
    try {
        var APPID = document.getElementsByName('pocket_pa')[0].attributes.aid.nodeValue
    } catch (e) {
        console.log(e)
    }

    utils.APPID = APPID
    utils.vid = null

    utils.data = function(opts) {
        _majax({
            method: 'POST',
            url: '//www.pocketuniversity.cn/index.php/Statistic/Index/index',
            data: {
                url: encodeURIComponent(opts.url),
                app_id: this.APPID,
                vid: this.vid,
                state: opts.state //1首次   //2跳转   //3关闭
            },
            success: function(data) {
                if (data.errcode != 0) {
                    return
                }
                utils.vid = data.errmsg
            }
        })
    }

    utils.shareAns = function(opts) {
        _majax({
            method: 'POST',
            url: '//www.pocketuniversity.cn/index.php/Statistic/Index/share',
            data: {
                app_id: this.APPID,
                from_url: encodeURIComponent(opts.from_url),
                to_url: encodeURIComponent(opts.to_url),
                type: opts.type // 好友:1; 朋友圈：2
            },
            success: function() {
            }
        })
    }

    _majax = function(opts) {
        var xhr = new XMLHttpRequest()

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
                return
            }
            if (xhr.status != 200) {
                opts.failed ? opts.failed(xhr.responseText) : console.log('the ajax has failed, but no a handle function')
                return
            }

            var resText = xhr.responseText
              , response = ''

            // 匹配是否为JSON字符串
            if (/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/.test(resText)) {
                response = JSON.parse(resText)
            } else {
                response = resText
            }
            opts.success(response)
        }

        if (opts.async == undefined) {
            opts.async = true
        }

        if (opts.method.toUpperCase() === 'GET') {
            xhr.open(opts.method, opts.url + _jsonToFormString(opts.data, true), opts.async)
            xhr.send()
        }

        if (opts.method.toUpperCase() === 'POST') {
            xhr.open(opts.method, opts.url, opts.async)
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send(_jsonToFormString(opts.data))
        }

        return xhr
    }

    _jsonToFormString = function(json, query) {
        var formString = ''
        for (var item in json) {
            var tmp = item + "=" + json[item] + '&'
            formString += tmp
        }
        return query ? '?' + formString : formString
    }

    window.POCKETA = utils

    try {
        utils.data({
            state: 1,
            url: location.href
        })

        window.onbeforeunload = function() {
            utils.data({
                state: 3,
                url: location.href
            })
        }
    } catch (e) {
        console.log(e)
    }
}
)(this)
