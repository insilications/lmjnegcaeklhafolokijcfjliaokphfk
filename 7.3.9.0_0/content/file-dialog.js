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
    }, n.p = "", n(n.s = 344)
}({
    344: function(e, t, n) {
        e.exports = n(345)
    },
    345: function(e, t, n) {
        "use strict";
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var i, c = e[Symbol.iterator](); !(r = (i = c.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            a = !0, o = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            a = function() {
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

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e, t) {
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
        var l = createStore(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                t = arguments[1];
            switch (t.type) {
                case "SET_WEH_DATA":
                    e = Object.assign({}, e, {
                        wehData: t.payload
                    });
                    break;
                case "SET_ERROR":
                    e = Object.assign({}, e, {
                        error: t.payload
                    })
            }
            return e
        });
        weh.rpc.listen({
            wehInitData: function(e) {
                l.dispatch({
                    type: "SET_WEH_DATA",
                    payload: e
                })
            }
        });
        var s = connect(function(e, t) {
                return Object.assign({}, e && e.wehData || {}, {
                    error: e && e.error || null
                })
            }, function(e) {
                return bindActionCreators({
                    setError: function(e) {
                        return {
                            type: "SET_ERROR",
                            payload: e
                        }
                    },
                    clearError: function() {
                        return {
                            type: "SET_ERROR",
                            payload: null
                        }
                    }
                }, e)
            })(function(e) {
                function t(e) {
                    o(this, t);
                    var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return n.state = {
                        files: [],
                        parents: [],
                        parent: "",
                        directory: null,
                        filename: null,
                        sortField: "date",
                        sortDir: -1,
                        modal: null,
                        dirExits: void 0,
                        selected: {},
                        outputConfig: null,
                        selectAll: !1
                    }, n
                }
                return c(t, React.Component), a(t, [{
                    key: "componentWillReceiveProps",
                    value: function(e) {
                        var t, n = this,
                            r = this;
                        weh.rpc.call("coappProxy", "path.homeJoin", e.directory).then(function(e) {
                            return t = e, r.init(t)
                        }).then(function() {
                            !r.state.dirExits && e.createDir && r.setState({
                                modal: {
                                    title: weh._("directory_not_exist"),
                                    body: weh._("directory_not_exist_body", t),
                                    buttons: [{
                                        text: weh._("no"),
                                        color: "secondary",
                                        click: function() {
                                            weh.trigger(null)
                                        }.bind(r)
                                    }, {
                                        text: weh._("yes"),
                                        color: "primary",
                                        click: function() {
                                            n.createDirectory(t)
                                        }.bind(r)
                                    }]
                                }
                            })
                        })
                    }
                }, {
                    key: "createDirectory",
                    value: function(e) {
                        var t = this;
                        weh.rpc.call("coappProxy", "fs.mkdirp", e).then(function() {
                            t.setState({
                                modal: null
                            }), t.init(e)
                        }).catch(function(e) {
                            t.props.setError(e)
                        })
                    }
                }, {
                    key: "init",
                    value: function(e) {
                        var t = this,
                            n = this;
                        return weh.rpc.call("coappProxy", "fs.stat", e).then(function() {
                            n.setState({
                                dirExits: !0
                            })
                        }).catch(function() {
                            n.setState({
                                dirExits: !1
                            })
                        }).then(function() {
                            return n.props.uniqueFilename ? weh.rpc.call("coappProxy", "makeUniqueFileName", e, t.props.filename).then(function(e) {
                                n.setState({
                                    directory: e.directory,
                                    filename: e.fileName
                                })
                            }) : weh.rpc.call("coappProxy", "path.homeJoin", e).then(function(t) {
                                n.setState({
                                    directory: t || e,
                                    filename: n.props.filename
                                })
                            }).catch(function(e) {
                                n.props.setError(e)
                            })
                        }).then(function() {
                            n.update(e)
                        })
                    }
                }, {
                    key: "getTitle",
                    value: function() {
                        return this.props.titleText || ""
                    }
                }, {
                    key: "getModalData",
                    value: function() {
                        var e = this;
                        if (!this.props.error) return this.state.modal;
                        return {
                            title: weh._("error"),
                            body: this.props.error.message,
                            buttons: [{
                                text: weh._("cancel"),
                                color: "secondary",
                                click: function() {
                                    e.props.clearError()
                                }.bind(this)
                            }]
                        }
                    }
                }, {
                    key: "updateFiles",
                    value: function(e) {
                        var t = this;
                        return t.state.dirExits ? weh.rpc.call("coappProxy", "listFiles", e).then(function(e) {
                            e = e.filter(function(e) {
                                return !!e
                            }), t.setState({
                                files: e
                            })
                        }).catch(function(e) {
                            t.props.setError(e)
                        }) : (t.setState({
                            files: []
                        }), Promise.resolve())
                    }
                }, {
                    key: "updateParents",
                    value: function(e) {
                        var t = this;
                        return weh.rpc.call("coappProxy", "getParents", e).then(function(e) {
                            t.setState({
                                parents: e
                            })
                        }).catch(function(e) {
                            t.props.setError(e)
                        })
                    }
                }, {
                    key: "update",
                    value: function(e) {
                        var t = this;
                        return t.setState({
                            parent: "",
                            directory: e,
                            selected: {},
                            selectAll: !1
                        }), t.updateFiles(e).then(function() {
                            return t.updateParents(e)
                        })
                    }
                }, {
                    key: "updateState",
                    value: function(e) {
                        this.setState(e)
                    }
                }, {
                    key: "toParent",
                    value: function() {
                        var e = this;
                        return function(t) {
                            e.init(t.target.value)
                        }
                    }
                }, {
                    key: "getSize",
                    value: function(e) {
                        return e < 1024 ? weh._("Bytes", e) : e < 1024e3 ? weh._("KB", Math.round(e / 100) / 10) : e < 1024e6 ? weh._("MB", Math.round(e / 1e5) / 10) : weh._("GB", Math.round(e / 1e8) / 10)
                    }
                }, {
                    key: "getDate",
                    value: function(e) {
                        var t = new Date,
                            n = new Date(e);
                        return t.getDate() == n.getDate() && t.getMonth() == n.getMonth() && t.getFullYear() == n.getFullYear() ? n.getHours() + ":" + ("00" + n.getMinutes()).substr(-2, 2) : n.toLocaleDateString()
                    }
                }, {
                    key: "sort",
                    value: function() {
                        var e = this;
                        return function(t, n) {
                            return "size" == e.state.sortField ? (t[1].size - n[1].size) * e.state.sortDir : "date" == e.state.sortField ? (new Date(t[1].mtime).getTime() - new Date(n[1].mtime).getTime()) * e.state.sortDir : t[0] == n[0] ? 0 : t[0].toLowerCase() > n[0].toLowerCase() ? e.state.sortDir : -e.state.sortDir
                        }
                    }
                }, {
                    key: "setSort",
                    value: function(e) {
                        var t = this;
                        return function() {
                            t.state.sortField == e ? t.setState({
                                sortDir: -t.state.sortDir
                            }) : t.setState({
                                sortField: e,
                                sortDir: 1
                            })
                        }
                    }
                }, {
                    key: "showSort",
                    value: function(e) {
                        return this.state.sortField == e ? 1 == this.state.sortDir ? "▲" : "▼" : ""
                    }
                }, {
                    key: "gotoDir",
                    value: function(e) {
                        var t = this;
                        return function() {
                            t.update(e)
                        }
                    }
                }, {
                    key: "filenameChanged",
                    value: function() {
                        var e = this;
                        return function(t) {
                            e.setState({
                                filename: t.target.value
                            })
                        }
                    }
                }, {
                    key: "filenameKeyPressed",
                    value: function() {
                        var e = this;
                        return function(t) {
                            "Enter" == t.key ? e.defaultAction() : "Escape" == t.key && weh.trigger(null)
                        }
                    }
                }, {
                    key: "onKeyDown",
                    value: function() {
                        var e = this;
                        return function(t) {
                            "Enter" == t.key ? e.defaultAction() : "Escape" == t.key && weh.trigger(null)
                        }
                    }
                }, {
                    key: "selectAllChanged",
                    value: function() {
                        var e = this;
                        return function() {
                            var t = {};
                            e.state.selectAll || e.state.files.forEach(function(e) {
                                var n = r(e, 2),
                                    a = n[0];
                                n[1].dir || (t[a] = !0)
                            }), e.setState({
                                selected: t,
                                selectAll: !e.state.selectAll
                            })
                        }
                    }
                }, {
                    key: "canDefaultAction",
                    value: function() {
                        var e = this;
                        return this.props.outputConfigs ? !!this.state.outputConfig && Object.keys(e.state.selected).filter(function(t) {
                            return !!e.state.selected[t]
                        }).length > 0 : this.props.dirOnly ? !!this.state.directory : !(!this.state.filename || !this.state.directory)
                    }
                }, {
                    key: "defaultAction",
                    value: function() {
                        var e, t = this,
                            n = [this.state.directory];
                        this.state.filename && n.push(this.state.filename), (e = weh.rpc).call.apply(e, ["coappProxy", "path.homeJoin"].concat(n)).then(function(e) {
                            var n = {
                                fileName: t.state.filename,
                                directory: t.state.directory,
                                filePath: e
                            };
                            t.props.outputConfigs && (n.selected = Object.keys(t.state.selected).filter(function(e) {
                                return !!t.state.selected[e]
                            }), n.outputConfig = t.state.outputConfig, delete n.fileName, delete n.filePath), t.props.confirmOverwrite ? weh.rpc.call("coappProxy", "fs.stat", e).then(function() {
                                t.setState({
                                    modal: {
                                        title: weh._("confirmation_required"),
                                        body: weh._("overwrite_file", e),
                                        buttons: [{
                                            text: weh._("no"),
                                            color: "secondary",
                                            click: function() {
                                                t.setState({
                                                    modal: null
                                                })
                                            }
                                        }, {
                                            text: weh._("yes"),
                                            color: "primary",
                                            click: function() {
                                                t.setState({
                                                    modal: null
                                                }), weh.trigger(n)
                                            }
                                        }]
                                    }
                                })
                            }).catch(function() {
                                weh.trigger(n)
                            }) : weh.trigger(n)
                        })
                    }
                }, {
                    key: "callDefaultAction",
                    value: function() {
                        var e = this;
                        return function() {
                            e.defaultAction()
                        }
                    }
                }, {
                    key: "cancel",
                    value: function() {
                        return function() {
                            weh.trigger(null)
                        }
                    }
                }, {
                    key: "fileClicked",
                    value: function(e) {
                        var t = this;
                        return function(n) {
                            var r, a, o;
                            t.setState({
                                filename: e
                            }), t.props.selectMultiple && t.setState({
                                selected: Object.assign({}, t.state.selected, (r = {}, a = e, o = !t.state.selected[e], a in r ? Object.defineProperty(r, a, {
                                    value: o,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : r[a] = o, r))
                            })
                        }
                    }
                }, {
                    key: "newSubDirectory",
                    value: function() {
                        var e = this,
                            t = null;
                        return function() {
                            e.setState({
                                modal: {
                                    title: weh._("new_sub_directory"),
                                    body: React.createElement("input", {
                                        type: "text",
                                        className: "form-control",
                                        ref: function(e) {
                                            return t = e
                                        },
                                        placeholder: weh._("sub_directory_name")
                                    }),
                                    buttons: [{
                                        text: weh._("cancel"),
                                        color: "secondary",
                                        click: function() {
                                            e.setState({
                                                modal: null
                                            })
                                        }
                                    }, {
                                        text: weh._("create"),
                                        color: "primary",
                                        click: function() {
                                            e.setState({
                                                modal: null
                                            }), e.createSubDirectory(t.value)
                                        }
                                    }]
                                }
                            })
                        }
                    }
                }, {
                    key: "createSubDirectory",
                    value: function(e) {
                        var t, n = this;
                        weh.rpc.call("coappProxy", "path.homeJoin", n.state.directory, e).then(function(e) {
                            return t = e, weh.rpc.call("coappProxy", "fs.mkdirp", t)
                        }).then(function() {
                            n.init(t)
                        }).catch(function(e) {
                            n.props.setError(e)
                        })
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this,
                            t = this,
                            n = this.state.files.sort(this.sort()).map(function(n) {
                                return n[1].dir ? React.createElement("tr", {
                                    className: "dir-entry",
                                    key: n[0],
                                    onClick: e.gotoDir(n[1].path)
                                }, React.createElement("td", null, React.createElement("img", {
                                    src: "images/folder.png"
                                })), React.createElement("td", null, React.createElement("div", null, n[0])), !t.props.noSizeColumn && React.createElement("td", null), React.createElement("td", null, t.getDate(new Date(n[1].mtime)))) : t.props.dirOnly ? null : React.createElement("tr", {
                                    className: "file-entry",
                                    key: n[0],
                                    onClick: t.fileClicked(n[0])
                                }, React.createElement("td", null, t.props.selectMultiple && React.createElement("input", {
                                    type: "checkbox",
                                    checked: !!t.state.selected[n[0]],
                                    className: "form-control"
                                })), React.createElement("td", null, React.createElement("div", null, n[0])), !t.props.noSizeColumn && React.createElement("td", null, t.getSize(n[1].size)), React.createElement("td", null, t.getDate(new Date(n[1].mtime))))
                            }),
                            r = this.state.parents.map(function(e) {
                                return React.createElement("option", {
                                    key: e,
                                    value: e
                                }, e)
                            });
                        return this.props.upDir && this.state.parents.length > 0 && !/^[A-Z]:\$/.test(this.state.parents[0]) && n.unshift(React.createElement("tr", {
                            className: "dir-entry",
                            key: this.state.parents[0],
                            onClick: this.gotoDir(this.state.parents[0])
                        }, React.createElement("td", null, React.createElement("img", {
                            src: "images/folder.png"
                        })), React.createElement("td", null, React.createElement("div", null, "..")), React.createElement("td", null))), r.unshift(React.createElement("option", {
                            key: "",
                            value: ""
                        }, "⇧")), React.createElement("div", {
                            className: "weh-shf file-prompt",
                            onKeyDown: this.onKeyDown(),
                            tabIndex: "0"
                        }, React.createElement("div", null, React.createElement(WehHeader, {
                            title: this.getTitle()
                        }), React.createElement("main", null, React.createElement("div", {
                            className: "top-line"
                        }, r.length > 0 && React.createElement("select", {
                            value: this.state.parent,
                            onChange: this.toParent(),
                            className: "form-control"
                        }, r), null !== this.state.filename && this.props.editFileInput && React.createElement("input", {
                            value: this.state.filename,
                            onChange: this.filenameChanged(),
                            onKeyDown: this.filenameKeyPressed(),
                            className: "form-control",
                            type: "text"
                        }), null !== this.state.directory && this.props.readonlyDir && React.createElement("div", {
                            className: "form-control dir-path",
                            title: this.state.directory
                        }, this.state.directory), this.props.newDir && this.state.dirExits && React.createElement("button", {
                            className: "btn btn-outline-secondary",
                            title: weh._("new_sub_directory"),
                            onClick: this.newSubDirectory()
                        }, "✚")), this.props.showDir && React.createElement("div", {
                            className: "current-directory"
                        }, this.state.directory || ""), React.createElement("div", {
                            className: "files-list headercontainer"
                        }, React.createElement("div", {
                            className: "tablecontainer"
                        }, React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, this.props.selectMultiple && React.createElement("div", null, React.createElement("input", {
                            type: "checkbox",
                            checked: t.state.selectAll,
                            onChange: t.selectAllChanged(),
                            className: "form-control"
                        }))), React.createElement("th", {
                            onClick: this.setSort("name")
                        }, React.createElement("div", null, this.showSort("name"), " ", weh._("file_dialog_name"))), !this.props.noSizeColumn && React.createElement("th", {
                            onClick: this.setSort("size")
                        }, React.createElement("div", null, this.showSort("size"), " ", weh._("file_dialog_size"))), React.createElement("th", {
                            onClick: this.setSort("date")
                        }, React.createElement("div", null, this.showSort("date"), " ", weh._("file_dialog_date"))))), React.createElement("tbody", null, n)))), this.props.outputConfigs && React.createElement("div", {
                            className: "bottom-component"
                        }, React.createElement(u, {
                            updateState: this.updateState.bind(this),
                            cancel: this.cancel().bind(this)
                        }))), React.createElement("footer", null, React.createElement("div", {
                            className: "btn btn-toolbar float-right"
                        }, React.createElement("button", {
                            className: "btn btn-outline-secondary",
                            onClick: this.cancel()
                        }, weh._("cancel")), React.createElement("button", {
                            className: "btn btn-success",
                            disabled: !this.canDefaultAction(),
                            onClick: this.callDefaultAction()
                        }, this.props.okText || "")))), React.createElement(VDHModal, {
                            modalData: this.getModalData(),
                            close: this.props.clearError
                        }))
                    }
                }]), t
            }()),
            u = function(e) {
                function t(e) {
                    o(this, t);
                    var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    n.state = {
                        outputConfig: "",
                        outputConfigs: {}
                    };
                    var r = n;
                    return weh.prefs.on("dlconvLastOutput", function(e, t) {
                        r.setState({
                            outputConfig: t
                        }), r.props.updateState({
                            outputConfig: t
                        })
                    }), n
                }
                return c(t, React.Component), a(t, [{
                    key: "componentWillMount",
                    value: function() {
                        var e = this;
                        weh.rpc.call("getOutputConfigs").then(function(t) {
                            e.setState({
                                outputConfigs: t
                            })
                        })
                    }
                }, {
                    key: "changeOutput",
                    value: function() {
                        var e = this;
                        return function(t) {
                            e.setState({
                                outputConfig: t.target.value
                            }), e.props.updateState({
                                outputConfig: t.target.value
                            })
                        }
                    }
                }, {
                    key: "configOutputs",
                    value: function() {
                        var e = this;
                        return function() {
                            weh.rpc.call("editConverterConfigs", e.state.outputConfig), e.props.cancel()
                        }
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e;
                        e = this.state.outputConfig ? this.state.outputConfigs : Object.assign({}, this.state.outputConfigs, {
                            "": {
                                title: weh._("select_output_config")
                            }
                        });
                        var t = Object.keys(e).sort().map(function(t) {
                            return React.createElement("option", {
                                key: t,
                                value: t
                            }, e[t].title)
                        });
                        return React.createElement("div", {
                            className: "output-conf-sel"
                        }, React.createElement("span", null, weh._("output_configuration")), React.createElement("select", {
                            className: "form-control",
                            onChange: this.changeOutput(),
                            value: this.state.outputConfig
                        }, t), React.createElement("a", {
                            href: "#",
                            onClick: this.configOutputs()
                        }, weh._("dlconv_output_details")))
                    }
                }]), t
            }();
        render(React.createElement(Provider, {
            store: l
        }, React.createElement(s, {
            store: l
        })), document.getElementById("root"))
    }
});