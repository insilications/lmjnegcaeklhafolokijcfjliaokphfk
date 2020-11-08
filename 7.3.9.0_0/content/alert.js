! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var a = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
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
    }, n.p = "", n(n.s = 278)
}({
    278: function(e, t, n) {
        e.exports = n(279)
    },
    279: function(e, t, n) {
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
        var a = createStore(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1];
            switch (t.type) {
                case "SET_WEH_DATA":
                    e = Object.assign({}, e, {
                        wehData: t.payload
                    }), t.payload.bodyClass && (document.body.className = t.payload.bodyClass)
            }
            return e
        });
        weh.rpc.listen({
            wehInitData: function(e) {
                a.dispatch({
                    type: "SET_WEH_DATA",
                    payload: e
                })
            }
        });
        var o = connect(function(e, t) {
            return e.wehData || {}
        })(function(e) {
            function t(e) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return n.state = {
                    notAgain: !1
                }, n
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
            }(t, React.Component), r(t, [{
                key: "onResize",
                value: function() {
                    var e = this;
                    return function(t, n) {
                        e.props.autoResize && (e.updateTimer && clearTimeout(e.updateTimer), e.updateHeightTimer = setTimeout(function() {
                            e.updateHeightTimer = null, weh.rpc.call("updateLastFocusedWindowHeight", n || e.rootElement.clientHeight, document.body.clientHeight)
                        }))
                    }
                }
            }, {
                key: "onClick",
                value: function(e, t, n) {
                    for (var r = arguments.length, a = Array(r > 3 ? r - 3 : 0), o = 3; o < r; o++) a[o - 3] = arguments[o];
                    var c = this;
                    return function() {
                        var r;
                        t && weh.trigger(Object.assign({
                            notAgain: c.state.notAgain
                        }, t)), n && (r = weh.rpc).call.apply(r, [n].concat(a)), e && weh.rpc.call("closePanel", weh.uiName)
                    }
                }
            }, {
                key: "onNotAgainChanged",
                value: function() {
                    var e = this;
                    return function(t) {
                        e.setState({
                            notAgain: t.target.checked
                        })
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = (this.props.buttons || []).map(function(t) {
                            return t = Object.assign({
                                close: !0,
                                rpcMethod: null,
                                rpcArgs: []
                            }, t), React.createElement("button", {
                                key: t.text,
                                onClick: e.onClick.apply(e, [t.close, t.trigger, t.rpcMethod].concat(function(e) {
                                    if (Array.isArray(e)) {
                                        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                                        return n
                                    }
                                    return Array.from(e)
                                }(t.rpcArgs))),
                                className: "btn " + (t.className || "")
                            }, t.text)
                        }),
                        n = this.props.text || null;
                    return Array.isArray(this.props.text) && (n = this.props.text.map(function(e) {
                        return React.createElement("p", {
                            key: e
                        }, e)
                    })), React.createElement("div", {
                        className: "alert-dialog",
                        ref: function(t) {
                            e.rootElement = t
                        }
                    }, React.createElement(WehHeader, {
                        title: this.props.title || ""
                    }), React.createElement("main", {
                        className: "alert-dialog-content"
                    }, n && React.createElement("div", {
                        className: this.props.centered ? "centered" : ""
                    }, n)), React.createElement("footer", null, React.createElement("div", null, this.props.notAgain && React.createElement("div", {
                        className: "not-again"
                    }, React.createElement("input", {
                        type: "checkbox",
                        onChange: this.onNotAgainChanged(),
                        value: this.state.notAgain,
                        id: "not-again"
                    }), React.createElement("label", {
                        htmlFor: "not-again"
                    }, this.props.notAgain)), this.props.buttons && React.createElement("div", {
                        className: "btn btn-toolbar float-right"
                    }, t))), React.createElement(ReactResizeDetector, {
                        handleHeight: !0,
                        onResize: this.onResize()
                    }))
                }
            }]), t
        }());
        render(React.createElement("div", {
            className: "weh-shf auto-height"
        }, React.createElement(Provider, {
            store: a
        }, React.createElement(o, null))), document.getElementById("root"))
    }
});