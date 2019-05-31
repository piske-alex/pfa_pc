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
        o = t(65),
        l = (t(277), t(15)),
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
      function d(e) {
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
      var p = {
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
        },
        g = t(620),
        h = t(122),
        E = t(608),
        f = "ch";
      function v(e) {
        var a = e.onAccountCreate,
          t = r.a.useState(""),
          n = Object(l.a)(t, 2),
          c = n[0],
          i = n[1],
          o = r.a.useState(""),
          s = Object(l.a)(o, 2),
          v = s[0],
          w = s[1],
          y = r.a.useState(""),
          b = Object(l.a)(y, 2),
          C = b[0],
          j = b[1];
        return r.a.createElement(
          m,
          { gridStyle: { minHeight: "80vh" } },
          r.a.createElement(
            d,
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
                r.a.createElement(g.a, {
                  variant: "standard",
                  label: p.username[f],
                  value: c,
                  onChange: function(e) {
                    i(e.target.value);
                  },
                  helperText: c.length > 0 ? void 0 : p.usernameEmptyWarning[f],
                  inputProps: { autoComplete: "new-password" },
                }),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(g.a, {
                  variant: "standard",
                  label: p.password[f],
                  value: v,
                  onChange: function(e) {
                    w(e.target.value);
                  },
                  type: "password",
                  helperText:
                    v.length >= 8 ? void 0 : p.passwordLengthWarning[f],
                  inputProps: { autoComplete: "new-password" },
                }),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(g.a, {
                  variant: "standard",
                  label: p.passwordAgain[f],
                  value: C,
                  onChange: function(e) {
                    j(e.target.value);
                  },
                  type: "password",
                  helperText:
                    v === C ? void 0 : p.passwordAgainNotMatchWarning[f],
                  inputProps: { autoComplete: "new-password" },
                }),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(
                  h.a,
                  { variant: "body2" },
                  p.accountCreationWarning1[f],
                ),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(
                  h.a,
                  { variant: "body2" },
                  p.accountCreationWarning2[f],
                ),
              ),
              r.a.createElement(
                u.a,
                { item: !0 },
                r.a.createElement(
                  E.a,
                  {
                    variant: "contained",
                    color: "primary",
                    onClick: function() {
                      a(c, v);
                    },
                  },
                  p.register[f],
                ),
              ),
            ),
          ),
        );
      }
      var w,
        y = t(47),
        b = t.n(y),
        C = t(82),
        j = t(120),
        S = t(261),
        O = t(3),
        x = t(564),
        k = t(609),
        I = t(621),
        B = t(610),
        W = t(611),
        N = t(607),
        A = t(612),
        P = t(616),
        H = t(263),
        L = t.n(H),
        T = t(266),
        F = t.n(T),
        D = t(265),
        J = t.n(D),
        K = t(622),
        M = t(565),
        U = t(614),
        z = t(613),
        G = t(615),
        R = t(619),
        q = t(51),
        V = t.n(q),
        X = t(157),
        $ = t.n(X);
      function Q(e, a) {
        if (localStorage.getItem(e))
          throw new Error("ValueError: account name is already used.");
        var t,
          n = w.eth.accounts.create(),
          r = ("000000000000000000000000" + a).slice(-24);
        return (
          localStorage.setItem(
            "user-".concat(e),
            (function(e, a) {
              a = a.getBytes();
              var t = V.a.utils.utf8.toBytes(e),
                n = new V.a.ModeOfOperation.ctr(a, new V.a.Counter(5)).encrypt(
                  t,
                ),
                r = V.a.utils.hex.fromBytes(n);
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
      function Y(e, a) {
        var t = (function(e, a) {
          var t = V.a.utils.hex.toBytes(e);
          a = a.getBytes();
          var n = new V.a.ModeOfOperation.ctr(a, new V.a.Counter(5)).decrypt(t);
          return V.a.utils.utf8.fromBytes(n);
        })(
          localStorage.getItem("user-".concat(e)),
          ("000000000000000000000000" + a).slice(-24),
        );
        return w.eth.accounts.privateKeyToAccount(JSON.parse(t).privateKey);
      }
      function Z(e, a, t) {
        return _.apply(this, arguments);
      }
      function _() {
        return (_ = Object(C.a)(
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
                        .then(ae)
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
      function ae(e) {
        w.eth.sendSignedTransaction(e).on("receipt", console.log);
      }
      String.prototype.getBytes = function() {
        for (var e = [], a = 0; a < this.length; ++a)
          e.push(this.charCodeAt(a));
        return e;
      };
      var te = t(262),
        ne = t.n(te),
        re = t(158),
        ce = t.n(re),
        ie = t(618),
        oe = t(617),
        le = t(605),
        se = t(623),
        ue = t(264),
        me = t.n(ue),
        de = "ch",
        pe = Object(x.a)(function(e) {
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
            drawerPaperClose: Object(j.a)(
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
      var ge = Object(s.e)(function(e) {
          var a,
            t = e.account,
            n = e.history,
            c = e.currentUsername,
            i = e.handleLogout,
            o = e.handleChangeAccount;
          (a = t), 0 === Object.keys(a).length && n.push("/login-account");
          var s = c,
            m = (t.address, pe()),
            d = r.a.useState(!1),
            f = Object(l.a)(d, 2),
            v = f[0],
            y = f[1],
            j = function() {
              y(!1);
            },
            S = r.a.useState(!1),
            x = Object(l.a)(S, 2),
            H = x[0],
            T = x[1],
            D = function() {
              T(!0);
            },
            q = function() {
              T(!1);
            },
            V = r.a.useState(!1),
            X = Object(l.a)(V, 2),
            $ = X[0],
            Q = X[1],
            Y = function() {
              Q(!1);
            },
            _ = r.a.useState(""),
            ae = Object(l.a)(_, 2),
            te = ae[0],
            re = ae[1],
            ue = r.a.useState(""),
            ge = Object(l.a)(ue, 2),
            he = ge[0],
            Ee = ge[1],
            fe = r.a.useState([]),
            ve = Object(l.a)(fe, 2),
            we = ve[0],
            ye = ve[1];
          r.a.useEffect(function() {
            return ye(ee());
          }, []);
          var be = r.a.useState(!1),
            Ce = Object(l.a)(be, 2),
            je = Ce[0],
            Se = Ce[1],
            Oe = r.a.useState(!1),
            xe = Object(l.a)(Oe, 2),
            ke = xe[0],
            Ie = xe[1],
            Be = r.a.useState(0),
            We = Object(l.a)(Be, 2),
            Ne = (We[0], We[1], r.a.useState("")),
            Ae = Object(l.a)(Ne, 2),
            Pe = Ae[0],
            He = Ae[1];
          return (
            Object(O.a)(m.paper, m.fixedHeight),
            r.a.useEffect(function() {
              !(function() {
                var e = Object(C.a)(
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
                                w.eth.getBalance(t.address, "latest")
                              );
                            case 3:
                              (a = e.sent),
                                He("".concat(w.utils.fromWei(a), " FTA")),
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
              r.a.createElement(k.a, null),
              r.a.createElement(
                B.a,
                { position: "absolute", className: Object(O.a)(m.appBar) },
                r.a.createElement(
                  W.a,
                  { className: m.toolbar },
                  r.a.createElement(
                    A.a,
                    {
                      edge: "start",
                      color: "inherit",
                      "aria-label": "Open drawer",
                      onClick: function() {
                        y(!0);
                      },
                      className: Object(O.a)(
                        m.menuButton,
                        v && m.menuButtonHidden,
                      ),
                    },
                    r.a.createElement(L.a, null),
                  ),
                  r.a.createElement(
                    h.a,
                    {
                      component: "h1",
                      variant: "h6",
                      color: "inherit",
                      noWrap: !0,
                      className: m.title,
                    },
                    s,
                  ),
                  r.a.createElement(
                    A.a,
                    { color: "inherit", onClick: i, edge: "end" },
                    r.a.createElement(me.a, null),
                  ),
                  r.a.createElement(
                    A.a,
                    { color: "inherit", onClick: D, edge: "end" },
                    r.a.createElement(J.a, null),
                  ),
                ),
              ),
              r.a.createElement(
                I.a,
                {
                  variant: "temporary",
                  classes: {
                    paper: Object(O.a)(m.drawerPaper, !v && m.drawerPaperClose),
                  },
                  open: v,
                  onBackdropClick: j,
                },
                r.a.createElement(
                  "div",
                  { className: m.toolbarIcon },
                  r.a.createElement(
                    A.a,
                    { onClick: j },
                    r.a.createElement(F.a, null),
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
                        r.a.createElement(z.a, {
                          style: { width: 60, height: 60 },
                          src: "logo.jpg",
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
                        r.a.createElement(h.a, { variant: "h5" }, s),
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
                          E.a,
                          {
                            variant: "outlined",
                            size: "small",
                            color: "primary",
                            className: m.margin,
                            onClick: D,
                          },
                          p.details[de],
                        ),
                      ),
                    ),
                  ),
                  r.a.createElement(
                    u.a,
                    { item: !0 },
                    r.a.createElement(
                      N.a,
                      null,
                      we.map(function(e) {
                        return r.a.createElement(
                          M.a,
                          {
                            onClick: function() {
                              return o(e.slice(5));
                            },
                            button: !0,
                          },
                          r.a.createElement(
                            U.a,
                            null,
                            r.a.createElement(z.a, { src: "logo.jpg" }),
                          ),
                          r.a.createElement(G.a, { primary: e }),
                        );
                      }),
                    ),
                  ),
                ),
              ),
              r.a.createElement(
                "main",
                { className: m.content },
                r.a.createElement("div", { className: m.appBarSpacer }),
                r.a.createElement(
                  P.a,
                  { maxWidth: "lg", className: m.container },
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
                          r.a.createElement(z.a, {
                            style: { width: 60, height: 60 },
                            src: "logo.jpg",
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
                          r.a.createElement(h.a, { variant: "h4" }, Pe),
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
                            E.a,
                            {
                              variant: "contained",
                              color: "primary",
                              onClick: function() {
                                return window.open("http://h51.lvshandian.com");
                              },
                            },
                            p.buy[de],
                          ),
                        ),
                        r.a.createElement(u.a, { item: !0, xs: 1 }),
                        r.a.createElement(
                          u.a,
                          { item: !0 },
                          r.a.createElement(
                            E.a,
                            {
                              variant: "contained",
                              color: "primary",
                              onClick: Q,
                            },
                            p.send[de],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              r.a.createElement(
                R.a,
                { open: H, onBackdropClick: q },
                r.a.createElement(
                  "div",
                  { className: m.modalPaper },
                  r.a.createElement(
                    "div",
                    { className: m.toolbarIcon },
                    r.a.createElement(
                      A.a,
                      { onClick: q },
                      r.a.createElement(ce.a, null),
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
                      r.a.createElement(h.a, { variant: "h5" }, c),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(ne.a, {
                        value: "fta:".concat(t.address),
                        renderAs: "svg",
                      }),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(g.a, {
                        variant: "outlined",
                        value: t.address,
                        disabled: !0,
                      }),
                    ),
                  ),
                ),
              ),
              r.a.createElement(
                R.a,
                { open: $, onBackdropClick: Y },
                r.a.createElement(
                  "div",
                  { className: m.modalPaper },
                  r.a.createElement(
                    "div",
                    { className: m.toolbarIcon },
                    r.a.createElement(
                      A.a,
                      { onClick: Y },
                      r.a.createElement(ce.a, null),
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
                      r.a.createElement(g.a, {
                        label: p.from[de],
                        value: "".concat(c, " ").concat(t.address),
                        disabled: !0,
                      }),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(g.a, {
                        label: p.to[de],
                        value: te,
                        onChange: function(e) {
                          re(e.target.value);
                        },
                      }),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(
                        le.a,
                        null,
                        r.a.createElement(se.a, null, p.asset[de]),
                        r.a.createElement(
                          ie.a,
                          { value: "fta" },
                          r.a.createElement(oe.a, { value: "fta" }, "FTA"),
                        ),
                      ),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(g.a, {
                        label: p.amount[de],
                        value: he,
                        onChange: function(e) {
                          Ee(e.target.value);
                        },
                      }),
                    ),
                    r.a.createElement(
                      u.a,
                      { item: !0 },
                      r.a.createElement(
                        le.a,
                        null,
                        r.a.createElement(
                          E.a,
                          {
                            variant: "contained",
                            color: "primary",
                            onClick: function() {
                              !(function() {
                                var e = Object(C.a)(
                                  b.a.mark(function e() {
                                    return b.a.wrap(
                                      function(e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              return (
                                                (e.prev = 0),
                                                (e.next = 3),
                                                Z(t, te, he)
                                              );
                                            case 3:
                                              Se(!0), Y(), (e.next = 11);
                                              break;
                                            case 7:
                                              (e.prev = 7),
                                                (e.t0 = e.catch(0)),
                                                console.log(e.t0),
                                                Ie(!0);
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
                          p.send[de],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              r.a.createElement(K.a, {
                open: je,
                autoHideDuration: 6e3,
                onClose: function() {
                  Se(!1);
                },
                message: p.transactionFinishedInfo[de],
              }),
              r.a.createElement(K.a, {
                open: ke,
                autoHideDuration: 6e3,
                onClose: function() {
                  Ie(!1);
                },
                message: p.transactionFailedWarning[de],
              }),
            )
          );
        }),
        he = "ch";
      function Ee(e) {
        var a = e.onAccountLogin,
          t = e.prefillUsername,
          n = r.a.useState(t || ""),
          c = Object(l.a)(n, 2),
          i = c[0],
          s = c[1],
          h = r.a.useState(""),
          f = Object(l.a)(h, 2),
          v = f[0],
          w = f[1],
          y = r.a.useState([]),
          b = Object(l.a)(y, 2),
          C = b[0],
          j = b[1];
        return (
          r.a.useEffect(function() {
            return j(ee());
          }, []),
          r.a.createElement(
            m,
            { gridStyle: { minHeight: "80vh" } },
            r.a.createElement(
              d,
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
                    le.a,
                    { style: { width: 200 } },
                    r.a.createElement(se.a, null, p.username[he]),
                    r.a.createElement(
                      ie.a,
                      {
                        value: i,
                        onChange: function(e) {
                          s(e.target.value);
                        },
                      },
                      C.map(function(e) {
                        return r.a.createElement(
                          oe.a,
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
                  r.a.createElement(g.a, {
                    style: { width: 200 },
                    variant: "standard",
                    label: p.password[he],
                    value: v,
                    onChange: function(e) {
                      w(e.target.value);
                    },
                    type: "password",
                    helperText:
                      v.length >= 8 ? void 0 : p.passwordLengthWarning[he],
                    inputProps: { autoComplete: "new-password" },
                  }),
                ),
                r.a.createElement(
                  u.a,
                  { item: !0 },
                  r.a.createElement(
                    E.a,
                    {
                      variant: "contained",
                      color: "primary",
                      onClick: function() {
                        a(i, v);
                      },
                    },
                    p.login[he],
                  ),
                ),
                r.a.createElement(
                  u.a,
                  { item: !0 },
                  r.a.createElement(
                    E.a,
                    {
                      variant: "contained",
                      color: "primary",
                      component: o.b,
                      to: "/create-account",
                    },
                    p.register[he],
                  ),
                ),
              ),
            ),
          )
        );
      }
      var fe = "ch";
      var ve = Object(s.e)(function(e) {
        var a = r.a.useState(!1),
          t = Object(l.a)(a, 2),
          n = t[0],
          c = t[1],
          i = r.a.useState(!1),
          o = Object(l.a)(i, 2),
          u = o[0],
          m = o[1],
          d = r.a.useState(!1),
          g = Object(l.a)(d, 2),
          h = g[0],
          E = g[1],
          f = r.a.useState(""),
          w = Object(l.a)(f, 2),
          y = w[0],
          b = w[1],
          C = r.a.useState({}),
          j = Object(l.a)(C, 2),
          S = j[0],
          O = j[1],
          x = r.a.useState(""),
          k = Object(l.a)(x, 2),
          I = k[0],
          B = k[1],
          W = function() {
            O({}), e.history.push("/login-account");
          },
          N = function(e) {
            W(), B(e);
          },
          A = function(a, t) {
            try {
              Q(a, t), c(!0), e.history.push("/login-account");
            } catch (n) {
              console.log(n), m(!0);
            }
          },
          P = function(a, t) {
            try {
              var n = Y(a, t);
              O(n), b(a), e.history.push("/app");
            } catch (r) {
              console.log(r), E(!0);
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
                return r.a.createElement(v, { onAccountCreate: A });
              },
            }),
            r.a.createElement(s.a, {
              path: "/app",
              render: function() {
                return r.a.createElement(ge, {
                  account: S,
                  currentUsername: y,
                  handleLogout: W,
                  handleChangeAccount: N,
                });
              },
            }),
            r.a.createElement(s.a, {
              render: function() {
                return r.a.createElement(Ee, {
                  onAccountLogin: P,
                  prefillUsername: I,
                });
              },
            }),
          ),
          r.a.createElement(K.a, {
            open: n,
            autoHideDuration: 6e3,
            onClose: function() {
              c(!1);
            },
            message: p.accountCreatedInfo[fe],
          }),
          r.a.createElement(K.a, {
            open: u,
            autoHideDuration: 6e3,
            onClose: function() {
              m(!1);
            },
            message: p.accountNotCreatedInfo[fe],
          }),
          r.a.createElement(K.a, {
            open: h,
            autoHideDuration: 6e3,
            onClose: function() {
              E(!1);
            },
            message: p.cannotLoginWarning[fe],
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
      w = new $.a(new $.a.providers.HttpProvider("https://quorum.mex.gold/"));
      var we = function() {
        i.a.render(
          r.a.createElement(o.a, null, r.a.createElement(ve, null)),
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
