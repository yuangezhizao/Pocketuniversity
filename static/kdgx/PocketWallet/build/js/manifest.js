!function(e) {
    function t(n) {
        if (r[n])
            return r[n].exports;
        var o = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, t),
        o.l = !0,
        o.exports
    }
    var n = window.webpackJsonp;
    window.webpackJsonp = function(r, c, a) {
        for (var i, u, f, l = 0, s = []; l < r.length; l++)
            u = r[l],
            o[u] && s.push(o[u][0]),
            o[u] = 0;
        for (i in c)
            Object.prototype.hasOwnProperty.call(c, i) && (e[i] = c[i]);
        for (n && n(r, c, a); s.length; )
            s.shift()();
        if (a)
            for (l = 0; l < a.length; l++)
                f = t(t.s = a[l]);
        return f
    }
    ;
    var r = {}
      , o = {
        4: 0
    };
    t.e = function(e) {
        function n() {
            i.onerror = i.onload = null,
            clearTimeout(u);
            var t = o[e];
            0 !== t && (t && t[1](new Error("Loading chunk " + e + " failed.")),
            o[e] = void 0)
        }
        var r = o[e];
        if (0 === r)
            return new Promise(function(e) {
                e()
            }
            );
        if (r)
            return r[2];
        var c = new Promise(function(t, n) {
            r = o[e] = [t, n]
        }
        );
        r[2] = c;
        var a = document.getElementsByTagName("head")[0]
          , i = document.createElement("script");
        i.type = "text/javascript",
        i.charset = "utf-8",
        i.async = !0,
        i.timeout = 12e4,
        t.nc && i.setAttribute("nonce", t.nc),
        i.src = t.p + "js/" + e + ".js?v=" + {
            0: "4846e32b3cd30bd6ccf7",
            1: "ea1a5140adea560ec910",
            2: "3f220ccfd82341300226",
            3: "2d431de51b1645381a90"
        }[e];
        var u = setTimeout(n, 12e4);
        return i.onerror = i.onload = n,
        a.appendChild(i),
        c
    }
    ,
    t.m = e,
    t.c = r,
    t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }
    ,
    t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return t.d(n, "a", n),
        n
    }
    ,
    t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    t.p = "http://static.pocketuniversity.cn/kdgx/PocketWallet/build/",
    t.oe = function(e) {
        throw console.error(e),
        e
    }
}([]);
manifest
