! function(e) {
    var t = {};

    function r(a) {
        if (t[a]) return t[a].exports;
        var n = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(n.exports, n, n.exports, r), n.l = !0, n.exports
    }
    r.m = e, r.c = t, r.d = function(e, t, a) {
        r.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 273)
}({
    10: function(e, t) {
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" == typeof window && (r = window)
        }
        e.exports = r
    },
    117: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.extractMeta = function(e, t) {
            var r, n = e.previous || {},
                i = {
                    previous: {}
                },
                s = n.unconfirmedUnit || null;
            if (s)
                if (0 == t[0] && 0 == t[1] && (1 == t[2] || 0 == t[2] && 1 == t[3]))(r = f(t, 0, t.length)).unshift(s);
                else {
                    var o = new Uint8Array(s.s + 3 + t.length);
                    o.set(s.data.subarray(s.o - 3, s.o + s.s), 0), o.set(t, s.s + 3), r = f(t = o, 0, t.length)
                }
            else r = f(t, 0, t.length);
            n.confirmedUnusedUnits && (r = [].concat(n.confirmedUnusedUnits, r));
            var u = e.flush ? r.length : r.length - 1;
            if (e.sps || e.pps || e.width || e.height)
                for (var p = 0; p < u; p++) {
                    var c = r[p],
                        d = 31 & c.data[c.o];
                    if (7 == d) {
                        if (e.sps && !i.sps) {
                            i.sps = new ArrayBuffer(c.s);
                            var h = new Uint8Array(i.sps);
                            h.set(c.data.subarray(c.o, c.o + c.s))
                        }
                        if (e.width && !i.width || e.height && !i.height) {
                            var v = l(c.data, c.o + 1, c.s);
                            i.width = v.width, i.height = v.height
                        }
                    } else if (8 == d && e.pps && !i.pps) {
                        i.pps = new ArrayBuffer(c.s);
                        var m = new Uint8Array(i.pps);
                        m.set(c.data.subarray(c.o, c.o + c.s))
                    }
                }
            for (var g = n.gotUnitStart || !1, y = n.keyFrame || !1, k = n.frameUnit || !1, T = n.avccData || [], w = n.avccSize || 0, I = !1, p = 0; p < u; p++) {
                var c = r[p];
                if (0 != c.s) {
                    var d = 31 & c.data[c.o];
                    if (9 == d) {
                        if (g) {
                            I = !0, i.previous.confirmedUnusedUnits = r.slice(p, u);
                            break
                        }
                        g = !0
                    } else 5 == d ? (0 != c.data[c.o + 1] && (y = !0), k = !0) : 1 == d && (k = !0);
                    if (g) {
                        var b = new Uint8Array(4);
                        a.WriteInt32(b, 0, c.s), T.push(b), T.push(c.data.subarray(c.o, c.o + c.s)), w += c.s + 4
                    }
                }
            }(I || e.flush) && g && k ? (i.avccData = T, i.frame = {
                size: w,
                key: y
            }) : (i.previous.gotUnitStart = g, i.previous.avccData = T, i.previous.avccSize = w, i.previous.keyFrame = y, i.previous.frameUnit = k);
            e.flush || (i.previous.unconfirmedUnit = r[r.length - 1]);
            return i
        };
        var a = r(16);

        function n(e) {
            ! function(e) {
                if (!e) throw new Error("ASSERT")
            }(e.m_nCurrentBit <= 8 * e.m_nLength);
            var t = e.m_nCurrentBit >>> 3 >>> 0,
                r = e.m_nCurrentBit % 8 + 1;
            return e.m_nCurrentBit++, (e.m_pStart[e.offset + t] >>> 8 - r & 1) >>> 0
        }

        function i(e, t) {
            for (var r = 0, a = 0; a < t; a++) r |= n(e) << t - a - 1;
            return r
        }

        function s(e) {
            for (var t = 0, r = 0; 0 == n(e) && r < 32;) r++;
            return t = i(e, r), t += (1 << r) - 1
        }

        function o(e) {
            var t = s(e);
            return t = 1 & t ? (t + 1) / 2 : -t / 2
        }

        function u(e, t, r) {
            var n = function(e, t, r) {
                var n = 4 - (3 & t);
                for (r -= 3; t < n && t < r; t++)
                    if (0 == e[t] && 0 == e[t + 1] && 1 == e[t + 2]) return t;
                for (r -= 3; t < r; t += 4) {
                    var i = a.ReadInt32(e, t);
                    if (i - 16843009 & ~i & 2155905152) {
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
                for (r += 3; t < r; t++)
                    if (0 == e[t] && 0 == e[t + 1] && 1 == e[t + 2]) return t;
                return r + 3
            }(e, t, r);
            return t < n && n < r && !e[n - 1] && n--, n
        }

        function f(e, t, r) {
            for (var a = [], n = u(e, t, r);;) {
                for (; n < r && !e[n++];);
                if (n == r) break;
                var i = u(e, n, r);
                a.push({
                    o: n,
                    s: i - n,
                    data: e
                }), n = i
            }
            return a
        }

        function l(e, t, r) {
            var a = {
                    m_pStart: e,
                    m_nLength: r,
                    m_nCurrentBit: 0,
                    offset: t
                },
                u = 0,
                f = 0,
                l = 0,
                p = 0,
                c = i(a, 8);
            n(a), n(a), n(a), n(a), n(a), n(a), i(a, 2), i(a, 8), s(a);
            if (100 == c || 110 == c || 122 == c || 244 == c || 44 == c || 83 == c || 86 == c || 118 == c) {
                if (3 == s(a)) n(a);
                s(a), s(a), n(a);
                if (n(a))
                    for (var d = 0; d < 8; d++) {
                        if (n(a))
                            for (var h = d < 6 ? 16 : 64, v = 8, m = 8, g = 0; g < h; g++) {
                                if (0 != m) m = (v + o(a) + 256) % 256;
                                v = 0 == m ? v : m
                            }
                    }
            }
            s(a);
            var y = s(a);
            if (0 == y) s(a);
            else if (1 == y) {
                n(a), o(a), o(a);
                var k = s(a),
                    T = [];
                for (d = 0; d < k; d++) T.push(o(a))
            }
            s(a), n(a);
            var w = s(a),
                I = s(a),
                b = n(a);
            if (!b) n(a);
            n(a);
            if (n(a) && (u = s(a), f = s(a), l = s(a), p = s(a)), n(a)) {
                if (n(a))
                    if (255 == i(a, 8)) i(a, 8), i(a, 8);
                if (n(a)) n(a);
                if (n(a)) {
                    i(a, 3), n(a);
                    if (n(a)) n(a), n(a), n(a)
                }
                n(a)
            }
            var _ = 16 * (w + 1) - 2 * p - 2 * l,
                S = (2 - b) * (I + 1) * 16 - 2 * f - 2 * u;
            return {
                width: 8 * Math.floor((_ + 7) / 8),
                height: S
            }
        }
    },
    118: function(e, t, r) {
        "use strict";
        var a = r(16),
            n = {
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
            var r = t.length - 7,
                i = {
                    start: -1,
                    end: 0,
                    maxBitrate: 0,
                    durationSec: 0
                };
            e.frames && (i.frames = []);
            for (var s = 0; s < r;)
                if (255 == t[s] && 240 == (246 & t[s + 1])) {
                    i.start < 0 && (i.start = s);
                    var o = 1 & t[s + 1],
                        u = (67100672 & a.ReadInt32(t, s + 3)) >>> 13 >>> 0,
                        f = o ? 7 : 9;
                    if (e.frames && i.frames.push({
                            o: s + f,
                            s: u - f
                        }), e.rate) {
                        var l = a.ReadInt24(t, s + 1),
                            p = (15360 & l) >>> 10 >>> 0;
                        i.rate = Math.round(n[p]), i.mp4aRateIndex = p, i.maxBitrate = Math.max(i.maxBitrate, 8 * u * i.rate / 1024), i.durationSec += 1024 / i.rate;
                        var c = (49152 & l) >>> 14 >>> 0;
                        i.mp4aProfile = c + 1;
                        var d = (448 & l) >>> 6 >>> 0;
                        i.mp4aChannelCount = d
                    }
                    s += u, i.end = s
                } else s++;
            return i
        }
    },
    16: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.ReadString = function(e, t) {
            var r = [];
            for (; e[t];) r.push(e[t++]);
            return {
                string: String.fromCharCode.apply(null, r),
                length: r.length + 1
            }
        }, t.ReadInt64 = function(e, r) {
            var a = t.ReadInt32(e, r),
                n = t.ReadInt32(e, r + 4);
            return 4294967296 * a + n
        }, t.ReadInt32 = function(e, t) {
            return (e[t] << 24) + (e[t + 1] << 16) + (e[t + 2] << 8) + e[t + 3]
        }, t.ReadInt24 = function(e, t) {
            return (e[t] << 16) + (e[t + 1] << 8) + e[t + 2]
        }, t.ReadInt16 = function(e, t) {
            return (e[t] << 8) + e[t + 1]
        }, t.ReadInt8 = function(e, t) {
            return e[t]
        }, t.WriteInt32 = function(e, t, r) {
            e[t] = (r >>> 24 & 255) >>> 0, e[t + 1] = (r >>> 16 & 255) >>> 0, e[t + 2] = (r >>> 8 & 255) >>> 0, e[t + 3] = (255 & r) >>> 0
        }, t.WriteInt24 = function(e, t, r) {
            e[t] = (r >>> 16 & 255) >>> 0, e[t + 1] = (r >>> 8 & 255) >>> 0, e[t + 2] = (255 & r) >>> 0
        }, t.WriteInt16 = function(e, t, r) {
            e[t] = (r >>> 8 & 255) >>> 0, e[t + 1] = (255 & r) >>> 0
        }, t.WriteInt8 = function(e, t, r) {
            e[t] = (255 & r) >>> 0
        }, t.dump = function(e, t, r) {
            t = t || 0, r = r || e.length;
            for (var a = [], n = 0; n < r && n < e.length; n++) {
                n % 16 == 0 && a.push("\n");
                var i = e[t + n].toString(16).toUpperCase();
                if (1 == i.length && (i = "0" + i), a.push(i), (n + 1) % 16 == 0 || n == r - 1 || n == e.length - 1) {
                    for (var s = n + 1; s < (n + 15 & 4294967280); s++) a.push("  ");
                    i = "";
                    for (var s = 4294967280 & n; s <= n; s++) {
                        var o = e[t + s];
                        i += o >= 32 && o < 127 ? String.fromCharCode(o) : "."
                    }
                    a.push(i)
                }
            }
            return a.join(" ")
        }
    },
    273: function(e, t, r) {
        e.exports = r(274)
    },
    274: function(e, t, r) {
        "use strict";
        var a = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var a = t[r];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                }
            }
            return function(t, r, a) {
                return r && e(t.prototype, r), a && e(t, a), t
            }
        }();
        var n = r(275),
            i = r(16),
            s = r(118),
            o = r(117),
            u = function() {
                function e(t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var r = this;
                    Object.keys(t).forEach(function(e) {
                        r[e] = t[e]
                    })
                }
                return a(e, [{
                    key: "processChunkData",
                    value: function(e, t) {
                        this.perfBytes = 0, this.perfTime = 0, this.perfVideoSize = 0, this.dataOffset = 0, this.processedChunksCount++, this.pidTable = this.pidTable || {
                            0: "processPAT"
                        };
                        for (var r = [], a = 0, n = {}; 188 * a < e.length;) {
                            var s = {},
                                o = 188 * a;
                            if (a++, 71 == i.ReadInt8(e, o)) {
                                var u = i.ReadInt32(e, o);
                                s.tei = (8388608 & u) >>> 23 >>> 0, s.pusi = (4194304 & u) >>> 22 >>> 0, s.tp = (2097152 & u) >>> 21 >>> 0, s.pid = (2096896 & u) >>> 8 >>> 0, s.sc = (192 & u) >>> 6 >>> 0, s.aff = (32 & u) >>> 5 >>> 0, s.pf = (16 & u) >>> 4 >>> 0, s.cc = (15 & u) >>> 0;
                                var f = 4,
                                    l = 184;
                                if (s.aff) {
                                    if (s.afl = i.ReadInt8(e, o + 4), f++, l--, 0 == s.pf && 183 != s.afl) continue;
                                    if (s.pf && s.afl > 182) continue;
                                    f += s.afl, l -= s.afl
                                }
                                n[s.pid] = s;
                                var p = this[this.pidTable[s.pid]];
                                p && p.call(this, s, e, o + f, l, r)
                            }
                        }
                        this.walkThroughAvailPes(function(e) {
                            (e.videoPrevious && e.videoPrevious.remains || e.data && e.data.length > 0) && this.pesPacketReady(e, r, !0)
                        }), t(null, r)
                    }
                }, {
                    key: "walkThroughAvailPes",
                    value: function(e) {
                        for (var t in this.pesTable) {
                            var r = this.pesTable[t];
                            "started" == r.state && e.call(this, r)
                        }
                    }
                }, {
                    key: "processPAT",
                    value: function(e, t, r, a, n) {
                        var s = i.ReadInt32(t, r),
                            o = (16711680 & s) >>> 16 >>> 0,
                            u = (32768 & s) >>> 15 >>> 0,
                            f = (16384 & s) >>> 14 >>> 0,
                            l = (4095 & s) >>> 0;
                        i.ReadInt16(t, r + 4), d = i.ReadInt24(t, r + 6);
                        if (l -= 5, o || !u || f) return console.info("MP2T/PAT Bad header"), !1;
                        if (l % 4) return console.info("MP2T/PAT Bad section length"), !1;
                        for (var p = (l - 4) / 4, c = 0; c < p; c++) {
                            var d, h = (4294901760 & (d = i.ReadInt32(t, r + 4 + 5 + 4 * c))) >>> 16 >>> 0,
                                v = (8191 & d) >>> 0;
                            this.pidTable[v] = "processPMT", this.pmtTable = this.pmtTable || {}, this.pmtTable[v] = h
                        }
                        return !0
                    }
                }, {
                    key: "processPMT",
                    value: function(e, t, r, a, n) {
                        var s = i.ReadInt32(t, r),
                            o = (16711680 & s) >>> 16 >>> 0,
                            u = (32768 & s) >>> 15 >>> 0,
                            f = (16384 & s) >>> 14 >>> 0,
                            l = (4095 & s) >>> 0,
                            p = i.ReadInt16(t, r + 4),
                            c = i.ReadInt24(t, r + 6),
                            d = (240 & c) >>> 4 >>> 0,
                            h = (15 & c) >>> 0;
                        if (!this.pmtTable) return console.info("MP2T/PMT No PMT table defined"), !1;
                        if (2 != o || !u || f || l > 1021 || d || h || p != this.pmtTable[e.pid]) return console.info("MP2T/PMT Bad header", 2 != o, !u, f, l > 1021, d, h, p, this.pmtTable[e.pid]), !1;
                        var v = i.ReadInt32(t, r + 9),
                            m = (4095 & v) >>> 0;
                        if (m >= 1024) return console.info("MP2T/PMT Bad program info length"), !1;
                        for (var g = r + 13 + m; g < r + l;) {
                            var y = i.ReadInt8(t, g),
                                k = i.ReadInt32(t, g + 1),
                                T = (536805376 & k) >>> 16 >>> 0,
                                w = (4095 & k) >>> 0;
                            if (this.pesTable = this.pesTable || {}, !this.pesTable[T]) {
                                var I = {
                                    pid: T,
                                    state: "initial",
                                    dataOffsets: [],
                                    dataSizes: [],
                                    keyFrames: [],
                                    dataTimestamps: [],
                                    dataTimestamp: -1,
                                    tsMin: 1 / 0,
                                    tsMax: 0,
                                    trackId: this.nextTrackId++,
                                    codecId: y,
                                    chunkNumber: 0
                                };
                                this.pesTable[T] = I, this.pidTable[T] = "processPES"
                            }
                            g += 5 + w
                        }
                        return !0
                    }
                }, {
                    key: "validTimestampSection",
                    value: function(e) {
                        var t = i.ReadInt8(e, 0),
                            r = i.ReadInt32(e, 1);
                        return 1 & r && 65536 & r && 1 & t
                    }
                }, {
                    key: "timestampSection2Timestamp",
                    value: function(e) {
                        var t = i.ReadInt8(e, 0),
                            r = i.ReadInt32(e, 1);
                        return (8 & t ? 4294967296 : 0) + (4 & t ? 2147483648 : 0) + (2 & t ? 1073741824 : 0) + ((65534 & r) >>> 1 >>> 0) + ((r >>> 2 & 1073709056) >>> 0)
                    }
                }, {
                    key: "processPES",
                    value: function(e, t, r, a, n) {
                        var s = r,
                            o = a,
                            u = this.pesTable[e.pid];
                        if (e.pusi) {
                            u.data && u.data.length > 0 && this.pesPacketReady(u, n);
                            var f = i.ReadInt24(t, r),
                                l = i.ReadInt8(t, r + 3),
                                p = i.ReadInt16(t, r + 4);
                            if (192 == (224 & l)) u.streamType = "audio";
                            else {
                                if (224 != (240 & l)) return this.pesFailed(u, n);
                                u.streamType = "video"
                            }
                            var c = this.codecs[u.codecId];
                            if (!c) return this.pesFailed(u, n, "Ignore unknown codec 0x" + u.codecId.toString(16));
                            u.codec = c, "video" == c.type && (u.width || (u.width = 0), u.height || (u.height = 0)), u.data = [], u.packetLength = p && p - 3 || 0, u.packetIndex = 0, u.pscp = f, u.si = l, r += 6, a -= 6;
                            var d = {},
                                h = i.ReadInt16(t, r);
                            if (32768 != (49152 & h)) return this.pesFailed(u, n, "Invalid optional header starter");
                            if (d.sc = (12288 & h) >>> 12 >>> 0, d.prio = (2048 & h) >>> 11 >>> 0, d.dai = (1024 & h) >>> 10 >>> 0, d.copyr = (512 & h) >>> 9 >>> 0, d.ooc = (256 & h) >>> 8 >>> 0, d.ptsdts = (192 & h) >>> 6 >>> 0, 1 == d.ptsdts) return this.pesFailed(u, n, "Invalid optional header PTS DTS indicator");
                            d.escr = (32 & h) >>> 5 >>> 0, d.esrf = (16 & h) >>> 4 >>> 0, d.dsmtmf = (8 & h) >>> 3 >>> 0, d.acif = (4 & h) >>> 2 >>> 0, d.crcf = (2 & h) >>> 1 >>> 0, d.ef = (1 & h) >>> 0;
                            var v = i.ReadInt8(t, r + 2);
                            u.packetLength && (u.packetLength -= v);
                            var m = r + 3,
                                g = u.lastTs || -1,
                                y = null;
                            2 & d.ptsdts && ((y = new Uint8Array(5)).set(t.subarray(m, m + 5)), this.validTimestampSection(y) || (console.warn("PES", e.pid, "Invalid PTS timestamp"), y = null), y && (g = this.timestampSection2Timestamp(y)), m += 5);
                            var k = null;
                            if (1 & d.ptsdts && ((k = new Uint8Array(5)).set(t.subarray(m, m + 5)), m += 5, this.validTimestampSection(k) || (k = null), k)) {
                                var T = this.timestampSection2Timestamp(k);
                                T > g && (g = T)
                            }
                            if (g >= 0 && u.dataTimestamp < 0 && (g < u.tsMin && (u.tsMin = g), u.tsMax = g, u.dataTimestamp = g, u.lastTs = g, u.sampleCount && g > u.tsMin && (u.sampleRate = u.sampleCount / (g - u.tsMin) * 9e4)), d.escr) {
                                var w = i.ReadInt16(t, m),
                                    I = i.ReadInt32(t, m + 2);
                                m += 6, 4 != (49156 & w) || 67109889 != (67109889 & escrU32) ? console.warn("PES", e.pid, "Invalid ESCR") : u.escr = ((14336 & w) << 18 | (63 & w) << 19 | (4160749568 & I) >>> 13 | (67106816 & I) >>> 2 | (1022 & I) >>> 1) >>> 0
                            }
                            if (d.esrf) {
                                var b = i.ReadInt24(t, m);
                                m += 3, 8388609 != (8388609 & b) ? console.warn("PES", e.pid, "Invalid ESR") : u.esr = (8388606 & b) >>> 1 >>> 0
                            }
                            if (d.acif) {
                                var _ = i.ReadInt8(t, m);
                                m += 1, 128 != (128 & _) ? console.warn("PES", e.pid, "Invalid ACI") : u.aci = 127 & _
                            }
                            if (s = r += 3 + v, (o = a -= 3 + v) < 0) return this.pesFailed(u, n, "Header size exceed packet size");
                            if (u.packetLength && u.packetIndex > u.packetLength) return this.pesFailed(u, n, "Data went beyond length on first segment");
                            this.pesStarted(u, n)
                        } else if (!u.data) return !0;
                        if (u.packetLength && u.packetIndex > u.packetLength) return this.pesFailed(u, n, "Data went beyond length " + u.packetIndex + " " + u.packetLength);
                        var S = t.subarray(s, s + o);
                        return u.data.push(S), u.packetIndex += a, u.packetLength && u.packetIndex >= u.packetLength && this.pesPacketReady(u, n), !0
                    }
                }, {
                    key: "pesFailed",
                    value: function(e, t, r) {
                        return e.state = "failed", r && console.warn("PES", e.pid, "failure:", r), delete this.pidTable[e.pid], !1
                    }
                }, {
                    key: "pesStarted",
                    value: function(e, t) {
                        "started" != e.state && (e.state = "started")
                    }
                }, {
                    key: "pesPacketReady",
                    value: function(e, t, r) {
                        e.mediaChunks = null;
                        var a = !1;
                        if ("video" == e.streamType && 27 == e.codecId) {
                            var n = {
                                flush: r,
                                sps: !e.sps,
                                pps: !e.pps,
                                width: !e.width,
                                height: !e.height,
                                previous: e.videoPrevious
                            };
                            e.data = this.flatten(e.data);
                            var i = Date.now(),
                                u = o.extractMeta(n, e.data);
                            this.perfBytes = (this.perfBytes || 0) + e.data.length, this.perfTime = (this.perfTime || 0) + (Date.now() - i), e.videoPrevious = u.previous || null, n.width && u.width && (e.width = u.width), n.height && u.height && (e.height = u.height), n.sps && u.sps && (e.sps = u.sps), n.pps && u.pps && (e.pps = u.pps), u.frame && (e.sampleCount = (e.sampleCount || 0) + 1, u.frame.key && e.keyFrames.push(e.dataSizes.length + 1), this.perfVideoSize = (this.perfVideoSize || 0) + u.frame.size, e.dataSizes.push(u.frame.size), e.stsc || (e.stsc = []), 0 == e.stsc.length && e.stsc.push(e.chunkNumber + 1, 1, 1), e.chunkNumber++), u.avccData ? e.data = u.avccData : a = !0
                        }
                        if ("audio" == e.streamType && 15 == e.codecId) {
                            e.mediaChunks = [], e.data = this.flatten(e.data);
                            n = {
                                rate: !0,
                                frames: !0
                            };
                            (u = s.extractMeta(n, e.data)).rate && (e.declaredSampleRate = u.rate), void 0 !== u.mp4aRateIndex && (e.mp4aRateIndex = u.mp4aRateIndex), void 0 !== u.mp4aProfile && (e.mp4aProfile = u.mp4aProfile), void 0 !== u.mp4aChannelCount && (e.mp4aChannelCount = u.mp4aChannelCount), u.maxBitrate && (e.maxBitrate = Math.max(e.maxBitrate || 0, u.maxBitrate)), u.durationSec && (e.durationSec = (e.durationSec || 0) + u.durationSec), e.sampleCount = (e.sampleCount || 0) + u.frames.length, e.sampleSizes || (e.sampleSizes = []);
                            for (var f = 0; f < u.frames.length; f++) {
                                var l = u.frames[f];
                                e.sampleSizes.push(l.s), e.mediaChunks.push(l.o), e.stsc || (e.stsc = [1, 1, 1])
                            }
                        }
                        a || this.pesSendPacket(e, e.data, t), delete e.data
                    }
                }, {
                    key: "pesSendPacket",
                    value: function(e, t, r) {
                        var a = this.length(t);
                        if (r.push(t), e.dataTimestamp < 0 && (e.dataTimestamp = 0), e.dataTimestamps.push(e.dataTimestamp), e.dataTimestamp = -1, e.mediaChunks)
                            for (var n = 0; n < e.mediaChunks.length; n++) {
                                if (0 != n) {
                                    var i = 0 + Math.round(9e4 * n / e.declaredSampleRate);
                                    e.dataTimestamps.push(i)
                                }
                                e.dataOffsets.push(this.processedChunksCount - 1, this.dataOffset + e.mediaChunks[n])
                            } else e.dataOffsets.push(this.processedChunksCount - 1, this.dataOffset);
                        this.dataOffset += a
                    }
                }, {
                    key: "flatten",
                    value: function(e) {
                        if (Array.isArray(e)) {
                            var t = new Uint8Array(this.length(e)),
                                r = 0;
                            return function e(a) {
                                if (Array.isArray(a))
                                    for (var n = 0, i = a.length; n < i; n++) e(a[n]);
                                else t.set(a, r), r += a.length
                            }(e), t
                        }
                        return e
                    }
                }, {
                    key: "length",
                    value: function(e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, r = 0, a = e.length; r < a; r++) t += this.length(e[r]);
                            return t
                        }
                        return e.length
                    }
                }]), e
            }();
        n.listen({
            processData: function(e, t) {
                var r = new u(e),
                    a = {
                        meta: {}
                    };
                return r.processChunkData(t, function(e, t) {
                    if (t) {
                        var n = r.flatten(t);
                        a.data = n
                    }
                    e && (a.error = e.message)
                }), Object.keys(e).forEach(function(e) {
                    a.meta[e] = r[e]
                }), a
            }
        })
    },
    275: function(e, t, r) {
        "use strict";
        (function(t) {
            var a = r(3);
            a.setPost(postMessage), t.onmessage = function(e) {
                a.receive(e.data, postMessage)
            }, e.exports = a
        }).call(t, r(10))
    },
    3: function(e, t, r) {
        "use strict";
        var a = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var a = t[r];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                }
            }
            return function(t, r, a) {
                return r && e(t.prototype, r), a && e(t, a), t
            }
        }();

        function n(e) {
            if (Array.isArray(e)) {
                for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                return r
            }
            return Array.from(e)
        }

        function i(e) {
            return Array.isArray(e) ? e : Array.from(e)
        }
        var s = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.replyId = 0, this.replies = {}, this.listeners = {}, this.hook = this.nullHook, this.debugLevel = 0, this.useTarget = !1, this.logger = console, this.posts = {}
            }
            return a(e, [{
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
                        r = Date.now();
                    this.hook = e ? function(a) {
                        a.timestamp = "undefined" != typeof window && void 0 !== window.performance ? window.performance.now() : Date.now() - r;
                        try {
                            e(a)
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
                    var e, t, r, a, s = this,
                        o = Array.prototype.slice.call(arguments);
                    if ("function" == typeof o[0] && (e = o.shift()), s.useTarget) {
                        var u = i(o);
                        t = u[0], r = u[1], a = u.slice(2)
                    } else {
                        var f = i(o);
                        r = f[0], a = f.slice(1)
                    }
                    return new Promise(function(i, o) {
                        var u = ++s.replyId;
                        s.debugLevel >= 2 && s.logger.info("rpc #" + u, "call =>", r, a), s.hook({
                            type: "call",
                            callee: t,
                            rid: u,
                            method: r,
                            args: a
                        }), s.replies[u] = {
                            resolve: i,
                            reject: o,
                            peer: t
                        };
                        var f = e || s.useTarget && s.posts[t] || s.post;
                        s.useTarget ? f(t, {
                            type: "weh#rpc",
                            _request: u,
                            _method: r,
                            _args: [].concat(n(a))
                        }) : f({
                            type: "weh#rpc",
                            _request: u,
                            _method: r,
                            _args: [].concat(n(a))
                        })
                    })
                }
            }, {
                key: "receive",
                value: function(e, t, r) {
                    var a = this;
                    if (e._request) Promise.resolve().then(function() {
                        var t = a.listeners[e._method];
                        if ("function" == typeof t) return a.debugLevel >= 2 && a.logger.info("rpc #" + e._request, "serve <= ", e._method, e._args), a.hook({
                            type: "call",
                            caller: r,
                            rid: e._request,
                            method: e._method,
                            args: e._args
                        }), Promise.resolve(t.apply(null, e._args)).then(function(t) {
                            return a.hook({
                                type: "reply",
                                caller: r,
                                rid: e._request,
                                result: t
                            }), t
                        }).catch(function(t) {
                            throw a.hook({
                                type: "reply",
                                caller: r,
                                rid: e._request,
                                error: t.message
                            }), t
                        });
                        throw new Error("Method " + e._method + " is not a function")
                    }).then(function(r) {
                        a.debugLevel >= 2 && a.logger.info("rpc #" + e._request, "serve => ", r), t({
                            type: "weh#rpc",
                            _reply: e._request,
                            _result: r
                        })
                    }).catch(function(r) {
                        a.debugLevel >= 1 && a.logger.info("rpc #" + e._request, "serve => !", r.message), t({
                            type: "weh#rpc",
                            _reply: e._request,
                            _error: r.message
                        })
                    });
                    else if (e._reply) {
                        var n = a.replies[e._reply];
                        delete a.replies[e._reply], n ? e._error ? (a.debugLevel >= 1 && a.logger.info("rpc #" + e._reply, "call <= !", e._error), a.hook({
                            type: "reply",
                            callee: n.peer,
                            rid: e._reply,
                            error: e._error
                        }), n.reject(new Error(e._error))) : (a.debugLevel >= 2 && a.logger.info("rpc #" + e._reply, "call <= ", e._result), a.hook({
                            type: "reply",
                            callee: n.peer,
                            rid: e._reply,
                            result: e._result
                        }), n.resolve(e._result)) : a.logger.error("Missing reply handler")
                    }
                }
            }, {
                key: "listen",
                value: function(e) {
                    Object.assign(this.listeners, e)
                }
            }]), e
        }();
        e.exports = new s
    }
});