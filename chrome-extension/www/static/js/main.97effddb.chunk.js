(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    272: function(e, a, t) {
      e.exports = t(560);
    },
    277: function(e, a, t) {},
    298: function(e, a) {},
    300: function(e, a) {},
    390: function(e, a) {},
    460: function(e, a) {},
    560: function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t(0),
        r = t.n(n),
        c = t(12),
        i = t.n(c),
        o = t(38),
        l = (t(277), t(13)),
        s = t(68),
        u = t(602);
      function m(e) {
        return r.a.createElement(
          u.a,
          {
            container: !0,
            direction: "column",
            alignItems: "center",
            justify: "center",
            spacing: e.spacing ? e.spacing : 0,
            style: e.gridStyle ? e.gridStyle : {},
          },
          r.a.createElement(u.a, { item: !0 }, e.children),
        );
      }
      function p(e) {
        return r.a.createElement(
          u.a,
          {
            container: !0,
            direction: "row",
            alignItems: "center",
            justify: "center",
            spacing: e.spacing ? e.spacing : 0,
            style: e.gridStyle ? e.gridStyle : {},
          },
          r.a.createElement(u.a, { item: !0 }, e.children),
        );
      }
      var d = {
          fta: { ch: "\u666e\u60e0\u8cc7\u7522" },
          password: { ch: "\u5bc6\u78bc" },
          username: { ch: "\u5e33\u6236\u540d\u7a31" },
          passwordAgain: { ch: "\u91cd\u65b0\u8f38\u5165\u5bc6\u78bc" },
          accountCreationWarning1: {
            ch: "\u6ce8\u610f\uff0c\u8acb\u7dca\u8a18\u5bc6\u78bc\u3002",
          },
          accountCreationWarning2: {
            ch:
              "\u57fa\u65bc\u5b89\u5168\u8003\u616e\uff0c\u4e00\u65e6\u907a\u5931\u5bc6\u78bc\uff0c\u5c07\u6c38\u4e45\u4e1f\u5931\u7528\u6236\u5b58\u53d6\u6b0a\u3002",
          },
          passwordLengthWarning: {
            ch: "\u5bc6\u78bc\u5fc5\u9808\u6709\u516b\u4f4d\u4ee5\u4e0a",
          },
          passwordAgainNotMatchWarning: {
            ch:
              "\u6b64\u6b04\u4f4d\u5fc5\u9808\u548c\u4e0a\u4e00\u500b\u6b04\u4f4d\u4e00\u6a23",
          },
          usernameEmptyWarning: {
            ch: "\u7528\u6236\u540d\u7a31\u4e0d\u80fd\u70ba\u7a7a",
          },
          submit: { ch: "\u63d0\u4ea4" },
          accountCreatedInfo: { ch: "\u5e33\u6236\u5df2\u88ab\u65b0\u589e" },
          accountNotCreatedInfo: {
            ch:
              "\u4e0d\u80fd\u65b0\u589e\u5e33\u6236\uff0c\u8acb\u6aa2\u67e5\u662f\u5426\u6709\u540c\u540d\u5e33\u6236\u3002\u8acb\u8003\u616e\u4f7f\u7528\u5176\u4ed6\u5e33\u6236\u540d\u7a31\u3002",
          },
          register: { ch: "\u8a3b\u518a" },
          login: { ch: "\u767b\u5165" },
          cannotLoginWarning: {
            ch:
              "\u672a\u80fd\u767b\u5165\uff0c\u8acb\u6aa2\u67e5\u5e33\u865f\u53ca\u5bc6\u78bc\u662f\u5426\u8f38\u5165\u932f\u8aa4\u3002",
          },
          buy: { ch: "\u8cfc\u8cb7" },
          send: { ch: "\u50b3\u9001" },
          details: { ch: "\u8a73\u7d30\u8cc7\u6599" },
          from: { ch: "\u7531" },
          to: { ch: "\u5230" },
          asset: { ch: "\u8cc7\u7522" },
          amount: { ch: "\u91d1\u984d" },
          transactionFinishedInfo: {
            ch:
              "\u4ea4\u6613\u5df2\u50b3\u9001\uff0c\u6b63\u7b49\u5f85\u7db2\u7d61\u8655\u7406\u3002",
          },
          transactionFailedWarning: {
            ch:
              "\u4ea4\u6613\u672a\u80fd\u50b3\u9001\uff0c\u8acb\u6aa2\u67e5\u8f38\u5165\u8cc7\u6599\u3002",
          },
          exportInstructionInfo1: {
            ch:
              "\u5148\u5c07\u4ee5\u4e0b\u65b9\u683c\u7684\u5e33\u6236\u8cc7\u6599\u8907\u88fd\u81f3\u53e6\u4e00\u88dd\u7f6e\uff0c\u7136\u5f8c\u5c07\u8cc7\u6599\u8cbc\u4e0a\u81f3\u65b0\u88dd\u7f6e\u4e2d\u7684\u65b9\u683c\u4e2d\uff0c\u4e26\u6309\u78ba\u5b9a\uff0c\u5373\u53ef\u5b8c\u6210\u5e33\u6236\u8f49\u79fb\u3002",
          },
          exportInstructionInfo2: {
            ch:
              "\u6ce8\u610f\uff0c\u4e00\u65e6\u8cbc\u4e0a\u5728\u65b0\u88dd\u7f6e\u4e0a\u5b8c\u6210\u5e33\u6236\u8f49\u79fb\uff0c\u5728\u65b0\u88dd\u7f6e\u7684\u539f\u6709\u5e33\u6236\u53ef\u80fd\u88ab\u79fb\u9664\u3002",
          },
          copyHere: { ch: "\u9019\u88e1\u8907\u88fd" },
          pasteHere: { ch: "\u9019\u88e1\u8cbc\u4e0a" },
          import: { ch: "\u532f\u5165" },
          back: { ch: "\u8fd4\u56de" },
          importSuccessInfo: { ch: "\u532f\u5165\u6210\u529f\u3002" },
          importFailedWarning: {
            ch:
              "\u532f\u5165\u5931\u6557\uff0c\u8acb\u5f85\u532f\u5165\u6210\u529f\u5f8c\u624d\u522a\u9664\u539f\u6709\u88dd\u7f6e\u8cc7\u6599\u3002",
          },
          accountImportExport: {
            ch: "\u5e33\u6236\u532f\u5165\uff0f\u532f\u51fa",
          },
        },
        E = t(620),
        A = t(123),
        h = t(608),
        g = "ch";
      function f(e) {
        var a = e.onAccountCreate,
          t = r.a.useState(""),
          n = Object(l.a)(t, 2),
          c = n[0],
          i = n[1],
          o = r.a.useState(""),
          s = Object(l.a)(o, 2),
          f = s[0],
          v = s[1],
          y = r.a.useState(""),
          b = Object(l.a)(y, 2),
          w = b[0],
          C = b[1];
        return r.a.createElement(
          m,
          { gridStyle: { minHeight: "80vh" } },
          r.a.createElement(
            p,
            null,
            r.a.createElement(
              u.a,
              {
                container: !0,
                alignItems: "center",
                direction: "column",
                spacing: 2,
              },
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(E.a, {
                  variant: "standard",
                  label: d.username[g],
                  value: c,
                  onChange: function(e) {
                    i(e.target.value);
                  },
                  helperText: c.length > 0 ? void 0 : d.usernameEmptyWarning[g],
                  inputProps: { autoComplete: "new-password" },
                }),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(E.a, {
                  variant: "standard",
                  label: d.password[g],
                  value: f,
                  onChange: function(e) {
                    v(e.target.value);
                  },
                  type: "password",
                  helperText:
                    f.length >= 8 ? void 0 : d.passwordLengthWarning[g],
                  inputProps: { autoComplete: "new-password" },
                }),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(E.a, {
                  variant: "standard",
                  label: d.passwordAgain[g],
                  value: w,
                  onChange: function(e) {
                    C(e.target.value);
                  },
                  type: "password",
                  helperText:
                    f === w ? void 0 : d.passwordAgainNotMatchWarning[g],
                  inputProps: { autoComplete: "new-password" },
                }),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(
                  A.a,
                  { variant: "body2" },
                  d.accountCreationWarning1[g],
                ),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(
                  A.a,
                  { variant: "body2" },
                  d.accountCreationWarning2[g],
                ),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(
                  h.a,
                  {
                    variant: "contained",
                    color: "primary",
                    onClick: function() {
                      a(c, f);
                    },
                  },
                  d.register[g],
                ),
              ),
            ),
          ),
        );
      }
      var v,
        y = t(48),
        b = t.n(y),
        w = t(82),
        C = t(121),
        S = t(262),
        k = t(3),
        j = t(564),
        I = t(609),
        B = t(621),
        O = t(610),
        Q = t(611),
        x = t(607),
        T = t(612),
        N = t(616),
        H = t(264),
        D = t.n(H),
        U = t(267),
        q = t.n(U),
        J = t(266),
        z = t.n(J),
        M = t(622),
        R = t(565),
        V = t(614),
        X = t(613),
        F = t(615),
        W = t(619),
        K = t(52),
        L = t.n(K),
        G = t(162),
        P = t.n(G);
      function Y(e, a) {
        if (localStorage.getItem(e))
          throw new Error("ValueError: account name is already used.");
        var t,
          n = v.eth.accounts.create(),
          r = ("000000000000000000000000" + a).slice(-24);
        return (
          localStorage.setItem(
            "user-".concat(e),
            (function(e, a) {
              a = a.getBytes();
              var t = L.a.utils.utf8.toBytes(e),
                n = new L.a.ModeOfOperation.ctr(a, new L.a.Counter(5)).encrypt(
                  t,
                ),
                r = L.a.utils.hex.fromBytes(n);
              return console.log(r), r;
            })(
              JSON.stringify({
                address: (t = n).address,
                privateKey: t.privateKey,
              }),
              r,
            ),
          ),
          n
        );
      }
      function Z(e, a) {
        var t = (function(e, a) {
          var t = L.a.utils.hex.toBytes(e);
          a = a.getBytes();
          var n = new L.a.ModeOfOperation.ctr(a, new L.a.Counter(5)).decrypt(t);
          return L.a.utils.utf8.fromBytes(n);
        })(
          localStorage.getItem("user-".concat(e)),
          ("000000000000000000000000" + a).slice(-24),
        );
        return v.eth.accounts.privateKeyToAccount(JSON.parse(t).privateKey);
      }
      function $(e, a, t) {
        return _.apply(this, arguments);
      }
      function _() {
        return (_ = Object(w.a)(
          b.a.mark(function e(a, t, n) {
            return b.a.wrap(function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2),
                      a
                        .signTransaction({
                          to: t,
                          value: n,
                          gas: 2e6,
                          gasPrice: "0x0",
                        })
                        .then(te)
                    );
                  case 2:
                  case "end":
                    return e.stop();
                }
            }, e);
          }),
        )).apply(this, arguments);
      }
      function ee() {
        return Array.apply(0, new Array(localStorage.length))
          .map(function(e, a) {
            return localStorage.key(a);
          })
          .filter(function(e) {
            return "user-" === e.slice(0, 5);
          });
      }
      function ae() {
        var e = {};
        return (
          ee().forEach(function(a) {
            e[a] = localStorage.getItem(a);
          }),
          btoa(JSON.stringify(e))
        );
      }
      function te(e) {
        v.eth.sendSignedTransaction(e).on("receipt", console.log);
      }
      String.prototype.getBytes = function() {
        for (var e = [], a = 0; a < this.length; ++a)
          e.push(this.charCodeAt(a));
        return e;
      };
      var ne = t(263),
        re = t.n(ne),
        ce = t(163),
        ie = t.n(ce),
        oe = t(618),
        le = t(617),
        se = t(605),
        ue = t(623),
        me = t(265),
        pe = t.n(me),
        de = "ch",
        Ee = Object(j.a)(function(e) {
          return {
            root: { display: "flex" },
            toolbar: { paddingRight: 24 },
            toolbarIcon: Object(S.a)(
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 8px",
              },
              e.mixins.toolbar,
            ),
            appBar: {
              zIndex: e.zIndex.drawer + 1,
              transition: e.transitions.create(["width", "margin"], {
                easing: e.transitions.easing.sharp,
                duration: e.transitions.duration.leavingScreen,
              }),
            },
            appBarShift: {
              marginLeft: 300,
              width: "calc(100% - ".concat(300, "px)"),
              transition: e.transitions.create(["width", "margin"], {
                easing: e.transitions.easing.sharp,
                duration: e.transitions.duration.enteringScreen,
              }),
            },
            menuButton: { marginRight: 36 },
            menuButtonHidden: { display: "none" },
            title: { flexGrow: 1 },
            drawerPaper: {
              position: "relative",
              whiteSpace: "nowrap",
              width: 300,
              transition: e.transitions.create("width", {
                easing: e.transitions.easing.sharp,
                duration: e.transitions.duration.enteringScreen,
              }),
            },
            drawerPaperClose: Object(C.a)(
              {
                overflowX: "hidden",
                transition: e.transitions.create("width", {
                  easing: e.transitions.easing.sharp,
                  duration: e.transitions.duration.leavingScreen,
                }),
                width: e.spacing(7),
              },
              e.breakpoints.up("sm"),
              { width: e.spacing(9) },
            ),
            appBarSpacer: e.mixins.toolbar,
            content: { flexGrow: 1, height: "100vh", overflow: "auto" },
            container: {
              paddingTop: e.spacing(4),
              paddingBottom: e.spacing(4),
            },
            paper: {
              padding: e.spacing(2),
              display: "flex",
              overflow: "auto",
              flexDirection: "column",
            },
            fixedHeight: { height: 240 },
            modalPaper: {
              position: "absolute",
              width: 360,
              height: 500,
              top: "calc(50% - 500px / 2)",
              left: "calc(50% - 360px / 2)",
              backgroundColor: e.palette.background.paper,
              boxShadow: e.shadows[5],
              padding: e.spacing(4),
              outline: "none",
            },
          };
        });
      var Ae = Object(s.e)(function(e) {
          var a,
            t = e.account,
            n = e.history,
            c = e.currentUsername,
            i = e.handleLogout,
            o = e.handleChangeAccount,
            s =
              "data:image/jpeg;base64,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\n";
          (a = t), 0 === Object.keys(a).length && n.push("/login-account");
          var m = c,
            p = (t.address, Ee()),
            g = r.a.useState(!1),
            f = Object(l.a)(g, 2),
            y = f[0],
            C = f[1],
            S = function() {
              C(!1);
            },
            j = r.a.useState(!1),
            H = Object(l.a)(j, 2),
            U = H[0],
            J = H[1],
            K = function() {
              J(!0);
            },
            L = function() {
              J(!1);
            },
            G = r.a.useState(!1),
            P = Object(l.a)(G, 2),
            Y = P[0],
            Z = P[1],
            _ = function() {
              Z(!1);
            },
            ae = r.a.useState(""),
            te = Object(l.a)(ae, 2),
            ne = te[0],
            ce = te[1],
            me = r.a.useState(""),
            Ae = Object(l.a)(me, 2),
            he = Ae[0],
            ge = Ae[1],
            fe = r.a.useState([]),
            ve = Object(l.a)(fe, 2),
            ye = ve[0],
            be = ve[1];
          r.a.useEffect(function() {
            return be(ee());
          }, []);
          var we = r.a.useState(!1),
            Ce = Object(l.a)(we, 2),
            Se = Ce[0],
            ke = Ce[1],
            je = r.a.useState(!1),
            Ie = Object(l.a)(je, 2),
            Be = Ie[0],
            Oe = Ie[1],
            Qe = r.a.useState(0),
            xe = Object(l.a)(Qe, 2),
            Te = (xe[0], xe[1], r.a.useState("")),
            Ne = Object(l.a)(Te, 2),
            He = Ne[0],
            De = Ne[1];
          return (
            Object(k.a)(p.paper, p.fixedHeight),
            r.a.useEffect(function() {
              !(function() {
                var e = Object(w.a)(
                  b.a.mark(function e() {
                    var a;
                    return b.a.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                (e.next = 3),
                                v.eth.getBalance(t.address, "latest")
                              );
                            case 3:
                              (a = e.sent),
                                De("".concat(v.utils.fromWei(a), " FTA")),
                                (e.next = 10);
                              break;
                            case 7:
                              (e.prev = 7),
                                (e.t0 = e.catch(0)),
                                console.log(e.t0);
                            case 10:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      null,
                      [[0, 7]],
                    );
                  }),
                );
                return function() {
                  return e.apply(this, arguments);
                };
              })()();
            }),
            r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(I.a, null),
              r.a.createElement(
                O.a,
                { position: "absolute", className: Object(k.a)(p.appBar) },
                r.a.createElement(
                  Q.a,
                  { className: p.toolbar },
                  r.a.createElement(
                    T.a,
                    {
                      edge: "start",
                      color: "inherit",
                      "aria-label": "Open drawer",
                      onClick: function() {
                        C(!0);
                      },
                      className: Object(k.a)(
                        p.menuButton,
                        y && p.menuButtonHidden,
                      ),
                    },
                    r.a.createElement(D.a, null),
                  ),
                  r.a.createElement(
                    A.a,
                    {
                      component: "h1",
                      variant: "h6",
                      color: "inherit",
                      noWrap: !0,
                      className: p.title,
                    },
                    m,
                  ),
                  r.a.createElement(
                    T.a,
                    { color: "inherit", onClick: i, edge: "end" },
                    r.a.createElement(pe.a, null),
                  ),
                  r.a.createElement(
                    T.a,
                    { color: "inherit", onClick: K, edge: "end" },
                    r.a.createElement(z.a, null),
                  ),
                ),
              ),
              r.a.createElement(
                B.a,
                {
                  variant: "temporary",
                  classes: {
                    paper: Object(k.a)(p.drawerPaper, !y && p.drawerPaperClose),
                  },
                  open: y,
                  onBackdropClick: S,
                },
                r.a.createElement(
                  "div",
                  { className: p.toolbarIcon },
                  r.a.createElement(
                    T.a,
                    { onClick: S },
                    r.a.createElement(q.a, null),
                  ),
                ),
                r.a.createElement(
                  u.a,
                  { container: !0, spacing: 0, direction: "column" },
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(
                      u.a,
                      {
                        container: !0,
                        spacing: 0,
                        direction: "row",
                        alignItems: "center",
                        justify: "center",
                      },
                      r.a.createElement(
                        u.a,
                        { item: !0 },
                        r.a.createElement(X.a, {
                          style: { width: 60, height: 60 },
                          src: s,
                        }),
                      ),
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(
                      u.a,
                      {
                        container: !0,
                        spacing: 0,
                        direction: "row",
                        alignItems: "center",
                        justify: "center",
                      },
                      r.a.createElement(
                        u.a,
                        { item: !0 },
                        r.a.createElement(A.a, { variant: "h5" }, m),
                      ),
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(
                      u.a,
                      {
                        container: !0,
                        spacing: 0,
                        direction: "row",
                        alignItems: "center",
                        justify: "center",
                      },
                      r.a.createElement(
                        u.a,
                        { item: !0 },
                        r.a.createElement(
                          h.a,
                          {
                            variant: "outlined",
                            size: "small",
                            color: "primary",
                            className: p.margin,
                            onClick: K,
                          },
                          d.details[de],
                        ),
                      ),
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(
                      x.a,
                      null,
                      ye.map(function(e) {
                        return r.a.createElement(
                          R.a,
                          {
                            onClick: function() {
                              return o(e.slice(5));
                            },
                            button: !0,
                          },
                          r.a.createElement(
                            V.a,
                            null,
                            r.a.createElement(X.a, { src: s }),
                          ),
                          r.a.createElement(F.a, { primary: e }),
                        );
                      }),
                    ),
                  ),
                ),
              ),
              r.a.createElement(
                "main",
                { className: p.content },
                r.a.createElement("div", { className: p.appBarSpacer }),
                r.a.createElement(
                  N.a,
                  { maxWidth: "lg", className: p.container },
                  r.a.createElement(
                    u.a,
                    { container: !0, direction: "column" },
                    r.a.createElement(
                      u.a,
                      { item: !0, style: { marginBottom: "10px" } },
                      r.a.createElement(
                        u.a,
                        {
                          container: !0,
                          spacing: 0,
                          direction: "row",
                          alignItems: "center",
                          justify: "center",
                        },
                        r.a.createElement(
                          u.a,
                          { item: !0 },
                          r.a.createElement(X.a, {
                            style: { width: 60, height: 60 },
                            src: s,
                          }),
                        ),
                      ),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(
                        u.a,
                        {
                          container: !0,
                          spacing: 0,
                          direction: "row",
                          alignItems: "center",
                          justify: "center",
                        },
                        r.a.createElement(
                          u.a,
                          { item: !0 },
                          r.a.createElement(A.a, { variant: "h4" }, He),
                        ),
                      ),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(
                        u.a,
                        {
                          container: !0,
                          direction: "row",
                          alignItems: "center",
                          justify: "center",
                        },
                        r.a.createElement(
                          u.a,
                          { item: !0 },
                          r.a.createElement(
                            h.a,
                            {
                              variant: "contained",
                              color: "primary",
                              onClick: function() {
                                return window.open("http://h51.lvshandian.com");
                              },
                            },
                            d.buy[de],
                          ),
                        ),
                        r.a.createElement(u.a, { item: !0, xs: 1 }),
                        r.a.createElement(
                          u.a,
                          { item: !0 },
                          r.a.createElement(
                            h.a,
                            {
                              variant: "contained",
                              color: "primary",
                              onClick: Z,
                            },
                            d.send[de],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              r.a.createElement(
                W.a,
                { open: U, onBackdropClick: L },
                r.a.createElement(
                  "div",
                  { className: p.modalPaper },
                  r.a.createElement(
                    "div",
                    { className: p.toolbarIcon },
                    r.a.createElement(
                      T.a,
                      { onClick: L },
                      r.a.createElement(ie.a, null),
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    {
                      container: !0,
                      direction: "column",
                      alignItems: "center",
                      justify: "space-evenly",
                      spacing: 5,
                    },
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(A.a, { variant: "h5" }, c),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(re.a, {
                        value: "fta:".concat(t.address),
                        renderAs: "svg",
                      }),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(E.a, {
                        variant: "outlined",
                        value: t.address,
                        disabled: !0,
                      }),
                    ),
                  ),
                ),
              ),
              r.a.createElement(
                W.a,
                { open: Y, onBackdropClick: _ },
                r.a.createElement(
                  "div",
                  { className: p.modalPaper },
                  r.a.createElement(
                    "div",
                    { className: p.toolbarIcon },
                    r.a.createElement(
                      T.a,
                      { onClick: _ },
                      r.a.createElement(ie.a, null),
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    {
                      container: !0,
                      direction: "column",
                      alignItems: "flex-start",
                      justify: "space-evenly",
                      spacing: 2,
                    },
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(E.a, {
                        label: d.from[de],
                        value: "".concat(c, " ").concat(t.address),
                        disabled: !0,
                      }),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(E.a, {
                        label: d.to[de],
                        value: ne,
                        onChange: function(e) {
                          ce(e.target.value);
                        },
                      }),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(
                        se.a,
                        null,
                        r.a.createElement(ue.a, null, d.asset[de]),
                        r.a.createElement(
                          oe.a,
                          { value: "fta" },
                          r.a.createElement(le.a, { value: "fta" }, "FTA"),
                        ),
                      ),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(E.a, {
                        label: d.amount[de],
                        value: he,
                        onChange: function(e) {
                          ge(e.target.value);
                        },
                      }),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(
                        se.a,
                        null,
                        r.a.createElement(
                          h.a,
                          {
                            variant: "contained",
                            color: "primary",
                            onClick: function() {
                              !(function() {
                                var e = Object(w.a)(
                                  b.a.mark(function e() {
                                    return b.a.wrap(
                                      function(e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              return (
                                                (e.prev = 0),
                                                (e.next = 3),
                                                $(t, ne, he)
                                              );
                                            case 3:
                                              ke(!0), _(), (e.next = 11);
                                              break;
                                            case 7:
                                              (e.prev = 7),
                                                (e.t0 = e.catch(0)),
                                                console.log(e.t0),
                                                Oe(!0);
                                            case 11:
                                            case "end":
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      null,
                                      [[0, 7]],
                                    );
                                  }),
                                );
                                return function() {
                                  return e.apply(this, arguments);
                                };
                              })()();
                            },
                          },
                          d.send[de],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              r.a.createElement(M.a, {
                open: Se,
                autoHideDuration: 6e3,
                onClose: function() {
                  ke(!1);
                },
                message: d.transactionFinishedInfo[de],
              }),
              r.a.createElement(M.a, {
                open: Be,
                autoHideDuration: 6e3,
                onClose: function() {
                  Oe(!1);
                },
                message: d.transactionFailedWarning[de],
              }),
            )
          );
        }),
        he = "ch";
      function ge(e) {
        var a = e.onAccountLogin,
          t = e.prefillUsername,
          n = r.a.useState(t || ""),
          c = Object(l.a)(n, 2),
          i = c[0],
          s = c[1],
          A = r.a.useState(""),
          g = Object(l.a)(A, 2),
          f = g[0],
          v = g[1],
          y = r.a.useState([]),
          b = Object(l.a)(y, 2),
          w = b[0],
          C = b[1];
        return (
          r.a.useEffect(function() {
            return C(ee());
          }, []),
          r.a.createElement(
            m,
            { gridStyle: { minHeight: "80vh" } },
            r.a.createElement(
              p,
              null,
              r.a.createElement(
                u.a,
                {
                  container: !0,
                  alignItems: "center",
                  direction: "column",
                  spacing: 2,
                },
                r.a.createElement(
                  u.a,
                  { item: !0 },
                  r.a.createElement(
                    se.a,
                    { style: { width: 200 } },
                    r.a.createElement(ue.a, null, d.username[he]),
                    r.a.createElement(
                      oe.a,
                      {
                        value: i,
                        onChange: function(e) {
                          s(e.target.value);
                        },
                      },
                      w.map(function(e) {
                        return r.a.createElement(
                          le.a,
                          { value: e.slice(5) },
                          e.slice(5),
                        );
                      }),
                    ),
                  ),
                ),
                r.a.createElement(
                  u.a,
                  { item: !0 },
                  r.a.createElement(E.a, {
                    style: { width: 200 },
                    variant: "standard",
                    label: d.password[he],
                    value: f,
                    onChange: function(e) {
                      v(e.target.value);
                    },
                    type: "password",
                    helperText:
                      f.length >= 8 ? void 0 : d.passwordLengthWarning[he],
                    inputProps: { autoComplete: "new-password" },
                  }),
                ),
                r.a.createElement(
                  u.a,
                  { item: !0 },
                  r.a.createElement(
                    h.a,
                    {
                      variant: "contained",
                      color: "primary",
                      onClick: function() {
                        a(i, f);
                      },
                    },
                    d.login[he],
                  ),
                ),
                r.a.createElement(
                  u.a,
                  { item: !0 },
                  r.a.createElement(
                    h.a,
                    {
                      variant: "contained",
                      color: "primary",
                      component: o.b,
                      to: "/create-account",
                    },
                    d.register[he],
                  ),
                ),
                r.a.createElement(
                  u.a,
                  { item: !0 },
                  r.a.createElement(
                    h.a,
                    {
                      variant: "contained",
                      color: "primary",
                      component: o.b,
                      to: "/account-manager",
                    },
                    d.accountImportExport[he],
                  ),
                ),
              ),
            ),
          )
        );
      }
      var fe = "ch";
      var ve = Object(s.e)(function(e) {
          e.history;
          var a = r.a.useState(""),
            t = Object(l.a)(a, 2),
            n = t[0],
            c = t[1],
            i = r.a.useState(!1),
            s = Object(l.a)(i, 2),
            g = s[0],
            f = s[1],
            v = r.a.useState(!1),
            y = Object(l.a)(v, 2),
            b = y[0],
            w = y[1];
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(
              m,
              { gridStyle: { minHeight: "80vh" } },
              r.a.createElement(
                p,
                null,
                r.a.createElement(
                  u.a,
                  {
                    container: !0,
                    alignItems: "center",
                    direction: "column",
                    spacing: 2,
                    style: { width: "100%" },
                  },
                  r.a.createElement(
                    u.a,
                    { item: !0, style: { width: "80%" } },
                    r.a.createElement(
                      A.a,
                      { disabled: !0, variant: "body2" },
                      d.exportInstructionInfo1[fe],
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0, style: { width: "80%" } },
                    r.a.createElement(
                      A.a,
                      { disabled: !0, variant: "body2" },
                      d.exportInstructionInfo2[fe],
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(E.a, {
                      disabled: !0,
                      variant: "outlined",
                      value: ae(),
                      multiline: !0,
                      rowsMax: 4,
                      label: d.copyHere[fe],
                    }),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(E.a, {
                      variant: "outlined",
                      value: n,
                      onChange: function(e) {
                        c(e.target.value);
                      },
                      multiline: !0,
                      rowsMax: 4,
                      label: d.pasteHere[fe],
                    }),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(
                      h.a,
                      {
                        variant: "contained",
                        color: "primary",
                        onClick: function() {
                          try {
                            !(function(e) {
                              var a = JSON.parse(atob(e));
                              Object.keys(a).forEach(function(e) {
                                localStorage.setItem(e, a[e]);
                              });
                            })(n),
                              f(!0);
                          } catch (e) {
                            console.log(e), w(!0);
                          }
                        },
                      },
                      d.import[fe],
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(
                      h.a,
                      {
                        variant: "contained",
                        color: "primary",
                        component: o.b,
                        to: "/login-account",
                      },
                      d.back[fe],
                    ),
                  ),
                ),
              ),
            ),
            r.a.createElement(M.a, {
              open: g,
              autoHideDuration: 6e3,
              onClose: function() {
                return f(!1);
              },
              message: d.importSuccessInfo[fe],
            }),
            r.a.createElement(M.a, {
              open: b,
              autoHideDuration: 6e3,
              onClose: function() {
                return w(!1);
              },
              message: d.importFailedWarning[fe],
            }),
          );
        }),
        ye = "ch";
      var be = Object(s.e)(function(e) {
        var a = r.a.useState(!1),
          t = Object(l.a)(a, 2),
          n = t[0],
          c = t[1],
          i = r.a.useState(!1),
          o = Object(l.a)(i, 2),
          u = o[0],
          m = o[1],
          p = r.a.useState(!1),
          E = Object(l.a)(p, 2),
          A = E[0],
          h = E[1],
          g = r.a.useState(""),
          v = Object(l.a)(g, 2),
          y = v[0],
          b = v[1],
          w = r.a.useState({}),
          C = Object(l.a)(w, 2),
          S = C[0],
          k = C[1],
          j = r.a.useState(""),
          I = Object(l.a)(j, 2),
          B = I[0],
          O = I[1],
          Q = function() {
            k({}), e.history.push("/login-account");
          },
          x = function(e) {
            Q(), O(e);
          },
          T = function(a, t) {
            try {
              Y(a, t), c(!0), e.history.push("/login-account");
            } catch (n) {
              console.log(n), m(!0);
            }
          },
          N = function(a, t) {
            try {
              var n = Z(a, t);
              k(n), b(a), e.history.push("/app");
            } catch (r) {
              console.log(r), h(!0);
            }
          };
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(
            s.c,
            null,
            r.a.createElement(s.a, {
              path: "/create-account",
              render: function() {
                return r.a.createElement(f, { onAccountCreate: T });
              },
            }),
            r.a.createElement(s.a, {
              path: "/app",
              render: function() {
                return r.a.createElement(Ae, {
                  account: S,
                  currentUsername: y,
                  handleLogout: Q,
                  handleChangeAccount: x,
                });
              },
            }),
            r.a.createElement(s.a, { path: "/account-manager", component: ve }),
            r.a.createElement(s.a, {
              render: function() {
                return r.a.createElement(ge, {
                  onAccountLogin: N,
                  prefillUsername: B,
                });
              },
            }),
          ),
          r.a.createElement(M.a, {
            open: n,
            autoHideDuration: 6e3,
            onClose: function() {
              c(!1);
            },
            message: d.accountCreatedInfo[ye],
          }),
          r.a.createElement(M.a, {
            open: u,
            autoHideDuration: 6e3,
            onClose: function() {
              m(!1);
            },
            message: d.accountNotCreatedInfo[ye],
          }),
          r.a.createElement(M.a, {
            open: A,
            autoHideDuration: 6e3,
            onClose: function() {
              h(!1);
            },
            message: d.cannotLoginWarning[ye],
          }),
        );
      });
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
          ),
      );
      v = new P.a(new P.a.providers.HttpProvider("https://quorum.mex.gold/"));
      var we = function() {
        i.a.render(
          r.a.createElement(o.a, null, r.a.createElement(be, null)),
          document.getElementById("root"),
        ),
          "serviceWorker" in navigator &&
            navigator.serviceWorker.ready.then(function(e) {
              e.unregister();
            });
      };
      window.cordova ? document.addEventListener("deviceready", we, !1) : we();
    },
  },
  [[272, 1, 2]],
]);
