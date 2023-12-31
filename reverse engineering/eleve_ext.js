var IE = {
    Identite: {
        collection: {}
    }
};
(function() {
    IE.outilsUses = function() {}
    ;
    var dictionnaire = {
        require: {},
        full: {},
        cache: {}
    };
    var lGlobal = window || {};
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(searchString, position) {
            var subjectString = this.toString();
            if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        }
        ;
    }
    function _findPaths(aIdentifiant, aPathDictionary) {
        if (!aIdentifiant || !aIdentifiant) {
            return false;
        }
        var lSplitIdentifiant = aIdentifiant.split('/').reverse();
        var lSplitPath = aPathDictionary.split('/').reverse();
        var lMinlength = Math.min(lSplitPath.length, lSplitIdentifiant.length);
        for (var i = 0; i < lMinlength; i++) {
            if (lSplitIdentifiant[i] !== lSplitPath[i]) {
                return false;
            }
        }
        return true;
    }
    function _getExport(aChemin, aModule, aWithoutLoad) {
        if (!aChemin || !aChemin.endsWith('.js')) {
            return null;
        }
        var lExports = dictionnaire.cache[aChemin];
        if (lExports !== undefined) {
            return lExports;
        }
        lExports = dictionnaire.full[aChemin];
        if (lExports !== undefined) {
            return lExports;
        }
        var lCheminLower = aChemin.toLowerCase();
        var lTrouves = [];
        var lFullPath, lFullPathLower;
        for (lFullPath in dictionnaire.full) {
            lFullPathLower = lFullPath.toLowerCase();
            if (_findPaths(lCheminLower, lFullPathLower)) {
                if (lTrouves.length === 0) {
                    lExports = dictionnaire.full[lFullPath];
                }
                lTrouves.push(lFullPath);
            }
        }
        if (lExports !== undefined && lTrouves.length === 1) {
            dictionnaire.cache[aChemin] = lExports;
        }
        if (lTrouves.length > 1) {
            alert('plusieurs trouvés');
        }
        if (lExports) {
            return lExports;
        }
        if (aWithoutLoad) {
            return null;
        }
        var lRequire = dictionnaire.require[aChemin];
        if (!lRequire) {
            lTrouves = [];
            for (lFullPath in dictionnaire.require) {
                lFullPathLower = lFullPath.toLowerCase();
                if (_findPaths(lCheminLower, lFullPathLower)) {
                    if (lTrouves.length === 0) {
                        lRequire = dictionnaire.require[lFullPath];
                    }
                    lTrouves.push(lFullPath);
                }
            }
            if (lTrouves.length > 1) {
                alert('plusieurs trouvés');
            }
        }
        if (lRequire) {
            lRequire.main.load(aModule);
            return _getExport(aChemin, aModule, true);
        }
        return null;
    }
    function _fModule(aParams) {
        var lModule = {
            exports: {},
            filename: aParams.fn,
            childrens: [],
            loaded: false,
            load: function(aParent) {
                this.parent = aParent;
                if (this.loaded) {
                    return;
                }
                this.loaded = true;
                if (aParent) {
                    aParent.childrens.push(this);
                }
                aParams.f.call(this.exports, this.exports, this.require, this, lGlobal);
                dictionnaire.full[this.filename] = this.exports;
                if (dictionnaire.require[this.filename]) {
                    delete dictionnaire.require[this.filename];
                }
            },
            require: function require(aChemin) {
                var lExports = _getExport(aChemin, lModule);
                return lExports;
            }
        };
        lModule.require.main = lModule;
        lModule.require.ressource = function() {}
        ;
        if (aParams.s !== 0) {
            lModule.load();
        } else {
            dictionnaire.require[lModule.filename] = lModule.require;
        }
    }
    IE.fModule = _fModule;
    window.require = function require(aChemin) {
        var lExports = _getExport(aChemin);
        return lExports;
    }
    ;
}());
;/*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(C, e) {
    "use strict";
    var t = []
      , r = Object.getPrototypeOf
      , s = t.slice
      , g = t.flat ? function(e) {
        return t.flat.call(e)
    }
    : function(e) {
        return t.concat.apply([], e)
    }
      , u = t.push
      , i = t.indexOf
      , n = {}
      , o = n.toString
      , v = n.hasOwnProperty
      , a = v.toString
      , l = a.call(Object)
      , y = {}
      , m = function(e) {
        return "function" == typeof e && "number" != typeof e.nodeType
    }
      , x = function(e) {
        return null != e && e === e.window
    }
      , E = C.document
      , c = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
    };
    function b(e, t, n) {
        var r, i, o = (n = n || E).createElement("script");
        if (o.text = e,
        t)
            for (r in c)
                (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o)
    }
    function w(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e
    }
    var f = "3.5.1"
      , S = function(e, t) {
        return new S.fn.init(e,t)
    };
    function p(e) {
        var t = !!e && "length"in e && e.length
          , n = w(e);
        return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    S.fn = S.prototype = {
        jquery: f,
        constructor: S,
        length: 0,
        toArray: function() {
            return s.call(this)
        },
        get: function(e) {
            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = S.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return S.each(this, e)
        },
        map: function(n) {
            return this.pushStack(S.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(s.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(S.grep(this, function(e, t) {
                return (t + 1) % 2
            }))
        },
        odd: function() {
            return this.pushStack(S.grep(this, function(e, t) {
                return t % 2
            }))
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: u,
        sort: t.sort,
        splice: t.splice
    },
    S.extend = S.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a,
        a = arguments[s] || {},
        s++),
        "object" == typeof a || m(a) || (a = {}),
        s === u && (a = this,
        s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e)
                    r = e[t],
                    "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t],
                    o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {},
                    i = !1,
                    a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }
    ,
    S.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        globalEval: function(e, t, n) {
            b(e, {
                nonce: t && t.nonce
            }, n)
        },
        each: function(e, t) {
            var n, r = 0;
            if (p(e)) {
                for (n = e.length; r < n; r++)
                    if (!1 === t.call(e[r], r, e[r]))
                        break
            } else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r]))
                        break;
            return e
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)),
            n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : i.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                e[i++] = t[r];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, o = 0, a = [];
            if (p(e))
                for (r = e.length; o < r; o++)
                    null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e)
                    null != (i = t(e[o], o, n)) && a.push(i);
            return g(a)
        },
        guid: 1,
        support: y
    }),
    "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]),
    S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase()
    });
    var d = function(n) {
        var e, d, b, o, i, h, f, g, w, u, l, T, C, a, E, v, s, c, y, S = "sizzle" + 1 * new Date, p = n.document, k = 0, r = 0, m = ue(), x = ue(), A = ue(), N = ue(), D = function(e, t) {
            return e === t && (l = !0),
            0
        }, j = {}.hasOwnProperty, t = [], q = t.pop, L = t.push, H = t.push, O = t.slice, P = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]", F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)", B = new RegExp(M + "+","g"), $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$","g"), _ = new RegExp("^" + M + "*," + M + "*"), z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp(M + "|>"), X = new RegExp(F), V = new RegExp("^" + I + "$"), G = {
            ID: new RegExp("^#(" + I + ")"),
            CLASS: new RegExp("^\\.(" + I + ")"),
            TAG: new RegExp("^(" + I + "|[*])"),
            ATTR: new RegExp("^" + W),
            PSEUDO: new RegExp("^" + F),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)","i"),
            bool: new RegExp("^(?:" + R + ")$","i"),
            needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)","i")
        }, Y = /HTML$/i, Q = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])","g"), ne = function(e, t) {
            var n = "0x" + e.slice(1) - 65536;
            return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
        }, re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function(e, t) {
            return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }, oe = function() {
            T()
        }, ae = be(function(e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            H.apply(t = O.call(p.childNodes), p.childNodes),
            t[p.childNodes.length].nodeType
        } catch (e) {
            H = {
                apply: t.length ? function(e, t) {
                    L.apply(e, O.call(t))
                }
                : function(e, t) {
                    var n = e.length
                      , r = 0;
                    while (e[n++] = t[r++])
                        ;
                    e.length = n - 1
                }
            }
        }
        function se(t, e, n, r) {
            var i, o, a, s, u, l, c, f = e && e.ownerDocument, p = e ? e.nodeType : 9;
            if (n = n || [],
            "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p)
                return n;
            if (!r && (T(e),
            e = e || C,
            E)) {
                if (11 !== p && (u = Z.exec(t)))
                    if (i = u[1]) {
                        if (9 === p) {
                            if (!(a = e.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a),
                                n
                        } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i)
                            return n.push(a),
                            n
                    } else {
                        if (u[2])
                            return H.apply(n, e.getElementsByTagName(t)),
                            n;
                        if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName)
                            return H.apply(n, e.getElementsByClassName(i)),
                            n
                    }
                if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
                    if (c = t,
                    f = e,
                    1 === p && (U.test(t) || z.test(t))) {
                        (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)),
                        o = (l = h(t)).length;
                        while (o--)
                            l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
                        c = l.join(",")
                    }
                    try {
                        return H.apply(n, f.querySelectorAll(c)),
                        n
                    } catch (e) {
                        N(t, !0)
                    } finally {
                        s === S && e.removeAttribute("id")
                    }
                }
            }
            return g(t.replace($, "$1"), e, n, r)
        }
        function ue() {
            var r = [];
            return function e(t, n) {
                return r.push(t + " ") > b.cacheLength && delete e[r.shift()],
                e[t + " "] = n
            }
        }
        function le(e) {
            return e[S] = !0,
            e
        }
        function ce(e) {
            var t = C.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function fe(e, t) {
            var n = e.split("|")
              , r = n.length;
            while (r--)
                b.attrHandle[n[r]] = t
        }
        function pe(e, t) {
            var n = t && e
              , r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r)
                return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function de(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }
        function he(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }
        function ge(t) {
            return function(e) {
                return "form"in e ? e.parentNode && !1 === e.disabled ? "label"in e ? "label"in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label"in e && e.disabled === t
            }
        }
        function ve(a) {
            return le(function(o) {
                return o = +o,
                le(function(e, t) {
                    var n, r = a([], e.length, o), i = r.length;
                    while (i--)
                        e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }
        function ye(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        for (e in d = se.support = {},
        i = se.isXML = function(e) {
            var t = e.namespaceURI
              , n = (e.ownerDocument || e).documentElement;
            return !Y.test(t || n && n.nodeName || "HTML")
        }
        ,
        T = se.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : p;
            return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement,
            E = !i(C),
            p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)),
            d.scope = ce(function(e) {
                return a.appendChild(e).appendChild(C.createElement("div")),
                "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
            }),
            d.attributes = ce(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            d.getElementsByTagName = ce(function(e) {
                return e.appendChild(C.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            d.getElementsByClassName = K.test(C.getElementsByClassName),
            d.getById = ce(function(e) {
                return a.appendChild(e).id = S,
                !C.getElementsByName || !C.getElementsByName(S).length
            }),
            d.getById ? (b.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ,
            b.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && E) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ) : (b.filter.ID = function(e) {
                var n = e.replace(te, ne);
                return function(e) {
                    var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n
                }
            }
            ,
            b.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && E) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                        i = t.getElementsByName(e),
                        r = 0;
                        while (o = i[r++])
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o]
                    }
                    return []
                }
            }
            ),
            b.find.TAG = d.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = o[i++])
                        1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }
            ,
            b.find.CLASS = d.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && E)
                    return t.getElementsByClassName(e)
            }
            ,
            s = [],
            v = [],
            (d.qsa = K.test(C.querySelectorAll)) && (ce(function(e) {
                var t;
                a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"),
                e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="),
                (t = C.createElement("input")).setAttribute("name", ""),
                e.appendChild(t),
                e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"),
                e.querySelectorAll(":checked").length || v.push(":checked"),
                e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"),
                e.querySelectorAll("\\\f"),
                v.push("[\\r\\n\\f]")
            }),
            ce(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = C.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="),
                2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"),
                a.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                v.push(",.*:")
            })),
            (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function(e) {
                d.disconnectedMatch = c.call(e, "*"),
                c.call(e, "[s!='']:x"),
                s.push("!=", F)
            }),
            v = v.length && new RegExp(v.join("|")),
            s = s.length && new RegExp(s.join("|")),
            t = K.test(a.compareDocumentPosition),
            y = t || K.test(a.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            : function(e, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            D = t ? function(e, t) {
                if (e === t)
                    return l = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return l = !0,
                    0;
                var n, r = 0, i = e.parentNode, o = t.parentNode, a = [e], s = [t];
                if (!i || !o)
                    return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
                if (i === o)
                    return pe(e, t);
                n = e;
                while (n = n.parentNode)
                    a.unshift(n);
                n = t;
                while (n = n.parentNode)
                    s.unshift(n);
                while (a[r] === s[r])
                    r++;
                return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0
            }
            ),
            C
        }
        ,
        se.matches = function(e, t) {
            return se(e, null, null, t)
        }
        ,
        se.matchesSelector = function(e, t) {
            if (T(e),
            d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t)))
                try {
                    var n = c.call(e, t);
                    if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return n
                } catch (e) {
                    N(t, !0)
                }
            return 0 < se(t, C, null, [e]).length
        }
        ,
        se.contains = function(e, t) {
            return (e.ownerDocument || e) != C && T(e),
            y(e, t)
        }
        ,
        se.attr = function(e, t) {
            (e.ownerDocument || e) != C && T(e);
            var n = b.attrHandle[t.toLowerCase()]
              , r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
            return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }
        ,
        se.escape = function(e) {
            return (e + "").replace(re, ie)
        }
        ,
        se.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        se.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (l = !d.detectDuplicates,
            u = !d.sortStable && e.slice(0),
            e.sort(D),
            l) {
                while (t = e[i++])
                    t === e[i] && (r = n.push(i));
                while (r--)
                    e.splice(n[r], 1)
            }
            return u = null,
            e
        }
        ,
        o = se.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += o(e)
                } else if (3 === i || 4 === i)
                    return e.nodeValue
            } else
                while (t = e[r++])
                    n += o(t);
            return n
        }
        ,
        (b = se.selectors = {
            cacheLength: 50,
            createPseudo: le,
            match: G,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(te, ne),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(te, ne).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = m[e + " "];
                    return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(n, r, i) {
                    return function(e) {
                        var t = se.attr(e, n);
                        return null == t ? "!=" === r : !r || (t += "",
                        "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(h, e, t, g, v) {
                    var y = "nth" !== h.slice(0, 3)
                      , m = "last" !== h.slice(-4)
                      , x = "of-type" === e;
                    return 1 === g && 0 === v ? function(e) {
                        return !!e.parentNode
                    }
                    : function(e, t, n) {
                        var r, i, o, a, s, u, l = y !== m ? "nextSibling" : "previousSibling", c = e.parentNode, f = x && e.nodeName.toLowerCase(), p = !n && !x, d = !1;
                        if (c) {
                            if (y) {
                                while (l) {
                                    a = e;
                                    while (a = a[l])
                                        if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType)
                                            return !1;
                                    u = l = "only" === h && !u && "nextSibling"
                                }
                                return !0
                            }
                            if (u = [m ? c.firstChild : c.lastChild],
                            m && p) {
                                d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2],
                                a = s && c.childNodes[s];
                                while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
                                    if (1 === a.nodeType && ++d && a === e) {
                                        i[h] = [k, s, d];
                                        break
                                    }
                            } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]),
                            !1 === d)
                                while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
                                    if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]),
                                    a === e))
                                        break;
                            return (d -= v) === g || d % g == 0 && 0 <= d / g
                        }
                    }
                },
                PSEUDO: function(e, o) {
                    var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                    return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o],
                    b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function(e, t) {
                        var n, r = a(e, o), i = r.length;
                        while (i--)
                            e[n = P(e, r[i])] = !(t[n] = r[i])
                    }) : function(e) {
                        return a(e, 0, t)
                    }
                    ) : a
                }
            },
            pseudos: {
                not: le(function(e) {
                    var r = []
                      , i = []
                      , s = f(e.replace($, "$1"));
                    return s[S] ? le(function(e, t, n, r) {
                        var i, o = s(e, null, r, []), a = e.length;
                        while (a--)
                            (i = o[a]) && (e[a] = !(t[a] = i))
                    }) : function(e, t, n) {
                        return r[0] = e,
                        s(r, null, n, i),
                        r[0] = null,
                        !i.pop()
                    }
                }),
                has: le(function(t) {
                    return function(e) {
                        return 0 < se(t, e).length
                    }
                }),
                contains: le(function(t) {
                    return t = t.replace(te, ne),
                    function(e) {
                        return -1 < (e.textContent || o(e)).indexOf(t)
                    }
                }),
                lang: le(function(n) {
                    return V.test(n || "") || se.error("unsupported lang: " + n),
                    n = n.replace(te, ne).toLowerCase(),
                    function(e) {
                        var t;
                        do {
                            if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }),
                target: function(e) {
                    var t = n.location && n.location.hash;
                    return t && t.slice(1) === e.id
                },
                root: function(e) {
                    return e === a
                },
                focus: function(e) {
                    return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: ge(!1),
                disabled: ge(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !b.pseudos.empty(e)
                },
                header: function(e) {
                    return J.test(e.nodeName)
                },
                input: function(e) {
                    return Q.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: ve(function() {
                    return [0]
                }),
                last: ve(function(e, t) {
                    return [t - 1]
                }),
                eq: ve(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: ve(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: ve(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: ve(function(e, t, n) {
                    for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; )
                        e.push(r);
                    return e
                }),
                gt: ve(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        }).pseudos.nth = b.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            b.pseudos[e] = de(e);
        for (e in {
            submit: !0,
            reset: !0
        })
            b.pseudos[e] = he(e);
        function me() {}
        function xe(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function be(s, e, t) {
            var u = e.dir
              , l = e.next
              , c = l || u
              , f = t && "parentNode" === c
              , p = r++;
            return e.first ? function(e, t, n) {
                while (e = e[u])
                    if (1 === e.nodeType || f)
                        return s(e, t, n);
                return !1
            }
            : function(e, t, n) {
                var r, i, o, a = [k, p];
                if (n) {
                    while (e = e[u])
                        if ((1 === e.nodeType || f) && s(e, t, n))
                            return !0
                } else
                    while (e = e[u])
                        if (1 === e.nodeType || f)
                            if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}),
                            l && l === e.nodeName.toLowerCase())
                                e = e[u] || e;
                            else {
                                if ((r = i[c]) && r[0] === k && r[1] === p)
                                    return a[2] = r[2];
                                if ((i[c] = a)[2] = s(e, t, n))
                                    return !0
                            }
                return !1
            }
        }
        function we(i) {
            return 1 < i.length ? function(e, t, n) {
                var r = i.length;
                while (r--)
                    if (!i[r](e, t, n))
                        return !1;
                return !0
            }
            : i[0]
        }
        function Te(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                l && t.push(s)));
            return a
        }
        function Ce(d, h, g, v, y, e) {
            return v && !v[S] && (v = Ce(v)),
            y && !y[S] && (y = Ce(y, e)),
            le(function(e, t, n, r) {
                var i, o, a, s = [], u = [], l = t.length, c = e || function(e, t, n) {
                    for (var r = 0, i = t.length; r < i; r++)
                        se(e, t[r], n);
                    return n
                }(h || "*", n.nodeType ? [n] : n, []), f = !d || !e && h ? c : Te(c, s, d, n, r), p = g ? y || (e ? d : l || v) ? [] : t : f;
                if (g && g(f, p, n, r),
                v) {
                    i = Te(p, u),
                    v(i, [], n, r),
                    o = i.length;
                    while (o--)
                        (a = i[o]) && (p[u[o]] = !(f[u[o]] = a))
                }
                if (e) {
                    if (y || d) {
                        if (y) {
                            i = [],
                            o = p.length;
                            while (o--)
                                (a = p[o]) && i.push(f[o] = a);
                            y(null, p = [], i, r)
                        }
                        o = p.length;
                        while (o--)
                            (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a))
                    }
                } else
                    p = Te(p === t ? p.splice(l, p.length) : p),
                    y ? y(null, t, p, r) : H.apply(t, p)
            })
        }
        function Ee(e) {
            for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function(e) {
                return e === i
            }, a, !0), l = be(function(e) {
                return -1 < P(i, e)
            }, a, !0), c = [function(e, t, n) {
                var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                return i = null,
                r
            }
            ]; s < r; s++)
                if (t = b.relative[e[s].type])
                    c = [be(we(c), t)];
                else {
                    if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
                        for (n = ++s; n < r; n++)
                            if (b.relative[e[n].type])
                                break;
                        return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e))
                    }
                    c.push(t)
                }
            return we(c)
        }
        return me.prototype = b.filters = b.pseudos,
        b.setFilters = new me,
        h = se.tokenize = function(e, t) {
            var n, r, i, o, a, s, u, l = x[e + " "];
            if (l)
                return t ? 0 : l.slice(0);
            a = e,
            s = [],
            u = b.preFilter;
            while (a) {
                for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a),
                s.push(i = [])),
                n = !1,
                (r = z.exec(a)) && (n = r.shift(),
                i.push({
                    value: n,
                    type: r[0].replace($, " ")
                }),
                a = a.slice(n.length)),
                b.filter)
                    !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(),
                    i.push({
                        value: n,
                        type: o,
                        matches: r
                    }),
                    a = a.slice(n.length));
                if (!n)
                    break
            }
            return t ? a.length : a ? se.error(e) : x(e, s).slice(0)
        }
        ,
        f = se.compile = function(e, t) {
            var n, v, y, m, x, r, i = [], o = [], a = A[e + " "];
            if (!a) {
                t || (t = h(e)),
                n = t.length;
                while (n--)
                    (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
                (a = A(e, (v = o,
                m = 0 < (y = i).length,
                x = 0 < v.length,
                r = function(e, t, n, r, i) {
                    var o, a, s, u = 0, l = "0", c = e && [], f = [], p = w, d = e || x && b.find.TAG("*", i), h = k += null == p ? 1 : Math.random() || .1, g = d.length;
                    for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
                        if (x && o) {
                            a = 0,
                            t || o.ownerDocument == C || (T(o),
                            n = !E);
                            while (s = v[a++])
                                if (s(o, t || C, n)) {
                                    r.push(o);
                                    break
                                }
                            i && (k = h)
                        }
                        m && ((o = !s && o) && u--,
                        e && c.push(o))
                    }
                    if (u += l,
                    m && l !== u) {
                        a = 0;
                        while (s = y[a++])
                            s(c, f, t, n);
                        if (e) {
                            if (0 < u)
                                while (l--)
                                    c[l] || f[l] || (f[l] = q.call(r));
                            f = Te(f)
                        }
                        H.apply(r, f),
                        i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r)
                    }
                    return i && (k = h,
                    w = p),
                    c
                }
                ,
                m ? le(r) : r))).selector = e
            }
            return a
        }
        ,
        g = se.select = function(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e, c = !r && h(e = l.selector || e);
            if (n = n || [],
            1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0]))
                        return n;
                    l && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                i = G.needsContext.test(e) ? 0 : o.length;
                while (i--) {
                    if (a = o[i],
                    b.relative[s = a.type])
                        break;
                    if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
                        if (o.splice(i, 1),
                        !(e = r.length && xe(o)))
                            return H.apply(n, r),
                            n;
                        break
                    }
                }
            }
            return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t),
            n
        }
        ,
        d.sortStable = S.split("").sort(D).join("") === S,
        d.detectDuplicates = !!l,
        T(),
        d.sortDetached = ce(function(e) {
            return 1 & e.compareDocumentPosition(C.createElement("fieldset"))
        }),
        ce(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || fe("type|href|height|width", function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        d.attributes && ce(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || fe("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }),
        ce(function(e) {
            return null == e.getAttribute("disabled")
        }) || fe(R, function(e, t, n) {
            var r;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        se
    }(C);
    S.find = d,
    S.expr = d.selectors,
    S.expr[":"] = S.expr.pseudos,
    S.uniqueSort = S.unique = d.uniqueSort,
    S.text = d.getText,
    S.isXMLDoc = d.isXML,
    S.contains = d.contains,
    S.escapeSelector = d.escape;
    var h = function(e, t, n) {
        var r = []
          , i = void 0 !== n;
        while ((e = e[t]) && 9 !== e.nodeType)
            if (1 === e.nodeType) {
                if (i && S(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
      , T = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , k = S.expr.match.needsContext;
    function A(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function D(e, n, r) {
        return m(n) ? S.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? S.grep(e, function(e) {
            return e === n !== r
        }) : "string" != typeof n ? S.grep(e, function(e) {
            return -1 < i.call(n, e) !== r
        }) : S.filter(n, e, r)
    }
    S.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    S.fn.extend({
        find: function(e) {
            var t, n, r = this.length, i = this;
            if ("string" != typeof e)
                return this.pushStack(S(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (S.contains(i[t], this))
                            return !0
                }));
            for (n = this.pushStack([]),
            t = 0; t < r; t++)
                S.find(e, i[t], n);
            return 1 < r ? S.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(D(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(D(this, e || [], !0))
        },
        is: function(e) {
            return !!D(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length
        }
    });
    var j, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (S.fn.init = function(e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || j,
        "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof S ? t[0] : t,
                S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)),
                N.test(r[1]) && S.isPlainObject(t))
                    for (r in t)
                        m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = E.getElementById(r[2])) && (this[0] = i,
            this.length = 1),
            this
        }
        return e.nodeType ? (this[0] = e,
        this.length = 1,
        this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this)
    }
    ).prototype = S.fn,
    j = S(E);
    var L = /^(?:parents|prev(?:Until|All))/
      , H = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function O(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType)
            ;
        return e
    }
    S.fn.extend({
        has: function(e) {
            var t = S(e, this)
              , n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (S.contains(this, t[e]))
                        return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], a = "string" != typeof e && S(e);
            if (!k.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(1 < o.length ? S.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    S.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return h(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return h(e, "parentNode", n)
        },
        next: function(e) {
            return O(e, "nextSibling")
        },
        prev: function(e) {
            return O(e, "previousSibling")
        },
        nextAll: function(e) {
            return h(e, "nextSibling")
        },
        prevAll: function(e) {
            return h(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return h(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return h(e, "previousSibling", n)
        },
        siblings: function(e) {
            return T((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return T(e.firstChild)
        },
        contents: function(e) {
            return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e),
            S.merge([], e.childNodes))
        }
    }, function(r, i) {
        S.fn[r] = function(e, t) {
            var n = S.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e),
            t && "string" == typeof t && (n = S.filter(t, n)),
            1 < this.length && (H[r] || S.uniqueSort(n),
            L.test(r) && n.reverse()),
            this.pushStack(n)
        }
    });
    var P = /[^\x20\t\r\n\f]+/g;
    function R(e) {
        return e
    }
    function M(e) {
        throw e
    }
    function I(e, t, n, r) {
        var i;
        try {
            e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    S.Callbacks = function(r) {
        var e, n;
        r = "string" == typeof r ? (e = r,
        n = {},
        S.each(e.match(P) || [], function(e, t) {
            n[t] = !0
        }),
        n) : S.extend({}, r);
        var i, t, o, a, s = [], u = [], l = -1, c = function() {
            for (a = a || r.once,
            o = i = !0; u.length; l = -1) {
                t = u.shift();
                while (++l < s.length)
                    !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length,
                    t = !1)
            }
            r.memory || (t = !1),
            i = !1,
            a && (s = t ? [] : "")
        }, f = {
            add: function() {
                return s && (t && !i && (l = s.length - 1,
                u.push(t)),
                function n(e) {
                    S.each(e, function(e, t) {
                        m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t)
                    })
                }(arguments),
                t && !i && c()),
                this
            },
            remove: function() {
                return S.each(arguments, function(e, t) {
                    var n;
                    while (-1 < (n = S.inArray(t, s, n)))
                        s.splice(n, 1),
                        n <= l && l--
                }),
                this
            },
            has: function(e) {
                return e ? -1 < S.inArray(e, s) : 0 < s.length
            },
            empty: function() {
                return s && (s = []),
                this
            },
            disable: function() {
                return a = u = [],
                s = t = "",
                this
            },
            disabled: function() {
                return !s
            },
            lock: function() {
                return a = u = [],
                t || i || (s = t = ""),
                this
            },
            locked: function() {
                return !!a
            },
            fireWith: function(e, t) {
                return a || (t = [e, (t = t || []).slice ? t.slice() : t],
                u.push(t),
                i || c()),
                this
            },
            fire: function() {
                return f.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!o
            }
        };
        return f
    }
    ,
    S.extend({
        Deferred: function(e) {
            var o = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]]
              , i = "pending"
              , a = {
                state: function() {
                    return i
                },
                always: function() {
                    return s.done(arguments).fail(arguments),
                    this
                },
                "catch": function(e) {
                    return a.then(null, e)
                },
                pipe: function() {
                    var i = arguments;
                    return S.Deferred(function(r) {
                        S.each(o, function(e, t) {
                            var n = m(i[t[4]]) && i[t[4]];
                            s[t[1]](function() {
                                var e = n && n.apply(this, arguments);
                                e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                            })
                        }),
                        i = null
                    }).promise()
                },
                then: function(t, n, r) {
                    var u = 0;
                    function l(i, o, a, s) {
                        return function() {
                            var n = this
                              , r = arguments
                              , e = function() {
                                var e, t;
                                if (!(i < u)) {
                                    if ((e = a.apply(n, r)) === o.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    t = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                    m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++,
                                    t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0,
                                    r = [e]),
                                    (s || o.resolveWith)(n, r))
                                }
                            }
                              , t = s ? e : function() {
                                try {
                                    e()
                                } catch (e) {
                                    S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace),
                                    u <= i + 1 && (a !== M && (n = void 0,
                                    r = [e]),
                                    o.rejectWith(n, r))
                                }
                            }
                            ;
                            i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()),
                            C.setTimeout(t))
                        }
                    }
                    return S.Deferred(function(e) {
                        o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)),
                        o[1][3].add(l(0, e, m(t) ? t : R)),
                        o[2][3].add(l(0, e, m(n) ? n : M))
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? S.extend(e, a) : a
                }
            }
              , s = {};
            return S.each(o, function(e, t) {
                var n = t[2]
                  , r = t[5];
                a[t[1]] = n.add,
                r && n.add(function() {
                    i = r
                }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock),
                n.add(t[3].fire),
                s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments),
                    this
                }
                ,
                s[t[0] + "With"] = n.fireWith
            }),
            a.promise(s),
            e && e.call(s, s),
            s
        },
        when: function(e) {
            var n = arguments.length
              , t = n
              , r = Array(t)
              , i = s.call(arguments)
              , o = S.Deferred()
              , a = function(t) {
                return function(e) {
                    r[t] = this,
                    i[t] = 1 < arguments.length ? s.call(arguments) : e,
                    --n || o.resolveWith(r, i)
                }
            };
            if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n),
            "pending" === o.state() || m(i[t] && i[t].then)))
                return o.then();
            while (t--)
                I(i[t], a(t), o.reject);
            return o.promise()
        }
    });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    S.Deferred.exceptionHook = function(e, t) {
        C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }
    ,
    S.readyException = function(e) {
        C.setTimeout(function() {
            throw e
        })
    }
    ;
    var F = S.Deferred();
    function B() {
        E.removeEventListener("DOMContentLoaded", B),
        C.removeEventListener("load", B),
        S.ready()
    }
    S.fn.ready = function(e) {
        return F.then(e)["catch"](function(e) {
            S.readyException(e)
        }),
        this
    }
    ,
    S.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S])
        }
    }),
    S.ready.then = F.then,
    "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B),
    C.addEventListener("load", B));
    var $ = function(e, t, n, r, i, o, a) {
        var s = 0
          , u = e.length
          , l = null == n;
        if ("object" === w(n))
            for (s in i = !0,
            n)
                $(e, t, s, n[s], !0, o, a);
        else if (void 0 !== r && (i = !0,
        m(r) || (a = !0),
        l && (a ? (t.call(e, r),
        t = null) : (l = t,
        t = function(e, t, n) {
            return l.call(S(e), n)
        }
        )),
        t))
            for (; s < u; s++)
                t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    }
      , _ = /^-ms-/
      , z = /-([a-z])/g;
    function U(e, t) {
        return t.toUpperCase()
    }
    function X(e) {
        return e.replace(_, "ms-").replace(z, U)
    }
    var V = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    function G() {
        this.expando = S.expando + G.uid++
    }
    G.uid = 1,
    G.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t)
                i[X(t)] = n;
            else
                for (r in t)
                    i[X(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
            void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(X) : (t = X(t))in r ? [t] : t.match(P) || []).length;
                    while (n--)
                        delete r[t[n]]
                }
                (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !S.isEmptyObject(t)
        }
    };
    var Y = new G
      , Q = new G
      , J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , K = /[A-Z]/g;
    function Z(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(K, "-$&").toLowerCase(),
            "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                Q.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    S.extend({
        hasData: function(e) {
            return Q.hasData(e) || Y.hasData(e)
        },
        data: function(e, t, n) {
            return Q.access(e, t, n)
        },
        removeData: function(e, t) {
            Q.remove(e, t)
        },
        _data: function(e, t, n) {
            return Y.access(e, t, n)
        },
        _removeData: function(e, t) {
            Y.remove(e, t)
        }
    }),
    S.fn.extend({
        data: function(n, e) {
            var t, r, i, o = this[0], a = o && o.attributes;
            if (void 0 === n) {
                if (this.length && (i = Q.get(o),
                1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
                    t = a.length;
                    while (t--)
                        a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)),
                        Z(o, r, i[r]));
                    Y.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof n ? this.each(function() {
                Q.set(this, n)
            }) : $(this, function(e) {
                var t;
                if (o && void 0 === e)
                    return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
                this.each(function() {
                    Q.set(this, n, e)
                })
            }, null, e, 1 < arguments.length, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Q.remove(this, e)
            })
        }
    }),
    S.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue",
                r = Y.get(e, t),
                n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = S.queue(e, t)
              , r = n.length
              , i = n.shift()
              , o = S._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(),
            r--),
            i && ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(e, function() {
                S.dequeue(e, t)
            }, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Y.get(e, n) || Y.access(e, n, {
                empty: S.Callbacks("once memory").add(function() {
                    Y.remove(e, [t + "queue", n])
                })
            })
        }
    }),
    S.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t,
            t = "fx",
            e--),
            arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = S.queue(this, t, n);
                S._queueHooks(this, t),
                "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                S.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1, i = S.Deferred(), o = this, a = this.length, s = function() {
                --r || i.resolveWith(o, [o])
            };
            "string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx";
            while (a--)
                (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++,
                n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$","i")
      , ne = ["Top", "Right", "Bottom", "Left"]
      , re = E.documentElement
      , ie = function(e) {
        return S.contains(e.ownerDocument, e)
    }
      , oe = {
        composed: !0
    };
    re.getRootNode && (ie = function(e) {
        return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
    }
    );
    var ae = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display")
    };
    function se(e, t, n, r) {
        var i, o, a = 20, s = r ? function() {
            return r.cur()
        }
        : function() {
            return S.css(e, t, "")
        }
        , u = s(), l = n && n[3] || (S.cssNumber[t] ? "" : "px"), c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));
        if (c && c[3] !== l) {
            u /= 2,
            l = l || c[3],
            c = +u || 1;
            while (a--)
                S.style(e, t, c + l),
                (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0),
                c /= o;
            c *= 2,
            S.style(e, t, c + l),
            n = n || []
        }
        return n && (c = +c || +u || 0,
        i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        r && (r.unit = l,
        r.start = c,
        r.end = i)),
        i
    }
    var ue = {};
    function le(e, t) {
        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
            (r = e[c]).style && (n = r.style.display,
            t ? ("none" === n && (l[c] = Y.get(r, "display") || null,
            l[c] || (r.style.display = "")),
            "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0,
            a = (i = r).ownerDocument,
            s = i.nodeName,
            (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)),
            u = S.css(o, "display"),
            o.parentNode.removeChild(o),
            "none" === u && (u = "block"),
            ue[s] = u)))) : "none" !== n && (l[c] = "none",
            Y.set(r, "display", n)));
        for (c = 0; c < f; c++)
            null != l[c] && (e[c].style.display = l[c]);
        return e
    }
    S.fn.extend({
        show: function() {
            return le(this, !0)
        },
        hide: function() {
            return le(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ae(this) ? S(this).show() : S(this).hide()
            })
        }
    });
    var ce, fe, pe = /^(?:checkbox|radio)$/i, de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, he = /^$|^module$|\/(?:java|ecma)script/i;
    ce = E.createDocumentFragment().appendChild(E.createElement("div")),
    (fe = E.createElement("input")).setAttribute("type", "radio"),
    fe.setAttribute("checked", "checked"),
    fe.setAttribute("name", "t"),
    ce.appendChild(fe),
    y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked,
    ce.innerHTML = "<textarea>x</textarea>",
    y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue,
    ce.innerHTML = "<option></option>",
    y.option = !!ce.lastChild;
    var ge = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    function ve(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t || t && A(e, t) ? S.merge([e], n) : n
    }
    function ye(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"))
    }
    ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead,
    ge.th = ge.td,
    y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
    var me = /<|&#?\w+;/;
    function xe(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === w(o))
                    S.merge(p, o.nodeType ? [o] : o);
                else if (me.test(o)) {
                    a = a || f.appendChild(t.createElement("div")),
                    s = (de.exec(o) || ["", ""])[1].toLowerCase(),
                    u = ge[s] || ge._default,
                    a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2],
                    c = u[0];
                    while (c--)
                        a = a.lastChild;
                    S.merge(p, a.childNodes),
                    (a = f.firstChild).textContent = ""
                } else
                    p.push(t.createTextNode(o));
        f.textContent = "",
        d = 0;
        while (o = p[d++])
            if (r && -1 < S.inArray(o, r))
                i && i.push(o);
            else if (l = ie(o),
            a = ve(f.appendChild(o), "script"),
            l && ye(a),
            n) {
                c = 0;
                while (o = a[c++])
                    he.test(o.type || "") && n.push(o)
            }
        return f
    }
    var be = /^key/
      , we = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , Te = /^([^.]*)(?:\.(.+)|)/;
    function Ce() {
        return !0
    }
    function Ee() {
        return !1
    }
    function Se(e, t) {
        return e === function() {
            try {
                return E.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }
    function ke(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n,
            n = void 0),
            t)
                ke(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n,
        r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
        r = void 0) : (i = r,
        r = n,
        n = void 0)),
        !1 === i)
            i = Ee;
        else if (!i)
            return e;
        return 1 === o && (a = i,
        (i = function(e) {
            return S().off(e),
            a.apply(this, arguments)
        }
        ).guid = a.guid || (a.guid = S.guid++)),
        e.each(function() {
            S.event.add(this, t, i, r, n)
        })
    }
    function Ae(e, i, o) {
        o ? (Y.set(e, i, !1),
        S.event.add(e, i, {
            namespace: !1,
            handler: function(e) {
                var t, n, r = Y.get(this, i);
                if (1 & e.isTrigger && this[i]) {
                    if (r.length)
                        (S.event.special[i] || {}).delegateType && e.stopPropagation();
                    else if (r = s.call(arguments),
                    Y.set(this, i, r),
                    t = o(this, i),
                    this[i](),
                    r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {},
                    r !== n)
                        return e.stopImmediatePropagation(),
                        e.preventDefault(),
                        n ? n.value : void 0
                } else
                    r.length && (Y.set(this, i, {
                        value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
                    }),
                    e.stopImmediatePropagation())
            }
        })) : void 0 === Y.get(e, i) && S.event.add(e, i, Ce)
    }
    S.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Y.get(t);
            if (V(t)) {
                n.handler && (n = (o = n).handler,
                i = o.selector),
                i && S.find.matchesSelector(re, i),
                n.guid || (n.guid = S.guid++),
                (u = v.events) || (u = v.events = Object.create(null)),
                (a = v.handle) || (a = v.handle = function(e) {
                    return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0
                }
                ),
                l = (e = (e || "").match(P) || [""]).length;
                while (l--)
                    d = g = (s = Te.exec(e[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d && (f = S.event.special[d] || {},
                    d = (i ? f.delegateType : f.bindType) || d,
                    f = S.event.special[d] || {},
                    c = S.extend({
                        type: d,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && S.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o),
                    (p = u[d]) || ((p = u[d] = []).delegateCount = 0,
                    f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)),
                    f.add && (f.add.call(t, c),
                    c.handler.guid || (c.handler.guid = n.guid)),
                    i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                    S.event.global[d] = !0)
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Y.hasData(e) && Y.get(e);
            if (v && (u = v.events)) {
                l = (t = (t || "").match(P) || [""]).length;
                while (l--)
                    if (d = g = (s = Te.exec(t[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d) {
                        f = S.event.special[d] || {},
                        p = u[d = (r ? f.delegateType : f.bindType) || d] || [],
                        s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        a = o = p.length;
                        while (o--)
                            c = p[o],
                            !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1),
                            c.selector && p.delegateCount--,
                            f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle),
                        delete u[d])
                    } else
                        for (d in u)
                            S.event.remove(e, d + t[l], n, r, !0);
                S.isEmptyObject(u) && Y.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = new Array(arguments.length), u = S.event.fix(e), l = (Y.get(this, "events") || Object.create(null))[u.type] || [], c = S.event.special[u.type] || {};
            for (s[0] = u,
            t = 1; t < arguments.length; t++)
                s[t] = arguments[t];
            if (u.delegateTarget = this,
            !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                a = S.event.handlers.call(this, u, l),
                t = 0;
                while ((i = a[t++]) && !u.isPropagationStopped()) {
                    u.currentTarget = i.elem,
                    n = 0;
                    while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped())
                        u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o,
                        u.data = o.data,
                        void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(),
                        u.stopPropagation()))
                }
                return c.postDispatch && c.postDispatch.call(this, u),
                u.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [],
                        a = {},
                        n = 0; n < u; n++)
                            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length),
                            a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return l = this,
            u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }),
            s
        },
        addProp: function(t, e) {
            Object.defineProperty(S.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: m(e) ? function() {
                    if (this.originalEvent)
                        return e(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[t]
                }
                ,
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(e) {
            return e[S.expando] ? e : new S.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click", Ce),
                    !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click"),
                    !0
                },
                _default: function(e) {
                    var t = e.target;
                    return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    S.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    ,
    S.Event = function(e, t) {
        if (!(this instanceof S.Event))
            return new S.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ce : Ee,
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && S.extend(this, t),
        this.timeStamp = e && e.timeStamp || Date.now(),
        this[S.expando] = !0
    }
    ,
    S.Event.prototype = {
        constructor: S.Event,
        isDefaultPrevented: Ee,
        isPropagationStopped: Ee,
        isImmediatePropagationStopped: Ee,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Ce,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Ce,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Ce,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    S.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && be.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && we.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, S.event.addProp),
    S.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        S.event.special[e] = {
            setup: function() {
                return Ae(this, e, Se),
                !1
            },
            trigger: function() {
                return Ae(this, e),
                !0
            },
            delegateType: t
        }
    }),
    S.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        S.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t, n = e.relatedTarget, r = e.handleObj;
                return n && (n === this || S.contains(this, n)) || (e.type = r.origType,
                t = r.handler.apply(this, arguments),
                e.type = i),
                t
            }
        }
    }),
    S.fn.extend({
        on: function(e, t, n, r) {
            return ke(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return ke(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" == typeof e) {
                for (i in e)
                    this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t,
            t = void 0),
            !1 === n && (n = Ee),
            this.each(function() {
                S.event.remove(this, e, n, t)
            })
        }
    });
    var Ne = /<script|<style|<link/i
      , De = /checked\s*(?:[^=]|=\s*.checked.)/i
      , je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function qe(e, t) {
        return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e
    }
    function Le(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function He(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"),
        e
    }
    function Oe(e, t) {
        var n, r, i, o, a, s;
        if (1 === t.nodeType) {
            if (Y.hasData(e) && (s = Y.get(e).events))
                for (i in Y.remove(t, "handle events"),
                s)
                    for (n = 0,
                    r = s[i].length; n < r; n++)
                        S.event.add(t, i, s[i][n]);
            Q.hasData(e) && (o = Q.access(e),
            a = S.extend({}, o),
            Q.set(t, a))
        }
    }
    function Pe(n, r, i, o) {
        r = g(r);
        var e, t, a, s, u, l, c = 0, f = n.length, p = f - 1, d = r[0], h = m(d);
        if (h || 1 < f && "string" == typeof d && !y.checkClone && De.test(d))
            return n.each(function(e) {
                var t = n.eq(e);
                h && (r[0] = d.call(this, e, t.html())),
                Pe(t, r, i, o)
            });
        if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild,
        1 === e.childNodes.length && (e = t),
        t || o)) {
            for (s = (a = S.map(ve(e, "script"), Le)).length; c < f; c++)
                u = e,
                c !== p && (u = S.clone(u, !0, !0),
                s && S.merge(a, ve(u, "script"))),
                i.call(n[c], u, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument,
                S.map(a, He),
                c = 0; c < s; c++)
                    u = a[c],
                    he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
                        nonce: u.nonce || u.getAttribute("nonce")
                    }, l) : b(u.textContent.replace(je, ""), u, l))
        }
        return n
    }
    function Re(e, t, n) {
        for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || S.cleanData(ve(r)),
            r.parentNode && (n && ie(r) && ye(ve(r, "script")),
            r.parentNode.removeChild(r));
        return e
    }
    S.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {
            var r, i, o, a, s, u, l, c = e.cloneNode(!0), f = ie(e);
            if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e)))
                for (a = ve(c),
                r = 0,
                i = (o = ve(e)).length; r < i; r++)
                    s = o[r],
                    u = a[r],
                    void 0,
                    "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (o = o || ve(e),
                    a = a || ve(c),
                    r = 0,
                    i = o.length; r < i; r++)
                        Oe(o[r], a[r]);
                else
                    Oe(e, c);
            return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")),
            c
        },
        cleanData: function(e) {
            for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (V(n)) {
                    if (t = n[Y.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
                        n[Y.expando] = void 0
                    }
                    n[Q.expando] && (n[Q.expando] = void 0)
                }
        }
    }),
    S.fn.extend({
        detach: function(e) {
            return Re(this, e, !0)
        },
        remove: function(e) {
            return Re(this, e)
        },
        text: function(e) {
            return $(this, function(e) {
                return void 0 === e ? S.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return Pe(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return Pe(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = qe(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return Pe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return Pe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (S.cleanData(ve(e, !1)),
                e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map(function() {
                return S.clone(this, e, t)
            })
        },
        html: function(e) {
            return $(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , r = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !Ne.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = S.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return Pe(this, arguments, function(e) {
                var t = this.parentNode;
                S.inArray(this, n) < 0 && (S.cleanData(ve(this)),
                t && t.replaceChild(e, this))
            }, n)
        }
    }),
    S.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        S.fn[e] = function(e) {
            for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++)
                t = o === i ? this : this.clone(!0),
                S(r[o])[a](t),
                u.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$","i")
      , Ie = function(e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = C),
        t.getComputedStyle(e)
    }
      , We = function(e, t, n) {
        var r, i, o = {};
        for (i in t)
            o[i] = e.style[i],
            e.style[i] = t[i];
        for (i in r = n.call(e),
        t)
            e.style[i] = o[i];
        return r
    }
      , Fe = new RegExp(ne.join("|"),"i");
    function Be(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || Ie(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)),
        !y.pixelBoxStyles() && Me.test(a) && Fe.test(t) && (r = s.width,
        i = s.minWidth,
        o = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = a,
        a = n.width,
        s.width = r,
        s.minWidth = i,
        s.maxWidth = o)),
        void 0 !== a ? a + "" : a
    }
    function $e(e, t) {
        return {
            get: function() {
                if (!e())
                    return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    !function() {
        function e() {
            if (l) {
                u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                re.appendChild(u).appendChild(l);
                var e = C.getComputedStyle(l);
                n = "1%" !== e.top,
                s = 12 === t(e.marginLeft),
                l.style.right = "60%",
                o = 36 === t(e.right),
                r = 36 === t(e.width),
                l.style.position = "absolute",
                i = 12 === t(l.offsetWidth / 3),
                re.removeChild(u),
                l = null
            }
        }
        function t(e) {
            return Math.round(parseFloat(e))
        }
        var n, r, i, o, a, s, u = E.createElement("div"), l = E.createElement("div");
        l.style && (l.style.backgroundClip = "content-box",
        l.cloneNode(!0).style.backgroundClip = "",
        y.clearCloneStyle = "content-box" === l.style.backgroundClip,
        S.extend(y, {
            boxSizingReliable: function() {
                return e(),
                r
            },
            pixelBoxStyles: function() {
                return e(),
                o
            },
            pixelPosition: function() {
                return e(),
                n
            },
            reliableMarginLeft: function() {
                return e(),
                s
            },
            scrollboxSize: function() {
                return e(),
                i
            },
            reliableTrDimensions: function() {
                var e, t, n, r;
                return null == a && (e = E.createElement("table"),
                t = E.createElement("tr"),
                n = E.createElement("div"),
                e.style.cssText = "position:absolute;left:-11111px",
                t.style.height = "1px",
                n.style.height = "9px",
                re.appendChild(e).appendChild(t).appendChild(n),
                r = C.getComputedStyle(t),
                a = 3 < parseInt(r.height),
                re.removeChild(e)),
                a
            }
        }))
    }();
    var _e = ["Webkit", "Moz", "ms"]
      , ze = E.createElement("div").style
      , Ue = {};
    function Xe(e) {
        var t = S.cssProps[e] || Ue[e];
        return t || (e in ze ? e : Ue[e] = function(e) {
            var t = e[0].toUpperCase() + e.slice(1)
              , n = _e.length;
            while (n--)
                if ((e = _e[n] + t)in ze)
                    return e
        }(e) || e)
    }
    var Ve = /^(none|table(?!-c[ea]).+)/
      , Ge = /^--/
      , Ye = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , Qe = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    function Je(e, t, n) {
        var r = te.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }
    function Ke(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0
          , s = 0
          , u = 0;
        if (n === (r ? "border" : "content"))
            return 0;
        for (; a < 4; a += 2)
            "margin" === n && (u += S.css(e, n + ne[a], !0, i)),
            r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)),
            "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i),
            "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
        return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0),
        u
    }
    function Ze(e, t, n) {
        var r = Ie(e)
          , i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r)
          , o = i
          , a = Be(e, t, r)
          , s = "offset" + t[0].toUpperCase() + t.slice(1);
        if (Me.test(a)) {
            if (!n)
                return a;
            a = "auto"
        }
        return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r),
        (o = s in e) && (a = e[s])),
        (a = parseFloat(a) || 0) + Ke(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
    }
    function et(e, t, n, r, i) {
        return new et.prototype.init(e,t,n,r,i)
    }
    S.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Be(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = X(t), u = Ge.test(t), l = e.style;
                if (u || (t = Xe(s)),
                a = S.cssHooks[t] || S.cssHooks[s],
                void 0 === n)
                    return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = se(e, t, i),
                o = "number"),
                null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")),
                y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                a && "set"in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = X(t);
            return Ge.test(t) || (t = Xe(s)),
            (a = S.cssHooks[t] || S.cssHooks[s]) && "get"in a && (i = a.get(e, !0, n)),
            void 0 === i && (i = Be(e, t, r)),
            "normal" === i && t in Qe && (i = Qe[t]),
            "" === n || n ? (o = parseFloat(i),
            !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }),
    S.each(["height", "width"], function(e, u) {
        S.cssHooks[u] = {
            get: function(e, t, n) {
                if (t)
                    return !Ve.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ze(e, u, n) : We(e, Ye, function() {
                        return Ze(e, u, n)
                    })
            },
            set: function(e, t, n) {
                var r, i = Ie(e), o = !y.scrollboxSize() && "absolute" === i.position, a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i), s = n ? Ke(e, u, n, a, i) : 0;
                return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Ke(e, u, "border", !1, i) - .5)),
                s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t,
                t = S.css(e, u)),
                Je(0, t, s)
            }
        }
    }),
    S.cssHooks.marginLeft = $e(y.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(Be(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
    }),
    S.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        S.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)
                    n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        },
        "margin" !== i && (S.cssHooks[i + o].set = Je)
    }),
    S.fn.extend({
        css: function(e, t) {
            return $(this, function(e, t, n) {
                var r, i, o = {}, a = 0;
                if (Array.isArray(t)) {
                    for (r = Ie(e),
                    i = t.length; a < i; a++)
                        o[t[a]] = S.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? S.style(e, t, n) : S.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }),
    ((S.Tween = et).prototype = {
        constructor: et,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || S.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (S.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = et.propHooks[this.prop];
            return e && e.get ? e.get(this) : et.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = et.propHooks[this.prop];
            return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : et.propHooks._default.set(this),
            this
        }
    }).init.prototype = et.prototype,
    (et.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[Xe(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = et.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    S.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    S.fx = et.prototype.init,
    S.fx.step = {};
    var tt, nt, rt, it, ot = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
    function st() {
        nt && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(st) : C.setTimeout(st, S.fx.interval),
        S.fx.tick())
    }
    function ut() {
        return C.setTimeout(function() {
            tt = void 0
        }),
        tt = Date.now()
    }
    function lt(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            i["margin" + (n = ne[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function ct(e, t, n) {
        for (var r, i = (ft.tweeners[t] || []).concat(ft.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function ft(o, e, t) {
        var n, a, r = 0, i = ft.prefilters.length, s = S.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (a)
                return !1;
            for (var e = tt || ut(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++)
                l.tweens[r].run(n);
            return s.notifyWith(o, [l, n, t]),
            n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]),
            s.resolveWith(o, [l]),
            !1)
        }, l = s.promise({
            elem: o,
            props: S.extend({}, e),
            opts: S.extend(!0, {
                specialEasing: {},
                easing: S.easing._default
            }, t),
            originalProperties: e,
            originalOptions: t,
            startTime: tt || ut(),
            duration: t.duration,
            tweens: [],
            createTween: function(e, t) {
                var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                return l.tweens.push(n),
                n
            },
            stop: function(e) {
                var t = 0
                  , n = e ? l.tweens.length : 0;
                if (a)
                    return this;
                for (a = !0; t < n; t++)
                    l.tweens[t].run(1);
                return e ? (s.notifyWith(o, [l, 1, 0]),
                s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]),
                this
            }
        }), c = l.props;
        for (!function(e, t) {
            var n, r, i, o, a;
            for (n in e)
                if (i = t[r = X(n)],
                o = e[n],
                Array.isArray(o) && (i = o[1],
                o = e[n] = o[0]),
                n !== r && (e[r] = o,
                delete e[n]),
                (a = S.cssHooks[r]) && "expand"in a)
                    for (n in o = a.expand(o),
                    delete e[r],
                    o)
                        n in e || (e[n] = o[n],
                        t[n] = i);
                else
                    t[r] = i
        }(c, l.opts.specialEasing); r < i; r++)
            if (n = ft.prefilters[r].call(l, o, c, l.opts))
                return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
                n;
        return S.map(c, ct, l),
        m(l.opts.start) && l.opts.start.call(o, l),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always),
        S.fx.timer(S.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })),
        l
    }
    S.Animation = S.extend(ft, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return se(n.elem, e, te.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            m(e) ? (t = e,
            e = ["*"]) : e = e.match(P);
            for (var n, r = 0, i = e.length; r < i; r++)
                n = e[r],
                ft.tweeners[n] = ft.tweeners[n] || [],
                ft.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, i, o, a, s, u, l, c, f = "width"in t || "height"in t, p = this, d = {}, h = e.style, g = e.nodeType && ae(e), v = Y.get(e, "fxshow");
            for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0,
            s = a.empty.fire,
            a.empty.fire = function() {
                a.unqueued || s()
            }
            ),
            a.unqueued++,
            p.always(function() {
                p.always(function() {
                    a.unqueued--,
                    S.queue(e, "fx").length || a.empty.fire()
                })
            })),
            t)
                if (i = t[r],
                ot.test(i)) {
                    if (delete t[r],
                    o = o || "toggle" === i,
                    i === (g ? "hide" : "show")) {
                        if ("show" !== i || !v || void 0 === v[r])
                            continue;
                        g = !0
                    }
                    d[r] = v && v[r] || S.style(e, r)
                }
            if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
                null == (l = v && v.display) && (l = Y.get(e, "display")),
                "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0),
                l = e.style.display || l,
                c = S.css(e, "display"),
                le([e]))),
                ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function() {
                    h.display = l
                }),
                null == l && (c = h.display,
                l = "none" === c ? "" : c)),
                h.display = "inline-block")),
                n.overflow && (h.overflow = "hidden",
                p.always(function() {
                    h.overflow = n.overflow[0],
                    h.overflowX = n.overflow[1],
                    h.overflowY = n.overflow[2]
                })),
                u = !1,
                d)
                    u || (v ? "hidden"in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
                        display: l
                    }),
                    o && (v.hidden = !g),
                    g && le([e], !0),
                    p.done(function() {
                        for (r in g || le([e]),
                        Y.remove(e, "fxshow"),
                        d)
                            S.style(e, r, d[r])
                    })),
                    u = ct(g ? v[r] : 0, r, p),
                    r in v || (v[r] = u.start,
                    g && (u.end = u.start,
                    u.start = 0))
        }
        ],
        prefilter: function(e, t) {
            t ? ft.prefilters.unshift(e) : ft.prefilters.push(e)
        }
    }),
    S.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? S.extend({}, e) : {
            complete: n || !n && t || m(e) && e,
            duration: e,
            easing: n && t || t && !m(t) && t
        };
        return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default),
        null != r.queue && !0 !== r.queue || (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            m(r.old) && r.old.call(this),
            r.queue && S.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    S.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ae).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(t, e, n, r) {
            var i = S.isEmptyObject(t)
              , o = S.speed(e, n, r)
              , a = function() {
                var e = ft(this, S.extend({}, t), o);
                (i || Y.get(this, "finish")) && e.stop(!0)
            };
            return a.finish = a,
            i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(i, e, o) {
            var a = function(e) {
                var t = e.stop;
                delete e.stop,
                t(o)
            };
            return "string" != typeof i && (o = e,
            e = i,
            i = void 0),
            e && this.queue(i || "fx", []),
            this.each(function() {
                var e = !0
                  , t = null != i && i + "queueHooks"
                  , n = S.timers
                  , r = Y.get(this);
                if (t)
                    r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r)
                        r[t] && r[t].stop && at.test(t) && a(r[t]);
                for (t = n.length; t--; )
                    n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o),
                    e = !1,
                    n.splice(t, 1));
                !e && o || S.dequeue(this, i)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"),
            this.each(function() {
                var e, t = Y.get(this), n = t[a + "queue"], r = t[a + "queueHooks"], i = S.timers, o = n ? n.length : 0;
                for (t.finish = !0,
                S.queue(this, a, []),
                r && r.stop && r.stop.call(this, !0),
                e = i.length; e--; )
                    i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0),
                    i.splice(e, 1));
                for (e = 0; e < o; e++)
                    n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }),
    S.each(["toggle", "show", "hide"], function(e, r) {
        var i = S.fn[r];
        S.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(lt(r, !0), e, t, n)
        }
    }),
    S.each({
        slideDown: lt("show"),
        slideUp: lt("hide"),
        slideToggle: lt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        S.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n)
        }
    }),
    S.timers = [],
    S.fx.tick = function() {
        var e, t = 0, n = S.timers;
        for (tt = Date.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || S.fx.stop(),
        tt = void 0
    }
    ,
    S.fx.timer = function(e) {
        S.timers.push(e),
        S.fx.start()
    }
    ,
    S.fx.interval = 13,
    S.fx.start = function() {
        nt || (nt = !0,
        st())
    }
    ,
    S.fx.stop = function() {
        nt = null
    }
    ,
    S.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    S.fn.delay = function(r, e) {
        return r = S.fx && S.fx.speeds[r] || r,
        e = e || "fx",
        this.queue(e, function(e, t) {
            var n = C.setTimeout(e, r);
            t.stop = function() {
                C.clearTimeout(n)
            }
        })
    }
    ,
    rt = E.createElement("input"),
    it = E.createElement("select").appendChild(E.createElement("option")),
    rt.type = "checkbox",
    y.checkOn = "" !== rt.value,
    y.optSelected = it.selected,
    (rt = E.createElement("input")).value = "t",
    rt.type = "radio",
    y.radioValue = "t" === rt.value;
    var pt, dt = S.expr.attrHandle;
    S.fn.extend({
        attr: function(e, t) {
            return $(this, S.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                S.removeAttr(this, e)
            })
        }
    }),
    S.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? pt : void 0)),
                void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!y.radioValue && "radio" === t && A(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0, i = t && t.match(P);
            if (i && 1 === e.nodeType)
                while (n = i[r++])
                    e.removeAttribute(n)
        }
    }),
    pt = {
        set: function(e, t, n) {
            return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    S.each(S.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var a = dt[t] || S.find.attr;
        dt[t] = function(e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = dt[o],
            dt[o] = r,
            r = null != a(e, t, n) ? o : null,
            dt[o] = i),
            r
        }
    });
    var ht = /^(?:input|select|textarea|button)$/i
      , gt = /^(?:a|area)$/i;
    function vt(e) {
        return (e.match(P) || []).join(" ")
    }
    function yt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function mt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || []
    }
    S.fn.extend({
        prop: function(e, t) {
            return $(this, S.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[S.propFix[e] || e]
            })
        }
    }),
    S.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t,
                i = S.propHooks[t]),
                void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = S.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ht.test(e.nodeName) || gt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }),
    y.optSelected || (S.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        S.propFix[this.toLowerCase()] = this
    }),
    S.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a, s, u = 0;
            if (m(t))
                return this.each(function(e) {
                    S(this).addClass(t.call(this, e, yt(this)))
                });
            if ((e = mt(t)).length)
                while (n = this[u++])
                    if (i = yt(n),
                    r = 1 === n.nodeType && " " + vt(i) + " ") {
                        a = 0;
                        while (o = e[a++])
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = vt(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(t) {
            var e, n, r, i, o, a, s, u = 0;
            if (m(t))
                return this.each(function(e) {
                    S(this).removeClass(t.call(this, e, yt(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ((e = mt(t)).length)
                while (n = this[u++])
                    if (i = yt(n),
                    r = 1 === n.nodeType && " " + vt(i) + " ") {
                        a = 0;
                        while (o = e[a++])
                            while (-1 < r.indexOf(" " + o + " "))
                                r = r.replace(" " + o + " ", " ");
                        i !== (s = vt(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(i, t) {
            var o = typeof i
              , a = "string" === o || Array.isArray(i);
            return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function(e) {
                S(this).toggleClass(i.call(this, e, yt(this), t), t)
            }) : this.each(function() {
                var e, t, n, r;
                if (a) {
                    t = 0,
                    n = S(this),
                    r = mt(i);
                    while (e = r[t++])
                        n.hasClass(e) ? n.removeClass(e) : n.addClass(e)
                } else
                    void 0 !== i && "boolean" !== o || ((e = yt(this)) && Y.set(this, "__className__", e),
                    this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            t = " " + e + " ";
            while (n = this[r++])
                if (1 === n.nodeType && -1 < (" " + vt(yt(n)) + " ").indexOf(t))
                    return !0;
            return !1
        }
    });
    var xt = /\r/g;
    S.fn.extend({
        val: function(n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = m(n),
            this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function(e) {
                    return null == e ? "" : e + ""
                })),
                (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set"in r && void 0 !== r.set(this, t, "value") || (this.value = t))
            })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get"in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(xt, "") : null == e ? "" : e : void 0
        }
    }),
    S.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = S.find.attr(e, "value");
                    return null != t ? t : vt(S.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                            if (t = S(n).val(),
                            a)
                                return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    var n, r, i = e.options, o = S.makeArray(t), a = i.length;
                    while (a--)
                        ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    S.each(["radio", "checkbox"], function() {
        S.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = -1 < S.inArray(S(e).val(), t)
            }
        },
        y.checkOn || (S.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    }),
    y.focusin = "onfocusin"in C;
    var bt = /^(?:focusinfocus|focusoutblur)$/
      , wt = function(e) {
        e.stopPropagation()
    };
    S.extend(S.event, {
        trigger: function(e, t, n, r) {
            var i, o, a, s, u, l, c, f, p = [n || E], d = v.call(e, "type") ? e.type : e, h = v.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = f = a = n = n || E,
            3 !== n.nodeType && 8 !== n.nodeType && !bt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(),
            h.sort()),
            u = d.indexOf(":") < 0 && "on" + d,
            (e = e[S.expando] ? e : new S.Event(d,"object" == typeof e && e)).isTrigger = r ? 2 : 3,
            e.namespace = h.join("."),
            e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            e.result = void 0,
            e.target || (e.target = n),
            t = null == t ? [e] : S.makeArray(t, [e]),
            c = S.event.special[d] || {},
            r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !x(n)) {
                    for (s = c.delegateType || d,
                    bt.test(s + d) || (o = o.parentNode); o; o = o.parentNode)
                        p.push(o),
                        a = o;
                    a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C)
                }
                i = 0;
                while ((o = p[i++]) && !e.isPropagationStopped())
                    f = o,
                    e.type = 1 < i ? s : c.bindType || d,
                    (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t),
                    (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t),
                    !1 === e.result && e.preventDefault());
                return e.type = d,
                r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null),
                S.event.triggered = d,
                e.isPropagationStopped() && f.addEventListener(d, wt),
                n[d](),
                e.isPropagationStopped() && f.removeEventListener(d, wt),
                S.event.triggered = void 0,
                a && (n[u] = a)),
                e.result
            }
        },
        simulate: function(e, t, n) {
            var r = S.extend(new S.Event, n, {
                type: e,
                isSimulated: !0
            });
            S.event.trigger(r, null, t)
        }
    }),
    S.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                S.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return S.event.trigger(e, t, n, !0)
        }
    }),
    y.focusin || S.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, r) {
        var i = function(e) {
            S.event.simulate(r, e.target, S.event.fix(e))
        };
        S.event.special[r] = {
            setup: function() {
                var e = this.ownerDocument || this.document || this
                  , t = Y.access(e, r);
                t || e.addEventListener(n, i, !0),
                Y.access(e, r, (t || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this.document || this
                  , t = Y.access(e, r) - 1;
                t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0),
                Y.remove(e, r))
            }
        }
    });
    var Tt = C.location
      , Ct = {
        guid: Date.now()
    }
      , Et = /\?/;
    S.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e)
            return null;
        try {
            t = (new C.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || S.error("Invalid XML: " + e),
        t
    }
    ;
    var St = /\[\]$/
      , kt = /\r?\n/g
      , At = /^(?:submit|button|image|reset|file)$/i
      , Nt = /^(?:input|select|textarea|keygen)/i;
    function Dt(n, e, r, i) {
        var t;
        if (Array.isArray(e))
            S.each(e, function(e, t) {
                r || St.test(n) ? i(n, t) : Dt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
            });
        else if (r || "object" !== w(e))
            i(n, e);
        else
            for (t in e)
                Dt(n + "[" + t + "]", e[t], r, i)
    }
    S.param = function(e, t) {
        var n, r = [], i = function(e, t) {
            var n = m(t) ? t() : t;
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        };
        if (null == e)
            return "";
        if (Array.isArray(e) || e.jquery && !S.isPlainObject(e))
            S.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                Dt(n, e[n], t, i);
        return r.join("&")
    }
    ,
    S.fn.extend({
        serialize: function() {
            return S.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = S.prop(this, "elements");
                return e ? S.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !S(this).is(":disabled") && Nt.test(this.nodeName) && !At.test(e) && (this.checked || !pe.test(e))
            }).map(function(e, t) {
                var n = S(this).val();
                return null == n ? null : Array.isArray(n) ? S.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(kt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(kt, "\r\n")
                }
            }).get()
        }
    });
    var jt = /%20/g
      , qt = /#.*$/
      , Lt = /([?&])_=[^&]*/
      , Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , Ot = /^(?:GET|HEAD)$/
      , Pt = /^\/\//
      , Rt = {}
      , Mt = {}
      , It = "*/".concat("*")
      , Wt = E.createElement("a");
    function Ft(o) {
        return function(e, t) {
            "string" != typeof e && (t = e,
            e = "*");
            var n, r = 0, i = e.toLowerCase().match(P) || [];
            if (m(t))
                while (n = i[r++])
                    "+" === n[0] ? (n = n.slice(1) || "*",
                    (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }
    function Bt(t, i, o, a) {
        var s = {}
          , u = t === Mt;
        function l(e) {
            var r;
            return s[e] = !0,
            S.each(t[e] || [], function(e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n),
                l(n),
                !1)
            }),
            r
        }
        return l(i.dataTypes[0]) || !s["*"] && l("*")
    }
    function $t(e, t) {
        var n, r, i = S.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && S.extend(!0, e, r),
        e
    }
    Wt.href = Tt.href,
    S.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Tt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": It,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": S.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? $t($t(e, S.ajaxSettings), t) : $t(S.ajaxSettings, e)
        },
        ajaxPrefilter: Ft(Rt),
        ajaxTransport: Ft(Mt),
        ajax: function(e, t) {
            "object" == typeof e && (t = e,
            e = void 0),
            t = t || {};
            var c, f, p, n, d, r, h, g, i, o, v = S.ajaxSetup({}, t), y = v.context || v, m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event, x = S.Deferred(), b = S.Callbacks("once memory"), w = v.statusCode || {}, a = {}, s = {}, u = "canceled", T = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (h) {
                        if (!n) {
                            n = {};
                            while (t = Ht.exec(p))
                                n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2])
                        }
                        t = n[e.toLowerCase() + " "]
                    }
                    return null == t ? null : t.join(", ")
                },
                getAllResponseHeaders: function() {
                    return h ? p : null
                },
                setRequestHeader: function(e, t) {
                    return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e,
                    a[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return null == h && (v.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (h)
                            T.always(e[T.status]);
                        else
                            for (t in e)
                                w[t] = [w[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || u;
                    return c && c.abort(t),
                    l(0, t),
                    this
                }
            };
            if (x.promise(T),
            v.url = ((e || v.url || Tt.href) + "").replace(Pt, Tt.protocol + "//"),
            v.type = t.method || t.type || v.method || v.type,
            v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""],
            null == v.crossDomain) {
                r = E.createElement("a");
                try {
                    r.href = v.url,
                    r.href = r.href,
                    v.crossDomain = Wt.protocol + "//" + Wt.host != r.protocol + "//" + r.host
                } catch (e) {
                    v.crossDomain = !0
                }
            }
            if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)),
            Bt(Rt, v, t, T),
            h)
                return T;
            for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"),
            v.type = v.type.toUpperCase(),
            v.hasContent = !Ot.test(v.type),
            f = v.url.replace(qt, ""),
            v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(jt, "+")) : (o = v.url.slice(f.length),
            v.data && (v.processData || "string" == typeof v.data) && (f += (Et.test(f) ? "&" : "?") + v.data,
            delete v.data),
            !1 === v.cache && (f = f.replace(Lt, "$1"),
            o = (Et.test(f) ? "&" : "?") + "_=" + Ct.guid++ + o),
            v.url = f + o),
            v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]),
            S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])),
            (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType),
            T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + It + "; q=0.01" : "") : v.accepts["*"]),
            v.headers)
                T.setRequestHeader(i, v.headers[i]);
            if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h))
                return T.abort();
            if (u = "abort",
            b.add(v.complete),
            T.done(v.success),
            T.fail(v.error),
            c = Bt(Mt, v, t, T)) {
                if (T.readyState = 1,
                g && m.trigger("ajaxSend", [T, v]),
                h)
                    return T;
                v.async && 0 < v.timeout && (d = C.setTimeout(function() {
                    T.abort("timeout")
                }, v.timeout));
                try {
                    h = !1,
                    c.send(a, l)
                } catch (e) {
                    if (h)
                        throw e;
                    l(-1, e)
                }
            } else
                l(-1, "No Transport");
            function l(e, t, n, r) {
                var i, o, a, s, u, l = t;
                h || (h = !0,
                d && C.clearTimeout(d),
                c = void 0,
                p = r || "",
                T.readyState = 0 < e ? 4 : 0,
                i = 200 <= e && e < 300 || 304 === e,
                n && (s = function(e, t, n) {
                    var r, i, o, a, s = e.contents, u = e.dataTypes;
                    while ("*" === u[0])
                        u.shift(),
                        void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            }
                    if (u[0]in n)
                        o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o)
                        return o !== u[0] && u.unshift(o),
                        n[o]
                }(v, T, n)),
                !i && -1 < S.inArray("script", v.dataTypes) && (v.converters["text script"] = function() {}
                ),
                s = function(e, t, n, r) {
                    var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters)
                            l[a.toLowerCase()] = e.converters[a];
                    o = c.shift();
                    while (o)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                        !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                        u = o,
                        o = c.shift())
                            if ("*" === o)
                                o = u;
                            else if ("*" !== u && u !== o) {
                                if (!(a = l[u + " " + o] || l["* " + o]))
                                    for (i in l)
                                        if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                            !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0],
                                            c.unshift(s[1]));
                                            break
                                        }
                                if (!0 !== a)
                                    if (a && e["throws"])
                                        t = a(t);
                                    else
                                        try {
                                            t = a(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: a ? e : "No conversion from " + u + " to " + o
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(v, s, T, i),
                i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u),
                (u = T.getResponseHeader("etag")) && (S.etag[f] = u)),
                204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state,
                o = s.data,
                i = !(a = s.error))) : (a = l,
                !e && l || (l = "error",
                e < 0 && (e = 0))),
                T.status = e,
                T.statusText = (t || l) + "",
                i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]),
                T.statusCode(w),
                w = void 0,
                g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]),
                b.fireWith(y, [T, l]),
                g && (m.trigger("ajaxComplete", [T, v]),
                --S.active || S.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(e, t, n) {
            return S.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return S.get(e, void 0, t, "script")
        }
    }),
    S.each(["get", "post"], function(e, i) {
        S[i] = function(e, t, n, r) {
            return m(t) && (r = r || n,
            n = t,
            t = void 0),
            S.ajax(S.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, S.isPlainObject(e) && e))
        }
    }),
    S.ajaxPrefilter(function(e) {
        var t;
        for (t in e.headers)
            "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
    }),
    S._evalUrl = function(e, t, n) {
        return S.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                S.globalEval(e, t, n)
            }
        })
    }
    ,
    S.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (m(e) && (e = e.call(this[0])),
            t = S(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
                var e = this;
                while (e.firstElementChild)
                    e = e.firstElementChild;
                return e
            }).append(this)),
            this
        },
        wrapInner: function(n) {
            return m(n) ? this.each(function(e) {
                S(this).wrapInner(n.call(this, e))
            }) : this.each(function() {
                var e = S(this)
                  , t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function(t) {
            var n = m(t);
            return this.each(function(e) {
                S(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                S(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    S.expr.pseudos.hidden = function(e) {
        return !S.expr.pseudos.visible(e)
    }
    ,
    S.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    S.ajaxSettings.xhr = function() {
        try {
            return new C.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var _t = {
        0: 200,
        1223: 204
    }
      , zt = S.ajaxSettings.xhr();
    y.cors = !!zt && "withCredentials"in zt,
    y.ajax = zt = !!zt,
    S.ajaxTransport(function(i) {
        var o, a;
        if (y.cors || zt && !i.crossDomain)
            return {
                send: function(e, t) {
                    var n, r = i.xhr();
                    if (r.open(i.type, i.url, i.async, i.username, i.password),
                    i.xhrFields)
                        for (n in i.xhrFields)
                            r[n] = i.xhrFields[n];
                    for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType),
                    i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"),
                    e)
                        r.setRequestHeader(n, e[n]);
                    o = function(e) {
                        return function() {
                            o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null,
                            "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(_t[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                binary: r.response
                            } : {
                                text: r.responseText
                            }, r.getAllResponseHeaders()))
                        }
                    }
                    ,
                    r.onload = o(),
                    a = r.onerror = r.ontimeout = o("error"),
                    void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                        4 === r.readyState && C.setTimeout(function() {
                            o && a()
                        })
                    }
                    ,
                    o = o("abort");
                    try {
                        r.send(i.hasContent && i.data || null)
                    } catch (e) {
                        if (o)
                            throw e
                    }
                },
                abort: function() {
                    o && o()
                }
            }
    }),
    S.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }),
    S.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return S.globalEval(e),
                e
            }
        }
    }),
    S.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }),
    S.ajaxTransport("script", function(n) {
        var r, i;
        if (n.crossDomain || n.scriptAttrs)
            return {
                send: function(e, t) {
                    r = S("<script>").attr(n.scriptAttrs || {}).prop({
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", i = function(e) {
                        r.remove(),
                        i = null,
                        e && t("error" === e.type ? 404 : 200, e.type)
                    }
                    ),
                    E.head.appendChild(r[0])
                },
                abort: function() {
                    i && i()
                }
            }
    });
    var Ut, Xt = [], Vt = /(=)\?(?=&|$)|\?\?/;
    S.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Xt.pop() || S.expando + "_" + Ct.guid++;
            return this[e] = !0,
            e
        }
    }),
    S.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Vt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0])
            return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
            a ? e[a] = e[a].replace(Vt, "$1" + r) : !1 !== e.jsonp && (e.url += (Et.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
            e.converters["script json"] = function() {
                return o || S.error(r + " was not called"),
                o[0]
            }
            ,
            e.dataTypes[0] = "json",
            i = C[r],
            C[r] = function() {
                o = arguments
            }
            ,
            n.always(function() {
                void 0 === i ? S(C).removeProp(r) : C[r] = i,
                e[r] && (e.jsonpCallback = t.jsonpCallback,
                Xt.push(r)),
                o && m(i) && i(o[0]),
                o = i = void 0
            }),
            "script"
    }),
    y.createHTMLDocument = ((Ut = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
    2 === Ut.childNodes.length),
    S.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t,
        t = !1),
        t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href,
        t.head.appendChild(r)) : t = E),
        o = !n && [],
        (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o),
        o && o.length && S(o).remove(),
        S.merge([], i.childNodes)));
        var r, i, o
    }
    ,
    S.fn.load = function(e, t, n) {
        var r, i, o, a = this, s = e.indexOf(" ");
        return -1 < s && (r = vt(e.slice(s)),
        e = e.slice(0, s)),
        m(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (i = "POST"),
        0 < a.length && S.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    S.expr.pseudos.animated = function(t) {
        return S.grep(S.timers, function(e) {
            return t === e.elem
        }).length
    }
    ,
    S.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l = S.css(e, "position"), c = S(e), f = {};
            "static" === l && (e.style.position = "relative"),
            s = c.offset(),
            o = S.css(e, "top"),
            u = S.css(e, "left"),
            ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top,
            i = r.left) : (a = parseFloat(o) || 0,
            i = parseFloat(u) || 0),
            m(t) && (t = t.call(e, n, S.extend({}, s))),
            null != t.top && (f.top = t.top - s.top + a),
            null != t.left && (f.left = t.left - s.left + i),
            "using"in t ? t.using.call(e, f) : ("number" == typeof f.top && (f.top += "px"),
            "number" == typeof f.left && (f.left += "px"),
            c.css(f))
        }
    },
    S.fn.extend({
        offset: function(t) {
            if (arguments.length)
                return void 0 === t ? this : this.each(function(e) {
                    S.offset.setOffset(this, t, e)
                });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(),
            n = r.ownerDocument.defaultView,
            {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0], i = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === S.css(r, "position"))
                    t = r.getBoundingClientRect();
                else {
                    t = this.offset(),
                    n = r.ownerDocument,
                    e = r.offsetParent || n.documentElement;
                    while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position"))
                        e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0),
                    i.left += S.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - S.css(r, "marginTop", !0),
                    left: t.left - i.left - S.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent;
                while (e && "static" === S.css(e, "position"))
                    e = e.offsetParent;
                return e || re
            })
        }
    }),
    S.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        S.fn[t] = function(e) {
            return $(this, function(e, t, n) {
                var r;
                if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView),
                void 0 === n)
                    return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }),
    S.each(["top", "left"], function(e, n) {
        S.cssHooks[n] = $e(y.pixelPosition, function(e, t) {
            if (t)
                return t = Be(e, n),
                Me.test(t) ? S(e).position()[n] + "px" : t
        })
    }),
    S.each({
        Height: "height",
        Width: "width"
    }, function(a, s) {
        S.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function(r, o) {
            S.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e)
                  , i = r || (!0 === e || !0 === t ? "margin" : "border");
                return $(this, function(e, t, n) {
                    var r;
                    return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement,
                    Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i)
                }, s, n ? e : void 0, n)
            }
        })
    }),
    S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        S.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    S.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        S.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    });
    var Gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    S.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t],
        t = e,
        e = n),
        m(e))
            return r = s.call(arguments, 2),
            (i = function() {
                return e.apply(t || this, r.concat(s.call(arguments)))
            }
            ).guid = e.guid = e.guid || S.guid++,
            i
    }
    ,
    S.holdReady = function(e) {
        e ? S.readyWait++ : S.ready(!0)
    }
    ,
    S.isArray = Array.isArray,
    S.parseJSON = JSON.parse,
    S.nodeName = A,
    S.isFunction = m,
    S.isWindow = x,
    S.camelCase = X,
    S.type = w,
    S.now = Date.now,
    S.isNumeric = function(e) {
        var t = S.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }
    ,
    S.trim = function(e) {
        return null == e ? "" : (e + "").replace(Gt, "")
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return S
    });
    var Yt = C.jQuery
      , Qt = C.$;
    return S.noConflict = function(e) {
        return C.$ === S && (C.$ = Qt),
        e && C.jQuery === S && (C.jQuery = Yt),
        S
    }
    ,
    "undefined" == typeof e && (C.jQuery = C.$ = S),
    S
});
;IE.fModule({
    f: function(exports, require, module, global) {
        require('jquery.js');
        require('jquery.min.js');
        (function($) {
            $.event.special.destroyed = {
                remove: function(event) {
                    if (event.handler) {
                        event.handler.apply(this, arguments);
                    }
                }
            };
        }
        )(jQuery);
    },
    fn: 'declarationjquery.js'
});
;/*! jQuery UI - v1.12.1 - 2019-12-13
* http://jqueryui.com
* Includes: widget.js, data.js, disable-selection.js, scroll-parent.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/sortable.js, widgets/mouse.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}
)(function(t) {
    t.ui = t.ui || {},
    t.ui.version = "1.12.1";
    var e = 0
      , i = Array.prototype.slice;
    t.cleanData = function(e) {
        return function(i) {
            var s, n, o;
            for (o = 0; null != (n = i[o]); o++)
                try {
                    s = t._data(n, "events"),
                    s && s.remove && t(n).triggerHandler("remove")
                } catch (a) {}
            e(i)
        }
    }(t.cleanData),
    t.widget = function(e, i, s) {
        var n, o, a, r = {}, h = e.split(".")[0];
        e = e.split(".")[1];
        var l = h + "-" + e;
        return s || (s = i,
        i = t.Widget),
        t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))),
        t.expr[":"][l.toLowerCase()] = function(e) {
            return !!t.data(e, l)
        }
        ,
        t[h] = t[h] || {},
        n = t[h][e],
        o = t[h][e] = function(t, e) {
            return this._createWidget ? (arguments.length && this._createWidget(t, e),
            void 0) : new o(t,e)
        }
        ,
        t.extend(o, n, {
            version: s.version,
            _proto: t.extend({}, s),
            _childConstructors: []
        }),
        a = new i,
        a.options = t.widget.extend({}, a.options),
        t.each(s, function(e, s) {
            return t.isFunction(s) ? (r[e] = function() {
                function t() {
                    return i.prototype[e].apply(this, arguments)
                }
                function n(t) {
                    return i.prototype[e].apply(this, t)
                }
                return function() {
                    var e, i = this._super, o = this._superApply;
                    return this._super = t,
                    this._superApply = n,
                    e = s.apply(this, arguments),
                    this._super = i,
                    this._superApply = o,
                    e
                }
            }(),
            void 0) : (r[e] = s,
            void 0)
        }),
        o.prototype = t.widget.extend(a, {
            widgetEventPrefix: n ? a.widgetEventPrefix || e : e
        }, r, {
            constructor: o,
            namespace: h,
            widgetName: e,
            widgetFullName: l
        }),
        n ? (t.each(n._childConstructors, function(e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }),
        delete n._childConstructors) : i._childConstructors.push(o),
        t.widget.bridge(e, o),
        o
    }
    ,
    t.widget.extend = function(e) {
        for (var s, n, o = i.call(arguments, 1), a = 0, r = o.length; r > a; a++)
            for (s in o[a])
                n = o[a][s],
                o[a].hasOwnProperty(s) && void 0 !== n && (e[s] = t.isPlainObject(n) ? t.isPlainObject(e[s]) ? t.widget.extend({}, e[s], n) : t.widget.extend({}, n) : n);
        return e
    }
    ,
    t.widget.bridge = function(e, s) {
        var n = s.prototype.widgetFullName || e;
        t.fn[e] = function(o) {
            var a = "string" == typeof o
              , r = i.call(arguments, 1)
              , h = this;
            return a ? this.length || "instance" !== o ? this.each(function() {
                var i, s = t.data(this, n);
                return "instance" === o ? (h = s,
                !1) : s ? t.isFunction(s[o]) && "_" !== o.charAt(0) ? (i = s[o].apply(s, r),
                i !== s && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i,
                !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + o + "'")
            }) : h = void 0 : (r.length && (o = t.widget.extend.apply(null, [o].concat(r))),
            this.each(function() {
                var e = t.data(this, n);
                e ? (e.option(o || {}),
                e._init && e._init()) : t.data(this, n, new s(o,this))
            })),
            h
        }
    }
    ,
    t.Widget = function() {}
    ,
    t.Widget._childConstructors = [],
    t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(i, s) {
            s = t(s || this.defaultElement || this)[0],
            this.element = t(s),
            this.uuid = e++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.bindings = t(),
            this.hoverable = t(),
            this.focusable = t(),
            this.classesElementLookup = {},
            s !== this && (t.data(s, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(t) {
                    t.target === s && this.destroy()
                }
            }),
            this.document = t(s.style ? s.ownerDocument : s.document || s),
            this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
            this.options = t.widget.extend({}, this.options, this._getCreateOptions(), i),
            this._create(),
            this.options.disabled && this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: function() {
            return {}
        },
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            var e = this;
            this._destroy(),
            t.each(this.classesElementLookup, function(t, i) {
                e._removeClass(i, t)
            }),
            this.element.off(this.eventNamespace).removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace)
        },
        _destroy: t.noop,
        widget: function() {
            return this.element
        },
        option: function(e, i) {
            var s, n, o, a = e;
            if (0 === arguments.length)
                return t.widget.extend({}, this.options);
            if ("string" == typeof e)
                if (a = {},
                s = e.split("."),
                e = s.shift(),
                s.length) {
                    for (n = a[e] = t.widget.extend({}, this.options[e]),
                    o = 0; s.length - 1 > o; o++)
                        n[s[o]] = n[s[o]] || {},
                        n = n[s[o]];
                    if (e = s.pop(),
                    1 === arguments.length)
                        return void 0 === n[e] ? null : n[e];
                    n[e] = i
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[e] ? null : this.options[e];
                    a[e] = i
                }
            return this._setOptions(a),
            this
        },
        _setOptions: function(t) {
            var e;
            for (e in t)
                this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return "classes" === t && this._setOptionClasses(e),
            this.options[t] = e,
            "disabled" === t && this._setOptionDisabled(e),
            this
        },
        _setOptionClasses: function(e) {
            var i, s, n;
            for (i in e)
                n = this.classesElementLookup[i],
                e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()),
                this._removeClass(n, i),
                s.addClass(this._classes({
                    element: s,
                    keys: i,
                    classes: e,
                    add: !0
                })))
        },
        _setOptionDisabled: function(t) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t),
            t && (this._removeClass(this.hoverable, null, "ui-state-hover"),
            this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _classes: function(e) {
            function i(i, o) {
                var a, r;
                for (r = 0; i.length > r; r++)
                    a = n.classesElementLookup[i[r]] || t(),
                    a = e.add ? t(t.unique(a.get().concat(e.element.get()))) : t(a.not(e.element).get()),
                    n.classesElementLookup[i[r]] = a,
                    s.push(i[r]),
                    o && e.classes[i[r]] && s.push(e.classes[i[r]])
            }
            var s = []
              , n = this;
            return e = t.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, e),
            this._on(e.element, {
                remove: "_untrackClassesElement"
            }),
            e.keys && i(e.keys.match(/\S+/g) || [], !0),
            e.extra && i(e.extra.match(/\S+/g) || []),
            s.join(" ")
        },
        _untrackClassesElement: function(e) {
            var i = this;
            t.each(i.classesElementLookup, function(s, n) {
                -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get()))
            })
        },
        _removeClass: function(t, e, i) {
            return this._toggleClass(t, e, i, !1)
        },
        _addClass: function(t, e, i) {
            return this._toggleClass(t, e, i, !0)
        },
        _toggleClass: function(t, e, i, s) {
            s = "boolean" == typeof s ? s : i;
            var n = "string" == typeof t || null === t
              , o = {
                extra: n ? e : i,
                keys: n ? t : e,
                element: n ? this.element : t,
                add: s
            };
            return o.element.toggleClass(this._classes(o), s),
            this
        },
        _on: function(e, i, s) {
            var n, o = this;
            "boolean" != typeof e && (s = i,
            i = e,
            e = !1),
            s ? (i = n = t(i),
            this.bindings = this.bindings.add(i)) : (s = i,
            i = this.element,
            n = this.widget()),
            t.each(s, function(s, a) {
                function r() {
                    return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
                }
                "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                var h = s.match(/^([\w:-]*)\s*(.*)$/)
                  , l = h[1] + o.eventNamespace
                  , c = h[2];
                c ? n.on(l, c, r) : i.on(l, r)
            })
        },
        _off: function(e, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.off(i).off(i),
            this.bindings = t(this.bindings.not(e).get()),
            this.focusable = t(this.focusable.not(e).get()),
            this.hoverable = t(this.hoverable.not(e).get())
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? s[t] : t).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e),
            this._on(e, {
                mouseenter: function(e) {
                    this._addClass(t(e.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function(e) {
                    this._removeClass(t(e.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e),
            this._on(e, {
                focusin: function(e) {
                    this._addClass(t(e.currentTarget), null, "ui-state-focus")
                },
                focusout: function(e) {
                    this._removeClass(t(e.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function(e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {},
            i = t.Event(i),
            i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(),
            i.target = this.element[0],
            o = i.originalEvent)
                for (n in o)
                    n in i || (i[n] = o[n]);
            return this.element.trigger(i, s),
            !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    },
    t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, i) {
        t.Widget.prototype["_" + e] = function(s, n, o) {
            "string" == typeof n && (n = {
                effect: n
            });
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {},
            "number" == typeof n && (n = {
                duration: n
            }),
            a = !t.isEmptyObject(n),
            n.complete = o,
            n.delay && s.delay(n.delay),
            a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
                t(this)[e](),
                o && o.call(s[0]),
                i()
            })
        }
    }),
    t.widget,
    t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
            return function(i) {
                return !!t.data(i, e)
            }
        }) : function(e, i, s) {
            return !!t.data(e, s[3])
        }
    }),
    t.fn.extend({
        disableSelection: function() {
            var t = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.on(t + ".ui-disableSelection", function(t) {
                    t.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.off(".ui-disableSelection")
        }
    }),
    t.fn.scrollParent = function(e) {
        var i = this.css("position")
          , s = "absolute" === i
          , n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/
          , o = this.parents().filter(function() {
            var e = t(this);
            return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
        }).eq(0);
        return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
    }
    ,
    t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var s = !1;
    t(document).on("mouseup", function() {
        s = !1
    }),
    t.widget("ui.mouse", {
        version: "1.12.1",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.on("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).on("click." + this.widgetName, function(i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1) : void 0
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName),
            this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(e) {
            if (!s) {
                this._mouseMoved = !1,
                this._mouseStarted && this._mouseUp(e),
                this._mouseDownEvent = e;
                var i = this
                  , n = 1 === e.which
                  , o = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
                return n && !o && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1,
                !this._mouseStarted) ? (e.preventDefault(),
                !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(t) {
                    return i._mouseMove(t)
                }
                ,
                this._mouseUpDelegate = function(t) {
                    return i._mouseUp(t)
                }
                ,
                this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate),
                e.preventDefault(),
                s = !0,
                !0)) : !0
            }
        },
        _mouseMove: function(e) {
            if (this._mouseMoved) {
                if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button)
                    return this._mouseUp(e);
                if (!e.which)
                    if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey)
                        this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich)
                        return this._mouseUp(e)
            }
            return (e.which || e.button) && (this._mouseMoved = !0),
            this._mouseStarted ? (this._mouseDrag(e),
            e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1,
            this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
            !this._mouseStarted)
        },
        _mouseUp: function(e) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(e)),
            this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer),
            delete this._mouseDelayTimer),
            this.ignoreMissingWhich = !1,
            s = !1,
            e.preventDefault()
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    }),
    t.ui.plugin = {
        add: function(e, i, s) {
            var n, o = t.ui[e].prototype;
            for (n in s)
                o.plugins[n] = o.plugins[n] || [],
                o.plugins[n].push([i, s[n]])
        },
        call: function(t, e, i, s) {
            var n, o = t.plugins[e];
            if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                for (n = 0; o.length > n; n++)
                    t.options[o[n][0]] && o[n][1].apply(t.element, i)
        }
    },
    t.ui.safeActiveElement = function(t) {
        var e;
        try {
            e = t.activeElement
        } catch (i) {
            e = t.body
        }
        return e || (e = t.body),
        e.nodeName || (e = t.body),
        e
    }
    ,
    t.ui.safeBlur = function(e) {
        e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur")
    }
    ,
    t.widget("ui.draggable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this._addClass("ui-draggable"),
            this._setHandleClassName(),
            this._mouseInit()
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "handle" === t && (this._removeHandleClassName(),
            this._setHandleClassName())
        },
        _destroy: function() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0,
            void 0) : (this._removeHandleClassName(),
            this._mouseDestroy(),
            void 0)
        },
        _mouseCapture: function(e) {
            var i = this.options;
            return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e),
            this.handle ? (this._blurActiveElement(e),
            this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix),
            !0) : !1)
        },
        _blockFrames: function(e) {
            this.iframeBlocks = this.document.find(e).map(function() {
                var e = t(this);
                return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _blurActiveElement: function(e) {
            var i = t.ui.safeActiveElement(this.document[0])
              , s = t(e.target);
            s.closest(i).length || t.ui.safeBlur(i)
        },
        _mouseStart: function(e) {
            var i = this.options;
            return this.helper = this._createHelper(e),
            this._addClass(this.helper, "ui-draggable-dragging"),
            this._cacheHelperProportions(),
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(!0),
            this.offsetParent = this.helper.offsetParent(),
            this.hasFixedAncestor = this.helper.parents().filter(function() {
                return "fixed" === t(this).css("position")
            }).length > 0,
            this.positionAbs = this.element.offset(),
            this._refreshOffsets(e),
            this.originalPosition = this.position = this._generatePosition(e, !1),
            this.originalPageX = e.pageX,
            this.originalPageY = e.pageY,
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            this._setContainment(),
            this._trigger("start", e) === !1 ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
            this._mouseDrag(e, !0),
            t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e),
            !0)
        },
        _refreshOffsets: function(t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            },
            this.offset.click = {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top
            }
        },
        _mouseDrag: function(e, i) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()),
            this.position = this._generatePosition(e, !0),
            this.positionAbs = this._convertPositionTo("absolute"),
            !i) {
                var s = this._uiHash();
                if (this._trigger("drag", e, s) === !1)
                    return this._mouseUp(new t.Event("mouseup",e)),
                    !1;
                this.position = s.position
            }
            return this.helper[0].style.left = this.position.left + "px",
            this.helper[0].style.top = this.position.top + "px",
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            !1
        },
        _mouseStop: function(e) {
            var i = this
              , s = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)),
            this.dropped && (s = this.dropped,
            this.dropped = !1),
            "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                i._trigger("stop", e) !== !1 && i._clear()
            }) : this._trigger("stop", e) !== !1 && this._clear(),
            !1
        },
        _mouseUp: function(e) {
            return this._unblockFrames(),
            t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
            this.handleElement.is(e.target) && this.element.trigger("focus"),
            t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup",{
                target: this.element[0]
            })) : this._clear(),
            this
        },
        _getHandle: function(e) {
            return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element,
            this._addClass(this.handleElement, "ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle")
        },
        _createHelper: function(e) {
            var i = this.options
              , s = t.isFunction(i.helper)
              , n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo),
            s && n[0] === this.element[0] && this._setPositionRelative(),
            n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"),
            n
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }),
            "left"in e && (this.offset.click.left = e.left + this.margins.left),
            "right"in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            "top"in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom"in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _isRootNode: function(t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function() {
            var e = this.offsetParent.offset()
              , i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(),
            e.top += this.scrollParent.scrollTop()),
            this._isRootNode(this.offsetParent[0]) && (e = {
                top: 0,
                left: 0
            }),
            {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var t = this.element.position()
              , e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, s, n = this.options, o = this.document[0];
            return this.relativeContainer = null,
            n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top],
            void 0) : "document" === n.containment ? (this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top],
            void 0) : n.containment.constructor === Array ? (this.containment = n.containment,
            void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode),
            i = t(n.containment),
            s = i[0],
            s && (e = /(scroll|auto)/.test(i.css("overflow")),
            this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
            this.relativeContainer = i),
            void 0) : (this.containment = null,
            void 0)
        },
        _convertPositionTo: function(t, e) {
            e || (e = this.position);
            var i = "absolute" === t ? 1 : -1
              , s = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function(t, e) {
            var i, s, n, o, a = this.options, r = this._isRootNode(this.scrollParent[0]), h = t.pageX, l = t.pageY;
            return r && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }),
            e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(),
            i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment,
            t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)),
            a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY,
            l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n,
            o = a.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX,
            h = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o),
            "y" === a.axis && (h = this.originalPageX),
            "x" === a.axis && (l = this.originalPageY)),
            {
                top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
                left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1,
            this.destroyOnClear && this.destroy()
        },
        _trigger: function(e, i, s) {
            return s = s || this._uiHash(),
            t.ui.plugin.call(this, e, [i, s, this], !0),
            /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"),
            s.offset = this.positionAbs),
            t.Widget.prototype._trigger.call(this, e, i, s)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    t.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, i, s) {
            var n = t.extend({}, i, {
                item: s.element
            });
            s.sortables = [],
            t(s.options.connectToSortable).each(function() {
                var i = t(this).sortable("instance");
                i && !i.options.disabled && (s.sortables.push(i),
                i.refreshPositions(),
                i._trigger("activate", e, n))
            })
        },
        stop: function(e, i, s) {
            var n = t.extend({}, i, {
                item: s.element
            });
            s.cancelHelperRemoval = !1,
            t.each(s.sortables, function() {
                var t = this;
                t.isOver ? (t.isOver = 0,
                s.cancelHelperRemoval = !0,
                t.cancelHelperRemoval = !1,
                t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                },
                t._mouseStop(e),
                t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0,
                t._trigger("deactivate", e, n))
            })
        },
        drag: function(e, i, s) {
            t.each(s.sortables, function() {
                var n = !1
                  , o = this;
                o.positionAbs = s.positionAbs,
                o.helperProportions = s.helperProportions,
                o.offset.click = s.offset.click,
                o._intersectsWith(o.containerCache) && (n = !0,
                t.each(s.sortables, function() {
                    return this.positionAbs = s.positionAbs,
                    this.helperProportions = s.helperProportions,
                    this.offset.click = s.offset.click,
                    this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1),
                    n
                })),
                n ? (o.isOver || (o.isOver = 1,
                s._parent = i.helper.parent(),
                o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0),
                o.options._helper = o.options.helper,
                o.options.helper = function() {
                    return i.helper[0]
                }
                ,
                e.target = o.currentItem[0],
                o._mouseCapture(e, !0),
                o._mouseStart(e, !0, !0),
                o.offset.click.top = s.offset.click.top,
                o.offset.click.left = s.offset.click.left,
                o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left,
                o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top,
                s._trigger("toSortable", e),
                s.dropped = o.element,
                t.each(s.sortables, function() {
                    this.refreshPositions()
                }),
                s.currentItem = s.element,
                o.fromOutside = s),
                o.currentItem && (o._mouseDrag(e),
                i.position = o.position)) : o.isOver && (o.isOver = 0,
                o.cancelHelperRemoval = !0,
                o.options._revert = o.options.revert,
                o.options.revert = !1,
                o._trigger("out", e, o._uiHash(o)),
                o._mouseStop(e, !0),
                o.options.revert = o.options._revert,
                o.options.helper = o.options._helper,
                o.placeholder && o.placeholder.remove(),
                i.helper.appendTo(s._parent),
                s._refreshOffsets(e),
                i.position = s._generatePosition(e, !0),
                s._trigger("fromSortable", e),
                s.dropped = !1,
                t.each(s.sortables, function() {
                    this.refreshPositions()
                }))
            })
        }
    }),
    t.ui.plugin.add("draggable", "cursor", {
        start: function(e, i, s) {
            var n = t("body")
              , o = s.options;
            n.css("cursor") && (o._cursor = n.css("cursor")),
            n.css("cursor", o.cursor)
        },
        stop: function(e, i, s) {
            var n = s.options;
            n._cursor && t("body").css("cursor", n._cursor)
        }
    }),
    t.ui.plugin.add("draggable", "opacity", {
        start: function(e, i, s) {
            var n = t(i.helper)
              , o = s.options;
            n.css("opacity") && (o._opacity = n.css("opacity")),
            n.css("opacity", o.opacity)
        },
        stop: function(e, i, s) {
            var n = s.options;
            n._opacity && t(i.helper).css("opacity", n._opacity)
        }
    }),
    t.ui.plugin.add("draggable", "scroll", {
        start: function(t, e, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
            i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        },
        drag: function(e, i, s) {
            var n = s.options
              , o = !1
              , a = s.scrollParentNotHidden[0]
              , r = s.document[0];
            a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)),
            n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))),
            n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))),
            o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
        }
    }),
    t.ui.plugin.add("draggable", "snap", {
        start: function(e, i, s) {
            var n = s.options;
            s.snapElements = [],
            t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
                var e = t(this)
                  , i = e.offset();
                this !== s.element[0] && s.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function(e, i, s) {
            var n, o, a, r, h, l, c, u, d, p, f = s.options, g = f.snapTolerance, m = i.offset.left, _ = m + s.helperProportions.width, v = i.offset.top, b = v + s.helperProportions.height;
            for (d = s.snapElements.length - 1; d >= 0; d--)
                h = s.snapElements[d].left - s.margins.left,
                l = h + s.snapElements[d].width,
                c = s.snapElements[d].top - s.margins.top,
                u = c + s.snapElements[d].height,
                h - g > _ || m > l + g || c - g > b || v > u + g || !t.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {
                    snapItem: s.snapElements[d].item
                })),
                s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = g >= Math.abs(c - b),
                o = g >= Math.abs(u - v),
                a = g >= Math.abs(h - _),
                r = g >= Math.abs(l - m),
                n && (i.position.top = s._convertPositionTo("relative", {
                    top: c - s.helperProportions.height,
                    left: 0
                }).top),
                o && (i.position.top = s._convertPositionTo("relative", {
                    top: u,
                    left: 0
                }).top),
                a && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: h - s.helperProportions.width
                }).left),
                r && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left)),
                p = n || o || a || r,
                "outer" !== f.snapMode && (n = g >= Math.abs(c - v),
                o = g >= Math.abs(u - b),
                a = g >= Math.abs(h - m),
                r = g >= Math.abs(l - _),
                n && (i.position.top = s._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top),
                o && (i.position.top = s._convertPositionTo("relative", {
                    top: u - s.helperProportions.height,
                    left: 0
                }).top),
                a && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: h
                }).left),
                r && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: l - s.helperProportions.width
                }).left)),
                !s.snapElements[d].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {
                    snapItem: s.snapElements[d].item
                })),
                s.snapElements[d].snapping = n || o || a || r || p)
        }
    }),
    t.ui.plugin.add("draggable", "stack", {
        start: function(e, i, s) {
            var n, o = s.options, a = t.makeArray(t(o.stack)).sort(function(e, i) {
                return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
            });
            a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0,
            t(a).each(function(e) {
                t(this).css("zIndex", n + e)
            }),
            this.css("zIndex", n + a.length))
        }
    }),
    t.ui.plugin.add("draggable", "zIndex", {
        start: function(e, i, s) {
            var n = t(i.helper)
              , o = s.options;
            n.css("zIndex") && (o._zIndex = n.css("zIndex")),
            n.css("zIndex", o.zIndex)
        },
        stop: function(e, i, s) {
            var n = s.options;
            n._zIndex && t(i.helper).css("zIndex", n._zIndex)
        }
    }),
    t.ui.draggable,
    t.widget("ui.droppable", {
        version: "1.12.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var e, i = this.options, s = i.accept;
            this.isover = !1,
            this.isout = !0,
            this.accept = t.isFunction(s) ? s : function(t) {
                return t.is(s)
            }
            ,
            this.proportions = function() {
                return arguments.length ? (e = arguments[0],
                void 0) : e ? e : e = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }
            }
            ,
            this._addToManager(i.scope),
            i.addClasses && this._addClass("ui-droppable")
        },
        _addToManager: function(e) {
            t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [],
            t.ui.ddmanager.droppables[e].push(this)
        },
        _splice: function(t) {
            for (var e = 0; t.length > e; e++)
                t[e] === this && t.splice(e, 1)
        },
        _destroy: function() {
            var e = t.ui.ddmanager.droppables[this.options.scope];
            this._splice(e)
        },
        _setOption: function(e, i) {
            if ("accept" === e)
                this.accept = t.isFunction(i) ? i : function(t) {
                    return t.is(i)
                }
                ;
            else if ("scope" === e) {
                var s = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(s),
                this._addToManager(i)
            }
            this._super(e, i)
        },
        _activate: function(e) {
            var i = t.ui.ddmanager.current;
            this._addActiveClass(),
            i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function(e) {
            var i = t.ui.ddmanager.current;
            this._removeActiveClass(),
            i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(),
            this._trigger("over", e, this.ui(i)))
        },
        _out: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(),
            this._trigger("out", e, this.ui(i)))
        },
        _drop: function(e, i) {
            var s = i || t.ui.ddmanager.current
              , o = !1;
            return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var i = t(this).droppable("instance");
                return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && n(s, t.extend(i, {
                    offset: i.element.offset()
                }), i.options.tolerance, e) ? (o = !0,
                !1) : void 0
            }),
            o ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this._removeActiveClass(),
            this._removeHoverClass(),
            this._trigger("drop", e, this.ui(s)),
            this.element) : !1) : !1
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        },
        _addHoverClass: function() {
            this._addClass("ui-droppable-hover")
        },
        _removeHoverClass: function() {
            this._removeClass("ui-droppable-hover")
        },
        _addActiveClass: function() {
            this._addClass("ui-droppable-active")
        },
        _removeActiveClass: function() {
            this._removeClass("ui-droppable-active")
        }
    });
    var n = t.ui.intersect = function() {
        function t(t, e, i) {
            return t >= e && e + i > t
        }
        return function(e, i, s, n) {
            if (!i.offset)
                return !1;
            var o = (e.positionAbs || e.position.absolute).left + e.margins.left
              , a = (e.positionAbs || e.position.absolute).top + e.margins.top
              , r = o + e.helperProportions.width
              , h = a + e.helperProportions.height
              , l = i.offset.left
              , c = i.offset.top
              , u = l + i.proportions().width
              , d = c + i.proportions().height;
            switch (s) {
            case "fit":
                return o >= l && u >= r && a >= c && d >= h;
            case "intersect":
                return o + e.helperProportions.width / 2 > l && u > r - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > c && d > h - e.helperProportions.height / 2;
            case "pointer":
                return t(n.pageY, c, i.proportions().height) && t(n.pageX, l, i.proportions().width);
            case "touch":
                return (a >= c && d >= a || h >= c && d >= h || c > a && h > d) && (o >= l && u >= o || r >= l && u >= r || l > o && r > u);
            default:
                return !1
            }
        }
    }();
    t.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(e, i) {
            var s, n, o = t.ui.ddmanager.droppables[e.options.scope] || [], a = i ? i.type : null, r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t: for (s = 0; o.length > s; s++)
                if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
                    for (n = 0; r.length > n; n++)
                        if (r[n] === o[s].element[0]) {
                            o[s].proportions().height = 0;
                            continue t
                        }
                    o[s].visible = "none" !== o[s].element.css("display"),
                    o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i),
                    o[s].offset = o[s].element.offset(),
                    o[s].proportions({
                        width: o[s].element[0].offsetWidth,
                        height: o[s].element[0].offsetHeight
                    }))
                }
        },
        drop: function(e, i) {
            var s = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && n(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s),
                !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0,
                this.isover = !1,
                this._deactivate.call(this, i)))
            }),
            s
        },
        dragStart: function(e, i) {
            e.element.parentsUntil("body").on("scroll.droppable", function() {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        },
        drag: function(e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
            t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var s, o, a, r = n(e, this, this.options.tolerance, i), h = !r && this.isover ? "isout" : r && !this.isover ? "isover" : null;
                    h && (this.options.greedy && (o = this.options.scope,
                    a = this.element.parents(":data(ui-droppable)").filter(function() {
                        return t(this).droppable("instance").options.scope === o
                    }),
                    a.length && (s = t(a[0]).droppable("instance"),
                    s.greedyChild = "isover" === h)),
                    s && "isover" === h && (s.isover = !1,
                    s.isout = !0,
                    s._out.call(s, i)),
                    this[h] = !0,
                    this["isout" === h ? "isover" : "isout"] = !1,
                    this["isover" === h ? "_over" : "_out"].call(this, i),
                    s && "isout" === h && (s.isout = !1,
                    s.isover = !0,
                    s._over.call(s, i)))
                }
            })
        },
        dragStop: function(e, i) {
            e.element.parentsUntil("body").off("scroll.droppable"),
            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    },
    t.uiBackCompat !== !1 && t.widget("ui.droppable", t.ui.droppable, {
        options: {
            hoverClass: !1,
            activeClass: !1
        },
        _addActiveClass: function() {
            this._super(),
            this.options.activeClass && this.element.addClass(this.options.activeClass)
        },
        _removeActiveClass: function() {
            this._super(),
            this.options.activeClass && this.element.removeClass(this.options.activeClass)
        },
        _addHoverClass: function() {
            this._super(),
            this.options.hoverClass && this.element.addClass(this.options.hoverClass)
        },
        _removeHoverClass: function() {
            this._super(),
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
        }
    }),
    t.ui.droppable,
    t.widget("ui.resizable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(t) {
            return parseFloat(t) || 0
        },
        _isNumber: function(t) {
            return !isNaN(parseFloat(t))
        },
        _hasScroll: function(e, i) {
            if ("hidden" === t(e).css("overflow"))
                return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop"
              , n = !1;
            return e[s] > 0 ? !0 : (e[s] = 1,
            n = e[s] > 0,
            e[s] = 0,
            n)
        },
        _create: function() {
            var e, i = this.options, s = this;
            this._addClass("ui-resizable"),
            t.extend(this, {
                _aspectRatio: !!i.aspectRatio,
                aspectRatio: i.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
            }),
            this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })),
            this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")),
            this.elementIsWrapper = !0,
            e = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            },
            this.element.css(e),
            this.originalElement.css("margin", 0),
            this.originalResizeStyle = this.originalElement.css("resize"),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })),
            this.originalElement.css(e),
            this._proportionallyResize()),
            this._setupHandles(),
            i.autoHide && t(this.element).on("mouseenter", function() {
                i.disabled || (s._removeClass("ui-resizable-autohide"),
                s._handles.show())
            }).on("mouseleave", function() {
                i.disabled || s.resizing || (s._addClass("ui-resizable-autohide"),
                s._handles.hide())
            }),
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var e, i = function(e) {
                t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element),
            e = this.element,
            this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e),
            e.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            i(this.originalElement),
            this
        },
        _setOption: function(t, e) {
            switch (this._super(t, e),
            t) {
            case "handles":
                this._removeHandles(),
                this._setupHandles();
                break;
            default:
            }
        },
        _setupHandles: function() {
            var e, i, s, n, o, a = this.options, r = this;
            if (this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"),
            this._handles = t(),
            this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                s = this.handles.split(","),
                this.handles = {},
                i = 0; s.length > i; i++)
                    e = t.trim(s[i]),
                    n = "ui-resizable-" + e,
                    o = t("<div>"),
                    this._addClass(o, "ui-resizable-handle " + n),
                    o.css({
                        zIndex: a.zIndex
                    }),
                    this.handles[e] = ".ui-resizable-" + e,
                    this.element.append(o);
            this._renderAxis = function(e) {
                var i, s, n, o;
                e = e || this.element;
                for (i in this.handles)
                    this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]),
                    this._on(this.handles[i], {
                        mousedown: r._mouseDown
                    })),
                    this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element),
                    o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(),
                    n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""),
                    e.css(n, o),
                    this._proportionallyResize()),
                    this._handles = this._handles.add(this.handles[i])
            }
            ,
            this._renderAxis(this.element),
            this._handles = this._handles.add(this.element.find(".ui-resizable-handle")),
            this._handles.disableSelection(),
            this._handles.on("mouseover", function() {
                r.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                r.axis = o && o[1] ? o[1] : "se")
            }),
            a.autoHide && (this._handles.hide(),
            this._addClass("ui-resizable-autohide"))
        },
        _removeHandles: function() {
            this._handles.remove()
        },
        _mouseCapture: function(e) {
            var i, s, n = !1;
            for (i in this.handles)
                s = t(this.handles[i])[0],
                (s === e.target || t.contains(s, e.target)) && (n = !0);
            return !this.options.disabled && n
        },
        _mouseStart: function(e) {
            var i, s, n, o = this.options, a = this.element;
            return this.resizing = !0,
            this._renderProxy(),
            i = this._num(this.helper.css("left")),
            s = this._num(this.helper.css("top")),
            o.containment && (i += t(o.containment).scrollLeft() || 0,
            s += t(o.containment).scrollTop() || 0),
            this.offset = this.helper.offset(),
            this.position = {
                left: i,
                top: s
            },
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: a.width(),
                height: a.height()
            },
            this.originalSize = this._helper ? {
                width: a.outerWidth(),
                height: a.outerHeight()
            } : {
                width: a.width(),
                height: a.height()
            },
            this.sizeDiff = {
                width: a.outerWidth() - a.width(),
                height: a.outerHeight() - a.height()
            },
            this.originalPosition = {
                left: i,
                top: s
            },
            this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            },
            this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
            n = t(".ui-resizable-" + this.axis).css("cursor"),
            t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n),
            this._addClass("ui-resizable-resizing"),
            this._propagate("start", e),
            !0
        },
        _mouseDrag: function(e) {
            var i, s, n = this.originalMousePosition, o = this.axis, a = e.pageX - n.left || 0, r = e.pageY - n.top || 0, h = this._change[o];
            return this._updatePrevProperties(),
            h ? (i = h.apply(this, [e, a, r]),
            this._updateVirtualBoundaries(e.shiftKey),
            (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)),
            i = this._respectSize(i, e),
            this._updateCache(i),
            this._propagate("resize", e),
            s = this._applyChanges(),
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
            t.isEmptyObject(s) || (this._updatePrevProperties(),
            this._trigger("resize", e, this.ui()),
            this._applyChanges()),
            !1) : !1
        },
        _mouseStop: function(e) {
            this.resizing = !1;
            var i, s, n, o, a, r, h, l = this.options, c = this;
            return this._helper && (i = this._proportionallyResizeElements,
            s = i.length && /textarea/i.test(i[0].nodeName),
            n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height,
            o = s ? 0 : c.sizeDiff.width,
            a = {
                width: c.helper.width() - o,
                height: c.helper.height() - n
            },
            r = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null,
            h = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null,
            l.animate || this.element.css(t.extend(a, {
                top: h,
                left: r
            })),
            c.helper.height(c.size.height),
            c.helper.width(c.size.width),
            this._helper && !l.animate && this._proportionallyResize()),
            t("body").css("cursor", "auto"),
            this._removeClass("ui-resizable-resizing"),
            this._propagate("stop", e),
            this._helper && this.helper.remove(),
            !1
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            },
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var t = {};
            return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"),
            this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"),
            this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"),
            this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"),
            this.helper.css(t),
            t
        },
        _updateVirtualBoundaries: function(t) {
            var e, i, s, n, o, a = this.options;
            o = {
                minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
                maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
                minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
                maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0
            },
            (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio,
            s = o.minWidth / this.aspectRatio,
            i = o.maxHeight * this.aspectRatio,
            n = o.maxWidth / this.aspectRatio,
            e > o.minWidth && (o.minWidth = e),
            s > o.minHeight && (o.minHeight = s),
            o.maxWidth > i && (o.maxWidth = i),
            o.maxHeight > n && (o.maxHeight = n)),
            this._vBoundaries = o
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(),
            this._isNumber(t.left) && (this.position.left = t.left),
            this._isNumber(t.top) && (this.position.top = t.top),
            this._isNumber(t.height) && (this.size.height = t.height),
            this._isNumber(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t) {
            var e = this.position
              , i = this.size
              , s = this.axis;
            return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio),
            "sw" === s && (t.left = e.left + (i.width - t.width),
            t.top = null),
            "nw" === s && (t.top = e.top + (i.height - t.height),
            t.left = e.left + (i.width - t.width)),
            t
        },
        _respectSize: function(t) {
            var e = this._vBoundaries
              , i = this.axis
              , s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width
              , n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height
              , o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width
              , a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height
              , r = this.originalPosition.left + this.originalSize.width
              , h = this.originalPosition.top + this.originalSize.height
              , l = /sw|nw|w/.test(i)
              , c = /nw|ne|n/.test(i);
            return o && (t.width = e.minWidth),
            a && (t.height = e.minHeight),
            s && (t.width = e.maxWidth),
            n && (t.height = e.maxHeight),
            o && l && (t.left = r - e.minWidth),
            s && l && (t.left = r - e.maxWidth),
            a && c && (t.top = h - e.minHeight),
            n && c && (t.top = h - e.maxHeight),
            t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null,
            t
        },
        _getPaddingPlusBorderDimensions: function(t) {
            for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++)
                i[e] = parseFloat(s[e]) || 0,
                i[e] += parseFloat(n[e]) || 0;
            return {
                height: i[0] + i[2],
                width: i[1] + i[3]
            }
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++)
                    t = this._proportionallyResizeElements[e],
                    this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)),
                    t.css({
                        height: i.height() - this.outerDimensions.height || 0,
                        width: i.width() - this.outerDimensions.width || 0
                    })
        },
        _renderProxy: function() {
            var e = this.element
              , i = this.options;
            this.elementOffset = e.offset(),
            this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"),
            this._addClass(this.helper, this._helper),
            this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }),
            this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(t, e) {
                return {
                    width: this.originalSize.width + e
                }
            },
            w: function(t, e) {
                var i = this.originalSize
                  , s = this.originalPosition;
                return {
                    left: s.left + e,
                    width: i.width - e
                }
            },
            n: function(t, e, i) {
                var s = this.originalSize
                  , n = this.originalPosition;
                return {
                    top: n.top + i,
                    height: s.height - i
                }
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            sw: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            },
            ne: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            nw: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }
        },
        _propagate: function(e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]),
            "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }),
    t.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var i = t(this).resizable("instance")
              , s = i.options
              , n = i._proportionallyResizeElements
              , o = n.length && /textarea/i.test(n[0].nodeName)
              , a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height
              , r = o ? 0 : i.sizeDiff.width
              , h = {
                width: i.size.width - r,
                height: i.size.height - a
            }
              , l = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null
              , c = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(h, c && l ? {
                top: c,
                left: l
            } : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function() {
                    var s = {
                        width: parseFloat(i.element.css("width")),
                        height: parseFloat(i.element.css("height")),
                        top: parseFloat(i.element.css("top")),
                        left: parseFloat(i.element.css("left"))
                    };
                    n && n.length && t(n[0]).css({
                        width: s.width,
                        height: s.height
                    }),
                    i._updateCache(s),
                    i._propagate("resize", e)
                }
            })
        }
    }),
    t.ui.plugin.add("resizable", "containment", {
        start: function() {
            var e, i, s, n, o, a, r, h = t(this).resizable("instance"), l = h.options, c = h.element, u = l.containment, d = u instanceof t ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;
            d && (h.containerElement = t(d),
            /document/.test(u) || u === document ? (h.containerOffset = {
                left: 0,
                top: 0
            },
            h.containerPosition = {
                left: 0,
                top: 0
            },
            h.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (e = t(d),
            i = [],
            t(["Top", "Right", "Left", "Bottom"]).each(function(t, s) {
                i[t] = h._num(e.css("padding" + s))
            }),
            h.containerOffset = e.offset(),
            h.containerPosition = e.position(),
            h.containerSize = {
                height: e.innerHeight() - i[3],
                width: e.innerWidth() - i[1]
            },
            s = h.containerOffset,
            n = h.containerSize.height,
            o = h.containerSize.width,
            a = h._hasScroll(d, "left") ? d.scrollWidth : o,
            r = h._hasScroll(d) ? d.scrollHeight : n,
            h.parentData = {
                element: d,
                left: s.left,
                top: s.top,
                width: a,
                height: r
            }))
        },
        resize: function(e) {
            var i, s, n, o, a = t(this).resizable("instance"), r = a.options, h = a.containerOffset, l = a.position, c = a._aspectRatio || e.shiftKey, u = {
                top: 0,
                left: 0
            }, d = a.containerElement, p = !0;
            d[0] !== document && /static/.test(d.css("position")) && (u = h),
            l.left < (a._helper ? h.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - h.left : a.position.left - u.left),
            c && (a.size.height = a.size.width / a.aspectRatio,
            p = !1),
            a.position.left = r.helper ? h.left : 0),
            l.top < (a._helper ? h.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - h.top : a.position.top),
            c && (a.size.width = a.size.height * a.aspectRatio,
            p = !1),
            a.position.top = a._helper ? h.top : 0),
            n = a.containerElement.get(0) === a.element.parent().get(0),
            o = /relative|absolute/.test(a.containerElement.css("position")),
            n && o ? (a.offset.left = a.parentData.left + a.position.left,
            a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left,
            a.offset.top = a.element.offset().top),
            i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - u.left : a.offset.left - h.left)),
            s = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - u.top : a.offset.top - h.top)),
            i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i,
            c && (a.size.height = a.size.width / a.aspectRatio,
            p = !1)),
            s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s,
            c && (a.size.width = a.size.height * a.aspectRatio,
            p = !1)),
            p || (a.position.left = a.prevPosition.left,
            a.position.top = a.prevPosition.top,
            a.size.width = a.prevSize.width,
            a.size.height = a.prevSize.height)
        },
        stop: function() {
            var e = t(this).resizable("instance")
              , i = e.options
              , s = e.containerOffset
              , n = e.containerPosition
              , o = e.containerElement
              , a = t(e.helper)
              , r = a.offset()
              , h = a.outerWidth() - e.sizeDiff.width
              , l = a.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: h,
                height: l
            }),
            e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: h,
                height: l
            })
        }
    }),
    t.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var e = t(this).resizable("instance")
              , i = e.options;
            t(i.alsoResize).each(function() {
                var e = t(this);
                e.data("ui-resizable-alsoresize", {
                    width: parseFloat(e.width()),
                    height: parseFloat(e.height()),
                    left: parseFloat(e.css("left")),
                    top: parseFloat(e.css("top"))
                })
            })
        },
        resize: function(e, i) {
            var s = t(this).resizable("instance")
              , n = s.options
              , o = s.originalSize
              , a = s.originalPosition
              , r = {
                height: s.size.height - o.height || 0,
                width: s.size.width - o.width || 0,
                top: s.position.top - a.top || 0,
                left: s.position.left - a.left || 0
            };
            t(n.alsoResize).each(function() {
                var e = t(this)
                  , s = t(this).data("ui-resizable-alsoresize")
                  , n = {}
                  , o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                t.each(o, function(t, e) {
                    var i = (s[e] || 0) + (r[e] || 0);
                    i && i >= 0 && (n[e] = i || null)
                }),
                e.css(n)
            })
        },
        stop: function() {
            t(this).removeData("ui-resizable-alsoresize")
        }
    }),
    t.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var e = t(this).resizable("instance")
              , i = e.size;
            e.ghost = e.originalElement.clone(),
            e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: i.height,
                width: i.width,
                margin: 0,
                left: 0,
                top: 0
            }),
            e._addClass(e.ghost, "ui-resizable-ghost"),
            t.uiBackCompat !== !1 && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost),
            e.ghost.appendTo(e.helper)
        },
        resize: function() {
            var e = t(this).resizable("instance");
            e.ghost && e.ghost.css({
                position: "relative",
                height: e.size.height,
                width: e.size.width
            })
        },
        stop: function() {
            var e = t(this).resizable("instance");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }),
    t.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var e, i = t(this).resizable("instance"), s = i.options, n = i.size, o = i.originalSize, a = i.originalPosition, r = i.axis, h = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid, l = h[0] || 1, c = h[1] || 1, u = Math.round((n.width - o.width) / l) * l, d = Math.round((n.height - o.height) / c) * c, p = o.width + u, f = o.height + d, g = s.maxWidth && p > s.maxWidth, m = s.maxHeight && f > s.maxHeight, _ = s.minWidth && s.minWidth > p, v = s.minHeight && s.minHeight > f;
            s.grid = h,
            _ && (p += l),
            v && (f += c),
            g && (p -= l),
            m && (f -= c),
            /^(se|s|e)$/.test(r) ? (i.size.width = p,
            i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p,
            i.size.height = f,
            i.position.top = a.top - d) : /^(sw)$/.test(r) ? (i.size.width = p,
            i.size.height = f,
            i.position.left = a.left - u) : ((0 >= f - c || 0 >= p - l) && (e = i._getPaddingPlusBorderDimensions(this)),
            f - c > 0 ? (i.size.height = f,
            i.position.top = a.top - d) : (f = c - e.height,
            i.size.height = f,
            i.position.top = a.top + o.height - f),
            p - l > 0 ? (i.size.width = p,
            i.position.left = a.left - u) : (p = l - e.width,
            i.size.width = p,
            i.position.left = a.left + o.width - p))
        }
    }),
    t.ui.resizable,
    t.widget("ui.sortable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(t, e, i) {
            return t >= e && e + i > t
        },
        _isFloating: function(t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
        },
        _create: function() {
            this.containerCache = {},
            this._addClass("ui-sortable"),
            this.refresh(),
            this.offset = this.element.offset(),
            this._mouseInit(),
            this._setHandleClassName(),
            this.ready = !0
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "handle" === t && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            var e = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"),
            t.each(this.items, function() {
                e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
            })
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--)
                this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(e, i) {
            var s = null
              , n = !1
              , o = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e),
            t(e.target).parents().each(function() {
                return t.data(this, o.widgetName + "-item") === o ? (s = t(this),
                !1) : void 0
            }),
            t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)),
            s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function() {
                this === e.target && (n = !0)
            }),
            n) ? (this.currentItem = s,
            this._removeCurrentsFromItems(),
            !0) : !1 : !1)
        },
        _mouseStart: function(e, i, s) {
            var n, o, a = this.options;
            if (this.currentContainer = this,
            this.refreshPositions(),
            this.helper = this._createHelper(e),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.currentItem.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            t.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.helper.css("position", "absolute"),
            this.cssPosition = this.helper.css("position"),
            this.originalPosition = this._generatePosition(e),
            this.originalPageX = e.pageX,
            this.originalPageY = e.pageY,
            a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt),
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            },
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            a.containment && this._setContainment(),
            a.cursor && "auto" !== a.cursor && (o = this.document.find("body"),
            this.storedCursor = o.css("cursor"),
            o.css("cursor", a.cursor),
            this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)),
            a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", a.opacity)),
            a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", a.zIndex)),
            this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", e, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !s)
                for (n = this.containers.length - 1; n >= 0; n--)
                    this.containers[n]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this),
            t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
            this.dragging = !0,
            this._addClass(this.helper, "ui-sortable-helper"),
            this._mouseDrag(e),
            !0
        },
        _mouseDrag: function(e) {
            var i, s, n, o, a = this.options, r = !1;
            for (this.position = this._generatePosition(e),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed),
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)),
            e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))),
            r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
            i = this.items.length - 1; i >= 0; i--)
                if (s = this.items[i],
                n = s.item[0],
                o = this._intersectsWithPointer(s),
                o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
                    if (this.direction = 1 === o ? "down" : "up",
                    "pointer" !== this.options.tolerance && !this._intersectsWithSides(s))
                        break;
                    this._rearrange(e, s),
                    this._trigger("change", e, this._uiHash());
                    break
                }
            return this._contactContainers(e),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            this._trigger("sort", e, this._uiHash()),
            this.lastPositionAbs = this.positionAbs,
            !1
        },
        _mouseStop: function(e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e),
                this.options.revert) {
                    var s = this
                      , n = this.placeholder.offset()
                      , o = this.options.axis
                      , a = {};
                    o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)),
                    o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)),
                    this.reverting = !0,
                    t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
                        s._clear(e)
                    })
                } else
                    this._clear(e, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp(new t.Event("mouseup",{
                    target: null
                })),
                "original" === this.options.helper ? (this.currentItem.css(this._storedCSS),
                this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--)
                    this.containers[e]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)),
                    this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
            t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }),
            this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)),
            this
        },
        serialize: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected)
              , s = [];
            return e = e || {},
            t(i).each(function() {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }),
            !s.length && e.key && s.push(e.key + "="),
            s.join("&")
        },
        toArray: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected)
              , s = [];
            return e = e || {},
            i.each(function() {
                s.push(t(e.item || this).attr(e.attribute || "id") || "")
            }),
            s
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left
              , i = e + this.helperProportions.width
              , s = this.positionAbs.top
              , n = s + this.helperProportions.height
              , o = t.left
              , a = o + t.width
              , r = t.top
              , h = r + t.height
              , l = this.offset.click.top
              , c = this.offset.click.left
              , u = "x" === this.options.axis || s + l > r && h > s + l
              , d = "y" === this.options.axis || e + c > o && a > e + c
              , p = u && d;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function(t) {
            var e, i, s = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height), n = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width), o = s && n;
            return o ? (e = this._getDragVerticalDirection(),
            i = this._getDragHorizontalDirection(),
            this.floating ? "right" === i || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1)) : !1
        },
        _intersectsWithSides: function(t) {
            var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height)
              , i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width)
              , s = this._getDragVerticalDirection()
              , n = this._getDragHorizontalDirection();
            return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && e || "up" === s && !e)
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function(t) {
            return this._refreshItems(t),
            this._setHandleClassName(),
            this.refreshPositions(),
            this
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function(e) {
            function i() {
                r.push(this)
            }
            var s, n, o, a, r = [], h = [], l = this._connectWith();
            if (l && e)
                for (s = l.length - 1; s >= 0; s--)
                    for (o = t(l[s], this.document[0]),
                    n = o.length - 1; n >= 0; n--)
                        a = t.data(o[n], this.widgetFullName),
                        a && a !== this && !a.options.disabled && h.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
            for (h.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]),
            s = h.length - 1; s >= 0; s--)
                h[s][0].each(i);
            return t(r)
        },
        _removeCurrentsFromItems: function() {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function(t) {
                for (var i = 0; e.length > i; i++)
                    if (e[i] === t.item[0])
                        return !1;
                return !0
            })
        },
        _refreshItems: function(e) {
            this.items = [],
            this.containers = [this];
            var i, s, n, o, a, r, h, l, c = this.items, u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                item: this.currentItem
            }) : t(this.options.items, this.element), this]], d = this._connectWith();
            if (d && this.ready)
                for (i = d.length - 1; i >= 0; i--)
                    for (n = t(d[i], this.document[0]),
                    s = n.length - 1; s >= 0; s--)
                        o = t.data(n[s], this.widgetFullName),
                        o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                            item: this.currentItem
                        }) : t(o.options.items, o.element), o]),
                        this.containers.push(o));
            for (i = u.length - 1; i >= 0; i--)
                for (a = u[i][1],
                r = u[i][0],
                s = 0,
                l = r.length; l > s; s++)
                    h = t(r[s]),
                    h.data(this.widgetName + "-item", a),
                    c.push({
                        item: h,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
        },
        refreshPositions: function(e) {
            this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1,
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, s, n, o;
            for (i = this.items.length - 1; i >= 0; i--)
                s = this.items[i],
                s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item,
                e || (s.width = n.outerWidth(),
                s.height = n.outerHeight()),
                o = n.offset(),
                s.left = o.left,
                s.top = o.top);
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--)
                    o = this.containers[i].element.offset(),
                    this.containers[i].containerCache.left = o.left,
                    this.containers[i].containerCache.top = o.top,
                    this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
                    this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(e) {
            e = e || this;
            var i, s = e.options;
            s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder,
            s.placeholder = {
                element: function() {
                    var s = e.currentItem[0].nodeName.toLowerCase()
                      , n = t("<" + s + ">", e.document[0]);
                    return e._addClass(n, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(n, "ui-sortable-helper"),
                    "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(n)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, n) : "img" === s && n.attr("src", e.currentItem.attr("src")),
                    i || n.css("visibility", "hidden"),
                    n
                },
                update: function(t, n) {
                    (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)),
                    n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }),
            e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)),
            e.currentItem.after(e.placeholder),
            s.placeholder.update(e, e.placeholder)
        },
        _createTrPlaceholder: function(e, i) {
            var s = this;
            e.children().each(function() {
                t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
            })
        },
        _contactContainers: function(e) {
            var i, s, n, o, a, r, h, l, c, u, d = null, p = null;
            for (i = this.containers.length - 1; i >= 0; i--)
                if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
                    if (this._intersectsWith(this.containers[i].containerCache)) {
                        if (d && t.contains(this.containers[i].element[0], d.element[0]))
                            continue;
                        d = this.containers[i],
                        p = i
                    } else
                        this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)),
                        this.containers[i].containerCache.over = 0);
            if (d)
                if (1 === this.containers.length)
                    this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)),
                    this.containers[p].containerCache.over = 1);
                else {
                    for (n = 1e4,
                    o = null,
                    c = d.floating || this._isFloating(this.currentItem),
                    a = c ? "left" : "top",
                    r = c ? "width" : "height",
                    u = c ? "pageX" : "pageY",
                    s = this.items.length - 1; s >= 0; s--)
                        t.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (h = this.items[s].item.offset()[a],
                        l = !1,
                        e[u] - h > this.items[s][r] / 2 && (l = !0),
                        n > Math.abs(e[u] - h) && (n = Math.abs(e[u] - h),
                        o = this.items[s],
                        this.direction = l ? "up" : "down"));
                    if (!o && !this.options.dropOnEmpty)
                        return;
                    if (this.currentContainer === this.containers[p])
                        return this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()),
                        this.currentContainer.containerCache.over = 1),
                        void 0;
                    o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0),
                    this._trigger("change", e, this._uiHash()),
                    this.containers[p]._trigger("change", e, this._uiHash(this)),
                    this.currentContainer = this.containers[p],
                    this.options.placeholder.update(this.currentContainer, this.placeholder),
                    this.containers[p]._trigger("over", e, this._uiHash(this)),
                    this.containers[p].containerCache.over = 1
                }
        },
        _createHelper: function(e) {
            var i = this.options
              , s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]),
            s[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }),
            (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()),
            (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()),
            s
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }),
            "left"in e && (this.offset.click.left = e.left + this.margins.left),
            "right"in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            "top"in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom"in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(),
            e.top += this.scrollParent.scrollTop()),
            (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }),
            {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, s, n = this.options;
            "parent" === n.containment && (n.containment = this.helper[0].parentNode),
            ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
            /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0],
            i = t(n.containment).offset(),
            s = "hidden" !== t(e).css("overflow"),
            this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var s = "absolute" === e ? 1 : -1
              , n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , o = /(html|body)/i.test(n[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
            }
        },
        _generatePosition: function(e) {
            var i, s, n = this.options, o = e.pageX, a = e.pageY, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = /(html|body)/i.test(r[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left),
            e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top),
            e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left),
            e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)),
            n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1],
            a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i,
            s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0],
            o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)),
            {
                top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
            }
        },
        _rearrange: function(t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling),
            this.counter = this.counter ? ++this.counter : 1;
            var n = this.counter;
            this._delay(function() {
                n === this.counter && this.refreshPositions(!s)
            })
        },
        _clear: function(t, e) {
            function i(t, e, i) {
                return function(s) {
                    i._trigger(t, s, e._uiHash(e))
                }
            }
            this.reverting = !1;
            var s, n = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
            this._noFinalSort = null,
            this.helper[0] === this.currentItem[0]) {
                for (s in this._storedCSS)
                    ("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
                this.currentItem.css(this._storedCSS),
                this._removeClass(this.currentItem, "ui-sortable-helper")
            } else
                this.currentItem.show();
            for (this.fromOutside && !e && n.push(function(t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside))
            }),
            !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function(t) {
                this._trigger("update", t, this._uiHash())
            }),
            this !== this.currentContainer && (e || (n.push(function(t) {
                this._trigger("remove", t, this._uiHash())
            }),
            n.push(function(t) {
                return function(e) {
                    t._trigger("receive", e, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)),
            n.push(function(t) {
                return function(e) {
                    t._trigger("update", e, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)))),
            s = this.containers.length - 1; s >= 0; s--)
                e || n.push(i("deactivate", this, this.containers[s])),
                this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])),
                this.containers[s].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex),
            this.dragging = !1,
            e || this._trigger("beforeStop", t, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            this.helper = null),
            !e) {
                for (s = 0; n.length > s; s++)
                    n[s].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1,
            !this.cancelHelperRemoval
        },
        _trigger: function() {
            t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    })
});
;IE.fModule({
    f: function(exports, require, module, global) {
        require('jquery-ui/jquery-ui.min.js');
        require('jquery-ui/jquery-ui.min.css');
        require('jquery-ui/jquery-ui.structure.min.css');
        require('jquery-ui/version.js');
        require('jquery-ui/safe-active-element.js');
        require('jquery-ui/scroll-parent.js');
        require('jquery-ui/safe-blur.js');
        require('jquery-ui/data.js');
        require('jquery-ui/plugin.js');
        require('jquery-ui/widget.js');
        require('jquery-ui/mouse.js');
        require('jquery-ui/draggable.js');
        require('jquery-ui/droppable.js');
        require('jquery-ui/resizable.js');
        require('jquery-ui/sortable.js');
        require('jquery-ui/jquery-ui.css');
        require('jquery-ui/jquery-ui.structure.css');
    },
    fn: 'declarationjqueryui.js'
});
;/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a) {
    function f(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0]
              , d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null),
            a.target.dispatchEvent(d)
        }
    }
    if (a.support.touch = "ontouchend"in document,
    a.support.touch) {
        var e, b = a.ui.mouse.prototype, c = b._mouseInit, d = b._mouseDestroy;
        b._touchStart = function(a) {
            var b = this;
            !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0,
            b._touchMoved = !1,
            f(a, "mouseover"),
            f(a, "mousemove"),
            f(a, "mousedown"))
        }
        ,
        b._touchMove = function(a) {
            e && (this._touchMoved = !0,
            f(a, "mousemove"))
        }
        ,
        b._touchEnd = function(a) {
            e && (f(a, "mouseup"),
            f(a, "mouseout"),
            this._touchMoved || f(a, "click"),
            e = !1)
        }
        ,
        b._mouseInit = function() {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }),
            c.call(b)
        }
        ,
        b._mouseDestroy = function() {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }),
            d.call(b)
        }
    }
}(jQuery);
;IE.fModule({
    f: function(exports, require, module, global) {
        require('DeclarationJQuery.js');
        require('DeclarationJQueryUI.js');
        require('jquery-ui-touchpunch/jquery.ui.touch-punch.js');
        require('jquery-ui-touchpunch/jquery.ui.touch-punch.min.js');
    },
    fn: 'declarationjqueryespacenonmobile.js'
});
;!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ES6Promise = e()
}(this, function() {
    "use strict";
    function t(t) {
        var e = typeof t;
        return null !== t && ("object" === e || "function" === e)
    }
    function e(t) {
        return "function" == typeof t
    }
    function n(t) {
        W = t
    }
    function r(t) {
        z = t
    }
    function o() {
        return function() {
            return process.nextTick(a)
        }
    }
    function i() {
        return "undefined" != typeof U ? function() {
            U(a)
        }
        : c()
    }
    function s() {
        var t = 0
          , e = new H(a)
          , n = document.createTextNode("");
        return e.observe(n, {
            characterData: !0
        }),
        function() {
            n.data = t = ++t % 2
        }
    }
    function u() {
        var t = new MessageChannel;
        return t.port1.onmessage = a,
        function() {
            return t.port2.postMessage(0)
        }
    }
    function c() {
        var t = setTimeout;
        return function() {
            return t(a, 0)
        }
    }
    function a() {
        for (var t = 0; t < N; t += 2) {
            var e = Q[t]
              , n = Q[t + 1];
            e(n),
            Q[t] = void 0,
            Q[t + 1] = void 0
        }
        N = 0
    }
    function f() {
        try {
            var t = Function("return this")().require("vertx");
            return U = t.runOnLoop || t.runOnContext,
            i()
        } catch (e) {
            return c()
        }
    }
    function l(t, e) {
        var n = this
          , r = new this.constructor(p);
        void 0 === r[V] && x(r);
        var o = n._state;
        if (o) {
            var i = arguments[o - 1];
            z(function() {
                return T(o, r, i, n._result)
            })
        } else
            j(n, r, t, e);
        return r
    }
    function h(t) {
        var e = this;
        if (t && "object" == typeof t && t.constructor === e)
            return t;
        var n = new e(p);
        return w(n, t),
        n
    }
    function p() {}
    function v() {
        return new TypeError("You cannot resolve a promise with itself")
    }
    function d() {
        return new TypeError("A promises callback cannot return that same promise.")
    }
    function _(t, e, n, r) {
        try {
            t.call(e, n, r)
        } catch (o) {
            return o
        }
    }
    function y(t, e, n) {
        z(function(t) {
            var r = !1
              , o = _(n, e, function(n) {
                r || (r = !0,
                e !== n ? w(t, n) : A(t, n))
            }, function(e) {
                r || (r = !0,
                S(t, e))
            }, "Settle: " + (t._label || " unknown promise"));
            !r && o && (r = !0,
            S(t, o))
        }, t)
    }
    function m(t, e) {
        e._state === Z ? A(t, e._result) : e._state === $ ? S(t, e._result) : j(e, void 0, function(e) {
            return w(t, e)
        }, function(e) {
            return S(t, e)
        })
    }
    function b(t, n, r) {
        n.constructor === t.constructor && r === l && n.constructor.resolve === h ? m(t, n) : void 0 === r ? A(t, n) : e(r) ? y(t, n, r) : A(t, n)
    }
    function w(e, n) {
        if (e === n)
            S(e, v());
        else if (t(n)) {
            var r = void 0;
            try {
                r = n.then
            } catch (o) {
                return void S(e, o)
            }
            b(e, n, r)
        } else
            A(e, n)
    }
    function g(t) {
        t._onerror && t._onerror(t._result),
        E(t)
    }
    function A(t, e) {
        t._state === X && (t._result = e,
        t._state = Z,
        0 !== t._subscribers.length && z(E, t))
    }
    function S(t, e) {
        t._state === X && (t._state = $,
        t._result = e,
        z(g, t))
    }
    function j(t, e, n, r) {
        var o = t._subscribers
          , i = o.length;
        t._onerror = null,
        o[i] = e,
        o[i + Z] = n,
        o[i + $] = r,
        0 === i && t._state && z(E, t)
    }
    function E(t) {
        var e = t._subscribers
          , n = t._state;
        if (0 !== e.length) {
            for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3)
                r = e[s],
                o = e[s + n],
                r ? T(n, r, o, i) : o(i);
            t._subscribers.length = 0
        }
    }
    function T(t, n, r, o) {
        var i = e(r)
          , s = void 0
          , u = void 0
          , c = !0;
        if (i) {
            try {
                s = r(o)
            } catch (a) {
                c = !1,
                u = a
            }
            if (n === s)
                return void S(n, d())
        } else
            s = o;
        n._state !== X || (i && c ? w(n, s) : c === !1 ? S(n, u) : t === Z ? A(n, s) : t === $ && S(n, s))
    }
    function M(t, e) {
        try {
            e(function(e) {
                w(t, e)
            }, function(e) {
                S(t, e)
            })
        } catch (n) {
            S(t, n)
        }
    }
    function P() {
        return tt++
    }
    function x(t) {
        t[V] = tt++,
        t._state = void 0,
        t._result = void 0,
        t._subscribers = []
    }
    function C() {
        return new Error("Array Methods must be provided an Array")
    }
    function O(t) {
        return new et(this,t).promise
    }
    function k(t) {
        var e = this;
        return new e(L(t) ? function(n, r) {
            for (var o = t.length, i = 0; i < o; i++)
                e.resolve(t[i]).then(n, r)
        }
        : function(t, e) {
            return e(new TypeError("You must pass an array to race."))
        }
        )
    }
    function F(t) {
        var e = this
          , n = new e(p);
        return S(n, t),
        n
    }
    function Y() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }
    function q() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }
    function D() {
        var t = void 0;
        if ("undefined" != typeof global)
            t = global;
        else if ("undefined" != typeof self)
            t = self;
        else
            try {
                t = Function("return this")()
            } catch (e) {
                throw new Error("polyfill failed because global object is unavailable in this environment")
            }
        var n = t.Promise;
        if (n) {
            var r = null;
            try {
                r = Object.prototype.toString.call(n.resolve())
            } catch (e) {}
            if ("[object Promise]" === r && !n.cast)
                return
        }
        t.Promise = nt
    }
    var K = void 0;
    K = Array.isArray ? Array.isArray : function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    ;
    var L = K
      , N = 0
      , U = void 0
      , W = void 0
      , z = function(t, e) {
        Q[N] = t,
        Q[N + 1] = e,
        N += 2,
        2 === N && (W ? W(a) : R())
    }
      , B = "undefined" != typeof window ? window : void 0
      , G = B || {}
      , H = G.MutationObserver || G.WebKitMutationObserver
      , I = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process)
      , J = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel
      , Q = new Array(1e3)
      , R = void 0;
    R = I ? o() : H ? s() : J ? u() : void 0 === B && "function" == typeof require ? f() : c();
    var V = Math.random().toString(36).substring(2)
      , X = void 0
      , Z = 1
      , $ = 2
      , tt = 0
      , et = function() {
        function t(t, e) {
            this._instanceConstructor = t,
            this.promise = new t(p),
            this.promise[V] || x(this.promise),
            L(e) ? (this.length = e.length,
            this._remaining = e.length,
            this._result = new Array(this.length),
            0 === this.length ? A(this.promise, this._result) : (this.length = this.length || 0,
            this._enumerate(e),
            0 === this._remaining && A(this.promise, this._result))) : S(this.promise, C())
        }
        return t.prototype._enumerate = function(t) {
            for (var e = 0; this._state === X && e < t.length; e++)
                this._eachEntry(t[e], e)
        }
        ,
        t.prototype._eachEntry = function(t, e) {
            var n = this._instanceConstructor
              , r = n.resolve;
            if (r === h) {
                var o = void 0
                  , i = void 0
                  , s = !1;
                try {
                    o = t.then
                } catch (u) {
                    s = !0,
                    i = u
                }
                if (o === l && t._state !== X)
                    this._settledAt(t._state, e, t._result);
                else if ("function" != typeof o)
                    this._remaining--,
                    this._result[e] = t;
                else if (n === nt) {
                    var c = new n(p);
                    s ? S(c, i) : b(c, t, o),
                    this._willSettleAt(c, e)
                } else
                    this._willSettleAt(new n(function(e) {
                        return e(t)
                    }
                    ), e)
            } else
                this._willSettleAt(r(t), e)
        }
        ,
        t.prototype._settledAt = function(t, e, n) {
            var r = this.promise;
            r._state === X && (this._remaining--,
            t === $ ? S(r, n) : this._result[e] = n),
            0 === this._remaining && A(r, this._result)
        }
        ,
        t.prototype._willSettleAt = function(t, e) {
            var n = this;
            j(t, void 0, function(t) {
                return n._settledAt(Z, e, t)
            }, function(t) {
                return n._settledAt($, e, t)
            })
        }
        ,
        t
    }()
      , nt = function() {
        function t(e) {
            this[V] = P(),
            this._result = this._state = void 0,
            this._subscribers = [],
            p !== e && ("function" != typeof e && Y(),
            this instanceof t ? M(this, e) : q())
        }
        return t.prototype["catch"] = function(t) {
            return this.then(null, t)
        }
        ,
        t.prototype["finally"] = function(t) {
            var n = this
              , r = n.constructor;
            return e(t) ? n.then(function(e) {
                return r.resolve(t()).then(function() {
                    return e
                })
            }, function(e) {
                return r.resolve(t()).then(function() {
                    throw e
                })
            }) : n.then(t, t)
        }
        ,
        t
    }();
    return nt.prototype.then = l,
    nt.all = O,
    nt.race = k,
    nt.resolve = h,
    nt.reject = F,
    nt._setScheduler = n,
    nt._setAsap = r,
    nt._asap = z,
    nt.polyfill = D,
    nt.Promise = nt,
    nt.polyfill(),
    nt
});
;/*! @license DOMPurify 3.0.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.3/LICENSE */
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).DOMPurify = t()
}(this, (function() {
    "use strict";
    const {entries: e, setPrototypeOf: t, isFrozen: n, getPrototypeOf: o, getOwnPropertyDescriptor: r} = Object;
    let {freeze: i, seal: a, create: l} = Object
      , {apply: c, construct: s} = "undefined" != typeof Reflect && Reflect;
    c || (c = function(e, t, n) {
        return e.apply(t, n)
    }
    ),
    i || (i = function(e) {
        return e
    }
    ),
    a || (a = function(e) {
        return e
    }
    ),
    s || (s = function(e, t) {
        return new e(...t)
    }
    );
    const m = b(Array.prototype.forEach)
      , u = b(Array.prototype.pop)
      , f = b(Array.prototype.push)
      , p = b(String.prototype.toLowerCase)
      , d = b(String.prototype.toString)
      , h = b(String.prototype.match)
      , g = b(String.prototype.replace)
      , T = b(String.prototype.indexOf)
      , y = b(String.prototype.trim)
      , E = b(RegExp.prototype.test)
      , A = (_ = TypeError,
    function() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return s(_, t)
    }
    );
    var _;
    function b(e) {
        return function(t) {
            for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
                o[r - 1] = arguments[r];
            return c(e, t, o)
        }
    }
    function N(e, o, r) {
        var i;
        r = null !== (i = r) && void 0 !== i ? i : p,
        t && t(e, null);
        let a = o.length;
        for (; a--; ) {
            let t = o[a];
            if ("string" == typeof t) {
                const e = r(t);
                e !== t && (n(o) || (o[a] = e),
                t = e)
            }
            e[t] = !0
        }
        return e
    }
    function S(t) {
        const n = l(null);
        for (const [o,r] of e(t))
            n[o] = r;
        return n
    }
    function R(e, t) {
        for (; null !== e; ) {
            const n = r(e, t);
            if (n) {
                if (n.get)
                    return b(n.get);
                if ("function" == typeof n.value)
                    return b(n.value)
            }
            e = o(e)
        }
        return function(e) {
            return console.warn("fallback value for", e),
            null
        }
    }
    const w = i(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"])
      , D = i(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"])
      , L = i(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"])
      , v = i(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"])
      , x = i(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"])
      , C = i(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"])
      , k = i(["#text"])
      , O = i(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"])
      , I = i(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"])
      , M = i(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"])
      , U = i(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"])
      , P = a(/\{\{[\w\W]*|[\w\W]*\}\}/gm)
      , F = a(/<%[\w\W]*|[\w\W]*%>/gm)
      , H = a(/\${[\w\W]*}/gm)
      , z = a(/^data-[\-\w.\u00B7-\uFFFF]/)
      , B = a(/^aria-[\-\w]+$/)
      , W = a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i)
      , G = a(/^(?:\w+script|data):/i)
      , Y = a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g)
      , j = a(/^html$/i);
    var q = Object.freeze({
        __proto__: null,
        MUSTACHE_EXPR: P,
        ERB_EXPR: F,
        TMPLIT_EXPR: H,
        DATA_ATTR: z,
        ARIA_ATTR: B,
        IS_ALLOWED_URI: W,
        IS_SCRIPT_OR_DATA: G,
        ATTR_WHITESPACE: Y,
        DOCTYPE_NAME: j
    });
    const X = ()=>"undefined" == typeof window ? null : window
      , K = function(e, t) {
        if ("object" != typeof e || "function" != typeof e.createPolicy)
            return null;
        let n = null;
        const o = "data-tt-policy-suffix";
        t && t.hasAttribute(o) && (n = t.getAttribute(o));
        const r = "dompurify" + (n ? "#" + n : "");
        try {
            return e.createPolicy(r, {
                createHTML: e=>e,
                createScriptURL: e=>e
            })
        } catch (e) {
            return console.warn("TrustedTypes policy " + r + " could not be created."),
            null
        }
    };
    var V = function t() {
        let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : X();
        const o = e=>t(e);
        if (o.version = "3.0.3",
        o.removed = [],
        !n || !n.document || 9 !== n.document.nodeType)
            return o.isSupported = !1,
            o;
        const r = n.document
          , a = r.currentScript;
        let {document: l} = n;
        const {DocumentFragment: c, HTMLTemplateElement: s, Node: _, Element: b, NodeFilter: P, NamedNodeMap: F=n.NamedNodeMap || n.MozNamedAttrMap, HTMLFormElement: H, DOMParser: z, trustedTypes: B} = n
          , G = b.prototype
          , Y = R(G, "cloneNode")
          , V = R(G, "nextSibling")
          , $ = R(G, "childNodes")
          , Z = R(G, "parentNode");
        if ("function" == typeof s) {
            const e = l.createElement("template");
            e.content && e.content.ownerDocument && (l = e.content.ownerDocument)
        }
        let J, Q = "";
        const {implementation: ee, createNodeIterator: te, createDocumentFragment: ne, getElementsByTagName: oe} = l
          , {importNode: re} = r;
        let ie = {};
        o.isSupported = "function" == typeof e && "function" == typeof Z && ee && void 0 !== ee.createHTMLDocument;
        const {MUSTACHE_EXPR: ae, ERB_EXPR: le, TMPLIT_EXPR: ce, DATA_ATTR: se, ARIA_ATTR: me, IS_SCRIPT_OR_DATA: ue, ATTR_WHITESPACE: fe} = q;
        let {IS_ALLOWED_URI: pe} = q
          , de = null;
        const he = N({}, [...w, ...D, ...L, ...x, ...k]);
        let ge = null;
        const Te = N({}, [...O, ...I, ...M, ...U]);
        let ye = Object.seal(Object.create(null, {
            tagNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            attributeNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: !1
            }
        }))
          , Ee = null
          , Ae = null
          , _e = !0
          , be = !0
          , Ne = !1
          , Se = !0
          , Re = !1
          , we = !1
          , De = !1
          , Le = !1
          , ve = !1
          , xe = !1
          , Ce = !1
          , ke = !0
          , Oe = !1;
        const Ie = "user-content-";
        let Me = !0
          , Ue = !1
          , Pe = {}
          , Fe = null;
        const He = N({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
        let ze = null;
        const Be = N({}, ["audio", "video", "img", "source", "image", "track"]);
        let We = null;
        const Ge = N({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"])
          , Ye = "http://www.w3.org/1998/Math/MathML"
          , je = "http://www.w3.org/2000/svg"
          , qe = "http://www.w3.org/1999/xhtml";
        let Xe = qe
          , Ke = !1
          , Ve = null;
        const $e = N({}, [Ye, je, qe], d);
        let Ze;
        const Je = ["application/xhtml+xml", "text/html"]
          , Qe = "text/html";
        let et, tt = null;
        const nt = l.createElement("form")
          , ot = function(e) {
            return e instanceof RegExp || e instanceof Function
        }
          , rt = function(e) {
            if (!tt || tt !== e) {
                if (e && "object" == typeof e || (e = {}),
                e = S(e),
                Ze = Ze = -1 === Je.indexOf(e.PARSER_MEDIA_TYPE) ? Qe : e.PARSER_MEDIA_TYPE,
                et = "application/xhtml+xml" === Ze ? d : p,
                de = "ALLOWED_TAGS"in e ? N({}, e.ALLOWED_TAGS, et) : he,
                ge = "ALLOWED_ATTR"in e ? N({}, e.ALLOWED_ATTR, et) : Te,
                Ve = "ALLOWED_NAMESPACES"in e ? N({}, e.ALLOWED_NAMESPACES, d) : $e,
                We = "ADD_URI_SAFE_ATTR"in e ? N(S(Ge), e.ADD_URI_SAFE_ATTR, et) : Ge,
                ze = "ADD_DATA_URI_TAGS"in e ? N(S(Be), e.ADD_DATA_URI_TAGS, et) : Be,
                Fe = "FORBID_CONTENTS"in e ? N({}, e.FORBID_CONTENTS, et) : He,
                Ee = "FORBID_TAGS"in e ? N({}, e.FORBID_TAGS, et) : {},
                Ae = "FORBID_ATTR"in e ? N({}, e.FORBID_ATTR, et) : {},
                Pe = "USE_PROFILES"in e && e.USE_PROFILES,
                _e = !1 !== e.ALLOW_ARIA_ATTR,
                be = !1 !== e.ALLOW_DATA_ATTR,
                Ne = e.ALLOW_UNKNOWN_PROTOCOLS || !1,
                Se = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR,
                Re = e.SAFE_FOR_TEMPLATES || !1,
                we = e.WHOLE_DOCUMENT || !1,
                ve = e.RETURN_DOM || !1,
                xe = e.RETURN_DOM_FRAGMENT || !1,
                Ce = e.RETURN_TRUSTED_TYPE || !1,
                Le = e.FORCE_BODY || !1,
                ke = !1 !== e.SANITIZE_DOM,
                Oe = e.SANITIZE_NAMED_PROPS || !1,
                Me = !1 !== e.KEEP_CONTENT,
                Ue = e.IN_PLACE || !1,
                pe = e.ALLOWED_URI_REGEXP || W,
                Xe = e.NAMESPACE || qe,
                ye = e.CUSTOM_ELEMENT_HANDLING || {},
                e.CUSTOM_ELEMENT_HANDLING && ot(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ye.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
                e.CUSTOM_ELEMENT_HANDLING && ot(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ye.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
                e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (ye.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
                Re && (be = !1),
                xe && (ve = !0),
                Pe && (de = N({}, [...k]),
                ge = [],
                !0 === Pe.html && (N(de, w),
                N(ge, O)),
                !0 === Pe.svg && (N(de, D),
                N(ge, I),
                N(ge, U)),
                !0 === Pe.svgFilters && (N(de, L),
                N(ge, I),
                N(ge, U)),
                !0 === Pe.mathMl && (N(de, x),
                N(ge, M),
                N(ge, U))),
                e.ADD_TAGS && (de === he && (de = S(de)),
                N(de, e.ADD_TAGS, et)),
                e.ADD_ATTR && (ge === Te && (ge = S(ge)),
                N(ge, e.ADD_ATTR, et)),
                e.ADD_URI_SAFE_ATTR && N(We, e.ADD_URI_SAFE_ATTR, et),
                e.FORBID_CONTENTS && (Fe === He && (Fe = S(Fe)),
                N(Fe, e.FORBID_CONTENTS, et)),
                Me && (de["#text"] = !0),
                we && N(de, ["html", "head", "body"]),
                de.table && (N(de, ["tbody"]),
                delete Ee.tbody),
                e.TRUSTED_TYPES_POLICY) {
                    if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML)
                        throw A('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                    if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL)
                        throw A('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                    J = e.TRUSTED_TYPES_POLICY,
                    Q = J.createHTML("")
                } else
                    void 0 === J && (J = K(B, a)),
                    null !== J && "string" == typeof Q && (Q = J.createHTML(""));
                i && i(e),
                tt = e
            }
        }
          , it = N({}, ["mi", "mo", "mn", "ms", "mtext"])
          , at = N({}, ["foreignobject", "desc", "title", "annotation-xml"])
          , lt = N({}, ["title", "style", "font", "a", "script"])
          , ct = N({}, D);
        N(ct, L),
        N(ct, v);
        const st = N({}, x);
        N(st, C);
        const mt = function(e) {
            let t = Z(e);
            t && t.tagName || (t = {
                namespaceURI: Xe,
                tagName: "template"
            });
            const n = p(e.tagName)
              , o = p(t.tagName);
            return !!Ve[e.namespaceURI] && (e.namespaceURI === je ? t.namespaceURI === qe ? "svg" === n : t.namespaceURI === Ye ? "svg" === n && ("annotation-xml" === o || it[o]) : Boolean(ct[n]) : e.namespaceURI === Ye ? t.namespaceURI === qe ? "math" === n : t.namespaceURI === je ? "math" === n && at[o] : Boolean(st[n]) : e.namespaceURI === qe ? !(t.namespaceURI === je && !at[o]) && (!(t.namespaceURI === Ye && !it[o]) && (!st[n] && (lt[n] || !ct[n]))) : !("application/xhtml+xml" !== Ze || !Ve[e.namespaceURI]))
        }
          , ut = function(e) {
            f(o.removed, {
                element: e
            });
            try {
                e.parentNode.removeChild(e)
            } catch (t) {
                e.remove()
            }
        }
          , ft = function(e, t) {
            try {
                f(o.removed, {
                    attribute: t.getAttributeNode(e),
                    from: t
                })
            } catch (e) {
                f(o.removed, {
                    attribute: null,
                    from: t
                })
            }
            if (t.removeAttribute(e),
            "is" === e && !ge[e])
                if (ve || xe)
                    try {
                        ut(t)
                    } catch (e) {}
                else
                    try {
                        t.setAttribute(e, "")
                    } catch (e) {}
        }
          , pt = function(e) {
            let t, n;
            if (Le)
                e = "<remove></remove>" + e;
            else {
                const t = h(e, /^[\r\n\t ]+/);
                n = t && t[0]
            }
            "application/xhtml+xml" === Ze && Xe === qe && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
            const o = J ? J.createHTML(e) : e;
            if (Xe === qe)
                try {
                    t = (new z).parseFromString(o, Ze)
                } catch (e) {}
            if (!t || !t.documentElement) {
                t = ee.createDocument(Xe, "template", null);
                try {
                    t.documentElement.innerHTML = Ke ? Q : o
                } catch (e) {}
            }
            const r = t.body || t.documentElement;
            return e && n && r.insertBefore(l.createTextNode(n), r.childNodes[0] || null),
            Xe === qe ? oe.call(t, we ? "html" : "body")[0] : we ? t.documentElement : r
        }
          , dt = function(e) {
            return te.call(e.ownerDocument || e, e, P.SHOW_ELEMENT | P.SHOW_COMMENT | P.SHOW_TEXT, null, !1)
        }
          , ht = function(e) {
            return e instanceof H && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || !(e.attributes instanceof F) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore || "function" != typeof e.hasChildNodes)
        }
          , gt = function(e) {
            return "object" == typeof _ ? e instanceof _ : e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName
        }
          , Tt = function(e, t, n) {
            ie[e] && m(ie[e], (e=>{
                e.call(o, t, n, tt)
            }
            ))
        }
          , yt = function(e) {
            let t;
            if (Tt("beforeSanitizeElements", e, null),
            ht(e))
                return ut(e),
                !0;
            const n = et(e.nodeName);
            if (Tt("uponSanitizeElement", e, {
                tagName: n,
                allowedTags: de
            }),
            e.hasChildNodes() && !gt(e.firstElementChild) && (!gt(e.content) || !gt(e.content.firstElementChild)) && E(/<[/\w]/g, e.innerHTML) && E(/<[/\w]/g, e.textContent))
                return ut(e),
                !0;
            if (!de[n] || Ee[n]) {
                if (!Ee[n] && At(n)) {
                    if (ye.tagNameCheck instanceof RegExp && E(ye.tagNameCheck, n))
                        return !1;
                    if (ye.tagNameCheck instanceof Function && ye.tagNameCheck(n))
                        return !1
                }
                if (Me && !Fe[n]) {
                    const t = Z(e) || e.parentNode
                      , n = $(e) || e.childNodes;
                    if (n && t) {
                        for (let o = n.length - 1; o >= 0; --o)
                            t.insertBefore(Y(n[o], !0), V(e))
                    }
                }
                return ut(e),
                !0
            }
            return e instanceof b && !mt(e) ? (ut(e),
            !0) : "noscript" !== n && "noembed" !== n || !E(/<\/no(script|embed)/i, e.innerHTML) ? (Re && 3 === e.nodeType && (t = e.textContent,
            t = g(t, ae, " "),
            t = g(t, le, " "),
            t = g(t, ce, " "),
            e.textContent !== t && (f(o.removed, {
                element: e.cloneNode()
            }),
            e.textContent = t)),
            Tt("afterSanitizeElements", e, null),
            !1) : (ut(e),
            !0)
        }
          , Et = function(e, t, n) {
            if (ke && ("id" === t || "name" === t) && (n in l || n in nt))
                return !1;
            if (be && !Ae[t] && E(se, t))
                ;
            else if (_e && E(me, t))
                ;
            else if (!ge[t] || Ae[t]) {
                if (!(At(e) && (ye.tagNameCheck instanceof RegExp && E(ye.tagNameCheck, e) || ye.tagNameCheck instanceof Function && ye.tagNameCheck(e)) && (ye.attributeNameCheck instanceof RegExp && E(ye.attributeNameCheck, t) || ye.attributeNameCheck instanceof Function && ye.attributeNameCheck(t)) || "is" === t && ye.allowCustomizedBuiltInElements && (ye.tagNameCheck instanceof RegExp && E(ye.tagNameCheck, n) || ye.tagNameCheck instanceof Function && ye.tagNameCheck(n))))
                    return !1
            } else if (We[t])
                ;
            else if (E(pe, g(n, fe, "")))
                ;
            else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== T(n, "data:") || !ze[e]) {
                if (Ne && !E(ue, g(n, fe, "")))
                    ;
                else if (n)
                    return !1
            } else
                ;return !0
        }
          , At = function(e) {
            return e.indexOf("-") > 0
        }
          , _t = function(e) {
            let t, n, r, i;
            Tt("beforeSanitizeAttributes", e, null);
            const {attributes: a} = e;
            if (!a)
                return;
            const l = {
                attrName: "",
                attrValue: "",
                keepAttr: !0,
                allowedAttributes: ge
            };
            for (i = a.length; i--; ) {
                t = a[i];
                const {name: c, namespaceURI: s} = t;
                if (n = "value" === c ? t.value : y(t.value),
                r = et(c),
                l.attrName = r,
                l.attrValue = n,
                l.keepAttr = !0,
                l.forceKeepAttr = void 0,
                Tt("uponSanitizeAttribute", e, l),
                n = l.attrValue,
                l.forceKeepAttr)
                    continue;
                if (ft(c, e),
                !l.keepAttr)
                    continue;
                if (!Se && E(/\/>/i, n)) {
                    ft(c, e);
                    continue
                }
                Re && (n = g(n, ae, " "),
                n = g(n, le, " "),
                n = g(n, ce, " "));
                const m = et(e.nodeName);
                if (Et(m, r, n)) {
                    if (!Oe || "id" !== r && "name" !== r || (ft(c, e),
                    n = Ie + n),
                    J && "object" == typeof B && "function" == typeof B.getAttributeType)
                        if (s)
                            ;
                        else
                            switch (B.getAttributeType(m, r)) {
                            case "TrustedHTML":
                                n = J.createHTML(n);
                                break;
                            case "TrustedScriptURL":
                                n = J.createScriptURL(n)
                            }
                    try {
                        s ? e.setAttributeNS(s, c, n) : e.setAttribute(c, n),
                        u(o.removed)
                    } catch (e) {}
                }
            }
            Tt("afterSanitizeAttributes", e, null)
        }
          , bt = function e(t) {
            let n;
            const o = dt(t);
            for (Tt("beforeSanitizeShadowDOM", t, null); n = o.nextNode(); )
                Tt("uponSanitizeShadowNode", n, null),
                yt(n) || (n.content instanceof c && e(n.content),
                _t(n));
            Tt("afterSanitizeShadowDOM", t, null)
        };
        return o.sanitize = function(e) {
            let t, n, i, a, l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (Ke = !e,
            Ke && (e = "\x3c!--\x3e"),
            "string" != typeof e && !gt(e)) {
                if ("function" != typeof e.toString)
                    throw A("toString is not a function");
                if ("string" != typeof (e = e.toString()))
                    throw A("dirty is not a string, aborting")
            }
            if (!o.isSupported)
                return e;
            if (De || rt(l),
            o.removed = [],
            "string" == typeof e && (Ue = !1),
            Ue) {
                if (e.nodeName) {
                    const t = et(e.nodeName);
                    if (!de[t] || Ee[t])
                        throw A("root node is forbidden and cannot be sanitized in-place")
                }
            } else if (e instanceof _)
                t = pt("\x3c!----\x3e"),
                n = t.ownerDocument.importNode(e, !0),
                1 === n.nodeType && "BODY" === n.nodeName || "HTML" === n.nodeName ? t = n : t.appendChild(n);
            else {
                if (!ve && !Re && !we && -1 === e.indexOf("<"))
                    return J && Ce ? J.createHTML(e) : e;
                if (t = pt(e),
                !t)
                    return ve ? null : Ce ? Q : ""
            }
            t && Le && ut(t.firstChild);
            const s = dt(Ue ? e : t);
            for (; i = s.nextNode(); )
                yt(i) || (i.content instanceof c && bt(i.content),
                _t(i));
            if (Ue)
                return e;
            if (ve) {
                if (xe)
                    for (a = ne.call(t.ownerDocument); t.firstChild; )
                        a.appendChild(t.firstChild);
                else
                    a = t;
                return (ge.shadowroot || ge.shadowrootmod) && (a = re.call(r, a, !0)),
                a
            }
            let m = we ? t.outerHTML : t.innerHTML;
            return we && de["!doctype"] && t.ownerDocument && t.ownerDocument.doctype && t.ownerDocument.doctype.name && E(j, t.ownerDocument.doctype.name) && (m = "<!DOCTYPE " + t.ownerDocument.doctype.name + ">\n" + m),
            Re && (m = g(m, ae, " "),
            m = g(m, le, " "),
            m = g(m, ce, " ")),
            J && Ce ? J.createHTML(m) : m
        }
        ,
        o.setConfig = function(e) {
            rt(e),
            De = !0
        }
        ,
        o.clearConfig = function() {
            tt = null,
            De = !1
        }
        ,
        o.isValidAttribute = function(e, t, n) {
            tt || rt({});
            const o = et(e)
              , r = et(t);
            return Et(o, r, n)
        }
        ,
        o.addHook = function(e, t) {
            "function" == typeof t && (ie[e] = ie[e] || [],
            f(ie[e], t))
        }
        ,
        o.removeHook = function(e) {
            if (ie[e])
                return u(ie[e])
        }
        ,
        o.removeHooks = function(e) {
            ie[e] && (ie[e] = [])
        }
        ,
        o.removeAllHooks = function() {
            ie = {}
        }
        ,
        o
    }();
    return V
}
));
;!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.forge = e() : t.forge = e()
}("undefined" != typeof self ? self : this, function() {
    return function(t) {
        function e(a) {
            if (r[a])
                return r[a].exports;
            var i = r[a] = {
                i: a,
                l: !1,
                exports: {}
            };
            return t[a].call(i.exports, i, i.exports, e),
            i.l = !0,
            i.exports
        }
        var r = {};
        return e.m = t,
        e.c = r,
        e.d = function(t, r, a) {
            e.o(t, r) || Object.defineProperty(t, r, {
                configurable: !1,
                enumerable: !0,
                get: a
            })
        }
        ,
        e.n = function(t) {
            var r = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return e.d(r, "a", r),
            r
        }
        ,
        e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        e.p = "",
        e(e.s = 22)
    }([function(t, e) {
        t.exports = {
            options: {
                usePureJavaScript: !1
            }
        }
    }
    , function(t, e, r) {
        (function(e) {
            function a(t) {
                if (8 !== t && 16 !== t && 24 !== t && 32 !== t)
                    throw new Error("Only 8, 16, 24, or 32 bits supported: " + t)
            }
            function i(t) {
                if (this.data = "",
                this.read = 0,
                "string" == typeof t)
                    this.data = t;
                else if (u.isArrayBuffer(t) || u.isArrayBufferView(t))
                    if ("undefined" != typeof Buffer && t instanceof Buffer)
                        this.data = t.toString("binary");
                    else {
                        var e = new Uint8Array(t);
                        try {
                            this.data = String.fromCharCode.apply(null, e)
                        } catch (t) {
                            for (var r = 0; r < e.length; ++r)
                                this.putByte(e[r])
                        }
                    }
                else
                    (t instanceof i || "object" == typeof t && "string" == typeof t.data && "number" == typeof t.read) && (this.data = t.data,
                    this.read = t.read);
                this._constructedStringLength = 0
            }
            function n(t, e) {
                e = e || {},
                this.read = e.readOffset || 0,
                this.growSize = e.growSize || 1024;
                var r = u.isArrayBuffer(t)
                  , a = u.isArrayBufferView(t);
                if (r || a)
                    return this.data = r ? new DataView(t) : new DataView(t.buffer,t.byteOffset,t.byteLength),
                    void (this.write = "writeOffset"in e ? e.writeOffset : this.data.byteLength);
                this.data = new DataView(new ArrayBuffer(0)),
                this.write = 0,
                null !== t && void 0 !== t && this.putBytes(t),
                "writeOffset"in e && (this.write = e.writeOffset)
            }
            var s = r(0)
              , o = r(25)
              , u = t.exports = s.util = s.util || {};
            !function() {
                function t(t) {
                    if (t.source === window && t.data === e) {
                        t.stopPropagation();
                        var a = r.slice();
                        r.length = 0,
                        a.forEach(function(t) {
                            t()
                        })
                    }
                }
                if ("undefined" != typeof process && process.nextTick && !process.browser)
                    return u.nextTick = process.nextTick,
                    void ("function" == typeof setImmediate ? u.setImmediate = setImmediate : u.setImmediate = u.nextTick);
                if ("function" == typeof setImmediate)
                    return u.setImmediate = function() {
                        return setImmediate.apply(void 0, arguments)
                    }
                    ,
                    void (u.nextTick = function(t) {
                        return setImmediate(t)
                    }
                    );
                if (u.setImmediate = function(t) {
                    setTimeout(t, 0)
                }
                ,
                "undefined" != typeof window && "function" == typeof window.postMessage) {
                    var e = "forge.setImmediate"
                      , r = [];
                    u.setImmediate = function(t) {
                        r.push(t),
                        1 === r.length && window.postMessage(e, "*")
                    }
                    ,
                    window.addEventListener("message", t, !0)
                }
                if ("undefined" != typeof MutationObserver) {
                    var a = Date.now()
                      , i = !0
                      , n = document.createElement("div")
                      , r = [];
                    new MutationObserver(function() {
                        var t = r.slice();
                        r.length = 0,
                        t.forEach(function(t) {
                            t()
                        })
                    }
                    ).observe(n, {
                        attributes: !0
                    });
                    var s = u.setImmediate;
                    u.setImmediate = function(t) {
                        Date.now() - a > 15 ? (a = Date.now(),
                        s(t)) : (r.push(t),
                        1 === r.length && n.setAttribute("a", i = !i))
                    }
                }
                u.nextTick = u.setImmediate
            }(),
            u.isNodejs = "undefined" != typeof process && process.versions && process.versions.node,
            u.globalScope = function() {
                return u.isNodejs ? e : "undefined" == typeof self ? window : self
            }(),
            u.isArray = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
            ,
            u.isArrayBuffer = function(t) {
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
            }
            ,
            u.isArrayBufferView = function(t) {
                return t && u.isArrayBuffer(t.buffer) && void 0 !== t.byteLength
            }
            ,
            u.ByteBuffer = i,
            u.ByteStringBuffer = i;
            u.ByteStringBuffer.prototype._optimizeConstructedString = function(t) {
                this._constructedStringLength += t,
                this._constructedStringLength > 4096 && (this.data.substr(0, 1),
                this._constructedStringLength = 0)
            }
            ,
            u.ByteStringBuffer.prototype.length = function() {
                return this.data.length - this.read
            }
            ,
            u.ByteStringBuffer.prototype.isEmpty = function() {
                return this.length() <= 0
            }
            ,
            u.ByteStringBuffer.prototype.putByte = function(t) {
                return this.putBytes(String.fromCharCode(t))
            }
            ,
            u.ByteStringBuffer.prototype.fillWithByte = function(t, e) {
                t = String.fromCharCode(t);
                for (var r = this.data; e > 0; )
                    1 & e && (r += t),
                    (e >>>= 1) > 0 && (t += t);
                return this.data = r,
                this._optimizeConstructedString(e),
                this
            }
            ,
            u.ByteStringBuffer.prototype.putBytes = function(t) {
                return this.data += t,
                this._optimizeConstructedString(t.length),
                this
            }
            ,
            u.ByteStringBuffer.prototype.putString = function(t) {
                return this.putBytes(u.encodeUtf8(t))
            }
            ,
            u.ByteStringBuffer.prototype.putInt16 = function(t) {
                return this.putBytes(String.fromCharCode(t >> 8 & 255) + String.fromCharCode(255 & t))
            }
            ,
            u.ByteStringBuffer.prototype.putInt24 = function(t) {
                return this.putBytes(String.fromCharCode(t >> 16 & 255) + String.fromCharCode(t >> 8 & 255) + String.fromCharCode(255 & t))
            }
            ,
            u.ByteStringBuffer.prototype.putInt32 = function(t) {
                return this.putBytes(String.fromCharCode(t >> 24 & 255) + String.fromCharCode(t >> 16 & 255) + String.fromCharCode(t >> 8 & 255) + String.fromCharCode(255 & t))
            }
            ,
            u.ByteStringBuffer.prototype.putInt16Le = function(t) {
                return this.putBytes(String.fromCharCode(255 & t) + String.fromCharCode(t >> 8 & 255))
            }
            ,
            u.ByteStringBuffer.prototype.putInt24Le = function(t) {
                return this.putBytes(String.fromCharCode(255 & t) + String.fromCharCode(t >> 8 & 255) + String.fromCharCode(t >> 16 & 255))
            }
            ,
            u.ByteStringBuffer.prototype.putInt32Le = function(t) {
                return this.putBytes(String.fromCharCode(255 & t) + String.fromCharCode(t >> 8 & 255) + String.fromCharCode(t >> 16 & 255) + String.fromCharCode(t >> 24 & 255))
            }
            ,
            u.ByteStringBuffer.prototype.putInt = function(t, e) {
                a(e);
                var r = "";
                do {
                    e -= 8,
                    r += String.fromCharCode(t >> e & 255)
                } while (e > 0);
                return this.putBytes(r)
            }
            ,
            u.ByteStringBuffer.prototype.putSignedInt = function(t, e) {
                return t < 0 && (t += 2 << e - 1),
                this.putInt(t, e)
            }
            ,
            u.ByteStringBuffer.prototype.putBuffer = function(t) {
                return this.putBytes(t.getBytes())
            }
            ,
            u.ByteStringBuffer.prototype.getByte = function() {
                return this.data.charCodeAt(this.read++)
            }
            ,
            u.ByteStringBuffer.prototype.getInt16 = function() {
                var t = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
                return this.read += 2,
                t
            }
            ,
            u.ByteStringBuffer.prototype.getInt24 = function() {
                var t = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
                return this.read += 3,
                t
            }
            ,
            u.ByteStringBuffer.prototype.getInt32 = function() {
                var t = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
                return this.read += 4,
                t
            }
            ,
            u.ByteStringBuffer.prototype.getInt16Le = function() {
                var t = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
                return this.read += 2,
                t
            }
            ,
            u.ByteStringBuffer.prototype.getInt24Le = function() {
                var t = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
                return this.read += 3,
                t
            }
            ,
            u.ByteStringBuffer.prototype.getInt32Le = function() {
                var t = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
                return this.read += 4,
                t
            }
            ,
            u.ByteStringBuffer.prototype.getInt = function(t) {
                a(t);
                var e = 0;
                do {
                    e = (e << 8) + this.data.charCodeAt(this.read++),
                    t -= 8
                } while (t > 0);
                return e
            }
            ,
            u.ByteStringBuffer.prototype.getSignedInt = function(t) {
                var e = this.getInt(t)
                  , r = 2 << t - 2;
                return e >= r && (e -= r << 1),
                e
            }
            ,
            u.ByteStringBuffer.prototype.getBytes = function(t) {
                var e;
                return t ? (t = Math.min(this.length(), t),
                e = this.data.slice(this.read, this.read + t),
                this.read += t) : 0 === t ? e = "" : (e = 0 === this.read ? this.data : this.data.slice(this.read),
                this.clear()),
                e
            }
            ,
            u.ByteStringBuffer.prototype.bytes = function(t) {
                return void 0 === t ? this.data.slice(this.read) : this.data.slice(this.read, this.read + t)
            }
            ,
            u.ByteStringBuffer.prototype.at = function(t) {
                return this.data.charCodeAt(this.read + t)
            }
            ,
            u.ByteStringBuffer.prototype.setAt = function(t, e) {
                return this.data = this.data.substr(0, this.read + t) + String.fromCharCode(e) + this.data.substr(this.read + t + 1),
                this
            }
            ,
            u.ByteStringBuffer.prototype.last = function() {
                return this.data.charCodeAt(this.data.length - 1)
            }
            ,
            u.ByteStringBuffer.prototype.copy = function() {
                var t = u.createBuffer(this.data);
                return t.read = this.read,
                t
            }
            ,
            u.ByteStringBuffer.prototype.compact = function() {
                return this.read > 0 && (this.data = this.data.slice(this.read),
                this.read = 0),
                this
            }
            ,
            u.ByteStringBuffer.prototype.clear = function() {
                return this.data = "",
                this.read = 0,
                this
            }
            ,
            u.ByteStringBuffer.prototype.truncate = function(t) {
                var e = Math.max(0, this.length() - t);
                return this.data = this.data.substr(this.read, e),
                this.read = 0,
                this
            }
            ,
            u.ByteStringBuffer.prototype.toHex = function() {
                for (var t = "", e = this.read; e < this.data.length; ++e) {
                    var r = this.data.charCodeAt(e);
                    r < 16 && (t += "0"),
                    t += r.toString(16)
                }
                return t
            }
            ,
            u.ByteStringBuffer.prototype.toString = function() {
                return u.decodeUtf8(this.bytes())
            }
            ,
            u.DataBuffer = n,
            u.DataBuffer.prototype.length = function() {
                return this.write - this.read
            }
            ,
            u.DataBuffer.prototype.isEmpty = function() {
                return this.length() <= 0
            }
            ,
            u.DataBuffer.prototype.accommodate = function(t, e) {
                if (this.length() >= t)
                    return this;
                e = Math.max(e || this.growSize, t);
                var r = new Uint8Array(this.data.buffer,this.data.byteOffset,this.data.byteLength)
                  , a = new Uint8Array(this.length() + e);
                return a.set(r),
                this.data = new DataView(a.buffer),
                this
            }
            ,
            u.DataBuffer.prototype.putByte = function(t) {
                return this.accommodate(1),
                this.data.setUint8(this.write++, t),
                this
            }
            ,
            u.DataBuffer.prototype.fillWithByte = function(t, e) {
                this.accommodate(e);
                for (var r = 0; r < e; ++r)
                    this.data.setUint8(t);
                return this
            }
            ,
            u.DataBuffer.prototype.putBytes = function(t, e) {
                if (u.isArrayBufferView(t)) {
                    var r = new Uint8Array(t.buffer,t.byteOffset,t.byteLength)
                      , a = r.byteLength - r.byteOffset;
                    this.accommodate(a);
                    var i = new Uint8Array(this.data.buffer,this.write);
                    return i.set(r),
                    this.write += a,
                    this
                }
                if (u.isArrayBuffer(t)) {
                    var r = new Uint8Array(t);
                    this.accommodate(r.byteLength);
                    var i = new Uint8Array(this.data.buffer);
                    return i.set(r, this.write),
                    this.write += r.byteLength,
                    this
                }
                if (t instanceof u.DataBuffer || "object" == typeof t && "number" == typeof t.read && "number" == typeof t.write && u.isArrayBufferView(t.data)) {
                    var r = new Uint8Array(t.data.byteLength,t.read,t.length());
                    this.accommodate(r.byteLength);
                    var i = new Uint8Array(t.data.byteLength,this.write);
                    return i.set(r),
                    this.write += r.byteLength,
                    this
                }
                if (t instanceof u.ByteStringBuffer && (t = t.data,
                e = "binary"),
                e = e || "binary",
                "string" == typeof t) {
                    var n;
                    if ("hex" === e)
                        return this.accommodate(Math.ceil(t.length / 2)),
                        n = new Uint8Array(this.data.buffer,this.write),
                        this.write += u.binary.hex.decode(t, n, this.write),
                        this;
                    if ("base64" === e)
                        return this.accommodate(3 * Math.ceil(t.length / 4)),
                        n = new Uint8Array(this.data.buffer,this.write),
                        this.write += u.binary.base64.decode(t, n, this.write),
                        this;
                    if ("utf8" === e && (t = u.encodeUtf8(t),
                    e = "binary"),
                    "binary" === e || "raw" === e)
                        return this.accommodate(t.length),
                        n = new Uint8Array(this.data.buffer,this.write),
                        this.write += u.binary.raw.decode(n),
                        this;
                    if ("utf16" === e)
                        return this.accommodate(2 * t.length),
                        n = new Uint16Array(this.data.buffer,this.write),
                        this.write += u.text.utf16.encode(n),
                        this;
                    throw new Error("Invalid encoding: " + e)
                }
                throw Error("Invalid parameter: " + t)
            }
            ,
            u.DataBuffer.prototype.putBuffer = function(t) {
                return this.putBytes(t),
                t.clear(),
                this
            }
            ,
            u.DataBuffer.prototype.putString = function(t) {
                return this.putBytes(t, "utf16")
            }
            ,
            u.DataBuffer.prototype.putInt16 = function(t) {
                return this.accommodate(2),
                this.data.setInt16(this.write, t),
                this.write += 2,
                this
            }
            ,
            u.DataBuffer.prototype.putInt24 = function(t) {
                return this.accommodate(3),
                this.data.setInt16(this.write, t >> 8 & 65535),
                this.data.setInt8(this.write, t >> 16 & 255),
                this.write += 3,
                this
            }
            ,
            u.DataBuffer.prototype.putInt32 = function(t) {
                return this.accommodate(4),
                this.data.setInt32(this.write, t),
                this.write += 4,
                this
            }
            ,
            u.DataBuffer.prototype.putInt16Le = function(t) {
                return this.accommodate(2),
                this.data.setInt16(this.write, t, !0),
                this.write += 2,
                this
            }
            ,
            u.DataBuffer.prototype.putInt24Le = function(t) {
                return this.accommodate(3),
                this.data.setInt8(this.write, t >> 16 & 255),
                this.data.setInt16(this.write, t >> 8 & 65535, !0),
                this.write += 3,
                this
            }
            ,
            u.DataBuffer.prototype.putInt32Le = function(t) {
                return this.accommodate(4),
                this.data.setInt32(this.write, t, !0),
                this.write += 4,
                this
            }
            ,
            u.DataBuffer.prototype.putInt = function(t, e) {
                a(e),
                this.accommodate(e / 8);
                do {
                    e -= 8,
                    this.data.setInt8(this.write++, t >> e & 255)
                } while (e > 0);
                return this
            }
            ,
            u.DataBuffer.prototype.putSignedInt = function(t, e) {
                return a(e),
                this.accommodate(e / 8),
                t < 0 && (t += 2 << e - 1),
                this.putInt(t, e)
            }
            ,
            u.DataBuffer.prototype.getByte = function() {
                return this.data.getInt8(this.read++)
            }
            ,
            u.DataBuffer.prototype.getInt16 = function() {
                var t = this.data.getInt16(this.read);
                return this.read += 2,
                t
            }
            ,
            u.DataBuffer.prototype.getInt24 = function() {
                var t = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
                return this.read += 3,
                t
            }
            ,
            u.DataBuffer.prototype.getInt32 = function() {
                var t = this.data.getInt32(this.read);
                return this.read += 4,
                t
            }
            ,
            u.DataBuffer.prototype.getInt16Le = function() {
                var t = this.data.getInt16(this.read, !0);
                return this.read += 2,
                t
            }
            ,
            u.DataBuffer.prototype.getInt24Le = function() {
                var t = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, !0) << 8;
                return this.read += 3,
                t
            }
            ,
            u.DataBuffer.prototype.getInt32Le = function() {
                var t = this.data.getInt32(this.read, !0);
                return this.read += 4,
                t
            }
            ,
            u.DataBuffer.prototype.getInt = function(t) {
                a(t);
                var e = 0;
                do {
                    e = (e << 8) + this.data.getInt8(this.read++),
                    t -= 8
                } while (t > 0);
                return e
            }
            ,
            u.DataBuffer.prototype.getSignedInt = function(t) {
                var e = this.getInt(t)
                  , r = 2 << t - 2;
                return e >= r && (e -= r << 1),
                e
            }
            ,
            u.DataBuffer.prototype.getBytes = function(t) {
                var e;
                return t ? (t = Math.min(this.length(), t),
                e = this.data.slice(this.read, this.read + t),
                this.read += t) : 0 === t ? e = "" : (e = 0 === this.read ? this.data : this.data.slice(this.read),
                this.clear()),
                e
            }
            ,
            u.DataBuffer.prototype.bytes = function(t) {
                return void 0 === t ? this.data.slice(this.read) : this.data.slice(this.read, this.read + t)
            }
            ,
            u.DataBuffer.prototype.at = function(t) {
                return this.data.getUint8(this.read + t)
            }
            ,
            u.DataBuffer.prototype.setAt = function(t, e) {
                return this.data.setUint8(t, e),
                this
            }
            ,
            u.DataBuffer.prototype.last = function() {
                return this.data.getUint8(this.write - 1)
            }
            ,
            u.DataBuffer.prototype.copy = function() {
                return new u.DataBuffer(this)
            }
            ,
            u.DataBuffer.prototype.compact = function() {
                if (this.read > 0) {
                    var t = new Uint8Array(this.data.buffer,this.read)
                      , e = new Uint8Array(t.byteLength);
                    e.set(t),
                    this.data = new DataView(e),
                    this.write -= this.read,
                    this.read = 0
                }
                return this
            }
            ,
            u.DataBuffer.prototype.clear = function() {
                return this.data = new DataView(new ArrayBuffer(0)),
                this.read = this.write = 0,
                this
            }
            ,
            u.DataBuffer.prototype.truncate = function(t) {
                return this.write = Math.max(0, this.length() - t),
                this.read = Math.min(this.read, this.write),
                this
            }
            ,
            u.DataBuffer.prototype.toHex = function() {
                for (var t = "", e = this.read; e < this.data.byteLength; ++e) {
                    var r = this.data.getUint8(e);
                    r < 16 && (t += "0"),
                    t += r.toString(16)
                }
                return t
            }
            ,
            u.DataBuffer.prototype.toString = function(t) {
                var e = new Uint8Array(this.data,this.read,this.length());
                if ("binary" === (t = t || "utf8") || "raw" === t)
                    return u.binary.raw.encode(e);
                if ("hex" === t)
                    return u.binary.hex.encode(e);
                if ("base64" === t)
                    return u.binary.base64.encode(e);
                if ("utf8" === t)
                    return u.text.utf8.decode(e);
                if ("utf16" === t)
                    return u.text.utf16.decode(e);
                throw new Error("Invalid encoding: " + t)
            }
            ,
            u.createBuffer = function(t, e) {
                return e = e || "raw",
                void 0 !== t && "utf8" === e && (t = u.encodeUtf8(t)),
                new u.ByteBuffer(t)
            }
            ,
            u.fillString = function(t, e) {
                for (var r = ""; e > 0; )
                    1 & e && (r += t),
                    (e >>>= 1) > 0 && (t += t);
                return r
            }
            ,
            u.xorBytes = function(t, e, r) {
                for (var a = "", i = "", n = "", s = 0, o = 0; r > 0; --r,
                ++s)
                    i = t.charCodeAt(s) ^ e.charCodeAt(s),
                    o >= 10 && (a += n,
                    n = "",
                    o = 0),
                    n += String.fromCharCode(i),
                    ++o;
                return a += n
            }
            ,
            u.hexToBytes = function(t) {
                var e = ""
                  , r = 0;
                for (!0 & t.length && (r = 1,
                e += String.fromCharCode(parseInt(t[0], 16))); r < t.length; r += 2)
                    e += String.fromCharCode(parseInt(t.substr(r, 2), 16));
                return e
            }
            ,
            u.bytesToHex = function(t) {
                return u.createBuffer(t).toHex()
            }
            ,
            u.int32ToBytes = function(t) {
                return String.fromCharCode(t >> 24 & 255) + String.fromCharCode(t >> 16 & 255) + String.fromCharCode(t >> 8 & 255) + String.fromCharCode(255 & t)
            }
            ;
            var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
              , l = [62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
              , h = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
            u.encode64 = function(t, e) {
                for (var r, a, i, n = "", s = "", o = 0; o < t.length; )
                    r = t.charCodeAt(o++),
                    a = t.charCodeAt(o++),
                    i = t.charCodeAt(o++),
                    n += c.charAt(r >> 2),
                    n += c.charAt((3 & r) << 4 | a >> 4),
                    isNaN(a) ? n += "==" : (n += c.charAt((15 & a) << 2 | i >> 6),
                    n += isNaN(i) ? "=" : c.charAt(63 & i)),
                    e && n.length > e && (s += n.substr(0, e) + "\r\n",
                    n = n.substr(e));
                return s += n
            }
            ,
            u.decode64 = function(t) {
                t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                for (var e, r, a, i, n = "", s = 0; s < t.length; )
                    e = l[t.charCodeAt(s++) - 43],
                    r = l[t.charCodeAt(s++) - 43],
                    a = l[t.charCodeAt(s++) - 43],
                    i = l[t.charCodeAt(s++) - 43],
                    n += String.fromCharCode(e << 2 | r >> 4),
                    64 !== a && (n += String.fromCharCode((15 & r) << 4 | a >> 2),
                    64 !== i && (n += String.fromCharCode((3 & a) << 6 | i)));
                return n
            }
            ,
            u.encodeUtf8 = function(t) {
                return unescape(encodeURIComponent(t))
            }
            ,
            u.decodeUtf8 = function(t) {
                return decodeURIComponent(escape(t))
            }
            ,
            u.binary = {
                raw: {},
                hex: {},
                base64: {},
                base58: {},
                baseN: {
                    encode: o.encode,
                    decode: o.decode
                }
            },
            u.binary.raw.encode = function(t) {
                return String.fromCharCode.apply(null, t)
            }
            ,
            u.binary.raw.decode = function(t, e, r) {
                var a = e;
                a || (a = new Uint8Array(t.length)),
                r = r || 0;
                for (var i = r, n = 0; n < t.length; ++n)
                    a[i++] = t.charCodeAt(n);
                return e ? i - r : a
            }
            ,
            u.binary.hex.encode = u.bytesToHex,
            u.binary.hex.decode = function(t, e, r) {
                var a = e;
                a || (a = new Uint8Array(Math.ceil(t.length / 2))),
                r = r || 0;
                var i = 0
                  , n = r;
                for (1 & t.length && (i = 1,
                a[n++] = parseInt(t[0], 16)); i < t.length; i += 2)
                    a[n++] = parseInt(t.substr(i, 2), 16);
                return e ? n - r : a
            }
            ,
            u.binary.base64.encode = function(t, e) {
                for (var r, a, i, n = "", s = "", o = 0; o < t.byteLength; )
                    r = t[o++],
                    a = t[o++],
                    i = t[o++],
                    n += c.charAt(r >> 2),
                    n += c.charAt((3 & r) << 4 | a >> 4),
                    isNaN(a) ? n += "==" : (n += c.charAt((15 & a) << 2 | i >> 6),
                    n += isNaN(i) ? "=" : c.charAt(63 & i)),
                    e && n.length > e && (s += n.substr(0, e) + "\r\n",
                    n = n.substr(e));
                return s += n
            }
            ,
            u.binary.base64.decode = function(t, e, r) {
                var a = e;
                a || (a = new Uint8Array(3 * Math.ceil(t.length / 4))),
                t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""),
                r = r || 0;
                for (var i, n, s, o, u = 0, c = r; u < t.length; )
                    i = l[t.charCodeAt(u++) - 43],
                    n = l[t.charCodeAt(u++) - 43],
                    s = l[t.charCodeAt(u++) - 43],
                    o = l[t.charCodeAt(u++) - 43],
                    a[c++] = i << 2 | n >> 4,
                    64 !== s && (a[c++] = (15 & n) << 4 | s >> 2,
                    64 !== o && (a[c++] = (3 & s) << 6 | o));
                return e ? c - r : a.subarray(0, c)
            }
            ,
            u.binary.base58.encode = function(t, e) {
                return u.binary.baseN.encode(t, h, e)
            }
            ,
            u.binary.base58.decode = function(t, e) {
                return u.binary.baseN.decode(t, h, e)
            }
            ,
            u.text = {
                utf8: {},
                utf16: {}
            },
            u.text.utf8.encode = function(t, e, r) {
                t = u.encodeUtf8(t);
                var a = e;
                a || (a = new Uint8Array(t.length)),
                r = r || 0;
                for (var i = r, n = 0; n < t.length; ++n)
                    a[i++] = t.charCodeAt(n);
                return e ? i - r : a
            }
            ,
            u.text.utf8.decode = function(t) {
                return u.decodeUtf8(String.fromCharCode.apply(null, t))
            }
            ,
            u.text.utf16.encode = function(t, e, r) {
                var a = e;
                a || (a = new Uint8Array(2 * t.length));
                var i = new Uint16Array(a.buffer);
                r = r || 0;
                for (var n = r, s = r, o = 0; o < t.length; ++o)
                    i[s++] = t.charCodeAt(o),
                    n += 2;
                return e ? n - r : a
            }
            ,
            u.text.utf16.decode = function(t) {
                return String.fromCharCode.apply(null, new Uint16Array(t.buffer))
            }
            ,
            u.deflate = function(t, e, r) {
                if (e = u.decode64(t.deflate(u.encode64(e)).rval),
                r) {
                    var a = 2;
                    32 & e.charCodeAt(1) && (a = 6),
                    e = e.substring(a, e.length - 4)
                }
                return e
            }
            ,
            u.inflate = function(t, e, r) {
                var a = t.inflate(u.encode64(e)).rval;
                return null === a ? null : u.decode64(a)
            }
            ;
            var p = function(t, e, r) {
                if (!t)
                    throw new Error("WebStorage not available.");
                var a;
                if (null === r ? a = t.removeItem(e) : (r = u.encode64(JSON.stringify(r)),
                a = t.setItem(e, r)),
                void 0 !== a && !0 !== a.rval) {
                    var i = new Error(a.error.message);
                    throw i.id = a.error.id,
                    i.name = a.error.name,
                    i
                }
            }
              , f = function(t, e) {
                if (!t)
                    throw new Error("WebStorage not available.");
                var r = t.getItem(e);
                if (t.init)
                    if (null === r.rval) {
                        if (r.error) {
                            var a = new Error(r.error.message);
                            throw a.id = r.error.id,
                            a.name = r.error.name,
                            a
                        }
                        r = null
                    } else
                        r = r.rval;
                return null !== r && (r = JSON.parse(u.decode64(r))),
                r
            }
              , d = function(t, e, r, a) {
                var i = f(t, e);
                null === i && (i = {}),
                i[r] = a,
                p(t, e, i)
            }
              , y = function(t, e, r) {
                var a = f(t, e);
                return null !== a && (a = r in a ? a[r] : null),
                a
            }
              , g = function(t, e, r) {
                var a = f(t, e);
                if (null !== a && r in a) {
                    delete a[r];
                    var i = !0;
                    for (var n in a) {
                        i = !1;
                        break
                    }
                    i && (a = null),
                    p(t, e, a)
                }
            }
              , m = function(t, e) {
                p(t, e, null)
            }
              , v = function(t, e, r) {
                var a = null;
                void 0 === r && (r = ["web", "flash"]);
                var i, n = !1, s = null;
                for (var o in r) {
                    i = r[o];
                    try {
                        if ("flash" === i || "both" === i) {
                            if (null === e[0])
                                throw new Error("Flash local storage not available.");
                            a = t.apply(this, e),
                            n = "flash" === i
                        }
                        "web" !== i && "both" !== i || (e[0] = localStorage,
                        a = t.apply(this, e),
                        n = !0)
                    } catch (t) {
                        s = t
                    }
                    if (n)
                        break
                }
                if (!n)
                    throw s;
                return a
            };
            u.setItem = function(t, e, r, a, i) {
                v(d, arguments, i)
            }
            ,
            u.getItem = function(t, e, r, a) {
                return v(y, arguments, a)
            }
            ,
            u.removeItem = function(t, e, r, a) {
                v(g, arguments, a)
            }
            ,
            u.clearItems = function(t, e, r) {
                v(m, arguments, r)
            }
            ,
            u.parseUrl = function(t) {
                var e = /^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;
                e.lastIndex = 0;
                var r = e.exec(t)
                  , a = null === r ? null : {
                    full: t,
                    scheme: r[1],
                    host: r[2],
                    port: r[3],
                    path: r[4]
                };
                return a && (a.fullHost = a.host,
                a.port ? 80 !== a.port && "http" === a.scheme ? a.fullHost += ":" + a.port : 443 !== a.port && "https" === a.scheme && (a.fullHost += ":" + a.port) : "http" === a.scheme ? a.port = 80 : "https" === a.scheme && (a.port = 443),
                a.full = a.scheme + "://" + a.fullHost),
                a
            }
            ;
            var C = null;
            u.getQueryVariables = function(t) {
                var e, r = function(t) {
                    for (var e = {}, r = t.split("&"), a = 0; a < r.length; a++) {
                        var i, n, s = r[a].indexOf("=");
                        s > 0 ? (i = r[a].substring(0, s),
                        n = r[a].substring(s + 1)) : (i = r[a],
                        n = null),
                        i in e || (e[i] = []),
                        i in Object.prototype || null === n || e[i].push(unescape(n))
                    }
                    return e
                };
                return void 0 === t ? (null === C && (C = "undefined" != typeof window && window.location && window.location.search ? r(window.location.search.substring(1)) : {}),
                e = C) : e = r(t),
                e
            }
            ,
            u.parseFragment = function(t) {
                var e = t
                  , r = ""
                  , a = t.indexOf("?");
                a > 0 && (e = t.substring(0, a),
                r = t.substring(a + 1));
                var i = e.split("/");
                return i.length > 0 && "" === i[0] && i.shift(),
                {
                    pathString: e,
                    queryString: r,
                    path: i,
                    query: "" === r ? {} : u.getQueryVariables(r)
                }
            }
            ,
            u.makeRequest = function(t) {
                var e = u.parseFragment(t)
                  , r = {
                    path: e.pathString,
                    query: e.queryString,
                    getPath: function(t) {
                        return void 0 === t ? e.path : e.path[t]
                    },
                    getQuery: function(t, r) {
                        var a;
                        return void 0 === t ? a = e.query : (a = e.query[t]) && void 0 !== r && (a = a[r]),
                        a
                    },
                    getQueryLast: function(t, e) {
                        var a = r.getQuery(t);
                        return a ? a[a.length - 1] : e
                    }
                };
                return r
            }
            ,
            u.makeLink = function(t, e, r) {
                t = jQuery.isArray(t) ? t.join("/") : t;
                var a = jQuery.param(e || {});
                return r = r || "",
                t + (a.length > 0 ? "?" + a : "") + (r.length > 0 ? "#" + r : "")
            }
            ,
            u.setPath = function(t, e, r) {
                if ("object" == typeof t && null !== t)
                    for (var a = 0, i = e.length; a < i; ) {
                        var n = e[a++];
                        if (a == i)
                            t[n] = r;
                        else {
                            var s = n in t;
                            (!s || s && "object" != typeof t[n] || s && null === t[n]) && (t[n] = {}),
                            t = t[n]
                        }
                    }
            }
            ,
            u.getPath = function(t, e, r) {
                for (var a = 0, i = e.length, n = !0; n && a < i && "object" == typeof t && null !== t; ) {
                    var s = e[a++];
                    n = s in t,
                    n && (t = t[s])
                }
                return n ? t : r
            }
            ,
            u.deletePath = function(t, e) {
                if ("object" == typeof t && null !== t)
                    for (var r = 0, a = e.length; r < a; ) {
                        var i = e[r++];
                        if (r == a)
                            delete t[i];
                        else {
                            if (!(i in t) || "object" != typeof t[i] || null === t[i])
                                break;
                            t = t[i]
                        }
                    }
            }
            ,
            u.isEmpty = function(t) {
                for (var e in t)
                    if (t.hasOwnProperty(e))
                        return !1;
                return !0
            }
            ,
            u.format = function(t) {
                for (var e, r, a = /%./g, i = 0, n = [], s = 0; e = a.exec(t); ) {
                    r = t.substring(s, a.lastIndex - 2),
                    r.length > 0 && n.push(r),
                    s = a.lastIndex;
                    var o = e[0][1];
                    switch (o) {
                    case "s":
                    case "o":
                        i < arguments.length ? n.push(arguments[1 + i++]) : n.push("<?>");
                        break;
                    case "%":
                        n.push("%");
                        break;
                    default:
                        n.push("<%" + o + "?>")
                    }
                }
                return n.push(t.substring(s)),
                n.join("")
            }
            ,
            u.formatNumber = function(t, e, r, a) {
                var i = t
                  , n = isNaN(e = Math.abs(e)) ? 2 : e
                  , s = void 0 === r ? "," : r
                  , o = void 0 === a ? "." : a
                  , u = i < 0 ? "-" : ""
                  , c = parseInt(i = Math.abs(+i || 0).toFixed(n), 10) + ""
                  , l = c.length > 3 ? c.length % 3 : 0;
                return u + (l ? c.substr(0, l) + o : "") + c.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + o) + (n ? s + Math.abs(i - c).toFixed(n).slice(2) : "")
            }
            ,
            u.formatSize = function(t) {
                return t = t >= 1073741824 ? u.formatNumber(t / 1073741824, 2, ".", "") + " GiB" : t >= 1048576 ? u.formatNumber(t / 1048576, 2, ".", "") + " MiB" : t >= 1024 ? u.formatNumber(t / 1024, 0) + " KiB" : u.formatNumber(t, 0) + " bytes"
            }
            ,
            u.bytesFromIP = function(t) {
                return -1 !== t.indexOf(".") ? u.bytesFromIPv4(t) : -1 !== t.indexOf(":") ? u.bytesFromIPv6(t) : null
            }
            ,
            u.bytesFromIPv4 = function(t) {
                if (t = t.split("."),
                4 !== t.length)
                    return null;
                for (var e = u.createBuffer(), r = 0; r < t.length; ++r) {
                    var a = parseInt(t[r], 10);
                    if (isNaN(a))
                        return null;
                    e.putByte(a)
                }
                return e.getBytes()
            }
            ,
            u.bytesFromIPv6 = function(t) {
                var e = 0;
                t = t.split(":").filter(function(t) {
                    return 0 === t.length && ++e,
                    !0
                });
                for (var r = 2 * (8 - t.length + e), a = u.createBuffer(), i = 0; i < 8; ++i)
                    if (t[i] && 0 !== t[i].length) {
                        var n = u.hexToBytes(t[i]);
                        n.length < 2 && a.putByte(0),
                        a.putBytes(n)
                    } else
                        a.fillWithByte(0, r),
                        r = 0;
                return a.getBytes()
            }
            ,
            u.bytesToIP = function(t) {
                return 4 === t.length ? u.bytesToIPv4(t) : 16 === t.length ? u.bytesToIPv6(t) : null
            }
            ,
            u.bytesToIPv4 = function(t) {
                if (4 !== t.length)
                    return null;
                for (var e = [], r = 0; r < t.length; ++r)
                    e.push(t.charCodeAt(r));
                return e.join(".")
            }
            ,
            u.bytesToIPv6 = function(t) {
                if (16 !== t.length)
                    return null;
                for (var e = [], r = [], a = 0, i = 0; i < t.length; i += 2) {
                    for (var n = u.bytesToHex(t[i] + t[i + 1]); "0" === n[0] && "0" !== n; )
                        n = n.substr(1);
                    if ("0" === n) {
                        var s = r[r.length - 1]
                          , o = e.length;
                        s && o === s.end + 1 ? (s.end = o,
                        s.end - s.start > r[a].end - r[a].start && (a = r.length - 1)) : r.push({
                            start: o,
                            end: o
                        })
                    }
                    e.push(n)
                }
                if (r.length > 0) {
                    var c = r[a];
                    c.end - c.start > 0 && (e.splice(c.start, c.end - c.start + 1, ""),
                    0 === c.start && e.unshift(""),
                    7 === c.end && e.push(""))
                }
                return e.join(":")
            }
            ,
            u.estimateCores = function(t, e) {
                function r(t, s, o) {
                    if (0 === s) {
                        var c = Math.floor(t.reduce(function(t, e) {
                            return t + e
                        }, 0) / t.length);
                        return u.cores = Math.max(1, c),
                        URL.revokeObjectURL(n),
                        e(null, u.cores)
                    }
                    a(o, function(e, a) {
                        t.push(i(o, a)),
                        r(t, s - 1, o)
                    })
                }
                function a(t, e) {
                    for (var r = [], a = [], i = 0; i < t; ++i) {
                        var s = new Worker(n);
                        s.addEventListener("message", function(i) {
                            if (a.push(i.data),
                            a.length === t) {
                                for (var n = 0; n < t; ++n)
                                    r[n].terminate();
                                e(null, a)
                            }
                        }),
                        r.push(s)
                    }
                    for (var i = 0; i < t; ++i)
                        r[i].postMessage(i)
                }
                function i(t, e) {
                    for (var r = [], a = 0; a < t; ++a)
                        for (var i = e[a], n = r[a] = [], s = 0; s < t; ++s)
                            if (a !== s) {
                                var o = e[s];
                                (i.st > o.st && i.st < o.et || o.st > i.st && o.st < i.et) && n.push(s)
                            }
                    return r.reduce(function(t, e) {
                        return Math.max(t, e.length)
                    }, 0)
                }
                if ("function" == typeof t && (e = t,
                t = {}),
                t = t || {},
                "cores"in u && !t.update)
                    return e(null, u.cores);
                if ("undefined" != typeof navigator && "hardwareConcurrency"in navigator && navigator.hardwareConcurrency > 0)
                    return u.cores = navigator.hardwareConcurrency,
                    e(null, u.cores);
                if ("undefined" == typeof Worker)
                    return u.cores = 1,
                    e(null, u.cores);
                if ("undefined" == typeof Blob)
                    return u.cores = 2,
                    e(null, u.cores);
                var n = URL.createObjectURL(new Blob(["(", function() {
                    self.addEventListener("message", function(t) {
                        for (var e = Date.now(), r = e + 4; Date.now() < r; )
                            ;
                        self.postMessage({
                            st: e,
                            et: r
                        })
                    })
                }
                .toString(), ")()"],{
                    type: "application/javascript"
                }));
                r([], 5, 16)
            }
        }
        ).call(e, r(24))
    }
    , function(t, e, r) {
        var a = r(0);
        t.exports = a.md = a.md || {},
        a.md.algorithms = a.md.algorithms || {}
    }
    , function(t, e, r) {
        function a(t, e, r) {
            if (r > e) {
                var a = new Error("Too few bytes to parse DER.");
                throw a.available = t.length(),
                a.remaining = e,
                a.requested = r,
                a
            }
        }
        function i(t, e, r, n) {
            var u;
            a(t, e, 2);
            var c = t.getByte();
            e--;
            var l = 192 & c
              , h = 31 & c;
            u = t.length();
            var p = o(t, e);
            if (e -= u - t.length(),
            void 0 !== p && p > e) {
                if (n.strict) {
                    var f = new Error("Too few bytes to read ASN.1 value.");
                    throw f.available = t.length(),
                    f.remaining = e,
                    f.requested = p,
                    f
                }
                p = e
            }
            var d, y, g = 32 == (32 & c);
            if (g)
                if (d = [],
                void 0 === p)
                    for (; ; ) {
                        if (a(t, e, 2),
                        t.bytes(2) === String.fromCharCode(0, 0)) {
                            t.getBytes(2),
                            e -= 2;
                            break
                        }
                        u = t.length(),
                        d.push(i(t, e, r + 1, n)),
                        e -= u - t.length()
                    }
                else
                    for (; p > 0; )
                        u = t.length(),
                        d.push(i(t, p, r + 1, n)),
                        e -= u - t.length(),
                        p -= u - t.length();
            if (void 0 === d && l === s.Class.UNIVERSAL && h === s.Type.BITSTRING && (y = t.bytes(p)),
            void 0 === d && n.decodeBitStrings && l === s.Class.UNIVERSAL && h === s.Type.BITSTRING && p > 1) {
                var m = t.read
                  , v = e
                  , C = 0;
                if (h === s.Type.BITSTRING && (a(t, e, 1),
                C = t.getByte(),
                e--),
                0 === C)
                    try {
                        u = t.length();
                        var E = {
                            verbose: n.verbose,
                            strict: !0,
                            decodeBitStrings: !0
                        }
                          , S = i(t, e, r + 1, E)
                          , T = u - t.length();
                        e -= T,
                        h == s.Type.BITSTRING && T++;
                        var I = S.tagClass;
                        T !== p || I !== s.Class.UNIVERSAL && I !== s.Class.CONTEXT_SPECIFIC || (d = [S])
                    } catch (t) {}
                void 0 === d && (t.read = m,
                e = v)
            }
            if (void 0 === d) {
                if (void 0 === p) {
                    if (n.strict)
                        throw new Error("Non-constructed ASN.1 object of indefinite length.");
                    p = e
                }
                if (h === s.Type.BMPSTRING)
                    for (d = ""; p > 0; p -= 2)
                        a(t, e, 2),
                        d += String.fromCharCode(t.getInt16()),
                        e -= 2;
                else
                    d = t.getBytes(p)
            }
            var b = void 0 === y ? null : {
                bitStringContents: y
            };
            return s.create(l, h, g, d, b)
        }
        var n = r(0);
        r(1),
        r(5);
        var s = t.exports = n.asn1 = n.asn1 || {};
        s.Class = {
            UNIVERSAL: 0,
            APPLICATION: 64,
            CONTEXT_SPECIFIC: 128,
            PRIVATE: 192
        },
        s.Type = {
            NONE: 0,
            BOOLEAN: 1,
            INTEGER: 2,
            BITSTRING: 3,
            OCTETSTRING: 4,
            NULL: 5,
            OID: 6,
            ODESC: 7,
            EXTERNAL: 8,
            REAL: 9,
            ENUMERATED: 10,
            EMBEDDED: 11,
            UTF8: 12,
            ROID: 13,
            SEQUENCE: 16,
            SET: 17,
            PRINTABLESTRING: 19,
            IA5STRING: 22,
            UTCTIME: 23,
            GENERALIZEDTIME: 24,
            BMPSTRING: 30
        },
        s.create = function(t, e, r, a, i) {
            if (n.util.isArray(a)) {
                for (var o = [], u = 0; u < a.length; ++u)
                    void 0 !== a[u] && o.push(a[u]);
                a = o
            }
            var c = {
                tagClass: t,
                type: e,
                constructed: r,
                composed: r || n.util.isArray(a),
                value: a
            };
            return i && "bitStringContents"in i && (c.bitStringContents = i.bitStringContents,
            c.original = s.copy(c)),
            c
        }
        ,
        s.copy = function(t, e) {
            var r;
            if (n.util.isArray(t)) {
                r = [];
                for (var a = 0; a < t.length; ++a)
                    r.push(s.copy(t[a], e));
                return r
            }
            return "string" == typeof t ? t : (r = {
                tagClass: t.tagClass,
                type: t.type,
                constructed: t.constructed,
                composed: t.composed,
                value: s.copy(t.value, e)
            },
            e && !e.excludeBitStringContents && (r.bitStringContents = t.bitStringContents),
            r)
        }
        ,
        s.equals = function(t, e, r) {
            if (n.util.isArray(t)) {
                if (!n.util.isArray(e))
                    return !1;
                if (t.length !== e.length)
                    return !1;
                for (var a = 0; a < t.length; ++a)
                    if (!s.equals(t[a], e[a]))
                        return !1;
                return !0
            }
            if (typeof t != typeof e)
                return !1;
            if ("string" == typeof t)
                return t === e;
            var i = t.tagClass === e.tagClass && t.type === e.type && t.constructed === e.constructed && t.composed === e.composed && s.equals(t.value, e.value);
            return r && r.includeBitStringContents && (i = i && t.bitStringContents === e.bitStringContents),
            i
        }
        ,
        s.getBerValueLength = function(t) {
            var e = t.getByte();
            if (128 !== e) {
                return 128 & e ? t.getInt((127 & e) << 3) : e
            }
        }
        ;
        var o = function(t, e) {
            var r = t.getByte();
            if (e--,
            128 !== r) {
                var i;
                if (128 & r) {
                    var n = 127 & r;
                    a(t, e, n),
                    i = t.getInt(n << 3)
                } else
                    i = r;
                if (i < 0)
                    throw new Error("Negative length: " + i);
                return i
            }
        };
        s.fromDer = function(t, e) {
            return void 0 === e && (e = {
                strict: !0,
                decodeBitStrings: !0
            }),
            "boolean" == typeof e && (e = {
                strict: e,
                decodeBitStrings: !0
            }),
            "strict"in e || (e.strict = !0),
            "decodeBitStrings"in e || (e.decodeBitStrings = !0),
            "string" == typeof t && (t = n.util.createBuffer(t)),
            i(t, t.length(), 0, e)
        }
        ,
        s.toDer = function(t) {
            var e = n.util.createBuffer()
              , r = t.tagClass | t.type
              , a = n.util.createBuffer()
              , i = !1;
            if ("bitStringContents"in t && (i = !0,
            t.original && (i = s.equals(t, t.original))),
            i)
                a.putBytes(t.bitStringContents);
            else if (t.composed) {
                t.constructed ? r |= 32 : a.putByte(0);
                for (var o = 0; o < t.value.length; ++o)
                    void 0 !== t.value[o] && a.putBuffer(s.toDer(t.value[o]))
            } else if (t.type === s.Type.BMPSTRING)
                for (var o = 0; o < t.value.length; ++o)
                    a.putInt16(t.value.charCodeAt(o));
            else
                t.type === s.Type.INTEGER && t.value.length > 1 && (0 === t.value.charCodeAt(0) && 0 == (128 & t.value.charCodeAt(1)) || 255 === t.value.charCodeAt(0) && 128 == (128 & t.value.charCodeAt(1))) ? a.putBytes(t.value.substr(1)) : a.putBytes(t.value);
            if (e.putByte(r),
            a.length() <= 127)
                e.putByte(127 & a.length());
            else {
                var u = a.length()
                  , c = "";
                do {
                    c += String.fromCharCode(255 & u),
                    u >>>= 8
                } while (u > 0);
                e.putByte(128 | c.length);
                for (var o = c.length - 1; o >= 0; --o)
                    e.putByte(c.charCodeAt(o))
            }
            return e.putBuffer(a),
            e
        }
        ,
        s.oidToDer = function(t) {
            var e = t.split(".")
              , r = n.util.createBuffer();
            r.putByte(40 * parseInt(e[0], 10) + parseInt(e[1], 10));
            for (var a, i, s, o, u = 2; u < e.length; ++u) {
                a = !0,
                i = [],
                s = parseInt(e[u], 10);
                do {
                    o = 127 & s,
                    s >>>= 7,
                    a || (o |= 128),
                    i.push(o),
                    a = !1
                } while (s > 0);
                for (var c = i.length - 1; c >= 0; --c)
                    r.putByte(i[c])
            }
            return r
        }
        ,
        s.derToOid = function(t) {
            var e;
            "string" == typeof t && (t = n.util.createBuffer(t));
            var r = t.getByte();
            e = Math.floor(r / 40) + "." + r % 40;
            for (var a = 0; t.length() > 0; )
                r = t.getByte(),
                a <<= 7,
                128 & r ? a += 127 & r : (e += "." + (a + r),
                a = 0);
            return e
        }
        ,
        s.utcTimeToDate = function(t) {
            var e = new Date
              , r = parseInt(t.substr(0, 2), 10);
            r = r >= 50 ? 1900 + r : 2e3 + r;
            var a = parseInt(t.substr(2, 2), 10) - 1
              , i = parseInt(t.substr(4, 2), 10)
              , n = parseInt(t.substr(6, 2), 10)
              , s = parseInt(t.substr(8, 2), 10)
              , o = 0;
            if (t.length > 11) {
                var u = t.charAt(10)
                  , c = 10;
                "+" !== u && "-" !== u && (o = parseInt(t.substr(10, 2), 10),
                c += 2)
            }
            if (e.setUTCFullYear(r, a, i),
            e.setUTCHours(n, s, o, 0),
            c && ("+" === (u = t.charAt(c)) || "-" === u)) {
                var l = parseInt(t.substr(c + 1, 2), 10)
                  , h = parseInt(t.substr(c + 4, 2), 10)
                  , p = 60 * l + h;
                p *= 6e4,
                "+" === u ? e.setTime(+e - p) : e.setTime(+e + p)
            }
            return e
        }
        ,
        s.generalizedTimeToDate = function(t) {
            var e = new Date
              , r = parseInt(t.substr(0, 4), 10)
              , a = parseInt(t.substr(4, 2), 10) - 1
              , i = parseInt(t.substr(6, 2), 10)
              , n = parseInt(t.substr(8, 2), 10)
              , s = parseInt(t.substr(10, 2), 10)
              , o = parseInt(t.substr(12, 2), 10)
              , u = 0
              , c = 0
              , l = !1;
            "Z" === t.charAt(t.length - 1) && (l = !0);
            var h = t.length - 5
              , p = t.charAt(h);
            if ("+" === p || "-" === p) {
                c = 60 * parseInt(t.substr(h + 1, 2), 10) + parseInt(t.substr(h + 4, 2), 10),
                c *= 6e4,
                "+" === p && (c *= -1),
                l = !0
            }
            return "." === t.charAt(14) && (u = 1e3 * parseFloat(t.substr(14), 10)),
            l ? (e.setUTCFullYear(r, a, i),
            e.setUTCHours(n, s, o, u),
            e.setTime(+e + c)) : (e.setFullYear(r, a, i),
            e.setHours(n, s, o, u)),
            e
        }
        ,
        s.dateToUtcTime = function(t) {
            if ("string" == typeof t)
                return t;
            var e = ""
              , r = [];
            r.push(("" + t.getUTCFullYear()).substr(2)),
            r.push("" + (t.getUTCMonth() + 1)),
            r.push("" + t.getUTCDate()),
            r.push("" + t.getUTCHours()),
            r.push("" + t.getUTCMinutes()),
            r.push("" + t.getUTCSeconds());
            for (var a = 0; a < r.length; ++a)
                r[a].length < 2 && (e += "0"),
                e += r[a];
            return e += "Z"
        }
        ,
        s.dateToGeneralizedTime = function(t) {
            if ("string" == typeof t)
                return t;
            var e = ""
              , r = [];
            r.push("" + t.getUTCFullYear()),
            r.push("" + (t.getUTCMonth() + 1)),
            r.push("" + t.getUTCDate()),
            r.push("" + t.getUTCHours()),
            r.push("" + t.getUTCMinutes()),
            r.push("" + t.getUTCSeconds());
            for (var a = 0; a < r.length; ++a)
                r[a].length < 2 && (e += "0"),
                e += r[a];
            return e += "Z"
        }
        ,
        s.integerToDer = function(t) {
            var e = n.util.createBuffer();
            if (t >= -128 && t < 128)
                return e.putSignedInt(t, 8);
            if (t >= -32768 && t < 32768)
                return e.putSignedInt(t, 16);
            if (t >= -8388608 && t < 8388608)
                return e.putSignedInt(t, 24);
            if (t >= -2147483648 && t < 2147483648)
                return e.putSignedInt(t, 32);
            var r = new Error("Integer too large; max is 32-bits.");
            throw r.integer = t,
            r
        }
        ,
        s.derToInteger = function(t) {
            "string" == typeof t && (t = n.util.createBuffer(t));
            var e = 8 * t.length();
            if (e > 32)
                throw new Error("Integer too large; max is 32-bits.");
            return t.getSignedInt(e)
        }
        ,
        s.validate = function(t, e, r, a) {
            var i = !1;
            if (t.tagClass !== e.tagClass && void 0 !== e.tagClass || t.type !== e.type && void 0 !== e.type)
                a && (t.tagClass !== e.tagClass && a.push("[" + e.name + '] Expected tag class "' + e.tagClass + '", got "' + t.tagClass + '"'),
                t.type !== e.type && a.push("[" + e.name + '] Expected type "' + e.type + '", got "' + t.type + '"'));
            else if (t.constructed === e.constructed || void 0 === e.constructed) {
                if (i = !0,
                e.value && n.util.isArray(e.value))
                    for (var o = 0, u = 0; i && u < e.value.length; ++u)
                        i = e.value[u].optional || !1,
                        t.value[o] && (i = s.validate(t.value[o], e.value[u], r, a),
                        i ? ++o : e.value[u].optional && (i = !0)),
                        !i && a && a.push("[" + e.name + '] Tag class "' + e.tagClass + '", type "' + e.type + '" expected value length "' + e.value.length + '", got "' + t.value.length + '"');
                if (i && r && (e.capture && (r[e.capture] = t.value),
                e.captureAsn1 && (r[e.captureAsn1] = t),
                e.captureBitStringContents && "bitStringContents"in t && (r[e.captureBitStringContents] = t.bitStringContents),
                e.captureBitStringValue && "bitStringContents"in t)) {
                    if (t.bitStringContents.length < 2)
                        r[e.captureBitStringValue] = "";
                    else {
                        var c = t.bitStringContents.charCodeAt(0);
                        if (0 !== c)
                            throw new Error("captureBitStringValue only supported for zero unused bits");
                        r[e.captureBitStringValue] = t.bitStringContents.slice(1)
                    }
                }
            } else
                a && a.push("[" + e.name + '] Expected constructed "' + e.constructed + '", got "' + t.constructed + '"');
            return i
        }
        ;
        var u = /[^\\u0000-\\u00ff]/;
        s.prettyPrint = function(t, e, r) {
            var a = "";
            e = e || 0,
            r = r || 2,
            e > 0 && (a += "\n");
            for (var i = "", o = 0; o < e * r; ++o)
                i += " ";
            switch (a += i + "Tag: ",
            t.tagClass) {
            case s.Class.UNIVERSAL:
                a += "Universal:";
                break;
            case s.Class.APPLICATION:
                a += "Application:";
                break;
            case s.Class.CONTEXT_SPECIFIC:
                a += "Context-Specific:";
                break;
            case s.Class.PRIVATE:
                a += "Private:"
            }
            if (t.tagClass === s.Class.UNIVERSAL)
                switch (a += t.type,
                t.type) {
                case s.Type.NONE:
                    a += " (None)";
                    break;
                case s.Type.BOOLEAN:
                    a += " (Boolean)";
                    break;
                case s.Type.INTEGER:
                    a += " (Integer)";
                    break;
                case s.Type.BITSTRING:
                    a += " (Bit string)";
                    break;
                case s.Type.OCTETSTRING:
                    a += " (Octet string)";
                    break;
                case s.Type.NULL:
                    a += " (Null)";
                    break;
                case s.Type.OID:
                    a += " (Object Identifier)";
                    break;
                case s.Type.ODESC:
                    a += " (Object Descriptor)";
                    break;
                case s.Type.EXTERNAL:
                    a += " (External or Instance of)";
                    break;
                case s.Type.REAL:
                    a += " (Real)";
                    break;
                case s.Type.ENUMERATED:
                    a += " (Enumerated)";
                    break;
                case s.Type.EMBEDDED:
                    a += " (Embedded PDV)";
                    break;
                case s.Type.UTF8:
                    a += " (UTF8)";
                    break;
                case s.Type.ROID:
                    a += " (Relative Object Identifier)";
                    break;
                case s.Type.SEQUENCE:
                    a += " (Sequence)";
                    break;
                case s.Type.SET:
                    a += " (Set)";
                    break;
                case s.Type.PRINTABLESTRING:
                    a += " (Printable String)";
                    break;
                case s.Type.IA5String:
                    a += " (IA5String (ASCII))";
                    break;
                case s.Type.UTCTIME:
                    a += " (UTC time)";
                    break;
                case s.Type.GENERALIZEDTIME:
                    a += " (Generalized time)";
                    break;
                case s.Type.BMPSTRING:
                    a += " (BMP String)"
                }
            else
                a += t.type;
            if (a += "\n",
            a += i + "Constructed: " + t.constructed + "\n",
            t.composed) {
                for (var c = 0, l = "", o = 0; o < t.value.length; ++o)
                    void 0 !== t.value[o] && (c += 1,
                    l += s.prettyPrint(t.value[o], e + 1, r),
                    o + 1 < t.value.length && (l += ","));
                a += i + "Sub values: " + c + l
            } else {
                if (a += i + "Value: ",
                t.type === s.Type.OID) {
                    var h = s.derToOid(t.value);
                    a += h,
                    n.pki && n.pki.oids && h in n.pki.oids && (a += " (" + n.pki.oids[h] + ") ")
                }
                if (t.type === s.Type.INTEGER)
                    try {
                        a += s.derToInteger(t.value)
                    } catch (e) {
                        a += "0x" + n.util.bytesToHex(t.value)
                    }
                else if (t.type === s.Type.BITSTRING) {
                    if (t.value.length > 1 ? a += "0x" + n.util.bytesToHex(t.value.slice(1)) : a += "(none)",
                    t.value.length > 0) {
                        var p = t.value.charCodeAt(0);
                        1 == p ? a += " (1 unused bit shown)" : p > 1 && (a += " (" + p + " unused bits shown)")
                    }
                } else
                    t.type === s.Type.OCTETSTRING ? (u.test(t.value) || (a += "(" + t.value + ") "),
                    a += "0x" + n.util.bytesToHex(t.value)) : t.type === s.Type.UTF8 ? a += n.util.decodeUtf8(t.value) : t.type === s.Type.PRINTABLESTRING || t.type === s.Type.IA5String ? a += t.value : u.test(t.value) ? a += "0x" + n.util.bytesToHex(t.value) : 0 === t.value.length ? a += "[null]" : a += t.value
            }
            return a
        }
    }
    , function(t, e, r) {
        var a = r(0);
        r(7),
        r(14),
        r(15),
        r(1),
        function() {
            if (a.random && a.random.getBytes)
                return void (t.exports = a.random);
            !function(e) {
                function r() {
                    var t = a.prng.create(i);
                    return t.getBytes = function(e, r) {
                        return t.generate(e, r)
                    }
                    ,
                    t.getBytesSync = function(e) {
                        return t.generate(e)
                    }
                    ,
                    t
                }
                var i = {}
                  , n = new Array(4)
                  , s = a.util.createBuffer();
                i.formatKey = function(t) {
                    var e = a.util.createBuffer(t);
                    return t = new Array(4),
                    t[0] = e.getInt32(),
                    t[1] = e.getInt32(),
                    t[2] = e.getInt32(),
                    t[3] = e.getInt32(),
                    a.aes._expandKey(t, !1)
                }
                ,
                i.formatSeed = function(t) {
                    var e = a.util.createBuffer(t);
                    return t = new Array(4),
                    t[0] = e.getInt32(),
                    t[1] = e.getInt32(),
                    t[2] = e.getInt32(),
                    t[3] = e.getInt32(),
                    t
                }
                ,
                i.cipher = function(t, e) {
                    return a.aes._updateBlock(t, e, n, !1),
                    s.putInt32(n[0]),
                    s.putInt32(n[1]),
                    s.putInt32(n[2]),
                    s.putInt32(n[3]),
                    s.getBytes()
                }
                ,
                i.increment = function(t) {
                    return ++t[3],
                    t
                }
                ,
                i.md = a.md.sha256;
                var o = r()
                  , u = null
                  , c = a.util.globalScope
                  , l = c.crypto || c.msCrypto;
                if (l && l.getRandomValues && (u = function(t) {
                    return l.getRandomValues(t)
                }
                ),
                a.options.usePureJavaScript || !a.util.isNodejs && !u) {
                    if ("undefined" == typeof window || window.document,
                    o.collectInt(+new Date, 32),
                    "undefined" != typeof navigator) {
                        var h = "";
                        for (var p in navigator)
                            try {
                                "string" == typeof navigator[p] && (h += navigator[p])
                            } catch (t) {}
                        o.collect(h),
                        h = null
                    }
                    e && (e().mousemove(function(t) {
                        o.collectInt(t.clientX, 16),
                        o.collectInt(t.clientY, 16)
                    }),
                    e().keypress(function(t) {
                        o.collectInt(t.charCode, 8)
                    }))
                }
                if (a.random)
                    for (var p in o)
                        a.random[p] = o[p];
                else
                    a.random = o;
                a.random.createInstance = r,
                t.exports = a.random
            }("undefined" != typeof jQuery ? jQuery : null)
        }()
    }
    , function(t, e, r) {
        function a(t, e) {
            s[t] = e,
            s[e] = t
        }
        function i(t, e) {
            s[t] = e
        }
        var n = r(0);
        n.pki = n.pki || {};
        var s = t.exports = n.pki.oids = n.oids = n.oids || {};
        a("1.2.840.113549.1.1.1", "rsaEncryption"),
        a("1.2.840.113549.1.1.4", "md5WithRSAEncryption"),
        a("1.2.840.113549.1.1.5", "sha1WithRSAEncryption"),
        a("1.2.840.113549.1.1.7", "RSAES-OAEP"),
        a("1.2.840.113549.1.1.8", "mgf1"),
        a("1.2.840.113549.1.1.9", "pSpecified"),
        a("1.2.840.113549.1.1.10", "RSASSA-PSS"),
        a("1.2.840.113549.1.1.11", "sha256WithRSAEncryption"),
        a("1.2.840.113549.1.1.12", "sha384WithRSAEncryption"),
        a("1.2.840.113549.1.1.13", "sha512WithRSAEncryption"),
        a("1.3.101.112", "EdDSA25519"),
        a("1.2.840.10040.4.3", "dsa-with-sha1"),
        a("1.3.14.3.2.7", "desCBC"),
        a("1.3.14.3.2.26", "sha1"),
        a("2.16.840.1.101.3.4.2.1", "sha256"),
        a("2.16.840.1.101.3.4.2.2", "sha384"),
        a("2.16.840.1.101.3.4.2.3", "sha512"),
        a("1.2.840.113549.2.5", "md5"),
        a("1.2.840.113549.1.7.1", "data"),
        a("1.2.840.113549.1.7.2", "signedData"),
        a("1.2.840.113549.1.7.3", "envelopedData"),
        a("1.2.840.113549.1.7.4", "signedAndEnvelopedData"),
        a("1.2.840.113549.1.7.5", "digestedData"),
        a("1.2.840.113549.1.7.6", "encryptedData"),
        a("1.2.840.113549.1.9.1", "emailAddress"),
        a("1.2.840.113549.1.9.2", "unstructuredName"),
        a("1.2.840.113549.1.9.3", "contentType"),
        a("1.2.840.113549.1.9.4", "messageDigest"),
        a("1.2.840.113549.1.9.5", "signingTime"),
        a("1.2.840.113549.1.9.6", "counterSignature"),
        a("1.2.840.113549.1.9.7", "challengePassword"),
        a("1.2.840.113549.1.9.8", "unstructuredAddress"),
        a("1.2.840.113549.1.9.14", "extensionRequest"),
        a("1.2.840.113549.1.9.20", "friendlyName"),
        a("1.2.840.113549.1.9.21", "localKeyId"),
        a("1.2.840.113549.1.9.22.1", "x509Certificate"),
        a("1.2.840.113549.1.12.10.1.1", "keyBag"),
        a("1.2.840.113549.1.12.10.1.2", "pkcs8ShroudedKeyBag"),
        a("1.2.840.113549.1.12.10.1.3", "certBag"),
        a("1.2.840.113549.1.12.10.1.4", "crlBag"),
        a("1.2.840.113549.1.12.10.1.5", "secretBag"),
        a("1.2.840.113549.1.12.10.1.6", "safeContentsBag"),
        a("1.2.840.113549.1.5.13", "pkcs5PBES2"),
        a("1.2.840.113549.1.5.12", "pkcs5PBKDF2"),
        a("1.2.840.113549.1.12.1.1", "pbeWithSHAAnd128BitRC4"),
        a("1.2.840.113549.1.12.1.2", "pbeWithSHAAnd40BitRC4"),
        a("1.2.840.113549.1.12.1.3", "pbeWithSHAAnd3-KeyTripleDES-CBC"),
        a("1.2.840.113549.1.12.1.4", "pbeWithSHAAnd2-KeyTripleDES-CBC"),
        a("1.2.840.113549.1.12.1.5", "pbeWithSHAAnd128BitRC2-CBC"),
        a("1.2.840.113549.1.12.1.6", "pbewithSHAAnd40BitRC2-CBC"),
        a("1.2.840.113549.2.7", "hmacWithSHA1"),
        a("1.2.840.113549.2.8", "hmacWithSHA224"),
        a("1.2.840.113549.2.9", "hmacWithSHA256"),
        a("1.2.840.113549.2.10", "hmacWithSHA384"),
        a("1.2.840.113549.2.11", "hmacWithSHA512"),
        a("1.2.840.113549.3.7", "des-EDE3-CBC"),
        a("2.16.840.1.101.3.4.1.2", "aes128-CBC"),
        a("2.16.840.1.101.3.4.1.22", "aes192-CBC"),
        a("2.16.840.1.101.3.4.1.42", "aes256-CBC"),
        a("2.5.4.3", "commonName"),
        a("2.5.4.5", "serialName"),
        a("2.5.4.6", "countryName"),
        a("2.5.4.7", "localityName"),
        a("2.5.4.8", "stateOrProvinceName"),
        a("2.5.4.9", "streetAddress"),
        a("2.5.4.10", "organizationName"),
        a("2.5.4.11", "organizationalUnitName"),
        a("2.5.4.13", "description"),
        a("2.5.4.15", "businessCategory"),
        a("2.5.4.17", "postalCode"),
        a("1.3.6.1.4.1.311.60.2.1.2", "jurisdictionOfIncorporationStateOrProvinceName"),
        a("1.3.6.1.4.1.311.60.2.1.3", "jurisdictionOfIncorporationCountryName"),
        a("2.16.840.1.113730.1.1", "nsCertType"),
        a("2.16.840.1.113730.1.13", "nsComment"),
        i("2.5.29.1", "authorityKeyIdentifier"),
        i("2.5.29.2", "keyAttributes"),
        i("2.5.29.3", "certificatePolicies"),
        i("2.5.29.4", "keyUsageRestriction"),
        i("2.5.29.5", "policyMapping"),
        i("2.5.29.6", "subtreesConstraint"),
        i("2.5.29.7", "subjectAltName"),
        i("2.5.29.8", "issuerAltName"),
        i("2.5.29.9", "subjectDirectoryAttributes"),
        i("2.5.29.10", "basicConstraints"),
        i("2.5.29.11", "nameConstraints"),
        i("2.5.29.12", "policyConstraints"),
        i("2.5.29.13", "basicConstraints"),
        a("2.5.29.14", "subjectKeyIdentifier"),
        a("2.5.29.15", "keyUsage"),
        i("2.5.29.16", "privateKeyUsagePeriod"),
        a("2.5.29.17", "subjectAltName"),
        a("2.5.29.18", "issuerAltName"),
        a("2.5.29.19", "basicConstraints"),
        i("2.5.29.20", "cRLNumber"),
        i("2.5.29.21", "cRLReason"),
        i("2.5.29.22", "expirationDate"),
        i("2.5.29.23", "instructionCode"),
        i("2.5.29.24", "invalidityDate"),
        i("2.5.29.25", "cRLDistributionPoints"),
        i("2.5.29.26", "issuingDistributionPoint"),
        i("2.5.29.27", "deltaCRLIndicator"),
        i("2.5.29.28", "issuingDistributionPoint"),
        i("2.5.29.29", "certificateIssuer"),
        i("2.5.29.30", "nameConstraints"),
        a("2.5.29.31", "cRLDistributionPoints"),
        a("2.5.29.32", "certificatePolicies"),
        i("2.5.29.33", "policyMappings"),
        i("2.5.29.34", "policyConstraints"),
        a("2.5.29.35", "authorityKeyIdentifier"),
        i("2.5.29.36", "policyConstraints"),
        a("2.5.29.37", "extKeyUsage"),
        i("2.5.29.46", "freshestCRL"),
        i("2.5.29.54", "inhibitAnyPolicy"),
        a("1.3.6.1.4.1.11129.2.4.2", "timestampList"),
        a("1.3.6.1.5.5.7.1.1", "authorityInfoAccess"),
        a("1.3.6.1.5.5.7.3.1", "serverAuth"),
        a("1.3.6.1.5.5.7.3.2", "clientAuth"),
        a("1.3.6.1.5.5.7.3.3", "codeSigning"),
        a("1.3.6.1.5.5.7.3.4", "emailProtection"),
        a("1.3.6.1.5.5.7.3.8", "timeStamping")
    }
    , function(t, e, r) {
        function a(t, e, r) {
            var a = p.util.createBuffer()
              , i = Math.ceil(e.n.bitLength() / 8);
            if (t.length > i - 11) {
                var n = new Error("Message is too long for PKCS#1 v1.5 padding.");
                throw n.length = t.length,
                n.max = i - 11,
                n
            }
            a.putByte(0),
            a.putByte(r);
            var s, o = i - 3 - t.length;
            if (0 === r || 1 === r) {
                s = 0 === r ? 0 : 255;
                for (var u = 0; u < o; ++u)
                    a.putByte(s)
            } else
                for (; o > 0; ) {
                    for (var c = 0, l = p.random.getBytes(o), u = 0; u < o; ++u)
                        s = l.charCodeAt(u),
                        0 === s ? ++c : a.putByte(s);
                    o = c
                }
            return a.putByte(0),
            a.putBytes(t),
            a
        }
        function i(t, e, r, a) {
            var i = Math.ceil(e.n.bitLength() / 8)
              , n = p.util.createBuffer(t)
              , s = n.getByte()
              , o = n.getByte();
            if (0 !== s || r && 0 !== o && 1 !== o || !r && 2 != o || r && 0 === o && void 0 === a)
                throw new Error("Encryption block is invalid.");
            var u = 0;
            if (0 === o) {
                u = i - 3 - a;
                for (var c = 0; c < u; ++c)
                    if (0 !== n.getByte())
                        throw new Error("Encryption block is invalid.")
            } else if (1 === o)
                for (u = 0; n.length() > 1; ) {
                    if (255 !== n.getByte()) {
                        --n.read;
                        break
                    }
                    ++u
                }
            else if (2 === o)
                for (u = 0; n.length() > 1; ) {
                    if (0 === n.getByte()) {
                        --n.read;
                        break
                    }
                    ++u
                }
            if (0 !== n.getByte() || u !== i - 3 - n.length())
                throw new Error("Encryption block is invalid.");
            return n.getBytes()
        }
        function n(t, e, r) {
            function a() {
                i(t.pBits, function(e, a) {
                    return e ? r(e) : (t.p = a,
                    null !== t.q ? n(e, t.q) : void i(t.qBits, n))
                })
            }
            function i(t, e) {
                p.prime.generateProbablePrime(t, s, e)
            }
            function n(e, s) {
                if (e)
                    return r(e);
                if (t.q = s,
                t.p.compareTo(t.q) < 0) {
                    var o = t.p;
                    t.p = t.q,
                    t.q = o
                }
                if (0 !== t.p.subtract(f.ONE).gcd(t.e).compareTo(f.ONE))
                    return t.p = null,
                    void a();
                if (0 !== t.q.subtract(f.ONE).gcd(t.e).compareTo(f.ONE))
                    return t.q = null,
                    void i(t.qBits, n);
                if (t.p1 = t.p.subtract(f.ONE),
                t.q1 = t.q.subtract(f.ONE),
                t.phi = t.p1.multiply(t.q1),
                0 !== t.phi.gcd(t.e).compareTo(f.ONE))
                    return t.p = t.q = null,
                    void a();
                if (t.n = t.p.multiply(t.q),
                t.n.bitLength() !== t.bits)
                    return t.q = null,
                    void i(t.qBits, n);
                var u = t.e.modInverse(t.phi);
                t.keys = {
                    privateKey: m.rsa.setPrivateKey(t.n, t.e, u, t.p, t.q, u.mod(t.p1), u.mod(t.q1), t.q.modInverse(t.p)),
                    publicKey: m.rsa.setPublicKey(t.n, t.e)
                },
                r(null, t.keys)
            }
            "function" == typeof e && (r = e,
            e = {}),
            e = e || {};
            var s = {
                algorithm: {
                    name: e.algorithm || "PRIMEINC",
                    options: {
                        workers: e.workers || 2,
                        workLoad: e.workLoad || 100,
                        workerScript: e.workerScript
                    }
                }
            };
            "prng"in e && (s.prng = e.prng),
            a()
        }
        function s(t) {
            var e = t.toString(16);
            e[0] >= "8" && (e = "00" + e);
            var r = p.util.hexToBytes(e);
            return r.length > 1 && (0 === r.charCodeAt(0) && 0 == (128 & r.charCodeAt(1)) || 255 === r.charCodeAt(0) && 128 == (128 & r.charCodeAt(1))) ? r.substr(1) : r
        }
        function o(t) {
            return t <= 100 ? 27 : t <= 150 ? 18 : t <= 200 ? 15 : t <= 250 ? 12 : t <= 300 ? 9 : t <= 350 ? 8 : t <= 400 ? 7 : t <= 500 ? 6 : t <= 600 ? 5 : t <= 800 ? 4 : t <= 1250 ? 3 : 2
        }
        function u(t) {
            return p.util.isNodejs && "function" == typeof d[t]
        }
        function c(t) {
            return void 0 !== g.globalScope && "object" == typeof g.globalScope.crypto && "object" == typeof g.globalScope.crypto.subtle && "function" == typeof g.globalScope.crypto.subtle[t]
        }
        function l(t) {
            return void 0 !== g.globalScope && "object" == typeof g.globalScope.msCrypto && "object" == typeof g.globalScope.msCrypto.subtle && "function" == typeof g.globalScope.msCrypto.subtle[t]
        }
        function h(t) {
            for (var e = p.util.hexToBytes(t.toString(16)), r = new Uint8Array(e.length), a = 0; a < e.length; ++a)
                r[a] = e.charCodeAt(a);
            return r
        }
        var p = r(0);
        if (r(3),
        r(11),
        r(5),
        r(27),
        r(28),
        r(4),
        r(1),
        void 0 === f)
            var f = p.jsbn.BigInteger;
        var d = p.util.isNodejs ? r(12) : null
          , y = p.asn1
          , g = p.util;
        p.pki = p.pki || {},
        t.exports = p.pki.rsa = p.rsa = p.rsa || {};
        var m = p.pki
          , v = [6, 4, 2, 4, 2, 4, 6, 2]
          , C = {
            name: "PrivateKeyInfo",
            tagClass: y.Class.UNIVERSAL,
            type: y.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PrivateKeyInfo.version",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyVersion"
            }, {
                name: "PrivateKeyInfo.privateKeyAlgorithm",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.OID,
                    constructed: !1,
                    capture: "privateKeyOid"
                }]
            }, {
                name: "PrivateKeyInfo",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.OCTETSTRING,
                constructed: !1,
                capture: "privateKey"
            }]
        }
          , E = {
            name: "RSAPrivateKey",
            tagClass: y.Class.UNIVERSAL,
            type: y.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RSAPrivateKey.version",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyVersion"
            }, {
                name: "RSAPrivateKey.modulus",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyModulus"
            }, {
                name: "RSAPrivateKey.publicExponent",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPublicExponent"
            }, {
                name: "RSAPrivateKey.privateExponent",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrivateExponent"
            }, {
                name: "RSAPrivateKey.prime1",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrime1"
            }, {
                name: "RSAPrivateKey.prime2",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrime2"
            }, {
                name: "RSAPrivateKey.exponent1",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyExponent1"
            }, {
                name: "RSAPrivateKey.exponent2",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyExponent2"
            }, {
                name: "RSAPrivateKey.coefficient",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyCoefficient"
            }]
        }
          , S = {
            name: "RSAPublicKey",
            tagClass: y.Class.UNIVERSAL,
            type: y.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RSAPublicKey.modulus",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "publicKeyModulus"
            }, {
                name: "RSAPublicKey.exponent",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.INTEGER,
                constructed: !1,
                capture: "publicKeyExponent"
            }]
        }
          , T = p.pki.rsa.publicKeyValidator = {
            name: "SubjectPublicKeyInfo",
            tagClass: y.Class.UNIVERSAL,
            type: y.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "subjectPublicKeyInfo",
            value: [{
                name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.OID,
                    constructed: !1,
                    capture: "publicKeyOid"
                }]
            }, {
                name: "SubjectPublicKeyInfo.subjectPublicKey",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.BITSTRING,
                constructed: !1,
                value: [{
                    name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    captureAsn1: "rsaPublicKey"
                }]
            }]
        }
          , I = function(t) {
            var e;
            if (!(t.algorithm in m.oids)) {
                var r = new Error("Unknown message digest algorithm.");
                throw r.algorithm = t.algorithm,
                r
            }
            e = m.oids[t.algorithm];
            var a = y.oidToDer(e).getBytes()
              , i = y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [])
              , n = y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, []);
            n.value.push(y.create(y.Class.UNIVERSAL, y.Type.OID, !1, a)),
            n.value.push(y.create(y.Class.UNIVERSAL, y.Type.NULL, !1, ""));
            var s = y.create(y.Class.UNIVERSAL, y.Type.OCTETSTRING, !1, t.digest().getBytes());
            return i.value.push(n),
            i.value.push(s),
            y.toDer(i).getBytes()
        }
          , b = function(t, e, r) {
            if (r)
                return t.modPow(e.e, e.n);
            if (!e.p || !e.q)
                return t.modPow(e.d, e.n);
            e.dP || (e.dP = e.d.mod(e.p.subtract(f.ONE))),
            e.dQ || (e.dQ = e.d.mod(e.q.subtract(f.ONE))),
            e.qInv || (e.qInv = e.q.modInverse(e.p));
            var a;
            do {
                a = new f(p.util.bytesToHex(p.random.getBytes(e.n.bitLength() / 8)),16)
            } while (a.compareTo(e.n) >= 0 || !a.gcd(e.n).equals(f.ONE));
            t = t.multiply(a.modPow(e.e, e.n)).mod(e.n);
            for (var i = t.mod(e.p).modPow(e.dP, e.p), n = t.mod(e.q).modPow(e.dQ, e.q); i.compareTo(n) < 0; )
                i = i.add(e.p);
            var s = i.subtract(n).multiply(e.qInv).mod(e.p).multiply(e.q).add(n);
            return s = s.multiply(a.modInverse(e.n)).mod(e.n)
        };
        m.rsa.encrypt = function(t, e, r) {
            var i, n = r, s = Math.ceil(e.n.bitLength() / 8);
            !1 !== r && !0 !== r ? (n = 2 === r,
            i = a(t, e, r)) : (i = p.util.createBuffer(),
            i.putBytes(t));
            for (var o = new f(i.toHex(),16), u = b(o, e, n), c = u.toString(16), l = p.util.createBuffer(), h = s - Math.ceil(c.length / 2); h > 0; )
                l.putByte(0),
                --h;
            return l.putBytes(p.util.hexToBytes(c)),
            l.getBytes()
        }
        ,
        m.rsa.decrypt = function(t, e, r, a) {
            var n = Math.ceil(e.n.bitLength() / 8);
            if (t.length !== n) {
                var s = new Error("Encrypted message length is invalid.");
                throw s.length = t.length,
                s.expected = n,
                s
            }
            var o = new f(p.util.createBuffer(t).toHex(),16);
            if (o.compareTo(e.n) >= 0)
                throw new Error("Encrypted message is invalid.");
            for (var u = b(o, e, r), c = u.toString(16), l = p.util.createBuffer(), h = n - Math.ceil(c.length / 2); h > 0; )
                l.putByte(0),
                --h;
            return l.putBytes(p.util.hexToBytes(c)),
            !1 !== a ? i(l.getBytes(), e, r) : l.getBytes()
        }
        ,
        m.rsa.createKeyPairGenerationState = function(t, e, r) {
            "string" == typeof t && (t = parseInt(t, 10)),
            t = t || 2048,
            r = r || {};
            var a, i = r.prng || p.random, n = {
                nextBytes: function(t) {
                    for (var e = i.getBytesSync(t.length), r = 0; r < t.length; ++r)
                        t[r] = e.charCodeAt(r)
                }
            }, s = r.algorithm || "PRIMEINC";
            if ("PRIMEINC" !== s)
                throw new Error("Invalid key generation algorithm: " + s);
            return a = {
                algorithm: s,
                state: 0,
                bits: t,
                rng: n,
                eInt: e || 65537,
                e: new f(null),
                p: null,
                q: null,
                qBits: t >> 1,
                pBits: t - (t >> 1),
                pqState: 0,
                num: null,
                keys: null
            },
            a.e.fromInt(a.eInt),
            a
        }
        ,
        m.rsa.stepKeyPairGenerationState = function(t, e) {
            "algorithm"in t || (t.algorithm = "PRIMEINC");
            var r = new f(null);
            r.fromInt(30);
            for (var a, i = 0, n = function(t, e) {
                return t | e
            }, s = +new Date, u = 0; null === t.keys && (e <= 0 || u < e); ) {
                if (0 === t.state) {
                    var c = null === t.p ? t.pBits : t.qBits
                      , l = c - 1;
                    0 === t.pqState ? (t.num = new f(c,t.rng),
                    t.num.testBit(l) || t.num.bitwiseTo(f.ONE.shiftLeft(l), n, t.num),
                    t.num.dAddOffset(31 - t.num.mod(r).byteValue(), 0),
                    i = 0,
                    ++t.pqState) : 1 === t.pqState ? t.num.bitLength() > c ? t.pqState = 0 : t.num.isProbablePrime(o(t.num.bitLength())) ? ++t.pqState : t.num.dAddOffset(v[i++ % 8], 0) : 2 === t.pqState ? t.pqState = 0 === t.num.subtract(f.ONE).gcd(t.e).compareTo(f.ONE) ? 3 : 0 : 3 === t.pqState && (t.pqState = 0,
                    null === t.p ? t.p = t.num : t.q = t.num,
                    null !== t.p && null !== t.q && ++t.state,
                    t.num = null)
                } else if (1 === t.state)
                    t.p.compareTo(t.q) < 0 && (t.num = t.p,
                    t.p = t.q,
                    t.q = t.num),
                    ++t.state;
                else if (2 === t.state)
                    t.p1 = t.p.subtract(f.ONE),
                    t.q1 = t.q.subtract(f.ONE),
                    t.phi = t.p1.multiply(t.q1),
                    ++t.state;
                else if (3 === t.state)
                    0 === t.phi.gcd(t.e).compareTo(f.ONE) ? ++t.state : (t.p = null,
                    t.q = null,
                    t.state = 0);
                else if (4 === t.state)
                    t.n = t.p.multiply(t.q),
                    t.n.bitLength() === t.bits ? ++t.state : (t.q = null,
                    t.state = 0);
                else if (5 === t.state) {
                    var h = t.e.modInverse(t.phi);
                    t.keys = {
                        privateKey: m.rsa.setPrivateKey(t.n, t.e, h, t.p, t.q, h.mod(t.p1), h.mod(t.q1), t.q.modInverse(t.p)),
                        publicKey: m.rsa.setPublicKey(t.n, t.e)
                    }
                }
                a = +new Date,
                u += a - s,
                s = a
            }
            return null !== t.keys
        }
        ,
        m.rsa.generateKeyPair = function(t, e, r, a) {
            if (1 === arguments.length ? "object" == typeof t ? (r = t,
            t = void 0) : "function" == typeof t && (a = t,
            t = void 0) : 2 === arguments.length ? "number" == typeof t ? "function" == typeof e ? (a = e,
            e = void 0) : "number" != typeof e && (r = e,
            e = void 0) : (r = t,
            a = e,
            t = void 0,
            e = void 0) : 3 === arguments.length && ("number" == typeof e ? "function" == typeof r && (a = r,
            r = void 0) : (a = r,
            r = e,
            e = void 0)),
            r = r || {},
            void 0 === t && (t = r.bits || 2048),
            void 0 === e && (e = r.e || 65537),
            !p.options.usePureJavaScript && !r.prng && t >= 256 && t <= 16384 && (65537 === e || 3 === e))
                if (a) {
                    if (u("generateKeyPair"))
                        return d.generateKeyPair("rsa", {
                            modulusLength: t,
                            publicExponent: e,
                            publicKeyEncoding: {
                                type: "spki",
                                format: "pem"
                            },
                            privateKeyEncoding: {
                                type: "pkcs8",
                                format: "pem"
                            }
                        }, function(t, e, r) {
                            if (t)
                                return a(t);
                            a(null, {
                                privateKey: m.privateKeyFromPem(r),
                                publicKey: m.publicKeyFromPem(e)
                            })
                        });
                    if (c("generateKey") && c("exportKey"))
                        return g.globalScope.crypto.subtle.generateKey({
                            name: "RSASSA-PKCS1-v1_5",
                            modulusLength: t,
                            publicExponent: h(e),
                            hash: {
                                name: "SHA-256"
                            }
                        }, !0, ["sign", "verify"]).then(function(t) {
                            return g.globalScope.crypto.subtle.exportKey("pkcs8", t.privateKey)
                        }).then(void 0, function(t) {
                            a(t)
                        }).then(function(t) {
                            if (t) {
                                var e = m.privateKeyFromAsn1(y.fromDer(p.util.createBuffer(t)));
                                a(null, {
                                    privateKey: e,
                                    publicKey: m.setRsaPublicKey(e.n, e.e)
                                })
                            }
                        });
                    if (l("generateKey") && l("exportKey")) {
                        var i = g.globalScope.msCrypto.subtle.generateKey({
                            name: "RSASSA-PKCS1-v1_5",
                            modulusLength: t,
                            publicExponent: h(e),
                            hash: {
                                name: "SHA-256"
                            }
                        }, !0, ["sign", "verify"]);
                        return i.oncomplete = function(t) {
                            var e = t.target.result
                              , r = g.globalScope.msCrypto.subtle.exportKey("pkcs8", e.privateKey);
                            r.oncomplete = function(t) {
                                var e = t.target.result
                                  , r = m.privateKeyFromAsn1(y.fromDer(p.util.createBuffer(e)));
                                a(null, {
                                    privateKey: r,
                                    publicKey: m.setRsaPublicKey(r.n, r.e)
                                })
                            }
                            ,
                            r.onerror = function(t) {
                                a(t)
                            }
                        }
                        ,
                        void (i.onerror = function(t) {
                            a(t)
                        }
                        )
                    }
                } else if (u("generateKeyPairSync")) {
                    var s = d.generateKeyPairSync("rsa", {
                        modulusLength: t,
                        publicExponent: e,
                        publicKeyEncoding: {
                            type: "spki",
                            format: "pem"
                        },
                        privateKeyEncoding: {
                            type: "pkcs8",
                            format: "pem"
                        }
                    });
                    return {
                        privateKey: m.privateKeyFromPem(s.privateKey),
                        publicKey: m.publicKeyFromPem(s.publicKey)
                    }
                }
            var o = m.rsa.createKeyPairGenerationState(t, e, r);
            if (!a)
                return m.rsa.stepKeyPairGenerationState(o, 0),
                o.keys;
            n(o, r, a)
        }
        ,
        m.setRsaPublicKey = m.rsa.setPublicKey = function(t, e) {
            var r = {
                n: t,
                e: e
            };
            return r.encrypt = function(t, e, i) {
                if ("string" == typeof e ? e = e.toUpperCase() : void 0 === e && (e = "RSAES-PKCS1-V1_5"),
                "RSAES-PKCS1-V1_5" === e)
                    e = {
                        encode: function(t, e, r) {
                            return a(t, e, 2).getBytes()
                        }
                    };
                else if ("RSA-OAEP" === e || "RSAES-OAEP" === e)
                    e = {
                        encode: function(t, e) {
                            return p.pkcs1.encode_rsa_oaep(e, t, i)
                        }
                    };
                else if (-1 !== ["RAW", "NONE", "NULL", null].indexOf(e))
                    e = {
                        encode: function(t) {
                            return t
                        }
                    };
                else if ("string" == typeof e)
                    throw new Error('Unsupported encryption scheme: "' + e + '".');
                var n = e.encode(t, r, !0);
                return m.rsa.encrypt(n, r, !0)
            }
            ,
            r.verify = function(t, e, a) {
                "string" == typeof a ? a = a.toUpperCase() : void 0 === a && (a = "RSASSA-PKCS1-V1_5"),
                "RSASSA-PKCS1-V1_5" === a ? a = {
                    verify: function(t, e) {
                        return e = i(e, r, !0),
                        t === y.fromDer(e).value[1].value
                    }
                } : "NONE" !== a && "NULL" !== a && null !== a || (a = {
                    verify: function(t, e) {
                        return e = i(e, r, !0),
                        t === e
                    }
                });
                var n = m.rsa.decrypt(e, r, !0, !1);
                return a.verify(t, n, r.n.bitLength())
            }
            ,
            r
        }
        ,
        m.setRsaPrivateKey = m.rsa.setPrivateKey = function(t, e, r, a, n, s, o, u) {
            var c = {
                n: t,
                e: e,
                d: r,
                p: a,
                q: n,
                dP: s,
                dQ: o,
                qInv: u
            };
            return c.decrypt = function(t, e, r) {
                "string" == typeof e ? e = e.toUpperCase() : void 0 === e && (e = "RSAES-PKCS1-V1_5");
                var a = m.rsa.decrypt(t, c, !1, !1);
                if ("RSAES-PKCS1-V1_5" === e)
                    e = {
                        decode: i
                    };
                else if ("RSA-OAEP" === e || "RSAES-OAEP" === e)
                    e = {
                        decode: function(t, e) {
                            return p.pkcs1.decode_rsa_oaep(e, t, r)
                        }
                    };
                else {
                    if (-1 === ["RAW", "NONE", "NULL", null].indexOf(e))
                        throw new Error('Unsupported encryption scheme: "' + e + '".');
                    e = {
                        decode: function(t) {
                            return t
                        }
                    }
                }
                return e.decode(a, c, !1)
            }
            ,
            c.sign = function(t, e) {
                var r = !1;
                "string" == typeof e && (e = e.toUpperCase()),
                void 0 === e || "RSASSA-PKCS1-V1_5" === e ? (e = {
                    encode: I
                },
                r = 1) : "NONE" !== e && "NULL" !== e && null !== e || (e = {
                    encode: function() {
                        return t
                    }
                },
                r = 1);
                var a = e.encode(t, c.n.bitLength());
                return m.rsa.encrypt(a, c, r)
            }
            ,
            c
        }
        ,
        m.wrapRsaPrivateKey = function(t) {
            return y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, y.integerToDer(0).getBytes()), y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.OID, !1, y.oidToDer(m.oids.rsaEncryption).getBytes()), y.create(y.Class.UNIVERSAL, y.Type.NULL, !1, "")]), y.create(y.Class.UNIVERSAL, y.Type.OCTETSTRING, !1, y.toDer(t).getBytes())])
        }
        ,
        m.privateKeyFromAsn1 = function(t) {
            var e = {}
              , r = [];
            if (y.validate(t, C, e, r) && (t = y.fromDer(p.util.createBuffer(e.privateKey))),
            e = {},
            r = [],
            !y.validate(t, E, e, r)) {
                var a = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
                throw a.errors = r,
                a
            }
            var i, n, s, o, u, c, l, h;
            return i = p.util.createBuffer(e.privateKeyModulus).toHex(),
            n = p.util.createBuffer(e.privateKeyPublicExponent).toHex(),
            s = p.util.createBuffer(e.privateKeyPrivateExponent).toHex(),
            o = p.util.createBuffer(e.privateKeyPrime1).toHex(),
            u = p.util.createBuffer(e.privateKeyPrime2).toHex(),
            c = p.util.createBuffer(e.privateKeyExponent1).toHex(),
            l = p.util.createBuffer(e.privateKeyExponent2).toHex(),
            h = p.util.createBuffer(e.privateKeyCoefficient).toHex(),
            m.setRsaPrivateKey(new f(i,16), new f(n,16), new f(s,16), new f(o,16), new f(u,16), new f(c,16), new f(l,16), new f(h,16))
        }
        ,
        m.privateKeyToAsn1 = m.privateKeyToRSAPrivateKey = function(t) {
            return y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, y.integerToDer(0).getBytes()), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.n)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.e)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.d)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.p)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.q)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.dP)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.dQ)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.qInv))])
        }
        ,
        m.publicKeyFromAsn1 = function(t) {
            var e = {}
              , r = [];
            if (y.validate(t, T, e, r)) {
                var a = y.derToOid(e.publicKeyOid);
                if (a !== m.oids.rsaEncryption) {
                    var i = new Error("Cannot read public key. Unknown OID.");
                    throw i.oid = a,
                    i
                }
                t = e.rsaPublicKey
            }
            if (r = [],
            !y.validate(t, S, e, r)) {
                var i = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");
                throw i.errors = r,
                i
            }
            var n = p.util.createBuffer(e.publicKeyModulus).toHex()
              , s = p.util.createBuffer(e.publicKeyExponent).toHex();
            return m.setRsaPublicKey(new f(n,16), new f(s,16))
        }
        ,
        m.publicKeyToAsn1 = m.publicKeyToSubjectPublicKeyInfo = function(t) {
            return y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.OID, !1, y.oidToDer(m.oids.rsaEncryption).getBytes()), y.create(y.Class.UNIVERSAL, y.Type.NULL, !1, "")]), y.create(y.Class.UNIVERSAL, y.Type.BITSTRING, !1, [m.publicKeyToRSAPublicKey(t)])])
        }
        ,
        m.publicKeyToRSAPublicKey = function(t) {
            return y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.n)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(t.e))])
        }
    }
    , function(t, e, r) {
        function a(t, e) {
            var r = function() {
                return new u.aes.Algorithm(t,e)
            };
            u.cipher.registerAlgorithm(t, r)
        }
        function i() {
            d = !0,
            h = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
            for (var t = new Array(256), e = 0; e < 128; ++e)
                t[e] = e << 1,
                t[e + 128] = e + 128 << 1 ^ 283;
            c = new Array(256),
            l = new Array(256),
            p = new Array(4),
            f = new Array(4);
            for (var e = 0; e < 4; ++e)
                p[e] = new Array(256),
                f[e] = new Array(256);
            for (var r, a, i, n, s, o, u, y = 0, g = 0, e = 0; e < 256; ++e) {
                n = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4,
                n = n >> 8 ^ 255 & n ^ 99,
                c[y] = n,
                l[n] = y,
                s = t[n],
                r = t[y],
                a = t[r],
                i = t[a],
                o = s << 24 ^ n << 16 ^ n << 8 ^ n ^ s,
                u = (r ^ a ^ i) << 24 ^ (y ^ i) << 16 ^ (y ^ a ^ i) << 8 ^ y ^ r ^ i;
                for (var m = 0; m < 4; ++m)
                    p[m][y] = o,
                    f[m][n] = u,
                    o = o << 24 | o >>> 8,
                    u = u << 24 | u >>> 8;
                0 === y ? y = g = 1 : (y = r ^ t[t[t[r ^ i]]],
                g ^= t[t[g]])
            }
        }
        function n(t, e) {
            for (var r, a = t.slice(0), i = 1, n = a.length, s = n + 6 + 1, o = y * s, u = n; u < o; ++u)
                r = a[u - 1],
                u % n == 0 ? (r = c[r >>> 16 & 255] << 24 ^ c[r >>> 8 & 255] << 16 ^ c[255 & r] << 8 ^ c[r >>> 24] ^ h[i] << 24,
                i++) : n > 6 && u % n == 4 && (r = c[r >>> 24] << 24 ^ c[r >>> 16 & 255] << 16 ^ c[r >>> 8 & 255] << 8 ^ c[255 & r]),
                a[u] = a[u - n] ^ r;
            if (e) {
                var l, p = f[0], d = f[1], g = f[2], m = f[3], v = a.slice(0);
                o = a.length;
                for (var u = 0, C = o - y; u < o; u += y,
                C -= y)
                    if (0 === u || u === o - y)
                        v[u] = a[C],
                        v[u + 1] = a[C + 3],
                        v[u + 2] = a[C + 2],
                        v[u + 3] = a[C + 1];
                    else
                        for (var E = 0; E < y; ++E)
                            l = a[C + E],
                            v[u + (3 & -E)] = p[c[l >>> 24]] ^ d[c[l >>> 16 & 255]] ^ g[c[l >>> 8 & 255]] ^ m[c[255 & l]];
                a = v
            }
            return a
        }
        function s(t, e, r, a) {
            var i, n, s, o, u, h = t.length / 4 - 1;
            a ? (i = f[0],
            n = f[1],
            s = f[2],
            o = f[3],
            u = l) : (i = p[0],
            n = p[1],
            s = p[2],
            o = p[3],
            u = c);
            var d, y, g, m, v, C, E;
            d = e[0] ^ t[0],
            y = e[a ? 3 : 1] ^ t[1],
            g = e[2] ^ t[2],
            m = e[a ? 1 : 3] ^ t[3];
            for (var S = 3, T = 1; T < h; ++T)
                v = i[d >>> 24] ^ n[y >>> 16 & 255] ^ s[g >>> 8 & 255] ^ o[255 & m] ^ t[++S],
                C = i[y >>> 24] ^ n[g >>> 16 & 255] ^ s[m >>> 8 & 255] ^ o[255 & d] ^ t[++S],
                E = i[g >>> 24] ^ n[m >>> 16 & 255] ^ s[d >>> 8 & 255] ^ o[255 & y] ^ t[++S],
                m = i[m >>> 24] ^ n[d >>> 16 & 255] ^ s[y >>> 8 & 255] ^ o[255 & g] ^ t[++S],
                d = v,
                y = C,
                g = E;
            r[0] = u[d >>> 24] << 24 ^ u[y >>> 16 & 255] << 16 ^ u[g >>> 8 & 255] << 8 ^ u[255 & m] ^ t[++S],
            r[a ? 3 : 1] = u[y >>> 24] << 24 ^ u[g >>> 16 & 255] << 16 ^ u[m >>> 8 & 255] << 8 ^ u[255 & d] ^ t[++S],
            r[2] = u[g >>> 24] << 24 ^ u[m >>> 16 & 255] << 16 ^ u[d >>> 8 & 255] << 8 ^ u[255 & y] ^ t[++S],
            r[a ? 1 : 3] = u[m >>> 24] << 24 ^ u[d >>> 16 & 255] << 16 ^ u[y >>> 8 & 255] << 8 ^ u[255 & g] ^ t[++S]
        }
        function o(t) {
            t = t || {};
            var e, r = (t.mode || "CBC").toUpperCase(), a = "AES-" + r;
            e = t.decrypt ? u.cipher.createDecipher(a, t.key) : u.cipher.createCipher(a, t.key);
            var i = e.start;
            return e.start = function(t, r) {
                var a = null;
                r instanceof u.util.ByteBuffer && (a = r,
                r = {}),
                r = r || {},
                r.output = a,
                r.iv = t,
                i.call(e, r)
            }
            ,
            e
        }
        var u = r(0);
        r(9),
        r(10),
        r(1),
        t.exports = u.aes = u.aes || {},
        u.aes.startEncrypting = function(t, e, r, a) {
            var i = o({
                key: t,
                output: r,
                decrypt: !1,
                mode: a
            });
            return i.start(e),
            i
        }
        ,
        u.aes.createEncryptionCipher = function(t, e) {
            return o({
                key: t,
                output: null,
                decrypt: !1,
                mode: e
            })
        }
        ,
        u.aes.startDecrypting = function(t, e, r, a) {
            var i = o({
                key: t,
                output: r,
                decrypt: !0,
                mode: a
            });
            return i.start(e),
            i
        }
        ,
        u.aes.createDecryptionCipher = function(t, e) {
            return o({
                key: t,
                output: null,
                decrypt: !0,
                mode: e
            })
        }
        ,
        u.aes.Algorithm = function(t, e) {
            d || i();
            var r = this;
            r.name = t,
            r.mode = new e({
                blockSize: 16,
                cipher: {
                    encrypt: function(t, e) {
                        return s(r._w, t, e, !1)
                    },
                    decrypt: function(t, e) {
                        return s(r._w, t, e, !0)
                    }
                }
            }),
            r._init = !1
        }
        ,
        u.aes.Algorithm.prototype.initialize = function(t) {
            if (!this._init) {
                var e, r = t.key;
                if ("string" != typeof r || 16 !== r.length && 24 !== r.length && 32 !== r.length) {
                    if (u.util.isArray(r) && (16 === r.length || 24 === r.length || 32 === r.length)) {
                        e = r,
                        r = u.util.createBuffer();
                        for (var a = 0; a < e.length; ++a)
                            r.putByte(e[a])
                    }
                } else
                    r = u.util.createBuffer(r);
                if (!u.util.isArray(r)) {
                    e = r,
                    r = [];
                    var i = e.length();
                    if (16 === i || 24 === i || 32 === i) {
                        i >>>= 2;
                        for (var a = 0; a < i; ++a)
                            r.push(e.getInt32())
                    }
                }
                if (!u.util.isArray(r) || 4 !== r.length && 6 !== r.length && 8 !== r.length)
                    throw new Error("Invalid key parameter.");
                var s = this.mode.name
                  , o = -1 !== ["CFB", "OFB", "CTR", "GCM"].indexOf(s);
                this._w = n(r, t.decrypt && !o),
                this._init = !0
            }
        }
        ,
        u.aes._expandKey = function(t, e) {
            return d || i(),
            n(t, e)
        }
        ,
        u.aes._updateBlock = s,
        a("AES-ECB", u.cipher.modes.ecb),
        a("AES-CBC", u.cipher.modes.cbc),
        a("AES-CFB", u.cipher.modes.cfb),
        a("AES-OFB", u.cipher.modes.ofb),
        a("AES-CTR", u.cipher.modes.ctr),
        a("AES-GCM", u.cipher.modes.gcm);
        var c, l, h, p, f, d = !1, y = 4
    }
    , function(t, e, r) {
        function a() {
            o = String.fromCharCode(128),
            o += n.util.fillString(String.fromCharCode(0), 64),
            u = !0
        }
        function i(t, e, r) {
            for (var a, i, n, s, o, u, c, l, h = r.length(); h >= 64; ) {
                for (i = t.h0,
                n = t.h1,
                s = t.h2,
                o = t.h3,
                u = t.h4,
                l = 0; l < 16; ++l)
                    a = r.getInt32(),
                    e[l] = a,
                    c = o ^ n & (s ^ o),
                    a = (i << 5 | i >>> 27) + c + u + 1518500249 + a,
                    u = o,
                    o = s,
                    s = (n << 30 | n >>> 2) >>> 0,
                    n = i,
                    i = a;
                for (; l < 20; ++l)
                    a = e[l - 3] ^ e[l - 8] ^ e[l - 14] ^ e[l - 16],
                    a = a << 1 | a >>> 31,
                    e[l] = a,
                    c = o ^ n & (s ^ o),
                    a = (i << 5 | i >>> 27) + c + u + 1518500249 + a,
                    u = o,
                    o = s,
                    s = (n << 30 | n >>> 2) >>> 0,
                    n = i,
                    i = a;
                for (; l < 32; ++l)
                    a = e[l - 3] ^ e[l - 8] ^ e[l - 14] ^ e[l - 16],
                    a = a << 1 | a >>> 31,
                    e[l] = a,
                    c = n ^ s ^ o,
                    a = (i << 5 | i >>> 27) + c + u + 1859775393 + a,
                    u = o,
                    o = s,
                    s = (n << 30 | n >>> 2) >>> 0,
                    n = i,
                    i = a;
                for (; l < 40; ++l)
                    a = e[l - 6] ^ e[l - 16] ^ e[l - 28] ^ e[l - 32],
                    a = a << 2 | a >>> 30,
                    e[l] = a,
                    c = n ^ s ^ o,
                    a = (i << 5 | i >>> 27) + c + u + 1859775393 + a,
                    u = o,
                    o = s,
                    s = (n << 30 | n >>> 2) >>> 0,
                    n = i,
                    i = a;
                for (; l < 60; ++l)
                    a = e[l - 6] ^ e[l - 16] ^ e[l - 28] ^ e[l - 32],
                    a = a << 2 | a >>> 30,
                    e[l] = a,
                    c = n & s | o & (n ^ s),
                    a = (i << 5 | i >>> 27) + c + u + 2400959708 + a,
                    u = o,
                    o = s,
                    s = (n << 30 | n >>> 2) >>> 0,
                    n = i,
                    i = a;
                for (; l < 80; ++l)
                    a = e[l - 6] ^ e[l - 16] ^ e[l - 28] ^ e[l - 32],
                    a = a << 2 | a >>> 30,
                    e[l] = a,
                    c = n ^ s ^ o,
                    a = (i << 5 | i >>> 27) + c + u + 3395469782 + a,
                    u = o,
                    o = s,
                    s = (n << 30 | n >>> 2) >>> 0,
                    n = i,
                    i = a;
                t.h0 = t.h0 + i | 0,
                t.h1 = t.h1 + n | 0,
                t.h2 = t.h2 + s | 0,
                t.h3 = t.h3 + o | 0,
                t.h4 = t.h4 + u | 0,
                h -= 64
            }
        }
        var n = r(0);
        r(2),
        r(1);
        var s = t.exports = n.sha1 = n.sha1 || {};
        n.md.sha1 = n.md.algorithms.sha1 = s,
        s.create = function() {
            u || a();
            var t = null
              , e = n.util.createBuffer()
              , r = new Array(80)
              , s = {
                algorithm: "sha1",
                blockLength: 64,
                digestLength: 20,
                messageLength: 0,
                fullMessageLength: null,
                messageLengthSize: 8
            };
            return s.start = function() {
                s.messageLength = 0,
                s.fullMessageLength = s.messageLength64 = [];
                for (var r = s.messageLengthSize / 4, a = 0; a < r; ++a)
                    s.fullMessageLength.push(0);
                return e = n.util.createBuffer(),
                t = {
                    h0: 1732584193,
                    h1: 4023233417,
                    h2: 2562383102,
                    h3: 271733878,
                    h4: 3285377520
                },
                s
            }
            ,
            s.start(),
            s.update = function(a, o) {
                "utf8" === o && (a = n.util.encodeUtf8(a));
                var u = a.length;
                s.messageLength += u,
                u = [u / 4294967296 >>> 0, u >>> 0];
                for (var c = s.fullMessageLength.length - 1; c >= 0; --c)
                    s.fullMessageLength[c] += u[1],
                    u[1] = u[0] + (s.fullMessageLength[c] / 4294967296 >>> 0),
                    s.fullMessageLength[c] = s.fullMessageLength[c] >>> 0,
                    u[0] = u[1] / 4294967296 >>> 0;
                return e.putBytes(a),
                i(t, r, e),
                (e.read > 2048 || 0 === e.length()) && e.compact(),
                s
            }
            ,
            s.digest = function() {
                var a = n.util.createBuffer();
                a.putBytes(e.bytes());
                var u = s.fullMessageLength[s.fullMessageLength.length - 1] + s.messageLengthSize
                  , c = u & s.blockLength - 1;
                a.putBytes(o.substr(0, s.blockLength - c));
                for (var l, h, p = 8 * s.fullMessageLength[0], f = 0; f < s.fullMessageLength.length - 1; ++f)
                    l = 8 * s.fullMessageLength[f + 1],
                    h = l / 4294967296 >>> 0,
                    p += h,
                    a.putInt32(p >>> 0),
                    p = l >>> 0;
                a.putInt32(p);
                var d = {
                    h0: t.h0,
                    h1: t.h1,
                    h2: t.h2,
                    h3: t.h3,
                    h4: t.h4
                };
                i(d, r, a);
                var y = n.util.createBuffer();
                return y.putInt32(d.h0),
                y.putInt32(d.h1),
                y.putInt32(d.h2),
                y.putInt32(d.h3),
                y.putInt32(d.h4),
                y
            }
            ,
            s
        }
        ;
        var o = null
          , u = !1
    }
    , function(t, e, r) {
        var a = r(0);
        r(1),
        t.exports = a.cipher = a.cipher || {},
        a.cipher.algorithms = a.cipher.algorithms || {},
        a.cipher.createCipher = function(t, e) {
            var r = t;
            if ("string" == typeof r && (r = a.cipher.getAlgorithm(r)) && (r = r()),
            !r)
                throw new Error("Unsupported algorithm: " + t);
            return new a.cipher.BlockCipher({
                algorithm: r,
                key: e,
                decrypt: !1
            })
        }
        ,
        a.cipher.createDecipher = function(t, e) {
            var r = t;
            if ("string" == typeof r && (r = a.cipher.getAlgorithm(r)) && (r = r()),
            !r)
                throw new Error("Unsupported algorithm: " + t);
            return new a.cipher.BlockCipher({
                algorithm: r,
                key: e,
                decrypt: !0
            })
        }
        ,
        a.cipher.registerAlgorithm = function(t, e) {
            t = t.toUpperCase(),
            a.cipher.algorithms[t] = e
        }
        ,
        a.cipher.getAlgorithm = function(t) {
            return t = t.toUpperCase(),
            t in a.cipher.algorithms ? a.cipher.algorithms[t] : null
        }
        ;
        var i = a.cipher.BlockCipher = function(t) {
            this.algorithm = t.algorithm,
            this.mode = this.algorithm.mode,
            this.blockSize = this.mode.blockSize,
            this._finish = !1,
            this._input = null,
            this.output = null,
            this._op = t.decrypt ? this.mode.decrypt : this.mode.encrypt,
            this._decrypt = t.decrypt,
            this.algorithm.initialize(t)
        }
        ;
        i.prototype.start = function(t) {
            t = t || {};
            var e = {};
            for (var r in t)
                e[r] = t[r];
            e.decrypt = this._decrypt,
            this._finish = !1,
            this._input = a.util.createBuffer(),
            this.output = t.output || a.util.createBuffer(),
            this.mode.start(e)
        }
        ,
        i.prototype.update = function(t) {
            for (t && this._input.putBuffer(t); !this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish; )
                ;
            this._input.compact()
        }
        ,
        i.prototype.finish = function(t) {
            !t || "ECB" !== this.mode.name && "CBC" !== this.mode.name || (this.mode.pad = function(e) {
                return t(this.blockSize, e, !1)
            }
            ,
            this.mode.unpad = function(e) {
                return t(this.blockSize, e, !0)
            }
            );
            var e = {};
            return e.decrypt = this._decrypt,
            e.overflow = this._input.length() % this.blockSize,
            !(!this._decrypt && this.mode.pad && !this.mode.pad(this._input, e)) && (this._finish = !0,
            this.update(),
            !(this._decrypt && this.mode.unpad && !this.mode.unpad(this.output, e)) && !(this.mode.afterFinish && !this.mode.afterFinish(this.output, e)))
        }
    }
    , function(t, e, r) {
        function a(t, e) {
            if ("string" == typeof t && (t = s.util.createBuffer(t)),
            s.util.isArray(t) && t.length > 4) {
                var r = t;
                t = s.util.createBuffer();
                for (var a = 0; a < r.length; ++a)
                    t.putByte(r[a])
            }
            if (t.length() < e)
                throw new Error("Invalid IV length; got " + t.length() + " bytes and expected " + e + " bytes.");
            if (!s.util.isArray(t)) {
                for (var i = [], n = e / 4, a = 0; a < n; ++a)
                    i.push(t.getInt32());
                t = i
            }
            return t
        }
        function i(t) {
            t[t.length - 1] = t[t.length - 1] + 1 & 4294967295
        }
        function n(t) {
            return [t / 4294967296 | 0, 4294967295 & t]
        }
        var s = r(0);
        r(1),
        s.cipher = s.cipher || {};
        var o = t.exports = s.cipher.modes = s.cipher.modes || {};
        o.ecb = function(t) {
            t = t || {},
            this.name = "ECB",
            this.cipher = t.cipher,
            this.blockSize = t.blockSize || 16,
            this._ints = this.blockSize / 4,
            this._inBlock = new Array(this._ints),
            this._outBlock = new Array(this._ints)
        }
        ,
        o.ecb.prototype.start = function(t) {}
        ,
        o.ecb.prototype.encrypt = function(t, e, r) {
            if (t.length() < this.blockSize && !(r && t.length() > 0))
                return !0;
            for (var a = 0; a < this._ints; ++a)
                this._inBlock[a] = t.getInt32();
            this.cipher.encrypt(this._inBlock, this._outBlock);
            for (var a = 0; a < this._ints; ++a)
                e.putInt32(this._outBlock[a])
        }
        ,
        o.ecb.prototype.decrypt = function(t, e, r) {
            if (t.length() < this.blockSize && !(r && t.length() > 0))
                return !0;
            for (var a = 0; a < this._ints; ++a)
                this._inBlock[a] = t.getInt32();
            this.cipher.decrypt(this._inBlock, this._outBlock);
            for (var a = 0; a < this._ints; ++a)
                e.putInt32(this._outBlock[a])
        }
        ,
        o.ecb.prototype.pad = function(t, e) {
            var r = t.length() === this.blockSize ? this.blockSize : this.blockSize - t.length();
            return t.fillWithByte(r, r),
            !0
        }
        ,
        o.ecb.prototype.unpad = function(t, e) {
            if (e.overflow > 0)
                return !1;
            var r = t.length()
              , a = t.at(r - 1);
            return !(a > this.blockSize << 2) && (t.truncate(a),
            !0)
        }
        ,
        o.cbc = function(t) {
            t = t || {},
            this.name = "CBC",
            this.cipher = t.cipher,
            this.blockSize = t.blockSize || 16,
            this._ints = this.blockSize / 4,
            this._inBlock = new Array(this._ints),
            this._outBlock = new Array(this._ints)
        }
        ,
        o.cbc.prototype.start = function(t) {
            if (null === t.iv) {
                if (!this._prev)
                    throw new Error("Invalid IV parameter.");
                this._iv = this._prev.slice(0)
            } else {
                if (!("iv"in t))
                    throw new Error("Invalid IV parameter.");
                this._iv = a(t.iv, this.blockSize),
                this._prev = this._iv.slice(0)
            }
        }
        ,
        o.cbc.prototype.encrypt = function(t, e, r) {
            if (t.length() < this.blockSize && !(r && t.length() > 0))
                return !0;
            for (var a = 0; a < this._ints; ++a)
                this._inBlock[a] = this._prev[a] ^ t.getInt32();
            this.cipher.encrypt(this._inBlock, this._outBlock);
            for (var a = 0; a < this._ints; ++a)
                e.putInt32(this._outBlock[a]);
            this._prev = this._outBlock
        }
        ,
        o.cbc.prototype.decrypt = function(t, e, r) {
            if (t.length() < this.blockSize && !(r && t.length() > 0))
                return !0;
            for (var a = 0; a < this._ints; ++a)
                this._inBlock[a] = t.getInt32();
            this.cipher.decrypt(this._inBlock, this._outBlock);
            for (var a = 0; a < this._ints; ++a)
                e.putInt32(this._prev[a] ^ this._outBlock[a]);
            this._prev = this._inBlock.slice(0)
        }
        ,
        o.cbc.prototype.pad = function(t, e) {
            var r = t.length() === this.blockSize ? this.blockSize : this.blockSize - t.length();
            return t.fillWithByte(r, r),
            !0
        }
        ,
        o.cbc.prototype.unpad = function(t, e) {
            if (e.overflow > 0)
                return !1;
            var r = t.length()
              , a = t.at(r - 1);
            return !(a > this.blockSize << 2) && (t.truncate(a),
            !0)
        }
        ,
        o.cfb = function(t) {
            t = t || {},
            this.name = "CFB",
            this.cipher = t.cipher,
            this.blockSize = t.blockSize || 16,
            this._ints = this.blockSize / 4,
            this._inBlock = null,
            this._outBlock = new Array(this._ints),
            this._partialBlock = new Array(this._ints),
            this._partialOutput = s.util.createBuffer(),
            this._partialBytes = 0
        }
        ,
        o.cfb.prototype.start = function(t) {
            if (!("iv"in t))
                throw new Error("Invalid IV parameter.");
            this._iv = a(t.iv, this.blockSize),
            this._inBlock = this._iv.slice(0),
            this._partialBytes = 0
        }
        ,
        o.cfb.prototype.encrypt = function(t, e, r) {
            var a = t.length();
            if (0 === a)
                return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock),
            0 === this._partialBytes && a >= this.blockSize)
                for (var i = 0; i < this._ints; ++i)
                    this._inBlock[i] = t.getInt32() ^ this._outBlock[i],
                    e.putInt32(this._inBlock[i]);
            else {
                var n = (this.blockSize - a) % this.blockSize;
                n > 0 && (n = this.blockSize - n),
                this._partialOutput.clear();
                for (var i = 0; i < this._ints; ++i)
                    this._partialBlock[i] = t.getInt32() ^ this._outBlock[i],
                    this._partialOutput.putInt32(this._partialBlock[i]);
                if (n > 0)
                    t.read -= this.blockSize;
                else
                    for (var i = 0; i < this._ints; ++i)
                        this._inBlock[i] = this._partialBlock[i];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes),
                n > 0 && !r)
                    return e.putBytes(this._partialOutput.getBytes(n - this._partialBytes)),
                    this._partialBytes = n,
                    !0;
                e.putBytes(this._partialOutput.getBytes(a - this._partialBytes)),
                this._partialBytes = 0
            }
        }
        ,
        o.cfb.prototype.decrypt = function(t, e, r) {
            var a = t.length();
            if (0 === a)
                return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock),
            0 === this._partialBytes && a >= this.blockSize)
                for (var i = 0; i < this._ints; ++i)
                    this._inBlock[i] = t.getInt32(),
                    e.putInt32(this._inBlock[i] ^ this._outBlock[i]);
            else {
                var n = (this.blockSize - a) % this.blockSize;
                n > 0 && (n = this.blockSize - n),
                this._partialOutput.clear();
                for (var i = 0; i < this._ints; ++i)
                    this._partialBlock[i] = t.getInt32(),
                    this._partialOutput.putInt32(this._partialBlock[i] ^ this._outBlock[i]);
                if (n > 0)
                    t.read -= this.blockSize;
                else
                    for (var i = 0; i < this._ints; ++i)
                        this._inBlock[i] = this._partialBlock[i];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes),
                n > 0 && !r)
                    return e.putBytes(this._partialOutput.getBytes(n - this._partialBytes)),
                    this._partialBytes = n,
                    !0;
                e.putBytes(this._partialOutput.getBytes(a - this._partialBytes)),
                this._partialBytes = 0
            }
        }
        ,
        o.ofb = function(t) {
            t = t || {},
            this.name = "OFB",
            this.cipher = t.cipher,
            this.blockSize = t.blockSize || 16,
            this._ints = this.blockSize / 4,
            this._inBlock = null,
            this._outBlock = new Array(this._ints),
            this._partialOutput = s.util.createBuffer(),
            this._partialBytes = 0
        }
        ,
        o.ofb.prototype.start = function(t) {
            if (!("iv"in t))
                throw new Error("Invalid IV parameter.");
            this._iv = a(t.iv, this.blockSize),
            this._inBlock = this._iv.slice(0),
            this._partialBytes = 0
        }
        ,
        o.ofb.prototype.encrypt = function(t, e, r) {
            var a = t.length();
            if (0 === t.length())
                return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock),
            0 === this._partialBytes && a >= this.blockSize)
                for (var i = 0; i < this._ints; ++i)
                    e.putInt32(t.getInt32() ^ this._outBlock[i]),
                    this._inBlock[i] = this._outBlock[i];
            else {
                var n = (this.blockSize - a) % this.blockSize;
                n > 0 && (n = this.blockSize - n),
                this._partialOutput.clear();
                for (var i = 0; i < this._ints; ++i)
                    this._partialOutput.putInt32(t.getInt32() ^ this._outBlock[i]);
                if (n > 0)
                    t.read -= this.blockSize;
                else
                    for (var i = 0; i < this._ints; ++i)
                        this._inBlock[i] = this._outBlock[i];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes),
                n > 0 && !r)
                    return e.putBytes(this._partialOutput.getBytes(n - this._partialBytes)),
                    this._partialBytes = n,
                    !0;
                e.putBytes(this._partialOutput.getBytes(a - this._partialBytes)),
                this._partialBytes = 0
            }
        }
        ,
        o.ofb.prototype.decrypt = o.ofb.prototype.encrypt,
        o.ctr = function(t) {
            t = t || {},
            this.name = "CTR",
            this.cipher = t.cipher,
            this.blockSize = t.blockSize || 16,
            this._ints = this.blockSize / 4,
            this._inBlock = null,
            this._outBlock = new Array(this._ints),
            this._partialOutput = s.util.createBuffer(),
            this._partialBytes = 0
        }
        ,
        o.ctr.prototype.start = function(t) {
            if (!("iv"in t))
                throw new Error("Invalid IV parameter.");
            this._iv = a(t.iv, this.blockSize),
            this._inBlock = this._iv.slice(0),
            this._partialBytes = 0
        }
        ,
        o.ctr.prototype.encrypt = function(t, e, r) {
            var a = t.length();
            if (0 === a)
                return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock),
            0 === this._partialBytes && a >= this.blockSize)
                for (var n = 0; n < this._ints; ++n)
                    e.putInt32(t.getInt32() ^ this._outBlock[n]);
            else {
                var s = (this.blockSize - a) % this.blockSize;
                s > 0 && (s = this.blockSize - s),
                this._partialOutput.clear();
                for (var n = 0; n < this._ints; ++n)
                    this._partialOutput.putInt32(t.getInt32() ^ this._outBlock[n]);
                if (s > 0 && (t.read -= this.blockSize),
                this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes),
                s > 0 && !r)
                    return e.putBytes(this._partialOutput.getBytes(s - this._partialBytes)),
                    this._partialBytes = s,
                    !0;
                e.putBytes(this._partialOutput.getBytes(a - this._partialBytes)),
                this._partialBytes = 0
            }
            i(this._inBlock)
        }
        ,
        o.ctr.prototype.decrypt = o.ctr.prototype.encrypt,
        o.gcm = function(t) {
            t = t || {},
            this.name = "GCM",
            this.cipher = t.cipher,
            this.blockSize = t.blockSize || 16,
            this._ints = this.blockSize / 4,
            this._inBlock = new Array(this._ints),
            this._outBlock = new Array(this._ints),
            this._partialOutput = s.util.createBuffer(),
            this._partialBytes = 0,
            this._R = 3774873600
        }
        ,
        o.gcm.prototype.start = function(t) {
            if (!("iv"in t))
                throw new Error("Invalid IV parameter.");
            var e = s.util.createBuffer(t.iv);
            this._cipherLength = 0;
            var r;
            if (r = "additionalData"in t ? s.util.createBuffer(t.additionalData) : s.util.createBuffer(),
            this._tagLength = "tagLength"in t ? t.tagLength : 128,
            this._tag = null,
            t.decrypt && (this._tag = s.util.createBuffer(t.tag).getBytes(),
            this._tag.length !== this._tagLength / 8))
                throw new Error("Authentication tag does not match tag length.");
            this._hashBlock = new Array(this._ints),
            this.tag = null,
            this._hashSubkey = new Array(this._ints),
            this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey),
            this.componentBits = 4,
            this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
            var a = e.length();
            if (12 === a)
                this._j0 = [e.getInt32(), e.getInt32(), e.getInt32(), 1];
            else {
                for (this._j0 = [0, 0, 0, 0]; e.length() > 0; )
                    this._j0 = this.ghash(this._hashSubkey, this._j0, [e.getInt32(), e.getInt32(), e.getInt32(), e.getInt32()]);
                this._j0 = this.ghash(this._hashSubkey, this._j0, [0, 0].concat(n(8 * a)))
            }
            this._inBlock = this._j0.slice(0),
            i(this._inBlock),
            this._partialBytes = 0,
            r = s.util.createBuffer(r),
            this._aDataLength = n(8 * r.length());
            var o = r.length() % this.blockSize;
            for (o && r.fillWithByte(0, this.blockSize - o),
            this._s = [0, 0, 0, 0]; r.length() > 0; )
                this._s = this.ghash(this._hashSubkey, this._s, [r.getInt32(), r.getInt32(), r.getInt32(), r.getInt32()])
        }
        ,
        o.gcm.prototype.encrypt = function(t, e, r) {
            var a = t.length();
            if (0 === a)
                return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock),
            0 === this._partialBytes && a >= this.blockSize) {
                for (var n = 0; n < this._ints; ++n)
                    e.putInt32(this._outBlock[n] ^= t.getInt32());
                this._cipherLength += this.blockSize
            } else {
                var s = (this.blockSize - a) % this.blockSize;
                s > 0 && (s = this.blockSize - s),
                this._partialOutput.clear();
                for (var n = 0; n < this._ints; ++n)
                    this._partialOutput.putInt32(t.getInt32() ^ this._outBlock[n]);
                if (s <= 0 || r) {
                    if (r) {
                        var o = a % this.blockSize;
                        this._cipherLength += o,
                        this._partialOutput.truncate(this.blockSize - o)
                    } else
                        this._cipherLength += this.blockSize;
                    for (var n = 0; n < this._ints; ++n)
                        this._outBlock[n] = this._partialOutput.getInt32();
                    this._partialOutput.read -= this.blockSize
                }
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes),
                s > 0 && !r)
                    return t.read -= this.blockSize,
                    e.putBytes(this._partialOutput.getBytes(s - this._partialBytes)),
                    this._partialBytes = s,
                    !0;
                e.putBytes(this._partialOutput.getBytes(a - this._partialBytes)),
                this._partialBytes = 0
            }
            this._s = this.ghash(this._hashSubkey, this._s, this._outBlock),
            i(this._inBlock)
        }
        ,
        o.gcm.prototype.decrypt = function(t, e, r) {
            var a = t.length();
            if (a < this.blockSize && !(r && a > 0))
                return !0;
            this.cipher.encrypt(this._inBlock, this._outBlock),
            i(this._inBlock),
            this._hashBlock[0] = t.getInt32(),
            this._hashBlock[1] = t.getInt32(),
            this._hashBlock[2] = t.getInt32(),
            this._hashBlock[3] = t.getInt32(),
            this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
            for (var n = 0; n < this._ints; ++n)
                e.putInt32(this._outBlock[n] ^ this._hashBlock[n]);
            a < this.blockSize ? this._cipherLength += a % this.blockSize : this._cipherLength += this.blockSize
        }
        ,
        o.gcm.prototype.afterFinish = function(t, e) {
            var r = !0;
            e.decrypt && e.overflow && t.truncate(this.blockSize - e.overflow),
            this.tag = s.util.createBuffer();
            var a = this._aDataLength.concat(n(8 * this._cipherLength));
            this._s = this.ghash(this._hashSubkey, this._s, a);
            var i = [];
            this.cipher.encrypt(this._j0, i);
            for (var o = 0; o < this._ints; ++o)
                this.tag.putInt32(this._s[o] ^ i[o]);
            return this.tag.truncate(this.tag.length() % (this._tagLength / 8)),
            e.decrypt && this.tag.bytes() !== this._tag && (r = !1),
            r
        }
        ,
        o.gcm.prototype.multiply = function(t, e) {
            for (var r = [0, 0, 0, 0], a = e.slice(0), i = 0; i < 128; ++i) {
                t[i / 32 | 0] & 1 << 31 - i % 32 && (r[0] ^= a[0],
                r[1] ^= a[1],
                r[2] ^= a[2],
                r[3] ^= a[3]),
                this.pow(a, a)
            }
            return r
        }
        ,
        o.gcm.prototype.pow = function(t, e) {
            for (var r = 1 & t[3], a = 3; a > 0; --a)
                e[a] = t[a] >>> 1 | (1 & t[a - 1]) << 31;
            e[0] = t[0] >>> 1,
            r && (e[0] ^= this._R)
        }
        ,
        o.gcm.prototype.tableMultiply = function(t) {
            for (var e = [0, 0, 0, 0], r = 0; r < 32; ++r) {
                var a = r / 8 | 0
                  , i = t[a] >>> 4 * (7 - r % 8) & 15
                  , n = this._m[r][i];
                e[0] ^= n[0],
                e[1] ^= n[1],
                e[2] ^= n[2],
                e[3] ^= n[3]
            }
            return e
        }
        ,
        o.gcm.prototype.ghash = function(t, e, r) {
            return e[0] ^= r[0],
            e[1] ^= r[1],
            e[2] ^= r[2],
            e[3] ^= r[3],
            this.tableMultiply(e)
        }
        ,
        o.gcm.prototype.generateHashTable = function(t, e) {
            for (var r = 8 / e, a = 4 * r, i = 16 * r, n = new Array(i), s = 0; s < i; ++s) {
                var o = [0, 0, 0, 0]
                  , u = s / a | 0
                  , c = (a - 1 - s % a) * e;
                o[u] = 1 << e - 1 << c,
                n[s] = this.generateSubHashTable(this.multiply(o, t), e)
            }
            return n
        }
        ,
        o.gcm.prototype.generateSubHashTable = function(t, e) {
            var r = 1 << e
              , a = r >>> 1
              , i = new Array(r);
            i[a] = t.slice(0);
            for (var n = a >>> 1; n > 0; )
                this.pow(i[2 * n], i[n] = []),
                n >>= 1;
            for (n = 2; n < a; ) {
                for (var s = 1; s < n; ++s) {
                    var o = i[n]
                      , u = i[s];
                    i[n + s] = [o[0] ^ u[0], o[1] ^ u[1], o[2] ^ u[2], o[3] ^ u[3]]
                }
                n *= 2
            }
            for (i[0] = [0, 0, 0, 0],
            n = a + 1; n < r; ++n) {
                var c = i[n ^ a];
                i[n] = [t[0] ^ c[0], t[1] ^ c[1], t[2] ^ c[2], t[3] ^ c[3]]
            }
            return i
        }
    }
    , function(t, e, r) {
        function a(t, e, r) {
            this.data = [],
            null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
        }
        function i() {
            return new a(null)
        }
        function n(t, e, r, a, i, n) {
            for (; --n >= 0; ) {
                var s = e * this.data[t++] + r.data[a] + i;
                i = Math.floor(s / 67108864),
                r.data[a++] = 67108863 & s
            }
            return i
        }
        function s(t, e, r, a, i, n) {
            for (var s = 32767 & e, o = e >> 15; --n >= 0; ) {
                var u = 32767 & this.data[t]
                  , c = this.data[t++] >> 15
                  , l = o * u + c * s;
                u = s * u + ((32767 & l) << 15) + r.data[a] + (1073741823 & i),
                i = (u >>> 30) + (l >>> 15) + o * c + (i >>> 30),
                r.data[a++] = 1073741823 & u
            }
            return i
        }
        function o(t, e, r, a, i, n) {
            for (var s = 16383 & e, o = e >> 14; --n >= 0; ) {
                var u = 16383 & this.data[t]
                  , c = this.data[t++] >> 14
                  , l = o * u + c * s;
                u = s * u + ((16383 & l) << 14) + r.data[a] + i,
                i = (u >> 28) + (l >> 14) + o * c,
                r.data[a++] = 268435455 & u
            }
            return i
        }
        function u(t) {
            return ne.charAt(t)
        }
        function c(t, e) {
            var r = se[t.charCodeAt(e)];
            return null == r ? -1 : r
        }
        function l(t) {
            for (var e = this.t - 1; e >= 0; --e)
                t.data[e] = this.data[e];
            t.t = this.t,
            t.s = this.s
        }
        function h(t) {
            this.t = 1,
            this.s = t < 0 ? -1 : 0,
            t > 0 ? this.data[0] = t : t < -1 ? this.data[0] = t + this.DV : this.t = 0
        }
        function p(t) {
            var e = i();
            return e.fromInt(t),
            e
        }
        function f(t, e) {
            var r;
            if (16 == e)
                r = 4;
            else if (8 == e)
                r = 3;
            else if (256 == e)
                r = 8;
            else if (2 == e)
                r = 1;
            else if (32 == e)
                r = 5;
            else {
                if (4 != e)
                    return void this.fromRadix(t, e);
                r = 2
            }
            this.t = 0,
            this.s = 0;
            for (var i = t.length, n = !1, s = 0; --i >= 0; ) {
                var o = 8 == r ? 255 & t[i] : c(t, i);
                o < 0 ? "-" == t.charAt(i) && (n = !0) : (n = !1,
                0 == s ? this.data[this.t++] = o : s + r > this.DB ? (this.data[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s,
                this.data[this.t++] = o >> this.DB - s) : this.data[this.t - 1] |= o << s,
                (s += r) >= this.DB && (s -= this.DB))
            }
            8 == r && 0 != (128 & t[0]) && (this.s = -1,
            s > 0 && (this.data[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
            this.clamp(),
            n && a.ZERO.subTo(this, this)
        }
        function d() {
            for (var t = this.s & this.DM; this.t > 0 && this.data[this.t - 1] == t; )
                --this.t
        }
        function y(t) {
            if (this.s < 0)
                return "-" + this.negate().toString(t);
            var e;
            if (16 == t)
                e = 4;
            else if (8 == t)
                e = 3;
            else if (2 == t)
                e = 1;
            else if (32 == t)
                e = 5;
            else {
                if (4 != t)
                    return this.toRadix(t);
                e = 2
            }
            var r, a = (1 << e) - 1, i = !1, n = "", s = this.t, o = this.DB - s * this.DB % e;
            if (s-- > 0)
                for (o < this.DB && (r = this.data[s] >> o) > 0 && (i = !0,
                n = u(r)); s >= 0; )
                    o < e ? (r = (this.data[s] & (1 << o) - 1) << e - o,
                    r |= this.data[--s] >> (o += this.DB - e)) : (r = this.data[s] >> (o -= e) & a,
                    o <= 0 && (o += this.DB,
                    --s)),
                    r > 0 && (i = !0),
                    i && (n += u(r));
            return i ? n : "0"
        }
        function g() {
            var t = i();
            return a.ZERO.subTo(this, t),
            t
        }
        function m() {
            return this.s < 0 ? this.negate() : this
        }
        function v(t) {
            var e = this.s - t.s;
            if (0 != e)
                return e;
            var r = this.t;
            if (0 != (e = r - t.t))
                return this.s < 0 ? -e : e;
            for (; --r >= 0; )
                if (0 != (e = this.data[r] - t.data[r]))
                    return e;
            return 0
        }
        function C(t) {
            var e, r = 1;
            return 0 != (e = t >>> 16) && (t = e,
            r += 16),
            0 != (e = t >> 8) && (t = e,
            r += 8),
            0 != (e = t >> 4) && (t = e,
            r += 4),
            0 != (e = t >> 2) && (t = e,
            r += 2),
            0 != (e = t >> 1) && (t = e,
            r += 1),
            r
        }
        function E() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + C(this.data[this.t - 1] ^ this.s & this.DM)
        }
        function S(t, e) {
            var r;
            for (r = this.t - 1; r >= 0; --r)
                e.data[r + t] = this.data[r];
            for (r = t - 1; r >= 0; --r)
                e.data[r] = 0;
            e.t = this.t + t,
            e.s = this.s
        }
        function T(t, e) {
            for (var r = t; r < this.t; ++r)
                e.data[r - t] = this.data[r];
            e.t = Math.max(this.t - t, 0),
            e.s = this.s
        }
        function I(t, e) {
            var r, a = t % this.DB, i = this.DB - a, n = (1 << i) - 1, s = Math.floor(t / this.DB), o = this.s << a & this.DM;
            for (r = this.t - 1; r >= 0; --r)
                e.data[r + s + 1] = this.data[r] >> i | o,
                o = (this.data[r] & n) << a;
            for (r = s - 1; r >= 0; --r)
                e.data[r] = 0;
            e.data[s] = o,
            e.t = this.t + s + 1,
            e.s = this.s,
            e.clamp()
        }
        function b(t, e) {
            e.s = this.s;
            var r = Math.floor(t / this.DB);
            if (r >= this.t)
                return void (e.t = 0);
            var a = t % this.DB
              , i = this.DB - a
              , n = (1 << a) - 1;
            e.data[0] = this.data[r] >> a;
            for (var s = r + 1; s < this.t; ++s)
                e.data[s - r - 1] |= (this.data[s] & n) << i,
                e.data[s - r] = this.data[s] >> a;
            a > 0 && (e.data[this.t - r - 1] |= (this.s & n) << i),
            e.t = this.t - r,
            e.clamp()
        }
        function A(t, e) {
            for (var r = 0, a = 0, i = Math.min(t.t, this.t); r < i; )
                a += this.data[r] - t.data[r],
                e.data[r++] = a & this.DM,
                a >>= this.DB;
            if (t.t < this.t) {
                for (a -= t.s; r < this.t; )
                    a += this.data[r],
                    e.data[r++] = a & this.DM,
                    a >>= this.DB;
                a += this.s
            } else {
                for (a += this.s; r < t.t; )
                    a -= t.data[r],
                    e.data[r++] = a & this.DM,
                    a >>= this.DB;
                a -= t.s
            }
            e.s = a < 0 ? -1 : 0,
            a < -1 ? e.data[r++] = this.DV + a : a > 0 && (e.data[r++] = a),
            e.t = r,
            e.clamp()
        }
        function B(t, e) {
            var r = this.abs()
              , i = t.abs()
              , n = r.t;
            for (e.t = n + i.t; --n >= 0; )
                e.data[n] = 0;
            for (n = 0; n < i.t; ++n)
                e.data[n + r.t] = r.am(0, i.data[n], e, n, 0, r.t);
            e.s = 0,
            e.clamp(),
            this.s != t.s && a.ZERO.subTo(e, e)
        }
        function N(t) {
            for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0; )
                t.data[r] = 0;
            for (r = 0; r < e.t - 1; ++r) {
                var a = e.am(r, e.data[r], t, 2 * r, 0, 1);
                (t.data[r + e.t] += e.am(r + 1, 2 * e.data[r], t, 2 * r + 1, a, e.t - r - 1)) >= e.DV && (t.data[r + e.t] -= e.DV,
                t.data[r + e.t + 1] = 1)
            }
            t.t > 0 && (t.data[t.t - 1] += e.am(r, e.data[r], t, 2 * r, 0, 1)),
            t.s = 0,
            t.clamp()
        }
        function R(t, e, r) {
            var n = t.abs();
            if (!(n.t <= 0)) {
                var s = this.abs();
                if (s.t < n.t)
                    return null != e && e.fromInt(0),
                    void (null != r && this.copyTo(r));
                null == r && (r = i());
                var o = i()
                  , u = this.s
                  , c = t.s
                  , l = this.DB - C(n.data[n.t - 1]);
                l > 0 ? (n.lShiftTo(l, o),
                s.lShiftTo(l, r)) : (n.copyTo(o),
                s.copyTo(r));
                var h = o.t
                  , p = o.data[h - 1];
                if (0 != p) {
                    var f = p * (1 << this.F1) + (h > 1 ? o.data[h - 2] >> this.F2 : 0)
                      , d = this.FV / f
                      , y = (1 << this.F1) / f
                      , g = 1 << this.F2
                      , m = r.t
                      , v = m - h
                      , E = null == e ? i() : e;
                    for (o.dlShiftTo(v, E),
                    r.compareTo(E) >= 0 && (r.data[r.t++] = 1,
                    r.subTo(E, r)),
                    a.ONE.dlShiftTo(h, E),
                    E.subTo(o, o); o.t < h; )
                        o.data[o.t++] = 0;
                    for (; --v >= 0; ) {
                        var S = r.data[--m] == p ? this.DM : Math.floor(r.data[m] * d + (r.data[m - 1] + g) * y);
                        if ((r.data[m] += o.am(0, S, r, v, 0, h)) < S)
                            for (o.dlShiftTo(v, E),
                            r.subTo(E, r); r.data[m] < --S; )
                                r.subTo(E, r)
                    }
                    null != e && (r.drShiftTo(h, e),
                    u != c && a.ZERO.subTo(e, e)),
                    r.t = h,
                    r.clamp(),
                    l > 0 && r.rShiftTo(l, r),
                    u < 0 && a.ZERO.subTo(r, r)
                }
            }
        }
        function w(t) {
            var e = i();
            return this.abs().divRemTo(t, null, e),
            this.s < 0 && e.compareTo(a.ZERO) > 0 && t.subTo(e, e),
            e
        }
        function L(t) {
            this.m = t
        }
        function U(t) {
            return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
        }
        function k(t) {
            return t
        }
        function D(t) {
            t.divRemTo(this.m, null, t)
        }
        function P(t, e, r) {
            t.multiplyTo(e, r),
            this.reduce(r)
        }
        function O(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        function V() {
            if (this.t < 1)
                return 0;
            var t = this.data[0];
            if (0 == (1 & t))
                return 0;
            var e = 3 & t;
            return e = e * (2 - (15 & t) * e) & 15,
            e = e * (2 - (255 & t) * e) & 255,
            e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
            e = e * (2 - t * e % this.DV) % this.DV,
            e > 0 ? this.DV - e : -e
        }
        function _(t) {
            this.m = t,
            this.mp = t.invDigit(),
            this.mpl = 32767 & this.mp,
            this.mph = this.mp >> 15,
            this.um = (1 << t.DB - 15) - 1,
            this.mt2 = 2 * t.t
        }
        function K(t) {
            var e = i();
            return t.abs().dlShiftTo(this.m.t, e),
            e.divRemTo(this.m, null, e),
            t.s < 0 && e.compareTo(a.ZERO) > 0 && this.m.subTo(e, e),
            e
        }
        function x(t) {
            var e = i();
            return t.copyTo(e),
            this.reduce(e),
            e
        }
        function M(t) {
            for (; t.t <= this.mt2; )
                t.data[t.t++] = 0;
            for (var e = 0; e < this.m.t; ++e) {
                var r = 32767 & t.data[e]
                  , a = r * this.mpl + ((r * this.mph + (t.data[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                for (r = e + this.m.t,
                t.data[r] += this.m.am(0, a, t, e, 0, this.m.t); t.data[r] >= t.DV; )
                    t.data[r] -= t.DV,
                    t.data[++r]++
            }
            t.clamp(),
            t.drShiftTo(this.m.t, t),
            t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
        }
        function F(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        function j(t, e, r) {
            t.multiplyTo(e, r),
            this.reduce(r)
        }
        function q() {
            return 0 == (this.t > 0 ? 1 & this.data[0] : this.s)
        }
        function G(t, e) {
            if (t > 4294967295 || t < 1)
                return a.ONE;
            var r = i()
              , n = i()
              , s = e.convert(this)
              , o = C(t) - 1;
            for (s.copyTo(r); --o >= 0; )
                if (e.sqrTo(r, n),
                (t & 1 << o) > 0)
                    e.mulTo(n, s, r);
                else {
                    var u = r;
                    r = n,
                    n = u
                }
            return e.revert(r)
        }
        function Q(t, e) {
            var r;
            return r = t < 256 || e.isEven() ? new L(e) : new _(e),
            this.exp(t, r)
        }
        function z() {
            var t = i();
            return this.copyTo(t),
            t
        }
        function H() {
            if (this.s < 0) {
                if (1 == this.t)
                    return this.data[0] - this.DV;
                if (0 == this.t)
                    return -1
            } else {
                if (1 == this.t)
                    return this.data[0];
                if (0 == this.t)
                    return 0
            }
            return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0]
        }
        function W() {
            return 0 == this.t ? this.s : this.data[0] << 24 >> 24
        }
        function X() {
            return 0 == this.t ? this.s : this.data[0] << 16 >> 16
        }
        function Y(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
        }
        function Z() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this.data[0] <= 0 ? 0 : 1
        }
        function J(t) {
            if (null == t && (t = 10),
            0 == this.signum() || t < 2 || t > 36)
                return "0";
            var e = this.chunkSize(t)
              , r = Math.pow(t, e)
              , a = p(r)
              , n = i()
              , s = i()
              , o = "";
            for (this.divRemTo(a, n, s); n.signum() > 0; )
                o = (r + s.intValue()).toString(t).substr(1) + o,
                n.divRemTo(a, n, s);
            return s.intValue().toString(t) + o
        }
        function $(t, e) {
            this.fromInt(0),
            null == e && (e = 10);
            for (var r = this.chunkSize(e), i = Math.pow(e, r), n = !1, s = 0, o = 0, u = 0; u < t.length; ++u) {
                var l = c(t, u);
                l < 0 ? "-" == t.charAt(u) && 0 == this.signum() && (n = !0) : (o = e * o + l,
                ++s >= r && (this.dMultiply(i),
                this.dAddOffset(o, 0),
                s = 0,
                o = 0))
            }
            s > 0 && (this.dMultiply(Math.pow(e, s)),
            this.dAddOffset(o, 0)),
            n && a.ZERO.subTo(this, this)
        }
        function tt(t, e, r) {
            if ("number" == typeof e)
                if (t < 2)
                    this.fromInt(1);
                else
                    for (this.fromNumber(t, r),
                    this.testBit(t - 1) || this.bitwiseTo(a.ONE.shiftLeft(t - 1), ut, this),
                    this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e); )
                        this.dAddOffset(2, 0),
                        this.bitLength() > t && this.subTo(a.ONE.shiftLeft(t - 1), this);
            else {
                var i = new Array
                  , n = 7 & t;
                i.length = 1 + (t >> 3),
                e.nextBytes(i),
                n > 0 ? i[0] &= (1 << n) - 1 : i[0] = 0,
                this.fromString(i, 256)
            }
        }
        function et() {
            var t = this.t
              , e = new Array;
            e[0] = this.s;
            var r, a = this.DB - t * this.DB % 8, i = 0;
            if (t-- > 0)
                for (a < this.DB && (r = this.data[t] >> a) != (this.s & this.DM) >> a && (e[i++] = r | this.s << this.DB - a); t >= 0; )
                    a < 8 ? (r = (this.data[t] & (1 << a) - 1) << 8 - a,
                    r |= this.data[--t] >> (a += this.DB - 8)) : (r = this.data[t] >> (a -= 8) & 255,
                    a <= 0 && (a += this.DB,
                    --t)),
                    0 != (128 & r) && (r |= -256),
                    0 == i && (128 & this.s) != (128 & r) && ++i,
                    (i > 0 || r != this.s) && (e[i++] = r);
            return e
        }
        function rt(t) {
            return 0 == this.compareTo(t)
        }
        function at(t) {
            return this.compareTo(t) < 0 ? this : t
        }
        function it(t) {
            return this.compareTo(t) > 0 ? this : t
        }
        function nt(t, e, r) {
            var a, i, n = Math.min(t.t, this.t);
            for (a = 0; a < n; ++a)
                r.data[a] = e(this.data[a], t.data[a]);
            if (t.t < this.t) {
                for (i = t.s & this.DM,
                a = n; a < this.t; ++a)
                    r.data[a] = e(this.data[a], i);
                r.t = this.t
            } else {
                for (i = this.s & this.DM,
                a = n; a < t.t; ++a)
                    r.data[a] = e(i, t.data[a]);
                r.t = t.t
            }
            r.s = e(this.s, t.s),
            r.clamp()
        }
        function st(t, e) {
            return t & e
        }
        function ot(t) {
            var e = i();
            return this.bitwiseTo(t, st, e),
            e
        }
        function ut(t, e) {
            return t | e
        }
        function ct(t) {
            var e = i();
            return this.bitwiseTo(t, ut, e),
            e
        }
        function lt(t, e) {
            return t ^ e
        }
        function ht(t) {
            var e = i();
            return this.bitwiseTo(t, lt, e),
            e
        }
        function pt(t, e) {
            return t & ~e
        }
        function ft(t) {
            var e = i();
            return this.bitwiseTo(t, pt, e),
            e
        }
        function dt() {
            for (var t = i(), e = 0; e < this.t; ++e)
                t.data[e] = this.DM & ~this.data[e];
            return t.t = this.t,
            t.s = ~this.s,
            t
        }
        function yt(t) {
            var e = i();
            return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
            e
        }
        function gt(t) {
            var e = i();
            return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
            e
        }
        function mt(t) {
            if (0 == t)
                return -1;
            var e = 0;
            return 0 == (65535 & t) && (t >>= 16,
            e += 16),
            0 == (255 & t) && (t >>= 8,
            e += 8),
            0 == (15 & t) && (t >>= 4,
            e += 4),
            0 == (3 & t) && (t >>= 2,
            e += 2),
            0 == (1 & t) && ++e,
            e
        }
        function vt() {
            for (var t = 0; t < this.t; ++t)
                if (0 != this.data[t])
                    return t * this.DB + mt(this.data[t]);
            return this.s < 0 ? this.t * this.DB : -1
        }
        function Ct(t) {
            for (var e = 0; 0 != t; )
                t &= t - 1,
                ++e;
            return e
        }
        function Et() {
            for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r)
                t += Ct(this.data[r] ^ e);
            return t
        }
        function St(t) {
            var e = Math.floor(t / this.DB);
            return e >= this.t ? 0 != this.s : 0 != (this.data[e] & 1 << t % this.DB)
        }
        function Tt(t, e) {
            var r = a.ONE.shiftLeft(t);
            return this.bitwiseTo(r, e, r),
            r
        }
        function It(t) {
            return this.changeBit(t, ut)
        }
        function bt(t) {
            return this.changeBit(t, pt)
        }
        function At(t) {
            return this.changeBit(t, lt)
        }
        function Bt(t, e) {
            for (var r = 0, a = 0, i = Math.min(t.t, this.t); r < i; )
                a += this.data[r] + t.data[r],
                e.data[r++] = a & this.DM,
                a >>= this.DB;
            if (t.t < this.t) {
                for (a += t.s; r < this.t; )
                    a += this.data[r],
                    e.data[r++] = a & this.DM,
                    a >>= this.DB;
                a += this.s
            } else {
                for (a += this.s; r < t.t; )
                    a += t.data[r],
                    e.data[r++] = a & this.DM,
                    a >>= this.DB;
                a += t.s
            }
            e.s = a < 0 ? -1 : 0,
            a > 0 ? e.data[r++] = a : a < -1 && (e.data[r++] = this.DV + a),
            e.t = r,
            e.clamp()
        }
        function Nt(t) {
            var e = i();
            return this.addTo(t, e),
            e
        }
        function Rt(t) {
            var e = i();
            return this.subTo(t, e),
            e
        }
        function wt(t) {
            var e = i();
            return this.multiplyTo(t, e),
            e
        }
        function Lt(t) {
            var e = i();
            return this.divRemTo(t, e, null),
            e
        }
        function Ut(t) {
            var e = i();
            return this.divRemTo(t, null, e),
            e
        }
        function kt(t) {
            var e = i()
              , r = i();
            return this.divRemTo(t, e, r),
            new Array(e,r)
        }
        function Dt(t) {
            this.data[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
            ++this.t,
            this.clamp()
        }
        function Pt(t, e) {
            if (0 != t) {
                for (; this.t <= e; )
                    this.data[this.t++] = 0;
                for (this.data[e] += t; this.data[e] >= this.DV; )
                    this.data[e] -= this.DV,
                    ++e >= this.t && (this.data[this.t++] = 0),
                    ++this.data[e]
            }
        }
        function Ot() {}
        function Vt(t) {
            return t
        }
        function _t(t, e, r) {
            t.multiplyTo(e, r)
        }
        function Kt(t, e) {
            t.squareTo(e)
        }
        function xt(t) {
            return this.exp(t, new Ot)
        }
        function Mt(t, e, r) {
            var a = Math.min(this.t + t.t, e);
            for (r.s = 0,
            r.t = a; a > 0; )
                r.data[--a] = 0;
            var i;
            for (i = r.t - this.t; a < i; ++a)
                r.data[a + this.t] = this.am(0, t.data[a], r, a, 0, this.t);
            for (i = Math.min(t.t, e); a < i; ++a)
                this.am(0, t.data[a], r, a, 0, e - a);
            r.clamp()
        }
        function Ft(t, e, r) {
            --e;
            var a = r.t = this.t + t.t - e;
            for (r.s = 0; --a >= 0; )
                r.data[a] = 0;
            for (a = Math.max(e - this.t, 0); a < t.t; ++a)
                r.data[this.t + a - e] = this.am(e - a, t.data[a], r, 0, 0, this.t + a - e);
            r.clamp(),
            r.drShiftTo(1, r)
        }
        function jt(t) {
            this.r2 = i(),
            this.q3 = i(),
            a.ONE.dlShiftTo(2 * t.t, this.r2),
            this.mu = this.r2.divide(t),
            this.m = t
        }
        function qt(t) {
            if (t.s < 0 || t.t > 2 * this.m.t)
                return t.mod(this.m);
            if (t.compareTo(this.m) < 0)
                return t;
            var e = i();
            return t.copyTo(e),
            this.reduce(e),
            e
        }
        function Gt(t) {
            return t
        }
        function Qt(t) {
            for (t.drShiftTo(this.m.t - 1, this.r2),
            t.t > this.m.t + 1 && (t.t = this.m.t + 1,
            t.clamp()),
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
                t.dAddOffset(1, this.m.t + 1);
            for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
                t.subTo(this.m, t)
        }
        function zt(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        function Ht(t, e, r) {
            t.multiplyTo(e, r),
            this.reduce(r)
        }
        function Wt(t, e) {
            var r, a, n = t.bitLength(), s = p(1);
            if (n <= 0)
                return s;
            r = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6,
            a = n < 8 ? new L(e) : e.isEven() ? new jt(e) : new _(e);
            var o = new Array
              , u = 3
              , c = r - 1
              , l = (1 << r) - 1;
            if (o[1] = a.convert(this),
            r > 1) {
                var h = i();
                for (a.sqrTo(o[1], h); u <= l; )
                    o[u] = i(),
                    a.mulTo(h, o[u - 2], o[u]),
                    u += 2
            }
            var f, d, y = t.t - 1, g = !0, m = i();
            for (n = C(t.data[y]) - 1; y >= 0; ) {
                for (n >= c ? f = t.data[y] >> n - c & l : (f = (t.data[y] & (1 << n + 1) - 1) << c - n,
                y > 0 && (f |= t.data[y - 1] >> this.DB + n - c)),
                u = r; 0 == (1 & f); )
                    f >>= 1,
                    --u;
                if ((n -= u) < 0 && (n += this.DB,
                --y),
                g)
                    o[f].copyTo(s),
                    g = !1;
                else {
                    for (; u > 1; )
                        a.sqrTo(s, m),
                        a.sqrTo(m, s),
                        u -= 2;
                    u > 0 ? a.sqrTo(s, m) : (d = s,
                    s = m,
                    m = d),
                    a.mulTo(m, o[f], s)
                }
                for (; y >= 0 && 0 == (t.data[y] & 1 << n); )
                    a.sqrTo(s, m),
                    d = s,
                    s = m,
                    m = d,
                    --n < 0 && (n = this.DB - 1,
                    --y)
            }
            return a.revert(s)
        }
        function Xt(t) {
            var e = this.s < 0 ? this.negate() : this.clone()
              , r = t.s < 0 ? t.negate() : t.clone();
            if (e.compareTo(r) < 0) {
                var a = e;
                e = r,
                r = a
            }
            var i = e.getLowestSetBit()
              , n = r.getLowestSetBit();
            if (n < 0)
                return e;
            for (i < n && (n = i),
            n > 0 && (e.rShiftTo(n, e),
            r.rShiftTo(n, r)); e.signum() > 0; )
                (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                e.compareTo(r) >= 0 ? (e.subTo(r, e),
                e.rShiftTo(1, e)) : (r.subTo(e, r),
                r.rShiftTo(1, r));
            return n > 0 && r.lShiftTo(n, r),
            r
        }
        function Yt(t) {
            if (t <= 0)
                return 0;
            var e = this.DV % t
              , r = this.s < 0 ? t - 1 : 0;
            if (this.t > 0)
                if (0 == e)
                    r = this.data[0] % t;
                else
                    for (var a = this.t - 1; a >= 0; --a)
                        r = (e * r + this.data[a]) % t;
            return r
        }
        function Zt(t) {
            var e = t.isEven();
            if (this.isEven() && e || 0 == t.signum())
                return a.ZERO;
            for (var r = t.clone(), i = this.clone(), n = p(1), s = p(0), o = p(0), u = p(1); 0 != r.signum(); ) {
                for (; r.isEven(); )
                    r.rShiftTo(1, r),
                    e ? (n.isEven() && s.isEven() || (n.addTo(this, n),
                    s.subTo(t, s)),
                    n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s),
                    s.rShiftTo(1, s);
                for (; i.isEven(); )
                    i.rShiftTo(1, i),
                    e ? (o.isEven() && u.isEven() || (o.addTo(this, o),
                    u.subTo(t, u)),
                    o.rShiftTo(1, o)) : u.isEven() || u.subTo(t, u),
                    u.rShiftTo(1, u);
                r.compareTo(i) >= 0 ? (r.subTo(i, r),
                e && n.subTo(o, n),
                s.subTo(u, s)) : (i.subTo(r, i),
                e && o.subTo(n, o),
                u.subTo(s, u))
            }
            return 0 != i.compareTo(a.ONE) ? a.ZERO : u.compareTo(t) >= 0 ? u.subtract(t) : u.signum() < 0 ? (u.addTo(t, u),
            u.signum() < 0 ? u.add(t) : u) : u
        }
        function Jt(t) {
            var e, r = this.abs();
            if (1 == r.t && r.data[0] <= oe[oe.length - 1]) {
                for (e = 0; e < oe.length; ++e)
                    if (r.data[0] == oe[e])
                        return !0;
                return !1
            }
            if (r.isEven())
                return !1;
            for (e = 1; e < oe.length; ) {
                for (var a = oe[e], i = e + 1; i < oe.length && a < ue; )
                    a *= oe[i++];
                for (a = r.modInt(a); e < i; )
                    if (a % oe[e++] == 0)
                        return !1
            }
            return r.millerRabin(t)
        }
        function $t(t) {
            var e = this.subtract(a.ONE)
              , r = e.getLowestSetBit();
            if (r <= 0)
                return !1;
            for (var i, n = e.shiftRight(r), s = te(), o = 0; o < t; ++o) {
                do {
                    i = new a(this.bitLength(),s)
                } while (i.compareTo(a.ONE) <= 0 || i.compareTo(e) >= 0);
                var u = i.modPow(n, this);
                if (0 != u.compareTo(a.ONE) && 0 != u.compareTo(e)) {
                    for (var c = 1; c++ < r && 0 != u.compareTo(e); )
                        if (u = u.modPowInt(2, this),
                        0 == u.compareTo(a.ONE))
                            return !1;
                    if (0 != u.compareTo(e))
                        return !1
                }
            }
            return !0
        }
        function te() {
            return {
                nextBytes: function(t) {
                    for (var e = 0; e < t.length; ++e)
                        t[e] = Math.floor(256 * Math.random())
                }
            }
        }
        var ee = r(0);
        t.exports = ee.jsbn = ee.jsbn || {};
        var re;
        ee.jsbn.BigInteger = a,
        "undefined" == typeof navigator ? (a.prototype.am = o,
        re = 28) : "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = s,
        re = 30) : "Netscape" != navigator.appName ? (a.prototype.am = n,
        re = 26) : (a.prototype.am = o,
        re = 28),
        a.prototype.DB = re,
        a.prototype.DM = (1 << re) - 1,
        a.prototype.DV = 1 << re;
        a.prototype.FV = Math.pow(2, 52),
        a.prototype.F1 = 52 - re,
        a.prototype.F2 = 2 * re - 52;
        var ae, ie, ne = "0123456789abcdefghijklmnopqrstuvwxyz", se = new Array;
        for (ae = "0".charCodeAt(0),
        ie = 0; ie <= 9; ++ie)
            se[ae++] = ie;
        for (ae = "a".charCodeAt(0),
        ie = 10; ie < 36; ++ie)
            se[ae++] = ie;
        for (ae = "A".charCodeAt(0),
        ie = 10; ie < 36; ++ie)
            se[ae++] = ie;
        L.prototype.convert = U,
        L.prototype.revert = k,
        L.prototype.reduce = D,
        L.prototype.mulTo = P,
        L.prototype.sqrTo = O,
        _.prototype.convert = K,
        _.prototype.revert = x,
        _.prototype.reduce = M,
        _.prototype.mulTo = j,
        _.prototype.sqrTo = F,
        a.prototype.copyTo = l,
        a.prototype.fromInt = h,
        a.prototype.fromString = f,
        a.prototype.clamp = d,
        a.prototype.dlShiftTo = S,
        a.prototype.drShiftTo = T,
        a.prototype.lShiftTo = I,
        a.prototype.rShiftTo = b,
        a.prototype.subTo = A,
        a.prototype.multiplyTo = B,
        a.prototype.squareTo = N,
        a.prototype.divRemTo = R,
        a.prototype.invDigit = V,
        a.prototype.isEven = q,
        a.prototype.exp = G,
        a.prototype.toString = y,
        a.prototype.negate = g,
        a.prototype.abs = m,
        a.prototype.compareTo = v,
        a.prototype.bitLength = E,
        a.prototype.mod = w,
        a.prototype.modPowInt = Q,
        a.ZERO = p(0),
        a.ONE = p(1),
        Ot.prototype.convert = Vt,
        Ot.prototype.revert = Vt,
        Ot.prototype.mulTo = _t,
        Ot.prototype.sqrTo = Kt,
        jt.prototype.convert = qt,
        jt.prototype.revert = Gt,
        jt.prototype.reduce = Qt,
        jt.prototype.mulTo = Ht,
        jt.prototype.sqrTo = zt;
        var oe = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509]
          , ue = (1 << 26) / oe[oe.length - 1];
        a.prototype.chunkSize = Y,
        a.prototype.toRadix = J,
        a.prototype.fromRadix = $,
        a.prototype.fromNumber = tt,
        a.prototype.bitwiseTo = nt,
        a.prototype.changeBit = Tt,
        a.prototype.addTo = Bt,
        a.prototype.dMultiply = Dt,
        a.prototype.dAddOffset = Pt,
        a.prototype.multiplyLowerTo = Mt,
        a.prototype.multiplyUpperTo = Ft,
        a.prototype.modInt = Yt,
        a.prototype.millerRabin = $t,
        a.prototype.clone = z,
        a.prototype.intValue = H,
        a.prototype.byteValue = W,
        a.prototype.shortValue = X,
        a.prototype.signum = Z,
        a.prototype.toByteArray = et,
        a.prototype.equals = rt,
        a.prototype.min = at,
        a.prototype.max = it,
        a.prototype.and = ot,
        a.prototype.or = ct,
        a.prototype.xor = ht,
        a.prototype.andNot = ft,
        a.prototype.not = dt,
        a.prototype.shiftLeft = yt,
        a.prototype.shiftRight = gt,
        a.prototype.getLowestSetBit = vt,
        a.prototype.bitCount = Et,
        a.prototype.testBit = St,
        a.prototype.setBit = It,
        a.prototype.clearBit = bt,
        a.prototype.flipBit = At,
        a.prototype.add = Nt,
        a.prototype.subtract = Rt,
        a.prototype.multiply = wt,
        a.prototype.divide = Lt,
        a.prototype.remainder = Ut,
        a.prototype.divideAndRemainder = kt,
        a.prototype.modPow = Wt,
        a.prototype.modInverse = Zt,
        a.prototype.pow = xt,
        a.prototype.gcd = Xt,
        a.prototype.isProbablePrime = Jt
    }
    , function(t, e) {}
    , function(t, e, r) {
        function a(t) {
            for (var e = t.name + ": ", r = [], a = function(t, e) {
                return " " + e
            }, i = 0; i < t.values.length; ++i)
                r.push(t.values[i].replace(/^(\S+\r\n)/, a));
            e += r.join(",") + "\r\n";
            for (var n = 0, s = -1, i = 0; i < e.length; ++i,
            ++n)
                if (n > 65 && -1 !== s) {
                    var o = e[s];
                    "," === o ? (++s,
                    e = e.substr(0, s) + "\r\n " + e.substr(s)) : e = e.substr(0, s) + "\r\n" + o + e.substr(s + 1),
                    n = i - s - 1,
                    s = -1,
                    ++i
                } else
                    " " !== e[i] && "\t" !== e[i] && "," !== e[i] || (s = i);
            return e
        }
        function i(t) {
            return t.replace(/^\s+/, "")
        }
        var n = r(0);
        r(1);
        var s = t.exports = n.pem = n.pem || {};
        s.encode = function(t, e) {
            e = e || {};
            var r, i = "-----BEGIN " + t.type + "-----\r\n";
            if (t.procType && (r = {
                name: "Proc-Type",
                values: [String(t.procType.version), t.procType.type]
            },
            i += a(r)),
            t.contentDomain && (r = {
                name: "Content-Domain",
                values: [t.contentDomain]
            },
            i += a(r)),
            t.dekInfo && (r = {
                name: "DEK-Info",
                values: [t.dekInfo.algorithm]
            },
            t.dekInfo.parameters && r.values.push(t.dekInfo.parameters),
            i += a(r)),
            t.headers)
                for (var s = 0; s < t.headers.length; ++s)
                    i += a(t.headers[s]);
            return t.procType && (i += "\r\n"),
            i += n.util.encode64(t.body, e.maxline || 64) + "\r\n",
            i += "-----END " + t.type + "-----\r\n"
        }
        ,
        s.decode = function(t) {
            for (var e, r = [], a = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g, s = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/, o = /\r?\n/; ; ) {
                if (!(e = a.exec(t)))
                    break;
                var u = {
                    type: e[1],
                    procType: null,
                    contentDomain: null,
                    dekInfo: null,
                    headers: [],
                    body: n.util.decode64(e[3])
                };
                if (r.push(u),
                e[2]) {
                    for (var c = e[2].split(o), l = 0; e && l < c.length; ) {
                        for (var h = c[l].replace(/\s+$/, ""), p = l + 1; p < c.length; ++p) {
                            var f = c[p];
                            if (!/\s/.test(f[0]))
                                break;
                            h += f,
                            l = p
                        }
                        if (e = h.match(s)) {
                            for (var d = {
                                name: e[1],
                                values: []
                            }, y = e[2].split(","), g = 0; g < y.length; ++g)
                                d.values.push(i(y[g]));
                            if (u.procType)
                                if (u.contentDomain || "Content-Domain" !== d.name)
                                    if (u.dekInfo || "DEK-Info" !== d.name)
                                        u.headers.push(d);
                                    else {
                                        if (0 === d.values.length)
                                            throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');
                                        u.dekInfo = {
                                            algorithm: y[0],
                                            parameters: y[1] || null
                                        }
                                    }
                                else
                                    u.contentDomain = y[0] || "";
                            else {
                                if ("Proc-Type" !== d.name)
                                    throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');
                                if (2 !== d.values.length)
                                    throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');
                                u.procType = {
                                    version: y[0],
                                    type: y[1]
                                }
                            }
                        }
                        ++l
                    }
                    if ("ENCRYPTED" === u.procType && !u.dekInfo)
                        throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".')
                }
            }
            if (0 === r.length)
                throw new Error("Invalid PEM formatted message.");
            return r
        }
    }
    , function(t, e, r) {
        function a() {
            o = String.fromCharCode(128),
            o += n.util.fillString(String.fromCharCode(0), 64),
            c = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
            u = !0
        }
        function i(t, e, r) {
            for (var a, i, n, s, o, u, l, h, p, f, d, y, g, m, v, C = r.length(); C >= 64; ) {
                for (l = 0; l < 16; ++l)
                    e[l] = r.getInt32();
                for (; l < 64; ++l)
                    a = e[l - 2],
                    a = (a >>> 17 | a << 15) ^ (a >>> 19 | a << 13) ^ a >>> 10,
                    i = e[l - 15],
                    i = (i >>> 7 | i << 25) ^ (i >>> 18 | i << 14) ^ i >>> 3,
                    e[l] = a + e[l - 7] + i + e[l - 16] | 0;
                for (h = t.h0,
                p = t.h1,
                f = t.h2,
                d = t.h3,
                y = t.h4,
                g = t.h5,
                m = t.h6,
                v = t.h7,
                l = 0; l < 64; ++l)
                    s = (y >>> 6 | y << 26) ^ (y >>> 11 | y << 21) ^ (y >>> 25 | y << 7),
                    o = m ^ y & (g ^ m),
                    n = (h >>> 2 | h << 30) ^ (h >>> 13 | h << 19) ^ (h >>> 22 | h << 10),
                    u = h & p | f & (h ^ p),
                    a = v + s + o + c[l] + e[l],
                    i = n + u,
                    v = m,
                    m = g,
                    g = y,
                    y = d + a >>> 0,
                    d = f,
                    f = p,
                    p = h,
                    h = a + i >>> 0;
                t.h0 = t.h0 + h | 0,
                t.h1 = t.h1 + p | 0,
                t.h2 = t.h2 + f | 0,
                t.h3 = t.h3 + d | 0,
                t.h4 = t.h4 + y | 0,
                t.h5 = t.h5 + g | 0,
                t.h6 = t.h6 + m | 0,
                t.h7 = t.h7 + v | 0,
                C -= 64
            }
        }
        var n = r(0);
        r(2),
        r(1);
        var s = t.exports = n.sha256 = n.sha256 || {};
        n.md.sha256 = n.md.algorithms.sha256 = s,
        s.create = function() {
            u || a();
            var t = null
              , e = n.util.createBuffer()
              , r = new Array(64)
              , s = {
                algorithm: "sha256",
                blockLength: 64,
                digestLength: 32,
                messageLength: 0,
                fullMessageLength: null,
                messageLengthSize: 8
            };
            return s.start = function() {
                s.messageLength = 0,
                s.fullMessageLength = s.messageLength64 = [];
                for (var r = s.messageLengthSize / 4, a = 0; a < r; ++a)
                    s.fullMessageLength.push(0);
                return e = n.util.createBuffer(),
                t = {
                    h0: 1779033703,
                    h1: 3144134277,
                    h2: 1013904242,
                    h3: 2773480762,
                    h4: 1359893119,
                    h5: 2600822924,
                    h6: 528734635,
                    h7: 1541459225
                },
                s
            }
            ,
            s.start(),
            s.update = function(a, o) {
                "utf8" === o && (a = n.util.encodeUtf8(a));
                var u = a.length;
                s.messageLength += u,
                u = [u / 4294967296 >>> 0, u >>> 0];
                for (var c = s.fullMessageLength.length - 1; c >= 0; --c)
                    s.fullMessageLength[c] += u[1],
                    u[1] = u[0] + (s.fullMessageLength[c] / 4294967296 >>> 0),
                    s.fullMessageLength[c] = s.fullMessageLength[c] >>> 0,
                    u[0] = u[1] / 4294967296 >>> 0;
                return e.putBytes(a),
                i(t, r, e),
                (e.read > 2048 || 0 === e.length()) && e.compact(),
                s
            }
            ,
            s.digest = function() {
                var a = n.util.createBuffer();
                a.putBytes(e.bytes());
                var u = s.fullMessageLength[s.fullMessageLength.length - 1] + s.messageLengthSize
                  , c = u & s.blockLength - 1;
                a.putBytes(o.substr(0, s.blockLength - c));
                for (var l, h, p = 8 * s.fullMessageLength[0], f = 0; f < s.fullMessageLength.length - 1; ++f)
                    l = 8 * s.fullMessageLength[f + 1],
                    h = l / 4294967296 >>> 0,
                    p += h,
                    a.putInt32(p >>> 0),
                    p = l >>> 0;
                a.putInt32(p);
                var d = {
                    h0: t.h0,
                    h1: t.h1,
                    h2: t.h2,
                    h3: t.h3,
                    h4: t.h4,
                    h5: t.h5,
                    h6: t.h6,
                    h7: t.h7
                };
                i(d, r, a);
                var y = n.util.createBuffer();
                return y.putInt32(d.h0),
                y.putInt32(d.h1),
                y.putInt32(d.h2),
                y.putInt32(d.h3),
                y.putInt32(d.h4),
                y.putInt32(d.h5),
                y.putInt32(d.h6),
                y.putInt32(d.h7),
                y
            }
            ,
            s
        }
        ;
        var o = null
          , u = !1
          , c = null
    }
    , function(t, e, r) {
        var a = r(0);
        r(1);
        var i = null;
        !a.util.isNodejs || a.options.usePureJavaScript || process.versions["node-webkit"] || (i = r(12)),
        (t.exports = a.prng = a.prng || {}).create = function(t) {
            function e(t) {
                if (o.pools[0].messageLength >= 32)
                    return n(),
                    t();
                var e = 32 - o.pools[0].messageLength << 5;
                o.seedFile(e, function(e, r) {
                    if (e)
                        return t(e);
                    o.collect(r),
                    n(),
                    t()
                })
            }
            function r() {
                if (o.pools[0].messageLength >= 32)
                    return n();
                var t = 32 - o.pools[0].messageLength << 5;
                o.collect(o.seedFileSync(t)),
                n()
            }
            function n() {
                o.reseeds = 4294967295 === o.reseeds ? 0 : o.reseeds + 1;
                var t = o.plugin.md.create();
                t.update(o.keyBytes);
                for (var e = 1, r = 0; r < 32; ++r)
                    o.reseeds % e == 0 && (t.update(o.pools[r].digest().getBytes()),
                    o.pools[r].start()),
                    e <<= 1;
                o.keyBytes = t.digest().getBytes(),
                t.start(),
                t.update(o.keyBytes);
                var a = t.digest().getBytes();
                o.key = o.plugin.formatKey(o.keyBytes),
                o.seed = o.plugin.formatSeed(a),
                o.generated = 0
            }
            function s(t) {
                var e = null
                  , r = a.util.globalScope
                  , i = r.crypto || r.msCrypto;
                i && i.getRandomValues && (e = function(t) {
                    return i.getRandomValues(t)
                }
                );
                var n = a.util.createBuffer();
                if (e)
                    for (; n.length() < t; ) {
                        var s = Math.max(1, Math.min(t - n.length(), 65536) / 4)
                          , o = new Uint32Array(Math.floor(s));
                        try {
                            e(o);
                            for (var u = 0; u < o.length; ++u)
                                n.putInt32(o[u])
                        } catch (t) {
                            if (!("undefined" != typeof QuotaExceededError && t instanceof QuotaExceededError))
                                throw t
                        }
                    }
                if (n.length() < t)
                    for (var c, l, h, p = Math.floor(65536 * Math.random()); n.length() < t; ) {
                        l = 16807 * (65535 & p),
                        c = 16807 * (p >> 16),
                        l += (32767 & c) << 16,
                        l += c >> 15,
                        l = (2147483647 & l) + (l >> 31),
                        p = 4294967295 & l;
                        for (var u = 0; u < 3; ++u)
                            h = p >>> (u << 3),
                            h ^= Math.floor(256 * Math.random()),
                            n.putByte(String.fromCharCode(255 & h))
                    }
                return n.getBytes(t)
            }
            for (var o = {
                plugin: t,
                key: null,
                seed: null,
                time: null,
                reseeds: 0,
                generated: 0,
                keyBytes: ""
            }, u = t.md, c = new Array(32), l = 0; l < 32; ++l)
                c[l] = u.create();
            return o.pools = c,
            o.pool = 0,
            o.generate = function(t, r) {
                function i(h) {
                    if (h)
                        return r(h);
                    if (l.length() >= t)
                        return r(null, l.getBytes(t));
                    if (o.generated > 1048575 && (o.key = null),
                    null === o.key)
                        return a.util.nextTick(function() {
                            e(i)
                        });
                    var p = n(o.key, o.seed);
                    o.generated += p.length,
                    l.putBytes(p),
                    o.key = u(n(o.key, s(o.seed))),
                    o.seed = c(n(o.key, o.seed)),
                    a.util.setImmediate(i)
                }
                if (!r)
                    return o.generateSync(t);
                var n = o.plugin.cipher
                  , s = o.plugin.increment
                  , u = o.plugin.formatKey
                  , c = o.plugin.formatSeed
                  , l = a.util.createBuffer();
                o.key = null,
                i()
            }
            ,
            o.generateSync = function(t) {
                var e = o.plugin.cipher
                  , i = o.plugin.increment
                  , n = o.plugin.formatKey
                  , s = o.plugin.formatSeed;
                o.key = null;
                for (var u = a.util.createBuffer(); u.length() < t; ) {
                    o.generated > 1048575 && (o.key = null),
                    null === o.key && r();
                    var c = e(o.key, o.seed);
                    o.generated += c.length,
                    u.putBytes(c),
                    o.key = n(e(o.key, i(o.seed))),
                    o.seed = s(e(o.key, o.seed))
                }
                return u.getBytes(t)
            }
            ,
            i ? (o.seedFile = function(t, e) {
                i.randomBytes(t, function(t, r) {
                    if (t)
                        return e(t);
                    e(null, r.toString())
                })
            }
            ,
            o.seedFileSync = function(t) {
                return i.randomBytes(t).toString()
            }
            ) : (o.seedFile = function(t, e) {
                try {
                    e(null, s(t))
                } catch (t) {
                    e(t)
                }
            }
            ,
            o.seedFileSync = s),
            o.collect = function(t) {
                for (var e = t.length, r = 0; r < e; ++r)
                    o.pools[o.pool].update(t.substr(r, 1)),
                    o.pool = 31 === o.pool ? 0 : o.pool + 1
            }
            ,
            o.collectInt = function(t, e) {
                for (var r = "", a = 0; a < e; a += 8)
                    r += String.fromCharCode(t >> a & 255);
                o.collect(r)
            }
            ,
            o.registerWorker = function(t) {
                if (t === self)
                    o.seedFile = function(t, e) {
                        function r(t) {
                            var a = t.data;
                            a.forge && a.forge.prng && (self.removeEventListener("message", r),
                            e(a.forge.prng.err, a.forge.prng.bytes))
                        }
                        self.addEventListener("message", r),
                        self.postMessage({
                            forge: {
                                prng: {
                                    needed: t
                                }
                            }
                        })
                    }
                    ;
                else {
                    var e = function(e) {
                        var r = e.data;
                        r.forge && r.forge.prng && o.seedFile(r.forge.prng.needed, function(e, r) {
                            t.postMessage({
                                forge: {
                                    prng: {
                                        err: e,
                                        bytes: r
                                    }
                                }
                            })
                        })
                    };
                    t.addEventListener("message", e)
                }
            }
            ,
            o
        }
    }
    , function(t, e, r) {
        function a(t, e) {
            return t.start().update(e).digest().getBytes()
        }
        function i(t) {
            var e;
            if (t) {
                if (!(e = l.oids[c.derToOid(t)])) {
                    var r = new Error("Unsupported PRF OID.");
                    throw r.oid = t,
                    r.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"],
                    r
                }
            } else
                e = "hmacWithSHA1";
            return n(e)
        }
        function n(t) {
            var e = o.md;
            switch (t) {
            case "hmacWithSHA224":
                e = o.md.sha512;
            case "hmacWithSHA1":
            case "hmacWithSHA256":
            case "hmacWithSHA384":
            case "hmacWithSHA512":
                t = t.substr(8).toLowerCase();
                break;
            default:
                var r = new Error("Unsupported PRF algorithm.");
                throw r.algorithm = t,
                r.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"],
                r
            }
            if (!(e && t in e))
                throw new Error("Unknown hash algorithm: " + t);
            return e[t].create()
        }
        function s(t, e, r, a) {
            var i = c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [c.create(c.Class.UNIVERSAL, c.Type.OCTETSTRING, !1, t), c.create(c.Class.UNIVERSAL, c.Type.INTEGER, !1, e.getBytes())]);
            return "hmacWithSHA1" !== a && i.value.push(c.create(c.Class.UNIVERSAL, c.Type.INTEGER, !1, o.util.hexToBytes(r.toString(16))), c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [c.create(c.Class.UNIVERSAL, c.Type.OID, !1, c.oidToDer(l.oids[a]).getBytes()), c.create(c.Class.UNIVERSAL, c.Type.NULL, !1, "")])),
            i
        }
        var o = r(0);
        if (r(7),
        r(3),
        r(17),
        r(2),
        r(5),
        r(18),
        r(13),
        r(4),
        r(30),
        r(6),
        r(1),
        void 0 === u)
            var u = o.jsbn.BigInteger;
        var c = o.asn1
          , l = o.pki = o.pki || {};
        t.exports = l.pbe = o.pbe = o.pbe || {};
        var h = l.oids
          , p = {
            name: "EncryptedPrivateKeyInfo",
            tagClass: c.Class.UNIVERSAL,
            type: c.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
                tagClass: c.Class.UNIVERSAL,
                type: c.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: c.Class.UNIVERSAL,
                    type: c.Type.OID,
                    constructed: !1,
                    capture: "encryptionOid"
                }, {
                    name: "AlgorithmIdentifier.parameters",
                    tagClass: c.Class.UNIVERSAL,
                    type: c.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "encryptionParams"
                }]
            }, {
                name: "EncryptedPrivateKeyInfo.encryptedData",
                tagClass: c.Class.UNIVERSAL,
                type: c.Type.OCTETSTRING,
                constructed: !1,
                capture: "encryptedData"
            }]
        }
          , f = {
            name: "PBES2Algorithms",
            tagClass: c.Class.UNIVERSAL,
            type: c.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PBES2Algorithms.keyDerivationFunc",
                tagClass: c.Class.UNIVERSAL,
                type: c.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PBES2Algorithms.keyDerivationFunc.oid",
                    tagClass: c.Class.UNIVERSAL,
                    type: c.Type.OID,
                    constructed: !1,
                    capture: "kdfOid"
                }, {
                    name: "PBES2Algorithms.params",
                    tagClass: c.Class.UNIVERSAL,
                    type: c.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "PBES2Algorithms.params.salt",
                        tagClass: c.Class.UNIVERSAL,
                        type: c.Type.OCTETSTRING,
                        constructed: !1,
                        capture: "kdfSalt"
                    }, {
                        name: "PBES2Algorithms.params.iterationCount",
                        tagClass: c.Class.UNIVERSAL,
                        type: c.Type.INTEGER,
                        constructed: !1,
                        capture: "kdfIterationCount"
                    }, {
                        name: "PBES2Algorithms.params.keyLength",
                        tagClass: c.Class.UNIVERSAL,
                        type: c.Type.INTEGER,
                        constructed: !1,
                        optional: !0,
                        capture: "keyLength"
                    }, {
                        name: "PBES2Algorithms.params.prf",
                        tagClass: c.Class.UNIVERSAL,
                        type: c.Type.SEQUENCE,
                        constructed: !0,
                        optional: !0,
                        value: [{
                            name: "PBES2Algorithms.params.prf.algorithm",
                            tagClass: c.Class.UNIVERSAL,
                            type: c.Type.OID,
                            constructed: !1,
                            capture: "prfOid"
                        }]
                    }]
                }]
            }, {
                name: "PBES2Algorithms.encryptionScheme",
                tagClass: c.Class.UNIVERSAL,
                type: c.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PBES2Algorithms.encryptionScheme.oid",
                    tagClass: c.Class.UNIVERSAL,
                    type: c.Type.OID,
                    constructed: !1,
                    capture: "encOid"
                }, {
                    name: "PBES2Algorithms.encryptionScheme.iv",
                    tagClass: c.Class.UNIVERSAL,
                    type: c.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "encIv"
                }]
            }]
        }
          , d = {
            name: "pkcs-12PbeParams",
            tagClass: c.Class.UNIVERSAL,
            type: c.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "pkcs-12PbeParams.salt",
                tagClass: c.Class.UNIVERSAL,
                type: c.Type.OCTETSTRING,
                constructed: !1,
                capture: "salt"
            }, {
                name: "pkcs-12PbeParams.iterations",
                tagClass: c.Class.UNIVERSAL,
                type: c.Type.INTEGER,
                constructed: !1,
                capture: "iterations"
            }]
        };
        l.encryptPrivateKeyInfo = function(t, e, r) {
            r = r || {},
            r.saltSize = r.saltSize || 8,
            r.count = r.count || 2048,
            r.algorithm = r.algorithm || "aes128",
            r.prfAlgorithm = r.prfAlgorithm || "sha1";
            var a, i, u, p = o.random.getBytesSync(r.saltSize), f = r.count, d = c.integerToDer(f);
            if (0 === r.algorithm.indexOf("aes") || "des" === r.algorithm) {
                var y, g, m;
                switch (r.algorithm) {
                case "aes128":
                    a = 16,
                    y = 16,
                    g = h["aes128-CBC"],
                    m = o.aes.createEncryptionCipher;
                    break;
                case "aes192":
                    a = 24,
                    y = 16,
                    g = h["aes192-CBC"],
                    m = o.aes.createEncryptionCipher;
                    break;
                case "aes256":
                    a = 32,
                    y = 16,
                    g = h["aes256-CBC"],
                    m = o.aes.createEncryptionCipher;
                    break;
                case "des":
                    a = 8,
                    y = 8,
                    g = h.desCBC,
                    m = o.des.createEncryptionCipher;
                    break;
                default:
                    var v = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
                    throw v.algorithm = r.algorithm,
                    v
                }
                var C = "hmacWith" + r.prfAlgorithm.toUpperCase()
                  , E = n(C)
                  , S = o.pkcs5.pbkdf2(e, p, f, a, E)
                  , T = o.random.getBytesSync(y)
                  , I = m(S);
                I.start(T),
                I.update(c.toDer(t)),
                I.finish(),
                u = I.output.getBytes();
                var b = s(p, d, a, C);
                i = c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [c.create(c.Class.UNIVERSAL, c.Type.OID, !1, c.oidToDer(h.pkcs5PBES2).getBytes()), c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [c.create(c.Class.UNIVERSAL, c.Type.OID, !1, c.oidToDer(h.pkcs5PBKDF2).getBytes()), b]), c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [c.create(c.Class.UNIVERSAL, c.Type.OID, !1, c.oidToDer(g).getBytes()), c.create(c.Class.UNIVERSAL, c.Type.OCTETSTRING, !1, T)])])])
            } else {
                if ("3des" !== r.algorithm) {
                    var v = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
                    throw v.algorithm = r.algorithm,
                    v
                }
                a = 24;
                var A = new o.util.ByteBuffer(p)
                  , S = l.pbe.generatePkcs12Key(e, A, 1, f, a)
                  , T = l.pbe.generatePkcs12Key(e, A, 2, f, a)
                  , I = o.des.createEncryptionCipher(S);
                I.start(T),
                I.update(c.toDer(t)),
                I.finish(),
                u = I.output.getBytes(),
                i = c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [c.create(c.Class.UNIVERSAL, c.Type.OID, !1, c.oidToDer(h["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()), c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [c.create(c.Class.UNIVERSAL, c.Type.OCTETSTRING, !1, p), c.create(c.Class.UNIVERSAL, c.Type.INTEGER, !1, d.getBytes())])])
            }
            return c.create(c.Class.UNIVERSAL, c.Type.SEQUENCE, !0, [i, c.create(c.Class.UNIVERSAL, c.Type.OCTETSTRING, !1, u)])
        }
        ,
        l.decryptPrivateKeyInfo = function(t, e) {
            var r = null
              , a = {}
              , i = [];
            if (!c.validate(t, p, a, i)) {
                var n = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
                throw n.errors = i,
                n
            }
            var s = c.derToOid(a.encryptionOid)
              , u = l.pbe.getCipher(s, a.encryptionParams, e)
              , h = o.util.createBuffer(a.encryptedData);
            return u.update(h),
            u.finish() && (r = c.fromDer(u.output)),
            r
        }
        ,
        l.encryptedPrivateKeyToPem = function(t, e) {
            var r = {
                type: "ENCRYPTED PRIVATE KEY",
                body: c.toDer(t).getBytes()
            };
            return o.pem.encode(r, {
                maxline: e
            })
        }
        ,
        l.encryptedPrivateKeyFromPem = function(t) {
            var e = o.pem.decode(t)[0];
            if ("ENCRYPTED PRIVATE KEY" !== e.type) {
                var r = new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');
                throw r.headerType = e.type,
                r
            }
            if (e.procType && "ENCRYPTED" === e.procType.type)
                throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
            return c.fromDer(e.body)
        }
        ,
        l.encryptRsaPrivateKey = function(t, e, r) {
            if (r = r || {},
            !r.legacy) {
                var a = l.wrapRsaPrivateKey(l.privateKeyToAsn1(t));
                return a = l.encryptPrivateKeyInfo(a, e, r),
                l.encryptedPrivateKeyToPem(a)
            }
            var i, n, s, u;
            switch (r.algorithm) {
            case "aes128":
                i = "AES-128-CBC",
                s = 16,
                n = o.random.getBytesSync(16),
                u = o.aes.createEncryptionCipher;
                break;
            case "aes192":
                i = "AES-192-CBC",
                s = 24,
                n = o.random.getBytesSync(16),
                u = o.aes.createEncryptionCipher;
                break;
            case "aes256":
                i = "AES-256-CBC",
                s = 32,
                n = o.random.getBytesSync(16),
                u = o.aes.createEncryptionCipher;
                break;
            case "3des":
                i = "DES-EDE3-CBC",
                s = 24,
                n = o.random.getBytesSync(8),
                u = o.des.createEncryptionCipher;
                break;
            case "des":
                i = "DES-CBC",
                s = 8,
                n = o.random.getBytesSync(8),
                u = o.des.createEncryptionCipher;
                break;
            default:
                var h = new Error('Could not encrypt RSA private key; unsupported encryption algorithm "' + r.algorithm + '".');
                throw h.algorithm = r.algorithm,
                h
            }
            var p = o.pbe.opensslDeriveBytes(e, n.substr(0, 8), s)
              , f = u(p);
            f.start(n),
            f.update(c.toDer(l.privateKeyToAsn1(t))),
            f.finish();
            var d = {
                type: "RSA PRIVATE KEY",
                procType: {
                    version: "4",
                    type: "ENCRYPTED"
                },
                dekInfo: {
                    algorithm: i,
                    parameters: o.util.bytesToHex(n).toUpperCase()
                },
                body: f.output.getBytes()
            };
            return o.pem.encode(d)
        }
        ,
        l.decryptRsaPrivateKey = function(t, e) {
            var r = null
              , a = o.pem.decode(t)[0];
            if ("ENCRYPTED PRIVATE KEY" !== a.type && "PRIVATE KEY" !== a.type && "RSA PRIVATE KEY" !== a.type) {
                var i = new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".');
                throw i.headerType = i,
                i
            }
            if (a.procType && "ENCRYPTED" === a.procType.type) {
                var n, s;
                switch (a.dekInfo.algorithm) {
                case "DES-CBC":
                    n = 8,
                    s = o.des.createDecryptionCipher;
                    break;
                case "DES-EDE3-CBC":
                    n = 24,
                    s = o.des.createDecryptionCipher;
                    break;
                case "AES-128-CBC":
                    n = 16,
                    s = o.aes.createDecryptionCipher;
                    break;
                case "AES-192-CBC":
                    n = 24,
                    s = o.aes.createDecryptionCipher;
                    break;
                case "AES-256-CBC":
                    n = 32,
                    s = o.aes.createDecryptionCipher;
                    break;
                case "RC2-40-CBC":
                    n = 5,
                    s = function(t) {
                        return o.rc2.createDecryptionCipher(t, 40)
                    }
                    ;
                    break;
                case "RC2-64-CBC":
                    n = 8,
                    s = function(t) {
                        return o.rc2.createDecryptionCipher(t, 64)
                    }
                    ;
                    break;
                case "RC2-128-CBC":
                    n = 16,
                    s = function(t) {
                        return o.rc2.createDecryptionCipher(t, 128)
                    }
                    ;
                    break;
                default:
                    var i = new Error('Could not decrypt private key; unsupported encryption algorithm "' + a.dekInfo.algorithm + '".');
                    throw i.algorithm = a.dekInfo.algorithm,
                    i
                }
                var u = o.util.hexToBytes(a.dekInfo.parameters)
                  , h = o.pbe.opensslDeriveBytes(e, u.substr(0, 8), n)
                  , p = s(h);
                if (p.start(u),
                p.update(o.util.createBuffer(a.body)),
                !p.finish())
                    return r;
                r = p.output.getBytes()
            } else
                r = a.body;
            return r = "ENCRYPTED PRIVATE KEY" === a.type ? l.decryptPrivateKeyInfo(c.fromDer(r), e) : c.fromDer(r),
            null !== r && (r = l.privateKeyFromAsn1(r)),
            r
        }
        ,
        l.pbe.generatePkcs12Key = function(t, e, r, a, i, n) {
            var s, u;
            if (void 0 === n || null === n) {
                if (!("sha1"in o.md))
                    throw new Error('"sha1" hash algorithm unavailable.');
                n = o.md.sha1.create()
            }
            var c = n.digestLength
              , l = n.blockLength
              , h = new o.util.ByteBuffer
              , p = new o.util.ByteBuffer;
            if (null !== t && void 0 !== t) {
                for (u = 0; u < t.length; u++)
                    p.putInt16(t.charCodeAt(u));
                p.putInt16(0)
            }
            var f = p.length()
              , d = e.length()
              , y = new o.util.ByteBuffer;
            y.fillWithByte(r, l);
            var g = l * Math.ceil(d / l)
              , m = new o.util.ByteBuffer;
            for (u = 0; u < g; u++)
                m.putByte(e.at(u % d));
            var v = l * Math.ceil(f / l)
              , C = new o.util.ByteBuffer;
            for (u = 0; u < v; u++)
                C.putByte(p.at(u % f));
            var E = m;
            E.putBuffer(C);
            for (var S = Math.ceil(i / c), T = 1; T <= S; T++) {
                var I = new o.util.ByteBuffer;
                I.putBytes(y.bytes()),
                I.putBytes(E.bytes());
                for (var b = 0; b < a; b++)
                    n.start(),
                    n.update(I.getBytes()),
                    I = n.digest();
                var A = new o.util.ByteBuffer;
                for (u = 0; u < l; u++)
                    A.putByte(I.at(u % c));
                var B = Math.ceil(d / l) + Math.ceil(f / l)
                  , N = new o.util.ByteBuffer;
                for (s = 0; s < B; s++) {
                    var R = new o.util.ByteBuffer(E.getBytes(l))
                      , w = 511;
                    for (u = A.length() - 1; u >= 0; u--)
                        w >>= 8,
                        w += A.at(u) + R.at(u),
                        R.setAt(u, 255 & w);
                    N.putBuffer(R)
                }
                E = N,
                h.putBuffer(I)
            }
            return h.truncate(h.length() - i),
            h
        }
        ,
        l.pbe.getCipher = function(t, e, r) {
            switch (t) {
            case l.oids.pkcs5PBES2:
                return l.pbe.getCipherForPBES2(t, e, r);
            case l.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
            case l.oids["pbewithSHAAnd40BitRC2-CBC"]:
                return l.pbe.getCipherForPKCS12PBE(t, e, r);
            default:
                var a = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
                throw a.oid = t,
                a.supportedOids = ["pkcs5PBES2", "pbeWithSHAAnd3-KeyTripleDES-CBC", "pbewithSHAAnd40BitRC2-CBC"],
                a
            }
        }
        ,
        l.pbe.getCipherForPBES2 = function(t, e, r) {
            var a = {}
              , n = [];
            if (!c.validate(e, f, a, n)) {
                var s = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
                throw s.errors = n,
                s
            }
            if ((t = c.derToOid(a.kdfOid)) !== l.oids.pkcs5PBKDF2) {
                var s = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");
                throw s.oid = t,
                s.supportedOids = ["pkcs5PBKDF2"],
                s
            }
            if ((t = c.derToOid(a.encOid)) !== l.oids["aes128-CBC"] && t !== l.oids["aes192-CBC"] && t !== l.oids["aes256-CBC"] && t !== l.oids["des-EDE3-CBC"] && t !== l.oids.desCBC) {
                var s = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");
                throw s.oid = t,
                s.supportedOids = ["aes128-CBC", "aes192-CBC", "aes256-CBC", "des-EDE3-CBC", "desCBC"],
                s
            }
            var u = a.kdfSalt
              , h = o.util.createBuffer(a.kdfIterationCount);
            h = h.getInt(h.length() << 3);
            var p, d;
            switch (l.oids[t]) {
            case "aes128-CBC":
                p = 16,
                d = o.aes.createDecryptionCipher;
                break;
            case "aes192-CBC":
                p = 24,
                d = o.aes.createDecryptionCipher;
                break;
            case "aes256-CBC":
                p = 32,
                d = o.aes.createDecryptionCipher;
                break;
            case "des-EDE3-CBC":
                p = 24,
                d = o.des.createDecryptionCipher;
                break;
            case "desCBC":
                p = 8,
                d = o.des.createDecryptionCipher
            }
            var y = i(a.prfOid)
              , g = o.pkcs5.pbkdf2(r, u, h, p, y)
              , m = a.encIv
              , v = d(g);
            return v.start(m),
            v
        }
        ,
        l.pbe.getCipherForPKCS12PBE = function(t, e, r) {
            var a = {}
              , n = [];
            if (!c.validate(e, d, a, n)) {
                var s = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
                throw s.errors = n,
                s
            }
            var u = o.util.createBuffer(a.salt)
              , h = o.util.createBuffer(a.iterations);
            h = h.getInt(h.length() << 3);
            var p, f, y;
            switch (t) {
            case l.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
                p = 24,
                f = 8,
                y = o.des.startDecrypting;
                break;
            case l.oids["pbewithSHAAnd40BitRC2-CBC"]:
                p = 5,
                f = 8,
                y = function(t, e) {
                    var r = o.rc2.createDecryptionCipher(t, 40);
                    return r.start(e, null),
                    r
                }
                ;
                break;
            default:
                var s = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
                throw s.oid = t,
                s
            }
            var g = i(a.prfOid)
              , m = l.pbe.generatePkcs12Key(r, u, 1, h, p, g);
            return g.start(),
            y(m, l.pbe.generatePkcs12Key(r, u, 2, h, f, g))
        }
        ,
        l.pbe.opensslDeriveBytes = function(t, e, r, i) {
            if (void 0 === i || null === i) {
                if (!("md5"in o.md))
                    throw new Error('"md5" hash algorithm unavailable.');
                i = o.md.md5.create()
            }
            null === e && (e = "");
            for (var n = [a(i, t + e)], s = 16, u = 1; s < r; ++u,
            s += 16)
                n.push(a(i, n[u - 1] + t + e));
            return n.join("").substr(0, r)
        }
    }
    , function(t, e, r) {
        function a(t, e) {
            var r = function() {
                return new o.des.Algorithm(t,e)
            };
            o.cipher.registerAlgorithm(t, r)
        }
        function i(t) {
            for (var e, r = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], a = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], i = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], n = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], s = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], o = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], u = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], c = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], l = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], h = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], p = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], f = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], d = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], y = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261], g = t.length() > 8 ? 3 : 1, m = [], v = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0], C = 0, E = 0; E < g; E++) {
                var S = t.getInt32()
                  , T = t.getInt32();
                e = 252645135 & (S >>> 4 ^ T),
                T ^= e,
                S ^= e << 4,
                e = 65535 & (T >>> -16 ^ S),
                S ^= e,
                T ^= e << -16,
                e = 858993459 & (S >>> 2 ^ T),
                T ^= e,
                S ^= e << 2,
                e = 65535 & (T >>> -16 ^ S),
                S ^= e,
                T ^= e << -16,
                e = 1431655765 & (S >>> 1 ^ T),
                T ^= e,
                S ^= e << 1,
                e = 16711935 & (T >>> 8 ^ S),
                S ^= e,
                T ^= e << 8,
                e = 1431655765 & (S >>> 1 ^ T),
                T ^= e,
                S ^= e << 1,
                e = S << 8 | T >>> 20 & 240,
                S = T << 24 | T << 8 & 16711680 | T >>> 8 & 65280 | T >>> 24 & 240,
                T = e;
                for (var I = 0; I < v.length; ++I) {
                    v[I] ? (S = S << 2 | S >>> 26,
                    T = T << 2 | T >>> 26) : (S = S << 1 | S >>> 27,
                    T = T << 1 | T >>> 27),
                    S &= -15,
                    T &= -15;
                    var b = r[S >>> 28] | a[S >>> 24 & 15] | i[S >>> 20 & 15] | n[S >>> 16 & 15] | s[S >>> 12 & 15] | o[S >>> 8 & 15] | u[S >>> 4 & 15]
                      , A = c[T >>> 28] | l[T >>> 24 & 15] | h[T >>> 20 & 15] | p[T >>> 16 & 15] | f[T >>> 12 & 15] | d[T >>> 8 & 15] | y[T >>> 4 & 15];
                    e = 65535 & (A >>> 16 ^ b),
                    m[C++] = b ^ e,
                    m[C++] = A ^ e << 16
                }
            }
            return m
        }
        function n(t, e, r, a) {
            var i, n = 32 === t.length ? 3 : 9;
            i = 3 === n ? a ? [30, -2, -2] : [0, 32, 2] : a ? [94, 62, -2, 32, 64, 2, 30, -2, -2] : [0, 32, 2, 62, 30, -2, 64, 96, 2];
            var s, o = e[0], g = e[1];
            s = 252645135 & (o >>> 4 ^ g),
            g ^= s,
            o ^= s << 4,
            s = 65535 & (o >>> 16 ^ g),
            g ^= s,
            o ^= s << 16,
            s = 858993459 & (g >>> 2 ^ o),
            o ^= s,
            g ^= s << 2,
            s = 16711935 & (g >>> 8 ^ o),
            o ^= s,
            g ^= s << 8,
            s = 1431655765 & (o >>> 1 ^ g),
            g ^= s,
            o ^= s << 1,
            o = o << 1 | o >>> 31,
            g = g << 1 | g >>> 31;
            for (var m = 0; m < n; m += 3) {
                for (var v = i[m + 1], C = i[m + 2], E = i[m]; E != v; E += C) {
                    var S = g ^ t[E]
                      , T = (g >>> 4 | g << 28) ^ t[E + 1];
                    s = o,
                    o = g,
                    g = s ^ (c[S >>> 24 & 63] | h[S >>> 16 & 63] | f[S >>> 8 & 63] | y[63 & S] | u[T >>> 24 & 63] | l[T >>> 16 & 63] | p[T >>> 8 & 63] | d[63 & T])
                }
                s = o,
                o = g,
                g = s
            }
            o = o >>> 1 | o << 31,
            g = g >>> 1 | g << 31,
            s = 1431655765 & (o >>> 1 ^ g),
            g ^= s,
            o ^= s << 1,
            s = 16711935 & (g >>> 8 ^ o),
            o ^= s,
            g ^= s << 8,
            s = 858993459 & (g >>> 2 ^ o),
            o ^= s,
            g ^= s << 2,
            s = 65535 & (o >>> 16 ^ g),
            g ^= s,
            o ^= s << 16,
            s = 252645135 & (o >>> 4 ^ g),
            g ^= s,
            o ^= s << 4,
            r[0] = o,
            r[1] = g
        }
        function s(t) {
            t = t || {};
            var e, r = (t.mode || "CBC").toUpperCase(), a = "DES-" + r;
            e = t.decrypt ? o.cipher.createDecipher(a, t.key) : o.cipher.createCipher(a, t.key);
            var i = e.start;
            return e.start = function(t, r) {
                var a = null;
                r instanceof o.util.ByteBuffer && (a = r,
                r = {}),
                r = r || {},
                r.output = a,
                r.iv = t,
                i.call(e, r)
            }
            ,
            e
        }
        var o = r(0);
        r(9),
        r(10),
        r(1),
        t.exports = o.des = o.des || {},
        o.des.startEncrypting = function(t, e, r, a) {
            var i = s({
                key: t,
                output: r,
                decrypt: !1,
                mode: a || (null === e ? "ECB" : "CBC")
            });
            return i.start(e),
            i
        }
        ,
        o.des.createEncryptionCipher = function(t, e) {
            return s({
                key: t,
                output: null,
                decrypt: !1,
                mode: e
            })
        }
        ,
        o.des.startDecrypting = function(t, e, r, a) {
            var i = s({
                key: t,
                output: r,
                decrypt: !0,
                mode: a || (null === e ? "ECB" : "CBC")
            });
            return i.start(e),
            i
        }
        ,
        o.des.createDecryptionCipher = function(t, e) {
            return s({
                key: t,
                output: null,
                decrypt: !0,
                mode: e
            })
        }
        ,
        o.des.Algorithm = function(t, e) {
            var r = this;
            r.name = t,
            r.mode = new e({
                blockSize: 8,
                cipher: {
                    encrypt: function(t, e) {
                        return n(r._keys, t, e, !1)
                    },
                    decrypt: function(t, e) {
                        return n(r._keys, t, e, !0)
                    }
                }
            }),
            r._init = !1
        }
        ,
        o.des.Algorithm.prototype.initialize = function(t) {
            if (!this._init) {
                var e = o.util.createBuffer(t.key);
                if (0 === this.name.indexOf("3DES") && 24 !== e.length())
                    throw new Error("Invalid Triple-DES key size: " + 8 * e.length());
                this._keys = i(e),
                this._init = !0
            }
        }
        ,
        a("DES-ECB", o.cipher.modes.ecb),
        a("DES-CBC", o.cipher.modes.cbc),
        a("DES-CFB", o.cipher.modes.cfb),
        a("DES-OFB", o.cipher.modes.ofb),
        a("DES-CTR", o.cipher.modes.ctr),
        a("3DES-ECB", o.cipher.modes.ecb),
        a("3DES-CBC", o.cipher.modes.cbc),
        a("3DES-CFB", o.cipher.modes.cfb),
        a("3DES-OFB", o.cipher.modes.ofb),
        a("3DES-CTR", o.cipher.modes.ctr);
        var u = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756]
          , c = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344]
          , l = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584]
          , h = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928]
          , p = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080]
          , f = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312]
          , d = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154]
          , y = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696]
    }
    , function(t, e, r) {
        var a = r(0);
        r(19),
        r(2),
        r(1);
        var i, n = a.pkcs5 = a.pkcs5 || {};
        a.util.isNodejs && !a.options.usePureJavaScript && (i = r(12)),
        t.exports = a.pbkdf2 = n.pbkdf2 = function(t, e, r, n, s, o) {
            function u() {
                if (C > p)
                    return o(null, v);
                d.start(null, null),
                d.update(e),
                d.update(a.util.int32ToBytes(C)),
                y = m = d.digest().getBytes(),
                E = 2,
                c()
            }
            function c() {
                if (E <= r)
                    return d.start(null, null),
                    d.update(m),
                    g = d.digest().getBytes(),
                    y = a.util.xorBytes(y, g, l),
                    m = g,
                    ++E,
                    a.util.setImmediate(c);
                v += C < p ? y : y.substr(0, f),
                ++C,
                u()
            }
            if ("function" == typeof s && (o = s,
            s = null),
            a.util.isNodejs && !a.options.usePureJavaScript && i.pbkdf2 && (null === s || "object" != typeof s) && (i.pbkdf2Sync.length > 4 || !s || "sha1" === s))
                return "string" != typeof s && (s = "sha1"),
                t = Buffer.from(t, "binary"),
                e = Buffer.from(e, "binary"),
                o ? 4 === i.pbkdf2Sync.length ? i.pbkdf2(t, e, r, n, function(t, e) {
                    if (t)
                        return o(t);
                    o(null, e.toString("binary"))
                }) : i.pbkdf2(t, e, r, n, s, function(t, e) {
                    if (t)
                        return o(t);
                    o(null, e.toString("binary"))
                }) : 4 === i.pbkdf2Sync.length ? i.pbkdf2Sync(t, e, r, n).toString("binary") : i.pbkdf2Sync(t, e, r, n, s).toString("binary");
            if (void 0 !== s && null !== s || (s = "sha1"),
            "string" == typeof s) {
                if (!(s in a.md.algorithms))
                    throw new Error("Unknown hash algorithm: " + s);
                s = a.md[s].create()
            }
            var l = s.digestLength;
            if (n > 4294967295 * l) {
                var h = new Error("Derived key is too long.");
                if (o)
                    return o(h);
                throw h
            }
            var p = Math.ceil(n / l)
              , f = n - (p - 1) * l
              , d = a.hmac.create();
            d.start(s, t);
            var y, g, m, v = "";
            if (!o) {
                for (var C = 1; C <= p; ++C) {
                    d.start(null, null),
                    d.update(e),
                    d.update(a.util.int32ToBytes(C)),
                    y = m = d.digest().getBytes();
                    for (var E = 2; E <= r; ++E)
                        d.start(null, null),
                        d.update(m),
                        g = d.digest().getBytes(),
                        y = a.util.xorBytes(y, g, l),
                        m = g;
                    v += C < p ? y : y.substr(0, f)
                }
                return v
            }
            var E, C = 1;
            u()
        }
    }
    , function(t, e, r) {
        var a = r(0);
        r(2),
        r(1),
        (t.exports = a.hmac = a.hmac || {}).create = function() {
            var t = null
              , e = null
              , r = null
              , i = null
              , n = {};
            return n.start = function(n, s) {
                if (null !== n)
                    if ("string" == typeof n) {
                        if (!((n = n.toLowerCase())in a.md.algorithms))
                            throw new Error('Unknown hash algorithm "' + n + '"');
                        e = a.md.algorithms[n].create()
                    } else
                        e = n;
                if (null === s)
                    s = t;
                else {
                    if ("string" == typeof s)
                        s = a.util.createBuffer(s);
                    else if (a.util.isArray(s)) {
                        var o = s;
                        s = a.util.createBuffer();
                        for (var u = 0; u < o.length; ++u)
                            s.putByte(o[u])
                    }
                    var c = s.length();
                    c > e.blockLength && (e.start(),
                    e.update(s.bytes()),
                    s = e.digest()),
                    r = a.util.createBuffer(),
                    i = a.util.createBuffer(),
                    c = s.length();
                    for (var u = 0; u < c; ++u) {
                        var o = s.at(u);
                        r.putByte(54 ^ o),
                        i.putByte(92 ^ o)
                    }
                    if (c < e.blockLength)
                        for (var o = e.blockLength - c, u = 0; u < o; ++u)
                            r.putByte(54),
                            i.putByte(92);
                    t = s,
                    r = r.bytes(),
                    i = i.bytes()
                }
                e.start(),
                e.update(r)
            }
            ,
            n.update = function(t) {
                e.update(t)
            }
            ,
            n.getMac = function() {
                var t = e.digest().bytes();
                return e.start(),
                e.update(i),
                e.update(t),
                e.digest()
            }
            ,
            n.digest = n.getMac,
            n
        }
    }
    , function(t, e, r) {
        function a(t, e) {
            "string" == typeof e && (e = {
                shortName: e
            });
            for (var r, a = null, i = 0; null === a && i < t.attributes.length; ++i)
                r = t.attributes[i],
                e.type && e.type === r.type ? a = r : e.name && e.name === r.name ? a = r : e.shortName && e.shortName === r.shortName && (a = r);
            return a
        }
        function i(t) {
            for (var e, r, a = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []), i = t.attributes, n = 0; n < i.length; ++n) {
                e = i[n];
                var s = e.value
                  , o = h.Type.PRINTABLESTRING;
                "valueTagClass"in e && (o = e.valueTagClass) === h.Type.UTF8 && (s = l.util.encodeUtf8(s)),
                r = h.create(h.Class.UNIVERSAL, h.Type.SET, !0, [h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(e.type).getBytes()), h.create(h.Class.UNIVERSAL, o, !1, s)])]),
                a.value.push(r)
            }
            return a
        }
        function n(t) {
            for (var e, r = 0; r < t.length; ++r) {
                if (e = t[r],
                void 0 === e.name && (e.type && e.type in p.oids ? e.name = p.oids[e.type] : e.shortName && e.shortName in d && (e.name = p.oids[d[e.shortName]])),
                void 0 === e.type) {
                    if (!(e.name && e.name in p.oids)) {
                        var a = new Error("Attribute type not specified.");
                        throw a.attribute = e,
                        a
                    }
                    e.type = p.oids[e.name]
                }
                if (void 0 === e.shortName && e.name && e.name in d && (e.shortName = d[e.name]),
                e.type === f.extensionRequest && (e.valueConstructed = !0,
                e.valueTagClass = h.Type.SEQUENCE,
                !e.value && e.extensions)) {
                    e.value = [];
                    for (var i = 0; i < e.extensions.length; ++i)
                        e.value.push(p.certificateExtensionToAsn1(s(e.extensions[i])))
                }
                if (void 0 === e.value) {
                    var a = new Error("Attribute value not specified.");
                    throw a.attribute = e,
                    a
                }
            }
        }
        function s(t, e) {
            if (e = e || {},
            void 0 === t.name && t.id && t.id in p.oids && (t.name = p.oids[t.id]),
            void 0 === t.id) {
                if (!(t.name && t.name in p.oids)) {
                    var r = new Error("Extension ID not specified.");
                    throw r.extension = t,
                    r
                }
                t.id = p.oids[t.name]
            }
            if (void 0 !== t.value)
                return t;
            if ("keyUsage" === t.name) {
                var a = 0
                  , n = 0
                  , s = 0;
                t.digitalSignature && (n |= 128,
                a = 7),
                t.nonRepudiation && (n |= 64,
                a = 6),
                t.keyEncipherment && (n |= 32,
                a = 5),
                t.dataEncipherment && (n |= 16,
                a = 4),
                t.keyAgreement && (n |= 8,
                a = 3),
                t.keyCertSign && (n |= 4,
                a = 2),
                t.cRLSign && (n |= 2,
                a = 1),
                t.encipherOnly && (n |= 1,
                a = 0),
                t.decipherOnly && (s |= 128,
                a = 7);
                var o = String.fromCharCode(a);
                0 !== s ? o += String.fromCharCode(n) + String.fromCharCode(s) : 0 !== n && (o += String.fromCharCode(n)),
                t.value = h.create(h.Class.UNIVERSAL, h.Type.BITSTRING, !1, o)
            } else if ("basicConstraints" === t.name)
                t.value = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []),
                t.cA && t.value.value.push(h.create(h.Class.UNIVERSAL, h.Type.BOOLEAN, !1, String.fromCharCode(255))),
                "pathLenConstraint"in t && t.value.value.push(h.create(h.Class.UNIVERSAL, h.Type.INTEGER, !1, h.integerToDer(t.pathLenConstraint).getBytes()));
            else if ("extKeyUsage" === t.name) {
                t.value = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []);
                var u = t.value.value;
                for (var c in t)
                    !0 === t[c] && (c in f ? u.push(h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(f[c]).getBytes())) : -1 !== c.indexOf(".") && u.push(h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(c).getBytes())))
            } else if ("nsCertType" === t.name) {
                var a = 0
                  , n = 0;
                t.client && (n |= 128,
                a = 7),
                t.server && (n |= 64,
                a = 6),
                t.email && (n |= 32,
                a = 5),
                t.objsign && (n |= 16,
                a = 4),
                t.reserved && (n |= 8,
                a = 3),
                t.sslCA && (n |= 4,
                a = 2),
                t.emailCA && (n |= 2,
                a = 1),
                t.objCA && (n |= 1,
                a = 0);
                var o = String.fromCharCode(a);
                0 !== n && (o += String.fromCharCode(n)),
                t.value = h.create(h.Class.UNIVERSAL, h.Type.BITSTRING, !1, o)
            } else if ("subjectAltName" === t.name || "issuerAltName" === t.name) {
                t.value = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []);
                for (var d, y = 0; y < t.altNames.length; ++y) {
                    d = t.altNames[y];
                    var o = d.value;
                    if (7 === d.type && d.ip) {
                        if (null === (o = l.util.bytesFromIP(d.ip))) {
                            var r = new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.');
                            throw r.extension = t,
                            r
                        }
                    } else
                        8 === d.type && (o = d.oid ? h.oidToDer(h.oidToDer(d.oid)) : h.oidToDer(o));
                    t.value.value.push(h.create(h.Class.CONTEXT_SPECIFIC, d.type, !1, o))
                }
            } else if ("nsComment" === t.name && e.cert) {
                if (!/^[\x00-\x7F]*$/.test(t.comment) || t.comment.length < 1 || t.comment.length > 128)
                    throw new Error('Invalid "nsComment" content.');
                t.value = h.create(h.Class.UNIVERSAL, h.Type.IA5STRING, !1, t.comment)
            } else if ("subjectKeyIdentifier" === t.name && e.cert) {
                var g = e.cert.generateSubjectKeyIdentifier();
                t.subjectKeyIdentifier = g.toHex(),
                t.value = h.create(h.Class.UNIVERSAL, h.Type.OCTETSTRING, !1, g.getBytes())
            } else if ("authorityKeyIdentifier" === t.name && e.cert) {
                t.value = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []);
                var u = t.value.value;
                if (t.keyIdentifier) {
                    var m = !0 === t.keyIdentifier ? e.cert.generateSubjectKeyIdentifier().getBytes() : t.keyIdentifier;
                    u.push(h.create(h.Class.CONTEXT_SPECIFIC, 0, !1, m))
                }
                if (t.authorityCertIssuer) {
                    var v = [h.create(h.Class.CONTEXT_SPECIFIC, 4, !0, [i(!0 === t.authorityCertIssuer ? e.cert.issuer : t.authorityCertIssuer)])];
                    u.push(h.create(h.Class.CONTEXT_SPECIFIC, 1, !0, v))
                }
                if (t.serialNumber) {
                    var C = l.util.hexToBytes(!0 === t.serialNumber ? e.cert.serialNumber : t.serialNumber);
                    u.push(h.create(h.Class.CONTEXT_SPECIFIC, 2, !1, C))
                }
            } else if ("cRLDistributionPoints" === t.name) {
                t.value = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []);
                for (var d, u = t.value.value, E = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []), S = h.create(h.Class.CONTEXT_SPECIFIC, 0, !0, []), y = 0; y < t.altNames.length; ++y) {
                    d = t.altNames[y];
                    var o = d.value;
                    if (7 === d.type && d.ip) {
                        if (null === (o = l.util.bytesFromIP(d.ip))) {
                            var r = new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.');
                            throw r.extension = t,
                            r
                        }
                    } else
                        8 === d.type && (o = d.oid ? h.oidToDer(h.oidToDer(d.oid)) : h.oidToDer(o));
                    S.value.push(h.create(h.Class.CONTEXT_SPECIFIC, d.type, !1, o))
                }
                E.value.push(h.create(h.Class.CONTEXT_SPECIFIC, 0, !0, [S])),
                u.push(E)
            }
            if (void 0 === t.value) {
                var r = new Error("Extension value not specified.");
                throw r.extension = t,
                r
            }
            return t
        }
        function o(t, e) {
            switch (t) {
            case f["RSASSA-PSS"]:
                var r = [];
                return void 0 !== e.hash.algorithmOid && r.push(h.create(h.Class.CONTEXT_SPECIFIC, 0, !0, [h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(e.hash.algorithmOid).getBytes()), h.create(h.Class.UNIVERSAL, h.Type.NULL, !1, "")])])),
                void 0 !== e.mgf.algorithmOid && r.push(h.create(h.Class.CONTEXT_SPECIFIC, 1, !0, [h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(e.mgf.algorithmOid).getBytes()), h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(e.mgf.hash.algorithmOid).getBytes()), h.create(h.Class.UNIVERSAL, h.Type.NULL, !1, "")])])])),
                void 0 !== e.saltLength && r.push(h.create(h.Class.CONTEXT_SPECIFIC, 2, !0, [h.create(h.Class.UNIVERSAL, h.Type.INTEGER, !1, h.integerToDer(e.saltLength).getBytes())])),
                h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, r);
            default:
                return h.create(h.Class.UNIVERSAL, h.Type.NULL, !1, "")
            }
        }
        function u(t) {
            var e = h.create(h.Class.CONTEXT_SPECIFIC, 0, !0, []);
            if (0 === t.attributes.length)
                return e;
            for (var r = t.attributes, a = 0; a < r.length; ++a) {
                var i = r[a]
                  , n = i.value
                  , s = h.Type.UTF8;
                "valueTagClass"in i && (s = i.valueTagClass),
                s === h.Type.UTF8 && (n = l.util.encodeUtf8(n));
                var o = !1;
                "valueConstructed"in i && (o = i.valueConstructed);
                var u = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(i.type).getBytes()), h.create(h.Class.UNIVERSAL, h.Type.SET, !0, [h.create(h.Class.UNIVERSAL, s, o, n)])]);
                e.value.push(u)
            }
            return e
        }
        function c(t) {
            return t >= S && t < T ? h.create(h.Class.UNIVERSAL, h.Type.UTCTIME, !1, h.dateToUtcTime(t)) : h.create(h.Class.UNIVERSAL, h.Type.GENERALIZEDTIME, !1, h.dateToGeneralizedTime(t))
        }
        var l = r(0);
        r(7),
        r(3),
        r(17),
        r(2),
        r(33),
        r(5),
        r(13),
        r(21),
        r(6),
        r(1);
        var h = l.asn1
          , p = t.exports = l.pki = l.pki || {}
          , f = p.oids
          , d = {};
        d.CN = f.commonName,
        d.commonName = "CN",
        d.C = f.countryName,
        d.countryName = "C",
        d.L = f.localityName,
        d.localityName = "L",
        d.ST = f.stateOrProvinceName,
        d.stateOrProvinceName = "ST",
        d.O = f.organizationName,
        d.organizationName = "O",
        d.OU = f.organizationalUnitName,
        d.organizationalUnitName = "OU",
        d.E = f.emailAddress,
        d.emailAddress = "E";
        var y = l.pki.rsa.publicKeyValidator
          , g = {
            name: "Certificate",
            tagClass: h.Class.UNIVERSAL,
            type: h.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "Certificate.TBSCertificate",
                tagClass: h.Class.UNIVERSAL,
                type: h.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "tbsCertificate",
                value: [{
                    name: "Certificate.TBSCertificate.version",
                    tagClass: h.Class.CONTEXT_SPECIFIC,
                    type: 0,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.version.integer",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.INTEGER,
                        constructed: !1,
                        capture: "certVersion"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.serialNumber",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Type.INTEGER,
                    constructed: !1,
                    capture: "certSerialNumber"
                }, {
                    name: "Certificate.TBSCertificate.signature",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.signature.algorithm",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.OID,
                        constructed: !1,
                        capture: "certinfoSignatureOid"
                    }, {
                        name: "Certificate.TBSCertificate.signature.parameters",
                        tagClass: h.Class.UNIVERSAL,
                        optional: !0,
                        captureAsn1: "certinfoSignatureParams"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.issuer",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "certIssuer"
                }, {
                    name: "Certificate.TBSCertificate.validity",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.validity.notBefore (utc)",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.UTCTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity1UTCTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notBefore (generalized)",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.GENERALIZEDTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity2GeneralizedTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notAfter (utc)",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.UTCTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity3UTCTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notAfter (generalized)",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.GENERALIZEDTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity4GeneralizedTime"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.subject",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "certSubject"
                }, y, {
                    name: "Certificate.TBSCertificate.issuerUniqueID",
                    tagClass: h.Class.CONTEXT_SPECIFIC,
                    type: 1,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.issuerUniqueID.id",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.BITSTRING,
                        constructed: !1,
                        captureBitStringValue: "certIssuerUniqueId"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.subjectUniqueID",
                    tagClass: h.Class.CONTEXT_SPECIFIC,
                    type: 2,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.subjectUniqueID.id",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.BITSTRING,
                        constructed: !1,
                        captureBitStringValue: "certSubjectUniqueId"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.extensions",
                    tagClass: h.Class.CONTEXT_SPECIFIC,
                    type: 3,
                    constructed: !0,
                    captureAsn1: "certExtensions",
                    optional: !0
                }]
            }, {
                name: "Certificate.signatureAlgorithm",
                tagClass: h.Class.UNIVERSAL,
                type: h.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "Certificate.signatureAlgorithm.algorithm",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Type.OID,
                    constructed: !1,
                    capture: "certSignatureOid"
                }, {
                    name: "Certificate.TBSCertificate.signature.parameters",
                    tagClass: h.Class.UNIVERSAL,
                    optional: !0,
                    captureAsn1: "certSignatureParams"
                }]
            }, {
                name: "Certificate.signatureValue",
                tagClass: h.Class.UNIVERSAL,
                type: h.Type.BITSTRING,
                constructed: !1,
                captureBitStringValue: "certSignature"
            }]
        }
          , m = {
            name: "rsapss",
            tagClass: h.Class.UNIVERSAL,
            type: h.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "rsapss.hashAlgorithm",
                tagClass: h.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                value: [{
                    name: "rsapss.hashAlgorithm.AlgorithmIdentifier",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Class.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.OID,
                        constructed: !1,
                        capture: "hashOid"
                    }]
                }]
            }, {
                name: "rsapss.maskGenAlgorithm",
                tagClass: h.Class.CONTEXT_SPECIFIC,
                type: 1,
                constructed: !0,
                value: [{
                    name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Class.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.OID,
                        constructed: !1,
                        capture: "maskGenOid"
                    }, {
                        name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",
                            tagClass: h.Class.UNIVERSAL,
                            type: h.Type.OID,
                            constructed: !1,
                            capture: "maskGenHashOid"
                        }]
                    }]
                }]
            }, {
                name: "rsapss.saltLength",
                tagClass: h.Class.CONTEXT_SPECIFIC,
                type: 2,
                optional: !0,
                value: [{
                    name: "rsapss.saltLength.saltLength",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Class.INTEGER,
                    constructed: !1,
                    capture: "saltLength"
                }]
            }, {
                name: "rsapss.trailerField",
                tagClass: h.Class.CONTEXT_SPECIFIC,
                type: 3,
                optional: !0,
                value: [{
                    name: "rsapss.trailer.trailer",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Class.INTEGER,
                    constructed: !1,
                    capture: "trailer"
                }]
            }]
        }
          , v = {
            name: "CertificationRequestInfo",
            tagClass: h.Class.UNIVERSAL,
            type: h.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "certificationRequestInfo",
            value: [{
                name: "CertificationRequestInfo.integer",
                tagClass: h.Class.UNIVERSAL,
                type: h.Type.INTEGER,
                constructed: !1,
                capture: "certificationRequestInfoVersion"
            }, {
                name: "CertificationRequestInfo.subject",
                tagClass: h.Class.UNIVERSAL,
                type: h.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "certificationRequestInfoSubject"
            }, y, {
                name: "CertificationRequestInfo.attributes",
                tagClass: h.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                capture: "certificationRequestInfoAttributes",
                value: [{
                    name: "CertificationRequestInfo.attributes",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "CertificationRequestInfo.attributes.type",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.OID,
                        constructed: !1
                    }, {
                        name: "CertificationRequestInfo.attributes.value",
                        tagClass: h.Class.UNIVERSAL,
                        type: h.Type.SET,
                        constructed: !0
                    }]
                }]
            }]
        }
          , C = {
            name: "CertificationRequest",
            tagClass: h.Class.UNIVERSAL,
            type: h.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "csr",
            value: [v, {
                name: "CertificationRequest.signatureAlgorithm",
                tagClass: h.Class.UNIVERSAL,
                type: h.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "CertificationRequest.signatureAlgorithm.algorithm",
                    tagClass: h.Class.UNIVERSAL,
                    type: h.Type.OID,
                    constructed: !1,
                    capture: "csrSignatureOid"
                }, {
                    name: "CertificationRequest.signatureAlgorithm.parameters",
                    tagClass: h.Class.UNIVERSAL,
                    optional: !0,
                    captureAsn1: "csrSignatureParams"
                }]
            }, {
                name: "CertificationRequest.signature",
                tagClass: h.Class.UNIVERSAL,
                type: h.Type.BITSTRING,
                constructed: !1,
                captureBitStringValue: "csrSignature"
            }]
        };
        p.RDNAttributesAsArray = function(t, e) {
            for (var r, a, i, n = [], s = 0; s < t.value.length; ++s) {
                r = t.value[s];
                for (var o = 0; o < r.value.length; ++o)
                    i = {},
                    a = r.value[o],
                    i.type = h.derToOid(a.value[0].value),
                    i.value = a.value[1].value,
                    i.valueTagClass = a.value[1].type,
                    i.type in f && (i.name = f[i.type],
                    i.name in d && (i.shortName = d[i.name])),
                    e && (e.update(i.type),
                    e.update(i.value)),
                    n.push(i)
            }
            return n
        }
        ,
        p.CRIAttributesAsArray = function(t) {
            for (var e = [], r = 0; r < t.length; ++r)
                for (var a = t[r], i = h.derToOid(a.value[0].value), n = a.value[1].value, s = 0; s < n.length; ++s) {
                    var o = {};
                    if (o.type = i,
                    o.value = n[s].value,
                    o.valueTagClass = n[s].type,
                    o.type in f && (o.name = f[o.type],
                    o.name in d && (o.shortName = d[o.name])),
                    o.type === f.extensionRequest) {
                        o.extensions = [];
                        for (var u = 0; u < o.value.length; ++u)
                            o.extensions.push(p.certificateExtensionFromAsn1(o.value[u]))
                    }
                    e.push(o)
                }
            return e
        }
        ;
        var E = function(t, e, r) {
            var a = {};
            if (t !== f["RSASSA-PSS"])
                return a;
            r && (a = {
                hash: {
                    algorithmOid: f.sha1
                },
                mgf: {
                    algorithmOid: f.mgf1,
                    hash: {
                        algorithmOid: f.sha1
                    }
                },
                saltLength: 20
            });
            var i = {}
              , n = [];
            if (!h.validate(e, m, i, n)) {
                var s = new Error("Cannot read RSASSA-PSS parameter block.");
                throw s.errors = n,
                s
            }
            return void 0 !== i.hashOid && (a.hash = a.hash || {},
            a.hash.algorithmOid = h.derToOid(i.hashOid)),
            void 0 !== i.maskGenOid && (a.mgf = a.mgf || {},
            a.mgf.algorithmOid = h.derToOid(i.maskGenOid),
            a.mgf.hash = a.mgf.hash || {},
            a.mgf.hash.algorithmOid = h.derToOid(i.maskGenHashOid)),
            void 0 !== i.saltLength && (a.saltLength = i.saltLength.charCodeAt(0)),
            a
        };
        p.certificateFromPem = function(t, e, r) {
            var a = l.pem.decode(t)[0];
            if ("CERTIFICATE" !== a.type && "X509 CERTIFICATE" !== a.type && "TRUSTED CERTIFICATE" !== a.type) {
                var i = new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');
                throw i.headerType = a.type,
                i
            }
            if (a.procType && "ENCRYPTED" === a.procType.type)
                throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
            var n = h.fromDer(a.body, r);
            return p.certificateFromAsn1(n, e)
        }
        ,
        p.certificateToPem = function(t, e) {
            var r = {
                type: "CERTIFICATE",
                body: h.toDer(p.certificateToAsn1(t)).getBytes()
            };
            return l.pem.encode(r, {
                maxline: e
            })
        }
        ,
        p.publicKeyFromPem = function(t) {
            var e = l.pem.decode(t)[0];
            if ("PUBLIC KEY" !== e.type && "RSA PUBLIC KEY" !== e.type) {
                var r = new Error('Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".');
                throw r.headerType = e.type,
                r
            }
            if (e.procType && "ENCRYPTED" === e.procType.type)
                throw new Error("Could not convert public key from PEM; PEM is encrypted.");
            var a = h.fromDer(e.body);
            return p.publicKeyFromAsn1(a)
        }
        ,
        p.publicKeyToPem = function(t, e) {
            var r = {
                type: "PUBLIC KEY",
                body: h.toDer(p.publicKeyToAsn1(t)).getBytes()
            };
            return l.pem.encode(r, {
                maxline: e
            })
        }
        ,
        p.publicKeyToRSAPublicKeyPem = function(t, e) {
            var r = {
                type: "RSA PUBLIC KEY",
                body: h.toDer(p.publicKeyToRSAPublicKey(t)).getBytes()
            };
            return l.pem.encode(r, {
                maxline: e
            })
        }
        ,
        p.getPublicKeyFingerprint = function(t, e) {
            e = e || {};
            var r, a = e.md || l.md.sha1.create(), i = e.type || "RSAPublicKey";
            switch (i) {
            case "RSAPublicKey":
                r = h.toDer(p.publicKeyToRSAPublicKey(t)).getBytes();
                break;
            case "SubjectPublicKeyInfo":
                r = h.toDer(p.publicKeyToAsn1(t)).getBytes();
                break;
            default:
                throw new Error('Unknown fingerprint type "' + e.type + '".')
            }
            a.start(),
            a.update(r);
            var n = a.digest();
            if ("hex" === e.encoding) {
                var s = n.toHex();
                return e.delimiter ? s.match(/.{2}/g).join(e.delimiter) : s
            }
            if ("binary" === e.encoding)
                return n.getBytes();
            if (e.encoding)
                throw new Error('Unknown encoding "' + e.encoding + '".');
            return n
        }
        ,
        p.certificationRequestFromPem = function(t, e, r) {
            var a = l.pem.decode(t)[0];
            if ("CERTIFICATE REQUEST" !== a.type) {
                var i = new Error('Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".');
                throw i.headerType = a.type,
                i
            }
            if (a.procType && "ENCRYPTED" === a.procType.type)
                throw new Error("Could not convert certification request from PEM; PEM is encrypted.");
            var n = h.fromDer(a.body, r);
            return p.certificationRequestFromAsn1(n, e)
        }
        ,
        p.certificationRequestToPem = function(t, e) {
            var r = {
                type: "CERTIFICATE REQUEST",
                body: h.toDer(p.certificationRequestToAsn1(t)).getBytes()
            };
            return l.pem.encode(r, {
                maxline: e
            })
        }
        ,
        p.createCertificate = function() {
            var t = {};
            return t.version = 2,
            t.serialNumber = "00",
            t.signatureOid = null,
            t.signature = null,
            t.siginfo = {},
            t.siginfo.algorithmOid = null,
            t.validity = {},
            t.validity.notBefore = new Date,
            t.validity.notAfter = new Date,
            t.issuer = {},
            t.issuer.getField = function(e) {
                return a(t.issuer, e)
            }
            ,
            t.issuer.addField = function(e) {
                n([e]),
                t.issuer.attributes.push(e)
            }
            ,
            t.issuer.attributes = [],
            t.issuer.hash = null,
            t.subject = {},
            t.subject.getField = function(e) {
                return a(t.subject, e)
            }
            ,
            t.subject.addField = function(e) {
                n([e]),
                t.subject.attributes.push(e)
            }
            ,
            t.subject.attributes = [],
            t.subject.hash = null,
            t.extensions = [],
            t.publicKey = null,
            t.md = null,
            t.setSubject = function(e, r) {
                n(e),
                t.subject.attributes = e,
                delete t.subject.uniqueId,
                r && (t.subject.uniqueId = r),
                t.subject.hash = null
            }
            ,
            t.setIssuer = function(e, r) {
                n(e),
                t.issuer.attributes = e,
                delete t.issuer.uniqueId,
                r && (t.issuer.uniqueId = r),
                t.issuer.hash = null
            }
            ,
            t.setExtensions = function(e) {
                for (var r = 0; r < e.length; ++r)
                    s(e[r], {
                        cert: t
                    });
                t.extensions = e
            }
            ,
            t.getExtension = function(e) {
                "string" == typeof e && (e = {
                    name: e
                });
                for (var r, a = null, i = 0; null === a && i < t.extensions.length; ++i)
                    r = t.extensions[i],
                    e.id && r.id === e.id ? a = r : e.name && r.name === e.name && (a = r);
                return a
            }
            ,
            t.sign = function(e, r) {
                t.md = r || l.md.sha1.create();
                var a = f[t.md.algorithm + "WithRSAEncryption"];
                if (!a) {
                    var i = new Error("Could not compute certificate digest. Unknown message digest algorithm OID.");
                    throw i.algorithm = t.md.algorithm,
                    i
                }
                t.signatureOid = t.siginfo.algorithmOid = a,
                t.tbsCertificate = p.getTBSCertificate(t);
                var n = h.toDer(t.tbsCertificate);
                t.md.update(n.getBytes()),
                t.signature = e.sign(t.md)
            }
            ,
            t.verify = function(e) {
                var r = !1;
                if (!t.issued(e)) {
                    var a = e.issuer
                      , i = t.subject
                      , n = new Error("The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject.");
                    throw n.expectedIssuer = a.attributes,
                    n.actualIssuer = i.attributes,
                    n
                }
                var s = e.md;
                if (null === s) {
                    if (e.signatureOid in f) {
                        switch (f[e.signatureOid]) {
                        case "sha1WithRSAEncryption":
                            s = l.md.sha1.create();
                            break;
                        case "md5WithRSAEncryption":
                            s = l.md.md5.create();
                            break;
                        case "sha256WithRSAEncryption":
                            s = l.md.sha256.create();
                            break;
                        case "sha384WithRSAEncryption":
                            s = l.md.sha384.create();
                            break;
                        case "sha512WithRSAEncryption":
                            s = l.md.sha512.create();
                            break;
                        case "RSASSA-PSS":
                            s = l.md.sha256.create()
                        }
                    }
                    if (null === s) {
                        var n = new Error("Could not compute certificate digest. Unknown signature OID.");
                        throw n.signatureOid = e.signatureOid,
                        n
                    }
                    var o = e.tbsCertificate || p.getTBSCertificate(e)
                      , u = h.toDer(o);
                    s.update(u.getBytes())
                }
                if (null !== s) {
                    var c;
                    switch (e.signatureOid) {
                    case f.sha1WithRSAEncryption:
                        c = void 0;
                        break;
                    case f["RSASSA-PSS"]:
                        var d, y;
                        if (void 0 === (d = f[e.signatureParameters.mgf.hash.algorithmOid]) || void 0 === l.md[d]) {
                            var n = new Error("Unsupported MGF hash function.");
                            throw n.oid = e.signatureParameters.mgf.hash.algorithmOid,
                            n.name = d,
                            n
                        }
                        if (void 0 === (y = f[e.signatureParameters.mgf.algorithmOid]) || void 0 === l.mgf[y]) {
                            var n = new Error("Unsupported MGF function.");
                            throw n.oid = e.signatureParameters.mgf.algorithmOid,
                            n.name = y,
                            n
                        }
                        if (y = l.mgf[y].create(l.md[d].create()),
                        void 0 === (d = f[e.signatureParameters.hash.algorithmOid]) || void 0 === l.md[d])
                            throw {
                                message: "Unsupported RSASSA-PSS hash function.",
                                oid: e.signatureParameters.hash.algorithmOid,
                                name: d
                            };
                        c = l.pss.create(l.md[d].create(), y, e.signatureParameters.saltLength)
                    }
                    r = t.publicKey.verify(s.digest().getBytes(), e.signature, c)
                }
                return r
            }
            ,
            t.isIssuer = function(e) {
                var r = !1
                  , a = t.issuer
                  , i = e.subject;
                if (a.hash && i.hash)
                    r = a.hash === i.hash;
                else if (a.attributes.length === i.attributes.length) {
                    r = !0;
                    for (var n, s, o = 0; r && o < a.attributes.length; ++o)
                        n = a.attributes[o],
                        s = i.attributes[o],
                        n.type === s.type && n.value === s.value || (r = !1)
                }
                return r
            }
            ,
            t.issued = function(e) {
                return e.isIssuer(t)
            }
            ,
            t.generateSubjectKeyIdentifier = function() {
                return p.getPublicKeyFingerprint(t.publicKey, {
                    type: "RSAPublicKey"
                })
            }
            ,
            t.verifySubjectKeyIdentifier = function() {
                for (var e = f.subjectKeyIdentifier, r = 0; r < t.extensions.length; ++r) {
                    var a = t.extensions[r];
                    if (a.id === e) {
                        var i = t.generateSubjectKeyIdentifier().getBytes();
                        return l.util.hexToBytes(a.subjectKeyIdentifier) === i
                    }
                }
                return !1
            }
            ,
            t
        }
        ,
        p.certificateFromAsn1 = function(t, e) {
            var r = {}
              , i = [];
            if (!h.validate(t, g, r, i)) {
                var s = new Error("Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.");
                throw s.errors = i,
                s
            }
            var o = h.derToOid(r.publicKeyOid);
            if (o !== p.oids.rsaEncryption)
                throw new Error("Cannot read public key. OID is not RSA.");
            var u = p.createCertificate();
            u.version = r.certVersion ? r.certVersion.charCodeAt(0) : 0;
            var c = l.util.createBuffer(r.certSerialNumber);
            u.serialNumber = c.toHex(),
            u.signatureOid = l.asn1.derToOid(r.certSignatureOid),
            u.signatureParameters = E(u.signatureOid, r.certSignatureParams, !0),
            u.siginfo.algorithmOid = l.asn1.derToOid(r.certinfoSignatureOid),
            u.siginfo.parameters = E(u.siginfo.algorithmOid, r.certinfoSignatureParams, !1),
            u.signature = r.certSignature;
            var d = [];
            if (void 0 !== r.certValidity1UTCTime && d.push(h.utcTimeToDate(r.certValidity1UTCTime)),
            void 0 !== r.certValidity2GeneralizedTime && d.push(h.generalizedTimeToDate(r.certValidity2GeneralizedTime)),
            void 0 !== r.certValidity3UTCTime && d.push(h.utcTimeToDate(r.certValidity3UTCTime)),
            void 0 !== r.certValidity4GeneralizedTime && d.push(h.generalizedTimeToDate(r.certValidity4GeneralizedTime)),
            d.length > 2)
                throw new Error("Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.");
            if (d.length < 2)
                throw new Error("Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.");
            if (u.validity.notBefore = d[0],
            u.validity.notAfter = d[1],
            u.tbsCertificate = r.tbsCertificate,
            e) {
                if (u.md = null,
                u.signatureOid in f) {
                    var o = f[u.signatureOid];
                    switch (o) {
                    case "sha1WithRSAEncryption":
                        u.md = l.md.sha1.create();
                        break;
                    case "md5WithRSAEncryption":
                        u.md = l.md.md5.create();
                        break;
                    case "sha256WithRSAEncryption":
                        u.md = l.md.sha256.create();
                        break;
                    case "sha384WithRSAEncryption":
                        u.md = l.md.sha384.create();
                        break;
                    case "sha512WithRSAEncryption":
                        u.md = l.md.sha512.create();
                        break;
                    case "RSASSA-PSS":
                        u.md = l.md.sha256.create()
                    }
                }
                if (null === u.md) {
                    var s = new Error("Could not compute certificate digest. Unknown signature OID.");
                    throw s.signatureOid = u.signatureOid,
                    s
                }
                var y = h.toDer(u.tbsCertificate);
                u.md.update(y.getBytes())
            }
            var m = l.md.sha1.create();
            u.issuer.getField = function(t) {
                return a(u.issuer, t)
            }
            ,
            u.issuer.addField = function(t) {
                n([t]),
                u.issuer.attributes.push(t)
            }
            ,
            u.issuer.attributes = p.RDNAttributesAsArray(r.certIssuer, m),
            r.certIssuerUniqueId && (u.issuer.uniqueId = r.certIssuerUniqueId),
            u.issuer.hash = m.digest().toHex();
            var v = l.md.sha1.create();
            return u.subject.getField = function(t) {
                return a(u.subject, t)
            }
            ,
            u.subject.addField = function(t) {
                n([t]),
                u.subject.attributes.push(t)
            }
            ,
            u.subject.attributes = p.RDNAttributesAsArray(r.certSubject, v),
            r.certSubjectUniqueId && (u.subject.uniqueId = r.certSubjectUniqueId),
            u.subject.hash = v.digest().toHex(),
            r.certExtensions ? u.extensions = p.certificateExtensionsFromAsn1(r.certExtensions) : u.extensions = [],
            u.publicKey = p.publicKeyFromAsn1(r.subjectPublicKeyInfo),
            u
        }
        ,
        p.certificateExtensionsFromAsn1 = function(t) {
            for (var e = [], r = 0; r < t.value.length; ++r)
                for (var a = t.value[r], i = 0; i < a.value.length; ++i)
                    e.push(p.certificateExtensionFromAsn1(a.value[i]));
            return e
        }
        ,
        p.certificateExtensionFromAsn1 = function(t) {
            var e = {};
            if (e.id = h.derToOid(t.value[0].value),
            e.critical = !1,
            t.value[1].type === h.Type.BOOLEAN ? (e.critical = 0 !== t.value[1].value.charCodeAt(0),
            e.value = t.value[2].value) : e.value = t.value[1].value,
            e.id in f)
                if (e.name = f[e.id],
                "keyUsage" === e.name) {
                    var r = h.fromDer(e.value)
                      , a = 0
                      , i = 0;
                    r.value.length > 1 && (a = r.value.charCodeAt(1),
                    i = r.value.length > 2 ? r.value.charCodeAt(2) : 0),
                    e.digitalSignature = 128 == (128 & a),
                    e.nonRepudiation = 64 == (64 & a),
                    e.keyEncipherment = 32 == (32 & a),
                    e.dataEncipherment = 16 == (16 & a),
                    e.keyAgreement = 8 == (8 & a),
                    e.keyCertSign = 4 == (4 & a),
                    e.cRLSign = 2 == (2 & a),
                    e.encipherOnly = 1 == (1 & a),
                    e.decipherOnly = 128 == (128 & i)
                } else if ("basicConstraints" === e.name) {
                    var r = h.fromDer(e.value);
                    r.value.length > 0 && r.value[0].type === h.Type.BOOLEAN ? e.cA = 0 !== r.value[0].value.charCodeAt(0) : e.cA = !1;
                    var n = null;
                    r.value.length > 0 && r.value[0].type === h.Type.INTEGER ? n = r.value[0].value : r.value.length > 1 && (n = r.value[1].value),
                    null !== n && (e.pathLenConstraint = h.derToInteger(n))
                } else if ("extKeyUsage" === e.name)
                    for (var r = h.fromDer(e.value), s = 0; s < r.value.length; ++s) {
                        var o = h.derToOid(r.value[s].value);
                        o in f ? e[f[o]] = !0 : e[o] = !0
                    }
                else if ("nsCertType" === e.name) {
                    var r = h.fromDer(e.value)
                      , a = 0;
                    r.value.length > 1 && (a = r.value.charCodeAt(1)),
                    e.client = 128 == (128 & a),
                    e.server = 64 == (64 & a),
                    e.email = 32 == (32 & a),
                    e.objsign = 16 == (16 & a),
                    e.reserved = 8 == (8 & a),
                    e.sslCA = 4 == (4 & a),
                    e.emailCA = 2 == (2 & a),
                    e.objCA = 1 == (1 & a)
                } else if ("subjectAltName" === e.name || "issuerAltName" === e.name) {
                    e.altNames = [];
                    for (var u, r = h.fromDer(e.value), c = 0; c < r.value.length; ++c) {
                        u = r.value[c];
                        var p = {
                            type: u.type,
                            value: u.value
                        };
                        switch (e.altNames.push(p),
                        u.type) {
                        case 1:
                        case 2:
                        case 6:
                            break;
                        case 7:
                            p.ip = l.util.bytesToIP(u.value);
                            break;
                        case 8:
                            p.oid = h.derToOid(u.value)
                        }
                    }
                } else if ("subjectKeyIdentifier" === e.name) {
                    var r = h.fromDer(e.value);
                    e.subjectKeyIdentifier = l.util.bytesToHex(r.value)
                }
            return e
        }
        ,
        p.certificationRequestFromAsn1 = function(t, e) {
            var r = {}
              , i = [];
            if (!h.validate(t, C, r, i)) {
                var s = new Error("Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.");
                throw s.errors = i,
                s
            }
            var o = h.derToOid(r.publicKeyOid);
            if (o !== p.oids.rsaEncryption)
                throw new Error("Cannot read public key. OID is not RSA.");
            var u = p.createCertificationRequest();
            if (u.version = r.csrVersion ? r.csrVersion.charCodeAt(0) : 0,
            u.signatureOid = l.asn1.derToOid(r.csrSignatureOid),
            u.signatureParameters = E(u.signatureOid, r.csrSignatureParams, !0),
            u.siginfo.algorithmOid = l.asn1.derToOid(r.csrSignatureOid),
            u.siginfo.parameters = E(u.siginfo.algorithmOid, r.csrSignatureParams, !1),
            u.signature = r.csrSignature,
            u.certificationRequestInfo = r.certificationRequestInfo,
            e) {
                if (u.md = null,
                u.signatureOid in f) {
                    var o = f[u.signatureOid];
                    switch (o) {
                    case "sha1WithRSAEncryption":
                        u.md = l.md.sha1.create();
                        break;
                    case "md5WithRSAEncryption":
                        u.md = l.md.md5.create();
                        break;
                    case "sha256WithRSAEncryption":
                        u.md = l.md.sha256.create();
                        break;
                    case "sha384WithRSAEncryption":
                        u.md = l.md.sha384.create();
                        break;
                    case "sha512WithRSAEncryption":
                        u.md = l.md.sha512.create();
                        break;
                    case "RSASSA-PSS":
                        u.md = l.md.sha256.create()
                    }
                }
                if (null === u.md) {
                    var s = new Error("Could not compute certification request digest. Unknown signature OID.");
                    throw s.signatureOid = u.signatureOid,
                    s
                }
                var c = h.toDer(u.certificationRequestInfo);
                u.md.update(c.getBytes())
            }
            var d = l.md.sha1.create();
            return u.subject.getField = function(t) {
                return a(u.subject, t)
            }
            ,
            u.subject.addField = function(t) {
                n([t]),
                u.subject.attributes.push(t)
            }
            ,
            u.subject.attributes = p.RDNAttributesAsArray(r.certificationRequestInfoSubject, d),
            u.subject.hash = d.digest().toHex(),
            u.publicKey = p.publicKeyFromAsn1(r.subjectPublicKeyInfo),
            u.getAttribute = function(t) {
                return a(u, t)
            }
            ,
            u.addAttribute = function(t) {
                n([t]),
                u.attributes.push(t)
            }
            ,
            u.attributes = p.CRIAttributesAsArray(r.certificationRequestInfoAttributes || []),
            u
        }
        ,
        p.createCertificationRequest = function() {
            var t = {};
            return t.version = 0,
            t.signatureOid = null,
            t.signature = null,
            t.siginfo = {},
            t.siginfo.algorithmOid = null,
            t.subject = {},
            t.subject.getField = function(e) {
                return a(t.subject, e)
            }
            ,
            t.subject.addField = function(e) {
                n([e]),
                t.subject.attributes.push(e)
            }
            ,
            t.subject.attributes = [],
            t.subject.hash = null,
            t.publicKey = null,
            t.attributes = [],
            t.getAttribute = function(e) {
                return a(t, e)
            }
            ,
            t.addAttribute = function(e) {
                n([e]),
                t.attributes.push(e)
            }
            ,
            t.md = null,
            t.setSubject = function(e) {
                n(e),
                t.subject.attributes = e,
                t.subject.hash = null
            }
            ,
            t.setAttributes = function(e) {
                n(e),
                t.attributes = e
            }
            ,
            t.sign = function(e, r) {
                t.md = r || l.md.sha1.create();
                var a = f[t.md.algorithm + "WithRSAEncryption"];
                if (!a) {
                    var i = new Error("Could not compute certification request digest. Unknown message digest algorithm OID.");
                    throw i.algorithm = t.md.algorithm,
                    i
                }
                t.signatureOid = t.siginfo.algorithmOid = a,
                t.certificationRequestInfo = p.getCertificationRequestInfo(t);
                var n = h.toDer(t.certificationRequestInfo);
                t.md.update(n.getBytes()),
                t.signature = e.sign(t.md)
            }
            ,
            t.verify = function() {
                var e = !1
                  , r = t.md;
                if (null === r) {
                    if (t.signatureOid in f) {
                        switch (f[t.signatureOid]) {
                        case "sha1WithRSAEncryption":
                            r = l.md.sha1.create();
                            break;
                        case "md5WithRSAEncryption":
                            r = l.md.md5.create();
                            break;
                        case "sha256WithRSAEncryption":
                            r = l.md.sha256.create();
                            break;
                        case "sha384WithRSAEncryption":
                            r = l.md.sha384.create();
                            break;
                        case "sha512WithRSAEncryption":
                            r = l.md.sha512.create();
                            break;
                        case "RSASSA-PSS":
                            r = l.md.sha256.create()
                        }
                    }
                    if (null === r) {
                        var a = new Error("Could not compute certification request digest. Unknown signature OID.");
                        throw a.signatureOid = t.signatureOid,
                        a
                    }
                    var i = t.certificationRequestInfo || p.getCertificationRequestInfo(t)
                      , n = h.toDer(i);
                    r.update(n.getBytes())
                }
                if (null !== r) {
                    var s;
                    switch (t.signatureOid) {
                    case f.sha1WithRSAEncryption:
                        break;
                    case f["RSASSA-PSS"]:
                        var o, u;
                        if (void 0 === (o = f[t.signatureParameters.mgf.hash.algorithmOid]) || void 0 === l.md[o]) {
                            var a = new Error("Unsupported MGF hash function.");
                            throw a.oid = t.signatureParameters.mgf.hash.algorithmOid,
                            a.name = o,
                            a
                        }
                        if (void 0 === (u = f[t.signatureParameters.mgf.algorithmOid]) || void 0 === l.mgf[u]) {
                            var a = new Error("Unsupported MGF function.");
                            throw a.oid = t.signatureParameters.mgf.algorithmOid,
                            a.name = u,
                            a
                        }
                        if (u = l.mgf[u].create(l.md[o].create()),
                        void 0 === (o = f[t.signatureParameters.hash.algorithmOid]) || void 0 === l.md[o]) {
                            var a = new Error("Unsupported RSASSA-PSS hash function.");
                            throw a.oid = t.signatureParameters.hash.algorithmOid,
                            a.name = o,
                            a
                        }
                        s = l.pss.create(l.md[o].create(), u, t.signatureParameters.saltLength)
                    }
                    e = t.publicKey.verify(r.digest().getBytes(), t.signature, s)
                }
                return e
            }
            ,
            t
        }
        ;
        var S = new Date("1950-01-01T00:00:00Z")
          , T = new Date("2050-01-01T00:00:00Z");
        p.getTBSCertificate = function(t) {
            var e = c(t.validity.notBefore)
              , r = c(t.validity.notAfter)
              , a = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.CONTEXT_SPECIFIC, 0, !0, [h.create(h.Class.UNIVERSAL, h.Type.INTEGER, !1, h.integerToDer(t.version).getBytes())]), h.create(h.Class.UNIVERSAL, h.Type.INTEGER, !1, l.util.hexToBytes(t.serialNumber)), h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(t.siginfo.algorithmOid).getBytes()), o(t.siginfo.algorithmOid, t.siginfo.parameters)]), i(t.issuer), h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [e, r]), i(t.subject), p.publicKeyToAsn1(t.publicKey)]);
            return t.issuer.uniqueId && a.value.push(h.create(h.Class.CONTEXT_SPECIFIC, 1, !0, [h.create(h.Class.UNIVERSAL, h.Type.BITSTRING, !1, String.fromCharCode(0) + t.issuer.uniqueId)])),
            t.subject.uniqueId && a.value.push(h.create(h.Class.CONTEXT_SPECIFIC, 2, !0, [h.create(h.Class.UNIVERSAL, h.Type.BITSTRING, !1, String.fromCharCode(0) + t.subject.uniqueId)])),
            t.extensions.length > 0 && a.value.push(p.certificateExtensionsToAsn1(t.extensions)),
            a
        }
        ,
        p.getCertificationRequestInfo = function(t) {
            return h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.INTEGER, !1, h.integerToDer(t.version).getBytes()), i(t.subject), p.publicKeyToAsn1(t.publicKey), u(t)])
        }
        ,
        p.distinguishedNameToAsn1 = function(t) {
            return i(t)
        }
        ,
        p.certificateToAsn1 = function(t) {
            var e = t.tbsCertificate || p.getTBSCertificate(t);
            return h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [e, h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(t.signatureOid).getBytes()), o(t.signatureOid, t.signatureParameters)]), h.create(h.Class.UNIVERSAL, h.Type.BITSTRING, !1, String.fromCharCode(0) + t.signature)])
        }
        ,
        p.certificateExtensionsToAsn1 = function(t) {
            var e = h.create(h.Class.CONTEXT_SPECIFIC, 3, !0, [])
              , r = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []);
            e.value.push(r);
            for (var a = 0; a < t.length; ++a)
                r.value.push(p.certificateExtensionToAsn1(t[a]));
            return e
        }
        ,
        p.certificateExtensionToAsn1 = function(t) {
            var e = h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, []);
            e.value.push(h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(t.id).getBytes())),
            t.critical && e.value.push(h.create(h.Class.UNIVERSAL, h.Type.BOOLEAN, !1, String.fromCharCode(255)));
            var r = t.value;
            return "string" != typeof t.value && (r = h.toDer(r).getBytes()),
            e.value.push(h.create(h.Class.UNIVERSAL, h.Type.OCTETSTRING, !1, r)),
            e
        }
        ,
        p.certificationRequestToAsn1 = function(t) {
            var e = t.certificationRequestInfo || p.getCertificationRequestInfo(t);
            return h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [e, h.create(h.Class.UNIVERSAL, h.Type.SEQUENCE, !0, [h.create(h.Class.UNIVERSAL, h.Type.OID, !1, h.oidToDer(t.signatureOid).getBytes()), o(t.signatureOid, t.signatureParameters)]), h.create(h.Class.UNIVERSAL, h.Type.BITSTRING, !1, String.fromCharCode(0) + t.signature)])
        }
        ,
        p.createCaStore = function(t) {
            function e(t) {
                return r(t),
                a.certs[t.hash] || null
            }
            function r(t) {
                if (!t.hash) {
                    var e = l.md.sha1.create();
                    t.attributes = p.RDNAttributesAsArray(i(t), e),
                    t.hash = e.digest().toHex()
                }
            }
            var a = {
                certs: {}
            };
            if (a.getIssuer = function(t) {
                return e(t.issuer)
            }
            ,
            a.addCertificate = function(t) {
                if ("string" == typeof t && (t = l.pki.certificateFromPem(t)),
                r(t.subject),
                !a.hasCertificate(t))
                    if (t.subject.hash in a.certs) {
                        var e = a.certs[t.subject.hash];
                        l.util.isArray(e) || (e = [e]),
                        e.push(t),
                        a.certs[t.subject.hash] = e
                    } else
                        a.certs[t.subject.hash] = t
            }
            ,
            a.hasCertificate = function(t) {
                "string" == typeof t && (t = l.pki.certificateFromPem(t));
                var r = e(t.subject);
                if (!r)
                    return !1;
                l.util.isArray(r) || (r = [r]);
                for (var a = h.toDer(p.certificateToAsn1(t)).getBytes(), i = 0; i < r.length; ++i) {
                    if (a === h.toDer(p.certificateToAsn1(r[i])).getBytes())
                        return !0
                }
                return !1
            }
            ,
            a.listAllCertificates = function() {
                var t = [];
                for (var e in a.certs)
                    if (a.certs.hasOwnProperty(e)) {
                        var r = a.certs[e];
                        if (l.util.isArray(r))
                            for (var i = 0; i < r.length; ++i)
                                t.push(r[i]);
                        else
                            t.push(r)
                    }
                return t
            }
            ,
            a.removeCertificate = function(t) {
                var i;
                if ("string" == typeof t && (t = l.pki.certificateFromPem(t)),
                r(t.subject),
                !a.hasCertificate(t))
                    return null;
                var n = e(t.subject);
                if (!l.util.isArray(n))
                    return i = a.certs[t.subject.hash],
                    delete a.certs[t.subject.hash],
                    i;
                for (var s = h.toDer(p.certificateToAsn1(t)).getBytes(), o = 0; o < n.length; ++o) {
                    s === h.toDer(p.certificateToAsn1(n[o])).getBytes() && (i = n[o],
                    n.splice(o, 1))
                }
                return 0 === n.length && delete a.certs[t.subject.hash],
                i
            }
            ,
            t)
                for (var n = 0; n < t.length; ++n) {
                    var s = t[n];
                    a.addCertificate(s)
                }
            return a
        }
        ,
        p.certificateError = {
            bad_certificate: "forge.pki.BadCertificate",
            unsupported_certificate: "forge.pki.UnsupportedCertificate",
            certificate_revoked: "forge.pki.CertificateRevoked",
            certificate_expired: "forge.pki.CertificateExpired",
            certificate_unknown: "forge.pki.CertificateUnknown",
            unknown_ca: "forge.pki.UnknownCertificateAuthority"
        },
        p.verifyCertificateChain = function(t, e, r) {
            "function" == typeof r && (r = {
                verify: r
            }),
            r = r || {},
            e = e.slice(0);
            var a = e.slice(0)
              , i = r.validityCheckDate;
            void 0 === i && (i = new Date);
            var n = !0
              , s = null
              , o = 0;
            do {
                var u = e.shift()
                  , c = null
                  , h = !1;
                if (i && (i < u.validity.notBefore || i > u.validity.notAfter) && (s = {
                    message: "Certificate is not valid yet or has expired.",
                    error: p.certificateError.certificate_expired,
                    notBefore: u.validity.notBefore,
                    notAfter: u.validity.notAfter,
                    now: i
                }),
                null === s) {
                    if (c = e[0] || t.getIssuer(u),
                    null === c && u.isIssuer(u) && (h = !0,
                    c = u),
                    c) {
                        var f = c;
                        l.util.isArray(f) || (f = [f]);
                        for (var d = !1; !d && f.length > 0; ) {
                            c = f.shift();
                            try {
                                d = c.verify(u)
                            } catch (t) {}
                        }
                        d || (s = {
                            message: "Certificate signature is invalid.",
                            error: p.certificateError.bad_certificate
                        })
                    }
                    null !== s || c && !h || t.hasCertificate(u) || (s = {
                        message: "Certificate is not trusted.",
                        error: p.certificateError.unknown_ca
                    })
                }
                if (null === s && c && !u.isIssuer(c) && (s = {
                    message: "Certificate issuer is invalid.",
                    error: p.certificateError.bad_certificate
                }),
                null === s)
                    for (var y = {
                        keyUsage: !0,
                        basicConstraints: !0
                    }, g = 0; null === s && g < u.extensions.length; ++g) {
                        var m = u.extensions[g];
                        !m.critical || m.name in y || (s = {
                            message: "Certificate has an unsupported critical extension.",
                            error: p.certificateError.unsupported_certificate
                        })
                    }
                if (null === s && (!n || 0 === e.length && (!c || h))) {
                    var v = u.getExtension("basicConstraints")
                      , C = u.getExtension("keyUsage");
                    if (null !== C && (C.keyCertSign && null !== v || (s = {
                        message: "Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",
                        error: p.certificateError.bad_certificate
                    })),
                    null !== s || null === v || v.cA || (s = {
                        message: "Certificate basicConstraints indicates the certificate is not a CA.",
                        error: p.certificateError.bad_certificate
                    }),
                    null === s && null !== C && "pathLenConstraint"in v) {
                        o - 1 > v.pathLenConstraint && (s = {
                            message: "Certificate basicConstraints pathLenConstraint violated.",
                            error: p.certificateError.bad_certificate
                        })
                    }
                }
                var E = null === s || s.error
                  , S = r.verify ? r.verify(E, o, a) : E;
                if (!0 !== S)
                    throw !0 === E && (s = {
                        message: "The application rejected the certificate.",
                        error: p.certificateError.bad_certificate
                    }),
                    (S || 0 === S) && ("object" != typeof S || l.util.isArray(S) ? "string" == typeof S && (s.error = S) : (S.message && (s.message = S.message),
                    S.error && (s.error = S.error))),
                    s;
                s = null,
                n = !1,
                ++o
            } while (e.length > 0);
            return !0
        }
    }
    , function(t, e, r) {
        var a = r(0);
        r(4),
        r(1),
        (t.exports = a.pss = a.pss || {}).create = function(t) {
            3 === arguments.length && (t = {
                md: arguments[0],
                mgf: arguments[1],
                saltLength: arguments[2]
            });
            var e = t.md
              , r = t.mgf
              , i = e.digestLength
              , n = t.salt || null;
            "string" == typeof n && (n = a.util.createBuffer(n));
            var s;
            if ("saltLength"in t)
                s = t.saltLength;
            else {
                if (null === n)
                    throw new Error("Salt length not specified or specific salt not given.");
                s = n.length()
            }
            if (null !== n && n.length() !== s)
                throw new Error("Given salt length does not match length of given salt.");
            var o = t.prng || a.random
              , u = {};
            return u.encode = function(t, u) {
                var c, l = u - 1, h = Math.ceil(l / 8), p = t.digest().getBytes();
                if (h < i + s + 2)
                    throw new Error("Message is too long to encrypt.");
                var f;
                f = null === n ? o.getBytesSync(s) : n.bytes();
                var d = new a.util.ByteBuffer;
                d.fillWithByte(0, 8),
                d.putBytes(p),
                d.putBytes(f),
                e.start(),
                e.update(d.getBytes());
                var y = e.digest().getBytes()
                  , g = new a.util.ByteBuffer;
                g.fillWithByte(0, h - s - i - 2),
                g.putByte(1),
                g.putBytes(f);
                var m = g.getBytes()
                  , v = h - i - 1
                  , C = r.generate(y, v)
                  , E = "";
                for (c = 0; c < v; c++)
                    E += String.fromCharCode(m.charCodeAt(c) ^ C.charCodeAt(c));
                var S = 65280 >> 8 * h - l & 255;
                return (E = String.fromCharCode(E.charCodeAt(0) & ~S) + E.substr(1)) + y + String.fromCharCode(188)
            }
            ,
            u.verify = function(t, n, o) {
                var u, c = o - 1, l = Math.ceil(c / 8);
                if (n = n.substr(-l),
                l < i + s + 2)
                    throw new Error("Inconsistent parameters to PSS signature verification.");
                if (188 !== n.charCodeAt(l - 1))
                    throw new Error("Encoded message does not end in 0xBC.");
                var h = l - i - 1
                  , p = n.substr(0, h)
                  , f = n.substr(h, i)
                  , d = 65280 >> 8 * l - c & 255;
                if (0 != (p.charCodeAt(0) & d))
                    throw new Error("Bits beyond keysize not zero as expected.");
                var y = r.generate(f, h)
                  , g = "";
                for (u = 0; u < h; u++)
                    g += String.fromCharCode(p.charCodeAt(u) ^ y.charCodeAt(u));
                g = String.fromCharCode(g.charCodeAt(0) & ~d) + g.substr(1);
                var m = l - i - s - 2;
                for (u = 0; u < m; u++)
                    if (0 !== g.charCodeAt(u))
                        throw new Error("Leftmost octets not zero as expected");
                if (1 !== g.charCodeAt(m))
                    throw new Error("Inconsistent PSS signature, 0x01 marker not found");
                var v = g.substr(-s)
                  , C = new a.util.ByteBuffer;
                return C.fillWithByte(0, 8),
                C.putBytes(t),
                C.putBytes(v),
                e.start(),
                e.update(C.getBytes()),
                f === e.digest().getBytes()
            }
            ,
            u
        }
    }
    , function(t, e, r) {
        t.exports = r(23)
    }
    , function(t, e, r) {
        t.exports = r(0),
        r(1),
        r(26),
        r(8),
        r(14),
        r(9),
        r(10),
        r(7),
        r(3),
        r(11),
        r(15),
        r(4),
        r(6),
        r(29)
    }
    , function(t, e) {
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || Function("return this")() || (0,
            eval)("this")
        } catch (t) {
            "object" == typeof window && (r = window)
        }
        t.exports = r
    }
    , function(t, e) {
        function r(t, e) {
            var r = 0
              , a = e.length
              , i = e.charAt(0)
              , n = [0];
            for (r = 0; r < t.length(); ++r) {
                for (var s = 0, o = t.at(r); s < n.length; ++s)
                    o += n[s] << 8,
                    n[s] = o % a,
                    o = o / a | 0;
                for (; o > 0; )
                    n.push(o % a),
                    o = o / a | 0
            }
            var u = "";
            for (r = 0; 0 === t.at(r) && r < t.length() - 1; ++r)
                u += i;
            for (r = n.length - 1; r >= 0; --r)
                u += e[n[r]];
            return u
        }
        var a = {};
        t.exports = a;
        var i = {};
        a.encode = function(t, e, a) {
            if ("string" != typeof e)
                throw new TypeError('"alphabet" must be a string.');
            if (void 0 !== a && "number" != typeof a)
                throw new TypeError('"maxline" must be a number.');
            var i = "";
            if (t instanceof Uint8Array) {
                var n = 0
                  , s = e.length
                  , o = e.charAt(0)
                  , u = [0];
                for (n = 0; n < t.length; ++n) {
                    for (var c = 0, l = t[n]; c < u.length; ++c)
                        l += u[c] << 8,
                        u[c] = l % s,
                        l = l / s | 0;
                    for (; l > 0; )
                        u.push(l % s),
                        l = l / s | 0
                }
                for (n = 0; 0 === t[n] && n < t.length - 1; ++n)
                    i += o;
                for (n = u.length - 1; n >= 0; --n)
                    i += e[u[n]]
            } else
                i = r(t, e);
            if (a) {
                var h = new RegExp(".{1," + a + "}","g");
                i = i.match(h).join("\r\n")
            }
            return i
        }
        ,
        a.decode = function(t, e) {
            if ("string" != typeof t)
                throw new TypeError('"input" must be a string.');
            if ("string" != typeof e)
                throw new TypeError('"alphabet" must be a string.');
            var r = i[e];
            if (!r) {
                r = i[e] = [];
                for (var a = 0; a < e.length; ++a)
                    r[e.charCodeAt(a)] = a
            }
            t = t.replace(/\s/g, "");
            for (var n = e.length, s = e.charAt(0), o = [0], a = 0; a < t.length; a++) {
                var u = r[t.charCodeAt(a)];
                if (void 0 === u)
                    return;
                for (var c = 0, l = u; c < o.length; ++c)
                    l += o[c] * n,
                    o[c] = 255 & l,
                    l >>= 8;
                for (; l > 0; )
                    o.push(255 & l),
                    l >>= 8
            }
            for (var h = 0; t[h] === s && h < t.length - 1; ++h)
                o.push(0);
            return "undefined" != typeof Buffer ? Buffer.from(o.reverse()) : new Uint8Array(o.reverse())
        }
    }
    , function(t, e, r) {
        function a() {
            o = String.fromCharCode(128),
            o += n.util.fillString(String.fromCharCode(0), 64),
            u = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2, 0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9],
            c = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21],
            l = new Array(64);
            for (var t = 0; t < 64; ++t)
                l[t] = Math.floor(4294967296 * Math.abs(Math.sin(t + 1)));
            h = !0
        }
        function i(t, e, r) {
            for (var a, i, n, s, o, h, p, f, d = r.length(); d >= 64; ) {
                for (i = t.h0,
                n = t.h1,
                s = t.h2,
                o = t.h3,
                f = 0; f < 16; ++f)
                    e[f] = r.getInt32Le(),
                    h = o ^ n & (s ^ o),
                    a = i + h + l[f] + e[f],
                    p = c[f],
                    i = o,
                    o = s,
                    s = n,
                    n += a << p | a >>> 32 - p;
                for (; f < 32; ++f)
                    h = s ^ o & (n ^ s),
                    a = i + h + l[f] + e[u[f]],
                    p = c[f],
                    i = o,
                    o = s,
                    s = n,
                    n += a << p | a >>> 32 - p;
                for (; f < 48; ++f)
                    h = n ^ s ^ o,
                    a = i + h + l[f] + e[u[f]],
                    p = c[f],
                    i = o,
                    o = s,
                    s = n,
                    n += a << p | a >>> 32 - p;
                for (; f < 64; ++f)
                    h = s ^ (n | ~o),
                    a = i + h + l[f] + e[u[f]],
                    p = c[f],
                    i = o,
                    o = s,
                    s = n,
                    n += a << p | a >>> 32 - p;
                t.h0 = t.h0 + i | 0,
                t.h1 = t.h1 + n | 0,
                t.h2 = t.h2 + s | 0,
                t.h3 = t.h3 + o | 0,
                d -= 64
            }
        }
        var n = r(0);
        r(2),
        r(1);
        var s = t.exports = n.md5 = n.md5 || {};
        n.md.md5 = n.md.algorithms.md5 = s,
        s.create = function() {
            h || a();
            var t = null
              , e = n.util.createBuffer()
              , r = new Array(16)
              , s = {
                algorithm: "md5",
                blockLength: 64,
                digestLength: 16,
                messageLength: 0,
                fullMessageLength: null,
                messageLengthSize: 8
            };
            return s.start = function() {
                s.messageLength = 0,
                s.fullMessageLength = s.messageLength64 = [];
                for (var r = s.messageLengthSize / 4, a = 0; a < r; ++a)
                    s.fullMessageLength.push(0);
                return e = n.util.createBuffer(),
                t = {
                    h0: 1732584193,
                    h1: 4023233417,
                    h2: 2562383102,
                    h3: 271733878
                },
                s
            }
            ,
            s.start(),
            s.update = function(a, o) {
                "utf8" === o && (a = n.util.encodeUtf8(a));
                var u = a.length;
                s.messageLength += u,
                u = [u / 4294967296 >>> 0, u >>> 0];
                for (var c = s.fullMessageLength.length - 1; c >= 0; --c)
                    s.fullMessageLength[c] += u[1],
                    u[1] = u[0] + (s.fullMessageLength[c] / 4294967296 >>> 0),
                    s.fullMessageLength[c] = s.fullMessageLength[c] >>> 0,
                    u[0] = u[1] / 4294967296 >>> 0;
                return e.putBytes(a),
                i(t, r, e),
                (e.read > 2048 || 0 === e.length()) && e.compact(),
                s
            }
            ,
            s.digest = function() {
                var a = n.util.createBuffer();
                a.putBytes(e.bytes());
                var u = s.fullMessageLength[s.fullMessageLength.length - 1] + s.messageLengthSize
                  , c = u & s.blockLength - 1;
                a.putBytes(o.substr(0, s.blockLength - c));
                for (var l, h = 0, p = s.fullMessageLength.length - 1; p >= 0; --p)
                    l = 8 * s.fullMessageLength[p] + h,
                    h = l / 4294967296 >>> 0,
                    a.putInt32Le(l >>> 0);
                var f = {
                    h0: t.h0,
                    h1: t.h1,
                    h2: t.h2,
                    h3: t.h3
                };
                i(f, r, a);
                var d = n.util.createBuffer();
                return d.putInt32Le(f.h0),
                d.putInt32Le(f.h1),
                d.putInt32Le(f.h2),
                d.putInt32Le(f.h3),
                d
            }
            ,
            s
        }
        ;
        var o = null
          , u = null
          , c = null
          , l = null
          , h = !1
    }
    , function(t, e, r) {
        function a(t, e, r) {
            r || (r = i.md.sha1.create());
            for (var a = "", n = Math.ceil(e / r.digestLength), s = 0; s < n; ++s) {
                var o = String.fromCharCode(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s);
                r.start(),
                r.update(t + o),
                a += r.digest().getBytes()
            }
            return a.substring(0, e)
        }
        var i = r(0);
        r(1),
        r(4),
        r(8);
        var n = t.exports = i.pkcs1 = i.pkcs1 || {};
        n.encode_rsa_oaep = function(t, e, r) {
            var n, s, o, u;
            "string" == typeof r ? (n = r,
            s = arguments[3] || void 0,
            o = arguments[4] || void 0) : r && (n = r.label || void 0,
            s = r.seed || void 0,
            o = r.md || void 0,
            r.mgf1 && r.mgf1.md && (u = r.mgf1.md)),
            o ? o.start() : o = i.md.sha1.create(),
            u || (u = o);
            var c = Math.ceil(t.n.bitLength() / 8)
              , l = c - 2 * o.digestLength - 2;
            if (e.length > l) {
                var h = new Error("RSAES-OAEP input message length is too long.");
                throw h.length = e.length,
                h.maxLength = l,
                h
            }
            n || (n = ""),
            o.update(n, "raw");
            for (var p = o.digest(), f = "", d = l - e.length, y = 0; y < d; y++)
                f += "\0";
            var g = p.getBytes() + f + "" + e;
            if (s) {
                if (s.length !== o.digestLength) {
                    var h = new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.");
                    throw h.seedLength = s.length,
                    h.digestLength = o.digestLength,
                    h
                }
            } else
                s = i.random.getBytes(o.digestLength);
            var m = a(s, c - o.digestLength - 1, u)
              , v = i.util.xorBytes(g, m, g.length)
              , C = a(v, o.digestLength, u);
            return "\0" + i.util.xorBytes(s, C, s.length) + v
        }
        ,
        n.decode_rsa_oaep = function(t, e, r) {
            var n, s, o;
            "string" == typeof r ? (n = r,
            s = arguments[3] || void 0) : r && (n = r.label || void 0,
            s = r.md || void 0,
            r.mgf1 && r.mgf1.md && (o = r.mgf1.md));
            var u = Math.ceil(t.n.bitLength() / 8);
            if (e.length !== u) {
                var c = new Error("RSAES-OAEP encoded message length is invalid.");
                throw c.length = e.length,
                c.expectedLength = u,
                c
            }
            if (void 0 === s ? s = i.md.sha1.create() : s.start(),
            o || (o = s),
            u < 2 * s.digestLength + 2)
                throw new Error("RSAES-OAEP key is too short for the hash function.");
            n || (n = ""),
            s.update(n, "raw");
            for (var l = s.digest().getBytes(), h = e.charAt(0), p = e.substring(1, s.digestLength + 1), f = e.substring(1 + s.digestLength), d = a(f, s.digestLength, o), y = i.util.xorBytes(p, d, p.length), g = a(y, u - s.digestLength - 1, o), m = i.util.xorBytes(f, g, f.length), v = m.substring(0, s.digestLength), c = "\0" !== h, C = 0; C < s.digestLength; ++C)
                c |= l.charAt(C) !== v.charAt(C);
            for (var E = 1, S = s.digestLength, T = s.digestLength; T < m.length; T++) {
                var I = m.charCodeAt(T)
                  , b = 1 & I ^ 1;
                c |= I & (E ? 65534 : 0),
                E &= b,
                S += E
            }
            if (c || 1 !== m.charCodeAt(S))
                throw new Error("Invalid RSAES-OAEP padding.");
            return m.substring(S + 1)
        }
    }
    , function(t, e, r) {
        var a = r(0);
        r(1),
        r(11),
        r(4),
        function() {
            function e(t, e, a, i) {
                return "workers"in a ? n(t, e, a, i) : r(t, e, a, i)
            }
            function r(t, e, r, a) {
                var n = s(t, e)
                  , u = o(n.bitLength());
                "millerRabinTests"in r && (u = r.millerRabinTests);
                var c = 10;
                "maxBlockTime"in r && (c = r.maxBlockTime),
                i(n, t, e, 0, u, c, a)
            }
            function i(t, e, r, n, o, u, c) {
                var h = +new Date;
                do {
                    if (t.bitLength() > e && (t = s(e, r)),
                    t.isProbablePrime(o))
                        return c(null, t);
                    t.dAddOffset(l[n++ % 8], 0)
                } while (u < 0 || +new Date - h < u);
                a.util.setImmediate(function() {
                    i(t, e, r, n, o, u, c)
                })
            }
            function n(t, e, i, n) {
                function o() {
                    function r(r) {
                        if (!d) {
                            --o;
                            var i = r.data;
                            if (i.found) {
                                for (var l = 0; l < a.length; ++l)
                                    a[l].terminate();
                                return d = !0,
                                n(null, new c(i.prime,16))
                            }
                            u.bitLength() > t && (u = s(t, e));
                            var f = u.toString(16);
                            r.target.postMessage({
                                hex: f,
                                workLoad: h
                            }),
                            u.dAddOffset(p, 0)
                        }
                    }
                    l = Math.max(1, l);
                    for (var a = [], i = 0; i < l; ++i)
                        a[i] = new Worker(f);
                    for (var o = l, i = 0; i < l; ++i)
                        a[i].addEventListener("message", r);
                    var d = !1
                }
                if ("undefined" == typeof Worker)
                    return r(t, e, i, n);
                var u = s(t, e)
                  , l = i.workers
                  , h = i.workLoad || 100
                  , p = 30 * h / 8
                  , f = i.workerScript || "forge/prime.worker.js";
                if (-1 === l)
                    return a.util.estimateCores(function(t, e) {
                        t && (e = 2),
                        l = e - 1,
                        o()
                    });
                o()
            }
            function s(t, e) {
                var r = new c(t,e)
                  , a = t - 1;
                return r.testBit(a) || r.bitwiseTo(c.ONE.shiftLeft(a), p, r),
                r.dAddOffset(31 - r.mod(h).byteValue(), 0),
                r
            }
            function o(t) {
                return t <= 100 ? 27 : t <= 150 ? 18 : t <= 200 ? 15 : t <= 250 ? 12 : t <= 300 ? 9 : t <= 350 ? 8 : t <= 400 ? 7 : t <= 500 ? 6 : t <= 600 ? 5 : t <= 800 ? 4 : t <= 1250 ? 3 : 2
            }
            if (a.prime)
                return void (t.exports = a.prime);
            var u = t.exports = a.prime = a.prime || {}
              , c = a.jsbn.BigInteger
              , l = [6, 4, 2, 4, 2, 4, 6, 2]
              , h = new c(null);
            h.fromInt(30);
            var p = function(t, e) {
                return t | e
            };
            u.generateProbablePrime = function(t, r, i) {
                "function" == typeof r && (i = r,
                r = {}),
                r = r || {};
                var n = r.algorithm || "PRIMEINC";
                "string" == typeof n && (n = {
                    name: n
                }),
                n.options = n.options || {};
                var s = r.prng || a.random
                  , o = {
                    nextBytes: function(t) {
                        for (var e = s.getBytesSync(t.length), r = 0; r < t.length; ++r)
                            t[r] = e.charCodeAt(r)
                    }
                };
                if ("PRIMEINC" === n.name)
                    return e(t, o, n.options, i);
                throw new Error("Invalid prime generation algorithm: " + n.name)
            }
        }()
    }
    , function(t, e, r) {
        var a = r(0);
        r(3),
        r(5),
        r(16),
        r(13),
        r(18),
        r(31),
        r(21),
        r(6),
        r(1),
        r(20);
        var i = a.asn1
          , n = t.exports = a.pki = a.pki || {};
        n.pemToDer = function(t) {
            var e = a.pem.decode(t)[0];
            if (e.procType && "ENCRYPTED" === e.procType.type)
                throw new Error("Could not convert PEM to DER; PEM is encrypted.");
            return a.util.createBuffer(e.body)
        }
        ,
        n.privateKeyFromPem = function(t) {
            var e = a.pem.decode(t)[0];
            if ("PRIVATE KEY" !== e.type && "RSA PRIVATE KEY" !== e.type) {
                var r = new Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');
                throw r.headerType = e.type,
                r
            }
            if (e.procType && "ENCRYPTED" === e.procType.type)
                throw new Error("Could not convert private key from PEM; PEM is encrypted.");
            var s = i.fromDer(e.body);
            return n.privateKeyFromAsn1(s)
        }
        ,
        n.privateKeyToPem = function(t, e) {
            var r = {
                type: "RSA PRIVATE KEY",
                body: i.toDer(n.privateKeyToAsn1(t)).getBytes()
            };
            return a.pem.encode(r, {
                maxline: e
            })
        }
        ,
        n.privateKeyInfoToPem = function(t, e) {
            var r = {
                type: "PRIVATE KEY",
                body: i.toDer(t).getBytes()
            };
            return a.pem.encode(r, {
                maxline: e
            })
        }
    }
    , function(t, e, r) {
        var a = r(0);
        r(1);
        var i = [217, 120, 249, 196, 25, 221, 181, 237, 40, 233, 253, 121, 74, 160, 216, 157, 198, 126, 55, 131, 43, 118, 83, 142, 98, 76, 100, 136, 68, 139, 251, 162, 23, 154, 89, 245, 135, 179, 79, 19, 97, 69, 109, 141, 9, 129, 125, 50, 189, 143, 64, 235, 134, 183, 123, 11, 240, 149, 33, 34, 92, 107, 78, 130, 84, 214, 101, 147, 206, 96, 178, 28, 115, 86, 192, 20, 167, 140, 241, 220, 18, 117, 202, 31, 59, 190, 228, 209, 66, 61, 212, 48, 163, 60, 182, 38, 111, 191, 14, 218, 70, 105, 7, 87, 39, 242, 29, 155, 188, 148, 67, 3, 248, 17, 199, 246, 144, 239, 62, 231, 6, 195, 213, 47, 200, 102, 30, 215, 8, 232, 234, 222, 128, 82, 238, 247, 132, 170, 114, 172, 53, 77, 106, 42, 150, 26, 210, 113, 90, 21, 73, 116, 75, 159, 208, 94, 4, 24, 164, 236, 194, 224, 65, 110, 15, 81, 203, 204, 36, 145, 175, 80, 161, 244, 112, 57, 153, 124, 58, 133, 35, 184, 180, 122, 252, 2, 54, 91, 37, 85, 151, 49, 45, 93, 250, 152, 227, 138, 146, 174, 5, 223, 41, 16, 103, 108, 186, 201, 211, 0, 230, 207, 225, 158, 168, 44, 99, 22, 1, 63, 88, 226, 137, 169, 13, 56, 52, 27, 171, 51, 255, 176, 187, 72, 12, 95, 185, 177, 205, 46, 197, 243, 219, 71, 229, 165, 156, 119, 10, 166, 32, 104, 254, 127, 193, 173]
          , n = [1, 2, 3, 5]
          , s = function(t, e) {
            return t << e & 65535 | (65535 & t) >> 16 - e
        }
          , o = function(t, e) {
            return (65535 & t) >> e | t << 16 - e & 65535
        };
        t.exports = a.rc2 = a.rc2 || {},
        a.rc2.expandKey = function(t, e) {
            "string" == typeof t && (t = a.util.createBuffer(t)),
            e = e || 128;
            var r, n = t, s = t.length(), o = e, u = Math.ceil(o / 8), c = 255 >> (7 & o);
            for (r = s; r < 128; r++)
                n.putByte(i[n.at(r - 1) + n.at(r - s) & 255]);
            for (n.setAt(128 - u, i[n.at(128 - u) & c]),
            r = 127 - u; r >= 0; r--)
                n.setAt(r, i[n.at(r + 1) ^ n.at(r + u)]);
            return n
        }
        ;
        var u = function(t, e, r) {
            var i, u, c, l, h = !1, p = null, f = null, d = null, y = [];
            for (t = a.rc2.expandKey(t, e),
            c = 0; c < 64; c++)
                y.push(t.getInt16Le());
            r ? (i = function(t) {
                for (c = 0; c < 4; c++)
                    t[c] += y[l] + (t[(c + 3) % 4] & t[(c + 2) % 4]) + (~t[(c + 3) % 4] & t[(c + 1) % 4]),
                    t[c] = s(t[c], n[c]),
                    l++
            }
            ,
            u = function(t) {
                for (c = 0; c < 4; c++)
                    t[c] += y[63 & t[(c + 3) % 4]]
            }
            ) : (i = function(t) {
                for (c = 3; c >= 0; c--)
                    t[c] = o(t[c], n[c]),
                    t[c] -= y[l] + (t[(c + 3) % 4] & t[(c + 2) % 4]) + (~t[(c + 3) % 4] & t[(c + 1) % 4]),
                    l--
            }
            ,
            u = function(t) {
                for (c = 3; c >= 0; c--)
                    t[c] -= y[63 & t[(c + 3) % 4]]
            }
            );
            var g = function(t) {
                var e = [];
                for (c = 0; c < 4; c++) {
                    var a = p.getInt16Le();
                    null !== d && (r ? a ^= d.getInt16Le() : d.putInt16Le(a)),
                    e.push(65535 & a)
                }
                l = r ? 0 : 63;
                for (var i = 0; i < t.length; i++)
                    for (var n = 0; n < t[i][0]; n++)
                        t[i][1](e);
                for (c = 0; c < 4; c++)
                    null !== d && (r ? d.putInt16Le(e[c]) : e[c] ^= d.getInt16Le()),
                    f.putInt16Le(e[c])
            }
              , m = null;
            return m = {
                start: function(t, e) {
                    t && "string" == typeof t && (t = a.util.createBuffer(t)),
                    h = !1,
                    p = a.util.createBuffer(),
                    f = e || new a.util.createBuffer,
                    d = t,
                    m.output = f
                },
                update: function(t) {
                    for (h || p.putBuffer(t); p.length() >= 8; )
                        g([[5, i], [1, u], [6, i], [1, u], [5, i]])
                },
                finish: function(t) {
                    var e = !0;
                    if (r)
                        if (t)
                            e = t(8, p, !r);
                        else {
                            var a = 8 === p.length() ? 8 : 8 - p.length();
                            p.fillWithByte(a, a)
                        }
                    if (e && (h = !0,
                    m.update()),
                    !r && (e = 0 === p.length()))
                        if (t)
                            e = t(8, f, !r);
                        else {
                            var i = f.length()
                              , n = f.at(i - 1);
                            n > i ? e = !1 : f.truncate(n)
                        }
                    return e
                }
            }
        };
        a.rc2.startEncrypting = function(t, e, r) {
            var i = a.rc2.createEncryptionCipher(t, 128);
            return i.start(e, r),
            i
        }
        ,
        a.rc2.createEncryptionCipher = function(t, e) {
            return u(t, e, !0)
        }
        ,
        a.rc2.startDecrypting = function(t, e, r) {
            var i = a.rc2.createDecryptionCipher(t, 128);
            return i.start(e, r),
            i
        }
        ,
        a.rc2.createDecryptionCipher = function(t, e) {
            return u(t, e, !1)
        }
    }
    , function(t, e, r) {
        function a(t, e, r, a) {
            for (var i = [], n = 0; n < t.length; n++)
                for (var s = 0; s < t[n].safeBags.length; s++) {
                    var o = t[n].safeBags[s];
                    void 0 !== a && o.type !== a || (null !== e ? void 0 !== o.attributes[e] && o.attributes[e].indexOf(r) >= 0 && i.push(o) : i.push(o))
                }
            return i
        }
        function i(t) {
            if (t.composed || t.constructed) {
                for (var e = c.util.createBuffer(), r = 0; r < t.value.length; ++r)
                    e.putBytes(t.value[r].value);
                t.composed = t.constructed = !1,
                t.value = e.getBytes()
            }
            return t
        }
        function n(t, e, r, a) {
            if (e = l.fromDer(e, r),
            e.tagClass !== l.Class.UNIVERSAL || e.type !== l.Type.SEQUENCE || !0 !== e.constructed)
                throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");
            for (var n = 0; n < e.value.length; n++) {
                var u = e.value[n]
                  , c = {}
                  , p = [];
                if (!l.validate(u, f, c, p)) {
                    var d = new Error("Cannot read ContentInfo.");
                    throw d.errors = p,
                    d
                }
                var y = {
                    encrypted: !1
                }
                  , g = null
                  , m = c.content.value[0];
                switch (l.derToOid(c.contentType)) {
                case h.oids.data:
                    if (m.tagClass !== l.Class.UNIVERSAL || m.type !== l.Type.OCTETSTRING)
                        throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");
                    g = i(m).value;
                    break;
                case h.oids.encryptedData:
                    g = s(m, a),
                    y.encrypted = !0;
                    break;
                default:
                    var d = new Error("Unsupported PKCS#12 contentType.");
                    throw d.contentType = l.derToOid(c.contentType),
                    d
                }
                y.safeBags = o(g, r, a),
                t.safeContents.push(y)
            }
        }
        function s(t, e) {
            var r = {}
              , a = [];
            if (!l.validate(t, c.pkcs7.asn1.encryptedDataValidator, r, a)) {
                var n = new Error("Cannot read EncryptedContentInfo.");
                throw n.errors = a,
                n
            }
            var s = l.derToOid(r.contentType);
            if (s !== h.oids.data) {
                var n = new Error("PKCS#12 EncryptedContentInfo ContentType is not Data.");
                throw n.oid = s,
                n
            }
            s = l.derToOid(r.encAlgorithm);
            var o = h.pbe.getCipher(s, r.encParameter, e)
              , u = i(r.encryptedContentAsn1)
              , p = c.util.createBuffer(u.value);
            if (o.update(p),
            !o.finish())
                throw new Error("Failed to decrypt PKCS#12 SafeContents.");
            return o.output.getBytes()
        }
        function o(t, e, r) {
            if (!e && 0 === t.length)
                return [];
            if (t = l.fromDer(t, e),
            t.tagClass !== l.Class.UNIVERSAL || t.type !== l.Type.SEQUENCE || !0 !== t.constructed)
                throw new Error("PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag.");
            for (var a = [], i = 0; i < t.value.length; i++) {
                var n = t.value[i]
                  , s = {}
                  , o = [];
                if (!l.validate(n, y, s, o)) {
                    var c = new Error("Cannot read SafeBag.");
                    throw c.errors = o,
                    c
                }
                var p = {
                    type: l.derToOid(s.bagId),
                    attributes: u(s.bagAttributes)
                };
                a.push(p);
                var f, d, g = s.bagValue.value[0];
                switch (p.type) {
                case h.oids.pkcs8ShroudedKeyBag:
                    if (null === (g = h.decryptPrivateKeyInfo(g, r)))
                        throw new Error("Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?");
                case h.oids.keyBag:
                    try {
                        p.key = h.privateKeyFromAsn1(g)
                    } catch (t) {
                        p.key = null,
                        p.asn1 = g
                    }
                    continue;
                case h.oids.certBag:
                    f = m,
                    d = function() {
                        if (l.derToOid(s.certId) !== h.oids.x509Certificate) {
                            var t = new Error("Unsupported certificate type, only X.509 supported.");
                            throw t.oid = l.derToOid(s.certId),
                            t
                        }
                        var r = l.fromDer(s.cert, e);
                        try {
                            p.cert = h.certificateFromAsn1(r, !0)
                        } catch (t) {
                            p.cert = null,
                            p.asn1 = r
                        }
                    }
                    ;
                    break;
                default:
                    var c = new Error("Unsupported PKCS#12 SafeBag type.");
                    throw c.oid = p.type,
                    c
                }
                if (void 0 !== f && !l.validate(g, f, s, o)) {
                    var c = new Error("Cannot read PKCS#12 " + f.name);
                    throw c.errors = o,
                    c
                }
                d()
            }
            return a
        }
        function u(t) {
            var e = {};
            if (void 0 !== t)
                for (var r = 0; r < t.length; ++r) {
                    var a = {}
                      , i = [];
                    if (!l.validate(t[r], g, a, i)) {
                        var n = new Error("Cannot read PKCS#12 BagAttribute.");
                        throw n.errors = i,
                        n
                    }
                    var s = l.derToOid(a.oid);
                    if (void 0 !== h.oids[s]) {
                        e[h.oids[s]] = [];
                        for (var o = 0; o < a.values.length; ++o)
                            e[h.oids[s]].push(a.values[o].value)
                    }
                }
            return e
        }
        var c = r(0);
        r(3),
        r(19),
        r(5),
        r(32),
        r(16),
        r(4),
        r(6),
        r(8),
        r(1),
        r(20);
        var l = c.asn1
          , h = c.pki
          , p = t.exports = c.pkcs12 = c.pkcs12 || {}
          , f = {
            name: "ContentInfo",
            tagClass: l.Class.UNIVERSAL,
            type: l.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "ContentInfo.contentType",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.OID,
                constructed: !1,
                capture: "contentType"
            }, {
                name: "ContentInfo.content",
                tagClass: l.Class.CONTEXT_SPECIFIC,
                constructed: !0,
                captureAsn1: "content"
            }]
        }
          , d = {
            name: "PFX",
            tagClass: l.Class.UNIVERSAL,
            type: l.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PFX.version",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, f, {
                name: "PFX.macData",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.SEQUENCE,
                constructed: !0,
                optional: !0,
                captureAsn1: "mac",
                value: [{
                    name: "PFX.macData.mac",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "PFX.macData.mac.digestAlgorithm",
                        tagClass: l.Class.UNIVERSAL,
                        type: l.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "PFX.macData.mac.digestAlgorithm.algorithm",
                            tagClass: l.Class.UNIVERSAL,
                            type: l.Type.OID,
                            constructed: !1,
                            capture: "macAlgorithm"
                        }, {
                            name: "PFX.macData.mac.digestAlgorithm.parameters",
                            tagClass: l.Class.UNIVERSAL,
                            captureAsn1: "macAlgorithmParameters"
                        }]
                    }, {
                        name: "PFX.macData.mac.digest",
                        tagClass: l.Class.UNIVERSAL,
                        type: l.Type.OCTETSTRING,
                        constructed: !1,
                        capture: "macDigest"
                    }]
                }, {
                    name: "PFX.macData.macSalt",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "macSalt"
                }, {
                    name: "PFX.macData.iterations",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.INTEGER,
                    constructed: !1,
                    optional: !0,
                    capture: "macIterations"
                }]
            }]
        }
          , y = {
            name: "SafeBag",
            tagClass: l.Class.UNIVERSAL,
            type: l.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SafeBag.bagId",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.OID,
                constructed: !1,
                capture: "bagId"
            }, {
                name: "SafeBag.bagValue",
                tagClass: l.Class.CONTEXT_SPECIFIC,
                constructed: !0,
                captureAsn1: "bagValue"
            }, {
                name: "SafeBag.bagAttributes",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.SET,
                constructed: !0,
                optional: !0,
                capture: "bagAttributes"
            }]
        }
          , g = {
            name: "Attribute",
            tagClass: l.Class.UNIVERSAL,
            type: l.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "Attribute.attrId",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.OID,
                constructed: !1,
                capture: "oid"
            }, {
                name: "Attribute.attrValues",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.SET,
                constructed: !0,
                capture: "values"
            }]
        }
          , m = {
            name: "CertBag",
            tagClass: l.Class.UNIVERSAL,
            type: l.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "CertBag.certId",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.OID,
                constructed: !1,
                capture: "certId"
            }, {
                name: "CertBag.certValue",
                tagClass: l.Class.CONTEXT_SPECIFIC,
                constructed: !0,
                value: [{
                    name: "CertBag.certValue[0]",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Class.OCTETSTRING,
                    constructed: !1,
                    capture: "cert"
                }]
            }]
        };
        p.pkcs12FromAsn1 = function(t, e, r) {
            "string" == typeof e ? (r = e,
            e = !0) : void 0 === e && (e = !0);
            var s = {}
              , o = [];
            if (!l.validate(t, d, s, o)) {
                var u = new Error("Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.");
                throw u.errors = u,
                u
            }
            var f = {
                version: s.version.charCodeAt(0),
                safeContents: [],
                getBags: function(t) {
                    var e, r = {};
                    return "localKeyId"in t ? e = t.localKeyId : "localKeyIdHex"in t && (e = c.util.hexToBytes(t.localKeyIdHex)),
                    void 0 === e && !("friendlyName"in t) && "bagType"in t && (r[t.bagType] = a(f.safeContents, null, null, t.bagType)),
                    void 0 !== e && (r.localKeyId = a(f.safeContents, "localKeyId", e, t.bagType)),
                    "friendlyName"in t && (r.friendlyName = a(f.safeContents, "friendlyName", t.friendlyName, t.bagType)),
                    r
                },
                getBagsByFriendlyName: function(t, e) {
                    return a(f.safeContents, "friendlyName", t, e)
                },
                getBagsByLocalKeyId: function(t, e) {
                    return a(f.safeContents, "localKeyId", t, e)
                }
            };
            if (3 !== s.version.charCodeAt(0)) {
                var u = new Error("PKCS#12 PFX of version other than 3 not supported.");
                throw u.version = s.version.charCodeAt(0),
                u
            }
            if (l.derToOid(s.contentType) !== h.oids.data) {
                var u = new Error("Only PKCS#12 PFX in password integrity mode supported.");
                throw u.oid = l.derToOid(s.contentType),
                u
            }
            var y = s.content.value[0];
            if (y.tagClass !== l.Class.UNIVERSAL || y.type !== l.Type.OCTETSTRING)
                throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");
            if (y = i(y),
            s.mac) {
                var g = null
                  , m = 0
                  , v = l.derToOid(s.macAlgorithm);
                switch (v) {
                case h.oids.sha1:
                    g = c.md.sha1.create(),
                    m = 20;
                    break;
                case h.oids.sha256:
                    g = c.md.sha256.create(),
                    m = 32;
                    break;
                case h.oids.sha384:
                    g = c.md.sha384.create(),
                    m = 48;
                    break;
                case h.oids.sha512:
                    g = c.md.sha512.create(),
                    m = 64;
                    break;
                case h.oids.md5:
                    g = c.md.md5.create(),
                    m = 16
                }
                if (null === g)
                    throw new Error("PKCS#12 uses unsupported MAC algorithm: " + v);
                var C = new c.util.ByteBuffer(s.macSalt)
                  , E = "macIterations"in s ? parseInt(c.util.bytesToHex(s.macIterations), 16) : 1
                  , S = p.generateKey(r, C, 3, E, m, g)
                  , T = c.hmac.create();
                T.start(g, S),
                T.update(y.value);
                if (T.getMac().getBytes() !== s.macDigest)
                    throw new Error("PKCS#12 MAC could not be verified. Invalid password?")
            }
            return n(f, y.value, e, r),
            f
        }
        ,
        p.toPkcs12Asn1 = function(t, e, r, a) {
            a = a || {},
            a.saltSize = a.saltSize || 8,
            a.count = a.count || 2048,
            a.algorithm = a.algorithm || a.encAlgorithm || "aes128",
            "useMac"in a || (a.useMac = !0),
            "localKeyId"in a || (a.localKeyId = null),
            "generateLocalKeyId"in a || (a.generateLocalKeyId = !0);
            var i, n = a.localKeyId;
            if (null !== n)
                n = c.util.hexToBytes(n);
            else if (a.generateLocalKeyId)
                if (e) {
                    var s = c.util.isArray(e) ? e[0] : e;
                    "string" == typeof s && (s = h.certificateFromPem(s));
                    var o = c.md.sha1.create();
                    o.update(l.toDer(h.certificateToAsn1(s)).getBytes()),
                    n = o.digest().getBytes()
                } else
                    n = c.random.getBytes(20);
            var u = [];
            null !== n && u.push(l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.localKeyId).getBytes()), l.create(l.Class.UNIVERSAL, l.Type.SET, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, n)])])),
            "friendlyName"in a && u.push(l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.friendlyName).getBytes()), l.create(l.Class.UNIVERSAL, l.Type.SET, !0, [l.create(l.Class.UNIVERSAL, l.Type.BMPSTRING, !1, a.friendlyName)])])),
            u.length > 0 && (i = l.create(l.Class.UNIVERSAL, l.Type.SET, !0, u));
            var f = []
              , d = [];
            null !== e && (d = c.util.isArray(e) ? e : [e]);
            for (var y = [], g = 0; g < d.length; ++g) {
                e = d[g],
                "string" == typeof e && (e = h.certificateFromPem(e));
                var m = 0 === g ? i : void 0
                  , v = h.certificateToAsn1(e)
                  , C = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.certBag).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.x509Certificate).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, l.toDer(v).getBytes())])])]), m]);
                y.push(C)
            }
            if (y.length > 0) {
                var E = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, y)
                  , S = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.data).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, l.toDer(E).getBytes())])]);
                f.push(S)
            }
            var T = null;
            if (null !== t) {
                var I = h.wrapRsaPrivateKey(h.privateKeyToAsn1(t));
                T = null === r ? l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.keyBag).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [I]), i]) : l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.pkcs8ShroudedKeyBag).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [h.encryptPrivateKeyInfo(I, r, a)]), i]);
                var b = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [T])
                  , A = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.data).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, l.toDer(b).getBytes())])]);
                f.push(A)
            }
            var B, N = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, f);
            if (a.useMac) {
                var o = c.md.sha1.create()
                  , R = new c.util.ByteBuffer(c.random.getBytes(a.saltSize))
                  , w = a.count
                  , t = p.generateKey(r, R, 3, w, 20)
                  , L = c.hmac.create();
                L.start(o, t),
                L.update(l.toDer(N).getBytes());
                var U = L.getMac();
                B = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.sha1).getBytes()), l.create(l.Class.UNIVERSAL, l.Type.NULL, !1, "")]), l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, U.getBytes())]), l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, R.getBytes()), l.create(l.Class.UNIVERSAL, l.Type.INTEGER, !1, l.integerToDer(w).getBytes())])
            }
            return l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.INTEGER, !1, l.integerToDer(3).getBytes()), l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(h.oids.data).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, l.toDer(N).getBytes())])]), B])
        }
        ,
        p.generateKey = c.pbe.generatePkcs12Key
    }
    , function(t, e, r) {
        var a = r(0);
        r(3),
        r(1);
        var i = a.asn1
          , n = t.exports = a.pkcs7asn1 = a.pkcs7asn1 || {};
        a.pkcs7 = a.pkcs7 || {},
        a.pkcs7.asn1 = n;
        var s = {
            name: "ContentInfo",
            tagClass: i.Class.UNIVERSAL,
            type: i.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "ContentInfo.ContentType",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.OID,
                constructed: !1,
                capture: "contentType"
            }, {
                name: "ContentInfo.content",
                tagClass: i.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                captureAsn1: "content"
            }]
        };
        n.contentInfoValidator = s;
        var o = {
            name: "EncryptedContentInfo",
            tagClass: i.Class.UNIVERSAL,
            type: i.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedContentInfo.contentType",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.OID,
                constructed: !1,
                capture: "contentType"
            }, {
                name: "EncryptedContentInfo.contentEncryptionAlgorithm",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",
                    tagClass: i.Class.UNIVERSAL,
                    type: i.Type.OID,
                    constructed: !1,
                    capture: "encAlgorithm"
                }, {
                    name: "EncryptedContentInfo.contentEncryptionAlgorithm.parameter",
                    tagClass: i.Class.UNIVERSAL,
                    captureAsn1: "encParameter"
                }]
            }, {
                name: "EncryptedContentInfo.encryptedContent",
                tagClass: i.Class.CONTEXT_SPECIFIC,
                type: 0,
                capture: "encryptedContent",
                captureAsn1: "encryptedContentAsn1"
            }]
        };
        n.envelopedDataValidator = {
            name: "EnvelopedData",
            tagClass: i.Class.UNIVERSAL,
            type: i.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EnvelopedData.Version",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "EnvelopedData.RecipientInfos",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SET,
                constructed: !0,
                captureAsn1: "recipientInfos"
            }].concat(o)
        },
        n.encryptedDataValidator = {
            name: "EncryptedData",
            tagClass: i.Class.UNIVERSAL,
            type: i.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedData.Version",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }].concat(o)
        };
        var u = {
            name: "SignerInfo",
            tagClass: i.Class.UNIVERSAL,
            type: i.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SignerInfo.version",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.INTEGER,
                constructed: !1
            }, {
                name: "SignerInfo.issuerAndSerialNumber",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "SignerInfo.issuerAndSerialNumber.issuer",
                    tagClass: i.Class.UNIVERSAL,
                    type: i.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "issuer"
                }, {
                    name: "SignerInfo.issuerAndSerialNumber.serialNumber",
                    tagClass: i.Class.UNIVERSAL,
                    type: i.Type.INTEGER,
                    constructed: !1,
                    capture: "serial"
                }]
            }, {
                name: "SignerInfo.digestAlgorithm",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "SignerInfo.digestAlgorithm.algorithm",
                    tagClass: i.Class.UNIVERSAL,
                    type: i.Type.OID,
                    constructed: !1,
                    capture: "digestAlgorithm"
                }, {
                    name: "SignerInfo.digestAlgorithm.parameter",
                    tagClass: i.Class.UNIVERSAL,
                    constructed: !1,
                    captureAsn1: "digestParameter",
                    optional: !0
                }]
            }, {
                name: "SignerInfo.authenticatedAttributes",
                tagClass: i.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                capture: "authenticatedAttributes"
            }, {
                name: "SignerInfo.digestEncryptionAlgorithm",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SEQUENCE,
                constructed: !0,
                capture: "signatureAlgorithm"
            }, {
                name: "SignerInfo.encryptedDigest",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.OCTETSTRING,
                constructed: !1,
                capture: "signature"
            }, {
                name: "SignerInfo.unauthenticatedAttributes",
                tagClass: i.Class.CONTEXT_SPECIFIC,
                type: 1,
                constructed: !0,
                optional: !0,
                capture: "unauthenticatedAttributes"
            }]
        };
        n.signedDataValidator = {
            name: "SignedData",
            tagClass: i.Class.UNIVERSAL,
            type: i.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SignedData.Version",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "SignedData.DigestAlgorithms",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SET,
                constructed: !0,
                captureAsn1: "digestAlgorithms"
            }, s, {
                name: "SignedData.Certificates",
                tagClass: i.Class.CONTEXT_SPECIFIC,
                type: 0,
                optional: !0,
                captureAsn1: "certificates"
            }, {
                name: "SignedData.CertificateRevocationLists",
                tagClass: i.Class.CONTEXT_SPECIFIC,
                type: 1,
                optional: !0,
                captureAsn1: "crls"
            }, {
                name: "SignedData.SignerInfos",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SET,
                capture: "signerInfos",
                optional: !0,
                value: [u]
            }]
        },
        n.recipientInfoValidator = {
            name: "RecipientInfo",
            tagClass: i.Class.UNIVERSAL,
            type: i.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RecipientInfo.version",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "RecipientInfo.issuerAndSerial",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "RecipientInfo.issuerAndSerial.issuer",
                    tagClass: i.Class.UNIVERSAL,
                    type: i.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "issuer"
                }, {
                    name: "RecipientInfo.issuerAndSerial.serialNumber",
                    tagClass: i.Class.UNIVERSAL,
                    type: i.Type.INTEGER,
                    constructed: !1,
                    capture: "serial"
                }]
            }, {
                name: "RecipientInfo.keyEncryptionAlgorithm",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "RecipientInfo.keyEncryptionAlgorithm.algorithm",
                    tagClass: i.Class.UNIVERSAL,
                    type: i.Type.OID,
                    constructed: !1,
                    capture: "encAlgorithm"
                }, {
                    name: "RecipientInfo.keyEncryptionAlgorithm.parameter",
                    tagClass: i.Class.UNIVERSAL,
                    constructed: !1,
                    captureAsn1: "encParameter"
                }]
            }, {
                name: "RecipientInfo.encryptedKey",
                tagClass: i.Class.UNIVERSAL,
                type: i.Type.OCTETSTRING,
                constructed: !1,
                capture: "encKey"
            }]
        }
    }
    , function(t, e, r) {
        var a = r(0);
        r(34),
        t.exports = a.mgf = a.mgf || {},
        a.mgf.mgf1 = a.mgf1
    }
    , function(t, e, r) {
        var a = r(0);
        r(1),
        a.mgf = a.mgf || {},
        (t.exports = a.mgf.mgf1 = a.mgf1 = a.mgf1 || {}).create = function(t) {
            return {
                generate: function(e, r) {
                    for (var i = new a.util.ByteBuffer, n = Math.ceil(r / t.digestLength), s = 0; s < n; s++) {
                        var o = new a.util.ByteBuffer;
                        o.putInt32(s),
                        t.start(),
                        t.update(e + o.getBytes()),
                        i.putBuffer(t.digest())
                    }
                    return i.truncate(i.length() - r),
                    i.getBytes()
                }
            }
        }
    }
    ])
});
//# sourceMappingURL=forge.min.js.map;
IE.fModule({
    f: function(exports, require, module, global) {
        require('forge.min.js');
        require('forge.js');
    },
    fn: 'declarationforge.js'
});
;!function(t) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).pako = t()
    }
}(function() {
    return function r(s, o, l) {
        function h(e, t) {
            if (!o[e]) {
                if (!s[e]) {
                    var a = "function" == typeof require && require;
                    if (!t && a)
                        return a(e, !0);
                    if (d)
                        return d(e, !0);
                    var i = new Error("Cannot find module '" + e + "'");
                    throw i.code = "MODULE_NOT_FOUND",
                    i
                }
                var n = o[e] = {
                    exports: {}
                };
                s[e][0].call(n.exports, function(t) {
                    return h(s[e][1][t] || t)
                }, n, n.exports, r, s, o, l)
            }
            return o[e].exports
        }
        for (var d = "function" == typeof require && require, t = 0; t < l.length; t++)
            h(l[t]);
        return h
    }({
        1: [function(t, e, a) {
            "use strict";
            var s = t("./zlib/deflate")
              , o = t("./utils/common")
              , l = t("./utils/strings")
              , n = t("./zlib/messages")
              , r = t("./zlib/zstream")
              , h = Object.prototype.toString
              , d = 0
              , f = -1
              , _ = 0
              , u = 8;
            function c(t) {
                if (!(this instanceof c))
                    return new c(t);
                this.options = o.assign({
                    level: f,
                    method: u,
                    chunkSize: 16384,
                    windowBits: 15,
                    memLevel: 8,
                    strategy: _,
                    to: ""
                }, t || {});
                var e = this.options;
                e.raw && 0 < e.windowBits ? e.windowBits = -e.windowBits : e.gzip && 0 < e.windowBits && e.windowBits < 16 && (e.windowBits += 16),
                this.err = 0,
                this.msg = "",
                this.ended = !1,
                this.chunks = [],
                this.strm = new r,
                this.strm.avail_out = 0;
                var a = s.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
                if (a !== d)
                    throw new Error(n[a]);
                if (e.header && s.deflateSetHeader(this.strm, e.header),
                e.dictionary) {
                    var i;
                    if (i = "string" == typeof e.dictionary ? l.string2buf(e.dictionary) : "[object ArrayBuffer]" === h.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary,
                    (a = s.deflateSetDictionary(this.strm, i)) !== d)
                        throw new Error(n[a]);
                    this._dict_set = !0
                }
            }
            function i(t, e) {
                var a = new c(e);
                if (a.push(t, !0),
                a.err)
                    throw a.msg || n[a.err];
                return a.result
            }
            c.prototype.push = function(t, e) {
                var a, i, n = this.strm, r = this.options.chunkSize;
                if (this.ended)
                    return !1;
                i = e === ~~e ? e : !0 === e ? 4 : 0,
                "string" == typeof t ? n.input = l.string2buf(t) : "[object ArrayBuffer]" === h.call(t) ? n.input = new Uint8Array(t) : n.input = t,
                n.next_in = 0,
                n.avail_in = n.input.length;
                do {
                    if (0 === n.avail_out && (n.output = new o.Buf8(r),
                    n.next_out = 0,
                    n.avail_out = r),
                    1 !== (a = s.deflate(n, i)) && a !== d)
                        return this.onEnd(a),
                        !(this.ended = !0);
                    0 !== n.avail_out && (0 !== n.avail_in || 4 !== i && 2 !== i) || ("string" === this.options.to ? this.onData(l.buf2binstring(o.shrinkBuf(n.output, n.next_out))) : this.onData(o.shrinkBuf(n.output, n.next_out)))
                } while ((0 < n.avail_in || 0 === n.avail_out) && 1 !== a);
                return 4 === i ? (a = s.deflateEnd(this.strm),
                this.onEnd(a),
                this.ended = !0,
                a === d) : 2 !== i || (this.onEnd(d),
                !(n.avail_out = 0))
            }
            ,
            c.prototype.onData = function(t) {
                this.chunks.push(t)
            }
            ,
            c.prototype.onEnd = function(t) {
                t === d && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)),
                this.chunks = [],
                this.err = t,
                this.msg = this.strm.msg
            }
            ,
            a.Deflate = c,
            a.deflate = i,
            a.deflateRaw = function(t, e) {
                return (e = e || {}).raw = !0,
                i(t, e)
            }
            ,
            a.gzip = function(t, e) {
                return (e = e || {}).gzip = !0,
                i(t, e)
            }
        }
        , {
            "./utils/common": 3,
            "./utils/strings": 4,
            "./zlib/deflate": 8,
            "./zlib/messages": 13,
            "./zlib/zstream": 15
        }],
        2: [function(t, e, a) {
            "use strict";
            var f = t("./zlib/inflate")
              , _ = t("./utils/common")
              , u = t("./utils/strings")
              , c = t("./zlib/constants")
              , i = t("./zlib/messages")
              , n = t("./zlib/zstream")
              , r = t("./zlib/gzheader")
              , b = Object.prototype.toString;
            function s(t) {
                if (!(this instanceof s))
                    return new s(t);
                this.options = _.assign({
                    chunkSize: 16384,
                    windowBits: 0,
                    to: ""
                }, t || {});
                var e = this.options;
                e.raw && 0 <= e.windowBits && e.windowBits < 16 && (e.windowBits = -e.windowBits,
                0 === e.windowBits && (e.windowBits = -15)),
                !(0 <= e.windowBits && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32),
                15 < e.windowBits && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15),
                this.err = 0,
                this.msg = "",
                this.ended = !1,
                this.chunks = [],
                this.strm = new n,
                this.strm.avail_out = 0;
                var a = f.inflateInit2(this.strm, e.windowBits);
                if (a !== c.Z_OK)
                    throw new Error(i[a]);
                if (this.header = new r,
                f.inflateGetHeader(this.strm, this.header),
                e.dictionary && ("string" == typeof e.dictionary ? e.dictionary = u.string2buf(e.dictionary) : "[object ArrayBuffer]" === b.call(e.dictionary) && (e.dictionary = new Uint8Array(e.dictionary)),
                e.raw && (a = f.inflateSetDictionary(this.strm, e.dictionary)) !== c.Z_OK))
                    throw new Error(i[a])
            }
            function o(t, e) {
                var a = new s(e);
                if (a.push(t, !0),
                a.err)
                    throw a.msg || i[a.err];
                return a.result
            }
            s.prototype.push = function(t, e) {
                var a, i, n, r, s, o = this.strm, l = this.options.chunkSize, h = this.options.dictionary, d = !1;
                if (this.ended)
                    return !1;
                i = e === ~~e ? e : !0 === e ? c.Z_FINISH : c.Z_NO_FLUSH,
                "string" == typeof t ? o.input = u.binstring2buf(t) : "[object ArrayBuffer]" === b.call(t) ? o.input = new Uint8Array(t) : o.input = t,
                o.next_in = 0,
                o.avail_in = o.input.length;
                do {
                    if (0 === o.avail_out && (o.output = new _.Buf8(l),
                    o.next_out = 0,
                    o.avail_out = l),
                    (a = f.inflate(o, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && h && (a = f.inflateSetDictionary(this.strm, h)),
                    a === c.Z_BUF_ERROR && !0 === d && (a = c.Z_OK,
                    d = !1),
                    a !== c.Z_STREAM_END && a !== c.Z_OK)
                        return this.onEnd(a),
                        !(this.ended = !0);
                    o.next_out && (0 !== o.avail_out && a !== c.Z_STREAM_END && (0 !== o.avail_in || i !== c.Z_FINISH && i !== c.Z_SYNC_FLUSH) || ("string" === this.options.to ? (n = u.utf8border(o.output, o.next_out),
                    r = o.next_out - n,
                    s = u.buf2string(o.output, n),
                    o.next_out = r,
                    o.avail_out = l - r,
                    r && _.arraySet(o.output, o.output, n, r, 0),
                    this.onData(s)) : this.onData(_.shrinkBuf(o.output, o.next_out)))),
                    0 === o.avail_in && 0 === o.avail_out && (d = !0)
                } while ((0 < o.avail_in || 0 === o.avail_out) && a !== c.Z_STREAM_END);
                return a === c.Z_STREAM_END && (i = c.Z_FINISH),
                i === c.Z_FINISH ? (a = f.inflateEnd(this.strm),
                this.onEnd(a),
                this.ended = !0,
                a === c.Z_OK) : i !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK),
                !(o.avail_out = 0))
            }
            ,
            s.prototype.onData = function(t) {
                this.chunks.push(t)
            }
            ,
            s.prototype.onEnd = function(t) {
                t === c.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = _.flattenChunks(this.chunks)),
                this.chunks = [],
                this.err = t,
                this.msg = this.strm.msg
            }
            ,
            a.Inflate = s,
            a.inflate = o,
            a.inflateRaw = function(t, e) {
                return (e = e || {}).raw = !0,
                o(t, e)
            }
            ,
            a.ungzip = o
        }
        , {
            "./utils/common": 3,
            "./utils/strings": 4,
            "./zlib/constants": 6,
            "./zlib/gzheader": 9,
            "./zlib/inflate": 11,
            "./zlib/messages": 13,
            "./zlib/zstream": 15
        }],
        3: [function(t, e, a) {
            "use strict";
            var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            a.assign = function(t) {
                for (var e, a, i = Array.prototype.slice.call(arguments, 1); i.length; ) {
                    var n = i.shift();
                    if (n) {
                        if ("object" != typeof n)
                            throw new TypeError(n + "must be non-object");
                        for (var r in n)
                            e = n,
                            a = r,
                            Object.prototype.hasOwnProperty.call(e, a) && (t[r] = n[r])
                    }
                }
                return t
            }
            ,
            a.shrinkBuf = function(t, e) {
                return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e,
                t)
            }
            ;
            var n = {
                arraySet: function(t, e, a, i, n) {
                    if (e.subarray && t.subarray)
                        t.set(e.subarray(a, a + i), n);
                    else
                        for (var r = 0; r < i; r++)
                            t[n + r] = e[a + r]
                },
                flattenChunks: function(t) {
                    var e, a, i, n, r, s;
                    for (e = i = 0,
                    a = t.length; e < a; e++)
                        i += t[e].length;
                    for (s = new Uint8Array(i),
                    e = n = 0,
                    a = t.length; e < a; e++)
                        r = t[e],
                        s.set(r, n),
                        n += r.length;
                    return s
                }
            }
              , r = {
                arraySet: function(t, e, a, i, n) {
                    for (var r = 0; r < i; r++)
                        t[n + r] = e[a + r]
                },
                flattenChunks: function(t) {
                    return [].concat.apply([], t)
                }
            };
            a.setTyped = function(t) {
                t ? (a.Buf8 = Uint8Array,
                a.Buf16 = Uint16Array,
                a.Buf32 = Int32Array,
                a.assign(a, n)) : (a.Buf8 = Array,
                a.Buf16 = Array,
                a.Buf32 = Array,
                a.assign(a, r))
            }
            ,
            a.setTyped(i)
        }
        , {}],
        4: [function(t, e, a) {
            "use strict";
            var l = t("./common")
              , n = !0
              , r = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (t) {
                n = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (t) {
                r = !1
            }
            for (var h = new l.Buf8(256), i = 0; i < 256; i++)
                h[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
            function d(t, e) {
                if (e < 65534 && (t.subarray && r || !t.subarray && n))
                    return String.fromCharCode.apply(null, l.shrinkBuf(t, e));
                for (var a = "", i = 0; i < e; i++)
                    a += String.fromCharCode(t[i]);
                return a
            }
            h[254] = h[254] = 1,
            a.string2buf = function(t) {
                var e, a, i, n, r, s = t.length, o = 0;
                for (n = 0; n < s; n++)
                    55296 == (64512 & (a = t.charCodeAt(n))) && n + 1 < s && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (a = 65536 + (a - 55296 << 10) + (i - 56320),
                    n++),
                    o += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
                for (e = new l.Buf8(o),
                n = r = 0; r < o; n++)
                    55296 == (64512 & (a = t.charCodeAt(n))) && n + 1 < s && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (a = 65536 + (a - 55296 << 10) + (i - 56320),
                    n++),
                    a < 128 ? e[r++] = a : (a < 2048 ? e[r++] = 192 | a >>> 6 : (a < 65536 ? e[r++] = 224 | a >>> 12 : (e[r++] = 240 | a >>> 18,
                    e[r++] = 128 | a >>> 12 & 63),
                    e[r++] = 128 | a >>> 6 & 63),
                    e[r++] = 128 | 63 & a);
                return e
            }
            ,
            a.buf2binstring = function(t) {
                return d(t, t.length)
            }
            ,
            a.binstring2buf = function(t) {
                for (var e = new l.Buf8(t.length), a = 0, i = e.length; a < i; a++)
                    e[a] = t.charCodeAt(a);
                return e
            }
            ,
            a.buf2string = function(t, e) {
                var a, i, n, r, s = e || t.length, o = new Array(2 * s);
                for (a = i = 0; a < s; )
                    if ((n = t[a++]) < 128)
                        o[i++] = n;
                    else if (4 < (r = h[n]))
                        o[i++] = 65533,
                        a += r - 1;
                    else {
                        for (n &= 2 === r ? 31 : 3 === r ? 15 : 7; 1 < r && a < s; )
                            n = n << 6 | 63 & t[a++],
                            r--;
                        1 < r ? o[i++] = 65533 : n < 65536 ? o[i++] = n : (n -= 65536,
                        o[i++] = 55296 | n >> 10 & 1023,
                        o[i++] = 56320 | 1023 & n)
                    }
                return d(o, i)
            }
            ,
            a.utf8border = function(t, e) {
                var a;
                for ((e = e || t.length) > t.length && (e = t.length),
                a = e - 1; 0 <= a && 128 == (192 & t[a]); )
                    a--;
                return a < 0 ? e : 0 === a ? e : a + h[t[a]] > e ? a : e
            }
        }
        , {
            "./common": 3
        }],
        5: [function(t, e, a) {
            "use strict";
            e.exports = function(t, e, a, i) {
                for (var n = 65535 & t | 0, r = t >>> 16 & 65535 | 0, s = 0; 0 !== a; ) {
                    for (a -= s = 2e3 < a ? 2e3 : a; r = r + (n = n + e[i++] | 0) | 0,
                    --s; )
                        ;
                    n %= 65521,
                    r %= 65521
                }
                return n | r << 16 | 0
            }
        }
        , {}],
        6: [function(t, e, a) {
            "use strict";
            e.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        }
        , {}],
        7: [function(t, e, a) {
            "use strict";
            var o = function() {
                for (var t, e = [], a = 0; a < 256; a++) {
                    t = a;
                    for (var i = 0; i < 8; i++)
                        t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                    e[a] = t
                }
                return e
            }();
            e.exports = function(t, e, a, i) {
                var n = o
                  , r = i + a;
                t ^= -1;
                for (var s = i; s < r; s++)
                    t = t >>> 8 ^ n[255 & (t ^ e[s])];
                return -1 ^ t
            }
        }
        , {}],
        8: [function(t, e, a) {
            "use strict";
            var l, _ = t("../utils/common"), h = t("./trees"), u = t("./adler32"), c = t("./crc32"), i = t("./messages"), d = 0, f = 4, b = 0, g = -2, m = -1, w = 4, n = 2, p = 8, v = 9, r = 286, s = 30, o = 19, k = 2 * r + 1, y = 15, x = 3, z = 258, B = z + x + 1, S = 42, E = 113, A = 1, Z = 2, R = 3, C = 4;
            function N(t, e) {
                return t.msg = i[e],
                e
            }
            function O(t) {
                return (t << 1) - (4 < t ? 9 : 0)
            }
            function D(t) {
                for (var e = t.length; 0 <= --e; )
                    t[e] = 0
            }
            function I(t) {
                var e = t.state
                  , a = e.pending;
                a > t.avail_out && (a = t.avail_out),
                0 !== a && (_.arraySet(t.output, e.pending_buf, e.pending_out, a, t.next_out),
                t.next_out += a,
                e.pending_out += a,
                t.total_out += a,
                t.avail_out -= a,
                e.pending -= a,
                0 === e.pending && (e.pending_out = 0))
            }
            function U(t, e) {
                h._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e),
                t.block_start = t.strstart,
                I(t.strm)
            }
            function T(t, e) {
                t.pending_buf[t.pending++] = e
            }
            function F(t, e) {
                t.pending_buf[t.pending++] = e >>> 8 & 255,
                t.pending_buf[t.pending++] = 255 & e
            }
            function L(t, e) {
                var a, i, n = t.max_chain_length, r = t.strstart, s = t.prev_length, o = t.nice_match, l = t.strstart > t.w_size - B ? t.strstart - (t.w_size - B) : 0, h = t.window, d = t.w_mask, f = t.prev, _ = t.strstart + z, u = h[r + s - 1], c = h[r + s];
                t.prev_length >= t.good_match && (n >>= 2),
                o > t.lookahead && (o = t.lookahead);
                do {
                    if (h[(a = e) + s] === c && h[a + s - 1] === u && h[a] === h[r] && h[++a] === h[r + 1]) {
                        r += 2,
                        a++;
                        do {} while (h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && r < _);
                        if (i = z - (_ - r),
                        r = _ - z,
                        s < i) {
                            if (t.match_start = e,
                            o <= (s = i))
                                break;
                            u = h[r + s - 1],
                            c = h[r + s]
                        }
                    }
                } while ((e = f[e & d]) > l && 0 != --n);
                return s <= t.lookahead ? s : t.lookahead
            }
            function H(t) {
                var e, a, i, n, r, s, o, l, h, d, f = t.w_size;
                do {
                    if (n = t.window_size - t.lookahead - t.strstart,
                    t.strstart >= f + (f - B)) {
                        for (_.arraySet(t.window, t.window, f, f, 0),
                        t.match_start -= f,
                        t.strstart -= f,
                        t.block_start -= f,
                        e = a = t.hash_size; i = t.head[--e],
                        t.head[e] = f <= i ? i - f : 0,
                        --a; )
                            ;
                        for (e = a = f; i = t.prev[--e],
                        t.prev[e] = f <= i ? i - f : 0,
                        --a; )
                            ;
                        n += f
                    }
                    if (0 === t.strm.avail_in)
                        break;
                    if (s = t.strm,
                    o = t.window,
                    l = t.strstart + t.lookahead,
                    h = n,
                    d = void 0,
                    d = s.avail_in,
                    h < d && (d = h),
                    a = 0 === d ? 0 : (s.avail_in -= d,
                    _.arraySet(o, s.input, s.next_in, d, l),
                    1 === s.state.wrap ? s.adler = u(s.adler, o, d, l) : 2 === s.state.wrap && (s.adler = c(s.adler, o, d, l)),
                    s.next_in += d,
                    s.total_in += d,
                    d),
                    t.lookahead += a,
                    t.lookahead + t.insert >= x)
                        for (r = t.strstart - t.insert,
                        t.ins_h = t.window[r],
                        t.ins_h = (t.ins_h << t.hash_shift ^ t.window[r + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[r + x - 1]) & t.hash_mask,
                        t.prev[r & t.w_mask] = t.head[t.ins_h],
                        t.head[t.ins_h] = r,
                        r++,
                        t.insert--,
                        !(t.lookahead + t.insert < x)); )
                            ;
                } while (t.lookahead < B && 0 !== t.strm.avail_in)
            }
            function j(t, e) {
                for (var a, i; ; ) {
                    if (t.lookahead < B) {
                        if (H(t),
                        t.lookahead < B && e === d)
                            return A;
                        if (0 === t.lookahead)
                            break
                    }
                    if (a = 0,
                    t.lookahead >= x && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask,
                    a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                    t.head[t.ins_h] = t.strstart),
                    0 !== a && t.strstart - a <= t.w_size - B && (t.match_length = L(t, a)),
                    t.match_length >= x)
                        if (i = h._tr_tally(t, t.strstart - t.match_start, t.match_length - x),
                        t.lookahead -= t.match_length,
                        t.match_length <= t.max_lazy_match && t.lookahead >= x) {
                            for (t.match_length--; t.strstart++,
                            t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask,
                            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                            t.head[t.ins_h] = t.strstart,
                            0 != --t.match_length; )
                                ;
                            t.strstart++
                        } else
                            t.strstart += t.match_length,
                            t.match_length = 0,
                            t.ins_h = t.window[t.strstart],
                            t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
                    else
                        i = h._tr_tally(t, 0, t.window[t.strstart]),
                        t.lookahead--,
                        t.strstart++;
                    if (i && (U(t, !1),
                    0 === t.strm.avail_out))
                        return A
                }
                return t.insert = t.strstart < x - 1 ? t.strstart : x - 1,
                e === f ? (U(t, !0),
                0 === t.strm.avail_out ? R : C) : t.last_lit && (U(t, !1),
                0 === t.strm.avail_out) ? A : Z
            }
            function K(t, e) {
                for (var a, i, n; ; ) {
                    if (t.lookahead < B) {
                        if (H(t),
                        t.lookahead < B && e === d)
                            return A;
                        if (0 === t.lookahead)
                            break
                    }
                    if (a = 0,
                    t.lookahead >= x && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask,
                    a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                    t.head[t.ins_h] = t.strstart),
                    t.prev_length = t.match_length,
                    t.prev_match = t.match_start,
                    t.match_length = x - 1,
                    0 !== a && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - B && (t.match_length = L(t, a),
                    t.match_length <= 5 && (1 === t.strategy || t.match_length === x && 4096 < t.strstart - t.match_start) && (t.match_length = x - 1)),
                    t.prev_length >= x && t.match_length <= t.prev_length) {
                        for (n = t.strstart + t.lookahead - x,
                        i = h._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - x),
                        t.lookahead -= t.prev_length - 1,
                        t.prev_length -= 2; ++t.strstart <= n && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask,
                        a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                        t.head[t.ins_h] = t.strstart),
                        0 != --t.prev_length; )
                            ;
                        if (t.match_available = 0,
                        t.match_length = x - 1,
                        t.strstart++,
                        i && (U(t, !1),
                        0 === t.strm.avail_out))
                            return A
                    } else if (t.match_available) {
                        if ((i = h._tr_tally(t, 0, t.window[t.strstart - 1])) && U(t, !1),
                        t.strstart++,
                        t.lookahead--,
                        0 === t.strm.avail_out)
                            return A
                    } else
                        t.match_available = 1,
                        t.strstart++,
                        t.lookahead--
                }
                return t.match_available && (i = h._tr_tally(t, 0, t.window[t.strstart - 1]),
                t.match_available = 0),
                t.insert = t.strstart < x - 1 ? t.strstart : x - 1,
                e === f ? (U(t, !0),
                0 === t.strm.avail_out ? R : C) : t.last_lit && (U(t, !1),
                0 === t.strm.avail_out) ? A : Z
            }
            function M(t, e, a, i, n) {
                this.good_length = t,
                this.max_lazy = e,
                this.nice_length = a,
                this.max_chain = i,
                this.func = n
            }
            function P() {
                this.strm = null,
                this.status = 0,
                this.pending_buf = null,
                this.pending_buf_size = 0,
                this.pending_out = 0,
                this.pending = 0,
                this.wrap = 0,
                this.gzhead = null,
                this.gzindex = 0,
                this.method = p,
                this.last_flush = -1,
                this.w_size = 0,
                this.w_bits = 0,
                this.w_mask = 0,
                this.window = null,
                this.window_size = 0,
                this.prev = null,
                this.head = null,
                this.ins_h = 0,
                this.hash_size = 0,
                this.hash_bits = 0,
                this.hash_mask = 0,
                this.hash_shift = 0,
                this.block_start = 0,
                this.match_length = 0,
                this.prev_match = 0,
                this.match_available = 0,
                this.strstart = 0,
                this.match_start = 0,
                this.lookahead = 0,
                this.prev_length = 0,
                this.max_chain_length = 0,
                this.max_lazy_match = 0,
                this.level = 0,
                this.strategy = 0,
                this.good_match = 0,
                this.nice_match = 0,
                this.dyn_ltree = new _.Buf16(2 * k),
                this.dyn_dtree = new _.Buf16(2 * (2 * s + 1)),
                this.bl_tree = new _.Buf16(2 * (2 * o + 1)),
                D(this.dyn_ltree),
                D(this.dyn_dtree),
                D(this.bl_tree),
                this.l_desc = null,
                this.d_desc = null,
                this.bl_desc = null,
                this.bl_count = new _.Buf16(y + 1),
                this.heap = new _.Buf16(2 * r + 1),
                D(this.heap),
                this.heap_len = 0,
                this.heap_max = 0,
                this.depth = new _.Buf16(2 * r + 1),
                D(this.depth),
                this.l_buf = 0,
                this.lit_bufsize = 0,
                this.last_lit = 0,
                this.d_buf = 0,
                this.opt_len = 0,
                this.static_len = 0,
                this.matches = 0,
                this.insert = 0,
                this.bi_buf = 0,
                this.bi_valid = 0
            }
            function Y(t) {
                var e;
                return t && t.state ? (t.total_in = t.total_out = 0,
                t.data_type = n,
                (e = t.state).pending = 0,
                e.pending_out = 0,
                e.wrap < 0 && (e.wrap = -e.wrap),
                e.status = e.wrap ? S : E,
                t.adler = 2 === e.wrap ? 0 : 1,
                e.last_flush = d,
                h._tr_init(e),
                b) : N(t, g)
            }
            function q(t) {
                var e, a = Y(t);
                return a === b && ((e = t.state).window_size = 2 * e.w_size,
                D(e.head),
                e.max_lazy_match = l[e.level].max_lazy,
                e.good_match = l[e.level].good_length,
                e.nice_match = l[e.level].nice_length,
                e.max_chain_length = l[e.level].max_chain,
                e.strstart = 0,
                e.block_start = 0,
                e.lookahead = 0,
                e.insert = 0,
                e.match_length = e.prev_length = x - 1,
                e.match_available = 0,
                e.ins_h = 0),
                a
            }
            function G(t, e, a, i, n, r) {
                if (!t)
                    return g;
                var s = 1;
                if (e === m && (e = 6),
                i < 0 ? (s = 0,
                i = -i) : 15 < i && (s = 2,
                i -= 16),
                n < 1 || v < n || a !== p || i < 8 || 15 < i || e < 0 || 9 < e || r < 0 || w < r)
                    return N(t, g);
                8 === i && (i = 9);
                var o = new P;
                return (t.state = o).strm = t,
                o.wrap = s,
                o.gzhead = null,
                o.w_bits = i,
                o.w_size = 1 << o.w_bits,
                o.w_mask = o.w_size - 1,
                o.hash_bits = n + 7,
                o.hash_size = 1 << o.hash_bits,
                o.hash_mask = o.hash_size - 1,
                o.hash_shift = ~~((o.hash_bits + x - 1) / x),
                o.window = new _.Buf8(2 * o.w_size),
                o.head = new _.Buf16(o.hash_size),
                o.prev = new _.Buf16(o.w_size),
                o.lit_bufsize = 1 << n + 6,
                o.pending_buf_size = 4 * o.lit_bufsize,
                o.pending_buf = new _.Buf8(o.pending_buf_size),
                o.d_buf = 1 * o.lit_bufsize,
                o.l_buf = 3 * o.lit_bufsize,
                o.level = e,
                o.strategy = r,
                o.method = a,
                q(t)
            }
            l = [new M(0,0,0,0,function(t, e) {
                var a = 65535;
                for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5); ; ) {
                    if (t.lookahead <= 1) {
                        if (H(t),
                        0 === t.lookahead && e === d)
                            return A;
                        if (0 === t.lookahead)
                            break
                    }
                    t.strstart += t.lookahead,
                    t.lookahead = 0;
                    var i = t.block_start + a;
                    if ((0 === t.strstart || t.strstart >= i) && (t.lookahead = t.strstart - i,
                    t.strstart = i,
                    U(t, !1),
                    0 === t.strm.avail_out))
                        return A;
                    if (t.strstart - t.block_start >= t.w_size - B && (U(t, !1),
                    0 === t.strm.avail_out))
                        return A
                }
                return t.insert = 0,
                e === f ? (U(t, !0),
                0 === t.strm.avail_out ? R : C) : (t.strstart > t.block_start && (U(t, !1),
                t.strm.avail_out),
                A)
            }
            ), new M(4,4,8,4,j), new M(4,5,16,8,j), new M(4,6,32,32,j), new M(4,4,16,16,K), new M(8,16,32,32,K), new M(8,16,128,128,K), new M(8,32,128,256,K), new M(32,128,258,1024,K), new M(32,258,258,4096,K)],
            a.deflateInit = function(t, e) {
                return G(t, e, p, 15, 8, 0)
            }
            ,
            a.deflateInit2 = G,
            a.deflateReset = q,
            a.deflateResetKeep = Y,
            a.deflateSetHeader = function(t, e) {
                return t && t.state ? 2 !== t.state.wrap ? g : (t.state.gzhead = e,
                b) : g
            }
            ,
            a.deflate = function(t, e) {
                var a, i, n, r;
                if (!t || !t.state || 5 < e || e < 0)
                    return t ? N(t, g) : g;
                if (i = t.state,
                !t.output || !t.input && 0 !== t.avail_in || 666 === i.status && e !== f)
                    return N(t, 0 === t.avail_out ? -5 : g);
                if (i.strm = t,
                a = i.last_flush,
                i.last_flush = e,
                i.status === S)
                    if (2 === i.wrap)
                        t.adler = 0,
                        T(i, 31),
                        T(i, 139),
                        T(i, 8),
                        i.gzhead ? (T(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)),
                        T(i, 255 & i.gzhead.time),
                        T(i, i.gzhead.time >> 8 & 255),
                        T(i, i.gzhead.time >> 16 & 255),
                        T(i, i.gzhead.time >> 24 & 255),
                        T(i, 9 === i.level ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0),
                        T(i, 255 & i.gzhead.os),
                        i.gzhead.extra && i.gzhead.extra.length && (T(i, 255 & i.gzhead.extra.length),
                        T(i, i.gzhead.extra.length >> 8 & 255)),
                        i.gzhead.hcrc && (t.adler = c(t.adler, i.pending_buf, i.pending, 0)),
                        i.gzindex = 0,
                        i.status = 69) : (T(i, 0),
                        T(i, 0),
                        T(i, 0),
                        T(i, 0),
                        T(i, 0),
                        T(i, 9 === i.level ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0),
                        T(i, 3),
                        i.status = E);
                    else {
                        var s = p + (i.w_bits - 8 << 4) << 8;
                        s |= (2 <= i.strategy || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3) << 6,
                        0 !== i.strstart && (s |= 32),
                        s += 31 - s % 31,
                        i.status = E,
                        F(i, s),
                        0 !== i.strstart && (F(i, t.adler >>> 16),
                        F(i, 65535 & t.adler)),
                        t.adler = 1
                    }
                if (69 === i.status)
                    if (i.gzhead.extra) {
                        for (n = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > n && (t.adler = c(t.adler, i.pending_buf, i.pending - n, n)),
                        I(t),
                        n = i.pending,
                        i.pending !== i.pending_buf_size)); )
                            T(i, 255 & i.gzhead.extra[i.gzindex]),
                            i.gzindex++;
                        i.gzhead.hcrc && i.pending > n && (t.adler = c(t.adler, i.pending_buf, i.pending - n, n)),
                        i.gzindex === i.gzhead.extra.length && (i.gzindex = 0,
                        i.status = 73)
                    } else
                        i.status = 73;
                if (73 === i.status)
                    if (i.gzhead.name) {
                        n = i.pending;
                        do {
                            if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > n && (t.adler = c(t.adler, i.pending_buf, i.pending - n, n)),
                            I(t),
                            n = i.pending,
                            i.pending === i.pending_buf_size)) {
                                r = 1;
                                break
                            }
                            T(i, r = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0)
                        } while (0 !== r);
                        i.gzhead.hcrc && i.pending > n && (t.adler = c(t.adler, i.pending_buf, i.pending - n, n)),
                        0 === r && (i.gzindex = 0,
                        i.status = 91)
                    } else
                        i.status = 91;
                if (91 === i.status)
                    if (i.gzhead.comment) {
                        n = i.pending;
                        do {
                            if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > n && (t.adler = c(t.adler, i.pending_buf, i.pending - n, n)),
                            I(t),
                            n = i.pending,
                            i.pending === i.pending_buf_size)) {
                                r = 1;
                                break
                            }
                            T(i, r = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0)
                        } while (0 !== r);
                        i.gzhead.hcrc && i.pending > n && (t.adler = c(t.adler, i.pending_buf, i.pending - n, n)),
                        0 === r && (i.status = 103)
                    } else
                        i.status = 103;
                if (103 === i.status && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && I(t),
                i.pending + 2 <= i.pending_buf_size && (T(i, 255 & t.adler),
                T(i, t.adler >> 8 & 255),
                t.adler = 0,
                i.status = E)) : i.status = E),
                0 !== i.pending) {
                    if (I(t),
                    0 === t.avail_out)
                        return i.last_flush = -1,
                        b
                } else if (0 === t.avail_in && O(e) <= O(a) && e !== f)
                    return N(t, -5);
                if (666 === i.status && 0 !== t.avail_in)
                    return N(t, -5);
                if (0 !== t.avail_in || 0 !== i.lookahead || e !== d && 666 !== i.status) {
                    var o = 2 === i.strategy ? function(t, e) {
                        for (var a; ; ) {
                            if (0 === t.lookahead && (H(t),
                            0 === t.lookahead)) {
                                if (e === d)
                                    return A;
                                break
                            }
                            if (t.match_length = 0,
                            a = h._tr_tally(t, 0, t.window[t.strstart]),
                            t.lookahead--,
                            t.strstart++,
                            a && (U(t, !1),
                            0 === t.strm.avail_out))
                                return A
                        }
                        return t.insert = 0,
                        e === f ? (U(t, !0),
                        0 === t.strm.avail_out ? R : C) : t.last_lit && (U(t, !1),
                        0 === t.strm.avail_out) ? A : Z
                    }(i, e) : 3 === i.strategy ? function(t, e) {
                        for (var a, i, n, r, s = t.window; ; ) {
                            if (t.lookahead <= z) {
                                if (H(t),
                                t.lookahead <= z && e === d)
                                    return A;
                                if (0 === t.lookahead)
                                    break
                            }
                            if (t.match_length = 0,
                            t.lookahead >= x && 0 < t.strstart && (i = s[n = t.strstart - 1]) === s[++n] && i === s[++n] && i === s[++n]) {
                                r = t.strstart + z;
                                do {} while (i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && n < r);
                                t.match_length = z - (r - n),
                                t.match_length > t.lookahead && (t.match_length = t.lookahead)
                            }
                            if (t.match_length >= x ? (a = h._tr_tally(t, 1, t.match_length - x),
                            t.lookahead -= t.match_length,
                            t.strstart += t.match_length,
                            t.match_length = 0) : (a = h._tr_tally(t, 0, t.window[t.strstart]),
                            t.lookahead--,
                            t.strstart++),
                            a && (U(t, !1),
                            0 === t.strm.avail_out))
                                return A
                        }
                        return t.insert = 0,
                        e === f ? (U(t, !0),
                        0 === t.strm.avail_out ? R : C) : t.last_lit && (U(t, !1),
                        0 === t.strm.avail_out) ? A : Z
                    }(i, e) : l[i.level].func(i, e);
                    if (o !== R && o !== C || (i.status = 666),
                    o === A || o === R)
                        return 0 === t.avail_out && (i.last_flush = -1),
                        b;
                    if (o === Z && (1 === e ? h._tr_align(i) : 5 !== e && (h._tr_stored_block(i, 0, 0, !1),
                    3 === e && (D(i.head),
                    0 === i.lookahead && (i.strstart = 0,
                    i.block_start = 0,
                    i.insert = 0))),
                    I(t),
                    0 === t.avail_out))
                        return i.last_flush = -1,
                        b
                }
                return e !== f ? b : i.wrap <= 0 ? 1 : (2 === i.wrap ? (T(i, 255 & t.adler),
                T(i, t.adler >> 8 & 255),
                T(i, t.adler >> 16 & 255),
                T(i, t.adler >> 24 & 255),
                T(i, 255 & t.total_in),
                T(i, t.total_in >> 8 & 255),
                T(i, t.total_in >> 16 & 255),
                T(i, t.total_in >> 24 & 255)) : (F(i, t.adler >>> 16),
                F(i, 65535 & t.adler)),
                I(t),
                0 < i.wrap && (i.wrap = -i.wrap),
                0 !== i.pending ? b : 1)
            }
            ,
            a.deflateEnd = function(t) {
                var e;
                return t && t.state ? (e = t.state.status) !== S && 69 !== e && 73 !== e && 91 !== e && 103 !== e && e !== E && 666 !== e ? N(t, g) : (t.state = null,
                e === E ? N(t, -3) : b) : g
            }
            ,
            a.deflateSetDictionary = function(t, e) {
                var a, i, n, r, s, o, l, h, d = e.length;
                if (!t || !t.state)
                    return g;
                if (2 === (r = (a = t.state).wrap) || 1 === r && a.status !== S || a.lookahead)
                    return g;
                for (1 === r && (t.adler = u(t.adler, e, d, 0)),
                a.wrap = 0,
                d >= a.w_size && (0 === r && (D(a.head),
                a.strstart = 0,
                a.block_start = 0,
                a.insert = 0),
                h = new _.Buf8(a.w_size),
                _.arraySet(h, e, d - a.w_size, a.w_size, 0),
                e = h,
                d = a.w_size),
                s = t.avail_in,
                o = t.next_in,
                l = t.input,
                t.avail_in = d,
                t.next_in = 0,
                t.input = e,
                H(a); a.lookahead >= x; ) {
                    for (i = a.strstart,
                    n = a.lookahead - (x - 1); a.ins_h = (a.ins_h << a.hash_shift ^ a.window[i + x - 1]) & a.hash_mask,
                    a.prev[i & a.w_mask] = a.head[a.ins_h],
                    a.head[a.ins_h] = i,
                    i++,
                    --n; )
                        ;
                    a.strstart = i,
                    a.lookahead = x - 1,
                    H(a)
                }
                return a.strstart += a.lookahead,
                a.block_start = a.strstart,
                a.insert = a.lookahead,
                a.lookahead = 0,
                a.match_length = a.prev_length = x - 1,
                a.match_available = 0,
                t.next_in = o,
                t.input = l,
                t.avail_in = s,
                a.wrap = r,
                b
            }
            ,
            a.deflateInfo = "pako deflate (from Nodeca project)"
        }
        , {
            "../utils/common": 3,
            "./adler32": 5,
            "./crc32": 7,
            "./messages": 13,
            "./trees": 14
        }],
        9: [function(t, e, a) {
            "use strict";
            e.exports = function() {
                this.text = 0,
                this.time = 0,
                this.xflags = 0,
                this.os = 0,
                this.extra = null,
                this.extra_len = 0,
                this.name = "",
                this.comment = "",
                this.hcrc = 0,
                this.done = !1
            }
        }
        , {}],
        10: [function(t, e, a) {
            "use strict";
            e.exports = function(t, e) {
                var a, i, n, r, s, o, l, h, d, f, _, u, c, b, g, m, w, p, v, k, y, x, z, B, S;
                a = t.state,
                i = t.next_in,
                B = t.input,
                n = i + (t.avail_in - 5),
                r = t.next_out,
                S = t.output,
                s = r - (e - t.avail_out),
                o = r + (t.avail_out - 257),
                l = a.dmax,
                h = a.wsize,
                d = a.whave,
                f = a.wnext,
                _ = a.window,
                u = a.hold,
                c = a.bits,
                b = a.lencode,
                g = a.distcode,
                m = (1 << a.lenbits) - 1,
                w = (1 << a.distbits) - 1;
                t: do {
                    c < 15 && (u += B[i++] << c,
                    c += 8,
                    u += B[i++] << c,
                    c += 8),
                    p = b[u & m];
                    e: for (; ; ) {
                        if (u >>>= v = p >>> 24,
                        c -= v,
                        0 === (v = p >>> 16 & 255))
                            S[r++] = 65535 & p;
                        else {
                            if (!(16 & v)) {
                                if (0 == (64 & v)) {
                                    p = b[(65535 & p) + (u & (1 << v) - 1)];
                                    continue e
                                }
                                if (32 & v) {
                                    a.mode = 12;
                                    break t
                                }
                                t.msg = "invalid literal/length code",
                                a.mode = 30;
                                break t
                            }
                            k = 65535 & p,
                            (v &= 15) && (c < v && (u += B[i++] << c,
                            c += 8),
                            k += u & (1 << v) - 1,
                            u >>>= v,
                            c -= v),
                            c < 15 && (u += B[i++] << c,
                            c += 8,
                            u += B[i++] << c,
                            c += 8),
                            p = g[u & w];
                            a: for (; ; ) {
                                if (u >>>= v = p >>> 24,
                                c -= v,
                                !(16 & (v = p >>> 16 & 255))) {
                                    if (0 == (64 & v)) {
                                        p = g[(65535 & p) + (u & (1 << v) - 1)];
                                        continue a
                                    }
                                    t.msg = "invalid distance code",
                                    a.mode = 30;
                                    break t
                                }
                                if (y = 65535 & p,
                                c < (v &= 15) && (u += B[i++] << c,
                                (c += 8) < v && (u += B[i++] << c,
                                c += 8)),
                                l < (y += u & (1 << v) - 1)) {
                                    t.msg = "invalid distance too far back",
                                    a.mode = 30;
                                    break t
                                }
                                if (u >>>= v,
                                c -= v,
                                (v = r - s) < y) {
                                    if (d < (v = y - v) && a.sane) {
                                        t.msg = "invalid distance too far back",
                                        a.mode = 30;
                                        break t
                                    }
                                    if (z = _,
                                    (x = 0) === f) {
                                        if (x += h - v,
                                        v < k) {
                                            for (k -= v; S[r++] = _[x++],
                                            --v; )
                                                ;
                                            x = r - y,
                                            z = S
                                        }
                                    } else if (f < v) {
                                        if (x += h + f - v,
                                        (v -= f) < k) {
                                            for (k -= v; S[r++] = _[x++],
                                            --v; )
                                                ;
                                            if (x = 0,
                                            f < k) {
                                                for (k -= v = f; S[r++] = _[x++],
                                                --v; )
                                                    ;
                                                x = r - y,
                                                z = S
                                            }
                                        }
                                    } else if (x += f - v,
                                    v < k) {
                                        for (k -= v; S[r++] = _[x++],
                                        --v; )
                                            ;
                                        x = r - y,
                                        z = S
                                    }
                                    for (; 2 < k; )
                                        S[r++] = z[x++],
                                        S[r++] = z[x++],
                                        S[r++] = z[x++],
                                        k -= 3;
                                    k && (S[r++] = z[x++],
                                    1 < k && (S[r++] = z[x++]))
                                } else {
                                    for (x = r - y; S[r++] = S[x++],
                                    S[r++] = S[x++],
                                    S[r++] = S[x++],
                                    2 < (k -= 3); )
                                        ;
                                    k && (S[r++] = S[x++],
                                    1 < k && (S[r++] = S[x++]))
                                }
                                break
                            }
                        }
                        break
                    }
                } while (i < n && r < o);
                i -= k = c >> 3,
                u &= (1 << (c -= k << 3)) - 1,
                t.next_in = i,
                t.next_out = r,
                t.avail_in = i < n ? n - i + 5 : 5 - (i - n),
                t.avail_out = r < o ? o - r + 257 : 257 - (r - o),
                a.hold = u,
                a.bits = c
            }
        }
        , {}],
        11: [function(t, e, a) {
            "use strict";
            var Z = t("../utils/common")
              , R = t("./adler32")
              , C = t("./crc32")
              , N = t("./inffast")
              , O = t("./inftrees")
              , D = 1
              , I = 2
              , U = 0
              , T = -2
              , F = 1
              , i = 852
              , n = 592;
            function L(t) {
                return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
            }
            function r() {
                this.mode = 0,
                this.last = !1,
                this.wrap = 0,
                this.havedict = !1,
                this.flags = 0,
                this.dmax = 0,
                this.check = 0,
                this.total = 0,
                this.head = null,
                this.wbits = 0,
                this.wsize = 0,
                this.whave = 0,
                this.wnext = 0,
                this.window = null,
                this.hold = 0,
                this.bits = 0,
                this.length = 0,
                this.offset = 0,
                this.extra = 0,
                this.lencode = null,
                this.distcode = null,
                this.lenbits = 0,
                this.distbits = 0,
                this.ncode = 0,
                this.nlen = 0,
                this.ndist = 0,
                this.have = 0,
                this.next = null,
                this.lens = new Z.Buf16(320),
                this.work = new Z.Buf16(288),
                this.lendyn = null,
                this.distdyn = null,
                this.sane = 0,
                this.back = 0,
                this.was = 0
            }
            function s(t) {
                var e;
                return t && t.state ? (e = t.state,
                t.total_in = t.total_out = e.total = 0,
                t.msg = "",
                e.wrap && (t.adler = 1 & e.wrap),
                e.mode = F,
                e.last = 0,
                e.havedict = 0,
                e.dmax = 32768,
                e.head = null,
                e.hold = 0,
                e.bits = 0,
                e.lencode = e.lendyn = new Z.Buf32(i),
                e.distcode = e.distdyn = new Z.Buf32(n),
                e.sane = 1,
                e.back = -1,
                U) : T
            }
            function o(t) {
                var e;
                return t && t.state ? ((e = t.state).wsize = 0,
                e.whave = 0,
                e.wnext = 0,
                s(t)) : T
            }
            function l(t, e) {
                var a, i;
                return t && t.state ? (i = t.state,
                e < 0 ? (a = 0,
                e = -e) : (a = 1 + (e >> 4),
                e < 48 && (e &= 15)),
                e && (e < 8 || 15 < e) ? T : (null !== i.window && i.wbits !== e && (i.window = null),
                i.wrap = a,
                i.wbits = e,
                o(t))) : T
            }
            function h(t, e) {
                var a, i;
                return t ? (i = new r,
                (t.state = i).window = null,
                (a = l(t, e)) !== U && (t.state = null),
                a) : T
            }
            var d, f, _ = !0;
            function H(t) {
                if (_) {
                    var e;
                    for (d = new Z.Buf32(512),
                    f = new Z.Buf32(32),
                    e = 0; e < 144; )
                        t.lens[e++] = 8;
                    for (; e < 256; )
                        t.lens[e++] = 9;
                    for (; e < 280; )
                        t.lens[e++] = 7;
                    for (; e < 288; )
                        t.lens[e++] = 8;
                    for (O(D, t.lens, 0, 288, d, 0, t.work, {
                        bits: 9
                    }),
                    e = 0; e < 32; )
                        t.lens[e++] = 5;
                    O(I, t.lens, 0, 32, f, 0, t.work, {
                        bits: 5
                    }),
                    _ = !1
                }
                t.lencode = d,
                t.lenbits = 9,
                t.distcode = f,
                t.distbits = 5
            }
            function j(t, e, a, i) {
                var n, r = t.state;
                return null === r.window && (r.wsize = 1 << r.wbits,
                r.wnext = 0,
                r.whave = 0,
                r.window = new Z.Buf8(r.wsize)),
                i >= r.wsize ? (Z.arraySet(r.window, e, a - r.wsize, r.wsize, 0),
                r.wnext = 0,
                r.whave = r.wsize) : (i < (n = r.wsize - r.wnext) && (n = i),
                Z.arraySet(r.window, e, a - i, n, r.wnext),
                (i -= n) ? (Z.arraySet(r.window, e, a - i, i, 0),
                r.wnext = i,
                r.whave = r.wsize) : (r.wnext += n,
                r.wnext === r.wsize && (r.wnext = 0),
                r.whave < r.wsize && (r.whave += n))),
                0
            }
            a.inflateReset = o,
            a.inflateReset2 = l,
            a.inflateResetKeep = s,
            a.inflateInit = function(t) {
                return h(t, 15)
            }
            ,
            a.inflateInit2 = h,
            a.inflate = function(t, e) {
                var a, i, n, r, s, o, l, h, d, f, _, u, c, b, g, m, w, p, v, k, y, x, z, B, S = 0, E = new Z.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in)
                    return T;
                12 === (a = t.state).mode && (a.mode = 13),
                s = t.next_out,
                n = t.output,
                l = t.avail_out,
                r = t.next_in,
                i = t.input,
                o = t.avail_in,
                h = a.hold,
                d = a.bits,
                f = o,
                _ = l,
                x = U;
                t: for (; ; )
                    switch (a.mode) {
                    case F:
                        if (0 === a.wrap) {
                            a.mode = 13;
                            break
                        }
                        for (; d < 16; ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        if (2 & a.wrap && 35615 === h) {
                            E[a.check = 0] = 255 & h,
                            E[1] = h >>> 8 & 255,
                            a.check = C(a.check, E, 2, 0),
                            d = h = 0,
                            a.mode = 2;
                            break
                        }
                        if (a.flags = 0,
                        a.head && (a.head.done = !1),
                        !(1 & a.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {
                            t.msg = "incorrect header check",
                            a.mode = 30;
                            break
                        }
                        if (8 != (15 & h)) {
                            t.msg = "unknown compression method",
                            a.mode = 30;
                            break
                        }
                        if (d -= 4,
                        y = 8 + (15 & (h >>>= 4)),
                        0 === a.wbits)
                            a.wbits = y;
                        else if (y > a.wbits) {
                            t.msg = "invalid window size",
                            a.mode = 30;
                            break
                        }
                        a.dmax = 1 << y,
                        t.adler = a.check = 1,
                        a.mode = 512 & h ? 10 : 12,
                        d = h = 0;
                        break;
                    case 2:
                        for (; d < 16; ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        if (a.flags = h,
                        8 != (255 & a.flags)) {
                            t.msg = "unknown compression method",
                            a.mode = 30;
                            break
                        }
                        if (57344 & a.flags) {
                            t.msg = "unknown header flags set",
                            a.mode = 30;
                            break
                        }
                        a.head && (a.head.text = h >> 8 & 1),
                        512 & a.flags && (E[0] = 255 & h,
                        E[1] = h >>> 8 & 255,
                        a.check = C(a.check, E, 2, 0)),
                        d = h = 0,
                        a.mode = 3;
                    case 3:
                        for (; d < 32; ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        a.head && (a.head.time = h),
                        512 & a.flags && (E[0] = 255 & h,
                        E[1] = h >>> 8 & 255,
                        E[2] = h >>> 16 & 255,
                        E[3] = h >>> 24 & 255,
                        a.check = C(a.check, E, 4, 0)),
                        d = h = 0,
                        a.mode = 4;
                    case 4:
                        for (; d < 16; ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        a.head && (a.head.xflags = 255 & h,
                        a.head.os = h >> 8),
                        512 & a.flags && (E[0] = 255 & h,
                        E[1] = h >>> 8 & 255,
                        a.check = C(a.check, E, 2, 0)),
                        d = h = 0,
                        a.mode = 5;
                    case 5:
                        if (1024 & a.flags) {
                            for (; d < 16; ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            a.length = h,
                            a.head && (a.head.extra_len = h),
                            512 & a.flags && (E[0] = 255 & h,
                            E[1] = h >>> 8 & 255,
                            a.check = C(a.check, E, 2, 0)),
                            d = h = 0
                        } else
                            a.head && (a.head.extra = null);
                        a.mode = 6;
                    case 6:
                        if (1024 & a.flags && (o < (u = a.length) && (u = o),
                        u && (a.head && (y = a.head.extra_len - a.length,
                        a.head.extra || (a.head.extra = new Array(a.head.extra_len)),
                        Z.arraySet(a.head.extra, i, r, u, y)),
                        512 & a.flags && (a.check = C(a.check, i, u, r)),
                        o -= u,
                        r += u,
                        a.length -= u),
                        a.length))
                            break t;
                        a.length = 0,
                        a.mode = 7;
                    case 7:
                        if (2048 & a.flags) {
                            if (0 === o)
                                break t;
                            for (u = 0; y = i[r + u++],
                            a.head && y && a.length < 65536 && (a.head.name += String.fromCharCode(y)),
                            y && u < o; )
                                ;
                            if (512 & a.flags && (a.check = C(a.check, i, u, r)),
                            o -= u,
                            r += u,
                            y)
                                break t
                        } else
                            a.head && (a.head.name = null);
                        a.length = 0,
                        a.mode = 8;
                    case 8:
                        if (4096 & a.flags) {
                            if (0 === o)
                                break t;
                            for (u = 0; y = i[r + u++],
                            a.head && y && a.length < 65536 && (a.head.comment += String.fromCharCode(y)),
                            y && u < o; )
                                ;
                            if (512 & a.flags && (a.check = C(a.check, i, u, r)),
                            o -= u,
                            r += u,
                            y)
                                break t
                        } else
                            a.head && (a.head.comment = null);
                        a.mode = 9;
                    case 9:
                        if (512 & a.flags) {
                            for (; d < 16; ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            if (h !== (65535 & a.check)) {
                                t.msg = "header crc mismatch",
                                a.mode = 30;
                                break
                            }
                            d = h = 0
                        }
                        a.head && (a.head.hcrc = a.flags >> 9 & 1,
                        a.head.done = !0),
                        t.adler = a.check = 0,
                        a.mode = 12;
                        break;
                    case 10:
                        for (; d < 32; ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        t.adler = a.check = L(h),
                        d = h = 0,
                        a.mode = 11;
                    case 11:
                        if (0 === a.havedict)
                            return t.next_out = s,
                            t.avail_out = l,
                            t.next_in = r,
                            t.avail_in = o,
                            a.hold = h,
                            a.bits = d,
                            2;
                        t.adler = a.check = 1,
                        a.mode = 12;
                    case 12:
                        if (5 === e || 6 === e)
                            break t;
                    case 13:
                        if (a.last) {
                            h >>>= 7 & d,
                            d -= 7 & d,
                            a.mode = 27;
                            break
                        }
                        for (; d < 3; ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        switch (a.last = 1 & h,
                        d -= 1,
                        3 & (h >>>= 1)) {
                        case 0:
                            a.mode = 14;
                            break;
                        case 1:
                            if (H(a),
                            a.mode = 20,
                            6 !== e)
                                break;
                            h >>>= 2,
                            d -= 2;
                            break t;
                        case 2:
                            a.mode = 17;
                            break;
                        case 3:
                            t.msg = "invalid block type",
                            a.mode = 30
                        }
                        h >>>= 2,
                        d -= 2;
                        break;
                    case 14:
                        for (h >>>= 7 & d,
                        d -= 7 & d; d < 32; ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        if ((65535 & h) != (h >>> 16 ^ 65535)) {
                            t.msg = "invalid stored block lengths",
                            a.mode = 30;
                            break
                        }
                        if (a.length = 65535 & h,
                        d = h = 0,
                        a.mode = 15,
                        6 === e)
                            break t;
                    case 15:
                        a.mode = 16;
                    case 16:
                        if (u = a.length) {
                            if (o < u && (u = o),
                            l < u && (u = l),
                            0 === u)
                                break t;
                            Z.arraySet(n, i, r, u, s),
                            o -= u,
                            r += u,
                            l -= u,
                            s += u,
                            a.length -= u;
                            break
                        }
                        a.mode = 12;
                        break;
                    case 17:
                        for (; d < 14; ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        if (a.nlen = 257 + (31 & h),
                        h >>>= 5,
                        d -= 5,
                        a.ndist = 1 + (31 & h),
                        h >>>= 5,
                        d -= 5,
                        a.ncode = 4 + (15 & h),
                        h >>>= 4,
                        d -= 4,
                        286 < a.nlen || 30 < a.ndist) {
                            t.msg = "too many length or distance symbols",
                            a.mode = 30;
                            break
                        }
                        a.have = 0,
                        a.mode = 18;
                    case 18:
                        for (; a.have < a.ncode; ) {
                            for (; d < 3; ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            a.lens[A[a.have++]] = 7 & h,
                            h >>>= 3,
                            d -= 3
                        }
                        for (; a.have < 19; )
                            a.lens[A[a.have++]] = 0;
                        if (a.lencode = a.lendyn,
                        a.lenbits = 7,
                        z = {
                            bits: a.lenbits
                        },
                        x = O(0, a.lens, 0, 19, a.lencode, 0, a.work, z),
                        a.lenbits = z.bits,
                        x) {
                            t.msg = "invalid code lengths set",
                            a.mode = 30;
                            break
                        }
                        a.have = 0,
                        a.mode = 19;
                    case 19:
                        for (; a.have < a.nlen + a.ndist; ) {
                            for (; m = (S = a.lencode[h & (1 << a.lenbits) - 1]) >>> 16 & 255,
                            w = 65535 & S,
                            !((g = S >>> 24) <= d); ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            if (w < 16)
                                h >>>= g,
                                d -= g,
                                a.lens[a.have++] = w;
                            else {
                                if (16 === w) {
                                    for (B = g + 2; d < B; ) {
                                        if (0 === o)
                                            break t;
                                        o--,
                                        h += i[r++] << d,
                                        d += 8
                                    }
                                    if (h >>>= g,
                                    d -= g,
                                    0 === a.have) {
                                        t.msg = "invalid bit length repeat",
                                        a.mode = 30;
                                        break
                                    }
                                    y = a.lens[a.have - 1],
                                    u = 3 + (3 & h),
                                    h >>>= 2,
                                    d -= 2
                                } else if (17 === w) {
                                    for (B = g + 3; d < B; ) {
                                        if (0 === o)
                                            break t;
                                        o--,
                                        h += i[r++] << d,
                                        d += 8
                                    }
                                    d -= g,
                                    y = 0,
                                    u = 3 + (7 & (h >>>= g)),
                                    h >>>= 3,
                                    d -= 3
                                } else {
                                    for (B = g + 7; d < B; ) {
                                        if (0 === o)
                                            break t;
                                        o--,
                                        h += i[r++] << d,
                                        d += 8
                                    }
                                    d -= g,
                                    y = 0,
                                    u = 11 + (127 & (h >>>= g)),
                                    h >>>= 7,
                                    d -= 7
                                }
                                if (a.have + u > a.nlen + a.ndist) {
                                    t.msg = "invalid bit length repeat",
                                    a.mode = 30;
                                    break
                                }
                                for (; u--; )
                                    a.lens[a.have++] = y
                            }
                        }
                        if (30 === a.mode)
                            break;
                        if (0 === a.lens[256]) {
                            t.msg = "invalid code -- missing end-of-block",
                            a.mode = 30;
                            break
                        }
                        if (a.lenbits = 9,
                        z = {
                            bits: a.lenbits
                        },
                        x = O(D, a.lens, 0, a.nlen, a.lencode, 0, a.work, z),
                        a.lenbits = z.bits,
                        x) {
                            t.msg = "invalid literal/lengths set",
                            a.mode = 30;
                            break
                        }
                        if (a.distbits = 6,
                        a.distcode = a.distdyn,
                        z = {
                            bits: a.distbits
                        },
                        x = O(I, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, z),
                        a.distbits = z.bits,
                        x) {
                            t.msg = "invalid distances set",
                            a.mode = 30;
                            break
                        }
                        if (a.mode = 20,
                        6 === e)
                            break t;
                    case 20:
                        a.mode = 21;
                    case 21:
                        if (6 <= o && 258 <= l) {
                            t.next_out = s,
                            t.avail_out = l,
                            t.next_in = r,
                            t.avail_in = o,
                            a.hold = h,
                            a.bits = d,
                            N(t, _),
                            s = t.next_out,
                            n = t.output,
                            l = t.avail_out,
                            r = t.next_in,
                            i = t.input,
                            o = t.avail_in,
                            h = a.hold,
                            d = a.bits,
                            12 === a.mode && (a.back = -1);
                            break
                        }
                        for (a.back = 0; m = (S = a.lencode[h & (1 << a.lenbits) - 1]) >>> 16 & 255,
                        w = 65535 & S,
                        !((g = S >>> 24) <= d); ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        if (m && 0 == (240 & m)) {
                            for (p = g,
                            v = m,
                            k = w; m = (S = a.lencode[k + ((h & (1 << p + v) - 1) >> p)]) >>> 16 & 255,
                            w = 65535 & S,
                            !(p + (g = S >>> 24) <= d); ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            h >>>= p,
                            d -= p,
                            a.back += p
                        }
                        if (h >>>= g,
                        d -= g,
                        a.back += g,
                        a.length = w,
                        0 === m) {
                            a.mode = 26;
                            break
                        }
                        if (32 & m) {
                            a.back = -1,
                            a.mode = 12;
                            break
                        }
                        if (64 & m) {
                            t.msg = "invalid literal/length code",
                            a.mode = 30;
                            break
                        }
                        a.extra = 15 & m,
                        a.mode = 22;
                    case 22:
                        if (a.extra) {
                            for (B = a.extra; d < B; ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            a.length += h & (1 << a.extra) - 1,
                            h >>>= a.extra,
                            d -= a.extra,
                            a.back += a.extra
                        }
                        a.was = a.length,
                        a.mode = 23;
                    case 23:
                        for (; m = (S = a.distcode[h & (1 << a.distbits) - 1]) >>> 16 & 255,
                        w = 65535 & S,
                        !((g = S >>> 24) <= d); ) {
                            if (0 === o)
                                break t;
                            o--,
                            h += i[r++] << d,
                            d += 8
                        }
                        if (0 == (240 & m)) {
                            for (p = g,
                            v = m,
                            k = w; m = (S = a.distcode[k + ((h & (1 << p + v) - 1) >> p)]) >>> 16 & 255,
                            w = 65535 & S,
                            !(p + (g = S >>> 24) <= d); ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            h >>>= p,
                            d -= p,
                            a.back += p
                        }
                        if (h >>>= g,
                        d -= g,
                        a.back += g,
                        64 & m) {
                            t.msg = "invalid distance code",
                            a.mode = 30;
                            break
                        }
                        a.offset = w,
                        a.extra = 15 & m,
                        a.mode = 24;
                    case 24:
                        if (a.extra) {
                            for (B = a.extra; d < B; ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            a.offset += h & (1 << a.extra) - 1,
                            h >>>= a.extra,
                            d -= a.extra,
                            a.back += a.extra
                        }
                        if (a.offset > a.dmax) {
                            t.msg = "invalid distance too far back",
                            a.mode = 30;
                            break
                        }
                        a.mode = 25;
                    case 25:
                        if (0 === l)
                            break t;
                        if (u = _ - l,
                        a.offset > u) {
                            if ((u = a.offset - u) > a.whave && a.sane) {
                                t.msg = "invalid distance too far back",
                                a.mode = 30;
                                break
                            }
                            u > a.wnext ? (u -= a.wnext,
                            c = a.wsize - u) : c = a.wnext - u,
                            u > a.length && (u = a.length),
                            b = a.window
                        } else
                            b = n,
                            c = s - a.offset,
                            u = a.length;
                        for (l < u && (u = l),
                        l -= u,
                        a.length -= u; n[s++] = b[c++],
                        --u; )
                            ;
                        0 === a.length && (a.mode = 21);
                        break;
                    case 26:
                        if (0 === l)
                            break t;
                        n[s++] = a.length,
                        l--,
                        a.mode = 21;
                        break;
                    case 27:
                        if (a.wrap) {
                            for (; d < 32; ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h |= i[r++] << d,
                                d += 8
                            }
                            if (_ -= l,
                            t.total_out += _,
                            a.total += _,
                            _ && (t.adler = a.check = a.flags ? C(a.check, n, _, s - _) : R(a.check, n, _, s - _)),
                            _ = l,
                            (a.flags ? h : L(h)) !== a.check) {
                                t.msg = "incorrect data check",
                                a.mode = 30;
                                break
                            }
                            d = h = 0
                        }
                        a.mode = 28;
                    case 28:
                        if (a.wrap && a.flags) {
                            for (; d < 32; ) {
                                if (0 === o)
                                    break t;
                                o--,
                                h += i[r++] << d,
                                d += 8
                            }
                            if (h !== (4294967295 & a.total)) {
                                t.msg = "incorrect length check",
                                a.mode = 30;
                                break
                            }
                            d = h = 0
                        }
                        a.mode = 29;
                    case 29:
                        x = 1;
                        break t;
                    case 30:
                        x = -3;
                        break t;
                    case 31:
                        return -4;
                    case 32:
                    default:
                        return T
                    }
                return t.next_out = s,
                t.avail_out = l,
                t.next_in = r,
                t.avail_in = o,
                a.hold = h,
                a.bits = d,
                (a.wsize || _ !== t.avail_out && a.mode < 30 && (a.mode < 27 || 4 !== e)) && j(t, t.output, t.next_out, _ - t.avail_out) ? (a.mode = 31,
                -4) : (f -= t.avail_in,
                _ -= t.avail_out,
                t.total_in += f,
                t.total_out += _,
                a.total += _,
                a.wrap && _ && (t.adler = a.check = a.flags ? C(a.check, n, _, t.next_out - _) : R(a.check, n, _, t.next_out - _)),
                t.data_type = a.bits + (a.last ? 64 : 0) + (12 === a.mode ? 128 : 0) + (20 === a.mode || 15 === a.mode ? 256 : 0),
                (0 === f && 0 === _ || 4 === e) && x === U && (x = -5),
                x)
            }
            ,
            a.inflateEnd = function(t) {
                if (!t || !t.state)
                    return T;
                var e = t.state;
                return e.window && (e.window = null),
                t.state = null,
                U
            }
            ,
            a.inflateGetHeader = function(t, e) {
                var a;
                return t && t.state ? 0 == (2 & (a = t.state).wrap) ? T : ((a.head = e).done = !1,
                U) : T
            }
            ,
            a.inflateSetDictionary = function(t, e) {
                var a, i = e.length;
                return t && t.state ? 0 !== (a = t.state).wrap && 11 !== a.mode ? T : 11 === a.mode && R(1, e, i, 0) !== a.check ? -3 : j(t, e, i, i) ? (a.mode = 31,
                -4) : (a.havedict = 1,
                U) : T
            }
            ,
            a.inflateInfo = "pako inflate (from Nodeca project)"
        }
        , {
            "../utils/common": 3,
            "./adler32": 5,
            "./crc32": 7,
            "./inffast": 10,
            "./inftrees": 12
        }],
        12: [function(t, e, a) {
            "use strict";
            var D = t("../utils/common")
              , I = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]
              , U = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]
              , T = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]
              , F = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            e.exports = function(t, e, a, i, n, r, s, o) {
                var l, h, d, f, _, u, c, b, g, m = o.bits, w = 0, p = 0, v = 0, k = 0, y = 0, x = 0, z = 0, B = 0, S = 0, E = 0, A = null, Z = 0, R = new D.Buf16(16), C = new D.Buf16(16), N = null, O = 0;
                for (w = 0; w <= 15; w++)
                    R[w] = 0;
                for (p = 0; p < i; p++)
                    R[e[a + p]]++;
                for (y = m,
                k = 15; 1 <= k && 0 === R[k]; k--)
                    ;
                if (k < y && (y = k),
                0 === k)
                    return n[r++] = 20971520,
                    n[r++] = 20971520,
                    o.bits = 1,
                    0;
                for (v = 1; v < k && 0 === R[v]; v++)
                    ;
                for (y < v && (y = v),
                w = B = 1; w <= 15; w++)
                    if (B <<= 1,
                    (B -= R[w]) < 0)
                        return -1;
                if (0 < B && (0 === t || 1 !== k))
                    return -1;
                for (C[1] = 0,
                w = 1; w < 15; w++)
                    C[w + 1] = C[w] + R[w];
                for (p = 0; p < i; p++)
                    0 !== e[a + p] && (s[C[e[a + p]]++] = p);
                if (0 === t ? (A = N = s,
                u = 19) : 1 === t ? (A = I,
                Z -= 257,
                N = U,
                O -= 257,
                u = 256) : (A = T,
                N = F,
                u = -1),
                w = v,
                _ = r,
                z = p = E = 0,
                d = -1,
                f = (S = 1 << (x = y)) - 1,
                1 === t && 852 < S || 2 === t && 592 < S)
                    return 1;
                for (; ; ) {
                    for (c = w - z,
                    s[p] < u ? (b = 0,
                    g = s[p]) : s[p] > u ? (b = N[O + s[p]],
                    g = A[Z + s[p]]) : (b = 96,
                    g = 0),
                    l = 1 << w - z,
                    v = h = 1 << x; n[_ + (E >> z) + (h -= l)] = c << 24 | b << 16 | g | 0,
                    0 !== h; )
                        ;
                    for (l = 1 << w - 1; E & l; )
                        l >>= 1;
                    if (0 !== l ? (E &= l - 1,
                    E += l) : E = 0,
                    p++,
                    0 == --R[w]) {
                        if (w === k)
                            break;
                        w = e[a + s[p]]
                    }
                    if (y < w && (E & f) !== d) {
                        for (0 === z && (z = y),
                        _ += v,
                        B = 1 << (x = w - z); x + z < k && !((B -= R[x + z]) <= 0); )
                            x++,
                            B <<= 1;
                        if (S += 1 << x,
                        1 === t && 852 < S || 2 === t && 592 < S)
                            return 1;
                        n[d = E & f] = y << 24 | x << 16 | _ - r | 0
                    }
                }
                return 0 !== E && (n[_ + E] = w - z << 24 | 64 << 16 | 0),
                o.bits = y,
                0
            }
        }
        , {
            "../utils/common": 3
        }],
        13: [function(t, e, a) {
            "use strict";
            e.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }
        , {}],
        14: [function(t, e, a) {
            "use strict";
            var l = t("../utils/common")
              , o = 0
              , h = 1;
            function i(t) {
                for (var e = t.length; 0 <= --e; )
                    t[e] = 0
            }
            var d = 0
              , s = 29
              , f = 256
              , _ = f + 1 + s
              , u = 30
              , c = 19
              , g = 2 * _ + 1
              , m = 15
              , n = 16
              , b = 7
              , w = 256
              , p = 16
              , v = 17
              , k = 18
              , y = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
              , x = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
              , z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
              , B = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
              , S = new Array(2 * (_ + 2));
            i(S);
            var E = new Array(2 * u);
            i(E);
            var A = new Array(512);
            i(A);
            var Z = new Array(256);
            i(Z);
            var R = new Array(s);
            i(R);
            var C, N, O, D = new Array(u);
            function I(t, e, a, i, n) {
                this.static_tree = t,
                this.extra_bits = e,
                this.extra_base = a,
                this.elems = i,
                this.max_length = n,
                this.has_stree = t && t.length
            }
            function r(t, e) {
                this.dyn_tree = t,
                this.max_code = 0,
                this.stat_desc = e
            }
            function U(t) {
                return t < 256 ? A[t] : A[256 + (t >>> 7)]
            }
            function T(t, e) {
                t.pending_buf[t.pending++] = 255 & e,
                t.pending_buf[t.pending++] = e >>> 8 & 255
            }
            function F(t, e, a) {
                t.bi_valid > n - a ? (t.bi_buf |= e << t.bi_valid & 65535,
                T(t, t.bi_buf),
                t.bi_buf = e >> n - t.bi_valid,
                t.bi_valid += a - n) : (t.bi_buf |= e << t.bi_valid & 65535,
                t.bi_valid += a)
            }
            function L(t, e, a) {
                F(t, a[2 * e], a[2 * e + 1])
            }
            function H(t, e) {
                for (var a = 0; a |= 1 & t,
                t >>>= 1,
                a <<= 1,
                0 < --e; )
                    ;
                return a >>> 1
            }
            function j(t, e, a) {
                var i, n, r = new Array(m + 1), s = 0;
                for (i = 1; i <= m; i++)
                    r[i] = s = s + a[i - 1] << 1;
                for (n = 0; n <= e; n++) {
                    var o = t[2 * n + 1];
                    0 !== o && (t[2 * n] = H(r[o]++, o))
                }
            }
            function K(t) {
                var e;
                for (e = 0; e < _; e++)
                    t.dyn_ltree[2 * e] = 0;
                for (e = 0; e < u; e++)
                    t.dyn_dtree[2 * e] = 0;
                for (e = 0; e < c; e++)
                    t.bl_tree[2 * e] = 0;
                t.dyn_ltree[2 * w] = 1,
                t.opt_len = t.static_len = 0,
                t.last_lit = t.matches = 0
            }
            function M(t) {
                8 < t.bi_valid ? T(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf),
                t.bi_buf = 0,
                t.bi_valid = 0
            }
            function P(t, e, a, i) {
                var n = 2 * e
                  , r = 2 * a;
                return t[n] < t[r] || t[n] === t[r] && i[e] <= i[a]
            }
            function Y(t, e, a) {
                for (var i = t.heap[a], n = a << 1; n <= t.heap_len && (n < t.heap_len && P(e, t.heap[n + 1], t.heap[n], t.depth) && n++,
                !P(e, i, t.heap[n], t.depth)); )
                    t.heap[a] = t.heap[n],
                    a = n,
                    n <<= 1;
                t.heap[a] = i
            }
            function q(t, e, a) {
                var i, n, r, s, o = 0;
                if (0 !== t.last_lit)
                    for (; i = t.pending_buf[t.d_buf + 2 * o] << 8 | t.pending_buf[t.d_buf + 2 * o + 1],
                    n = t.pending_buf[t.l_buf + o],
                    o++,
                    0 === i ? L(t, n, e) : (L(t, (r = Z[n]) + f + 1, e),
                    0 !== (s = y[r]) && F(t, n -= R[r], s),
                    L(t, r = U(--i), a),
                    0 !== (s = x[r]) && F(t, i -= D[r], s)),
                    o < t.last_lit; )
                        ;
                L(t, w, e)
            }
            function G(t, e) {
                var a, i, n, r = e.dyn_tree, s = e.stat_desc.static_tree, o = e.stat_desc.has_stree, l = e.stat_desc.elems, h = -1;
                for (t.heap_len = 0,
                t.heap_max = g,
                a = 0; a < l; a++)
                    0 !== r[2 * a] ? (t.heap[++t.heap_len] = h = a,
                    t.depth[a] = 0) : r[2 * a + 1] = 0;
                for (; t.heap_len < 2; )
                    r[2 * (n = t.heap[++t.heap_len] = h < 2 ? ++h : 0)] = 1,
                    t.depth[n] = 0,
                    t.opt_len--,
                    o && (t.static_len -= s[2 * n + 1]);
                for (e.max_code = h,
                a = t.heap_len >> 1; 1 <= a; a--)
                    Y(t, r, a);
                for (n = l; a = t.heap[1],
                t.heap[1] = t.heap[t.heap_len--],
                Y(t, r, 1),
                i = t.heap[1],
                t.heap[--t.heap_max] = a,
                t.heap[--t.heap_max] = i,
                r[2 * n] = r[2 * a] + r[2 * i],
                t.depth[n] = (t.depth[a] >= t.depth[i] ? t.depth[a] : t.depth[i]) + 1,
                r[2 * a + 1] = r[2 * i + 1] = n,
                t.heap[1] = n++,
                Y(t, r, 1),
                2 <= t.heap_len; )
                    ;
                t.heap[--t.heap_max] = t.heap[1],
                function(t, e) {
                    var a, i, n, r, s, o, l = e.dyn_tree, h = e.max_code, d = e.stat_desc.static_tree, f = e.stat_desc.has_stree, _ = e.stat_desc.extra_bits, u = e.stat_desc.extra_base, c = e.stat_desc.max_length, b = 0;
                    for (r = 0; r <= m; r++)
                        t.bl_count[r] = 0;
                    for (l[2 * t.heap[t.heap_max] + 1] = 0,
                    a = t.heap_max + 1; a < g; a++)
                        c < (r = l[2 * l[2 * (i = t.heap[a]) + 1] + 1] + 1) && (r = c,
                        b++),
                        l[2 * i + 1] = r,
                        h < i || (t.bl_count[r]++,
                        s = 0,
                        u <= i && (s = _[i - u]),
                        o = l[2 * i],
                        t.opt_len += o * (r + s),
                        f && (t.static_len += o * (d[2 * i + 1] + s)));
                    if (0 !== b) {
                        do {
                            for (r = c - 1; 0 === t.bl_count[r]; )
                                r--;
                            t.bl_count[r]--,
                            t.bl_count[r + 1] += 2,
                            t.bl_count[c]--,
                            b -= 2
                        } while (0 < b);
                        for (r = c; 0 !== r; r--)
                            for (i = t.bl_count[r]; 0 !== i; )
                                h < (n = t.heap[--a]) || (l[2 * n + 1] !== r && (t.opt_len += (r - l[2 * n + 1]) * l[2 * n],
                                l[2 * n + 1] = r),
                                i--)
                    }
                }(t, e),
                j(r, h, t.bl_count)
            }
            function X(t, e, a) {
                var i, n, r = -1, s = e[1], o = 0, l = 7, h = 4;
                for (0 === s && (l = 138,
                h = 3),
                e[2 * (a + 1) + 1] = 65535,
                i = 0; i <= a; i++)
                    n = s,
                    s = e[2 * (i + 1) + 1],
                    ++o < l && n === s || (o < h ? t.bl_tree[2 * n] += o : 0 !== n ? (n !== r && t.bl_tree[2 * n]++,
                    t.bl_tree[2 * p]++) : o <= 10 ? t.bl_tree[2 * v]++ : t.bl_tree[2 * k]++,
                    r = n,
                    (o = 0) === s ? (l = 138,
                    h = 3) : n === s ? (l = 6,
                    h = 3) : (l = 7,
                    h = 4))
            }
            function W(t, e, a) {
                var i, n, r = -1, s = e[1], o = 0, l = 7, h = 4;
                for (0 === s && (l = 138,
                h = 3),
                i = 0; i <= a; i++)
                    if (n = s,
                    s = e[2 * (i + 1) + 1],
                    !(++o < l && n === s)) {
                        if (o < h)
                            for (; L(t, n, t.bl_tree),
                            0 != --o; )
                                ;
                        else
                            0 !== n ? (n !== r && (L(t, n, t.bl_tree),
                            o--),
                            L(t, p, t.bl_tree),
                            F(t, o - 3, 2)) : o <= 10 ? (L(t, v, t.bl_tree),
                            F(t, o - 3, 3)) : (L(t, k, t.bl_tree),
                            F(t, o - 11, 7));
                        r = n,
                        (o = 0) === s ? (l = 138,
                        h = 3) : n === s ? (l = 6,
                        h = 3) : (l = 7,
                        h = 4)
                    }
            }
            i(D);
            var J = !1;
            function Q(t, e, a, i) {
                var n, r, s, o;
                F(t, (d << 1) + (i ? 1 : 0), 3),
                r = e,
                s = a,
                o = !0,
                M(n = t),
                o && (T(n, s),
                T(n, ~s)),
                l.arraySet(n.pending_buf, n.window, r, s, n.pending),
                n.pending += s
            }
            a._tr_init = function(t) {
                J || (function() {
                    var t, e, a, i, n, r = new Array(m + 1);
                    for (i = a = 0; i < s - 1; i++)
                        for (R[i] = a,
                        t = 0; t < 1 << y[i]; t++)
                            Z[a++] = i;
                    for (Z[a - 1] = i,
                    i = n = 0; i < 16; i++)
                        for (D[i] = n,
                        t = 0; t < 1 << x[i]; t++)
                            A[n++] = i;
                    for (n >>= 7; i < u; i++)
                        for (D[i] = n << 7,
                        t = 0; t < 1 << x[i] - 7; t++)
                            A[256 + n++] = i;
                    for (e = 0; e <= m; e++)
                        r[e] = 0;
                    for (t = 0; t <= 143; )
                        S[2 * t + 1] = 8,
                        t++,
                        r[8]++;
                    for (; t <= 255; )
                        S[2 * t + 1] = 9,
                        t++,
                        r[9]++;
                    for (; t <= 279; )
                        S[2 * t + 1] = 7,
                        t++,
                        r[7]++;
                    for (; t <= 287; )
                        S[2 * t + 1] = 8,
                        t++,
                        r[8]++;
                    for (j(S, _ + 1, r),
                    t = 0; t < u; t++)
                        E[2 * t + 1] = 5,
                        E[2 * t] = H(t, 5);
                    C = new I(S,y,f + 1,_,m),
                    N = new I(E,x,0,u,m),
                    O = new I(new Array(0),z,0,c,b)
                }(),
                J = !0),
                t.l_desc = new r(t.dyn_ltree,C),
                t.d_desc = new r(t.dyn_dtree,N),
                t.bl_desc = new r(t.bl_tree,O),
                t.bi_buf = 0,
                t.bi_valid = 0,
                K(t)
            }
            ,
            a._tr_stored_block = Q,
            a._tr_flush_block = function(t, e, a, i) {
                var n, r, s = 0;
                0 < t.level ? (2 === t.strm.data_type && (t.strm.data_type = function(t) {
                    var e, a = 4093624447;
                    for (e = 0; e <= 31; e++,
                    a >>>= 1)
                        if (1 & a && 0 !== t.dyn_ltree[2 * e])
                            return o;
                    if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26])
                        return h;
                    for (e = 32; e < f; e++)
                        if (0 !== t.dyn_ltree[2 * e])
                            return h;
                    return o
                }(t)),
                G(t, t.l_desc),
                G(t, t.d_desc),
                s = function(t) {
                    var e;
                    for (X(t, t.dyn_ltree, t.l_desc.max_code),
                    X(t, t.dyn_dtree, t.d_desc.max_code),
                    G(t, t.bl_desc),
                    e = c - 1; 3 <= e && 0 === t.bl_tree[2 * B[e] + 1]; e--)
                        ;
                    return t.opt_len += 3 * (e + 1) + 5 + 5 + 4,
                    e
                }(t),
                n = t.opt_len + 3 + 7 >>> 3,
                (r = t.static_len + 3 + 7 >>> 3) <= n && (n = r)) : n = r = a + 5,
                a + 4 <= n && -1 !== e ? Q(t, e, a, i) : 4 === t.strategy || r === n ? (F(t, 2 + (i ? 1 : 0), 3),
                q(t, S, E)) : (F(t, 4 + (i ? 1 : 0), 3),
                function(t, e, a, i) {
                    var n;
                    for (F(t, e - 257, 5),
                    F(t, a - 1, 5),
                    F(t, i - 4, 4),
                    n = 0; n < i; n++)
                        F(t, t.bl_tree[2 * B[n] + 1], 3);
                    W(t, t.dyn_ltree, e - 1),
                    W(t, t.dyn_dtree, a - 1)
                }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1),
                q(t, t.dyn_ltree, t.dyn_dtree)),
                K(t),
                i && M(t)
            }
            ,
            a._tr_tally = function(t, e, a) {
                return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255,
                t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e,
                t.pending_buf[t.l_buf + t.last_lit] = 255 & a,
                t.last_lit++,
                0 === e ? t.dyn_ltree[2 * a]++ : (t.matches++,
                e--,
                t.dyn_ltree[2 * (Z[a] + f + 1)]++,
                t.dyn_dtree[2 * U(e)]++),
                t.last_lit === t.lit_bufsize - 1
            }
            ,
            a._tr_align = function(t) {
                var e;
                F(t, 2, 3),
                L(t, w, S),
                16 === (e = t).bi_valid ? (T(e, e.bi_buf),
                e.bi_buf = 0,
                e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf,
                e.bi_buf >>= 8,
                e.bi_valid -= 8)
            }
        }
        , {
            "../utils/common": 3
        }],
        15: [function(t, e, a) {
            "use strict";
            e.exports = function() {
                this.input = null,
                this.next_in = 0,
                this.avail_in = 0,
                this.total_in = 0,
                this.output = null,
                this.next_out = 0,
                this.avail_out = 0,
                this.total_out = 0,
                this.msg = "",
                this.state = null,
                this.data_type = 2,
                this.adler = 0
            }
        }
        , {}],
        "/": [function(t, e, a) {
            "use strict";
            var i = {};
            (0,
            t("./lib/utils/common").assign)(i, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")),
            e.exports = i
        }
        , {
            "./lib/deflate": 1,
            "./lib/inflate": 2,
            "./lib/utils/common": 3,
            "./lib/zlib/constants": 6
        }]
    }, {}, [])("/")
});
;IE.fModule({
    f: function(exports, require, module, global) {
        require('pako.min.js');
        require('pako.js');
    },
    fn: 'declarationpako.js'
});
;/*! kjua v0.6.0 - https://larsjung.de/kjua/ */
!function(t, r) {
    "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define("kjua", [], r) : "object" == typeof exports ? exports.kjua = r() : t.kjua = r()
}("undefined" != typeof self ? self : this, function() {
    return function(e) {
        var n = {};
        function o(t) {
            if (n[t])
                return n[t].exports;
            var r = n[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return e[t].call(r.exports, r, r.exports, o),
            r.l = !0,
            r.exports
        }
        return o.m = e,
        o.c = n,
        o.d = function(t, r, e) {
            o.o(t, r) || Object.defineProperty(t, r, {
                enumerable: !0,
                get: e
            })
        }
        ,
        o.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        o.t = function(r, t) {
            if (1 & t && (r = o(r)),
            8 & t)
                return r;
            if (4 & t && "object" == typeof r && r && r.__esModule)
                return r;
            var e = Object.create(null);
            if (o.r(e),
            Object.defineProperty(e, "default", {
                enumerable: !0,
                value: r
            }),
            2 & t && "string" != typeof r)
                for (var n in r)
                    o.d(e, n, function(t) {
                        return r[t]
                    }
                    .bind(null, n));
            return e
        }
        ,
        o.n = function(t) {
            var r = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return o.d(r, "a", r),
            r
        }
        ,
        o.o = function(t, r) {
            return Object.prototype.hasOwnProperty.call(t, r)
        }
        ,
        o.p = "",
        o(o.s = 0)
    }([function(t, r, e) {
        var n = e(1)
          , a = n.create_canvas
          , u = n.canvas_to_img
          , f = n.dpr
          , c = e(3)
          , l = e(4)
          , s = e(6);
        t.exports = function(t) {
            var r = Object.assign({}, c, t)
              , e = l(r.text, r.ecLevel, r.minVersion, r.quiet)
              , n = r.ratio || f
              , o = a(r.size, n)
              , i = o.getContext("2d");
            return i.scale(n, n),
            s(e, i, r),
            "image" === r.render ? u(o) : o
        }
    }
    , function(u, t, r) {
        (function(t) {
            function n(t) {
                return i.createElement(t)
            }
            function e(t, r) {
                return t.getAttribute(r)
            }
            function o(t, r, e) {
                return t.setAttribute(r, e)
            }
            var r = t.window
              , i = r.document
              , a = r.devicePixelRatio || 1;
            u.exports = {
                create_canvas: function(t, r) {
                    var e = n("canvas");
                    return o(e, "width", t * r),
                    o(e, "height", t * r),
                    e.style.width = "".concat(t, "px"),
                    e.style.height = "".concat(t, "px"),
                    e
                },
                canvas_to_img: function(t) {
                    var r = n("img");
                    return o(r, "crossorigin", "anonymous"),
                    o(r, "src", t.toDataURL("image/png")),
                    o(r, "width", e(t, "width")),
                    o(r, "height", e(t, "height")),
                    r.style.width = t.style.width,
                    r.style.height = t.style.height,
                    r
                },
                dpr: a
            }
        }
        ).call(this, r(2))
    }
    , function(t, r) {
        var e;
        e = function() {
            return this
        }();
        try {
            e = e || new Function("return this")()
        } catch (t) {
            "object" == typeof window && (e = window)
        }
        t.exports = e
    }
    , function(t, r) {
        t.exports = {
            render: "image",
            crisp: !0,
            minVersion: 1,
            ecLevel: "L",
            size: 200,
            ratio: null,
            fill: "#333",
            back: "#fff",
            text: "no text",
            rounded: 0,
            quiet: 0,
            mode: "plain",
            mSize: 30,
            mPosX: 50,
            mPosY: 50,
            label: "no label",
            fontname: "sans",
            fontcolor: "#333",
            image: null
        }
    }
    , function(t, r, e) {
        function a(t) {
            return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            )(t)
        }
        var u = /code length overflow/i
          , f = e(5);
        f.stringToBytes = f.stringToBytesFuncs["UTF-8"];
        t.exports = function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ""
              , r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "L"
              , e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1
              , n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0
              , o = function(t, r) {
                for (var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1, o = e = Math.max(1, e); o <= 40; o += 1)
                    try {
                        var n = function() {
                            var e = f(o, r);
                            e.addData(t),
                            e.make();
                            var n = e.getModuleCount();
                            return {
                                v: {
                                    text: t,
                                    level: r,
                                    version: o,
                                    moduleCount: n,
                                    isDark: function(t, r) {
                                        return 0 <= t && t < n && 0 <= r && r < n && e.isDark(t, r)
                                    }
                                }
                            }
                        }();
                        if ("object" === a(n))
                            return n.v
                    } catch (t) {
                        if (!(o < 40 && u.test(t)))
                            throw new Error(t)
                    }
                return null
            }(t, r, e);
            if (o) {
                var i = o.isDark;
                o.moduleCount += 2 * n,
                o.isDark = function(t, r) {
                    return i(t - n, r - n)
                }
            }
            return o
        }
    }
    , function(t, r, e) {
        var n, o, i, a = function() {
            function i(t, r) {
                function a(t, r) {
                    l = function(t) {
                        for (var r = new Array(t), e = 0; e < t; e += 1) {
                            r[e] = new Array(t);
                            for (var n = 0; n < t; n += 1)
                                r[e][n] = null
                        }
                        return r
                    }(s = 4 * u + 17),
                    e(0, 0),
                    e(s - 7, 0),
                    e(0, s - 7),
                    i(),
                    o(),
                    v(t, r),
                    7 <= u && g(t),
                    null == n && (n = p(u, f, c)),
                    d(n, r)
                }
                var u = t
                  , f = y[r]
                  , l = null
                  , s = 0
                  , n = null
                  , c = []
                  , h = {}
                  , e = function(t, r) {
                    for (var e = -1; e <= 7; e += 1)
                        if (!(t + e <= -1 || s <= t + e))
                            for (var n = -1; n <= 7; n += 1)
                                r + n <= -1 || s <= r + n || (l[t + e][r + n] = 0 <= e && e <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == e || 6 == e) || 2 <= e && e <= 4 && 2 <= n && n <= 4)
                }
                  , o = function() {
                    for (var t = 8; t < s - 8; t += 1)
                        null == l[t][6] && (l[t][6] = t % 2 == 0);
                    for (var r = 8; r < s - 8; r += 1)
                        null == l[6][r] && (l[6][r] = r % 2 == 0)
                }
                  , i = function() {
                    for (var t = w.getPatternPosition(u), r = 0; r < t.length; r += 1)
                        for (var e = 0; e < t.length; e += 1) {
                            var n = t[r]
                              , o = t[e];
                            if (null == l[n][o])
                                for (var i = -2; i <= 2; i += 1)
                                    for (var a = -2; a <= 2; a += 1)
                                        l[n + i][o + a] = -2 == i || 2 == i || -2 == a || 2 == a || 0 == i && 0 == a
                        }
                }
                  , g = function(t) {
                    for (var r = w.getBCHTypeNumber(u), e = 0; e < 18; e += 1) {
                        var n = !t && 1 == (r >> e & 1);
                        l[Math.floor(e / 3)][e % 3 + s - 8 - 3] = n
                    }
                    for (e = 0; e < 18; e += 1) {
                        n = !t && 1 == (r >> e & 1);
                        l[e % 3 + s - 8 - 3][Math.floor(e / 3)] = n
                    }
                }
                  , v = function(t, r) {
                    for (var e = f << 3 | r, n = w.getBCHTypeInfo(e), o = 0; o < 15; o += 1) {
                        var i = !t && 1 == (n >> o & 1);
                        o < 6 ? l[o][8] = i : o < 8 ? l[o + 1][8] = i : l[s - 15 + o][8] = i
                    }
                    for (o = 0; o < 15; o += 1) {
                        i = !t && 1 == (n >> o & 1);
                        o < 8 ? l[8][s - o - 1] = i : o < 9 ? l[8][15 - o - 1 + 1] = i : l[8][15 - o - 1] = i
                    }
                    l[s - 8][8] = !t
                }
                  , d = function(t, r) {
                    for (var e = -1, n = s - 1, o = 7, i = 0, a = w.getMaskFunction(r), u = s - 1; 0 < u; u -= 2)
                        for (6 == u && (u -= 1); ; ) {
                            for (var f = 0; f < 2; f += 1)
                                if (null == l[n][u - f]) {
                                    var c = !1;
                                    i < t.length && (c = 1 == (t[i] >>> o & 1)),
                                    a(n, u - f) && (c = !c),
                                    l[n][u - f] = c,
                                    -1 == (o -= 1) && (i += 1,
                                    o = 7)
                                }
                            if ((n += e) < 0 || s <= n) {
                                n -= e,
                                e = -e;
                                break
                            }
                        }
                }
                  , p = function(t, r, e) {
                    for (var n = B.getRSBlocks(t, r), o = C(), i = 0; i < e.length; i += 1) {
                        var a = e[i];
                        o.put(a.getMode(), 4),
                        o.put(a.getLength(), w.getLengthInBits(a.getMode(), t)),
                        a.write(o)
                    }
                    var u = 0;
                    for (i = 0; i < n.length; i += 1)
                        u += n[i].dataCount;
                    if (o.getLengthInBits() > 8 * u)
                        throw "code length overflow. (" + o.getLengthInBits() + ">" + 8 * u + ")";
                    for (o.getLengthInBits() + 4 <= 8 * u && o.put(0, 4); o.getLengthInBits() % 8 != 0; )
                        o.putBit(!1);
                    for (; !(o.getLengthInBits() >= 8 * u || (o.put(236, 8),
                    o.getLengthInBits() >= 8 * u)); )
                        o.put(17, 8);
                    return function(t, r) {
                        for (var e = 0, n = 0, o = 0, i = new Array(r.length), a = new Array(r.length), u = 0; u < r.length; u += 1) {
                            var f = r[u].dataCount
                              , c = r[u].totalCount - f;
                            n = Math.max(n, f),
                            o = Math.max(o, c),
                            i[u] = new Array(f);
                            for (var l = 0; l < i[u].length; l += 1)
                                i[u][l] = 255 & t.getBuffer()[l + e];
                            e += f;
                            var s = w.getErrorCorrectPolynomial(c)
                              , g = m(i[u], s.getLength() - 1).mod(s);
                            for (a[u] = new Array(s.getLength() - 1),
                            l = 0; l < a[u].length; l += 1) {
                                var h = l + g.getLength() - a[u].length;
                                a[u][l] = 0 <= h ? g.getAt(h) : 0
                            }
                        }
                        var v = 0;
                        for (l = 0; l < r.length; l += 1)
                            v += r[l].totalCount;
                        var d = new Array(v)
                          , p = 0;
                        for (l = 0; l < n; l += 1)
                            for (u = 0; u < r.length; u += 1)
                                l < i[u].length && (d[p] = i[u][l],
                                p += 1);
                        for (l = 0; l < o; l += 1)
                            for (u = 0; u < r.length; u += 1)
                                l < a[u].length && (d[p] = a[u][l],
                                p += 1);
                        return d
                    }(o, n)
                };
                return h.addData = function(t, r) {
                    var e = null;
                    switch (r = r || "Byte") {
                    case "Numeric":
                        e = x(t);
                        break;
                    case "Alphanumeric":
                        e = A(t);
                        break;
                    case "Byte":
                        e = M(t);
                        break;
                    case "Kanji":
                        e = S(t);
                        break;
                    default:
                        throw "mode:" + r
                    }
                    c.push(e),
                    n = null
                }
                ,
                h.isDark = function(t, r) {
                    if (t < 0 || s <= t || r < 0 || s <= r)
                        throw t + "," + r;
                    return l[t][r]
                }
                ,
                h.getModuleCount = function() {
                    return s
                }
                ,
                h.make = function() {
                    if (u < 1) {
                        for (var t = 1; t < 40; t++) {
                            for (var r = B.getRSBlocks(t, f), e = C(), n = 0; n < c.length; n++) {
                                var o = c[n];
                                e.put(o.getMode(), 4),
                                e.put(o.getLength(), w.getLengthInBits(o.getMode(), t)),
                                o.write(e)
                            }
                            var i = 0;
                            for (n = 0; n < r.length; n++)
                                i += r[n].dataCount;
                            if (e.getLengthInBits() <= 8 * i)
                                break
                        }
                        u = t
                    }
                    a(!1, function() {
                        for (var t = 0, r = 0, e = 0; e < 8; e += 1) {
                            a(!0, e);
                            var n = w.getLostPoint(h);
                            (0 == e || n < t) && (t = n,
                            r = e)
                        }
                        return r
                    }())
                }
                ,
                h.createTableTag = function(t, r) {
                    t = t || 2;
                    var e = "";
                    e += '<table style="',
                    e += " border-width: 0px; border-style: none;",
                    e += " border-collapse: collapse;",
                    e += " padding: 0px; margin: " + (r = void 0 === r ? 4 * t : r) + "px;",
                    e += '">',
                    e += "<tbody>";
                    for (var n = 0; n < h.getModuleCount(); n += 1) {
                        e += "<tr>";
                        for (var o = 0; o < h.getModuleCount(); o += 1)
                            e += '<td style="',
                            e += " border-width: 0px; border-style: none;",
                            e += " border-collapse: collapse;",
                            e += " padding: 0px; margin: 0px;",
                            e += " width: " + t + "px;",
                            e += " height: " + t + "px;",
                            e += " background-color: ",
                            e += h.isDark(n, o) ? "#000000" : "#ffffff",
                            e += ";",
                            e += '"/>';
                        e += "</tr>"
                    }
                    return e += "</tbody>",
                    e += "</table>"
                }
                ,
                h.createSvgTag = function(t, r) {
                    var e = {};
                    "object" == typeof t && (t = (e = t).cellSize,
                    r = e.margin),
                    t = t || 2,
                    r = void 0 === r ? 4 * t : r;
                    var n, o, i, a, u = h.getModuleCount() * t + 2 * r, f = "";
                    for (a = "l" + t + ",0 0," + t + " -" + t + ",0 0,-" + t + "z ",
                    f += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',
                    f += e.scalable ? "" : ' width="' + u + 'px" height="' + u + 'px"',
                    f += ' viewBox="0 0 ' + u + " " + u + '" ',
                    f += ' preserveAspectRatio="xMinYMin meet">',
                    f += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',
                    f += '<path d="',
                    o = 0; o < h.getModuleCount(); o += 1)
                        for (i = o * t + r,
                        n = 0; n < h.getModuleCount(); n += 1)
                            h.isDark(o, n) && (f += "M" + (n * t + r) + "," + i + a);
                    return f += '" stroke="transparent" fill="black"/>',
                    f += "</svg>"
                }
                ,
                h.createDataURL = function(o, t) {
                    o = o || 2,
                    t = void 0 === t ? 4 * o : t;
                    var r = h.getModuleCount() * o + 2 * t
                      , i = t
                      , a = r - t;
                    return D(r, r, function(t, r) {
                        if (i <= t && t < a && i <= r && r < a) {
                            var e = Math.floor((t - i) / o)
                              , n = Math.floor((r - i) / o);
                            return h.isDark(n, e) ? 0 : 1
                        }
                        return 1
                    })
                }
                ,
                h.createImgTag = function(t, r, e) {
                    t = t || 2,
                    r = void 0 === r ? 4 * t : r;
                    var n = h.getModuleCount() * t + 2 * r
                      , o = "";
                    return o += "<img",
                    o += ' src="',
                    o += h.createDataURL(t, r),
                    o += '"',
                    o += ' width="',
                    o += n,
                    o += '"',
                    o += ' height="',
                    o += n,
                    o += '"',
                    e && (o += ' alt="',
                    o += e,
                    o += '"'),
                    o += "/>"
                }
                ,
                h.createASCII = function(t, r) {
                    if ((t = t || 1) < 2)
                        return function(t) {
                            t = void 0 === t ? 2 : t;
                            var r, e, n, o, i, a = 1 * h.getModuleCount() + 2 * t, u = t, f = a - t, c = {
                                "██": "█",
                                "█ ": "▀",
                                " █": "▄",
                                "  ": " "
                            }, l = {
                                "██": "▀",
                                "█ ": "▀",
                                " █": " ",
                                "  ": " "
                            }, s = "";
                            for (r = 0; r < a; r += 2) {
                                for (n = Math.floor((r - u) / 1),
                                o = Math.floor((r + 1 - u) / 1),
                                e = 0; e < a; e += 1)
                                    i = "█",
                                    u <= e && e < f && u <= r && r < f && h.isDark(n, Math.floor((e - u) / 1)) && (i = " "),
                                    u <= e && e < f && u <= r + 1 && r + 1 < f && h.isDark(o, Math.floor((e - u) / 1)) ? i += " " : i += "█",
                                    s += t < 1 && f <= r + 1 ? l[i] : c[i];
                                s += "\n"
                            }
                            return a % 2 && 0 < t ? s.substring(0, s.length - a - 1) + Array(1 + a).join("▀") : s.substring(0, s.length - 1)
                        }(r);
                    t -= 1,
                    r = void 0 === r ? 2 * t : r;
                    var e, n, o, i, a = h.getModuleCount() * t + 2 * r, u = r, f = a - r, c = Array(t + 1).join("██"), l = Array(t + 1).join("  "), s = "", g = "";
                    for (e = 0; e < a; e += 1) {
                        for (o = Math.floor((e - u) / t),
                        g = "",
                        n = 0; n < a; n += 1)
                            i = 1,
                            u <= n && n < f && u <= e && e < f && h.isDark(o, Math.floor((n - u) / t)) && (i = 0),
                            g += i ? c : l;
                        for (o = 0; o < t; o += 1)
                            s += g + "\n"
                    }
                    return s.substring(0, s.length - 1)
                }
                ,
                h.renderTo2dContext = function(t, r) {
                    r = r || 2;
                    for (var e = h.getModuleCount(), n = 0; n < e; n++)
                        for (var o = 0; o < e; o++)
                            t.fillStyle = h.isDark(n, o) ? "black" : "white",
                            t.fillRect(n * r, o * r, r, r)
                }
                ,
                h
            }
            i.stringToBytes = (i.stringToBytesFuncs = {
                default: function(t) {
                    for (var r = [], e = 0; e < t.length; e += 1) {
                        var n = t.charCodeAt(e);
                        r.push(255 & n)
                    }
                    return r
                }
            }).default,
            i.createStringToBytes = function(u, f) {
                var i = function() {
                    function t() {
                        var t = r.read();
                        if (-1 == t)
                            throw "eof";
                        return t
                    }
                    for (var r = L(u), e = 0, n = {}; ; ) {
                        var o = r.read();
                        if (-1 == o)
                            break;
                        var i = t()
                          , a = t() << 8 | t();
                        n[String.fromCharCode(o << 8 | i)] = a,
                        e += 1
                    }
                    if (e != f)
                        throw e + " != " + f;
                    return n
                }()
                  , a = "?".charCodeAt(0);
                return function(t) {
                    for (var r = [], e = 0; e < t.length; e += 1) {
                        var n = t.charCodeAt(e);
                        if (n < 128)
                            r.push(n);
                        else {
                            var o = i[t.charAt(e)];
                            "number" == typeof o ? (255 & o) == o ? r.push(o) : (r.push(o >>> 8),
                            r.push(255 & o)) : r.push(a)
                        }
                    }
                    return r
                }
            }
            ;
            var a = 1
              , u = 2
              , o = 4
              , f = 8
              , y = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            }
              , n = 0
              , c = 1
              , l = 2
              , s = 3
              , g = 4
              , h = 5
              , v = 6
              , d = 7
              , w = function() {
                function e(t) {
                    for (var r = 0; 0 != t; )
                        r += 1,
                        t >>>= 1;
                    return r
                }
                var r = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]]
                  , t = {};
                return t.getBCHTypeInfo = function(t) {
                    for (var r = t << 10; 0 <= e(r) - e(1335); )
                        r ^= 1335 << e(r) - e(1335);
                    return 21522 ^ (t << 10 | r)
                }
                ,
                t.getBCHTypeNumber = function(t) {
                    for (var r = t << 12; 0 <= e(r) - e(7973); )
                        r ^= 7973 << e(r) - e(7973);
                    return t << 12 | r
                }
                ,
                t.getPatternPosition = function(t) {
                    return r[t - 1]
                }
                ,
                t.getMaskFunction = function(t) {
                    switch (t) {
                    case n:
                        return function(t, r) {
                            return (t + r) % 2 == 0
                        }
                        ;
                    case c:
                        return function(t, r) {
                            return t % 2 == 0
                        }
                        ;
                    case l:
                        return function(t, r) {
                            return r % 3 == 0
                        }
                        ;
                    case s:
                        return function(t, r) {
                            return (t + r) % 3 == 0
                        }
                        ;
                    case g:
                        return function(t, r) {
                            return (Math.floor(t / 2) + Math.floor(r / 3)) % 2 == 0
                        }
                        ;
                    case h:
                        return function(t, r) {
                            return t * r % 2 + t * r % 3 == 0
                        }
                        ;
                    case v:
                        return function(t, r) {
                            return (t * r % 2 + t * r % 3) % 2 == 0
                        }
                        ;
                    case d:
                        return function(t, r) {
                            return (t * r % 3 + (t + r) % 2) % 2 == 0
                        }
                        ;
                    default:
                        throw "bad maskPattern:" + t
                    }
                }
                ,
                t.getErrorCorrectPolynomial = function(t) {
                    for (var r = m([1], 0), e = 0; e < t; e += 1)
                        r = r.multiply(m([1, p.gexp(e)], 0));
                    return r
                }
                ,
                t.getLengthInBits = function(t, r) {
                    if (1 <= r && r < 10)
                        switch (t) {
                        case a:
                            return 10;
                        case u:
                            return 9;
                        case o:
                        case f:
                            return 8;
                        default:
                            throw "mode:" + t
                        }
                    else if (r < 27)
                        switch (t) {
                        case a:
                            return 12;
                        case u:
                            return 11;
                        case o:
                            return 16;
                        case f:
                            return 10;
                        default:
                            throw "mode:" + t
                        }
                    else {
                        if (!(r < 41))
                            throw "type:" + r;
                        switch (t) {
                        case a:
                            return 14;
                        case u:
                            return 13;
                        case o:
                            return 16;
                        case f:
                            return 12;
                        default:
                            throw "mode:" + t
                        }
                    }
                }
                ,
                t.getLostPoint = function(t) {
                    for (var r = t.getModuleCount(), e = 0, n = 0; n < r; n += 1)
                        for (var o = 0; o < r; o += 1) {
                            for (var i = 0, a = t.isDark(n, o), u = -1; u <= 1; u += 1)
                                if (!(n + u < 0 || r <= n + u))
                                    for (var f = -1; f <= 1; f += 1)
                                        o + f < 0 || r <= o + f || 0 == u && 0 == f || a == t.isDark(n + u, o + f) && (i += 1);
                            5 < i && (e += 3 + i - 5)
                        }
                    for (n = 0; n < r - 1; n += 1)
                        for (o = 0; o < r - 1; o += 1) {
                            var c = 0;
                            t.isDark(n, o) && (c += 1),
                            t.isDark(n + 1, o) && (c += 1),
                            t.isDark(n, o + 1) && (c += 1),
                            t.isDark(n + 1, o + 1) && (c += 1),
                            0 != c && 4 != c || (e += 3)
                        }
                    for (n = 0; n < r; n += 1)
                        for (o = 0; o < r - 6; o += 1)
                            t.isDark(n, o) && !t.isDark(n, o + 1) && t.isDark(n, o + 2) && t.isDark(n, o + 3) && t.isDark(n, o + 4) && !t.isDark(n, o + 5) && t.isDark(n, o + 6) && (e += 40);
                    for (o = 0; o < r; o += 1)
                        for (n = 0; n < r - 6; n += 1)
                            t.isDark(n, o) && !t.isDark(n + 1, o) && t.isDark(n + 2, o) && t.isDark(n + 3, o) && t.isDark(n + 4, o) && !t.isDark(n + 5, o) && t.isDark(n + 6, o) && (e += 40);
                    var l = 0;
                    for (o = 0; o < r; o += 1)
                        for (n = 0; n < r; n += 1)
                            t.isDark(n, o) && (l += 1);
                    return e += 10 * (Math.abs(100 * l / r / r - 50) / 5)
                }
                ,
                t
            }()
              , p = function() {
                for (var r = new Array(256), e = new Array(256), t = 0; t < 8; t += 1)
                    r[t] = 1 << t;
                for (t = 8; t < 256; t += 1)
                    r[t] = r[t - 4] ^ r[t - 5] ^ r[t - 6] ^ r[t - 8];
                for (t = 0; t < 255; t += 1)
                    e[r[t]] = t;
                var n = {
                    glog: function(t) {
                        if (t < 1)
                            throw "glog(" + t + ")";
                        return e[t]
                    },
                    gexp: function(t) {
                        for (; t < 0; )
                            t += 255;
                        for (; 256 <= t; )
                            t -= 255;
                        return r[t]
                    }
                };
                return n
            }();
            function m(n, o) {
                if (void 0 === n.length)
                    throw n.length + "/" + o;
                var r = function() {
                    for (var t = 0; t < n.length && 0 == n[t]; )
                        t += 1;
                    for (var r = new Array(n.length - t + o), e = 0; e < n.length - t; e += 1)
                        r[e] = n[e + t];
                    return r
                }()
                  , i = {
                    getAt: function(t) {
                        return r[t]
                    },
                    getLength: function() {
                        return r.length
                    },
                    multiply: function(t) {
                        for (var r = new Array(i.getLength() + t.getLength() - 1), e = 0; e < i.getLength(); e += 1)
                            for (var n = 0; n < t.getLength(); n += 1)
                                r[e + n] ^= p.gexp(p.glog(i.getAt(e)) + p.glog(t.getAt(n)));
                        return m(r, 0)
                    },
                    mod: function(t) {
                        if (i.getLength() - t.getLength() < 0)
                            return i;
                        for (var r = p.glog(i.getAt(0)) - p.glog(t.getAt(0)), e = new Array(i.getLength()), n = 0; n < i.getLength(); n += 1)
                            e[n] = i.getAt(n);
                        for (n = 0; n < t.getLength(); n += 1)
                            e[n] ^= p.gexp(p.glog(t.getAt(n)) + r);
                        return m(e, 0).mod(t)
                    }
                };
                return i
            }
            function b() {
                var e = []
                  , o = {
                    writeByte: function(t) {
                        e.push(255 & t)
                    },
                    writeShort: function(t) {
                        o.writeByte(t),
                        o.writeByte(t >>> 8)
                    },
                    writeBytes: function(t, r, e) {
                        r = r || 0,
                        e = e || t.length;
                        for (var n = 0; n < e; n += 1)
                            o.writeByte(t[n + r])
                    },
                    writeString: function(t) {
                        for (var r = 0; r < t.length; r += 1)
                            o.writeByte(t.charCodeAt(r))
                    },
                    toByteArray: function() {
                        return e
                    },
                    toString: function() {
                        var t = "";
                        t += "[";
                        for (var r = 0; r < e.length; r += 1)
                            0 < r && (t += ","),
                            t += e[r];
                        return t += "]"
                    }
                };
                return o
            }
            var k, t, B = (k = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
            (t = {}).getRSBlocks = function(t, r) {
                var e = function(t, r) {
                    switch (r) {
                    case y.L:
                        return k[4 * (t - 1) + 0];
                    case y.M:
                        return k[4 * (t - 1) + 1];
                    case y.Q:
                        return k[4 * (t - 1) + 2];
                    case y.H:
                        return k[4 * (t - 1) + 3];
                    default:
                        return
                    }
                }(t, r);
                if (void 0 === e)
                    throw "bad rs block @ typeNumber:" + t + "/errorCorrectionLevel:" + r;
                for (var n, o, i = e.length / 3, a = [], u = 0; u < i; u += 1)
                    for (var f = e[3 * u + 0], c = e[3 * u + 1], l = e[3 * u + 2], s = 0; s < f; s += 1)
                        a.push((n = l,
                        o = void 0,
                        (o = {}).totalCount = c,
                        o.dataCount = n,
                        o));
                return a
            }
            ,
            t), C = function() {
                var e = []
                  , n = 0
                  , o = {
                    getBuffer: function() {
                        return e
                    },
                    getAt: function(t) {
                        var r = Math.floor(t / 8);
                        return 1 == (e[r] >>> 7 - t % 8 & 1)
                    },
                    put: function(t, r) {
                        for (var e = 0; e < r; e += 1)
                            o.putBit(1 == (t >>> r - e - 1 & 1))
                    },
                    getLengthInBits: function() {
                        return n
                    },
                    putBit: function(t) {
                        var r = Math.floor(n / 8);
                        e.length <= r && e.push(0),
                        t && (e[r] |= 128 >>> n % 8),
                        n += 1
                    }
                };
                return o
            }, x = function(t) {
                var r = a
                  , n = t
                  , e = {
                    getMode: function() {
                        return r
                    },
                    getLength: function(t) {
                        return n.length
                    },
                    write: function(t) {
                        for (var r = n, e = 0; e + 2 < r.length; )
                            t.put(o(r.substring(e, e + 3)), 10),
                            e += 3;
                        e < r.length && (r.length - e == 1 ? t.put(o(r.substring(e, e + 1)), 4) : r.length - e == 2 && t.put(o(r.substring(e, e + 2)), 7))
                    }
                }
                  , o = function(t) {
                    for (var r = 0, e = 0; e < t.length; e += 1)
                        r = 10 * r + i(t.charAt(e));
                    return r
                }
                  , i = function(t) {
                    if ("0" <= t && t <= "9")
                        return t.charCodeAt(0) - "0".charCodeAt(0);
                    throw "illegal char :" + t
                };
                return e
            }, A = function(t) {
                var r = u
                  , n = t
                  , e = {
                    getMode: function() {
                        return r
                    },
                    getLength: function(t) {
                        return n.length
                    },
                    write: function(t) {
                        for (var r = n, e = 0; e + 1 < r.length; )
                            t.put(45 * o(r.charAt(e)) + o(r.charAt(e + 1)), 11),
                            e += 2;
                        e < r.length && t.put(o(r.charAt(e)), 6)
                    }
                }
                  , o = function(t) {
                    if ("0" <= t && t <= "9")
                        return t.charCodeAt(0) - "0".charCodeAt(0);
                    if ("A" <= t && t <= "Z")
                        return t.charCodeAt(0) - "A".charCodeAt(0) + 10;
                    switch (t) {
                    case " ":
                        return 36;
                    case "$":
                        return 37;
                    case "%":
                        return 38;
                    case "*":
                        return 39;
                    case "+":
                        return 40;
                    case "-":
                        return 41;
                    case ".":
                        return 42;
                    case "/":
                        return 43;
                    case ":":
                        return 44;
                    default:
                        throw "illegal char :" + t
                    }
                };
                return e
            }, M = function(t) {
                var r = o
                  , e = i.stringToBytes(t)
                  , n = {
                    getMode: function() {
                        return r
                    },
                    getLength: function(t) {
                        return e.length
                    },
                    write: function(t) {
                        for (var r = 0; r < e.length; r += 1)
                            t.put(e[r], 8)
                    }
                };
                return n
            }, S = function(t) {
                var r = f
                  , n = i.stringToBytesFuncs.SJIS;
                if (!n)
                    throw "sjis not supported.";
                !function(t, r) {
                    var e = n("友");
                    if (2 != e.length || 38726 != (e[0] << 8 | e[1]))
                        throw "sjis not supported."
                }();
                var o = n(t)
                  , e = {
                    getMode: function() {
                        return r
                    },
                    getLength: function(t) {
                        return ~~(o.length / 2)
                    },
                    write: function(t) {
                        for (var r = o, e = 0; e + 1 < r.length; ) {
                            var n = (255 & r[e]) << 8 | 255 & r[e + 1];
                            if (33088 <= n && n <= 40956)
                                n -= 33088;
                            else {
                                if (!(57408 <= n && n <= 60351))
                                    throw "illegal char at " + (e + 1) + "/" + n;
                                n -= 49472
                            }
                            n = 192 * (n >>> 8 & 255) + (255 & n),
                            t.put(n, 13),
                            e += 2
                        }
                        if (e < r.length)
                            throw "illegal char at " + (e + 1)
                    }
                };
                return e
            }, L = function(t) {
                var e = t
                  , n = 0
                  , o = 0
                  , i = 0
                  , r = {
                    read: function() {
                        for (; i < 8; ) {
                            if (n >= e.length) {
                                if (0 == i)
                                    return -1;
                                throw "unexpected end of file./" + i
                            }
                            var t = e.charAt(n);
                            if (n += 1,
                            "=" == t)
                                return i = 0,
                                -1;
                            t.match(/^\s$/) || (o = o << 6 | a(t.charCodeAt(0)),
                            i += 6)
                        }
                        var r = o >>> i - 8 & 255;
                        return i -= 8,
                        r
                    }
                }
                  , a = function(t) {
                    if (65 <= t && t <= 90)
                        return t - 65;
                    if (97 <= t && t <= 122)
                        return t - 97 + 26;
                    if (48 <= t && t <= 57)
                        return t - 48 + 52;
                    if (43 == t)
                        return 62;
                    if (47 == t)
                        return 63;
                    throw "c:" + t
                };
                return r
            }, D = function(t, r, e) {
                for (var n = function(t, r) {
                    var n = t
                      , o = r
                      , s = new Array(t * r)
                      , e = {
                        setPixel: function(t, r, e) {
                            s[r * n + t] = e
                        },
                        write: function(t) {
                            t.writeString("GIF87a"),
                            t.writeShort(n),
                            t.writeShort(o),
                            t.writeByte(128),
                            t.writeByte(0),
                            t.writeByte(0),
                            t.writeByte(0),
                            t.writeByte(0),
                            t.writeByte(0),
                            t.writeByte(255),
                            t.writeByte(255),
                            t.writeByte(255),
                            t.writeString(","),
                            t.writeShort(0),
                            t.writeShort(0),
                            t.writeShort(n),
                            t.writeShort(o),
                            t.writeByte(0);
                            var r = i(2);
                            t.writeByte(2);
                            for (var e = 0; 255 < r.length - e; )
                                t.writeByte(255),
                                t.writeBytes(r, e, 255),
                                e += 255;
                            t.writeByte(r.length - e),
                            t.writeBytes(r, e, r.length - e),
                            t.writeByte(0),
                            t.writeString(";")
                        }
                    }
                      , i = function(t) {
                        for (var r = 1 << t, e = 1 + (1 << t), n = t + 1, o = g(), i = 0; i < r; i += 1)
                            o.add(String.fromCharCode(i));
                        o.add(String.fromCharCode(r)),
                        o.add(String.fromCharCode(e));
                        var a = b()
                          , u = function(t) {
                            var e = t
                              , n = 0
                              , o = 0
                              , r = {
                                write: function(t, r) {
                                    if (t >>> r != 0)
                                        throw "length over";
                                    for (; 8 <= n + r; )
                                        e.writeByte(255 & (t << n | o)),
                                        r -= 8 - n,
                                        t >>>= 8 - n,
                                        n = o = 0;
                                    o |= t << n,
                                    n += r
                                },
                                flush: function() {
                                    0 < n && e.writeByte(o)
                                }
                            };
                            return r
                        }(a);
                        u.write(r, n);
                        var f = 0
                          , c = String.fromCharCode(s[f]);
                        for (f += 1; f < s.length; ) {
                            var l = String.fromCharCode(s[f]);
                            f += 1,
                            o.contains(c + l) ? c += l : (u.write(o.indexOf(c), n),
                            o.size() < 4095 && (o.size() == 1 << n && (n += 1),
                            o.add(c + l)),
                            c = l)
                        }
                        return u.write(o.indexOf(c), n),
                        u.write(e, n),
                        u.flush(),
                        a.toByteArray()
                    }
                      , g = function() {
                        var r = {}
                          , e = 0
                          , n = {
                            add: function(t) {
                                if (n.contains(t))
                                    throw "dup key:" + t;
                                r[t] = e,
                                e += 1
                            },
                            size: function() {
                                return e
                            },
                            indexOf: function(t) {
                                return r[t]
                            },
                            contains: function(t) {
                                return void 0 !== r[t]
                            }
                        };
                        return n
                    };
                    return e
                }(t, r), o = 0; o < r; o += 1)
                    for (var i = 0; i < t; i += 1)
                        n.setPixel(i, o, e(i, o));
                var a = b();
                n.write(a);
                for (var u = function() {
                    function e(t) {
                        a += String.fromCharCode(r(63 & t))
                    }
                    var n = 0
                      , o = 0
                      , i = 0
                      , a = ""
                      , t = {}
                      , r = function(t) {
                        if (t < 0)
                            ;
                        else {
                            if (t < 26)
                                return 65 + t;
                            if (t < 52)
                                return t - 26 + 97;
                            if (t < 62)
                                return t - 52 + 48;
                            if (62 == t)
                                return 43;
                            if (63 == t)
                                return 47
                        }
                        throw "n:" + t
                    };
                    return t.writeByte = function(t) {
                        for (n = n << 8 | 255 & t,
                        o += 8,
                        i += 1; 6 <= o; )
                            e(n >>> o - 6),
                            o -= 6
                    }
                    ,
                    t.flush = function() {
                        if (0 < o && (e(n << 6 - o),
                        o = n = 0),
                        i % 3 != 0)
                            for (var t = 3 - i % 3, r = 0; r < t; r += 1)
                                a += "="
                    }
                    ,
                    t.toString = function() {
                        return a
                    }
                    ,
                    t
                }(), f = a.toByteArray(), c = 0; c < f.length; c += 1)
                    u.writeByte(f[c]);
                return u.flush(),
                "data:image/gif;base64," + u
            };
            return i
        }();
        a.stringToBytesFuncs["UTF-8"] = function(t) {
            return function(t) {
                for (var r = [], e = 0; e < t.length; e++) {
                    var n = t.charCodeAt(e);
                    n < 128 ? r.push(n) : n < 2048 ? r.push(192 | n >> 6, 128 | 63 & n) : n < 55296 || 57344 <= n ? r.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (e++,
                    n = 65536 + ((1023 & n) << 10 | 1023 & t.charCodeAt(e)),
                    r.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
                }
                return r
            }(t)
        }
        ,
        o = [],
        void 0 === (i = "function" == typeof (n = function() {
            return a
        }
        ) ? n.apply(r, o) : n) || (t.exports = i)
    }
    , function(t, r, e) {
        function c(t, r, e, n, o, i) {
            t.isDark(o, i) && r.rect(i * n, o * n, n, n)
        }
        var l = e(7)
          , n = e(8);
        t.exports = function(t, r, e) {
            !function(t, r) {
                t.fillStyle = r.back,
                t.fillRect(0, 0, r.size, r.size)
            }(r, e),
            function(t, r, e) {
                if (t) {
                    var n = 0 < e.rounded && e.rounded <= 100 ? l : c
                      , o = t.moduleCount
                      , i = e.size / o
                      , a = 0;
                    e.crisp && (i = Math.floor(i),
                    a = Math.floor((e.size - i * o) / 2)),
                    r.translate(a, a),
                    r.beginPath();
                    for (var u = 0; u < o; u += 1)
                        for (var f = 0; f < o; f += 1)
                            n(t, r, e, i, u, f);
                    r.fillStyle = e.fill,
                    r.fill(),
                    r.translate(-a, -a)
                }
            }(t, r, e),
            n(r, e)
        }
    }
    , function(t, r) {
        t.exports = function(t, r, e, n, o, i) {
            var a = i * n
              , u = o * n
              , f = a + n
              , c = u + n
              , l = .005 * e.rounded * n
              , s = t.isDark
              , g = o - 1
              , h = o + 1
              , v = i - 1
              , d = i + 1
              , p = s(o, i)
              , y = s(g, v)
              , w = s(g, i)
              , m = s(g, d)
              , b = s(o, d)
              , k = s(h, d)
              , B = s(h, i)
              , C = s(h, v)
              , x = s(o, v);
            r = function(t) {
                return {
                    c: t,
                    m: function() {
                        var t;
                        return (t = this.c).moveTo.apply(t, arguments),
                        this
                    },
                    l: function() {
                        var t;
                        return (t = this.c).lineTo.apply(t, arguments),
                        this
                    },
                    a: function() {
                        var t;
                        return (t = this.c).arcTo.apply(t, arguments),
                        this
                    }
                }
            }(r),
            p ? function(t, r, e, n, o, i, a, u, f, c) {
                a ? t.m(r + i, e) : t.m(r, e),
                u ? t.l(n - i, e).a(n, e, n, o, i) : t.l(n, e),
                f ? t.l(n, o - i).a(n, o, r, o, i) : t.l(n, o),
                c ? t.l(r + i, o).a(r, o, r, e, i) : t.l(r, o),
                a ? t.l(r, e + i).a(r, e, n, e, i) : t.l(r, e)
            }(r, a, u, f, c, l, !w && !x, !w && !b, !B && !b, !B && !x) : function(t, r, e, n, o, i, a, u, f, c) {
                a && t.m(r + i, e).l(r, e).l(r, e + i).a(r, e, r + i, e, i),
                u && t.m(n - i, e).l(n, e).l(n, e + i).a(n, e, n - i, e, i),
                f && t.m(n - i, o).l(n, o).l(n, o - i).a(n, o, n - i, o, i),
                c && t.m(r + i, o).l(r, o).l(r, o - i).a(r, o, r + i, o, i)
            }(r, a, u, f, c, l, w && x && y, w && b && m, B && b && k, B && x && C)
        }
    }
    , function(t, r) {
        t.exports = function(t, r) {
            var e = r.mode;
            "label" === e ? function(t, r) {
                var e = r.size
                  , n = "bold " + .01 * r.mSize * e + "px " + r.fontname;
                t.strokeStyle = r.back,
                t.lineWidth = .01 * r.mSize * e * .1,
                t.fillStyle = r.fontcolor,
                t.font = n;
                var o = t.measureText(r.label).width
                  , i = .01 * r.mSize
                  , a = (1 - o / e) * r.mPosX * .01 * e
                  , u = (1 - i) * r.mPosY * .01 * e + .75 * r.mSize * .01 * e;
                t.strokeText(r.label, a, u),
                t.fillText(r.label, a, u)
            }(t, r) : "image" === e && function(t, r) {
                var e = r.size
                  , n = r.image.naturalWidth || 1
                  , o = r.image.naturalHeight || 1
                  , i = .01 * r.mSize
                  , a = i * n / o
                  , u = (1 - a) * r.mPosX * .01 * e
                  , f = (1 - i) * r.mPosY * .01 * e
                  , c = a * e
                  , l = i * e;
                t.drawImage(r.image, u, f, c, l)
            }(t, r)
        }
    }
    ])
});
;IE.fModule({
    f: function(exports, require, module, global) {
        require('DeclarationJQuery.js');
        require('kjua.min.js');
    },
    fn: 'declarationqrcode.js'
});
;/** vmsg is licensed under [CC0](COPYING). https://github.com/Kagami/vmsg/blob/master/COPYING */
IE.fModule({
    f: function(exports, require, module, global) {
        "use strict";
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
        exports.record = record;
        exports.default = exports.Form = exports.Recorder = void 0;
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError('Cannot call a class as a function');
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value'in descriptor) {
                    descriptor.writable = true;
                }
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) {
                _defineProperties(Constructor.prototype, protoProps);
            }
            if (staticProps) {
                _defineProperties(Constructor, staticProps);
            }
            return Constructor;
        }
        function pad2(n) {
            n |= 0;
            return n < 10 ? "0".concat(n) : "".concat(Math.min(n, 99));
        }
        function inlineWorker() {
            function fetchAndInstantiate(url, imports) {
                if (!WebAssembly.instantiateStreaming)
                    return fetchAndInstantiateFallback(url, imports);
                var req = fetch(url, {
                    credentials: "same-origin"
                });
                return WebAssembly.instantiateStreaming(req, imports).catch(function(err) {
                    if (err.message && err.message.indexOf("Argument 0 must be provided and must be a Response") > 0) {
                        return fetchAndInstantiateFallback(url, imports);
                    } else {
                        throw err;
                    }
                });
            }
            function fetchAndInstantiateFallback(url, imports) {
                return new Promise(function(resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open("GET", url);
                    req.responseType = "arraybuffer";
                    req.onload = function() {
                        resolve(WebAssembly.instantiate(req.response, imports));
                    }
                    ;
                    req.onerror = reject;
                    req.send();
                }
                );
            }
            var TOTAL_STACK = 5 * 1024 * 1024;
            var TOTAL_MEMORY = 16 * 1024 * 1024;
            var WASM_PAGE_SIZE = 64 * 1024;
            var memory = null;
            var dynamicTop = TOTAL_STACK;
            function sbrk(increment) {
                var oldDynamicTop = dynamicTop;
                dynamicTop += increment;
                return oldDynamicTop;
            }
            function exit(status) {
                postMessage({
                    type: "internal-error",
                    data: status
                });
            }
            var FFI = null;
            var ref = null;
            var pcm_l = null;
            function vmsg_init(rate) {
                ref = FFI.vmsg_init(rate);
                if (!ref)
                    return false;
                var pcm_l_ref = new Uint32Array(memory.buffer,ref,1)[0];
                pcm_l = new Float32Array(memory.buffer,pcm_l_ref);
                return true;
            }
            function vmsg_encode(data) {
                pcm_l.set(data);
                return FFI.vmsg_encode(ref, data.length) >= 0;
            }
            function vmsg_flush() {
                if (FFI.vmsg_flush(ref) < 0)
                    return null;
                var mp3_ref = new Uint32Array(memory.buffer,ref + 4,1)[0];
                var size = new Uint32Array(memory.buffer,ref + 8,1)[0];
                var mp3 = new Uint8Array(memory.buffer,mp3_ref,size);
                var blob = new Blob([mp3],{
                    type: "audio/mpeg"
                });
                FFI.vmsg_free(ref);
                ref = null;
                pcm_l = null;
                return blob;
            }
            function testSafariWebAssemblyBug() {
                var bin = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 127, 1, 127, 3, 2, 1, 0, 5, 3, 1, 0, 1, 7, 8, 1, 4, 116, 101, 115, 116, 0, 0, 10, 16, 1, 14, 0, 32, 0, 65, 1, 54, 2, 0, 32, 0, 40, 2, 0, 11]);
                var mod = new WebAssembly.Module(bin);
                var inst = new WebAssembly.Instance(mod,{});
                return inst.exports.test(4) !== 0;
            }
            onmessage = function onmessage(e) {
                var msg = e.data;
                switch (msg.type) {
                case "init":
                    var _msg$data = msg.data
                      , wasmURL = _msg$data.wasmURL
                      , shimURL = _msg$data.shimURL;
                    Promise.resolve().then(function() {
                        if (self.WebAssembly && !testSafariWebAssemblyBug()) {
                            delete self.WebAssembly;
                        }
                        if (!self.WebAssembly) {
                            importScripts(shimURL);
                        }
                        memory = new WebAssembly.Memory({
                            initial: TOTAL_MEMORY / WASM_PAGE_SIZE,
                            maximum: TOTAL_MEMORY / WASM_PAGE_SIZE
                        });
                        return {
                            memory: memory,
                            pow: Math.pow,
                            exit: exit,
                            powf: Math.pow,
                            exp: Math.exp,
                            sqrtf: Math.sqrt,
                            cos: Math.cos,
                            log: Math.log,
                            sin: Math.sin,
                            sbrk: sbrk
                        };
                    }).then(function(Runtime) {
                        return fetchAndInstantiate(wasmURL, {
                            env: Runtime
                        });
                    }).then(function(wasm) {
                        FFI = wasm.instance.exports;
                        postMessage({
                            type: "init",
                            data: null
                        });
                    }).catch(function(err) {
                        postMessage({
                            type: "init-error",
                            data: err.toString()
                        });
                    });
                    break;
                case "start":
                    if (!vmsg_init(msg.data))
                        return postMessage({
                            type: "error",
                            data: "vmsg_init"
                        });
                    break;
                case "data":
                    if (!vmsg_encode(msg.data))
                        return postMessage({
                            type: "error",
                            data: "vmsg_encode"
                        });
                    break;
                case "stop":
                    var blob = vmsg_flush();
                    if (!blob)
                        return postMessage({
                            type: "error",
                            data: "vmsg_flush"
                        });
                    postMessage({
                        type: "stop",
                        data: blob
                    });
                    break;
                }
            }
            ;
        }
        var Recorder = function() {
            function Recorder() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var onStop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                _classCallCheck(this, Recorder);
                this.wasmURL = new URL(opts.wasmURL || "/static/js/vmsg.wasm",location).href;
                this.shimURL = new URL(opts.shimURL || "/static/js/wasm-polyfill.js",location).href;
                this.onStop = onStop;
                this.pitch = opts.pitch || 0;
                this.stream = null;
                this.audioCtx = null;
                this.gainNode = null;
                this.pitchFX = null;
                this.encNode = null;
                this.worker = null;
                this.workerURL = null;
                this.blob = null;
                this.blobURL = null;
                this.resolve = null;
                this.reject = null;
                Object.seal(this);
            }
            _createClass(Recorder, [{
                key: "close",
                value: function close() {
                    if (this.encNode)
                        this.encNode.disconnect();
                    if (this.encNode)
                        this.encNode.onaudioprocess = null;
                    if (this.stream)
                        this.stopTracks();
                    if (this.audioCtx)
                        this.audioCtx.close();
                    if (this.worker) {
                        this.worker.terminate();
                        this.worker = null;
                    }
                    if (this.workerURL)
                        URL.revokeObjectURL(this.workerURL);
                    if (this.blobURL)
                        URL.revokeObjectURL(this.blobURL);
                }
            }, {
                key: "initAudio",
                value: function initAudio() {
                    var _this = this;
                    var getUserMedia = navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? function(constraints) {
                        return navigator.mediaDevices.getUserMedia(constraints);
                    }
                    : function(constraints) {
                        var oldGetUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                        if (!oldGetUserMedia) {
                            return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
                        }
                        return new Promise(function(resolve, reject) {
                            oldGetUserMedia.call(navigator, constraints, resolve, reject);
                        }
                        );
                    }
                    ;
                    return getUserMedia({
                        audio: true
                    }).then(function(stream) {
                        _this.stream = stream;
                        var audioCtx = _this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        var sourceNode = audioCtx.createMediaStreamSource(stream);
                        var gainNode = _this.gainNode = (audioCtx.createGain || audioCtx.createGainNode).call(audioCtx);
                        gainNode.gain.value = 1;
                        sourceNode.connect(gainNode);
                        var pitchFX = _this.pitchFX = new Jungle(audioCtx);
                        pitchFX.setPitchOffset(_this.pitch);
                        var encNode = _this.encNode = (audioCtx.createScriptProcessor || audioCtx.createJavaScriptNode).call(audioCtx, 0, 1, 1);
                        pitchFX.output.connect(encNode);
                        gainNode.connect(_this.pitch === 0 ? encNode : pitchFX.input);
                    });
                }
            }, {
                key: "initWorker",
                value: function initWorker() {
                    var _this2 = this;
                    if (this.worker)
                        return Promise.resolve();
                    var blob = new Blob(["(", inlineWorker.toString(), ")()"],{
                        type: "application/javascript"
                    });
                    var workerURL = this.workerURL = URL.createObjectURL(blob);
                    var worker = this.worker = new Worker(workerURL);
                    var wasmURL = this.wasmURL
                      , shimURL = this.shimURL;
                    worker.postMessage({
                        type: "init",
                        data: {
                            wasmURL: wasmURL,
                            shimURL: shimURL
                        }
                    });
                    return new Promise(function(resolve, reject) {
                        worker.onmessage = function(e) {
                            var msg = e.data;
                            switch (msg.type) {
                            case "init":
                                resolve();
                                break;
                            case "init-error":
                                _this2.close();
                                reject(new Error(msg.data));
                                break;
                            case "error":
                            case "internal-error":
                                _this2.close();
                                console.error("Worker error:", msg.data);
                                if (_this2.reject)
                                    _this2.reject(msg.data);
                                break;
                            case "stop":
                                _this2.blob = msg.data;
                                _this2.blobURL = URL.createObjectURL(msg.data);
                                if (_this2.onStop)
                                    _this2.onStop();
                                if (_this2.resolve)
                                    _this2.resolve(_this2.blob);
                                break;
                            }
                        }
                        ;
                    }
                    );
                }
            }, {
                key: "init",
                value: function init() {
                    return this.initAudio().then(this.initWorker.bind(this));
                }
            }, {
                key: "startRecording",
                value: function startRecording() {
                    var _this3 = this;
                    if (!this.stream)
                        throw new Error("missing audio initialization");
                    if (!this.worker)
                        throw new Error("missing worker initialization");
                    this.blob = null;
                    if (this.blobURL)
                        URL.revokeObjectURL(this.blobURL);
                    this.blobURL = null;
                    this.resolve = null;
                    this.reject = null;
                    this.worker.postMessage({
                        type: "start",
                        data: this.audioCtx.sampleRate
                    });
                    this.encNode.onaudioprocess = function(e) {
                        var samples = e.inputBuffer.getChannelData(0);
                        _this3.worker.postMessage({
                            type: "data",
                            data: samples
                        });
                    }
                    ;
                    this.encNode.connect(this.audioCtx.destination);
                }
            }, {
                key: "stopRecording",
                value: function stopRecording() {
                    var _this4 = this;
                    if (!this.stream)
                        throw new Error("missing audio initialization");
                    if (!this.worker)
                        throw new Error("missing worker initialization");
                    this.encNode.disconnect();
                    this.encNode.onaudioprocess = null;
                    this.stopTracks();
                    this.audioCtx.close();
                    this.worker.postMessage({
                        type: "stop",
                        data: null
                    });
                    return new Promise(function(resolve, reject) {
                        _this4.resolve = resolve;
                        _this4.reject = reject;
                    }
                    );
                }
            }, {
                key: "stopTracks",
                value: function stopTracks() {
                    if (this.stream.getTracks) {
                        this.stream.getTracks().forEach(function(track) {
                            return track.stop();
                        });
                    }
                }
            }]);
            return Recorder;
        }();
        exports.Recorder = Recorder;
        var Form = function() {
            function Form() {
                var _this5 = this;
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var resolve = arguments.length > 1 ? arguments[1] : undefined;
                var reject = arguments.length > 2 ? arguments[2] : undefined;
                _classCallCheck(this, Form);
                this.recorder = new Recorder(opts,this.onStop.bind(this));
                this.resolve = resolve;
                this.reject = reject;
                this.backdrop = null;
                this.popup = null;
                this.recordBtn = null;
                this.stopBtn = null;
                this.timer = null;
                this.audio = null;
                this.saveBtn = null;
                this.tid = 0;
                this.start = 0;
                Object.seal(this);
                this.recorder.initAudio().then(function() {
                    return _this5.drawInit();
                }).then(function() {
                    return _this5.recorder.initWorker();
                }).then(function() {
                    return _this5.drawAll();
                }).catch(function(err) {
                    return _this5.drawError(err);
                });
            }
            _createClass(Form, [{
                key: "drawInit",
                value: function drawInit() {
                    var _this6 = this;
                    if (this.backdrop)
                        return;
                    var backdrop = this.backdrop = document.createElement("div");
                    backdrop.className = "vmsg-backdrop";
                    backdrop.addEventListener("click", function() {
                        return _this6.close(null);
                    });
                    var popup = this.popup = document.createElement("div");
                    popup.className = "vmsg-popup";
                    popup.addEventListener("click", function(e) {
                        return e.stopPropagation();
                    });
                    var progress = document.createElement("div");
                    progress.className = "vmsg-progress";
                    for (var i = 0; i < 3; i++) {
                        var progressDot = document.createElement("div");
                        progressDot.className = "vmsg-progress-dot";
                        progress.appendChild(progressDot);
                    }
                    popup.appendChild(progress);
                    backdrop.appendChild(popup);
                    document.body.appendChild(backdrop);
                }
            }, {
                key: "drawTime",
                value: function drawTime(msecs) {
                    var secs = Math.round(msecs / 1000);
                    this.timer.textContent = pad2(secs / 60) + ":" + pad2(secs % 60);
                }
            }, {
                key: "drawAll",
                value: function drawAll() {
                    var _this7 = this;
                    this.drawInit();
                    this.clearAll();
                    var recordRow = document.createElement("div");
                    recordRow.className = "vmsg-record-row";
                    this.popup.appendChild(recordRow);
                    var recordBtn = this.recordBtn = document.createElement("button");
                    recordBtn.className = "vmsg-button vmsg-record-button";
                    recordBtn.textContent = "●";
                    recordBtn.title = "Start Recording";
                    recordBtn.addEventListener("click", function() {
                        return _this7.startRecording();
                    });
                    recordRow.appendChild(recordBtn);
                    var stopBtn = this.stopBtn = document.createElement("button");
                    stopBtn.className = "vmsg-button vmsg-stop-button";
                    stopBtn.style.display = "none";
                    stopBtn.textContent = "■";
                    stopBtn.title = "Stop Recording";
                    stopBtn.addEventListener("click", function() {
                        return _this7.stopRecording();
                    });
                    recordRow.appendChild(stopBtn);
                    var audio = this.audio = new Audio();
                    audio.autoplay = true;
                    var timer = this.timer = document.createElement("span");
                    timer.className = "vmsg-timer";
                    timer.title = "Preview Recording";
                    timer.addEventListener("click", function() {
                        if (audio.paused) {
                            if (_this7.recorder.blobURL) {
                                audio.src = _this7.recorder.blobURL;
                            }
                        } else {
                            audio.pause();
                        }
                    });
                    this.drawTime(0);
                    recordRow.appendChild(timer);
                    var saveBtn = this.saveBtn = document.createElement("button");
                    saveBtn.className = "vmsg-button vmsg-save-button";
                    saveBtn.textContent = "✓";
                    saveBtn.title = "Save Recording";
                    saveBtn.disabled = true;
                    saveBtn.addEventListener("click", function() {
                        return _this7.close(_this7.recorder.blob);
                    });
                    recordRow.appendChild(saveBtn);
                    var gainWrapper = document.createElement("div");
                    gainWrapper.className = "vmsg-slider-wrapper vmsg-gain-slider-wrapper";
                    var gainSlider = document.createElement("input");
                    gainSlider.className = "vmsg-slider vmsg-gain-slider";
                    gainSlider.setAttribute("type", "range");
                    gainSlider.min = 0;
                    gainSlider.max = 2;
                    gainSlider.step = 0.2;
                    gainSlider.value = 1;
                    gainSlider.onchange = function() {
                        var gain = +gainSlider.value;
                        _this7.recorder.gainNode.gain.value = gain;
                    }
                    ;
                    gainWrapper.appendChild(gainSlider);
                    this.popup.appendChild(gainWrapper);
                    var pitchWrapper = document.createElement("div");
                    pitchWrapper.className = "vmsg-slider-wrapper vmsg-pitch-slider-wrapper";
                    var pitchSlider = document.createElement("input");
                    pitchSlider.className = "vmsg-slider vmsg-pitch-slider";
                    pitchSlider.setAttribute("type", "range");
                    pitchSlider.min = -1;
                    pitchSlider.max = 1;
                    pitchSlider.step = 0.2;
                    pitchSlider.value = this.recorder.pitch;
                    pitchSlider.onchange = function() {
                        var pitch = +pitchSlider.value;
                        _this7.recorder.pitchFX.setPitchOffset(pitch);
                        _this7.recorder.gainNode.disconnect();
                        _this7.recorder.gainNode.connect(pitch === 0 ? _this7.recorder.encNode : _this7.recorder.pitchFX.input);
                    }
                    ;
                    pitchWrapper.appendChild(pitchSlider);
                    this.popup.appendChild(pitchWrapper);
                    recordBtn.focus();
                }
            }, {
                key: "drawError",
                value: function drawError(err) {
                    console.error(err);
                    this.drawInit();
                    this.clearAll();
                    var error = document.createElement("div");
                    error.className = "vmsg-error";
                    error.textContent = err.toString();
                    this.popup.appendChild(error);
                }
            }, {
                key: "clearAll",
                value: function clearAll() {
                    if (!this.popup)
                        return;
                    this.popup.innerHTML = "";
                }
            }, {
                key: "close",
                value: function close(blob) {
                    if (this.audio)
                        this.audio.pause();
                    if (this.tid)
                        clearTimeout(this.tid);
                    this.recorder.close();
                    this.backdrop.remove();
                    if (blob) {
                        this.resolve(blob);
                    } else {
                        this.reject(new Error("No record made"));
                    }
                }
            }, {
                key: "onStop",
                value: function onStop() {
                    this.recordBtn.style.display = "";
                    this.stopBtn.style.display = "none";
                    this.stopBtn.disabled = false;
                    this.saveBtn.disabled = false;
                }
            }, {
                key: "startRecording",
                value: function startRecording() {
                    this.audio.pause();
                    this.start = Date.now();
                    this.updateTime();
                    this.recordBtn.style.display = "none";
                    this.stopBtn.style.display = "";
                    this.saveBtn.disabled = true;
                    this.stopBtn.focus();
                    this.recorder.startRecording();
                }
            }, {
                key: "stopRecording",
                value: function stopRecording() {
                    clearTimeout(this.tid);
                    this.tid = 0;
                    this.stopBtn.disabled = true;
                    this.recordBtn.focus();
                    this.recorder.stopRecording();
                }
            }, {
                key: "updateTime",
                value: function updateTime() {
                    var _this8 = this;
                    this.drawTime(Date.now() - this.start);
                    this.tid = setTimeout(function() {
                        return _this8.updateTime();
                    }, 300);
                }
            }]);
            return Form;
        }();
        exports.Form = Form;
        var shown = false;
        function record(opts) {
            return new Promise(function(resolve, reject) {
                if (shown)
                    throw new Error("Record form is already opened");
                shown = true;
                new Form(opts,resolve,reject);
            }
            ).then(function(result) {
                shown = false;
                return result;
            }, function(err) {
                shown = false;
                throw err;
            });
        }
        var _default = {
            Recorder: Recorder,
            Form: Form,
            record: record
        };
        exports.default = _default;
        var delayTime = 0.100;
        var fadeTime = 0.050;
        var bufferTime = 0.100;
        function createFadeBuffer(context, activeTime, fadeTime) {
            var length1 = activeTime * context.sampleRate;
            var length2 = (activeTime - 2 * fadeTime) * context.sampleRate;
            var length = length1 + length2;
            var buffer = context.createBuffer(1, length, context.sampleRate);
            var p = buffer.getChannelData(0);
            var fadeLength = fadeTime * context.sampleRate;
            var fadeIndex1 = fadeLength;
            var fadeIndex2 = length1 - fadeLength;
            for (var i = 0; i < length1; ++i) {
                var value;
                if (i < fadeIndex1) {
                    value = Math.sqrt(i / fadeLength);
                } else if (i >= fadeIndex2) {
                    value = Math.sqrt(1 - (i - fadeIndex2) / fadeLength);
                } else {
                    value = 1;
                }
                p[i] = value;
            }
            for (var i = length1; i < length; ++i) {
                p[i] = 0;
            }
            return buffer;
        }
        function createDelayTimeBuffer(context, activeTime, fadeTime, shiftUp) {
            var length1 = activeTime * context.sampleRate;
            var length2 = (activeTime - 2 * fadeTime) * context.sampleRate;
            var length = length1 + length2;
            var buffer = context.createBuffer(1, length, context.sampleRate);
            var p = buffer.getChannelData(0);
            for (var i = 0; i < length1; ++i) {
                if (shiftUp)
                    p[i] = (length1 - i) / length;
                else
                    p[i] = i / length1;
            }
            for (var i = length1; i < length; ++i) {
                p[i] = 0;
            }
            return buffer;
        }
        function Jungle(context) {
            this.context = context;
            var input = (context.createGain || context.createGainNode).call(context);
            var output = (context.createGain || context.createGainNode).call(context);
            this.input = input;
            this.output = output;
            var mod1 = context.createBufferSource();
            var mod2 = context.createBufferSource();
            var mod3 = context.createBufferSource();
            var mod4 = context.createBufferSource();
            this.shiftDownBuffer = createDelayTimeBuffer(context, bufferTime, fadeTime, false);
            this.shiftUpBuffer = createDelayTimeBuffer(context, bufferTime, fadeTime, true);
            mod1.buffer = this.shiftDownBuffer;
            mod2.buffer = this.shiftDownBuffer;
            mod3.buffer = this.shiftUpBuffer;
            mod4.buffer = this.shiftUpBuffer;
            mod1.loop = true;
            mod2.loop = true;
            mod3.loop = true;
            mod4.loop = true;
            var mod1Gain = (context.createGain || context.createGainNode).call(context);
            var mod2Gain = (context.createGain || context.createGainNode).call(context);
            var mod3Gain = (context.createGain || context.createGainNode).call(context);
            mod3Gain.gain.value = 0;
            var mod4Gain = (context.createGain || context.createGainNode).call(context);
            mod4Gain.gain.value = 0;
            mod1.connect(mod1Gain);
            mod2.connect(mod2Gain);
            mod3.connect(mod3Gain);
            mod4.connect(mod4Gain);
            var modGain1 = (context.createGain || context.createGainNode).call(context);
            var modGain2 = (context.createGain || context.createGainNode).call(context);
            var delay1 = (context.createDelay || context.createDelayNode).call(context);
            var delay2 = (context.createDelay || context.createDelayNode).call(context);
            mod1Gain.connect(modGain1);
            mod2Gain.connect(modGain2);
            mod3Gain.connect(modGain1);
            mod4Gain.connect(modGain2);
            modGain1.connect(delay1.delayTime);
            modGain2.connect(delay2.delayTime);
            var fade1 = context.createBufferSource();
            var fade2 = context.createBufferSource();
            var fadeBuffer = createFadeBuffer(context, bufferTime, fadeTime);
            fade1.buffer = fadeBuffer;
            fade2.buffer = fadeBuffer;
            fade1.loop = true;
            fade2.loop = true;
            var mix1 = (context.createGain || context.createGainNode).call(context);
            var mix2 = (context.createGain || context.createGainNode).call(context);
            mix1.gain.value = 0;
            mix2.gain.value = 0;
            fade1.connect(mix1.gain);
            fade2.connect(mix2.gain);
            input.connect(delay1);
            input.connect(delay2);
            delay1.connect(mix1);
            delay2.connect(mix2);
            mix1.connect(output);
            mix2.connect(output);
            var t = context.currentTime + 0.050;
            var t2 = t + bufferTime - fadeTime;
            mod1.start(t);
            mod2.start(t2);
            mod3.start(t);
            mod4.start(t2);
            fade1.start(t);
            fade2.start(t2);
            this.mod1 = mod1;
            this.mod2 = mod2;
            this.mod1Gain = mod1Gain;
            this.mod2Gain = mod2Gain;
            this.mod3Gain = mod3Gain;
            this.mod4Gain = mod4Gain;
            this.modGain1 = modGain1;
            this.modGain2 = modGain2;
            this.fade1 = fade1;
            this.fade2 = fade2;
            this.mix1 = mix1;
            this.mix2 = mix2;
            this.delay1 = delay1;
            this.delay2 = delay2;
            this.setDelay(delayTime);
        }
        Jungle.prototype.setDelay = function(delayTime) {
            this.modGain1.gain.setTargetAtTime(0.5 * delayTime, 0, 0.010);
            this.modGain2.gain.setTargetAtTime(0.5 * delayTime, 0, 0.010);
        }
        ;
        Jungle.prototype.setPitchOffset = function(mult) {
            if (mult > 0) {
                this.mod1Gain.gain.value = 0;
                this.mod2Gain.gain.value = 0;
                this.mod3Gain.gain.value = 1;
                this.mod4Gain.gain.value = 1;
            } else {
                this.mod1Gain.gain.value = 1;
                this.mod2Gain.gain.value = 1;
                this.mod3Gain.gain.value = 0;
                this.mod4Gain.gain.value = 0;
            }
            this.setDelay(delayTime * Math.abs(mult));
        }
        ;
    },
    fn: "vmsg.es5.min.js"
});
;