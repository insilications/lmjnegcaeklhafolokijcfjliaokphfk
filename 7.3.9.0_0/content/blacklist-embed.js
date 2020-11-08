! function(e) {
    var t = {};

    function n(a) {
        if (t[a]) return t[a].exports;
        var r = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, a) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: a
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
    }, n.p = "", n(n.s = 282)
}({
    282: function(e, t, n) {
        e.exports = n(283)
    },
    283: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var a = t[n];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                }
            }
            return function(t, n, a) {
                return n && e(t.prototype, n), a && e(t, a), t
            }
        }();
        var r = t.BlackListPanel = function(e) {
            function t(e) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return n.state = {
                    domains: {}
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
            }(t, React.Component), a(t, [{
                key: "change",
                value: function(e) {
                    var t = this;
                    return function(n) {
                        var a, r, o;
                        console.info("changed", e, n.target.checked), t.setState({
                            domains: Object.assign({}, t.state.domains, (a = {}, r = e, o = n.target.checked, r in a ? Object.defineProperty(a, r, {
                                value: o,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : a[r] = o, a))
                        })
                    }
                }
            }, {
                key: "save",
                value: function() {
                    var e = this;
                    return function() {
                        var t = Object.keys(e.state.domains).filter(function(t) {
                            return e.state.domains[t]
                        });
                        weh.rpc.call("addToBlacklist", t).then(function() {
                            e.props.closeWindow && e.props.closeWindow()
                        })
                    }
                }
            }, {
                key: "hasChecked",
                value: function() {
                    var e = this;
                    return !Object.keys(this.state.domains).every(function(t) {
                        return !e.state.domains[t]
                    })
                }
            }, {
                key: "componentWillMount",
                value: function() {
                    var e = this,
                        t = decodeURIComponent(new URL(document.URL).hash.substr(1));
                    console.info("hitId", t), weh.rpc.call("domainsFromHitId", t).then(function(t) {
                        var n = {};
                        t.forEach(function(e) {
                            n[e] = !1
                        }), e.setState({
                            domains: n
                        })
                    })
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this,
                        n = Object.keys(this.state.domains).sort().map(function(n, a) {
                            return React.createElement("div", {
                                key: n
                            }, React.createElement("input", {
                                type: "checkbox",
                                id: "id-" + n,
                                value: t.state[n],
                                onChange: e.change(n)
                            }), React.createElement("label", {
                                htmlFor: "id-" + n,
                                title: n
                            }, n))
                        });
                    return React.createElement("div", {
                        className: "weh-shf embeddable"
                    }, React.createElement("div", null, React.createElement("main", null, React.createElement("div", {
                        className: "blacklist"
                    }, React.createElement("div", {
                        className: "explain"
                    }, React.createElement("h3", null, weh._("add_to_blacklist")), React.createElement("p", null, weh._("add_to_blacklist_help"))), React.createElement("div", {
                        className: "domains"
                    }, n))), React.createElement("footer", null, React.createElement("div", {
                        className: "btn-toolbar justify-content-between"
                    }, React.createElement("div", null), React.createElement("div", {
                        className: "btn-group pull-right"
                    }, React.createElement("button", {
                        type: "button",
                        disabled: !this.hasChecked(),
                        onClick: this.save(),
                        className: "btn btn-outline-primary"
                    }, weh._("save")))))))
                }
            }]), t
        }();
        render(React.createElement(Embedder, null, React.createElement(r, {
            closeWindow: function() {
                return weh.rpc.call("closePopup")
            }
        })), document.getElementById("root"))
    }
});