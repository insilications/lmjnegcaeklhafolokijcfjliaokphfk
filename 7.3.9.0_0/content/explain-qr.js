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
    }, n.p = "", n(n.s = 341)
}({
    233: function(e, t, n) {
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
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function c(e, t) {
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
        n(41);
        var a = t.LicInfoPanelComponent = function(e) {
            function t(e) {
                i(this, t);
                var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return n.state = {
                    error: !1,
                    skus: null,
                    purchases: null,
                    premium: null,
                    unneeded: !1,
                    notSigned: !1
                }, n
            }
            return c(t, React.Component), r(t, [{
                key: "componentDidMount",
                value: function(e) {
                    this.getInApp()
                }
            }, {
                key: "getInApp",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = this;
                    browser.runtime.getPlatformInfo().then(function(n) {
                        "linux" != n.os || weh.prefs.linuxLicense ? weh.rpc.call("getInApp", e).then(function(e) {
                            t.setState({
                                notSigned: !!e.notSigned,
                                skus: e.skus,
                                purchases: e.purchases,
                                premium: e.premium
                            }, function() {
                                t.updateTitle(), t.props.forceOpen && t.props.forceOpen(!e.premium)
                            })
                        }) : t.setState({
                            unneeded: !0
                        }, function() {
                            t.updateTitle()
                        })
                    })
                }
            }, {
                key: "purchase",
                value: function(e) {
                    var t = this;
                    weh.rpc.call("inAppBuy", e).then(function(e) {
                        t.setState({
                            skus: e.skus,
                            purchases: e.purchases,
                            premium: e.premium
                        }, function() {
                            t.updateTitle(), t.props.forceOpen && t.props.forceOpen(!e.premium)
                        })
                    })
                }
            }, {
                key: "updateTitle",
                value: function() {
                    var e = weh._("chrome_licensing");
                    this.state.unneeded ? e = weh._("lic_status_unneeded") : this.state.notSigned ? e = weh._("chrome_premium_not_signed") : this.state.error ? e = weh._("chrome_premium_check_error") : null === this.state.skus || this.state.premium ? this.state.premium && (e = weh._("chrome_premium_mode")) : e = weh._("chrome_basic_mode"), this.props.updateTitle && this.props.updateTitle(e)
                }
            }, {
                key: "chromeSignIn",
                value: function() {
                    weh.rpc.call("goto", "https://support.google.com/chrome/answer/185277")
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = React.createElement("div", null, weh._("chrome_verif_premium"));
                    if (this.state.unneeded) t = React.createElement("div", null, weh._("lic_not_needed_linux"));
                    else if (this.state.notSigned) t = React.createElement("div", null, React.createElement("p", null, weh._("chrome_premium_need_sign")), React.createElement("a", {
                        href: "#",
                        onClick: this.chromeSignIn.bind(this)
                    }, weh._("chrome_signing_in")));
                    else if (this.state.error) t = React.createElement("div", null, weh._("chrome_verif_premium_error"));
                    else if (null === this.state.skus || this.state.premium) this.state.premium && (t = React.createElement("div", null, weh._("chrome_premium_source", weh._("chrome_inapp_" + this.state.premium.sku) || this.state.premium.localeData[0].title)));
                    else {
                        var n = this.state.skus.map(function(t) {
                            var n = weh._("chrome_inapp_not_avail"),
                                r = t.prices && t.prices[0];
                            return r && (r = "" + parseInt(r.valueMicros) / 1e6, /\.[0-9]$/.test(r) && (r += "0"), n = r + " " + t.prices[0].currencyCode, /monthly/.test(t.sku) ? n += " " + weh._("per_month") : /yearly/.test(t.sku) && (n += " " + weh._("per_year"))), React.createElement("div", {
                                className: "chrome-product",
                                key: t.sku
                            }, React.createElement("div", {
                                className: "chrome-product-title"
                            }, weh._("chrome_inapp_" + t.sku) || t.localeData[0].title), React.createElement("button", {
                                className: "btn btn-primary chrome-product-purchase",
                                disabled: !r,
                                onClick: e.purchase.bind(e, t.sku)
                            }, n), React.createElement("div", {
                                className: "chrome-product-descr"
                            }, weh._("chrome_inapp_descr_" + t.sku) || t.localeData[0].description))
                        });
                        t = React.createElement("div", null, React.createElement("div", {
                            className: "chrome-product-intro"
                        }, weh._("chrome_product_intro")), n)
                    }
                    return t = React.createElement("div", null, t, React.createElement("br", null), React.createElement("div", {
                        className: "btn-toolbar float-right"
                    }, React.createElement("button", {
                        className: "btn btn-outline-primary",
                        onClick: this.getInApp.bind(this, !0)
                    }, weh._("chrome_premium_recheck")))), React.createElement("div", null, t)
                }
            }]), t
        }();
        window.LicInfoPanel = function(e) {
            function t(e) {
                i(this, t);
                var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return n.state = {
                    title: weh._("chrome_licensing"),
                    forceOpen: !1
                }, n.updateTitle = n.updateTitle.bind(n), n.forceOpen = n.forceOpen.bind(n), n
            }
            return c(t, React.Component), r(t, [{
                key: "updateTitle",
                value: function(e) {
                    this.setState({
                        title: e
                    })
                }
            }, {
                key: "forceOpen",
                value: function(e) {
                    this.setState({
                        forceOpen: e
                    })
                }
            }, {
                key: "render",
                value: function() {
                    var e = React.createElement(a, Object.assign({
                        updateTitle: this.updateTitle,
                        forceOpen: this.forceOpen
                    }, this.props), null);
                    return React.createElement("div", null, React.createElement(CollapsibleSection, {
                        title: this.state.title,
                        content: e,
                        open: this.props.open || this.state.forceOpen
                    }))
                }
            }]), t
        }()
    },
    341: function(e, t, n) {
        e.exports = n(342)
    },
    342: function(e, t, n) {
        "use strict";
        var r = n(343);
        render(React.createElement("div", {
            className: "weh-shf"
        }, React.createElement("div", null, React.createElement(WehHeader, {
            title: weh._("about_qr")
        }), React.createElement("main", null, React.createElement(r.ExplainQR, null)))), document.getElementById("root")), weh.setPageTitle(weh._("about_qr"))
    },
    343: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.ExplainQR = void 0;
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
            i = n(233);
        t.ExplainQR = function(e) {
            function t(e) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                n.state = {
                    hit: {}
                };
                var r = n,
                    i = decodeURIComponent(new URL(document.URL).hash.substr(1));
                return weh.rpc.call("getHit", i).then(function(e) {
                    r.setState({
                        hit: e
                    })
                }), n
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
                key: "changedNotAgain",
                value: function(e) {
                    weh.prefs.qrMessageNotAgain = e.target.checked
                }
            }, {
                key: "render",
                value: function() {
                    return this.state.hit.id && React.createElement("div", {
                        className: "explain-qr"
                    }, React.createElement("div", {
                        className: "qr-text"
                    }, weh._("file_generated", this.state.hit.localFilePath)), React.createElement("div", {
                        className: "qr-text"
                    }, weh._("explain_qr1")), React.createElement("div", {
                        className: "qr-img"
                    }, React.createElement("img", {
                        src: "images/qr-video.png"
                    })), React.createElement(i.LicInfoPanelComponent, null), React.createElement("div", {
                        className: "not-again"
                    }, React.createElement("input", {
                        id: "checkbox1",
                        type: "checkbox",
                        onChange: this.changedNotAgain.bind(this)
                    }), React.createElement("label", {
                        htmlFor: "checkbox1"
                    }, weh._("not_see_again")))) || null
                }
            }]), t
        }()
    },
    41: function(e, t, n) {
        "use strict";
        ! function() {
            var e = this,
                t = function(t, n) {
                    var r, i = t.split("."),
                        o = window || e;
                    i[0] in o || !o.execScript || o.execScript("var " + i[0]);
                    for (; i.length && (r = i.shift());) i.length || void 0 === n ? o = o[r] ? o[r] : o[r] = {} : o[r] = n
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
    }
});