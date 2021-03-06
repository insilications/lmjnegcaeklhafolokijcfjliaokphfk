! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 252)
}([, function(e, t, n) {
    "use strict";
    var r = n(2),
        i = r.browser,
        a = {};
    r.rpc = n(3), r.rpc.setUseTarget(!0), r.rpc.setPost(function(e, t) {
        var n = a[e];
        n && n.port && n.port.postMessage(t)
    }), r.rpc.listen({
        appStarted: function(e) {},
        appReady: function(e) {},
        closePanel: function(e) {
            r.ui.close(e)
        }
    }), i.runtime.onConnect.addListener(function(e) {
        /^weh:(.*?):(.*)/.exec(e.name) && (e.onMessage.addListener(function(t) {
            if (void 0 !== t._method && ("appStarted" === t._method || "appReady" === t._method)) {
                var n = t._args[0] && t._args[0].uiName || null,
                    i = a[n] || {
                        ready: !1
                    };
                if (a[n] = i, Object.assign(i, t._args[0], {
                        port: e
                    }), "appReady" == t._method) {
                    i.ready = !0, i.initData && setTimeout(function() {
                        r.rpc.call(n, "wehInitData", i.initData)
                    }, 0);
                    var o = p[n];
                    o && o.timer && (clearTimeout(o.timer), delete o.timer)
                }
                e._weh_app = n
            }
            r.rpc.receive(t, e.postMessage.bind(e), e._weh_app)
        }), e.onDisconnect.addListener(function() {
            var t = e._weh_app;
            if (t) {
                delete a[t];
                var n = p[t];
                n && (n.timer && clearTimeout(n.timer), delete p[t], n.reject(new Error("Disconnected waiting for " + t)))
            }
        }))
    }), r.__declareAppTab = function(e, t) {
        a[e] || (a[e] = {}), Object.assign(a[e], t)
    }, r.__closeByTab = function(e) {
        Object.keys(a).forEach(function(t) {
            if (a[t].tab === e) {
                delete a[t];
                var n = p[t];
                n && (n.timer && clearTimeout(n.timer), delete p[t], n.reject(new Error("Disconnected waiting for " + t)))
            }
        })
    }, r._ = n(9).getMessage, r.ui = n(254), r.openedContents = function() {
        return Object.keys(a)
    };
    var o = n(24);

    function s(e) {
        var t = 0;
        if (0 === e.length) return t;
        for (var n = 0; n < e.length; n++) t = (t << 5) - t + e.charCodeAt(n), t &= t;
        return t
    }
    r.prefs = o;
    var u, c, l = 0,
        d = {};
    try {
        var f = localStorage.getItem("weh-prefs");
        null === f ? i.storage.local.get("weh-prefs").then(function(e) {
            var t = e["weh-prefs"];
            t && o.assign(t)
        }) : (u = f, c = {}, JSON.parse(u).forEach(function(e) {
            c[e.name] = e.value
        }), d = c, l = s(f))
    } catch (e) {}
    o.assign(d), o.on("", {
        pack: !0
    }, function(e, t) {
        Object.assign(d, e);
        var n, o = (n = d, JSON.stringify(Object.keys(n).sort().map(function(e) {
                return {
                    name: e,
                    value: n[e]
                }
            }))),
            u = s(o);
        u != l && (l = u, localStorage.setItem("weh-prefs", o), i.storage.local.set({
            "weh-prefs": d
        })), Object.keys(a).forEach(function(t) {
            a[t].usePrefs && r.rpc.call(t, "setPrefs", e)
        })
    });
    var p = {};
    r.wait = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = p[e];
        return n && (n.timer && clearTimeout(n.timer), delete p[e], n.reject(new Error("Waiter for " + e + " overriden"))), new Promise(function(n, r) {
            p[e] = {
                resolve: n,
                reject: r,
                timer: setTimeout(function() {
                    delete p[e], r(new Error("Waiter for " + e + " timed out"))
                }, t.timeout || 6e4)
            }
        })
    }, r.rpc.listen({
        prefsGetAll: function() {
            return o.getAll()
        },
        prefsGetSpecs: function() {
            return o.getSpecs()
        },
        prefsSet: function(e) {
            return o.assign(e)
        },
        trigger: function(e, t) {
            var n = p[e];
            if (!n) throw new Error("No waiter for", e);
            n.timer && (clearTimeout(n.timer), delete n.timer), delete p[e], n.resolve(t)
        }
    }), e.exports = r
}, function(e, t, n) {
    "use strict";
    var r;
    t.browser = n(4), r = "undefined" == typeof browser && "undefined" != typeof chrome && chrome.runtime ? /\bOPR\//.test(navigator.userAgent) ? "opera" : "chrome" : /\bEdge\//.test(navigator.userAgent) ? "edge" : "firefox", t.browserType = r, t.isBrowser = function() {
        for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
        for (var i = 0; i < n.length; i++)
            if (n[i] == t.browserType) return !0;
        return !1
    }, t.error = function(e) {
        console.groupCollapsed(e.message), e.stack && console.error(e.stack), console.groupEnd()
    }
}, function(e, t, n) {
    "use strict";
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();

    function i(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    function a(e) {
        return Array.isArray(e) ? e : Array.from(e)
    }
    var o = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.replyId = 0, this.replies = {}, this.listeners = {}, this.hook = this.nullHook, this.debugLevel = 0, this.useTarget = !1, this.logger = console, this.posts = {}
        }
        return r(e, [{
            key: "setPost",
            value: function(e, t) {
                "string" == typeof e ? this.posts[e] = t : this.post = e
            }
        }, {
            key: "setUseTarget",
            value: function(e) {
                this.useTarget = e
            }
        }, {
            key: "setDebugLevel",
            value: function(e) {
                this.debugLevel = e
            }
        }, {
            key: "setHook",
            value: function(e) {
                var t = this,
                    n = Date.now();
                this.hook = e ? function(r) {
                    r.timestamp = "undefined" != typeof window && void 0 !== window.performance ? window.performance.now() : Date.now() - n;
                    try {
                        e(r)
                    } catch (e) {
                        t.logger.warn("Hoor error", e)
                    }
                } : this.nullHook
            }
        }, {
            key: "nullHook",
            value: function() {}
        }, {
            key: "call",
            value: function() {
                var e, t, n, r, o = this,
                    s = Array.prototype.slice.call(arguments);
                if ("function" == typeof s[0] && (e = s.shift()), o.useTarget) {
                    var u = a(s);
                    t = u[0], n = u[1], r = u.slice(2)
                } else {
                    var c = a(s);
                    n = c[0], r = c.slice(1)
                }
                return new Promise(function(a, s) {
                    var u = ++o.replyId;
                    o.debugLevel >= 2 && o.logger.info("rpc #" + u, "call =>", n, r), o.hook({
                        type: "call",
                        callee: t,
                        rid: u,
                        method: n,
                        args: r
                    }), o.replies[u] = {
                        resolve: a,
                        reject: s,
                        peer: t
                    };
                    var c = e || o.useTarget && o.posts[t] || o.post;
                    o.useTarget ? c(t, {
                        type: "weh#rpc",
                        _request: u,
                        _method: n,
                        _args: [].concat(i(r))
                    }) : c({
                        type: "weh#rpc",
                        _request: u,
                        _method: n,
                        _args: [].concat(i(r))
                    })
                })
            }
        }, {
            key: "receive",
            value: function(e, t, n) {
                var r = this;
                if (e._request) Promise.resolve().then(function() {
                    var t = r.listeners[e._method];
                    if ("function" == typeof t) return r.debugLevel >= 2 && r.logger.info("rpc #" + e._request, "serve <= ", e._method, e._args), r.hook({
                        type: "call",
                        caller: n,
                        rid: e._request,
                        method: e._method,
                        args: e._args
                    }), Promise.resolve(t.apply(null, e._args)).then(function(t) {
                        return r.hook({
                            type: "reply",
                            caller: n,
                            rid: e._request,
                            result: t
                        }), t
                    }).catch(function(t) {
                        throw r.hook({
                            type: "reply",
                            caller: n,
                            rid: e._request,
                            error: t.message
                        }), t
                    });
                    throw new Error("Method " + e._method + " is not a function")
                }).then(function(n) {
                    r.debugLevel >= 2 && r.logger.info("rpc #" + e._request, "serve => ", n), t({
                        type: "weh#rpc",
                        _reply: e._request,
                        _result: n
                    })
                }).catch(function(n) {
                    r.debugLevel >= 1 && r.logger.info("rpc #" + e._request, "serve => !", n.message), t({
                        type: "weh#rpc",
                        _reply: e._request,
                        _error: n.message
                    })
                });
                else if (e._reply) {
                    var i = r.replies[e._reply];
                    delete r.replies[e._reply], i ? e._error ? (r.debugLevel >= 1 && r.logger.info("rpc #" + e._reply, "call <= !", e._error), r.hook({
                        type: "reply",
                        callee: i.peer,
                        rid: e._reply,
                        error: e._error
                    }), i.reject(new Error(e._error))) : (r.debugLevel >= 2 && r.logger.info("rpc #" + e._reply, "call <= ", e._result), r.hook({
                        type: "reply",
                        callee: i.peer,
                        rid: e._reply,
                        result: e._result
                    }), i.resolve(e._result)) : r.logger.error("Missing reply handler")
                }
            }
        }, {
            key: "listen",
            value: function(e) {
                Object.assign(this.listeners, e)
            }
        }]), e
    }();
    e.exports = new o
}, function(e, t, n) {
    var r, i, a, o;
    o = function(e) {
        "use strict";
        if ("undefined" == typeof browser) {
            const t = () => {
                const e = {
                    alarms: {
                        clear: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        clearAll: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        get: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        getAll: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    },
                    bookmarks: {
                        create: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        export: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        get: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getChildren: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getRecent: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getTree: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        getSubTree: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        import: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        move: {
                            minArgs: 2,
                            maxArgs: 2
                        },
                        remove: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        removeTree: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        search: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        update: {
                            minArgs: 2,
                            maxArgs: 2
                        }
                    },
                    browserAction: {
                        getBadgeBackgroundColor: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getBadgeText: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getPopup: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getTitle: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        setIcon: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    },
                    commands: {
                        getAll: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    },
                    contextMenus: {
                        update: {
                            minArgs: 2,
                            maxArgs: 2
                        },
                        remove: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        removeAll: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    },
                    cookies: {
                        get: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getAll: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getAllCookieStores: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        remove: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        set: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    },
                    downloads: {
                        download: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        cancel: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        erase: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getFileIcon: {
                            minArgs: 1,
                            maxArgs: 2
                        },
                        open: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        pause: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        removeFile: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        resume: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        search: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        show: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    },
                    extension: {
                        isAllowedFileSchemeAccess: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        isAllowedIncognitoAccess: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    },
                    history: {
                        addUrl: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getVisits: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        deleteAll: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        deleteRange: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        deleteUrl: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        search: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    },
                    i18n: {
                        detectLanguage: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getAcceptLanguages: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    },
                    idle: {
                        queryState: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    },
                    management: {
                        get: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getAll: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        getSelf: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        uninstallSelf: {
                            minArgs: 0,
                            maxArgs: 1
                        }
                    },
                    notifications: {
                        clear: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        create: {
                            minArgs: 1,
                            maxArgs: 2
                        },
                        getAll: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        getPermissionLevel: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        update: {
                            minArgs: 2,
                            maxArgs: 2
                        }
                    },
                    pageAction: {
                        getPopup: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getTitle: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        hide: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        setIcon: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        show: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    },
                    runtime: {
                        getBackgroundPage: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        getBrowserInfo: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        getPlatformInfo: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        openOptionsPage: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        requestUpdateCheck: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        sendMessage: {
                            minArgs: 1,
                            maxArgs: 3
                        },
                        sendNativeMessage: {
                            minArgs: 2,
                            maxArgs: 2
                        },
                        setUninstallURL: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    },
                    storage: {
                        local: {
                            clear: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            get: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getBytesInUse: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            set: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        managed: {
                            get: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getBytesInUse: {
                                minArgs: 0,
                                maxArgs: 1
                            }
                        },
                        sync: {
                            clear: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            get: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getBytesInUse: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            set: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        }
                    },
                    tabs: {
                        create: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        captureVisibleTab: {
                            minArgs: 0,
                            maxArgs: 2
                        },
                        detectLanguage: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        duplicate: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        executeScript: {
                            minArgs: 1,
                            maxArgs: 2
                        },
                        get: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getCurrent: {
                            minArgs: 0,
                            maxArgs: 0
                        },
                        getZoom: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        getZoomSettings: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        highlight: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        insertCSS: {
                            minArgs: 1,
                            maxArgs: 2
                        },
                        move: {
                            minArgs: 2,
                            maxArgs: 2
                        },
                        reload: {
                            minArgs: 0,
                            maxArgs: 2
                        },
                        remove: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        query: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        removeCSS: {
                            minArgs: 1,
                            maxArgs: 2
                        },
                        sendMessage: {
                            minArgs: 2,
                            maxArgs: 3
                        },
                        setZoom: {
                            minArgs: 1,
                            maxArgs: 2
                        },
                        setZoomSettings: {
                            minArgs: 1,
                            maxArgs: 2
                        },
                        update: {
                            minArgs: 1,
                            maxArgs: 2
                        }
                    },
                    webNavigation: {
                        getAllFrames: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        getFrame: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    },
                    webRequest: {
                        handlerBehaviorChanged: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    },
                    windows: {
                        create: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        get: {
                            minArgs: 1,
                            maxArgs: 2
                        },
                        getAll: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        getCurrent: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        getLastFocused: {
                            minArgs: 0,
                            maxArgs: 1
                        },
                        remove: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        update: {
                            minArgs: 2,
                            maxArgs: 2
                        }
                    }
                };
                if (0 === Object.keys(e).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
                const t = (e, t) => {
                        const n = e => 1 == e ? "argument" : "arguments";
                        return function(r, ...i) {
                            if (i.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${n(t.minArgs)} for ${e}(), got ${i.length}`);
                            if (i.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${n(t.maxArgs)} for ${e}(), got ${i.length}`);
                            return new Promise((t, n) => {
                                r[e](...i, (e => (...t) => {
                                    chrome.runtime.lastError ? e.reject(chrome.runtime.lastError) : 1 === t.length ? e.resolve(t[0]) : e.resolve(t)
                                })({
                                    resolve: t,
                                    reject: n
                                }))
                            })
                        }
                    },
                    n = (e, t, n) => new Proxy(t, {
                        apply: (t, r, i) => n.call(r, e, ...i)
                    });
                let r = Function.call.bind(Object.prototype.hasOwnProperty);
                const i = (e, a = {}, o = {}) => {
                        let s = Object.create(null),
                            u = {
                                has: (e, t) => t in e || t in s,
                                get(e, u, c) {
                                    if (u in s) return s[u];
                                    if (!(u in e)) return;
                                    let l = e[u];
                                    if ("function" == typeof l)
                                        if ("function" == typeof a[u]) l = n(e, e[u], a[u]);
                                        else if (r(o, u)) {
                                        let r = t(u, o[u]);
                                        l = n(e, e[u], r)
                                    } else l = l.bind(e);
                                    else {
                                        if ("object" != typeof l || null === l || !r(a, u) && !r(o, u)) return Object.defineProperty(s, u, {
                                            configurable: !0,
                                            enumerable: !0,
                                            get: () => e[u],
                                            set(t) {
                                                e[u] = t
                                            }
                                        }), l;
                                        l = i(l, a[u], o[u])
                                    }
                                    return s[u] = l, l
                                },
                                set: (e, t, n, r) => (t in s ? s[t] = n : e[t] = n, !0),
                                defineProperty: (e, t, n) => Reflect.defineProperty(s, t, n),
                                deleteProperty: (e, t) => Reflect.deleteProperty(s, t)
                            };
                        return new Proxy(e, u)
                    },
                    a = {
                        runtime: {
                            onMessage: (e => ({
                                addListener(t, n, ...r) {
                                    t.addListener(e.get(n), ...r)
                                },
                                hasListener: (t, n) => t.hasListener(e.get(n)),
                                removeListener(t, n) {
                                    t.removeListener(e.get(n))
                                }
                            }))(new class extends WeakMap {
                                constructor(e, t) {
                                    super(t), this.createItem = e
                                }
                                get(e) {
                                    return this.has(e) || this.set(e, this.createItem(e)), super.get(e)
                                }
                            }(e => "function" != typeof e ? e : function(t, n, r) {
                                let i = e(t, n);
                                if ((e => e && "object" == typeof e && "function" == typeof e.then)(i)) return i.then(r, e => {
                                    console.error(e), r(e)
                                }), !0;
                                void 0 !== i && r(i)
                            }))
                        }
                    };
                return i(chrome, a, e)
            };
            e.exports = t()
        } else e.exports = browser
    }, i = [e], void 0 === (a = "function" == typeof(r = o) ? r.apply(t, i) : r) || (e.exports = a)
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    t.hash = c, t.hashHex = function(e) {
        return Math.abs(c(e)).toString(16)
    }, t.gotoTab = l, t.gotoOrOpenTab = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = 0;
        return l(e).then(function(r) {
            return r ? Promise.resolve() : function r() {
                return s.windows.getLastFocused({
                    windowTypes: ["normal"]
                }).then(function(e) {
                    return "normal" != e.type ? ++n < 20 ? new Promise(function(e, t) {
                        setTimeout(function() {
                            return r()
                        }, 100)
                    }) : new Promise(function(e, t) {
                        s.windows.getAll({
                            windowTypes: ["normal"]
                        }).then(function(t) {
                            if (t.every(function(t) {
                                    return "normal" != t.type || (e(t.id), !1)
                                })) throw new Error("No normal window to open tab")
                        })
                    }) : e.id
                }).then(function(n) {
                    var r = null;
                    if (n) return s.tabs.query({
                        active: !0,
                        lastFocusedWindow: !0
                    }).then(function(i) {
                        return i.length > 0 && (r = i[0].id), new Promise(function(t, r) {
                            var i = null,
                                a = function e(n, r, a) {
                                    n == i && "complete" === r.status && (s.tabs.onUpdated.removeListener(e), t(a))
                                };
                            s.tabs.onUpdated.addListener(a), s.tabs.create({
                                url: e,
                                windowId: n
                            }).then(function(e) {
                                "complete" === e.status ? (s.tabs.onUpdated.removeListener(a), t(e)) : i = e.id
                            })
                        }).then(function(e) {
                            r && t && t(e.id, r)
                        })
                    })
                })
            }()
        })
    }, t.arrayEquals = function(e, t) {
        if (e.length !== t.length) return !1;
        for (var n = 0, r = e.length; n < r; n++)
            if (e[n] !== t[n]) return !1;
        return !0
    }, t.equals = function(e, t) {
        return u(e, t)
    }, t.request = v, t.downloadToByteArray = function(e, t, n, r, i) {
        v({
            url: e,
            headers: t,
            anonymous: n,
            responseType: "arraybuffer",
            onComplete: function(e) {
                if (200 != e.status) return i(new Error("Request response status " + e.status));
                var t = e.response;
                if (!t) return i(new Error("Empty/no response"));
                i(null, new Uint8Array(t))
            }
        })
    }, t.bufferToHex = function(e) {
        for (var t = [], n = new DataView(e), r = 0; r < n.byteLength; r += 4) {
            var i = n.getUint32(r),
                a = i.toString(16),
                o = ("00000000" + a).slice(-"00000000".length);
            t.push(o)
        }
        return t.join("")
    }, t.Concurrent = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        var r = new(Function.prototype.bind.apply(y, [null].concat(t)));
        return r.callFn().bind(r)
    }, t.isMinimumVersion = function(e, t) {
        for (var n = e.split(".").map(function(e) {
                return parseInt(e)
            }), r = t.split(".").map(function(e) {
                return parseInt(e)
            }), i = 0; i < n.length; i++) {
            if (void 0 === r[i]) return !0;
            if (n[i] > r[i]) return !0;
            if (n[i] < r[i]) return !1
        }
        return !0
    };
    var s = n(1).browser,
        u = n(93);

    function c(e) {
        var t, n, r = 0;
        if (0 === e.length) return r;
        for (t = 0, n = e.length; t < n; t++) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
        return r
    }

    function l(e) {
        return s.tabs.query({
            url: e
        }).then(function(e) {
            return e.length > 0 && (s.tabs.update(e[0].id, {
                active: !0
            }), s.windows.update(e[0].windowId, {
                focused: !0
            }), !0)
        })
    }
    var d = function() {
            var e, t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                n = [];
            for (e = 0; e < t.length; e++) n[e] = t[e];
            var r = [];
            for (e = 0; e < t.length; ++e) r[t.charCodeAt(e)] = e;
            r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63;
            var i = "undefined" != typeof Uint8Array ? Uint8Array : Array;

            function a(e) {
                var t = r[e.charCodeAt(0)];
                return void 0 !== t ? t : -1
            }

            function o(e) {
                return n[e]
            }

            function s(e, t, n) {
                for (var r, i, a = [], s = t; s < n; s += 3) r = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], a.push(o((i = r) >>> 18 >>> 0 & 63) + o(i >>> 12 >>> 0 & 63) + o(i >>> 6 >>> 0 & 63) + o(63 & i));
                return a.join("")
            }
            return {
                toByteArray: function(e) {
                    var t, n, r, o, s, u;
                    if (e.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var c = e.length;
                    s = "=" === e.charAt(c - 2) ? 2 : "=" === e.charAt(c - 1) ? 1 : 0, u = new i(3 * e.length / 4 - s), r = s > 0 ? e.length - 4 : e.length;
                    var l = 0;

                    function d(e) {
                        u[l++] = e
                    }
                    for (t = 0, n = 0; t < r; t += 4, n += 3) d((16711680 & (o = a(e.charAt(t)) << 18 | a(e.charAt(t + 1)) << 12 | a(e.charAt(t + 2)) << 6 | a(e.charAt(t + 3)))) >>> 16 >>> 0), d((65280 & o) >>> 8 >>> 0), d((255 & o) >>> 0);
                    return 2 === s ? d(255 & (o = a(e.charAt(t)) << 2 | a(e.charAt(t + 1)) >>> 4 >>> 0)) : 1 === s && (d((o = a(e.charAt(t)) << 10 | a(e.charAt(t + 1)) << 4 | a(e.charAt(t + 2)) >>> 2 >>> 0) >>> 8 >>> 0 & 255), d(255 & o)), u
                },
                fromByteArray: function(e) {
                    var t, n, r, i = e.length % 3,
                        a = "",
                        u = [];
                    for (t = 0, r = e.length - i; t < r; t += 16383) u.push(s(e, t, t + 16383 > r ? r : t + 16383));
                    switch (i) {
                        case 1:
                            a += o((n = e[e.length - 1]) >>> 2 >>> 0), a += o(n << 4 & 63), a += "==";
                            break;
                        case 2:
                            a += o((n = (e[e.length - 2] << 8) + e[e.length - 1]) >>> 10 >>> 0), a += o(n >>> 4 >>> 0 & 63), a += o(n << 2 & 63), a += "="
                    }
                    return u.push(a), u.join("")
                }
            }
        }(),
        f = d.toByteArray,
        p = d.fromByteArray;
    t.toByteArray = f, t.fromByteArray = p;
    var h = function() {
            function e(t) {
                o(this, e), this.xhr = t
            }
            return r(e, [{
                key: "url",
                get: function() {
                    return this.xhr.responseURL
                }
            }, {
                key: "text",
                get: function() {
                    return this.xhr.responseText
                }
            }, {
                key: "xml",
                get: function() {
                    return this.xhr.responseXML
                }
            }, {
                key: "response",
                get: function() {
                    return this.xhr.response
                }
            }, {
                key: "json",
                get: function() {
                    try {
                        return JSON.parse(this.xhr.responseText)
                    } catch (e) {
                        return null
                    }
                }
            }, {
                key: "status",
                get: function() {
                    return this.xhr.status
                }
            }, {
                key: "statusText",
                get: function() {
                    return this.xhr.statusText
                }
            }, {
                key: "headers",
                get: function() {
                    return {}
                }
            }]), e
        }(),
        g = ["Accept-Charset", "Accept-Encoding", "Access-Control-Request-Headers", "Access-Control-Request-Method", "Connection", "Content-Length", "Cookie", "Cookie2", "Date", "DNT", "Expect", "Host", "Keep-Alive", "Origin", "Referer", "TE", "Trailer", "Transfer-Encoding", "Upgrade", "Via", "x-chrome-uma-enabled", "x-client-data"].map(function(e) {
            return e.toLowerCase()
        }),
        m = ["Proxy-", "Sec-"].map(function(e) {
            return e.toLowerCase()
        });

    function v(e) {
        var t = new XMLHttpRequest({
            mozAnon: e.anonymous
        });
        if (e.responseType && (t.responseType = e.responseType), t.onreadystatechange = function() {
                4 == t.readyState && e.onComplete && e.onComplete(new h(t))
            }, t.open(e.method || "GET", e.url), e.headers)
            for (var n in e.headers) g.indexOf(n.toLowerCase()) < 0 && m.every(function(e) {
                return !n.toLowerCase().startsWith(e)
            }) && t.setRequestHeader(n, e.headers[n]);
        var r = e.contentJSON && JSON.stringify(e.contentJSON) || e.content || null;
        t.send(r)
    }
    t.Cache = function() {
        function e(t, n) {
            o(this, e), this.getFn = t, this.setFn = n, this.callbacks = [], this.queried = !1, this.value = void 0
        }
        return r(e, [{
            key: "get",
            value: function() {
                var e = this;
                return function() {
                    return void 0 !== e.value ? Promise.resolve(e.value) : new Promise(function(t, n) {
                        if (e.callbacks.push({
                                resolve: t,
                                reject: n
                            }), !e.queried) {
                            e.queried = !0;
                            try {
                                Promise.resolve(e.getFn()).then(function(t) {
                                    for (e.value = t; e.callbacks.length;) e.callbacks.shift().resolve(t)
                                }).catch(function(t) {
                                    for (; e.callbacks.length;) e.callbacks.shift().reject(t)
                                })
                            } catch (t) {
                                for (e.queried = !1; e.callbacks.length;) e.callbacks.shift().reject(t)
                            }
                        }
                    })
                }
            }
        }, {
            key: "set",
            value: function(e) {
                if (!this.setFn) return Promise.reject(new Error("Value is read-only"));
                if (void 0 === e) return Promise.reject(new Error("Cannot set undefined value"));
                for (this.value = e; this.callbacks.length;) this.callbacks.shift().resolve(result);
                return this.setFn(e), Promise.resolve()
            }
        }]), e
    }();
    var y = function() {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            o(this, e), this.maxFn = t, this.pendings = [], this.count = 0
        }
        return r(e, [{
            key: "getMax",
            value: function() {
                return Promise.resolve("function" == typeof this.maxFn ? this.maxFn() : this.maxFn)
            }
        }, {
            key: "callFn",
            value: function() {
                var e = this;
                return function(t, n) {
                    return e.getMax().then(function(r) {
                        return e.count < r ? e.doCall(t) : new Promise(function(r, i) {
                            var a = function() {
                                return Promise.resolve(t()).then(r).catch(i)
                            };
                            e.pendings.push(a), n && n(function(t) {
                                var n = e.pendings.indexOf(a);
                                n >= 0 && (e.pendings.splice(n, 1), r(t))
                            }, function(t) {
                                var n = e.pendings.indexOf(a);
                                n >= 0 && (e.pendings.splice(n, 1), i(t))
                            })
                        })
                    })
                }
            }
        }, {
            key: "attempt",
            value: function() {
                if (this.pendings.length > 0) {
                    var e = this;
                    e.getMax().then(function(t) {
                        e.count < t && e.doCall(e.pendings.shift())
                    })
                }
            }
        }, {
            key: "doCall",
            value: function(e) {
                var t = this;
                return this.count++, Promise.resolve(e()).then(function(e) {
                    return t.count--, t.attempt(), e
                }).catch(function(e) {
                    throw t.count--, t.attempt(), e
                })
            }
        }]), e
    }();
    var b = function(e) {
            function t(e) {
                o(this, t);
                var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return n.name = n.constructor.name, "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(n, n.constructor) : n.stack = new Error(e).stack, n
            }
            return a(t, Error), t
        }(),
        w = t.VDHError = function(e) {
            function t(e, n) {
                o(this, t);
                var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return Object.assign(r, n), r
            }
            return a(t, b), t
        }();
    t.DetailsError = function(e) {
        function t(e, n) {
            return o(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, {
                details: n
            }))
        }
        return a(t, w), r(t, [{
            key: "details",
            get: function() {
                return this.details
            }
        }]), t
    }()
}, , , , function(e, t, n) {
    "use strict";
    var r = n(2).browser,
        i = {},
        a = new RegExp("\\$[a-zA-Z]*([0-9]+)\\$", "g");

    function o() {
        try {
            null === (i = JSON.parse(window.localStorage.getItem("wehI18nCustom"))) && (i = {}, r.storage.local.get("wehI18nCustom").then(function(e) {
                var t = e.wehI18nCustom;
                t && Object.assign(i, t)
            }))
        } catch (e) {
            i = {}
        }
    }
    o(), e.exports = {
        getMessage: function(e, t) {
            if (/-/.test(e)) {
                var n = e.replace(/-/g, "_");
                console.warn("Wrong i18n message name. Should it be", n, "instead of", e, "?"), e = n
            }
            var o = i[e];
            return o && o.message.length > 0 ? (Array.isArray(t) || (t = [t]), (o.message || "").replace(a, function(e) {
                var n = a.exec(e);
                return n && t[parseInt(n[1]) - 1] || "??"
            })) : r.i18n.getMessage.apply(r.i18n, arguments)
        },
        reload: o
    }
}, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.dispatch = function(e, t) {
        _.dispatch({
            type: e,
            payload: t
        })
    }, t.getHit = function(e) {
        return _.getState().hits[e]
    }, t.getHits = function() {
        return _.getState().hits
    }, t.getLogs = function() {
        return _.getState().logs
    }, t.getF4fHitDataByUrlHint = function(e) {
        var t = _.getState().hits;
        for (var n in t) {
            var r = t[n];
            if ("f4f" == r.chunked && r._media && r._media.urlHint == e) return r
        }
        return null
    };
    var r = n(53),
        i = r.createStore,
        a = r.combineReducers,
        o = r.applyMiddleware,
        s = n(114).createLogger,
        u = n(259),
        c = n(1),
        l = n(3),
        d = n(39),
        f = n(59),
        p = n(270),
        h = (n(62), n(94)),
        g = n(60),
        m = n(95),
        v = n(271),
        y = n(240),
        b = n(238),
        w = n(63),
        k = n(119);
    n(40);
    var x = [];
    c.prefs.backgroundReduxLogger && x.push(s({
        collapsed: function(e, t, n) {
            return !0
        }
    }));
    var A = c.browser,
        _ = i(a({
            hits: d.reducer,
            progress: d.progressReducer,
            logs: h.reducer
        }), o.apply(void 0, x)),
        I = u(_.getState, "hits"),
        O = u(_.getState, "progress"),
        P = u(_.getState, "logs");

    function C() {
        var e = _.getState().hits,
            t = 0,
            n = 0,
            r = 0,
            i = 0;
        Object.keys(e).forEach(function(a) {
            switch (e[a].status) {
                case "running":
                    i++;
                    break;
                case "active":
                    t++, n++;
                    break;
                case "inactive":
                    n++;
                    break;
                case "pinned":
                    r++
            }
        });
        var a = !1;
        (0 == n || "currenttab" == c.prefs.iconActivation && 0 == t) && (a = !0), A.browserAction.setIcon({
            path: p.icons({
                32: "../content/images/icon-32" + (a ? "-off" : "") + ".png",
                40: "../content/images/icon-40" + (a ? "-off" : "") + ".png",
                48: "../content/images/icon-48" + (a ? "-off" : "") + ".png",
                128: "../content/images/icon-128" + (a ? "-off" : "") + ".png"
            })
        });
        var o = "",
            s = "#000";
        switch (c.prefs.iconBadge) {
            case "tasks":
                s = "#00f", o = i || "";
                break;
            case "activetab":
                s = "#080", o = t || "";
                break;
            case "anytab":
                s = "#b59e32", o = n || "";
                break;
            case "pinned":
                s = "#000", o = r || "";
                break;
            case "mixed":
                r > 0 ? (s = "#000", o = r) : i > 0 ? (s = "#00f", o = i) : t > 0 ? (s = "#080", o = t) : n > 0 && (s = "#b59e32", o = n)
        }
        var u = _.getState().logs.filter(function(e) {
            return "error" === e.type
        });
        u.length > 0 && (o = u.length, s = "#f44"), A.browserAction.setBadgeText({
            text: "" + o
        }), A.browserAction.setBadgeBackgroundColor({
            color: s
        })
    }
    _.subscribe(I(function() {
        var e = _.getState().hits;
        l.call("main", "hits", e);
        try {
            v.updateHits(e)
        } catch (e) {
            console.error(e)
        }
        C()
    })), _.subscribe(O(function() {
        l.call("main", "progress", _.getState().progress)
    })), _.subscribe(P(function() {
        l.call("main", "logs", _.getState().logs), C()
    })), l.listen({
        getHits: function() {
            return _.getState().hits
        },
        getHit: function(e) {
            return _.getState().hits[e]
        },
        getMainData: function() {
            return {
                hits: _.getState().hits,
                actions: f.describeAll(),
                logs: _.getState().logs,
                progress: _.getState().progress
            }
        },
        hitPageData: function(e) {
            d.updateOriginal(e.id, e.data)
        },
        closePopup: function() {
            return l.call("main", "close")
        },
        closePanel: function(e) {
            return c.ui.close(e)
        }
    }), C(), c.rpc.listen({
        exportSettings: function() {
            return A.storage.local.get(["blacklist", "license", "variants", "convrules", "outputConfigs", "smartname"]).then(function(e) {
                var t = Object.assign({
                        blacklist: {},
                        license: null,
                        conversionRules: [],
                        outputConfigs: {}
                    }, e, {
                        "weh-prefs": c.prefs.getAll()
                    }),
                    n = new Blob([JSON.stringify(t, null, 4)]);
                A.downloads.download({
                    url: window.URL.createObjectURL(n),
                    filename: "vdh-settings.json",
                    saveAs: !0,
                    conflictAction: "uniquify"
                })
            })
        },
        importSettings: function(e) {
            return new Promise(function(t, n) {
                e.convrules && k.set(e.convrules), e.outputConfigs && g.setOutputConfigs(e.outputConfigs), e.license && m.setLicense(e.license), e.blacklist && y.set(e.blacklist), e.variants && b.setVariants(e.variants), e.smartname && w.set(e.smartname), t(e["weh-prefs"] || {})
            })
        },
        reloadAddon: function() {
            A.runtime.reload()
        }
    })
}, , , , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ReadString = function(e, t) {
        var n = [];
        for (; e[t];) n.push(e[t++]);
        return {
            string: String.fromCharCode.apply(null, n),
            length: n.length + 1
        }
    }, t.ReadInt64 = function(e, n) {
        var r = t.ReadInt32(e, n),
            i = t.ReadInt32(e, n + 4);
        return 4294967296 * r + i
    }, t.ReadInt32 = function(e, t) {
        return (e[t] << 24) + (e[t + 1] << 16) + (e[t + 2] << 8) + e[t + 3]
    }, t.ReadInt24 = function(e, t) {
        return (e[t] << 16) + (e[t + 1] << 8) + e[t + 2]
    }, t.ReadInt16 = function(e, t) {
        return (e[t] << 8) + e[t + 1]
    }, t.ReadInt8 = function(e, t) {
        return e[t]
    }, t.WriteInt32 = function(e, t, n) {
        e[t] = (n >>> 24 & 255) >>> 0, e[t + 1] = (n >>> 16 & 255) >>> 0, e[t + 2] = (n >>> 8 & 255) >>> 0, e[t + 3] = (255 & n) >>> 0
    }, t.WriteInt24 = function(e, t, n) {
        e[t] = (n >>> 16 & 255) >>> 0, e[t + 1] = (n >>> 8 & 255) >>> 0, e[t + 2] = (255 & n) >>> 0
    }, t.WriteInt16 = function(e, t, n) {
        e[t] = (n >>> 8 & 255) >>> 0, e[t + 1] = (255 & n) >>> 0
    }, t.WriteInt8 = function(e, t, n) {
        e[t] = (255 & n) >>> 0
    }, t.dump = function(e, t, n) {
        t = t || 0, n = n || e.length;
        for (var r = [], i = 0; i < n && i < e.length; i++) {
            i % 16 == 0 && r.push("\n");
            var a = e[t + i].toString(16).toUpperCase();
            if (1 == a.length && (a = "0" + a), r.push(a), (i + 1) % 16 == 0 || i == n - 1 || i == e.length - 1) {
                for (var o = i + 1; o < (i + 15 & 4294967280); o++) r.push("  ");
                a = "";
                for (var o = 4294967280 & i; o <= i; o++) {
                    var s = e[t + o];
                    a += s >= 32 && s < 127 ? String.fromCharCode(s) : "."
                }
                r.push(a)
            }
        }
        return r.join(" ")
    }
}, , , , , , , , function(e, t, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = n(9).getMessage;

    function a() {
        this.$specs = {}, this.$values = null, this.$values || (this.$values = {}), this.$listeners = {}
    }
    a.prototype = {
        notify: function(e, t, n, r) {
            for (var i = this, a = e.split("."), o = [], s = a.length; s >= 0; s--) o.push(a.slice(0, s).join("."));
            o.forEach(function(a) {
                var o = i.$listeners[a];
                o && o.forEach(function(i) {
                    if (i.specs == r)
                        if (i.pack) i.pack[e] = t, void 0 === i.old[e] && (i.old[e] = n), i.timer && clearTimeout(i.timer), i.timer = setTimeout(function() {
                            delete i.timer;
                            var e = i.pack,
                                t = i.old;
                            i.pack = {}, i.old = {};
                            try {
                                i.callback(e, t)
                            } catch (e) {}
                        }, 0);
                        else try {
                            i.callback(e, t, n)
                        } catch (e) {}
                })
            })
        },
        forceNotify: function(e) {
            void 0 === e && (e = !1);
            var t = this;
            Object.keys(t.$specs).forEach(function(n) {
                t.notify(n, t.$values[n], t.$values[n], e)
            })
        },
        declare: function(e) {
            var t = this;
            Array.isArray(e) || (e = Object.keys(e).map(function(t) {
                var n = e[t];
                return n.name = t, n
            })), e.forEach(function(e) {
                if (s[e.name]) throw new Error("Forbidden prefs key " + e.name);
                if (e.hidden) e.label = e.name, e.description = "";
                else {
                    var n = e.name.replace(/[^0-9a-zA-Z_]/g, "_");
                    e.label = e.label || i("weh_prefs_label_" + n) || e.name, e.description = e.description || i("weh_prefs_description_" + n) || ""
                }
                "choice" == e.type && (e.choices = (e.choices || []).map(function(t) {
                    if ("object" == (void 0 === t ? "undefined" : r(t))) return t;
                    if (e.hidden) return {
                        value: t,
                        name: t
                    };
                    var a = t.replace(/[^0-9a-zA-Z_]/g, "_");
                    return {
                        value: t,
                        name: i("weh_prefs_" + n + "_option_" + a) || t
                    }
                }));
                var a, o = null;
                t.$specs[e.name] || (a = e.name, void 0 !== t[e.name] && (o = t[e.name]), Object.defineProperty(t, a, {
                    set: function(e) {
                        var n = t.$values[a];
                        n !== e && (t.$values[a] = e, t.notify(a, e, n, !1))
                    },
                    get: function() {
                        return void 0 !== t.$values[a] ? t.$values[a] : t.$specs[a] && t.$specs[a].defaultValue || void 0
                    }
                }));
                var u = t.$specs[e.name];
                t.$specs[e.name] = e, null !== o ? t.$values[e.name] = o : void 0 === t.$values[e.name] && (t.$values[e.name] = e.defaultValue), t.notify(e.name, e, u, !0)
            })
        },
        on: function() {
            var e = "",
                t = {},
                n = 0;
            "string" == typeof arguments[n] && (e = arguments[n++]), "object" == r(arguments[n]) && (t = arguments[n++]);
            var i = arguments[n],
                a = !!t.pack;
            this.$listeners[e] || (this.$listeners[e] = []);
            var o = {
                callback: i,
                specs: !!t.specs
            };
            a && (o.pack = {}, o.old = {}), this.$listeners[e].push(o)
        },
        off: function() {
            var e = "",
                t = 0;
            "string" == typeof arguments[t] && (e = arguments[t++]);
            var n = arguments[t],
                r = this.$listeners[e];
            if (r)
                for (var i = r.length - 1; i >= 0; i--) n && r[i] != n || r.splice(i, 1)
        },
        getAll: function() {
            return Object.assign({}, this.$values)
        },
        getSpecs: function() {
            return Object.assign({}, this.$specs)
        },
        assign: function(e) {
            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t])
        },
        isValid: function(e, t) {
            var n = this.$specs[e];
            if (n) {
                switch (n.type) {
                    case "string":
                        if (n.regexp && !new RegExp(n.regexp).test(t)) return !1;
                        break;
                    case "integer":
                        if (!/^-?[0-9]+$/.test(t)) return !1;
                        if (isNaN(parseInt(t))) return !1;
                    case "float":
                        if ("float" == n.type) {
                            if (!/^-?[0-9]+(\.[0-9]+)?|(\.[0-9]+)$/.test(t)) return !1;
                            if (isNaN(parseFloat(t))) return !1
                        }
                        if (void 0 !== n.minimum && t < n.minimum) return !1;
                        if (void 0 !== n.maximum && t > n.maximum) return !1;
                        break;
                    case "choice":
                        var r = !1;
                        if ((n.choices || []).forEach(function(e) {
                                t == e.value && (r = !0)
                            }), !r) return !1
                }
                return !0
            }
        },
        reducer: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1];
            switch (t.type) {
                case "weh.SET_PREFS":
                    e = Object.assign({}, e, t.payload)
            }
            return e
        },
        reduxDispatch: function(e) {
            this.on("", {
                pack: !0
            }, function(t) {
                e.dispatch({
                    type: "weh.SET_PREFS",
                    payload: t
                })
            })
        }
    };
    var o = new a,
        s = {};
    for (var u in o) o.hasOwnProperty(u) && (s[u] = !0);
    e.exports = o
}, , , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.gotoInstall = p, t.call = h, t.listen = function() {
        return o.listen.apply(o, arguments)
    }, t.check = g, t.isProbablyAvailable = function() {
        return f
    }, t.request = function(e, t) {
        return new Promise(function(n, r) {
            var i = [];
            o.call("request", e, t).then(function(e) {
                return f = !0, e
            }).then(function e(t) {
                i.push(t.data);
                if (!t.more) return n(i.join(""));
                o.call("requestExtra", t.id).then(function(t) {
                    e(t)
                }).catch(r)
            }).catch(r)
        })
    }, t.requestBinary = function(e, t) {
        return new Promise(function(n, r) {
            var i = 0,
                a = [];
            o.call("requestBinary", e, t).then(function(e) {
                return f = !0, e
            }).then(function e(t) {
                t.data && t.data.data && (i += t.data.data.length, a.push(new Uint8Array(t.data.data)));
                if (!t.more) {
                    var s = new Uint8Array(i),
                        u = 0;
                    return a.forEach(function(e) {
                        s.set(e, u), u += e.length
                    }), n(s)
                }
                o.call("requestExtra", t.id).then(function(t) {
                    setTimeout(function() {
                        e(t)
                    })
                }).catch(r)
            }).catch(r)
        })
    };
    var r = n(1),
        i = (r.browser, n(5)),
        a = n(257),
        o = n(258)("net.downloadhelper.coapp"),
        s = n(40),
        u = i.Concurrent(),
        c = i.Concurrent(),
        l = n(38).buildOptions || {},
        d = null,
        f = void 0;

    function p() {
        u(function() {
            var e = "https://www.downloadhelper.net/install-coapp";
            return e += "?browser=" + (l.browser || ""), r.prefs.forcedCoappVersion && (e += "version=" + r.prefs.forcedCoappVersion), s.gotoOrOpenTab(e)
        })
    }

    function h() {
        return o.call.apply(o, arguments)
    }

    function g() {
        return c(function() {
            return new Promise(function(e, t) {
                var n = !1;
                o.callCatchAppNotFound(function(t) {
                    f = !1, n = !0, e({
                        status: !1,
                        error: t.message
                    })
                }, "info").then(function(t) {
                    f = !0, e({
                        status: !0,
                        info: t
                    })
                }).catch(function(t) {
                    f = !1, n || e({
                        status: !1,
                        error: t.message
                    })
                })
            })
        })
    }
    o.onAppNotFound.addListener(function() {
        p()
    }), o.onCallCount.addListener(function(e, t) {
        d && (clearTimeout(d), d = null), 0 === e && 0 === t && r.prefs.coappIdleExit && (d = setTimeout(function() {
            d = null, o.close()
        }, r.prefs.coappIdleExit))
    });
    t.downloads = new a.Downloads(o);
    r.prefs.checkCoappOnStartup && setTimeout(function() {
        g()
    }, 1e3), r.rpc.listen({
        coappProxy: h,
        checkCoApp: g,
        installCoApp: p
    })
}, , , , , , , , , , , function(e, t) {
    e.exports = {
        buildDate: "Thu Mar 26 2020 15:51:56 GMT+0100 (Central European Standard Time)",
        buildOptions: {
            browser: "chrome",
            noyt: "true"
        },
        prod: !0
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.reducer = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments[1];

        function n(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = e;
            !e.referrer && t.pageUrl && (t = Object.assign({}, t, {
                referrer: t.pageUrl
            })), Object.keys(t).every(function(n) {
                return s.equals(e[n], t[n])
            }) || (e = Object.assign({}, e, t));
            var r = d(e);
            if ("running" != e.status && r != e.status) {
                var a = e.status;
                if (e === n ? e = Object.assign({}, e, {
                        status: r
                    }) : e.status = r, "orphan" == r && "orphan" != a) {
                    var c = Date.now(),
                        l = 1e3 * i.prefs.orphanExpiration;
                    e.orphanT0 = c, e.orphanT = c + l, setTimeout(function() {
                        u.dispatch("hit.orphanTimeout", e.id)
                    }, l + 100)
                }
            }
            var f = o.availableActions(e);
            return s.equals(f, e.actions) || (e === n ? e = Object.assign({}, e, {
                actions: f
            }) : e.actions = f), e
        }

        function a(t, i) {
            Array.isArray(t) || (t = [t]), t.forEach(function(t) {
                var a = e[t];
                if (a) {
                    var o = e,
                        s = n(a, i);
                    e === o && (e = Object.assign({}, e, r({}, t, s)))
                }
            })
        }
        switch (t.type) {
            case "hit.new":
                if (!l.checkHitBlacklisted(t.payload)) {
                    var c = t.payload.id,
                        f = e[c],
                        p = n(f || {
                            status: "active"
                        }, t.payload);
                    p !== f && (e = Object.assign({}, e, r({}, c, p)))
                }
                break;
            case "hits.urlUpdated":
                var h = e;
                Object.keys(e).forEach(function(t) {
                    var r = e[t],
                        i = n(r);
                    i !== r && (h === e && (e = Object.assign({}, e)), e[t] = i)
                });
                break;
            case "hit.update":
                var g = t.payload,
                    m = g.id,
                    v = g.changes;
                a(m, v);
                break;
            case "hit.updateRunning":
                var y = t.payload,
                    b = y.id,
                    w = y.runningDelta,
                    k = e[b];
                if (k) {
                    var x = k.running || 0,
                        A = {
                            running: (x || 0) + w
                        };
                    0 == x && (A.status = "running"), 0 === A.running && (A.status = "active"), (e = Object.assign({}, e))[b] = n(k, A)
                }
                break;
            case "hit.deleteProps":
                var _ = t.payload,
                    I = _.id,
                    O = _.propsToBeDeleted;
                Array.isArray(I) || (I = [I]), Array.isArray(O) || (O = [O]);
                var P = e;
                I.forEach(function(t) {
                    var n = e[t];
                    if (n) {
                        var r = n;
                        O.forEach(function(t) {
                            void 0 !== r[t] && (r === n && (r = Object.assign({}, n), e === P && (e = Object.assign({}, e)), e[r.id] = r), delete r[t])
                        })
                    }
                });
                break;
            case "hit.updateOriginal":
                var C = t.payload,
                    S = C.id,
                    E = C.changes,
                    j = [];
                Object.keys(e).forEach(function(t) {
                    var n = e[t];
                    t !== S && S !== n.originalId || j.push(t)
                }), a(j, E);
                break;
            case "hit.delete":
                var T = e,
                    D = t.payload;
                Array.isArray(D) || (D = [D]), D.forEach(function(t) {
                    var n = e[t];
                    n && (e === T && (e = Object.assign({}, e)), delete e[t])
                });
                break;
            case "hit.orphanTimeout":
                var R = t.payload,
                    q = e[R];
                q && "orphan" == q.status && !isNaN(q.orphanT) && Date.now() > q.orphanT && delete(e = Object.assign({}, e))[R]
        }
        return e
    }, t.progressReducer = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments[1];
        switch (t.type) {
            case "hit.progress":
                var n = e[t.payload.id];
                n !== t.payload.progress && (e = Object.assign({}, e, r({}, t.payload.id, t.payload.progress)));
                break;
            case "hit.clear-progress":
                var n = e[t.payload];
                void 0 !== n && delete(e = Object.assign({}, e))[t.payload]
        }
        return e
    }, t.statusFromUrl = d, t.create = function(e) {
        u.dispatch("hit.new", e)
    }, t.update = f, t.updateRunning = function(e, t) {
        u.dispatch("hit.updateRunning", {
            id: e,
            runningDelta: t
        })
    }, t.deleteProps = function(e, t) {
        u.dispatch("hit.deleteProps", {
            id: e,
            propsToBeDeleted: t
        })
    }, t.updateOriginal = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        u.dispatch("hit.updateOriginal", {
            id: e,
            changes: t
        })
    }, t.updateProgress = function(e, t) {
        null === t ? u.dispatch("hit.clear-progress", e) : u.dispatch("hit.progress", {
            id: e,
            progress: t
        })
    }, t.setHitOperation = function(e, t) {
        var n = u.getHit(e);
        n && n.operation !== t && f(e, {
            operation: t
        })
    };
    var i = n(1),
        a = n(3),
        o = n(59),
        s = n(5),
        u = n(12),
        c = n(40),
        l = n(240);

    function d(e) {
        var t = e.status,
            n = c.current(),
            r = n.url,
            i = n.urls;
        return "active" == e.status && e.topUrl != r ? t = e.topUrl in i ? "inactive" : "orphan" : "inactive" != e.status || e.topUrl in i ? "inactive" != e.status && "orphan" != e.status || e.topUrl != r || (t = "active") : t = "orphan", "orphan" == t && e.pinned && (t = "pinned"), t
    }

    function f(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        u.dispatch("hit.update", {
            id: e,
            changes: t
        })
    }
    a.listen({
        actionCommand: function(e, t) {
            var n = u.getHit(t);
            return o.execute(e, n)
        },
        clearHits: function(e) {
            var t = [],
                n = u.getHits();
            for (var r in n) {
                var i = n[r];
                ("all" == e && "running" != i.status && "pinned" != i.status || "pinned" == e && "pinned" == i.status || "inactive" == e && "inactive" == i.status || "orphans" == e && "orphan" == i.status) && t.push(r)
            }
            u.dispatch("hit.delete", t)
        }
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.update = s, t.current = function() {
        return {
            url: u,
            urls: c
        }
    }, t.setTransientTab = p, t.gotoOrOpenTab = function(e) {
        return d = null, f = null, a.gotoOrOpenTab(e, p)
    };
    var r = n(1).browser,
        i = n(12),
        a = n(5),
        o = null;

    function s() {
        o && clearTimeout(o), o = setTimeout(l, 50)
    }
    var u = "about:blank",
        c = {};

    function l() {
        o = null, r.windows.getCurrent().then(function(e) {
            return r.tabs.query({
                windowId: e.id,
                active: !0
            })
        }).then(function(e) {
            return e.length > 0 ? e[0] : null
        }).then(function(e) {
            e && (u = e.url, r.tabs.query({}).then(function(e) {
                for (var t in c = {}, e) c[e[t].url] = 1;
                i.dispatch("hits.urlUpdated", {
                    url: u,
                    urls: c
                })
            }))
        })
    }
    var d = null,
        f = null;

    function p(e, t) {
        d = e, f = t
    }
    r.windows.onFocusChanged.addListener(s), r.windows.onRemoved.addListener(s), r.tabs.onActivated.addListener(function(e) {
        var t = e.tabId;
        e.windowId, t !== d && (d = null, f = null), s()
    }), r.tabs.onRemoved.addListener(function(e) {
        d === e && f && r.tabs.update(f, {
            active: !0
        }), d = null, f = null, s()
    }), r.tabs.onUpdated.addListener(s), r.tabs.onCreated.addListener(function(e) {
        "<next-tab>" === d && (d = e.id)
    })
}, function(e, t, n) {
    "use strict";
    ! function() {
        var e = this,
            t = function(t, n) {
                var r, i = t.split("."),
                    a = window || e;
                i[0] in a || !a.execScript || a.execScript("var " + i[0]);
                for (; i.length && (r = i.shift());) i.length || void 0 === n ? a = a[r] ? a[r] : a[r] = {} : a[r] = n
            },
            n = function(e) {
                var t = chrome.runtime.connect("nmmhkkegccagdldgiimedpiccmgmieda", {}),
                    n = !1;
                t.onMessage.addListener(function(t) {
                    n = !0, "response" in t && !("errorType" in t.response) ? e.success && e.success(t) : e.failure && e.failure(t)
                }), t.onDisconnect.addListener(function() {
                    !n && e.failure && e.failure({
                        request: {},
                        response: {
                            errorType: "INTERNAL_SERVER_ERROR"
                        }
                    })
                }), t.postMessage(e)
            };
        t("google.payments.inapp.buy", function(e) {
            e.method = "buy", n(e)
        }), t("google.payments.inapp.consumePurchase", function(e) {
            e.method = "consumePurchase", n(e)
        }), t("google.payments.inapp.getPurchases", function(e) {
            e.method = "getPurchases", n(e)
        }), t("google.payments.inapp.getSkuDetails", function(e) {
            e.method = "getSkuDetails", n(e)
        })
    }()
}, , , , , , , , , , , , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(55),
        i = n(111),
        a = n(112),
        o = n(113),
        s = n(58);
    n(57);
    n.d(t, "createStore", function() {
        return r.b
    }), n.d(t, "combineReducers", function() {
        return i.a
    }), n.d(t, "bindActionCreators", function() {
        return a.a
    }), n.d(t, "applyMiddleware", function() {
        return o.a
    }), n.d(t, "compose", function() {
        return s.a
    })
}, function(e, t, n) {
    "use strict";
    var r = n(100),
        i = n(105),
        a = n(107),
        o = "[object Object]",
        s = Function.prototype,
        u = Object.prototype,
        c = s.toString,
        l = u.hasOwnProperty,
        d = c.call(Object);
    t.a = function(e) {
        if (!Object(a.a)(e) || Object(r.a)(e) != o) return !1;
        var t = Object(i.a)(e);
        if (null === t) return !0;
        var n = l.call(t, "constructor") && t.constructor;
        return "function" == typeof n && n instanceof n && c.call(n) == d
    }
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", function() {
        return a
    }), t.b = function e(t, n, o) {
        var s;
        "function" == typeof n && void 0 === o && (o = n, n = void 0);
        if (void 0 !== o) {
            if ("function" != typeof o) throw new Error("Expected the enhancer to be a function.");
            return o(e)(t, n)
        }
        if ("function" != typeof t) throw new Error("Expected the reducer to be a function.");
        var u = t;
        var c = n;
        var l = [];
        var d = l;
        var f = !1;

        function p() {
            d === l && (d = l.slice())
        }

        function h() {
            return c
        }

        function g(e) {
            if ("function" != typeof e) throw new Error("Expected listener to be a function.");
            var t = !0;
            return p(), d.push(e),
                function() {
                    if (t) {
                        t = !1, p();
                        var n = d.indexOf(e);
                        d.splice(n, 1)
                    }
                }
        }

        function m(e) {
            if (!Object(r.a)(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
            if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (f) throw new Error("Reducers may not dispatch actions.");
            try {
                f = !0, c = u(c, e)
            } finally {
                f = !1
            }
            for (var t = l = d, n = 0; n < t.length; n++) {
                var i = t[n];
                i()
            }
            return e
        }
        m({
            type: a.INIT
        });
        return s = {
            dispatch: m,
            subscribe: g,
            getState: h,
            replaceReducer: function(e) {
                if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
                u = e, m({
                    type: a.INIT
                })
            }
        }, s[i.a] = function() {
            var e, t = g;
            return (e = {
                subscribe: function(e) {
                    if ("object" != typeof e) throw new TypeError("Expected the observer to be an object.");

                    function n() {
                        e.next && e.next(h())
                    }
                    n();
                    var r = t(n);
                    return {
                        unsubscribe: r
                    }
                }
            })[i.a] = function() {
                return this
            }, e
        }, s
    };
    var r = n(54),
        i = n(108),
        a = {
            INIT: "@@redux/INIT"
        }
}, function(e, t, n) {
    "use strict";
    var r = n(101).a.Symbol;
    t.a = r
}, function(e, t, n) {
    "use strict"
}, function(e, t, n) {
    "use strict";
    t.a = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        if (0 === t.length) return function(e) {
            return e
        };
        if (1 === t.length) return t[0];
        return t.reduce(function(e, t) {
            return function() {
                return e(t.apply(void 0, arguments))
            }
        })
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function e(t, n, r) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === i) {
                var a = Object.getPrototypeOf(t);
                return null === a ? void 0 : e(a, n, r)
            }
            if ("value" in i) return i.value;
            var o = i.get;
            return void 0 !== o ? o.call(r) : void 0
        },
        i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();

    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function s(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    t.describeAll = function() {
        var e = {};
        return Y(function(t) {
            e[t.name] = {
                name: t.name,
                title: t.title,
                description: t.description,
                icon: t.icon,
                icon18: t.icon.replace(/\-(\d+)\./, "-$1."),
                catPriority: t.catPriority || 0
            }
        }), e
    }, t.register = X, t.availableActions = function(e) {
        var t = [];
        Y(function(n) {
            n.canPerform(e) && t.push(n.name)
        });
        var n = [u.prefs["default-action-0"], u.prefs["default-action-1"], u.prefs["default-action-2"]];
        return t.sort(function(e, t) {
            var r = Z[e],
                i = Z[t],
                a = r.catPriority || 0,
                o = i.catPriority || 0;
            return o != a ? o - a : e == n[a] ? -1 : t == n[o] ? 1 : i.priority - r.priority
        }), t
    }, t.execute = function(e, t) {
        var n = Z[e];
        if (!n) throw new Error("No such action " + e);
        return new n(t).execute(), n.keepOpen
    }, t.convertLocal = Q;
    var u = n(1),
        c = u.browser,
        l = n(3),
        d = n(39),
        f = n(94),
        p = n(12),
        h = n(5),
        g = n(115),
        m = n(27),
        v = n(95),
        y = n(261),
        b = n(60),
        w = n(235),
        k = n(236),
        x = n(268),
        A = n(63),
        _ = n(119),
        I = n(62),
        O = n(38),
        P = O.buildOptions.noyt || !1,
        C = n(239).api,
        S = h.Concurrent(function() {
            return u.prefs.downloadControlledMax || 1 / 0
        }),
        E = h.Concurrent(function() {
            return u.prefs.convertControlledMax || 1 / 0
        }),
        j = {},
        T = {},
        D = 0,
        R = t.Action = function() {
            function e(t) {
                s(this, e), this.hit = Object.assign({}, t), this.reqs = {}, this.actionId = ++D, this.cleanupData = {
                    files: []
                }
            }
            return i(e, [{
                key: "execute",
                value: function() {
                    var e = this;
                    e.updateRunning(1), Promise.resolve(e.getReqs()).then(function() {
                        return e.solveAllReqs()
                    }).then(function() {
                        return Promise.resolve(e.doJob())
                    }).then(function() {
                        return Promise.resolve(e.postJob())
                    }).catch(function(t) {
                        console.warn("Action error:", t.message), t.noReport || (!t.videoTitle && e.hit.title && (t.videoTitle = e.hit.title), t.reportAsLog ? f.log(t) : f.error(t))
                    }).then(function() {
                        return Promise.resolve(e.cleanup())
                    }).then(function() {
                        e.updateRunning(-1), e.setOperation(null)
                    })
                }
            }, {
                key: "getReqs",
                value: function() {}
            }, {
                key: "solveReqs",
                value: function() {}
            }, {
                key: "solveAllReqs",
                value: function() {
                    var e = this;
                    return Promise.resolve(e.solveReqs()).then(function(t) {
                        if (t) return e.solveAllReqs()
                    })
                }
            }, {
                key: "solveCoAppReqs",
                value: function() {
                    var e = this;
                    return new Promise(function(t, n) {
                        m.check().then(function(r) {
                            if (delete e.reqs.coapp, r.status) {
                                e.hasCoapp = !0;
                                var i = r.info.version;
                                e.reqs.coappMin && !h.isMinimumVersion(r.info.version, e.reqs.coappMin) ? m.call("quit").catch(function() {}).then(function() {
                                    return new Promise(function(e, t) {
                                        setTimeout(function() {
                                            e()
                                        }, u.prefs.coappRestartDelay)
                                    })
                                }).then(function() {
                                    m.check().then(function(r) {
                                        r.status && h.isMinimumVersion(r.info.version, e.reqs.coappMin) ? (delete e.reqs.coappMin, t(!0)) : (g.alert({
                                            title: u._("coapp_outofdate"),
                                            text: u._("coapp_outofdate_text", [r.info && r.info.version || i, e.reqs.coappMin]),
                                            buttons: [{
                                                text: u._("coapp_update"),
                                                className: "btn-success",
                                                rpcMethod: "installCoApp"
                                            }]
                                        }), delete e.reqs.coappMin, n(new h.VDHError("Aborted", {
                                            noReport: !0
                                        })))
                                    })
                                }) : (delete e.reqs.coappMin, t(!0))
                            } else g.alert({
                                title: u._("coapp_required"),
                                text: u._("coapp_required_text"),
                                buttons: [{
                                    text: u._("coapp_install"),
                                    className: "btn-success",
                                    rpcMethod: "installCoApp"
                                }]
                            }), n(new h.VDHError("Aborted", {
                                noReport: !0
                            }))
                        })
                    })
                }
            }, {
                key: "doJob",
                value: function() {
                    console.warn("Generic action doJob")
                }
            }, {
                key: "postJob",
                value: function() {}
            }, {
                key: "cleanup",
                value: function() {}
            }, {
                key: "start",
                value: function() {
                    return console.warn("action.start() is obsolete, use action.execute()"), this.execute()
                }
            }, {
                key: "setOperation",
                value: function(e) {
                    d.setHitOperation(this.hit.id, e)
                }
            }, {
                key: "setProgress",
                value: function(e) {
                    d.updateProgress(this.hit.id, e)
                }
            }, {
                key: "clearProgress",
                value: function() {
                    d.updateProgress(this.hit.id, null)
                }
            }, {
                key: "updateRunning",
                value: function(e) {
                    d.updateRunning(this.hit.id, e)
                }
            }, {
                key: "updateHit",
                value: function(e) {
                    d.update(this.hit.id, e)
                }
            }, {
                key: "setAbort",
                value: function(e) {
                    var t = j[this.hit.id];
                    t || (t = j[this.hit.id] = {}), t[this.actionId] && console.warn("Overwritting abortable task"), t[this.actionId] = e.bind(this), this.updateHit({})
                }
            }, {
                key: "clearAbort",
                value: function() {
                    var e = j[this.hit.id];
                    e && (e[this.actionId] && (delete e[this.actionId], 0 == Object.keys(e).length && delete j[this.hit.id]))
                }
            }, {
                key: "setStop",
                value: function(e) {
                    var t = T[this.hit.id];
                    t || (t = T[this.hit.id] = {}), t[this.actionId] && console.warn("Overwritting stoppable task"), t[this.actionId] = e.bind(this), this.updateHit({})
                }
            }, {
                key: "clearStop",
                value: function() {
                    var e = T[this.hit.id];
                    e && (e[this.actionId] && (delete e[this.actionId], 0 == Object.keys(e).length && delete T[this.hit.id]))
                }
            }], [{
                key: "keepOpen",
                get: function() {
                    return !1
                }
            }]), e
        }(),
        q = t.DownloadAction = function(e) {
            function t(e) {
                s(this, t);
                var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return n.promptFilename = !0, n.streams = {}, n.hasCoapp = !1, n
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    var e = this;
                    return this.getStreams(), e.solveAllStreamsName().then(function() {
                        return e.ensureOutputDirectory()
                    }).then(function() {
                        return e.downloadAllStreams()
                    }).then(function() {
                        return e.grabInfo()
                    }).then(function() {
                        return e.handleWatermark()
                    }).then(function() {
                        if (e.reqs.aggregate) return e.aggregate()
                    }).then(function() {
                        if (e.reqs.convert) return e.convert()
                    }).then(function() {
                        x.newDownload()
                    }).then(function() {
                        e.watermarked && e.explainQR()
                    }).then(function() {
                        C && C.downloadSuccess(e.hit)
                    }).catch(function(t) {
                        throw C && C.downloadError(e.hit, t.message), t
                    })
                }
            }, {
                key: "getCoappTmpName",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return m.call("tmp.tmpName", {
                        prefix: e.prefix || "vdh-",
                        postfix: e.postfix || ".tmp"
                    })
                }
            }, {
                key: "solveStreamName",
                value: function(e) {
                    var t = this;
                    if (t.reqs.aggregate || t.reqs.convert) return t.getCoappTmpName().then(function(n) {
                        e.fileName = n.fileName, e.directory = n.directory, e.filePath = n.filePath, t.cleanupData.files.push(n.filePath), t.cleanupData.files.push(n.filePath + ".part")
                    });
                    if ("coapp" == t.downloadWith) {
                        if (t.hit.urls) return new Promise(function(n, r) {
                            var i, a = t.hit.type,
                                o = /([^/]*)\.([a-zA-Z0-9]+)(?:\?.*)?$/.exec(e.url);
                            o ? (i = o[2], a = o[1]) : i = Object.keys(t.hit.extensions)[0];
                            var s = ("000000" + e.index).substr(-6);
                            switch (u.prefs.galleryNaming) {
                                case "type-index":
                                    e.fileName = A.getFilenameFromTitle(t.hit.type + "-" + s, i);
                                    break;
                                case "url":
                                    e.fileName = A.getFilenameFromTitle(a, i);
                                    break;
                                case "index-url":
                                    e.fileName = A.getFilenameFromTitle(s + "-" + a, i)
                            }
                            e.directory = t.filePath, m.call("path.homeJoin", e.directory, e.fileName).then(function(t) {
                                e.filePath = t, n()
                            }).catch(r)
                        });
                        e.fileName = t.fileName, e.directory = t.directory, e.filePath = t.filePath
                    } else e.fileName = t.getFilename(), t.reqs.needFilename && (e.saveas = !0)
                }
            }, {
                key: "solveAllStreamsName",
                value: function() {
                    var e = this;
                    return Promise.all(Object.keys(this.streams).map(function(t) {
                        return e.solveStreamName(e.streams[t])
                    }))
                }
            }, {
                key: "downloadAllStreams",
                value: function() {
                    var e = this,
                        t = this;
                    return t.setOperation("queued"), S(function() {
                        return t.clearAbort(), t.updateHit({
                            operation: "downloading",
                            opStartDate: Date.now()
                        }), t.hit.chunked ? t.downloadAllChunkedStreams() : (t.setAbort(t.abortDownload), t.downloadStreamControl = h.Concurrent(function() {
                            return u.prefs.downloadStreamControlledMax || 1 / 0
                        }), Promise.all(Object.keys(e.streams).map(function(e) {
                            return t.downloadStream(t.streams[e])
                        })))
                    }, function(e, n) {
                        t.setAbort(function() {
                            n(new h.VDHError("Aborted", {
                                noReport: !0
                            }))
                        })
                    }).then(function() {
                        t.clearAbort()
                    }).catch(function(e) {
                        throw t.clearAbort(), e
                    })
                }
            }, {
                key: "downloadStream",
                value: function(e) {
                    var t = this;
                    return t.downloadStreamControl(function() {
                        return t.doDownloadStream(e)
                    })
                }
            }, {
                key: "doDownloadStream",
                value: function(e) {
                    var t = this,
                        n = {
                            coappDownload: "coapp" === t.downloadWith,
                            proxy: this.hit.proxy,
                            source: {
                                url: e.url,
                                isPrivate: this.hit.isPrivate,
                                headers: e.headers,
                                referrer: e.referrer
                            },
                            target: {
                                filename: e.fileName || this.getFilename(),
                                directory: e.directory,
                                saveAs: !!e.saveas
                            }
                        };
                    return new Promise(function(r, i) {
                        e.downloadId = y.download(n, function(n) {
                            n && !t.filePath && (t.filePath = n), n && u.prefs.contentRedirectEnabled && t.hit.possibleContentRedirect && (void 0 === e.contentRedirected && (e.contentRedirected = 3), e.contentRedirect > 0) ? m.call("fs.stat", n).then(function(a) {
                                a.size < 2048 ? m.call("fs.readFile", n, "utf8").then(function(n) {
                                    f.log({
                                        message: "Short content " + a.size,
                                        details: n
                                    }), /^https?:\/\//.test(n) ? (e.contentRedirect--, e.url = n, t.downloadStream(e).then(function(e) {
                                        r(e)
                                    }).catch(function(e) {
                                        i(e)
                                    })) : r()
                                }).catch(function(e) {
                                    i(e)
                                }) : r()
                            }).catch(function(e) {
                                i(e)
                            }) : r()
                        }, function(e) {
                            i(e)
                        }, function(n) {
                            e.progress = n;
                            n = 0;
                            Object.keys(t.streams).forEach(function(e) {
                                n += t.streams[e].progress || 0
                            }), n /= Object.keys(t.streams).length, t.setProgress(n)
                        }, t.hit.headers)
                    })
                }
            }, {
                key: "downloadAllChunkedStreams",
                value: function() {
                    var e = this,
                        t = [];
                    Object.keys(e.streams).forEach(function(n) {
                        var r = e.streams[n];
                        t.push({
                            fileName: r.filePath,
                            type: n
                        })
                    });
                    var n = "hls" == e.hit.chunked;
                    n && e.setStop(e.stopRecording);
                    var r = "dash-adp" == e.hit.chunked;
                    return r && e.setAbort(e.abortChunkedDownload), new Promise(function(i, a) {
                        w.download(e, t, function() {
                            n && e.clearStop(), r && e.clearAbort(), i()
                        }, function(t) {
                            n && e.clearStop(), r && e.clearAbort(), a(t)
                        }, function(t) {
                            e.setProgress(t)
                        })
                    })
                }
            }, {
                key: "ensureOutputDirectory",
                value: function() {
                    var e = this;
                    if (e.directory) return m.call("fs.stat", e.directory).then(function(t) {
                        if (!(16384 & t.mode)) throw new h.DetailsError(u._("error_not_directory", e.directory), "details")
                    }, function(t) {
                        return new Promise(function(t, n) {
                            m.call("fs.mkdirp", e.directory).then(function() {
                                t()
                            })
                        })
                    })
                }
            }, {
                key: "grabInfo",
                value: function() {
                    var e = this,
                        t = e.streams.video || e.streams.full || e.streams.audio;
                    if (t && t.filePath) return b.info(t.filePath).then(function(t) {
                        var n = {};
                        t.width && t.height && (e.videoInfo = t, n.size = t.width + "x" + t.height), t.duration && (n.duration = t.duration), t.fps && (n.fps = t.fps), Object.assign(e.hit, n), e.updateHit(n)
                    }).catch(function(n) {
                        var r = {
                            file: t.filePath
                        };
                        m.call("fs.stat", t.filePath).then(function(e) {
                            r.stat = e
                        }).catch(function(e) {
                            r.error = e.message
                        }).then(function() {
                            f.log({
                                message: u._("corrupted_media_file", [e.hit.title, t.filePath]),
                                details: JSON.stringify(r, null, 4) + "\n" + n.message
                            })
                        })
                    })
                }
            }, {
                key: "handleWatermark",
                value: function() {
                    var e = this;
                    if (e.videoInfo && e.license && "accepted" != e.license.status && "unneeded" != e.license.status) return b.wmForHeight(e.videoInfo.height).then(function(t) {
                        e.watermark = t, t && t.qr && (e.cleanupData.files.push(t.qr), e.watermarked = !0)
                    })
                }
            }, {
                key: "aggregate",
                value: function() {
                    var e = this;
                    return e.setOperation("converter_queued"), e.setProgress(0), E(function() {
                        return e.doAggregate()
                    }, function(t, n) {
                        e.setAbort(function() {
                            n(new h.VDHError("Aborted", {
                                noReport: !0
                            }))
                        })
                    }).then(function() {
                        e.clearAbort()
                    }).catch(function(t) {
                        throw e.clearAbort(), t
                    })
                }
            }, {
                key: "doAggregate",
                value: function() {
                    var e = this;
                    return e.updateHit({
                        operation: "aggregating",
                        opStartDate: Date.now()
                    }), e.setAbort(function() {
                        e.aborted = !0
                    }), new Promise(function(t, n) {
                        b.aggregate({
                            audio: e.streams.audio.filePath,
                            video: e.streams.video.filePath,
                            target: e.intermediateFilePath || e.filePath,
                            wm: e.watermark,
                            videoCodec: e.videoInfo && e.videoInfo.videoCodec,
                            fps: e.videoInfo && e.videoInfo.fps
                        }, function(t) {
                            if (e.aborted) throw new Error("Aborted");
                            var n = e.videoInfo && e.videoInfo.duration || e.hit.duration;
                            if (n) {
                                var r = Math.round(100 * t / n);
                                e.setProgress(r)
                            }
                        }).then(t).catch(function(t) {
                            n(new h.DetailsError(u._("failed_aggregating", e.hit.title), t.details || t.message || ""))
                        })
                    }).then(function() {
                        e.clearAbort(), delete e.watermark
                    }).catch(function(t) {
                        throw e.clearAbort(), t
                    })
                }
            }, {
                key: "convert",
                value: function() {
                    var e = this;
                    return e.setOperation("converter_queued"), e.setProgress(0), E(function() {
                        return e.doConvert()
                    }, function(t, n) {
                        e.setAbort(function() {
                            n(new h.VDHError("Aborted", {
                                noReport: !0
                            }))
                        })
                    }).then(function() {
                        e.clearAbort()
                    }).catch(function(t) {
                        throw e.clearAbort(), t
                    })
                }
            }, {
                key: "doConvert",
                value: function() {
                    var e = this;
                    return e.updateHit({
                        operation: "converting",
                        opStartDate: Date.now()
                    }), e.setAbort(function() {
                        e.aborted = !0
                    }), new Promise(function(t, n) {
                        var r = e.intermediateFilePath || e.reqs.convert.audioonly && e.streams.audio && e.streams.audio.filePath || e.streams.full && e.streams.full.filePath || e.streams.video && e.streams.video.filePath || e.streams.audio && e.streams.video.filePath;
                        if (!r) return n(new Error("Could not determine conversion source"));
                        b.convert({
                            source: r,
                            target: e.filePath,
                            config: e.reqs.convert,
                            wm: e.watermark
                        }, function(t) {
                            if (e.aborted) throw new Error("Aborted");
                            var n = e.videoInfo && e.videoInfo.duration || e.hit.duration;
                            if (n) {
                                var r = Math.round(100 * t / n);
                                e.setProgress(r)
                            }
                        }).then(t).catch(function(t) {
                            n(new h.DetailsError(u._("failed_converting", e.hit.title), t.details || t.message || ""))
                        })
                    }).then(function() {
                        e.clearAbort()
                    }).catch(function(t) {
                        throw e.clearAbort(), t
                    })
                }
            }, {
                key: "getStreams",
                value: function() {
                    var e = this;
                    this.hit.url ? this.streams.full = {
                        url: this.hit.url
                    } : this.hit.urls ? this.hit.urls.forEach(function(t, n) {
                        e.streams["doc" + n] = {
                            url: new URL(t, e.hit.baseUrl).href,
                            index: n
                        }
                    }) : (this.hit.audioUrl && (this.streams.audio = {
                        url: this.hit.audioUrl,
                        contentRedirect: 2
                    }), !this.hit.videoUrl || this.reqs.convert && this.reqs.convert.audioonly || (this.streams.video = {
                        url: this.hit.videoUrl,
                        contentRedirect: 2
                    })), Object.keys(this.streams).forEach(function(t) {
                        var n = e.streams[t];
                        n.type = t, n.headers = e.hit.headers, n.referrer = e.hit.referrer
                    })
                }
            }, {
                key: "getReqs",
                value: function() {
                    var e = this;
                    return P && I.matchHit(this.hit) ? (I.forbidden(), Promise.reject(new h.VDHError("Forbidden", {
                        noReport: !0
                    }))) : Promise.resolve(r(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "getReqs", this).call(this)).then(function() {
                        if (!e.reqs.convert) return _.outputConfigForHit(e.hit).then(function(t) {
                            t && (e.hit.extension = t.ext || t.params.f || e.hit.extension), e.reqs.convert = t
                        })
                    }).then(function() {
                        e.promptFilename && (e.reqs.needFilename = !0), e.hit.convert && (e.reqs.convert = e.hit.convert), e.hit.urls || e.hit.audioUrl && e.hit.videoUrl || e.reqs.convert || e.hit.chunked || "coapp" == u.prefs.coappDownloads ? (e.reqs.coappMin = "1.2.1", e.downloadWith = "coapp", e.reqs.promptFilename = e.reqs.needFilename) : "ask" == u.prefs.coappDownloads && (e.reqs.askDownloadMode = !0), !e.hit.audioUrl || !e.hit.videoUrl || e.reqs.convert && e.reqs.convert.audioonly || (e.reqs.aggregate = !0), e.hit.chunked ? (e.reqs.coapp = !0, e.reqs.needFilename && (e.reqs.promptFilename = !0), "audio-video" == u.prefs.dashOnAdp && (u.prefs.dashOnAdp = "audio_video"), "audio_video" != u.prefs.dashOnAdp && delete e.reqs.aggregate, "hls" == e.hit.chunked && (t.hlsDownloadingCount++, e.hlsDownloadingCounted = !0, v.hlsDownloadLimit && (e.reqs.checkHlsDownloadLimit = !0))) : (e.hit.urls || e.hit.audioUrl && e.hit.videoUrl) && (e.reqs.coapp = !0), e.reqs.convert && e.reqs.convert.audioonly && (e.reqs.license = !0), (e.reqs.coappMin || e.reqs.aggregate || e.reqs.convert || e.reqs.license) && (e.reqs.coapp = !0), e.hit.urls && (delete e.reqs.convert, delete e.reqs.aggregate), (e.reqs.aggregate || e.reqs.convert || e.reqs.license) && (e.reqs.checkLicense = !0), e.reqs.aggregate && e.reqs.convert && (e.reqs.intermediateFilePath = !0), e.reqs.coappMin && e.hit.proxy && "http" == e.hit.proxy.type.substr(0, 4) && (e.reqs.coappMin = "1.2.1"), e.reqs.coappMin && e.hit.possibleContentRedirect && (e.reqs.coappMin = "1.2.1"), e.reqs.coappMin && e.hit.urls && (e.reqs.coappMin = "1.2.2"), "chrome" == O.buildOptions.browser && e.reqs.coappMin && !h.isMinimumVersion(e.reqs.coappMin, "1.2.3") && (e.reqs.coappMin = "1.2.3"), "edge" == O.buildOptions.browser && e.reqs.coappMin && !h.isMinimumVersion(e.reqs.coappMin, "1.4.0") && (e.reqs.coappMin = "1.4.0"), e.reqs.coappMin && u.prefs.forcedCoappVersion && (e.reqs.coappMin = u.prefs.forcedCoappVersion)
                    })
                }
            }, {
                key: "solveReqs",
                value: function() {
                    var e = this;
                    if (e.reqs.askDownloadMode) return new Promise(function(t, n) {
                        g.alert({
                            title: u._("download_method"),
                            text: [u._("download_modes1"), u._("download_modes2")],
                            height: 350,
                            buttons: [{
                                text: u._("download_with_browser"),
                                className: "btn-primary",
                                close: !0,
                                trigger: {
                                    mode: "browser"
                                }
                            }, {
                                text: u._("download_with_coapp"),
                                className: "btn-success",
                                close: !0,
                                trigger: {
                                    mode: "coapp"
                                }
                            }],
                            notAgain: u._("download_method_not_again")
                        }).then(function(n) {
                            e.downloadWith = n.mode, n.notAgain && (u.prefs.coappDownloads = n.mode), "coapp" == n.mode && (e.reqs.coappMin = "1.2.1", e.reqs.coapp = !0, e.reqs.needFilename && (e.reqs.promptFilename = !0)), delete e.reqs.askDownloadMode, t(!0)
                        }).catch(function() {
                            n(new h.VDHError("Aborted", {
                                noReport: !0
                            }))
                        })
                    });
                    if (e.reqs.coapp) return e.solveCoAppReqs();
                    if (e.reqs.checkLicense) return new Promise(function(t, n) {
                        v.checkLicense().then(function(r) {
                            delete e.reqs.checkLicense, e.license = r, e.reqs.license && "accepted" != r.status && "unneeded" != r.status ? (delete e.reqs.license, v.alertAudioNeedsReg(), n(new h.VDHError("Aborted", {
                                noReport: !0
                            }))) : t(!0)
                        })
                    });
                    if (e.reqs.checkHlsDownloadLimit) {
                        var n = (u.prefs.lastHlsDownload || 0) + 60 * v.hlsDownloadLimit * 1e3;
                        if (t.hlsDownloadingCount > 1 || Date.now() < n) return new Promise(function(t, n) {
                            v.checkLicense().then(function(r) {
                                delete e.reqs.checkHlsDownloadLimit, e.license = r, "accepted" != r.status && "unneeded" != r.status ? (delete e.reqs.license, v.alertHlsDownloadLimit(), n(new h.VDHError("Aborted", {
                                    noReport: !0
                                }))) : t(!0)
                            })
                        })
                    }
                    return e.reqs.promptFilename ? new Promise(function(t, n) {
                        delete e.reqs.promptFilename, delete e.reqs.needFilename;
                        var r = e.getFilename({
                            noExtension: !!e.hit.urls
                        });
                        g.saveAs(r, u.prefs.lastDownloadDirectory || "dwhelper", {
                            dirOnly: !!e.hit.urls
                        }).then(function(r) {
                            r ? (u.prefs.rememberLastDir && (u.prefs.lastDownloadDirectory = r.directory), e.filePath = r.filePath, e.directory = r.directory, e.fileName = r.fileName, t(!0)) : n(new h.VDHError("Aborted", {
                                noReport: !0
                            }))
                        }).catch(n)
                    }) : e.fileName || "coapp" != e.downloadWith ? e.reqs.intermediateFilePath ? new Promise(function(t, n) {
                        delete e.reqs.intermediateFilePath, e.getCoappTmpName({
                            postfix: "." + (e.hit.originalExt || e.hit.extension)
                        }).then(function(n) {
                            e.intermediateFilePath = n.filePath, e.cleanupData.files.push(n.filePath), t(!0)
                        }).catch(n)
                    }) : void 0 : new Promise(function(t, n) {
                        delete e.reqs.needFilename;
                        var r = e.getFilename({
                            noExtension: !!e.hit.urls
                        });
                        m.call("makeUniqueFileName", u.prefs.lastDownloadDirectory || "dwhelper", r).then(function(n) {
                            e.filePath = n.filePath, e.directory = n.directory, e.fileName = n.fileName, t(!0)
                        }).catch(n)
                    })
                }
            }, {
                key: "postJob",
                value: function() {
                    var e = this;
                    return Promise.resolve(r(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "postJob", this).call(this)).then(function() {
                        u.prefs.autoPin && e.updateHit({
                            status: "pinned",
                            pinned: !0
                        })
                    }).then(function() {
                        e.filePath && e.updateHit({
                            localFilePath: e.filePath,
                            localDirectory: e.directory || void 0
                        })
                    }).then(function() {
                        u.prefs.notifyReady && (e.hit.isPrivate && u.prefs.noPrivateNotification || c.notifications.create(e.hit.id, {
                            type: "basic",
                            title: u._("vdh_notification"),
                            message: u._("file_ready", e.filePath || e.hit.title || u._("media")),
                            iconUrl: c.extension.getURL("content/images/icon-36.png")
                        }))
                    }).then(function() {
                        e.hlsDownloadingCounted && (u.prefs.lastHlsDownload = Date.now())
                    })
                }
            }, {
                key: "getFilename",
                value: function(e) {
                    e = e || {};
                    var t = this.hit.title || "video",
                        n = null;
                    return e.noExtension || (n = this.hit.extension || "mp4"), A.getFilenameFromTitle(t, n)
                }
            }, {
                key: "getTmpFileName",
                value: function() {
                    return "vdh-" + Math.round(1e9 * Math.random()) + ".tmp"
                }
            }, {
                key: "abortDownload",
                value: function() {
                    var e = this;
                    Object.keys(e.streams).forEach(function(t) {
                        var n = e.streams[t];
                        n.downloadId && y.abort(n.downloadId)
                    })
                }
            }, {
                key: "abortChunkedDownload",
                value: function() {
                    this.abortChunked ? this.abortChunked() : console.warn("trying to abort chunked download but not abort function")
                }
            }, {
                key: "stopRecording",
                value: function() {
                    "hls" == this.hit.chunked && k.stopRecording(this.hit.id)
                }
            }, {
                key: "cleanup",
                value: function() {
                    var e = this;
                    return e.hlsDownloadingCounted && t.hlsDownloadingCount--, Promise.resolve(r(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "cleanup", this).call(this)).then(function() {
                        return e.clearProgress(), e.hasCoapp && !u.prefs.converterKeepTmpFiles && e.cleanupData.files.forEach(function(e) {
                            m.call("fs.unlink", e).catch(function() {})
                        }), Promise.resolve()
                    })
                }
            }, {
                key: "explainQR",
                value: function() {
                    u.prefs.qrMessageNotAgain || u.ui.open("explainqr#" + encodeURIComponent(this.hit.id), {
                        type: u.prefs.alertDialogType,
                        url: "content/explain-qr.html"
                    })
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !(e.running > 0) && (void 0 !== e.url || void 0 !== e.audioUrl || void 0 !== e.videoUrl || void 0 !== e.urls)
                }
            }, {
                key: "name",
                get: function() {
                    return "download"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_download_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_download_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-download-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 100
                }
            }]), t
        }();
    q.hlsDownloadingCount = 0;
    var M = function(e) {
            function t(e) {
                s(this, t);
                var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return n.promptFilename = !1, n
            }
            return o(t, q), i(t, null, [{
                key: "canPerform",
                value: function(e) {
                    return !(e.running > 0) && (void 0 !== e.url || void 0 !== e.audioUrl || void 0 !== e.videoUrl || void 0 !== e.urls)
                }
            }, {
                key: "name",
                get: function() {
                    return "quickdownload"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_quickdownload_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_quickdownload_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-quick-download2-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 90
                }
            }]), t
        }(),
        F = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    var e = j[this.hit.id] || {};
                    Object.keys(e).forEach(function(t) {
                        e[t](), delete e[t]
                    }), 0 == Object.keys(e).length && delete j[this.hit.id]
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !!j[e.id]
                }
            }, {
                key: "name",
                get: function() {
                    return "abort"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_abort_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_abort_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-abort-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 300
                }
            }, {
                key: "catPriority",
                get: function() {
                    return 2
                }
            }]), t
        }(),
        U = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    var e = T[this.hit.id] || {};
                    Object.keys(e).forEach(function(t) {
                        e[t](), delete e[t]
                    }), 0 == Object.keys(e).length && delete T[this.hit.id]
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !!T[e.id] && !("hls" != e.chunked || !k.canStop(e.id))
                }
            }, {
                key: "name",
                get: function() {
                    return "stop"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_stop_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_stop_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-stoprecord-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 300
                }
            }, {
                key: "catPriority",
                get: function() {
                    return 2
                }
            }]), t
        }(),
        W = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, q), i(t, [{
                key: "getReqs",
                value: function() {
                    var e = this,
                        n = this;
                    return P && I.matchHit(this.hit) ? (I.forbidden(), u.ui.close("main"), Promise.reject(new h.VDHError("Forbidden", {
                        noReport: !0
                    }))) : Promise.resolve().then(function() {
                        var t = "dlconv#" + e.hit.id;
                        return u.openedContents().indexOf("main") >= 0 ? u.rpc.call("main", "embed", c.extension.getURL("content/dlconv-embed.html?panel=" + t)).then(function() {
                            return u.wait(t)
                        }).catch(function(e) {
                            throw new h.VDHError("Aborted", {
                                noReport: !0
                            })
                        }) : b.getOutputConfigs().then(function(e) {
                            var t = u.prefs.dlconvLastOutput || "05cb6b27-9167-4d83-833d-218a107d0376",
                                n = e[t];
                            if (!n) throw new Error("No such output configuration");
                            return {
                                outputConfigId: t,
                                outputConfig: n
                            }
                        })
                    }).then(function(e) {
                        u.prefs.dlconvLastOutput = e.outputConfigId;
                        var t = e.outputConfig;
                        n.hit.extension && (n.hit.originalExt = n.hit.extension), n.hit.extension = t.ext || t.params.f || n.hit.extension, n.reqs.convert = e.outputConfig, n.promptFilename = e.prompt
                    }).then(function() {
                        return r(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "getReqs", e).call(e)
                    })
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !(e.running > 0) && (void 0 !== e.url || void 0 !== e.audioUrl || void 0 !== e.videoUrl)
                }
            }, {
                key: "name",
                get: function() {
                    return "downloadconvert"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_downloadconvert_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_downloadconvert_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-download-convert-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 80
                }
            }, {
                key: "keepOpen",
                get: function() {
                    return !0
                }
            }]), t
        }(),
        N = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    return u.ui.open("details#" + encodeURIComponent(this.hit.id), {
                        type: "tab",
                        url: "content/details.html"
                    }), Promise.resolve()
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !0
                }
            }, {
                key: "name",
                get: function() {
                    return "details"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_details_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_details_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-details-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 0
                }
            }]), t
        }(),
        L = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    return postit(this.hit)
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return void 0 !== e.url
                }
            }, {
                key: "name",
                get: function() {
                    return "copyurl"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_copyurl_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_copyurl_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-copy-link-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 30
                }
            }]), t
        }(),
        z = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    return p.dispatch("hit.delete", this.hit.id), Promise.resolve()
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !0
                }
            }, {
                key: "name",
                get: function() {
                    return "deletehit"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_deletehit_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_deletehit_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-delete-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 0
                }
            }]), t
        }(),
        H = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    return this.updateHit({
                        pinned: !0
                    }), Promise.resolve()
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !e.pinned
                }
            }, {
                key: "name",
                get: function() {
                    return "pin"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_pin_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_pin_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-pin-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 0
                }
            }]), t
        }(),
        V = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    return b.play(this.hit.localFilePath).catch(function(e) {
                        throw new h.DetailsError(u._("failed_playing_file"), e.message)
                    })
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !e.urls && 0 === e.running && u.prefs.avplayEnabled && !e.masked && !!e.localFilePath
                }
            }, {
                key: "name",
                get: function() {
                    return "cvplay"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_avplay_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_avplay_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-avplay-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 180
                }
            }, {
                key: "catPriority",
                get: function() {
                    return 1
                }
            }]), t
        }(),
        K = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    return l.call("main", "embed", c.extension.getURL("content/blacklist-embed.html?panel=blacklist#" + encodeURIComponent(this.hit.id))), Promise.resolve()
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return void 0 !== e.url || void 0 !== e.audioUrl || void 0 !== e.videoUrl || void 0 !== e.topUrl || void 0 !== e.pageUrl
                }
            }, {
                key: "keepOpen",
                get: function() {
                    return !0
                }
            }, {
                key: "name",
                get: function() {
                    return "blacklist"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_blacklist_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_blacklist_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-blacklist-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 20
                }
            }]), t
        }(),
        B = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, R), i(t, [{
                key: "doJob",
                value: function() {
                    return b.open(this.hit.localFilePath).catch(function(e) {
                        throw new h.DetailsError(u._("failed_playing_file"), e.message)
                    })
                }
            }, {
                key: "getReqs",
                value: function() {
                    return this.reqs.coapp = !0, this.reqs.coappMin = "1.2.4", Promise.resolve()
                }
            }, {
                key: "solveReqs",
                value: function() {
                    if (this.reqs.coapp) return this.solveCoAppReqs()
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !e.urls && 0 == e.running && !!e.localFilePath
                }
            }, {
                key: "name",
                get: function() {
                    return "openlocalfile"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_openlocalfile_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_openlocalfile_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-play-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 200
                }
            }, {
                key: "catPriority",
                get: function() {
                    return 1
                }
            }]), t
        }(),
        J = function(e) {
            function t() {
                return s(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return o(t, B), i(t, [{
                key: "doJob",
                value: function() {
                    return b.open(this.hit.urls && this.hit.localFilePath || this.hit.localDirectory).catch(function(e) {
                        throw new h.DetailsError(u._("failed_opening_directory"), e.message)
                    })
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !!e.localDirectory || e.urls && e.localFilePath
                }
            }, {
                key: "name",
                get: function() {
                    return "openlocalcontainer"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_openlocalcontainer_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_openlocalcontainer_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-open-dir-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 180
                }
            }, {
                key: "catPriority",
                get: function() {
                    return 1
                }
            }]), t
        }(),
        Z = {};

    function Y(e) {
        Object.keys(Z).forEach(function(t) {
            var n = Z[t];
            e(n)
        })
    }

    function X(e) {
        Z[e.name] = e
    }
    var G = function(e) {
        function t(e, n) {
            s(this, t);
            var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return r.details = n, d.create(Object.assign(e, {
                title: n.inFileName
            })), r
        }
        return o(t, M), i(t, [{
            key: "getReqs",
            value: function() {
                return this.reqs.convert = this.details.outputConfig, this.reqs.coappMin = "1.2.3", this.downloadWith = "coapp", this.reqs.coapp = !0, this.reqs.checkLicense = !0, Promise.resolve()
            }
        }, {
            key: "getStreams",
            value: function() {
                this.streams.full = {
                    type: "full"
                }
            }
        }, {
            key: "solveStreamName",
            value: function(e) {
                var t = this;
                return Promise.resolve().then(function() {
                    if (t.details.outFileName) return m.call("path.homeJoin", t.details.outDirectory, t.details.outFileName).then(function(e) {
                        t.filePath = e, t.directory = t.details.outDirectory, t.fileName = t.details.outFileName
                    });
                    var e = t.details.inFileName,
                        n = /^(.*)\.([^\.]{1,5})$/.exec(e);
                    return n ? e = n[1] + "." + t.details.extension : e += ".mp4", m.call("makeUniqueFileName", t.details.outDirectory, e).then(function(e) {
                        t.filePath = e.filePath, t.directory = e.directory, t.fileName = e.fileName
                    })
                }).then(function() {
                    return m.call("path.homeJoin", t.details.inDirectory, t.details.inFileName).then(function(t) {
                        e.filePath = t
                    })
                })
            }
        }, {
            key: "downloadAllStreams",
            value: function() {
                return Promise.resolve()
            }
        }]), t
    }();

    function Q() {
        var e, t, n, r, i;
        return u.ui.close("main"), g.selectConvertFiles(u.prefs.lastDownloadDirectory || "dwhelper").then(function(t) {
            if (!t) throw new Error("No file selected");
            return e = t.selected, r = t.directory, n = t.outputConfig, b.getOutputConfigs().then(function(e) {
                return e[t.outputConfig]
            })
        }).then(function(e) {
            if (!e) throw new Error("Unknown output config " + n);
            if (i = (t = e).ext || t.params.f || "mp4", t.audioonly) return v.checkLicense().then(function(e) {
                if ("accepted" != e.status && "unneeded" != e.status) throw v.alertAudioNeedsReg(), new Error("License required for audio conversion")
            })
        }).then(function() {
            if (e.length > 1) return g.selectDirectory(r, {
                titleText: u._("select_output_directory")
            });
            var t = e[0],
                n = /^(.*)\.([^\.]{1,5})$/.exec(t);
            return n ? t = n[1] + "." + i : t += ".mp4", g.saveAs(t, r)
        }).then(function(a) {
            if (!a) return null;
            u.prefs.dlconvLastOutput = n, e.forEach(function(e) {
                var n = "local-convert:" + ++G.idIndex;
                new G({
                    id: n
                }, {
                    inDirectory: r,
                    inFileName: e,
                    outDirectory: a.directory,
                    outFileName: a.fileName,
                    outputConfig: t,
                    extension: i
                }).execute()
            })
        }).catch(function(e) {
            console.warn("Error converting local", e)
        })
    }
    G.idIndex = 0, X(q), X(M), X(F), X(U), X(W), X(N), X(L), X(z), X(H), X(V), X(K), X(B), X(J), l.listen({
        convertLocal: Q
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updateHit = function(e) {
        console.warn("TODO converter.updateHit")
    }, t.info = function(e) {
        return a.call("probe", e)
    }, t.play = function(e) {
        return a.call("play", e)
    }, t.open = function(e) {
        return a.call("open", e)
    }, t.wmForHeight = function(e) {
        return new Promise(function(t, n) {
            var r, i, o = 1 / 0,
                s = null;
            for (var u in b) {
                var c = parseInt(u),
                    l = Math.abs(e - c);
                l < o && (s = u, o = l)
            }
            var d = b[s];
            a.call("tmp.file", {
                prefix: "vdh-wm-",
                postfix: ".gif"
            }).then(function(e) {
                var t = e.path,
                    n = e.fd;
                r = t, i = n;
                for (var o = atob(d.qr), s = new Array(o.length), u = 0; u < o.length; u++) s[u] = o.charCodeAt(u);
                return a.call("fs.write", i, s)
            }).then(function() {
                return a.call("fs.close", i)
            }).then(function() {
                t({
                    x: d.x,
                    y: d.y,
                    qr: r
                })
            }).catch(n)
        })
    }, t.makeUniqueFileName = function(e) {
        return a.call("makeUniqueFileName", e)
    }, t.convert = function(e, t) {
        return new Promise(function(n, i) {
            var c = ["-y", "-i", e.source];
            e.wm && e.wm.qr && !e.config.audioonly && (c = c.concat(["-i", e.wm.qr, "-filter_complex", "[0:v][1:v] overlay=" + e.wm.x + ":" + e.wm.y]));
            c.concat([]);
            for (var l in e.config.params) {
                var d = e.config.params[l];
                null !== d && ("string" != typeof d || d.length > 0) && (c.push("-" + l), c.push("" + d))
            }
            if (e.config.extra) {
                var f = /^\s*(.*?)\s*$/.exec(e.config.extra)[1].split(/\s+/);
                f.forEach(function(e) {
                    c.push(e)
                })
            }
            e.config.audioonly && c.push("-vn"), c = c.concat(["-threads", r.prefs.converterThreads, "-strict", "experimental"]);
            var p = ++s;
            u[p] = t, e.config.twopasses ? console.warn("TODO implement 2 passes conversion") : (c.push(e.target), a.call("convert", c, {
                progressTime: "" + p
            }).then(function(t) {
                var a = t.exitCode,
                    s = t.stderr;
                delete u[p], 0 !== a ? i(new o.DetailsError(r._("failed_converting", e.source), s)) : n()
            }).catch(function(e) {
                delete u[p], i(e)
            }))
        })
    }, t.aggregate = function(e, t) {
        return new Promise(function(n, i) {
            var c = ["-y", "-i", e.audio, "-i", e.video],
                l = !1;
            "h264" == e.videoCodec && r.prefs.converterAggregTuneH264 && (l = !0, e.videoCodec = "libx264"), e.wm && e.videoCodec && e.fps ? c = c.concat(["-i", e.wm.qr, "-filter_complex", "[1:v][2:v] overlay=" + e.wm.x + ":" + e.wm.y, "-c:v", e.videoCodec]) : (c.push("-c:v"), l ? c.push(e.videoCodec) : c.push("copy")), l && (c = c.concat(["-preset", "fast", "-tune", "film", "-profile:v", "baseline", "-level", "30"])), c = (c = c.concat(["-g", "9999"])).concat(["-c:a", "copy", "-threads", r.prefs.converterThreads, "-strict", "experimental", e.target]);
            var d = ++s;
            u[d] = t, a.call("convert", c, {
                progressTime: "" + d
            }).then(function(e) {
                if (delete u[d], 0 !== e.exitCode) throw new o.DetailsError("Failed conversion", e.stderr);
                n()
            }).catch(function(e) {
                delete u[d], i(e)
            })
        })
    }, t.setOutputConfigs = d, t.resetOutputConfigs = f, t.getFormats = p, t.getCodecs = h;
    var r = n(1),
        i = r.browser,
        a = n(27),
        o = n(5);
    var s = 0,
        u = {};
    var c = new o.Cache(function() {
            return i.storage.local.get("outputConfigs").then(function(e) {
                return e.outputConfigs || y
            })
        }, function(e) {
            return i.storage.local.set({
                outputConfigs: e
            })
        }),
        l = t.getOutputConfigs = c.get();

    function d(e) {
        return c.set(Object.assign({}, y, e))
    }

    function f() {
        return l().then(function(e) {
            var t = Object.assign({}, e);
            return Object.keys(t).forEach(function(e) {
                t[e].readonly || delete t[e]
            }), c.set(t)
        })
    }

    function p() {
        return a.call("formats")
    }

    function h() {
        return a.call("codecs")
    }
    r.rpc.listen({
        getOutputConfigs: l,
        setOutputConfigs: d,
        resetOutputConfigs: f,
        editConverterConfigs: function(e) {
            r.ui.open("convoutput" + (e ? "#" + e : ""), {
                type: "tab",
                url: "content/convoutput.html"
            })
        },
        getFormats: p,
        getCodecs: h
    }), a.listen({
        convertOutput: function(e, t) {
            var n = u[e];
            n && n(t)
        }
    });
    var g, m, v, y = {
            "e6587753-4ca5-4d2e-b7ba-beaf1e7f191c": {
                title: "Re-encoded MP4 (h264/aac)",
                ext: "mp4",
                params: {
                    "c:a": "aac",
                    f: "mp4",
                    "c:v": "h264"
                },
                audioonly: !1,
                readonly: !0
            },
            "249a7d34-3640-4ac3-8300-13827811d2cf": {
                title: "MPEG (mpeg1+mp2)",
                ext: "mpg",
                params: {
                    "c:a": "mp2",
                    f: "mpeg",
                    r: 24,
                    "c:v": "mpeg1video"
                },
                extra: "-mbd rd -trellis 2 -cmp 2 -subcmp 2 -g 100",
                audioonly: !1,
                readonly: !0
            },
            "6de4f5ce-8cfe-4f0f-8246-bacb7b0d7624": {
                title: "WMV 500Kb (Windows Media Player)",
                ext: "wmv",
                params: {
                    "c:a": "wmav2",
                    f: "asf",
                    "c:v": "wmv2",
                    "b:v": "500k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "21a19146-e116-4460-8356-a8eab9cf61ce": {
                title: "WMV 1Mb (Windows Media Player)",
                ext: "wmv",
                params: {
                    "c:a": "wmav2",
                    f: "asf",
                    "c:v": "wmv2",
                    "b:v": "1000k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "933b1b41-6862-4ce0-9605-10fa5e4b310c": {
                title: "WMV 2Mb (Windows Media Player)",
                ext: "wmv",
                params: {
                    "c:a": "wmav2",
                    f: "asf",
                    "c:v": "wmv2",
                    "b:v": "2000k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "90195ab2-d891-443c-a164-8f0953ec8975": {
                title: "WMV 4Mb (Windows Media Player)",
                ext: "wmv",
                params: {
                    "c:a": "wmav2",
                    f: "asf",
                    "c:v": "wmv2",
                    "b:v": "4000k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "3a4cc0a6-6eb0-4cff-90fb-fdf8eb6a9571": {
                title: "AVI 500Kb (mpeg4/mp3)",
                ext: "avi",
                params: {
                    "c:a": "mp3",
                    f: "avi",
                    "c:v": "mpeg4",
                    "b:v": "500k",
                    "b:a": "128k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "ebdbb895-7a1e-43e2-bef4-be6e62cb8507": {
                title: "AVI 1Mb (mpeg4/mp3)",
                ext: "avi",
                params: {
                    "c:a": "mp3",
                    f: "avi",
                    "c:v": "mpeg4",
                    "b:v": "1000k",
                    "b:a": "128k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "0b6280d3-f8f2-4cb6-8235-a5a4b91488f7": {
                title: "AVI 2Mb (mpeg4/mp3)",
                ext: "avi",
                params: {
                    "c:a": "mp3",
                    f: "avi",
                    "c:v": "mpeg4",
                    "b:v": "2000k",
                    "b:a": "128k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "9ea8a22b-5738-4d0f-8494-3037ec568191": {
                title: "AVI 4Mb (mpeg4/mp3)",
                ext: "avi",
                params: (g = {
                    "c:a": "mp3",
                    f: "avi",
                    "c:v": "mpeg4",
                    "b:a": "4000k"
                }, m = "b:a", v = "128k", m in g ? Object.defineProperty(g, m, {
                    value: v,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : g[m] = v, g),
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "4174b9dd-c2a0-409d-801d-c84f96be0b76": {
                title: "MP3",
                ext: "mp3",
                params: {
                    "b:a": "128k",
                    "c:a": "mp3",
                    f: "mp3"
                },
                extra: null,
                audioonly: !0,
                readonly: !0
            },
            "05cb6b27-9167-4d83-833d-218a107d0376": {
                title: "MP3 HQ",
                ext: "mp3",
                params: {
                    "b:a": "256k",
                    "c:a": "mp3",
                    f: "mp3"
                },
                extra: null,
                audioonly: !0,
                readonly: !0
            },
            "69397f64-54f2-4ee4-b47a-b4fc42ee2ec1": {
                title: "MP4 500Kb",
                ext: "mp4",
                params: {
                    "c:v": "mpeg4",
                    "c:a": "aac",
                    f: "mp4",
                    "b:v": "500k",
                    "b:a": "128k",
                    ac: 2
                },
                extra: "-mbd rd -flags +mv4+aic -trellis 2 -cmp 2 -subcmp 2 -g 300",
                audioonly: !1,
                readonly: !0
            },
            "16044db3-3b75-4155-b549-c0ba19c18887": {
                title: "MP4 1Mb",
                ext: "mp4",
                params: {
                    "c:v": "mpeg4",
                    "c:a": "aac",
                    f: "mp4",
                    "b:v": "1000k",
                    "b:a": "128k",
                    ac: 2
                },
                extra: "-mbd rd -flags +mv4+aic -trellis 2 -cmp 2 -subcmp 2 -g 300",
                audioonly: !1,
                readonly: !0
            },
            "b5535083-bf16-4ae0-a21f-7c637ce0617f": {
                title: "MP4 2Mb",
                ext: "mp4",
                params: {
                    "c:v": "mpeg4",
                    "c:a": "aac",
                    f: "mp4",
                    "b:v": "2000k",
                    "b:a": "128k",
                    ac: 2
                },
                extra: "-mbd rd -flags +mv4+aic -trellis 2 -cmp 2 -subcmp 2 -g 300",
                audioonly: !1,
                readonly: !0
            },
            "dfbed97f-46c9-4db8-b5d1-4d19901bc236": {
                title: "MP4 4Mb",
                ext: "mp4",
                params: {
                    "c:v": "mpeg4",
                    "c:a": "aac",
                    f: "mp4",
                    "b:v": "4000k",
                    "b:a": "128k",
                    ac: 2
                },
                extra: "-mbd rd -flags +mv4+aic -trellis 2 -cmp 2 -subcmp 2 -g 300",
                audioonly: !1,
                readonly: !0
            },
            "912806c1-6c43-44ad-ac6e-05f105bade55": {
                title: "iPhone",
                ext: "m4v",
                params: {
                    "c:v": "mpeg4",
                    "c:a": "aac",
                    s: "480x320",
                    "b:v": "800k",
                    f: "mp4",
                    r: "24",
                    "b:a": "128k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "2416dcbf-146d-4ca4-b948-f6f702fb043c": {
                title: "iPod",
                ext: "m4v",
                params: {
                    "c:v": "mpeg4",
                    "c:a": "aac",
                    s: "320x240",
                    "b:v": "500k",
                    f: "mp4",
                    r: "24",
                    "b:a": "128k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "42fb9cf9-94f9-45c1-954f-1c5879f3d372": {
                title: "Galaxy Tab",
                ext: "mp4",
                params: {
                    "c:a": "aac",
                    "b:a": "160k",
                    ac: "2",
                    "c:v": "h264",
                    f: "mp4"
                },
                extra: "-crf 22",
                audioonly: !1,
                readonly: !0
            },
            "edf545c2-88fc-4354-b91d-83e2f31d3c14": {
                title: "MOV (QuickTime player)",
                ext: "mov",
                params: {
                    f: "mov",
                    "c:v": "h264",
                    preset: "fast",
                    "profile:v": "baseline",
                    "c:a": "aac",
                    "b:a": "128k"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "f31ac68e-db3b-4b17-95d7-04456cbc3c26": {
                title: "Mobile 3GP (Qcif)",
                ext: "3gp",
                params: {
                    f: "3gp",
                    "c:v": "h263",
                    "c:a": "aac",
                    "b:a": "12k",
                    s: "176x144",
                    "b:v": "64k",
                    ar: "8000",
                    r: "24"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "85cd71a0-fb61-45a4-9fed-6f2e6e405bc3": {
                title: "MPEG-2 DVD (PAL)",
                ext: "mpeg",
                params: {
                    f: "mpeg2video",
                    target: "pal-dvd"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            },
            "47b9b2eb-8fd4-4e10-8993-f7d467ed1928": {
                title: "MPEG-2 DVD (NTSC)",
                ext: "mpeg",
                params: {
                    f: "mpeg2video",
                    target: "ntsc-dvd"
                },
                extra: null,
                audioonly: !1,
                readonly: !0
            }
        },
        b = {
            240: {
                x: 7,
                y: 7,
                qr: "R0lGODlhHwAfAKEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAAAfAB8AAAKejI+pi+DvwksTQgNUZk1jWUlHFWXXZoYhWLLmd7KiK8a1etFpO3cgDKRgLLwXypXj/DY/JTLom9lKpMho0utRt0xatjt8eWDg6PF62nXX2+xIar3CSeG4ln4UL4dvyzOed6Y22CTVtNbBpEjkp5T29gHJyIY4eBYFGanVt4KGBsjZQkk1Ryba8IhipXbjN4nlVqPpc4nUKWua5LSrUAAAOw=="
            },
            481: {
                x: 10,
                y: 10,
                qr: "R0lGODlhXQBdAKEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAABdAF0AAAL+jI+py+0Po5y02ouz3gr4D4bih4iWeYzquqxuWMIVarw20N5uDJ5yrWN1PD4cJ0KaEYdGSvL4eE6kqaXTCm1Qkdhqc9rNMou5787LK4940rYQ+EV713K4mhbAu1Xp8VyPtZX3NthTV0hn5weXWMgWGIYIaEYouNd4CRnHOPn447go+ZlJuSlqqMg5GkmKCqral3CWerpX5unaive3WorJqvnrS8ibG9wZOvta+1ls66x5q2Rq+YT6fEUdGQWsbXUdPS2dPc42dyjI7U0Wes6Ivu1QHSTsjmivS39Hjw3+bX2MXzeB/QD+O4iLnxh54bTEWwhxWbpDESvSmkjLYkX+bAwwitFRziOTTa6gldrHJ9lDNSNRcjRZ8uLKlrLm1RtpMCUzUy4HMnyY6IVJCcrssXT4Q6iqmB2JvUPKE8LNC/NwaZzKruawmRqwilPZbKFXcmCZYmBq8yfIpQm5mmv3tGmQYm2jyl1H8+4NukO52N3pKVZWiU6X9dwq+KtMnYlx9npJdnEjio6NWc7AsajUnIdbwdwFV10TtDasLtWsddpom5VoKPypNiiye3FjYp2s1/Vsf6vD3AbdmW8q3kbZwgsb3PhwznGFE0Z+XOlO3lXzksZ7Wndp5Y1pe++eL+le7pS9Xye6ErLhygQZw36fMb7W9tLV2S/vkf54i7PpcK9PDd9Gb/iXX3puYTYgcAX+JdIG/SloIIMDtRcbcMfVRaB+dtUHFoYQ6lchdIt5iFyDAIIBVIRHyTWYXxuqmFc56P0VY2jgYWRid2oFKGNzZc0m2odrzRegMiai9hqRSNWlI3sTbqcki32NCNWDvTD545XlfXbQZVMKZmRDneWUWWHhgZkilL+5JxmQFHIpUJGtbTXkdG9Kmd1JcE6ioYj/3bfcgVGiSaN8gL5i1mbdNHkiirEkKlpIbuV4oY8oYvenk3NtWdsW1OmjaZ04MveWnWZqyChxUdKnUauuvgprrLLOSqtGBQAAOw=="
            },
            721: {
                x: 15,
                y: 15,
                qr: "R0lGODlhugC6AKEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAAC6ALoAAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNe2CeT6zvf+D9QtgjscMTc8Kpc/CfMJTR6NUwX0qnRit01rtrSUcsfICPkMEAepRDX6qn1v3V1S2CvHxvNRfBv8lcCnZzbYJxg4codoyLQnBMhz0+HDBglRGVk0uZFp1/NY9inJqeGpCFpIOrpZinEqAtsgC0LrGpqmeflg69F7y5vKuuvwy2EMzIBsKhy8ijDnR2ywHBDN+Ic9bU2oLercCt0t/nxQfU2enb6Nbt5c/E497l4uX688b69OH87/RIeLTiJ/3wjmwpSPWxVvB9c5klZwVjyFhxw2NIhroL7+NRAvbnzIMGBHjRTZTRS40CKtlQnPTWz30WPJiPjgjHyJ02ZIVf1ikmSZEiPCljkrCh3ac+YiiyjvLeMC8Oa+mCIZ/izKcSc4o1SlZmXK06ROsFax0vT69ajKoF2RiuWqtGnSpzDjoq1DdivNukCn2tULMq/Bq/eilvXbN21beESdNk5qeC1is2PC/usoF0hkxnMfvz1jObDawWz/As6Md7TPundTLyY9uTDm1pRRi645VrVSwpBnH1ZsGnZu3HAT3w4u0fFw5LtZ/wZufKnuzSFcyvZGnXm1Vyd9o7ouOPnnvbV1nfUeq7tWvdmjWzq/Pj346RDblx8GP3wt9fr+3dhX3hsl/NEn4HyviUcegOPJ9IF1AR4z4IHEyeQeetVF2FwjFcb30X+daUiSbSB6OB6JCYLol4gamkihgicuiCKGMZa2oUMsqthIRjMuaOKNtK0Y2o48WjiTj8/FqKOQRtpIZHRC5pfMkhRsF2WV+lHZn5VaSjkBllsmU+OUGH5ZZZhdjkkmmPdV4GWapZhZlZs/ltYkmhY4uA2OQ7pFRmjZNShjoMvh2SefLRqYAaEMzrknYFAZ+qcvgj4onGZE6glcnYhyh6iivOXJaKYcMgdop5NeNiqmlp52qaSmvlrcqatKBp1zd9qaJasXSLdabMtx+murut5Ko2eoQpj+UKTDsvnpcY8WGGyqkAJb66C4ipmssJyBaqiTxWZLbLS5bgslgrNW6lqGKe56rYR+ttDsovjJe2WIVsYLr6yHrlvmt5ReCCuMdk6CLwuK2ianui+Wu1/AC6erZcErHNxawhKrQPGR9MJAaJzM5lhxqBt3IqvH2BqCsMgndPwuuyBrrOrKJbcc7iApazzwx/8WSbPONoeM86bUMqxvokDCrPJ7I/M8rcsoA03ruSQLHfSHvnL7ndUP8zrh0jFDTWDWJYq8dJu9Vns1w6VqvS9cyjrqL9pYy8e2qmXnfLbUCj+cr4t2m3ymtXGr7WrdZMtcj6cwcT3i0F47ri26tzH+fnTNhDs9jeL5UP6y5Y9jHpHmw3H+NOifex553seq3jYfRlONurRVT0X6z6Yj3pPoXNXuOuSO88p7662/Lbl/YE89+sW6rUluupSZ3TXwykvIvLnOuwjx7xoF32Pqew9/PDObT68d9kkajnThu5NvHPGsG58+tOsPLjz84xZfX/iAy2G3tztnHLYAUu8N/Xuew+6WuKL1jHXxelbUEPi/eACweQVkW2XuAjjqTNB6FRSYsTbYNe+BkH9k89/c3GUhELKILyQ8UgZTqED1XW55MfTZk0CzthNyKYSmu6EDkbUzTUUQdgz0IZ18FzvZ3S96RhSXDU83wANqr4mrQ57+DoWoQ7NREYcyhGL5pNjDLR4nYizk1xIn9LogvqmMolIiudJ4xTV+sIY2hOMMb/BD1b2QT3b0Yg3yuLc9sgeJaQKkvdxorj5ajI16cx8aCdm8G/bxkMuKYungpqQptrGSX7xkJJ80ySM2rV6d+2Qmw2hGCmKxd90CpSYbucBO2g6TOwplKjm4yjycb0a23KQqR9W4UdItjqBT5NAE+Uux3fFkyySVZZCJy3nhrpnQoyMzmxnLhhHzjPZL5hOVNk0/VhOMtzOPH0NhzGJmc53yw+YzIXlNaPJwdnzL4RhLKEpu5pJ8vYQlPe+JyHk+EE79zN4/uebIFdJPm1VkIhr+5KnQtJ0zaa18KDs5yUh3/nOXFxTmNYXHPrx9r4Fm+VssM1q/VzqrWSb16EjN570Obq2khzvpBxOKTwu2r6YuRSlOD2pAv/EUozeNaU49iL6BjrCoAZUpSGl60P0xVakEPCov4flSCzo1eGI0KFEFp9PKSa6r6aSqVq260q7m05tFPCtQ56hWIlqyoSac5VjFWNa7utWsXORrE/MKsL0KkKFEg2kXwZnLvg2xUUDc5kd3iFg+GtWl9kxpUw/7zstSFrPAFClWu4nCckozsQabmWY5WVnImhOdk6XlVU9LEEfWlZWuRVJrYyvCoHrSepK8bYdyi71g1hZFP2VSQGc4q8sguRK2vz2ubu3K2+XqEzvADWspo3vK6Rr3jMhtYcK+C97wine85C2vec+L3vSqd73sbe96CwAAOw=="
            },
            1081: {
                x: 25,
                y: 25,
                qr: "R0lGODlhNgE2AaEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAAA2ATYBAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1KrVAshqt9yu9wsOi8dZCDncO4PN6rb7Td7A5/Q5m56u3+v8/lfuFygIsAeXh/cwqMgHuOjoVvh2aJf4aHnWeKn5V4m4w9i5KbqVOToaCckD6mDaSqjhaoraNmkYGntZivs4q1YrebvrqCus2IupqhdcPEjMHHgcl+zZ8MwLa70YPfabypptjL3WTXr1IuaDLs45zW7Oot7u5ayVjvbeEv95n6Gv448PBUAcAykUtHEw4IiENBhGszdOYQqHMih+i7gPo0T+ExZhdGTw0UXIjRhGwuNXEuU/lSQXsiT40mBMhDNbejC5AucBnRNr2uTAU6DPh+Tq/SQR9ERQh7mWlbvo7oImp76olrHah2i/oU2hzsNKD5pXYGO5bFNW9mlKjQu6VuM6FGvWtFXpXrU7F2/YV3hXvWWrYKnbtmj/RiV8Te+6r30Lg4QLWKYluUwhDwO7uMtZao8jIxA8ubFlxoa1Yd7qeWdoxazXJu5MqTVs07KxjA5XO3Bc0Zx19/Z9GDjt0pozm6X8O0Hl1BGm8g6u/Haz065Jz8ZN/Hhuya8Rx86u9vr07ROWXyavmvnm5Om/iw/vffh7o6ihf14Nnn5+ZPv+71bHPp9/AebV317r2YKeAX7FZ51t3TGoXX8LQghfBebJR6F+A3LT114TClfcc2QVaFyF0T0IYoQbMsRhfRimaOJ9KJ5onwQXApihgDlKI6GHju144IgDGoice0AWWWMALf43HokieuMkkzG29yKNDcJY14Y+skdliBL+iKWOFkoniFZf+rSkVPgNiaSQR7ro5YpcKkhmljvyJaVYCSq55pt5imkljmHiKSdzaTp4XpSFIqgoolcG2iSbT6o4KKGOCgrplHTOKGOSZi7q5qBBxlnplkaK2iaUkv5paaVgZqrhnYNdGqmfoKpqK62a8slpl5S62ueYvW7q6ayowvn+K6x+fCprsNxV2emj0WI6bbLl1bksdbfWKmyiq25rZ67dSutrmdo2O+yotJwL7KnKtvosqe0y+i263uqqZ6PzhvoukZOGe+yZ6aa67p7G9ltirPviGjC4+aqZ7o3cIozsrgdXa7EwptIr7rsfUsyqugCD7HC2FT/cMcYoN4wvoCqbrK/HF9vo7Mvw2vyxzf5m5KlcO9fLctA3gNZzDEQXHbPO7JKcw9HyDr1bjwm7XK7CTAtNk3pLZ420llPfXDXVxJI79tNck80sTFp3+HXaV799ttk0r+1R1F6fLDavxWILdkN2p1yD03I3x7fbSsszuOGB/11q21uH3bfeaFf+xDjci9N9d8iPl20t5BB1DbjfmN/5c+iSJ54UR5UfzvPkbOMducQZj57P6p4XlbfPjhtcOO6REwxO77yrJ7vVOAdfMKvIJw+05ZzPvjfxy8MM8fSvst489qYXb/3I13Y/5+mdP2/87cNHDz7H46bP/PbCJ22+wOyPLzL7ipOfN/ex8z0/6Av3fz/xQQ9t+qtf+jbWv/y9L3vxYyD+Eug6+UEwgAXcnADL90AI0g949rNgBc9HQA3yR3kiVKD0Toi+EKKwhLQ7CuHQlDqpuXCGqoOh7V7YQhrqEIdJOhQIfLjDIMKub0C8SQyFGMQiZrCGOUSiE5f4Opfc8IlCVOL+BTHoISpqMV6Ds2IWtwhG3clQik0MIw2t6MWv/c6MT0TjEUnHxjhCjohvbJwc/7UyLg4wcZQr4xVzh0cewY+Hrigd1i7nP48hkGHOMyCBqqfCROZkimkMpBcFJ4vdDXIGmNwVBwXpQEfmbG4p5KPRKNlJ6pnuk49s2f78qBRUyvJehyRkKwzZyD5Kco6LbF8tRXk9UkYygueY5S4zGMwH9tJcsAugLokJxyEm84/LzOP3SrnBU/qxkhJkpPbWd0tNhvKZphwjJKnVQFe6sWbInCYToSVMaIIzmyS04bCcU7eBRVEE3DynN9s5J3wWU5/mDEE/1cmimf2xlSchaOb++FlHmdmTlsdzZwkUuo13ylOP3gOou+Y4SqE4NJpkPKYjWbnOkRqUnbakpz9ditCJwnOhIY2lShV50YhW1FAKFahIWJrRnE6RlShNKFA1OrFrmlSMJeUXSJPp09rdFGdIhek8O0pTqGK0qtaMZzlf6snWOTWdQzjoL2taxWnqVAVmbSRak6jWoWpzm/xbqxVqaleR0nWFY3UiXuWaz71i05da/Css52pS/bX1KIZdKmI3+k2JHlYijYUsIhNbV8AqpLJfbVoqX/nRNsZ1sgMV7DD7ikTOWhVqxkSdRaOwWLJyFItqLAZRi0paiLZ2tVQV6vRua8m8frGZauSqNYD+203CXtayyiyub5eH3JLFVq+YNS1zgclS1TJzJbsNa0F/2L3o2gu1j+3sL5mq299aEruORcpnh9vU4In3f1glp3lzuc+VWm++klVf3O4bWaVeF7f3HC1Flwtg2Qo4wS3NBn936l8E81bBXp1wg4+7XgIPWJzpnWlWearZn/KVflvdUzVBOd4uCte4oD1tUitM29qGL6TT5eQCU6xcGANSmjPWaoilOlgslniTJ76kj3MLZBfv8cUXXiOPQ+tRstXYvkuuclebbNMDPxXESG5okE2oZSyzWLtYnXJ5rQxmD1uwyIo1apcnOWI0M3S2Tq4nlD/cwxU/17VxvrIzZXz+Zxrr2b19TjM6bSxTBuN5pmR+RpY3TGguVxcXD95yLB6t6DGjN6YF7rF692xhTKu4u6fIcHCPymHWSvq6tjV1cksNau+KeNWKbvWrhbxfFvuOjqQWRaWjHM5Yx7i0ee71Jn696GBHGtLxHV+NbS1d9qo51f919mej2l8lY1jYO551sa2rbBzLGdrNHra3pXztnhoYeaKWNaeh3OgW8/nLdRY3rguNYjh3OtA3PquxjYxvM9sZ3uuet7YNHep4nzSwYVa4B/tNZ4DTW+BgvbLDQWjwWhecxK/tMKM3LmcK/vuDt+62fvcdYQo3F+MJB/m978xtVWY74xzH959LLu/+msN82R/3NL1FDu4crxznZ96uvREe8ocHvb5t/nHEBe3zg+c86U/+ObKpDeGeU/rqJs4vTokLdpxDfeuurni97fhQV+Iy64cm99HPjt/v9jbsZpd2X91OX3Ov0utz1xzd3z72S3OdyHznJdZ1PHVYSzfez/73pq9qcn/vQsOofSvh5W74v0M+8b4+ddTJ23XMQ1HzdLb7P5PNZNS7+7yFH73fX7/4Iwu+7Gp3rujFTHq2MxnvM2/50jHY+N9z/tie53f41tz6ha69J28OsMqDynMWFrLokd/8zdMOXulPnvpwLz3yb89m7R8/5u1+OavzKv7tMzzTSp90e2OfftD+R3/11v8+9j8Q/9kTm/0sp3/fPZ5/2KZvzBZK1zZmAZh6uqaAoXd/RoSAnbd+oQZ07keAefeAp1d+1ed9DEhSAHiB0wZXEdNxe5d7Dvh+mwVUljdOh9cBgwZbKTiCrFeCLeh074BRKkiCsOeBendGMDh+l6eDJ1eB+HCDMRh3QZh9JxgQRfiDKziDQFGD5sCEOweEdbeAbDSFKYd788eD9RdHWSh/ToiE+BeFVwCGGGh/Vkh+cnSGQnd9asiFGmhpE3SATQiHBZhrVUeHMYeDtdd/2zZwexiHc0aGNkd5CVh87FaHVDiGzxdegKZBGUiIJih1pmd07yaI5SZzSVj+iYd4iZsnfZLYh164SY+ohwkkika4gaWYh4GIiouohVBoiIl4aJYIiJo4iTQ4i2KHarz4aYM4iquIh794h57VfJTIf1Xoh8pzhdylhEKYjGJYjKDYjMb4jJwYjTk4jRFXjWpzjYX4jc+3fE3WfYj3OUOIjRKYhstoduW4hc6IjuAYj+LIgtCHi+eYjdCojhzIjurUjao2j7oYjkN3j7ZXkIizj4MoiQtpkDsoh8w3kLIYkcJlgGuIkP7HVmVIkA7pjspnkWKVkAepkP+4YCEpeWFGTdyXi7a4iSWJke8IeBCXkb0Ifyj5ePJIc594hBy5kp7oZzeJjDrnYS4YkyP+p37M+JE12YkRiIi+aJPJN46qN0LSqI9NqZS1CJQCKXUXt39YSYtW2YFVaX61SJQWmG9Pd5TtSJJziIFl2Xtu6JMtiXgd2X5DqZEs+ZBSSXxDtJbA5oZuqXtw+ZU66ZJdWJjDx5VUCYrq9nlC6ZWsKIK7iIsCyJaOaZmEaY5xOXxviIlt53JI95N/KJcbKYOuuHufiZiq6Ig+aHV8yJjGN3GqSZpvOZXuc4x+iZl6uZmaGZVtOJYmaZaBV3mZxYi2iZIkN5mvGYtNV5wnaZeSyZPKOZwBJ5spOZi/SXXAKJ1tSZyxWJdkKZNBmUlE951g6ZzgCZ1iCYHRVp65OYH+zxmbrViUF9iXuomc86l/+ImA9emboNlBTvmA/MmaW2mKVxmAAhqZ8UmMwfmBdCmaK8mc0HWd6Yegx9mdigig+5mU+nmZ2Dk/mql9FQqfBCqfDPqBIoqeCiqhGXqgG2qircmi42mg+VefVOah/umgTPmS1qmM6bijDPmgSRB8MHpuwOmjN7qbRzCkS9mVP4qiHZqXNmqYq3mbnOllTKqY1baj93ml+XikOGqlWjqls+l81OWlOAmlSWoES5qTYyqRAfmmbQqmSMCmaSqlOTqSQUqn77WOX4qnIjmMEalp9QiY9Kijc8qPAHl+6TmAZyqeSBqmEral4WmmNNqnwqimjWjHoTLajiwUqZmZqP/3ovnZmQB0qYf5qR4Zo4rXqSWUqu+pcYlmqqc4qz2KqaUZlrTpaJCYiZlKilmaeTPKqqX6oacKqrYarJs6rIvpqsYKk7iqqaM6fbRarKGKqs6aUpHIq69orccKrK6nrOvZqiL0qu3pptnaq3ekruvKru3qru8Kr/Eqr/NKr/Vqr/eKr/mqr/vKr/3qr/8KsAErsANLsPZaAAA7"
            }
        }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.finalize = function(e, n, l, d) {
        function h(t) {
            function n() {
                if (e.masked && e.action) {
                    var t = o.makeFileNames(e.downloadTarget);
                    o.finalize(e.action, t.manifestFilePath, function(n) {
                        e.action.hit.data._finalLocalFilePath = t.manifestFilePath, d(n)
                    })
                } else d(null)
            }
            t ? n() : i.File.move(e.downloadTarget + ".part", e.downloadTarget).then(n, d)
        }

        function m() {
            var t = [];
            e.secDuration = 0, n.forEach(function(t) {
                t.scaledDuration = 0, t.secDuration = 0, (t.stts || []).forEach(function(e) {
                    t.scaledDuration += e.c * e.d
                }), e.timeScale && e.timeScale[t.trackId] && (t.timeScale = e.timeScale[t.trackId], t.secDuration = t.scaledDuration / t.timeScale), e.secDuration = Math.max(e.secDuration, t.secDuration)
            }), n.forEach(function(n) {
                var i = function(e, t) {
                        if (e.init && e.init.tkhd && e.init.tkhd[t.trackId]) {
                            var n = e.init.tkhd[t.trackId],
                                r = Math.round(t.secDuration * t.timeScale);
                            return a.WriteInt32(n, 20, r), s("tkhd", e.init.tkhd[t.trackId])
                        }
                        var i = new Uint8Array(84);
                        a.WriteInt24(i, 1, 3), a.WriteInt32(i, 4, 0), a.WriteInt32(i, 8, 0), a.WriteInt32(i, 12, t.trackId), a.WriteInt32(i, 20, e.getTrackDuration(t)), a.WriteInt16(i, 32, 0), a.WriteInt16(i, 34, 0), "audio" == t.streamType && a.WriteInt16(i, 36, 256);
                        a.WriteInt16(i, 38, 0), f(i, 40), "video" == t.streamType && (a.WriteInt16(i, 76, t.width), a.WriteInt16(i, 80, t.height));
                        return s("tkhd", i)
                    }(e, n),
                    o = function(e, t) {
                        var n = function(e, t) {
                                if (e.init && e.init.mdhd && e.init.mdhd[t.trackId]) {
                                    var n = e.init.mdhd[t.trackId];
                                    return a.WriteInt32(n, 12, t.timeScale), a.WriteInt32(n, 16, Math.round(t.secDuration * t.timeScale)), s("mdhd", n)
                                }
                                var r = new Uint8Array(24);
                                if (a.WriteInt32(r, 0, 0), a.WriteInt32(r, 4, 0), a.WriteInt32(r, 8, 0), "video" == t.streamType) {
                                    a.WriteInt32(r, 12, 9e4);
                                    var i = 90 * e.getTrackDuration(t);
                                    a.WriteInt32(r, 16, i)
                                } else {
                                    a.WriteInt32(r, 12, t.declaredSampleRate);
                                    var i = 1024 * t.sampleCount;
                                    a.WriteInt32(r, 16, i)
                                }
                                return a.WriteInt16(r, 20, 21956), a.WriteInt16(r, 22, 0), s("mdhd", r)
                            }(e, t),
                            i = function(e, t) {
                                if (e.init && e.init.hdlr && e.init.hdlr[t.trackId]) return s("hdlr", e.init.hdlr[t.trackId]);
                                var n = new Uint8Array(25 + "VideoHandler".length);
                                a.WriteInt32(n, 0, 0), "audio" == t.streamType && c("mhlr", n, 4);
                                "audio" == t.streamType ? c("soun", n, 8) : "video" == t.streamType && c("vide", n, 8);
                                return a.WriteInt32(n, 12, 0), a.WriteInt32(n, 16, 0), a.WriteInt32(n, 20, 0), c("VideoHandler", n, 24), s("hdlr", n)
                            }(e, t),
                            o = function(e, t) {
                                var n = "video" == t.streamType ? function(e, t) {
                                        if (e.init && e.init.vmhd && e.init.vmhd[t.trackId]) return s("vmhd", e.init.vmhd[t.trackId]);
                                        var n = new Uint8Array(12);
                                        return a.WriteInt32(n, 0, 1), a.WriteInt16(n, 4, 0), a.WriteInt16(n, 6, 0), a.WriteInt16(n, 8, 0), a.WriteInt16(n, 10, 0), s("vmhd", n)
                                    }(e, t) : [],
                                    i = "audio" == t.streamType ? function(e, t) {
                                        if (e.init && e.init.smhd && e.init.smhd[t.trackId]) return s("smhd", e.init.smhd[t.trackId]);
                                        var n = new Uint8Array(8);
                                        return a.WriteInt32(n, 0, 0), a.WriteInt16(n, 4, 0), a.WriteInt16(n, 6, 0), s("smhd", n)
                                    }(e, t) : [],
                                    o = function(e, t) {
                                        return e.init && e.init.dinf && e.init.dinf[t.trackId] ? s("dinf", e.init.dinf[t.trackId]) : s("dinf", function(e, t) {
                                            var n = new Uint8Array(8);
                                            a.WriteInt32(n, 0, 0), a.WriteInt32(n, 4, 1);
                                            var r = function(e, t) {
                                                var n = new Uint8Array(4);
                                                return a.WriteInt32(n, 0, 1), s("url ", n)
                                            }();
                                            return s("dref", [n, r])
                                        }())
                                    }(e, t),
                                    c = function(e, t) {
                                        var n = function(e, t) {
                                                if (e.init && e.init.stsd && e.init.stsd[t.trackId]) return s("stsd", e.init.stsd[t.trackId]);
                                                var n = new Uint8Array(8);
                                                a.WriteInt32(n, 0, 0), a.WriteInt32(n, 4, 1);
                                                var r = [];
                                                "audio" == t.streamType ? "mp4a" == t.codec.strTag && (r = function(e, t) {
                                                    var n = new Uint8Array(28);
                                                    a.WriteInt32(n, 0, 0), a.WriteInt32(n, 4, 1), a.WriteInt32(n, 8, 0), a.WriteInt32(n, 12, 0), a.WriteInt16(n, 16, 2), a.WriteInt16(n, 18, 16), a.WriteInt16(n, 20, 0), a.WriteInt16(n, 22, 0);
                                                    var r = e.mpd && e.mpd.sample_rate || t.declaredSampleRate || t.sampleRate || 48e3;
                                                    a.WriteInt16(n, 24, r), a.WriteInt16(n, 26, 0);
                                                    var i = function(e, t) {
                                                        var n = null;
                                                        if (void 0 !== t.mp4aProfile && void 0 !== t.mp4aRateIndex && void 0 !== t.mp4aChannelCount) {
                                                            var r = 0;
                                                            r |= t.mp4aProfile << 11, r |= t.mp4aRateIndex << 7, r |= t.mp4aChannelCount << 3, n = new Uint8Array(2), a.WriteInt16(n, 0, r)
                                                        }
                                                        var i = new Uint8Array(36 + (n ? n.length + 5 : 0));
                                                        a.WriteInt32(i, 0, 0), u(i, 4, 3, 27 + (n ? n.length + 5 : 0)), a.WriteInt16(i, 9, t.trackId), a.WriteInt8(i, 11, 0), u(i, 12, 4, 23), a.WriteInt8(i, 17, 64), a.WriteInt8(i, 18, 21), a.WriteInt24(i, 19, 0);
                                                        var o = 0;
                                                        if (t.sampleSizes)
                                                            if (Array.isArray(t.sampleSizes))
                                                                for (var c = 0; c < t.sampleSizes.length; c++) o += t.sampleSizes[c];
                                                            else
                                                                for (var c = 0; c < t.sampleSizes.length; c++) o += a.ReadInt32(t.sampleSizes.data, 4 * c);
                                                        else if (Array.isArray(t.dataSizes))
                                                            for (var c = 0; c < t.dataSizes.length; c++) o += t.dataSizes[c];
                                                        else
                                                            for (var l = 12; l < t.dataSizes.length; l += 4) o += a.ReadInt32(t.dataSizes.data, l);
                                                        var d = Math.round(8 * o / t.durationSec);
                                                        a.WriteInt32(i, 22, t.maxBitrate && Math.round(t.maxBitrate) || 2 * d), a.WriteInt32(i, 26, d), n ? (u(i, 30, 5, n.length), i.set(n, 35), u(i, 35 + n.length, 6, 1), a.WriteInt8(i, 40 + n.length, 2)) : (u(i, 30, 6, 1), a.WriteInt8(i, 35, 2));
                                                        return s("esds", i)
                                                    }(0, t);
                                                    return s("mp4a", [n, i])
                                                }(e, t)) : "video" == t.streamType && "avc1" == t.codec.strTag && (r = function(e, t) {
                                                    var n = new Uint8Array(78);
                                                    a.WriteInt32(n, 0, 0), a.WriteInt16(n, 4, 0), a.WriteInt16(n, 6, 1), a.WriteInt16(n, 8, 0), a.WriteInt16(n, 10, 0), a.WriteInt32(n, 12, 0), a.WriteInt32(n, 16, 0), a.WriteInt32(n, 20, 0), a.WriteInt16(n, 24, t.width), a.WriteInt16(n, 26, t.height), a.WriteInt32(n, 28, 4718592), a.WriteInt32(n, 32, 4718592), a.WriteInt32(n, 36, 0), a.WriteInt16(n, 40, 1), a.WriteInt16(n, 74, 24), a.WriteInt16(n, 76, 65535);
                                                    var r = function(e, t) {
                                                        if (!t.sps || !t.pps) return [];
                                                        var n = new Uint8Array(t.sps),
                                                            r = new Uint8Array(t.pps),
                                                            i = new Uint8Array(11 + n.length + r.length);
                                                        a.WriteInt8(i, 0, 1), a.WriteInt8(i, 1, n[1]), a.WriteInt8(i, 2, n[2]), a.WriteInt8(i, 3, n[3]), a.WriteInt8(i, 4, 255), a.WriteInt8(i, 5, 225), a.WriteInt16(i, 6, n.length), i.set(n, 8);
                                                        var o = 8 + n.length;
                                                        return a.WriteInt8(i, o, 1), a.WriteInt16(i, o + 1, r.length), i.set(r, o + 3), s("avcC", i)
                                                    }(0, t);
                                                    return s("avc1", [n, r])
                                                }(0, t));
                                                return s("stsd", [n, r])
                                            }(e, t),
                                            i = function(e, t) {
                                                if (t.sampleSizes) {
                                                    var n, r, i = !0;
                                                    if (Array.isArray(t.sampleSizes)) {
                                                        n = t.sampleSizes[0];
                                                        for (var o = 1; o < t.sampleSizes.length; o++)
                                                            if (t.sampleSizes[o] != n) {
                                                                i = !1;
                                                                break
                                                            }
                                                    } else {
                                                        n = a.ReadInt32(t.sampleSizes.data, 0);
                                                        for (var o = 1; o < t.sampleSizes.length; o++)
                                                            if (a.ReadInt32(t.sampleSizes.data, 4 * o) != n) {
                                                                i = !1;
                                                                break
                                                            }
                                                    }
                                                    if (i) r = new Uint8Array(12), a.WriteInt32(r, 4, n);
                                                    else if (r = new Uint8Array(12 + 4 * t.sampleSizes.length), Array.isArray(t.sampleSizes))
                                                        for (var o = 0; o < t.sampleSizes.length; o++) a.WriteInt32(r, 12 + 4 * o, t.sampleSizes[o]);
                                                    else r.set(t.sampleSizes.data.subarray(0, 4 * t.sampleSizes.length), 12);
                                                    return a.WriteInt32(r, 8, t.sampleSizes.length), s("stsz", r)
                                                }
                                                var u = new Uint8Array(4 * t.dataSizes.length + 12);
                                                if (a.WriteInt32(u, 4, 0), a.WriteInt32(u, 8, t.dataSizes.length), Array.isArray(t.dataSizes))
                                                    for (var o = 0; o < t.dataSizes.length; o++) a.WriteInt32(u, 12 + 4 * o, t.dataSizes[o]);
                                                else u.set(t.dataSizes.data.subarray(0, 4 * t.dataSizes.length), 12);
                                                return s("stsz", u)
                                            }(0, t),
                                            o = function(e, t) {
                                                if (t.stts) {
                                                    var n = new Uint8Array(8 + 8 * t.stts.length);
                                                    a.WriteInt32(n, 0, 0), a.WriteInt32(n, 4, t.stts.length);
                                                    for (var r = 0; r < t.stts.length; r++) {
                                                        var i = t.stts[r];
                                                        a.WriteInt32(n, 8 + 8 * r, i.c), a.WriteInt32(n, 8 + 8 * r + 4, i.d)
                                                    }
                                                    return s("stts", n)
                                                }
                                                for (var o = [], u = Array.isArray(t.dataTimestamps) ? t.dataTimestamps.length : t.dataTimestamps.length / 2, r = 0; r < u;) {
                                                    var c = 0,
                                                        l = 1;
                                                    if (Array.isArray(t.dataTimestamps))
                                                        for (; r + l < u && t.dataTimestamps[r + l] <= t.dataTimestamps[r]; l++);
                                                    else
                                                        for (; r + l < u && a.ReadInt64(t.dataTimestamps.data, 8 * (r + l)) <= a.ReadInt64(t.dataTimestamps.data, 8 * r); l++);
                                                    r + l < u && (c = Array.isArray(t.dataTimestamps) ? (t.dataTimestamps[r + l] - t.dataTimestamps[r]) / l : (a.ReadInt64(t.dataTimestamps.data, 8 * (r + l)) - a.ReadInt64(t.dataTimestamps.data, 8 * r)) / l, t.declaredSampleRate && (c = Math.round(c * t.declaredSampleRate / 9e4))), r += l, !c || 0 != o.length && o[o.length - 1].duration == c ? o.length > 0 && (o[o.length - 1].count += l) : o.push({
                                                        duration: c,
                                                        count: l
                                                    })
                                                }
                                                var n = new Uint8Array(8 + 8 * o.length);
                                                a.WriteInt32(n, 0, 0), a.WriteInt32(n, 4, o.length);
                                                for (var r = 0; r < o.length; r++) a.WriteInt32(n, 8 + 8 * r, o[r].count), a.WriteInt32(n, 12 + 8 * r, o[r].duration);
                                                return s("stts", n)
                                            }(0, t),
                                            c = "video" == t.streamType ? function(e, t) {
                                                var n = new Uint8Array(8 + 4 * t.keyFrames.length);
                                                if (a.WriteInt32(n, 0, 0), a.WriteInt32(n, 4, t.keyFrames.length), Array.isArray(t.keyFrames))
                                                    for (var r = 0; r < t.keyFrames.length; r++) a.WriteInt32(n, 8 + 4 * r, t.keyFrames[r]);
                                                else n.set(t.keyFrames.data.subarray(0, 4 * t.keyFrames.length), 8);
                                                return s("stss", n)
                                            }(0, t) : [],
                                            l = function(e, t) {
                                                if (t.stsc) {
                                                    var n;
                                                    if ("object" == r(t.stsc[0])) {
                                                        n = t.stsc.length, u = new Uint8Array(8 + 12 * n), a.WriteInt32(u, 0, 0), a.WriteInt32(u, 4, n);
                                                        for (var i = 0; i < t.stsc.length; i++) {
                                                            var o = t.stsc[i];
                                                            a.WriteInt32(u, 8 + 12 * i, o.first_chunk + 1), a.WriteInt32(u, 8 + 12 * i + 4, o.samples_per_chunk), a.WriteInt32(u, 8 + 12 * i + 8, o.sample_description_index + 1)
                                                        }
                                                    } else {
                                                        n = t.stsc.length / 3, u = new Uint8Array(8 + 12 * n), a.WriteInt32(u, 0, 0), a.WriteInt32(u, 4, n);
                                                        for (var i = 0; i < t.stsc.length; i++) a.WriteInt32(u, 8 + 12 * i, t.stsc[3 * i]), a.WriteInt32(u, 8 + 12 * i + 4, t.stsc[3 * i + 1]), a.WriteInt32(u, 8 + 12 * i + 8, t.stsc[3 * i + 2])
                                                    }
                                                    return s("stsc", u)
                                                }
                                                var u = new Uint8Array(20);
                                                return a.WriteInt32(u, 0, 0), a.WriteInt32(u, 4, 1), a.WriteInt32(u, 8, 1), a.WriteInt32(u, 12, 1), a.WriteInt32(u, 16, 1), s("stsc", u)
                                            }(0, t),
                                            d = e.multiMdat ? function(e, t) {
                                                var n = "object" == r(t.dataOffsets[0]) ? t.dataOffsets.length : t.dataOffsets.length / 2,
                                                    i = new Uint8Array(8 + 8 * n);
                                                a.WriteInt32(i, 0, 0), a.WriteInt32(i, 4, n);
                                                for (var o = 0; o < n; o++) {
                                                    var u, c = (u = "object" == r(t.dataOffsets[o]) ? t.dataOffsets[o] : {
                                                        b: t.dataOffsets[2 * o],
                                                        o: t.dataOffsets[2 * o + 1]
                                                    }).o + e.mdatOffsets[u.b];
                                                    a.WriteInt32(i, 8 + 8 * o, Math.floor(c / 4294967296)), a.WriteInt32(i, 12 + 8 * o, 4294967295 & c)
                                                }
                                                return s("co64", i)
                                            }(e, t) : function(e, t) {
                                                var n = "object" == r(t.dataOffsets[0]) ? t.dataOffsets.length : t.dataOffsets.length / 2,
                                                    i = new Uint8Array(8 + 4 * n);
                                                a.WriteInt32(i, 0, 0), a.WriteInt32(i, 4, n);
                                                for (var o = 0; o < n; o++) {
                                                    var u, c = (u = "object" == r(t.dataOffsets[o]) ? t.dataOffsets[o] : {
                                                        b: t.dataOffsets[2 * o],
                                                        o: t.dataOffsets[2 * o + 1]
                                                    }).o + e.mdatOffsets[u.b];
                                                    a.WriteInt32(i, 8 + 4 * o, c)
                                                }
                                                return s("stco", i)
                                            }(e, t);
                                        return s("stbl", [n, o, c, l, i, d])
                                    }(e, t);
                                return s("minf", [n, i, o, c])
                            }(e, t);
                        return s("mdia", [n, i, o])
                    }(e, n),
                    l = function(e, t) {
                        var n = e.init && e.init.edts && e.init.edts[t.trackId];
                        if (n) {
                            var r = g("elst", n);
                            if (r.length > 0) {
                                var i = a.ReadInt32(r[0].data, 12);
                                a.WriteInt32(r[0].data, 8, Math.round(1e3 * t.secDuration) - i)
                            }
                            return s("edts", n)
                        }
                        return t.shiftTs ? s("edts", function(e, t) {
                            var n = new Uint8Array(20);
                            return a.WriteInt32(n, 0, 0), a.WriteInt32(n, 4, 1), a.WriteInt32(n, 8, e.getTrackDuration(t)), a.WriteInt32(n, 12, t.shiftTs), a.WriteInt16(n, 16, 1), a.WriteInt16(n, 18, 0), s("elst", n)
                        }(e, t)) : []
                    }(e, n),
                    d = s("trak", [i, l, o]);
                t.push(d)
            });
            var l = function(e) {
                    if (e.init && e.init.mvhd) {
                        var t = e.init.mvhd;
                        return a.WriteInt32(t, 12, 1e3), a.WriteInt32(t, 16, Math.round(1e3 * e.secDuration)), s("mvhd", e.init.mvhd)
                    }
                    var n = new Uint8Array(100);
                    return a.WriteInt8(n, 0, 0), a.WriteInt24(n, 1, 0), a.WriteInt32(n, 4, 0), a.WriteInt32(n, 8, 0), a.WriteInt32(n, 12, 1e3), a.WriteInt32(n, 16, e.getTotalDuration()), a.WriteInt32(n, 20, 65536), a.WriteInt16(n, 24, 256), f(n, 36), a.WriteInt32(n, 72, 0), a.WriteInt32(n, 76, 0), a.WriteInt32(n, 80, 0), a.WriteInt32(n, 84, 0), a.WriteInt32(n, 88, 0), a.WriteInt32(n, 92, 0), a.WriteInt32(n, 96, e.getNextTrackId()), s("mvhd", n)
                }(e),
                m = function(e) {
                    if (e.init && e.init.iods && e.init.iods) return s("iods", e.init.iods);
                    var t = new Uint8Array(16);
                    return a.WriteInt32(t, 0, 0), a.WriteInt8(t, 4, 16), a.WriteInt32(t, 5, 2155905031), a.WriteInt16(t, 9, 79), a.WriteInt16(t, 11, 65535), a.WriteInt16(t, 13, 65278), a.WriteInt8(t, 15, 255), s("iods", t)
                }(e),
                v = s("moov", [l, m, t]),
                y = i,
                b = {
                    write: !0,
                    append: !1
                };
            e.masked && (y = o, b.iv = e.biniv, b.key = e.cryptoKey), y.File.open(e.downloadTarget + ".part", b).then(function(e) {
                e.setPosition(0, i.File.POS_END).then(function() {
                    p(e, v, function(t) {
                        e.close().catch(function() {}).then(function() {
                            return new Promise(function(e, t) {
                                setTimeout(e, 250)
                            })
                        }).then(function() {
                            t ? d(t) : h()
                        })
                    })
                }, function(e) {
                    d(e)
                })
            }, function(e) {
                d(e)
            })
        }
        e.rawAppendData ? h(!0) : e.currentDataBlockSize > 0 ? t.updateMdatLength(e, e.mdatLengthOffset, e.currentDataBlockSize, function(e) {
            if (e) return d(e);
            m()
        }) : m()
    }, t.mdatBox = function() {
        return s("mdat", [])
    };
    n(1);
    var i = n(96),
        a = n(16),
        o = n(116);

    function s(e, t) {
        var n = l(t),
            r = new Uint8Array(4);
        return a.WriteInt32(r, 0, 8 + n), [r, c(e = (e + "    ").substr(0, 4)), t]
    }

    function u(e, t, n, r) {
        var i = 3;
        for (a.WriteInt8(e, t++, n); i > 0; i--) a.WriteInt8(e, t++, (r >>> 7 * i | 128) >>> 0);
        a.WriteInt8(e, t++, 127 & r)
    }

    function c(e, t, n) {
        t = t || new Uint8Array(e.length), n = n || 0;
        for (var r = 0, i = e.length; r < i; r++) t[n + r] = 255 & e.charCodeAt(r);
        return t
    }

    function l(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = 0, r = e.length; n < r; n++) t += l(e[n]);
            return t
        }
        return e.length
    }

    function d(e) {
        if (Array.isArray(e)) {
            var t = new Uint8Array(l(e)),
                n = 0;
            return function e(r) {
                if (Array.isArray(r))
                    for (var i = 0, a = r.length; i < a; i++) e(r[i]);
                else t.set(r, n), n += r.length
            }(e), t
        }
        return e
    }

    function f(e, t) {
        [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824].forEach(function(n, r) {
            a.WriteInt32(e, t + 4 * r, n)
        })
    }

    function p(e, t, n) {
        Date.now(), (t = d(t)).length;
        e.write(t).then(function() {
            n(null)
        }, function(e) {
            n(e)
        })
    }
    t.length = l, t.flatten = d, t.firstBuffer = function e(t) {
        return Array.isArray(t) ? 0 == t.length ? null : e(t[0]) : t
    };

    function h(e, t) {
        t = t || e.length;
        for (var n = 0, r = [];;) {
            if (0 == t) return r;
            if (t < 8) return null;
            var i = a.ReadInt32(e, n),
                o = 8;
            if (1 == i && (i = a.ReadInt64(e, n + 8), o = 16), i > t || i < 8) return null;
            var s = String.fromCharCode(a.ReadInt8(e, n + 4), a.ReadInt8(e, n + 5), a.ReadInt8(e, n + 6), a.ReadInt8(e, n + 7));
            r.push({
                name: s,
                offset: n,
                length: i,
                dataOffset: n + o,
                dataLength: i - o,
                data: e.subarray(n + o, n + i)
            }), n += i, t -= i
        }
    }

    function g(e, t, n) {
        var r = [],
            i = h(t, n);
        if (!i) return r;
        for (var a = 0, o = i.length; a < o; a++) {
            var s = i[a];
            s.name == e && r.push(s)
        }
        return r
    }
    t.writeMulti = p, t.writeFileHeader = function(e, t) {
        var n;
        if (e.init && e.init.ftyp) n = s("ftyp", e.init.ftyp);
        else {
            var r = new Uint8Array(4);
            a.WriteInt32(r, 0, 512), n = s("ftyp", [c("isom"), r, c("isomiso2avc1mp41")])
        }
        var u = s("free", []);
        e.fileSize = e.lastDataIndex = l(n) + l(u);
        var d = i,
            f = {
                write: !0,
                append: !1,
                truncate: !0
            };
        e.masked && (d = o, f.iv = e.biniv, f.key = e.cryptoKey), d.File.open(e.downloadTarget + ".part", f, {
            unixMode: 420
        }).then(function(e) {
            p(e, [n, u], function(n) {
                e.close().catch(function() {}).then(function() {
                    t(n || null)
                })
            })
        }, function(e) {
            t(e)
        })
    }, t.updateMdatLength = function(e, t, n, r) {
        var s = i,
            u = {
                write: !0,
                append: !1
            };
        e.masked && (s = o, u.iv = e.biniv, u.key = e.cryptoKey), s.File.open(e.downloadTarget + ".part", u).then(function(e) {
            e.setPosition(t, i.File.POS_START).then(function() {
                var t = new Uint8Array(4);
                a.WriteInt32(t, 0, n + 8), e.write(t).then(function() {
                    e.close().catch(function() {}).then(function() {
                        r(null)
                    })
                }, function(t) {
                    e.close().catch(function() {}).then(function() {
                        r(t)
                    })
                })
            }, function(t) {
                e.close().catch(function() {}).then(function() {
                    r(t)
                })
            })
        }, function(e) {
            r(e)
        })
    };
    t.parse = h, t.getTags = g
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    t.matchHit = function(e) {
        return ![e.url, e.audioUrl, e.videoUrl, e.pageUrl, e.topUrl].every(function(e) {
            return !m.test(e) && !w.test(e)
        })
    }, t.forbidden = function() {
        p.alert({
            title: i._("chrome_warning_yt"),
            text: [i._("chrome_noyt_text"), i._("chrome_noyt_text2")],
            height: 400,
            buttons: [{
                text: i._("chrome_install_firefox"),
                className: "btn-outline-secondary",
                close: !0,
                trigger: {
                    what: "installFirefox"
                }
            }, {
                text: i._("chrome_install_fx_vdh"),
                className: "btn-outline-primary",
                close: !0,
                trigger: {
                    what: "vdhForFirefox"
                }
            }]
        }).then(function(e) {
            switch (e.what) {
                case "installFirefox":
                    return c.gotoOrOpenTab("https://getfirefox.com/");
                case "vdhForFirefox":
                    return c.gotoOrOpenTab("https://addons.mozilla.org/firefox/addon/video-downloadhelper/")
            }
        }).catch(function(e) {})
    }, t.getVideoMeta = function(e) {
        return I({
            videoId: e,
            baseUrl: "https://www.youtube.com",
            decodeOnly: !0
        })
    }, t.networkHook = function(e, t) {
        t && (x = t.proxyInfo || null);
        if (!w.test(e)) return null;
        var n = y.exec(e);
        if (!n) return null;
        var r = n[1];
        if (!(n = b.exec(e))) return null;
        var i = n[1],
            a = k[i];
        if (!a) {
            var o = s.hasAudioVideo("tbvws:" + r);
            a = k[i] = {
                variants: {},
                audio: o.audio,
                video: o.video,
                expire: Date.now() + 6e4
            }
        }
        return a.variants[r] ? null : Promise.resolve(new A({
            id: i,
            itag: r,
            url: e,
            video: a
        }))
    }, t.dashManifest = function(e, t, n) {
        if (!n.referrer) return null;
        var r = v.exec(n.referrer);
        if (!r) return null;
        for (var a = r[1], u = (new DOMParser).parseFromString(t, "application/xml").querySelectorAll("AdaptationSet"), c = {}, l = 0, d = [], f = 0; f < u.length; f++) {
            for (var p = u[f], h = p.getAttribute("mimeType"), g = p.querySelectorAll(":scope > SegmentList > SegmentTimeline > S"), m = 0, y = 0; y < g.length; y++) m += parseInt(g[y].getAttribute("d")) / 1e3;
            l < m && (l = m);
            for (var b = p.querySelectorAll("Representation"), y = 0; y < b.length; y++) {
                var w = b[y],
                    k = w.getAttribute("id"),
                    x = {
                        itag: k,
                        type: h,
                        bandwidth: w.getAttribute("bandwidth"),
                        audioSamplingRate: w.getAttribute("audioSamplingRate")
                    };
                h.startsWith("audio") ? x.audioCodec = w.getAttribute("codecs") : (x.videoCodec = w.getAttribute("codecs"), x.size = w.getAttribute("width") + "x" + w.getAttribute("height"), x.fps = w.getAttribute("frameRate")), d.push(x);
                var A = w.querySelector("BaseURL");
                x.url = A.firstChild.nodeValue;
                var _ = w.querySelector("SegmentList"),
                    I = [];
                c[x.url] = {
                    base_url: x.url,
                    init_segment_url: _.querySelector("Initialization").getAttribute("sourceURL"),
                    segments: I
                };
                for (var O = _.querySelectorAll("SegmentURL"), P = 0; P < O.length; P++) {
                    var C = O[P];
                    I.push({
                        url: C.getAttribute("media")
                    })
                }
            }
        }
        return function(e) {
            var t = s.getHitsFromVariants({
                videoId: a,
                originalId: e.id,
                title: e.title,
                topUrl: e.topUrl,
                pageUrl: e.pageUrl,
                from: "tbvws",
                group: "grp-" + a,
                isPrivate: e.isPrivate,
                extension: "mp4",
                referrer: e.referrer,
                thumbnailUrl: e.thumbnailUrl,
                chunked: "dash-adp",
                duration: Math.round(l),
                descrPrefix: i._("dash_streaming"),
                headers: e.headers,
                proxy: e.proxy,
                possibleContentRedirect: !0
            }, d);
            t.forEach(function(e) {
                e.audioMpd = c[e.audioUrl], e.videoMpd = c[e.videoUrl], e.audioMpd && e.videoMpd && o.dispatch("hit.new", e)
            })
        }
    };
    var i = n(1),
        a = i.browser,
        o = n(12),
        s = n(238),
        u = n(5),
        c = n(40),
        l = (n(60), n(63)),
        d = n(39),
        f = n(27),
        p = n(115),
        h = n(267),
        g = new RegExp("^(.*?)=(.*)$"),
        m = (new RegExp("^([^/;]+)/(?:x-)?([^/;]+)"), new RegExp("^https?://([^/]*\\.)?youtube(\\.co)?.([^./]+)/.*")),
        v = new RegExp("\\?.*\\bv=([^&]*)"),
        y = (new RegExp("[?&]signature="), new RegExp("[?&]itag=([^&]+)")),
        b = new RegExp("[?&]id=([^&]+)"),
        w = new RegExp("^https?://([^/]*.)?googlevideo\\."),
        k = {},
        x = null,
        A = function() {
            function e(t) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.data = t
            }
            return r(e, [{
                key: "handleHit",
                value: function(e) {
                    ! function(e, t) {
                        var n = e.url,
                            r = e.id,
                            a = e.itag,
                            u = e.video,
                            c = /^.*?\?(.*)$/.exec(n);
                        if (!c) return null;
                        var l = {};
                        c[1].split("&").forEach(function(e) {
                            var t = /^(.*?)=(.*)$/.exec(e);
                            t && (l[t[1]] = t[2])
                        }), u.variants[a] = {
                            url: n.replace(/(\?|&)range=[0-9]+\-[0-9]+&?/, "$1"),
                            itag: a,
                            type: decodeURIComponent(l.mime),
                            clen: l.clen
                        }, /^audio/.test(l.mime) && (u.audio = !0);
                        /^video/.test(l.mime) && (u.video = !0);
                        if (!u.audio || !u.video) return;
                        var d = [];
                        for (var f in u.variants) d.push(u.variants[f]);
                        var p = s.getHitsFromVariants({
                            title: t.title,
                            from: "tbvws",
                            videoId: r,
                            topUrl: t.topUrl,
                            pageUrl: t.pageUrl,
                            originalId: t.originalId,
                            thumbnailUrl: t.thumbnailUrl,
                            duration: l.dur ? Math.round(l.dur) : void 0,
                            group: "grp-" + r,
                            headers: t.headers,
                            proxy: t.proxy,
                            possibleContentRedirect: !0
                        }, d, {
                            audioAndVideo: !0,
                            keepProtected: !0
                        });
                        if (p.length > 0 && i.prefs.bulkEnabled && h.handle(p[0])) return;
                        C(t.tabId, t.frameId, t.originalId), p.forEach(function(e) {
                            e._priorityClass = e.adp ? -1 : 1, o.dispatch("hit.new", e)
                        })
                    }(this.data, e)
                }
            }]), e
        }();

    function I(e, t) {
        return new Promise(function(n, r) {
            var c = {
                referer: e.baseUrl + "/results?search_query=" + encodeURIComponent(e.id)
            };

            function l(i) {
                var u = !1;
                if (Array.isArray(i) && i.forEach(function(e) {
                        try {
                            u = u || e.data && e.data.swfcfg && !!e.data.swfcfg.args
                        } catch (e) {}
                    }), u) try {
                        n(function(e, t) {
                            var n = null;
                            if (t.forEach(function(e) {
                                    if (!n) try {
                                        n = e.data && e.data.swfcfg && e.data.swfcfg.args
                                    } catch (e) {}
                                }), !n) return null;
                            var r = null;
                            t.forEach(function(e) {
                                r = e.title || r
                            });
                            var i = [],
                                a = {
                                    videoId: e.videoId,
                                    title: n.title || r || e.title || _("video"),
                                    topUrl: e.topUrl,
                                    pageUrl: e.pageUrl,
                                    thumbnailUrl: e.thumbnailUrl,
                                    from: "tbvws",
                                    maxVariants: e.maxVariants,
                                    autoExec: e.autoExec,
                                    isPrivate: e.isPrivate,
                                    group: "grp-" + e.videoId,
                                    headers: e.headers,
                                    proxy: e.proxy,
                                    possibleContentRedirect: !0
                                };
                            if (n.thumbnail_url && (a.thumbnail = n.thumbnail_url), n.pageUrl && (a.pageUrl = n.pageUrl), e.decodeOnly) return a;
                            if (n.player_response) try {
                                var u = JSON.parse(n.player_response),
                                    c = u.streamingData;
                                if (c && ["adaptiveFormats", "formats"].forEach(function(e) {
                                        var t = c[e];
                                        Array.isArray(t) && t.forEach(function(e) {
                                            e.url && i.push(e)
                                        })
                                    }), u.videoDetails && u.videoDetails.thumbnail && u.videoDetails.thumbnail.thumbnails) {
                                    var l = u.videoDetails.thumbnail.thumbnails;
                                    if (Array.isArray(l) && l.length > 0) {
                                        var d = l[l.length - 1];
                                        d.url && (a.thumbnailUrl = d.url)
                                    }
                                }
                            } catch (e) {} ["url_encoded_fmt_stream_map", "adaptive_fmts"].forEach(function(e) {
                                n[e] && n[e].split(",").forEach(function(e) {
                                    var t = {};
                                    e.split("&").forEach(function(e) {
                                        var n = g.exec(e);
                                        n && (t[decodeURIComponent(n[1])] = decodeURIComponent(n[2]))
                                    }), t.url && i.push(t)
                                })
                            }), s.getHitsFromVariants(a, i).forEach(function(e) {
                                o.dispatch("hit.new", e)
                            })
                        }(e, i))
                    } catch (e) {
                        r(e)
                    } else if (t) 1 == t ? I(e, 2).then(n, r) : r(new Error("failed retrieving meta data"));
                    else {
                        var c = {
                            SID: 1,
                            SSID: 1,
                            LOGIN_INFO: 1
                        };
                        a.cookies.getAll({
                            url: e.baseUrl
                        }).then(function(t) {
                            t.forEach(function(e) {
                                e.name in c && t.push(e.name + "=" + e.value)
                            }), e.cookie = t.join("; "), I(e, 1).then(n, r)
                        }, r)
                    }
            }
            e.cookie && (c.cookie = e.cookie);
            var d = e.baseUrl + "/watch?v=" + e.videoId + "&spf=navigate";
            i.prefs.chunkedCoappManifestsRequests || f.isProbablyAvailable() ? f.request(d, {
                headers: c && Object.keys(c).map(function(e) {
                    return {
                        name: e,
                        value: c[e]
                    }
                }) || [],
                proxy: i.prefs.coappUseProxy && x || null
            }).then(function(e) {
                try {
                    l(JSON.parse(e))
                } catch (e) {
                    return r(new Error("could not parse response meta-data"))
                }
            }).catch(function(e) {
                r(e)
            }) : u.request({
                url: d,
                onComplete: function(e) {
                    if (!e.json) return r(new Error("no response meta-data"));
                    l(e.json)
                },
                headers: c,
                anonymous: !!t
            })
        })
    }
    var O = !1;

    function P(e) {
        C(e.tabId, e.frameId, null, 0)
    }

    function C(e, t, n, r) {
        void 0 === r && (r = i.prefs.tbvwsGrabDelay);
        var o = 3;
        ! function i() {
            a.tabs.sendMessage(e, {
                type: "DelayedGetInfo",
                delay: r,
                hitId: n
            }, {
                frameId: t
            }).catch(function(e) {
                --o >= 0 && setTimeout(i, 100)
            })
        }()
    }

    function S(e) {
        C(e.tabId, e.frameId, null)
    }

    function E(e) {
        var t = ["var _$vdhData = " + JSON.stringify({
            tabId: e.tabId
        }) + ";", "var _$vdhSmartNameSpecs = " + JSON.stringify(l.getSpecs(e.url)) + ";"];
        if (a.tabs.executeScript(e.tabId, {
                code: t.join("\n"),
                frameId: e.frameId
            }).then(function() {
                return a.tabs.executeScript(e.tabId, {
                    file: "/content/tbvws-script.js",
                    frameId: e.frameId
                })
            }).catch(function(e) {}), i.prefs.bulkEnabled) return a.tabs.executeScript(e.tabId, {
            file: "/content/tbvws-bulk-script.js",
            frameId: e.frameId,
            runAt: "document_start"
        }).catch(function(e) {})
    }

    function j() {
        var e = i.prefs.tbvwsEnabled;
        e && !O ? (O = !0, a.webNavigation.onDOMContentLoaded.addListener(P, {
            url: [{
                urlMatches: m.source
            }]
        }), a.webNavigation.onHistoryStateUpdated.addListener(S, {
            url: [{
                urlMatches: m.source
            }]
        }), a.webNavigation.onCommitted.addListener(E, {
            url: [{
                urlMatches: m.source
            }]
        })) : !e && O && (a.webNavigation.onDOMContentLoaded.removeListener(P), a.webNavigation.onCommitted.removeListener(E), O = !1)
    }
    j(), i.prefs.on("tbvwsEnabled", j);
    if (setInterval(function() {
            var e = Date.now();
            for (var t in k) e > k[t].expire && delete k[t]
        }, 6e4), i.rpc.listen({
            tbvwsDetectedVideo: function(e) {
                i.prefs.bulkEnabled && !h.isBulkDetector(e.pageUrl) && e.hasVideo && (e.hitId ? d.updateOriginal(e.hitId, {
                    title: e.title,
                    pageUrl: e.pageUrl,
                    topUrl: e.topUrl
                }) : a.tabs.get(e.tabId).then(function(t) {
                    if (t) {
                        e.topUrl = t.url, e.isPrivate = t.incognito;
                        var n = null,
                            r = o.getHits(),
                            i = new URL(e.pageUrl).host;
                        Object.keys(r).every(function(e) {
                            var t = r[e];
                            if (t.pageUrl && new URL(t.pageUrl).host === i) return n = t, !1;
                            return !0
                        }), n && (e.headers = n.headers, e.proxy = n.proxy), I(e)
                    }
                }))
            }
        }), a.proxy) {
        var T = function() {
            a.proxy.settings.get({}, function(e) {
                if (e.value) {
                    var t, n, r = null;
                    switch (e.value.mode) {
                        case "fixed_servers":
                            Object.keys(e.value.rules || {}).forEach(function(i) {
                                var a = e.value.rules[i];
                                "https" == a.scheme ? (r = a.host, t = a.port || 443, n = "https") : r || "http" != a.scheme || (r = a.host, t = a.port || 80, n = "http")
                            })
                    }
                    x = r && {
                        host: r,
                        port: t,
                        type: n
                    } || null
                }
            })
        };
        T(), setInterval(T, 2e4)
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.set = function(e) {
        a = e, o()
    }, t.defineInPage = function() {
        var e = "smartname-page-" + Math.round(1e9 * Math.random());
        i.tabs.executeScript({
            code: 'var _wehPanelName = "' + e + '";'
        }).then(function() {
            i.tabs.executeScript({
                file: "/content/smartname-script.js"
            })
        })
    }, t.getSpecs = function(e) {
        for (var t = new URL(e).hostname.split("."), n = 0; n < t.length - 1; n++) {
            var r = a[t.slice(n).join(".")];
            if (r) return r
        }
        return null
    }, t.getFilenameFromTitle = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = {
                keep: " ",
                remove: "",
                hyphen: "-",
                underscore: "_"
            };
        t && (t = (t = t.replace(s, "")).replace(u, n[r.prefs.smartnamerFnameSpaces]));
        e = (e = e.replace(s, "")).replace(u, n[r.prefs.smartnamerFnameSpaces]);
        var i = r.prefs.smartnamerFnameMaxlen;
        if (t) return e.length + t.length + 1 > i && (e = e.substr(0, i - t.length - 1)), e + "." + t;
        e.length > i && (e = e.substr(0, i));
        return e
    };
    var r = n(1),
        i = r.browser,
        a = {};

    function o() {
        i.storage.local.set({
            smartname: a
        }).catch(function(e) {
            console.error("Cannot write smartname storage")
        })
    }
    i.storage.local.get({
        smartname: {}
    }).then(function(e) {
        a = e.smartname
    }).catch(function(e) {
        console.error("Cannot read smartname storage")
    });
    var s = new RegExp('[/?<>\\:*|":]|[\0--]|\\\\', "g"),
        u = new RegExp(" +", "g");
    new RegExp("\\.", "g");
    r.rpc.listen({
        openSmartNameDefiner: function() {
            return r.ui.open("smartname-definer", {
                url: "content/smartname-define.html",
                type: "panel",
                width: 600,
                height: 400
            })
        },
        closeSmartNameDefiner: function() {
            return r.ui.close("smartname-definer")
        },
        setSmartNameData: function(e) {
            return r.rpc.call("smartname-definer", "setData", e)
        },
        evaluateSmartName: function(e, t) {
            return r.rpc.call(e, "evaluate", t)
        },
        addSmartNameRule: function(e) {
            a[e.domain] = e, o()
        },
        selectSmartNameXPath: function(e, t) {
            return r.rpc.call(e, "select", t)
        },
        setSmartName: function(e) {
            a = {}, o()
        },
        getSmartNameRules: function() {
            return a
        },
        editSmartName: function() {
            r.ui.open("smartname-edit", {
                type: "tab",
                url: "content/smartname-edit.html"
            })
        },
        removeFromSmartName: function(e) {
            delete a[e], o()
        }
    })
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    var r = Array.prototype.slice,
        i = n(98),
        a = n(99),
        o = e.exports = function(e, t, n) {
            return n || (n = {}), e === t || (e instanceof Date && t instanceof Date ? e.getTime() === t.getTime() : !e || !t || "object" != typeof e && "object" != typeof t ? n.strict ? e === t : e == t : function(e, t, n) {
                var c, l;
                if (s(e) || s(t)) return !1;
                if (e.prototype !== t.prototype) return !1;
                if (a(e)) return !!a(t) && (e = r.call(e), t = r.call(t), o(e, t, n));
                if (u(e)) {
                    if (!u(t)) return !1;
                    if (e.length !== t.length) return !1;
                    for (c = 0; c < e.length; c++)
                        if (e[c] !== t[c]) return !1;
                    return !0
                }
                try {
                    var d = i(e),
                        f = i(t)
                } catch (e) {
                    return !1
                }
                if (d.length != f.length) return !1;
                for (d.sort(), f.sort(), c = d.length - 1; c >= 0; c--)
                    if (d[c] != f[c]) return !1;
                for (c = d.length - 1; c >= 0; c--)
                    if (l = d[c], !o(e[l], t[l], n)) return !1;
                return typeof e == typeof t
            }(e, t, n))
        };

    function s(e) {
        return null === e || void 0 === e
    }

    function u(e) {
        return !(!e || "object" != typeof e || "number" != typeof e.length) && ("function" == typeof e.copy && "function" == typeof e.slice && !(e.length > 0 && "number" != typeof e[0]))
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.reducer = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
        switch (t.type) {
            case "log.new":
                e = e.concat([Object.assign({
                    key: ++o
                }, t.payload)]);
                break;
            case "log.clear":
                e = []
        }
        return e
    }, t.error = function(e) {
        s(e, "error")
    }, t.log = s, t.clear = u, t.logDetails = c, t.getEntry = l;
    var r = n(1),
        i = r.browser,
        a = n(12),
        o = 0;

    function s(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "log";
        if (e instanceof Error) {
            var n = "";
            e.fileName && e.lineNumber && ((n = e.fileName + ":" + e.lineNumber).columnNumber && (n += ":" + e.columnNumber), n += "\n"), e.stack && (n += e.stack), e = {
                message: e.message,
                details: e.details || n || void 0,
                videoTitle: e.videoTitle || void 0
            }
        } else e = "string" == typeof e ? {
            message: e
        } : {
            message: e.message || "" + e,
            details: e.details || void 0
        };
        a.dispatch("log.new", Object.assign(e, {
            type: t
        }))
    }

    function u() {
        a.dispatch("log.clear")
    }

    function c(e) {
        r.rpc.call("main", "embed", i.extension.getURL("content/logdetails-embed.html?panel=logdetails#" + encodeURIComponent(e)))
    }

    function l(e) {
        var t = null;
        if (a.getLogs().forEach(function(n) {
                n.key == e && (t = n)
            }), t) return t;
        throw new Error("Log entry not found")
    }
    r.rpc.listen({
        clearLogs: u,
        logDetails: c,
        getLogEntry: l
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.checkLicense = function() {
        return new Promise(function(e, t) {
            i.runtime.getPlatformInfo().then(function(n) {
                if ("linux" == n.os && !r.prefs.linuxLicense) return e({
                    status: "unneeded"
                });
                a.getInApp(!0).then(function(t) {
                    t.notSigned ? e({
                        status: "unset"
                    }) : t.premium ? e({
                        status: "accepted"
                    }) : e({
                        status: "unset"
                    })
                }).catch(t)
            })
        })
    }, t.alertAudioNeedsReg = function() {
        o.dialog({
            url: "content/premium.html",
            type: r.prefs.alertDialogType,
            initData: {
                text: r._("chrome_premium_audio")
            }
        })
    }, t.alertHlsDownloadLimit = function() {
        o.dialog({
            url: "content/premium.html",
            type: r.prefs.alertDialogType,
            initData: {
                text: r._("chrome_premium_hls", "" + s)
            }
        })
    };
    var r = n(1),
        i = r.browser,
        a = n(234),
        o = n(115);
    var s = t.hlsDownloadLimit = 120
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    var i = n(27),
        a = n(5),
        o = 2e5;
    t.File = function() {
        function e(t) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.fd = t, this.position = 0, this.fileLength = 0, this.writeControl = a.Concurrent(1)
        }
        return r(e, [{
            key: "_close",
            value: function() {
                return i.call("fs.close", this.fd)
            }
        }, {
            key: "_write",
            value: function(e) {
                var t = this;
                return new Promise(function(n, r) {
                    var a = 0;
                    ! function s(u, c) {
                        var l = e.subarray(u, c).toString();
                        i.call("fs.write", t.fd, l, 0, c - u, t.position).then(function(r) {
                            a += r, t.position += r, t.fileLength = Math.max(t.fileLength, t.position), a >= e.length ? n(a) : s(a, a + Math.min(e.length - a, o))
                        }).catch(r)
                    }(0, Math.min(e.length, o))
                })
            }
        }, {
            key: "_setPosition",
            value: function(t) {
                switch (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.POS_START) {
                    case e.POS_START:
                        this.position = t;
                        break;
                    case e.POS_END:
                        this.position = this.fileLength - t;
                        break;
                    case e.POS_CUR:
                        this.position += t
                }
                return Promise.resolve()
            }
        }, {
            key: "write",
            value: function() {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                var r = this;
                return r.writeControl(function() {
                    return r._write.apply(r, t)
                })
            }
        }, {
            key: "close",
            value: function() {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                var r = this;
                return r.writeControl(function() {
                    return r._close.apply(r, t)
                })
            }
        }, {
            key: "setPosition",
            value: function() {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                var r = this;
                return r.writeControl(function() {
                    return r._setPosition.apply(r, t)
                })
            }
        }], [{
            key: "open",
            value: function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                arguments[2];
                return new Promise(function(r, a) {
                    var o = "r";
                    n.write && (o = "r+", n.truncate && (o = "w+")), i.call("fs.open", t, o).catch(function(e) {
                        if ("r+" == o) return i.call("fs.open", t, "w").then(function(e) {
                            return i.call("fs.close", e)
                        }).then(function() {
                            return i.call("fs.open", t, o)
                        });
                        throw e
                    }).then(function(o) {
                        var s = new e(o);
                        n.truncate ? r(s) : i.call("fs.stat", t).then(function(e) {
                            s.fileLength = e.size, s.position = e.size, r(s)
                        }).catch(a)
                    }).catch(a)
                })
            }
        }, {
            key: "move",
            value: function() {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return i.call.apply(i, ["fs.rename"].concat(t))
            }
        }, {
            key: "remove",
            value: function() {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return i.call.apply(i, ["fs.unlink"].concat(t))
            }
        }, {
            key: "POS_START",
            get: function() {
                return 0
            }
        }, {
            key: "POS_CUR",
            get: function() {
                return 1
            }
        }, {
            key: "POS_END",
            get: function() {
                return 2
            }
        }]), e
    }()
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    var i = n(1),
        a = n(61),
        o = n(39),
        s = n(94),
        u = n(5),
        c = n(116),
        l = n(96),
        d = n(12),
        f = n(27);
    t.Codecs = {
        27: {
            id: 27,
            type: "video",
            name: "h264",
            strTag: "avc1",
            tag: 1635148593,
            captureRaw: !0
        },
        15: {
            id: 15,
            type: "audio",
            name: "aac",
            strTag: "mp4a",
            tag: 1836069985,
            captureRaw: !0
        }
    }, t.Chunkset = function() {
        function e(t) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = t && t.url && u.hashHex(t.url) || "nohash";
            this.id = "chunked:" + n, this.chunks = [], this.hash = n, this.recording = !1, this.lastDlingIndex = -1, this.lastDledIndex = -1, this.lastProcedIndex = -1, this.downloadingCount = 0, this.nextTrackId = 1, this.lastProgress = -1, this.processedChunksCount = 0, this.dataWritten = 0, this.currentDataBlockSize = -1, this.fileSize = 0, this.mdatOffsets = [], this.multiMdat = !1, this.rawAppendData = !1, this.hit = Object.assign({}, t, {
                id: this.id,
                length: 0,
                url: t && t.url || null
            })
        }
        return r(e, [{
            key: "updateHit",
            value: function(e) {
                this.hit.length = (this.hit.length || 0) + (e.length || 0), o.newData(this.hit), this.chunks.push({
                    url: e.url,
                    index: this.chunks.length
                })
            }
        }, {
            key: "handle",
            value: function() {
                if (this.recording) {
                    for (; this.downloadingCount < i.prefs.chunksConcurrentDownloads && this.lastDlingIndex + 1 < this.chunks.length && this.lastDledIndex - this.lastProcedIndex < i.prefs.chunksPrefetchCount;) this.progressFn && this.lastProgress < 0 && (this.lastProgress = 0, this.progressFn(0)), this.downloadingCount++, this.downloadChunk.call(this, this.chunks[++this.lastDlingIndex], function(e, t) {
                        if (this.downloadingCount--, e) {
                            if (!this.recording) return;
                            this.stopDownloadingOnChunkError ? (this.noMoreChunkToDownload = !0, t.index < this.chunks.length && (this.chunks.splice(t.index), t.index > 0 ? null === this.chunks[t.index - 1] && (this.recording = !1, this.finalize(null)) : this.recording && (this.recording = !1, this.finalize(new Error("No chunk received")))), this.handle()) : (this.recording = !1, this.lastDlingIndex = this.lastDledIndex, this.doNotReportDownloadChunkErrors && this.lastDledIndex >= 0 ? this.finalize(null, function() {}) : (console.warn("Error downloading chunk:", e.message || e), s.error(e), this.aborted = !0, this.finalize(e, function() {})))
                        } else
                            for (t.downloading = !1, t.downloaded = !0; this.lastDledIndex + 1 < this.chunks.length && this.chunks[this.lastDledIndex + 1].downloaded;) this.lastDledIndex++;
                        this.aborted ? t.path && (l.File.remove(t.path), delete t.path) : this.handle()
                    });
                    this.recording && this.lastProcedIndex < this.lastDledIndex && this.lastProcedIndex < this.chunks.length - 1 && !this.chunks[this.lastProcedIndex + 1].processing && this.processChunk.call(this, this.chunks[this.lastProcedIndex + 1], function(e, t) {
                        e && console.warn("Error processing chunk: move to next chunk", e), t.processing = !1, this.lastProcedIndex = t.index, t.path && l.File.remove(t.path), this.handle(), this.chunks[t.index] = null
                    })
                }
            }
        }, {
            key: "downloadChunk",
            value: function(e, t) {
                if (e.downloaded) return t.call(this, null, e);
                e.downloading = !0;
                var n = this;

                function r(t) {
                    i.prefs.chunkedCoappDataRequests ? f.requestBinary(e.url, {
                        headers: n.hit.headers || [],
                        proxy: i.prefs.coappUseProxy && n.hit.proxy || null
                    }).then(function(r) {
                        e.data = r, t.call(n, null, e)
                    }).catch(function(r) {
                        t.call(n, r, e)
                    }) : u.downloadToByteArray(e.url, n.hit.headers || null, n.hit.isPrivate, !!n.masked, function(r, i) {
                        r || (e.data = i), t.call(n, r, e)
                    })
                }
                e.downloadRetries = 0, r(function e(a, o) {
                    a && o.downloadRetries++ <= i.prefs.downloadRetries ? setTimeout(function() {
                        n.recording && r(e)
                    }, i.prefs.downloadRetryDelay) : (delete o.downloadRetries, t.call(n, a, o))
                })
            }
        }, {
            key: "processChunkData",
            value: function(e, t) {
                t.call(this, null, e)
            }
        }, {
            key: "processChunk",
            value: function(e, t) {
                var n = this;

                function r(r) {
                    function i() {
                        n.processChunkData(r, function(r, i) {
                            r ? t.call(n, r, e) : n.appendDataToOutputFile(i, function(r) {
                                if (r || (n.dataWritten += a.length(i)), n.processedSegmentsCount++, n.processedSegmentsCount >= n.segmentsCount) n.outOfChunks();
                                else if (n.progressFn && !n.aborted) {
                                    var o = Math.round(100 * n.processedSegmentsCount / (n.segmentsCount || n.chunks.length || 1));
                                    o != n.lastProgress && n.progressFn(o), n.lastProgress = o
                                }
                                t.call(n, r, e)
                            })
                        })
                    }
                    n.endsOnSeenChunk ? crypto.subtle.digest({
                        name: "SHA-256"
                    }, r).then(function(e) {
                        for (var t = [], r = new DataView(e), a = 0; a < r.byteLength; a += 4) {
                            var o = ("00000000" + r.getUint32(a).toString(16)).slice(-"00000000".length);
                            t.push(o)
                        }
                        var s = t.join("");
                        if (n.seenChunks = n.seenChunks || {}, n.seenChunks[s]) return n.recording = !1, void n.finalize(null);
                        n.seenChunks[s] = !0, i()
                    }) : i()
                }
                e.processing = !0, e.data ? r(e.data) : l.File.read(e.path).then(function(e) {
                    r(e)
                }, function(r) {
                    t.call(n, r, e)
                })
            }
        }, {
            key: "outOfChunks",
            value: function() {
                this.recording = !1, this.finalize(null)
            }
        }, {
            key: "download",
            value: function(e, t, n, r, i) {
                var o = this;
                this.downloadTarget = t[0].fileName, this.aborted = !1, this.action = e, a.writeFileHeader(this, function(e) {
                    e ? r(e) : (o.recording = !0, o.handle())
                })
            }
        }, {
            key: "getNextTrackId",
            value: function() {
                return this.nextTrackId
            }
        }, {
            key: "setNewId",
            value: function() {
                for (var e = 1; d.getHit(this.id + "-" + e);) e++;
                this.id = this.id + "-" + e, this.hit && (this.hit.id = this.id), this.action && this.action.hit && (this.action.hit.id = this.id)
            }
        }, {
            key: "finalize",
            value: function(e, t) {
                if (this.cleanupChunkFiles(), this.progressFn && this.progressFn(100), e && this.errorFn ? this.errorFn(e) : !e && this.successFn && this.successFn(), !e) {
                    var n = d.getHit(this.id);
                    if (n) {
                        var r = Object.assign({}, n);
                        this.hit = r, delete r.url, d.dispatch("hit.delete", this.id), this.setNewId(), r.id = this.id, d.dispatch("hit.new", r)
                    }
                }
                t && t(e)
            }
        }, {
            key: "appendDataToOutputFile",
            value: function(e, t) {
                var n = this,
                    r = a.length(e);

                function i() {
                    n.currentDataBlockSize += r, n.appendToOutputFile(e, function(e) {
                        if (e) return t(e);
                        t(null)
                    })
                }

                function o() {
                    n.mdatOffsets.push(n.lastDataIndex + 8);
                    var e = a.mdatBox();
                    n.appendToOutputFile(e, function(e, a) {
                        if (e) return t(e);
                        n.lastDataIndex = a + r, n.mdatLengthOffset = a - 8, n.currentDataBlockSize = 0, i()
                    })
                }
                this.rawAppendData ? (this.mdatOffsets.push(this.lastDataIndex), i(), this.lastDataIndex += r) : this.currentDataBlockSize < 0 ? o() : this.currentDataBlockSize + r > 1e9 ? (this.multiMdat = !0, a.updateMdatLength(this, this.mdatLengthOffset, this.currentDataBlockSize, function(e) {
                    if (e) return t(e);
                    o()
                })) : (this.mdatOffsets.push(this.lastDataIndex), i(), this.lastDataIndex += r)
            }
        }, {
            key: "appendToOutputFile",
            value: function(e, t) {
                var n = this;
                if (this.aborted) return t(null);

                function r() {
                    if (n.aborted)
                        for (; n.pendingAppend.length > 0;) {
                            (r = n.pendingAppend.shift()).callback(null)
                        } else {
                            n.appendFileTimer && clearTimeout(n.appendFileTimer), n.appendFileTimer = setTimeout(function() {
                                n.file.close(), n.file = null
                            }, 5e3);
                            for (var t = 0; n.pendingAppend.length > 0;) {
                                var r = n.pendingAppend.shift();
                                t++,
                                function(r) {
                                    a.writeMulti(n.file, r.data, function(i) {
                                        var o = a.length(e);
                                        if (n.fileSize += o, r.callback(i, n.fileSize), 0 == --t && n.waitingDataWritten)
                                            for (; n.waitingDataWritten.length;) n.waitingDataWritten.shift()()
                                    })
                                }(r)
                            }
                        }
                }
                if (this.pendingAppend = this.pendingAppend || [], this.pendingAppend.push({
                        data: e,
                        callback: t
                    }), this.file) r();
                else if (!this.openingAppendFile) {
                    this.openingAppendFile = !0;
                    var i = l,
                        o = {
                            write: !0,
                            append: !0
                        };
                    n.masked && (i = c, o.iv = n.biniv, o.key = n.cryptoKey);
                    var s = n.downloadTarget;
                    this.rawAppendData || (s += ".part"), i.File.open(s, o).then(function(e) {
                        n.openingAppendFile = !1, n.file = e, r()
                    }, function(e) {
                        for (n.openingAppendFile = !1; n.pendingAppend.length > 0;) {
                            n.pendingAppend.shift().callback(e)
                        }
                    })
                }
            }
        }, {
            key: "waitForWrittenData",
            value: function(e) {
                this.aborted ? e() : this.pendingAppend && this.pendingAppend.length ? (this.waitingDataWritten = this.waitingDataWritten || [], this.waitingDataWritten.push(e)) : e()
            }
        }, {
            key: "cleanupChunkFiles",
            value: function() {
                for (var e = Math.max(0, this.lastProcedIndex); e < Math.max(0, this.lastDledIndex); e++) {
                    var t = this.chunks[e];
                    t && t.path && (l.File.remove(t.path), t = null)
                }
            }
        }, {
            key: "actionAbortFn",
            value: function() {
                this.recording = !1, this.aborted = !0
            }
        }]), e
    }()
}, function(e, t) {
    function n(e) {
        var t = [];
        for (var n in e) t.push(n);
        return t
    }(e.exports = "function" == typeof Object.keys ? Object.keys : n).shim = n
}, function(e, t) {
    var n = "[object Arguments]" == function() {
        return Object.prototype.toString.call(arguments)
    }();

    function r(e) {
        return "[object Arguments]" == Object.prototype.toString.call(e)
    }

    function i(e) {
        return e && "object" == typeof e && "number" == typeof e.length && Object.prototype.hasOwnProperty.call(e, "callee") && !Object.prototype.propertyIsEnumerable.call(e, "callee") || !1
    }(t = e.exports = n ? r : i).supported = r, t.unsupported = i
}, function(e, t, n) {
    "use strict";
    var r = n(56),
        i = n(103),
        a = n(104),
        o = "[object Null]",
        s = "[object Undefined]",
        u = r.a ? r.a.toStringTag : void 0;
    t.a = function(e) {
        return null == e ? void 0 === e ? s : o : u && u in Object(e) ? Object(i.a)(e) : Object(a.a)(e)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(102),
        i = "object" == typeof self && self && self.Object === Object && self,
        a = r.a || i || Function("return this")();
    t.a = a
}, function(e, t, n) {
    "use strict";
    (function(e) {
        var n = "object" == typeof e && e && e.Object === Object && e;
        t.a = n
    }).call(t, n(10))
}, function(e, t, n) {
    "use strict";
    var r = n(56),
        i = Object.prototype,
        a = i.hasOwnProperty,
        o = i.toString,
        s = r.a ? r.a.toStringTag : void 0;
    t.a = function(e) {
        var t = a.call(e, s),
            n = e[s];
        try {
            e[s] = void 0;
            var r = !0
        } catch (e) {}
        var i = o.call(e);
        return r && (t ? e[s] = n : delete e[s]), i
    }
}, function(e, t, n) {
    "use strict";
    var r = Object.prototype.toString;
    t.a = function(e) {
        return r.call(e)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(106),
        i = Object(r.a)(Object.getPrototypeOf, Object);
    t.a = i
}, function(e, t, n) {
    "use strict";
    t.a = function(e, t) {
        return function(n) {
            return e(t(n))
        }
    }
}, function(e, t, n) {
    "use strict";
    t.a = function(e) {
        return null != e && "object" == typeof e
    }
}, function(e, t, n) {
    "use strict";
    (function(e, r) {
        var i, a = n(110);
        i = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : r;
        var o = Object(a.a)(i);
        t.a = o
    }).call(t, n(10), n(109)(e))
}, function(e, t) {
    e.exports = function(e) {
        if (!e.webpackPolyfill) {
            var t = Object.create(e);
            t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function() {
                    return t.l
                }
            }), Object.defineProperty(t, "id", {
                enumerable: !0,
                get: function() {
                    return t.i
                }
            }), Object.defineProperty(t, "exports", {
                enumerable: !0
            }), t.webpackPolyfill = 1
        }
        return t
    }
}, function(e, t, n) {
    "use strict";
    t.a = function(e) {
        var t, n = e.Symbol;
        "function" == typeof n ? n.observable ? t = n.observable : (t = n("observable"), n.observable = t) : t = "@@observable";
        return t
    }
}, function(e, t, n) {
    "use strict";
    t.a = function(e) {
        for (var t = Object.keys(e), n = {}, a = 0; a < t.length; a++) {
            var o = t[a];
            0, "function" == typeof e[o] && (n[o] = e[o])
        }
        var s = Object.keys(n);
        0;
        var u = void 0;
        try {
            ! function(e) {
                Object.keys(e).forEach(function(t) {
                    var n = e[t],
                        i = n(void 0, {
                            type: r.a.INIT
                        });
                    if (void 0 === i) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
                    var a = "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".");
                    if (void 0 === n(void 0, {
                            type: a
                        })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + r.a.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')
                })
            }(n)
        } catch (e) {
            u = e
        }
        return function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1];
            if (u) throw u;
            for (var r = !1, a = {}, o = 0; o < s.length; o++) {
                var c = s[o],
                    l = n[c],
                    d = e[c],
                    f = l(d, t);
                if (void 0 === f) {
                    var p = i(c, t);
                    throw new Error(p)
                }
                a[c] = f, r = r || f !== d
            }
            return r ? a : e
        }
    };
    var r = n(55);
    n(54), n(57);

    function i(e, t) {
        var n = t && t.type;
        return "Given action " + (n && '"' + n.toString() + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return function() {
            return t(e.apply(void 0, arguments))
        }
    }
    t.a = function(e, t) {
        if ("function" == typeof e) return r(e, t);
        if ("object" != typeof e || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        for (var n = Object.keys(e), i = {}, a = 0; a < n.length; a++) {
            var o = n[a],
                s = e[o];
            "function" == typeof s && (i[o] = r(s, t))
        }
        return i
    }
}, function(e, t, n) {
    "use strict";
    t.a = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return function(e) {
            return function(n, a, o) {
                var s = e(n, a, o),
                    u = s.dispatch,
                    c = [],
                    l = {
                        getState: s.getState,
                        dispatch: function(e) {
                            return u(e)
                        }
                    };
                return c = t.map(function(e) {
                    return e(l)
                }), u = r.a.apply(void 0, c)(s.dispatch), i({}, s, {
                    dispatch: u
                })
            }
        }
    };
    var r = n(58),
        i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
}, function(e, t, n) {
    (function(e) {
        (function(t) {
            "use strict";

            function n(e, t) {
                e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            }

            function r(e, t) {
                Object.defineProperty(this, "kind", {
                    value: e,
                    enumerable: !0
                }), t && t.length && Object.defineProperty(this, "path", {
                    value: t,
                    enumerable: !0
                })
            }

            function i(e, t, n) {
                i.super_.call(this, "E", e), Object.defineProperty(this, "lhs", {
                    value: t,
                    enumerable: !0
                }), Object.defineProperty(this, "rhs", {
                    value: n,
                    enumerable: !0
                })
            }

            function a(e, t) {
                a.super_.call(this, "N", e), Object.defineProperty(this, "rhs", {
                    value: t,
                    enumerable: !0
                })
            }

            function o(e, t) {
                o.super_.call(this, "D", e), Object.defineProperty(this, "lhs", {
                    value: t,
                    enumerable: !0
                })
            }

            function s(e, t, n) {
                s.super_.call(this, "A", e), Object.defineProperty(this, "index", {
                    value: t,
                    enumerable: !0
                }), Object.defineProperty(this, "item", {
                    value: n,
                    enumerable: !0
                })
            }

            function u(e, t, n) {
                var r = e.slice((n || t) + 1 || e.length);
                return e.length = t < 0 ? e.length + t : t, e.push.apply(e, r), e
            }

            function c(e) {
                var t = void 0 === e ? "undefined" : x(e);
                return "object" !== t ? t : e === Math ? "math" : null === e ? "null" : Array.isArray(e) ? "array" : "[object Date]" === Object.prototype.toString.call(e) ? "date" : "function" == typeof e.toString && /^\/.*\//.test(e.toString()) ? "regexp" : "object"
            }

            function l(e, t, n, r, d, f, p) {
                d = d || [], p = p || [];
                var h = d.slice(0);
                if (void 0 !== f) {
                    if (r) {
                        if ("function" == typeof r && r(h, f)) return;
                        if ("object" === (void 0 === r ? "undefined" : x(r))) {
                            if (r.prefilter && r.prefilter(h, f)) return;
                            if (r.normalize) {
                                var g = r.normalize(h, f, e, t);
                                g && (e = g[0], t = g[1])
                            }
                        }
                    }
                    h.push(f)
                }
                "regexp" === c(e) && "regexp" === c(t) && (e = e.toString(), t = t.toString());
                var m = void 0 === e ? "undefined" : x(e),
                    v = void 0 === t ? "undefined" : x(t),
                    y = "undefined" !== m || p && p[p.length - 1].lhs && p[p.length - 1].lhs.hasOwnProperty(f),
                    b = "undefined" !== v || p && p[p.length - 1].rhs && p[p.length - 1].rhs.hasOwnProperty(f);
                if (!y && b) n(new a(h, t));
                else if (!b && y) n(new o(h, e));
                else if (c(e) !== c(t)) n(new i(h, e, t));
                else if ("date" === c(e) && e - t != 0) n(new i(h, e, t));
                else if ("object" === m && null !== e && null !== t)
                    if (p.filter(function(t) {
                            return t.lhs === e
                        }).length) e !== t && n(new i(h, e, t));
                    else {
                        if (p.push({
                                lhs: e,
                                rhs: t
                            }), Array.isArray(e)) {
                            var w;
                            for (e.length, w = 0; w < e.length; w++) w >= t.length ? n(new s(h, w, new o(void 0, e[w]))) : l(e[w], t[w], n, r, h, w, p);
                            for (; w < t.length;) n(new s(h, w, new a(void 0, t[w++])))
                        } else {
                            var k = Object.keys(e),
                                A = Object.keys(t);
                            k.forEach(function(i, a) {
                                var o = A.indexOf(i);
                                o >= 0 ? (l(e[i], t[i], n, r, h, i, p), A = u(A, o)) : l(e[i], void 0, n, r, h, i, p)
                            }), A.forEach(function(e) {
                                l(void 0, t[e], n, r, h, e, p)
                            })
                        }
                        p.length = p.length - 1
                    }
                else e !== t && ("number" === m && isNaN(e) && isNaN(t) || n(new i(h, e, t)))
            }

            function d(e, t, n, r) {
                return r = r || [], l(e, t, function(e) {
                    e && r.push(e)
                }, n), r.length ? r : void 0
            }

            function f(e, t, n) {
                if (e && t && n && n.kind) {
                    for (var r = e, i = -1, a = n.path ? n.path.length - 1 : 0; ++i < a;) void 0 === r[n.path[i]] && (r[n.path[i]] = "number" == typeof n.path[i] ? [] : {}), r = r[n.path[i]];
                    switch (n.kind) {
                        case "A":
                            ! function e(t, n, r) {
                                if (r.path && r.path.length) {
                                    var i, a = t[n],
                                        o = r.path.length - 1;
                                    for (i = 0; i < o; i++) a = a[r.path[i]];
                                    switch (r.kind) {
                                        case "A":
                                            e(a[r.path[i]], r.index, r.item);
                                            break;
                                        case "D":
                                            delete a[r.path[i]];
                                            break;
                                        case "E":
                                        case "N":
                                            a[r.path[i]] = r.rhs
                                    }
                                } else switch (r.kind) {
                                    case "A":
                                        e(t[n], r.index, r.item);
                                        break;
                                    case "D":
                                        t = u(t, n);
                                        break;
                                    case "E":
                                    case "N":
                                        t[n] = r.rhs
                                }
                                return t
                            }(n.path ? r[n.path[i]] : r, n.index, n.item);
                            break;
                        case "D":
                            delete r[n.path[i]];
                            break;
                        case "E":
                        case "N":
                            r[n.path[i]] = n.rhs
                    }
                }
            }

            function p(e, t, n, r) {
                var i = d(e, t);
                try {
                    r ? n.groupCollapsed("diff") : n.group("diff")
                } catch (e) {
                    n.log("diff")
                }
                i ? i.forEach(function(e) {
                    var t = e.kind,
                        r = function(e) {
                            var t = e.kind,
                                n = e.path,
                                r = e.lhs,
                                i = e.rhs,
                                a = e.index,
                                o = e.item;
                            switch (t) {
                                case "E":
                                    return [n.join("."), r, "→", i];
                                case "N":
                                    return [n.join("."), i];
                                case "D":
                                    return [n.join(".")];
                                case "A":
                                    return [n.join(".") + "[" + a + "]", o];
                                default:
                                    return []
                            }
                        }(e);
                    n.log.apply(n, ["%c " + I[t].text, function(e) {
                        return "color: " + I[e].color + "; font-weight: bold"
                    }(t)].concat(A(r)))
                }) : n.log("—— no diff ——");
                try {
                    n.groupEnd()
                } catch (e) {
                    n.log("—— diff end —— ")
                }
            }

            function h(e, t, n, r) {
                switch (void 0 === e ? "undefined" : x(e)) {
                    case "object":
                        return "function" == typeof e[r] ? e[r].apply(e, A(n)) : e[r];
                    case "function":
                        return e(t);
                    default:
                        return e
                }
            }

            function g(e, t) {
                var n = t.logger,
                    r = t.actionTransformer,
                    i = t.titleFormatter,
                    a = void 0 === i ? function(e) {
                        var t = e.timestamp,
                            n = e.duration;
                        return function(e, r, i) {
                            var a = ["action"];
                            return a.push("%c" + String(e.type)), t && a.push("%c@ " + r), n && a.push("%c(in " + i.toFixed(2) + " ms)"), a.join(" ")
                        }
                    }(t) : i,
                    o = t.collapsed,
                    s = t.colors,
                    u = t.level,
                    c = t.diff,
                    l = void 0 === t.titleFormatter;
                e.forEach(function(i, d) {
                    var f = i.started,
                        g = i.startedTime,
                        m = i.action,
                        v = i.prevState,
                        y = i.error,
                        b = i.took,
                        k = i.nextState,
                        x = e[d + 1];
                    x && (k = x.prevState, b = x.started - f);
                    var A = r(m),
                        _ = "function" == typeof o ? o(function() {
                            return k
                        }, m, i) : o,
                        I = w(g),
                        O = s.title ? "color: " + s.title(A) + ";" : "",
                        P = ["color: gray; font-weight: lighter;"];
                    P.push(O), t.timestamp && P.push("color: gray; font-weight: lighter;"), t.duration && P.push("color: gray; font-weight: lighter;");
                    var C = a(A, I, b);
                    try {
                        _ ? s.title && l ? n.groupCollapsed.apply(n, ["%c " + C].concat(P)) : n.groupCollapsed(C) : s.title && l ? n.group.apply(n, ["%c " + C].concat(P)) : n.group(C)
                    } catch (e) {
                        n.log(C)
                    }
                    var S = h(u, A, [v], "prevState"),
                        E = h(u, A, [A], "action"),
                        j = h(u, A, [y, v], "error"),
                        T = h(u, A, [k], "nextState");
                    if (S)
                        if (s.prevState) {
                            var D = "color: " + s.prevState(v) + "; font-weight: bold";
                            n[S]("%c prev state", D, v)
                        } else n[S]("prev state", v);
                    if (E)
                        if (s.action) {
                            var R = "color: " + s.action(A) + "; font-weight: bold";
                            n[E]("%c action    ", R, A)
                        } else n[E]("action    ", A);
                    if (y && j)
                        if (s.error) {
                            var q = "color: " + s.error(y, v) + "; font-weight: bold;";
                            n[j]("%c error     ", q, y)
                        } else n[j]("error     ", y);
                    if (T)
                        if (s.nextState) {
                            var M = "color: " + s.nextState(k) + "; font-weight: bold";
                            n[T]("%c next state", M, k)
                        } else n[T]("next state", k);
                    c && p(v, k, n, _);
                    try {
                        n.groupEnd()
                    } catch (e) {
                        n.log("—— log end ——")
                    }
                })
            }

            function m() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = Object.assign({}, O, e),
                    n = t.logger,
                    r = t.stateTransformer,
                    i = t.errorTransformer,
                    a = t.predicate,
                    o = t.logErrors,
                    s = t.diffPredicate;
                if (void 0 === n) return function() {
                    return function(e) {
                        return function(t) {
                            return e(t)
                        }
                    }
                };
                if (e.getState && e.dispatch) return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),
                    function() {
                        return function(e) {
                            return function(t) {
                                return e(t)
                            }
                        }
                    };
                var u = [];
                return function(e) {
                    var n = e.getState;
                    return function(e) {
                        return function(c) {
                            if ("function" == typeof a && !a(n, c)) return e(c);
                            var l = {};
                            u.push(l), l.started = k.now(), l.startedTime = new Date, l.prevState = r(n()), l.action = c;
                            var d = void 0;
                            if (o) try {
                                d = e(c)
                            } catch (e) {
                                l.error = i(e)
                            } else d = e(c);
                            l.took = k.now() - l.started, l.nextState = r(n());
                            var f = t.diff && "function" == typeof s ? s(n, c) : t.diff;
                            if (g(u, Object.assign({}, t, {
                                    diff: f
                                })), u.length = 0, l.error) throw l.error;
                            return d
                        }
                    }
                }
            }
            var v, y, b = function(e, t) {
                    return function(e, t) {
                        return new Array(t + 1).join(e)
                    }("0", t - e.toString().length) + e
                },
                w = function(e) {
                    return b(e.getHours(), 2) + ":" + b(e.getMinutes(), 2) + ":" + b(e.getSeconds(), 2) + "." + b(e.getMilliseconds(), 3)
                },
                k = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date,
                x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                A = function(e) {
                    if (Array.isArray(e)) {
                        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                        return n
                    }
                    return Array.from(e)
                },
                _ = [];
            v = "object" === (void 0 === e ? "undefined" : x(e)) && e ? e : "undefined" != typeof window ? window : {}, (y = v.DeepDiff) && _.push(function() {
                void 0 !== y && v.DeepDiff === d && (v.DeepDiff = y, y = void 0)
            }), n(i, r), n(a, r), n(o, r), n(s, r), Object.defineProperties(d, {
                diff: {
                    value: d,
                    enumerable: !0
                },
                observableDiff: {
                    value: l,
                    enumerable: !0
                },
                applyDiff: {
                    value: function(e, t, n) {
                        e && t && l(e, t, function(r) {
                            n && !n(e, t, r) || f(e, t, r)
                        })
                    },
                    enumerable: !0
                },
                applyChange: {
                    value: f,
                    enumerable: !0
                },
                revertChange: {
                    value: function(e, t, n) {
                        if (e && t && n && n.kind) {
                            var r, i, a = e;
                            for (i = n.path.length - 1, r = 0; r < i; r++) void 0 === a[n.path[r]] && (a[n.path[r]] = {}), a = a[n.path[r]];
                            switch (n.kind) {
                                case "A":
                                    ! function e(t, n, r) {
                                        if (r.path && r.path.length) {
                                            var i, a = t[n],
                                                o = r.path.length - 1;
                                            for (i = 0; i < o; i++) a = a[r.path[i]];
                                            switch (r.kind) {
                                                case "A":
                                                    e(a[r.path[i]], r.index, r.item);
                                                    break;
                                                case "D":
                                                case "E":
                                                    a[r.path[i]] = r.lhs;
                                                    break;
                                                case "N":
                                                    delete a[r.path[i]]
                                            }
                                        } else switch (r.kind) {
                                            case "A":
                                                e(t[n], r.index, r.item);
                                                break;
                                            case "D":
                                            case "E":
                                                t[n] = r.lhs;
                                                break;
                                            case "N":
                                                t = u(t, n)
                                        }
                                        return t
                                    }(a[n.path[r]], n.index, n.item);
                                    break;
                                case "D":
                                case "E":
                                    a[n.path[r]] = n.lhs;
                                    break;
                                case "N":
                                    delete a[n.path[r]]
                            }
                        }
                    },
                    enumerable: !0
                },
                isConflict: {
                    value: function() {
                        return void 0 !== y
                    },
                    enumerable: !0
                },
                noConflict: {
                    value: function() {
                        return _ && (_.forEach(function(e) {
                            e()
                        }), _ = null), d
                    },
                    enumerable: !0
                }
            });
            var I = {
                    E: {
                        color: "#2196F3",
                        text: "CHANGED:"
                    },
                    N: {
                        color: "#4CAF50",
                        text: "ADDED:"
                    },
                    D: {
                        color: "#F44336",
                        text: "DELETED:"
                    },
                    A: {
                        color: "#2196F3",
                        text: "ARRAY:"
                    }
                },
                O = {
                    level: "log",
                    logger: console,
                    logErrors: !0,
                    collapsed: void 0,
                    predicate: void 0,
                    duration: !1,
                    timestamp: !0,
                    stateTransformer: function(e) {
                        return e
                    },
                    actionTransformer: function(e) {
                        return e
                    },
                    errorTransformer: function(e) {
                        return e
                    },
                    colors: {
                        title: function() {
                            return "inherit"
                        },
                        prevState: function() {
                            return "#9E9E9E"
                        },
                        action: function() {
                            return "#03A9F4"
                        },
                        nextState: function() {
                            return "#4CAF50"
                        },
                        error: function() {
                            return "#F20404"
                        }
                    },
                    diff: !1,
                    diffPredicate: void 0,
                    transformer: void 0
                },
                P = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.dispatch,
                        n = e.getState;
                    return "function" == typeof t || "function" == typeof n ? m()({
                        dispatch: t,
                        getState: n
                    }) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")
                };
            t.defaults = O, t.createLogger = m, t.logger = P, t.default = P, Object.defineProperty(t, "__esModule", {
                value: !0
            })
        })(t)
    }).call(t, n(10))
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.dialog = s, t.alert = u, t.fileDialog = c, t.saveAs = function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return c(Object.assign({
            filename: e,
            directory: t,
            uniqueFilename: !0,
            titleText: r._("save_file_as"),
            noSizeColumn: !1,
            dirOnly: !1,
            upDir: !1,
            editFileInput: !0,
            readonlyDir: !1,
            showDir: !0,
            okText: r._("save"),
            confirmOverwrite: !0,
            newDir: !0,
            createDir: !0
        }, n))
    }, t.selectDirectory = l, t.selectConvertFiles = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return c(Object.assign({
            directory: e,
            uniqueFilename: !1,
            titleText: r._("select_files_to_convert"),
            noSizeColumn: !1,
            dirOnly: !1,
            upDir: !0,
            readonlyDir: !0,
            editFileInput: !1,
            showDir: !1,
            okText: r._("convert"),
            confirmOverwrite: !1,
            newDir: !1,
            createDir: !1,
            selectMultiple: !0,
            outputConfigs: !0
        }, t))
    };
    var r = n(1),
        i = r.browser,
        a = n(40),
        o = 0;

    function s(e) {
        var t = Promise.resolve();
        "tab" === e.type && (t = t.then(function() {
            return i.tabs.query({
                active: !0,
                lastFocusedWindow: !0
            }).then(function(e) {
                e.length > 0 && a.setTransientTab("<next-tab>", e[0].id)
            })
        }));
        var n = "dialog" + ++o;
        return (t = t.then(function() {
            r.ui.open(n, e)
        }).then(function() {
            return r.wait(n)
        })).__dialogName = n, t
    }

    function u(e) {
        var t = {
            autoResize: !0
        };
        return "tab" == r.prefs.alertDialogType && (t = {
            bodyClass: "dialog-in-tab",
            autoResize: !1
        }), s({
            url: "content/alert.html",
            type: r.prefs.alertDialogType,
            height: e.height || 200,
            autoClose: r.prefs.dialogAutoClose,
            initData: Object.assign(t, e)
        })
    }

    function c(e) {
        var t = s({
            type: r.prefs.fileDialogType,
            url: "content/file-dialog.html",
            height: 500,
            width: 750,
            autoClose: r.prefs.dialogAutoClose,
            initData: Object.assign({
                filename: null,
                directory: null,
                uniqueFilename: !0,
                titleText: "",
                noSizeColumn: !1,
                dirOnly: !1,
                upDir: !0,
                editFileInput: !0,
                readonlyDir: !1,
                showDir: !0,
                okText: "OK",
                confirmOverwrite: !1,
                newDir: !1,
                createDir: !0
            }, e)
        });
        return t.then(function(e) {
            return r.ui.close(t.__dialogName), e
        }).catch(function(e) {
            return r.ui.close(t.__dialogName), null
        })
    }

    function l(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return c(Object.assign({
            directory: e,
            uniqueFilename: !1,
            titleText: r._("weh_prefs_label_lastDownloadDirectory"),
            noSizeColumn: !0,
            dirOnly: !0,
            upDir: !0,
            editFileInput: !1,
            readonlyDir: !0,
            showDir: !1,
            okText: r._("ok"),
            confirmOverwrite: !1,
            newDir: !0,
            createDir: !1
        }, t))
    }
    r.rpc.listen({
        alert: u,
        selectDirectory: l
    })
}, function(e, t, n) {
    "use strict"
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.extractMeta = function(e, t) {
        var n, i = e.previous || {},
            a = {
                previous: {}
            },
            o = i.unconfirmedUnit || null;
        if (o)
            if (0 == t[0] && 0 == t[1] && (1 == t[2] || 0 == t[2] && 1 == t[3]))(n = c(t, 0, t.length)).unshift(o);
            else {
                var s = new Uint8Array(o.s + 3 + t.length);
                s.set(o.data.subarray(o.o - 3, o.o + o.s), 0), s.set(t, o.s + 3), n = c(t = s, 0, t.length)
            }
        else n = c(t, 0, t.length);
        i.confirmedUnusedUnits && (n = [].concat(i.confirmedUnusedUnits, n));
        var u = e.flush ? n.length : n.length - 1;
        if (e.sps || e.pps || e.width || e.height)
            for (var d = 0; d < u; d++) {
                var f = n[d],
                    p = 31 & f.data[f.o];
                if (7 == p) {
                    if (e.sps && !a.sps) {
                        a.sps = new ArrayBuffer(f.s);
                        var h = new Uint8Array(a.sps);
                        h.set(f.data.subarray(f.o, f.o + f.s))
                    }
                    if (e.width && !a.width || e.height && !a.height) {
                        var g = l(f.data, f.o + 1, f.s);
                        a.width = g.width, a.height = g.height
                    }
                } else if (8 == p && e.pps && !a.pps) {
                    a.pps = new ArrayBuffer(f.s);
                    var m = new Uint8Array(a.pps);
                    m.set(f.data.subarray(f.o, f.o + f.s))
                }
            }
        for (var v = i.gotUnitStart || !1, y = i.keyFrame || !1, b = i.frameUnit || !1, w = i.avccData || [], k = i.avccSize || 0, x = !1, d = 0; d < u; d++) {
            var f = n[d];
            if (0 != f.s) {
                var p = 31 & f.data[f.o];
                if (9 == p) {
                    if (v) {
                        x = !0, a.previous.confirmedUnusedUnits = n.slice(d, u);
                        break
                    }
                    v = !0
                } else 5 == p ? (0 != f.data[f.o + 1] && (y = !0), b = !0) : 1 == p && (b = !0);
                if (v) {
                    var A = new Uint8Array(4);
                    r.WriteInt32(A, 0, f.s), w.push(A), w.push(f.data.subarray(f.o, f.o + f.s)), k += f.s + 4
                }
            }
        }(x || e.flush) && v && b ? (a.avccData = w, a.frame = {
            size: k,
            key: y
        }) : (a.previous.gotUnitStart = v, a.previous.avccData = w, a.previous.avccSize = k, a.previous.keyFrame = y, a.previous.frameUnit = b);
        e.flush || (a.previous.unconfirmedUnit = n[n.length - 1]);
        return a
    };
    var r = n(16);

    function i(e) {
        ! function(e) {
            if (!e) throw new Error("ASSERT")
        }(e.m_nCurrentBit <= 8 * e.m_nLength);
        var t = e.m_nCurrentBit >>> 3 >>> 0,
            n = e.m_nCurrentBit % 8 + 1;
        return e.m_nCurrentBit++, (e.m_pStart[e.offset + t] >>> 8 - n & 1) >>> 0
    }

    function a(e, t) {
        for (var n = 0, r = 0; r < t; r++) n |= i(e) << t - r - 1;
        return n
    }

    function o(e) {
        for (var t = 0, n = 0; 0 == i(e) && n < 32;) n++;
        return t = a(e, n), t += (1 << n) - 1
    }

    function s(e) {
        var t = o(e);
        return t = 1 & t ? (t + 1) / 2 : -t / 2
    }

    function u(e, t, n) {
        var i = function(e, t, n) {
            var i = 4 - (3 & t);
            for (n -= 3; t < i && t < n; t++)
                if (0 == e[t] && 0 == e[t + 1] && 1 == e[t + 2]) return t;
            for (n -= 3; t < n; t += 4) {
                var a = r.ReadInt32(e, t);
                if (a - 16843009 & ~a & 2155905152) {
                    if (0 == e[t + 1]) {
                        if (0 == e[t] && 1 == e[t + 2]) return t;
                        if (0 == e[t + 2] && 1 == e[t + 3]) return t + 1
                    }
                    if (0 == e[t + 3]) {
                        if (0 == e[t + 2] && 1 == e[t + 4]) return t + 2;
                        if (0 == e[t + 4] && 1 == e[t + 5]) return t + 3
                    }
                }
            }
            for (n += 3; t < n; t++)
                if (0 == e[t] && 0 == e[t + 1] && 1 == e[t + 2]) return t;
            return n + 3
        }(e, t, n);
        return t < i && i < n && !e[i - 1] && i--, i
    }

    function c(e, t, n) {
        for (var r = [], i = u(e, t, n);;) {
            for (; i < n && !e[i++];);
            if (i == n) break;
            var a = u(e, i, n);
            r.push({
                o: i,
                s: a - i,
                data: e
            }), i = a
        }
        return r
    }

    function l(e, t, n) {
        var r = {
                m_pStart: e,
                m_nLength: n,
                m_nCurrentBit: 0,
                offset: t
            },
            u = 0,
            c = 0,
            l = 0,
            d = 0,
            f = a(r, 8);
        i(r), i(r), i(r), i(r), i(r), i(r), a(r, 2), a(r, 8), o(r);
        if (100 == f || 110 == f || 122 == f || 244 == f || 44 == f || 83 == f || 86 == f || 118 == f) {
            if (3 == o(r)) i(r);
            o(r), o(r), i(r);
            if (i(r))
                for (var p = 0; p < 8; p++) {
                    if (i(r))
                        for (var h = p < 6 ? 16 : 64, g = 8, m = 8, v = 0; v < h; v++) {
                            if (0 != m) m = (g + s(r) + 256) % 256;
                            g = 0 == m ? g : m
                        }
                }
        }
        o(r);
        var y = o(r);
        if (0 == y) o(r);
        else if (1 == y) {
            i(r), s(r), s(r);
            var b = o(r),
                w = [];
            for (p = 0; p < b; p++) w.push(s(r))
        }
        o(r), i(r);
        var k = o(r),
            x = o(r),
            A = i(r);
        if (!A) i(r);
        i(r);
        if (i(r) && (u = o(r), c = o(r), l = o(r), d = o(r)), i(r)) {
            if (i(r))
                if (255 == a(r, 8)) a(r, 8), a(r, 8);
            if (i(r)) i(r);
            if (i(r)) {
                a(r, 3), i(r);
                if (i(r)) i(r), i(r), i(r)
            }
            i(r)
        }
        var _ = 16 * (k + 1) - 2 * d - 2 * l,
            I = (2 - A) * (x + 1) * 16 - 2 * c - 2 * u;
        return {
            width: 8 * Math.floor((_ + 7) / 8),
            height: I
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(16),
        i = {
            0: 96e3,
            1: 88200,
            2: 64e3,
            3: 48e3,
            4: 44100,
            5: 32e3,
            6: 24e3,
            7: 22050,
            8: 16e3,
            9: 12e3,
            10: 11025,
            11: 8e3,
            12: 7350
        };
    t.extractMeta = function(e, t) {
        var n = t.length - 7,
            a = {
                start: -1,
                end: 0,
                maxBitrate: 0,
                durationSec: 0
            };
        e.frames && (a.frames = []);
        for (var o = 0; o < n;)
            if (255 == t[o] && 240 == (246 & t[o + 1])) {
                a.start < 0 && (a.start = o);
                var s = 1 & t[o + 1],
                    u = (67100672 & r.ReadInt32(t, o + 3)) >>> 13 >>> 0,
                    c = s ? 7 : 9;
                if (e.frames && a.frames.push({
                        o: o + c,
                        s: u - c
                    }), e.rate) {
                    var l = r.ReadInt24(t, o + 1),
                        d = (15360 & l) >>> 10 >>> 0;
                    a.rate = Math.round(i[d]), a.mp4aRateIndex = d, a.maxBitrate = Math.max(a.maxBitrate, 8 * u * a.rate / 1024), a.durationSec += 1024 / a.rate;
                    var f = (49152 & l) >>> 14 >>> 0;
                    a.mp4aProfile = f + 1;
                    var p = (448 & l) >>> 6 >>> 0;
                    a.mp4aChannelCount = p
                }
                o += u, a.end = o
            } else o++;
        return a
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.set = function(e) {
        o = e, s()
    }, t.outputConfigForHit = function(e) {
        var t = (e.url || e.videoUrl || e.audioUrl) && e.topUrl;
        if (!t) return Promise.resolve(null);
        for (var n = [], r = new URL(t).hostname.split("."), i = 0; i < r.length - 1; i++) n.push(r.slice(i).join("."));
        var s = null;
        return o.every(function(t) {
            var r = !0;
            return t.extension && e.extension !== t.extension && (r = !1), r && t.domain && (r = !n.every(function(e) {
                return e !== t.domain
            })), r && (s = t), !r
        }) ? Promise.resolve(null) : s.convert ? a.getOutputConfigs().then(function(e) {
            return e[s.format] || null
        }) : Promise.resolve(null)
    };
    var r = n(1),
        i = r.browser,
        a = n(60),
        o = [];

    function s() {
        return i.storage.local.set({
            convrules: o
        }).catch(function(e) {
            console.error("Cannot write conversion rules storage")
        })
    }
    r.rpc.listen({
        editConversionRules: function() {
            r.ui.open("convrules-edit", {
                type: "tab",
                url: "content/convrules-edit.html"
            })
        },
        getConversionRules: function() {
            return o
        },
        setConversionRules: function(e) {
            return o = e, s()
        }
    }), i.storage.local.get({
        convrules: []
    }).then(function(e) {
        o = e.convrules
    }).catch(function(e) {
        console.error("Cannot read conversion rules storage")
    })
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        return function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    i = !0, a = e
                } finally {
                    try {
                        !r && s.return && s.return()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.getInApp = o, t.inAppBuy = s;
    var i = n(1),
        a = (n(41), n(5).Concurrent());

    function o() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return a(function() {
            return Promise.all([new Promise(function(e, t) {
                google.payments.inapp.getSkuDetails({
                    parameters: {
                        env: "prod"
                    },
                    success: function(n) {
                        n && n.response && n.response.details && n.response.details.inAppProducts, e(n.response.details.inAppProducts) || t(new Error("Invalid response"))
                    },
                    failure: function(e) {
                        t(e)
                    }
                })
            }), new Promise(function(e, t) {
                google.payments.inapp.getPurchases({
                    parameters: {
                        env: "prod"
                    },
                    success: function(n) {
                        n && n.response && n.response.details && e(n.response.details) || t(new Error("Invalid response"))
                    },
                    failure: function(e) {
                        t(e)
                    }
                })
            })]).then(function(e) {
                var t = r(e, 2),
                    n = t[0],
                    i = t[1],
                    a = null;
                return i.forEach(function(e) {
                    "ACTIVE" != e.state && "PENDING" != e.state || (n.forEach(function(t) {
                        e.sku === t.sku && (a = t)
                    }), a || (console.warn("Unknown purchase", e, "assuming lifetime"), n.forEach(function(e) {
                        "premium_lifetime" === e.sku && (a = e)
                    })))
                }), {
                    skus: n,
                    purchases: i,
                    premium: a,
                    notSigned: !1
                }
            }).catch(function(e) {
                if (e.response && "TOKEN_MISSING_ERROR" == e.response.errorType) return {
                    notSigned: !0
                };
                throw console.warn("Error accessing in-app", e), new Error("Error accessing in-app")
            })
        })
    }

    function s(e) {
        return a(function() {
            return new Promise(function(t, n) {
                google.payments.inapp.buy({
                    parameters: {
                        env: "prod"
                    },
                    sku: e,
                    success: function(e) {
                        t(e)
                    },
                    failure: function(e) {
                        n(e)
                    }
                })
            })
        }).then(function() {
            return o(!0)
        })
    }
    i.rpc.listen({
        getInApp: o,
        inAppBuy: s
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();

    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function s(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    t.networkHook = function(e, t) {
        if (!u.prefs.chunksEnabled) return null;
        var n = null;
        u.prefs.dashEnabled && (b.test(e.url) ? n = new O(e.url, "json", t) : t.contentType && w.test(t.contentType.toLowerCase()) && (n = new O(e.url, "xml", t)));
        u.prefs.hlsEnabled && (k.test(e.url) ? n = new P(e.url) : x.test(e.url) ? n = new P(e.url, "json") : t.contentType && t.contentType.toLowerCase().indexOf("mpegurl") >= 0 && (n = new P(e.url)));
        !n && u.prefs.f4fEnabled && (n = S.getProbe(e));
        return n && !n.skipManifest ? new Promise(function(r, i) {
            if ("GET" != e.method) return i(new Error("Not a GET request getting chunks manifest"));
            u.prefs.chunkedCoappManifestsRequests || v.isProbablyAvailable() ? v.request(e.url, {
                headers: t.headers,
                proxy: u.prefs.coappUseProxy && t.proxy || null
            }).then(function(e) {
                n.handleManifest(e), n.checkReady(), r(n)
            }).catch(i) : m.request({
                url: e.url,
                onComplete: function(t) {
                    t && 200 == t.status ? (n.handleManifest(t.text), n.checkReady(), r(n)) : (console.warn("Error retrieving manifest from", e.url), r(null))
                }
            })
        }) : null
    }, t.download = function(e, t, n, i, a) {
        t.ignoreSpecs = !0;
        var o = null;
        switch (e.hit.chunked) {
            case "hls":
                o = l.getChunkSet(e.hit);
                break;
            case "dash-adp":
                if (t.length > 1) return void
                function(e, t, n, i, a) {
                    var o = e.hit,
                        s = {
                            audio: 0,
                            video: 0
                        },
                        c = {
                            audio: !1,
                            video: !1
                        },
                        l = !1;

                    function d(e) {
                        l || (l = !0, i(e))
                    }
                    var f = {},
                        p = !1;
                    t.forEach(function(t) {
                        var i = t.type;

                        function l() {
                            c[i] = !0, c.audio && c.video && n()
                        }

                        function g(e) {
                            s[i] = e, p || a(Math.round((s.audio + s.video) / 2))
                        }
                        try {
                            var y, b = function(n) {
                                    var r = o.url || o[i + "Url"];
                                    o._mpdCommonBaseUrl && (r = new URL(o._mpdCommonBaseUrl, r).href), w.base_url && (r = new URL(w.base_url, r).href), y = new h.DashChunkset({
                                        url: r,
                                        headers: e.hit.headers || [],
                                        proxy: u.prefs.coappUseProxy && e.hit.proxy || null
                                    }), f[i] = {
                                        chunkset: y,
                                        target: t.fileName
                                    }, y.downloadFile(t.fileName, {
                                        init_segment: n,
                                        segments: w.segments
                                    }, r, l, d, g)
                                },
                                w = o[i + "Mpd"];
                            if ("string" == typeof w.init_segment) b(m.toByteArray(w.init_segment));
                            else if ("object" == r(w.init_segment)) b(w.init_segment);
                            else {
                                var k = new URL(w.init_segment_url, o[i + "Url"]).href;
                                u.prefs.chunkedCoappDataRequests ? v.requestBinary(k, {
                                    headers: o.headers || [],
                                    proxy: u.prefs.coappUseProxy && o.proxy || null
                                }).then(function(e) {
                                    b(e)
                                }).catch(function(e) {
                                    d(e.message)
                                }) : m.downloadToByteArray(k, o.headers, o.isPrivate, !1, function(e, t) {
                                    if (e) return d(e.message);
                                    b(t)
                                })
                            }
                        } catch (e) {
                            console.warn("Error", e), d(new Error("Dash ADP: " + e.message))
                        }
                    }), e.abortChunked = function() {
                        for (var e in p = !0, f) f[e].chunkset.actionAbortFn();
                        i(new m.VDHError("User abort", {
                            noReport: !0
                        }))
                    }
                }(e, t, n, i, a);
            case "dash":
                o = new h.DashChunkset(e.hit);
                break;
            case "f4f":
                o = new p.F4fChunkset(e.hit)
        }
        if (!o) return void y.error("Requested download of chunked stream, but no chunkset found");
        o.download(e, t, n, i, a)
    };
    var u = n(1),
        c = n(12),
        l = n(236),
        d = n(237),
        f = n(264),
        p = n(265),
        h = n(266),
        g = n(62),
        m = n(5),
        v = n(27),
        y = n(94),
        b = (u.browser, new RegExp("^https?://.*/master\\.json")),
        w = new RegExp("dash.*mpd"),
        k = new RegExp("^https?://.*\\.m3u8(?:\\?|$)"),
        x = new RegExp("^https?://api\\.periscope\\.tv/api/v2/getAccessPublic"),
        A = new RegExp("^https?://.*\\.f4m(?:\\?|$)"),
        _ = new RegExp("^(https?://.*)Seg1\\-Frag([0-9]+)(\\?.*)?$");
    var I = function() {
            function e(t) {
                s(this, e), this.type = t, this.receivedChunks = []
            }
            return i(e, [{
                key: "handleHit",
                value: function(e) {
                    this.hitData = e, this.checkReady()
                }
            }, {
                key: "checkReady",
                value: function() {}
            }, {
                key: "handleManifest",
                value: function() {}
            }, {
                key: "handle",
                value: function() {}
            }]), e
        }(),
        O = function(e) {
            function t(e, n, r) {
                s(this, t);
                var i = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "dash"));
                return i.format = n, i.manifestUrl = e, i.meta = r, i
            }
            return o(t, I), i(t, [{
                key: "handleManifest",
                value: function(e) {
                    try {
                        if ("json" == this.format) {
                            var t = JSON.parse(e);
                            t && Array.isArray(t.video) && t.video.length > 0 && Array.isArray(t.video[0].segments) && t.video[0].segments.length > 0 && (this.mpd = t)
                        } else "xml" == this.format && (this.handler = g.dashManifest(this.manifestUrl, e, this.meta))
                    } catch (e) {
                        console.error("Error parsing DASH manifest", e.message || e)
                    }
                }
            }, {
                key: "checkReady",
                value: function() {
                    this.hitData && (this.mpd || this.handler) && this.handle()
                }
            }, {
                key: "pickAudioMpd",
                value: function() {
                    var e = [{
                            field: "codecs",
                            pref: "mp4a.40.2"
                        }, {
                            field: "format",
                            pref: "mp42"
                        }, {
                            field: "mime_type",
                            pref: "audio/mp4"
                        }, {
                            field: "channels",
                            pref: "@max"
                        }, {
                            field: "bitrate",
                            pref: "@max"
                        }, {
                            field: "sample_rate",
                            pref: "@max"
                        }],
                        t = [].concat(this.mpd.audio);
                    return t.sort(function(t, n) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            if (t[i.field] != n[i.field]) {
                                if ("@max" == i.pref) return n[i.field] - t[i.field];
                                if (t[i.field] == i.pref) return -1;
                                if (n[i.field] == i.pref) return 1
                            }
                        }
                        return 0
                    }), t[0]
                }
            }, {
                key: "handle",
                value: function() {
                    var e = m.hashHex(this.hitData.url),
                        t = this;
                    if (this.handler) this.handler(this.hitData);
                    else if (this.mpd) {
                        var n = t.mpd.audio && t.mpd.audio.length > 0 && Array.isArray(t.mpd.audio[0].segments) && t.mpd.audio[0].segments.length > 0,
                            r = t.mpd.video && t.mpd.video.length > 0 && Array.isArray(t.mpd.video[0].segments) && t.mpd.video[0].segments.length > 0,
                            i = this.mpd.video,
                            a = this.mpd.audio;
                        !r || n && "audio" == u.prefs.dashOnAdp ? (i = this.mpd.audio, a = null) : (!n || r && "video" == u.prefs.dashOnAdp) && (a = null), i.forEach(function(n, r) {
                            var i = {};
                            a ? (i.chunked = "dash-adp", i.audioMpd = t.pickAudioMpd(), i.videoMpd = n, i.audioUrl = new URL("dash-audio.mp4", t.hitData.url).href, i.videoUrl = new URL("dash-video.mp4", t.hitData.url).href, i.url = void 0) : i._mpd = n;
                            var o = Object.assign({}, t.hitData, {
                                id: "dash:" + e + "-" + r,
                                extension: "mp4",
                                bitrate: n.bitrate || n.avg_bitrate || null,
                                length: null,
                                chunked: "dash",
                                descrPrefix: u._("dash_streaming"),
                                group: "grp-" + e
                            }, i);
                            o._mpdCommonBaseUrl = t.mpd.base_url, n.width && n.height && (o.size = n.width + "x" + n.height), n.duration && (o.duration = Math.round(n.duration)), c.dispatch("hit.new", o)
                        })
                    }
                }
            }]), t
        }(),
        P = function(e) {
            function t(e, n) {
                s(this, t);
                var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "hls"));
                return r.masterFormat = n || "m3u8", r.mediaUrl = e, r
            }
            return o(t, I), i(t, [{
                key: "handleHit",
                value: function(e) {
                    e.group = "grp-" + m.hashHex(e.url), e.masterManifest = e.url, I.prototype.handleHit.call(this, e)
                }
            }, {
                key: "handleManifest",
                value: function(e) {
                    var t = null;
                    "m3u8" == this.masterFormat ? t = d.get(e, this.mediaUrl) : "json" == this.masterFormat && (t = d.getPsJson(e, this.mediaUrl)), t && (t.isMaster() ? this.master = t : t.isMedia() && (this.media = t))
                }
            }, {
                key: "checkReady",
                value: function() {
                    this.hitData && (this.master || this.media) && this.handle()
                }
            }, {
                key: "handle",
                value: function() {
                    this.master ? l.handleMaster(this.master, this.hitData) : this.media && l.handleMedia(this.media, this.hitData, this.mediaUrl)
                }
            }]), t
        }(),
        C = {},
        S = function(e) {
            function t(e) {
                s(this, t);
                var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "f4f"));
                n.f4fUrl = e;
                var r = new URL(e),
                    i = /^([^\?]*?)([^\/]*\?.*|[^\/]*)$/.exec(r.protocol + "//" + r.host + r.pathname)[1];
                return t.waitingForFrag[i] = n, n
            }
            return o(t, I), i(t, [{
                key: "checkReady",
                value: function() {
                    this.hitData && this.medias && this.startFrag && this.handle()
                }
            }, {
                key: "handleManifest",
                value: function(e) {
                    var t = (new DOMParser).parseFromString(e, "application/xml"),
                        n = t.querySelector("duration");
                    n && (this.duration = parseInt(n.firstChild.nodeValue));
                    var r = t.querySelectorAll("bootstrapInfo");
                    this.medias = {};
                    for (var i = 0; i < r.length; i++) {
                        var a = r.item(i),
                            o = a.getAttribute("id"),
                            s = a.firstChild && m.toByteArray(a.firstChild.nodeValue) || null;
                        this.medias[o] = {
                            bootstrap: s
                        }
                    }
                    var u = t.querySelectorAll("media");
                    for (i = 0; i < u.length; i++) {
                        var c = u.item(i),
                            l = c.getAttribute("bootstrapInfoId"),
                            d = this.medias[l];
                        if (d) {
                            d.bitrate = 1e3 * parseInt(c.getAttribute("bitrate")), d.urlHint = new URL(c.getAttribute("url"), this.f4fUrl).href;
                            var p = c.querySelector("metadata");
                            if (p) {
                                var h = p.firstChild && m.toByteArray(p.firstChild.nodeValue) || null;
                                if (h) {
                                    var g = f.decode(h);
                                    g && g.length >= 2 && "onMetaData" == g[0] && (d.meta = g[1])
                                }
                            }
                        }
                    }
                }
            }, {
                key: "handle",
                value: function() {
                    var e = "grp-" + m.hashHex(this.rootUrl || this.hitData.url);
                    for (var t in this.medias) {
                        var n = this.medias[t];
                        if (this.skipManifest)
                            if (c.getF4fHitDataByUrlHint(n.urlHint)) continue;
                        this.hitData.url = this.rootUrl || this.hitData.url;
                        var r = m.hashHex(this.hitData.url + t),
                            i = Object.assign({}, this.hitData, {
                                id: "f4f:" + r,
                                extension: "flv",
                                bitrate: n.bitrate,
                                _media: n,
                                length: null,
                                chunked: "f4f",
                                descrPrefix: u._("f4f_streaming"),
                                startFrag: this.startFrag,
                                postFrag: this.postFrag || "",
                                group: e
                            });
                        if (this.duration && (i.duration = this.duration), n.meta) {
                            var a = n.meta;
                            a.duration && (i.duration = Math.round(a.duration)), a.width && a.height && (i.size = a.width + "x" + a.height), a.filesize && (i.length = a.filesize), a.framerate && (i.fps = a.framerate)
                        }
                        c.dispatch("hit.new", i)
                    }
                }
            }], [{
                key: "getProbe",
                value: function(e) {
                    if (A.test(e.url)) return new t(e.url);
                    var n = _.exec(e.url);
                    if (n)
                        for (var r = e.url;;) {
                            var i = new URL(r);
                            if (!(r = /^(https?:\/\/[^\/]+\/.*?)(\/|[^\/]+)$/.exec(i.protocol + "//" + i.host + i.pathname))) {
                                var a = new t(e.url);
                                return a.startFrag = 1, a.postFrag = n[3], a.skipManifest = !0, a.rootUrl = n[1], a.medias = {}, a.medias[n[1]] = {
                                    urlHint: n[1]
                                }, a
                            }
                            r = r[1];
                            var o = t.waitingForFrag[r];
                            if (o) delete t.waitingForFrag[r];
                            else
                                for (var s in t.waitingForFrag) {
                                    var u = t.waitingForFrag[s];
                                    for (var l in u.medias) {
                                        if (u.medias[l].urlHint == r) {
                                            delete t.waitingForFrag[s], o = u;
                                            break
                                        }
                                    }
                                    if (o) break
                                }
                            if (o) return c.getF4fHitDataByUrlHint(n[1]) ? null : (o.startFrag || (o.startFrag = parseInt(n[2])), o.postFrag || (o.postFrag = n[3]), o.checkReady(), null)
                        }
                    return null
                }
            }, {
                key: "waitingForFrag",
                get: function() {
                    return C
                }
            }]), t
        }()
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();
    t.canStop = function(e) {
        var t = g[e];
        return !!t && t.recording
    }, t.stopRecording = function(e) {
        var t = g[e];
        if (!t) return;
        t.endRecording()
    }, t.handleMaster = function(e, t) {
        e.walkThrough(function(e, n) {
            var r = u.hashHex(e),
                i = "hls:" + r,
                a = g[i];
            a || (a = m(t, r, e, n), g[i] = a)
        })
    }, t.handleMedia = v, t.getChunkSet = function(e) {
        return g["hls:" + u.hashHex(e.url)] || null
    };
    var a = n(1),
        o = n(12),
        s = n(39),
        u = (n(59), n(5)),
        c = n(61),
        l = n(262),
        d = n(237),
        f = n(16),
        p = n(27),
        h = n(97),
        g = (h.Chunkset, h.Codecs, {});
    setInterval(function() {
        var e = [];
        for (var t in g) {
            o.getHit(t) ? e.push(g[t].chunks.length) : delete g[t]
        }
    }, 6e4);

    function m(e, t, n, r) {
        var i = "hls:" + t,
            s = Object.assign({}, e, {
                id: i,
                extension: a.prefs.hlsDownloadAsM2ts ? "m2ts" : "mp4",
                hls: r,
                url: n,
                length: null,
                chunked: "hls",
                durationFloat: 0
            });
        s.mediaManifest = n;
        var u = r["EXT-X-MEDIA"];
        u && (s.quality = u.NAME || s.quality);
        var c = r["EXT-X-STREAM-INF"];
        return c && (s.size = c.RESOLUTION || s.size, s.bitrate = parseInt(c.BANDWIDTH) || s.bitrate), o.dispatch("hit.new", s), new y(s)
    }

    function v(e, t, n) {
        var r = u.hashHex(n),
            i = g["hls:" + r];
        i || (i = m(t, r, n, {}), g["hls:" + r] = i);
        var a = o.getHit("hls:" + r);
        if (a) {
            var c = 0;
            i.chunkDuration = 1e3, e.walkThrough(function(t, n) {
                var r = n.EXTINF;
                if (r) {
                    var o = Math.round(1e3 * parseFloat(r));
                    o > i.chunkDuration && (i.chunkDuration = o)
                }
                var s = u.hashHex(t);
                if (!(s in i.chunksMap)) {
                    c++, i.chunksMap[s] = 1;
                    var l = {
                            url: t,
                            index: i.chunks.length
                        },
                        d = n["EXT-X-KEY"];
                    d && "NONE" != d.METHOD && (l.encrypt = d, l.iv = parseInt(e.tags["EXT-X-MEDIA-SEQUENCE"] || "0") + l.index), i.chunks.push(l), r && (a.durationFloat += parseFloat(r), a.duration = Math.round(a.durationFloat))
                }
            }), s.update(a.id, {
                durationFloat: a.durationFloat,
                duration: a.duration
            }), c > 0 && (i.segmentsCount += c, i.handle())
        }
    }
    var y = function(e) {
        function t(e) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                r = u.hashHex(e.url);
            return n.id = "hls:" + r, n.hit = Object.assign({}, e, {
                chunked: "hls",
                descrPrefix: a._("hls_streaming")
            }), n.chunksMap = {}, n.chunks = [], n.segmentsCount = 0, n.doNotReportDownloadChunkErrors = !0, o.dispatch("hit.new", n.hit), n
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, l.MP2TChunkset), i(t, [{
            key: "download",
            value: function(e, t, n, r, i) {
                var o = this;
                this.aborted = !1, this.action = e, this.specs = t, this.successFn = function() {
                    n.apply(o, arguments)
                }, this.errorFn = function() {
                    r.apply(o, arguments)
                }, this.progressFn = i, this.downloadTarget = t[0].fileName, this.nextTrackId = 1, this.processedSegmentsCount = 0, this.recording = !0, this.masked = !!e.masked, this.masked && (this.biniv = e.biniv, this.cryptoKey = e.cryptoKey), this.segmentsCount || this.requestMediaManifest(), a.prefs.hlsDownloadAsM2ts ? (o.recording = !0, o.handle()) : c.writeFileHeader(this, function(e) {
                    e ? r(e) : (o.recording = !0, o.handle())
                }), e.hit.abortFn = function() {
                    o.actionAbortFn(o.downloadTarget + ".part")
                }
            }
        }, {
            key: "downloadChunk",
            value: function(e, t) {
                e.encrypt ? this.downloadEncryptedChunk(e, t) : l.MP2TChunkset.prototype.downloadChunk.call(this, e, t)
            }
        }, {
            key: "downloadEncryptedChunk",
            value: function(e, t) {
                var n = this;

                function i(r, i, a) {
                    if (r) return t.call(n, r, e);
                    l.MP2TChunkset.prototype.downloadChunk.call(n, e, function(r) {
                        if (r) return t.call(n, r, e);
                        crypto.subtle.decrypt({
                            name: "AES-CBC",
                            iv: a
                        }, i, e.data).then(function(r) {
                            e.data = new Uint8Array(r), t.call(n, null, e)
                        }).catch(function(r) {
                            t.call(n, r, e)
                        })
                    })
                }
                if ("AES-128" != e.encrypt.METHOD) return t.call(this, new Error("HLS encryption method " + e.encrypt.METHOD + " is not supported"), e);
                if (!e.encrypt.URI) return t.call(this, new Error("HLS encryption missing key URI"), e);
                var o = parseInt(e.encrypt.IV || e.iv),
                    s = new Uint8Array(16);
                f.WriteInt32(s, 12, o), this.keys || (this.keys = {}), Array.isArray(this.keys[e.encrypt.URI]) ? this.keys[e.encrypt.URI].push(function(e, t) {
                    i.call(n, e, t, s)
                }) : "object" == r(this.keys[e.encrypt.URI]) ? i(null, this.keys[e.encrypt.URI], s) : (this.keys[e.encrypt.URI] = [function(e, t) {
                    i.call(n, e, t, s)
                }], a.prefs.chunkedCoappDataRequests ? p.requestBinary(e.encrypt.URI, {
                    headers: n.hit.headers || [],
                    proxy: a.prefs.coappUseProxy && n.hit.proxy || null
                }).then(function(r) {
                    crypto.subtle.importKey("raw", r, "aes-cbc", !0, ["decrypt"]).then(function(t) {
                        var r = n.keys[e.encrypt.URI];
                        n.keys[e.encrypt.URI] = t, r.forEach(function(e) {
                            e(null, t)
                        })
                    }).catch(function(r) {
                        t.call(n, r, e)
                    })
                }).catch(function(r) {
                    t.call(n, r, e)
                }) : u.downloadToByteArray(e.encrypt.URI, {}, !0, !1, function(r, i) {
                    if (r) return t.call(n, r, e);
                    crypto.subtle.importKey("raw", i, "aes-cbc", !0, ["decrypt"]).then(function(t) {
                        var r = n.keys[e.encrypt.URI];
                        n.keys[e.encrypt.URI] = t, r.forEach(function(e) {
                            e(null, t)
                        })
                    }).catch(function(r) {
                        t.call(n, r, e)
                    })
                }))
            }
        }, {
            key: "outOfChunks",
            value: function() {
                var e, t = this,
                    n = 2 * Math.max(t.chunkDuration, 5e3);
                this.requestMediaManifest(), setTimeout(function() {
                    t.requestMediaManifest()
                }, n / 2), this.endTimer && clearTimeout(this.endTimer), e = this.segmentsCount, t.endTimer = setTimeout(function() {
                    t.recording && e == t.segmentsCount && l.MP2TChunkset.prototype.outOfChunks.call(t)
                }, n)
            }
        }, {
            key: "requestMediaManifest",
            value: function() {
                if (this.hit && this.recording) {
                    var e = this;
                    a.prefs.chunkedCoappManifestsRequests || p.isProbablyAvailable() ? p.request(e.hit.url, {
                        headers: e.hit.headers || [],
                        proxy: a.prefs.coappUseProxy && e.hit.proxy || null
                    }).then(function(t) {
                        var n = d.get(t, e.hit.url);
                        n && n.isMedia() && v(n, e.hit, e.hit.url)
                    }).catch(function(t) {
                        console.warn("media manifest request for", e.hit.url, "failed:", t.message), e.endRecording()
                    }) : u.request({
                        url: e.hit.url,
                        isPrivate: e.hit.isPrivate,
                        headers: e.hit.headers || null,
                        onComplete: function(t) {
                            if (200 == t.status && e.hit.url) {
                                var n = d.get(t.text, e.hit.url);
                                if (n && n.isMedia()) return void v(n, e.hit, e.hit.url)
                            }
                        }
                    })
                }
            }
        }, {
            key: "endRecording",
            value: function(e) {
                this.recording && (this.recording = !1, this.finalize(e || null, function(e) {}))
            }
        }, {
            key: "finalize",
            value: function(e, t) {
                l.MP2TChunkset.prototype.finalize.call(this, e, t), delete g[this.id]
            }
        }, {
            key: "mediaTimeoutTriggered",
            value: function() {
                this.endRecording()
            }
        }, {
            key: "setNewId",
            value: function() {
                this.id;
                delete g[this.id], l.MP2TChunkset.prototype.setNewId.call(this), g[this.id] = this, this.requestMediaManifest()
            }
        }]), t
    }()
}, function(e, t, n) {
    "use strict";
    var r = new RegExp("^#(EXT[^\\s:]+)(?::(.*))"),
        i = new RegExp('^\\s*([^=\\s]+)\\s*=\\s*(?:"([^"]*?)"|([^,]*)),?s*(.*?)s*$'),
        a = new RegExp('^\\s*"(.*)"\\s*$');

    function o() {}

    function s() {}
    o.prototype = {
        init: function() {
            this.tags = {}, this.segments = [], this.valid = !1
        },
        parse: function(e, t) {
            var n = e.split(/[\r\n]+/);
            if (0 != n.length && "#EXTM3U" == n[0].trim()) {
                this.master = !0;
                for (var i = [], a = {}, o = 1; o < n.length; o++) {
                    var s = n[o].trim();
                    if ("" != s)
                        if ("#" == s[0]) {
                            if (0 != s.indexOf("#EXT")) continue;
                            var u = r.exec(s);
                            if (!u) continue;
                            "EXTINF" == u[1] && (this.master = !1), a[u[1]] = u[2]
                        } else i.push({
                            url: new URL(s, t).href,
                            tags: Object.assign({}, a)
                        })
                }
                if (0 != i.length) {
                    for (var c in i[0].tags) {
                        var l = i[0].tags[c],
                            d = !0;
                        for (o = 1; o < i.length; o++) {
                            if ((f = i[o]).tags[c] !== l) {
                                d = !1;
                                break
                            }
                        }
                        d && (this.tags[c] = this.parseAttrs(l))
                    }
                    for (o = 0; o < i.length; o++) {
                        var f, p = {
                            url: (f = i[o]).url,
                            tags: {}
                        };
                        for (var c in f.tags) void 0 === this.tags[c] && (p.tags[c] = this.parseAttrs(f.tags[c]));
                        this.segments.push(p)
                    }
                    this.valid = !0
                }
            }
        },
        parseAttrs: function(e) {
            if (r = a.exec(e)) return r[1];
            if (e.indexOf("=") < 0) return e;
            for (var t = {}, n = e; n.length > 0;) {
                var r;
                if (!(r = i.exec(n))) break;
                var o = r[1],
                    s = r[2] || r[3];
                t[o] = s, n = r[4]
            }
            return t
        },
        isMaster: function() {
            return this.valid && this.master
        },
        isMedia: function() {
            return this.valid && !this.master
        },
        walkThrough: function(e) {
            var t = this;
            this.segments.forEach(function(n, r) {
                e(n.url, Object.assign({}, t.tags, n.tags), r)
            })
        }
    }, s.prototype = new o, s.prototype.parse = function(e, t) {
        try {
            var n = 0 == t.indexOf("https"),
                r = JSON.parse(e);
            r.hls_url && !n && this.segments.push({
                url: r.hls_url,
                tags: {}
            }), r.https_hls_url && n && this.segments.push({
                url: r.https_hls_url,
                tags: {}
            }), this.segments.length > 0 && (this.valid = !0, this.master = !0)
        } catch (e) {}
    }, t.get = function(e, t) {
        var n = new o;
        return n.init(), n.parse(e, t), n.valid && n.tags && n.tags["EXT-X-KEY"] && n.tags["EXT-X-KEY"].URI && (n.tags["EXT-X-KEY"].URI = new URL(n.tags["EXT-X-KEY"].URI, t).href), n.valid && n || null
    }, t.getPsJson = function(e, t) {
        var n = new s;
        return n.init(), n.parse(e, t), n.valid && n || null
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getHitsFromVariants = function(e, t, n) {
        n = n || {};
        var i = {},
            s = {},
            u = r.prefs.ignoreProtectedVariants,
            c = !0;
        t.forEach(function(t) {
            if (t.url && !(u && !n.keepProtected && t.s && t.s.length > 0)) {
                i[t.itag] = t;
                var o = e.from + ":" + t.itag,
                    d = "audio/video",
                    f = null,
                    p = null,
                    h = null,
                    g = l.variants.full[o];
                if (g) {
                    if (!g.enabled) return;
                    g.audioCodec && (f = g.audioCodec, d = "audio"), g.videoCodec && (p = g.videoCodec, d = f ? "audio/video" : "video"), h = g.extension
                } else if (void 0 !== t.type || void 0 !== t.mimeType) {
                    var m = a.exec(t.type || t.mimeType);
                    if (m)
                        if (h = m[2], "audio" == m[1]) d = "audio", f = m[3] || null, /vorbis|opus/i.test(f) && (h = "webm");
                        else if (m[3]) {
                        var v = m[3].split(",");
                        1 == v.length ? (d = "video", p = v[0], /vp8|vp9/i.test(p) && (h = "webm")) : (p = v[0], f = v[1])
                    } else "video" == m[1] && (d = "video")
                }
                if (h = h || "mp4", "audio/video" === d) {
                    var y = {
                        id: e.from + ":" + e.videoId + ":" + t.itag,
                        url: t.url,
                        extension: h
                    };
                    t.quality && (y.quality = t.quality), f && (y.audioCodec = f), p && (y.videoCodec = p), t.size && (y.size = t.size), t.fps && (y.fps = t.fps), t.s && (y._signature = t.s), s[o] = y;
                    var g = l.variants.full[o];
                    if (void 0 === g) {
                        l.variants.full[o] = {
                            extension: h,
                            quality: t.quality,
                            audioCodec: f,
                            videoCodec: p,
                            enabled: !0
                        }, c = !0;
                        var b = [];
                        if (b.push("(" + o + ")"), t.quality) {
                            var w = "quality_" + t.quality,
                                k = r._(w);
                            k == w && (k = t.quality.toUpperCase()), b.push(k)
                        }
                        t.size && b.push(t.size), b.push(h.toUpperCase()), p && b.push("V/" + p), f && b.push("A/" + f), l.variants.full[o].label = b.join(" - "), l.variants.full_list.push(o)
                    } else !t.size && g.size && (y.size = g.size)
                } else {
                    var x, A;
                    if ("audio" == d ? (x = "adp_audio", A = "adp_video") : (x = "adp_video", A = "adp_audio"), void 0 === l.variants[x][t.itag]) {
                        var _ = {
                            extension: h
                        };
                        for (var I in t.size && (_.size = t.size), t.bitrate && (_.bitRate = t.bitrate), t.fps && (_.fps = t.fps), c = !0, l.variants[x][t.itag] = _, l.variants[A]) "audio" == d ? l.variants.adp_list.push(I + "/" + t.itag) : l.variants.adp_list.push(t.itag + "/" + I);
                        "audio" == d ? (l.variants[x][t.itag].codec = f, l.variants.adp_list.push("/" + t.itag)) : (l.variants[x][t.itag].codec = p, l.variants.adp_list.push(t.itag + "/"))
                    }
                }
            }
        });
        for (var f = e.maxVariants || r.prefs.qualitiesMax, p = 0, h = [], g = null, m = 0; m < l.variants.full_list.length && (!f || p < f); m++) {
            var v = l.variants.full_list[m],
                y = /^adp:([0-9]+)$/.exec(v);
            if (y) {
                if (r.prefs.adpHide) continue;
                g || (g = [], l.variants.adp_list.forEach(function(t) {
                    if (!n.audioAndVideo || /^\d+\/\d+$/.test(t)) {
                        var r = o.exec(t);
                        if ((!(r[1].length > 0) || i[r[1]]) && (!(r[1].length > 0 && l.variants.adp_video[r[1]] && "vp9" == l.variants.adp_video[r[1]].codec && l.converter) || l.converter.vp9support) && (!(r[2].length > 0) || i[r[2]])) {
                            var a = i[r[1]],
                                s = i[r[2]],
                                u = {
                                    id: e.from + ":" + e.videoId + ":" + t,
                                    _signature: []
                                },
                                c = 0,
                                d = null,
                                f = null;
                            a && (u.videoUrl = a.url, a.clen && (c += parseInt(a.clen)), s || (u.url = u.videoUrl), a.s && u._signature.push(a.s), d = l.variants.adp_video[r[1]], u.extension = a.extension || (d ? d.extension : void 0), a.size && (u.size = a.size), !u.size && d && d.size && (u.size = d.size), a.fps && (u.fps = a.fps), !u.fps && d && d.fps && (u.fps = d.fps)), s && (f = l.variants.adp_audio[r[2]], u.audioUrl = s.url, s.clen && (c += parseInt(s.clen)), a || (u.url = u.audioUrl, u.extension = s.extension), s.s && u._signature.push(s.s)), f && d && f.extension != d.extension && (u.extension = "mkv"), c && (u.length = c), u.group = e.group, g.push(u)
                        }
                    }
                }));
                var b = parseInt(y[1]) - 1;
                b < g.length && (h[p++] = Object.assign({
                    order: p,
                    adp: !0
                }, e, g[b]))
            } else s[v] && (h[p++] = Object.assign({
                order: p
            }, e, s[v]))
        }
        c && d();
        return h
    }, t.getVariantsList = f, t.setVariantsList = p, t.setVariants = function(e) {
        l.variants = e, d()
    }, t.getAdpVariantsList = h, t.setAdpVariantsList = g, t.orderAdaptative = function() {
        l.variants.adp_list.sort(function(e, t) {
            var n = s.exec(e),
                r = s.exec(t),
                i = l.variants.adp_video[n[1]],
                a = l.variants.adp_video[r[1]],
                o = l.variants.adp_audio[n[2]],
                u = l.variants.adp_audio[r[2]],
                c = i && parseInt(i.size) || 0,
                d = a && parseInt(a.size) || 0,
                f = o ? 1 : 0,
                p = u ? 1 : 0;
            return d * p - c * f
        })
    }, t.hasAudioVideo = function(e) {
        var t = {
                audio: !1,
                video: !1
            },
            n = l.variants.full[e];
        n && (t.audio = !!n.audioCodec, t.video = !!n.videoCodec);
        return t
    };
    var r = n(1),
        i = r.browser,
        a = new RegExp('^(audio|video)/(?:x\\-)?([^;]+)(?:;(?:\\+| )codecs="(.+)")?$'),
        o = new RegExp("^([0-9]*)/([0-9]*)$"),
        s = new RegExp("^(.*)/(.*)$"),
        u = new RegExp("^adp:[0-9]+$");
    r.rpc.listen({
        editVariants: function() {
            r.ui.open("variants-edit", {
                type: "tab",
                url: "content/variants-edit.html"
            })
        },
        getVariantsLists: function() {
            return {
                full: f(),
                adp: h()
            }
        },
        setVariantsLists: function(e) {
            return e.full && p(e.full), e.adp && g(e.adp), d()
        },
        resetVariants: function() {
            return l.variants = c, d()
        }
    });
    var c = {
            full: {
                "tbvws:22": {
                    extension: "mp4",
                    quality: "hd720",
                    audioCodec: "+mp4a.40.2",
                    videoCodec: "avc1.64001F",
                    enabled: !0,
                    label: "MP4 - 1280x720",
                    size: "1280x720"
                },
                "tbvws:18": {
                    extension: "mp4",
                    quality: "medium",
                    audioCodec: "+mp4a.40.2",
                    videoCodec: "avc1.42001E",
                    enabled: !0,
                    label: "MP4 - 480x360",
                    size: "480x360"
                },
                "tbvws:43": {
                    extension: "webm",
                    quality: "medium",
                    audioCodec: "+vorbis",
                    videoCodec: "vp8.0",
                    enabled: !0,
                    label: "WEBM - 480x360",
                    size: "480x360"
                },
                "tbvws:5": {
                    extension: "flv",
                    quality: "small",
                    audioCodec: null,
                    videoCodec: null,
                    enabled: !0,
                    label: "FLV - 320x240",
                    size: "320x240"
                },
                "tbvws:36": {
                    extension: "3gpp",
                    quality: "small",
                    audioCodec: "+mp4a.40.2",
                    videoCodec: "mp4v.20.3",
                    enabled: !0,
                    label: "3GPP - 320x240",
                    size: "320x240"
                },
                "tbvws:17": {
                    extension: "3gpp",
                    quality: "small",
                    audioCodec: "+mp4a.40.2",
                    videoCodec: "mp4v.20.3",
                    enabled: !0,
                    label: "3GPP - 176x144",
                    size: "176x144"
                },
                "tfvws:1080-0": {
                    extension: "mp4",
                    audioCodec: null,
                    videoCodec: null,
                    enabled: !0,
                    size: "1920x1080",
                    label: "H264_1920x1080 -MP4"
                },
                "tfvws:720-0": {
                    extension: "mp4",
                    audioCodec: null,
                    videoCodec: null,
                    enabled: !0,
                    size: "1280x720",
                    label: "H264_1280x720 -MP4"
                },
                "tfvws:480-0": {
                    extension: "mp4",
                    audioCodec: null,
                    videoCodec: null,
                    enabled: !0,
                    size: "848x480",
                    label: "H264_848x480 -MP4"
                },
                "tfvws:380-0": {
                    extension: "mp4",
                    audioCodec: null,
                    videoCodec: null,
                    enabled: !0,
                    size: "512x384",
                    label: "H264_512x384 -MP4"
                },
                "tfvws:240-0": {
                    extension: "mp4",
                    audioCodec: null,
                    videoCodec: null,
                    enabled: !0,
                    size: "320x240",
                    label: "H264_320x240 -MP4"
                }
            },
            full_list: ["tbvws:22", "tbvws:18", "adp:1", "tbvws:5", "tbvws:17", "adp:2", "tbvws:43", "tbvws:36", "tfvws:1080-0", "tfvws:720-0", "tfvws:480-0", "tfvws:380-0", "tfvws:240-0", "adp:3", "adp:4"],
            adp_audio: {
                139: {
                    extension: "mp4",
                    bitRate: "48429",
                    codec: "mp4a.40.5"
                },
                140: {
                    extension: "mp4",
                    bitRate: "127856",
                    codec: "mp4a.40.2"
                },
                171: {
                    extension: "webm",
                    bitRate: "133658",
                    fps: "1",
                    codec: "vorbis"
                }
            },
            adp_video: {
                133: {
                    extension: "mp4",
                    size: "320x240",
                    bitRate: "248086",
                    fps: "30",
                    codec: "avc1.4d400d"
                },
                134: {
                    extension: "mp4",
                    size: "640x360",
                    bitRate: "338730",
                    fps: "30",
                    codec: "avc1.4d401e"
                },
                135: {
                    extension: "mp4",
                    size: "854x480",
                    bitRate: "721213",
                    fps: "30",
                    codec: "avc1.4d401f"
                },
                136: {
                    extension: "mp4",
                    size: "1280x720",
                    bitRate: "1124376",
                    fps: "30",
                    codec: "avc1.4d401f"
                },
                137: {
                    extension: "mp4",
                    size: "1920x1080",
                    bitRate: "4137966",
                    fps: "30",
                    codec: "avc1.640028"
                },
                160: {
                    extension: "mp4",
                    size: "192x144",
                    bitRate: "111449",
                    fps: "15",
                    codec: "avc1.4d400c"
                },
                242: {
                    extension: "webm",
                    size: "320x240",
                    bitRate: "180842",
                    fps: "1",
                    codec: "vp9"
                },
                243: {
                    extension: "webm",
                    size: "320x240",
                    bitRate: "332350",
                    fps: "1",
                    codec: "vp9"
                },
                244: {
                    extension: "webm",
                    size: "854x480",
                    bitRate: "419080",
                    fps: "30",
                    codec: "vp9"
                },
                247: {
                    extension: "webm",
                    size: "1280x720",
                    bitRate: "877134",
                    fps: "30",
                    codec: "vp9"
                },
                248: {
                    extension: "webm",
                    size: "1920x1080",
                    bitRate: "2835123",
                    fps: "30",
                    codec: "vp9"
                },
                264: {
                    extension: "mp4",
                    size: "2560x1440",
                    bitRate: "9957081",
                    fps: "25",
                    codec: "avc1.640032"
                },
                266: {
                    extension: "mp4",
                    size: "3840x2160",
                    bitRate: "22215059",
                    fps: "25",
                    codec: "avc1.640033"
                },
                271: {
                    extension: "webm",
                    size: "2560x1440",
                    bitRate: "9227182",
                    fps: "25",
                    codec: "vp9"
                },
                278: {
                    extension: "webm",
                    size: "256x144",
                    bitRate: "96779",
                    fps: "1",
                    codec: "vp9"
                },
                298: {
                    extension: "mp4",
                    size: "1280x720",
                    bitRate: "3317977",
                    fps: "60",
                    codec: "avc1.4d4020"
                },
                299: {
                    extension: "mp4",
                    size: "1920x1080",
                    bitRate: "5546416",
                    fps: "60",
                    codec: "avc1.64002a"
                },
                302: {
                    extension: "webm",
                    size: "1280x720",
                    bitRate: "3752347",
                    fps: "60",
                    codec: "vp9"
                },
                303: {
                    extension: "webm",
                    size: "1920x1080",
                    bitRate: "6088401",
                    fps: "60",
                    codec: "vp9"
                },
                313: {
                    extension: "webm",
                    size: "3840x2160",
                    bitRate: "22856955",
                    fps: "25",
                    codec: "vp9"
                }
            },
            adp_list: ["266/140", "264/140", "137/140", "136/140", "266/171", "264/171", "137/171", "136/171", "248/140", "248/171", "299/140", "299/171", "303/140", "303/171", "247/140", "247/171", "298/140", "298/171", "302/140", "302/171", "135/140", "135/171", "244/140", "244/171", "134/140", "134/171", "133/140", "243/171", "242/140", "243/140", "242/171", "133/171", "278/140", "278/171", "160/140", "160/171", "264/", "133/", "242/", "243/", "160/", "/140", "/171", "136/", "247/", "135/", "244/", "134/", "137/", "248/", "278/", "299/", "303/", "298/", "302/", "266/", "313/140", "313/171", "313/", "271/140", "271/171", "271/"]
        },
        l = {
            variants: {}
        };

    function d() {
        return i.storage.local.set({
            variants: l.variants
        }).catch(function(e) {
            console.error("Cannot write variants storage")
        })
    }

    function f() {
        var e = [],
            t = r.prefs.adaptativeCount,
            n = 1;
        for (l.variants.full_list.forEach(function(i) {
                if (u.test(i)) {
                    if (n > t) return;
                    e.push({
                        id: "adp:" + n,
                        label: r._("adaptative", n)
                    }), n++
                } else {
                    var a = l.variants.full[i];
                    a && e.push({
                        id: i,
                        label: a.label,
                        enabled: a.enabled
                    })
                }
            }); n <= t; n++) e.push({
            id: "adp:" + n,
            label: r._("adaptative", n)
        });
        return e
    }

    function p(e) {
        l.variants.full_list = [], e.forEach(function(e) {
            l.variants.full_list.push(e.id), u.test(e.id) || (l.variants.full[e.id].enabled = e.enabled)
        })
    }

    function h() {
        var e = [];
        return l.variants.adp_list.forEach(function(t) {
            var n = s.exec(t);
            if (t) {
                var i = l.variants.adp_video[n[1]],
                    a = l.variants.adp_audio[n[2]];
                if (i || a) {
                    var o = [];
                    i && !a ? (o.push(r._("video_only")), o.push(i.extension.toUpperCase())) : !i && a ? (o.push(r._("audio_only")), o.push(a.extension.toUpperCase())) : o.push(i.extension.toUpperCase()), i && (i.size && o.push(i.size), i.fps && o.push(i.fps + " fps"), i.codec && o.push(i.codec)), a && a.codec && o.push(a.codec), e.push({
                        id: t,
                        label: o.join(" - ")
                    })
                }
            }
        }), e
    }

    function g(e) {
        l.variants.adp_list = [], e.forEach(function(e) {
            l.variants.adp_list.push(e.id)
        })
    }
    i.storage.local.get({
        variants: c
    }).then(function(e) {
        l.variants = e.variants
    }).catch(function(e) {
        console.error("Cannot read variants storage")
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const r = n(269);
    t.api = r
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.domainsFromHit = h, t.getAllDomains = function() {
        return Object.keys(u)
    }, t.addToBlacklist = g, t.removeFromBlacklist = m, t.checkHitBlacklisted = v, t.set = y;
    var r = n(1),
        i = r.browser,
        a = n(12),
        o = n(239).api,
        s = new RegExp("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"),
        u = {};
    i.storage.local.get({
        blacklist: {}
    }).then(function(e) {
        u = e.blacklist
    }).catch(function(e) {
        console.error("Cannot read blacklist storage")
    });
    var c = null;

    function l() {
        c = null, i.storage.local.set({
            blacklist: u
        }).catch(function(e) {
            console.error("Cannot write blacklist storage")
        })
    }

    function d() {
        c && clearTimeout(c), c = setTimeout(l, 100)
    }

    function f(e) {
        var t = [],
            n = /^https?:\/\/([^\/:]+)/.exec(e);
        if (n)
            if (s.test(n[1])) t.push(n[1]);
            else
                for (var r = n[1].split("."); r.length > 1 && ("co" != r[0] || r.length > 2);) t.push(r.join(".")), r.shift();
        return t
    }

    function p(e) {
        var t = [];
        e.url && (t = t.concat(f(e.url))), e.audioUrl && (t = t.concat(f(e.audioUrl))), e.videoUrl && (t = t.concat(f(e.videoUrl))), e.topUrl && (t = t.concat(f(e.topUrl))), e.pageUrl && (t = t.concat(f(e.pageUrl)));
        var n = {};
        return t.forEach(function(e) {
            n[e] = 1
        }), n
    }

    function h(e) {
        return function(e) {
            var t = Object.keys(e);
            return t.sort(function(e, t) {
                for (var n = e.split(".").reverse(), r = t.split(".").reverse();;) {
                    if (n.length && !r.length) return -1;
                    if (!n.length && r.length) return 1;
                    if (!n.length && !r.length) return 0;
                    var i = n.shift(),
                        a = r.shift();
                    if (i != a) return i < a ? -1 : 1
                }
            }), t
        }(p(e))
    }

    function g(e) {
        e.forEach(function(e) {
            u[e] = !0, o && o.blacklistAdded(e)
        });
        var t = [],
            n = a.getHits();
        Object.keys(n).forEach(function(e) {
            v(n[e]) && t.push(e)
        }), t.length > 0 && a.dispatch("hit.delete", t), d()
    }

    function m(e) {
        e.forEach(function(e) {
            delete u[e]
        }), d()
    }

    function v(e) {
        if (!r.prefs.blacklistEnabled) return !1;
        var t = p(e);
        for (var n in t)
            if (u[n]) return !0;
        return !1
    }

    function y(e) {
        u = e || {}, d()
    }
    r.rpc.listen({
        domainsFromHitId: function(e) {
            var t = a.getHit(e);
            return t && h(t) || []
        },
        addToBlacklist: g,
        removeFromBlacklist: m,
        setBlacklist: function(e) {
            return y(e)
        },
        getBlacklist: function() {
            return Object.keys(u).filter(function(e) {
                return !!u[e]
            })
        },
        editBlacklist: function() {
            r.ui.open("blacklist-edit", {
                type: "tab",
                url: "content/blacklist-edit.html"
            })
        }
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(1),
        i = r.browser,
        a = n(12),
        o = n(5),
        s = n(242),
        u = ".vdh-mask { position: absolute; display: none; background-color: rgba(255,0,0,0.5); z-index: 2147483647; }";

    function c(e) {
        var t, n = {
                extensions: r.prefs.medialinkExtensions,
                maxHits: r.prefs.medialinkMaxHits,
                minFilesPerGroup: r.prefs.medialinkMinFilesPerGroup,
                minImgSize: r.prefs.medialinkMinImgSize,
                scanImages: r.prefs.medialinkScanImages,
                scanLinks: r.prefs.medialinkScanLinks
            },
            a = [{
                code: "var _$vdhParams = " + JSON.stringify(n)
            }];
        e && a.unshift(e), (t = i.tabs).executeScript.apply(t, a).then(function() {
            return i.tabs.insertCSS({
                code: u
            })
        }).then(function() {
            return i.tabs.executeScript({
                file: "/content/gallery-script.js"
            })
        }).catch(function(e) {
            console.error("analyzePage error", e)
        })
    }

    function l(e) {
        return ".vdh-mask." + e + " { display: block; }"
    }
    t.analyzePage = c, r.rpc.listen({
        analyzePage: function() {
            c()
        },
        galleryGroups: function(e) {
            Object.keys(e.groups).forEach(function(t) {
                var n = e.groups[t],
                    i = "??",
                    u = "??";
                try {
                    u = new URL(n.baseUrl).hostname
                } catch (e) {}
                switch (n.type) {
                    case "image":
                        i = r._("gallery_from_domain", u);
                        break;
                    case "link":
                        i = r._("gallery_links_from_domain", u)
                }
                var c = void 0;
                if (n.extensions) {
                    var l = Object.keys(n.extensions);
                    l.sort(function(e, t) {
                        return n.extensions[e] - n.extensions[t]
                    });
                    var d = [];
                    l.forEach(function(e) {
                        var t = r._("number_type", ["" + n.extensions[e], e.toUpperCase()]);
                        d.push(t)
                    }), c = r._("gallery_files_types", d.length > 0 && d.join(", ") || "" + n.urls.length)
                }
                var f = "gallery:" + o.hashHex(e.pageUrl) + ":" + t;
                a.dispatch("hit.new", Object.assign({}, n, {
                    id: f,
                    topUrl: e.pageUrl,
                    title: i,
                    description: c,
                    mouseTrack: !0
                })), s.getProxyHeaders(e.pageUrl).then(function(e) {
                    a.dispatch("hit.update", {
                        id: f,
                        changes: e
                    })
                })
            })
        },
        galleryHighlight: function(e, t) {
            var n = a.getHit(t);
            n && i.tabs.insertCSS(n.tabId, {
                frameId: n.frameId,
                code: l(e)
            })
        },
        galleryUnhighlight: function(e, t) {
            var n = a.getHit(t);
            n && (i.tabs.removeCSS ? i.tabs.removeCSS(n.tabId, {
                frameId: n.frameId,
                code: l(e)
            }) : i.tabs.insertCSS(n.tabId, {
                frameId: n.frameId,
                code: function(e) {
                    return ".vdh-mask." + e + " { display: none; }"
                }(e)
            }))
        }
    }), i.tabs.onUpdated.addListener(function(e, t, n) {
        "complete" === t.status && r.prefs.medialinkAutoDetect && c(e)
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getProxyHeaders = function(e) {
        function t() {
            var t = U[e];
            t && (t.handlers.forEach(function(e) {
                e.reject(new Error("timeout monitoring proxyHeaders"))
            }), delete U[e])
        }
        var n = U[e];
        n ? clearTimeout(n.timer) : n = U[e] = {
            handlers: []
        };
        return new Promise(function(r, i) {
            n.handlers.push({
                resolve: r,
                reject: i
            }), n.timer = setTimeout(t, 3e4);
            var a = new XMLHttpRequest;
            a.open("HEAD", e), a.send()
        })
    };
    var r = n(1),
        i = n(12),
        a = n(39),
        o = n(5),
        s = n(63),
        u = n(235),
        c = n(62),
        l = n(272),
        d = r.browser,
        f = new RegExp("^bytes [0-9]+-[0-9]+/([0-9]+)$"),
        p = new RegExp("^(audio|video)/(?:x-)?([^; ]+)"),
        h = new RegExp('filename\\s*=\\s*"\\s*([^"]+?)\\s*"'),
        g = new RegExp("/([^/]+?)(?:\\.([a-z0-9]{1,5}))?(?:\\?|#|$)", "i"),
        m = new RegExp("\\.([a-z0-9]{1,5})(?:\\?|#|$)", "i"),
        v = new RegExp("\\bsource=yt_otf\\b"),
        y = new RegExp("/ptracking\\b"),
        b = new RegExp("^https://www.gstatic.com/youtube/doodle\\b"),
        w = new RegExp("^https?://[^/]*\\bfbcdn\\b.*bytestart="),
        k = new RegExp("^(https?)://v[^\\/]*\\.tumblr\\.com/(tumblr_[0-9a-zA-Z_]+)\\.(?:mp4|mov)"),
        x = {},
        A = {
            host: !0,
            range: !0
        };

    function _() {
        x = {}, r.prefs.mediaExtensions.split("|").forEach(function(e) {
            x[e] = 1
        })
    }
    _(), r.prefs.on("mediaExtensions", _);
    var I = null;

    function O() {
        I = null;
        var e = r.prefs.networkFilterOut;
        if (e) try {
            I = new RegExp(e, "i")
        } catch (e) {}
    }
    O(), r.prefs.on("networkFilterOut", O);
    var P = function(e) {
        var t;
        if (E && (t = E[e.requestId]) && delete E[e.requestId], !(e.tabId < 0)) {
            var n = c.networkHook(e.url, e) || l.networkHook(e.url, e, t, R && R[e.requestId]),
                _ = !!n;
            if (_ || !(v.test(e.url) || y.test(e.url) || b.test(e.url) || I && I.test(e.url))) {
                var O = {};
                (e.responseHeaders || []).forEach(function(e) {
                    O[e.name.toLowerCase()] = e.value
                });
                var P = O["content-type"],
                    C = p.exec(P),
                    S = parseInt(O["content-length"]) || null;
                if (_ || "0" !== S) {
                    var j = null,
                        T = O["content-range"];
                    if (T) {
                        var D = f.exec(T);
                        D && (j = D[1])
                    }
                    j || (j = S), j = parseInt(j);
                    var q = m.exec(e.url),
                        M = null;
                    if (q) {
                        if ("m4s" == (M = q[1].toLowerCase()) && r.prefs.dashHideM4s) return;
                        if ("ts" == M && r.prefs.mpegtsHideTs) return;
                        if ("f4f" == M) return;
                        x[q[1]] || (q = null)
                    }!C || "audio" != C[1] && "video" != C[1] || (_ = !0);
                    var F = e.originUrl || e.documentUrl || void 0;
                    (n = n || u.networkHook(e, {
                        contentType: P,
                        referrer: F,
                        headers: t,
                        proxy: e.proxyInfo
                    })) ? (_ = !0, n.then(U).catch(function(e) {})) : U(null)
                }
            }
        }

        function U(n) {
            if (_ || !(!C && isNaN(j) && !q || !C && !q && (isNaN(j) || 0 === r.prefs.mediaweightThreshold || j < r.prefs.mediaweightThreshold) || !isNaN(j) && j < r.prefs.mediaweightMinSize || C && "ms-asf" == C[2].toLowerCase() || C && "f4f" == C[2].toLowerCase())) {
                var u = {
                    id: "network-probe:" + o.hashHex(e.url),
                    status: "active",
                    url: e.url,
                    tabId: e.tabId,
                    frameId: e.frameId,
                    fromCache: !0,
                    referrer: F
                };
                if (isNaN(j) || (u.length = j), e.proxyInfo && "http" == e.proxyInfo.type.substr(0, 4) && (u.proxy = e.proxyInfo), !r.prefs.tbsnFilterOut || !w.test(e.url)) {
                    var c = O["content-disposition"];
                    if (c) {
                        var l = h.exec(c);
                        l && l[1] && (u.headerFilename = l[1])
                    }
                    var f = g.exec(e.url);
                    f && (u.urlFilename = f[1]), u.title = u.headerFilename || u.urlFilename || r._("media");
                    var p = k.exec(e.url);
                    p && (u.thumbnailUrl = p[1] + "://media.tumblr.com/" + p[2] + "_frame1.jpg"), q ? (u.type = "video", u.extension = q[1]) : C ? (u.type = C[1], u.extension = C[2]) : u.extension = M, u.headers = t && t.filter(function(e) {
                        return void 0 === A[e.name.toLowerCase()]
                    }) || [], d.tabs.get(e.tabId).then(function(e) {
                        if (e) {
                            u.topUrl = e.url, u.isPrivate = e.incognito, u.title = u.headerFilename || e.title || u.urlFilename || r._("media");
                            var t = s.getSpecs(e.url);
                            t && (t.headerFilename = u.headerFilename, t.urlFilename = u.urlFilename);
                            var o = ["var _$vdhHitId = " + JSON.stringify(u.id) + ";", "var _$vdhSmartNameSpecs = " + JSON.stringify(t) + ";"];
                            d.tabs.executeScript(e.id, {
                                code: o.join("\n"),
                                frameId: 0
                            }).then(function() {
                                return d.tabs.executeScript(e.id, {
                                    file: "/content/pagedata-script.js",
                                    frameId: 0
                                })
                            }).catch(function(t) {
                                d.webNavigation.getFrame({
                                    tabId: e.id,
                                    frameId: u.frameId
                                }).then(function(n) {
                                    n && (console.warn("pagedata-script execution error", t.message), a.updateOriginal(u.id, {
                                        title: e.title || u.title,
                                        pageUrl: n.url,
                                        topUrl: e.url
                                    }))
                                })
                            })
                        }
                        n ? (u.originalId = u.id, n.handleHit(u)) : i.dispatch("hit.new", u)
                    })
                }
            }
        }
    };
    "firefox" == r.browserType && ["main_frame", "sub_frame", "xmlhttprequest", "object", "media"].push("object_subrequest");
    var C = function() {};

    function S() {
        d.webRequest.onHeadersReceived.addListener(P, {
            urls: ["<all_urls>"]
        }, ["responseHeaders"]), d.webRequest.onBeforeRedirect.addListener(C, {
            urls: ["<all_urls>"]
        })
    }
    r.prefs.on("networkProbe", function(e, t) {
        t ? S() : (d.webRequest.onHeadersReceived.removeListener(P), d.webRequest.onBeforeRedirect.removeListener(C))
    }), r.prefs.networkProbe && S();
    var E = null,
        j = function(e) {
            W(e), E && (E[e.requestId] = e.requestHeaders)
        },
        T = function(e) {
            W(e), E && delete E[e.requestId]
        };

    function D() {
        E = {}, d.webRequest.onSendHeaders.addListener(j, {
            urls: ["<all_urls>"]
        }, ["requestHeaders"]), d.webRequest.onErrorOccurred.addListener(T, {
            urls: ["<all_urls>"]
        })
    }
    r.prefs.on("monitorNetworkRequests", function(e, t) {
        t ? D() : (d.webRequest.onSendHeaders.removeListener(j), d.webRequest.onErrorOccurred.removeListener(T), E = null)
    }), r.prefs.monitorNetworkRequests && D();
    var R = null,
        q = function(e) {
            R && "POST" === e.method && e.requestBody && e.requestBody.formData && (R[e.requestId] = e.requestBody.formData)
        },
        M = function(e) {
            R && delete R[e.requestId]
        };

    function F() {
        R = {}, d.webRequest.onBeforeRequest.addListener(q, {
            urls: ["https://*.facebook.com/video/*"]
        }, ["requestBody"]), d.webRequest.onErrorOccurred.addListener(M, {
            urls: ["https://*.facebook.com/video/tahoe/async/*"]
        })
    }
    r.prefs.on("tbsnEnabled", function(e, t) {
        t ? F() : (d.webRequest.onBeforeRequest.removeListener(q), d.webRequest.onErrorOccurred.removeListener(M), R = null)
    }), r.prefs.tbsnEnabled && F();
    var U = {};

    function W(e) {
        var t = U[e.url];
        if (t) {
            clearTimeout(t.timer), delete U[e.url];
            var n = e.requestHeaders.filter(function(e) {
                return void 0 === A[e.name.toLowerCase()]
            });
            t.handlers.forEach(function(t) {
                t.resolve({
                    proxy: e.proxyInfo,
                    headers: n
                })
            })
        }
    }
}, , , , , , , , , , function(e, t, n) {
    e.exports = n(253)
}, function(e, t, n) {
    "use strict";
    var r = n(1),
        i = r.browser,
        a = n(38),
        o = a.buildOptions || {};
    a.prod || console.info("=========== VDH started", (new Date).toLocaleTimeString(), "==========");
    var s = i.runtime.getManifest();
    r.prefs.declare(n(255)), n(256), n(27), n(95), n(242), n(241), n(119);
    var u = n(40);
    r.rpc.listen({
        openSettings: function() {
            r.ui.open("settings", {
                type: "tab",
                url: "content/settings.html"
            }), r.ui.close("main")
        },
        openTranslation: function() {
            r.ui.open("translation", {
                type: "tab",
                url: "content/translation.html"
            }), r.ui.close("main")
        },
        openSites: function() {
            return u.gotoOrOpenTab("https://www.downloadhelper.net/sites")
        },
        openForum: function() {
            return u.gotoOrOpenTab("https://groups.google.com/forum/#!forum/video-downloadhelper-q-and-a")
        },
        openHomepage: function() {
            return u.gotoOrOpenTab("https://www.downloadhelper.net/")
        },
        openTranslationForum: function() {
            return u.gotoOrOpenTab("https://groups.google.com/forum/#!forum/video-downloadhelper-internationalization")
        },
        openWeh: function() {
            return u.gotoOrOpenTab("https://github.com/mi-g/weh")
        },
        openAbout: function() {
            r.ui.open("about", {
                type: "panel",
                url: "content/about.html"
            }), r.ui.close("main")
        },
        openCoapp: function() {
            r.ui.open("coappShell", {
                type: "tab",
                url: "content/coapp-shell.html"
            }), r.ui.close("main")
        },
        goto: function(e) {
            return u.gotoOrOpenTab(e)
        },
        getBuild: function() {
            return a
        },
        updateLastFocusedWindowHeight: function(e, t) {
            i.windows.getLastFocused().then(function(n) {
                if (n) {
                    var r = n.height - t;
                    i.windows.update(n.id, {
                        height: e + r
                    })
                }
            })
        }
    }), i.runtime.onInstalled.addListener(function(e) {
        "install" == e.reason ? u.gotoOrOpenTab("https://www.downloadhelper.net/welcome?browser=" + (o.browser || "") + "&version=" + s.version) : "update" != e.reason || e.previousVersion == i.runtime.getManifest().version || "7.2.1" == s.version || "7.2.2" == s.version || "7.3.1" == s.version && "7.3.0" == e.previousVersion || "7.3.3.0" == s.version && "7.3.3.1" == e.previousVersion || "7.3.3.1" == s.version && "7.3.3.2" == e.previousVersion || /^7\.3\.7(\.\d+)?$/.test(s.version) || u.gotoOrOpenTab("https://www.downloadhelper.net/update?browser=" + (o.browser || "") + "&from=" + e.previousVersion + "&to=" + s.version)
    })
}, function(e, t, n) {
    "use strict";
    var r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        i = n(2),
        a = n(3),
        o = i.browser,
        s = {},
        u = {};

    function c(e, t) {
        var n = !1;
        return new Promise(function(t, r) {
            return o.tabs.query({}).then(function(r) {
                r.forEach(function(t) {
                    t.url === e && (o.tabs.update(t.id, {
                        active: !0
                    }), o.windows.update(t.windowId, {
                        focused: !0
                    }), n = !0)
                }), t(n)
            })
        })
    }
    o.tabs.onRemoved.addListener(function(e) {
        i.__closeByTab(e);
        var t = u[e];
        t && (delete u[e], delete s[t])
    }), e.exports = {
        open: function(e, t) {
            switch (t.type) {
                case "panel":
                    return function(e, t) {
                        return new Promise(function(n, a) {
                            var l = o.extension.getURL(t.url + "?panel=" + e);
                            c(l).then(function(n) {
                                if (!n) return function(e, t) {
                                    return new Promise(function(n, a) {
                                        var c = o.extension.getURL(t.url + "?panel=" + e);
                                        o.windows.getCurrent().then(function(l) {
                                            var d = t.width || 500,
                                                f = t.height || 400,
                                                p = {
                                                    url: c,
                                                    width: d,
                                                    height: f,
                                                    type: "popup",
                                                    left: Math.round((l.width - d) / 2 + l.left),
                                                    top: Math.round((l.height - f) / 2 + l.top)
                                                };
                                            return i.isBrowser("chrome", "opera") && (p.focused = !0), o.windows.create(p).then(function(t) {
                                                return s[e] = {
                                                    type: "window",
                                                    windowId: t.id
                                                }, Promise.all([t, o.windows.update(t.id, {
                                                    focused: !0
                                                })])
                                            }).then(function(s) {
                                                var c = r(s, 1),
                                                    l = c[0];

                                                function d(e) {
                                                    e != l.id && t.autoClose && o.windows.getCurrent().then(function(e) {
                                                        e.id != l.id && o.windows.remove(l.id).then(function() {}, function() {})
                                                    })
                                                }
                                                Promise.resolve().then(function() {
                                                    return t.initData && t.initData.autoResize ? void 0 : o.windows.update(l.id, {
                                                        height: l.height + 1
                                                    }).then(function() {
                                                        return o.windows.update(l.id, {
                                                            height: l.height - 1
                                                        })
                                                    })
                                                }).then(function() {
                                                    var e = new Promise(function(e, t) {
                                                            var n = setTimeout(function() {
                                                                o.tabs.onCreated.removeListener(r), t(new Error("Tab did not open"))
                                                            }, 5e3);

                                                            function r(t) {
                                                                t.windowId == l.id && (clearTimeout(n), o.tabs.onCreated.removeListener(r), e(t))
                                                            }
                                                            o.tabs.onCreated.addListener(r)
                                                        }),
                                                        t = o.tabs.query({
                                                            windowId: l.id
                                                        }).then(function(e) {
                                                            return new Promise(function(t, n) {
                                                                e.length > 0 && t(e[0])
                                                            })
                                                        });
                                                    return Promise.race([e, t])
                                                }).then(function(e) {
                                                    return "loading" == e.status ? new Promise(function(t, n) {
                                                        var r = setTimeout(function() {
                                                            o.tabs.onUpdated.removeListener(i), n(new Error("Tab did not complete"))
                                                        }, 6e4);

                                                        function i(n, a, s) {
                                                            n == e.id && "complete" == s.status && (clearTimeout(r), o.tabs.onUpdated.removeListener(i), t(s))
                                                        }
                                                        o.tabs.onUpdated.addListener(i)
                                                    }) : e
                                                }).then(function(n) {
                                                    i.__declareAppTab(e, {
                                                        tab: n.id,
                                                        initData: t.initData
                                                    }), u[n.id] = e
                                                }).then(n).catch(a), o.windows.onFocusChanged.addListener(d), o.windows.onRemoved.addListener(function e(t) {
                                                    t == l.id && (o.windows.onFocusChanged.removeListener(d), o.windows.onFocusChanged.removeListener(e))
                                                })
                                            }).catch(a)
                                        }).catch(a)
                                    })
                                }(e, t)
                            }).then(n).catch(a)
                        })
                    }(e, t);
                case "tab":
                default:
                    return function(e, t) {
                        return new Promise(function(n, r) {
                            var a = o.extension.getURL(t.url + "?panel=" + e);
                            c(a).then(function(n) {
                                if (!n) return o.tabs.create({
                                    url: a
                                }).then(function(n) {
                                    i.__declareAppTab(e, {
                                        tab: n.id,
                                        initData: t.initData
                                    }), s[e] = {
                                        type: "tab",
                                        tabId: n.id
                                    }, u[n.id] = e
                                })
                            }).then(n).catch(r)
                        })
                    }(e, t)
            }
        },
        close: function(e) {
            var t = s[e];
            t && "tab" == t.type ? o.tabs.remove(t.tabId) : t && "window" == t.type ? o.windows.remove(t.windowId) : a.call(e, "close")
        },
        isOpen: function(e) {
            return !!s[e]
        }
    }
}, function(e, t, n) {
    "use strict";
    e.exports = [{
        name: "networkProbe",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "titleMode",
        type: "choice",
        defaultValue: "right",
        choices: ["right", "left", "multiline"]
    }, {
        name: "iconActivation",
        type: "choice",
        defaultValue: "currenttab",
        choices: ["currenttab", "anytab"]
    }, {
        name: "iconBadge",
        type: "choice",
        defaultValue: "tasks",
        choices: ["none", "tasks", "activetab", "anytab", "pinned", "mixed"]
    }, {
        name: "hitsGotoTab",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "default-action-0",
        type: "string",
        defaultValue: "quickdownload",
        hidden: !0
    }, {
        name: "default-action-1",
        type: "string",
        defaultValue: "openlocalfile",
        hidden: !0
    }, {
        name: "default-action-2",
        type: "string",
        defaultValue: "abort",
        hidden: !0
    }, {
        name: "smartnamerFnameSpaces",
        type: "choice",
        defaultValue: "keep",
        choices: ["keep", "remove", "hyphen", "underscore"]
    }, {
        name: "smartnamerFnameMaxlen",
        type: "integer",
        defaultValue: 64,
        minimum: 12,
        maximum: 256
    }, {
        name: "downloadControlledMax",
        type: "integer",
        defaultValue: 6,
        minimum: 0
    }, {
        name: "downloadStreamControlledMax",
        type: "integer",
        defaultValue: 6,
        minimum: 0
    }, {
        name: "autoPin",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "mediaExtensions",
        type: "string",
        defaultValue: "flv|ram|mpg|mpeg|avi|rm|wmv|mov|asf|mp3|rar|movie|divx|rbs|mp4|mpeg4"
    }, {
        name: "dashHideM4s",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "mpegtsHideTs",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "orphanExpiration",
        type: "integer",
        defaultValue: 60,
        minimum: 0
    }, {
        name: "chunksEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "hlsEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "dashEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "f4fEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "dashOnAdp",
        type: "choice",
        defaultValue: "audio_video",
        choices: ["audio", "video", "audio_video"]
    }, {
        name: "hlsDownloadAsM2ts",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "networkFilterOut",
        type: "string",
        defaultValue: "/frag\\\\([0-9]+\\\\)/|[&\\\\?]range=[0-9]+-[0-9]+|/silverlight/"
    }, {
        name: "mediaweightThreshold",
        type: "integer",
        defaultValue: 1048576
    }, {
        name: "mediaweightMinSize",
        type: "integer",
        defaultValue: 4096
    }, {
        name: "tbvwsEnabled",
        type: "boolean",
        defaultValue: !0,
        hidden: !0
    }, {
        name: "ignoreProtectedVariants",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "qualitiesMaxVariants",
        type: "integer",
        defaultValue: 6
    }, {
        name: "adpHide",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "adaptativeCount",
        type: "integer",
        defaultValue: 4,
        hidden: !0
    }, {
        name: "converterThreads",
        type: "string",
        defaultValue: "auto"
    }, {
        name: "converterAggregTuneH264",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "notifyReady",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "noPrivateNotification",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "avplayEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "blacklistEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "chunksConcurrentDownloads",
        type: "integer",
        defaultValue: 4
    }, {
        name: "chunksPrefetchCount",
        type: "integer",
        defaultValue: 4
    }, {
        name: "downloadRetries",
        type: "integer",
        defaultValue: 3
    }, {
        name: "downloadRetryDelay",
        type: "integer",
        defaultValue: 1e3
    }, {
        name: "mpegtsSaveRaw",
        type: "boolean",
        defaultValue: !1,
        hidden: !0
    }, {
        name: "mpegtsSaveRawStreams",
        type: "boolean",
        defaultValue: !1,
        hidden: !0
    }, {
        name: "mpegtsEndsOnSeenChunk",
        type: "boolean",
        defaultValue: !0,
        hidden: !0
    }, {
        name: "converterKeepTmpFiles",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "f4fFragPostUrl",
        type: "boolean",
        defaultValue: !0,
        hidden: !0
    }, {
        name: "f4fFragIndex",
        type: "boolean",
        defaultValue: !0,
        hidden: !0
    }, {
        name: "backgroundReduxLogger",
        type: "boolean",
        defaultValue: !1,
        hidden: !0
    }, {
        name: "dlconvLastOutput",
        type: "string",
        defaultValue: "",
        hidden: !0
    }, {
        name: "linuxLicense",
        type: "boolean",
        defaultValue: !1,
        hidden: !0
    }, {
        name: "qrMessageNotAgain",
        type: "boolean",
        defaultValue: !1,
        hidden: !0
    }, {
        name: "coappShellEnabled",
        type: "boolean",
        defaultValue: !1,
        hidden: !0
    }, {
        name: "tbsnFilterOut",
        type: "boolean",
        defaultValue: !0,
        hidden: !0
    }, {
        name: "downloadCount",
        type: "integer",
        defaultValue: 0,
        hidden: !0
    }, {
        name: "donateNotAgainExpire",
        type: "integer",
        defaultValue: 0,
        hidden: !0
    }, {
        name: "popupHeightLeftOver",
        type: "integer",
        defaultValue: 100,
        hidden: !0
    }, {
        name: "coappDownloads",
        type: "choice",
        defaultValue: "ask",
        choices: ["ask", "coapp", "browser"]
    }, {
        name: "lastDownloadDirectory",
        type: "string",
        defaultValue: "dwhelper"
    }, {
        name: "fileDialogType",
        type: "choice",
        defaultValue: "tab",
        choices: ["tab", "panel"]
    }, {
        name: "alertDialogType",
        type: "choice",
        defaultValue: "tab",
        choices: ["tab", "panel"]
    }, {
        name: "monitorNetworkRequests",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "chunkedCoappManifestsRequests",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "chunkedCoappDataRequests",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "coappRestartDelay",
        type: "integer",
        defaultValue: 1e3
    }, {
        name: "rememberLastDir",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "coappIdleExit",
        type: "integer",
        defaultValue: 6e4
    }, {
        name: "dialogAutoClose",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "convertControlledMax",
        type: "integer",
        defaultValue: 1
    }, {
        name: "checkCoappOnStartup",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "coappUseProxy",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "downloadCompleteDelay",
        type: "integer",
        defaultValue: 1e3
    }, {
        name: "contentRedirectEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "contextMenuEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "toolsMenuEnabled",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "medialinkExtensions",
        type: "string",
        defaultValue: "jpg|jpeg|gif|png|mpg|mpeg|avi|rm|wmv|mov|flv|mp3|mp4"
    }, {
        name: "medialinkMaxHits",
        type: "integer",
        defaultValue: 50
    }, {
        name: "medialinkMinFilesPerGroup",
        type: "integer",
        defaultValue: 6
    }, {
        name: "medialinkMinImgSize",
        type: "integer",
        defaultValue: 80
    }, {
        name: "medialinkAutoDetect",
        type: "boolean",
        defaultValue: !1
    }, {
        name: "medialinkScanImages",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "medialinkScanLinks",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "bulkEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "tbvwsGrabDelay",
        type: "integer",
        defaultValue: 2e3
    }, {
        name: "forcedCoappVersion",
        type: "string",
        regexp: "^$|^\\d+\\.\\d+\\.\\d+$",
        defaultValue: ""
    }, {
        name: "lastHlsDownload",
        type: "integer",
        defaultValue: 0,
        hidden: !0
    }, {
        name: "tbsnEnabled",
        type: "boolean",
        defaultValue: !0
    }, {
        name: "galleryNaming",
        type: "choice",
        choices: ["type-index", "url", "index-url"],
        defaultValue: "type-index"
    }]
}, function(e, t, n) {
    "use strict";
    var r = n(2),
        i = n(3),
        a = n(24),
        o = r.browser,
        s = null,
        u = null,
        c = !1;
    o.runtime.onMessageExternal && (o.runtime.onMessageExternal.addListener(function(e, t, n) {
        switch (e.type) {
            case "weh#inspect-ping":
                s = t.id, n({
                    type: "weh#inspect-pong",
                    version: 1,
                    manifest: o.runtime.getManifest()
                });
                break;
            case "weh#inspect":
                s = t.id, (c = e.inspected) ? i.setHook(function(e) {
                    c && s && o.runtime.sendMessage(s, {
                        type: "weh#inspect-message",
                        message: e
                    }).catch(function(e) {
                        console.info("Error sending message", e), c = !1
                    })
                }) : i.setHook(null), n({
                    type: "weh#inspect",
                    version: 1,
                    inspected: c
                });
                break;
            case "weh#get-prefs":
                s = t.id, n({
                    type: "weh#prefs",
                    prefs: a.getAll(),
                    specs: a.getSpecs()
                });
                break;
            case "weh#set-pref":
                a[e.pref] = e.value, n(!0);
                break;
            case "weh#get-storage":
                s = t.id, new Promise(function(e, t) {
                    var n = {};
                    ["localStorage", "sessionStorage"].forEach(function(e) {
                        try {
                            var t = window[e];
                            if (t) {
                                for (var r = {}, i = 0; i < t.length; i++) {
                                    var a = t.key(i),
                                        o = t.getItem(a);
                                    try {
                                        r[a] = JSON.parse(o)
                                    } catch (e) {
                                        r[a] = o
                                    }
                                }
                                n[e] = r
                            }
                        } catch (e) {}
                    });
                    var r = [];
                    ["local", "sync", "managed"].forEach(function(e) {
                        try {
                            var t = o.storage && o.storage[e];
                            if (t) return new Promise(function(i, a) {
                                var o = t.get(null).then(function(t) {
                                    n[e] = t
                                }).catch(function(e) {});
                                r.push(o)
                            })
                        } catch (e) {}
                    }), Promise.all(r).then(function() {
                        e(n)
                    }).catch(t)
                }).then(function(e) {
                    o.runtime.sendMessage(s, {
                        type: "weh#storage",
                        storage: e
                    })
                }).catch(function(e) {
                    console.error("Error get storage data", e)
                }), n({
                    type: "weh#storage-pending"
                })
        }
    }), u = {
        send: function() {
            console.info("TODO implement inspect.send")
        }
    }), e.exports = u
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    n(1), t.Downloads = function() {
        function e(t) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.coapp = t
        }
        return r(e, [{
            key: "download",
            value: function(e) {
                return this.coapp.call("downloads.download", e)
            }
        }, {
            key: "search",
            value: function(e) {
                return this.coapp.call("downloads.search", e)
            }
        }, {
            key: "cancel",
            value: function(e) {
                return this.coapp.call("downloads.cancel", e)
            }
        }]), e
    }()
}, function(e, t, n) {
    "use strict";
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();

    function i(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var o = n(2).browser,
        s = n(3),
        u = function() {
            function e() {
                a(this, e), this.listeners = []
            }
            return r(e, [{
                key: "addListener",
                value: function(e) {
                    this.listeners.push(e)
                }
            }, {
                key: "removeListener",
                value: function(e) {
                    this.listeners = this.listeners.filter(function(t) {
                        return e !== t
                    })
                }
            }, {
                key: "removeAllListeners",
                value: function() {
                    this.listeners = []
                }
            }, {
                key: "notify",
                value: function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    this.listeners.forEach(function(e) {
                        try {
                            e.apply(void 0, t)
                        } catch (e) {
                            console.warn(e)
                        }
                    })
                }
            }]), e
        }(),
        c = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                a(this, e), this.appId = t, this.name = n.name || t, this.appPort = null, this.pendingCalls = [], this.runningCalls = [], this.state = "idle", this.postFn = this.post.bind(this), this.postMessageFn = this.postMessage.bind(this), this.onAppNotFound = new u, this.onAppNotFoundCheck = new u, this.onCallCount = new u, this.appStatus = "unknown", this.app2AddonCallCount = 0, this.addon2AppCallCount = 0
            }
            return r(e, [{
                key: "post",
                value: function(e, t) {
                    this.appPort.postMessage(t)
                }
            }, {
                key: "postMessage",
                value: function(e) {
                    this.appPort.postMessage(e)
                }
            }, {
                key: "updateCallCount",
                value: function(e, t) {
                    switch (e) {
                        case 2:
                            this.app2AddonCallCount += t;
                            break;
                        case 1:
                            this.addon2AppCallCount += t
                    }
                    this.onCallCount.notify(this.addon2AppCallCount, this.app2AddonCallCount)
                }
            }, {
                key: "close",
                value: function() {
                    if (this.appPort) try {
                        this.appPort.disconnect(), this.cleanup()
                    } catch (e) {}
                }
            }, {
                key: "call",
                value: function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.callCatchAppNotFound.apply(this, [null].concat(t))
                }
            }, {
                key: "callCatchAppNotFound",
                value: function(e) {
                    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    var a = this;

                    function u(e) {
                        for (var t; t = a.pendingCalls.shift();) e ? t.reject(e) : function() {
                            a.runningCalls.push(t);
                            var e = t;
                            s.call.apply(s, [a.postFn, a.name].concat(i(t.params))).then(function(t) {
                                return a.runningCalls.splice(a.runningCalls.indexOf(e), 1), t
                            }).then(e.resolve).catch(function(t) {
                                a.runningCalls.splice(a.runningCalls.indexOf(e), 1), e.reject(t)
                            })
                        }()
                    }
                    switch (!e || "unknown" != a.appStatus && "checking" != a.appStatus || a.onAppNotFoundCheck.addListener(e), a.updateCallCount(1, 1), this.state) {
                        case "running":
                            return new Promise(function(e, t) {
                                var r = {
                                    resolve: e,
                                    reject: t,
                                    params: [].concat(n)
                                };
                                a.runningCalls.push(r), s.call.apply(s, [a.postFn, a.name].concat(n)).then(function(e) {
                                    return a.runningCalls.splice(a.runningCalls.indexOf(r), 1), e
                                }).then(r.resolve).catch(function(e) {
                                    a.runningCalls.splice(a.runningCalls.indexOf(r), 1), r.reject(e)
                                })
                            }).then(function(e) {
                                return a.updateCallCount(1, -1), e
                            }).catch(function(e) {
                                throw a.updateCallCount(1, -1), e
                            });
                        case "idle":
                            return a.state = "pending", new Promise(function(t, r) {
                                a.pendingCalls.push({
                                    resolve: t,
                                    reject: r,
                                    params: [].concat(n)
                                });
                                var i = o.runtime.connectNative(a.appId);
                                a.appStatus = "checking", a.appPort = i, i.onMessage.addListener(function(e) {
                                    "checking" == a.appStatus && (a.appStatus = "ok", a.onAppNotFoundCheck.removeAllListeners()), s.receive(e, a.postMessageFn, a.name)
                                }), i.onDisconnect.addListener(function() {
                                    u(new Error("Disconnected")), a.cleanup(), "checking" != a.appStatus || e || a.onAppNotFound.notify(a.appPort && a.appPort.error || o.runtime.lastError)
                                }), a.state = "running", u()
                            }).then(function(e) {
                                return a.updateCallCount(1, -1), e
                            }).catch(function(e) {
                                throw a.updateCallCount(1, -1), e
                            });
                        case "pending":
                            return new Promise(function(e, t) {
                                a.pendingCalls.push({
                                    resolve: e,
                                    reject: t,
                                    params: [].concat(n)
                                })
                            }).then(function(e) {
                                return a.updateCallCount(1, -1), e
                            }).catch(function(e) {
                                throw a.updateCallCount(1, -1), e
                            })
                    }
                }
            }, {
                key: "listen",
                value: function(e) {
                    var t = this,
                        n = {};
                    return Object.keys(e).forEach(function(r) {
                        n[r] = function() {
                            return t.updateCallCount(2, 1), Promise.resolve(e[r].apply(e, arguments)).then(function(e) {
                                return t.updateCallCount(2, -1), e
                            }).catch(function(e) {
                                throw t.updateCallCount(2, -1), e
                            })
                        }
                    }), s.listen(n)
                }
            }, {
                key: "cleanup",
                value: function() {
                    var e;
                    for ("checking" == this.appStatus && (this.onAppNotFoundCheck.notify(this.appPort && this.appPort.error || o.runtime.lastError), this.onAppNotFoundCheck.removeAllListeners()); e = this.runningCalls.shift();) e.reject(new Error("Native port disconnected"));
                    this.state = "idle", this.appStatus = "unknown", this.appPort = null
                }
            }]), e
        }();
    e.exports = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return new(Function.prototype.bind.apply(c, [null].concat(t)))
    }
}, function(e, t, n) {
    "use strict";
    var r = n(260).get;

    function i(e, t) {
        return e === t
    }
    e.exports = function(e, t, n) {
        n = n || i;
        var a = r(e(), t);
        return function(i) {
            return function() {
                var o = r(e(), t);
                if (!n(a, o)) {
                    var s = a;
                    a = o, i(o, s, t)
                }
            }
        }
    }
}, function(e, t, n) {
    var r, i, a;
    ! function(n, o) {
        "use strict";
        "object" == typeof e && "object" == typeof e.exports ? e.exports = o() : (i = [], void 0 === (a = "function" == typeof(r = o) ? r.apply(t, i) : r) || (e.exports = a))
    }(0, function() {
        "use strict";
        var e = Object.prototype.toString,
            t = Object.prototype.hasOwnProperty;

        function n(e) {
            if (!e) return !0;
            if (s(e) && 0 === e.length) return !0;
            if (!a(e)) {
                for (var n in e)
                    if (t.call(e, n)) return !1;
                return !0
            }
            return !1
        }

        function r(t) {
            return e.call(t)
        }

        function i(e) {
            return "number" == typeof e || "[object Number]" === r(e)
        }

        function a(e) {
            return "string" == typeof e || "[object String]" === r(e)
        }

        function o(e) {
            return "object" == typeof e && "[object Object]" === r(e)
        }

        function s(e) {
            return "object" == typeof e && "number" == typeof e.length && "[object Array]" === r(e)
        }

        function u(e) {
            var t = parseInt(e);
            return t.toString() === e ? t : e
        }

        function c(e, t, r, o) {
            if (i(t) && (t = [t]), n(t)) return e;
            if (a(t)) return c(e, t.split(".").map(u), r, o);
            var s = t[0];
            if (1 === t.length) {
                var l = e[s];
                return void 0 !== l && o || (e[s] = r), l
            }
            return void 0 === e[s] && (i(t[1]) ? e[s] = [] : e[s] = {}), c(e[s], t.slice(1), r, o)
        }
        var l = function(e) {
            return Object.keys(l).reduce(function(t, n) {
                return "function" == typeof l[n] && (t[n] = l[n].bind(l, e)), t
            }, {})
        };
        return l.has = function(e, r) {
            if (n(e)) return !1;
            if (i(r) ? r = [r] : a(r) && (r = r.split(".")), n(r) || 0 === r.length) return !1;
            for (var u = 0; u < r.length; u++) {
                var c = r[u];
                if (!o(e) && !s(e) || !t.call(e, c)) return !1;
                e = e[c]
            }
            return !0
        }, l.ensureExists = function(e, t, n) {
            return c(e, t, n, !0)
        }, l.set = function(e, t, n, r) {
            return c(e, t, n, r)
        }, l.insert = function(e, t, n, r) {
            var i = l.get(e, t);
            r = ~~r, s(i) || (i = [], l.set(e, t, i)), i.splice(r, 0, n)
        }, l.empty = function(e, u) {
            if (n(u)) return e;
            if (!n(e)) {
                var c, d;
                if (!(c = l.get(e, u))) return e;
                if (a(c)) return l.set(e, u, "");
                if (function(e) {
                        return "boolean" == typeof e || "[object Boolean]" === r(e)
                    }(c)) return l.set(e, u, !1);
                if (i(c)) return l.set(e, u, 0);
                if (s(c)) c.length = 0;
                else {
                    if (!o(c)) return l.set(e, u, null);
                    for (d in c) t.call(c, d) && delete c[d]
                }
            }
        }, l.push = function(e, t) {
            var n = l.get(e, t);
            s(n) || (n = [], l.set(e, t, n)), n.push.apply(n, Array.prototype.slice.call(arguments, 2))
        }, l.coalesce = function(e, t, n) {
            for (var r, i = 0, a = t.length; i < a; i++)
                if (void 0 !== (r = l.get(e, t[i]))) return r;
            return n
        }, l.get = function(e, t, r) {
            if (i(t) && (t = [t]), n(t)) return e;
            if (n(e)) return r;
            if (a(t)) return l.get(e, t.split("."), r);
            var o = u(t[0]);
            return 1 === t.length ? void 0 === e[o] ? r : e[o] : l.get(e[o], t.slice(1), r)
        }, l.del = function(e, t) {
            return function e(t, r) {
                if (i(r) && (r = [r]), !n(t)) {
                    if (n(r)) return t;
                    if (a(r)) return e(t, r.split("."));
                    var o = u(r[0]),
                        c = t[o];
                    if (1 === r.length) void 0 !== c && (s(t) ? t.splice(o, 1) : delete t[o]);
                    else if (void 0 !== t[o]) return e(t[o], r.slice(1));
                    return t
                }
            }(e, t)
        }, l
    })
}, function(e, t, n) {
    "use strict";
    var r = n(1),
        i = r.browser,
        a = n(5),
        o = n(27),
        s = 1e3,
        u = 0,
        c = {},
        l = null,
        d = null;

    function f(e) {
        if (e && e.coappDownload) return o.downloads;
        if (d) return d;
        var t = (d = Object.assign({}, i.downloads)).download;
        return d.download = function(e) {
            return e.headers && (e.headers = []), delete e.directory, delete e.proxy, t(e)
        }, d
    }

    function p() {
        var e = Object.keys(c).length;
        l && 0 == e ? (clearInterval(l), l = null) : !l && e > 0 && (l = setInterval(h, s))
    }

    function h() {
        var e = function(e) {
            var t = c[e];
            f(t.data).search({
                id: t.downloadId
            }).then(function(n) {
                if (n.length > 0) {
                    var i = n[0];
                    if ("in_progress" == i.state) {
                        var o = Math.floor(100 * i.bytesReceived / i.totalBytes);
                        o != t.lastProgress && (t.lastProgress = o, t.progress(o)), i.error && (f(t.data).cancel(i.id), t.failure(new a.DetailsError(r._("download_error"), i.error)), delete c[e], p())
                    } else delete c[e], p(), "complete" == i.state ? setTimeout(function() {
                        t.success(i.filename)
                    }, r.prefs.downloadCompleteDelay) : "Aborted" == i.error ? t.failure(new a.VDHError(r._("download_error"), {
                        noReport: !0
                    })) : t.failure(new a.DetailsError(r._("download_error"), i.error))
                } else console.warn("Not found download", e)
            })
        };
        for (var t in c) e(t)
    }

    function g() {}

    function m(e, t) {
        p(), e.failure(t)
    }
    t.download = function(e, t, n, o) {
        var s = ++u,
            l = {
                id: s,
                data: e,
                success: t || g,
                failure: n || g,
                progress: o || g
            };
        p(), l.lastProgress = -1;
        var d = {
            url: l.data.source.url,
            conflictAction: "uniquify",
            filename: l.data.target.filename,
            directory: l.data.target.directory,
            saveAs: l.data.target.saveAs || !1,
            incognito: !!l.data.source.isPrivate
        };
        return l.data.source.headers ? d.headers = l.data.source.headers : l.data.source.referrer && (d.headers = [{
            name: "Referer",
            value: l.data.source.referrer
        }]), l.data.proxy && r.prefs.coappUseProxy && (d.proxy = l.data.proxy), Promise.resolve(i.runtime.getBrowserInfo && i.runtime.getBrowserInfo() || null).then(function(e) {
            return (!e || "Firefox" != e.name || parseInt(e.version) <= 56) && delete d.incognito, f(l.data).download(d)
        }).then(function(e) {
            if (!e) return m(l, new Error(r._("aborted"))), void p();
            l.downloadId = e, c[l.id] = l, p()
        }).catch(function(e) {
            m(l, new a.DetailsError(r._("download_error"), e.message))
        }), s
    }, t.abort = function(e) {
        c[e] && f(c[e].data).cancel(c[e].downloadId)
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    var i = n(1),
        a = (n(16), n(61)),
        o = (n(117), n(118), n(39)),
        s = n(97),
        u = s.Chunkset,
        c = s.Codecs,
        l = n(263)("background/mp2t-worker.js", {
            name: "MP2TWorker",
            autoKill: 6e4
        });
    t.MP2TChunkset = function(e) {
        function t(e) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return n.rawAppendData = i.prefs.hlsDownloadAsM2ts, n.codecs = c, n.captureRaw = i.prefs.mpegtsSaveRaw, n.captureRawStreams = i.prefs.mpegtsSaveRawStreams, n.endsOnSeenChunk = i.prefs.mpegtsEndsOnSeenChunk, n.pesTable = {}, n.processQueue = [], n.workerWorking = !1, n
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, u), r(t, [{
            key: "toUint8ArrayArray",
            value: function(e) {
                var t = [];
                return function e(n) {
                    if (Array.isArray(n))
                        for (var r = 0; r < n.length; r++) e(n[r]);
                    else n.byteLength > 0 && t.push(new Uint8Array(n))
                }(e), t
            }
        }, {
            key: "processChunkData",
            value: function(e, t) {
                if (i.prefs.hlsDownloadAsM2ts) return t(null, e);
                var n = this;
                this.processQueue.push({
                        data: e,
                        callback: t
                    }),
                    function e() {
                        if (!n.workerWorking) {
                            var t = n.processQueue.shift();
                            if (t) {
                                n.workerWorking = !0;
                                var r = {
                                    processedChunksCount: n.processedChunksCount,
                                    codecs: n.codecs,
                                    pidTable: n.pidTable,
                                    pesTable: n.pesTable,
                                    pmtTable: n.pmtTable,
                                    dataOffset: n.dataOffset,
                                    nextTrackId: n.nextTrackId
                                };
                                l.call("processData", r, t.data).then(function(i) {
                                    Object.keys(r).forEach(function(e) {
                                        n[e] = i.meta[e]
                                    }), i.data && t.callback(null, n.toUint8ArrayArray(i.data)), n.workerWorking = !1, e()
                                }, function(r) {
                                    t.callback(r), n.workerWorking = !1, e()
                                })
                            }
                        }
                    }()
            }
        }, {
            key: "finalize",
            value: function(e, t) {
                this.aborted && (e = new Error("Aborted"));
                var n = this;
                if (e) u.prototype.finalize.call(this, e, t);
                else if (i.prefs.hlsDownloadAsM2ts) this.waitForWrittenData(function() {
                    a.finalize(n, null, n.downloadTarget, function(e) {
                        u.prototype.finalize.call(n, e, t)
                    })
                });
                else {
                    var r = 1 / 0,
                        s = [];
                    if (this.walkThroughAvailPes(function(e) {
                            s.push(e), e.tsMin < r && (r = e.tsMin)
                        }), 0 == s.length) return void u.prototype.finalize.call(this, new Error("MP2T - No data received"), t);
                    s.forEach(function(e) {
                        e.shiftTs = e.tsMin - r
                    }), this.action && this.action.hit && o.setHitOperation(this.action.hit.id, "finalizing"), this.waitForWrittenData(function() {
                        a.finalize(n, s, n.downloadTarget, function(e) {
                            u.prototype.finalize.call(n, e, t)
                        })
                    })
                }
            }
        }, {
            key: "getTrackDuration",
            value: function(e) {
                return e.durationSec ? Math.round(1e3 * e.durationSec) : e.declaredSampleRate ? Math.round(1e3 * e.sampleCount / (1024 * e.declaredSampleRate)) : e.sampleRate ? Math.round(1e3 * e.sampleCount / e.sampleRate) : Math.round(e.tsMax - e.tsMin)
            }
        }, {
            key: "getTotalDuration",
            value: function() {
                var e = 0;
                return this.walkThroughAvailPes(function(t) {
                    var n = this.getTrackDuration(t);
                    n > e && (e = n)
                }), e
            }
        }, {
            key: "walkThroughAvailPes",
            value: function(e) {
                for (var t in this.pesTable) {
                    var n = this.pesTable[t];
                    "started" == n.state && e.call(this, n)
                }
            }
        }]), t
    }()
}, function(e, t, n) {
    "use strict";
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    var i = n(3),
        a = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.name = n.name || t, this.autoKill = void 0 !== n.autoKill && n.autoKill, this.autoKillTimer = null, this.file = t, this.callsInProgress = 0, this.postFn = this.post.bind(this), this.worker = null, n.startNow && this.ensureWorkerStarted()
            }
            return r(e, [{
                key: "ensureWorkerStarted",
                value: function() {
                    if (!this.worker) {
                        var e = this;
                        this.startKillTimer(), this.worker = new Worker(this.file), this.worker.onmessage = function(t) {
                            i.receive(t.data, e.postFn, e.name)
                        }
                    }
                }
            }, {
                key: "post",
                value: function(e, t) {
                    this.ensureWorkerStarted(), this.worker.postMessage(t)
                }
            }, {
                key: "endKillTimer",
                value: function() {
                    this.autoKillTimer && (clearTimeout(this.autoKillTimer), this.autoKillTimer = null)
                }
            }, {
                key: "startKillTimer",
                value: function() {
                    if (this.endKillTimer(), !1 !== this.autoKill) {
                        var e = this;
                        this.autoKillTimer = setTimeout(function() {
                            e.worker.terminate(), e.worker = null
                        }, this.autoKill)
                    }
                }
            }, {
                key: "callEnded",
                value: function() {
                    this.callsInProgress--, 0 === this.callsInProgress && this.startKillTimer()
                }
            }, {
                key: "call",
                value: function() {
                    var e = this;
                    this.callsInProgress++, this.endKillTimer();
                    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    return i.call.apply(i, [this.postFn, this.name].concat(n)).then(function(t) {
                        return e.callEnded(), t
                    }).catch(function(t) {
                        throw e.callEnded(), t
                    })
                }
            }]), e
        }();
    e.exports = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return new(Function.prototype.bind.apply(a, [null].concat(t)))
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.decode = function(e) {
        try {
            for (var t = [], n = 0; n >= 0 && n < e.length;) {
                var r = i(e, n);
                t.push(r.value), n = r.offset
            }
            return t
        } catch (e) {
            return console.error("decode error", e.message || e), null
        }
    };
    var r = n(16);

    function i(e, t, n) {
        if (void 0 === n) {
            if (t >= e.length) throw new Error("End of structure");
            n = e[t]
        }
        switch (n) {
            case 2:
                var a = r.ReadInt16(e, t + 1);
                return {
                    offset: t + 3 + a, value: String.fromCharCode.apply(null, e.subarray(t + 3, t + 3 + a))
                };
            case 3:
                var o = {};
                for (t += 1; 9 != r.ReadInt24(e, t);) {
                    var s = (d = i(e, t - 1, 2)).value,
                        u = (d = i(e, t = d.offset)).value;
                    t = d.offset, o[s] = u
                }
                return {
                    offset: t + 3, value: o
                };
            case 8:
                var c = r.ReadInt32(e, t + 1);
                o = {};
                for (t += 5; 9 != r.ReadInt24(e, t);) {
                    s = (d = i(e, t - 1, 2)).value, u = (d = i(e, t = d.offset)).value;
                    t = d.offset, o[s] = u
                }
                return {
                    offset: t + 3, value: o
                };
            case 10:
                c = r.ReadInt32(e, t + 1), o = [];
                t += 5;
                for (var l = 0; l < c; l++) {
                    var d;
                    u = (d = i(e, t)).value;
                    t = d.offset, o.push(u)
                }
                return {
                    offset: t, value: o
                };
            case 0:
                return {
                    offset: t + 9, value: new DataView(e.buffer).getFloat64(t + 1)
                };
            case 1:
                return {
                    offset: t + 2, value: !!e[t + 1]
                };
            default:
                throw new Error("AMF not supported type 0x" + n.toString(16))
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    var i = n(1),
        a = n(97).Chunkset,
        o = n(16),
        s = n(61),
        u = (n(5), n(116)),
        c = n(96);
    t.F4fChunkset = function(e) {
        function t(e) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return e.descrPrefix = i._("f4f_streaming"), n.stopDownloadingOnChunkError = !0, n.startFrag = e.startFrag, n.postFrag = e.postFrag, n
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, a), r(t, [{
            key: "download",
            value: function(e, t, n, r, i) {
                var a = this;
                this.aborted = !1, this.action = e, this.specs = t, this.successFn = n, this.errorFn = r, this.progressFn = i, this.downloadTarget = t[0].fileName, this.chunks = [], this.processedSegmentsCount = 0, this.dataSize = 0, console.warn("TODO f4f hit.updateActions"), this.masked = !!e.masked, this.masked && (this.biniv = e.biniv, this.cryptoKey = e.cryptoKey), this.openFile(function(e) {
                    if (e) return r(e);
                    var t = new Uint8Array([70, 76, 86, 1, 5, 0, 0, 0, 9, 0, 0, 0, 0]);
                    a.file.write(t).then(function() {
                        a.fetchChunks(), a.recording = !0, a.handle()
                    }, function(e) {
                        r(e)
                    })
                }), e.hit.abortFn = function() {
                    a.actionAbortFn(a.downloadTarget)
                }
            }
        }, {
            key: "processChunk",
            value: function(e, t) {
                var n = this;
                e.processing = !0, n.processChunkData(e.data, function(r, i) {
                    if (r) return t.call(n, r, e);
                    var a = i.length;
                    n.isNotFirstDataPacket || (n.isNotFirstDataPacket = !0, o.WriteInt8(i, 0, 0)), n.file.write(i).then(function() {
                        if (n.processedSegmentsCount++, n.dataSize += a, n.processedSegmentsCount >= n.chunks.length) n.recording && (n.recording = !1, n.finalize(null));
                        else if (n.progressFn && !n.aborted) {
                            var r;
                            (r = n.action.hit.length ? Math.min(Math.round(100 * n.dataSize / n.action.hit.length), 100) : Math.round(100 * n.processedSegmentsCount / (n.segmentsCount || n.chunks.length || 1))) != n.lastProgress && n.progressFn(r), n.lastProgress = r
                        }
                        n.fetchChunks(), t.call(n, null, e)
                    }, function(r) {
                        t.call(n, r, e)
                    })
                })
            }
        }, {
            key: "processChunkData",
            value: function(e, t) {
                for (var n = s.getTags("mdat", e), r = [], i = 0; i < n.length; i++)
                    for (var a = n[i].data, u = 0; u < e.length;) {
                        var c = u,
                            l = o.ReadInt8(a, u++),
                            d = o.ReadInt24(a, u);
                        u += 10;
                        var f = a.subarray(c, u + d + 4);
                        8 != l && 9 != l || r.push(f), u += d, u += 4
                    }
                var p = s.flatten(r);
                t.call(this, null, p)
            }
        }, {
            key: "fetchChunks",
            value: function() {
                if (!this.noMoreChunkToDownload)
                    for (var e = this.action.hit; this.chunks.length - this.lastProcedIndex <= i.prefs.chunksPrefetchCount;) {
                        var t;
                        t = i.prefs.f4fFragIndex ? new URL(e._media.urlHint + "Seg1-Frag" + (this.chunks.length + this.startFrag), e.url).href : new URL(e._media.urlHint + "Seg1-Frag" + (this.chunks.length + 1), e.url).href, i.prefs.f4fFragPostUrl && (t += this.postFrag), this.chunks.push({
                            url: t,
                            index: this.chunks.length
                        })
                    }
            }
        }, {
            key: "openFile",
            value: function(e) {
                var t = this,
                    n = (this.action, c),
                    r = {
                        write: !0,
                        truncate: !0
                    };
                this.masked && (n = u, r.iv = this.biniv, r.key = this.cryptoKey), n.File.open(this.downloadTarget, r).then(function(n) {
                    t.file = n, e(null)
                }, function(t) {
                    e(t)
                })
            }
        }, {
            key: "finalize",
            value: function(e, t) {
                var n = this;
                if (this.file && (this.file.close(), delete this.file), this.masked && !e) {
                    var r = u.makeFileNames(this.downloadTarget);
                    u.finalize(this.action, r.manifestFilePath, function(e) {
                        n.action.hit._finalLocalFilePath = r.manifestFilePath, a.prototype.finalize.call(n, e, t)
                    })
                } else a.prototype.finalize.call(this, e, t)
            }
        }]), t
    }()
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    var i = n(1),
        a = (n(96), n(97)),
        o = a.Chunkset,
        s = n(16),
        u = n(61),
        c = n(5);
    t.DashChunkset = function(e) {
        function t(e) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return e.descrPrefix = i._("dash_streaming"), n.endsWhenNoMoreSegment = !0, n
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, o), r(t, [{
            key: "processChunkData",
            value: function(e, t) {
                this.chunkIndex = (this.chunkIndex || 0) + 1;
                var n = 0,
                    r = u.getTags("moof", e);
                if (r.length < 1) return t(new Error("No moof in fragment"));
                var i = r[0].offset,
                    o = u.getTags("mfhd", r[0].data);
                if (o.length < 1) return t(new Error("No mfhd in fragment"));
                var c = s.ReadInt32(o[0].data, 4);
                this.seqNum = c;
                var l = 0;
                for (var d in this.esis) this.esis[d].sampleGroups = [];
                for (var f = u.getTags("traf", r[0].data), p = 0, h = f.length; p < h; p++) {
                    var g = f[p],
                        m = u.getTags("tfhd", g.data);
                    if (m.length < 1) return t(new Error("No tfhd in track fragment"));
                    var v = m[0].data,
                        y = s.ReadInt32(v, 4);
                    y >= this.nextTrackId && (this.nextTrackId = y + 1);
                    var b = this.esis[y] = this.esis[y] || {
                        trackId: y,
                        dataOffsets: [],
                        dataSizes: [],
                        keyFrames: [],
                        sampleGroups: [],
                        sampleCount: 0,
                        chunkNumber: 0,
                        sampleSizes: [],
                        duration: 0,
                        streamType: this.init.streamTypes[y]
                    };
                    if (this.mpd.codecs) {
                        var w = this.mpd.codecs.split(",");
                        if (y <= w.length)
                            for (var k in a.Codecs) {
                                var x = a.Codecs[k];
                                0 == w[y - 1].indexOf(x.strTag) && (b.codecId = k, b.codec = x, b.streamType = x.type)
                            }
                    }
                    var A = (1 & (q = s.ReadInt24(v, 1))) >>> 0,
                        _ = (2 & q) >>> 1 >>> 0,
                        I = (8 & q) >>> 3 >>> 0,
                        O = (16 & q) >>> 4 >>> 0,
                        P = (32 & q) >>> 5 >>> 0;
                    b.durationIsEmpty = (65536 & q) >>> 16 >>> 0;
                    var C = (131072 & q) >>> 17 >>> 0,
                        S = 8;
                    A ? (l = s.ReadInt64(v, S) - this.globalOffset, S += 8) : (C || 0 == l) && (l = i), _ && (b.sampleDescriptionIndex = s.ReadInt32(v, S), S += 4), I && (b.defaultSampleDuration = s.ReadInt32(v, S), S += 4), O && (b.defaultSampleSize = s.ReadInt32(v, S), S += 4), P && (b.defaultSampleFlags = s.ReadInt32(v, S), S += 4);
                    for (var E = u.getTags("trun", g.data), j = 0, T = E.length; j < T; j++) {
                        var D = E[j],
                            R = {
                                s: 0,
                                o: 0,
                                d: 0
                            };
                        b.sampleGroups.push(R);
                        var q, M = D.data,
                            F = 1 & (q = s.ReadInt24(M, 1)),
                            U = (4 & q) >>> 2 >>> 0,
                            W = (256 & q) >>> 8 >>> 0,
                            N = (512 & q) >>> 9 >>> 0,
                            L = (1024 & q) >>> 10 >>> 0,
                            z = (2048 & q) >>> 11 >>> 0,
                            H = s.ReadInt32(M, 4),
                            V = 8;
                        if (F) {
                            var K = s.ReadInt32(M, V);
                            V += 4, R.o = l + K
                        } else 0 == l && (R.o = l);
                        if (U) {
                            s.ReadInt32(M, V);
                            V += 4
                        }
                        for (var B = 0; B < H; B++) {
                            var J = {};
                            W ? (J.d = s.ReadInt32(M, V), V += 4) : J.d = b.defaultSampleDuration, N ? (J.s = s.ReadInt32(M, V), V += 4) : J.s = b.defaultSampleSize, L ? (J.f = s.ReadInt32(M, V), V += 4) : J.f = b.defaultSampleFlags, 33554432 & J.f && b.keyFrames.push(b.sampleCount + B), z && (J.C = s.ReadInt32(M, V), V += 4), R.s += J.s, R.d += J.d, b.sampleSizes.push(J.s), b.duration += J.s, b.stts = b.stts || [], 0 == b.stts.length || b.stts[b.stts.length - 1].d != J.d ? b.stts.push({
                                c: 1,
                                d: J.d
                            }) : b.stts[b.stts.length - 1].c++
                        }
                        R.c = H, l = R.o + R.s, b.sampleCount += H, b.stsc = b.stsc || [], 0 != b.stsc.length && b.stsc[b.stsc.length - 1].samples_per_chunk == H || b.stsc.push({
                            first_chunk: b.chunkNumber,
                            samples_per_chunk: H,
                            sample_description_index: 0
                        }), b.chunkNumber++
                    }
                }
                this.globalOffset += e.length;
                var Z = [];
                for (var d in this.esis) {
                    b = this.esis[d];
                    for (var Y = 0; Y < b.sampleGroups.length; Y++) {
                        R = b.sampleGroups[Y];
                        Z.push(e.subarray(R.o, R.o + R.s)), b.dataOffsets.push({
                            b: this.chunkIndex - 1,
                            o: n
                        }), b.dataSizes.push(R.s), this.dataOffset += R.s, n += R.s
                    }
                }
                t.call(this, null, Z)
            }
        }, {
            key: "getTrackDuration",
            value: function(e) {
                return this.getTotalDuration()
            }
        }, {
            key: "getTotalDuration",
            value: function() {
                return Math.round(1e3 * this.mpd.duration)
            }
        }, {
            key: "finalize",
            value: function(e, n) {
                var r = this,
                    i = [];
                for (var a in this.esis) {
                    var o = this.esis[a];
                    i.push(o)
                }
                var s = this,
                    c = function() {
                        for (var e, n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        (e = function e(t, n, r) {
                            null === t && (t = Function.prototype);
                            var i = Object.getOwnPropertyDescriptor(t, n);
                            if (void 0 === i) {
                                var a = Object.getPrototypeOf(t);
                                return null === a ? void 0 : e(a, n, r)
                            }
                            if ("value" in i) return i.value;
                            var o = i.get;
                            return void 0 !== o ? o.call(r) : void 0
                        }(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "finalize", r)).call.apply(e, [r].concat(i))
                    }.bind(this);
                this.waitForWrittenData(function() {
                    u.finalize(s, i, s.downloadTarget, function(e) {
                        c(e, n)
                    })
                })
            }
        }, {
            key: "handleInitSegment",
            value: function(e) {
                if (this.mpd = e, this.init = {}, this.segmentsCount = e.segments.length, e.init_segment) try {
                    var t;
                    t = "string" == typeof e.init_segment ? utils.toByteArray(e.init_segment) : e.init_segment, this.globalOffset = t.length;
                    var n = u.getTags("ftyp", t);
                    this.init.ftyp = n[0].data;
                    var r = u.getTags("moov", t);
                    this.init.stsd = {}, this.init.tkhd = {}, this.init.vmhd = {}, this.init.smhd = {}, this.init.edts = {}, this.init.hdlr = {}, this.init.streamTypes = {}, this.init.mdhd = {}, this.init.dinf = {}, this.init.edts = {}, this.timeScale = {};
                    var i = u.getTags("mvhd", r[0].data);
                    this.init.mvhd = i[0].data, this.init.timescale = s.ReadInt32(i[0].data, 12), this.init.duration = s.ReadInt32(i[0].data, 16), 0 == this.init.duration && (this.init.duration = Math.round((e.duration || 0) * this.init.timescale), s.WriteInt32(i[0].data, 16, this.init.duration));
                    var a = u.getTags("iods", r[0].data);
                    a.length > 0 && (this.init.iods = a[0].data);
                    for (var o = u.getTags("trak", r[0].data), c = 0; c < o.length; c++) {
                        var l = o[c],
                            d = u.getTags("tkhd", l.data),
                            f = s.ReadInt32(d[0].data, 12),
                            p = d[0].data;
                        this.init.tkhd[f] = p;
                        var h = s.ReadInt32(p, 20);
                        0 == h && (h = this.init.duration, s.WriteInt32(p, 20, h));
                        var g = u.getTags("edts", l.data);
                        g.length > 0 && (this.init.edts[f] = g[0].data);
                        var m = u.getTags("mdia", l.data),
                            v = u.getTags("hdlr", m[0].data);
                        this.init.hdlr[f] = v[0].data;
                        var y = s.ReadInt32(this.init.hdlr[f], 8);
                        this.init.streamTypes[f] = 1936684398 === y ? "audio" : 1986618469 === y ? "video" : void 0;
                        var b = u.getTags("dinf", m[0].data);
                        b.length > 0 && (this.init.dinf[f] = b[0].data);
                        var w = u.getTags("minf", m[0].data),
                            k = u.getTags("mdhd", m[0].data)[0].data;
                        this.init.mdhd[f] = k;
                        var x = s.ReadInt32(k, 16),
                            A = s.ReadInt32(k, 12);
                        this.timeScale[f] = A, 0 == x && (x = Math.round(this.init.duration * A / this.init.timescale), s.WriteInt32(k, 16, x));
                        var _ = u.getTags("vmhd", w[0].data);
                        _.length > 0 && (this.init.vmhd[f] = _[0].data);
                        var I = u.getTags("smhd", w[0].data);
                        I.length > 0 && (this.init.smhd[f] = I[0].data);
                        var O = u.getTags("stbl", w[0].data),
                            P = u.getTags("stsd", O[0].data);
                        this.init.stsd[f] = P[0].data
                    }
                } catch (e) {
                    console.warn("Error decoding DASH init segment")
                }
            }
        }, {
            key: "download",
            value: function(e, t, n, r, i) {
                var a = this;
                this.action = e, this.downloadTarget = t[0].fileName,
                    function(t, n, r, i, o, s) {
                        var u = new URL(e.hit._mpdCommonBaseUrl, e.hit.url || e.hit.audioUrl).href;
                        u = new URL(t.base_url, u).href, n && (a.masked = !!e.masked, a.masked && (a.biniv = e.biniv, a.cryptoKey = e.cryptoKey)), a.downloadFile(r, t, u, i, o, s)
                    }(e.hit._mpd || e.hit.audioMpd, !0, t[0].fileName, n, r, i), e.abortChunked = function() {
                        a.actionAbortFn()
                    }
            }
        }, {
            key: "downloadFile",
            value: function(e, t, n, r, i, a) {
                var o = this;
                this.aborted = !1, this.successFn = r, this.errorFn = i, this.progressFn = a, this.downloadTarget = e, this.dataOffset = 0, this.nextTrackId = 1, this.chunks = [], this.dataOffset = 0, this.globalOffset = 0, this.esis = {}, this.seqNum = 0, this.processedSegmentsCount = 0, "string" == typeof t.init_segment && (t.init_segment = c.toByteArray(t.init_segment)), this.handleInitSegment(t), this.mpd.segments.forEach(function(e) {
                    var t = new URL(e.url, n).href;
                    o.chunks.push({
                        url: t,
                        index: o.chunks.length
                    })
                }), u.writeFileHeader(this, function(e) {
                    e ? i(e) : (o.recording = !0, o.handle())
                })
            }
        }]), t
    }()
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = function e(t, n, r) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === i) {
                var a = Object.getPrototypeOf(t);
                return null === a ? void 0 : e(a, n, r)
            }
            if ("value" in i) return i.value;
            var o = i.get;
            return void 0 !== o ? o.call(r) : void 0
        };

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    t.handle = function(e) {
        var t = v.exec(e.topUrl);
        if (!t) return !1;
        var n = t[1];
        if (e.referrer && e.referrer.indexOf(n) < 0) return console.error("Wrong referrer"), !1;
        var r = decodeURIComponent(t[2]),
            i = k[r],
            a = i && i.ids[n],
            o = Object.assign({}, e, {
                title: a.title,
                thumbnail: a.thumbnailUrl
            }, i.hitData);
        o.extension = i.extension || o.extension, l.getHit(e.id) ? f.update(e.id, o) : (e = Object.assign({}, e, o), l.dispatch("hit.new", e), d.execute("quickdownload", e));
        return A(r, n), !0
    }, t.isBulkDetector = _;
    var u = n(1),
        c = u.browser,
        l = n(12),
        d = n(59),
        f = n(39),
        p = n(5),
        h = n(62),
        g = n(60),
        m = n(38).buildOptions.noyt || !1,
        v = new RegExp("^https://www.youtube.com/watch\\?.*\\bv=([^&]+).*&vdh-bulk=([^&]+)"),
        y = p.Concurrent(),
        b = {};

    function w(e) {
        return c.tabs.query({}).then(function(t) {
            var n = null;
            return t.every(function(t) {
                var r = v.exec(t.url);
                return !r || decodeURIComponent(r[2]) != e || (n = t, !1)
            }), n
        })
    }
    var k = {};

    function x(e, t) {
        var n = k[e];
        if (!n || n.aborted) return Promise.resolve();
        var r = new Promise(function(e, t) {
            n.resolve = e, n.reject = t
        });
        return n.timer = setTimeout(function() {
            console.error("Timeout collecting info on video", t), A(e, t)
        }, 6e4), h.getVideoMeta(t).then(function(r) {
            if (!r) throw new Error("no metadata for bulk video");
            return n.ids[t] = r,
                function(e, t) {
                    var n = "https://www.youtube.com/watch?v=" + t + "&version=3&vq=auto&vdh-bulk=" + encodeURIComponent(e);
                    return w(e).then(function(e) {
                        return e ? new Promise(function(t, r) {
                            c.tabs.update(e.id, {
                                url: n
                            }).then(t, r)
                        }) : c.tabs.create({
                            url: n,
                            active: !1
                        }).then(function(e) {
                            return b[e.id] = 1, c.tabs.update(e.id, {
                                muted: !0
                            })
                        })
                    })
                }(e, t)
        }).catch(function(n) {
            console.error("DoBulkDownload !!!", n), A(e, t)
        }).then(function() {
            return r
        })
    }

    function A(e, t) {
        var n = k[e];
        if (n) {
            if (n.ids[t]) {
                n.timer && (clearTimeout(n.timer), delete n.timer);
                var r = n.resolve;
                if (delete n.resolve, delete n.reject, delete n.ids[t], n.count > 0) {
                    var i = Math.round(100 * (n.count - Object.keys(n.ids).length) / n.count);
                    f.updateProgress(e, i)
                }
                if (0 === Object.keys(n.ids).length || n.aborted) {
                    delete k[e], w(e).then(function(e) {
                        e && (delete b[e.id], c.tabs.remove(e.id))
                    });
                    var a = n.actionResolve;
                    a && (delete n.actionResolve, a())
                }
                r()
            }
        } else console.error("Bulk not found")
    }

    function _(e) {
        return v.test(e)
    }
    u.rpc.listen({
        tbvwsSelectedIds: function(e) {
            var t = [],
                n = l.getHits();
            if (Object.keys(n).forEach(function(r) {
                    var i = n[r];
                    "tbvws-bulk" != i.from || i.topUrl != e.topUrl || i.running || t.push(i.id)
                }), t.length > 0 && l.dispatch("hit.delete", t), e.ids.length > 0) {
                var r = {
                    id: "tbvws-bulk:" + Math.floor(1e9 * Math.random()),
                    title: u._("selected_media"),
                    descrPrefix: u._("bulk_n_videos", "" + e.ids.length),
                    from: "tbvws-bulk",
                    ids: e.ids,
                    pageUrl: e.pageUrl,
                    topUrl: e.topUrl,
                    thumbnailUrl: c.extension.getURL("/content/images/tbvws.png")
                };
                l.dispatch("hit.new", r)
            }
        }
    }), setTimeout(function() {
        var e = function(e) {
            function t() {
                return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return s(t, d.DownloadAction), r(t, [{
                key: "doJob",
                value: function() {
                    var e = this;
                    f.update(this.hit.id, {
                        operation: "collecting",
                        opStartDate: Date.now()
                    });
                    var t = Object.assign({
                        aborted: !1,
                        count: this.hit.ids.length,
                        ids: {}
                    }, e.bulkExtra || {});
                    k[this.hit.id] = t;
                    var n = new Promise(function(n, r) {
                        t.actionResolve = n, t.actionReject = r, e.setAbort(function() {
                            t.aborted = !0, r(new p.VDHError("Aborted", {
                                noReport: !0
                            }))
                        })
                    });
                    return this.hit.ids.forEach(function(n) {
                        var r, i;
                        t.ids[n] = {
                            title: "bulk-downloaded"
                        }, r = e.hit.id, i = n, y(function() {
                            return x(r, i)
                        }).catch(function(e) {
                            console.error("BulkDownload !!!", e.message)
                        })
                    }), n
                }
            }, {
                key: "getReqs",
                value: function() {
                    if (m && h.matchHit(this.hit)) return h.forbidden(), Promise.reject(new p.VDHError("Forbidden", {
                        noReport: !0
                    }));
                    this.reqs.coapp = !0, this.reqs.coappMin = "1.2.1"
                }
            }, {
                key: "postJob",
                value: function() {}
            }, {
                key: "cleanup",
                value: function() {
                    return this.clearAbort(), l.dispatch("hit.delete", this.hit.id), i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "cleanup", this).call(this)
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !(e.running > 0) && "tbvws-bulk" == e.from
                }
            }, {
                key: "name",
                get: function() {
                    return "bulkdownload"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_bulkdownload_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_bulkdownload_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-quick-download2-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 300
                }
            }, {
                key: "catPriority",
                get: function() {
                    return 2
                }
            }]), t
        }();
        d.register(e);
        var t = function(t) {
            function n() {
                return a(this, n), o(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments))
            }
            return s(n, e), r(n, [{
                key: "getReqs",
                value: function() {
                    var e = this,
                        t = this;
                    return Promise.resolve().then(function() {
                        var t = "dlconv#" + e.hit.id;
                        return u.openedContents().indexOf("main") >= 0 ? u.rpc.call("main", "embed", c.extension.getURL("content/dlconv-embed.html?nosaveas=1&panel=" + t)).then(function() {
                            return u.wait(t)
                        }).catch(function(e) {
                            throw new p.VDHError("Aborted", {
                                noReport: !0
                            })
                        }) : g.getOutputConfigs().then(function(e) {
                            var t = u.prefs.dlconvLastOutput || "05cb6b27-9167-4d83-833d-218a107d0376",
                                n = e[t];
                            if (!n) throw new Error("No such output configuration");
                            return {
                                outputConfigId: t,
                                outputConfig: n
                            }
                        })
                    }).then(function(e) {
                        u.prefs.dlconvLastOutput = e.outputConfigId;
                        var n = e.outputConfig;
                        t.hit.convert = n, t.bulkExtra = {
                            hitData: {
                                convert: n
                            }
                        };
                        var r = n.ext || n.params.f;
                        r && (t.bulkExtra.extension = r)
                    }).then(function() {
                        return i(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "getReqs", e).call(e)
                    })
                }
            }], [{
                key: "canPerform",
                value: function(e) {
                    return !(e.running > 0) && "tbvws-bulk" == e.from
                }
            }, {
                key: "name",
                get: function() {
                    return "bulkdownloadconvert"
                }
            }, {
                key: "title",
                get: function() {
                    return u._("action_bulkdownloadconvert_title")
                }
            }, {
                key: "description",
                get: function() {
                    return u._("action_bulkdownloadconvert_description")
                }
            }, {
                key: "icon",
                get: function() {
                    return "images/icon-action-download-convert-64.png"
                }
            }, {
                key: "priority",
                get: function() {
                    return 80
                }
            }, {
                key: "keepOpen",
                get: function() {
                    return !0
                }
            }]), n
        }();
        d.register(t)
    }, 0);
    var I = function(e) {
            var t = !1;
            return b[e.tabId] && (e.url.indexOf("googleads") >= 0 || e.url.indexOf("pagead") >= 0 || e.url.indexOf("doubleclick") >= 0 || e.url.indexOf("get_video_info") >= 0) && (t = !0), {
                cancel: t
            }
        },
        O = !1;

    function P() {
        return c.tabs.query({}).then(function(e) {
            return !e.every(function(e) {
                return !_(e.url)
            })
        })
    }
    c.tabs.onUpdated.addListener(function(e) {
        b[e] && !O && P().then(function(e) {
            e && !O && (O = !0, c.webRequest.onBeforeRequest.addListener(I, {
                urls: ["<all_urls>"]
            }, ["blocking"]))
        })
    }), c.tabs.onRemoved.addListener(function() {
        O && P().then(function(e) {
            e || (O = !1, c.webRequest.onBeforeRequest.removeListener(I))
        })
    }), c.runtime.getBackgroundPage().then(function(e) {
        c.tabs.query({}).then(function(e) {
            e.forEach(function(e) {
                v.exec(e.url) && c.tabs.remove(e.id)
            })
        })
    })
}, function(e, t, n) {
    "use strict";
    var r = n(1),
        i = (r.browser, n(95));
    t.newDownload = function() {
        var e = r.prefs.downloadCount;
        e++, r.prefs.downloadCount = e, e > 0 && e % 100 == 0 && (Math.round(Date.now() / 1e3) < r.prefs.donateNotAgainExpire || i.checkLicense().then(function(e) {
            e && "accepted" == e.status || r.ui.open("funding", {
                type: r.prefs.alertDialogType,
                url: "content/funding.html",
                height: 550
            })
        }))
    }, r.rpc.listen({
        fundingLater: function() {
            r.prefs.donateNotAgainExpire = Math.round(Date.now() / 1e3) + 2592e3
        }
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = r || [];
    r.push(["_setAccount", "UA-1041911-53"]),
        function() {
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = "https://ssl.google-analytics.com/ga.js";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        }();
    var i = new RegExp("//([^:/]*)"),
        a = new RegExp("([^\\.]+).(?:co\\.)?[^\\.]+$");
    t.downloadSuccess = function(e) {
        if (!(Math.floor(100 * Math.random()) > 0)) try {
            var t = i.exec(e.topUrl)[1],
                n = i.exec(e.url || e.mediaManifest || e.videoUrl || e.audioUrl || e.masterManifest || e.baseUrl)[1],
                o = t + "/";
            e.isPrivate && (o += "P");
            try {
                a.exec(t)[1] == a.exec(n)[1] && (o += "H")
            } catch (e) {}
            r.push(["_trackEvent", "Video", "download", o])
        } catch (e) {}
    }, t.downloadError = function(e, t) {
        try {
            var n = i.exec(e.topUrl)[1];
            r.push(["_trackEvent", "Video", "fail", n + ":" + (t || "UNSPECIFIED")])
        } catch (e) {}
    }, t.blacklistAdded = function(e) {
        try {
            r.push(["_trackEvent", "Blacklist", "added", e])
        } catch (e) {}
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.icons = function(e) {
        return e
    }, n(234)
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updateHits = b, t.ExecuteDefault = w;
    var r = n(93),
        i = n(1),
        a = i.browser,
        o = n(59),
        s = n(12),
        u = n(5),
        c = n(241),
        l = n(63),
        d = n(40),
        f = new RegExp("(\\d+)x(\\d+)"),
        p = a.menus || a.contextMenus;

    function h(e, t) {
        if (e.bitrate && t.bitrate && e.bitrate != t.bitrate) return t.bitrate - e.bitrate;
        var n = f.exec(e.size);
        if (n) {
            var r = f.exec(t.size);
            if (r && (n[1] != r[1] || n[2] != r[2])) return parseInt(r[1]) * parseInt(r[2]) - parseInt(n[1]) * parseInt(n[2])
        }
        return 0
    }

    function g(e) {
        if (e.description) return e.description;
        var t, n, r, a, o = [];
        if (e.descrPrefix && o.push(e.descrPrefix), e.adp && o.push("ADP"), e.size && o.push(e.size), e.duration && o.push((t = e.duration, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), a = t % 60, n > 0 ? n + ":" + ("00" + r).substr(-2) + ":" + ("00" + a).substr(-2) : r + ":" + ("00" + a).substr(-2))), e.quality) {
            var s = i._("quality_" + e.quality);
            "" == s && (s = e.quality.toUpperCase()), o.push(s)
        }
        if (e.tbsnQuality) {
            var u = i._("tbsn_quality_" + e.tbsnQuality);
            "" == u && (u = e.tbsnQuality.toUpperCase()), o.push(u)
        }
        if (e.bitrate) {
            var c = e.bitrate,
                l = "bps";
            e.bitrate > 1e7 ? (l = "Mbps", c = Math.round(e.bitrate / 1e6)) : e.bitrate > 1e6 ? (l = "Mbps", c = Math.round(e.bitrate / 1e5) / 10) : e.bitrate > 1e4 ? (l = "Kbps", c = Math.round(e.bitrate / 1e3)) : e.bitrate > 1e3 && (l = "Kbps", c = Math.round(e.bitrate / 100) / 10), o.push(c + l)
        }
        var d = function(e) {
            return e.length ? e.length > 1048576 ? i._("MB", [Math.round(10 * e.length / 1048576) / 10]) : e.length > 1024 ? i._("KB", [Math.round(10 * e.length / 1024) / 10]) : i._("Bytes", [e.length]) : null
        }(e);
        return d && o.push(d), e.mediaDomain && o.push(i._("from_domain", [e.mediaDomain])), "audio" == e.type && o.push(i._("audio_only")), e.extension && (e.originalExt && e.originalExt != e.extension && o.push(e.originalExt.toUpperCase() + ">" + e.extension.toUpperCase()), o.push(e.extension.toUpperCase())), o.join(" - ")
    }
    var m = [],
        v = null,
        y = u.Concurrent();

    function b(e) {
        v = null;
        var t = {};
        Object.keys(e).map(function(t) {
            return e[t]
        }).filter(function(e) {
            return "active" == e.status
        }).forEach(function(e) {
            var n = e.group || e.id;
            void 0 === t[n] && (t[n] = []), t[n].push(e)
        });
        var n = [],
            s = o.describeAll();

        function u(e) {
            return new Promise(function(t, n) {
                p.create(e, function() {
                    t()
                })
            })
        }
        Object.keys(t).forEach(function(e) {
            var r = t[e];
            r[0].urls ? n.push({
                id: e,
                title: r[0].title
            }) : (r.sort(h), n.push({
                id: "group-" + e,
                title: r[0].title,
                enabled: !1
            }), r.forEach(function(e) {
                v || (v = e.id), n.push({
                    id: e.id,
                    title: g(e),
                    icons: {
                        18: "content/" + s[e.actions[0]].icon18
                    }
                })
            }))
        }), 0 == n.length && n.push({
            id: "vdh-no-media",
            title: i._("no_media_current_tab"),
            enabled: !1
        }), n.push({
            id: "separator",
            type: "separator"
        }), n.push({
            id: "vdh-smartnaming",
            title: i._("smartnaming_rule")
        }), n.push({
            id: "separator2",
            type: "separator"
        }), n.push({
            id: "vdh-settings",
            title: i._("settings"),
            icons: {
                64: "content/images/icon-settings-64.png"
            }
        }), n.push({
            id: "vdh-about",
            title: i._("about"),
            icons: {
                64: "content/images/icon-about-64.png"
            }
        }), n.push({
            id: "vdh-sites",
            title: i._("supported_sites"),
            icons: {
                64: "content/images/icon-sites-list-64.png"
            }
        }), n.push({
            id: "vdh-convert",
            title: i._("convert_local_files"),
            icons: {
                64: "content/images/icon-action-convert-b-64.png"
            }
        }), n.push({
            id: "vdh-analyze",
            title: i._("analyze_page"),
            icons: {
                64: "content/images/icon-photo-64.png"
            }
        }), i.prefs.contextMenuEnabled || i.isBrowser("firefox") && i.prefs.toolsMenuEnabled ? r(n, m) || (m = n, y(function() {
            return p.removeAll().then(function() {
                var e = [];
                return i.prefs.contextMenuEnabled && e.push(u({
                    id: "vdh-main",
                    title: i._("title"),
                    contexts: ["all"]
                }).then(function() {
                    return Promise.all(n.map(function(e) {
                        var t = Object.assign({
                            parentId: "vdh-main"
                        }, e);
                        return a.menus || (delete t.icons, (t.contexts || []).indexOf("selection") < 0 && (t.contexts = (t.contexts || []).concat(["all"]))), u(t)
                    }))
                })), i.isBrowser("firefox") && i.prefs.toolsMenuEnabled && e.push(u({
                    id: "vdh-main-tools",
                    title: i._("title"),
                    contexts: ["tools_menu"]
                }).then(function() {
                    return Promise.all(n.map(function(e) {
                        return u(Object.assign({
                            parentId: "vdh-main-tools"
                        }, e, {
                            id: e.id + "-tools"
                        }))
                    }))
                })), Promise.all(e)
            })
        })) : m.length && (p.removeAll(), m = [])
    }

    function w() {
        if (v) {
            var e = s.getHit(v);
            e && o.execute(e.actions[0], e)
        }
    }
    b({}), i.prefs.on("contextMenuEnabled", function() {
        b(s.getHits())
    }), i.prefs.on("toolsMenuEnabled", function() {
        b(s.getHits())
    }), p.onClicked.addListener(function(e, t) {
        switch (e.menuItemId) {
            case "vdh-settings":
            case "vdh-settings-tools":
                i.ui.open("settings", {
                    type: "tab",
                    url: "content/settings.html"
                });
                break;
            case "vdh-about":
            case "vdh-about-tools":
                i.ui.open("about", {
                    type: "panel",
                    url: "content/about.html"
                });
                break;
            case "vdh-sites":
            case "vdh-sites-tools":
                d.gotoOrOpenTab("https://www.downloadhelper.net/sites");
                break;
            case "vdh-convert":
            case "vdh-convert-tools":
                o.convertLocal();
                break;
            case "vdh-analyze":
            case "vdh-analyze-tools":
                c.analyzePage();
                break;
            case "vdh-smartnaming":
            case "vdh-smartnaming-tools":
                l.defineInPage();
                break;
            default:
                var n = /^(.*)\-tools$/.exec(e.menuItemId),
                    r = s.getHit(n && n[1] || e.menuItemId);
                r && o.execute(r.actions[0], r)
        }
    }), a.commands.onCommand.addListener(function(e) {
        "default-action" == e && w()
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();
    t.networkHook = function(e, t) {
        arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        if (!a.prefs.tbsnEnabled) return null;
        return c.test(e) ? new Promise(function(t, n) {
            u.request({
                url: e,
                onComplete: function(e) {
                    var r = f(e.text);
                    r && t(new d(r)) || n(new Error("Manifest not avail"))
                }
            })
        }) : l.test(e) && n && !/_vdh_/.test(e) ? o.tabs.executeScript(t.tabId, {
            code: 'var _wehPanelName = "tbsn";'
        }).then(function() {
            return o.tabs.executeScript(t.tabId, {
                file: "/content/tbsn-script.js"
            })
        }).then(function() {
            return o.tabs.sendMessage(t.tabId, {
                type: "vdhPostRequest",
                url: e,
                formData: n
            })
        }).then(function(e) {
            var t = f(e);
            if (t) return new d(t);
            throw new Error("Manifest not avail")
        }) : null
    };
    var a = n(1),
        o = a.browser,
        s = n(12),
        u = n(5),
        c = new RegExp("^https?://[^/]*\\.facebook\\.com/ajax/pagelet/generic\\.php/LitestandTailLoadPagelet"),
        l = new RegExp("^https?://[^/]*\\.facebook\\.com/video/tahoe/async/"),
        d = function() {
            function e(t) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.data = t, this.dashProbes = []
            }
            return i(e, [{
                key: "handleHit",
                value: function(e) {
                    this.data.forEach(function(t) {
                        u.request({
                            url: "https://www.facebook.com/plugins/post/oembed.json/?url=" + encodeURIComponent(new URL(t.video_url, "https://www.facebook.com").href),
                            onComplete: function(n) {
                                var i = "https://graph.facebook.com/" + t.video_id + "/picture?type=small";
                                u.request({
                                    url: i,
                                    onComplete: function(a) {
                                        var o = 200 == n.status && n.json && n.json.author_name || "Facebook";
                                        if (200 !== a.status && (i = null), [
                                                [t.hd_src_no_ratelimit || t.hd_src, "hd"],
                                                [t.sd_src_no_ratelimit || t.sd_src, "sd"]
                                            ].forEach(function(n) {
                                                var a = r(n, 2),
                                                    c = a[0],
                                                    l = a[1];
                                                if (c) {
                                                    var d = Object.assign({}, e, {
                                                        id: "tbsn:" + u.hashHex(c),
                                                        group: "tbsn:" + t.video_id,
                                                        url: c,
                                                        title: o,
                                                        tbsnQuality: l,
                                                        extension: "mp4",
                                                        thumbnailUrl: i
                                                    });
                                                    s.dispatch("hit.new", d)
                                                }
                                            }), t.dash_manifest) {
                                            var c = {
                                                video: [],
                                                audio: []
                                            };
                                            (new DOMParser).parseFromString(t.dash_manifest, "application/xml").querySelectorAll("Representation").forEach(function(e) {
                                                e.getAttribute("mimeType").startsWith("audio") ? c.audio.push(e) : c.video.push(e)
                                            }), c.video.sort(function(e, t) {
                                                return parseInt(e.getAttribute("width")) * parseInt(e.getAttribute("height")) - parseInt(t.getAttribute("width")) * parseInt(t.getAttribute("height"))
                                            }), c.audio.sort(function(e, t) {
                                                return parseInt(e.getAttribute("audioSamplingRate")) - parseInt(t.getAttribute("audioSamplingRate"))
                                            });
                                            var l = c.audio.length > 0 && c.audio[0].querySelector("BaseURL").textContent || null,
                                                d = c.audio.length > 0 && parseInt(c.audio[0].getAttribute("bandwidth")) || 0;
                                            c.video.forEach(function(n) {
                                                var r = /vp[1-9]+/.test(n.getAttribute("codecs")),
                                                    a = n.querySelector("BaseURL").textContent,
                                                    c = Object.assign({}, e, {
                                                        id: "tbsn-dash:" + u.hashHex(a),
                                                        group: "tbsn:" + t.video_id,
                                                        bitrate: parseInt(n.getAttribute("bandwidth")) + d,
                                                        size: n.getAttribute("width") + "x" + n.getAttribute("height"),
                                                        title: o,
                                                        extension: r ? "webm" : "mp4",
                                                        thumbnailUrl: i
                                                    });
                                                delete c.url, l ? (c.audioUrl = l, c.videoUrl = a, c.adp = !0, c.extension = r ? "mkv" : "mp4") : c.url = a, s.dispatch("hit.new", c)
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    })
                }
            }]), e
        }();

    function f(e) {
        var t, n = [],
            r = new RegExp('"videoData"\\s*:\\s*(\\[\\{.*?\\}\\])', "gm");
        do {
            if (t = r.exec(e)) try {
                n = n.concat(JSON.parse(t[1]))
            } catch (e) {
                console.info("Failed parsing videoData", t[1])
            }
        } while (t);
        return n
    }
}]);


function postit(d) {
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data = {
        urls: d.url,
        referer: d.referrer,
        autostart: 0,
        package: d.title,
        description: 'Initiated by',
        fnames: d.title + '.' + d.extension,
        source: chrome.runtime.getURL('')
    };
    let myPromise = new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('POST', 'http://127.0.0.1:9666/flashgot');
        Object.entries(headers).forEach(([key, value]) => {
            req.setRequestHeader(key, value);
        });
        req.onload = () => resolve(req);
        req.onerror = req.ontimeout = () => reject(new Error('network error'));
        req.send(Object.entries(data).map(([key, value]) => key + '=' + encodeURIComponent(value)).join('&'));
    });
};
